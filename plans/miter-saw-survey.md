# Miter-Saw Survey

Use this sheet for the owner's `DeWalt 60V 12 in` cordless sliding miter saw before freezing the centered flip-top miter-station opening, support fences, or dust path.

## Purpose

This survey closes the miter-station geometry gate. The bench program is now centered on a fixed `90 x 48` top with a front-side miter station, so the real saw envelope must be recorded before the flip-top cutout is treated as more than concept geometry.

This survey directly unlocks:

- final flip-top opening size
- final deployed support-surface height
- final stop-fence height
- final rear slide clearance
- final miter-station dust-port routing

## Hard Stop

Do not machine the miter-station opening, drill the flip-top tray, or finalize the stop fences until every required miter-saw row is real in [data/measurements.csv](/Users/christopherhandel/Documents/Github/Table Saw Project/.worktrees/bench-fixed-top-layout/data/measurements.csv).

## Tools

- `tape measure`
- `6 in` steel rule
- `combination square`
- `digital calipers`
- `straightedge`
- `phone camera`
- `painter's tape`
- `scrap support blocks`

## Datum System

Use a simple repeatable datum system from the deployed saw:

- `x`: from the **left deployed support datum** toward the right
- `y`: from the **front deployed support datum** toward the rear
- `z`: upward from the **miter-saw mount plane**

Definitions:

- `front` means the operator side of the miter station
- `left` and `right` are from the normal cutting position
- `mount plane` means the plane that the saw base or mounting feet sit on in the deployed station

## Setup

### Setup A: Stowed Envelope

Use this for:

- overall stowed width
- overall stowed depth
- overall stowed height

Put the saw in the exact stowed configuration you expect the flip-top bay to contain:

- battery installed or the battery size you actually plan to store on the saw
- head locked if that is the intended storage state
- any permanent fences or support faces removed only if they truly store elsewhere

### Setup B: Deployed Geometry

Use this for:

- mount footprint width and depth
- table height
- fence height
- rear slide clearance
- dust-port center and outside diameter

Support the saw on a flat surface and set it to its normal deployed cutting position.

## Before You Start

- [ ] Saw in the exact storage configuration you intend to design around
- [ ] Saw deployed on a flat surface for geometry checks
- [ ] Fence and table cleaned so the straightedge sits honestly
- [ ] Photos taken of both stowed and deployed positions

## Procedure

### 1. Record the selected model

Required id:

- `miter_saw_model`

Method:

1. Copy the product label or model text from the tool, box, or receipt.
2. Record the exact model code in notes if it is more specific than the current placeholder text.

### 2. Measure the mount footprint

Required ids:

- `miter_saw_mount_width`
- `miter_saw_mount_depth`

Method:

1. Measure the real width and depth of the part of the saw base that actually has to sit on the flip-top tray.
2. If feet or pads sit inboard of the outer casting, note both numbers and state which one drives the tray.

### 3. Measure the stowed envelope

Required ids:

- `miter_saw_stowed_width`
- `miter_saw_stowed_depth`
- `miter_saw_stowed_height`

Method:

1. Put the saw into the exact stowed state you plan to store below the cover.
2. Measure the widest, deepest, and tallest points.
3. Include handles, knobs, rails, battery, and dust-port hardware if they remain installed in storage.

### 4. Measure required rear slide clearance

Required id:

- `miter_saw_required_rear_slide_clearance`

Method:

1. Deploy the saw normally.
2. Run the head through its full slide travel.
3. Measure how far behind the support datum the rear-most moving part needs to travel.

### 5. Measure table and fence height

Required ids:

- `miter_saw_table_height`
- `miter_saw_fence_height`

Method:

1. Measure from the saw mount plane to the top of the saw table.
2. Measure from the saw table to the top of the fence.
3. Use the same straightedge and reference point for both measurements.

### 6. Measure the dust-port location

Required ids:

- `miter_saw_dust_port_center_x`
- `miter_saw_dust_port_center_y`
- `miter_saw_dust_port_od`

Method:

1. Identify the center of the deployed saw dust port.
2. Measure its center from the left and front deployed support datums.
3. Measure the outside diameter that matters for a hose cuff or adapter.

### 7. Record tool weight

Required id:

- `miter_saw_weight`

Method:

1. Use the manufacturer spec if it matches the exact model in hand.
2. If the spec is ambiguous, weigh the saw or record the best available real number in notes.

## Fill-In Table

Write the measured values here first then transfer them into [data/measurements.csv](/Users/christopherhandel/Documents/Github/Table Saw Project/.worktrees/bench-fixed-top-layout/data/measurements.csv).

| ID | Value | Units | Blocks |
| --- | --- | --- | --- |
| `miter_saw_model` | ______ | text | miter-station geometry freeze |
| `miter_saw_mount_width` | ______ | in | flip-top tray size |
| `miter_saw_mount_depth` | ______ | in | flip-top tray size |
| `miter_saw_stowed_width` | ______ | in | stowed opening width |
| `miter_saw_stowed_depth` | ______ | in | stowed opening depth |
| `miter_saw_stowed_height` | ______ | in | stowed opening height |
| `miter_saw_required_rear_slide_clearance` | ______ | in | rear slide clearance |
| `miter_saw_table_height` | ______ | in | deployed support height |
| `miter_saw_fence_height` | ______ | in | stop-fence height |
| `miter_saw_dust_port_center_x` | ______ | in | miter-station dust path |
| `miter_saw_dust_port_center_y` | ______ | in | miter-station dust path |
| `miter_saw_dust_port_od` | ______ | in | hose cuff strategy |
| `miter_saw_weight` | ______ | lb | flip-top hardware sizing |

## Done Checklist

- [ ] All survey values copied into `data/measurements.csv`
- [ ] Survey photos saved somewhere you can reference later
- [ ] `python3 tools/validate_measurements.py --require-precision-ready data/measurements.csv` passes
- [ ] `python3 tools/validate_layout.py --require-precision-ready data/layout.json data/measurements.csv` passes
- [ ] Only after that: machine the miter-station opening and finalize the flip-top hardware layout
