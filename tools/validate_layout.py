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
        help="Fail if stripped-saw or miter-saw survey items are still provisional or blank.",
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


def row_has_value(row: dict[str, str]) -> bool:
    if row["units"] in {"text", "n/a"}:
        return row["value"] != ""
    return numeric_value(row) is not None


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


def point_inside_rect(x: float, y: float, rect: dict[str, float]) -> bool:
    return rect["x"] <= x <= rect["x"] + rect["length"] and rect["y"] <= y <= rect["y"] + rect["depth"]


def unresolved_precision_ids(layout: dict, measurement_rows: dict[str, dict[str, str]]) -> list[str]:
    unresolved: list[str] = []
    gated_ids = list(layout["saw"]["stripped_saw_survey_required"]) + list(layout["miter_station"]["survey_required"])
    for row_id in sorted(set(gated_ids)):
        row = measurement_rows.get(row_id)
        if row is None:
            unresolved.append(row_id)
            continue
        if row["source"] == "provisional_field_fit":
            unresolved.append(row_id)
            continue
        if not row_has_value(row):
            unresolved.append(row_id)
    return unresolved


def overlay_rect(layout: dict) -> Optional[dict[str, float]]:
    overlay = layout["assembly_mode"].get("overlay")
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


def opening_lookup(layout: dict) -> dict[str, dict]:
    return {opening["name"]: opening for opening in layout["bench"]["top"]["openings"]}


def rect_matches(a: dict, b: dict) -> bool:
    return all(math.isclose(a[key], b[key], abs_tol=0.05) for key in ("x", "y", "length", "depth"))


