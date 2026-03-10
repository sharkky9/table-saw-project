#!/usr/bin/env python3

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
LAYOUT_PATH = REPO_ROOT / "data" / "layout.json"
MEASUREMENTS_PATH = REPO_ROOT / "data" / "measurements.csv"
CUTLIST_PATH = REPO_ROOT / "plans" / "cut-list-final.csv"
OUTPUT_JSON_PATH = REPO_ROOT / "models" / "generated" / "bench-model.json"
OUTPUT_SUMMARY_PATH = REPO_ROOT / "models" / "generated" / "bench-model-summary.csv"
SITE_OUTPUT_PATH = REPO_ROOT / "site" / "public" / "generated" / "bench-model.json"

ASSEMBLY_ORDER = [
    "plinth",
    "left_module",
    "center_module",
    "right_module",
    "top",
    "miter_station",
    "saw",
    "router",
    "dust",
    "guides",
]

ASSEMBLY_LABELS = {
    "plinth": "Plinth",
    "left_module": "Left Storage Module",
    "center_module": "Center Saw Chassis",
    "right_module": "Right Service Module",
    "top": "Fixed Top",
    "miter_station": "Flip-Top Miter Station",
    "saw": "Table Saw Package",
    "router": "Router Package",
    "dust": "Dust Package",
    "guides": "Guide Geometry",
}

PALETTE = {
    "plinth": "#7c5537",
    "left_module": "#c98f63",
    "center_module": "#b38a69",
    "right_module": "#b2724c",
    "top": "#ead9b7",
    "miter_station": "#d55f42",
    "saw": "#5a7289",
    "router": "#3e6c57",
    "dust": "#7f6489",
    "guides": "#3b4f68",
}


def load_layout() -> dict[str, Any]:
    return json.loads(LAYOUT_PATH.read_text())


def load_cutlist() -> dict[str, dict[str, str]]:
    with CUTLIST_PATH.open(newline="") as handle:
        return {row["part_id"]: row for row in csv.DictReader(handle)}


def load_measurements() -> dict[str, dict[str, str]]:
    with MEASUREMENTS_PATH.open(newline="") as handle:
        return {row["id"]: row for row in csv.DictReader(handle)}


def measurement_value(rows: dict[str, dict[str, str]], row_id: str) -> float:
    value = rows[row_id]["value"]
    if value == "":
        raise ValueError(f"measurement row {row_id} is blank")
    return float(value)


def center_from_position(position: list[float], size: list[float]) -> list[float]:
    return [position[index] + size[index] / 2.0 for index in range(3)]


def horizontal_panel(x: float, y: float, z: float, length: float, depth: float, thickness: float) -> dict[str, list[float]]:
    return {"position": [x, y, z], "size": [length, depth, thickness]}


def upright_x_panel(x: float, y: float, z: float, thickness: float, depth: float, height: float) -> dict[str, list[float]]:
    return {"position": [x, y, z], "size": [thickness, depth, height]}


def upright_y_panel(x: float, y: float, z: float, length: float, thickness: float, height: float) -> dict[str, list[float]]:
    return {"position": [x, y, z], "size": [length, thickness, height]}


def solid_box(x: float, y: float, z: float, length: float, depth: float, height: float) -> dict[str, list[float]]:
    return {"position": [x, y, z], "size": [length, depth, height]}


def extrusion_cutout(x: float, y: float, length: float, depth: float) -> dict[str, Any]:
    return {
        "type": "through_cutout",
        "local_position": [x, y, 0.0],
        "size": [length, depth],
    }


def pocket(x: float, y: float, length: float, depth: float, height: float, color: str = "#27425a") -> dict[str, Any]:
    return {
        "type": "pocket",
        "local_position": [x, y, 0.0],
        "size": [length, depth],
        "depth": height,
        "color": color,
    }


def instance_id(part_id: str, suffix: str | None = None) -> str:
    return part_id if suffix is None else f"{part_id}-{suffix}"


def add_part(
    parts: list[dict[str, Any]],
    cutlist: dict[str, dict[str, str]],
    *,
    part_id: str,
    assembly: str,
    label: str,
    geometry: dict[str, list[float]],
    suffix: str | None = None,
    confidence: str = "high",
    notes: str = "",
    tags: list[str] | None = None,
    exploded_offset: list[float] | None = None,
    features: list[dict[str, Any]] | None = None,
    visibility: dict[str, Any] | None = None,
    part_type: str = "box",
    render_style: str = "solid",
    motion: dict[str, Any] | None = None,
) -> None:
    row = cutlist.get(part_id)
    record = {
        "instance_id": instance_id(part_id, suffix),
        "part_id": part_id,
        "label": label,
        "assembly": assembly,
        "assembly_label": ASSEMBLY_LABELS[assembly],
        "material": row["material"] if row else "derived",
        "color": PALETTE[assembly],
        "confidence": confidence,
        "gate": row["gate"] if row else "derived",
        "notes": " ".join(filter(None, [row["notes"] if row else "", notes])).strip(),
        "tags": tags or [],
        "position": geometry["position"],
        "size": geometry["size"],
        "center": center_from_position(geometry["position"], geometry["size"]),
        "part_type": part_type,
        "render_style": render_style,
        "exploded_offset": exploded_offset or [0.0, 0.0, 0.0],
        "features": features or [],
        "visibility": {"default": True, **(visibility or {})},
        "motion": motion,
    }
    if row:
        record["cutlist"] = {
            "qty": int(row["qty"]),
            "thickness": float(row["thickness"]),
            "rough_l": float(row["rough_l"]),
            "rough_w": float(row["rough_w"]),
            "final_l": float(row["final_l"]),
            "final_w": float(row["final_w"]),
        }
    parts.append(record)


