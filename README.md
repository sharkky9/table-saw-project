# Skilsaw Garage Bench

> Status: active design reset. `codex/bench-validation-hardening` is the base lineage, `codex/bench-survey-contract-hardening` hardened the stripped-saw contract, and this branch resets the product docs to the fixed-top direction. The sliding-carriage branches are superseded history, not the active path.

This workspace contains a build package for an integrated garage bench built around a `SKIL SPT99-11` table saw, a right-side router lift, and a centered flip-top miter station. The package stays organized like a software project: requirements first, then structured design data, then build artifacts, then validation scripts.

## Directory Layout

- `docs/` design intent, research notes, and product strategy
- `data/` authoritative measurements and machine-readable layout data
- `plans/` BOM, rough and final cut lists, hardware, build sequence, dust/power, finish, assembly-mode, and validation guides
- `plans/stripped-saw-survey.md` printable survey checklist for the bare saw before precision cuts
- `drawings/` builder-facing SVG drawings keyed to parts and subassemblies
- `renders/` editable SVG concept drawings generated from `data/layout.json`
- `tools/` validation and rendering scripts

## Design Snapshot

- Overall bench size: `90 in L x 48 in D x 36 in H`
- Parked orientation: long side on the wall, rolled straight out for serious work
- Table-saw strategy: `SKIL SPT99-11` feeding across the `48 in` depth with real right-hand and outfeed support
- Top strategy: fixed `90 x 48` work surface with no expandable wings
- Miter strategy: centered front-side flip-top station sized around the user's `DeWalt 60V 12 in` cordless sliding miter saw
- Router strategy: stage-1 `JessEm Rout-R-Lift II 02310` with a `Bosch 1617EVS` class motor at the far right end
- Dust strategy: internal `Hercules HE028` on a fixed low deck + `Oneida Dust Deputy Low-Pro` + Rockler `2-1/2 in` manifold, with flex-hose support for mobile tools including the miter saw
- Assembly strategy: keep the permanent top clean on day one and reserve meaningful clamping complexity for a removable overlay

## Validation Commands

Run these from the workspace root:

```bash
python3 tools/validate_measurements.py data/measurements.csv
python3 tools/validate_layout.py data/layout.json data/measurements.csv
python3 tools/validate_cutlist.py plans/cut-list-final.csv plans/bom.csv
python3 tools/render_layout.py data/layout.json renders
```

Use the precision gate before drilling the cradle or machining the final top:

```bash
python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv
python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv
```

## Important Caveats

This branch resets the written program direction before the layout contract catches up. The current machine-readable layout still reflects the legacy wing-based geometry and will be rewritten in the next stacked PR.

The hard gates that remain in force are:

- actual table-saw fit before the final saw opening and mounting-deck drilling are frozen
- real-world right-bay packaging mockup before the Hercules and Low-Pro package is treated as proven serviceable
- actual miter-saw survey before the flip-top station geometry is frozen

Current owner-approved assumptions that stay in force unless changed later:

- no redesign of the MDF-over-plywood top just to appease generalized garage-humidity concerns
- sequential bucket-first, extractor-second dust-bay service is acceptable if the path is honest and affordable
- the sliding-carriage and precision-wing lineage is abandoned in favor of the fixed-top plus miter-station direction
