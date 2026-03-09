# Bench Requirements

## Mission

Build a garage bench that does five jobs without becoming a gimmick:

1. Integrate the `SKIL SPT99-11` as the primary tool.
2. Provide real infeed, outfeed, and side support for ripping and miter-gauge work.
3. Package router-table, dust-collection, and power access in a serviceable way.
4. Support sheet-goods handling and track-saw use without a giant hinged-mechanism project.
5. Still behave like useful shop furniture, including storage and assembly support.

## Design Freeze

- Overall footprint: `90 in x 48 in x 36 in`
- Parked mode: long side on the `~90 in` wall
- Deployed mode: roll straight out from the wall; rotation is optional, not required
- Saw placement: blade centerline at `36 in` from the left bench edge
- Feed direction: across the `48 in` depth
- Crosscut approach: conventional left-slot workflow remains primary
- Router placement: far-right flush insert zone
- Dust packaging: internal `Hercules HE028` + `Oneida Dust Deputy Low-Pro` on a 5 gallon bucket + one-tool-at-a-time `2-1/2 in` manifold
- Mobility: retractable casters plus adjustable leveling feet
- Finish standard: tactile, durable shop finish, not furniture-grade show finish

## Why This Geometry

The `90 in` length uses the available wall cleanly and avoids an awkward leftover strip that is too narrow to be useful. The `48 in` depth is the shortest depth that still lets the bench do honest work as:

- a saw support surface
- a reasonable assembly surface
- a near-full-size track-saw platform with foam and small end-support helpers

The bench is deliberately not a transformer with giant permanent leaves. The fixed core does most of the work, which lowers failure risk and makes the build more realistic.

## Top Strategy

### Permanent Top

- L-shaped fixed top made from:
  - rear main panel: `90 x 31.75 in`
  - right-front infill: `30.25 x 16.25 in`
- `3/4 in` plywood substrate plus `3/4 in` MDF precision skin on the fixed top regions
- Blade lowered below the surface when the bench is used for assembly or track-saw support
- Router lift plate flush with the surrounding top
- Front-left infeed area is a separate fold-down wing, not part of the fixed top

### Rail-Clearance Strategy

The Skilsaw rack-and-pinion rails must be allowed to extend to full width. The bench therefore keeps a pair of underside keep-clear lanes in the right-side support field instead of treating the whole right side as ordinary cabinet construction. The top surface remains continuous, but blocking, dividers, and hardware under those lanes must stay out of the rail-travel path.

### Dog Holes

Day one does **not** drill the permanent top into an MFT-style surface. Instead:

- keep the fixed top clean and durable
- add fixed T-track only in low-conflict zones
- plan a removable `60 x 36 x 3/4 in` assembly overlay that can later receive `20 mm` holes if it proves useful

## Saw Integration

- Saw body is removed from the rolling stand.
- Finished bench top must end flush to the saw tabletop, never above it.
- Final saw mounting plane is `22.625 in` from the floor, based on the user's measured `13.375 in` saw-body height and a `36 in` finished working height.
- The saw opening and mount must be field-fit from the real saw body before the final top is machined.

## Crosscut Support

### Fixed Support

- Long left-side field supports the Vevor miter gauge and long fence
- Rear support surface continues behind the saw
- Both miter-slot centerlines continue through the rear support

### Deployable Support

- A fold-down front infeed wing spans the left and center modules
- Nominal depth: `16.25 in`
- Nominal width: `59.75 in`
- Both miter-slot centerlines continue through this wing
- Wing uses a `72 in` piano hinge, two locking leg supports, and two tapered alignment pins with receivers
- Wing skin is plywood, not MDF, so the exposed edge is less fragile in a garage environment

### Performance Target

The bench must allow stable, repeatable miter-gauge cuts on stock at least `24 in` deep, which is materially beyond the current stand setup.

## Right-Side Rip Support

The bench must preserve useful support to the right of the blade through the full fence-extension envelope. The fence does not require a full `47 in` solid shelf edge-to-edge, but the workpiece must stay supported during wide rips.

## Router Module

- Router is in scope for stage 1.
- Locked lift stack:
  - `JessEm Rout-R-Lift II 02310`
  - `Bosch 1617EVS` motor
- Use the common `9-1/4 x 11-3/4 x 3/8 in` lift-plate standard.
- Router zone stays flush when the fence is removed.
- Router fence stores inside the bench and gets its own branch from the dust manifold.
- Right end panel needs a dedicated access hatch for collet access, lift hardware, and cabinet dust service.

## Dust Collection

- Right-side service bay houses:
  - Hercules `HE028` dust extractor
  - Oneida `Dust Deputy Low-Pro` separator on a 5 gallon bucket
  - manifold
  - hose routing
- Default manifold concept: Rockler `2-1/2 in` sliding manifold
- Default branches:
  - saw
  - router
  - flex hose for mobile tools
- Keep an open well under the saw to preserve blade-height, bevel, and hose movement.
- The Hercules lives on a front-access pull-out tray so the design depends on front serviceability rather than a large static rear void.

## Power Access

Power is split into honest domains instead of pretending one inlet solves everything:

- `Tool circuit`: dedicated pigtail or dedicated inlet for either the saw or the router motor
- `Dust/aux circuit`: separate inlet feeding the extractor, lighting, chargers, and low-draw accessories

This keeps the design realistic for the saw and router loads and still allows the user to place a weather-protected or marine-style inlet on the side of the bench.

## Storage

Storage is subordinate to saw, dust, and service access. The planned storage mix is:

- left drawer bank for router bits, layout tools, and small accessories
- narrow vertical bay for fences, sleds, and jigs
- front-right service face for power switching, manifold access, and hose exits
- dust bay below the router zone with a front bucket zone and rear extractor tray

## Assembly-Table Functionality

The correct approach is hybrid, not “cover the whole bench in slots.”

### Fixed Assembly Features

- Two permanent flush T-tracks in the far-left top field
- Tracks run front-to-back and stay entirely left of the saw-top opening
- Tracks are intended for low-profile clamp heads, stops, and temporary fixtures

### Overlay Strategy

- Add a removable `60 x 36 x 3/4 in` assembly overlay after the core bench proves itself
- Overlay stores vertically when not in use
- Overlay can start with two more T-tracks and later be perforated with `20 mm` holes if desired
- Overlay needs an underside stiffener where it spans the saw opening
- This keeps the permanent saw/outfeed surface smooth and easy to clean

## Finish Expectations

- All hand-contact edges eased
- No splinters, fuzz, or sharp plywood edges in user-touch zones
- Main top and wing sealed with satin waterborne finish
- MDF fully sealed before topcoat
- Hidden structural areas cleaned up enough to avoid snagging, but not over-finished

## Field-Verification Items

These measurements are still mandatory before cutting the final precision top:

- actual stripped-saw blade front-to-back datum
- actual saw mounting points, foot spacing, and underside protrusions
- exact front and rear rail underside sweep at minimum, mid, and maximum rip
- exact dust-elbow hose envelope at blade-height and bevel extremes
- final Hercules tray hardware and hose-cuff envelope
- final Low-Pro bucket and latch clearance with the chosen 5 gallon bucket
