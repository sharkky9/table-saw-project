# No-Cut-Yet Checklist

Do **not** cut these parts to final size until the stated gate is open.

## Stripped-Saw Survey Gate

- [ ] `CM-05`
- [ ] `TOP-01A`
- [ ] `TOP-01B`
- [ ] `TOP-01C`
- [ ] `TOP-02A`
- [ ] `TOP-02B`
- [ ] `TOP-02C`
- [ ] `SC-01`
- [ ] `SC-02`

These parts may be rough-cut only until:

- `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes

## Service-Layout Gate

- [ ] `RM-02` final notch cut
- [ ] `RM-05` back-panel service cutouts
- [ ] `RM-10` control-subpanel cutouts and disconnect layout

Do not finalize these until the real service layout is marked from the actual manifold and switch hardware.

## Right-Bay Mockup Gate

- [ ] `RM-06`
- [ ] `RM-08`

Do not finalize the service face or Hercules support deck until [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/right-bay-mockup.md) passes.

## Support-Table Fit Gate

- [ ] `ST-04`
- [ ] `ST-05`

Do not final-trim the support-table leg or foot until the hinge, hard stops, and bracket geometry are installed and adjusted.

## Support-Drawer Fit Gate

- [ ] `LM-02`
- [ ] `LM-06`

Do not lock the left-module partition or shallow-storage parts until the support drawer runner geometry and carriage path are proven in the real module.

## Carriage-Fit Gate

- [ ] `SC-03`
- [ ] `SC-04`
- [ ] `SC-05`

Do not final-drill the carriage fence, stop hardware, or runner backers until the carriage glides cleanly in the real guide zone.
