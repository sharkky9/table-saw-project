# Stripped-Saw Survey

Use this sheet after removing the `SKIL SPT99-11` from its rolling stand and before machining the final top opening, slot extensions, or carriage guide-strip zones.

## Purpose

This survey closes the top-machining gate. Until it is done, the build package is only concept-accurate in the saw's front-to-back direction.

This survey directly unlocks:

- final saw opening size and location
- final fixed front and rear slot-extension geometry
- final carriage park clearance at the left side of the saw
- final miter-track procurement assumption
- the reference geometry for later saw-cradle transfer drilling
- the reference geometry for later saw dust-branch routing

## Tools

- `tape measure`
- `6 in` steel rule
- `combination square`
- `digital calipers`
- `straightedge`
- `painter's tape`
- `fine marker or sharp pencil`
- `phone camera`
- `two padded support rails or blocks`
- `scrap wood shims`

## Datum System

Use the same datum system as the package:

- `x`: from the **left cast-top edge** toward the right
- `y`: from the **front cast-top edge** toward the rear
- `z`: downward below the **saw mount plane**

Definitions:

- `front` means the operator side of the saw
- `left` and `right` are from the operator position
- `mount plane` means the plane that touches the bottoms of the saw support pads

Mark the front and left cast-top edges with painter's tape before you start measuring.

## Setup

### Setup A: Upright

Use this for:

- blade center `y`
- miter-slot width and depth
- rail travel and overhang envelope
- dust hose sweep at `0 deg` and `45 deg`

Support the stripped saw upright on a stable temporary platform so the cast top is level and the underside is still reachable enough to observe moving parts.

### Setup B: Inverted

Use this for:

- support-pad size
- one mount-hole reference if it helps you orient the deck later
- mount-hole diameter
- lowest underside protrusion
- dust-port center location

Set the saw upside down on padded blocks that support the cast top safely. Do not rest the saw on knobs, handwheels, or fence rails.

## Before You Start

- [ ] Saw unplugged
- [ ] Fence removed
- [ ] Miter gauge removed
- [ ] Blade guard / riving components removed if they interfere
- [ ] Throat plate removed if it helps sight the blade center
- [ ] Photos taken of the saw before teardown
- [ ] Front and left datum edges marked with tape

## Procedure

### 1. Measure `stripped_blade_center_y`

Use `Setup A`.

Method:

1. Set blade to `90 deg`.
2. Raise the blade enough to measure a tooth cleanly.
3. Pick one tooth and mark it.
4. Rotate that same tooth to the **front** of the blade arc and measure from the **front cast-top edge** to the tooth tip.
5. Rotate that same tooth to the **rear** of the blade arc and measure from the **front cast-top edge** to the tooth tip.
6. Average the two readings.

Record that average as `stripped_blade_center_y`.

### 2. Measure `miter_slot_width` and `miter_slot_depth`

Use `Setup A`.

Method:

1. Measure each slot with calipers at the front, middle, and rear.
2. Record the tightest honest width that matches the slot.
3. Measure depth from the cast-top surface to the bottom of the slot with the caliper depth rod or rule.

If left and right slots differ, stop and record both in notes before buying track.

### 3. Measure support-pad size and optional mount reference

Use `Setup B`.

Required ids:

- `foot_pad_width_x`
- `foot_pad_depth_y`
- optional reference: `front_left_mount_hole_x`

Method:

1. Measure the actual support-pad footprint, not just the mounting hole.
2. If one obvious mounting hole gives a useful orientation reference, record its `x` location from the left cast-top edge.
3. Do **not** burn time mapping all four support-pad centers at this stage. The real saw will be used as the drilling template on the cradle deck.

Take one photo of a support pad and one photo of the reference hole area if you record it.

### 4. Measure `mount_hole_diameter` and `lowest_underside_protrusion_below_mount_plane`

Use `Setup B`.

Method:

1. Measure the actual mounting-hole diameter with calipers if you already know which bolt family you want to use.
2. Bridge a straightedge across two support pads that define the mount plane.
3. Measure from that plane down to the lowest non-pad feature.
4. Include anything that could hit a stretcher, block wrench access, or foul the dust well.

If you plan to transfer-punch the deck directly from the saw and size the holes afterward, you can leave `mount_hole_diameter` blank until procurement time.

### 5. Measure rail travel and overhang envelope

Use `Setup A`.

Required ids:

