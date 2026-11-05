// Work zone planner: MUTCD-based calculations and the top-down SVG drawing.
// Planning estimate only. Not an engineered traffic control plan.

export type RoadType = 'two-lane' | 'multilane' | 'expressway';
export interface Inputs {
  road: RoadType;
  area: 'urban' | 'rural';
  speed: number;
  width: number;
  close: 1 | 2;
  side: 'right' | 'left';
  work: number;
  duration: 'day' | 'night' | 'multi';
}
export interface Item { name: string; qty: number; note?: string; handle?: string; image?: string; quote: boolean }
export interface Plan {
  inputs: Inputs;
  taperL: number; // merging taper (or one-lane taper on two-lane roads)
  shoulderTaper: number;
  buffer: number;
  spTaper: number;
  spTangent: number;
  adv: { a: number; b: number; c: number; label: string };
  termination: number;
  total: number;
  devices: { kind: 'cone' | 'drum'; total: number; spares: number };
  items: Item[];
  summary: string;
}

const BUFFER: Record<number, number> = { 20: 115, 25: 155, 30: 200, 35: 250, 40: 305, 45: 360, 50: 425, 55: 495, 60: 570, 65: 645, 70: 730 };
const CDN = 'https://cdn.shopify.com/s/files/1/0587/7701/0241/files/';
export const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

function laneCount(road: RoadType) { return road === 'expressway' ? 3 : 2; }

export function advSpacing(i: Inputs) {
  if (i.road === 'expressway') return { a: 1000, b: 1500, c: 2640, label: 'Expressway or freeway' };
  if (i.area === 'rural') return { a: 500, b: 500, c: 500, label: 'Rural road' };
  if (i.speed <= 40) return { a: 100, b: 100, c: 100, label: 'Urban, 40 mph or less' };
  return { a: 350, b: 350, c: 350, label: 'Urban, 45 mph or more' };
}

export function signsFor(i: Inputs): string[] {
  // farthest upstream first
  if (i.road === 'two-lane') return ['Road work ahead', 'Be prepared to stop', 'Flagger ahead'];
  const side = i.side === 'right' ? 'Right' : 'Left';
  const closed = i.close === 2 ? `${side} 2 lanes closed ahead` : `${side} lane closed ahead`;
  return ['Road work ahead', closed, 'Lane ends symbol'];
}

