# Right-Bay Mockup

## Purpose

This mockup proves the internal `Hercules HE028 + Oneida Low-Pro + Rockler 2-1/2 in manifold` package before the right service bay is treated as build-ready.

The current concept model only leaves `0.35 in` of extractor headroom once the `27.4 in` official body height, `0.75 in` support elevation, and `1.0 in` clearance allowance are all carried honestly. Treat that as a first-class proof item.

If you want to de-risk the right module earlier, run this as a loose scrap or cardboard mockup before finalizing `RM-02`, `RM-03`, `RM-06`, `RM-08`, or `RM-10`.

## Required Parts For The Mockup

- actual Hercules `HE028`
- actual Oneida `Dust Deputy Low-Pro`
- actual `5 gallon` bucket
- actual short hose and cuffs between separator and extractor
- actual manifold or a full-scale stand-in
- scrap plywood that matches:
  - dust-bay floor footprint `20.5 x 40.5 in`
  - front service opening `20 x 28 in`
  - control subpanel `12 x 18 in`
  - bay height `29.5 in`

## Proposed Support Logic

- bucket sits on a fixed front pad
- extractor sits on a fixed low deck or UHMW skid base
- `RM-10` control subpanel removes or disconnects first
- `RM-06` service face removes second
- bucket comes out first
- extractor comes out second
- flex-hose dock stays on `RM-10`, not on the plain `RM-06` service face

## Measurements To Capture

- actual base elevation under the extractor
- actual remaining headroom above the extractor once the real deck or skid is in place
- actual bucket diameter with latch clearance
- actual front-port hose cuff depth on the Hercules
- minimum hand access width to disconnect the short hose
- comfortable front opening width and height
- actual removal path once the bucket is removed
- actual `RM-10` disconnect sequence and slack-loop behavior

## Pass Criteria

- bucket fits without crushing the hose or lid latches
- bucket can be removed cleanly through the service opening
- extractor can be moved out after the bucket is removed
- the modeled `0.35 in` headroom remains real with the chosen support method and does not disappear once pads or friction material are added
- `RM-10` disconnects or unplugs without trapping `RM-06`
- short hose can be disconnected without skinning knuckles on sharp structure
- service face opening is large enough that the mockup does not depend on impossible hand angles

## Fail Conditions

- bucket cannot be removed first
- extractor requires top removal
- hose cuffs require more front depth than the package allows
- actual extractor height or required support deck steals the modeled `0.35 in` headroom
- deck thickness or support method steals too much vertical space

## Output

Record the final proven values back into:

- [data/layout.json](../data/layout.json)
- [dust-power.md](./dust-power.md)
- [assembly.md](./assembly.md)
