# Sliding-Carriage Variant

## Status

This branch is a draft design variant that adds a Paoson-inspired left sliding carriage without copying his entire bench architecture.

It intentionally keeps the saw feeding across the `48 in` bench depth. The branch does **not** rotate the saw `90 deg`.

## Findings / Investigation Notes

### What Was Attractive About Paoson's Build

- removable left-side sliding carriage
- fold-out side support table for larger panels
- under-carriage support drawer that helps deeper crosscuts without a permanent front overhang

Those three ideas materially improve panel handling on a jobsite-style saw.

### Why This Variant Does Not Rotate The Saw

Rotating the `SPT99-11` would have broken more of the accepted package than the sliding carriage itself:

- the current right-side router and dust-service bay depends on the rail lane geometry staying on the right support field
- the parked wall workflow works because the saw already feeds across the short bench depth
- a rotated saw would force a larger outfeed transformation problem and would no longer reuse most of the current saw-well, dust, and service assumptions
- the fixed footprint can still stay at `90 x 48` if the extra panel support is deployed only as a fold-out side table and an under-carriage support drawer instead of widening the permanent core

The draft therefore keeps the current feed direction and spends the complexity budget on the carriage package instead.

### Breaking Changes Accepted In This Variant

- the front fold-down wing is removed from the design
- the far-left permanent T-track field is removed
- the left storage bank becomes a carriage-support module instead of a three-drawer bank
- the fixed top becomes a three-field full-depth surface instead of an L-shaped top

## Variant Decisions

### Saw And Crosscut Strategy

- left-side sliding carriage becomes the primary large-panel crosscut method
- conventional miter-slot work remains available for narrow stock and jigs
- the carriage is removable or parkable so the bench can still return to flat-top and rip-support modes

### Top Strategy

- full fixed top split into left carriage, center saw, and right service fields
- no front wing in this variant
- left fold-out support table opens only when panel work needs it and folds back inside the parked footprint

### Left Module Strategy

- open mechanism bay for carriage hardware
- under-carriage support drawer
- shallow storage only where it does not compromise the guide package
- vertical storage for carriage fence and stops

## Risks

- carriage precision is now a primary success criterion instead of a nice-to-have
- left-side storage volume is materially reduced
- the assembly-mode story is weaker on day one because the left field is no longer free for permanent tracks
- the carriage hardware choice still needs to be frozen before machining the guide-strip zones

## Exit Criteria

This variant is worth keeping only if it can prove all of the following:

- repeatable squareness on panel crosscuts
- no loss of full right-rip support
- no loss of router serviceability or internal dust packaging
- no increase in parked footprint when the side table is folded
