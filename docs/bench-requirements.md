# Bench Requirements

## Status

This package is concept-valid, not shop-ready. The stripped-saw survey data is now incorporated, but actual saw fit, wing field proof, and right-bay packaging mockup are still hard gates.

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
- Mobility: industrial leveling casters with optional supplemental fixed leveling feet only if the slab needs more range
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
  - rear main panel: concept region `90 x 31.75 in`
  - right-front infill: concept region `30.25 x 16.25 in`
- `3/4 in` plywood substrate plus `3/4 in` MDF precision skin on the fixed top regions
- Blade lowered below the surface when the bench is used for assembly or track-saw support
- Router lift plate flush with the surrounding top
- Front-left infeed area is a separate fold-down wing, not part of the fixed top
- Top and wing blank sizes are locked, but the saw opening slot routing and local reliefs remain field-fit operations

### Rail-Clearance Strategy

The Skilsaw rack-and-pinion rails must be allowed to extend to full width. The bench therefore keeps a pair of underside keep-clear lanes in the right-side support field instead of treating the whole right side as ordinary cabinet construction. The top surface remains continuous, but blocking, dividers, and hardware under those lanes must stay out of the rail-travel path.

### Dog Holes And Clamping

Day one does **not** drill the permanent top into an MFT-style surface. Instead:

- keep the fixed top clean and durable
- keep stage-1 permanent clamp hardware out of the precision top
- plan a removable `60 x 31.5 x 3/4 in` assembly overlay that can later receive T-track or `20 mm` holes if it proves useful

## Saw Integration

- Saw body is removed from the rolling stand.
- Finished bench top must end flush to the saw tabletop, never above it.
- Final saw mounting plane is `22.625 in` from the floor, based on the user's measured `13.375 in` saw-body height and a `36 in` finished working height.
- The saw opening and mount must be field-fit from the real saw body before the final top is machined.
- Opening target is now:
  - `1/32 in` general support gap
  - `1/16 in` maximum local relief only where real field-fit interference requires it outside the stock-support path

## Crosscut Support

### Fixed Support

- Long left-side field supports the Vevor miter gauge and long fence
- Rear support surface continues behind the saw
- Both miter-slot centerlines are intended to continue through the rear support

### Deployable Support

- A fold-down front infeed wing spans the left and center modules
- Nominal depth: `16.25 in`
- Nominal width: `59.75 in`
- Both miter-slot centerlines are intended to continue through this wing
- Precision slot continuity is now an engineered mechanism with a required field-proof procedure
- The wing remains unproven until the deploy/stow proof and sliding checks are completed on the real bench

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
- The dust package is still mockup-gated. Current geometry is a packaging concept, not a proof.
- Sequential bucket-first, extractor-second service is acceptable if the package remains affordable, removable, and honest in the docs.

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
- dust bay below the router zone with a front bucket zone and rear extractor zone

## Assembly-Table Functionality

The correct approach is overlay-first, not “cover the whole bench in slots.”

### Stage-1 Permanent Surface

- No fixed T-track in the permanent top on day one
- Keep the permanent top smooth for stock support, outfeed, and sheet handling

### Overlay Strategy

- Add a removable `60 x 31.5 x 3/4 in` assembly overlay after the core bench proves itself
- Overlay registers to the left and rear edges and stays entirely within the rear main panel
- Overlay stores separately when not in use
- Overlay can start with T-tracks and later be perforated with `20 mm` holes if desired
- Overlay needs an underside stiffener where it spans the saw opening
- Overlay anchors must stay left of the saw opening and outside the rail keep-clear lanes

## Finish Expectations

- All hand-contact edges eased
- No splinters, fuzz, or sharp plywood edges in user-touch zones
- Main top and wing sealed with satin waterborne finish
- MDF fully sealed before topcoat
- Hidden structural areas cleaned up enough to avoid snagging, but not over-finished

## Explicit Owner-Accepted Assumptions

- The package does not need a balanced-top redesign just because the bench lives in a garage.
- Sequential bucket/extractor service is acceptable and does not, by itself, justify re-architecting the right bay.

## Field-Verification Items

These measurements are still mandatory before cutting the final precision top:

- actual stripped-saw blade front-to-back datum
- actual saw fit on the adjustable mounting deck before drilling final bolt holes
- exact front and rear rail underside sweep at minimum and maximum rip
- exact dust-elbow hose envelope at blade-height and bevel extremes
- final Hercules package geometry at the service opening
- final Low-Pro bucket and latch clearance with the chosen 5 gallon bucket