export function compute(i: Inputs): Plan {
  const S = i.speed, W = i.width;
  const twoLane = i.road === 'two-lane';
  const close = twoLane || i.road === 'multilane' ? 1 : i.close;
  const merge = S <= 40 ? (W * S * S) / 60 : W * S;
  const taperL = twoLane ? (S <= 30 ? 50 : 100) : merge;
  const buffer = BUFFER[S] ?? BUFFER[Math.min(70, Math.max(20, Math.round(S / 5) * 5))];
  const spTaper = twoLane ? 20 : S;
  const spTangent = 2 * S;
  const adv = advSpacing(i);
  const termination = 100 * close;

  // channelizing devices
  let n = Math.ceil(taperL / spTaper) + 1;
  if (close === 2) n += Math.ceil((2 * merge) / spTangent) + 1 + Math.ceil(merge / spTaper) + 1;
  n += Math.ceil((buffer + i.work) / spTangent) + 1;
  n += Math.ceil(termination / 20) + 1;
  const taperDevices = (Math.ceil(taperL / spTaper) + 1) * (close === 2 ? 2 : 1);
  const spares = Math.ceil(n * 0.1);
  const useDrums = S >= 45 || i.duration !== 'day';
  const kind: 'cone' | 'drum' = useDrums ? 'drum' : 'cone';

  // signs
  const approachSigns = signsFor(i);
  const sides = i.road === 'expressway' ? 2 : 1; // expressways: sign both shoulders
  const approaches = twoLane ? 2 : 1;
  const signCount = approachSigns.length * sides * approaches + approaches; // + END ROAD WORK per approach

  const items: Item[] = [];
  if (kind === 'drum') {
    items.push({ name: 'Traffic drums with tire rings', qty: n + spares, note: `${n} placed plus ${spares} spares`, handle: 'traffic-drum-4-6-hi-intensity-reflective-stripes-w-tire-ring', image: CDN + 'DRUMWTIREHI_NO_BG.svg', quote: true });
  } else if (S >= 40) {
    items.push({ name: '36 in. reflective traffic cones', qty: n + spares, note: `${n} placed plus ${spares} spares`, handle: 'cone36inch', quote: true });
  } else {
    items.push({ name: '28 in. reflective traffic cones', qty: n + spares, note: `${n} placed plus ${spares} spares`, handle: 'cone28inch', image: CDN + 'CONE_NO_BG.svg', quote: true });
  }
  for (const s of approachSigns) {
    const label = s === 'Lane ends symbol' ? 'Lane ends symbol sign (W4-2)' : `${s.toUpperCase()} sign`;
    items.push({ name: label, qty: sides * approaches, note: twoLane ? 'One per direction' : sides === 2 ? 'Both shoulders' : undefined, quote: true });
  }
  items.push({ name: 'END ROAD WORK sign', qty: approaches, quote: true });
  items.push({ name: 'Sign stands for roll-up signs', qty: signCount, note: 'One per sign', handle: 'k-stand-for-roll-up-signs-univeral-clamp-bracket', quote: true });
  if (!twoLane) items.push({ name: 'Arrow board', qty: close, note: close === 2 ? 'One at the start of each taper' : 'At the start of the taper', handle: 'arrow-board', image: CDN + 'Copy_of_Copy_of_Copy_of_Untitled_6.png', quote: true });
  if (S >= 45) items.push({ name: 'Truck mounted attenuator (TMA)', qty: 1, note: 'Recommended at 45 mph and up', handle: 'truck-mounted-attenuator-tma', image: CDN + 'TMA_NO_BG_2.png', quote: true });
  if (i.duration !== 'day') items.push({ name: 'Type A/C warning lights', qty: signCount + taperDevices, note: 'One per sign and one per taper device', handle: 'typea-c2006', quote: true });
  if (twoLane) items.push({ name: 'ATSSA-certified flaggers', qty: 2, note: 'Crew service. One at each end, more for side streets', quote: false });

  const advTotal = adv.a + adv.b + adv.c;
  const transition = close === 2 ? taperL + 2 * merge + merge : taperL;
  const total = advTotal * approaches + transition + buffer + i.work + termination;

  const roadName = { 'two-lane': 'Two-lane, two-way road', multilane: 'Multilane road', expressway: 'Expressway or highway' }[i.road];
  const durName = { day: 'daytime, short-term', night: 'overnight', multi: 'multi-day' }[i.duration];
  const closing = twoLane ? 'one lane with flaggers alternating traffic' : `the ${i.side} ${close === 2 ? '2 lanes' : 'lane'}`;
  const devName = kind === 'drum' ? 'drums' : 'cones';
  const equip = items.map((it) => `${it.qty} × ${it.name}`).join('; ');
  const summary =
    `${roadName}, ${S} mph, ${W} ft lanes${i.road !== 'expressway' ? `, ${i.area}` : ''}. Closing ${closing} for ${fmt(i.work)} ft of work, ${durName}. ` +
    `${twoLane ? 'One-lane taper' : 'Merging taper'} ${fmt(taperL)} ft, buffer ${fmt(buffer)} ft, ${devName} every ${spTaper} ft in tapers and ${spTangent} ft along the work. ` +
    `Advance signs at ${fmt(adv.a)} / ${fmt(adv.b)} / ${fmt(adv.c)} ft. Total zone about ${fmt(total)} ft. Equipment: ${equip}.`;

  return { inputs: { ...i, close }, taperL, shoulderTaper: merge / 3, buffer, spTaper, spTangent, adv, termination, total, devices: { kind, total: n, spares }, items, summary };
}

/* ------------------------------------------------------------------ */
/* Drawing                                                             */
/* ------------------------------------------------------------------ */

interface Seg { key: string; ft: number; px: number; ft0: number; px0: number }
const LH = 46; // lane height in px
const SH = 22; // shoulder

function gapPx(ft: number) { return 64 + 3.2 * Math.sqrt(ft); }
function zonePx(ft: number) { return 56 + 7.5 * Math.sqrt(ft); }

