# No-Cut-Yet Checklist

Do **not** cut these parts to final size until the stated gate is open.

## Stripped-Saw Survey Gate

- [ ] `CM-05`
- [ ] `TOP-01A`
- [ ] `TOP-01B`
- [ ] `TOP-02A`
- [ ] `TOP-02B`
- [ ] `FW-01`
- [ ] `FW-02`

These parts may be rough-cut only until:

- `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes

## Face-Fit Gate

- [ ] `LM-07`
- [ ] `LM-08`
- [ ] `LM-09`

Do not cut applied drawer fronts to final size until the left module is assembled square and the drawer openings are real.

## Service-Layout Gate

- [ ] `RM-02` final notch cut
- [ ] `RM-05` back-panel service cutouts
- [ ] `RM-10` manifold/control plate cutouts

Do not finalize these until the real service layout is marked from the actual manifold and switch hardware.

## Right-Bay Mockup Gate

- [ ] `RM-06`
- [ ] `RM-08`

Do not finalize the service face or Hercules base until [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/right-bay-mockup.md) passes.

## Wing-Fit Gate

- [ ] `FW-04`
- [ ] `FW-05`

Do not final-trim the wing support legs or center foot until the hinge, pins, stop screws, and brackets are installed and adjusted.