def main() -> int:
    args = parse_args()
    layout_path = Path(args.layout)
    measurement_path = Path(args.measurements)
    layout = json.loads(layout_path.read_text())
    measurement_rows = load_measurements(measurement_path)
    m = {key: numeric_value(row) for key, row in measurement_rows.items() if numeric_value(row) is not None}
    errors: list[str] = []
    notes: list[str] = []

    if layout.get("schema_version") != "1.3":
        errors.append("layout schema_version must be 1.3 for the fixed-top reset")
    if "front_wing" in layout:
        errors.append("front_wing must not appear in the fixed-top layout contract")
    if "fixed_regions" in layout["bench"]["top"]:
        errors.append("bench.top.fixed_regions belongs to the retired wing contract and must be removed")

    overall = layout["bench"]["overall"]
    if not math.isclose(overall["length"], m["parked_bench_length_target"], abs_tol=0.05):
        errors.append("bench overall length does not match measurements.csv")
    if not math.isclose(overall["depth"], m["bench_depth_target"], abs_tol=0.05):
        errors.append("bench overall depth does not match measurements.csv")
    if not math.isclose(overall["height"], m["bench_height_target"], abs_tol=0.05):
        errors.append("bench overall height does not match measurements.csv")

    top = layout["bench"]["top"]
    fixed_surface = top["fixed_surface"]
    full_bench_rect = {"x": 0.0, "y": 0.0, "length": overall["length"], "depth": overall["depth"]}
    if fixed_surface != full_bench_rect:
        errors.append("bench.top.fixed_surface must describe the full 90 x 48 top")

    openings = opening_lookup(layout)
    required_openings = {"miter_station_opening", "saw_opening", "router_plate_opening"}
    missing_openings = required_openings - openings.keys()
    if missing_openings:
        errors.append("bench.top.openings is missing required entries: " + ", ".join(sorted(missing_openings)))
    for opening in openings.values():
        if not rect_inside(opening, fixed_surface):
            errors.append(f"opening {opening['name']} does not fit inside the fixed top")
    opening_names = list(openings.keys())
    for idx, name in enumerate(opening_names):
        for other_name in opening_names[idx + 1:]:
            if rects_overlap(openings[name], openings[other_name]):
                errors.append(f"top openings {name} and {other_name} overlap")

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

    saw_opening = saw["opening"]
    if not rect_matches(saw_opening, openings.get("saw_opening", {})):
        errors.append("saw.opening must match bench.top.openings saw_opening")
    target_gap = saw_opening["target_gap_general"]
    max_local_gap = saw_opening["max_local_relief_gap"]
    opening_gaps = {
        "left": cast_top["x"] - saw_opening["x"],
        "right": (saw_opening["x"] + saw_opening["length"]) - (cast_top["x"] + cast_top["length"]),
        "front": cast_top["y"] - saw_opening["y"],
        "rear": (saw_opening["y"] + saw_opening["depth"]) - (cast_top["y"] + cast_top["depth"]),
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
    expected_rail = {
        "x": cast_top["x"] - m["rail_left_projection_min_setting"],
        "y": cast_top["y"] - m["rail_front_overhang_from_cast_top"],
        "length": m["saw_table_width"] + m["rail_left_projection_min_setting"] + m["rail_front_projection_max"],
        "depth": m["saw_table_depth"] + m["rail_front_overhang_from_cast_top"] + m["rail_rear_overhang_from_cast_top"],
    }
    for key, expected in expected_rail.items():
        if not math.isclose(rail[key], expected, abs_tol=0.05):
            errors.append(f"rail envelope {key} does not match the measured rail extremes")
    if rail["x"] + rail["length"] > overall["length"] + 0.01:
        errors.append("rail envelope runs beyond the bench length")

    slot_centers = {slot["name"]: slot["center_x"] for slot in saw["miter_slots"]}
    if not math.isclose(slot_centers["left_slot"], blade_x - m["blade_to_left_miter_center"], abs_tol=0.05):
        errors.append("left miter-slot centerline is inconsistent")
    if not math.isclose(slot_centers["right_slot"], blade_x + m["blade_to_right_miter_center"], abs_tol=0.05):
        errors.append("right miter-slot centerline is inconsistent")
    for slot in saw["miter_slots"]:
        if not slot.get("reference_only"):
            errors.append(f"saw miter slot {slot['name']} must be marked reference_only in the fixed-top contract")

    router_zone = layout["router_module"]["zone"]
    router_clearance = router_zone["x"] - (rail["x"] + rail["length"])
    required_clearance = router_zone["min_clearance_from_rail_envelope"]
    if router_clearance < required_clearance:
        errors.append(
            f"router zone starts only {router_clearance:.2f} in past the rail envelope; require at least {required_clearance:.2f} in"
        )
    carcass = layout["bench"]["carcass"]
    carcass_rect = {
        "x": carcass["x"],
        "y": carcass["y"],
        "length": carcass["length"],
        "depth": carcass["depth"],
    }
    if router_zone["x"] + router_zone["length"] > carcass_rect["x"] + carcass_rect["length"] + 0.01:
        errors.append("router zone extends beyond the carcass support field")
    router_plate = openings.get("router_plate_opening")
    if router_plate is not None:
        if not rect_inside(router_plate, router_zone):
            errors.append("router plate opening must fit inside the router zone")

    miter_station = layout["miter_station"]
    bench_midpoint = overall["length"] / 2.0
    if abs(miter_station["center_x"] - bench_midpoint) > miter_station["centerline_tolerance_from_bench_midpoint"]:
        errors.append("miter station centerline is too far from the bench midpoint")
    if not rect_matches(miter_station["opening"], openings.get("miter_station_opening", {})):
        errors.append("miter_station.opening must match bench.top.openings miter_station_opening")
    if not math.isclose(
        miter_station["opening"]["x"] + miter_station["opening"]["length"] / 2.0,
        miter_station["center_x"],
        abs_tol=0.05,
    ):
        errors.append("miter station opening is not centered on miter_station.center_x")
    flip_top = miter_station["flip_top"]
    if flip_top["stowed_surface_delta_max_high"] != 0.0:
        errors.append("miter station stowed surface must never sit proud")
    if flip_top["stowed_surface_delta_max_low"] < -0.01:
        errors.append("miter station stowed surface low tolerance is too loose")

    left_support = miter_station["support_surfaces"]["left"]
    right_support = miter_station["support_surfaces"]["right"]
    if left_support["length"] < 30.0 or right_support["length"] < 30.0:
        errors.append("miter station support spans must each provide at least 30 in of support")
    if not math.isclose(left_support["x"] + left_support["length"], miter_station["opening"]["x"], abs_tol=0.05):
        errors.append("left miter-station support must terminate at the opening edge")
    if not math.isclose(right_support["x"], miter_station["opening"]["x"] + miter_station["opening"]["length"], abs_tol=0.05):
        errors.append("right miter-station support must begin at the opening edge")

    mechanism_zone = miter_station["under_top_mechanism_zone"]
    right_service = next(module for module in carcass["modules"] if module["name"] == "right_service")
    right_service_rect = {
        "x": right_service["x"],
        "y": right_service["y"],
        "length": right_service["length"],
        "depth": right_service["depth"],
    }
    for lane in saw["under_top_keep_clear"]:
        if rects_overlap(mechanism_zone, lane):
            errors.append(f"miter station under-top mechanism overlaps keep-clear lane {lane['name']}")
    if rects_overlap(mechanism_zone, right_service_rect):
        errors.append("miter station under-top mechanism intrudes into the right-side service module")

    if "table_saw_infeed_support" in layout:
        infeed = layout["table_saw_infeed_support"]
        if infeed.get("status") != "concept_only":
            errors.append("table_saw_infeed_support must stay concept_only in this PR")

    dust = layout["dust_collection"]
    mockup_gate = dust.get("mockup_gate")
    if not mockup_gate or not mockup_gate.get("required"):
        errors.append("dust collection package must declare a required mockup gate")
    elif mockup_gate.get("status") not in {"pending", "proven"}:
        errors.append("dust collection mockup gate status must be pending or proven")

    dust_bay = dust["dust_bay"]
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
            actual_vertical_clearance = dust_bay["height"] - (
                support_elevation + package_height + clearance_above
            )
            if actual_vertical_clearance < 0:
                errors.append(
                    f"dust package {package['name']} exceeds bay height once support elevation is included"
                )
            elif actual_vertical_clearance < dust_bay["service_requirements"]["vertical_clearance_min"] - 1e-6:
                errors.append(
                    f"dust package {package['name']} leaves only {actual_vertical_clearance:.2f} in vertical clearance; require at least {dust_bay['service_requirements']['vertical_clearance_min']:.2f} in"
                )
            elif actual_vertical_clearance < 0.5:
                notes.append(
                    f"dust package {package['name']} leaves only {actual_vertical_clearance:.2f} in vertical clearance and still depends on mockup proof"
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

    notches = details.get("partition_notches", [])
    if len(notches) != 2:
        errors.append("right service partition must define two upper notches")
    else:
        lane_lookup = {lane["name"]: lane for lane in saw["under_top_keep_clear"]}
        module_front_y = right_service["y"]
        for notch in notches:
            if "from_front" not in notch or "from_top" not in notch:
                errors.append(f"partition notch {notch['name']} is missing origin dimensions")
                continue
            lane_name = notch.get("covers_keep_clear_lane")
            lane = lane_lookup.get(lane_name) if lane_name else None
            if lane is None:
                errors.append(f"partition notch {notch['name']} does not name a keep-clear lane to cover")
                continue
            lane_start_local = lane["y"] - module_front_y
            lane_end_local = lane_start_local + lane["depth"]
            notch_start = notch["from_front"]
            notch_end = notch_start + notch["width"]
            if notch["from_top"] > 1e-6:
                errors.append(f"partition notch {notch['name']} must start at the top edge to preserve upper rail clearance")
            if notch_start > lane_start_local + 1e-6 or notch_end < lane_end_local - 1e-6:
                errors.append(
                    f"partition notch {notch['name']} does not fully cover keep-clear lane {lane_name}"
                )

    overlay = layout["assembly_mode"].get("overlay")
    if overlay:
        overlay_bounds = overlay_rect(layout)
        assert overlay_bounds is not None
        if not rect_inside(overlay_bounds, fixed_surface):
            errors.append("assembly overlay is not fully contained within the fixed top")
        if rects_overlap(overlay_bounds, miter_station["opening"]):
            errors.append("assembly overlay overlaps the miter-station opening")
        if rects_overlap(overlay_bounds, miter_station["deployed_envelope"]):
            errors.append("assembly overlay overlaps the miter-station operating envelope")
        for anchor in overlay["anchors"]:
            if not point_inside_rect(anchor["x"], anchor["y"], overlay_bounds):
                errors.append(f"assembly overlay anchor {anchor['name']} does not land inside the overlay footprint")
            if point_inside_rect(anchor["x"], anchor["y"], saw_opening):
                errors.append(f"assembly overlay anchor {anchor['name']} lands in the saw opening instead of structure")
            for lane in saw["under_top_keep_clear"]:
                if point_inside_rect(anchor["x"], anchor["y"], lane):
                    errors.append(f"assembly overlay anchor {anchor['name']} lands in rail keep-clear lane {lane['name']}")
        x_positions = sorted({anchor["x"] for anchor in overlay["anchors"]})
        if len(x_positions) < 2 or x_positions[-1] - x_positions[0] < 40.0:
            errors.append("assembly overlay anchors do not span enough of the overlay width to resist tipping")

    unresolved = unresolved_precision_ids(layout, measurement_rows)
    if args.require_precision_ready and unresolved:
        errors.append(
            "precision-cut gate is still closed because these survey ids are unresolved: "
            + ", ".join(unresolved)
        )
    elif unresolved:
        notes.append(
            "precision-cut gate remains closed until these survey ids are resolved: "
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

    print(f"validated layout {layout_path} against {measurement_path}; precision-cut gate is open")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
