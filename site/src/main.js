import "./style.css";

import { marked } from "marked";
import { createModelViewer } from "./model-viewer.js";

const app = document.querySelector("#app");
const STORAGE_KEY = "fixed-top-bench-atlas-progress-v1";
const VIEW_MODES = new Set(["atlas", "shop"]);

const state = {
  data: null,
  model: null,
  currentStepId: null,
  currentMediaId: null,
  currentResourceId: null,
  resourceQuery: "",
  resourceCategory: "all",
  viewer: null,
  progress: null,
  viewMode: "atlas",
  shareStatus: "",
  shareStatusTimer: null,
};

function categoryLabel(category) {
  const labels = {
    docs: "Docs",
    models: "Model",
    plans: "Plans",
    drawings: "Drawings",
    renders: "Renders",
    data: "Data",
  };
  return labels[category] || category;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function currentStep() {
  return state.data.steps.find((step) => step.id === state.currentStepId) || state.data.steps[0];
}

function currentResource() {
  return state.data.resources.find((resource) => resource.id === state.currentResourceId) || state.data.resources[0];
}

function currentMediaIdForStep(step = currentStep()) {
  return step.media.find((mediaId) => mediaId === state.currentMediaId) || step.media[0] || null;
}

function currentMedia(step = currentStep()) {
  const mediaId = currentMediaIdForStep(step);
  return mediaId ? mediaById(mediaId) : null;
}

function stepIndexById(stepId) {
  return state.data.steps.findIndex((step) => step.id === stepId);
}

function previousStepId() {
  const index = stepIndexById(state.currentStepId);
  return index > 0 ? state.data.steps[index - 1].id : null;
}

function nextStepId() {
  const index = stepIndexById(state.currentStepId);
  return index >= 0 && index < state.data.steps.length - 1 ? state.data.steps[index + 1].id : null;
}

function createEmptyProgress() {
  return {
    completedSteps: {},
    actions: {},
    holdPoints: {},
    notes: {},
  };
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyProgress();
    }
    return { ...createEmptyProgress(), ...JSON.parse(raw) };
  } catch {
    return createEmptyProgress();
  }
}

function saveProgress() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function actionKey(stepId, index) {
  return `${stepId}:action:${index}`;
}

function holdKey(stepId, index) {
  return `${stepId}:hold:${index}`;
}

function actionChecked(stepId, index) {
  return Boolean(state.progress.actions[actionKey(stepId, index)]);
}

function holdChecked(stepId, index) {
  return Boolean(state.progress.holdPoints[holdKey(stepId, index)]);
}

function checkedActionsCount(step) {
  return step.actions.filter((_, index) => actionChecked(step.id, index)).length;
}

function checkedHoldCount(step) {
  return step.hold_points.filter((_, index) => holdChecked(step.id, index)).length;
}

function stepDone(stepId) {
  return Boolean(state.progress.completedSteps[stepId]);
}

function resourceById(id) {
  return state.data.resources.find((resource) => resource.id === id);
}

function gateById(id) {
  return state.data.gates.find((gate) => gate.id === id);
}

function mediaById(id) {
  return state.data.media.find((media) => media.id === id);
}

