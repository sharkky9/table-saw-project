#!/usr/bin/env python3

from __future__ import annotations

import csv
import json
import re
import shutil
from pathlib import Path

from build_bench_model import generate_bench_model


REPO_ROOT = Path(__file__).resolve().parents[1]
SITE_ROOT = REPO_ROOT / "site"
GENERATED_ROOT = SITE_ROOT / "public" / "generated"
MEDIA_ROOT = GENERATED_ROOT / "media"
DATA_PATH = GENERATED_ROOT / "instructions-data.json"

RESOURCE_PATHS = [
    "README.md",
    "docs/bench-requirements.md",
    "docs/research.md",
    "data/layout.json",
    "data/measurements.csv",
    "models/README.md",
    "plans/prebuild-checklist.md",
    "plans/no-cut-yet-checklist.md",
    "plans/assembly.md",
    "plans/shop-cut-sequence.md",
    "plans/top-build.md",
    "plans/top-machining-sequence.md",
    "plans/miter-station.md",
    "plans/flip-top-mechanism.md",
    "plans/saw-cradle.md",
    "plans/right-bay-mockup.md",
    "plans/dust-power.md",
    "plans/validation.md",
    "plans/tool-list.md",
    "plans/joint-strategy.md",
    "plans/panel-label-map.md",
    "plans/miter-saw-survey.md",
    "plans/stripped-saw-survey.md",
    "plans/cut-list-final.csv",
    "plans/cut-list-rough.csv",
    "plans/bom.csv",
    "plans/hardware.csv",
    "plans/finish-schedule.md",
    "drawings/top-dimensioned.svg",
    "drawings/plinth-framing.svg",
    "drawings/front-elevation.svg",
    "drawings/left-module-elevation.svg",
    "drawings/right-module-elevation.svg",
    "drawings/right-elevation.svg",
    "drawings/hose-routing.svg",
    "drawings/saw-cradle-detail.svg",
    "drawings/miter-station-elevation.svg",
    "drawings/flip-top-detail.svg",
    "drawings/right-bay-packaging.svg",
    "drawings/sheet-nesting-3_4ply.svg",
    "renders/top-view.svg",
    "renders/section-cuts.svg",
    "renders/deployed.svg",
]

