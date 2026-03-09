# Skilsaw Garage Bench

This workspace contains a build package for an integrated garage bench built around a `SKIL SPT99-11` table saw. The package is organized the way a software project would be: requirements first, then structured design data, then build artifacts, then validation scripts.

## Directory Layout

- `docs/` design intent, research notes, and product strategy
- `data/` authoritative measurements and machine-readable layout data
- `plans/` BOM, cut list, hardware, build sequence, dust/power, finish, assembly-mode, and validation guides
- `plans/stripped-saw-survey.md` printable survey checklist for the bare saw before precision cuts
- `renders/` editable SVG concept drawings generated from `data/layout.json`
- `tools/` validation and rendering scripts

## Design Snapshot

- Overall bench size: `90 in L x 48 in D x 36 in H`
- Parked orientation: long side on the wall, rolled straight out for serious work
- Saw strategy: keep the current front-to-back feed direction, add a removable left-side sliding carriage for large-panel crosscuts, and preserve deep right-side rip support
- Top strategy: three-field fixed top plus a fold-out left support table, not a front-wing-centric crosscut layout
- Router strategy: stage-1 `JessEm Rout-R-Lift II 02310` with a `Bosch 1617EVS` class motor at the far right end
- Dust strategy: internal `Hercules HE028` on a front pull-out tray + `Oneida Dust Deputy Low-Pro` bucket separator + Rockler `2-1/2 in` manifold
- Assembly strategy: keep the permanent top clean, dedicate the left field to the sliding-carriage package, and treat any larger clamping surface as a removable overlay rather than routing permanent tracks into the new carriage zone

## Validation Commands

Run these from the workspace root:

```bash
python3 tools/validate_measurements.py data/measurements.csv
python3 tools/validate_layout.py data/layout.json data/measurements.csv
python3 tools/validate_cutlist.py plans/cut-list.csv
python3 tools/render_layout.py data/layout.json renders
```

Use the precision gate before drilling the cradle or machining the final top:

```bash
python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv
python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv
```

## Important Caveat

This package is detailed, but it still calls out a few field-fit items that must be verified on the actual saw before cutting final precision surfaces:

- actual stripped-saw blade front-to-back datum
- saw mounting-hole pattern, foot geometry, and underside protrusions
- exact underside rail travel envelope at minimum, mid, and maximum rip settings
- final hose sweep around the dust elbow through height and bevel changes
- final hose-cuff and tray clearances for the selected Hercules plus Low-Pro package
- final sliding-carriage park clearance, guide-strip hardware, and left support-table stop geometry
