#!/usr/bin/env python3

import json
import sys
from pathlib import Path
from typing import Optional


SCALE = 8.0
MARGIN = 48.0


def canvas_point(value: float, minimum: float) -> float:
    return MARGIN + (value - minimum) * SCALE


def rect(
    x: float,
    y: float,
    w: float,
    h: float,
    fill: str,
    minimum_x: float,
    minimum_y: float,
    stroke: str = "#222",
    dash: Optional[str] = None,
    opacity: float = 1.0,
) -> str:
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<rect x="{canvas_point(x, minimum_x):.1f}" y="{canvas_point(y, minimum_y):.1f}" '
        f'width="{w * SCALE:.1f}" height="{h * SCALE:.1f}" fill="{fill}" fill-opacity="{opacity}" '
        f'stroke="{stroke}" stroke-width="1.5"{dash_attr} />'
    )


def line(
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    minimum_x: float,
    minimum_y: float,
    stroke: str = "#222",
    width: float = 1.5,
    dash: Optional[str] = None,
) -> str:
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<line x1="{canvas_point(x1, minimum_x):.1f}" y1="{canvas_point(y1, minimum_y):.1f}" '
        f'x2="{canvas_point(x2, minimum_x):.1f}" y2="{canvas_point(y2, minimum_y):.1f}" '
        f'stroke="{stroke}" stroke-width="{width}"{dash_attr} />'
    )


def text(
    x: float,
    y: float,
    label: str,
    minimum_x: float,
    minimum_y: float,
    size: int = 14,
    anchor: str = "start",
    color: str = "#111",
) -> str:
    return (
        f'<text x="{canvas_point(x, minimum_x):.1f}" y="{canvas_point(y, minimum_y):.1f}" '
        f'font-family="Helvetica, Arial, sans-serif" font-size="{size}" '
        f'text-anchor="{anchor}" fill="{color}">{label}</text>'
    )


def svg_wrapper(width: float, height: float, body: str) -> str:
    watermark = (
        '<text x="50%" y="34" font-family="Helvetica, Arial, sans-serif" font-size="16" '
        'text-anchor="middle" fill="#b00020">CONCEPT ONLY - NOT A SHOP DRAWING</text>'
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width:.0f}" height="{height:.0f}" '
        f'viewBox="0 0 {width:.0f} {height:.0f}">{watermark}{body}</svg>'
    )


