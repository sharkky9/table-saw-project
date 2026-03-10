import {
  BoxGeometry,
  Color,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  FogExp2,
  GridHelper,
  Group,
  HemisphereLight,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Path,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  Raycaster,
  Scene,
  ShadowMaterial,
  Shape,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function formatInches(value) {
  return `${Number(value).toFixed(2)} in`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function clipRangeForAxis(spec, axis) {
  const max = spec.metadata.overall_bounds.max;
  if (axis === "x") {
    return { min: 0, max: Math.ceil(max[0]), value: 45 };
  }
  if (axis === "y") {
    return { min: 0, max: Math.ceil(max[1]), value: 24 };
  }
  if (axis === "z") {
    return { min: 0, max: Math.ceil(max[2]), value: 28 };
  }
  return { min: 0, max: 90, value: 24 };
}

class BenchModelViewer {
  constructor(container, spec, stepViewer) {
    this.container = container;
    this.spec = spec;
    this.objects = new Map();
    this.partsById = new Map(spec.parts.map((part) => [part.instance_id, part]));
    this.materials = [];
    this.geometries = [];
    this.assemblyVisibility = new Map(spec.assemblies.map((assembly) => [assembly.id, true]));
    this.raycaster = new Raycaster();
    this.pointer = new Vector2();
    this.animationFrame = null;
    this.resizeObserver = null;
    this.clippingPlane = new Plane(new Vector3(0, 0, 1), -24);
    this.state = {
      exploded: 0,
      sectionAxis: "none",
      sectionOffset: 24,
      xray: false,
      showGuides: false,
      deployed: false,
      selectedId: null,
      presetId: "",
      highlightAssemblies: [],
    };

    this.renderFrame();
    this.setupThree();
    this.buildScene();
    this.attachUiEvents();
    this.updateStep(stepViewer);
    this.handleResize();
    this.animate();
  }

  renderFrame() {
    this.container.innerHTML = `
      <div class="atlas-shell">
        <div class="atlas-viewport">
          <div class="atlas-toolbar">
            <section class="atlas-toolbar-block">
              <p class="eyebrow">3D Lens</p>
              <div class="atlas-presets" data-presets></div>
            </section>
            <section class="atlas-toolbar-block atlas-toolbar-block--controls">
              <label class="atlas-control">
                <span>Explode</span>
                <input data-control="explode" type="range" min="0" max="0.8" step="0.02" value="0" />
              </label>
              <label class="atlas-control">
                <span>Section</span>
                <select data-control="section-axis">
                  <option value="none">None</option>
                  <option value="x">X</option>
                  <option value="y">Y</option>
                  <option value="z">Z</option>
                </select>
              </label>
              <label class="atlas-control">
                <span>Section Offset</span>
                <input data-control="section-offset" type="range" min="0" max="90" step="1" value="24" />
              </label>
              <label class="atlas-toggle">
                <input data-control="deploy" type="checkbox" />
                <span>Deploy station</span>
              </label>
              <label class="atlas-toggle">
                <input data-control="guides" type="checkbox" />
                <span>Show guides</span>
              </label>
              <label class="atlas-toggle">
                <input data-control="xray" type="checkbox" />
                <span>X-ray</span>
              </label>
            </section>
          </div>
          <div class="atlas-canvas-shell">
            <canvas class="atlas-canvas"></canvas>
            <div class="atlas-status">
              <span class="atlas-status__label">Miter gate</span>
              <strong>Public sanity only</strong>
              <small>Real tray fit and shimming are still manual.</small>
            </div>
          </div>
        </div>

        <aside class="atlas-inspector">
          <article class="atlas-card atlas-card--lens">
            <p class="eyebrow">Step Lens</p>
            <h3 data-lens-title>3D Atlas</h3>
            <p class="atlas-card__summary" data-lens-summary>Loading step lens…</p>
            <ul class="atlas-callout-list" data-callouts></ul>
            <div class="chip-row" data-focus-chips></div>
          </article>

          <article class="atlas-card">
            <div class="panel-title-row">
              <h3>Assemblies</h3>
              <span class="panel-kicker">${this.spec.assemblies.length} groups</span>
            </div>
            <div class="atlas-assemblies" data-assemblies></div>
          </article>

          <article class="atlas-card atlas-card--selection">
            <div class="panel-title-row">
              <h3>Selection</h3>
              <span class="panel-kicker" data-selection-kicker>click a part</span>
            </div>
            <div data-selection-body>
              <p class="atlas-card__summary">Click any modeled part to inspect its material, gate, and notes.</p>
            </div>
          </article>
        </aside>
      </div>
    `;

    this.canvas = this.container.querySelector("canvas");
    this.presetsRoot = this.container.querySelector("[data-presets]");
    this.assembliesRoot = this.container.querySelector("[data-assemblies]");
    this.calloutsRoot = this.container.querySelector("[data-callouts]");
    this.focusChipsRoot = this.container.querySelector("[data-focus-chips]");
    this.lensTitle = this.container.querySelector("[data-lens-title]");
    this.lensSummary = this.container.querySelector("[data-lens-summary]");
    this.selectionKicker = this.container.querySelector("[data-selection-kicker]");
    this.selectionBody = this.container.querySelector("[data-selection-body]");
    this.explodeInput = this.container.querySelector("[data-control='explode']");
    this.sectionAxisInput = this.container.querySelector("[data-control='section-axis']");
    this.sectionOffsetInput = this.container.querySelector("[data-control='section-offset']");
    this.deployInput = this.container.querySelector("[data-control='deploy']");
    this.guidesInput = this.container.querySelector("[data-control='guides']");
    this.xrayInput = this.container.querySelector("[data-control='xray']");
  }

  setupThree() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.localClippingEnabled = true;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new Scene();
    this.scene.fog = new FogExp2(0xefe8dc, 0.011);

    this.camera = new PerspectiveCamera(42, 1, 0.1, 400);
    this.camera.position.set(119, -32, 76);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(45, 22, 18);
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.minDistance = 18;
    this.controls.maxDistance = 260;

    this.rootGroup = new Group();
    this.scene.add(this.rootGroup);

    const hemi = new HemisphereLight(0xf2f0eb, 0x31465f, 1.2);
    this.scene.add(hemi);

    const key = new DirectionalLight(0xfff1d7, 1.5);
    key.position.set(60, -40, 90);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -90;
    key.shadow.camera.right = 90;
    key.shadow.camera.top = 90;
    key.shadow.camera.bottom = -90;
    this.scene.add(key);

    const rim = new DirectionalLight(0x83a6cf, 0.65);
    rim.position.set(-70, 70, 55);
    this.scene.add(rim);

    this.grid = new GridHelper(140, 28, 0x50647a, 0x7b8a99);
    this.grid.position.set(45, 24, 0);
    this.grid.material.opacity = 0.18;
    this.grid.material.transparent = true;
    this.scene.add(this.grid);

    this.floor = new Mesh(
      new PlaneGeometry(160, 100),
      new ShadowMaterial({ color: 0x000000, opacity: 0.15 })
    );
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.set(45, 24, 0);
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.canvas.parentElement);
  }

  createBoxGeometry(part) {
    const geometry = new BoxGeometry(part.size[0], part.size[1], part.size[2]);
    this.geometries.push(geometry);
    return geometry;
  }

  createHorizontalPanelGeometry(part) {
    const width = part.size[0];
    const depth = part.size[1];
    const height = part.size[2];
    const cutouts = (part.features || []).filter((feature) => feature.type === "through_cutout");

    if (!cutouts.length) {
      return this.createBoxGeometry(part);
    }

    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(width, 0);
    shape.lineTo(width, depth);
    shape.lineTo(0, depth);
    shape.closePath();

    for (const cutout of cutouts) {
      const [x, y] = cutout.local_position;
      const hole = new Path();
      hole.moveTo(x, y);
      hole.lineTo(x + cutout.size[0], y);
      hole.lineTo(x + cutout.size[0], y + cutout.size[1]);
      hole.lineTo(x, y + cutout.size[1]);
      hole.closePath();
      shape.holes.push(hole);
    }

    const geometry = new ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
      steps: 1,
    });
    geometry.translate(-width / 2, -depth / 2, -height / 2);
    geometry.computeVertexNormals();
    this.geometries.push(geometry);
    return geometry;
  }

  createMaterial(part) {
    const materialType = String(part.material || "").toLowerCase();
    const guide = part.render_style === "guide";
    const context = part.render_style === "context";
    const metallic = materialType.includes("aluminum") || materialType.includes("plate");
    const material = new MeshStandardMaterial({
      color: new Color(part.color),
      roughness: metallic ? 0.42 : guide ? 0.85 : 0.74,
      metalness: metallic ? 0.42 : 0.08,
      transparent: true,
      opacity: guide ? 0.18 : context ? 0.5 : part.confidence === "medium" ? 0.9 : 1,
      depthWrite: !guide,
      clippingPlanes: [],
    });
    this.materials.push(material);
    return material;
  }

  createPocketMarkers(part, host) {
    const pockets = (part.features || []).filter((feature) => feature.type === "pocket");
    if (!pockets.length) {
      return;
    }

    for (const pocket of pockets) {
      const markerMaterial = new MeshStandardMaterial({
        color: new Color(pocket.color || "#33506d"),
        roughness: 0.6,
        metalness: 0.04,
        transparent: true,
        opacity: 0.92,
        clippingPlanes: [],
      });
      const markerGeometry = new BoxGeometry(pocket.size[0], pocket.size[1], pocket.depth || 0.06);
      this.materials.push(markerMaterial);
      this.geometries.push(markerGeometry);
      const marker = new Mesh(markerGeometry, markerMaterial);
      marker.position.set(
        pocket.local_position[0] + pocket.size[0] / 2 - part.size[0] / 2,
        pocket.local_position[1] + pocket.size[1] / 2 - part.size[1] / 2,
        part.size[2] / 2 - (pocket.depth || 0.06) / 2
      );
      host.add(marker);
    }
  }

  createPartObject(part) {
    const geometry = part.part_type === "horizontal_panel" ? this.createHorizontalPanelGeometry(part) : this.createBoxGeometry(part);
    const material = this.createMaterial(part);
    const mesh = new Mesh(geometry, material);
    mesh.castShadow = part.render_style !== "guide";
    mesh.receiveShadow = true;
    mesh.userData.instanceId = part.instance_id;

    const edgeMaterial = new LineBasicMaterial({
      color: part.render_style === "guide" ? 0x456482 : 0x14202c,
      transparent: true,
      opacity: part.render_style === "guide" ? 0.22 : 0.3,
      clippingPlanes: [],
    });
    const edgeGeometry = new EdgesGeometry(geometry, 40);
    this.materials.push(edgeMaterial);
    this.geometries.push(edgeGeometry);
    const edges = new LineSegments(edgeGeometry, edgeMaterial);

    const innerGroup = new Group();
    innerGroup.add(mesh);
    innerGroup.add(edges);
    this.createPocketMarkers(part, innerGroup);

    const container = new Group();
    container.userData = {
      part,
      mesh,
      edges,
      explodedOffset: new Vector3(...(part.exploded_offset || [0, 0, 0])),
      center: new Vector3(...part.center),
      motion: part.motion || null,
    };

    if (part.motion) {
      const pivot = new Group();
      pivot.position.set(...part.motion.origin);
      innerGroup.position.set(
        part.center[0] - part.motion.origin[0],
        part.center[1] - part.motion.origin[1],
        part.center[2] - part.motion.origin[2]
      );
      pivot.add(innerGroup);
      container.add(pivot);
      container.userData.pivot = pivot;
      container.userData.axis = new Vector3(...part.motion.axis).normalize();
    } else {
      innerGroup.position.set(...part.center);
      container.add(innerGroup);
    }

    this.rootGroup.add(container);
    this.objects.set(part.instance_id, container);
  }

  buildScene() {
    for (const part of this.spec.parts) {
      this.createPartObject(part);
    }

    this.presetsRoot.innerHTML = Object.entries(this.spec.metadata.presets)
      .map(
        ([id, preset]) => `
          <button class="atlas-preset" data-preset="${id}">
            ${escapeHtml(preset.label || id.replaceAll("_", " "))}
          </button>
        `
      )
      .join("");

    this.assembliesRoot.innerHTML = this.spec.assemblies
      .map((assembly) => {
        const count = this.spec.parts.filter((part) => part.assembly === assembly.id).length;
        return `
          <label class="atlas-assembly-row">
            <input data-assembly="${assembly.id}" type="checkbox" checked />
            <span class="atlas-assembly-swatch" style="background:${assembly.color}"></span>
            <span class="atlas-assembly-label">${assembly.label}</span>
            <span class="atlas-assembly-count">${count}</span>
          </label>
        `;
      })
      .join("");
  }

  attachUiEvents() {
    this.container.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        this.applyPreset(button.dataset.preset);
      });
    });

    this.assembliesRoot.querySelectorAll("[data-assembly]").forEach((input) => {
      input.addEventListener("change", () => {
        this.state.presetId = "";
        this.assemblyVisibility.set(input.dataset.assembly, input.checked);
        this.refreshPresetButtons();
        this.applyState();
      });
    });

    this.explodeInput.addEventListener("input", () => {
      this.state.exploded = Number(this.explodeInput.value);
      this.state.presetId = "";
      this.refreshPresetButtons();
      this.applyState();
    });

    this.sectionAxisInput.addEventListener("change", () => {
      this.state.sectionAxis = this.sectionAxisInput.value;
      const range = clipRangeForAxis(this.spec, this.state.sectionAxis);
      this.sectionOffsetInput.min = String(range.min);
      this.sectionOffsetInput.max = String(range.max);
      this.state.sectionOffset = range.value;
      this.sectionOffsetInput.value = String(range.value);
      this.applyState();
    });

    this.sectionOffsetInput.addEventListener("input", () => {
      this.state.sectionOffset = Number(this.sectionOffsetInput.value);
      this.applyState();
    });

    this.deployInput.addEventListener("change", () => {
      this.state.deployed = this.deployInput.checked;
      this.state.presetId = "";
      this.refreshPresetButtons();
      this.applyState();
    });

    this.guidesInput.addEventListener("change", () => {
      this.state.showGuides = this.guidesInput.checked;
      this.state.presetId = "";
      this.refreshPresetButtons();
      this.applyState();
    });

    this.xrayInput.addEventListener("change", () => {
      this.state.xray = this.xrayInput.checked;
      this.state.presetId = "";
      this.refreshPresetButtons();
      this.applyState();
    });

    this.canvas.addEventListener("pointerdown", (event) => this.onPointerDown(event));
  }

  refreshPresetButtons() {
    this.container.querySelectorAll("[data-preset]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.preset === this.state.presetId);
    });
  }

  setAssemblyVisibility(visibleIds) {
    for (const assembly of this.spec.assemblies) {
      this.assemblyVisibility.set(assembly.id, visibleIds.includes(assembly.id));
    }
    this.assembliesRoot.querySelectorAll("[data-assembly]").forEach((input) => {
      input.checked = this.assemblyVisibility.get(input.dataset.assembly);
    });
  }

  applyPreset(presetId) {
    const preset = this.spec.metadata.presets[presetId];
    if (!preset) {
      return;
    }

    this.state.presetId = presetId;
    this.state.exploded = preset.exploded ?? 0;
    this.state.deployed = Boolean(preset.deployed);
    this.state.showGuides = Boolean(preset.show_guides);
    this.state.sectionAxis = preset.section_axis || "none";
    const range = clipRangeForAxis(this.spec, this.state.sectionAxis);
    this.state.sectionOffset = preset.section_offset ?? range.value;
    this.state.xray = Boolean(preset.xray);

    this.explodeInput.value = String(this.state.exploded);
    this.deployInput.checked = this.state.deployed;
    this.guidesInput.checked = this.state.showGuides;
    this.xrayInput.checked = this.state.xray;
    this.sectionAxisInput.value = this.state.sectionAxis;
    this.sectionOffsetInput.min = String(range.min);
    this.sectionOffsetInput.max = String(range.max);
    this.sectionOffsetInput.value = String(this.state.sectionOffset);

    if (preset.visible_assemblies) {
      this.setAssemblyVisibility(preset.visible_assemblies);
    }

    if (preset.camera_position) {
      this.camera.position.set(...preset.camera_position);
    }
    if (preset.target) {
      this.controls.target.set(...preset.target);
      this.controls.update();
    }

    this.renderStepLens();
    this.refreshPresetButtons();
    this.applyState();
  }

  partVisible(part) {
    if (!this.assemblyVisibility.get(part.assembly)) {
      return false;
    }
    const visibility = part.visibility || {};
    if (visibility.deployed_only && !this.state.deployed) {
      return false;
    }
    if (visibility.stowed_only && this.state.deployed) {
      return false;
    }
    if (visibility.default === false && !(visibility.guides && this.state.showGuides)) {
      return false;
    }
    if (visibility.guides && !this.state.showGuides && visibility.default === false) {
      return false;
    }
    return true;
  }

  applyClipping() {
    if (this.state.sectionAxis === "none") {
      for (const material of this.materials) {
        material.clippingPlanes = [];
        material.needsUpdate = true;
      }
      return;
    }

    const axis =
      this.state.sectionAxis === "x"
        ? new Vector3(1, 0, 0)
        : this.state.sectionAxis === "y"
          ? new Vector3(0, 1, 0)
          : new Vector3(0, 0, 1);
    this.clippingPlane.set(axis, -this.state.sectionOffset);
    for (const material of this.materials) {
      material.clippingPlanes = [this.clippingPlane];
      material.needsUpdate = true;
    }
  }

  applyState() {
    const highlighted = new Set(this.state.highlightAssemblies || []);
    const dimOthers = highlighted.size > 0;

    for (const part of this.spec.parts) {
      const object = this.objects.get(part.instance_id);
      if (!object) {
        continue;
      }

      object.visible = this.partVisible(part);
      const isSelected = this.state.selectedId === part.instance_id;
      const isDimmed = dimOthers && !highlighted.has(part.assembly);
      const context = part.render_style === "context";
      const guide = part.render_style === "guide";
      const baseOpacity = guide ? 0.18 : context ? 0.5 : part.confidence === "medium" ? 0.9 : 1;
      const opacity = isSelected ? 1 : this.state.xray ? 0.25 : isDimmed ? baseOpacity * 0.22 : baseOpacity;

      const mesh = object.userData.mesh;
      mesh.material.opacity = opacity;
      mesh.material.emissive = new Color(isSelected ? "#e3b27e" : "#000000");
      mesh.material.emissiveIntensity = isSelected ? 0.42 : 0;

      object.userData.edges.material.opacity = isSelected ? 0.8 : guide ? 0.22 : isDimmed ? 0.08 : 0.3;

      const offset = object.userData.explodedOffset.clone().multiplyScalar(this.state.exploded);
      if (object.userData.motion) {
        object.position.copy(offset);
        const angle = MathUtils.degToRad(
          this.state.deployed ? object.userData.motion.deployed_angle_deg : object.userData.motion.stowed_angle_deg
        );
        object.userData.pivot.setRotationFromAxisAngle(object.userData.axis, angle);
      } else {
        const center = object.userData.center;
        object.position.set(center.x + offset.x, center.y + offset.y, center.z + offset.z);
      }
    }

    this.applyClipping();
  }

  onPointerDown(event) {
    const bounds = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.rootGroup.children, true);
    const hit = intersects.find((intersection) => intersection.object.userData.instanceId);
    this.state.selectedId = hit?.object.userData.instanceId || null;
    this.renderSelection();
    this.applyState();
  }

  renderSelection() {
    if (!this.state.selectedId) {
      this.selectionKicker.textContent = "click a part";
      this.selectionBody.innerHTML = `<p class="atlas-card__summary">Click any modeled part to inspect its material, gate, and notes.</p>`;
      return;
    }

    const part = this.partsById.get(this.state.selectedId);
    this.selectionKicker.textContent = part.instance_id;
    this.selectionBody.innerHTML = `
      <div class="atlas-selection-badges">
        <span class="chip">${escapeHtml(part.assembly_label)}</span>
        <span class="chip">${escapeHtml(part.material)}</span>
        <span class="chip chip--warn">${escapeHtml(part.gate)}</span>
      </div>
      <dl class="atlas-selection-grid">
        <dt>Size</dt>
        <dd>${part.size.map((value) => formatInches(value)).join(" × ")}</dd>
        <dt>Position</dt>
        <dd>${part.position.map((value) => formatInches(value)).join(", ")}</dd>
        <dt>Confidence</dt>
        <dd>${escapeHtml(part.confidence)}</dd>
      </dl>
      <p class="atlas-card__summary">${escapeHtml(part.notes || "No extra notes attached to this part.")}</p>
    `;
  }

  renderStepLens() {
    const preset = this.spec.metadata.presets[this.state.presetId];
    this.lensTitle.textContent = preset?.label || "3D Atlas";
    this.lensSummary.textContent =
      this.stepViewer?.summary ||
      "Use the live model to inspect assemblies, keep-clear lanes, and fit-sensitive zones before committing to the next step.";
    this.calloutsRoot.innerHTML = (this.stepViewer?.callouts || [])
      .map((callout) => `<li>${escapeHtml(callout)}</li>`)
      .join("");
    this.focusChipsRoot.innerHTML = (this.stepViewer?.highlight_assemblies || [])
      .map((assemblyId) => {
        const assembly = this.spec.assemblies.find((entry) => entry.id === assemblyId);
        return assembly ? `<span class="chip">${escapeHtml(assembly.label)}</span>` : "";
      })
      .join("");
  }

  updateStep(stepViewer) {
    this.stepViewer = stepViewer || {};
    this.state.highlightAssemblies = [...(this.stepViewer.highlight_assemblies || [])];
    this.applyPreset(this.stepViewer.preset || "assembled");
  }

  handleResize() {
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.controls?.dispose();
    this.renderer?.dispose();
    for (const geometry of this.geometries) {
      geometry.dispose();
    }
    for (const material of this.materials) {
      material.dispose();
    }
    this.container.innerHTML = "";
  }
}

export function createModelViewer(container, spec, stepViewer) {
  return new BenchModelViewer(container, spec, stepViewer);
}
