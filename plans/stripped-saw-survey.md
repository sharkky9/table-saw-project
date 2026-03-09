# Stripped-Saw Survey

Use this sheet after removing the `SKIL SPT99-11` from its rolling stand and before machining the final top opening, slot extensions, carriage guide-strip zones, or saw cradle.

## Purpose

This survey closes the precision-cut gate. Until it is done, the build package is only concept-accurate in the saw's front-to-back direction.

This survey directly unlocks:

- final saw opening size and location
- final fixed front and rear slot-extension geometry
- final carriage park clearance at the left side of the saw
- final saw cradle drilling
- final miter-track procurement
- final saw dust-branch routing

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
- `mount plane` means the plane that touches the bottoms of the four saw support feet / pads

Mark the front and left cast-top edges with painter's tape before you start measuring.

## Setup

### Setup A: Upright

Use this for:

- blade center `y`
- miter-slot width and depth
- rail sweep at min / mid / max rip
- dust hose sweep at `0 deg` and `45 deg`

Support the stripped saw upright on a stable temporary platform so the cast top is level and the underside is still reachable enough to observe moving parts.

### Setup B: Inverted

Use this for:

- foot-center locations
- foot-pad size
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

### 3. Measure foot centers and foot-pad size

Use `Setup B`.

Required ids:

- `front_left_foot_center_x`
- `front_left_foot_center_y`
- `front_right_foot_center_x`
- `front_right_foot_center_y`
- `rear_left_foot_center_x`
- `rear_left_foot_center_y`
- `rear_right_foot_center_x`
- `rear_right_foot_center_y`
- `foot_pad_width_x`
- `foot_pad_depth_y`
- `mount_hole_diameter`

Method:

1. Label the four feet `front-left`, `front-right`, `rear-left`, `rear-right`.
2. For each foot, measure to the **center of the mounting hole or mounting pad center** from the left and front cast-top edges.
3. Measure the actual support pad footprint, not just the hole center.
4. Measure the hole diameter with calipers.

Take one photo per foot with a ruler visible.

### 4. Measure `lowest_underside_protrusion_below_mount_plane`

Use `Setup B`.

Method:

1. Bridge a straightedge across two foot pads that define the mount plane.
2. Measure from that plane down to the lowest non-foot feature.
3. Include anything that could hit a stretcher, block wrench access, or foul the dust well.

### 5. Measure rail sweep at min / mid / max rip

Use `Setup A`.

Required ids:

- `rail_front_projection_min`
- `rail_front_projection_mid`
- `rail_front_projection_max`
- `rail_rear_projection_min`
- `rail_rear_projection_mid`
- `rail_rear_projection_max`

Definition:

For these values, `projection` means:

- how far the moving rail / carriage hardware extends **to the right of the cast-top right edge**
- measured under the top, not including the removable fence face

Method:

1. Set the rip system to minimum width.
2. At the front rail, find the furthest-right hard point under the top and measure from the cast-top right edge.
3. Repeat at the rear rail.
4. Repeat for a `mid` setting.
   Suggested rule: set the carriage halfway between minimum and maximum right-rip position.
5. Repeat for maximum right-rip position.

Take photos of min, mid, and max.

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

- the maximum distance any attached elbow / hose loop projects **behind the rear cast-top edge**
- while cycling the saw through the full intended motion

Method:

1. Attach the actual hose / elbow you intend to use, or the closest realistic stand-in.
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
| `front_left_foot_center_x` | ______ | in |  |
| `front_left_foot_center_y` | ______ | in |  |
| `front_right_foot_center_x` | ______ | in |  |
| `front_right_foot_center_y` | ______ | in |  |
| `rear_left_foot_center_x` | ______ | in |  |
| `rear_left_foot_center_y` | ______ | in |  |
| `rear_right_foot_center_x` | ______ | in |  |
| `rear_right_foot_center_y` | ______ | in |  |
| `foot_pad_width_x` | ______ | in | actual support footprint |
| `foot_pad_depth_y` | ______ | in | actual support footprint |
| `mount_hole_diameter` | ______ | in |  |
| `lowest_underside_protrusion_below_mount_plane` | ______ | in | include wrench-access conflicts |
| `rail_front_projection_min` | ______ | in | measured from cast-top right edge |
| `rail_front_projection_mid` | ______ | in | measured from cast-top right edge |
| `rail_front_projection_max` | ______ | in | measured from cast-top right edge |
| `rail_rear_projection_min` | ______ | in | measured from cast-top right edge |
| `rail_rear_projection_mid` | ______ | in | measured from cast-top right edge |
| `rail_rear_projection_max` | ______ | in | measured from cast-top right edge |
| `dust_port_center_x` | ______ | in | port center from left cast-top edge |
| `dust_port_center_y` | ______ | in | port center from front cast-top edge |
| `dust_hose_sweep_depth_0deg` | ______ | in | max projection behind rear edge |
| `dust_hose_sweep_depth_45deg` | ______ | in | max projection behind rear edge |

## Done Checklist

- [ ] All survey values copied into `data/measurements.csv`
- [ ] Survey photos saved somewhere you can reference later
- [ ] `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- [ ] `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes
- [ ] Only after that: machine the top opening, miter-slot extensions, carriage guide-strip zones, and saw cradle
