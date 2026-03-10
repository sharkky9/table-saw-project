#!/usr/bin/env node

import { createHash } from "node:crypto";
import process from "node:process";

import { chromium } from "playwright";

const mode = process.argv[2] === "fallback" ? "fallback" : "live";
const rawUrl = process.env.URL || "http://127.0.0.1:4173/?step=step-1&mode=atlas";
const headless = process.env.HEADLESS === "1";

const QA_INVENTORY = {
  claims: [
    "Atlas mode uses live WebGL in headed Chromium on this machine.",
    "Fallback mode appears when Chromium is launched with --disable-gpu --disable-webgl.",
    "Stage navigation remounts the viewer cleanly across all 14 steps.",
    "The active preset label matches the current step lens title.",
    "Viewer controls produce visible scene changes in live mode.",
    "Canvas picking can select a modeled part in live mode.",
    "Narrow viewport atlas and build modes do not overflow horizontally.",
  ],
  controls: [
    "Stage pills",
    "Workspace tabs",
    "Show guides",
    "X-ray",
    "Explode slider",
    "Section axis",
    "Section offset slider",
    "Deploy station",
    "Assembly visibility toggles",
    "Canvas click selection",
  ],
};

function fail(message) {
  throw new Error(message);
}

function hashBuffer(buffer) {
  return createHash("sha256").update(buffer).digest("hex").slice(0, 16);
}

async function waitForViewerSettled(page) {
  await page.waitForFunction(() => {
    return !document.querySelector(".atlas-loading") && !!document.querySelector(".atlas-shell, .atlas-fallback");
  });
}

async function canvasHash(page) {
  const target = page.locator(".atlas-canvas-shell");
  if ((await target.count()) === 0) {
    return null;
  }
  const buffer = await target.screenshot({ animations: "disabled" });
  return hashBuffer(buffer);
}

async function toggleCheckbox(locator) {
  if (await locator.isChecked()) {
    await locator.uncheck();
  } else {
    await locator.check();
  }
}

async function getRendererInfo(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector(".atlas-canvas");
    const gl = canvas && (canvas.getContext("webgl2") || canvas.getContext("webgl"));
    const dbg = gl && gl.getExtension("WEBGL_debug_renderer_info");
    return {
      hasCanvas: !!canvas,
      hasFallback: !!document.querySelector(".atlas-fallback"),
      renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
      contextName: gl?.constructor?.name || null,
      lensTitle: document.querySelector("[data-lens-title]")?.textContent?.trim() || null,
      activePreset: document.querySelector(".atlas-preset.is-active")?.textContent?.trim() || null,
    };
  });
}

function atlasUrl(stepId) {
  const url = new URL(rawUrl);
  url.searchParams.set("step", stepId);
  url.searchParams.set("mode", "atlas");
  return url.toString();
}

function buildUrl(stepId) {
  const url = new URL(rawUrl);
  url.searchParams.set("step", stepId);
  url.searchParams.set("mode", "build");
  return url.toString();
}

async function clickStage(page, stepId) {
  const button = page.locator(`[data-step-id="${stepId}"]`).first();
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await waitForViewerSettled(page);
}

async function clickCanvasUntilSelection(page) {
  const canvas = page.locator(".atlas-canvas");
  await canvas.scrollIntoViewIfNeeded();
  const box = await canvas.boundingBox();
  if (!box) {
    fail("Live mode did not expose an atlas canvas for selection.");
  }

  const targets = [
    [0.72, 0.42],
    [0.58, 0.55],
    [0.42, 0.44],
    [0.78, 0.62],
  ];

  for (const [x, y] of targets) {
    await page.mouse.click(box.x + box.width * x, box.y + box.height * y);
    await page.waitForTimeout(160);
    const selection = await page.locator("[data-selection-kicker]").textContent();
    if (selection && selection.trim() !== "click a part") {
      return selection.trim();
    }
  }

  fail("Canvas click smoke could not select a modeled part.");
}

