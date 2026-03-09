# No-Cut-Yet Checklist

Do not finalize the operations or parts below until the stated gate is open.

The stripped-saw survey no longer blocks rough-cutting the fixed-top blanks to size. It still blocks precision machining, final saw drilling, and the survey-gated miter-station parts.

## Precision-Survey Gate

- [ ] `CM-06`
- [ ] `MS-01`
- [ ] `MS-04`
- [ ] `MS-05`
- [ ] `MS-06`

Do not finalize these until:

- `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes
- the actual saw is set flush on the mounting deck
- the actual miter-saw survey is complete and copied into `data/measurements.csv`

These precision operations stay blocked by the same gate even though the panel blanks can be cut now:

- `TOP-02A` final saw opening and local relief trimming
- `TOP-02B` and `TOP-02C` final miter-station opening edge cleanup
- router recess and through-opening
- underside rail-relief machining
- final saw mounting-deck bolt-hole drilling

## Miter-Station Fit Gate

- [ ] `MS-02`
- [ ] `MS-03`
- [ ] `FT-01`
- [ ] `FT-02`
- [ ] `FT-03`

Do not finalize these until:

- the pivot hardware is dry-fit in the real front bay
- the deployed hard stops prove the tray returns to the target height
- the stowed cover proves flush or slightly low across the opening

## Face-Fit Gate

- [ ] `LM-07`
- [ ] `LM-08`
- [ ] `LM-09`

Do not cut applied drawer fronts to final size until the left module is assembled square and the drawer openings are real.

## Service-Layout Gate

- [ ] `RM-02`
- [ ] `RM-05`
- [ ] `RM-10`

Do not finalize these until the real service layout is marked from the actual manifold, switch, and hose hardware.

## Right-Bay Mockup Gate

- [ ] `RM-06`
- [ ] `RM-08`

Do not finalize the service face or Hercules base until [right-bay-mockup.md](./right-bay-mockup.md) passes.
