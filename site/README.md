# Instructions Site QA

## Local development

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4273
```

## Production build

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4179
```

## Headed WebGL smoke

Install Chromium for Playwright once:

```bash
npx playwright install chromium
```

Run the live WebGL path in headed Chromium:

```bash
URL=http://127.0.0.1:4179/?step=step-1&mode=atlas npm run qa:webgl:live
```

That smoke covers:

- stage remounts for steps 1 through 14
- live WebGL renderer detection
- active preset and step-lens title sync
- guide, x-ray, explode, section, deploy, and assembly-toggle scene changes
- canvas click selection
- narrow viewport overflow checks for build and atlas modes

Run the forced fallback path on the same machine:

```bash
URL=http://127.0.0.1:4179/?step=step-1&mode=atlas npm run qa:webgl:fallback
```

That path launches Chromium with `--disable-gpu --disable-webgl` and asserts that the atlas fallback renders instead of the live WebGL canvas.

Set `HEADLESS=1` only when you explicitly want a non-interactive diagnostic run. The supported live-path verification for this project is headed Chromium.
