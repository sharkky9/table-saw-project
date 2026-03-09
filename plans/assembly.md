# Assembly Instructions

## Build Order Overview

Build the bench in this order so adjustments happen while they are still cheap:

1. Complete the stripped-saw survey.
2. Build and level the plinth.
3. Build the left center and right modules as separate carcasses.
4. Bolt modules to the plinth and to each other.
5. Install the saw cradle and verify the mount-plane height.
6. Rough-cut the L-shaped fixed top parts without precision machining them.
7. Fit the saw and verify the true opening blade y datum and rail sweep.
8. Build and prove the front infeed wing.
9. Machine the fixed top and wing only after the precision gate is open.
10. Fit the router module and fence.
11. Mock up and install dust plumbing and power.
12. Fit drawers service panels and storage.
13. Finish only after dry-fitting all critical hardware.

## Cut Package Rule

Use:

- [cut-list-rough.csv](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/cut-list-rough.csv) for blanks you can cut now
- [cut-list-final.csv](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/cut-list-final.csv) only after the gate shown in the `gate` column is actually open

Do not treat the concept final dimensions for `TOP-*`, `FW-*`, or `CM-05` as safe before the stripped-saw survey is complete.

## Step 0: Stripped-Saw Survey

This step is a hard gate. Do not machine the top drill the cradle or buy miter track until it is complete.

Use [stripped-saw-survey.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/stripped-saw-survey.md) as the working checklist.

## Step 1: Plinth

- Build an `84 x 39 x 3.5 in` plinth from `2x4` rails on edge.
- Use `2x6` stock only for caster reinforcement blocks.
- Glue and screw the plinth square.
- Install the selected leveling casters and confirm the plinth rolls and settles cleanly.

## Step 2: Left Module

- Build the left module first because it is the simplest cabinet.
- Use one full bottom deck two sides one partition and top front/rear stretchers.
- Place the partition so the module yields:
  - one `7.5 in` clear vertical cubby
  - one `18 in` clear drawer bay
- Reserve the drawer stack for three drawers:
  - top shallow
  - middle medium
  - bottom deep

## Step 3: Center Saw Chassis

- Build the saw chassis as an open-frame module and not as a full cabinet.
- Keep the lower front and lower rear stretchers low enough that the dust hose and blade-tilt motion are not trapped.
- Install the saw ledgers at a nominal `22.625 in` mount-plane height from the floor.
- Build the cradle per [saw-cradle.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/saw-cradle.md).

## Step 4: Right Service Module

- Build the right module around the router zone above and the dust package below.
- The internal partition is notched. No full-height divider may intrude into the front or rear rail lanes.
- Use a removable front service face about `20 x 28 in`.
- Use a fixed low deck or UHMW skid base for the Hercules and not a pull-out tray.
- Keep the front-right face accessible for the manifold aux shutoff and flex-hose exit.
- Cut the right-side router access hatch now but leave final latch hardware until the router is test-fit.

## Step 5: Join The Modules

- Set the three modules on the plinth.
- Clamp them flush at the top edges.
- Screw the modules together through the doubled side walls.
- Confirm overall carcass size: `87 x 42 x 31 in`.
- Confirm the carcass stays square before moving on.

## Step 6: Rough-Cut The L-Shaped Fixed Top

Do not laminate a single `90 x 48` slab.

Use the rough cut list for:

- `TOP-01A`
- `TOP-01B`
- `TOP-02A`
- `TOP-02B`
- `FW-01`
- `FW-02`

These stay rough until the stripped-saw survey is complete.

## Step 7: Fit The Saw Before Precision Machining

This is the second hard gate.

- Set the saw on the cradle with the fixed top pieces still unmachined.
- Tune the cradle per [saw-cradle.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/saw-cradle.md).
- Raise and lower the mount points until the saw top is exactly flush or a few thousandths below the surrounding fixed top.
- Confirm the stripped-saw blade y datum against the provisional layout.
- Confirm the actual opening size and the actual rail sweep.
- Confirm the dust-port and hose sweep.

If the real saw geometry disagrees with the concept layout update [layout.json](/Users/christopherhandel/Documents/GitHub/Table Saw/data/layout.json) and [measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw/data/measurements.csv) before machining anything.

## Step 8: Build And Prove The Front Wing

- Laminate the wing to `1.5 in` thickness with plywood on both faces.
- Hinge the wing to the front edge of the left and center modules only.
- Install the bench-mounted registration and support hardware described in [wing-mechanism.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/wing-mechanism.md).
- Prove the mechanism before slot routing.

## Step 9: Machine The Fixed Top And Wing

Machine only after Steps 0 7 and 8 are complete.

Machine in this order:

1. saw opening perimeter
2. router lift recess and cut-through
3. miter-track recesses in the rear support and then the proven front wing
4. underside reliefs for the right-side rail keep-clear lanes

## Step 10: Router Module

- Install the plate ledgers and the JessEm leveling hardware per the selected lift instructions.
- Fit the plate flush to the surrounding top.
- Verify you can reach the Bosch collet and the lower dust branch through the right-side access hatch.
- Build a removable fence with independent faces and a rear dust port.

## Step 11: Dust And Power

Install dust and power only after the fixed top saw wing and router geometry are proven.

- Run the physical mockup in [right-bay-mockup.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/right-bay-mockup.md) before you call the package proven.
- Set the bucket at the front of the dust bay.
- Set the Hercules at the rear on the fixed low deck or skid base.
- Mount the manifold in the front-right service zone.
- Use this service sequence:
  1. remove front service face
  2. remove bucket
  3. disconnect short hose if needed
  4. move extractor
- Route the dedicated tool-circuit pigtail separately from the aux inlet and strip.
- Install the extractor RF remote because the split-circuit plan disables current-sensing auto-start.

## Step 12: Storage And Panels

- Build the three drawers to suit the final slide hardware.
- Fit the applied drawer fronts with `1/8 in` reveals.
- Fit the front service panel router hatch and any hose covers after the dust system is tested.
- Leave the saw-well service faces removable.

## Step 13: Finish

Do not finish critical fit surfaces first. Instead:

- prove the saw flushness
- prove the wing flushness
- prove the router plate fit
- prove track and slot alignment

Then finish in the sequence described in [finish-schedule.md](/Users/christopherhandel/Documents/GitHub/Table Saw/plans/finish-schedule.md).
