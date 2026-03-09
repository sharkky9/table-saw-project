# Assembly Instructions

## Before You Start

Read these first:

- [prebuild-checklist.md](./prebuild-checklist.md)
- [no-cut-yet-checklist.md](./no-cut-yet-checklist.md)
- [tool-list.md](./tool-list.md)
- [joint-strategy.md](./joint-strategy.md)
- [panel-label-map.md](./panel-label-map.md)
- [top-machining-sequence.md](./top-machining-sequence.md)
- [miter-station.md](./miter-station.md)
- [flip-top-mechanism.md](./flip-top-mechanism.md)

## Build Sequence

1. Prebuild review and public DCS781 acceptance
2. Plinth
3. Left module
4. Center saw chassis
5. Right service module shell
6. Join modules
7. Fixed-top blanks and blocking
8. Stripped-saw survey plus saw fit/cradle
9. Miter-station tray dry fit and shimming
10. Top machining
11. Router install
12. Right-bay mockup plus dust/power
13. Drawers and service panels
14. Finish

## 1. Prebuild Review And Public DCS781 Acceptance

- Read [prebuild-checklist.md](./prebuild-checklist.md), [validation.md](./validation.md), and [miter-station.md](./miter-station.md) before cutting anything.
- Confirm the accepted public `DCS781` rows in [miter-saw-survey.md](./miter-saw-survey.md) still match the saw you intend to use.
- Run the strict validation commands once so the current data package is proven coherent before rough cutting starts.
- Rough structure and fixed-top blanks may proceed after this review. Precision machining, underside reliefs, and final saw-deck drilling still wait for the stripped-saw survey and real fit work later.

Hold point:

- [ ] public miter-saw spec rows accepted
- [ ] builder understands that rough structure may proceed before stripped-saw survey, but top machining may not

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
4. Fit `CM-06` only as a rough mounting deck until the real saw is flush-fit.
5. Keep the front-centered bay clear for the miter-station flip-top.
6. Build the cradle per [saw-cradle.md](./saw-cradle.md).

Hold point:

- [ ] lower well remains clear for dust hose and bevel motion
- [ ] cradle stays adjustable
- [ ] front miter-station bay is still unobstructed

## 5. Right Service Module Shell

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
6. Install `RM-09` cleats before fitting removable front panels.
7. Fit `RM-07` router hatch.
8. Leave `RM-08` and `RM-10` as fully mockup-gated parts until the right-bay package is proven.
9. Fit `RM-06` as a plain removable service face only after the `RM-10` disconnect strategy is proven in mockup.

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

## 7. Fixed-Top Blanks And Blocking

Parts:

- `TOP-01A`
- `TOP-01B`
- `TOP-01C`
- `TOP-02A`
- `TOP-02B`
- `TOP-02C`
- `TOP-03`
- `TOP-04`
- `TOP-05`
- `TOP-06`

Steps:

1. Cut the three fixed-top substrate blanks and three skin blanks to their locked sizes.
2. Cut the router ledgers, seam cleats, stiffeners, and overlay backing pads to size.
3. Label every blank immediately.
4. Keep the front/rear top seam at the intentional `y = 15 in` split so the saw-opening front shoulder lives fully in the rear panel.
5. Do not machine the saw opening, miter-station opening, router recess, or underside rail reliefs yet.

Hold point:

- [ ] fixed-top blanks are labeled and reserved for field-fit machining later

## 8. Stripped-Saw Survey Plus Saw Fit And Cradle

1. Print [stripped-saw-survey.md](./stripped-saw-survey.md) and record the required bare-saw values in [data/measurements.csv](../data/measurements.csv).
2. Run the strict validation commands after those rows are transferred so the stripped-saw precision gate is actually open before machining.
3. Set the saw on `CM-06`.
4. Tune the cradle until the cast top is flush or slightly low.
5. Mark the real opening local reliefs and dust-port routing from the actual saw.
6. Transfer the final mounting-deck bolt pattern from the real saw only after the flush setting is proven.
7. Do not pre-layout foot-center coordinates; drill from the actual saw on the deck.

Hold point:

- [ ] saw top never proud
- [ ] real opening marked from the actual saw
- [ ] mounting deck ready for final drilling from the actual saw
- [ ] strict precision commands pass after stripped-saw rows are loaded

## 9. Miter-Station Tray Dry Fit And Shimming

Parts:

- `MS-01` through `MS-06`
- `FT-01` through `FT-03`

Steps:

1. Cut `MS-01`, `MS-04`, `MS-05`, and `MS-06` to their public-envelope layout sizes.
2. Dry-fit `FT-01` pivot side plates and the selected pivot hardware in the centered front bay.
3. Build the tray assembly per [miter-station.md](./miter-station.md) and [flip-top-mechanism.md](./flip-top-mechanism.md).
4. Set the real saw on `MS-01`, prove the shim or spacer stack needed under the feet, and only then transfer the final tray bolt pattern.
5. Trim `MS-02` and `MS-03` only after the pivot axis and tray depth are proven.
6. Install `FT-03` hard stops so the deployed tray returns to the target support-surface height without relying on latch slop.
7. Install `FT-02` latch blocks and the stowed latches only after the cover panel can close flush.
8. Fit `MS-05` and `MS-06` support faces and stop track after the fence line is confirmed from the real saw.

Hold point:

- [ ] stowed cover flush or slightly low
- [ ] deployed tray repeats the target height
- [ ] real saw table lands flush after the shim stack is locked
- [ ] left and right support spans stay fully usable

## 10. Top Machining

Follow [top-machining-sequence.md](./top-machining-sequence.md) exactly.

Hold point:

- [ ] saw opening cut from real fit
- [ ] router recess flush
- [ ] miter-station cover proven in both stowed and deployed states

## 11. Router Install

1. Install `TOP-03` ledgers and the JessEm support hardware.
2. Fit the router lift flush.
3. Build and fit the removable fence from `RF-01` through `RF-03`.

Hold point:

- [ ] hatch access to collet confirmed

## 12. Right-Bay Mockup Plus Dust And Power

1. Run [right-bay-mockup.md](./right-bay-mockup.md).
2. Fit the extractor base only after the mockup passes.
3. Fit `RM-10` as an independent removable control subpanel only after the mockup proves its disconnect path and hose-dock behavior.
4. Fit `RM-06` only after `RM-10` removal proves that the service face is not trapped.
5. Install manifold, hoses, inlet, strip, and RF remote.
6. Confirm the flex hose reaches the deployed miter station without trapping the right-side service path.

Hold point:

- [ ] bucket-first service sequence proven
- [ ] extractor removable without top removal
- [ ] flex hose reaches saw, router, and miter station

## 13. Drawers And Service Panels

1. Final-fit the three drawer fronts with `1/8 in` reveals.
2. Final-fit `RM-06`, `RM-10`, and the router hatch in their real service order only after the mockup-proven right-bay geometry is accepted.
3. Leave service paths removable.

Hold point:

- [ ] all removable panels come off without disturbing the top

## 14. Finish

Finish only after saw, miter station, router, and panel fit are all proven.