STEP_METADATA = {
    1: {
        "summary": "Get the constraints straight before materials or irreversible cuts. This is where the digital manual earns its keep.",
        "focus": "Validate the accepted DCS781 contract, read the gates, and confirm the shop can actually support the build.",
        "warnings": [
            "Do not treat precision-ready as real tray-fit approval.",
            "If the garage footprint or service assumptions changed, stop here instead of compensating later.",
        ],
        "resources": [
            "docs/bench-requirements.md",
            "plans/prebuild-checklist.md",
            "plans/no-cut-yet-checklist.md",
            "plans/validation.md",
            "plans/miter-station.md",
            "plans/tool-list.md",
        ],
        "media": [
            "drawings/front-elevation.svg",
            "renders/top-view.svg",
        ],
        "gate_ids": ["precision-survey-gate", "right-bay-mockup-gate"],
    },
    2: {
        "summary": "Build a flat, mobile foundation that does not inject twist into everything above it.",
        "focus": "The plinth is structure, mobility, and setup datum all at once.",
        "warnings": [
            "A twisted plinth becomes a cabinet problem later.",
            "Do not rush caster installation before the frame is proven square.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/joint-strategy.md",
            "plans/tool-list.md",
        ],
        "media": [
            "drawings/plinth-framing.svg",
            "drawings/front-elevation.svg",
        ],
    },
    3: {
        "summary": "The left module is storage, but it also establishes one edge of the center chassis, so simple spacing aids matter.",
        "focus": "Use spacer logic instead of repeated measuring for the cubby and drawer bay.",
        "warnings": [
            "Do not final-fit drawer fronts early.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/panel-label-map.md",
            "plans/cut-list-final.csv",
        ],
        "media": [
            "drawings/left-module-elevation.svg",
            "drawings/front-elevation.svg",
        ],
    },
    4: {
        "summary": "The center chassis is where the table saw stops being an appliance and starts becoming part of the bench.",
        "focus": "Keep the lower well open and the deck adjustable until the real saw is fit.",
        "warnings": [
            "Do not drill the final mount pattern from paper geometry.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/saw-cradle.md",
            "plans/stripped-saw-survey.md",
            "data/measurements.csv",
        ],
        "media": [
            "drawings/saw-cradle-detail.svg",
            "drawings/front-elevation.svg",
        ],
        "gate_ids": ["precision-survey-gate"],
    },
    5: {
        "summary": "Build the right shell without pretending the dust package is already proven.",
        "focus": "Keep the shell honest, the mockup-gated parts separate, and the access story believable.",
        "warnings": [
            "Mockup-gated parts are blanks, not permission slips.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/no-cut-yet-checklist.md",
            "plans/right-bay-mockup.md",
            "plans/dust-power.md",
        ],
        "media": [
            "drawings/right-module-elevation.svg",
            "drawings/right-bay-packaging.svg",
        ],
        "gate_ids": ["service-layout-gate", "right-bay-mockup-gate"],
    },
    6: {
        "summary": "This is the cabinet alignment checkpoint before the top freezes it all together.",
        "focus": "Use the screw clearance built into the packet to align the modules instead of forcing them.",
        "warnings": [
            "Check height match before final tightening.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/joint-strategy.md",
            "drawings/front-elevation.svg",
        ],
        "media": [
            "drawings/front-elevation.svg",
            "renders/top-view.svg",
        ],
    },
    7: {
        "summary": "The top is now its own subassembly, not a vague pair of sheets.",
        "focus": "Cut, label, laminate, and attach the top in a sequence that preserves rework options.",
        "warnings": [
            "Do not machine openings before the top pairs cure flat.",
            "The rear panel glue-up is a two-person operation if you value your sanity.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/top-build.md",
            "plans/shop-cut-sequence.md",
            "plans/finish-schedule.md",
        ],
        "media": [
            "drawings/top-dimensioned.svg",
            "renders/top-view.svg",
        ],
    },
    8: {
        "summary": "The stripped-saw survey and cradle fit are the bridge from concept geometry to real machining.",
        "focus": "Use the actual saw as the opening and bolt-pattern source of truth.",
        "warnings": [
            "If the strict commands do not pass, top machining is still blocked.",
        ],
        "resources": [
            "plans/saw-cradle.md",
            "plans/stripped-saw-survey.md",
            "plans/top-machining-sequence.md",
            "data/measurements.csv",
        ],
        "media": [
            "drawings/saw-cradle-detail.svg",
            "drawings/top-dimensioned.svg",
        ],
        "gate_ids": ["precision-survey-gate"],
    },
    9: {
        "summary": "The flip-top station is the centerpiece, but it still wins only if the fit-up stays field-led and adjustable.",
        "focus": "Public dimensions size the bay. Real shims, stops, and fence line make it usable.",
        "warnings": [
            "Never route adjacent stop-track from nominal coordinates.",
        ],
        "resources": [
            "plans/miter-station.md",
            "plans/flip-top-mechanism.md",
            "plans/miter-saw-survey.md",
            "plans/no-cut-yet-checklist.md",
        ],
        "media": [
            "drawings/miter-station-elevation.svg",
            "drawings/flip-top-detail.svg",
            "renders/deployed.svg",
        ],
        "gate_ids": ["miter-station-fit-gate"],
    },
    10: {
        "summary": "This is the irreversible machining pass. The site should make it obvious what is allowed and what is still blocked.",
        "focus": "Cut from the real fit, not from the drawing callouts.",
        "warnings": [
            "The top drawing is contract context, not a direct layout template for the saw opening.",
        ],
        "resources": [
            "plans/top-machining-sequence.md",
            "plans/top-build.md",
            "plans/validation.md",
        ],
        "media": [
            "drawings/top-dimensioned.svg",
            "renders/section-cuts.svg",
        ],
        "gate_ids": ["precision-survey-gate", "miter-station-fit-gate"],
    },
    11: {
        "summary": "The router zone is compact, high-use, and easy to make annoying if access is not checked.",
        "focus": "Fit the lift flush and keep the access hatch honest.",
        "warnings": [
            "Do not let fence hardware block real service access.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/tool-list.md",
            "plans/dust-power.md",
        ],
        "media": [
            "drawings/right-module-elevation.svg",
            "drawings/top-dimensioned.svg",
        ],
    },
    12: {
        "summary": "The right bay is still a proof item. The website should make that visible everywhere, not just in one note.",
        "focus": "Run the mockup, then cut the service parts from the template that mockup proves.",
        "warnings": [
            "The modeled headroom is only 0.35 in.",
        ],
        "resources": [
            "plans/right-bay-mockup.md",
            "plans/dust-power.md",
            "plans/no-cut-yet-checklist.md",
        ],
        "media": [
            "drawings/right-bay-packaging.svg",
            "drawings/right-module-elevation.svg",
        ],
        "gate_ids": ["right-bay-mockup-gate"],
    },
    13: {
        "summary": "Only now do the face-fit and service panels get their final trim.",
        "focus": "Final-fit the removable faces after the service order is proven, not before.",
        "warnings": [
            "Do not lock the mockup-era parts too early.",
        ],
        "resources": [
            "plans/assembly.md",
            "plans/no-cut-yet-checklist.md",
            "plans/panel-label-map.md",
        ],
        "media": [
            "drawings/front-elevation.svg",
            "drawings/right-module-elevation.svg",
        ],
        "gate_ids": ["face-fit-gate", "right-bay-mockup-gate"],
    },
    14: {
        "summary": "Finish is now deliberately lightweight: ease edges, seal raw cuts, preserve the prefinished working faces.",
        "focus": "This is shop furniture. Finish should support use, not become its own project.",
        "warnings": [
            "Do not coat fit-critical surfaces before they are proven.",
        ],
        "resources": [
            "plans/finish-schedule.md",
            "plans/validation.md",
            "docs/bench-requirements.md",
        ],
        "media": [
            "drawings/front-elevation.svg",
            "renders/top-view.svg",
        ],
    },
}

