# Assembly Instructions

## Build Order Overview

Build the bench in this order so adjustments happen while they are still cheap:

1. Complete the stripped-saw survey.
2. Build and level the plinth.
3. Build the left carriage-support, center saw, and right service modules as separate carcasses.
4. Bolt modules to the plinth and to each other.
5. Install the saw cradle and verify the mount-plane height.
6. Dry-fit the three fixed-top fields without machining them.
7. Fit the saw and verify the true opening, blade `y` datum, and rail sweep.
8. Build the left support table and the under-carriage support drawer.
9. Machine the fixed top only after the precision gate is open.
10. Build and fit the sliding carriage.
11. Fit the router module and fence.
12. Install dust plumbing and power.
13. Fit shallow storage, service panels, and carriage parking hardware.
14. Finish only after dry-fitting all critical hardware.

## Step 0: Stripped-Saw Survey

This step is a hard gate. Do not machine the top, drill the cradle, or buy miter track until it is complete.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/stripped-saw-survey.md) as the working checklist.

Record these values on the bare saw:

- stripped blade center `y` from the front cast-top edge
- all four foot centers
- foot-pad size and mount-hole diameter
- lowest underside protrusion below the mount plane
- front and rear rail projection at minimum, mid, and maximum rip
- dust-port center location
- rear hose sweep at height and bevel extremes
- actual miter-slot width and depth

If any of those values are still blank in [measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/data/measurements.csv), the precision-cut gate remains closed.

## Step 1: Plinth

- Build an `84 x 39 x 3.5 in` plinth from the `2x6` perimeter and `2x4` internal rails.
- Glue and screw the plinth square.
- Install caster hardpoint blocks before the carcasses sit on the base.
- Drill and install leveling feet near the corners.
- Set the plinth in its parked location and verify it can still roll out cleanly.

## Step 2: Left Carriage-Support Module

- Build the left module as a carriage-support bay, not as a full drawer bank.
- Keep the central front opening clear for the under-carriage support drawer.
- Reserve the upper interior only for shallow storage that cannot foul the carriage guide hardware.
- Reserve one vertical parking zone for the carriage fence, stops, and setup accessories.
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

## Step 6: Dry-Fit The Fixed Top

Do not machine the full-depth top fields yet.

The fixed top is three pieces per layer:

- left carriage field: `29.25 x 48 in`
- center saw field: `30.5 x 48 in`
- right service field: `30.25 x 48 in`

### Dry-Fit First

- Cut the plywood substrate pieces oversize.
- Cut the MDF skin pieces oversize.
- Dry-lay all three top fields on the carcass and verify the seams land on real support.
- Confirm the left field leaves room for the carriage guide-strip zone and park stops.
- Confirm the center and right seams do not compromise the saw opening or router field.

## Step 7: Fit The Saw Before Precision Machining

This is the second hard gate.

- Set the saw on the cradle with the fixed-top pieces still unmachined.
- Raise and lower the mount points until the saw top is exactly flush or a few thousandths below the surrounding fixed top.
- Confirm the stripped-saw blade `y` datum against the provisional layout.
- Confirm the actual opening size and the actual rail sweep.
- Confirm the dust-port and hose sweep.

If the real saw geometry disagrees with the concept layout, update [layout.json](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/data/layout.json) and [measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/data/measurements.csv) before machining anything.

## Step 8: Build The Left Support Package

- Build the fold-out left support table before machining the carriage guide zones.
- Install the hinge, hard stops, and locking leg hardware.
- Prove that the table folds back inside the parked `90 x 48` footprint.
- Build the under-carriage support drawer and fit its slides.
- Prove the support drawer extends and retracts repeatably before the carriage is built.

## Step 9: Machine The Fixed Top

Machine only after Steps 0, 7, and 8 are complete.

### Machine In This Order

1. Saw opening perimeter
2. Miter-track recesses in the fixed front and rear support fields
3. Router lift recess and cut-through
4. Carriage guide-strip zones and park-stop locations in the left field
5. Underside reliefs for the right-side rail keep-clear lanes

Machine the lift-plate recess from the MDF face, then cut through both layers.

## Step 10: Build And Fit The Sliding Carriage

- Laminate the carriage to `1.5 in` thickness with plywood on both faces.
- Install the selected guide strips, wear pads, or equivalent low-play runner package.
- Add the removable carriage fence and its hardware.
- Fit end stops and park hardware only after the carriage glides freely.
- Square the carriage fence to the blade before calling the carriage done.
- Prove that the carriage parks without blocking ordinary rip-fence use.

## Step 11: Router Module

- Install the plate ledgers and the JessEm leveling hardware per the selected lift instructions.
- Fit the plate flush to the surrounding top.
- Verify you can reach the Bosch collet and the lower dust branch through the right-side access hatch.
- Build a removable fence with independent faces and a rear dust port.
- Keep the fence removable so the bench returns to flush-surface mode quickly.

## Step 12: Dust And Power

Install dust and power after the fixed top, saw, carriage, support drawer, support table, and router geometry are proven.

- Set the cyclone bucket at the front of the dust bay.
- Install the Oneida Low-Pro lid and verify the short separator-to-extractor hose path.
- Set the Hercules behind it on the pull-out tray.
- Mount the manifold in the front-right service zone.
- Run the shortest possible hose paths.
- Plumb in this order: manifold to Low-Pro inlet, Low-Pro outlet to Hercules vacuum port.
- Route the dedicated tool-circuit pigtail separately from the aux inlet and strip.
- Install the extractor RF remote because the split-circuit plan disables current-sensing auto-start.

## Step 13: Storage And Panels

- Add only the shallow left-side storage that clears the carriage package.
- Fit the front service panel, router hatch, and any hose covers after the dust system is tested.
- Leave the saw-well service faces removable.
- Install fence, stop, and carriage parking clips only after the main workflow is proven.

## Step 14: Finish

Do not finish critical fit surfaces first. Instead:

- prove the saw flushness
- prove the carriage glide and squareness
- prove the support drawer stop locations
- prove the left support-table height and repeatability
- prove the router plate fit
- prove track and slot alignment

Then finish in the sequence described in [finish-schedule.md](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/plans/finish-schedule.md).
