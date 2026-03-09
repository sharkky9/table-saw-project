# Bench Requirements

## Status

This is the active product intent. The layout JSON, renders, and builder package now all target the same fixed-top bench with a centered flip-top miter station.

## Mission

Build a garage bench that does six real jobs without turning into a mechanism project:

1. Integrate the `SKIL SPT99-11` as the primary ripping tool.
2. Provide honest right-hand and outfeed support for the table saw.
3. Package a router table into the right-hand support field.
4. Add a centered flip-top miter station that becomes the primary crosscut tool.
5. Package dust collection, hose switching, and split power access in a serviceable way.
6. Still behave like useful shop furniture with storage and enough top area to support a `4 x 8` sheet.

## Active Reset

The prior sliding-carriage and precision-wing work is now superseded. The active direction is:

- fixed `90 x 48 x 36 in` bench
- no expandable wings
- no requirement to continue table-saw miter slots through the bench
- primary crosscut workflow moves to the miter saw
- table saw remains responsible for ripping, dado-style support work, and general bench integration

## Design Freeze

- Overall footprint: `90 in x 48 in x 36 in`
- Parked mode: long side on the `~90 in` wall
- Deployed mode: roll straight out from the wall; rotation is optional, not required
- Table-saw placement: blade centerline remains `36 in` from the left bench edge unless a later geometry proof shows an impossible collision
- Table-saw feed direction: across the `48 in` depth
- Miter-station placement: centered as closely as practical on the front/operator long side
- Router placement: far-right flush insert zone
- Dust packaging: internal `Hercules HE028` plus `Oneida Dust Deputy Low-Pro` on a `5 gallon` bucket plus one-tool-at-a-time `2-1/2 in` manifold
- Mobility: industrial leveling casters with optional supplemental fixed leveling feet only if the slab needs more range
- Finish standard: tactile, durable shop finish, not furniture-grade show finish

## Why This Geometry

The `90 in` length is long enough to be useful for sheet handling and miter-station support while still fitting the available wall. The `48 in` depth gives real table-saw support and enough surface area that a `4 x 8` sheet is only short by about `3 in` at either end, which the owner accepts.

The bench is explicitly no longer trying to earn sheet support through fold-out wings. The fixed core should do the work.

## Top Strategy

### Permanent Top

- One fixed `90 x 48 in` work surface
- `3/4 in` plywood substrate plus `3/4 in` MDF precision skin in the main precision fields
- Blade lowered below the surface when the bench is used for assembly or track-saw support
- Router lift plate flush with the surrounding top
- Miter station has a stowed position that returns the front side to a flush work surface

### No Expandable Wings

- No front precision wing
- No side sheet-good wing
- No sliding carriage
- No design obligation to preserve the earlier wing-slot continuity work

### Dog Holes And Clamping

Day one does not drill the permanent top into an MFT-style surface. Instead:

- keep the fixed top clean and durable
- avoid proud permanent hardware in sheet-support zones
- plan a removable overlay after the core bench proves itself

## Table-Saw Integration

- Saw body is removed from the rolling stand.
- Finished bench top must end flush to the saw tabletop, never above it.
- Final saw mounting plane stays `22.625 in` from the floor based on the measured `13.375 in` saw-body height and a `36 in` finished working height.
- The saw opening and mount remain field-fit from the real saw body before the final top is machined.
- The measured rail envelope remains a hard under-top constraint:
  - minimum setting shifts the rails left of the cast top and does not protrude to the right
  - maximum setting projects about `18-5/8 in` to the right of the cast top
  - the rail system overhangs about `2-1/2 in` at the front and `1-5/8 in` at the rear
  - the clear tabletop support span between rails is about `22-11/16 in`

## Table-Saw Support Goals

### Required

- real right-hand support through the usable fence-extension range
- real outfeed support
- honest clearance for the measured rail travel and dust hose sweep

### Optional Later

- deployable infeed support is allowed as a follow-on feature
- it must not reintroduce a precision-wing or sliding-carriage dependency into the core layout

