# Front Wing Mechanism

## Purpose

The front wing is allowed to carry miter-slot extensions only if its deployed position is defined by the bench, not by the hinge or the floor.

## Mechanism Summary

- hinge: motion only
- two tapered locating pins: lateral registration
- two seam stop screws: vertical seam height
- two over-center draw latches: pull into repeatable final position
- two locking side support brackets: primary deployed support
- one center load-sharing foot: secondary support only

## Registration Logic

Deployment order:

1. swing the wing up on the hinge
2. engage both tapered pins into their bushings
3. bring the wing onto the seam stop screws
4. close both draw latches
5. deploy and lock both side support brackets
6. adjust the center foot only until it just kisses the floor

Important rule:

- the floor is never the primary datum
- the hinge is never the primary datum
- the wing must already be aligned before the center foot carries meaningful load

## Hardware Package

- `FAST-11` tapered alignment pins
- `FAST-12` matching bushings
- `FAST-13` seam stop screws with lock nuts
- `FAST-14` over-center draw latches
- `FAST-15` locking side support brackets
- `FAST-16` center load-sharing foot and glide

## Seam And Slot Tolerances

- seam flushness: `0.000 to -0.005 in`
- seam must never sit proud of the fixed top
- lateral slot mismatch at each transition: `<= 0.005 in`
- slot-end transition gap after edge treatment: `<= 0.010 in`

## Slot-End Treatment

- do not leave square sharp slot ends at the seam
- ease the aluminum-track edges
- chamfer the slot ends lightly so the bar does not catch on a knife edge
- if a wear strip is used at the seam it must still honor the same flushness rule and never sit proud

## Proof Procedure

Run this before routing the wing slot extensions:

1. Deploy and stow the wing `10` full cycles.
2. After the final cycle, engage the full mechanism in the normal order.
3. Check seam flushness at left seam, center seam, and right seam with a straightedge and feeler gauges.
4. Check left-slot and right-slot lateral alignment.
5. Slide a plain miter bar through the full path.
6. Slide the actual Vevor gauge through the full path.

The wing fails if:

- any seam point is high
- any slot transition catches
- lateral mismatch exceeds `0.005 in`
- the mechanism requires shims or floor tricks to repeat

## Build Notes

- install the pins and bushings before routing slot extensions
- set seam stop screws before final latch adjustment
- mount the side brackets so they carry the deployed load without relying on the center foot
- trim or adjust the center foot last
