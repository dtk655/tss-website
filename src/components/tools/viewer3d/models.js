// Procedural three.js models of TSS products. Units are inches; the viewer frames
// each model from its bounding box. Every builder returns a THREE.Group with:
//   userData.setColor(name)  (optional) recolors the main body
//   userData.tick(t)         (optional) per-frame animation, t in seconds
import * as THREE from 'three';

export const COLOR_HEX = {
  Orange: 0xf26a1b,
  Lime: 0xc6e33b,
  'Dark Green': 0x1f5d3a,
  'Navy Blue': 0x1f2f5c,
  Pink: 0xff6fae,
  Red: 0xc8102e,
  'Sky Blue': 0x6cc4ee,
  White: 0xf7f7f2,
  Yellow: 0xf6d10b,
  Blue: 0x1f5fb8
};

export function resolveColor(c) {
  if (typeof c === 'number') return c;
  if (typeof c === 'string' && c.startsWith('#')) return parseInt(c.slice(1), 16);
  return COLOR_HEX[c] ?? COLOR_HEX.Orange;
}

const plastic = (color, rough = 0.55) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
const rubber = () => new THREE.MeshStandardMaterial({ color: 0x1b1d20, roughness: 0.9 });
const metal = (color = 0x9aa0a6) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.7 });
// Retroreflective sheeting: bright white with a faint self-glow so it reads as "reflective".
const reflective = () => new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.25, metalness: 0.1, emissive: 0xffffff, emissiveIntensity: 0.18 });

function shadowAll(group) {
  group.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return group;
}

function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/* ---------------- 28" traffic cone ---------------- */
function cone() {
  const g = new THREE.Group();
  const baseH = 1.6;
  const base = new THREE.Mesh(
    new THREE.ExtrudeGeometry(roundedRectShape(14, 14, 2), { depth: baseH, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.3, bevelSegments: 2 }),
    rubber()
  );
  base.rotation.x = -Math.PI / 2;
  g.add(base);
  // raised collar where the body meets the base
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.9, 1.2, 48), rubber());
  ring.position.y = baseH + 0.9;
  g.add(ring);

  const H = 28, r0 = 5.6, r1 = 1.05;
  const radiusAt = (y) => r0 + (r1 - r0) * ((y - baseH) / (H - baseH));
  const pts = [];
  pts.push(new THREE.Vector2(0.01, baseH));
  for (let i = 0; i <= 24; i++) { const y = baseH + (H - 0.6 - baseH) * (i / 24); pts.push(new THREE.Vector2(radiusAt(y), y)); }
  pts.push(new THREE.Vector2(r1 * 0.85, H - 0.2));
  pts.push(new THREE.Vector2(0.01, H));
  const bodyMat = plastic(COLOR_HEX.Orange, 0.5);
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 64), bodyMat);
  g.add(body);

  // reflective collars: 6" upper and 4" lower
  const collar = (y0, y1) => {
    const p = [];
    for (let i = 0; i <= 6; i++) { const y = y0 + (y1 - y0) * (i / 6); p.push(new THREE.Vector2(radiusAt(y) + 0.06, y)); }
    return new THREE.Mesh(new THREE.LatheGeometry(p, 64), reflective());
  };
  g.add(collar(18.2, 24.2));
  g.add(collar(12.2, 16.2));

  g.userData.setColor = (c) => { bodyMat.color.setHex(resolveColor(c)); };
  // logo: lower body, below the 4" collar (widest printable area)
  g.userData.logoSpots = [{ kind: 'cyl', y: 7.4, maxW: 8.5, maxH: 6.4, rAt: (y) => radiusAt(y) + 0.09 }];
  return shadowAll(g);
}

