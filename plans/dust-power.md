# Dust And Power Plan

## Dust Layout

### Branches

- `Saw`
- `Router`
- `Flex hose`

Only one branch is meant to be open at a time.

### Right-Side Packaging

- Front of dust bay: Oneida `Dust Deputy Low-Pro` on a 5 gallon bucket
- Rear of dust bay: Hercules `HE028` on a front pull-out tray
- Front-right service face: Rockler manifold and controls
- Right end panel: router access hatch

### Confidence Boundary

This package now intentionally targets the Hercules `HE028` inside the bench. The key reasons it can work are:

- official minimum height is `27.4 in` with the handle retracted
- the current dust bay is `29.5 in` tall
- the Harbor Freight manual shows the vacuum port on the front body, so the design is limited more by plan-view service access than by a tall top hose stack
- the Oneida Low-Pro keeps the bucket stack much shorter than a taller cyclone lid system

## Hose Rules

- Keep each run as short as possible.
- Use smooth-radius bends, not crushed loops.
- The Hercules tray approach only needs a small rear buffer; service is from the front.
- Keep at least `1 in` between the Low-Pro bucket package and the Hercules tray package.
- The saw branch must be rechecked after the stripped-saw survey because the real dust-port location and hose sweep are still field measurements.

## Separator And Extractor Sequence

Plumb the fixed dust chain in this order:

1. tools into the Rockler manifold
2. manifold outlet into the Low-Pro inlet
3. Low-Pro outlet into the Hercules vacuum port

That keeps the shortest hoses in the highest-suction part of the system and lets the manifold stay accessible from the front-right face.

## Saw Dust Path

- Use a dedicated short hose from the manifold to the saw port.
- Do not trap the hose against fixed stretchers.
- Verify full blade-height travel and full bevel travel with the hose installed.
- Do not drill final saw-branch holes until the real dust-port center and hose sweep are measured.

## Router Dust Path

Split the router branch locally:

- one pickup at the fence
- one pickup in the router cabinet

Use a Y-fitting or local gate only inside the router zone, not back at the main manifold.

## Flex-Hose Path

- Store the mobile-tool hose in the front-right service zone.
- Route it so it can exit the front-right corner without pinching when the bench is parked at the wall.

## Power Strategy

This bench needs two honest power domains.

### Tool Circuit

- Dedicated pigtail or dedicated inlet
- Serves either the saw or the router motor
- Not routed through the aux power strip

### Dust / Aux Circuit

- Side-mounted inlet
- Feeds the internal strip
- Powers:
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

- Tool pigtail dock: front-left underside of the center module
- Aux inlet: right side of the right module, toward the front
- Master aux shutoff: front-right face
- Internal strip: front-right interior wall
- RF remote receiver: in the right service bay, but not buried behind the extractor

## Garage Power Prerequisites

- Verify two real garage circuits if simultaneous saw plus dust use is expected.
- Verify code-compliant garage protection, including GFCI where required.
- Verify the aux circuit can handle the extractor plus accessory loads without pretending everything is “just a power strip problem.”
- Verify the cord paths still work when the bench is parked and when it is rolled out.

## Serviceability Rules

- Extractor must slide out or lift out without unbuilding the bench.
- The front service face must remove cleanly so the Hercules tray can come forward.
- Cyclone bucket lid must be removable without taking out the router fence or top.
- Manifold must be reachable while the bench is parked.
- No permanent wiring may be buried behind the extractor.