STEP_VIEWER = {
    1: {
        "preset": "assembled",
        "highlight_assemblies": ["top", "miter_station", "saw", "router", "dust"],
        "callouts": [
            "Use the full bench view to orient the fixed-top package before cutting anything.",
            "The site model shows where the field-fit zones live without pretending they are already proven.",
            "Right-bay crowding and the centered miter station are visible immediately in this overview lens.",
        ],
    },
    2: {
        "preset": "plinth",
        "highlight_assemblies": ["plinth"],
        "callouts": [
            "This lens isolates the mobile foundation so twist and caster placement are easy to inspect.",
            "Treat the plinth as the first datum, not just a rolling base.",
        ],
    },
    3: {
        "preset": "left_module",
        "highlight_assemblies": ["left_module"],
        "callouts": [
            "The cubby partition is driven by the clear opening, not by a one-off raw dimension.",
            "Drawer envelopes are shown for fit and access, even though the model does not decompose every drawer part.",
        ],
    },
    4: {
        "preset": "saw_chassis",
        "highlight_assemblies": ["center_module", "saw"],
        "callouts": [
            "The chassis stays open because the saw fit, dust elbow, and wrench access are all still live constraints.",
            "The deck is modeled as adjustable, matching the actual cradle strategy in the packet.",
        ],
    },
    5: {
        "preset": "right_service",
        "highlight_assemblies": ["right_module", "dust", "router"],
        "callouts": [
            "The shell is buildable now, but the service package is still mockup-gated.",
            "Use the guide lens to see how the rail keep-clear lanes cut through the same territory as the right-bay service story.",
        ],
    },
    6: {
        "preset": "carcass_alignment",
        "highlight_assemblies": ["left_module", "center_module", "right_module"],
        "callouts": [
            "This view is about aligning the three modules before the top removes your adjustment freedom.",
            "Explode the carcass slightly to inspect seams and joining surfaces before fastening.",
        ],
    },
    7: {
        "preset": "top_panels",
        "highlight_assemblies": ["top", "guides"],
        "callouts": [
            "The top is its own subassembly now. The 3D atlas makes the split seam and opening relationships obvious.",
            "Guide geometry shows why the seam was moved forward of the saw-opening shoulder.",
        ],
    },
    8: {
        "preset": "table_saw_fit",
        "highlight_assemblies": ["center_module", "saw", "top"],
        "callouts": [
            "This is the field-fit bridge between concept geometry and real machining.",
            "The viewer deliberately shows the saw as an envelope and the opening as a target, not as a permission slip to machine from nominal coordinates.",
        ],
    },
    9: {
        "preset": "miter_station",
        "highlight_assemblies": ["miter_station", "top", "guides"],
        "callouts": [
            "Deploy the station in the viewer to understand how the tray, cover, and support spans relate.",
            "The DCS781 envelope comes from accepted public dimensions. Real tray fit and shimming still happen later from the real tool.",
            "Any stop-track near the fence line remains a field-fit operation after installation.",
        ],
    },
    10: {
        "preset": "top_machining",
        "highlight_assemblies": ["top", "saw", "router", "guides"],
        "callouts": [
            "This lens is about machining order and protected areas, not about using the 3D numbers as a direct cut template.",
            "Turn guides on to inspect keep-clear lanes, miter support spans, and the router recess footprint together.",
        ],
    },
    11: {
        "preset": "router_zone",
        "highlight_assemblies": ["router", "top", "right_module"],
        "callouts": [
            "The router package is compact, so access and fence-removal assumptions matter.",
            "Use this lens to verify that the router zone stays compatible with the right miter support span.",
        ],
    },
    12: {
        "preset": "dust_service",
        "highlight_assemblies": ["dust", "right_module", "guides"],
        "callouts": [
            "This is intentionally a service and mockup view, not a frozen production layout.",
            "The guide envelope and exploded packages make the 0.35 in headroom risk much easier to understand than text alone.",
        ],
    },
    13: {
        "preset": "right_service",
        "highlight_assemblies": ["right_module", "dust"],
        "callouts": [
            "Final-fit the removable faces only after the right-bay service sequence is proven in the real world.",
            "The subpanel and service face stay separate in the viewer because they stay separate in the build packet.",
        ],
    },
    14: {
        "preset": "final_walkthrough",
        "highlight_assemblies": ["top", "miter_station", "saw", "router", "dust"],
        "callouts": [
            "Finish is deliberately lightweight, and the viewer reflects that by keeping the working faces and service logic central.",
            "This final lens is a walkthrough, not a demand for cosmetic perfection.",
        ],
    },
}


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def title_from_path(relative_path: str) -> str:
    stem = Path(relative_path).stem.replace("-", " ").replace("_", " ")
    return stem.title()


