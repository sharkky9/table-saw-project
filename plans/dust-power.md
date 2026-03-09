# Dust And Power Plan

## Dust Layout

### Fixed Internal Branches

- `Saw`
- `Router`
- `Flex hose`

Only one branch is meant to be open at a time.

The miter saw stays on the `Flex hose` path. Do not add a fourth permanent branch unless later real-world use proves the extra complexity is worth it.

## Right-Side Packaging

- Front of dust bay: Oneida `Dust Deputy Low-Pro` on a `5 gallon` bucket
- Rear of dust bay: Hercules `HE028` on a fixed low deck or UHMW skid base
- `RM-06`: plain front dust-service face
- `RM-10`: separate removable control subpanel for the Rockler manifold, aux switch, and flex-hose dock
- Right end panel: router access hatch
- Front-center bench zone: keep clear for the miter-station flip-top and operator stance

## Confidence Boundary

This package intentionally targets the Hercules `HE028` inside the bench, but the package is still mockup-gated. What is currently believed:

- official minimum height is `27.4 in` with the handle retracted
- the current dust bay is `29.5 in` tall
- the Harbor Freight manual shows the vacuum port on the front body, so the design is limited more by plan-view service access than by a tall top hose stack
- the Oneida Low-Pro keeps the bucket stack much shorter than a taller cyclone lid system
- the owner accepts a bucket-first then extractor-second removal sequence

What is not yet considered proven:

- hand access with the real hose cuffs
- front opening comfort
- the real extractor support deck thickness and friction behavior
- the true removal path with the chosen fittings installed
- the exact disconnect sequence for `RM-10`, the flex-hose dock, and the short separator-to-extractor hose

## Right-Bay Service Sequence

The intended service sequence is:

1. remove `RM-10` or disconnect its tethered services
2. remove `RM-06`
3. remove the Low-Pro bucket package
4. disconnect the short separator-to-extractor hose if needed
5. slide or lift the extractor forward from the fixed low deck

This sequence is accepted as normal. The goal is honest serviceability, not theatrical one-motion access.

### `RM-10` Disconnect Rules

- `RM-10` must not hard-trap `RM-06`
- the aux-switch harness must terminate in a plug connector so the control subpanel can unplug cleanly
- the flex-hose dock must use a releasable slack loop and quick union or unclamp sequence
- if the chosen manifold hardware prevents `RM-10` from coming off as a plate, document the exact unclamp sequence on the back of the service face before final assembly

## Hose Rules

- keep each run as short as possible
- use smooth-radius bends and not crushed loops
- keep at least `1 in` between the Low-Pro bucket package and the Hercules package
- the saw branch must respect the recorded stripped-saw dust-port geometry
- current hose sweep is about `8.5 in` behind the cast top; design around `10 in` rearward allowance so future cuffs or hose changes do not instantly consume the margin
- the flex hose must reach the deployed miter saw top-exit dust port and still release cleanly from the front-right service zone

## Fittings Matrix

- manifold starter plus two extensions: Rockler `2-1/2 in`
- separator to extractor short hose: `2-1/2 in`
- saw branch hose: `2-1/2 in`
- router branch hose: `2-1/2 in`
- router local split: `2-1/2 in Y-fitting`
- mobile hose connection: quick-connect cuff set compatible with the user's existing SennTech hose

## Separator And Extractor Sequence

Plumb the fixed dust chain in this order:

1. tools into the Rockler manifold
2. manifold outlet into the Low-Pro inlet
3. Low-Pro outlet into the Hercules vacuum port

That keeps the shortest hoses in the highest-suction part of the system and lets the manifold stay accessible from the front-right face.

## Saw Dust Path

- use a dedicated short hose from the manifold to the saw port
- do not trap the hose against fixed stretchers
- verify full blade-height travel and full bevel travel with the hose installed
- do not drill final saw-branch holes until the real dust-port center and hose sweep are measured

## Router Dust Path

Split the router branch locally:

- one pickup at the fence
- one pickup in the router cabinet

Use a Y-fitting only inside the router zone and not back at the main manifold.

## Flex-Hose Path

- store the mobile-tool hose in the front-right service zone
- route it so it can exit the front-right corner without pinching when the bench is parked at the wall
- keep enough slack that the hose can reach the deployed miter saw without dragging across the saw-rail keep-clear lanes
- do not hard-plumb the miter station; connect the hose only when the saw is flipped up for use

## Power Strategy

This bench needs two honest power domains.

### Tool Circuit

- dedicated pigtail or dedicated inlet
- serves either the saw or the router motor
- not routed through the aux power strip

### Dust / Aux Circuit

- side-mounted inlet
- feeds the internal strip
- powers:
  - Hercules extractor
  - task light
  - chargers
  - low-draw accessories

### Extractor Control

Because the saw/router circuit and the extractor circuit are intentionally separate, current-sensing auto-start is not the right assumption here. Use:

- RF remote switch such as iVac or equivalent
- or a manual switched start station at the front-right face

The package assumes the RF remote path.

## Recommended Physical Locations

- tool pigtail dock: front-left underside of the center module
- aux inlet: right side of the right module toward the front
- master aux shutoff: front-right face
- internal strip: front-right interior wall
- RF remote receiver: in the right service bay but not buried behind the extractor
- `RM-10` control subpanel:
  - size `12 x 18 in`
  - mounted with its lower-left corner `7 in` from the left edge and `6 in` from the bottom of `RM-06`
  - manifold center at `4.5 in` from the left and `14 in` from the bottom of `RM-10`
  - aux switch center at `10 in` from the left and `14 in` from the bottom of `RM-10`
  - flex-hose exit center at `10 in` from the left and `4 in` from the bottom of `RM-10`

## Weight And Mobility

- estimated loaded bench weight: about `1040 lb`
- selected mobility system: `Foot Master GD-60F` leveling casters
- minimum locked system capacity: `2200 lb total`

This is intentionally more industrial than consumer retractable workbench-caster kits.

## Garage Power Prerequisites

- verify two real garage circuits if simultaneous saw plus dust use is expected
- verify code-compliant garage protection including GFCI where required
- verify the aux circuit can handle the extractor plus accessory loads without pretending everything is just a power-strip problem
- verify the cord paths still work when the bench is parked and when it is rolled out

## Serviceability Rules

- extractor must slide or lift out without removing the bench top
- `RM-10` and `RM-06` must remove cleanly in the documented order
- cyclone bucket lid must be removable without taking out the router fence or top
- manifold must be reachable while the bench is parked
- no permanent wiring may be buried behind the extractor
- the right-bay package is not considered proven until the mockup checklist in [right-bay-mockup.md](./right-bay-mockup.md) passes