/* ---------------- Traffic drum with tire ring ---------------- */
function drum() {
  const g = new THREE.Group();
  const H = 42, rBot = 11.4, rTop = 10.2, y0 = 3;
  const rAt = (y) => rBot + (rTop - rBot) * ((y - y0) / (H - y0));

  // tire ring base
  const tire = new THREE.Mesh(new THREE.TorusGeometry(13.2, 3.1, 20, 64), rubber());
  tire.rotation.x = Math.PI / 2;
  tire.position.y = 3;
  g.add(tire);
  const tread = new THREE.Mesh(new THREE.CylinderGeometry(15.8, 15.8, 1.5, 64, 1, true), new THREE.MeshStandardMaterial({ color: 0x232528, roughness: 1, side: THREE.DoubleSide }));
  tread.position.y = 3;
  g.add(tread);

  // 7 bands top to bottom: orange, white, orange, white, orange, white, orange
  const bandH = (H - y0 - 4) / 7;
  const orange = plastic(COLOR_HEX.Orange, 0.45);
  for (let i = 0; i < 7; i++) {
    const top = H - 2 - i * bandH, bot = top - bandH;
    const p = [];
    // slight bulge rib at band edges like a molded drum
    for (let k = 0; k <= 8; k++) {
      const y = bot + (top - bot) * (k / 8);
      const edge = (k === 0 || k === 8) ? 0.35 : 0;
      p.push(new THREE.Vector2(rAt(y) + edge, y));
    }
    const isWhite = i % 2 === 1;
    g.add(new THREE.Mesh(new THREE.LatheGeometry(p, 72), isWhite ? reflective() : orange));
  }
  // base skirt below bands
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(rAt(y0 + 2), rBot + 0.6, 4, 72), orange);
  skirt.position.y = y0 + 2;
  g.add(skirt);
  // top cap with molded handle
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(rTop - 0.4, rTop, 2, 72), orange);
  cap.position.y = H - 1;
  g.add(cap);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(rTop - 0.4, 48, 12, 0, Math.PI * 2, 0, Math.PI / 7), orange);
  dome.scale.y = 0.6;
  dome.position.y = H - 0.2 - (rTop - 0.4) * 0.6 * Math.cos(Math.PI / 7);
  g.add(dome);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.9, 12, 32, Math.PI), orange);
  handle.position.y = H + 1.2;
  g.add(handle);
  // logo: top orange band
  const topBandMid = H - 2 - bandH / 2;
  g.userData.logoSpots = [{ kind: 'cyl', y: topBandMid, maxW: 14, maxH: bandH - 0.9, rAt: (y) => rAt(y) + 0.1 }];
  g.userData.setColor = (c) => { orange.color.setHex(resolveColor(c)); skirt.material.color.setHex(resolveColor(c)); };
  return shadowAll(g);
}

/* ---------------- Type III barricade ---------------- */
function stripeTexture(dir = 1) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 96;
  const x = c.getContext('2d');
  x.fillStyle = '#f4f6f8'; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = '#f26a1b';
  const w = 64; // stripe width on canvas (~6" on a 48" rail)
  for (let i = -4; i < 16; i++) {
    const s = i * w * 2;
    x.beginPath();
    x.moveTo(s, dir > 0 ? c.height : 0);
    x.lineTo(s + w, dir > 0 ? c.height : 0);
    x.lineTo(s + w + c.height, dir > 0 ? 0 : c.height);
    x.lineTo(s + c.height, dir > 0 ? 0 : c.height);
    x.closePath(); x.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function barricade() {
  const g = new THREE.Group();
  const W = 48, railH = 8, railT = 1.2;
  const tex = stripeTexture(1);
  const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.12 });
  const edge = plastic(0xf4f6f8, 0.5);
  const railMats = [edge, edge, edge, edge, face, face];
  [16, 32, 48].forEach((y) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(W, railH, railT), railMats);
    rail.position.set(0, y, 0);
    g.add(rail);
  });
  // uprights: square galvanized tubes, with breakaway couplers near the ground
  const tube = metal(0xb4b9bf);
  [-W / 2 + 5, W / 2 - 5].forEach((x) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(2, 58, 2), tube);
    post.position.set(x, 31, -railT / 2 - 1);
    g.add(post);
    const coupler = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3, 2.6), metal(0x6e747a));
    coupler.position.set(x, 4.5, -railT / 2 - 1);
    g.add(coupler);
    // foot: long skid running front to back
    const foot = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2, 34), tube);
    foot.position.set(x, 1, -railT / 2 - 1);
    g.add(foot);
    // diagonal brace
    const brace = new THREE.Mesh(new THREE.BoxGeometry(1.4, 22, 1.4), tube);
    brace.position.set(x, 9, -8);
    brace.rotation.x = -0.75;
    g.add(brace);
    // rubber end caps on the foot
    [-17, 17].forEach((z) => {
      const capm = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 1), rubber());
      capm.position.set(x, 1.2, -railT / 2 - 1 + z);
      g.add(capm);
    });
  });
  // rail brackets
  [16, 32, 48].forEach((y) => [-W / 2 + 5, W / 2 - 5].forEach((x) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 1.6), metal(0x6e747a));
    b.position.set(x, y, -railT / 2 - 0.4);
    g.add(b);
  }));
  // logo: centered on the top rail, on a white backing so it reads over the stripes
  g.userData.logoSpots = [{ kind: 'plane', pos: [0, 48, railT / 2 + 0.06], rot: [0, 0, 0], maxW: 20, maxH: railH - 1.2, backing: '#f4f6f8' }];
  return shadowAll(g);
}