def first_markdown_paragraph(text: str) -> str:
    for block in text.split("\n\n"):
        stripped = block.strip()
        if not stripped or stripped.startswith("#") or stripped.startswith(">"):
            continue
        return " ".join(line.strip() for line in stripped.splitlines())
    return ""


def extract_markdown_headings(text: str) -> list[dict[str, str]]:
    headings: list[dict[str, str]] = []
    for line in text.splitlines():
        if line.startswith("#"):
            hashes, title = line.split(" ", 1)
            headings.append({"depth": str(len(hashes)), "title": title.strip()})
    return headings


def parse_csv_resource(path: Path) -> dict[str, object]:
    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        rows = list(reader)
        columns = reader.fieldnames or []
    preview = rows[:8]
    return {
        "columns": columns,
        "rows": rows,
        "preview_rows": preview,
        "summary": f"{len(rows)} rows, {len(columns)} columns",
    }


def parse_json_resource(path: Path) -> dict[str, object]:
    parsed = json.loads(path.read_text())
    pretty = json.dumps(parsed, indent=2)
    top_keys = list(parsed.keys()) if isinstance(parsed, dict) else []
    return {
        "pretty": pretty,
        "summary": f"{len(top_keys)} top-level keys",
    }


def copy_media(relative_path: str) -> str:
    source = REPO_ROOT / relative_path
    target = MEDIA_ROOT / relative_path
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)
    return f"/generated/media/{relative_path}"


