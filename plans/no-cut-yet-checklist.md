# No-Cut-Yet Checklist

Do **not** finalize these operations or features until the stated gate is open.

The stripped-saw survey no longer blocks cutting the top and wing blanks to size. It still blocks precision machining and final saw drilling.

## Precision-Machining Gate

- [ ] `TOP-01A` saw opening
- [ ] `TOP-01B` local right-front reliefs
- [ ] `TOP-02A` saw opening and rear-support slot routing
- [ ] `TOP-02B` local right-front reliefs
- [ ] `FW-01` slot routing
- [ ] `FW-02` slot routing and seam-edge final trimming
- [ ] `CM-06` final saw bolt-hole drilling

Do not finalize these until:

- `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes
- the actual saw is set flush on the mounting deck
- the wing has passed its deploy/stow proof procedure

## Face-Fit Gate

- [ ] `LM-07`
- [ ] `LM-08`
- [ ] `LM-09`

Do not cut applied drawer fronts to final size until the left module is assembled square and the drawer openings are real.

## Service-Layout Gate

- [ ] `RM-02` final notch transfer and cut verification
- [ ] `RM-05` back-panel service cutouts
- [ ] `RM-10` control-subpanel cutouts and disconnect layout

Do not finalize these until the real service layout is marked from the actual manifold, switch, and hose hardware.

## Right-Bay Mockup Gate

- [ ] `RM-06`
- [ ] `RM-08`

Do not finalize the service face or Hercules base until [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/right-bay-mockup.md) passes.

## Wing-Fit Gate

- [ ] `FW-04`
- [ ] `FW-05`

Do not final-trim the wing support legs or center foot until the hinge, pins, stop screws, and brackets are installed and adjusted.