export function render(plan: Plan): { svg: string; width: number; height: number } {
  const i = plan.inputs;
  const twoLane = i.road === 'two-lane';
  const lanes = laneCount(i.road);
  const close = plan.inputs.close;
  const merge = i.speed <= 40 ? (i.width * i.speed * i.speed) / 60 : i.width * i.speed;
  const { a, b, c } = plan.adv;

  // ---- build segments along the road, left to right, in feet with taper start = 0
  const segDefs: { key: string; ft: number; px: number }[] = [];
  segDefs.push({ key: 'lead', ft: 150, px: 60 });
  segDefs.push({ key: 'advC', ft: c, px: gapPx(c) });
  segDefs.push({ key: 'advB', ft: b, px: gapPx(b) });
  segDefs.push({ key: 'advA', ft: a, px: gapPx(a) });
  segDefs.push({ key: 'taper1', ft: plan.taperL, px: zonePx(plan.taperL) });
  if (close === 2) {
    segDefs.push({ key: 'tangent', ft: 2 * merge, px: zonePx(2 * merge) * 0.8 });
    segDefs.push({ key: 'taper2', ft: merge, px: zonePx(merge) });
  }
  segDefs.push({ key: 'buffer', ft: plan.buffer, px: zonePx(plan.buffer) });
  segDefs.push({ key: 'work', ft: i.work, px: zonePx(i.work) });
  segDefs.push({ key: 'term', ft: plan.termination, px: zonePx(plan.termination) });
  if (twoLane) {
    segDefs.push({ key: 'oppA', ft: a, px: gapPx(a) });
    segDefs.push({ key: 'oppB', ft: b, px: gapPx(b) });
    segDefs.push({ key: 'oppC', ft: c, px: gapPx(c) });
    segDefs.push({ key: 'tail', ft: 150, px: 60 });
  } else {
    segDefs.push({ key: 'end', ft: 300, px: 110 });
    segDefs.push({ key: 'tail', ft: 150, px: 40 });
  }
  const advFt = a + b + c + 150;
  const segs: Seg[] = [];
  let ftCur = -advFt, pxCur = 30;
  for (const s of segDefs) { segs.push({ ...s, ft0: ftCur, px0: pxCur }); ftCur += s.ft; pxCur += s.px; }
  const width = Math.round(pxCur + 30);
  const X = (ft: number) => {
    for (const s of segs) if (ft <= s.ft0 + s.ft + 1e-6) return s.px0 + (Math.max(0, ft - s.ft0) / s.ft) * s.px;
    const l = segs[segs.length - 1]; return l.px0 + l.px;
  };
  const seg = (k: string) => segs.find((s) => s.key === k)!;

  // ---- vertical layout
  const right0 = twoLane || i.side === 'right';
  // label rows are only needed on a side that has signs
  const topSigns = twoLane || i.road === 'expressway' || !right0;
  const botSigns = twoLane || i.road === 'expressway' || right0;
  const top = topSigns ? 74 : 22;
  const roadTop = top + SH;
  const roadBot = roadTop + lanes * LH;
  const shBot = roadBot + SH;
  const dimY = shBot + (botSigns ? 78 : 30);
  const height = dimY + 52;

  const right = right0;
  const edge = right ? roadBot : roadTop; // outer edge of closed lane(s)
  const dir = right ? -1 : 1; // direction from edge towards open lanes
  const bnd = (j: number) => edge + dir * j * LH; // boundary after closing j lanes
  const inset = (y: number) => y - dir * 5; // nudge devices into the closed side

  const out: string[] = [];
  out.push(`<defs>
    <pattern id="wzHatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#3a3324"/><rect width="4" height="10" fill="#f2b705" opacity=".55"/></pattern>
    <radialGradient id="wzCone" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#d9520a"/></radialGradient>
  </defs>`);

  // ---- ground and road
  out.push(`<rect x="0" y="${top - 30}" width="${width}" height="${shBot - top + 60}" fill="#5c6a4a" opacity=".22"/>`);
  out.push(`<rect x="0" y="${top}" width="${width}" height="${shBot - top}" fill="#4a4f56"/>`); // shoulders
  out.push(`<rect x="0" y="${roadTop}" width="${width}" height="${lanes * LH}" fill="#33373d"/>`);
  out.push(`<line x1="0" x2="${width}" y1="${roadTop}" y2="${roadTop}" stroke="${twoLane ? '#f7f7f2' : '#f2b705'}" stroke-width="2.5"/>`);
  out.push(`<line x1="0" x2="${width}" y1="${roadBot}" y2="${roadBot}" stroke="#f7f7f2" stroke-width="2.5"/>`);
  for (let k = 1; k < lanes; k++) {
    const y = roadTop + k * LH;
    if (twoLane) {
      out.push(`<line x1="0" x2="${width}" y1="${y - 2}" y2="${y - 2}" stroke="#f2b705" stroke-width="2"/><line x1="0" x2="${width}" y1="${y + 2}" y2="${y + 2}" stroke="#f2b705" stroke-width="2"/>`);
    } else {
      out.push(`<line x1="0" x2="${width}" y1="${y}" y2="${y}" stroke="#f7f7f2" stroke-width="2.5" stroke-dasharray="22 30"/>`);
    }
  }

  // ---- travel direction arrows + cars in open lanes
  const laneMid = (k: number) => roadTop + k * LH + LH / 2;
  const closedIdx = new Set<number>();
  for (let j = 0; j < close; j++) closedIdx.add(right ? lanes - 1 - j : j);
  for (let k = 0; k < lanes; k++) {
    const westbound = twoLane && k === 0;
    const y = laneMid(k);
    const xs = westbound ? [X(seg('work').ft0) + 20, X(-a) + 10] : [44, X(-a - b) + 10];
    for (const x of xs) out.push(car(x, y, westbound ? -1 : 1, k));
    if (!closedIdx.has(k) && !twoLane) out.push(car(X(seg('work').ft0) + 30, y, 1, k + 2));
  }

  // ---- work area
  const wk = seg('work');
  const yWork1 = Math.min(edge, bnd(close)), yWork2 = Math.max(edge, bnd(close));
  out.push(`<rect x="${X(wk.ft0)}" y="${yWork1 + 4}" width="${wk.px}" height="${yWork2 - yWork1 - 8}" fill="url(#wzHatch)" rx="3"/>`);
  out.push(excavator(X(wk.ft0) + wk.px * 0.55, (yWork1 + yWork2) / 2));
  out.push(worker(X(wk.ft0) + wk.px * 0.25, (yWork1 + yWork2) / 2 - 6));
  out.push(worker(X(wk.ft0) + wk.px * 0.32, (yWork1 + yWork2) / 2 + 8));

  // ---- device line (channelizers)
  type Pt = { ft: number; y: number; sp: number };
  const pieces: Pt[][] = [];
  const tp1 = seg('taper1');
  pieces.push([{ ft: tp1.ft0, y: edge, sp: plan.spTaper }, { ft: tp1.ft0 + tp1.ft, y: inset(bnd(1)), sp: plan.spTaper }]);
  if (close === 2) {
    const tg = seg('tangent'), t2 = seg('taper2');
    pieces.push([{ ft: tg.ft0, y: inset(bnd(1)), sp: plan.spTangent }, { ft: tg.ft0 + tg.ft, y: inset(bnd(1)), sp: plan.spTangent }]);
    pieces.push([{ ft: t2.ft0, y: inset(bnd(1)), sp: plan.spTaper }, { ft: t2.ft0 + t2.ft, y: inset(bnd(2)), sp: plan.spTaper }]);
  }
  const bf = seg('buffer'), tm = seg('term');
  pieces.push([{ ft: bf.ft0, y: inset(bnd(close)), sp: plan.spTangent }, { ft: wk.ft0 + wk.ft, y: inset(bnd(close)), sp: plan.spTangent }]);
  pieces.push([{ ft: tm.ft0, y: inset(bnd(close)), sp: 20 }, { ft: tm.ft0 + tm.ft, y: edge, sp: 20 }]);

  const devs: { x: number; y: number }[] = [];
  for (const [p, q] of pieces) {
    const len = q.ft - p.ft;
    const n = Math.max(1, Math.ceil(len / p.sp));
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      const ft = p.ft + len * t;
      const x = X(ft), y = p.y + (q.y - p.y) * t;
      if (devs.length && Math.abs(devs[devs.length - 1].x - x) < 0.5) continue;
      devs.push({ x, y });
    }
  }
  const drum = plan.devices.kind === 'drum';
  const delayStep = Math.min(14, 900 / Math.max(devs.length, 1));
  devs.forEach((d, k) => {
    out.push(`<g class="wz-dev" style="--d:${Math.round(k * delayStep)}ms" transform="translate(${d.x.toFixed(1)} ${d.y.toFixed(1)})">${drum
      ? `<circle r="5.6" fill="#f26a1b" stroke="#fff" stroke-width="1.6"/><circle r="2.2" fill="#f7f7f2"/>`
      : `<circle r="4.6" fill="url(#wzCone)"/><circle r="2.6" fill="none" stroke="#fff" stroke-width="1.3"/><circle r="1" fill="#1d2024"/>`}</g>`);
  });

  // ---- arrow boards and TMA
  if (!twoLane) {
    const abY1 = right ? roadBot + SH / 2 : roadTop - SH / 2;
    out.push(arrowBoard(X(tp1.ft0) - 6, abY1, right));
    if (close === 2) out.push(arrowBoard(X(seg('taper2').ft0) - 6, (bnd(1) + edge) / 2 + dir * 0, right));
  }
  if (i.speed >= 45) {
    const tmaX = X(bf.ft0 + bf.ft * 0.72);
    out.push(tma(tmaX, (bnd(close - 1) + bnd(close)) / 2));
  }
  if (twoLane) {
    out.push(flagger(X(tp1.ft0) - 10, roadBot + SH / 2));
    out.push(flagger(X(tm.ft0 + tm.ft) + 12, roadTop - SH / 2));
  }

  // ---- signs
  const names = signsFor(i);
  const ySignBot = roadBot + SH / 2, ySignTop = roadTop - SH / 2;
  const signFts = [-(a + b + c), -(a + b), -a];
  const signGlyphs: string[] = [];
  const labels: string[] = [];
  const placeSign = (ft: number, y: number, label: string, below: boolean, row: number, mirror = false) => {
    const x = X(ft);
    signGlyphs.push(signGlyph(x, y, label === 'End road work'));
    const ly = below ? shBot + 18 + row * 18 : top - 10 - row * 18;
    labels.push(`<line x1="${x}" x2="${x}" y1="${below ? y + 8 : y - 8}" y2="${below ? ly - 11 : ly + 4}" stroke="#9aa1a9" stroke-width="1" stroke-dasharray="2 3"/>`);
    labels.push(`<text x="${x}" y="${ly}" text-anchor="${mirror ? 'end' : 'start'}" dx="${mirror ? 4 : -4}" class="wz-lbl">${label}</text>`);
  };
  const mainBelow = right;
  names.forEach((nm, k) => placeSign(signFts[k], mainBelow ? ySignBot : ySignTop, nm, mainBelow, k % 3));
  if (i.road === 'expressway') names.forEach((nm, k) => placeSign(signFts[k], mainBelow ? ySignTop : ySignBot, nm, !mainBelow, k % 3));
  if (twoLane) {
    const base = tm.ft0 + tm.ft;
    [base + a + b + c, base + a + b, base + a].forEach((ft, k) => placeSign(ft, ySignTop, names[k], false, k % 3, true));
    placeSign(-(a + b + c) + 60, ySignTop, 'End road work', false, 0, false);
    placeSign(base + 60, ySignBot, 'End road work', true, 0, true);
  } else {
    placeSign(tm.ft0 + tm.ft + 220, mainBelow ? ySignBot : ySignTop, 'End road work', mainBelow, 0, true);
  }
  out.push(signGlyphs.join(''));
  out.push(labels.join(''));

  // ---- zone dimension bars
  const zones: { label: string; from: number; to: number; ft: number }[] = [];
  zones.push({ label: 'Advance warning area', from: seg('advC').ft0, to: 0, ft: a + b + c });
  const transEnd = close === 2 ? seg('taper2').ft0 + seg('taper2').ft : tp1.ft0 + tp1.ft;
  zones.push({ label: 'Transition', from: 0, to: transEnd, ft: transEnd });
  zones.push({ label: 'Buffer', from: bf.ft0, to: bf.ft0 + bf.ft, ft: bf.ft });
  zones.push({ label: 'Work area', from: wk.ft0, to: wk.ft0 + wk.ft, ft: wk.ft });
  zones.push({ label: 'Termination', from: tm.ft0, to: tm.ft0 + tm.ft, ft: tm.ft });
  if (twoLane) zones.push({ label: 'Advance warning, opposite direction', from: tm.ft0 + tm.ft, to: tm.ft0 + tm.ft + a + b + c, ft: a + b + c });
  zones.forEach((z, k) => {
    const x1 = X(z.from) + 2, x2 = X(z.to) - 2;
    const mid = (x1 + x2) / 2;
    const color = z.label === 'Work area' ? '#f2b705' : z.label === 'Buffer' ? '#9aa1a9' : z.label === 'Transition' ? '#f26a1b' : '#c5c9cf';
    out.push(`<g class="wz-dim"><line x1="${x1}" x2="${x2}" y1="${dimY}" y2="${dimY}" stroke="${color}" stroke-width="3"/>
      <line x1="${x1}" x2="${x1}" y1="${dimY - 6}" y2="${dimY + 6}" stroke="${color}" stroke-width="2"/><line x1="${x2}" x2="${x2}" y1="${dimY - 6}" y2="${dimY + 6}" stroke="${color}" stroke-width="2"/>
      <text x="${mid}" y="${dimY + 22}" text-anchor="middle" class="wz-zone">${z.label}</text>
      <text x="${mid}" y="${dimY + 39}" text-anchor="middle" class="wz-ft">${fmt(z.ft)} ft</text></g>`);
    void k;
  });

  return { svg: out.join('\n'), width, height };
}

