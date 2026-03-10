import "./style.css";

import { marked } from "marked";
import { createModelViewer } from "./model-viewer.js";

const app = document.querySelector("#app");
const STORAGE_KEY = "fixed-top-bench-atlas-progress-v1";

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
  return value
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

function currentMedia() {
  const step = currentStep();
  return step.media.find((mediaId) => mediaId === state.currentMediaId) || step.media[0] || null;
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
    const haystack = [
      resource.title,
      resource.path,
      resource.summary || "",
      resource.category,
    ]
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
                `
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

function ensureSelections() {
  if (!state.progress) {
    state.progress = loadProgress();
  }
  if (!state.currentStepId) {
    state.currentStepId = state.data.landing_step;
  }
  const step = currentStep();
  if (!state.currentMediaId || !step.media.includes(state.currentMediaId)) {
    state.currentMediaId = step.media[0] || null;
  }
  if (!state.currentResourceId) {
    state.currentResourceId = state.data.landing_resource;
  }
}

function renderApp() {
  ensureSelections();
  const step = currentStep();
  const previousId = previousStepId();
  const nextId = nextStepId();
  const resource = currentResource();
  const mediaId = currentMedia();
  const filtered = filteredResources();
  const media = mediaId ? mediaById(mediaId) : null;
  const stepResourceCards = step.resources.map(resourceById).filter(Boolean);
  const stepGates = step.gate_ids.map(gateById).filter(Boolean);
  const completedSteps = state.data.steps.filter((entry) => stepDone(entry.id)).length;
  const actionCount = checkedActionsCount(step);
  const holdCount = checkedHoldCount(step);

  app.innerHTML = `
    <div class="shell">
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
                `
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
                `
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
                `
              )
              .join("")}
          </div>
        </div>
      </aside>

      <main class="main">
        <section class="hero panel">
          <div class="hero-copy">
            <p class="eyebrow">Current Stage</p>
            <h2>${step.number}. ${step.title}</h2>
            <p class="hero-summary">${step.summary}</p>
            <p class="hero-focus">${step.focus}</p>
            <div class="chip-row">
              ${step.gate_summary.map((gate) => `<span class="chip ${gate.gate === "cut_now" ? "" : "chip--warn"}">${gate.count} ${gate.gate_label}</span>`).join("")}
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
            <div class="builder-console__nav">
              <button class="nav-chip" data-jump-step="${previousId || ""}" ${previousId ? "" : "disabled"}>Previous</button>
              <button class="nav-chip" data-jump-step="${nextId || ""}" ${nextId ? "" : "disabled"}>Next</button>
              <button class="nav-chip ${stepDone(step.id) ? "is-active" : ""}" data-toggle-step-done="${step.id}">
                ${stepDone(step.id) ? "Marked done" : "Mark step done"}
              </button>
            </div>
          </div>
          <div class="builder-console__stats">
            <span class="chip">${completedSteps}/${state.data.steps.length} steps complete</span>
            <span class="chip">${actionCount}/${step.actions.length} actions checked</span>
            <span class="chip">${holdCount}/${step.hold_points.length} hold points checked</span>
            <span class="chip">${step.part_cards.length} parts in play</span>
          </div>
          <div class="builder-console__grid">
            <article class="console-card">
              <div class="panel-title-row">
                <h3>Action Checklist</h3>
                <span class="panel-kicker">${step.actions.length} actions</span>
              </div>
              <div class="task-list">
                ${step.actions
                  .map(
                    (action, index) => `
                      <label class="task-row ${actionChecked(step.id, index) ? "is-checked" : ""}">
                        <input type="checkbox" data-action-check="${index}" ${actionChecked(step.id, index) ? "checked" : ""} />
                        <span>${renderInlineMarkdown(action)}</span>
                      </label>
                    `
                  )
                  .join("")}
              </div>
            </article>

            <article class="console-card">
              <div class="panel-title-row">
                <h3>Hold Points</h3>
                <span class="panel-kicker">verify before moving on</span>
              </div>
              <div class="task-list">
                ${step.hold_points
                  .map(
                    (item, index) => `
                      <label class="task-row ${holdChecked(step.id, index) ? "is-checked" : ""}">
                        <input type="checkbox" data-hold-check="${index}" ${holdChecked(step.id, index) ? "checked" : ""} />
                        <span>${item}</span>
                      </label>
                    `
                  )
                  .join("")}
              </div>
            </article>

            <article class="console-card console-card--parts">
              <div class="panel-title-row">
                <h3>Parts In Play</h3>
                <span class="panel-kicker">${step.part_cards.length} tracked parts</span>
              </div>
              <div class="part-card-grid">
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
                        <small>${card.notes}</small>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </article>

            <article class="console-card">
              <div class="panel-title-row">
                <h3>Shop Notes</h3>
                <span class="panel-kicker">saved locally</span>
              </div>
              <label class="notes-field">
                <span>Record fit-up notes, material substitutions, or reminders for this step.</span>
                <textarea data-step-notes rows="8" placeholder="Example: dry-fit RM-10 with mockup before drilling any panel hardware...">${escapeHtml(state.progress.notes[step.id] || "")}</textarea>
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
            <aside class="reference-board">
              <div class="reference-board__header">
                <p class="eyebrow">Reference Plates</p>
                <h3>${media ? media.title : "No reference image linked"}</h3>
                <p class="reference-board__summary">
                  ${media ? "Keep a 2D drawing or render visible while orbiting the live 3D atlas." : "This step currently relies on the live model and linked source files more than on a dedicated drawing."}
                </p>
              </div>
              <div class="reference-board__frame">
                ${
                  media
                    ? `<img class="reference-board__image" src="${media.path}" alt="${media.title}" />`
                    : `<div class="empty-stage">No media plate linked to this stage.</div>`
                }
              </div>
              <div class="media-strip">
                ${step.media
                  .map((stepMediaId) => {
                    const asset = mediaById(stepMediaId);
                    if (!asset) {
                      return "";
                    }
                    return `
                      <button class="media-chip ${stepMediaId === mediaId ? "is-active" : ""}" data-media-id="${stepMediaId}">
                        ${asset.title}
                      </button>
                    `;
                  })
                  .join("")}
              </div>
            </aside>
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
                  `
                )
                .join("")}
            </div>
          </article>

          <article class="panel">
            <div class="panel-title-row">
              <h2>Gate Board</h2>
              <span class="panel-kicker">${stepGates.length || 0} relevant gates</span>
            </div>
            ${
              stepGates.length
                ? stepGates
                    .map(
                      (gate) => `
                        <div class="gate-card">
                          <strong>${gate.title}</strong>
                          <p>${gate.body}</p>
                          <div class="chip-row">
                            ${gate.parts.map((part) => `<span class="chip chip--warn">${part}</span>`).join("")}
                          </div>
                        </div>
                      `
                    )
                    .join("")
                : `<div class="empty-state">This stage has no additional gate board linked beyond the general packet.</div>`
            }
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
                `
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
                `
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

  bindEvents();
  mountModelViewer(step);
}

function bindEvents() {
  app.querySelectorAll("[data-step-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentStepId = button.dataset.stepId;
      state.currentMediaId = null;
      renderApp();
    });
  });

  app.querySelectorAll("[data-jump-step]").forEach((button) => {
    if (button.disabled) {
      return;
    }
    button.addEventListener("click", () => {
      state.currentStepId = button.dataset.jumpStep;
      state.currentMediaId = null;
      renderApp();
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
  window.addEventListener("keydown", (event) => {
    if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) {
      return;
    }
    if (event.key === "ArrowRight" && nextStepId()) {
      state.currentStepId = nextStepId();
      state.currentMediaId = null;
      renderApp();
    }
    if (event.key === "ArrowLeft" && previousStepId()) {
      state.currentStepId = previousStepId();
      state.currentMediaId = null;
      renderApp();
    }
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
