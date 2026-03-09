# Miter-Saw Public Spec Sheet And Fit Notes

Use this sheet for the owner's `DeWALT DCS781` before finalizing the tray bolt pattern, hard-stop tuning, and deployed flex-hose dock.

## Purpose

The miter-station opening and cover parts no longer depend on a bespoke prebuild survey. Publicly available saw dimensions are now accepted for the bay envelope.

Real-tool fit is still required for:

- final tray bolt transfer
- deployed hard-stop tuning
- stowed latch tuning
- any shim or spacer stack needed under the saw feet
- deployed flex-hose reach to the top-exit dust port

## Hard Stop

Do not drill the final tray bolt pattern or lock the deployed hard stops until the real saw has been test-fit on the tray.

The strict validation commands do not wait for the fit-only rows below. They only require the stripped-saw rows plus the already-loaded public `DCS781` envelope rows.

## Public Rows Already Loaded

These rows in `data/measurements.csv` are now satisfied from public data rather than a bespoke survey:

| ID | Value | Units | Notes |
| --- | --- | --- | --- |
| `miter_saw_model` | `DeWALT DCS781` | text | manual plus DeWalt product page |
| `miter_saw_stowed_width` | `24.02` | in | conservative owner-supplied public listing width |
| `miter_saw_stowed_depth` | `32.36` | in | conservative owner-supplied public listing depth |
| `miter_saw_stowed_height` | `20.93` | in | conservative owner-supplied public listing height |
| `miter_saw_weight` | `50.9` | lb | DeWalt tool-only public product page |

These rows are already loaded with non-provisional source tiers. You do not need to change their source metadata just to open `--require-precision-ready`.

## Fit-Only Rows

These rows no longer block precision-ready validation. Record them only if the real tray fit needs them:

| ID | When It Matters |
| --- | --- |
| `miter_saw_mount_width` | tray bolt transfer or local mount-block sizing |
| `miter_saw_mount_depth` | tray bolt transfer or local mount-block sizing |
| `miter_saw_required_rear_slide_clearance` | only if the real carriage proves deeper than the public envelope |
| `miter_saw_table_height` | deployed hard-stop plus shim tuning |
| `miter_saw_fence_height` | stop-track and support-face tuning |
| `miter_saw_dust_port_center_x` | deployed flex-hose dock tuning |
| `miter_saw_dust_port_center_y` | deployed flex-hose dock tuning |
| `miter_saw_dust_port_od` | hose cuff or adapter choice |

## Fit Procedure

1. Confirm the saw is still the intended `DCS781` family and that the public envelope in `data/measurements.csv` still matches the design intent.
2. Dry-fit the tray, pivot hardware, hard stops, and latch blocks in the real front bay.
3. Set the saw on the tray and tune the deployed height with `FT-03` plus a shim or spacer stack under the saw feet until the saw table is flush with the surrounding bench top.
4. Tune the stowed close with `FT-02` and the latch locations until the cover is flush or slightly low.
5. Only after the real saw height is proven, transfer the actual tray bolt pattern from the saw to `MS-01`.
6. Attach the flex hose in the deployed position and confirm it reaches the top-exit dust port without trapping the service path.

## Done Checklist

- [ ] Public miter-saw rows are accepted in `data/measurements.csv`
- [ ] Strict validation commands pass without editing the fit-only rows
- [ ] Tray dry fit is complete in the real front bay
- [ ] Real saw table lands flush with the surrounding bench top in deployed mode
- [ ] Stowed cover lands flush or slightly low
- [ ] Final tray bolt pattern is transferred from the real saw only after the height is proven
- [ ] Flex hose reaches and releases cleanly at the deployed top-exit dust port
