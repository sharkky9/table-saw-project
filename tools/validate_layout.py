#!/usr/bin/env python3

import argparse
import csv
import json
import math
from pathlib import Path
from typing import Optional


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--require-precision-ready",
        action="store_true",
        help="Fail if top-machining gate geometry is still unresolved.",
    )
    parser.add_argument("layout")
    parser.add_argument("measurements")
    return parser.parse_args()


def load_measurements(path: Path) -> dict[str, dict[str, str]]:
    rows: dict[str, dict[str, str]] = {}
    with path.open(newline="") as handle:
        for row in csv.DictReader(handle):
            rows[row["id"]] = row
    return rows


def numeric_value(row: dict[str, str]) -> Optional[float]:
    try:
        return float(row["value"])
    except ValueError:
        return None


def rect_inside(inner: dict[str, float], outer: dict[str, float]) -> bool:
    return (
        inner["x"] >= outer["x"]
        and inner["y"] >= outer["y"]
        and inner["x"] + inner["length"] <= outer["x"] + outer["length"]
        and inner["y"] + inner["depth"] <= outer["y"] + outer["depth"]
    )


def rects_overlap(a: dict[str, float], b: dict[str, float]) -> bool:
    return not (
        a["x"] + a["length"] <= b["x"]
        or b["x"] + b["length"] <= a["x"]
        or a["y"] + a["depth"] <= b["y"]
        or b["y"] + b["depth"] <= a["y"]
    )


def rect_intersection(a: dict[str, float], b: dict[str, float]) -> Optional[dict[str, float]]:
    if not rects_overlap(a, b):
        return None
    x1 = max(a["x"], b["x"])
    y1 = max(a["y"], b["y"])
    x2 = min(a["x"] + a["length"], b["x"] + b["length"])
    y2 = min(a["y"] + a["depth"], b["y"] + b["depth"])
    return {
        "x": x1,
        "y": y1,
        "length": x2 - x1,
        "depth": y2 - y1,
    }


def rect_area(rect: dict[str, float]) -> float:
    return rect["length"] * rect["depth"]


def point_inside_rect(x: float, y: float, rect: dict[str, float]) -> bool:
    return rect["x"] <= x <= rect["x"] + rect["length"] and rect["y"] <= y <= rect["y"] + rect["depth"]


def overlay_rect(layout: dict) -> Optional[dict[str, float]]:
    overlay = layout["assembly_mode"].get("overlay") or layout["assembly_mode"].get("future_overlay")
    if overlay is None:
        return None
    overall = layout["bench"]["overall"]
    size = overlay["size"]
    return {
        "x": 0.0 if overlay["registration"].get("left_edge") else overall["length"] - size["length"],
        "y": overall["depth"] - size["depth"] if overlay["registration"].get("rear_edge") else 0.0,
        "length": size["length"],
        "depth": size["depth"],
    }


def unresolved_precision_ids(layout: dict, measurement_rows: dict[str, dict[str, str]]) -> list[str]:
    unresolved: list[str] = []
    slot_override = measurement_rows.get("miter_slot_assumption_override")
    slot_override_active = (
        slot_override is not None
        and slot_override["value"] == "user_accepts_standard_3_4_x_3_8"
        and slot_override["status"] == "confirmed"
    )
    for row_id in layout["saw"]["stripped_saw_survey_required"]:
        row = measurement_rows.get(row_id)
        if row is None:
            unresolved.append(row_id)
            continue
        if row_id in {"miter_slot_width", "miter_slot_depth"} and slot_override_active:
            continue
        if row["source"] == "provisional_field_fit":
            unresolved.append(row_id)
            continue
        if numeric_value(row) is None:
            unresolved.append(row_id)
    return unresolved