def resource_category(relative_path: str) -> str:
    return relative_path.split("/", 1)[0]


def build_resources() -> tuple[list[dict[str, object]], dict[str, dict[str, object]], list[dict[str, str]]]:
    resources: list[dict[str, object]] = []
    by_id: dict[str, dict[str, object]] = {}
    media: list[dict[str, str]] = []

    for relative_path in RESOURCE_PATHS:
        path = REPO_ROOT / relative_path
        suffix = path.suffix.lower()
        resource: dict[str, object] = {
            "id": relative_path,
            "path": relative_path,
            "title": title_from_path(relative_path),
            "category": resource_category(relative_path),
            "extension": suffix[1:],
        }

        if suffix == ".md":
            text = path.read_text()
            title = extract_markdown_headings(text)[0]["title"] if extract_markdown_headings(text) else resource["title"]
            resource.update(
                {
                    "title": title,
                    "type": "markdown",
                    "summary": first_markdown_paragraph(text),
                    "headings": extract_markdown_headings(text),
                    "body": text,
                }
            )
        elif suffix == ".csv":
            parsed = parse_csv_resource(path)
            resource.update(
                {
                    "type": "csv",
                    "summary": parsed["summary"],
                    "columns": parsed["columns"],
                    "rows": parsed["rows"],
                    "preview_rows": parsed["preview_rows"],
                }
            )
        elif suffix == ".json":
            parsed = parse_json_resource(path)
            resource.update(
                {
                    "type": "json",
                    "summary": parsed["summary"],
                    "body": parsed["pretty"],
                }
            )
        elif suffix == ".svg":
            media_path = copy_media(relative_path)
            resource.update(
                {
                    "type": "image",
                    "summary": "Vector drawing or rendered bench view",
                    "media_path": media_path,
                }
            )
            media.append(
                {
                    "id": relative_path,
                    "title": resource["title"],
                    "path": media_path,
                    "category": resource["category"],
                }
            )
        else:
            continue

        resources.append(resource)
        by_id[relative_path] = resource

    return resources, by_id, media


def parse_checklist_sections(path: Path) -> list[dict[str, object]]:
    text = path.read_text()
    pattern = re.compile(r"^## (.+)$", re.MULTILINE)
    matches = list(pattern.finditer(text))
    sections: list[dict[str, object]] = []
    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        body = text[start:end].strip()
        parts = re.findall(r"`([A-Z]+-\d+[A-Z]?)`", body)
        sections.append(
            {
                "id": slugify(match.group(1)),
                "title": match.group(1),
                "parts": parts,
                "body": body,
            }
        )
    return sections


def parse_assembly_steps(path: Path) -> list[dict[str, object]]:
    text = path.read_text()
    pattern = re.compile(r"^## (\d+)\. (.+)$", re.MULTILINE)
    matches = list(pattern.finditer(text))
    steps: list[dict[str, object]] = []
    for index, match in enumerate(matches):
        step_number = int(match.group(1))
        title = match.group(2).strip()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        body = text[start:end]
        parts: list[str] = []
        actions: list[str] = []
        hold_points: list[str] = []
        current = None
        for raw_line in body.splitlines():
            line = raw_line.rstrip()
            stripped = line.strip()
            if stripped == "Parts:":
                current = "parts"
                continue
            if stripped == "Steps:":
                current = "steps"
                continue
            if stripped == "Hold point:":
                current = "hold"
                continue
            if not stripped:
                continue
            if current == "parts" and stripped.startswith("- "):
                parts.append(stripped[2:].strip("`"))
            elif current == "steps" and re.match(r"^\d+\.", stripped):
                actions.append(re.sub(r"^\d+\.\s*", "", stripped))
            elif current == "hold" and stripped.startswith("- [ ] "):
                hold_points.append(stripped[6:])

        meta = STEP_METADATA[step_number]
        steps.append(
            {
                "id": f"step-{step_number}",
                "number": step_number,
                "title": title,
                "slug": slugify(title),
                "summary": meta["summary"],
                "focus": meta["focus"],
                "warnings": meta.get("warnings", []),
                "parts": parts,
                "actions": actions,
                "hold_points": hold_points,
                "resources": meta["resources"],
                "media": meta["media"],
                "gate_ids": meta.get("gate_ids", []),
                "viewer": STEP_VIEWER[step_number],
            }
        )
    return steps


