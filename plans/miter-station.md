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

The opening and cover sizes are now driven by public `DCS781` dimensions plus the accepted conservative retail envelope, not by a bespoke prebuild survey.

The automated precision-ready gate only checks that those accepted public dimensions still fit the contract. Real tray fit, shimming, and bolt transfer remain manual steps.

## Operating Rules

- the stowed cover is a work surface first and a storage position second
- the stowed cover must finish flush or slightly low, never proud
- the rear-edge pivot provides motion only; it is not the final deployed datum
- the deployed tray position must be set by hard stops
- the miter saw uses the flex hose, docked in the front-right service zone
- battery swaps and normal saw controls happen from above with the station deployed
- the right support span is counted with the router fence removed; stop work and router-fence work are not assumed to happen at the same time

## Build Sequence

1. Confirm the public `DCS781` rows in [miter-saw-survey.md](./miter-saw-survey.md) still match the saw you plan to use.
2. Cut `MS-01`, `MS-04`, `MS-05`, and `MS-06` to final size.
3. Dry-fit `FT-01` pivot side plates and the selected pivot hardware in the centered bay.
4. Set the real saw on `MS-01`, prove the shim or spacer stack under the feet, and only then transfer the final tray bolt pattern.
5. Trim `MS-02` and `MS-03` after the real tray depth and pivot stack are proven.
6. Install `FT-03` hard stops and tune the deployed tray to the target support height.
7. Install `FT-02` latch blocks and the stowed latches after the cover can close flush.
8. Install stop track on `MS-05` and `MS-06` only after the fence line is confirmed from the real saw.
9. If top-surface T-track is added beside the station for stop-block use, field-fit that run to the real deployed fence line after the station is installed instead of machining to nominal layout coordinates.

## Acceptance Checks

- station centerline lands within `2 in` of bench center
- left support span is at least `30 in`
- right support span is at least `30 in` with the router fence removed
- the stowed cover is flush or slightly low across the full opening
- the deployed tray repeats its height after multiple open/close cycles
- the real saw table lands flush with the surrounding bench top after the shim stack is locked
- any adjacent top-surface T-track intended for stop blocks is aligned to the real deployed fence line
- the mechanism stays clear of the saw rail keep-clear lanes and right-side service zone

## Fit-Only Unknowns

These values still come from the real miter saw during tray fit, but they are no longer pre-cut survey gates:

- mount footprint
- required rear slide clearance
- support-table height
- fence height
- dust-port location and outside diameter for the deployed flex hose
