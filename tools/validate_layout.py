#!/usr/bin/env python3

import argparse
import csv
import json
import math
import sys
from pathlib import Path
from typing import Optional


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--require-precision-ready",
        action="store_true",
        help="Fail if stripped-saw survey items are still provisional or blank.",
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


def rect_area(rect: dict[str, float]) -> float:
    return rect["length"] * rect["depth"]


def point_inside_rect(x: float, y: float, rect: dict[str, float]) -> bool:
    return rect["x"] <= x <= rect["x"] + rect["length"] and rect["y"] <= y <= rect["y"] + rect["depth"]


def unresolved_precision_ids(layout: dict, measurement_rows: dict[str, dict[str, str]]) -> list[str]:
    unresolved: list[str] = []
    for row_id in layout["saw"]["stripped_saw_survey_required"]:
        row = measurement_rows.get(row_id)
        if row is None:
            unresolved.append(row_id)
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
    if len(fixed_regions) != 2:
        errors.append("fixed top must be modeled as exactly two fixed regions in this concept")
    wing = layout["front_wing"]
    full_bench_rect = {"x": 0.0, "y": 0.0, "length": overall["length"], "depth": overall["depth"]}
    for region in fixed_regions:
        if not rect_inside(region, full_bench_rect):
            errors.append(f"fixed top region {region['name']} does not fit inside the bench footprint")
    for region in fixed_regions:
        if rects_overlap(region, wing):
            errors.append(f"fixed top region {region['name']} overlaps the fold-down wing")
    if rects_overlap(fixed_regions[0], fixed_regions[1]):
        errors.append("fixed top regions overlap one another")
    covered_area = rect_area(wing) + sum(rect_area(region) for region in fixed_regions)
    if not math.isclose(covered_area, rect_area(full_bench_rect), abs_tol=0.1):
        errors.append("fixed top regions plus wing do not cover the full bench footprint")

    rear_main = next((region for region in fixed_regions if region["name"] == "rear_main"), None)
    right_front = next((region for region in fixed_regions if region["name"] == "right_front_infill"), None)
    if rear_main is None or right_front is None:
        errors.append("top fixed regions must include rear_main and right_front_infill")
    else:
        if not math.isclose(right_front["length"], m["right_front_infill_width"], abs_tol=0.05):
            errors.append("right-front infill width does not match measurements.csv")
        if not math.isclose(wing["depth"], m["front_wing_depth"], abs_tol=0.05):
            errors.append("front wing depth does not match measurements.csv")
        if not math.isclose(rear_main["y"], wing["depth"], abs_tol=0.05):
            errors.append("rear fixed top must begin where the front wing ends")
        if not math.isclose(right_front["x"], wing["length"], abs_tol=0.05):
            errors.append("right-front infill must begin where the wing stops")

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

    rail = saw["rail_envelope"]
    if rail["x"] + rail["length"] > overall["length"] + 0.01:
        errors.append("rail envelope runs beyond the bench length")

    slot_centers = {slot["name"]: slot["center_x"] for slot in saw["miter_slots"]}
    if not math.isclose(slot_centers["left_slot"], blade_x - m["blade_to_left_miter_center"], abs_tol=0.05):
        errors.append("left miter-slot centerline is inconsistent")
    if not math.isclose(slot_centers["right_slot"], blade_x + m["blade_to_right_miter_center"], abs_tol=0.05):
        errors.append("right miter-slot centerline is inconsistent")

    if wing["length"] < layout["bench"]["carcass"]["modules"][0]["length"] + layout["bench"]["carcass"]["modules"][1]["length"]:
        errors.append("front wing does not cover the full left and center module width")

    router_zone = layout["router_module"]["zone"]
    router_clearance = router_zone["x"] - (rail["x"] + rail["length"])
    if router_clearance < 1.0:
        errors.append(
            f"router zone starts only {router_clearance:.2f} in past the rail envelope; require at least 1.0 in"
        )
    if router_zone["x"] + router_zone["length"] > layout["bench"]["carcass"]["x"] + layout["bench"]["carcass"]["length"] + 0.01:
        errors.append("router zone extends beyond the carcass support field")

    fixed_tracks = layout["assembly_mode"]["fixed_t_tracks"]
    saw_opening = saw["opening"]
    for idx, track in enumerate(fixed_tracks, start=1):
        if track["center_x"] + 0.5 >= saw_opening["x"]:
            errors.append(f"fixed T-track {idx} intrudes into the saw-opening field")

    for anchor in layout["assembly_mode"]["future_overlay"]["anchors"]:
        if point_inside_rect(anchor["x"], anchor["y"], saw_opening):
            errors.append(f"future overlay anchor {anchor['name']} lands in the saw opening instead of structure")

    dust_bay = layout["dust_collection"]["dust_bay"]
    packages = dust_bay["packages"]
    for package in packages:
        if not rect_inside(package, dust_bay):
            errors.append(f"dust package {package['name']} does not fit inside dust bay")
        package_height = package.get("height")
        clearance_above = package.get("clearance_above", 0.0)
        if package_height is not None:
            actual_vertical_clearance = dust_bay["height"] - (package_height + clearance_above)
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

    print(f"validated layout {layout_path} against {measurement_path}; precision-cut gate is open")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
