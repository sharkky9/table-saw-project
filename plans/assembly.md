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

1. Stripped-saw survey and data update
2. Plinth
3. Left module
4. Center saw chassis
5. Right service module
6. Join modules
7. Top and wing blanks
8. Saw fit
9. Wing mechanism
10. Top machining
11. Router install
12. Dust and power
13. Drawers and service panels
14. Finish

## 1. Stripped-Saw Survey And Data Update

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

- `CM-01` through `CM-06`

Steps:

1. Build the open frame from `CM-01`, `CM-02`, and `CM-03`.
2. Install `CM-04` ledgers at the nominal mount-plane height.
3. Install `CM-05` as the deck supports and jack-screw carriers.
4. Fit `CM-06` as the adjustable saw mounting deck.
5. Build the cradle per [saw-cradle.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/saw-cradle.md).

Hold point:

- [ ] open lower well remains clear for dust hose and bevel motion
- [ ] cradle stays adjustable

## 5. Right Service Module

Parts:

- `RM-01` through `RM-10`

Steps:

1. Build the module shell from `RM-01`, `RM-03`, and `RM-04`.
2. Mark `RM-02` notch origins from the layout contract:
   - front notch `9.5 in` from the front edge and `0 in` from the top
   - rear notch `30 in` from the front edge and `0 in` from the top
3. Cut the `8 x 8 in` notches in `RM-02` only after that layout is transferred cleanly.
4. Install `RM-02` so the notched upper field protects the rail keep-clear lanes.
5. Install `RM-05` only after service cutouts are marked.
6. Install `RM-09` cleats before fitting any removable front panels.
7. Fit `RM-07` router hatch.
8. Leave `RM-08` and `RM-10` as mockup-gated or service-layout-gated parts until the right-bay package is proven.
9. Fit `RM-06` as a plain removable service face only after `RM-10` disconnect strategy is resolved.

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

## 7. Top And Wing Blanks

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

1. Cut the fixed-top and wing blanks to their locked blank sizes.
2. Cut the blocking cleats and stiffeners to final size.
3. Label every blank immediately.

Hold point:

- [ ] top and wing blanks are labeled and reserved for field-fit machining later

## 8. Saw Fit

1. Set the saw on `CM-06`.
2. Tune the cradle until the cast top is flush or slightly low.
3. Mark the real opening local reliefs and dust-port routing from the actual saw.
4. Drill the final mounting-deck bolt pattern only after the flush setting is proven.

Hold point:

- [ ] saw top never proud
- [ ] real opening marked from the actual saw
- [ ] mounting deck ready for final drilling

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
2. Fit the extractor base only after the mockup passes.
3. Fit `RM-10` as an independent removable control subpanel with its plug connector and hose release strategy.
4. Fit `RM-06` only after `RM-10` removal proves that the service face is not trapped.
5. Install manifold hoses inlet strip and RF remote.

Hold point:

- [ ] bucket-first service sequence proven
- [ ] extractor removable without top removal

## 13. Drawers And Service Panels

1. Final-fit the three drawer fronts with `1/8 in` reveals.
2. Final-fit `RM-06`, `RM-10`, and the router hatch in their real service order.
3. Leave service paths removable.

Hold point:

- [ ] all removable panels come off without disturbing the top

## 14. Finish

Finish only after saw wing router and panel fit are all proven.

Hold point:

- [ ] no critical fit surface is finished before proof
