import "./style.css";

import { marked } from "marked";

const app = document.querySelector("#app");
const STORAGE_KEY = "fixed-top-bench-atlas-progress-v1";
const VIEW_MODES = new Set(["build", "atlas", "library"]);
let viewerModulePromise = null;

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
  viewMode: "build",
  shareStatus: "",
  shareStatusTimer: null,
  viewerLoadToken: 0,
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
  return VIEW_MODES.has(mode) ? mode : "build";
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

function loadViewerModule() {
  if (!viewerModulePromise) {
    viewerModulePromise = import("./model-viewer.js").catch((error) => {
      viewerModulePromise = null;
      throw error;
    });
  }
  return viewerModulePromise;
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

  if (state.viewMode !== "build") {
    state.viewMode = "build";
    renderApp();
    runPrint();
    return;
  }
  runPrint();
}

function stepStatus(entry) {
  if (stepDone(entry.id)) {
    return { label: "Done", className: "is-done" };
  }
  if (entry.gate_ids.length || entry.gate_summary.some((gate) => gate.gate !== "cut_now")) {
    return { label: "Watch gates", className: "is-gated" };
  }
  return { label: "Ready", className: "is-ready" };
}

function renderModeControls(step, previousId, nextId, completedSteps) {
  const fullscreenLabel = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
  return `
    <div class="app-header__actions">
      <div class="app-header__action-row">
        <button class="nav-chip" data-jump-step="${previousId || ""}" ${previousId ? "" : "disabled"}>Previous</button>
        <button class="nav-chip" data-jump-step="${nextId || ""}" ${nextId ? "" : "disabled"}>Next</button>
        <button class="nav-chip ${stepDone(step.id) ? "is-active" : ""}" data-toggle-step-done="${step.id}">
          ${stepDone(step.id) ? "Marked done" : "Mark step done"}
        </button>
      </div>
      <div class="app-header__action-row">
        <button class="nav-chip" data-print-packet>Print packet</button>
        <button class="nav-chip" data-copy-link>${state.shareStatus || "Copy link"}</button>
        <button class="nav-chip" data-toggle-fullscreen>${fullscreenLabel}</button>
      </div>
      <div class="app-header__metrics">
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
        <p class="eyebrow">Reference Plate</p>
        <h3>${media ? media.title : "No reference image linked"}</h3>
        <p class="reference-board__summary">
          ${
            media
              ? "Use this alongside the live stage state. Treat it as an orientation plate, not a direct machining template."
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
    return `<div class="empty-state empty-state--compact">This stage has no additional gate board linked beyond the general packet.</div>`;
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
            <button class="resource-card resource-card--packet" data-open-resource-library="${linked.id}">
              <span class="resource-meta">${categoryLabel(linked.category)} · ${linked.extension}</span>
              <strong>${linked.title}</strong>
              <small>${linked.summary || linked.path}</small>
              <span class="resource-card__hint">Open in library</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderStageStrip(step) {
  return `
    <div class="stage-strip" data-print-hide="true">
      ${state.data.steps
        .map((entry) => {
          const status = stepStatus(entry);
          return `
            <button class="stage-pill ${entry.id === step.id ? "is-active" : ""} ${status.className}" data-step-id="${entry.id}">
              <span class="stage-pill__index">${String(entry.number).padStart(2, "0")}</span>
              <span class="stage-pill__copy">
                <strong>${entry.title}</strong>
                <small>${entry.actions.length} actions · ${entry.part_cards.length} parts</small>
              </span>
              <span class="stage-pill__status">${status.label}</span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderWorkspaceTabs() {
  return `
    <div class="workspace-tabs" data-print-hide="true">
      ${[
        ["build", "Build"],
        ["atlas", "Atlas"],
        ["library", "Library"],
      ]
        .map(
          ([mode, label]) => `
            <button class="workspace-tab ${state.viewMode === mode ? "is-active" : ""}" data-set-mode="${mode}">
              ${label}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderViewerLoading(step) {
  return `
    <div class="atlas-loading">
      <p class="eyebrow">3D atlas loading</p>
      <h3>${step.number}. ${step.title}</h3>
      <p>${step.focus}</p>
      <div class="atlas-loading__pulse" aria-hidden="true"></div>
      <small>The interactive model loads separately so the packet UI stays responsive.</small>
    </div>
  `;
}

function renderHeader(step, previousId, nextId, completedSteps) {
  return `
    <header class="app-header panel">
      <div class="app-header__row">
        <div class="app-header__lead">
          <p class="eyebrow">Digital Build Manual</p>
          <h1>${step.number}. ${step.title}</h1>
          <p class="app-header__summary">${step.summary}</p>
        </div>
        ${renderModeControls(step, previousId, nextId, completedSteps)}
      </div>
      <div class="app-header__row app-header__row--secondary">
        ${renderWorkspaceTabs()}
        <div class="app-header__status">
          <span class="chip chip--strong">${step.focus}</span>
          ${step.gate_summary
            .map((gate) => `<span class="chip ${gate.gate === "cut_now" ? "" : "chip--warn"}">${gate.count} ${gate.gate_label}</span>`)
            .join("")}
        </div>
      </div>
      ${renderStageStrip(step)}
    </header>
  `;
}

function renderBuildLayout({ step, media, stepResourceCards, stepGateCards }) {
  const hasBlockedParts = step.gate_summary.some((gate) => gate.gate !== "cut_now");
  return `
    <section class="workspace workspace--build">
      <div class="build-layout">
        <article class="panel build-primary">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">What To Do Next</p>
              <h2>Build Packet</h2>
            </div>
            <button class="nav-chip" data-set-mode="atlas">Open atlas</button>
          </div>
          <p class="build-primary__focus">${step.focus}</p>
          ${renderTaskRows(step, "action")}
        </article>

        <article class="panel build-hold ${hasBlockedParts ? "build-hold--warn" : ""}">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">What Is Blocked</p>
              <h2>Hold Points</h2>
            </div>
            <span class="panel-kicker">${step.hold_points.length} checks</span>
          </div>
          <p class="build-hold__summary">
            ${hasBlockedParts ? "This step still has gated parts or proof items. Resolve the hold points before cutting or fastening the blocked work." : "Use these checks to avoid locking bad geometry into the bench."}
          </p>
          ${renderTaskRows(step, "hold")}
          <div class="build-hold__gates">
            ${renderGateCards(stepGateCards)}
          </div>
        </article>

        <article class="panel build-spotlight">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Reference Plate</p>
              <h2>Step Snapshot</h2>
            </div>
            <button class="nav-chip" data-set-mode="library">Open library</button>
          </div>
          ${renderReferenceBoard(step, media, true)}
        </article>

        <article class="panel build-parts">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">What Is In Play</p>
              <h2>Parts</h2>
            </div>
            <span class="panel-kicker">${step.part_cards.length} tracked</span>
          </div>
          ${renderPartCards(step, "part-card-grid--dense")}
        </article>

        <article class="panel build-resources">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">What To Read</p>
              <h2>Step Files</h2>
            </div>
            <span class="panel-kicker">${stepResourceCards.length} files</span>
          </div>
          ${renderResourceStack(stepResourceCards)}
        </article>

        <article class="panel build-notes">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">What You Learned</p>
              <h2>Shop Notes</h2>
            </div>
            <span class="panel-kicker">saved locally</span>
          </div>
          <label class="notes-field">
            <span>Record fit-up notes, substitutions, spacer logic, or reminders for later steps.</span>
            <textarea data-step-notes rows="10" placeholder="Example: use a spacer block for LM-02 before driving screws...">${escapeHtml(
              state.progress.notes[step.id] || "",
            )}</textarea>
          </label>
        </article>
      </div>
    </section>
  `;
}

function renderAtlasLayout({ step, media, stepResourceCards, stepGateCards }) {
  return `
    <section class="workspace workspace--atlas">
      <div class="atlas-layout">
        <article class="panel atlas-main">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Atlas Workspace</p>
              <h2>3D Bench View</h2>
            </div>
            <button class="nav-chip" data-set-mode="build">Back to build</button>
          </div>
          <p class="atlas-main__summary">${step.focus}</p>
          <div class="atlas-main__mount" id="modelViewerMount"></div>
        </article>

        <aside class="atlas-support">
          <article class="panel atlas-support__callouts">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Watch For</p>
                <h2>Step Callouts</h2>
              </div>
              <button class="nav-chip" data-set-mode="library">Open docs</button>
            </div>
            <ul class="checkpoint-list">
              ${step.warnings.map((warning) => `<li>${warning}</li>`).join("")}
              ${step.viewer.callouts.map((callout) => `<li>${callout}</li>`).join("")}
            </ul>
            <div class="chip-row">
              ${step.gate_summary
                .map(
                  (gate) => `<span class="chip ${gate.gate === "cut_now" ? "" : "chip--warn"}">${gate.count} ${gate.gate_label}</span>`,
                )
                .join("")}
            </div>
          </article>

          <article class="panel atlas-support__reference">
            ${renderReferenceBoard(step, media, true)}
          </article>

          <article class="panel atlas-support__resources">
            <div class="panel-title-row">
              <h2>Step Files</h2>
              <span class="panel-kicker">${stepResourceCards.length} files</span>
            </div>
            ${renderResourceStack(stepResourceCards)}
          </article>

          ${
            stepGateCards.length
              ? `
                <article class="panel atlas-support__gates">
                  <div class="panel-title-row">
                    <h2>Gate Board</h2>
                    <span class="panel-kicker">${stepGateCards.length} active gates</span>
                  </div>
                  ${renderGateCards(stepGateCards)}
                </article>
              `
              : ""
          }
        </aside>
      </div>
    </section>
  `;
}

function renderLibraryLayout({ step, resource }) {
  const filtered = filteredResources();
  const stepResourceCards = stepResources(step);
  return `
    <section class="workspace workspace--library">
      <div class="library-layout">
        <aside class="panel library-sidebar">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Resource Library</p>
              <h2>Project Files</h2>
            </div>
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

          <div class="library-pins">
            <div class="panel-title-row">
              <h3>Current Step Files</h3>
              <button class="nav-chip" data-set-mode="build">Back to build</button>
            </div>
            ${renderResourceStack(stepResourceCards)}
          </div>

          <div class="resource-list library-resource-list">
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
        </aside>

        <article class="panel library-reader">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Reader</p>
              <h2>${resource.title}</h2>
            </div>
            <span class="panel-kicker">${resource.path}</span>
          </div>
          ${renderResourceBody(resource)}
        </article>
      </div>
    </section>
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

  const workspace =
    state.viewMode === "build"
      ? renderBuildLayout({ step, media, stepResourceCards, stepGateCards })
      : state.viewMode === "atlas"
        ? renderAtlasLayout({ step, media, stepResourceCards, stepGateCards })
        : renderLibraryLayout({ step, resource });

  app.innerHTML = `
    <div class="app-shell">
      ${renderHeader(step, previousId, nextId, completedSteps)}
      ${workspace}
    </div>
  `;

  bindEvents();
  if (state.viewMode === "atlas") {
    mountModelViewer(step);
  } else if (state.viewer) {
    state.viewer.destroy();
    state.viewer = null;
  }
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

  app.querySelectorAll("[data-open-resource-library]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentResourceId = button.dataset.openResourceLibrary;
      state.viewMode = "library";
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

async function mountModelViewer(step) {
  const mount = app.querySelector("#modelViewerMount");
  if (!mount || !state.model) {
    return;
  }
  if (state.viewer) {
    state.viewer.destroy();
    state.viewer = null;
  }
  const loadToken = ++state.viewerLoadToken;
  mount.innerHTML = renderViewerLoading(step);
  try {
    const { createModelViewer } = await loadViewerModule();
    if (loadToken !== state.viewerLoadToken || !mount.isConnected) {
      return;
    }
    state.viewer = createModelViewer(mount, state.model, {
      ...step.viewer,
      summary: step.focus,
    });
  } catch (error) {
    if (loadToken !== state.viewerLoadToken || !mount.isConnected) {
      return;
    }
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