function filteredResources() {
  const query = state.resourceQuery.trim().toLowerCase();
  return state.data.resources.filter((resource) => {
    if (state.resourceCategory !== "all" && resource.category !== state.resourceCategory) {
      return false;
    }
    if (!query) {
      return true;
    }
    const haystack = [resource.title, resource.path, resource.summary || "", resource.category]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

function renderMarkdown(text) {
  return marked.parse(text, {
    mangle: false,
    headerIds: false,
  });
}

function renderInlineMarkdown(text) {
  return marked.parseInline(text, {
    mangle: false,
    headerIds: false,
  });
}

function renderCsv(resource) {
  const columns = resource.columns || [];
  const rows = resource.preview_rows || [];
  return `
    <div class="resource-table-shell">
      <div class="resource-table-head">${resource.summary}</div>
      <div class="resource-table-scroll">
        <table class="resource-table">
          <thead>
            <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>${columns.map((column) => `<td>${escapeHtml(String(row[column] ?? ""))}</td>`).join("")}</tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="resource-table-note">Previewing the first ${rows.length} rows from the source CSV.</p>
    </div>
  `;
}

function renderJson(resource) {
  return `<pre class="code-block">${escapeHtml(resource.body || "")}</pre>`;
}

function renderImage(resource) {
  return `
    <figure class="image-viewer">
      <img src="${resource.media_path}" alt="${resource.title}" />
      <figcaption>${resource.title}</figcaption>
    </figure>
  `;
}

function renderResourceBody(resource) {
  if (!resource) {
    return `<div class="empty-state">Pick a file to inspect the underlying source.</div>`;
  }
  if (resource.type === "markdown") {
    return `<div class="markdown-body">${renderMarkdown(resource.body)}</div>`;
  }
  if (resource.type === "csv") {
    return renderCsv(resource);
  }
  if (resource.type === "json") {
    return renderJson(resource);
  }
  if (resource.type === "image") {
    return renderImage(resource);
  }
  return `<div class="empty-state">No renderer for this resource type.</div>`;
}

function stepResources(step) {
  return step.resources.map(resourceById).filter(Boolean);
}

function stepGates(step) {
  return step.gate_ids.map(gateById).filter(Boolean);
}

function sanitizeViewMode(mode) {
  return VIEW_MODES.has(mode) ? mode : "atlas";
}

function applyLocationState() {
  const params = new URLSearchParams(window.location.search);
  const stepId = params.get("step");
  const mediaId = params.get("media");
  const resourceId = params.get("resource");
  const viewMode = params.get("mode");

  if (stepId && state.data.steps.some((step) => step.id === stepId)) {
    state.currentStepId = stepId;
  }
  if (mediaId) {
    state.currentMediaId = mediaId;
  }
  if (resourceId && state.data.resources.some((resource) => resource.id === resourceId)) {
    state.currentResourceId = resourceId;
  }
  if (viewMode) {
    state.viewMode = sanitizeViewMode(viewMode);
  }
}

function syncLocationState() {
  const url = new URL(window.location.href);
  url.searchParams.set("step", state.currentStepId);
  url.searchParams.set("mode", state.viewMode);
  if (state.currentMediaId) {
    url.searchParams.set("media", state.currentMediaId);
  } else {
    url.searchParams.delete("media");
  }
  if (state.currentResourceId) {
    url.searchParams.set("resource", state.currentResourceId);
  } else {
    url.searchParams.delete("resource");
  }
  const next = `${url.pathname}?${url.searchParams.toString()}`;
  window.history.replaceState({}, "", next);
}

function ensureSelections() {
  if (!state.progress) {
    state.progress = loadProgress();
  }
  if (!state.currentStepId || !state.data.steps.some((step) => step.id === state.currentStepId)) {
    state.currentStepId = state.data.landing_step;
  }
  state.viewMode = sanitizeViewMode(state.viewMode);

  const step = currentStep();
  if (!state.currentMediaId || !step.media.includes(state.currentMediaId)) {
    state.currentMediaId = step.media[0] || null;
  }
  if (!state.currentResourceId || !state.data.resources.some((resource) => resource.id === state.currentResourceId)) {
    state.currentResourceId = step.resources[0] || state.data.landing_resource;
  }
}

function setShareStatus(message) {
  state.shareStatus = message;
  if (state.shareStatusTimer) {
    window.clearTimeout(state.shareStatusTimer);
  }
  state.shareStatusTimer = window.setTimeout(() => {
    state.shareStatus = "";
    renderApp();
  }, 2200);
}

function setCurrentStep(stepId) {
  if (!stepId || !state.data.steps.some((step) => step.id === stepId)) {
    return;
  }
  state.currentStepId = stepId;
  const step = currentStep();
  state.currentMediaId = step.media[0] || null;
  state.currentResourceId = step.resources[0] || state.currentResourceId;
  renderApp();
}

function setViewMode(viewMode) {
  state.viewMode = sanitizeViewMode(viewMode);
  renderApp();
}

async function copyCurrentLink() {
  const href = window.location.href;
  try {
    await navigator.clipboard.writeText(href);
    setShareStatus("Link copied");
    renderApp();
  } catch {
    window.prompt("Copy this link", href);
  }
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch {
    setShareStatus("Fullscreen unavailable");
  }
}

function printCurrentPacket() {
  const runPrint = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => window.print());
    });
  };

  if (state.viewMode !== "shop") {
    state.viewMode = "shop";
    renderApp();
    runPrint();
    return;
  }
  runPrint();
}

