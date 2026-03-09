# Flip-Top Mechanism

## Purpose

The flip-top mechanism lets the miter station switch between a flush work surface and a deployed saw tray without asking the pivot or the floor to become the accuracy datum.

## Architecture

- `MS-01`: tray deck that carries the saw
- `MS-04`: cover panel that becomes the stowed work surface
- `MS-02` and `MS-03`: tray walls and rails that tie the assembly together
- `FT-01`: pivot side plates
- `FT-02`: latch blocks for the stowed position
- `FT-03`: deployed hard-stop blocks
- `FAST-11` and `FAST-12`: pivot hardware and bushings
- `FAST-13`: stowed latches
- `FAST-14`: hard-stop screws with jam nuts

## Datum Logic

- the pivot is for motion only
- the deployed tray height is set by `FT-03` and `FAST-14`
- the stowed surface is pulled flush by `FAST-13`
- the saw and tray must not depend on latch slop or hinge slop for repeatability

## Fit Sequence

1. Install `FT-01` side plates and the pivot hardware in the real bay.
2. Hang the tray assembly and confirm free rotation.
3. Set the deployed tray position with `FT-03` and `FAST-14`.
4. Tune the stowed close position with `FT-02` and the latch strike locations.
5. Recheck both states after the hardware is fully tightened.

## Proof Procedure

Run this before calling the station precision-ready:

1. Open and close the station `10` full cycles.
2. Latch the cover shut in the normal sequence.
3. Check the stowed surface at left, center, and right with a straightedge.
4. Deploy the tray and check repeatable height at both support edges.
5. Confirm the tray does not rub fixed structure through the full swing.

The mechanism fails if:

- any point of the cover sits proud
- the deployed tray height drifts after cycling
- latch force is required to hold the deployed position
- the tray or saw intrudes into the table-saw rail keep-clear lanes or the right-side service zone
