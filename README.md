# Skilsaw Garage Bench

> Status: concept-valid only. This sliding-carriage variant is not shop-ready until the stripped-saw survey, carriage/support-table fit-up, and right-bay dust mockup are complete.

This workspace contains a build package for an integrated garage bench built around a `SKIL SPT99-11` table saw. The package is organized the way a software project would be: requirements first, then structured design data, then build artifacts, then validation scripts.

## Directory Layout

- `docs/` design intent, research notes, and product strategy
- `data/` authoritative measurements and machine-readable layout data
- `plans/` BOM, rough and final cut lists, hardware, build sequence, dust/power, finish, assembly-mode, and validation guides
- `plans/stripped-saw-survey.md` printable survey checklist for the bare saw before precision cuts
- `renders/` editable SVG concept drawings generated from `data/layout.json` and explicitly marked concept-only
- `tools/` validation and rendering scripts

## Design Snapshot

- Overall bench size: `90 in L x 48 in D x 36 in H`
- Parked orientation: long side on the wall, rolled straight out for serious work
- Saw strategy: keep the current front-to-back feed direction, add a removable left-side sliding carriage for large-panel crosscuts, and preserve deep right-side rip support
- Top strategy: three-field fixed top plus a fold-out left support table, not a front-wing-centric crosscut layout
- Opening strategy: target a tight support gap around the cast top instead of a broad perimeter moat
- Router strategy: stage-1 `JessEm Rout-R-Lift II 02310` with a `Bosch 1617EVS` class motor at the far right end
- Dust strategy: internal `Hercules HE028` on a fixed low deck or UHMW skid base + `Oneida Dust Deputy Low-Pro` bucket separator + Rockler `2-1/2 in` manifold, but still mockup-gated for real service fit
- Assembly strategy: keep the permanent top clean, dedicate the left field to the sliding-carriage package, and treat any larger clamping surface as a removable overlay rather than routing permanent tracks into the new carriage zone

## Validation Commands

Run these from the workspace root:

```bash
python3 tools/validate_measurements.py data/measurements.csv
python3 tools/validate_layout.py data/layout.json data/measurements.csv
python3 tools/validate_cutlist.py plans/cut-list-final.csv plans/bom.csv data/layout.json
python3 tools/render_layout.py data/layout.json renders
```

Use the precision gate before drilling the cradle or machining the final top:

```bash
python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv
python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv
```

## Important Caveats

This package still has two hard gates that must not be hand-waved away:

- stripped-saw survey before the final saw opening, cradle drilling, slot-routing geometry, and carriage guide geometry are frozen
- real-world right-bay packaging mockup before the Hercules and Low-Pro package is treated as proven serviceable

Current owner-approved assumptions that stay in force unless changed later:

- the permanent core still stays at `90 x 48`
- the sliding carriage wins the left field at the expense of the old drawer-bank and fixed-T-track plan
- sequential bucket-first, extractor-second dust-bay service is acceptable if the path is honest and affordable
