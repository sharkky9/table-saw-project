#!/usr/bin/env python3

import json
import sys
from pathlib import Path
from typing import Optional


SCALE = 8.0
MARGIN = 40


def px(value: float, x_offset: float = 0.0) -> float:
    return MARGIN + (value + x_offset) * SCALE


def py(value: float, y_offset: float = 0.0) -> float:
    return MARGIN + (value + y_offset) * SCALE


def rect(
    x: float,
    y: float,
    w: float,
    h: float,
    fill: str,
    stroke: str = "#222",
    dash: Optional[str] = None,
    opacity: float = 1.0,
    x_offset: float = 0.0,
    y_offset: float = 0.0,
) -> str:
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<rect x="{px(x, x_offset):.1f}" y="{py(y, y_offset):.1f}" width="{w * SCALE:.1f}" height="{h * SCALE:.1f}" '
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
    x_offset: float = 0.0,
    y_offset: float = 0.0,
) -> str:
    dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
    return (
        f'<line x1="{px(x1, x_offset):.1f}" y1="{py(y1, y_offset):.1f}" x2="{px(x2, x_offset):.1f}" y2="{py(y2, y_offset):.1f}" '
        f'stroke="{stroke}" stroke-width="{width}"{dash_attr} />'
    )


def text(
    x: float,
    y: float,
    label: str,
    size: int = 14,
    anchor: str = "start",
    color: str = "#111",
    x_offset: float = 0.0,
    y_offset: float = 0.0,
) -> str:
    return (
        f'<text x="{px(x, x_offset):.1f}" y="{py(y, y_offset):.1f}" font-family="Helvetica, Arial, sans-serif" '
        f'font-size="{size}" text-anchor="{anchor}" fill="{color}">{label}</text>'
    )


def svg_wrapper(width: float, height: float, body: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width:.0f}" height="{height:.0f}" '
        f'viewBox="0 0 {width:.0f} {height:.0f}">{body}</svg>'
    )