/* ---------------- WATERCADE water-filled barrier ---------------- */
function watercade() {
  const g = new THREE.Group();
  const L = 60, H = 32, BEV = 1.4;       // overall length, height, extrude bevel (pushes walls outward)
  const bodyMat = plastic(COLOR_HEX.Orange, 0.42);

  // Jersey-style cross-section in the (z, y) plane: vertical toe, sloped lower flank,
  // near-vertical upper flank (the branding panel), rounded crown.
  const P = { base: 9.6, toeY: 3.5, breakZ: 6.6, breakY: 12, topZ: 3.9, topY: 29.5 };
  const section = (grow = 0) => {
    const s = new THREE.Shape();
    const b = P.base + grow, k = P.breakZ + grow, t = P.topZ + grow, h = H - BEV + grow;
    s.moveTo(-b, 0);
    s.lineTo(b, 0);
    s.lineTo(b, P.toeY);
    s.lineTo(k, P.breakY);
    s.lineTo(t, P.topY - (H - BEV - h));
    s.quadraticCurveTo(t - 0.6, h, 0, h);
    s.quadraticCurveTo(-t + 0.6, h, -t, P.topY - (H - BEV - h));
    s.lineTo(-k, P.breakY);
    s.lineTo(-b, P.toeY);
    s.lineTo(-b, 0);
    return s;
  };
  const len = L - 8;
  const bodyGeo = new THREE.ExtrudeGeometry(section(), { depth: len, bevelEnabled: true, bevelThickness: 4, bevelSize: BEV, bevelSegments: 8, curveSegments: 12 });
  bodyGeo.translate(0, 0, -len / 2);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.rotation.y = Math.PI / 2;
  g.add(body);

  // molded end bands
  const bandGeo = new THREE.ExtrudeGeometry(section(0.55), { depth: 2.4, bevelEnabled: true, bevelThickness: 0.5, bevelSize: BEV, bevelSegments: 3, curveSegments: 10 });
  bandGeo.translate(0, 0, -1.2);
  [-(len / 2) + 2.5, len / 2 - 2.5].forEach((x) => {
    const r = new THREE.Mesh(bandGeo, bodyMat);
    r.rotation.y = Math.PI / 2;
    r.position.x = x;
    g.add(r);
  });

  // upper-flank branding panel: angle and surface position
  const flankA = Math.atan2(P.breakZ - P.topZ, P.topY - P.breakY);
  const flankY = (P.breakY + P.topY) / 2 + 0.6;
  const flankZ = P.breakZ - (P.breakZ - P.topZ) * ((flankY - P.breakY) / (P.topY - P.breakY)) + BEV + 0.06;
  const panelW = len - 12, panelH = (P.topY - P.breakY) - 3;
  // raised molded frame around each panel
  const frameMat = bodyMat;
  [1, -1].forEach((side) => {
    const fg = new THREE.Group();
    fg.position.set(0, flankY, side * (flankZ - 0.02));
    fg.rotation.set(side * -flankA, side > 0 ? 0 : Math.PI, 0);
    const bar = (w, h, x, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.5), frameMat); m.position.set(x, y, 0); fg.add(m); };
    bar(panelW + 1.2, 0.6, 0, panelH / 2 + 0.3);
    bar(panelW + 1.2, 0.6, 0, -panelH / 2 - 0.3);
    bar(0.6, panelH, -panelW / 2 - 0.3, 0);
    bar(0.6, panelH, panelW / 2 + 0.3, 0);
    g.add(fg);
  });

  // forklift pockets through the base
  const slotMat = new THREE.MeshStandardMaterial({ color: 0x24170e, roughness: 1 });
  [-14, 14].forEach((x) => {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(8.5, 3.4, (P.base + BEV) * 2 + 0.2), slotMat);
    slot.position.set(x, 3.2, 0);
    g.add(slot);
  });

  // fill cap on the crown + drain plug at the toe
  const capMat = new THREE.MeshStandardMaterial({ color: 0x23272b, roughness: 0.6 });
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.5, 1.6, 32), capMat);
  cap.position.set(-10, H + 0.2, 0);
  g.add(cap);
  for (let i = 0; i < 8; i++) {
    const k = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.4, 0.9), capMat);
    const a = (i / 8) * Math.PI * 2;
    k.position.set(-10 + Math.cos(a) * 2.5, H + 0.2, Math.sin(a) * 2.5);
    k.rotation.y = -a;
    g.add(k);
  }
  const plug = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1, 24), capMat);
  plug.rotation.x = Math.PI / 2;
  plug.position.set(20, 7.5, P.base + BEV - 0.2);
  plug.rotation.z = 0;
  g.add(plug);

  // interlocking knuckles bridged to the body ends; steel pin through the male end
  const endX = len / 2 + 4;
  const knuckle = (sign, y) => {
    const cx = sign * (endX + 2.6);
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(4, 6.5, 5.4), bodyMat);
    bridge.position.set(sign * (endX + 0.6), y, 0);
    g.add(bridge);
    const k = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 6.5, 32), bodyMat);
    k.position.set(cx, y, 0);
    g.add(k);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 6.62, 20), slotMat);
    hole.position.set(cx, y, 0);
    g.add(hole);
    return cx;
  };
  const mx = knuckle(1, 7); knuckle(1, 23);
  knuckle(-1, 15);
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 29, 16), metal(0xc0c4c8));
  pin.position.set(mx, 16, 0);
  g.add(pin);
  const pinHead = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.8, 20), metal(0xc0c4c8));
  pinHead.position.set(mx, 30.8, 0);
  g.add(pinHead);

  // logo: the framed upper-flank panel on both sides
  g.userData.logoSpots = [
    { kind: 'plane', pos: [0, flankY, flankZ + 0.04], rot: [-flankA, 0, 0], maxW: panelW - 3, maxH: panelH - 2 },
    { kind: 'plane', pos: [0, flankY, -(flankZ + 0.04)], rot: [flankA, Math.PI, 0], maxW: panelW - 3, maxH: panelH - 2 }
  ];
  g.userData.setColor = (c) => { bodyMat.color.setHex(resolveColor(c)); };
  return shadowAll(g);
}

