import "./style.css";

import { marked } from "marked";
import { createModelViewer } from "./model-viewer.js";

const app = document.querySelector("#app");

const state = {
  data: null,
  model: null,
  currentStepId: null,
  currentMediaId: null,
  currentResourceId: null,
  resourceQuery: "",
  resourceCategory: "all",
  viewer: null,
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
  const resource = currentResource();
  const mediaId = currentMedia();
  const filtered = filteredResources();
  const media = mediaId ? mediaById(mediaId) : null;
  const stepResourceCards = step.resources.map(resourceById).filter(Boolean);
  const stepGates = step.gate_ids.map(gateById).filter(Boolean);

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
                  <button class="step-card ${entry.id === step.id ? "is-active" : ""}" data-step-id="${entry.id}">
                    <span class="step-index">${String(entry.number).padStart(2, "0")}</span>
                    <span class="step-copy">
                      <strong>${entry.title}</strong>
                      <small>${entry.summary}</small>
                    </span>
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
              ${step.parts.map((part) => `<span class="chip">${part}</span>`).join("")}
            </div>
          </div>
          <div class="hero-notes">
            <p class="eyebrow">Warnings</p>
            <ul>
              ${step.warnings.map((warning) => `<li>${warning}</li>`).join("")}
            </ul>
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

        <section class="story-grid">
          <article class="panel story-panel">
            <div class="panel-title-row">
              <h2>Step Storyboard</h2>
              <span class="panel-kicker">${step.actions.length} actions</span>
            </div>
            <ol class="action-list">
              ${step.actions.map((action) => `<li>${action}</li>`).join("")}
            </ol>
          </article>

          <article class="panel story-panel">
            <div class="panel-title-row">
              <h2>Hold Points</h2>
              <span class="panel-kicker">check before moving on</span>
            </div>
            <ul class="checkpoint-list">
              ${step.hold_points.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
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