def load_csv_rows(relative_path: str) -> list[dict[str, str]]:
    with (REPO_ROOT / relative_path).open(newline="") as handle:
        return list(csv.DictReader(handle))


def build_dashboard(resources: list[dict[str, object]], steps: list[dict[str, object]], gates: list[dict[str, object]]) -> dict[str, object]:
    cutlist_rows = load_csv_rows("plans/cut-list-final.csv")
    bom_rows = load_csv_rows("plans/bom.csv")
    measurements_rows = load_csv_rows("data/measurements.csv")

    build_gated = [
        row["part_id"]
        for row in cutlist_rows
        if row["gate"] not in {"cut_now", "stage2"}
    ]

    return {
        "headline": "A digital build manual for the fixed-top SKIL bench",
        "subheadline": "Step-by-step instructions, drawings, gates, and living project data in one place.",
        "stats": [
            {"label": "Build stages", "value": str(len(steps))},
            {"label": "Live resources", "value": str(len(resources))},
            {"label": "Gated parts", "value": str(len(build_gated))},
            {"label": "Drawings and renders", "value": str(sum(1 for resource in resources if resource["type"] == "image"))},
        ],
        "project_snapshot": [
            "90 x 48 x 36 in fixed-top bench",
            "SKIL SPT99-11 integrated as the ripping platform",
            "DeWALT DCS781 flip-top miter station at bench center",
            "Right-side router lift and internal dust/power service bay",
        ],
        "data_cards": [
            {"label": "Cut-list parts", "value": str(len(cutlist_rows))},
            {"label": "BOM lines", "value": str(len(bom_rows))},
            {"label": "Measurements tracked", "value": str(len(measurements_rows))},
            {"label": "Gate boards", "value": str(len(gates))},
        ],
    }


def build_data() -> dict[str, object]:
    if GENERATED_ROOT.exists():
        shutil.rmtree(GENERATED_ROOT)
    MEDIA_ROOT.mkdir(parents=True, exist_ok=True)

    resources, resources_by_id, media = build_resources()
    steps = parse_assembly_steps(REPO_ROOT / "plans/assembly.md")
    gates = parse_checklist_sections(REPO_ROOT / "plans/no-cut-yet-checklist.md")
    dashboard = build_dashboard(resources, steps, gates)

    return {
        "dashboard": dashboard,
        "steps": steps,
        "gates": gates,
        "resources": resources,
        "resource_index": {
            "docs": [resource["id"] for resource in resources if resource["category"] == "docs"],
            "models": [resource["id"] for resource in resources if resource["category"] == "models"],
            "plans": [resource["id"] for resource in resources if resource["category"] == "plans"],
            "drawings": [resource["id"] for resource in resources if resource["category"] == "drawings"],
            "renders": [resource["id"] for resource in resources if resource["category"] == "renders"],
            "data": [resource["id"] for resource in resources if resource["category"] == "data"],
        },
        "media": media,
        "landing_resource": "plans/assembly.md",
        "landing_step": "step-1",
        "notes": [
            "The live 3D atlas is generated from the current fixed-top data and cut-list contract, not from the obsolete sliding-carriage prototype.",
            "Field-fit and mockup-gated steps stay labeled as such in the site instead of being flattened into fake certainty.",
        ],
    }


def main() -> int:
    SITE_ROOT.mkdir(exist_ok=True)
    data = build_data()
    generate_bench_model()
    DATA_PATH.write_text(json.dumps(data, indent=2))
    print(f"built instructions site data at {DATA_PATH.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