def add_virtual_part(
    parts: list[dict[str, Any]],
    *,
    part_id: str,
    assembly: str,
    label: str,
    geometry: dict[str, list[float]],
    material: str,
    color: str,
    confidence: str = "medium",
    notes: str = "",
    tags: list[str] | None = None,
    exploded_offset: list[float] | None = None,
    visibility: dict[str, Any] | None = None,
    features: list[dict[str, Any]] | None = None,
    part_type: str = "box",
    render_style: str = "context",
    motion: dict[str, Any] | None = None,
) -> None:
    parts.append(
        {
            "instance_id": part_id,
            "part_id": part_id,
            "label": label,
            "assembly": assembly,
            "assembly_label": ASSEMBLY_LABELS[assembly],
            "material": material,
            "color": color,
            "confidence": confidence,
            "gate": "derived",
            "notes": notes,
            "tags": tags or [],
            "position": geometry["position"],
            "size": geometry["size"],
            "center": center_from_position(geometry["position"], geometry["size"]),
            "part_type": part_type,
            "render_style": render_style,
            "exploded_offset": exploded_offset or [0.0, 0.0, 0.0],
            "features": features or [],
            "visibility": {"default": True, **(visibility or {})},
            "motion": motion,
        }
    )


def build_model_spec() -> dict[str, Any]:
    layout = load_layout()
    cutlist = load_cutlist()
    measurements = load_measurements()
    parts: list[dict[str, Any]] = []

    bench = layout["bench"]
    top = bench["top"]
    plinth = bench["plinth"]
    carcass = bench["carcass"]
    modules = {module["name"]: module for module in carcass["modules"]}
    saw = layout["saw"]
    miter_station = layout["miter_station"]
    router = layout["router_module"]
    dust = layout["dust_collection"]

    bench_height = bench["overall"]["height"]
    top_thickness = top["thickness"]
    skin_thickness = 0.75
    top_bottom_z = bench_height - top_thickness
    top_skin_z = top_bottom_z + skin_thickness
    carcass_bottom_z = top_bottom_z - carcass["height"]
    plinth_z = 0.0

    left_module = modules["left_storage"]
    left_partition_x = left_module["x"] + 0.75 + left_module["details"]["vertical_cubby_clear_width"]
    center_module = modules["saw_chassis"]
    right_module = modules["right_service"]
    right_partition_x = dust["dust_bay"]["x"]
    right_panel_inner_x = right_module["x"] + 0.75

    miter_public_width = measurement_value(measurements, "miter_saw_stowed_width")
    miter_public_depth = measurement_value(measurements, "miter_saw_stowed_depth")
    miter_public_height = measurement_value(measurements, "miter_saw_stowed_height")
    saw_body_height = measurement_value(measurements, "saw_body_height")
    saw_mount_plane_height = measurement_value(measurements, "saw_mount_plane_height")
    dust_clearance = measurement_value(measurements, "internal_extractor_hose_clearance")

    # Plinth
    add_part(parts, cutlist, part_id="PL-01", suffix="front", assembly="plinth", label="Front plinth rail", geometry=upright_y_panel(plinth["x"], plinth["y"], plinth_z, 84.0, 1.5, 3.5), exploded_offset=[0.0, -1.2, 0.0])
    add_part(parts, cutlist, part_id="PL-01", suffix="rear", assembly="plinth", label="Rear plinth rail", geometry=upright_y_panel(plinth["x"], plinth["y"] + plinth["depth"] - 1.5, plinth_z, 84.0, 1.5, 3.5), exploded_offset=[0.0, 1.2, 0.0])
    add_part(parts, cutlist, part_id="PL-02", suffix="left", assembly="plinth", label="Left plinth rail", geometry=upright_x_panel(plinth["x"], plinth["y"] + 1.5, plinth_z, 1.5, 36.0, 3.5), exploded_offset=[-1.2, 0.0, 0.0])
    add_part(parts, cutlist, part_id="PL-02", suffix="right", assembly="plinth", label="Right plinth rail", geometry=upright_x_panel(plinth["x"] + plinth["length"] - 1.5, plinth["y"] + 1.5, plinth_z, 1.5, 36.0, 3.5), exploded_offset=[1.2, 0.0, 0.0])
    for index, x in enumerate([19.5, 38.5, 57.5, 76.5], start=1):
        add_part(parts, cutlist, part_id="PL-03", suffix=str(index), assembly="plinth", label=f"Plinth crossmember {index}", geometry=upright_y_panel(x, plinth["y"] + 1.5, plinth_z, 36.0, 1.5, 3.5), exploded_offset=[0.0, 0.0, 0.8])
    for suffix, x, y in [
        ("front-left", plinth["x"], plinth["y"]),
        ("front-right", plinth["x"] + plinth["length"] - 7.0, plinth["y"]),
        ("rear-left", plinth["x"], plinth["y"] + plinth["depth"] - 5.5),
        ("rear-right", plinth["x"] + plinth["length"] - 7.0, plinth["y"] + plinth["depth"] - 5.5),
    ]:
        add_part(parts, cutlist, part_id="PL-04", suffix=suffix, assembly="plinth", label=f"Caster block {suffix}", geometry=solid_box(x, y, plinth_z, 7.0, 5.5, 1.5), exploded_offset=[0.0, 0.0, -0.4])

    # Left module
    left_outer_right_x = left_module["x"] + left_module["length"] - 0.75
    add_part(parts, cutlist, part_id="LM-01", suffix="left", assembly="left_module", label="Left module outer side", geometry=upright_x_panel(left_module["x"], left_module["y"], carcass_bottom_z, 0.75, left_module["depth"], left_module["height"]), exploded_offset=[-1.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="LM-01", suffix="right", assembly="left_module", label="Left module seam side", geometry=upright_x_panel(left_outer_right_x, left_module["y"], carcass_bottom_z, 0.75, left_module["depth"], left_module["height"]), exploded_offset=[1.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="LM-02", assembly="left_module", label="Left cubby partition", geometry=upright_x_panel(left_partition_x, left_module["y"], carcass_bottom_z, 0.75, left_module["depth"], left_module["height"]), exploded_offset=[0.0, 0.0, 1.2], notes="Placed from the documented 7.5 in clear cubby width.")
    add_part(parts, cutlist, part_id="LM-03", assembly="left_module", label="Left module bottom deck", geometry=horizontal_panel(left_module["x"] + 0.75, left_module["y"], carcass_bottom_z, 26.25, left_module["depth"], 0.75), exploded_offset=[0.0, 0.0, 1.0])
    add_part(parts, cutlist, part_id="LM-04", suffix="front", assembly="left_module", label="Left top front stretcher", geometry=upright_y_panel(left_module["x"] + 0.75, left_module["y"], carcass_bottom_z + left_module["height"] - 4.0, 26.25, 0.75, 4.0), exploded_offset=[0.0, -0.8, 0.8])
    add_part(parts, cutlist, part_id="LM-04", suffix="rear", assembly="left_module", label="Left top rear stretcher", geometry=upright_y_panel(left_module["x"] + 0.75, left_module["y"] + left_module["depth"] - 0.75, carcass_bottom_z + left_module["height"] - 4.0, 26.25, 0.75, 4.0), exploded_offset=[0.0, 0.8, 0.8])
    add_part(parts, cutlist, part_id="LM-05", assembly="left_module", label="Left module back panel", geometry=upright_y_panel(left_module["x"], left_module["y"] + left_module["depth"] - 0.5, carcass_bottom_z, left_module["length"], 0.5, left_module["height"]), exploded_offset=[0.0, 1.0, 0.0], notes="Shown as a screw-on squaring panel.")
    for index, z in enumerate([13.25, 21.5], start=1):
        add_part(parts, cutlist, part_id="LM-06", suffix=str(index), assembly="left_module", label=f"Vertical cubby shelf {index}", geometry=horizontal_panel(left_module["x"] + 0.75, left_module["y"] + 0.75, z, 8.0, 40.5, 0.75), exploded_offset=[0.0, 0.0, 0.9])
    for drawer_id, y, z in [("top", 3.75, 7.0), ("mid", 3.75, 14.5), ("bottom", 3.75, 23.0)]:
        add_virtual_part(parts, part_id=f"drawer-envelope-{drawer_id}", assembly="left_module", label=f"{drawer_id.title()} drawer envelope", geometry=solid_box(left_partition_x + 0.75, left_module["y"] + 2.0, z, 18.0, 19.5, 4.0 if drawer_id == "top" else 6.0 if drawer_id == "mid" else 8.0), material="drawer envelope", color="#d1a17d", confidence="medium", notes="Drawer envelope only. The viewer does not decompose every drawer side and bottom part.", exploded_offset=[0.0, -1.0, 0.0], render_style="context")

    # Center module
    center_outer_right_x = center_module["x"] + center_module["length"] - 0.75
    add_part(parts, cutlist, part_id="CM-01", suffix="left", assembly="center_module", label="Center module left side", geometry=upright_x_panel(center_module["x"], center_module["y"], carcass_bottom_z, 0.75, center_module["depth"], center_module["height"]), exploded_offset=[-1.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="CM-01", suffix="right", assembly="center_module", label="Center module right side", geometry=upright_x_panel(center_outer_right_x, center_module["y"], carcass_bottom_z, 0.75, center_module["depth"], center_module["height"]), exploded_offset=[1.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="CM-02", suffix="front", assembly="center_module", label="Center upper front stretcher", geometry=upright_y_panel(center_module["x"] + 0.75, center_module["y"], carcass_bottom_z + center_module["height"] - 4.0, 29.0, 0.75, 4.0), exploded_offset=[0.0, -0.8, 0.9])
    add_part(parts, cutlist, part_id="CM-02", suffix="rear", assembly="center_module", label="Center upper rear stretcher", geometry=upright_y_panel(center_module["x"] + 0.75, center_module["y"] + center_module["depth"] - 0.75, carcass_bottom_z + center_module["height"] - 4.0, 29.0, 0.75, 4.0), exploded_offset=[0.0, 0.8, 0.9])
    add_part(parts, cutlist, part_id="CM-03", suffix="front", assembly="center_module", label="Center lower front stretcher", geometry=upright_y_panel(center_module["x"] + 0.75, center_module["y"], carcass_bottom_z + 6.0, 29.0, 0.75, 6.0), exploded_offset=[0.0, -0.8, -0.8])
    add_part(parts, cutlist, part_id="CM-03", suffix="rear", assembly="center_module", label="Center lower rear stretcher", geometry=upright_y_panel(center_module["x"] + 0.75, center_module["y"] + center_module["depth"] - 0.75, carcass_bottom_z + 6.0, 29.0, 0.75, 6.0), exploded_offset=[0.0, 0.8, -0.8])
    add_part(parts, cutlist, part_id="CM-04", suffix="left", assembly="center_module", label="Left saw ledger", geometry=upright_x_panel(center_module["x"] + 0.75, center_module["y"] + 6.5, saw_mount_plane_height - 1.75, 1.5, 29.0, 3.5), exploded_offset=[-0.8, 0.0, 0.5], notes="Nominal ledger height only. Final saw flushness is still jack-screw tuned.")
    add_part(parts, cutlist, part_id="CM-04", suffix="right", assembly="center_module", label="Right saw ledger", geometry=upright_x_panel(center_module["x"] + center_module["length"] - 2.25, center_module["y"] + 6.5, saw_mount_plane_height - 1.75, 1.5, 29.0, 3.5), exploded_offset=[0.8, 0.0, 0.5], notes="Nominal ledger height only. Final saw flushness is still jack-screw tuned.")
    add_part(parts, cutlist, part_id="CM-05", suffix="front", assembly="center_module", label="Front deck support", geometry=upright_y_panel(center_module["x"] + 3.25, center_module["y"] + 10.0, saw_mount_plane_height - 1.75, 24.0, 1.5, 3.5), exploded_offset=[0.0, -0.8, 0.3])
    add_part(parts, cutlist, part_id="CM-05", suffix="rear", assembly="center_module", label="Rear deck support", geometry=upright_y_panel(center_module["x"] + 3.25, center_module["y"] + 28.5, saw_mount_plane_height - 1.75, 24.0, 1.5, 3.5), exploded_offset=[0.0, 0.8, 0.3])
    add_part(parts, cutlist, part_id="CM-06", assembly="center_module", label="Adjustable saw mounting deck", geometry=horizontal_panel(center_module["x"] + 1.25, center_module["y"] + 9.0, saw_mount_plane_height, 28.0, 24.0, 0.75), confidence="medium", notes="Final bolt pattern is transfer-fit from the real saw only after flush tuning.", exploded_offset=[0.0, 0.0, 1.5])

    # Right module
    add_part(parts, cutlist, part_id="RM-01", suffix="left", assembly="right_module", label="Right module seam side", geometry=upright_x_panel(right_module["x"], right_module["y"], carcass_bottom_z, 0.75, right_module["depth"], right_module["height"]), exploded_offset=[-1.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="RM-01", suffix="right", assembly="right_module", label="Right module outer side", geometry=upright_x_panel(right_module["x"] + right_module["length"] - 0.75, right_module["y"], carcass_bottom_z, 0.75, right_module["depth"], right_module["height"]), exploded_offset=[1.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="RM-02", assembly="right_module", label="Dust partition", geometry=upright_x_panel(right_partition_x, right_module["y"], carcass_bottom_z, 0.75, right_module["depth"], right_module["height"]), notes="Upper notches are modeled from the current layout contract and remain service-layout dependent.", exploded_offset=[0.0, 0.0, 1.2], features=[pocket(0.0, 0.0, 0.75, 8.0, 8.0, "#6d93af"), pocket(0.0, 30.0, 0.75, 8.0, 8.0, "#6d93af")])
    add_part(parts, cutlist, part_id="RM-03", assembly="right_module", label="Dust-bay floor", geometry=horizontal_panel(dust["dust_bay"]["x"], dust["dust_bay"]["y"], carcass_bottom_z, dust["dust_bay"]["length"], dust["dust_bay"]["depth"], 0.75), exploded_offset=[0.0, 0.0, 1.0])
    add_part(parts, cutlist, part_id="RM-04", suffix="front", assembly="right_module", label="Right upper front stretcher", geometry=upright_y_panel(right_panel_inner_x, right_module["y"], carcass_bottom_z + right_module["height"] - 4.0, 26.5, 0.75, 4.0), exploded_offset=[0.0, -0.8, 0.9])
    add_part(parts, cutlist, part_id="RM-04", suffix="rear", assembly="right_module", label="Right upper rear stretcher", geometry=upright_y_panel(right_panel_inner_x, right_module["y"] + right_module["depth"] - 0.75, carcass_bottom_z + right_module["height"] - 4.0, 26.5, 0.75, 4.0), exploded_offset=[0.0, 0.8, 0.9])
    add_part(parts, cutlist, part_id="RM-05", assembly="right_module", label="Right module back panel", geometry=upright_y_panel(right_module["x"], right_module["y"] + right_module["depth"] - 0.5, carcass_bottom_z, right_module["length"], 0.5, right_module["height"]), exploded_offset=[0.0, 1.0, 0.0], notes="Shown as a template-backed service panel. Final cutouts still follow the mockup.")
    add_part(parts, cutlist, part_id="RM-06", assembly="right_module", label="Dust-service face blank", geometry=upright_y_panel(dust["dust_bay"]["x"], right_module["y"], carcass_bottom_z + 2.0, 20.0, 0.75, 28.0), exploded_offset=[0.0, -5.0, 0.0], confidence="medium", notes="Still a blank at this stage. Transfer real reliefs only after the right-bay mockup passes.")
    add_part(parts, cutlist, part_id="RM-07", assembly="right_module", label="Router access hatch", geometry=upright_x_panel(right_module["x"] + right_module["length"] - 0.75, right_module["y"] + 15.0, carcass_bottom_z + 15.0, 0.75, 12.0, 10.0), exploded_offset=[2.0, 0.0, 0.0])
    add_part(parts, cutlist, part_id="RM-08", assembly="right_module", label="Extractor low-deck blank", geometry=horizontal_panel(dust["dust_bay"]["packages"][1]["x"] - 0.125, dust["dust_bay"]["packages"][1]["y"], carcass_bottom_z + 0.75, 24.0, 19.0, 0.75), confidence="medium", exploded_offset=[0.0, 2.0, 0.8], notes="Template-fit platform. Final pad stack and stance are mockup-driven.")
    add_part(parts, cutlist, part_id="RM-09", suffix="lower", assembly="right_module", label="Lower service-face cleat", geometry=upright_y_panel(dust["dust_bay"]["x"], right_module["y"] + 0.75, carcass_bottom_z + 2.0, 20.0, 0.75, 1.5), exploded_offset=[0.0, -4.0, 0.0])
    add_part(parts, cutlist, part_id="RM-09", suffix="upper", assembly="right_module", label="Upper service-face cleat", geometry=upright_y_panel(dust["dust_bay"]["x"], right_module["y"] + 0.75, carcass_bottom_z + 28.5, 20.0, 0.75, 1.5), exploded_offset=[0.0, -4.0, 0.0])
    control_subpanel = right_module["details"]["control_subpanel"]
    add_part(parts, cutlist, part_id="RM-10", assembly="right_module", label="Removable control subpanel blank", geometry=upright_y_panel(right_module["x"] + control_subpanel["x_from_left"], right_module["y"] - 0.75, carcass_bottom_z + control_subpanel["y_from_bottom"], control_subpanel["width"], 0.75, control_subpanel["height"]), exploded_offset=[0.0, -6.0, 0.0], confidence="medium", notes="Hole pattern and hose dock remain mockup-transferred.")

    # Top
    split_y = top["panelization"]["split_y"]
    openings = {opening["name"]: opening for opening in top["openings"]}
    add_part(parts, cutlist, part_id="TOP-01A", assembly="top", label="Rear top substrate", geometry=horizontal_panel(0.0, split_y, top_bottom_z, 90.0, 33.0, 0.75), part_type="horizontal_panel", features=[extrusion_cutout(openings["saw_opening"]["x"], openings["saw_opening"]["y"] - split_y, openings["saw_opening"]["length"], openings["saw_opening"]["depth"]), extrusion_cutout(openings["router_plate_opening"]["x"], openings["router_plate_opening"]["y"] - split_y, openings["router_plate_opening"]["length"], openings["router_plate_opening"]["depth"])], exploded_offset=[0.0, 0.0, 4.0], notes="Carries the saw-opening front shoulder clear of the front-panel seam.")
    add_part(parts, cutlist, part_id="TOP-02A", assembly="top", label="Rear top wear skin", geometry=horizontal_panel(0.0, split_y, top_skin_z, 90.0, 33.0, 0.75), part_type="horizontal_panel", features=[extrusion_cutout(openings["saw_opening"]["x"], openings["saw_opening"]["y"] - split_y, openings["saw_opening"]["length"], openings["saw_opening"]["depth"]), extrusion_cutout(openings["router_plate_opening"]["x"], openings["router_plate_opening"]["y"] - split_y, openings["router_plate_opening"]["length"], openings["router_plate_opening"]["depth"]), pocket(openings["router_plate_opening"]["x"], openings["router_plate_opening"]["y"] - split_y, openings["router_plate_opening"]["length"], openings["router_plate_opening"]["depth"], router["plate_opening"]["recess_depth"], "#395f8a")], exploded_offset=[0.0, 0.0, 5.4], notes="Prefinished wear layer. Final openings still wait for field-led machining.")
    add_part(parts, cutlist, part_id="TOP-01B", assembly="top", label="Front-left top substrate", geometry=horizontal_panel(0.0, 0.0, top_bottom_z, 59.75, split_y, 0.75), part_type="horizontal_panel", features=[extrusion_cutout(openings["miter_station_opening"]["x"], openings["miter_station_opening"]["y"], openings["miter_station_opening"]["length"], openings["miter_station_opening"]["depth"])], exploded_offset=[0.0, 0.0, 4.0])
    add_part(parts, cutlist, part_id="TOP-02B", assembly="top", label="Front-left top wear skin", geometry=horizontal_panel(0.0, 0.0, top_skin_z, 59.75, split_y, 0.75), part_type="horizontal_panel", features=[extrusion_cutout(openings["miter_station_opening"]["x"], openings["miter_station_opening"]["y"], openings["miter_station_opening"]["length"], openings["miter_station_opening"]["depth"])], exploded_offset=[0.0, 0.0, 5.4])
    add_part(parts, cutlist, part_id="TOP-01C", assembly="top", label="Front-right top substrate", geometry=horizontal_panel(59.75, 0.0, top_bottom_z, 30.25, split_y, 0.75), exploded_offset=[0.0, 0.0, 4.0])
    add_part(parts, cutlist, part_id="TOP-02C", assembly="top", label="Front-right top wear skin", geometry=horizontal_panel(59.75, 0.0, top_skin_z, 30.25, split_y, 0.75), exploded_offset=[0.0, 0.0, 5.4])

    router_opening = openings["router_plate_opening"]
    for suffix, x, y, length, depth in [
        ("north", router_opening["x"] - 1.125, router_opening["y"] - 2.0, 14.0, 2.0),
        ("south", router_opening["x"] - 1.125, router_opening["y"] + router_opening["depth"], 14.0, 2.0),
        ("west", router_opening["x"] - 2.0, router_opening["y"] - 0.375, 2.0, 14.0),
        ("east", router_opening["x"] + router_opening["length"], router_opening["y"] - 0.375, 2.0, 14.0),
    ]:
        add_part(parts, cutlist, part_id="TOP-03", suffix=suffix, assembly="top", label=f"Router ledger {suffix}", geometry=horizontal_panel(x, y, top_bottom_z - 0.75, length, depth, 0.75), exploded_offset=[0.0, 0.0, 1.8])

    for suffix, x, y, length, depth in [
        ("front-left-seam", 18.0, split_y - 4.0, 20.0, 4.0),
        ("front-right-seam", 60.0, split_y - 4.0, 20.0, 4.0),
        ("miter-left", openings["miter_station_opening"]["x"] - 4.0, 8.0, 4.0, 20.0),
        ("miter-right", openings["miter_station_opening"]["x"] + openings["miter_station_opening"]["length"], 8.0, 4.0, 20.0),
    ]:
        add_part(parts, cutlist, part_id="TOP-04", suffix=suffix, assembly="top", label=f"Top seam or bay cleat {suffix}", geometry=horizontal_panel(x, y, top_bottom_z - 0.75, length, depth, 0.75), exploded_offset=[0.0, 0.0, 1.3])

    for suffix, x, y in [("front", 6.0, 6.5), ("rear", 6.0, 39.0)]:
        add_part(parts, cutlist, part_id="TOP-05", suffix=suffix, assembly="top", label=f"Under-top stiffener {suffix}", geometry=horizontal_panel(x, y, top_bottom_z - 0.75, 41.25, 3.0, 0.75), exploded_offset=[0.0, 0.0, 1.4])

    for suffix, x, y in [("left-front", 4.0, 10.0), ("left-rear", 4.0, 38.0), ("right-front", 52.0, 10.0), ("right-rear", 52.0, 38.0)]:
        add_part(parts, cutlist, part_id="TOP-06", suffix=suffix, assembly="top", label=f"Overlay backing pad {suffix}", geometry=horizontal_panel(x, y, top_bottom_z - 0.75, 4.0, 4.0, 0.75), exploded_offset=[0.0, 0.0, 1.2])

    # Miter station
    pivot_origin = [miter_station["center_x"], miter_station["opening"]["depth"], top_skin_z + 0.375]
    flip_motion = {
        "type": "hinge",
        "axis": [1.0, 0.0, 0.0],
        "origin": pivot_origin,
        "stowed_angle_deg": 0.0,
        "deployed_angle_deg": 180.0,
    }
    add_part(parts, cutlist, part_id="MS-01", assembly="miter_station", label="Flip-top tray deck", geometry=horizontal_panel(miter_station["opening"]["x"], miter_station["opening"]["y"], top_bottom_z, 22.0, 12.0, 0.75), exploded_offset=[0.0, 0.0, 1.5], motion=flip_motion)
    add_part(parts, cutlist, part_id="MS-04", assembly="miter_station", label="Stowed cover panel", geometry=horizontal_panel(miter_station["opening"]["x"], miter_station["opening"]["y"], top_skin_z, 22.0, 12.0, 0.75), exploded_offset=[0.0, 0.0, 1.8], motion=flip_motion)
    add_part(parts, cutlist, part_id="MS-02", suffix="left", assembly="miter_station", label="Tray side wall left", geometry=upright_x_panel(miter_station["opening"]["x"], 0.0, top_bottom_z - 10.0, 0.75, 12.0, 10.0), exploded_offset=[-1.0, 0.0, 0.0], motion=flip_motion)
    add_part(parts, cutlist, part_id="MS-02", suffix="right", assembly="miter_station", label="Tray side wall right", geometry=upright_x_panel(miter_station["opening"]["x"] + 21.25, 0.0, top_bottom_z - 10.0, 0.75, 12.0, 10.0), exploded_offset=[1.0, 0.0, 0.0], motion=flip_motion)
    add_part(parts, cutlist, part_id="MS-03", suffix="front", assembly="miter_station", label="Tray front rail", geometry=upright_y_panel(miter_station["opening"]["x"] + 0.5, 0.0, top_bottom_z - 3.0, 21.0, 0.75, 3.0), exploded_offset=[0.0, -1.0, 0.0], motion=flip_motion)
    add_part(parts, cutlist, part_id="MS-03", suffix="rear", assembly="miter_station", label="Tray rear rail", geometry=upright_y_panel(miter_station["opening"]["x"] + 0.5, 11.25, top_bottom_z - 3.0, 21.0, 0.75, 3.0), exploded_offset=[0.0, 1.0, 0.0], motion=flip_motion)
    add_part(parts, cutlist, part_id="MS-05", assembly="miter_station", label="Left support fence face", geometry=upright_y_panel(0.0, miter_station["fence_line"]["y"], top_skin_z, 34.0, 0.75, 4.0), exploded_offset=[0.0, 0.0, 1.3], notes="Final stop-track line is still field-fit from the real deployed saw.")
    add_part(parts, cutlist, part_id="MS-06", assembly="miter_station", label="Right support fence face", geometry=upright_y_panel(56.0, miter_station["fence_line"]["y"], top_skin_z, 34.0, 0.75, 4.0), exploded_offset=[0.0, 0.0, 1.3], notes="Final stop-track line is still field-fit from the real deployed saw.")
    add_part(parts, cutlist, part_id="FT-01", suffix="left", assembly="miter_station", label="Left pivot side plate", geometry=upright_x_panel(miter_station["opening"]["x"] - 0.75, 0.0, top_bottom_z - 12.0, 0.75, 12.0, 12.0), exploded_offset=[-1.2, 0.0, 0.0])
    add_part(parts, cutlist, part_id="FT-01", suffix="right", assembly="miter_station", label="Right pivot side plate", geometry=upright_x_panel(miter_station["opening"]["x"] + 22.0, 0.0, top_bottom_z - 12.0, 0.75, 12.0, 12.0), exploded_offset=[1.2, 0.0, 0.0])
    add_part(parts, cutlist, part_id="FT-02", suffix="left", assembly="miter_station", label="Left latch block", geometry=solid_box(35.5, 9.0, top_bottom_z - 2.0, 4.0, 4.0, 0.75), exploded_offset=[0.0, 0.0, 0.6])
    add_part(parts, cutlist, part_id="FT-02", suffix="right", assembly="miter_station", label="Right latch block", geometry=solid_box(50.5, 9.0, top_bottom_z - 2.0, 4.0, 4.0, 0.75), exploded_offset=[0.0, 0.0, 0.6])
    add_part(parts, cutlist, part_id="FT-03", suffix="left", assembly="miter_station", label="Left deployed hard stop", geometry=solid_box(36.0, 10.5, top_bottom_z - 6.0, 6.0, 3.0, 0.75), exploded_offset=[0.0, 0.0, 0.6])
    add_part(parts, cutlist, part_id="FT-03", suffix="right", assembly="miter_station", label="Right deployed hard stop", geometry=solid_box(48.0, 10.5, top_bottom_z - 6.0, 6.0, 3.0, 0.75), exploded_offset=[0.0, 0.0, 0.6])

    miter_envelope_x = miter_station["center_x"] - miter_public_width / 2.0
    add_virtual_part(parts, part_id="miter-saw-envelope", assembly="miter_station", label="DeWALT DCS781 public envelope", geometry=solid_box(miter_envelope_x, 6.0 - (miter_public_depth / 2.0), top_skin_z - miter_public_height, miter_public_width, miter_public_depth, miter_public_height), material="public envelope", color="#d9a84e", confidence="medium", notes="Public DCS781 sanity envelope only. Real tray fit, bolt transfer, and shimming still happen from the actual saw.", exploded_offset=[0.0, 0.0, 2.0], visibility={"deployed_only": True}, render_style="context", motion=flip_motion)

    # Saw package
    cast_top = saw["cast_top"]
    add_virtual_part(parts, part_id="saw-cast-top", assembly="saw", label="SKIL cast top", geometry=solid_box(cast_top["x"], cast_top["y"], bench_height - 1.5, cast_top["length"], cast_top["depth"], 1.5), material="cast aluminum envelope", color="#66788b", confidence="medium", notes="Field-fit target for the real saw opening.", exploded_offset=[0.0, 0.0, 1.0], render_style="context")
    add_virtual_part(parts, part_id="saw-body-envelope", assembly="saw", label="Saw body envelope", geometry=solid_box(cast_top["x"] + 1.0, cast_top["y"] + 1.0, saw_mount_plane_height, cast_top["length"] - 2.0, cast_top["depth"] - 2.0, saw_body_height), material="body envelope", color="#516476", confidence="medium", notes="Body depth is simplified for visualization. Final interference work still uses the real saw.", exploded_offset=[0.0, 0.0, 1.4], render_style="context")
    rail = saw["rail_envelope"]
    add_virtual_part(parts, part_id="front-rail", assembly="saw", label="Front rail envelope", geometry=solid_box(rail["x"], rail["y"], bench_height - 1.0, rail["length"], 1.0, 1.0), material="rail envelope", color="#7f92a6", confidence="medium", exploded_offset=[0.0, -0.6, 0.0], render_style="context")
    add_virtual_part(parts, part_id="rear-rail", assembly="saw", label="Rear rail envelope", geometry=solid_box(rail["x"], rail["y"] + rail["depth"] - 1.0, bench_height - 1.0, rail["length"], 1.0, 1.0), material="rail envelope", color="#7f92a6", confidence="medium", exploded_offset=[0.0, 0.6, 0.0], render_style="context")

    # Router
    plate = router["plate_opening"]
    add_virtual_part(parts, part_id="router-plate", assembly="router", label="JessEm router plate", geometry=solid_box(plate["center_x"] - plate["length"] / 2.0, plate["center_y"] - plate["depth"] / 2.0, bench_height - plate["recess_depth"], plate["length"], plate["depth"], 0.375), material="lift plate", color="#395f8a", confidence="high", notes="Plate size from the current router contract.", exploded_offset=[0.0, 0.0, 1.0], render_style="solid")
    add_virtual_part(parts, part_id="router-motor-envelope", assembly="router", label="Router motor envelope", geometry=solid_box(plate["center_x"] - 2.0, plate["center_y"] - 2.0, top_bottom_z - 8.5, 4.0, 4.0, 8.5), material="motor envelope", color="#2f5b4b", confidence="medium", notes="Simplified motor envelope below the lift plate.", exploded_offset=[0.0, 0.0, 1.5], render_style="context")
    add_virtual_part(parts, part_id="router-fence-zone", assembly="router", label="Router fence zone", geometry=solid_box(router["fence_mount_zone"]["x"], router["fence_mount_zone"]["y"], bench_height + 0.05, router["fence_mount_zone"]["length"], router["fence_mount_zone"]["depth"], 0.2), material="guide zone", color="#63a884", confidence="medium", notes="Reserved zone for the removable router fence.", exploded_offset=[0.0, 0.0, 0.4], visibility={"default": False, "guides": True}, render_style="guide")

    # Dust package
    for package in dust["dust_bay"]["packages"]:
        color = "#ad86bf" if "low_pro" in package["name"] else "#8668a0"
        label = "Low-Pro bucket package" if "low_pro" in package["name"] else "Hercules extractor envelope"
        notes = "Mockup-gated service package." if "extractor" in package["name"] else "Front bucket package in the current service sequence."
        add_virtual_part(parts, part_id=package["name"], assembly="dust", label=label, geometry=solid_box(package["x"], package["y"], carcass_bottom_z + 0.75, package["length"], package["depth"], package["height"]), material="dust package envelope", color=color, confidence="medium", notes=notes, exploded_offset=[0.0, 2.0 if "low_pro" in package["name"] else 3.5, 0.0], render_style="context")
    extractor_headroom = dust["dust_bay"]["height"] - dust["dust_bay"]["packages"][1]["deck_or_tray_elevation"] - dust["dust_bay"]["packages"][1]["height"] - dust_clearance
    add_virtual_part(parts, part_id="dust-bay-envelope", assembly="dust", label="Right-bay package envelope", geometry=solid_box(dust["dust_bay"]["x"], dust["dust_bay"]["y"], carcass_bottom_z, dust["dust_bay"]["length"], dust["dust_bay"]["depth"], dust["dust_bay"]["height"]), material="bay envelope", color="#6f5a7c", confidence="medium", notes=f"Modeled extractor headroom is only {extractor_headroom:.2f} in above the current Hercules body. Keep this behind mockup proof.", exploded_offset=[0.0, 0.0, 0.0], visibility={"default": False, "guides": True}, render_style="guide")

    # Guides
    for lane in saw["under_top_keep_clear"]:
        add_virtual_part(parts, part_id=lane["name"], assembly="guides", label=lane["name"].replace("_", " ").title(), geometry=solid_box(lane["x"], lane["y"], plinth["height"], lane["length"], lane["depth"], top_bottom_z - plinth["height"] - 2.0), material="keep-clear lane", color="#567292", confidence="medium", notes=lane["notes"], visibility={"default": False, "guides": True}, render_style="guide")
    add_virtual_part(parts, part_id="miter-station-envelope", assembly="guides", label="Deployed miter-station envelope", geometry=solid_box(miter_station["deployed_envelope"]["x"], miter_station["deployed_envelope"]["y"], top_bottom_z - 1.0, miter_station["deployed_envelope"]["length"], miter_station["deployed_envelope"]["depth"], 23.0), material="guide envelope", color="#d17c54", confidence="medium", notes=miter_station["deployed_envelope"]["notes"], visibility={"default": False, "guides": True}, render_style="guide")
    add_virtual_part(parts, part_id="left-support-surface", assembly="guides", label="Left miter support span", geometry=solid_box(miter_station["support_surfaces"]["left"]["x"], 0.0, bench_height + 0.02, miter_station["support_surfaces"]["left"]["length"], 12.0, 0.18), material="support surface", color="#dba96b", confidence="medium", notes="Available support surface when the station is deployed.", visibility={"default": False, "guides": True}, render_style="guide")
    add_virtual_part(parts, part_id="right-support-surface", assembly="guides", label="Right miter support span", geometry=solid_box(miter_station["support_surfaces"]["right"]["x"], 0.0, bench_height + 0.02, miter_station["support_surfaces"]["right"]["length"], 12.0, 0.18), material="support surface", color="#dba96b", confidence="medium", notes="Support span is counted with the router fence removed.", visibility={"default": False, "guides": True}, render_style="guide")

    assumptions = [
        "The viewer is generated from the current fixed-top build package and is intended to explain assembly and fit sequencing, not replace field-fit steps.",
        "The table-saw cast top and lower body are simplified envelopes. Final opening reliefs, bolt holes, and underside conflicts still come from the actual saw during fit-up.",
        "The miter-station flip-top uses the accepted public DCS781 envelope. The automated site model does not claim that real tray fit, shimming, or bolt transfer are already complete.",
        "The right-bay dust package remains mockup-gated. The envelopes are there to show service order and crowding, not to imply that the package is already shop-proven.",
        "Small hardware, drawer joinery, and every fastener are intentionally abstracted. The site focuses on the build sequence, access, and spatial logic first.",
    ]

    presets = {
        "assembled": {
            "label": "Whole bench",
            "visible_assemblies": ["plinth", "left_module", "center_module", "right_module", "top", "miter_station", "saw", "router", "dust"],
            "camera_position": [119.0, -32.0, 76.0],
            "target": [45.0, 22.0, 18.0],
            "exploded": 0.0,
            "deployed": False,
            "show_guides": False,
        },
        "plinth": {
            "label": "Plinth build",
            "visible_assemblies": ["plinth"],
            "camera_position": [81.0, -26.0, 33.0],
            "target": [45.0, 24.0, 2.0],
            "exploded": 0.2,
            "deployed": False,
            "show_guides": False,
        },
        "left_module": {
            "label": "Left module",
            "visible_assemblies": ["plinth", "left_module"],
            "camera_position": [37.0, -28.0, 53.0],
            "target": [15.0, 23.0, 18.0],
            "exploded": 0.22,
            "deployed": False,
            "show_guides": False,
        },
        "saw_chassis": {
            "label": "Saw chassis",
            "visible_assemblies": ["plinth", "center_module", "saw"],
            "camera_position": [60.0, -22.0, 58.0],
            "target": [44.0, 24.0, 18.0],
            "exploded": 0.28,
            "deployed": False,
            "show_guides": True,
        },
        "right_service": {
            "label": "Right service bay",
            "visible_assemblies": ["plinth", "right_module", "dust", "router"],
            "camera_position": [104.0, -16.0, 57.0],
            "target": [74.0, 25.0, 18.0],
            "exploded": 0.24,
            "deployed": False,
            "show_guides": True,
        },
        "carcass_alignment": {
            "label": "Joined carcass",
            "visible_assemblies": ["plinth", "left_module", "center_module", "right_module"],
            "camera_position": [121.0, -26.0, 66.0],
            "target": [45.0, 24.0, 16.0],
            "exploded": 0.1,
            "deployed": False,
            "show_guides": False,
        },
        "top_panels": {
            "label": "Top subassembly",
            "visible_assemblies": ["top", "guides"],
            "camera_position": [118.0, 12.0, 95.0],
            "target": [45.0, 24.0, 34.5],
            "exploded": 0.35,
            "deployed": False,
            "show_guides": True,
        },
        "table_saw_fit": {
            "label": "Table saw fit",
            "visible_assemblies": ["top", "center_module", "saw", "guides"],
            "camera_position": [84.0, -18.0, 67.0],
            "target": [38.0, 28.0, 26.0],
            "exploded": 0.14,
            "deployed": False,
            "show_guides": True,
        },
        "miter_station": {
            "label": "Miter station",
            "visible_assemblies": ["top", "miter_station", "guides"],
            "camera_position": [44.0, -36.0, 58.0],
            "target": [45.0, 8.0, 31.0],
            "exploded": 0.22,
            "deployed": True,
            "show_guides": True,
        },
        "top_machining": {
            "label": "Top machining",
            "visible_assemblies": ["top", "saw", "router", "guides"],
            "camera_position": [106.0, 6.0, 92.0],
            "target": [47.0, 23.0, 34.0],
            "exploded": 0.18,
            "deployed": False,
            "show_guides": True,
        },
        "router_zone": {
            "label": "Router zone",
            "visible_assemblies": ["top", "right_module", "router", "guides"],
            "camera_position": [111.0, -4.0, 62.0],
            "target": [79.0, 24.0, 29.0],
            "exploded": 0.16,
            "deployed": False,
            "show_guides": True,
        },
        "dust_service": {
            "label": "Dust service",
            "visible_assemblies": ["right_module", "dust", "guides"],
            "camera_position": [111.0, -14.0, 55.0],
            "target": [75.0, 25.0, 14.0],
            "exploded": 0.42,
            "deployed": False,
            "show_guides": True,
        },
        "final_walkthrough": {
            "label": "Final walkthrough",
            "visible_assemblies": ["plinth", "left_module", "center_module", "right_module", "top", "miter_station", "saw", "router", "dust"],
            "camera_position": [124.0, -28.0, 78.0],
            "target": [45.0, 24.0, 20.0],
            "exploded": 0.0,
            "deployed": False,
            "show_guides": False,
        },
    }

    return {
        "metadata": {
            "name": "Fixed-Top Bench Atlas Model",
            "units": "in",
            "source_branch": "codex/instructions-site-3d-model",
            "generated_from": [
                "data/layout.json",
                "data/measurements.csv",
                "plans/cut-list-final.csv",
                "plans/assembly.md",
                "plans/miter-station.md",
                "plans/right-bay-mockup.md",
                "plans/saw-cradle.md",
                "plans/top-build.md",
            ],
            "overall_bounds": {
                "min": [0.0, 0.0, 0.0],
                "max": [90.0, 48.0, 56.0],
            },
            "assumptions": assumptions,
            "presets": presets,
            "precision_ready_policy": miter_station["public_fit_validation"]["precision_ready_policy"],
            "manual_fit_required": miter_station["public_fit_validation"]["manual_fit_required"],
            "dust_mockup_status": dust["mockup_gate"]["status"],
        },
        "assemblies": [
            {"id": assembly_id, "label": ASSEMBLY_LABELS[assembly_id], "color": PALETTE[assembly_id]}
            for assembly_id in ASSEMBLY_ORDER
        ],
        "parts": parts,
    }


def write_outputs(spec: dict[str, Any]) -> list[Path]:
    OUTPUT_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    SITE_OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    OUTPUT_JSON_PATH.write_text(json.dumps(spec, indent=2))
    SITE_OUTPUT_PATH.write_text(json.dumps(spec, indent=2))

    with OUTPUT_SUMMARY_PATH.open("w", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["instance_id", "assembly", "part_id", "label", "material", "gate", "confidence", "position", "size"],
        )
        writer.writeheader()
        for part in spec["parts"]:
            writer.writerow(
                {
                    "instance_id": part["instance_id"],
                    "assembly": part["assembly"],
                    "part_id": part["part_id"],
                    "label": part["label"],
                    "material": part["material"],
                    "gate": part["gate"],
                    "confidence": part["confidence"],
                    "position": ",".join(f"{value:.4f}" for value in part["position"]),
                    "size": ",".join(f"{value:.4f}" for value in part["size"]),
                }
            )

    return [OUTPUT_JSON_PATH, OUTPUT_SUMMARY_PATH, SITE_OUTPUT_PATH]


def generate_bench_model() -> list[Path]:
    spec = build_model_spec()
    return write_outputs(spec)


def main() -> int:
    outputs = generate_bench_model()
    for output in outputs:
        relative = output.relative_to(REPO_ROOT)
        print(f"wrote {relative}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
