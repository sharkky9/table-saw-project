# Stripped-Saw Survey

Use this sheet after removing the `SKIL SPT99-11` from its rolling stand and before machining the final top opening or drilling the final mounting deck.

This is the table-saw-only survey. The centered flip-top miter station now has its own contract in [miter-saw-survey.md](./miter-saw-survey.md).

## Purpose

This survey closes the precision-cut gate. The core front-to-back datum is now known, but this checklist still protects the final opening, rail-clearance, and mounting-deck drilling steps from guesswork.

This survey directly unlocks:

- final saw opening size and local reliefs
- final mounting-deck drilling
- final saw dust-branch routing
- final under-top rail keep-clear geometry
- the table-saw side of the fixed-top layout contract

## Hard Stop

Do not machine the top or drill the final mounting deck until every required survey row is real in [data/measurements.csv](../data/measurements.csv).

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
- `mount plane` means the plane that touches the bottoms of the four saw support feet or pads

Mark the front and left cast-top edges with painter's tape before you start measuring.

## Setup

### Setup A: Upright

Use this for:

- blade center `y`
- miter-slot width and depth
- rail sweep at minimum and maximum rip
- dust hose sweep at `0 deg` and `45 deg`

Support the stripped saw upright on a stable temporary platform so the cast top is level and the underside is still reachable enough to observe moving parts.

### Setup B: Inverted

Use this for:

- foot-pad size
- lowest underside protrusion
- dust-port center location

Set the saw upside down on padded blocks that support the cast top safely. Do not rest the saw on knobs handwheels or fence rails.

## Before You Start

- [ ] Saw unplugged
- [ ] Fence removed
- [ ] Miter gauge removed
- [ ] Blade guard and riving components removed if they interfere
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

### 2. Record `miter_slot_width` and `miter_slot_depth`

Use `Setup A`.

Method:

1. The package now assumes standard `3/4 x 3/8 in` slots unless later fit testing proves otherwise.
2. If you still want to verify, measure each slot with calipers at the front middle and rear.
3. Record any meaningful deviation in notes before buying track.

### 3. Measure foot-pad size

Use `Setup B`.

Required ids:

- `foot_pad_width_x`
- `foot_pad_depth_y`

Method:

1. Measure the actual support pad footprint.
2. Take one photo with a ruler visible if you want a future reference.

The package no longer blocks on exact foot-center or hole-center coordinates. The mounting deck is drilled from the real saw after flush fit.

### 4. Measure `lowest_underside_protrusion_below_mount_plane`

Use `Setup B`.

Method:

1. Bridge a straightedge across two foot pads that define the mount plane.
2. Measure from that plane down to the lowest non-foot feature.
3. Include anything that could hit a stretcher block wrench access or foul the dust well.

### 5. Measure rail sweep at minimum and maximum rip

Use `Setup A`.

Required ids:

- `rail_front_projection_min`
- `rail_front_projection_max`
- `rail_rear_projection_min`
- `rail_rear_projection_max`
- `rail_left_projection_min_setting`
- `rail_front_overhang_from_cast_top`
- `rail_rear_overhang_from_cast_top`
- `rail_clear_span_between_rails`
- `rail_to_rail_depth_max`
- `rail_knob_depth_max`

Definition:

For these values `projection` means:

- how far the moving rail or carriage hardware extends **to the right of the cast-top right edge**
- measured under the top and not including the removable fence face

Method:

1. Set the rip system to minimum width.
2. At the front rail find the furthest-right hard point under the top and measure from the cast-top right edge.
3. Repeat at the rear rail.
4. Repeat for maximum right-rip position.
5. Measure the leftward rail projection at minimum rip.
6. Measure the front and rear rail overhang beyond the cast top.
7. Measure the clear support span between the rails and the overall rail-to-rail depth.
8. If the fence adjustment knob projects farther than the rail envelope, record that deeper overall envelope too.

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

For these values `sweep depth` means:

- the maximum distance any attached elbow or hose loop projects **behind the rear cast-top edge**
- while cycling the saw through the full intended motion

Method:

1. Attach the actual hose or elbow you intend to use or the closest realistic stand-in.
2. Set blade to `0 deg`.
3. Run the blade through the full height range and watch the hose path.
4. Measure the maximum rearward projection behind the rear cast-top edge.
5. Repeat at `45 deg` bevel.

Take photos at the worst-case positions.

## Fill-In Table

Write the measured values here first then transfer them into [data/measurements.csv](../data/measurements.csv).

| ID | Value | Units | Blocks |
| --- | --- | --- | --- |
| `stripped_blade_center_y` | ______ | in | top machining and saw-fit reference |
| `miter_slot_width` | ______ | in | saw-reference fit |
| `miter_slot_depth` | ______ | in | saw-reference fit |
| `foot_pad_width_x` | ______ | in | deck support reference |
| `foot_pad_depth_y` | ______ | in | deck support reference |
| `lowest_underside_protrusion_below_mount_plane` | ______ | in | local saw-well relief only if needed |
| `rail_front_projection_min` | ______ | in | right-side relief machining |
| `rail_front_projection_max` | ______ | in | right-side relief machining |
| `rail_rear_projection_min` | ______ | in | right-side relief machining |
| `rail_rear_projection_max` | ______ | in | right-side relief machining |
| `rail_left_projection_min_setting` | ______ | in | left-side rail envelope |
| `rail_front_overhang_from_cast_top` | ______ | in | front rail keep-clear lane |
| `rail_rear_overhang_from_cast_top` | ______ | in | rear rail keep-clear lane |
| `rail_clear_span_between_rails` | ______ | in | tabletop support zone between rails |
| `rail_to_rail_depth_max` | ______ | in | full rail envelope |
| `rail_knob_depth_max` | ______ | in | deepest front or rear hardware envelope |
| `dust_port_center_x` | ______ | in | saw dust branch drilling |
| `dust_port_center_y` | ______ | in | saw dust branch drilling |
| `dust_hose_sweep_depth_0deg` | ______ | in | saw dust branch drilling |
| `dust_hose_sweep_depth_45deg` | ______ | in | saw dust branch drilling |

## Done Checklist

- [ ] All survey values copied into `data/measurements.csv`
- [ ] Survey photos saved somewhere you can reference later
- [ ] `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- [ ] `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes
- [ ] Only after that: machine the top opening and drill the final mounting deck