function car(x: number, y: number, d: number, seed: number) {
  const colors = ['#d8dbe0', '#7b8794', '#2f6fb3', '#b8c0c8', '#8a2f2f'];
  const c = colors[seed % colors.length];
  return `<g transform="translate(${x} ${y}) scale(${d} 1)"><rect x="-13" y="-8" width="26" height="16" rx="4" fill="${c}"/><rect x="2" y="-6" width="7" height="12" rx="2" fill="#1d2024" opacity=".55"/><rect x="-10" y="-6" width="5" height="12" rx="1.5" fill="#1d2024" opacity=".4"/></g>`;
}
function excavator(x: number, y: number) {
  return `<g transform="translate(${x} ${y})"><rect x="-16" y="-10" width="30" height="20" rx="3" fill="#f2b705" stroke="#1d2024" stroke-width="1.5"/><rect x="-6" y="-6" width="10" height="12" rx="1.5" fill="#1d2024" opacity=".7"/><path d="M14 0h18l6 -6" stroke="#f2b705" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
}
function worker(x: number, y: number) {
  return `<g transform="translate(${x} ${y})"><circle r="5.5" fill="#c7f000" stroke="#1d2024" stroke-width="1.2"/><circle r="2.6" fill="#f26a1b"/></g>`;
}
function flagger(x: number, y: number) {
  return `<g transform="translate(${x} ${y})"><circle r="6" fill="#c7f000" stroke="#1d2024" stroke-width="1.3"/><circle r="2.8" fill="#f26a1b"/><g transform="translate(9 -9)"><line x1="0" y1="8" x2="0" y2="0" stroke="#1d2024" stroke-width="1.6"/><polygon points="-4,-6 4,-6 7,-2 7,3 4,6 -4,6 -7,3 -7,-2" fill="#b60606" stroke="#fff" stroke-width="1"/></g></g>`;
}
function arrowBoard(x: number, y: number, right: boolean) {
  // arrow points across the road, towards the open lane(s)
  const r = right ? -90 : 90;
  return `<g transform="translate(${x} ${y})"><rect x="-12" y="-9" width="24" height="18" rx="2" fill="#111" stroke="#f2b705" stroke-width="1.5"/><g transform="rotate(${r})"><path d="M-6 0h10m-4 -4l4 4-4 4" stroke="#f2b705" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
}
function tma(x: number, y: number) {
  return `<g transform="translate(${x} ${y})"><rect x="-26" y="-11" width="12" height="22" rx="2" fill="#f2b705" stroke="#1d2024" stroke-width="1.2"/><path d="M-26 -11h12M-26 -4h12M-26 4h12M-26 11h12" stroke="#1d2024" stroke-width="1"/><rect x="-14" y="-12" width="34" height="24" rx="3" fill="#f7f7f2" stroke="#1d2024" stroke-width="1.2"/><rect x="8" y="-9" width="9" height="18" rx="1.5" fill="#1d2024" opacity=".6"/></g>`;
}
function signGlyph(x: number, y: number, end = false) {
  if (end) return `<g transform="translate(${x} ${y})"><rect x="-8" y="-5" width="16" height="10" rx="1.5" fill="#f26a1b" stroke="#1d2024" stroke-width="1.2"/></g>`;
  return `<g transform="translate(${x} ${y})"><rect x="-6.5" y="-6.5" width="13" height="13" rx="1.5" transform="rotate(45)" fill="#f26a1b" stroke="#1d2024" stroke-width="1.3"/></g>`;
}