async function runLiveSmoke(page) {
  await page.goto(atlasUrl("step-1"), { waitUntil: "networkidle" });
  await waitForViewerSettled(page);

  const info = await getRendererInfo(page);
  if (!info.hasCanvas || info.hasFallback) {
    fail(`Expected live WebGL path, got ${JSON.stringify(info)}`);
  }
  if (!info.contextName || !info.contextName.includes("WebGL")) {
    fail(`Expected a live WebGL context, got ${info.contextName}`);
  }
  if (!info.renderer) {
    fail("Expected a renderer string from WEBGL_debug_renderer_info in live mode.");
  }

  const instructions = await page.evaluate(async () => {
    const response = await fetch("/generated/instructions-data.json");
    const data = await response.json();
    return data.steps.map((step) => ({
      id: step.id,
      title: step.title,
      expectedPresetLabel: String(step.viewer.preset).replaceAll("_", " "),
    }));
  });

  const remountChecks = [];
  for (const step of instructions) {
    await clickStage(page, step.id);
    const lensTitle = (await page.locator("[data-lens-title]").textContent())?.trim();
    const activePreset = (await page.locator(".atlas-preset.is-active").textContent())?.trim();
    if (!lensTitle || lensTitle === "3D Atlas") {
      fail(`Step lens title did not update for ${step.id}. Saw "${lensTitle}".`);
    }
    if (lensTitle !== activePreset) {
      fail(`Step lens title and active preset diverged for ${step.id}: "${lensTitle}" vs "${activePreset}".`);
    }
    remountChecks.push({ step: step.id, lensTitle, activePreset });
  }

  async function controlCheck(name, action) {
    await page.goto(atlasUrl("step-9"), { waitUntil: "networkidle" });
    await waitForViewerSettled(page);
    const before = await canvasHash(page);
    await action();
    await page.waitForTimeout(220);
    const after = await canvasHash(page);
    if (!before || !after || before === after) {
      fail(`Viewer control "${name}" did not change the scene hash (${before} -> ${after}).`);
    }
    return { state: name, before, after };
  }

  const hashes = [];
  hashes.push(
    await controlCheck("guides", async () => {
      await toggleCheckbox(page.locator("[data-control='guides']"));
    }),
  );
  hashes.push(
    await controlCheck("xray", async () => {
      await toggleCheckbox(page.locator("[data-control='xray']"));
    }),
  );
  hashes.push(
    await controlCheck("explode", async () => {
      const explode = page.locator("[data-control='explode']");
      await explode.focus();
      for (let index = 0; index < 10; index += 1) {
        await page.keyboard.press("ArrowRight");
      }
    }),
  );
  hashes.push(
    await controlCheck("section", async () => {
      await page.locator("[data-control='section-axis']").selectOption("x");
      const sectionOffset = page.locator("[data-control='section-offset']");
      await sectionOffset.focus();
      for (let index = 0; index < 8; index += 1) {
        await page.keyboard.press("ArrowLeft");
      }
    }),
  );
  hashes.push(
    await controlCheck("deploy", async () => {
      await toggleCheckbox(page.locator("[data-control='deploy']"));
    }),
  );
  hashes.push(
    await controlCheck("assembly-hide", async () => {
      const assemblyToggle = page.locator("[data-assembly='top']");
      await toggleCheckbox(assemblyToggle);
    }),
  );

  await page.goto(atlasUrl("step-9"), { waitUntil: "networkidle" });
  await waitForViewerSettled(page);
  const selectedPart = await clickCanvasUntilSelection(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(atlasUrl("step-9"), { waitUntil: "networkidle" });
  await waitForViewerSettled(page);
  const narrowAtlas = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  if (narrowAtlas.scrollWidth > narrowAtlas.innerWidth) {
    fail(`Narrow atlas mode still overflows: ${JSON.stringify(narrowAtlas)}`);
  }

  await page.goto(buildUrl("step-9"), { waitUntil: "networkidle" });
  const narrowBuild = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  if (narrowBuild.scrollWidth > narrowBuild.innerWidth) {
    fail(`Narrow build mode still overflows: ${JSON.stringify(narrowBuild)}`);
  }

  return {
    mode,
    renderer: info.renderer,
    contextName: info.contextName,
    remountChecks,
    hashes,
    selectedPart,
    narrowAtlas,
    narrowBuild,
  };
}

async function runFallbackSmoke(page) {
  await page.goto(atlasUrl("step-1"), { waitUntil: "networkidle" });
  await waitForViewerSettled(page);
  const info = await getRendererInfo(page);
  if (!info.hasFallback) {
    fail(`Expected fallback mode with --disable-gpu --disable-webgl, got ${JSON.stringify(info)}`);
  }
  return {
    mode,
    hasFallback: info.hasFallback,
    hasCanvas: info.hasCanvas,
    contextName: info.contextName,
    renderer: info.renderer,
  };
}

async function main() {
  console.log(JSON.stringify(QA_INVENTORY, null, 2));
  const browser = await chromium.launch({
    headless,
    args: mode === "fallback" ? ["--disable-gpu", "--disable-webgl"] : [],
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    const summary = mode === "live" ? await runLiveSmoke(page) : await runFallbackSmoke(page);
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