def main() -> int:
    args = parse_args()
    layout_path = Path(args.layout)
    measurement_path = Path(args.measurements)
    layout = json.loads(layout_path.read_text())
    measurement_rows = load_measurements(measurement_path)
    m = {key: numeric_value(row) for key, row in measurement_rows.items() if numeric_value(row) is not None}
    errors: list[str] = []
    notes: list[str] = []

    overall = layout["bench"]["overall"]
    if not math.isclose(overall["length"], m["parked_bench_length_target"], abs_tol=0.05):
        errors.append("bench overall length does not match measurements.csv")
    if not math.isclose(overall["depth"], m["bench_depth_target"], abs_tol=0.05):
        errors.append("bench overall depth does not match measurements.csv")
    if not math.isclose(overall["height"], m["bench_height_target"], abs_tol=0.05):
        errors.append("bench overall height does not match measurements.csv")

    top = layout["bench"]["top"]
    fixed_regions = top["fixed_regions"]
    expected_regions = {
        "left_carriage_field": m["left_carriage_field_width"],
        "center_saw_field": m["center_saw_field_width"],
        "right_service_field": m["right_service_field_width"],
    }
    if len(fixed_regions) != 3:
        errors.append("fixed top must be modeled as exactly three full-depth fields in this variant")

    full_bench_rect = {"x": 0.0, "y": 0.0, "length": overall["length"], "depth": overall["depth"]}
    for region in fixed_regions:
        if not rect_inside(region, full_bench_rect):
            errors.append(f"fixed top region {region['name']} does not fit inside the bench footprint")

    for idx, region in enumerate(fixed_regions):
        for other in fixed_regions[idx + 1 :]:
            if rects_overlap(region, other):
                errors.append(f"fixed top regions {region['name']} and {other['name']} overlap")

    covered_area = sum(rect_area(region) for region in fixed_regions)
    if not math.isclose(covered_area, rect_area(full_bench_rect), abs_tol=0.1):
        errors.append("fixed top regions do not cover the full bench footprint")

    region_map = {region["name"]: region for region in fixed_regions}
    if set(region_map) != set(expected_regions):
        errors.append("top fixed regions must include left_carriage_field, center_saw_field, and right_service_field")
    else:
        if not math.isclose(region_map["left_carriage_field"]["length"], m["left_carriage_field_width"], abs_tol=0.05):
            errors.append("left carriage field width does not match measurements.csv")
        if not math.isclose(region_map["center_saw_field"]["length"], m["center_saw_field_width"], abs_tol=0.05):
            errors.append("center saw field width does not match measurements.csv")
        if not math.isclose(region_map["right_service_field"]["length"], m["right_service_field_width"], abs_tol=0.05):
            errors.append("right service field width does not match measurements.csv")
        if not math.isclose(region_map["center_saw_field"]["x"], region_map["left_carriage_field"]["length"], abs_tol=0.05):
            errors.append("center saw field must begin where the left carriage field ends")
        if not math.isclose(
            region_map["right_service_field"]["x"],
            region_map["left_carriage_field"]["length"] + region_map["center_saw_field"]["length"],
            abs_tol=0.05,
        ):
            errors.append("right service field must begin where the center saw field ends")
        for region in fixed_regions:
            if not math.isclose(region["depth"], overall["depth"], abs_tol=0.05) or not math.isclose(
                region["y"], 0.0, abs_tol=0.05
            ):
                errors.append(f"fixed top region {region['name']} must span the full bench depth in this variant")

    saw = layout["saw"]
    cast_top = saw["cast_top"]
    blade_x = saw["blade_center"]["x"]
    if not math.isclose(blade_x, m["blade_center_from_left_bench_edge"], abs_tol=0.05):
        errors.append("blade centerline x coordinate does not match measurements.csv")
    if not math.isclose(cast_top["x"], blade_x - m["blade_to_left_table_edge"], abs_tol=0.05):
        errors.append("cast-top x origin does not match left-edge measurement")
    if not math.isclose(cast_top["length"], m["saw_table_width"], abs_tol=0.05):
        errors.append("cast-top width does not match measurements.csv")
    if not math.isclose(cast_top["depth"], m["saw_table_depth"], abs_tol=0.05):
        errors.append("cast-top depth does not match measurements.csv")
    if "stripped_blade_center_y" in m:
        if not math.isclose(saw["blade_center"]["y"], cast_top["y"] + m["stripped_blade_center_y"], abs_tol=0.05):
            errors.append("blade centerline y coordinate does not match measured stripped_blade_center_y plus cast-top placement")
    if "assumed_blade_center_y" in m:
        if not math.isclose(saw["blade_center"]["y"], m["assumed_blade_center_y"], abs_tol=0.05):
            errors.append("blade centerline y coordinate does not match measurements.csv")

    opening = saw["opening"]
    target_gap = opening["target_gap_general"]
    max_local_gap = opening["max_local_relief_gap"]
    opening_gaps = {
        "left": cast_top["x"] - opening["x"],
        "right": (opening["x"] + opening["length"]) - (cast_top["x"] + cast_top["length"]),
        "front": cast_top["y"] - opening["y"],
        "rear": (opening["y"] + opening["depth"]) - (cast_top["y"] + cast_top["depth"]),
    }
    for side, gap in opening_gaps.items():
        if gap <= 0:
            errors.append(f"saw opening gap on {side} side is non-positive")
        elif gap > max_local_gap + 1e-6:
            errors.append(
                f"saw opening gap on {side} side is {gap:.3f} in and exceeds max local relief {max_local_gap:.3f} in"
            )
    average_gap = sum(opening_gaps.values()) / len(opening_gaps)
    if abs(average_gap - target_gap) > 0.02:
        errors.append("saw opening average gap drifts too far from the target general gap")

    rail = saw["rail_envelope"]
    expected_rail_x = cast_top["x"] - m["rail_left_projection_min"]
    expected_rail_y = cast_top["y"] - m["rail_front_overhang_y"]
    expected_right_projection = max(m["rail_front_projection_max"], m["rail_rear_projection_max"])
    expected_rail_length = m["rail_left_projection_min"] + cast_top["length"] + expected_right_projection
    expected_rail_depth = cast_top["depth"] + m["rail_front_overhang_y"] + m["rail_rear_overhang_y"]
    if not math.isclose(rail["x"], expected_rail_x, abs_tol=0.05):
        errors.append("rail envelope x origin does not match the measured left-side rail projection")
    if not math.isclose(rail["y"], expected_rail_y, abs_tol=0.05):
        errors.append("rail envelope y origin does not match the measured front rail overhang")
    if not math.isclose(rail["length"], expected_rail_length, abs_tol=0.05):
        errors.append("rail envelope width does not match the measured left/right rail travel envelope")
    if not math.isclose(rail["depth"], expected_rail_depth, abs_tol=0.05):
        errors.append("rail envelope depth does not match the measured front/rear rail overhangs")
    if rail["x"] + rail["length"] > overall["length"] + 0.01:
        errors.append("rail envelope runs beyond the bench length")

    slot_centers = {slot["name"]: slot["center_x"] for slot in saw["miter_slots"]}
    if not math.isclose(slot_centers["left_slot"], blade_x - m["blade_to_left_miter_center"], abs_tol=0.05):
        errors.append("left miter-slot centerline is inconsistent")
    if not math.isclose(slot_centers["right_slot"], blade_x + m["blade_to_right_miter_center"], abs_tol=0.05):
        errors.append("right miter-slot centerline is inconsistent")
    for slot in saw["miter_slots"]:
        if not math.isclose(slot["slot_width"], m["miter_slot_width"], abs_tol=0.05):
            errors.append(f"{slot['name']} slot width does not match measurements.csv")

    left_field = region_map.get("left_carriage_field")
    carriage = layout["left_sliding_carriage"]
    if left_field is not None:
        parked = carriage["parked_envelope"]
        guide_zone = carriage["guide_strip_zone"]
        if not rect_inside(parked, left_field):
            errors.append("sliding-carriage parked envelope does not fit inside the left carriage field")
        if not rect_inside(guide_zone, left_field):
            errors.append("sliding-carriage guide-strip zone does not fit inside the left carriage field")
        if not math.isclose(parked["length"], m["left_carriage_width"], abs_tol=0.05):
            errors.append("sliding-carriage width does not match measurements.csv")
        if not math.isclose(carriage["target_stroke"], m["left_carriage_stroke_target"], abs_tol=0.05):
            errors.append("sliding-carriage target stroke does not match measurements.csv")
        if not math.isclose(carriage["park_gap_to_saw"], m["left_carriage_clear_gap_to_saw"], abs_tol=0.05):
            errors.append("sliding-carriage park gap does not match measurements.csv")
        actual_gap = cast_top["x"] - (parked["x"] + parked["length"])
        if actual_gap + 1e-6 < carriage["park_gap_to_saw"]:
            errors.append("sliding-carriage parked envelope intrudes too far toward the saw cast top")
        travel_limits = carriage.get("travel_limits")
        if not travel_limits:
            errors.append("sliding carriage must declare explicit travel limits")
        else:
            front_stop_y = travel_limits["front_stop_y"]
            rear_stop_y = travel_limits["rear_stop_y"]
            if rear_stop_y < front_stop_y:
                errors.append("sliding-carriage rear stop cannot be ahead of the front stop")
            literal_stroke = rear_stop_y - front_stop_y
            if not math.isclose(literal_stroke, carriage["target_stroke"], abs_tol=0.05):
                errors.append("sliding-carriage travel limits do not produce the declared target stroke")
            if not math.isclose(travel_limits["literal_translation_stroke"], carriage["target_stroke"], abs_tol=0.05):
                errors.append("sliding-carriage literal translation stroke does not match the declared target stroke")
            if not math.isclose(travel_limits["parked_reference_y"], parked["y"], abs_tol=0.05):
                errors.append("sliding-carriage parked y does not match the declared travel-limits park reference")
            front_rect = {
                "x": parked["x"],
                "y": front_stop_y,
                "length": parked["length"],
                "depth": parked["depth"],
            }
            rear_rect = {
                "x": parked["x"],
                "y": rear_stop_y,
                "length": parked["length"],
                "depth": parked["depth"],
            }
            if not rect_inside(front_rect, guide_zone):
                errors.append("sliding-carriage front-stop envelope is not fully supported by the guide-strip zone")
            if not rect_inside(rear_rect, guide_zone):
                errors.append("sliding-carriage rear-stop envelope is not fully supported by the guide-strip zone")
        bridge_zones = {
            zone["name"]: zone for zone in carriage["construction"].get("left_rail_bridge_zones", [])
        }
        left_lane_expectations = {
            "front_left_rail_bridge_zone": next(
                lane for lane in saw["under_top_keep_clear"] if lane["name"] == "front_left_rail_lane"
            ),
            "rear_left_rail_bridge_zone": next(
                lane for lane in saw["under_top_keep_clear"] if lane["name"] == "rear_left_rail_lane"
            ),
        }
        for bridge_name, lane in left_lane_expectations.items():
            expected_bridge = rect_intersection(guide_zone, lane)
            if expected_bridge is None:
                continue
            actual_bridge = bridge_zones.get(bridge_name)
            if actual_bridge is None:
                errors.append(f"sliding carriage is missing explicit rail-bridge contract {bridge_name}")
                continue
            for key in ("x", "y", "length", "depth"):
                if not math.isclose(actual_bridge[key], expected_bridge[key], abs_tol=0.05):
                    errors.append(f"{bridge_name} does not match the left rail-pocket overlap that must stay clear")

        left_module = layout["bench"]["carcass"]["modules"][0]
        support_drawer = carriage["support_drawer"]
        closed_drawer = {
            "x": support_drawer["x"],
            "y": support_drawer["y"],
            "length": support_drawer["length"],
            "depth": support_drawer["depth"],
        }
        if closed_drawer["x"] < left_module["x"] - 1e-6 or closed_drawer["x"] + closed_drawer["length"] > left_module["x"] + left_module["length"] + 1e-6:
            errors.append("under-carriage support drawer does not fit between the left-module side walls")
        if closed_drawer["y"] < -1e-6 or closed_drawer["y"] + closed_drawer["depth"] > left_module["y"] + left_module["depth"] + 1e-6:
            errors.append("under-carriage support drawer does not fit within the bench front/rear support zone")
        if not math.isclose(support_drawer["extension_toward_front"], m["side_support_drawer_extension"], abs_tol=0.05):
            errors.append("support drawer extension does not match measurements.csv")
        if not math.isclose(
            support_drawer["top_surface_below_bench_top"], m["support_drawer_top_below_bench_top"], abs_tol=0.05
        ):
            errors.append("support drawer top-surface height does not match measurements.csv")
        if support_drawer["top_surface_below_bench_top"] > 0.125:
            errors.append("support drawer support surface is modeled too low to behave as near-front panel support")
        for lane_name in {"front_left_rail_lane", "rear_left_rail_lane"}:
            lane = next(l for l in saw["under_top_keep_clear"] if l["name"] == lane_name)
            if rects_overlap(closed_drawer, lane):
                errors.append(f"under-carriage support drawer intrudes into {lane_name}")

    support_table = layout["left_support_table"]
    if not math.isclose(support_table["deployed_extension"], m["left_support_table_extension"], abs_tol=0.05):
        errors.append("left support-table extension does not match measurements.csv")
    if not math.isclose(support_table["covered_depth"], m["left_support_table_depth"], abs_tol=0.05):
        errors.append("left support-table depth does not match measurements.csv")
    if not support_table["folded_within_parked_footprint"]:
        errors.append("left support table must fold within the parked footprint")
    if not math.isclose(support_table["active_zone"]["length"], support_table["deployed_extension"], abs_tol=0.05):
        errors.append("left support-table active zone length must match the deployed extension")
    if not math.isclose(support_table["active_zone"]["depth"], support_table["covered_depth"], abs_tol=0.05):
        errors.append("left support-table active zone depth must match the covered depth")
    if support_table["support"].get("leg_count", 0) < 2:
        errors.append("left support table must use two support legs in this full-depth variant")
    if "load_test" not in support_table["support"]:
        errors.append("left support table must declare a corner-load acceptance test")

    router_zone = layout["router_module"]["zone"]
    router_clearance = router_zone["x"] - (rail["x"] + rail["length"])
    if router_clearance < 1.0:
        errors.append(
            f"router zone starts only {router_clearance:.2f} in past the rail envelope; require at least 1.0 in"
        )
    if router_zone["x"] + router_zone["length"] > layout["bench"]["carcass"]["x"] + layout["bench"]["carcass"]["length"] + 0.01:
        errors.append("router zone extends beyond the carcass support field")

    overlay = layout["assembly_mode"]["future_overlay"]
    if not math.isclose(overlay["size"]["length"], m["overlay_length"], abs_tol=0.05):
        errors.append("assembly overlay length does not match measurements.csv")
    if not math.isclose(overlay["size"]["depth"], m["overlay_depth"], abs_tol=0.05):
        errors.append("assembly overlay depth does not match measurements.csv")

    overlay_bounds = overlay_rect(layout)
    assert overlay_bounds is not None
    for anchor in overlay["anchors"]:
        if not point_inside_rect(anchor["x"], anchor["y"], overlay_bounds):
            errors.append(f"future overlay anchor {anchor['name']} does not land inside the overlay footprint")
        if point_inside_rect(anchor["x"], anchor["y"], saw["opening"]):
            errors.append(f"future overlay anchor {anchor['name']} lands in the saw opening instead of structure")
        for lane in saw["under_top_keep_clear"]:
            if point_inside_rect(anchor["x"], anchor["y"], lane):
                errors.append(f"future overlay anchor {anchor['name']} lands in rail keep-clear lane {lane['name']}")

    dust = layout["dust_collection"]
    mockup_gate = dust.get("mockup_gate")
    if not mockup_gate or not mockup_gate.get("required"):
        errors.append("dust collection package must declare a required mockup gate")
    elif mockup_gate.get("status") not in {"pending", "proven"}:
        errors.append("dust collection mockup gate status must be pending or proven")
    dust_bay = layout["dust_collection"]["dust_bay"]
    if "service_opening" not in dust_bay:
        errors.append("dust bay is missing a service_opening definition")
    packages = dust_bay["packages"]
    for package in packages:
        if not rect_inside(package, dust_bay):
            errors.append(f"dust package {package['name']} does not fit inside dust bay")
        if "base_type" not in package or "service_mode" not in package or "deck_or_tray_elevation" not in package:
            errors.append(f"dust package {package['name']} is missing service packaging fields")
        package_height = package.get("height")
        clearance_above = package.get("clearance_above", 0.0)
        support_elevation = package.get("deck_or_tray_elevation", 0.0)
        if package_height is not None:
            actual_vertical_clearance = dust_bay["height"] - (support_elevation + package_height + clearance_above)
            if actual_vertical_clearance < dust_bay["service_requirements"]["vertical_clearance_min"] - 1e-6:
                errors.append(
                    f"dust package {package['name']} leaves only {actual_vertical_clearance:.2f} in vertical clearance"
                )

    if rects_overlap(packages[0], packages[1]):
        errors.append("cyclone and extractor overlap inside the dust bay")

    sorted_packages = sorted(packages, key=lambda package: package["y"])
    front_package = sorted_packages[0]
    rear_package = sorted_packages[-1]
    actual_gap = rear_package["y"] - (front_package["y"] + front_package["depth"])
    actual_rear_void = (dust_bay["y"] + dust_bay["depth"]) - (rear_package["y"] + rear_package["depth"])
    if actual_gap < dust_bay["service_requirements"]["package_gap_min"] - 1e-6:
        errors.append(
            f"dust package gap is only {actual_gap:.2f} in; require at least {dust_bay['service_requirements']['package_gap_min']:.2f} in"
        )
    if actual_rear_void < dust_bay["service_requirements"]["rear_min"] - 1e-6:
        errors.append(
            f"dust-bay rear service void is only {actual_rear_void:.2f} in; require at least {dust_bay['service_requirements']['rear_min']:.2f} in"
        )

    right_service = layout["bench"]["carcass"]["modules"][2]
    details = right_service.get("details", {})
    front_service_face = details.get("front_service_face")
    control_subpanel = details.get("control_subpanel")
    if not front_service_face:
        errors.append("right service module must declare the RM-06 front service face")
    if not control_subpanel or not control_subpanel.get("disconnects"):
        errors.append("right service module must declare an RM-10 control subpanel with disconnect strategy")
    elif front_service_face:
        if control_subpanel["x_from_left"] + control_subpanel["width"] > front_service_face["width"] + 1e-6:
            errors.append("RM-10 control subpanel extends beyond the RM-06 service face width")
        if control_subpanel["y_from_bottom"] + control_subpanel["height"] > front_service_face["height"] + 1e-6:
            errors.append("RM-10 control subpanel extends beyond the RM-06 service face height")

    unresolved = unresolved_precision_ids(layout, measurement_rows)
    if args.require_precision_ready and unresolved:
        errors.append(
            "precision-cut gate is still closed because these stripped-saw survey ids are unresolved: "
            + ", ".join(unresolved)
        )
    elif unresolved:
        notes.append(
            "precision-cut gate remains closed until these stripped-saw survey ids are resolved: "
            + ", ".join(unresolved)
        )

    if errors:
        print("layout validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    if notes:
        print(f"validated concept layout {layout_path} against {measurement_path}")
        for note in notes:
            print(f"note: {note}")
        return 0

    print(
        f"validated layout {layout_path} against {measurement_path}; validator-backed top-machining geometry is complete, but manual fit-up gates still remain"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