def render_top_view(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    minimum_x = 0.0
    minimum_y = 0.0
    body = [
        rect(0, 0, overall["length"], overall["depth"], "#fbfaf7", minimum_x, minimum_y, "#111"),
        text(0, -2, "Fixed-Top Concept", minimum_x, minimum_y, 18),
    ]

    for module in layout["bench"]["carcass"]["modules"]:
        body.append(
            rect(module["x"], module["y"], module["length"], module["depth"], "#d9d9d9", minimum_x, minimum_y, "#555", opacity=0.35)
        )
        body.append(text(module["x"] + 1, module["y"] + 2.5, module["name"].replace("_", " "), minimum_x, minimum_y, 12))

    miter_station = layout["miter_station"]
    left_support = miter_station["support_surfaces"]["left"]
    right_support = miter_station["support_surfaces"]["right"]
    body.append(rect(left_support["x"], left_support["y"], left_support["length"], left_support["depth"], "#dcefd3", minimum_x, minimum_y, "#4b7d3a", opacity=0.45))
    body.append(rect(right_support["x"], right_support["y"], right_support["length"], right_support["depth"], "#dcefd3", minimum_x, minimum_y, "#4b7d3a", opacity=0.45))
    body.append(rect(miter_station["opening"]["x"], miter_station["opening"]["y"], miter_station["opening"]["length"], miter_station["opening"]["depth"], "#f5d7bf", minimum_x, minimum_y, "#b86b00", opacity=0.75))
    body.append(text(miter_station["opening"]["x"] + 1, 4.5, "centered miter station", minimum_x, minimum_y, 12, color="#8a4c00"))

    saw = layout["saw"]
    body.append(rect(saw["cast_top"]["x"], saw["cast_top"]["y"], saw["cast_top"]["length"], saw["cast_top"]["depth"], "#b8bcc2", minimum_x, minimum_y, "#333"))
    body.append(rect(saw["opening"]["x"], saw["opening"]["y"], saw["opening"]["length"], saw["opening"]["depth"], "none", minimum_x, minimum_y, "#b00020", dash="6 4"))
    body.append(rect(saw["rail_envelope"]["x"], saw["rail_envelope"]["y"], saw["rail_envelope"]["length"], saw["rail_envelope"]["depth"], "none", minimum_x, minimum_y, "#ff8800", dash="8 4"))

    for slot in saw["miter_slots"]:
        body.append(line(slot["center_x"], slot["reference_y_start"], slot["center_x"], slot["reference_y_end"], minimum_x, minimum_y, "#222", 1.2, "4 3"))

    router_zone = layout["router_module"]["zone"]
    body.append(rect(router_zone["x"], router_zone["y"], router_zone["length"], router_zone["depth"], "#d4dcff", minimum_x, minimum_y, "#3047aa", opacity=0.5))
    body.append(text(router_zone["x"] + 0.8, router_zone["y"] + 2.2, "router zone", minimum_x, minimum_y, 12, color="#223177"))

    router_plate = next(opening for opening in layout["bench"]["top"]["openings"] if opening["name"] == "router_plate_opening")
    body.append(rect(router_plate["x"], router_plate["y"], router_plate["length"], router_plate["depth"], "#eef1ff", minimum_x, minimum_y, "#3047aa", dash="5 4"))

    for lane in saw["under_top_keep_clear"]:
        body.append(rect(lane["x"], lane["y"], lane["length"], lane["depth"], "#ffdcb8", minimum_x, minimum_y, "#cc6d00", dash="4 3", opacity=0.45))

    dust_bay = layout["dust_collection"]["dust_bay"]
    body.append(rect(dust_bay["x"], dust_bay["y"], dust_bay["length"], dust_bay["depth"], "#efe3ff", minimum_x, minimum_y, "#6f4ea5", opacity=0.45))
    for package in dust_bay["packages"]:
        body.append(rect(package["x"], package["y"], package["length"], package["depth"], "#f6f0ff", minimum_x, minimum_y, "#6f4ea5"))

    overlay = layout["assembly_mode"].get("overlay")
    if overlay:
        overlay_y = overall["depth"] - overlay["size"]["depth"]
        body.append(rect(0, overlay_y, overlay["size"]["length"], overlay["size"]["depth"], "none", minimum_x, minimum_y, "#2a6f97", dash="5 5"))
        body.append(text(2, overall["depth"] - 1, "overlay concept only", minimum_x, minimum_y, 11, color="#2a6f97"))

    width = overall["length"] * SCALE + MARGIN * 2
    height = overall["depth"] * SCALE + MARGIN * 2
    return svg_wrapper(width, height, "".join(body))


def render_deployed(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    miter_station = layout["miter_station"]
    minimum_x = 0.0
    minimum_y = -20.0
    width = overall["length"] * SCALE + MARGIN * 2
    height = (overall["depth"] + 20.0) * SCALE + MARGIN * 2

    body = [
        rect(0, 0, overall["length"], overall["depth"], "#fbfaf7", minimum_x, minimum_y, "#111"),
        text(0, -18.5, "Deployed Miter-Station Concept", minimum_x, minimum_y, 18),
        line(-2, 0, overall["length"] + 2, 0, minimum_x, minimum_y, "#666", 2.0),
        text(0, -1.5, "operator edge / front of bench", minimum_x, minimum_y, 12, color="#555"),
    ]

    left_support = miter_station["support_surfaces"]["left"]
    right_support = miter_station["support_surfaces"]["right"]
    body.append(rect(left_support["x"], left_support["y"], left_support["length"], left_support["depth"], "#dcefd3", minimum_x, minimum_y, "#4b7d3a", opacity=0.45))
    body.append(rect(right_support["x"], right_support["y"], right_support["length"], right_support["depth"], "#dcefd3", minimum_x, minimum_y, "#4b7d3a", opacity=0.45))
    body.append(rect(miter_station["deployed_envelope"]["x"], miter_station["deployed_envelope"]["y"], miter_station["deployed_envelope"]["length"], miter_station["deployed_envelope"]["depth"], "#f7d5bf", minimum_x, minimum_y, "#b86b00", dash="6 4", opacity=0.65))
    body.append(text(miter_station["deployed_envelope"]["x"] + 1, -6, "deployed saw envelope", minimum_x, minimum_y, 12, color="#8a4c00"))
    body.append(text(2, 54, "The flip-top station becomes the primary crosscut workflow.", minimum_x, minimum_y, 13))
    body.append(text(2, 57, "Table-saw right-hand support, router access, and right-bay service stay intact.", minimum_x, minimum_y, 13))

    return svg_wrapper(width, height, "".join(body))


def render_sections(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    top = layout["bench"]["top"]
    plinth = layout["bench"]["plinth"]
    carcass = layout["bench"]["carcass"]
    saw = layout["saw"]
    miter_station = layout["miter_station"]

    width = 960
    height = 720
    body = ['<rect width="100%" height="100%" fill="#ffffff" />']
    body.append('<text x="40" y="70" font-family="Helvetica, Arial, sans-serif" font-size="22">Concept Sections</text>')

    base_y = 430
    scale_y = 8

    def y_from_floor(value: float) -> float:
        return base_y - value * scale_y

    body.append('<text x="40" y="100" font-family="Helvetica, Arial, sans-serif" font-size="16">A-A Side Section Through Blade Line</text>')
    body.append(f'<rect x="60" y="{y_from_floor(overall["height"]):.1f}" width="520" height="{top["thickness"] * scale_y:.1f}" fill="#dad0be" stroke="#222"/>')
    body.append(f'<rect x="90" y="{y_from_floor(plinth["height"] + carcass["height"]):.1f}" width="460" height="{carcass["height"] * scale_y:.1f}" fill="#dddddd" stroke="#666" fill-opacity="0.45"/>')
    body.append(f'<rect x="105" y="{y_from_floor(plinth["height"]):.1f}" width="430" height="{plinth["height"] * scale_y:.1f}" fill="#c6b38e" stroke="#333"/>')
    body.append(f'<line x1="60" y1="{y_from_floor(saw["mount_plane_height"]):.1f}" x2="580" y2="{y_from_floor(saw["mount_plane_height"]):.1f}" stroke="#8a0000" stroke-width="2" stroke-dasharray="8 4"/>')
    body.append('<text x="590" y="162" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#8a0000">36 in top / 22.625 in mount plane</text>')
    body.append('<text x="175" y="300" font-family="Helvetica, Arial, sans-serif" font-size="12">open saw well</text>')

    body.append('<text x="40" y="470" font-family="Helvetica, Arial, sans-serif" font-size="16">B-B Front Elevation Through Miter Station</text>')
    x0 = 60
    y0 = 655
    body.append(f'<rect x="{x0}" y="{y0 - 185}" width="700" height="12" fill="#dad0be" stroke="#222"/>')
    body.append(f'<rect x="{x0 + 12}" y="{y0 - 173}" width="250" height="158" fill="#d9d9d9" stroke="#555" fill-opacity="0.6"/>')
    body.append(f'<rect x="{x0 + 262}" y="{y0 - 173}" width="180" height="158" fill="#efefef" stroke="#555" fill-opacity="0.6"/>')
    body.append(f'<rect x="{x0 + 442}" y="{y0 - 173}" width="230" height="158" fill="#d9d9d9" stroke="#555" fill-opacity="0.6"/>')
    body.append(f'<rect x="{x0 + 272}" y="{y0 - 185}" width="{miter_station["opening"]["length"] * 6.0:.1f}" height="12" fill="#f7d5bf" stroke="#b86b00"/>')
    body.append(f'<text x="{x0 + 278}" y="{y0 - 194}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#8a4c00">stowed flip-top bay</text>')
    body.append(f'<text x="{x0 + 78}" y="{y0 - 145}" font-family="Helvetica, Arial, sans-serif" font-size="12">left support surface</text>')
    body.append(f'<text x="{x0 + 470}" y="{y0 - 145}" font-family="Helvetica, Arial, sans-serif" font-size="12">router + right support</text>')

    return svg_wrapper(width, height, "".join(body))


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: render_layout.py <layout.json> <output_dir>", file=sys.stderr)
        return 2

    layout = json.loads(Path(sys.argv[1]).read_text())
    output_dir = Path(sys.argv[2])
    output_dir.mkdir(parents=True, exist_ok=True)

    (output_dir / "top-view.svg").write_text(render_top_view(layout))
    (output_dir / "deployed.svg").write_text(render_deployed(layout))
    (output_dir / "section-cuts.svg").write_text(render_sections(layout))

    print(f"rendered SVGs to {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
