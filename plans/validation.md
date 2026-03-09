# Validation Plan

## Status

Passing concept validation means the package is internally coherent. It does **not** mean the bench is ready for precision cuts or procurement of every hardware item.

## Geometry Checks

- Bench top overall size must match `90 x 48 x 36 in`.
- Saw blade centerline must land at `36 in` from the left finished edge.
- Saw top must finish flush or slightly below the fixed top.
- Rail keep-clear lanes must stay unobstructed under the right-side field.
- The fixed top must remain L-shaped. The front-wing zone cannot also be claimed by a fixed `90 x 48` slab.
- The saw opening target must reflect a tight support gap and never a broad perimeter moat.

## Crosscut Checks

- Left miter-slot centerline geometry must remain continuous through wing saw and rear support.
- Right miter-slot centerline geometry must remain continuous through wing saw and rear support.
- The front wing must be bench-defined in its final deployed position.
- The hinge may carry motion but not final precision.

### Precision Wing Acceptance

- seam flushness after latching: `0.000 to -0.005 in`
- lateral slot mismatch across each transition: `<= 0.005 in`
- slot-end transition gap after edge treatment: `<= 0.010 in`
- proof cycles required before slot routing: `10`

### Precision Wing Proof Procedure

1. Deploy and stow the wing `10` full cycles.
2. After the final cycle engage pins stop screws latches and supports in normal order.
3. Check seam flushness with a straightedge and feeler gauges.
4. Check slot alignment at both transitions.
5. Slide a plain miter bar through the full path.
6. Slide the actual Vevor gauge through the full path.

The wing fails if any seam point sits high or if any slot transition catches.

## Saw Cradle Checks

- Cradle must include fixed ledgers an adjustable mounting deck and four jack screws.
- Saw top flushness must land in the same `0.000 to -0.005 in` window.
- Exact saw mount-hole coordinates are intentionally not part of the pre-layout contract.
- Final mount drilling is blocked until the stripped-saw survey is complete and the saw is physically fit on the deck.

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
- The dust-bay minimum vertical margin in the layout contract must still be met even before the mockup is called proven.

## Power Checks

- Tool circuit and aux circuit must stay separate.
- Saw and router must never depend on the internal aux strip.
- The extractor control strategy must not assume current-sensing auto-start across split circuits.
- All cord exits must clear the parked wall position and the rolled-out work position.

## Assembly-Mode Checks

- The permanent top must remain free of fixed stage-1 T-track.
- Future overlay anchors must land in structure and not just MDF skin.
- Future overlay must stay entirely in the rear fixed panel and outside the front-wing zone.
- Future overlay anchors must stay outside the saw opening and outside the rail keep-clear lanes.
- The future overlay needs an underside stiffener where it spans the saw opening.
- The future overlay must not rely on the saw itself as the primary support for clamp loads.

## Finish Checks

- No exposed user-touch edge may feel sharp splintery or fuzzy.
- Finish buildup must not bind the router plate miter tracks or saw fit.
- Sample-board schedule must be approved before finishing the bench.

## No-Top-Machining Gate

Do not cut the final top opening underside rail reliefs or final saw mounting-deck holes until all of the following are true:

- `stripped_blade_center_y` is measured on the bare saw
- front and rear rail projection are measured at the real minimum and maximum settings
- exact foot-center coordinates are not required because final mount-hole transfer happens from the real saw on the deck
- dust-port center is measured
- dust hose sweep is measured at height and bevel extremes
- actual or owner-accepted saw miter-slot width and depth are recorded
- the actual saw is set flush on the adjustable mounting deck
- the front wing has passed its proof procedure

Passing concept validation does not override this gate.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/stripped-saw-survey.md) to collect the required measurements before rerunning the precision validators.

## Right-Bay Mockup Gate

Do not call the right-side dust package proven until the actual Hercules Low-Pro bucket and hose cuffs are checked in a physical mockup.

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

- actual right-bay mockup before claiming the Hercules package is proven
- exact wing registration hardware before drilling the wing and carcass faces

### Already accepted by the current package

- standard `3/4 x 3/8 in` miter-track assumption for the SKIL slots unless later fit testing disproves it

### Probably okay to defer

- assembly overlay hole pattern
- drawer interior refinement
- final flex-hose storage details
- cosmetic finish product choice within the already defined functional finish schedule

## Post-Build Functional Tests

1. Roll the bench out deploy the wing and lower it onto leveling feet.
2. Run a narrow rip a wide rip and a long rip.
3. Run a repeat crosscut with the Vevor gauge.
4. Route a test edge profile and a groove.
5. Switch the manifold between saw router and flex hose.
6. Return the bench to parked mode and confirm cord and hose management still works.
