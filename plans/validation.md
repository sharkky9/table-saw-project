# Validation Plan

## Geometry Checks

- Bench top overall size must match `90 x 48 x 36 in`.
- Saw blade centerline must land at `36 in` from the left finished edge.
- Saw top must finish flush or slightly below the fixed top.
- Rail keep-clear lanes must stay unobstructed under the right-side field.
- The fixed top must remain L-shaped. The front-wing zone cannot also be claimed by a fixed `90 x 48` slab.

## Crosscut Checks

- Left miter-slot centerline must remain continuous through wing, saw, and rear support.
- Right miter-slot centerline must remain continuous through wing, saw, and rear support.
- Vevor miter gauge must slide across each transition without catching.
- The wing must stay flat enough to support at least `24 in` deep crosscuts.
- The wing registration pins must repeat slot alignment after multiple deploy/stow cycles.

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

- Fixed T-tracks must stay entirely left of the saw-top opening.
- Clamp heads in the fixed tracks must not foul the miter-gauge fence during left-side support work.
- Future overlay anchors must land in structure, not just MDF skin.
- The future overlay needs an underside stiffener where it spans the saw opening.

## Finish Checks

- No exposed user-touch edge may feel sharp, splintery, or fuzzy.
- Finish buildup must not bind the router plate, miter tracks, or saw fit.
- Sample-board schedule must be approved before finishing the bench.

## No-Top-Machining Gate

Do not cut the final top opening, miter-track recesses, or saw cradle holes until all of the following are true:

- `stripped_blade_center_y` is measured on the bare saw
- all four saw foot centers are measured
- foot-pad size and mount-hole diameter are measured
- lowest underside protrusion below the mount plane is measured
- front and rear rail projection are measured at minimum, mid, and maximum rip
- dust-port center is measured
- dust hose sweep is measured at height and bevel extremes
- actual saw miter-slot width and depth are verified

Passing concept validation does not override this gate.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/stripped-saw-survey.md) to collect the required measurements before rerunning the precision validators.

## Procurement Gates

### Must resolve before buying hardware

- exact miter-slot width and depth before buying extension track
- verify the actual Hercules tray hardware and front opening clear the real machine
- verify the assembled Low-Pro bucket footprint and latch clearance with the chosen bucket
- exact wing registration hardware before drilling the wing and carcass faces

### Probably okay to defer

- assembly overlay hole pattern
- drawer interior refinement
- final flex-hose storage details
- cosmetic finish product choice within the already defined functional finish schedule

## Post-Build Functional Tests

1. Roll the bench out, deploy the wing, and lower it onto leveling feet.
2. Run a narrow rip, a wide rip, and a long rip.
3. Run a repeat crosscut with the Vevor gauge.
4. Route a test edge profile and a groove.
5. Switch the manifold between saw, router, and flex hose.
6. Return the bench to parked mode and confirm cord and hose management still works.