## Miter Station

- A flip-top miter station is in scope for the core package.
- The station is centered on the front/operator long side as closely as practical.
- The miter saw is now the primary crosscut tool.
- The station must provide meaningful left and right support for stops and repeat cuts.
- The stowed position must return a flush or slightly low work surface and must not sit proud.
- Publicly available `DeWALT DCS781` dimensions are now sufficient to size the station envelope and cover parts.
- Real-tool fit is still required for tray bolt transfer, final hard-stop tuning, and any shims or spacer pucks needed to make the deployed saw table and stowed cover both land flush to the bench top.
- If top-surface T-track is later added beside the miter station for stop-block work, field-align that track to the installed deployed fence line instead of freezing a nominal coordinate before tray fit.

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
  - Oneida `Dust Deputy Low-Pro` separator on a `5 gallon` bucket
  - manifold
  - hose routing
- Default manifold concept: Rockler `2-1/2 in` sliding manifold
- Default fixed internal branches:
  - saw
  - router
  - flex hose for mobile tools
- The miter saw uses the flexible hose path rather than forcing a permanent fourth internal branch.
- The miter-saw dust hose is a deployed-only connection to the top-exit dust port and does not justify a fixed station branch or a precision-routed hard hose.
- Keep an open well under the saw to preserve blade-height, bevel, and hose movement.
- Sequential bucket-first, extractor-second service remains acceptable if the real service path is honest and removable.

## Power Access

Power is split into honest domains instead of pretending one inlet solves everything:

- `Tool circuit`: dedicated pigtail or dedicated inlet for either the saw or the router motor
- `Dust/aux circuit`: separate inlet feeding the extractor, lighting, chargers, and low-draw accessories

This keeps the design realistic for the saw and router loads and still allows the user to place a weather-protected or marine-style inlet on the side of the bench.

## Storage

Storage is subordinate to saw, dust, and service access. The active storage mix is:

- left drawer bank for router bits, layout tools, and small accessories
- narrow vertical bay for fences, sleds, and jigs
- front-right service face for power switching, manifold access, and hose exits
- dust bay below the router zone with a front bucket zone and rear extractor zone

## Assembly-Table Functionality

The correct approach remains overlay-first, not "cover the whole bench in slots."

### Stage-1 Permanent Surface

- no fixed T-track in the permanent top on day one
- keep the permanent top smooth for stock support, outfeed, miter-station stowage, and sheet handling

### Overlay Strategy

- add a removable overlay after the core bench proves itself
- overlay must stay out of the saw opening, rail keep-clear lanes, and miter-station operating envelope
- overlay anchor geometry must land in structure, not only MDF skin

## Finish Expectations

- All hand-contact edges eased
- No splinters, fuzz, or sharp plywood edges in user-touch zones
- Main top sealed with a durable satin waterborne finish
- MDF fully sealed before topcoat
- Hidden structural areas cleaned up enough to avoid snagging, but not over-finished

## Explicit Owner-Accepted Assumptions

- The package does not need a balanced-top redesign just because the bench lives in a garage.
- Sequential bucket/extractor service is acceptable and does not, by itself, justify re-architecting the right bay.
- The new DeWalt miter saw meaningfully reduces the need for a table-saw-centered crosscut wing.

## Field-Verification Items

These measurements are still mandatory before cutting the final precision top:

- actual stripped-saw blade front-to-back datum
- actual saw fit on the adjustable mounting deck before drilling final bolt holes
- exact front and rear rail underside sweep at minimum and maximum rip
- exact dust-elbow hose envelope at blade-height and bevel extremes
- final Hercules package geometry at the service opening
- final Low-Pro bucket and latch clearance with the chosen `5 gallon` bucket
- actual miter-station tray fit before the final tray bolt pattern is drilled
- actual hard-stop and latch tuning so the deployed saw table and stowed cover both land flush with the bench top
- actual deployed fence line before locking any adjacent stop-block T-track location
- actual flex-hose reach and release at the deployed top-exit miter-saw dust port
