# Assembly Instructions

## Build Order Overview

Build the bench in this order so adjustments happen while they are still cheap:

1. Complete the stripped-saw survey.
2. Build and level the plinth.
3. Build the left, center, and right modules as separate carcasses.
4. Bolt modules to the plinth and to each other.
5. Install the saw cradle and verify the mount-plane height.
6. Dry-fit the L-shaped fixed top parts without machining them.
7. Fit the saw and verify the true opening, blade y datum, and rail sweep.
8. Build and register the front infeed wing.
9. Machine the fixed top and wing only after the precision gate is open.
10. Fit the router module and fence.
11. Install dust plumbing and power.
12. Fit drawers, service panels, and storage.
13. Finish only after dry-fitting all critical hardware.

## Step 0: Stripped-Saw Survey

This step is a hard gate. Do not machine the top, drill the cradle, or buy miter track until it is complete.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/stripped-saw-survey.md) as the working checklist.

Record these values on the bare saw:

- stripped blade center y from the front cast-top edge
- all four foot centers
- foot-pad size and mount-hole diameter
- lowest underside protrusion below the mount plane
- front and rear rail projection at minimum, mid, and maximum rip
- dust-port center location
- rear hose sweep at height and bevel extremes
- actual miter-slot width and depth

If any of those values are still blank in [measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw/data/measurements.csv), the precision-cut gate remains closed.

## Step 1: Plinth

- Build an `84 x 39 x 3.5 in` plinth from the `2x6` perimeter and `2x4` internal rails.
- Glue and screw the plinth square.
- Install caster hardpoint blocks before the carcasses sit on the base.
- Drill and install leveling feet near the corners.
- Set the plinth in its parked location and verify it can still roll out cleanly.

## Step 2: Left Module

- Build the left module first because it is the simplest cabinet.
- Use a full bottom deck, two sides, one partition, and front/rear top stretchers.
- Reserve the wider portion for three drawers and the narrow portion for fence, jig, or track storage.
- Install the back panel only after confirming the module is square.

## Step 3: Center Saw Chassis

- Build the saw chassis as an open-frame module, not as a full cabinet.
- Keep the lower front and lower rear stretchers low enough that the dust hose and blade-tilt motion are not trapped.
- Install the saw ledgers at a nominal `22.625 in` mount-plane height from the floor.
- Leave the final saw crossrails loose until the real saw is physically test-fit.

## Step 4: Right Service Module

- Build the right module around the router zone above and the Hercules plus Low-Pro dust package below.
- The internal partition is notched. No full-height divider may intrude into the front or rear rail lanes.
- Keep the front-right face accessible for the manifold, aux shutoff, and flex-hose exit.
- Build the Hercules support as a front pull-out tray.
- Cut the right-side router access hatch now, but leave final latch hardware until the router is test-fit.

## Step 5: Join The Modules

- Set the three modules on the plinth.
- Clamp them flush at the top edges.
- Screw the modules together through the doubled side walls.
- Confirm overall carcass size: `87 x 42 x 31 in`.
- Confirm the carcass stays square before moving on.

## Step 6: Dry-Fit The L-Shaped Fixed Top

Do not laminate a single `90 x 48` slab. The fixed top is two-piece per layer:

- rear main panel: `90 x 31.75 in`
- right-front infill: `30.25 x 16.25 in`

### Dry-Fit First

- Cut the plywood substrate pieces oversize.
- Cut the MDF skin pieces oversize.
- Dry-lay the two fixed regions on the carcass and verify the wing opening remains clear.
- Install the seam cleats under the right-front infill seam.
- Confirm the seam lands on real support before any glue-up.

## Step 7: Fit The Saw Before Precision Machining

This is the second hard gate.

- Set the saw on the cradle with the fixed top pieces still unmachined.
- Raise and lower the mount points until the saw top is exactly flush or a few thousandths below the surrounding fixed top.
- Confirm the stripped-saw blade y datum against the provisional layout.
- Confirm the actual opening size and the actual rail sweep.
- Confirm the dust-port and hose sweep.

If the real saw geometry disagrees with the concept layout, update [layout.json](/Users/christopherhandel/Documents/GitHub/Table Saw/data/layout.json) and [measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw/data/measurements.csv) before machining anything.

## Step 8: Build And Register The Front Wing

- Laminate the wing to `1.5 in` thickness with plywood on both faces.
- Hinge the wing to the front edge of the left and center modules only.
- Install two locking folding legs.
- Install the two tapered alignment pins and matching receivers.
- Set the leg glides or final trim only after the hinge line and registration hardware are fixed.
- Prove that the wing comes up flush and repeatable before any track routing.

## Step 9: Machine The Fixed Top And Wing

Machine only after Steps 0, 7, and 8 are complete.

### Machine In This Order

1. Saw opening perimeter
2. Router lift recess and cut-through
3. Assembly T-track dados in the far-left field
4. Miter-track recesses in the rear support and then the registered front wing
5. Underside reliefs for the right-side rail keep-clear lanes

Machine the lift-plate recess from the MDF face, then cut through both layers.

## Step 10: Router Module

- Install the plate ledgers and the JessEm leveling hardware per the selected lift instructions.
- Fit the plate flush to the surrounding top.
- Verify you can reach the Bosch collet and the lower dust branch through the right-side access hatch.
- Build a removable fence with independent faces and a rear dust port.
- Keep the fence removable so the bench returns to flush-surface mode quickly.

## Step 11: Dust And Power

Install dust and power after the fixed top, saw, wing, and router geometry are proven.

- Set the cyclone bucket at the front of the dust bay.
- Install the Oneida Low-Pro lid and verify the short separator-to-extractor hose path.
- Set the Hercules behind it on the pull-out tray.
- Mount the manifold in the front-right service zone.
- Run the shortest possible hose paths.
- Plumb in this order: manifold to Low-Pro inlet, Low-Pro outlet to Hercules vacuum port.
- Route the dedicated tool-circuit pigtail separately from the aux inlet and strip.
- Install the extractor RF remote because the split-circuit plan disables current-sensing auto-start.

## Step 12: Storage And Panels

- Build the three drawers to suit the final slide hardware.
- Fit the front service panel, router hatch, and any hose covers after the dust system is tested.
- Leave the saw-well service faces removable.

## Step 13: Finish

Do not finish critical fit surfaces first. Instead:

- prove the saw flushness
- prove the wing flushness
- prove the router plate fit
- prove track and slot alignment

Then finish in the sequence described in [finish-schedule.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/finish-schedule.md).
