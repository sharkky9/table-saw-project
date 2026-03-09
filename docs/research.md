# Research Notes

## Official Sources Used

- [SKIL SPT99-11 product page](https://www.skil.com/products/wormdrive-table-saw-spt99-11)
- [SKIL SPT99-11 / SPT99-12 manual](https://www.skil.com/cdn/shop/files/SPT99-11_SPT99-12_Manual.pdf?v=11484006313901913477)
- [DeWALT DCS781 product page](https://www.dewalt.com/product/dcs781b/60v-max-brushless-cordless-12-sliding-miter-saw-tool-only)
- [DeWALT DCS781 manual](https://www.dewalt.com/GLOBALBOM/QU/DCS781B/1/Instruction_Manual/EN/N582443_DCS781.pdf)
- [Rockler Dust Right 2-1/2 in manifold](https://www.rockler.com/dust-right-2-1-2-dust-collection-manifold)
- [Harbor Freight Hercules 12-gallon dust extractor](https://www.harborfreight.com/12-gallon-osha-compliant-hepa-dust-extractor-58966.html)
- [Oneida Dust Deputy Low-Pro Lid Separator](https://www.oneida-air.com/dust-deputy-low-pro-cyclone-lid-separator)
- [Oneida Dust Deputy Low-Pro manual](https://cdn.oneida-air.com/media/pdf/manuals/DD%20Low-Pro%20Manual%20v2.pdf)
- [JessEm Rout-R-Lift II](https://jessem.com/collections/router-lifts-and-plates/products/rout-r-lift-ii-model)
- [JessEm Rout-R-Lift II manual](https://jessem.com/cdn/shop/files/JessEm_Rout-R-Lift_II_Manual.pdf?v=1737058753)
- [Foot Master GD Series leveling casters](https://www.footmastercasters.com/leveling-casters/gd-series)
- [Foot Master GD-60F current retail spec](https://castercentral.com/products/gd-60f-foot-master)

## Program Reset Inputs

The owner has now selected a `DeWalt 60V 12 in` cordless sliding miter saw and explicitly no longer wants the project to center crosscut capability around a table-saw precision wing or sliding carriage. That changes the active design priorities:

- primary crosscuts move to the miter saw
- the bench should become a fixed `90 x 48` support surface instead of a wing-driven surface
- right-hand table-saw support, outfeed support, router integration, and right-bay dust packaging stay in scope
- the flex hose becomes the natural dust path for the miter saw and other mobile tools

The sliding-carriage and precision-wing lineage is therefore kept only as historical reference.

## Notes That Still Drive The Package

### SKIL SPT99-11

- Official right rip capacity: `30-1/2 in`
- Official left rip capacity: `16-1/2 in`
- Official tool weight: `52.9 lb`
- User-supplied geometry is more useful than the marketing page for table integration, so the structured layout uses the user's measurements as the primary geometry source
- The stripped-saw contract is now intentionally lean: blade datum, rail envelope, dust envelope, and support-pad size matter; exact mount-hole transfer still happens from the real saw on the deck

### DeWALT DCS781

- The attached manual confirms the active saw family is `DCS781`
- The DeWALT public product page lists the bare-tool envelope at `30.51 in` length, `19.49 in` width, `17.72 in` height, and `50.9 lb`
- The owner-supplied retail listing is larger at `32.36 in` depth, `24.02 in` width, and `20.93 in` height, so the package now uses that larger public envelope as a conservative planning bound
- Because the miter saw dust port exits at the top and the owner plans to connect it only with a deployed flex hose, exact dust-port coordinates no longer block the builder package
- Because the flip-top now separates tray-height adjustment from saw-to-tray shimming, exact table height, fence height, and mount-foot geometry become fit-only notes instead of a prebuild survey gate

### Rockler 2-1/2 in Manifold

- Official starter-kit envelope: `6.5 in W x 4.8 in H x 4.23 in projection`
- One-tool-at-a-time approach fits a shop-vac / dust-extractor system better than a pretend `4 in` branch network
- The manifold is compact enough to mount in the right-side service bay without consuming the whole cabinet
- Keeping the third branch as a flex hose is more useful than dedicating it permanently to the miter saw

### Hercules Dust Extractor

- Official envelope: `23.5 in L x 18.25 in W x 27.4-37.5 in H`
- Official amperage: `11.5A motor, 15A max with tool`
- The Harbor Freight manual shows the vacuum port on the front body, which means the package is limited more by plan-view depth and service access than by a tall top hose stack
- The current package commits to Hercules as the internal extractor target, but the right-bay service geometry is still mockup-gated
- Sequential bucket-first, extractor-second removal is accepted by the owner and does not need to be treated as a design failure

### Oneida Dust Deputy Low-Pro

- Official bucket-system overall height: about `18.5 in`
- Official bucket-system diameter: about `12-3/8 in`
- Official separator height above the bucket lid: about `3-13/16 in`
- Official ports are nominal `2.5 in`
- This is materially easier to package under the router zone than a taller cyclone lid and works well with the Rockler `2.5 in` manifold concept

### JessEm Router Lift

- Official plate size: `9-1/4 in x 11-3/4 in x 3/8 in`
- Official compatibility includes Bosch `1617/1618`, DeWalt `610/616/618`, and Porter Cable `690/890` class motors for the `02310` model
- The package stays locked to `JessEm Rout-R-Lift II 02310` plus `Bosch 1617EVS`
- The JessEm manual still drives the need for real plate-support ledgers, leveling hardware, and service access instead of only encoding the plate opening

## Material Strategy

### Use Better Materials Where Flatness Matters

- main top: better plywood plus a prefinished plywood wear skin, not construction sheathing
- router module: flat cabinet plywood or birch
- drawer-slide faces and precision partitions: cabinet plywood
- flip-top and miter-station support surfaces: durable plywood-based construction with replaceable sacrificial faces where appropriate

### Use Cheaper Materials Where Mass And Stiffness Matter More Than Cosmetics

- plinth and caster hardpoints: `2x4` and `2x6`
- hidden structural blocking: construction lumber or offcuts from better plywood

### Use Prefinished Material Where It Saves Time

- main top wear skin if a good prefinished panel is locally available
- drawer interiors
- utility compartments
- light-duty internal storage zones

## Mobility Recommendation

- The package stays locked to `Foot Master GD-60F` plate-mount leveling casters
- Current market listings put the product class at roughly `550 lb` each which gives healthy margin for a bench in the `~980 lb` loaded range
- This is intentionally more industrial than light-duty retractable workbench-caster kits

## Assembly-Mode Recommendation

Permanent stage-1 T-track is still not worth the conflict risk in the main top. The current recommendation is:

- no fixed T-track in the permanent top on day one
- one removable overlay for clamping, sacrificial track-saw work, and later `20 mm` hole experiments

That keeps the permanent top cleaner and avoids baking clamping compromises into the surface that now also has to coexist with a stowed miter station.

## Confidence Boundaries

The package is explicit about which values are concept geometry and which are procurement- or machining-grade measurements:

- `official`: manufacturer-published facts, useful for envelopes and electrical planning
- `user_measured`: user-supplied geometry that can drive the concept layout
- `derived`: dimensions created from the accepted bench concept
- `provisional_field_fit`: values that must not green-light top machining or saw-cradle drilling until the relevant real-tool survey is complete

Concept validation today means internal consistency, not shop readiness.

## Dust-System Decision

The current package intentionally commits to:

- `Hercules HE028` inside the right bay on a fixed low deck or UHMW skid base
- `Oneida Dust Deputy Low-Pro` on a `5 gallon` bucket at the front of the same bay
- `Rockler Dust Right 2-1/2 in` manifold on the front-right service face

That combination is credible enough to keep designing around, but it is still not considered proven until the actual machine, bucket, fittings, and service opening are checked as a mockup.

## Explicit Non-Blockers

These concerns are intentionally not being allowed to balloon the scope:

- generalized “garage humidity means the whole top must be re-architected” arguments
- objections to sequential bucket-first, extractor-second service order when the sequence itself is still straightforward
- arguments for reviving the sliding-carriage or precision-wing work after the owner has reset the program around the miter saw
