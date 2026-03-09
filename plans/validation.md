# Validation Plan

## Status

This is the active product-level validation target for the fixed-top bench. The machine-readable layout contract and builder package now describe the same architecture.

Passing concept validation means the package is internally coherent. It does not mean the bench is ready for precision cuts or procurement of every hardware item.

The strict `--require-precision-ready` commands now open on two conditions only:

- stripped-saw precision rows are resolved
- the accepted public `DCS781` envelope still fits the fixed contract

Real miter-station tray fit remains a separate manual gate after that.

## Geometry Checks

- Bench top overall size must remain `90 x 48 x 36 in`.
- The finished top must be a fixed full-size surface and must not depend on expandable wings.
- Saw blade centerline must still land at `36 in` from the left finished edge unless a later geometry proof shows an impossible collision.
- Saw top must finish flush or slightly below the fixed top.
- Rail keep-clear lanes must stay unobstructed under the right-side field.
- The saw opening target must reflect a tight support gap and never a broad perimeter moat.
- The router zone must remain part of the right-hand table-saw support field.

## Miter-Station Checks

- The miter station is the primary crosscut tool.
- The station must be centered within `2 in` of the bench midpoint on the operator-side long face.
- The deployed station must provide meaningful left and right support for stops and repeat cuts.
- The target support span is at least `30 in` to the left and `30 in` to the right of the saw.
- The stowed surface must finish flush or slightly low and must never sit proud.
- The deployed tray height must come from hard stops, while the real saw table flushness is tuned separately with shims or spacer pucks under the saw feet.
- The miter-station mechanism must not intrude into the table-saw rail keep-clear lanes or the right-side service bay.

## Table-Saw Support Checks

- Right-hand support must remain useful through the fence-extension envelope.
- Outfeed support must remain continuous and honest.
- Deployable infeed support is optional and must not become a new precision-wing dependency.
- Table-saw miter-slot dimensions remain saw-reference geometry only and are no longer an active "extend through the bench" acceptance target.

## Saw Cradle Checks

- Cradle must include fixed ledgers, an adjustable mounting deck, and four jack screws.
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
- The internal Hercules plus Low-Pro package is still mockup-gated and not yet proven just because the rectangles fit.
- The miter saw must be able to use the flex hose at the top-exit dust port without trapping the hose path in either parked or deployed bench use.

## Power Checks

- Tool circuit and aux circuit must stay separate.
- Saw and router must never depend on the internal aux strip.
- The extractor control strategy must not assume current-sensing auto-start across split circuits.
- All cord exits must clear the parked wall position and the rolled-out work position.

## Assembly-Mode Checks

- The permanent top must remain free of fixed stage-1 T-track.
- Future overlay anchors must land in structure and not just MDF skin.
- Future overlay must stay outside the saw opening, rail keep-clear lanes, and miter-station operating envelope.
- The future overlay needs an underside stiffener where it spans unsupported openings.
- The future overlay must not rely on the saw or miter-station mechanism as the primary support for clamp loads.

## Finish Checks

- No exposed user-touch edge may feel sharp, splintery, or fuzzy.
- Finish buildup must not bind the router plate, saw fit, or miter-station stow/deploy surfaces.
- Sample-board schedule must be approved before finishing the bench.

## No-Top-Machining Gate

Do not cut the final top openings, underside rail reliefs, or final saw mounting-deck holes until all of the following are true:

- `stripped_blade_center_y` is measured on the bare saw
- front and rear rail projection are measured at the real minimum and maximum settings
- exact foot-center coordinates are not required because final mount-hole transfer happens from the real saw on the deck
- dust-port center is measured
- dust hose sweep is measured at height and bevel extremes
- actual or owner-accepted saw miter-slot width and depth are recorded
- the actual saw is set flush on the adjustable mounting deck
- the miter-station opening is frozen from accepted public DCS781 dimensions
- the real miter-station tray has been dry-fit, the deployed hard stops are tuned, and the real saw table lands flush after the shim stack is locked

Passing concept validation does not override this gate.

## Right-Bay Mockup Gate

Do not call the right-side dust package proven until the actual Hercules, Low-Pro bucket, and hose cuffs are checked in a physical mockup.

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
- actual miter-station tray fit before drilling the final tray bolt pattern or locking the stop-track line

### Already accepted by the current package

- standard `3/4 x 3/8 in` miter-slot assumption for the SKIL slots unless later fit testing disproves it
- flex hose remains the default dust path for the miter saw and other mobile tools

### Probably okay to defer

- assembly overlay hole pattern
- drawer interior refinement
- final flex-hose storage details
- cosmetic finish product choice within the already defined functional finish schedule

## Superseded Work

These are no longer active validation targets:

- sliding-carriage travel and bridge-zone checks
- front precision-wing proof cycles
- continuous table-saw miter-slot routing through the bench as a first-order requirement

## Post-Build Functional Tests

1. Roll the bench out and level it in work position.
2. Stow the miter station and confirm the top is flush enough for sheet support.
3. Deploy the miter station and run a repeat stop-based crosscut workflow.
4. Run a narrow rip, a wide rip, and a long rip.
5. Route a test edge profile and a groove.
6. Switch the manifold between saw, router, and flex hose.
7. Return the bench to parked mode and confirm cord and hose management still works.