function renderModeControls(step, previousId, nextId, completedSteps) {
  const fullscreenLabel = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
  return `
    <div class="workflow-actions">
      <div class="builder-console__nav">
        <button class="nav-chip" data-jump-step="${previousId || ""}" ${previousId ? "" : "disabled"}>Previous</button>
        <button class="nav-chip" data-jump-step="${nextId || ""}" ${nextId ? "" : "disabled"}>Next</button>
        <button class="nav-chip ${stepDone(step.id) ? "is-active" : ""}" data-toggle-step-done="${step.id}">
          ${stepDone(step.id) ? "Marked done" : "Mark step done"}
        </button>
      </div>
      <div class="workflow-actions__mode">
        <button class="nav-chip ${state.viewMode === "atlas" ? "is-active" : ""}" data-set-mode="atlas">Atlas view</button>
        <button class="nav-chip ${state.viewMode === "shop" ? "is-active" : ""}" data-set-mode="shop">Shop floor</button>
        <button class="nav-chip" data-print-packet>Print packet</button>
        <button class="nav-chip" data-copy-link>${state.shareStatus || "Copy link"}</button>
        <button class="nav-chip" data-toggle-fullscreen>${fullscreenLabel}</button>
      </div>
      <div class="workflow-actions__stats">
        <span class="chip">${completedSteps}/${state.data.steps.length} steps complete</span>
        <span class="chip">${checkedActionsCount(step)}/${step.actions.length} actions checked</span>
        <span class="chip">${checkedHoldCount(step)}/${step.hold_points.length} hold points checked</span>
        <span class="chip">${step.part_cards.length} parts in play</span>
      </div>
    </div>
  `;
}

