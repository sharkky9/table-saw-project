# Validation Plan

## Geometry Checks

- Bench footprint must remain `90 x 48 x 36 in`.
- Saw blade centerline must land at `36 in` from the left finished edge.
- Saw top must finish flush or slightly below the fixed top.
- Rail keep-clear lanes must stay unobstructed under the right-side field.
- The fixed top must remain a three-field full-depth surface in this variant.
- The fold-out left support table must fold inside the parked footprint.

## Crosscut Checks

- Sliding carriage must park flush without binding.
- Carriage travel must stay parallel to the blade through the full working stroke.
- Carriage fence must square repeatably after removal and reinstallation.
- The under-carriage support drawer must extend smoothly and stop repeatably.
- The left support table must hold its height and alignment across repeated deploy/stow cycles.
- Conventional miter-slot extensions through the fixed front and rear support fields must still accept the Vevor gauge without catching.

## Router Checks

- Lift plate must sit flush with no rocking.
- Fence must mount repeatably and remove without damaging the top.
- Router branch dust pickup must not block fence adjustment.
- The right-side hatch must allow access to the Bosch collet and lower router-cabinet hose branch.

## Dust Checks

- Saw hose must clear blade-height travel.
- Saw hose must clear bevel travel.
- Hercules extractor must be removable from the right bay through the front tray path without removing the bench top.
- Cyclone bucket must be emptyable without unbuilding the manifold.
- Actual package gap, rear buffer, and vertical clearance must be computed from the layout, not merely declared in prose.

## Power Checks

- Tool circuit and aux circuit must stay separate.
- Saw and router must never depend on the internal aux strip.
- The extractor control strategy must not assume current-sensing auto-start across split circuits.
- All cord exits must clear the parked wall position and the rolled-out work position.

## Assembly-Mode Checks

- No permanent T-track should intrude into the carriage field.
- Future overlay anchors must land in structure, not just the saw opening or runner hardware.
- The future overlay still needs an underside stiffener where it spans the saw opening.

## Finish Checks

- No exposed user-touch edge may feel sharp, splintery, or fuzzy.
- Finish buildup must not bind the router plate, miter tracks, carriage runners, or saw fit.
- Sample-board schedule must be approved before finishing the bench.

## No-Top-Machining Gate

Do not cut the final top opening, slot-extension recesses, carriage guide-strip zones, or saw cradle holes until all of the following are true:

- `stripped_blade_center_y` is measured on the bare saw
- all four saw foot centers are measured
- foot-pad size and mount-hole diameter are measured
- lowest underside protrusion below the mount plane is measured
- front and rear rail projection are measured at minimum, mid, and maximum rip
- dust-port center is measured
- dust hose sweep is measured at height and bevel extremes
- actual saw miter-slot width and depth are verified

Passing concept validation does not override this gate.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/stripped-saw-survey.md) to collect the required measurements before rerunning the precision validators.

## Procurement Gates

### Must resolve before buying hardware

- exact miter-slot width and depth before buying extension track
- exact carriage guide hardware and wear-pad strategy before machining the guide-strip zones
- exact support-drawer slide geometry before cutting the left-module internals
- exact left support-table hinge, stop, and leg hardware before drilling that assembly
- verify the actual Hercules tray hardware and front opening clear the real machine
- verify the assembled Low-Pro bucket footprint and latch clearance with the chosen bucket

### Probably okay to defer

- final carriage fence flip-stop details
- assembly overlay hole pattern
- cosmetic finish product choice within the already defined functional finish schedule

## Post-Build Functional Tests

1. Roll the bench out and confirm the folded support table still keeps the bench at `90 x 48`.
2. Unfold the left support table and extend the support drawer.
3. Run a narrow rip, a wide rip, and a long rip.
4. Square a `24 in` panel on the carriage and repeat the cut.
5. Remove or park the carriage and run a repeat crosscut with the Vevor gauge.
6. Route a test edge profile and a groove.
7. Switch the manifold between saw, router, and flex hose.
8. Return the bench to parked mode and confirm cord and hose management still works.
