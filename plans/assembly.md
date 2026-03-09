# Assembly Instructions

## Before You Start

Read these first:

- [prebuild-checklist.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/prebuild-checklist.md)
- [no-cut-yet-checklist.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/no-cut-yet-checklist.md)
- [tool-list.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/tool-list.md)
- [joint-strategy.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/joint-strategy.md)
- [panel-label-map.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/panel-label-map.md)
- [top-machining-sequence.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/top-machining-sequence.md)

## Build Sequence

1. Stripped-saw survey
2. Plinth
3. Left module
4. Center saw chassis
5. Right service module
6. Join modules
7. Rough top blanks
8. Saw fit
9. Wing mechanism
10. Top machining
11. Router install
12. Dust and power
13. Drawers and service panels
14. Finish

## 1. Stripped-Saw Survey

- Print [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/stripped-saw-survey.md).
- Record every required measurement in [data/measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw/data/measurements.csv).
- Do not continue to top machining until the precision-gate commands pass.

Hold point:

- [ ] survey complete
- [ ] precision gate open

## 2. Plinth

Parts:

- `PL-01`
- `PL-02`
- `PL-03`
- `PL-04`

Steps:

1. Build the `84 x 39 in` plinth rectangle from `PL-01` and `PL-02`.
2. Install `PL-03` crossmembers evenly.
3. Install `PL-04` caster reinforcement blocks at the selected caster locations.
4. Install the selected leveling casters.

Hold point:

- [ ] plinth diagonals match
- [ ] plinth rolls and settles cleanly

## 3. Left Module

Parts:

- `LM-01` through `LM-09`
- `DR-01` through `DR-07`

Steps:

1. Build the carcass from `LM-01`, `LM-02`, `LM-03`, and `LM-04`.
2. Place the partition so the clear openings are:
   - `7.5 in` vertical cubby
   - `18 in` drawer bay
3. Install `LM-05` only after the box is square.
4. Install `LM-06` shelves.
5. Build three drawer boxes from `DR-*`.
6. Do not final-fit `LM-07`, `LM-08`, or `LM-09` until the cabinet is real and the reveal can be checked.

Hold point:

- [ ] module square before back panel
- [ ] drawer bay clear width verified

## 4. Center Saw Chassis

Parts:

- `CM-01` through `CM-05`

Steps:

1. Build the open frame from `CM-01`, `CM-02`, and `CM-03`.
2. Install `CM-04` ledgers at the nominal mount-plane height.
3. Leave `CM-05` rough until the stripped-saw survey is complete.
4. Build the cradle per [saw-cradle.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/saw-cradle.md).

Hold point:

- [ ] open lower well remains clear for dust hose and bevel motion
- [ ] cradle stays adjustable

## 5. Right Service Module

Parts:

- `RM-01` through `RM-10`

Steps:

1. Build the module shell from `RM-01`, `RM-03`, and `RM-04`.
2. Cut the notches in `RM-02` only after marking the real keep-clear strategy from the current layout.
3. Install `RM-05` only after service cutouts are marked.
4. Fit `RM-06` as a removable front service face.
5. Fit `RM-07` router hatch.
6. Leave `RM-08` and `RM-10` as mockup-gated parts until the right-bay package is proven.

Hold point:

- [ ] service face removable
- [ ] no full-height divider enters the rail keep-clear lanes

## 6. Join Modules

1. Set all three modules on the plinth.
2. Clamp top edges flush.
3. Join modules with washer-head screws through doubled walls.
4. Recheck overall carcass size.

Hold point:

- [ ] top edges flush across all modules
- [ ] carcass square after joining

## 7. Rough Top Blanks

Parts:

- `TOP-01A`
- `TOP-01B`
- `TOP-02A`
- `TOP-02B`
- `TOP-03`
- `TOP-04`
- `TOP-05`
- `TOP-06`
- `FW-01`
- `FW-02`
- `FW-03`
- `FW-04`
- `FW-05`
- `FW-06`

Steps:

1. Rough-cut the gated top and wing blanks oversize.
2. Cut the ungated blocking and cleats to final size.
3. Label every blank immediately.

Hold point:

- [ ] no gated top or wing part has been cut to pretend-final size early

## 8. Saw Fit

1. Set the saw on the cradle.
2. Tune the cradle until the cast top is flush or slightly low.
3. Reconcile the real saw geometry with the modeled opening.

Hold point:

- [ ] saw top never proud
- [ ] real opening marked from the actual saw

## 9. Wing Mechanism

1. Laminate the wing blank.
2. Install hinge pins bushings stop screws latches and support hardware per [wing-mechanism.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/wing-mechanism.md).
3. Prove the mechanism before routing slot extensions.

Hold point:

- [ ] 10-cycle wing proof passed
- [ ] seam never high

## 10. Top Machining

Follow [top-machining-sequence.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/top-machining-sequence.md) exactly.

Hold point:

- [ ] saw opening cut from real fit
- [ ] router recess flush
- [ ] wing slot routing performed only after proof

## 11. Router Install

1. Install `TOP-03` ledgers and the JessEm support hardware.
2. Fit the router lift flush.
3. Build and fit the removable fence from `RF-01` through `RF-03`.

Hold point:

- [ ] hatch access to collet confirmed

## 12. Dust And Power

1. Run [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/right-bay-mockup.md).
2. Fit the service face and extractor base only after the mockup passes.
3. Install manifold hoses inlet strip and RF remote.

Hold point:

- [ ] bucket-first service sequence proven
- [ ] extractor removable without top removal

## 13. Drawers And Service Panels

1. Final-fit the three drawer fronts with `1/8 in` reveals.
2. Final-fit the front service face and router hatch.
3. Leave service paths removable.

Hold point:

- [ ] all removable panels come off without disturbing the top

## 14. Finish

Finish only after saw wing router and panel fit are all proven.

Hold point:

- [ ] no critical fit surface is finished before proof