- `rail_left_projection_min`
- `rail_front_projection_min`
- `rail_front_projection_max`
- `rail_rear_projection_min`
- `rail_rear_projection_max`
- `rail_front_overhang_y`
- `rail_rear_overhang_y`
- `rail_clear_span_y`

Definition:

For these values:

- `rail_left_projection_min` means how far the rail system projects **left of the cast-top left edge** at minimum rip
- `rail_front_projection_*` and `rail_rear_projection_*` mean how far the rail system projects **to the right of the cast-top right edge**
- `rail_front_overhang_y` and `rail_rear_overhang_y` mean how far the rail bodies sit beyond the front and rear cast-top edges
- all measurements are taken on the actual rail hardware and do not include the removable fence face

Method:

1. Set the rip system to minimum width.
2. Record `rail_left_projection_min` from the cast-top left edge.
3. At the front and rear rails, confirm the minimum-rip right-side projection.
4. Set the rip system to maximum width and measure the front and rear right-side projections.
5. Measure the front and rear rail overhang relative to the cast-top front and rear edges.
6. Measure the clear support span between the rail bodies if you need a reminder for underside support-strip layout.

The midpoint projection can be derived later if you want a reference number. It is not a hard survey gate.

Take photos of minimum and maximum settings.

### 6. Measure dust-port center

Use `Setup B`.

Required ids:

- `dust_port_center_x`
- `dust_port_center_y`

Method:

1. Identify the center of the saw's dust port.
2. Measure its center from the left and front cast-top edges.
3. Record the dust-port diameter in notes if it differs materially from the assumed `2.5 in` class connection.

### 7. Measure hose sweep

Use `Setup A`.

Required ids:

- `dust_hose_sweep_depth_0deg`
- `dust_hose_sweep_depth_45deg`

Definition:

For these values, `sweep depth` means:

- the maximum distance any attached elbow or hose loop projects **behind the rear cast-top edge**
- while cycling the saw through the full intended motion

Method:

1. Attach the actual hose or elbow you intend to use, or the closest realistic stand-in.
2. Set blade to `0 deg`.
3. Run the blade through the full height range and watch the hose path.
4. Measure the maximum rearward projection behind the rear cast-top edge.
5. Repeat at `45 deg` bevel.

Take photos at the worst-case positions.

## Fill-In Table

Write the measured values here first, then transfer them into [data/measurements.csv](/Users/christopherhandel/Documents/GitHub/Table Saw-sliding-carriage/data/measurements.csv).

| ID | Value | Units | Notes |
| --- | --- | --- | --- |
| `stripped_blade_center_y` | ______ | in | average of front and rear tooth readings |
| `miter_slot_width` | ______ | in | verify both slots match |
| `miter_slot_depth` | ______ | in | verify both slots match |
| `foot_pad_width_x` | ______ | in | actual support footprint |
| `foot_pad_depth_y` | ______ | in | actual support footprint |
| `front_left_mount_hole_x` | ______ | in | optional orientation reference only |
| `mount_hole_diameter` | ______ | in | optional until final bolt procurement |
| `lowest_underside_protrusion_below_mount_plane` | ______ | in | include wrench-access conflicts |
| `rail_left_projection_min` | ______ | in | measured from cast-top left edge |
| `rail_front_projection_min` | ______ | in | measured from cast-top right edge |
| `rail_front_projection_max` | ______ | in | measured from cast-top right edge |
| `rail_rear_projection_min` | ______ | in | measured from cast-top right edge |
| `rail_rear_projection_max` | ______ | in | measured from cast-top right edge |
| `rail_front_overhang_y` | ______ | in | measured ahead of the cast-top front edge |
| `rail_rear_overhang_y` | ______ | in | measured behind the cast-top rear edge |
| `rail_clear_span_y` | ______ | in | support-strip reminder only |
| `dust_port_center_x` | ______ | in | port center from left cast-top edge |
| `dust_port_center_y` | ______ | in | port center from front cast-top edge |
| `dust_hose_sweep_depth_0deg` | ______ | in | max projection behind rear edge |
| `dust_hose_sweep_depth_45deg` | ______ | in | max projection behind rear edge |

## Done Checklist

- [ ] All survey values copied into `data/measurements.csv`
- [ ] Survey photos saved somewhere you can reference later
- [ ] `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- [ ] `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes
- [ ] Only after that: machine the top opening, miter-slot extensions, and carriage guide-strip zones
- [ ] Transfer-drill the saw cradle deck only after the saw is sitting flush on the tuned deck
- [ ] Drill final dust-branch holes only after the real hose path is marked from the fitted saw
