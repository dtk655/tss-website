// Mounts a three.js viewer into one [data-viewer3d] element. Loaded lazily.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildModel } from './models.js';

const BG = 0xecebe6;

export function mountViewer(el, state) {
  const stage = el.querySelector('.v3d__stage');
  const canvas = el.querySelector('canvas');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(32, 1, 1, 5000);
  const hemi = new THREE.HemisphereLight(0xffffff, 0xbdb9ae, 0.9);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xfff6ea, 2.1);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0004;
  key.shadow.radius = 6;
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.55);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.8);
  scene.add(rim);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.ShadowMaterial({ opacity: 0.2 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.minPolarAngle = 0.15;
  controls.autoRotate = !reduced;
  controls.autoRotateSpeed = 1.1;
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  let model = null;
  let home = { pos: new THREE.Vector3(), target: new THREE.Vector3() };
  let logoMeshes = [];
  let logoTex = null;

  function frame() {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.z -= center.z;
    model.position.y -= box.min.y;
    box.setFromObject(model);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const r = sphere.radius;
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = Math.max(camera.aspect, 0.6);
    const fit = r / Math.sin(fov / 2) * (aspect < 1 ? 1.15 / aspect : 1.05);
    const target = new THREE.Vector3(0, sphere.center.y * 0.92, 0);
    const dir = new THREE.Vector3(0.95, 0.42, 1.35).normalize();
    home = { pos: target.clone().addScaledVector(dir, fit), target };
    camera.near = r / 50; camera.far = r * 40; camera.updateProjectionMatrix();
    controls.minDistance = fit * 0.4;
    controls.maxDistance = fit * 2.2;
    // light rig scales with the model
    key.position.set(r * 1.2, r * 3.4, r * 1.5);
    key.target.position.copy(target);
    const sc = key.shadow.camera;
    sc.left = sc.bottom = -r * 1.6; sc.right = sc.top = r * 1.6; sc.near = r * 0.5; sc.far = r * 8;
    sc.updateProjectionMatrix();
    fill.position.set(-r * 2, r, r * 1.2);
    rim.position.set(-r * 0.6, r * 1.8, -r * 2.2);
    resetView();
  }

  function resetView() {
    camera.position.copy(home.pos);
    controls.target.copy(home.target);
    controls.autoRotate = !reduced;
    controls.update();
    requestRender();
  }

  function setModel(name) {
    if (model) { scene.remove(model); disposeTree(model); }
    logoMeshes = [];
    model = buildModel(name);
    scene.add(model);
    if (reduced && model.userData.staticFrame) model.userData.staticFrame();
    resize();
    frame();
    if (state.color && model.userData.setColor) model.userData.setColor(state.color);
    if (state.logo) applyLogo(state.logo);
    el.dataset.colorable = model.userData.setColor ? '1' : '';
  }

  function setColor(c) {
    state.color = c;
    model?.userData.setColor?.(c);
    requestRender();
  }

  /* ---------- logo decals ---------- */
  function clearLogo() {
    logoMeshes.forEach((m) => { m.parent?.remove(m); m.geometry.dispose(); m.material.dispose(); });
    logoMeshes = [];
    if (logoTex) { logoTex.dispose(); logoTex = null; }
  }
  function loadLogoCanvas(url, backing) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      if (!url.startsWith('data:') && !url.startsWith('blob:')) im.crossOrigin = 'anonymous';
      im.onload = () => {
        let w = im.naturalWidth || 512, h = im.naturalHeight || 512;
        const s = 1024 / Math.max(w, h);
        w = Math.round(w * s); h = Math.round(h * s);
        const pad = backing ? Math.round(Math.min(w, h) * 0.12) : 0;
        const c = document.createElement('canvas');
        c.width = w + pad * 2; c.height = h + pad * 2;
        const x = c.getContext('2d');
        if (backing) {
          x.fillStyle = backing;
          const rr = pad * 0.8;
          x.beginPath();
          x.roundRect ? x.roundRect(0, 0, c.width, c.height, rr) : x.rect(0, 0, c.width, c.height);
          x.fill();
        }
        x.drawImage(im, pad, pad, w, h);
        resolve(c);
      };
      im.onerror = () => reject(new Error('Logo image could not be loaded'));
      im.src = url;
    });
  }
  let logoJob = 0;
  async function applyLogo(url) {
    const job = ++logoJob;
    clearLogo();
    if (!url || !model?.userData.logoSpots) { requestRender(); return; }
    const spots = model.userData.logoSpots;
    const backing = spots.find((s) => s.backing)?.backing;
    let c;
    try { c = await loadLogoCanvas(url, backing); } catch (e) { el.dispatchEvent(new CustomEvent('tss:viewer-error', { detail: { message: e.message } })); return; }
    if (job !== logoJob) return;
    logoTex = new THREE.CanvasTexture(c);
    logoTex.colorSpace = THREE.SRGBColorSpace;
    logoTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const aspect = c.width / c.height;
    spots.forEach((s) => {
      let w = s.maxW, h = w / aspect;
      if (h > s.maxH) { h = s.maxH; w = h * aspect; }
      const mat = new THREE.MeshStandardMaterial({
        map: logoTex, transparent: true, alphaTest: 0.03, roughness: 0.45,
        polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4, depthWrite: false
      });
      let mesh;
      if (s.kind === 'cyl') {
        const r = s.rAt(s.y);
        const theta = w / r;
        mesh = new THREE.Mesh(new THREE.CylinderGeometry(s.rAt(s.y + h / 2), s.rAt(s.y - h / 2), h, 48, 1, true, -theta / 2, theta), mat);
        mesh.position.y = s.y;
      } else {
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
        mesh.position.set(...s.pos);
        mesh.rotation.set(...s.rot);
      }
      mesh.renderOrder = 2;
      model.add(mesh);
      logoMeshes.push(mesh);
    });
    requestRender();
  }
  function setLogo(url) {
    state.logo = url || null;
    applyLogo(state.logo);
  }

  /* ---------- keyboard orbit (arrow keys rotate, +/- zoom) ---------- */
  canvas.addEventListener('keydown', (e) => {
    const off = camera.position.clone().sub(controls.target);
    const sph = new THREE.Spherical().setFromVector3(off);
    const step = 0.12;
    let handled = true;
    switch (e.key) {
      case 'ArrowLeft': sph.theta -= step; break;
      case 'ArrowRight': sph.theta += step; break;
      case 'ArrowUp': sph.phi = Math.max(controls.minPolarAngle, sph.phi - step); break;
      case 'ArrowDown': sph.phi = Math.min(controls.maxPolarAngle, sph.phi + step); break;
      case '+': case '=': sph.radius = Math.max(controls.minDistance, sph.radius * 0.9); break;
      case '-': case '_': sph.radius = Math.min(controls.maxDistance, sph.radius * 1.1); break;
      default: handled = false;
    }
    if (!handled) return;
    e.preventDefault();
    controls.autoRotate = false;
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sph));
    controls.update();
    requestRender();
  });

  /* ---------- sizing + render loop (paused off-screen) ---------- */
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(() => { const before = camera.aspect; resize(); if (model && Math.abs(before - camera.aspect) > 0.15) frame(); requestRender(); });
  ro.observe(stage);

  const clock = new THREE.Clock();
  let visible = false;
  let dirty = true;
  function requestRender() { dirty = true; }
  controls.addEventListener('change', requestRender);
  function loop() {
    const moving = controls.update();
    const t = clock.getElapsedTime();
    if (model?.userData.tick && !reduced) { model.userData.tick(t); dirty = true; }
    if (controls.autoRotate || moving || dirty) { renderer.render(scene, camera); dirty = false; }
  }
  function setRunning(on) { renderer.setAnimationLoop(on ? loop : null); }
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; setRunning(visible && !document.hidden); }, { threshold: 0.01 });
  io.observe(el);
  document.addEventListener('visibilitychange', () => setRunning(visible && !document.hidden));

  setModel(state.model);
  el.classList.add('is-ready');
  return { setModel, setColor, setLogo, reset: resetView };
}

function disposeTree(o) {
  o.traverse((n) => {
    if (n.geometry) n.geometry.dispose();
    const mats = Array.isArray(n.material) ? n.material : n.material ? [n.material] : [];
    mats.forEach((m) => { m.map?.dispose?.(); m.dispose(); });
  });
}