def render_top_view(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    carriage = layout["left_sliding_carriage"]
    support_drawer = carriage["support_drawer"]

    body = [
        rect(0, 0, overall["length"], overall["depth"], "#fbfaf7", "#111"),
        text(0, -2, "Top View", 18),
    ]

    for module in layout["bench"]["carcass"]["modules"]:
        body.append(
            rect(module["x"], module["y"], module["length"], module["depth"], "#d9d9d9", "#555", opacity=0.35)
        )
        body.append(text(module["x"] + 1, module["y"] + 2.5, module["name"].replace("_", " "), 12))

    for region in layout["bench"]["top"]["fixed_regions"]:
        body.append(rect(region["x"], region["y"], region["length"], region["depth"], "#efe8d8", "#7e6f5b", opacity=0.55))
        body.append(text(region["x"] + 1, region["y"] + 2.2, region["name"].replace("_", " "), 11, color="#655848"))

    for seam in layout["bench"]["top"]["seams"]:
        body.append(line(seam["x1"], seam["y1"], seam["x2"], seam["y2"], "#6f5c40", 2.0, "6 4"))

    guide_zone = carriage["guide_strip_zone"]
    parked = carriage["parked_envelope"]
    body.append(rect(guide_zone["x"], guide_zone["y"], guide_zone["length"], guide_zone["depth"], "#d9f1ff", "#1e6c8f", dash="6 4", opacity=0.45))
    body.append(text(guide_zone["x"] + 0.6, guide_zone["y"] + 2.0, "carriage guide zone", 10, color="#0f5874"))
    body.append(rect(parked["x"], parked["y"], parked["length"], parked["depth"], "#bfe7f5", "#16759c", opacity=0.75))
    body.append(text(parked["x"] + 0.8, parked["y"] + 2.0, "sliding carriage parked", 11, color="#0d5e7d"))
    body.append(rect(support_drawer["x"], support_drawer["y"], support_drawer["length"], support_drawer["depth"], "#e8f7d2", "#5a8920", opacity=0.65))
    body.append(text(support_drawer["x"] + 0.6, support_drawer["y"] + 2.0, "support drawer", 10, color="#4b7319"))

    body.append(rect(layout["saw"]["cast_top"]["x"], layout["saw"]["cast_top"]["y"], layout["saw"]["cast_top"]["length"], layout["saw"]["cast_top"]["depth"], "#b8bcc2", "#333"))
    body.append(rect(layout["saw"]["opening"]["x"], layout["saw"]["opening"]["y"], layout["saw"]["opening"]["length"], layout["saw"]["opening"]["depth"], "none", "#b00020", dash="6 4"))
    body.append(rect(layout["saw"]["rail_envelope"]["x"], layout["saw"]["rail_envelope"]["y"], layout["saw"]["rail_envelope"]["length"], layout["saw"]["rail_envelope"]["depth"], "none", "#ff8800", dash="8 4"))
    body.append(line(layout["saw"]["blade_center"]["x"], 0, layout["saw"]["blade_center"]["x"], overall["depth"], "#8a0000", 2.5, "10 6"))
    body.append(text(layout["saw"]["blade_center"]["x"] + 0.5, 2.5, "blade center", 12, color="#8a0000"))

    for slot in layout["saw"]["miter_slots"]:
        body.append(line(slot["center_x"], 0, slot["center_x"], overall["depth"], "#222", 1.2, "4 3"))
        body.append(text(slot["center_x"], 46.5, slot["name"], 11, "middle"))

    router_zone = layout["router_module"]["zone"]
    body.append(rect(router_zone["x"], router_zone["y"], router_zone["length"], router_zone["depth"], "#d4dcff", "#3047aa", opacity=0.55))
    body.append(text(router_zone["x"] + 0.8, router_zone["y"] + 2.2, "router module", 12, color="#223177"))

    for lane in layout["saw"]["under_top_keep_clear"]:
        body.append(rect(lane["x"], lane["y"], lane["length"], lane["depth"], "#ffdcb8", "#cc6d00", dash="4 3", opacity=0.45))
        body.append(text(lane["x"] + 0.4, lane["y"] + 2.0, lane["name"].replace("_", " "), 10, color="#995000"))

    dust_bay = layout["dust_collection"]["dust_bay"]
    body.append(rect(dust_bay["x"], dust_bay["y"], dust_bay["length"], dust_bay["depth"], "#efe3ff", "#6f4ea5", opacity=0.45))
    body.append(text(dust_bay["x"] + 0.8, dust_bay["y"] + 2.5, "Hercules + Low-Pro bay", 12, color="#543483"))
    for package in dust_bay["packages"]:
        body.append(rect(package["x"], package["y"], package["length"], package["depth"], "#f6f0ff", "#6f4ea5"))
        body.append(text(package["x"] + 0.4, package["y"] + 2.0, package["name"].replace("_", " "), 10, color="#543483"))

    body.append(text(2, 50.5, "No permanent T-tracks in this variant; left field is reserved for the carriage package.", 11, color="#555"))

    width = overall["length"] * SCALE + MARGIN * 2
    height = overall["depth"] * SCALE + MARGIN * 2 + 28
    return svg_wrapper(width, height, "".join(body))


def render_deployed(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    support_table = layout["left_support_table"]
    carriage = layout["left_sliding_carriage"]
    x_shift = support_table["deployed_extension"]

    body = [
        rect(0, 0, overall["length"], overall["depth"], "#fbfaf7", "#111", x_offset=x_shift),
        text(-x_shift, -2, "Deployed Crosscut Mode", 18, x_offset=x_shift),
        line(-x_shift - 4, -1, overall["length"] + 4, -1, "#666", 3, x_offset=x_shift),
        text(-x_shift, -3.2, "wall / parked reference line", 12, color="#555", x_offset=x_shift),
    ]

    for region in layout["bench"]["top"]["fixed_regions"]:
        body.append(rect(region["x"], region["y"], region["length"], region["depth"], "#efe8d8", "#7e6f5b", opacity=0.45, x_offset=x_shift))

    active_zone = support_table["active_zone"]
    body.append(rect(active_zone["x"], active_zone["y"], active_zone["length"], active_zone["depth"], "#cfe9c7", "#4b7d3a", opacity=0.6, x_offset=x_shift))
    body.append(text(active_zone["x"] + 1, active_zone["y"] + 2.0, "left support table open", 12, color="#2b5d1f", x_offset=x_shift))

    parked = carriage["parked_envelope"]
    body.append(rect(parked["x"], parked["y"], parked["length"], parked["depth"], "#bfe7f5", "#16759c", opacity=0.75, x_offset=x_shift))
    body.append(text(parked["x"] + 0.8, parked["y"] + 2.0, "carriage parked zone", 11, color="#0d5e7d", x_offset=x_shift))

    router_zone = layout["router_module"]["zone"]
    body.append(rect(router_zone["x"], router_zone["y"], router_zone["length"], router_zone["depth"], "#d4dcff", "#3047aa", opacity=0.55, x_offset=x_shift))
    body.append(text(router_zone["x"] + 0.8, router_zone["y"] + 2.2, "router module", 12, color="#223177", x_offset=x_shift))
    body.append(text(-x_shift, 52, "The fixed bench footprint stays 90 x 48. Only the left support table extends in deployed mode.", 13, x_offset=x_shift))
    body.append(text(-x_shift, 55, "Large-panel crosscuts add support to the left and front without rotating the saw or widening the permanent core.", 13, x_offset=x_shift))

    width = (overall["length"] + support_table["deployed_extension"]) * SCALE + MARGIN * 2
    height = overall["depth"] * SCALE + MARGIN * 2 + 120
    return svg_wrapper(width, height, "".join(body))


def render_sections(layout: dict) -> str:
    overall = layout["bench"]["overall"]
    top = layout["bench"]["top"]
    plinth = layout["bench"]["plinth"]
    carcass = layout["bench"]["carcass"]
    saw = layout["saw"]

    width = 920
    height = 640
    body = ['<rect width="100%" height="100%" fill="#ffffff" />']
    body.append('<text x="40" y="32" font-family="Helvetica, Arial, sans-serif" font-size="22">Section Cuts</text>')

    base_y = 360
    scale_y = 8

    def y_from_floor(value: float) -> float:
        return base_y - value * scale_y

    body.append('<text x="40" y="60" font-family="Helvetica, Arial, sans-serif" font-size="16">A-A Side Section Through Blade Line</text>')
    body.append(f'<rect x="60" y="{y_from_floor(overall["height"]):.1f}" width="500" height="{top["thickness"] * scale_y:.1f}" fill="#dad0be" stroke="#222"/>')
    body.append(f'<rect x="90" y="{y_from_floor(plinth["height"] + carcass["height"]):.1f}" width="440" height="{carcass["height"] * scale_y:.1f}" fill="#dddddd" stroke="#666" fill-opacity="0.45"/>')
    body.append(f'<rect x="105" y="{y_from_floor(plinth["height"]):.1f}" width="410" height="{plinth["height"] * scale_y:.1f}" fill="#c6b38e" stroke="#333"/>')
    body.append(f'<line x1="60" y1="{y_from_floor(saw["mount_plane_height"]):.1f}" x2="560" y2="{y_from_floor(saw["mount_plane_height"]):.1f}" stroke="#8a0000" stroke-width="2" stroke-dasharray="8 4"/>')
    body.append(f'<line x1="60" y1="{y_from_floor(0):.1f}" x2="560" y2="{y_from_floor(0):.1f}" stroke="#444" stroke-width="2"/>')
    body.append('<text x="570" y="84" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#8a0000">36 in top</text>')
    body.append(f'<text x="570" y="{y_from_floor(saw["mount_plane_height"]) + 4:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#8a0000">22.625 in saw mount plane</text>')
    body.append('<text x="66" y="366" font-family="Helvetica, Arial, sans-serif" font-size="12">floor</text>')
    body.append('<text x="150" y="190" font-family="Helvetica, Arial, sans-serif" font-size="12">carcass</text>')
    body.append('<text x="225" y="86" font-family="Helvetica, Arial, sans-serif" font-size="12">fixed top stack</text>')
    body.append('<text x="160" y="236" font-family="Helvetica, Arial, sans-serif" font-size="12">open saw well for hose and bevel motion</text>')

    x0 = 60
    y0 = 590
    body.append('<text x="40" y="410" font-family="Helvetica, Arial, sans-serif" font-size="16">B-B Front Section Through Modules</text>')
    body.append(f'<rect x="{x0}" y="{y0 - 180}" width="640" height="12" fill="#dad0be" stroke="#222"/>')
    module_x = x0 + 12
    colors = ["#d9d9d9", "#efefef", "#d9d9d9"]
    widths = [27.75, 30.5, 28.75]
    labels = ["left carriage support", "saw chassis", "right service"]
    for width_in, label, color in zip(widths, labels, colors):
        width_px = width_in * 6.2
        body.append(f'<rect x="{module_x:.1f}" y="{y0 - 168:.1f}" width="{width_px:.1f}" height="155" fill="{color}" stroke="#555" fill-opacity="0.6"/>')
        body.append(f'<text x="{module_x + 6:.1f}" y="{y0 - 148:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12">{label}</text>')
        module_x += width_px
    body.append(f'<rect x="{x0 + 34:.1f}" y="{y0 - 206:.1f}" width="122" height="28" fill="#bfe7f5" stroke="#16759c" fill-opacity="0.75"/>')
    body.append(f'<text x="{x0 + 42:.1f}" y="{y0 - 188:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#0d5e7d">sliding carriage park zone</text>')
    body.append(f'<rect x="{x0 + 448:.1f}" y="{y0 - 145:.1f}" width="118" height="116" fill="#efe3ff" stroke="#6f4ea5" fill-opacity="0.55"/>')
    body.append(f'<text x="{x0 + 456:.1f}" y="{y0 - 126:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#543483">Hercules + Low-Pro bay</text>')
    body.append(f'<rect x="{x0 + 505:.1f}" y="{y0 - 206:.1f}" width="112" height="28" fill="#d4dcff" stroke="#3047aa" fill-opacity="0.65"/>')
    body.append(f'<text x="{x0 + 514:.1f}" y="{y0 - 188:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#223177">router module</text>')
    body.append(f'<text x="{x0 + 52:.1f}" y="{y0 - 52:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#0d5e7d">support drawer below carriage</text>')
    body.append(f'<text x="{x0 + 455:.1f}" y="{y0 - 52:.1f}" font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#543483">extractor on fixed low deck</text>')

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
