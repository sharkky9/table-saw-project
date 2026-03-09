#!/usr/bin/env python3

import csv
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Optional


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
    "gate",
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
SHEET_LENGTH = 96.0
SHEET_WIDTH = 48.0

ALLOWED_GATES = {
    "cut_now",
    "after_survey",
    "after_face_fit",
    "after_service_layout",
    "after_mockup",
    "after_wing_fit",
    "stage2",
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


def load_layout(path: Optional[Path]) -> Optional[dict]:
    if path is None or not path.exists():
        return None
    return json.loads(path.read_text())


def default_layout_path(cutlist_path: Path) -> Path:
    return cutlist_path.resolve().parents[1] / "data" / "layout.json"


def default_no_cut_checklist_path(cutlist_path: Path) -> Path:
    return cutlist_path.resolve().with_name("no-cut-yet-checklist.md")


def parse_checklist_part_ids(path: Path) -> set[str]:
    if not path.exists():
        return set()
    return set(re.findall(r"`([A-Z]+-\d+[A-Z]?)`", path.read_text()))


def main() -> int:
    if len(sys.argv) not in {2, 3, 4}:
        print("usage: validate_cutlist.py <cut-list.csv> [bom.csv] [layout.json]", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    bom_path = Path(sys.argv[2]) if len(sys.argv) >= 3 else path.with_name("bom.csv")
    layout_path = Path(sys.argv[3]) if len(sys.argv) == 4 else default_layout_path(path)
    checklist_path = default_no_cut_checklist_path(path)

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
    by_part = {row["part_id"]: row for row in rows}

    for row in rows:
        numeric_values: dict[str, float] = {}
        gate = row["gate"].strip()
        if gate not in ALLOWED_GATES:
            errors.append(f"{row['part_id']} has unknown gate: {gate}")
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
            rough_l = numeric_values["rough_l"]
            rough_w = numeric_values["rough_w"]
            fits_sheet = (
                (rough_l <= SHEET_LENGTH + 1e-6 and rough_w <= SHEET_WIDTH + 1e-6)
                or (rough_w <= SHEET_LENGTH + 1e-6 and rough_l <= SHEET_WIDTH + 1e-6)
            )
            if not fits_sheet:
                errors.append(
                    f"{row['part_id']} rough blank {rough_l} x {rough_w} does not fit within a 48 x 96 sheet in either orientation"
                )
            material_areas[sheet_key] += (
                numeric_values["qty"] * numeric_values["rough_l"] * numeric_values["rough_w"]
            )

    bom_counts = load_bom_sheet_counts(bom_path)
    checklist_part_ids = parse_checklist_part_ids(checklist_path)
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

    drawer_front_ids = {"LM-07", "LM-08", "LM-09"}
    if not drawer_front_ids <= by_part.keys():
        errors.append("drawer front rows LM-07 through LM-09 must all exist")
    if by_part.get("DR-07", {}).get("qty") != "3":
        errors.append("DR-07 must provide three drawer bottoms for the three-drawer left bank")
    if bom_counts.get("HDW-11") not in {None, 3.0}:
        errors.append("HDW-11 must specify three pairs of drawer slides")

    gated_parts = {
        row["part_id"]
        for row in rows
        if row["gate"] not in {"cut_now", "stage2"}
    }
    if not checklist_part_ids:
        errors.append("no-cut-yet checklist is missing or contains no part ids")
    else:
        missing_checklist_parts = gated_parts - checklist_part_ids
        if missing_checklist_parts:
            errors.append(
                "gated cut-list parts missing from no-cut-yet checklist: "
                + ", ".join(sorted(missing_checklist_parts))
            )

    layout = load_layout(layout_path)
    if layout:
        rear_main = next(region for region in layout["bench"]["top"]["fixed_regions"] if region["name"] == "rear_main")
        right_front = next(region for region in layout["bench"]["top"]["fixed_regions"] if region["name"] == "right_front_infill")
        overlay = layout["assembly_mode"].get("overlay") or layout["assembly_mode"]["future_overlay"]
        checks = {
            "TOP-01A": (rear_main["length"], rear_main["depth"]),
            "TOP-01B": (right_front["length"], right_front["depth"]),
            "TOP-02A": (rear_main["length"], rear_main["depth"]),
            "TOP-02B": (right_front["length"], right_front["depth"]),
            "FW-01": (layout["front_wing"]["length"], layout["front_wing"]["depth"]),
            "FW-02": (layout["front_wing"]["length"], layout["front_wing"]["depth"]),
            "RM-06": (
                layout["bench"]["carcass"]["modules"][2]["details"]["front_service_face"]["width"],
                layout["bench"]["carcass"]["modules"][2]["details"]["front_service_face"]["height"],
            ),
            "RM-07": (
                layout["router_module"]["access_hatch"]["width"],
                layout["router_module"]["access_hatch"]["height"],
            ),
            "RM-10": (
                layout["bench"]["carcass"]["modules"][2]["details"]["control_subpanel"]["width"],
                layout["bench"]["carcass"]["modules"][2]["details"]["control_subpanel"]["height"],
            ),
            "ASM-01": (overlay["size"]["length"], overlay["size"]["depth"]),
            "ASM-04": (
                overlay["underside_stiffener"]["length"],
                overlay["underside_stiffener"]["depth"],
            ),
        }
        for part_id, (expected_l, expected_w) in checks.items():
            row = by_part.get(part_id)
            if row is None:
                continue
            try:
                final_l = float(row["final_l"])
                final_w = float(row["final_w"])
            except ValueError:
                errors.append(f"{part_id} is missing numeric final dimensions for layout cross-check")
                continue
            if abs(final_l - expected_l) > 0.05 or abs(final_w - expected_w) > 0.05:
                errors.append(
                    f"{part_id} final dimensions {final_l} x {final_w} do not match layout contract {expected_l} x {expected_w}"
                )
    else:
        notes.append("layout.json not found; skipped cut-list-to-layout cross-check")

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
