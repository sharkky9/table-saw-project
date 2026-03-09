# Research Notes

## Official Sources Used

- [SKIL SPT99-11 product page](https://www.skil.com/products/wormdrive-table-saw-spt99-11)
- [SKIL SPT99-11 / SPT99-12 manual](https://www.skil.com/cdn/shop/files/SPT99-11_SPT99-12_Manual.pdf?v=11484006313901913477)
- [Rockler Dust Right 2-1/2 in manifold](https://www.rockler.com/dust-right-2-1-2-dust-collection-manifold)
- [Harbor Freight Hercules 12-gallon dust extractor](https://www.harborfreight.com/12-gallon-osha-compliant-hepa-dust-extractor-58966.html)
- [Oneida Dust Deputy Low-Pro Lid Separator](https://www.oneida-air.com/dust-deputy-low-pro-cyclone-lid-separator)
- [Oneida Dust Deputy Low-Pro manual](https://cdn.oneida-air.com/media/pdf/manuals/DD%20Low-Pro%20Manual%20v2.pdf)
- [JessEm Rout-R-Lift II](https://jessem.com/collections/router-lifts-and-plates/products/rout-r-lift-ii-model)
- [JessEm Rout-R-Lift II manual](https://jessem.com/cdn/shop/files/JessEm_Rout-R-Lift_II_Manual.pdf?v=1737058753)

## Notes That Drove The Layout

### SKIL SPT99-11

- Official right rip capacity: `30-1/2 in`
- Official left rip capacity: `16-1/2 in`
- Official tool weight: `52.9 lb`
- User-supplied geometry is more useful than the marketing page for table integration, so the structured layout uses the user's measurements as the primary geometry source
- The manual and product materials are still not enough to freeze the stripped-saw mount or the true front-to-back blade datum, so the package now treats those as hard survey gates instead of pretending they are settled

### Rockler 2-1/2 in Manifold

- Official starter-kit envelope: `6.5 in W x 4.8 in H x 4.23 in projection`
- One-tool-at-a-time approach fits a shop-vac / dust-extractor system better than a pretend `4 in` branch network
- The manifold is compact enough to mount in the right-side service bay without consuming the whole cabinet

### Hercules Dust Extractor

- Official envelope: `23.5 in L x 18.25 in W x 27.4-37.5 in H`
- Official amperage: `11.5A motor, 15A max with tool`
- The Harbor Freight manual shows the vacuum port on the front body, which means the package is limited more by plan-view depth and service access than by a tall top hose stack
- With the handle collapsed and the machine mounted on a front pull-out tray, the Hercules is now the selected internal extractor for this package

### Oneida Dust Deputy Low-Pro

- Official bucket-system overall height: about `18.5 in`
- Official bucket-system diameter: about `12-3/8 in`
- Official separator height above the bucket lid: about `3-13/16 in`
- Official ports are nominal `2.5 in`
- This is materially easier to package under the router zone than a taller cyclone lid and works well with the Rockler `2.5 in` manifold concept

### JessEm Router Lift

- Official plate size: `9-1/4 in x 11-3/4 in x 3/8 in`
- Official compatibility includes Bosch `1617/1618`, DeWalt `610/616/618`, and Porter Cable `690/890` class motors for the `02310` model
- The package now locks the stage-1 router stack to `JessEm Rout-R-Lift II 02310` plus `Bosch 1617EVS`
- The JessEm manual also drives the need for real plate-support ledgers, leveling hardware, and service access instead of only encoding the plate opening

## Material Strategy

### Use Better Materials Where Flatness Matters

- Fixed top: better plywood plus MDF, not construction sheathing
- Router module: flat cabinet plywood or birch
- Drawer-slide faces and precision partitions: cabinet plywood
- Front wing: plywood plus plywood, not MDF, because the wing edges will be bumped and handled more often

### Use Cheaper Materials Where Mass And Stiffness Matter More Than Cosmetics

- Plinth and caster hardpoints: `2x4` and `2x6`
- Hidden structural blocking: construction lumber or offcuts from better plywood

### Use Prefinished Material Where It Saves Time

- Drawer interiors
- utility compartments
- light-duty internal storage zones

## Assembly-Mode Recommendation

Permanent T-track is useful only when it stays out of the main stock-travel zones. The recommended compromise is:

- two fixed tracks in the far-left top field
- one removable assembly overlay for more elaborate clamping and later `20 mm` hole experiments

This gives real clamping capability without filling the outfeed surface with dust-catching grooves.

## Confidence Boundaries

The package is now explicit about which values are concept geometry and which are procurement- or machining-grade measurements:

- `official`: manufacturer-published facts, useful for envelopes and electrical planning
- `user_measured`: user-supplied geometry that can drive the concept layout
- `derived`: dimensions created from the accepted bench concept
- `provisional_field_fit`: values that must not green-light top machining or saw-cradle drilling until the stripped-saw survey is complete

## Dust-System Decision

The current package now intentionally commits to:

- `Hercules HE028` inside the right bay on a front pull-out tray
- `Oneida Dust Deputy Low-Pro` on a 5 gallon bucket at the front of the same bay
- `Rockler Dust Right 2-1/2 in` manifold on the front-right service face

That combination is more credible than the earlier “generic compact extractor class” because the Hercules front vacuum port and the Low-Pro separator both fit the current bay logic without pretending there is a large rear service void.
