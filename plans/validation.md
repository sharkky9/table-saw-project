# Validation Plan

## Status

Passing concept validation means the package is internally coherent. It does **not** mean the bench is ready for precision cuts or procurement of every hardware item.

## Geometry Checks

- Bench footprint must remain `90 x 48 x 36 in`.
- Saw blade centerline must land at `36 in` from the left finished edge.
- Saw top must finish flush or slightly below the fixed top.
- Rail keep-clear lanes must stay unobstructed under the right-side field.
- The fixed top must remain a three-field full-depth surface in this variant.
- The left support table must fold inside the parked footprint.
- The saw opening target must reflect a tight support gap and never a broad perimeter moat.

## Crosscut Checks

- Sliding carriage must park flush without binding.
- Carriage travel must stay parallel to the blade through the full working stroke.
- Carriage fence must square repeatably after removal and reinstallation.
- The under-carriage support drawer must extend smoothly and stop repeatably.
- The left support table must hold its height and alignment across repeated deploy/stow cycles.
- Conventional miter-slot extensions through the fixed front and rear support fields must still accept the Vevor gauge without catching.

## Saw Cradle Checks

- Cradle must include fixed ledgers, an oversized transfer-drilled deck, and four jack screws.
- Saw top flushness must land in the same `0.000 to -0.005 in` window.
- Final mount drilling is blocked until the flush-tuned deck is marked from the real saw.

## Router Checks

- Lift plate must sit flush with no rocking.
- Fence must mount repeatably and remove without damaging the top.
- Router branch dust pickup must not block fence adjustment.
- The right-side hatch must allow access to the Bosch collet and lower router-cabinet hose branch.

## Dust Checks

- Saw hose must clear blade-height travel.
- Saw hose must clear bevel travel.
- Cyclone bucket must be removable without unbuilding the bench.
- Hercules extractor must be removable after the bucket is removed.
- The internal Hercules + Low-Pro package is still mockup-gated and not yet proven just because the rectangles fit.

## Power Checks

- Tool circuit and aux circuit must stay separate.
- Saw and router must never depend on the internal aux strip.
- The extractor control strategy must not assume current-sensing auto-start across split circuits.
- All cord exits must clear the parked wall position and the rolled-out work position.

## Assembly-Mode Checks

- The permanent top must remain free of fixed stage-1 T-track.
- Future overlay anchors must land in structure and not just MDF skin.
- Future overlay must stay entirely in the rear fixed field and outside the support-table zone.
- Future overlay anchors must stay outside the saw opening and outside the rail keep-clear lanes.
- The future overlay needs an underside stiffener where it spans the saw opening.
- The future overlay must not rely on the saw itself as the primary support for clamp loads.

## Finish Checks

- No exposed user-touch edge may feel sharp, splintery, or fuzzy.
- Finish buildup must not bind the router plate, miter tracks, carriage runners, or saw fit.
- Sample-board schedule must be approved before finishing the bench.

## Top-Machining Gate

Do not cut the final top opening, slot-extension recesses, or carriage guide-strip zones until all of the following are true:

- `stripped_blade_center_y` is measured on the bare saw
- the left-side rail projection at minimum rip is measured
- front and rear right-side rail projection are measured at minimum and maximum rip
- front and rear rail overhang relative to the cast top are measured
- the working miter-slot assumption is accepted for this branch, currently standard `3/4 x 3/8 in`
- the support table and support drawer have passed their fit-up proof

Passing concept validation does not override this gate.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/stripped-saw-survey.md) to collect the required measurements before rerunning the precision validators.

## Saw-Mount Transfer-Drilling Gate

Do not drill the final saw-mount holes in `CM-05` until all of the following are true:

- the saw is sitting on the tuned cradle deck
- cast-top flushness is already proven
- underside protrusions and wrench access have been checked against the deck and lower well
- either the mount-hole diameter is known or you have committed to transfer-punch and size the holes afterward

Exact foot-center mapping is not a prerequisite for this gate.

## Saw Dust-Branch Gate

Do not drill final dust-branch routing holes until all of the following are true:

- rough dust-port center is recorded
- rough hose sweep at `0 deg` and `45 deg` is recorded
- the actual hose, cuffs, and branch path are mocked up on the fitted saw

The current measurements are enough to reserve space and keep the rear well honest. They are not a substitute for the final branch markout.

## Right-Bay Mockup Gate

Do not call the right-side dust package proven until the actual Hercules, Low-Pro, bucket, and hose cuffs are checked in a physical mockup.

Minimum mockup outcomes:

- bucket fits the front zone with latch clearance
- extractor fits the rear zone with hand access at the front service opening
- the documented service sequence works:
  - remove `RM-10` or disconnect its tethered services
  - remove `RM-06`
  - remove bucket
  - disconnect short hose if needed
  - remove or slide extractor

## Procurement Gates

### Must resolve before buying hardware

- standard `3/4 x 3/8 in` miter track remains the working assumption unless field-fit disproves it
- exact carriage guide hardware and wear-pad strategy before machining the guide-strip zones
- exact support-drawer slide geometry before cutting the left-module internals
- exact support-table hinge, stop, and leg hardware before drilling that assembly
- mount-hole diameter before buying final saw-mount bolts if transfer punches are not being used
- actual right-bay mockup before claiming the Hercules package is proven

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
