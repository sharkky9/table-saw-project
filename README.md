# Skilsaw Garage Bench

> Status: concept-valid only. This package is not shop-ready until the stripped-saw survey, right-bay dust mockup, and detail-package work are complete.

This workspace contains a build package for an integrated garage bench built around a `SKIL SPT99-11` table saw. The package is organized the way a software project would be: requirements first, then structured design data, then build artifacts, then validation scripts.

## Directory Layout

- `docs/` design intent, research notes, and product strategy
- `data/` authoritative measurements and machine-readable layout data
- `plans/` BOM, rough and final cut lists, hardware, build sequence, dust/power, finish, assembly-mode, and validation guides
- `plans/stripped-saw-survey.md` printable survey checklist for the bare saw before precision cuts
- `renders/` editable SVG concept drawings generated from `data/layout.json`
- `tools/` validation and rendering scripts

## Design Snapshot

- Overall bench size: `90 in L x 48 in D x 36 in H`
- Parked orientation: long side on the wall, rolled straight out for serious work
- Saw strategy: left-biased placement for conventional left-slot crosscuts plus deep right-side rip support
- Top strategy: L-shaped fixed top plus a fold-down front wing, not a single `90 x 48` slab
- Opening strategy: target `1/32 in` general support gap around the cast top, with no broad quarter-inch moat
- Router strategy: stage-1 `JessEm Rout-R-Lift II 02310` with a `Bosch 1617EVS` class motor at the far right end
- Dust strategy: internal `Hercules HE028` on a fixed low deck + `Oneida Dust Deputy Low-Pro` + Rockler `2-1/2 in` manifold, but still mockup-gated for real service fit
- Assembly strategy: keep the permanent saw/outfeed top clean on day one and push meaningful clamp features into a removable overlay instead of fixed T-tracks

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

This package still has two hard gates that must not be hand-waved away:

- stripped-saw survey before the final saw opening, cradle drilling, and slot-routing geometry are frozen
- real-world right-bay packaging mockup before the Hercules and Low-Pro package is treated as proven serviceable

Current owner-approved assumptions that stay in force unless changed later:

- no redesign of the MDF-over-plywood top just to appease generalized garage-humidity concerns
- sequential bucket-first, extractor-second dust-bay service is acceptable if the path is honest and affordable
