#!/usr/bin/env python3

import argparse
import csv
import math
from pathlib import Path
from typing import Optional


ALLOWED_SOURCES = {
    "official",
    "user_measured",
    "derived",
    "provisional_field_fit",
}

ALLOWED_STATUSES = {
    "confirmed",
    "approx",
    "concept_only",
    "required_before_precision_cut",
    "verify_before_procurement",
    "reference_only",
}

REQUIRED_COLUMNS = {
    "category",
    "id",
    "description",
    "value",
    "units",
    "tolerance",
    "source",
    "status",
    "blocks",
    "display_fractional",
    "notes",
}

REQUIRED_IDS = {
    "saw_table_width",
    "saw_table_depth",
    "saw_rail_width_min",
    "saw_rail_depth",
    "saw_body_height",
    "blade_to_left_miter_center",
    "blade_to_right_miter_center",
    "blade_to_left_table_edge",
    "blade_to_right_table_edge",
    "max_overall_width_fence_extended",
    "max_rip_right",
    "wall_length",
    "parked_bench_length_target",
    "bench_depth_target",
    "bench_height_target",
    "blade_center_from_left_bench_edge",
    "top_thickness",
    "saw_mount_plane_height",
    "right_front_infill_width",
    "internal_extractor_width",
    "internal_extractor_depth",
    "internal_extractor_body_height",
    "internal_extractor_hose_clearance",
    "compact_cyclone_stack_height",
    "compact_cyclone_hose_clearance",
    "lift_plate_width",
    "lift_plate_length",
}

PRECISION_GATED_IDS = {
    "stripped_blade_center_y",
    "front_left_foot_center_x",
    "front_left_foot_center_y",
    "front_right_foot_center_x",
    "front_right_foot_center_y",
    "rear_left_foot_center_x",
    "rear_left_foot_center_y",
    "rear_right_foot_center_x",
    "rear_right_foot_center_y",
    "foot_pad_width_x",
    "foot_pad_depth_y",
    "mount_hole_diameter",
    "lowest_underside_protrusion_below_mount_plane",
    "rail_front_projection_min",
    "rail_front_projection_mid",
    "rail_front_projection_max",
    "rail_rear_projection_min",
    "rail_rear_projection_mid",
    "rail_rear_projection_max",
    "dust_port_center_x",
    "dust_port_center_y",
    "dust_hose_sweep_depth_0deg",
    "dust_hose_sweep_depth_45deg",
    "miter_slot_width",
    "miter_slot_depth",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--require-precision-ready",
        action="store_true",
        help="Fail if any stripped-saw survey or provisional procurement gate remains unresolved.",
    )
    parser.add_argument("measurements")
    return parser.parse_args()


def load_measurements(path: Path) -> tuple[list[dict[str, str]], set[str]]:
    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        rows = list(reader)
        return rows, set(reader.fieldnames or [])


def maybe_float(value: str) -> Optional[float]:
    if value == "":
        return None
    try:
        return float(value)
    except ValueError:
        return None


def get_float(rows: dict[str, dict[str, str]], key: str) -> float:
    value = maybe_float(rows[key]["value"])
    if value is None:
        raise ValueError(key)
    return value


def unresolved_precision_ids(rows: dict[str, dict[str, str]]) -> list[str]:
    unresolved: list[str] = []
    for row_id in sorted(PRECISION_GATED_IDS):
        row = rows.get(row_id)
        if row is None:
            unresolved.append(row_id)
            continue
        if row["source"] == "provisional_field_fit":
            unresolved.append(row_id)
            continue
        if maybe_float(row["value"]) is None:
            unresolved.append(row_id)
    return unresolved


def main() -> int:
    args = parse_args()
    path = Path(args.measurements)
    raw_rows, columns = load_measurements(path)
    rows = {row["id"]: row for row in raw_rows}
    errors: list[str] = []
    notes: list[str] = []

    missing_columns = REQUIRED_COLUMNS - columns
    if missing_columns:
        errors.append(f"missing required columns: {', '.join(sorted(missing_columns))}")

    missing = sorted(REQUIRED_IDS - rows.keys())
    if missing:
        errors.append(f"missing required measurement ids: {', '.join(missing)}")

    for row in raw_rows:
        row_id = row["id"]
        source = row["source"]
        status = row["status"]
        blocks = row["blocks"].strip()
        display_fractional = row["display_fractional"].strip()

        if source not in ALLOWED_SOURCES:
            errors.append(f"{row_id} has unknown source tier: {source}")
        if status not in ALLOWED_STATUSES:
            errors.append(f"{row_id} has unknown status: {status}")
        if blocks == "":
            errors.append(f"{row_id} is missing blocks guidance")

        units = row["units"]
        numeric_value = maybe_float(row["value"])
        if units in {"text", "n/a"}:
            if row["value"] == "":
                errors.append(f"{row_id} text value is blank")
            continue

        if numeric_value is None:
            if status in {"required_before_precision_cut", "verify_before_procurement"} and source == "provisional_field_fit":
                notes.append(f"{row_id} is still blank pending stripped-saw survey")
                continue
            errors.append(f"{row_id} is not numeric: {row['value']}")
            continue
        if numeric_value <= 0:
            errors.append(f"{row_id} must be positive, got {numeric_value}")
        if display_fractional == "":
            errors.append(f"{row_id} is missing display_fractional")

    if not errors:
        bench_height = get_float(rows, "bench_height_target")
        saw_body_height = get_float(rows, "saw_body_height")
        saw_mount_plane = get_float(rows, "saw_mount_plane_height")
        if not math.isclose(bench_height - saw_body_height, saw_mount_plane, abs_tol=0.02):
            errors.append("saw_mount_plane_height does not equal bench_height_target - saw_body_height")

        wall_length = get_float(rows, "wall_length")
        bench_length = get_float(rows, "parked_bench_length_target")
        if bench_length > wall_length + 0.5:
            errors.append("planned bench length exceeds available wall length")

        left_edge = get_float(rows, "blade_to_left_table_edge")
        right_edge = get_float(rows, "blade_to_right_table_edge")
        table_width = get_float(rows, "saw_table_width")
        if not math.isclose(left_edge + right_edge, table_width, abs_tol=0.05):
            errors.append("blade-to-edge measurements do not add up to the saw table width")

        if get_float(rows, "saw_rail_width_min") < table_width:
            errors.append("minimum rail width cannot be smaller than cast-top width")

        if rows["assumed_blade_center_y"]["source"] == "provisional_field_fit":
            notes.append(
                "assumed_blade_center_y is still provisional; front-wing depth and rear-support depth remain concept geometry only"
            )

        unresolved = unresolved_precision_ids(rows)
        if args.require_precision_ready and unresolved:
            errors.append(
                "precision-cut gate is still closed because these ids are unresolved: "
                + ", ".join(unresolved)
            )
        elif unresolved:
            notes.append(
                "precision-cut gate remains closed until these ids are resolved: "
                + ", ".join(unresolved)
            )

    if errors:
        print("measurement validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    if notes:
        print(f"validated {len(raw_rows)} measurement rows from {path}")
        for note in notes:
            print(f"note: {note}")
        return 0

    print(f"validated {len(raw_rows)} measurement rows from {path}; precision-cut gate is open")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
