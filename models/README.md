# Bench Model Contract

This folder documents the generated 3D model used by the instructions site.

## Purpose

The browser atlas is driven by generated geometry instead of hand-authored scene code. That keeps the website aligned with the current layout contract, cut list, and builder packet.

## Rebuild

Run either of these:

- `python3 tools/build_bench_model.py`
- `npm --prefix site run build`

Both paths regenerate:

- `models/generated/bench-model.json`
- `models/generated/bench-model-summary.csv`
- `site/public/generated/bench-model.json`

## Modeling Rules

- Structural parts come from the current fixed-top build package.
- Fit-sensitive saw geometry remains field-fit in the real build even when the viewer shows a concept envelope.
- The miter station uses public `DCS781` envelope values for the automated site model, matching the current contract.
- Mockup-gated and field-fit items are still shown, but they are labeled in the model metadata and selection notes.
