# Assembly Instructions

## Before You Start

Read these first:

- [prebuild-checklist.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/prebuild-checklist.md)
- [no-cut-yet-checklist.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/no-cut-yet-checklist.md)
- [tool-list.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/tool-list.md)
- [joint-strategy.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/joint-strategy.md)
- [panel-label-map.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/panel-label-map.md)
- [top-machining-sequence.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/top-machining-sequence.md)
- [saw-cradle.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/saw-cradle.md)
- [dust-power.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/dust-power.md)
- [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/right-bay-mockup.md)
- [left-support-table.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/left-support-table.md)
- [sliding-carriage.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/sliding-carriage.md)

## Build Sequence

1. Stripped-saw survey
2. Plinth
3. Left carriage-support module
4. Center saw chassis
5. Right service module
6. Join modules
7. Rough top blanks
8. Saw fit and cradle tuning
9. Left support table and support drawer
10. Top machining
11. Sliding carriage
12. Router install
13. Right-bay mockup, then dust and power
14. Storage and service panels
15. Finish

## 1. Stripped-Saw Survey

- Print [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/stripped-saw-survey.md).
- Record every top-machining gate measurement and any mount or dust reference measurements in [data/measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/data/measurements.csv).
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

1. Build the `84 x 39 in` plinth rectangle.
2. Install crossmembers and caster hardpoints.
3. Install the selected mobility system and leveling feet.

Hold point:

- [ ] plinth diagonals match
- [ ] plinth rolls and settles cleanly

## 3. Left Carriage-Support Module

Parts:

- `LM-01` through `LM-06`
- `SD-01` through `SD-03`

Steps:

1. Build the left carcass as an open mechanism bay, not a drawer bank.
2. Reserve the central opening for the under-carriage support drawer.
3. Reserve the upper interior only for shallow storage and fence parking that cannot foul the guide package.
4. Install `LM-05` only after the module is square.

Hold point:

- [ ] module square before back panel
- [ ] support-drawer opening verified

## 4. Center Saw Chassis

Parts:

- `CM-01` through `CM-05`

Steps:

1. Build the open frame from `CM-01`, `CM-02`, and `CM-03`.
2. Install `CM-04` ledgers at the nominal mount-plane height.
3. Leave `CM-05` oversized and undrilled until the stripped-saw survey and first saw fit are complete.
4. Build the cradle per [saw-cradle.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/saw-cradle.md).

Hold point:

- [ ] open lower well remains clear for dust hose and bevel motion
- [ ] cradle stays adjustable

## 5. Right Service Module

Parts:

- `RM-01` through `RM-10`

Steps:

1. Build the module shell from `RM-01`, `RM-03`, and `RM-04`.
2. Cut the upper notches in `RM-02` only after the rail-lane geometry is transferred from the layout.
3. Install `RM-02` so the notched upper field protects the rail keep-clear lanes.
4. Install `RM-05` only after service cutouts are marked.
5. Install `RM-09` cleats before fitting any removable front panels.
6. Fit `RM-07` router hatch.
7. Leave `RM-08` and `RM-10` mockup-gated or service-layout-gated until the right-bay package is proven.
8. Fit `RM-06` as a plain removable service face only after the `RM-10` disconnect strategy is resolved.

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

- `TOP-01A` through `TOP-01C`
- `TOP-02A` through `TOP-02C`
- `TOP-03` through `TOP-06`
- `SC-01` through `SC-05`
- `ST-01` through `ST-05`

Steps:

1. Rough-cut the gated top, carriage, and support-table blanks oversize.
2. Cut the ungated blocking and cleats to final size.
3. Label every blank immediately.

Hold point:

- [ ] no gated top, carriage, or support-table part has been cut to pretend-final size early

## 8. Saw Fit And Cradle Tuning

1. Set the saw on the cradle.
2. Tune the cradle until the cast top is flush or slightly low.
3. Reconcile the real saw geometry with the modeled opening and carriage park gap.
4. Transfer-mark the mount pattern from the real saw only after the flush setting is proven.

Hold point:

- [ ] saw top never proud
- [ ] real opening marked from the actual saw
- [ ] cradle deck still undrilled until the real mount pattern is marked

## 9. Left Support Table And Support Drawer

1. Build the support table per [left-support-table.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/left-support-table.md).
2. Build and fit the support drawer.
3. Prove the table folds back inside the parked `90 x 48` footprint.
4. Prove the drawer extends and retracts repeatably before building the carriage.

Hold point:

- [ ] support table deploys and folds cleanly
- [ ] support drawer stops repeatably

## 10. Top Machining

Follow [top-machining-sequence.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/top-machining-sequence.md) exactly.

Hold point:

- [ ] saw opening cut from real fit
- [ ] router recess flush
- [ ] carriage guide-strip zones machined only after support-table proof
- [ ] dust-branch holes still wait for final hose markout

## 11. Sliding Carriage

1. Build and fit the carriage per [sliding-carriage.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/sliding-carriage.md).
2. Fit end stops and park hardware only after the carriage glides freely.
3. Square the carriage fence to the blade before calling the carriage done.

Hold point:

- [ ] carriage glides without play or bind
- [ ] carriage fence repeats square

## 12. Router Install

1. Install `TOP-03` ledgers and the JessEm support hardware.
2. Fit the router lift flush.
3. Build and fit the removable fence from `RF-01` through `RF-03`.

Hold point:

- [ ] hatch access to collet confirmed

## 13. Right-Bay Mockup, Dust, And Power

1. Run [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/right-bay-mockup.md).
2. Fit the extractor low deck or UHMW skid base only after the mockup passes.
3. Fit `RM-10` as an independent removable control subpanel with its plug connector and hose release strategy.
4. Fit `RM-06` only after `RM-10` removal proves that the service face is not trapped.
5. Install manifold hoses inlet strip and RF remote per [dust-power.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/dust-power.md).

Hold point:

- [ ] bucket-first service sequence proven
- [ ] extractor removable without top removal

## 14. Storage And Service Panels

1. Final-fit shallow left storage only after the carriage path is proven.
2. Final-fit `RM-06`, `RM-10`, and the router hatch in their real service order.
3. Install carriage fence and stop parking only after the main workflow is proven.

Hold point:

- [ ] all removable panels come off without disturbing the top

## 15. Finish

Finish only after saw carriage support-table router and panel fit are all proven.

Hold point:

- [ ] no critical fit surface is finished before proof
