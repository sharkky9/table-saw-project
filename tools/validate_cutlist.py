#!/usr/bin/env python3

import csv
import sys
from collections import Counter
from pathlib import Path


REQUIRED_COLUMNS = {
    "part_id",
    "assembly",
    "material",
    "thickness",
    "qty",
    "rough_l",
    "rough_w",
    "final_l",
    "final_w",
    "notes",
}

REQUIRED_PARTS = {
    "PL-01",
    "LM-01",
    "CM-01",
    "RM-01",
    "TOP-01A",
    "TOP-01B",
    "TOP-02A",
    "TOP-02B",
    "FW-01",
    "FW-02",
    "RF-01",
    "ASM-01",
    "ASM-04",
}

USABLE_SHEET_AREA = 48 * 96 * 0.75
SHEET_MAP = {
    ("plywood", "0.75"): "MAT-01",
    ("MDF", "0.75"): "MAT-02",
    ("plywood", "0.5"): "MAT-03",
}


def load_bom_sheet_counts(path: Path) -> dict[str, float]:
    if not path.exists():
        return {}
    with path.open(newline="") as handle:
        rows = list(csv.DictReader(handle))
    counts: dict[str, float] = {}
    for row in rows:
        try:
            counts[row["item_id"]] = float(row["qty"])
        except ValueError:
            continue
    return counts


def main() -> int:
    if len(sys.argv) not in {2, 3}:
        print("usage: validate_cutlist.py <cut-list.csv> [bom.csv]", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    bom_path = Path(sys.argv[2]) if len(sys.argv) == 3 else path.with_name("bom.csv")
    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        rows = list(reader)

    missing_columns = REQUIRED_COLUMNS - set(reader.fieldnames or [])
    if missing_columns:
        print(f"cut list is missing columns: {', '.join(sorted(missing_columns))}")
        return 1

    errors: list[str] = []
    notes: list[str] = []
    duplicates = [part_id for part_id, count in Counter(row["part_id"] for row in rows).items() if count > 1]
    if duplicates:
        errors.append(f"duplicate part ids: {', '.join(sorted(duplicates))}")

    missing_parts = REQUIRED_PARTS - {row["part_id"] for row in rows}
    if missing_parts:
        errors.append(f"missing required parts: {', '.join(sorted(missing_parts))}")

    material_areas: dict[str, float] = {"MAT-01": 0.0, "MAT-02": 0.0, "MAT-03": 0.0}

    for row in rows:
        numeric_values: dict[str, float] = {}
        for key in ("thickness", "qty", "rough_l", "rough_w", "final_l", "final_w"):
            try:
                value = float(row[key])
            except ValueError:
                errors.append(f"{row['part_id']} has non-numeric {key}: {row[key]}")
                continue
            numeric_values[key] = value
            if value <= 0:
                errors.append(f"{row['part_id']} has non-positive {key}: {value}")
        if {"rough_l", "rough_w", "final_l", "final_w"} <= numeric_values.keys():
            if numeric_values["rough_l"] + 1e-6 < numeric_values["final_l"]:
                errors.append(f"{row['part_id']} rough_l is smaller than final_l")
            if numeric_values["rough_w"] + 1e-6 < numeric_values["final_w"]:
                errors.append(f"{row['part_id']} rough_w is smaller than final_w")

        if row["part_id"] == "FW-04" and numeric_values.get("rough_l", 0.0) < 35.0:
            errors.append("FW-04 rough leg blanks are too short for a 36 in bench with a 1.5 in wing")

        if row["assembly"] == "assembly_overlay":
            continue

        sheet_key = SHEET_MAP.get((row["material"], row["thickness"]))
        if sheet_key and {"qty", "rough_l", "rough_w"} <= numeric_values.keys():
            material_areas[sheet_key] += (
                numeric_values["qty"] * numeric_values["rough_l"] * numeric_values["rough_w"]
            )

    bom_counts = load_bom_sheet_counts(bom_path)
    if bom_counts:
        for item_id, rough_area in material_areas.items():
            required_sheets = rough_area / USABLE_SHEET_AREA
            available_sheets = bom_counts.get(item_id)
            if available_sheets is None:
                errors.append(f"{item_id} is missing from the BOM but required by the cut list")
                continue
            if required_sheets > available_sheets + 1e-6:
                errors.append(
                    f"{item_id} rough area needs {required_sheets:.2f} usable sheets but BOM only provides {available_sheets:.0f}"
                )
            else:
                utilization = required_sheets / available_sheets if available_sheets else 0.0
                notes.append(f"{item_id} usable-sheet utilization: {utilization:.0%}")
    else:
        notes.append("bom.csv not found; skipped sheet-good coverage check")

    if errors:
        print("cut-list validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"validated {len(rows)} cut-list rows from {path}")
    for note in notes:
        print(f"note: {note}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
