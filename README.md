# Skilsaw Garage Bench

> Status: active fixed-top build package. `codex/bench-validation-hardening` is the base lineage, `codex/bench-survey-contract-hardening` hardened the stripped-saw contract, `codex/bench-program-reset` reset the product goals, `codex/bench-fixed-top-layout` rewrote the layout contract, and this branch refreshes the builder package to match. The sliding-carriage branches are superseded history, not the active path.

This workspace contains a build package for an integrated garage bench built around a `SKIL SPT99-11` table saw, a right-side router lift, and a centered flip-top miter station. The package stays organized like a software project: requirements first, then structured design data, then build artifacts, then validation scripts.

## Directory Layout

- `docs/` design intent, research notes, and product strategy
- `data/` authoritative measurements and machine-readable layout data
- `plans/` BOM, rough and final cut lists, hardware, build sequence, dust/power, finish, assembly-mode, and validation guides
- `models/` generated 3D model contract and notes for the instructions site atlas
- `site/` interactive instructions website and live 3D atlas built from the current plans, drawings, and data
- `plans/stripped-saw-survey.md` printable survey checklist for the bare saw before precision cuts
- `plans/miter-saw-survey.md` public-spec sheet plus fit-only notes for the DeWalt miter saw and flip-top tuning
- `drawings/` builder-facing SVG drawings keyed to parts and subassemblies
- `renders/` editable SVG concept drawings generated from `data/layout.json`
- `tools/` validation and rendering scripts

## Design Snapshot

- Overall bench size: `90 in L x 48 in D x 36 in H`
- Parked orientation: long side on the wall, rolled straight out for serious work
- Table-saw strategy: `SKIL SPT99-11` feeding across the `48 in` depth with real right-hand and outfeed support
- Top strategy: fixed `90 x 48` work surface with no expandable wings
- Miter strategy: centered front-side flip-top station sized from public `DeWALT DCS781` dimensions with field-fit bolt transfer and adjustable height tuning
- Router strategy: stage-1 `JessEm Rout-R-Lift II 02310` with a `Bosch 1617EVS` class motor at the far right end
- Dust strategy: internal `Hercules HE028` on a fixed low deck plus `Oneida Dust Deputy Low-Pro` plus Rockler `2-1/2 in` manifold, with flex-hose support for mobile tools including the miter saw
- Assembly strategy: keep the permanent top clean on day one and reserve meaningful clamping complexity for a removable overlay

## Validation Commands

Run these from the workspace root:

```bash
python3 tools/validate_measurements.py data/measurements.csv
python3 tools/validate_layout.py data/layout.json data/measurements.csv
python3 tools/validate_cutlist.py plans/cut-list-final.csv plans/bom.csv
python3 tools/render_layout.py data/layout.json renders
python3 tools/build_bench_model.py
npm --prefix site run build
```

Use the precision gate before drilling the cradle or machining the final top:

```bash
python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv
python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv
```

Those strict commands now mean: stripped-saw precision rows are resolved and the accepted public `DCS781` envelope still fits the contract. They do not replace the later manual tray-fit, hard-stop, shim, and flex-hose proof steps for the real miter saw.

## Hard Gates

These gates still remain in force:

- actual table-saw fit before the final saw opening and mounting-deck drilling are frozen
- real-world right-bay packaging mockup before the Hercules and Low-Pro package is treated as proven serviceable
- actual miter-station fit before the tray bolt pattern, hard stops, and latch tuning are frozen

Current owner-approved assumptions that stay in force unless changed later:

- no redesign of the two-layer fixed top just to appease generalized garage-humidity concerns
- sequential bucket-first, extractor-second dust-bay service is acceptable if the path is honest and affordable
- the sliding-carriage and precision-wing lineage is abandoned in favor of the fixed-top plus miter-station direction