function renderTaskRows(step, type) {
  const entries = type === "hold" ? step.hold_points : step.actions;
  const checked = type === "hold" ? holdChecked : actionChecked;
  const attribute = type === "hold" ? "data-hold-check" : "data-action-check";
  const title = type === "hold" ? "No hold points captured for this step." : "No action checklist items were parsed for this step.";
  if (!entries.length) {
    return `<div class="empty-state empty-state--compact">${title}</div>`;
  }
  return `
    <div class="task-list">
      ${entries
        .map(
          (entry, index) => `
            <label class="task-row ${checked(step.id, index) ? "is-checked" : ""}">
              <input type="checkbox" ${attribute}="${index}" ${checked(step.id, index) ? "checked" : ""} />
              <span>${type === "hold" ? escapeHtml(entry) : renderInlineMarkdown(entry)}</span>
            </label>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPartCards(step, extraClass = "") {
  if (!step.part_cards.length) {
    return `<div class="empty-state empty-state--compact">No cut-list parts were linked to this step.</div>`;
  }
  return `
    <div class="part-card-grid ${extraClass}">
      ${step.part_cards
        .map(
          (card) => `
            <article class="part-card">
              <div class="part-card__head">
                <strong>${card.part_id}</strong>
                <span class="chip ${card.gate === "cut_now" ? "" : "chip--warn"}">${card.gate_label}</span>
              </div>
              <p>${card.material} · qty ${card.qty}</p>
              <p>${card.final_l} × ${card.final_w} × ${card.thickness}</p>
              <small>${escapeHtml(card.notes || "No extra notes attached to this part.")}</small>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderReferenceBoard(step, media, compact = false) {
  return `
    <aside class="reference-board ${compact ? "reference-board--compact" : ""}">
      <div class="reference-board__header">
        <p class="eyebrow">Reference Plates</p>
        <h3>${media ? media.title : "No reference image linked"}</h3>
        <p class="reference-board__summary">
          ${
            media
              ? "Keep a 2D drawing or render visible while orbiting the live 3D atlas."
              : "This step currently relies on the live model and linked source files more than on a dedicated drawing."
          }
        </p>
      </div>
      <div class="reference-board__frame">
        ${
          media
            ? `<img class="reference-board__image" src="${media.path}" alt="${media.title}" />`
            : `<div class="empty-stage">No media plate linked to this stage.</div>`
        }
      </div>
      <div class="media-strip" data-print-hide="true">
        ${step.media
          .map((stepMediaId) => {
            const asset = mediaById(stepMediaId);
            if (!asset) {
              return "";
            }
            return `
              <button class="media-chip ${stepMediaId === currentMediaIdForStep(step) ? "is-active" : ""}" data-media-id="${stepMediaId}">
                ${asset.title}
              </button>
            `;
          })
          .join("")}
      </div>
    </aside>
  `;
}

function renderGateCards(stepGateCards) {
  if (!stepGateCards.length) {
    return `<div class="empty-state">This stage has no additional gate board linked beyond the general packet.</div>`;
  }
  return stepGateCards
    .map(
      (gate) => `
        <div class="gate-card">
          <strong>${gate.title}</strong>
          <p>${gate.body}</p>
          <div class="chip-row">
            ${gate.parts.map((part) => `<span class="chip chip--warn">${part}</span>`).join("")}
          </div>
        </div>
      `,
    )
    .join("");
}

function renderResourceStack(stepResourceCards) {
  if (!stepResourceCards.length) {
    return `<div class="empty-state empty-state--compact">No step-specific references linked here yet.</div>`;
  }
  return `
    <div class="packet-resource-list">
      ${stepResourceCards
        .map(
          (linked) => `
            <button class="resource-card resource-card--packet" data-open-resource-atlas="${linked.id}">
              <span class="resource-meta">${categoryLabel(linked.category)} · ${linked.extension}</span>
              <strong>${linked.title}</strong>
              <small>${linked.summary || linked.path}</small>
              <span class="resource-card__hint">Open in atlas drawer</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderStepStrip(step) {
  return `
    <div class="shop-floor-step-strip" data-print-hide="true">
      ${state.data.steps
        .map(
          (entry) => `
            <button class="step-pill ${entry.id === step.id ? "is-active" : ""} ${stepDone(entry.id) ? "is-complete" : ""}" data-step-id="${entry.id}">
              <span>${String(entry.number).padStart(2, "0")}</span>
              <strong>${entry.title}</strong>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderAtlasLayout({ step, previousId, nextId, resource, media, stepResourceCards, stepGateCards, completedSteps }) {
  const filtered = filteredResources();
  return `
    <div class="shell shell--atlas">
      <aside class="rail">
        <div class="brand-card panel">
          <p class="eyebrow">Digital Build Manual</p>
          <h1>Fixed-Top Bench Atlas</h1>
          <p class="summary">
            ${state.data.dashboard.subheadline}
          </p>
          <div class="stat-grid">
            ${state.data.dashboard.stats
              .map(
                (stat) => `
                  <article class="stat-card">
                    <strong>${stat.value}</strong>
                    <span>${stat.label}</span>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title-row">
            <h2>Build Stages</h2>
            <span class="panel-kicker">${state.data.steps.length} stages</span>
          </div>
          <div class="step-list">
            ${state.data.steps
              .map(
                (entry) => `
                  <button class="step-card ${entry.id === step.id ? "is-active" : ""} ${stepDone(entry.id) ? "is-complete" : ""}" data-step-id="${entry.id}">
                    <span class="step-index">${String(entry.number).padStart(2, "0")}</span>
                    <span class="step-copy">
                      <strong>${entry.title}</strong>
                      <small>${entry.summary}</small>
                    </span>
                    <span class="step-status">${stepDone(entry.id) ? "Done" : "Open"}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title-row">
            <h2>Project Snapshot</h2>
            <span class="panel-kicker">live contract</span>
          </div>
          <ul class="snapshot-list">
            ${state.data.dashboard.project_snapshot.map((line) => `<li>${line}</li>`).join("")}
          </ul>
          <div class="data-card-grid">
            ${state.data.dashboard.data_cards
              .map(
                (card) => `
                  <article class="mini-stat">
                    <span>${card.label}</span>
                    <strong>${card.value}</strong>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </aside>

      <main class="main">
        <section class="workflow-toolbar panel">
          <div>
            <p class="eyebrow">Live Workflow</p>
            <h2>${step.number}. ${step.title}</h2>
            <p class="workflow-toolbar__summary">
              Switch between the full atlas and the simplified shop-floor packet without losing the current step, notes, or checklist state.
            </p>
          </div>
          ${renderModeControls(step, previousId, nextId, completedSteps)}
        </section>

        <section class="hero panel">
          <div class="hero-copy">
            <p class="eyebrow">Current Stage</p>
            <h2>${step.number}. ${step.title}</h2>
            <p class="hero-summary">${step.summary}</p>
            <p class="hero-focus">${step.focus}</p>
            <div class="chip-row">
              ${step.gate_summary
                .map(
                  (gate) => `<span class="chip ${gate.gate === "cut_now" ? "" : "chip--warn"}">${gate.count} ${gate.gate_label}</span>`,
                )
                .join("")}
            </div>
          </div>
          <div class="hero-notes">
            <p class="eyebrow">Warnings</p>
            <ul>
              ${step.warnings.map((warning) => `<li>${warning}</li>`).join("")}
            </ul>
          </div>
        </section>

        <section class="builder-console panel">
          <div class="builder-console__header">
            <div>
              <p class="eyebrow">Story Mode</p>
              <h2>Builder Console</h2>
              <p class="builder-console__summary">
                Track actions, hold points, and step notes locally in this browser while you work through the packet.
              </p>
            </div>
          </div>
          <div class="builder-console__grid">
            <article class="console-card">
              <div class="panel-title-row">
                <h3>Action Checklist</h3>
                <span class="panel-kicker">${step.actions.length} actions</span>
              </div>
              ${renderTaskRows(step, "action")}
            </article>

            <article class="console-card">
              <div class="panel-title-row">
                <h3>Hold Points</h3>
                <span class="panel-kicker">verify before moving on</span>
              </div>
              ${renderTaskRows(step, "hold")}
            </article>

            <article class="console-card console-card--parts">
              <div class="panel-title-row">
                <h3>Parts In Play</h3>
                <span class="panel-kicker">${step.part_cards.length} tracked parts</span>
              </div>
              ${renderPartCards(step)}
            </article>

            <article class="console-card">
              <div class="panel-title-row">
                <h3>Shop Notes</h3>
                <span class="panel-kicker">saved locally</span>
              </div>
              <label class="notes-field">
                <span>Record fit-up notes, material substitutions, or reminders for this step.</span>
                <textarea data-step-notes rows="8" placeholder="Example: dry-fit RM-10 with mockup before drilling any panel hardware...">${escapeHtml(
                  state.progress.notes[step.id] || "",
                )}</textarea>
              </label>
            </article>
          </div>
        </section>

        <section class="media-stage panel">
          <div class="panel-title-row">
            <h2>Atlas Stage</h2>
            <span class="panel-kicker">${step.viewer.preset.replaceAll("_", " ")}</span>
          </div>
          <div class="media-stage__layout">
            <div class="media-stage__atlas" id="modelViewerMount"></div>
            ${renderReferenceBoard(step, media)}
          </div>
          <div class="notes-row">
            ${state.data.notes.map((note) => `<p>${note}</p>`).join("")}
          </div>
        </section>

        <section class="support-grid">
          <article class="panel">
            <div class="panel-title-row">
              <h2>Linked Resources</h2>
              <span class="panel-kicker">${stepResourceCards.length} files</span>
            </div>
            <div class="resource-card-grid">
              ${stepResourceCards
                .map(
                  (linked) => `
                    <button class="resource-card ${linked.id === resource.id ? "is-active" : ""}" data-resource-id="${linked.id}">
                      <span class="resource-meta">${categoryLabel(linked.category)} · ${linked.extension}</span>
                      <strong>${linked.title}</strong>
                      <small>${linked.summary || linked.path}</small>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </article>

          <article class="panel">
            <div class="panel-title-row">
              <h2>Gate Board</h2>
              <span class="panel-kicker">${stepGateCards.length || 0} relevant gates</span>
            </div>
            ${renderGateCards(stepGateCards)}
          </article>
        </section>
      </main>

      <aside class="inspector">
        <div class="panel inspector-search">
          <div class="panel-title-row">
            <h2>Resource Drawer</h2>
            <span class="panel-kicker">${filtered.length} shown</span>
          </div>
          <label class="search-field">
            <span>Search files</span>
            <input type="search" value="${escapeHtml(state.resourceQuery)}" placeholder="assembly, dust, drawing..." />
          </label>
          <div class="filter-row">
            ${["all", "plans", "drawings", "renders", "docs", "models", "data"]
              .map(
                (category) => `
                  <button class="filter-chip ${state.resourceCategory === category ? "is-active" : ""}" data-filter="${category}">
                    ${category === "all" ? "All" : categoryLabel(category)}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>

        <div class="panel resource-list-panel">
          <div class="resource-list">
            ${filtered
              .map(
                (item) => `
                  <button class="resource-list-item ${item.id === resource.id ? "is-active" : ""}" data-resource-id="${item.id}">
                    <span class="resource-meta">${categoryLabel(item.category)} · ${item.extension}</span>
                    <strong>${item.title}</strong>
                    <small>${item.summary || item.path}</small>
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>

        <div class="panel resource-viewer">
          <div class="panel-title-row">
            <h2>${resource.title}</h2>
            <span class="panel-kicker">${resource.path}</span>
          </div>
          ${renderResourceBody(resource)}
        </div>
      </aside>
    </div>
  `;
}

function renderShopFloorLayout({ step, previousId, nextId, media, stepResourceCards, stepGateCards, completedSteps }) {
  return `
    <div class="shop-floor-shell">
      <header class="shop-floor-bar panel">
        <div class="shop-floor-bar__top">
          <div class="shop-floor-bar__copy">
            <p class="eyebrow">Shop Floor Packet</p>
            <h1>${step.number}. ${step.title}</h1>
            <p class="shop-floor-bar__summary">${step.summary}</p>
            <p class="shop-floor-bar__focus">${step.focus}</p>
          </div>
          ${renderModeControls(step, previousId, nextId, completedSteps)}
        </div>
        <div class="chip-row">
          ${step.gate_summary
            .map(
              (gate) => `<span class="chip ${gate.gate === "cut_now" ? "" : "chip--warn"}">${gate.count} ${gate.gate_label}</span>`,
            )
            .join("")}
        </div>
        ${renderStepStrip(step)}
      </header>

      <main class="shop-floor-main">
        <section class="shop-floor-stage panel">
          <div class="shop-floor-stage__copy">
            <div class="panel-title-row">
              <h2>Step Brief</h2>
              <span class="panel-kicker">print-safe packet</span>
            </div>
            <div class="shop-floor-brief">
              <article class="shop-floor-callout">
                <p class="eyebrow">Warnings</p>
                <ul class="checkpoint-list">
                  ${step.warnings.map((warning) => `<li>${warning}</li>`).join("")}
                </ul>
              </article>
              <article class="shop-floor-callout">
                <p class="eyebrow">What to prove</p>
                <ul class="checkpoint-list">
                  ${step.viewer.callouts.map((callout) => `<li>${callout}</li>`).join("")}
                </ul>
              </article>
            </div>
            <div class="shop-floor-gates">
              <div class="panel-title-row">
                <h3>Gate Board</h3>
                <span class="panel-kicker">${stepGateCards.length || 0} active gates</span>
              </div>
              ${renderGateCards(stepGateCards)}
            </div>
          </div>

          <div class="shop-floor-stage__viewer">
            <div class="shop-floor-stage__atlas" id="modelViewerMount"></div>
            ${renderReferenceBoard(step, media, true)}
          </div>
        </section>

        <section class="shop-floor-grid">
          <article class="console-card console-card--shop">
            <div class="panel-title-row">
              <h3>Action Checklist</h3>
              <span class="panel-kicker">${step.actions.length} actions</span>
            </div>
            ${renderTaskRows(step, "action")}
          </article>

          <article class="console-card console-card--shop">
            <div class="panel-title-row">
              <h3>Hold Points</h3>
              <span class="panel-kicker">verify before moving on</span>
            </div>
            ${renderTaskRows(step, "hold")}
          </article>

          <article class="console-card console-card--shop console-card--shop-wide">
            <div class="panel-title-row">
              <h3>Parts In Play</h3>
              <span class="panel-kicker">${step.part_cards.length} tracked parts</span>
            </div>
            ${renderPartCards(step, "part-card-grid--dense")}
          </article>

          <article class="console-card console-card--shop">
            <div class="panel-title-row">
              <h3>Reference Stack</h3>
              <span class="panel-kicker">${stepResourceCards.length} files</span>
            </div>
            <p class="shop-mode-hint" data-print-hide="true">
              Tap any card to jump back into atlas mode with that file open in the drawer.
            </p>
            ${renderResourceStack(stepResourceCards)}
          </article>

          <article class="console-card console-card--shop">
            <div class="panel-title-row">
              <h3>Shop Notes</h3>
              <span class="panel-kicker">saved locally</span>
            </div>
            <label class="notes-field">
              <span>Keep setup reminders and fit-up notes attached to this step packet.</span>
              <textarea data-step-notes rows="10" placeholder="Example: use a spacer block for LM-02 before driving screws...">${escapeHtml(
                state.progress.notes[step.id] || "",
              )}</textarea>
            </label>
          </article>
        </section>
      </main>
    </div>
  `;
}

function renderApp() {
  ensureSelections();
  syncLocationState();

  const step = currentStep();
  const previousId = previousStepId();
  const nextId = nextStepId();
  const resource = currentResource();
  const media = currentMedia(step);
  const stepResourceCards = stepResources(step);
  const stepGateCards = stepGates(step);
  const completedSteps = state.data.steps.filter((entry) => stepDone(entry.id)).length;

  app.innerHTML =
    state.viewMode === "shop"
      ? renderShopFloorLayout({ step, previousId, nextId, media, stepResourceCards, stepGateCards, completedSteps })
      : renderAtlasLayout({ step, previousId, nextId, resource, media, stepResourceCards, stepGateCards, completedSteps });

  bindEvents();
  mountModelViewer(step);
}

function bindEvents() {
  app.querySelectorAll("[data-step-id]").forEach((button) => {
    button.addEventListener("click", () => {
      setCurrentStep(button.dataset.stepId);
    });
  });

  app.querySelectorAll("[data-jump-step]").forEach((button) => {
    if (button.disabled) {
      return;
    }
    button.addEventListener("click", () => {
      setCurrentStep(button.dataset.jumpStep);
    });
  });

  app.querySelectorAll("[data-toggle-step-done]").forEach((button) => {
    button.addEventListener("click", () => {
      const stepId = button.dataset.toggleStepDone;
      state.progress.completedSteps[stepId] = !state.progress.completedSteps[stepId];
      saveProgress();
      renderApp();
    });
  });

  app.querySelectorAll("[data-set-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      setViewMode(button.dataset.setMode);
    });
  });

  app.querySelectorAll("[data-media-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentMediaId = button.dataset.mediaId;
      renderApp();
    });
  });

  app.querySelectorAll("[data-resource-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentResourceId = button.dataset.resourceId;
      renderApp();
    });
  });

  app.querySelectorAll("[data-open-resource-atlas]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentResourceId = button.dataset.openResourceAtlas;
      state.viewMode = "atlas";
      renderApp();
    });
  });

  app.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.resourceCategory = button.dataset.filter;
      renderApp();
    });
  });

  const searchInput = app.querySelector("input[type='search']");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.resourceQuery = event.currentTarget.value;
      renderApp();
    });
  }

  app.querySelectorAll("[data-action-check]").forEach((input) => {
    input.addEventListener("change", () => {
      state.progress.actions[actionKey(state.currentStepId, Number(input.dataset.actionCheck))] = input.checked;
      saveProgress();
      renderApp();
    });
  });

  app.querySelectorAll("[data-hold-check]").forEach((input) => {
    input.addEventListener("change", () => {
      state.progress.holdPoints[holdKey(state.currentStepId, Number(input.dataset.holdCheck))] = input.checked;
      saveProgress();
      renderApp();
    });
  });

  const notesField = app.querySelector("[data-step-notes]");
  if (notesField) {
    notesField.addEventListener("input", (event) => {
      state.progress.notes[state.currentStepId] = event.currentTarget.value;
      saveProgress();
    });
  }

  const copyLinkButton = app.querySelector("[data-copy-link]");
  if (copyLinkButton) {
    copyLinkButton.addEventListener("click", () => {
      copyCurrentLink();
    });
  }

  const printButton = app.querySelector("[data-print-packet]");
  if (printButton) {
    printButton.addEventListener("click", () => {
      printCurrentPacket();
    });
  }

  const fullscreenButton = app.querySelector("[data-toggle-fullscreen]");
  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", () => {
      toggleFullscreen();
    });
  }
}

