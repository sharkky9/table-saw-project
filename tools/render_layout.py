#!/usr/bin/env python3

import json
import sys
from pathlib import Path
from typing import Optional


SCALE = 8.0
MARGIN = 40


def px(value: float) -> float:
    return MARGIN + value * SCALE


def rect(
    x: float,
    y: float,
    w: float,
    h: float,
    fill: str,
    stroke: str = "#222",
    dash: Optional[str] = None,
    opacity: float = 1.0,
) -> str:
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<rect x="{px(x):.1f}" y="{px(y):.1f}" width="{w * SCALE:.1f}" height="{h * SCALE:.1f}" '
        f'fill="{fill}" fill-opacity="{opacity}" stroke="{stroke}" stroke-width="1.5"{dash_attr} />'
    )


def line(
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    stroke: str = "#222",
    width: float = 1.5,
    dash: Optional[str] = None,
) -> str:
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<line x1="{px(x1):.1f}" y1="{px(y1):.1f}" x2="{px(x2):.1f}" y2="{px(y2):.1f}" '
        f'stroke="{stroke}" stroke-width="{width}"{dash_attr} />'
    )


def text(
    x: float,
    y: float,
    label: str,
    size: int = 14,
    anchor: str = "start",
    color: str = "#111",
) -> str:
    return (
        f'<text x="{px(x):.1f}" y="{px(y):.1f}" font-family="Helvetica, Arial, sans-serif" '
        f'font-size="{size}" text-anchor="{anchor}" fill="{color}">{label}</text>'
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
    overlay = layout["assembly_mode"].get("overlay") or layout["assembly_mode"].get("future_overlay")
    overlay_depth = overlay["size"]["depth"]
    body = [
        rect(0, 0, overall["length"], overall["depth"], "#fbfaf7", "#111"),
        text(0, -2, "Concept Top View", 18),
    ]

    for module in layout["bench"]["carcass"]["modules"]:
        body.append(
            rect(module["x"], module["y"], module["length"], module["depth"], "#d9d9d9", "#555", opacity=0.35)
        )
        body.append(text(module["x"] + 1, module["y"] + 2.5, module["name"].replace("_", " "), 12))

    for region in layout["bench"]["top"]["fixed_regions"]:
        body.append(rect(region["x"], region["y"], region["length"], region["depth"], "#efe8d8", "#7e6f5b", opacity=0.55))

    wing = layout["front_wing"]
    body.append(rect(wing["x"], wing["y"], wing["length"], wing["depth"], "#cfe9c7", "#4b7d3a", opacity=0.45))
    body.append(text(wing["x"] + 1, 14.5, "fold-down wing", 12, color="#2b5d1f"))

    seam = layout["bench"]["top"]["seams"][0]
    body.append(line(seam["x"], seam["y"], seam["x"] + seam["length"], seam["y"], "#6f5c40", 2.0, "6 4"))

    body.append(rect(layout["saw"]["cast_top"]["x"], layout["saw"]["cast_top"]["y"], layout["saw"]["cast_top"]["length"], layout["saw"]["cast_top"]["depth"], "#b8bcc2", "#333"))
    body.append(rect(layout["saw"]["opening"]["x"], layout["saw"]["opening"]["y"], layout["saw"]["opening"]["length"], layout["saw"]["opening"]["depth"], "none", "#b00020", dash="6 4"))
    body.append(rect(layout["saw"]["rail_envelope"]["x"], layout["saw"]["rail_envelope"]["y"], layout["saw"]["rail_envelope"]["length"], layout["saw"]["rail_envelope"]["depth"], "none", "#ff8800", dash="8 4"))

    for slot in layout["saw"]["miter_slots"]:
        body.append(line(slot["center_x"], 0, slot["center_x"], overall["depth"], "#222", 1.2, "4 3"))

    router_zone = layout["router_module"]["zone"]
    body.append(rect(router_zone["x"], router_zone["y"], router_zone["length"], router_zone["depth"], "#d4dcff", "#3047aa", opacity=0.55))
    body.append(text(router_zone["x"] + 0.8, router_zone["y"] + 2.2, "router module", 12, color="#223177"))

    for lane in layout["saw"]["under_top_keep_clear"]:
        body.append(rect(lane["x"], lane["y"], lane["length"], lane["depth"], "#ffdcb8", "#cc6d00", dash="4 3", opacity=0.45))

    dust_bay = layout["dust_collection"]["dust_bay"]
    body.append(rect(dust_bay["x"], dust_bay["y"], dust_bay["length"], dust_bay["depth"], "#efe3ff", "#6f4ea5", opacity=0.45))
    for package in dust_bay["packages"]:
        body.append(rect(package["x"], package["y"], package["length"], package["depth"], "#f6f0ff", "#6f4ea5"))

    overlay_y = overall["depth"] - overlay_depth
    body.append(rect(0, overlay_y, overlay["size"]["length"], overlay_depth, "none", "#2a6f97", dash="5 5"))
    body.append(text(2, overall["depth"] - 1, "overlay concept only", 11, color="#2a6f97"))

    width = overall["length"] * SCALE + MARGIN * 2
    height = overall["depth"] * SCALE + MARGIN * 2
    return svg_wrapper(width, height, "".join(body))


def render_deployed(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    wing = layout["front_wing"]
    body = [
        rect(0, 0, overall["length"], overall["depth"], "#fbfaf7", "#111"),
        text(0, -2, "Concept Deployed Mode", 18),
        line(-4, -1, overall["length"] + 4, -1, "#666", 3),
        text(0, -3.2, "wall / parked reference line", 12, color="#555"),
    ]
    for region in layout["bench"]["top"]["fixed_regions"]:
        body.append(rect(region["x"], region["y"], region["length"], region["depth"], "#efe8d8", "#7e6f5b", opacity=0.45))
    body.append(rect(wing["x"], wing["y"], wing["length"], wing["depth"], "#cfe9c7", "#4b7d3a", opacity=0.6))
    body.append(text(1, 14.5, "wing down", 12, color="#2b5d1f"))
    body.append(text(2, 52, "Bench rolls straight out from the wall; no rotation required for the default workflow.", 13))
    body.append(text(2, 55, "The front-right corner stays fixed for router and service access.", 13))

    width = overall["length"] * SCALE + MARGIN * 2
    height = overall["depth"] * SCALE + MARGIN * 2 + 120
    return svg_wrapper(width, height, "".join(body))


def render_sections(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    top = layout["bench"]["top"]
    plinth = layout["bench"]["plinth"]
    carcass = layout["bench"]["carcass"]
    saw = layout["saw"]

    width = 920
    height = 700
    body = ['<rect width="100%" height="100%" fill="#ffffff" />']
    body.append('<text x="40" y="70" font-family="Helvetica, Arial, sans-serif" font-size="22">Concept Sections</text>')

    base_y = 420
    scale_y = 8

    def y_from_floor(value: float) -> float:
        return base_y - value * scale_y

    body.append('<text x="40" y="100" font-family="Helvetica, Arial, sans-serif" font-size="16">A-A Side Section Through Blade Line</text>')
    body.append(f'<rect x="60" y="{y_from_floor(overall["height"]):.1f}" width="500" height="{top["thickness"] * scale_y:.1f}" fill="#dad0be" stroke="#222"/>')
    body.append(f'<rect x="90" y="{y_from_floor(plinth["height"] + carcass["height"]):.1f}" width="440" height="{carcass["height"] * scale_y:.1f}" fill="#dddddd" stroke="#666" fill-opacity="0.45"/>')
    body.append(f'<rect x="105" y="{y_from_floor(plinth["height"]):.1f}" width="410" height="{plinth["height"] * scale_y:.1f}" fill="#c6b38e" stroke="#333"/>')
    body.append(f'<line x1="60" y1="{y_from_floor(saw["mount_plane_height"]):.1f}" x2="560" y2="{y_from_floor(saw["mount_plane_height"]):.1f}" stroke="#8a0000" stroke-width="2" stroke-dasharray="8 4"/>')
    body.append('<text x="570" y="160" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#8a0000">36 in top / 22.625 in mount plane</text>')
    body.append('<text x="170" y="290" font-family="Helvetica, Arial, sans-serif" font-size="12">open saw well</text>')

    x0 = 60
    y0 = 640
    body.append('<text x="40" y="470" font-family="Helvetica, Arial, sans-serif" font-size="16">B-B Front Section Through Modules</text>')
    body.append(f'<rect x="{x0}" y="{y0 - 180}" width="640" height="12" fill="#dad0be" stroke="#222"/>')
    module_x = x0 + 12
    colors = ["#d9d9d9", "#efefef", "#d9d9d9"]
    widths = [27.75, 30.5, 28.75]
    labels = ["left storage", "saw chassis", "right service"]
    for width_in, label, color in zip(widths, labels, colors):
        width_px = width_in * 6.2
        body.append(f'<rect x="{module_x:.1f}" y="{y0 - 168:.1f}" width="{width_px:.1f}" height="155" fill="{color}" stroke="#555" fill-opacity="0.6"/>')
        body.append(f'<text x="{module_x + 6:.1f}" y="{y0 - 148:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12">{label}</text>')
        module_x += width_px
    body.append(f'<rect x="{x0 + 448:.1f}" y="{y0 - 145:.1f}" width="118" height="116" fill="#efe3ff" stroke="#6f4ea5" fill-opacity="0.55"/>')
    body.append(f'<text x="{x0 + 455:.1f}" y="{y0 - 126:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#543483">bucket + Hercules bay</text>')
    body.append(f'<text x="{x0 + 455:.1f}" y="{y0 - 52:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#543483">extractor on low deck</text>')

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
