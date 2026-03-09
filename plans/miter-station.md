# Miter Station

## Purpose

The miter station gives the bench a centered crosscut station without reintroducing a sliding-carriage or precision-wing dependency.

## Contract Geometry

- opening size: `22 x 12 in`
- opening location: centered on the operator/front edge with `x = 34 in` to `56 in`
- station centerline: `x = 45 in`
- left support surface: `34 x 12 in`
- right support surface: `34 x 12 in`
- nominal fence line: `y = 6 in` from the front edge
- concept-only deployed envelope: `28 in` wide by `30 in` deep, centered on the same bay

The operator-side overhang in deployed mode is acceptable. The fixed top is what carries sheet support when the station is stowed.

## Operating Rules

- the stowed cover is a work surface first and a storage position second
- the stowed cover must finish flush or slightly low, never proud
- the rear-edge pivot provides motion only; it is not the final deployed datum
- the deployed tray position must be set by hard stops
- the miter saw uses the flex hose, docked in the front-right service zone
- battery swaps and normal saw controls happen from above with the station deployed

## Build Sequence

1. Complete [miter-saw-survey.md](./miter-saw-survey.md) and record the measurements in `data/measurements.csv`.
2. Cut `MS-01`, `MS-04`, `MS-05`, and `MS-06` to final size.
3. Dry-fit `FT-01` pivot side plates and the selected pivot hardware in the centered bay.
4. Trim `MS-02` and `MS-03` after the real tray depth and pivot stack are proven.
5. Install `FT-03` hard stops and tune the deployed tray to the target support height.
6. Install `FT-02` latch blocks and the stowed latches after the cover can close flush.
7. Install stop track on `MS-05` and `MS-06` only after the fence line is confirmed from the real saw.

## Acceptance Checks

- station centerline lands within `2 in` of bench center
- left support span is at least `30 in`
- right support span is at least `30 in`
- the stowed cover is flush or slightly low across the full opening
- the deployed tray repeats its height after multiple open/close cycles
- the mechanism stays clear of the saw rail keep-clear lanes and right-side service zone

## Survey-Gated Unknowns

These values still come from the real miter saw before precision machining:

- mount footprint
- stowed envelope
- required rear slide clearance
- support-table height
- fence height
- dust-port location and outside diameter
- actual tool weight for lift/stow handling