/* ---------------- Trailer-mounted arrow board ---------------- */
function arrowboard() {
  const g = new THREE.Group();
  const yellowPaint = new THREE.MeshStandardMaterial({ color: 0xe8b30c, roughness: 0.5, metalness: 0.2 });
  const steel = metal(0x6e747a);

  // trailer frame & bed
  const bed = new THREE.Mesh(new THREE.BoxGeometry(84, 6, 54), yellowPaint);
  bed.position.y = 22;
  g.add(bed);
  const box = new THREE.Mesh(new THREE.BoxGeometry(40, 18, 30), yellowPaint); // battery/solar box
  box.position.set(-16, 34, 0);
  g.add(box);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(42, 1.2, 32), new THREE.MeshStandardMaterial({ color: 0x1a2a44, roughness: 0.25, metalness: 0.4 }));
  lid.position.set(-16, 43.6, 0);
  lid.rotation.z = 0.1;
  g.add(lid);
  // tongue + hitch
  const tongue = new THREE.Mesh(new THREE.BoxGeometry(48, 3.5, 3.5), yellowPaint);
  tongue.position.set(-64, 21, 0);
  g.add(tongue);
  const hitch = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 3, 20), steel);
  hitch.position.set(-88, 21, 0);
  g.add(hitch);
  const jack = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 20, 12), steel);
  jack.position.set(-72, 11, 3);
  g.add(jack);
  // wheels + fenders
  [-29, 29].forEach((z) => {
    const tire = new THREE.Mesh(new THREE.TorusGeometry(9, 3.4, 16, 40), rubber());
    tire.position.set(10, 12.4, z);
    g.add(tire);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 4, 24), metal(0xbfc3c8));
    hub.rotation.x = Math.PI / 2;
    hub.position.set(10, 12.4, z);
    g.add(hub);
    const fender = new THREE.Mesh(new THREE.BoxGeometry(26, 1.2, 8), yellowPaint);
    fender.position.set(10, 25.6, z);
    g.add(fender);
    [-12.4, 12.4].forEach((dx) => {
      const lip = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5, 8), yellowPaint);
      lip.position.set(10 + dx, 23.6, z);
      g.add(lip);
    });
  });
  // stabilizer legs at the rear
  [-22, 22].forEach((z) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 20, 12), steel);
    leg.position.set(38, 11, z);
    g.add(leg);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 6), steel);
    pad.position.set(38, 0.5, z);
    g.add(pad);
  });

  // mast
  const mast = new THREE.Mesh(new THREE.BoxGeometry(5, 66, 5), yellowPaint);
  mast.position.set(24, 58, 0);
  g.add(mast);

  // sign panel 96" x 48", facing +z
  const panel = new THREE.Group();
  panel.position.set(24, 108, 3.5);
  const back = new THREE.Mesh(new THREE.BoxGeometry(96, 48, 3), new THREE.MeshStandardMaterial({ color: 0x15171a, roughness: 0.7 }));
  panel.add(back);
  const rim = new THREE.Mesh(new THREE.BoxGeometry(98, 50, 2.4), yellowPaint);
  rim.position.z = -0.6;
  panel.add(rim);

  // 15-lamp arrow (classic layout) on a grid: shaft + head pointing right
  const cells = [
    [-36, 0], [-26, 0], [-16, 0], [-6, 0], [4, 0], [14, 0], [24, 0], [34, 0],     // shaft
    [26, 8], [18, 15], [10, 21],                                                    // upper head
    [26, -8], [18, -15], [10, -21]                                                  // lower head
  ];
  cells.push([40, 0]);
  const lampOn = new THREE.MeshStandardMaterial({ color: 0xffb300, emissive: 0xffa000, emissiveIntensity: 2.2, roughness: 0.3 });
  const lampOff = new THREE.MeshStandardMaterial({ color: 0x3a2c12, emissive: 0x000000, roughness: 0.4 });
  const lampGeo = new THREE.CylinderGeometry(2.6, 2.6, 1.4, 24);
  const hoodGeo = new THREE.CylinderGeometry(3.2, 3.2, 2.4, 24, 1, true, Math.PI * 0.15, Math.PI * 0.7);
  const hoodMat = new THREE.MeshStandardMaterial({ color: 0x0c0d0f, side: THREE.DoubleSide, roughness: 0.8 });
  const lamps = [];
  cells.forEach(([x, y]) => {
    const l = new THREE.Mesh(lampGeo, lampOn);
    l.rotation.x = Math.PI / 2;
    l.position.set(x, y, 1.9);
    panel.add(l);
    lamps.push(l);
    const hood = new THREE.Mesh(hoodGeo, hoodMat);
    hood.rotation.set(Math.PI / 2, 0, 0);
    hood.position.set(x, y, 2.6);
    panel.add(hood);
  });
  g.add(panel);

  // flashing: on 0.6s / off 0.4s like a real arrow board in flashing-arrow mode
  let lastOn = null;
  g.userData.tick = (t) => {
    const on = (t % 1) < 0.6;
    if (on === lastOn) return;
    lastOn = on;
    lamps.forEach((l) => { l.material = on ? lampOn : lampOff; });
  };
  // logo: back of the sign panel
  g.userData.logoSpots = [{ kind: 'plane', pos: [24, 108, 3.5 - 1.8 - 0.08], rot: [0, Math.PI, 0], maxW: 78, maxH: 38 }];
  g.userData.staticFrame = () => { lamps.forEach((l) => { l.material = lampOn; }); };
  return shadowAll(g);
}

export const BUILDERS = { cone, drum, barricade, watercade, arrowboard };
export function buildModel(name) {
  const fn = BUILDERS[name] || cone;
  return fn();
}