function mountModelViewer(step) {
  const mount = app.querySelector("#modelViewerMount");
  if (!mount || !state.model) {
    return;
  }
  if (state.viewer) {
    state.viewer.destroy();
  }
  try {
    state.viewer = createModelViewer(mount, state.model, {
      ...step.viewer,
      summary: step.focus,
    });
  } catch (error) {
    state.viewer = null;
    mount.innerHTML = `
      <div class="atlas-fallback">
        <p class="eyebrow">3D atlas unavailable</p>
        <h3>WebGL is not available in this browser context.</h3>
        <p>${step.focus}</p>
        <ul>
          ${step.viewer.callouts.map((callout) => `<li>${callout}</li>`).join("")}
        </ul>
      </div>
    `;
    console.error(error);
  }
}

async function bootstrap() {
  const [dataResponse, modelResponse] = await Promise.all([
    fetch("/generated/instructions-data.json"),
    fetch("/generated/bench-model.json"),
  ]);
  if (!dataResponse.ok) {
    throw new Error(`Failed to load generated site data: ${dataResponse.status}`);
  }
  if (!modelResponse.ok) {
    throw new Error(`Failed to load generated 3D model: ${modelResponse.status}`);
  }
  state.data = await dataResponse.json();
  state.model = await modelResponse.json();
  state.progress = loadProgress();
  applyLocationState();

  window.addEventListener("keydown", (event) => {
    if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) {
      return;
    }
    if (event.key === "ArrowRight" && nextStepId()) {
      setCurrentStep(nextStepId());
    }
    if (event.key === "ArrowLeft" && previousStepId()) {
      setCurrentStep(previousStepId());
    }
    if (event.key.toLowerCase() === "p" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      printCurrentPacket();
    }
  });

  window.addEventListener("fullscreenchange", () => renderApp());
  window.addEventListener("popstate", () => {
    applyLocationState();
    renderApp();
  });

  renderApp();
}

bootstrap().catch((error) => {
  app.innerHTML = `
    <div class="fatal">
      <p class="eyebrow">Instructions site failed to load</p>
      <h1>${error.message}</h1>
      <p>Run \`npm run build:content\` inside \`site/\` to regenerate the project data bundle.</p>
    </div>
  `;
});
