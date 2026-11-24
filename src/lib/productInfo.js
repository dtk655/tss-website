// Turns a Shopify product (title, description HTML, options, collections) into clean, structured
// content for the product page: a lead paragraph, feature list, uses, specs, compliance badges,
// what's included, and flags such as "pick up only". Everything comes from the product's own data;
// category defaults only fill gaps with general, non-technical copy.

const EMOJI = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}️‍⃣]/gu;
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', trade: '™', reg: '®', deg: '°', hellip: '…' };
const decode = (s) => s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => {
  if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return Number.isFinite(n) ? String.fromCodePoint(n) : m; }
  return ENT[e.toLowerCase()] ?? m;
});
const tidy = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(EMOJI, '').replace(/[​-‏⁠﻿]/g, '').replace(/\s+/g, ' ').replace(/\s+([,:;!?])/g, '$1').replace(/\s+\.(?=\s|$)/g, '.').trim();

// Lines we never show: form prompts, "call/click to order" calls to action and the pickup notice (shown as a badge instead).
const NOISE = [
  /available online for pick-?up only/i, /if you require delivery/i, /fill out the form/i, /submit (an )?inquiry/i,
  /^click (the )?/i, /call (our office|our team|office) for/i, /^choose your size and color above/i, /hit the call button/i,
  /^(currently )?pick-?up only$/i, /units are in high demand/i
];
const DROP_HEAD = /^(reserve|ready to order|custom branding|custom options|availability|get a quote|order now|why choose)/i;
const USE_HEAD = /(ideal for|perfect for|great for|applications?|use cases|who it'?s for|built for)\s*:?$/i;
const LEAD_HEAD = /^(quick summary|product overview|overview|about)/i;
const SPEC_HEAD = /^(specifications?|product specs|specs|dimensions)/i;

function blocks(html) {
  let h = String(html || '');
  h = h.replace(/<!--[\s\S]*?-->/g, '').replace(/<div class="globo-formbuilder"[\s\S]*?<\/div>/gi, '');
  h = h.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
  // headings, list items and paragraph-leading bold lines followed by a break become heading/item markers
  h = h.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, (m, t) => `\n§H${tidy(t)}\n`);
  h = h.replace(/<p[^>]*>\s*<strong[^>]*>([^<]{2,60})<\/strong>\s*<br[^>]*>/gi, (m, t) => `\n§H${tidy(t)}\n`);
  h = h.replace(/<p[^>]*>(?:\s|&nbsp;|\u200E)*<strong[^>]*>([^<]{2,160}?)<\/strong>\s*<\/p>/gi, (m, t) => `\n§B${tidy(t)}\n`);
  h = h.replace(/(^|>)\s*<strong[^>]*>([^<]{2,60}?)<\/strong>\s*(?=<div|<p|<hr|\n)/gi, (m, a, t) => `${a}\n§B${tidy(t)}\n`);
  h = h.replace(/^\s*<strong[^>]*>([^<]{2,60}?)<\/strong>/gi, (m, t) => `\n§B${tidy(t)}\n`);
  h = h.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, t) => `\n§L${t.replace(/\n/g, ' ')}\n`);
  h = h.replace(/<br[^>]*>|<\/p>|<\/div>|<hr[^>]*>|<\/blockquote>|<\/ul>|<\/ol>/gi, '\n');
  const out = [];
  for (let raw of h.split('\n')) {
    let type = 'P';
    const m = raw.match(/^\s*§([HBL])/);
    if (m) { type = m[1]; raw = raw.replace(/^\s*§[HBL]/, ''); }
    // keep a leading "<strong>Label:</strong> value" structure before stripping tags
    let label = '';
    const lm = raw.match(/^\s*<strong[^>]*>([^<]{2,48}?):?\s*<\/strong>\s*:?\s*([\s\S]+)$/i);
    if (lm && tidy(lm[2])) { label = tidy(lm[1]).replace(/:$/, ''); raw = lm[2]; }
    const text = tidy(raw);
    if (!text && !label) continue;
    if (NOISE.some((re) => re.test(text))) continue;
    out.push({ type, label, text });
  }
  return out;
}

const SENT_LABEL = /^([A-Z0-9][\w&/°'’ -]{1,32}?):\s+(.{3,})$/;
const cap1 = (s) => { if (/^[^a-z]{4,}$/.test(s) && /[A-Z]{3}/.test(s)) s = s.toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1); };

export function parseDescription(html) {
  const pickupOnly = /available online for pick-?up only|pick-?up only/i.test(String(html || ''));
  const B = blocks(html);
  const sections = [];
  let cur = { head: '', items: [] };
  const push = () => { if (cur.head || cur.items.length) sections.push(cur); };
  for (const b of B) {
    const t = b.text.replace(/:$/, '');
    if (b.type === 'H' || (b.type === 'B' && !b.label && t.length <= 48 && !/[.!]$/.test(t) && !t.includes('|'))) { push(); cur = { head: t, items: [] }; continue; }
    cur.items.push(b);
  }
  push();

  let tagline = [], kicker = '';
  const allItems = sections.flatMap((s) => s.items); const lastItem = allItems[allItems.length - 1];
  const lead = [], features = [], uses = [], specLines = [];
  sections.forEach((s, si) => {
    const head = s.head;
    if (DROP_HEAD.test(head)) return;
    const isUse = USE_HEAD.test(head);
    const isSpec = SPEC_HEAD.test(head);
    for (const it of s.items) {
      let { label, text } = it;
      if (!label) { const sm = text.match(SENT_LABEL); if (sm && sm[1].split(' ').length <= 5) { label = sm[1]; text = sm[2]; } }
      if (it.type === 'B' && text.includes('|')) { tagline = text.split('|').map((x) => x.trim()).filter(Boolean); continue; }
      if (it.type === 'B' && !label && !head && text.length <= 60 && /\.$/.test(text)) { if (!kicker) kicker = text; continue; }
      // closing one-liners in bold ("Small part, big impact...") are marketing sign-offs; skip them
      if ((it.type === 'B' || /^(rugged|bright|small part|when visibility|boost)/i.test(text)) && it === lastItem && text.length > 40) continue;
      if (isUse && it.type === 'P' && text.length > 60) continue;
      if (isUse) { uses.push(cap1(label ? `${label}: ${text}` : text)); continue; }
      if (isSpec && label) { specLines.push([label, text]); continue; }
      if (label) { features.push({ label: cap1(label), text: cap1(text) }); continue; }
      if (it.type === 'L' || (head && !LEAD_HEAD.test(head) && text.length < 110)) { features.push({ label: '', text: cap1(text) }); continue; }
      if (text.length > 60) lead.push(text);
      else if (!head) features.push({ label: '', text: cap1(text) });
    }
  });
  // short "fact" lines with no headings at all (e.g. sign and reflector listings) read better as specs than prose
  const plainText = tidy(String(html || ''));
  return { pickupOnly, tagline, kicker, lead, features: dedupe(features), uses: [...new Set(uses)], specLines, text: plainText };
}

const dedupe = (arr) => { const seen = new Set(); return arr.filter((f) => { const k = (f.label + f.text).toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }); };

// ---------- specs ----------
const inch = (n) => `${n}"`;
export function deriveSpecs({ title, handle, text, options, specLines }) {
  const T = `${title} ${text}`;
  const S = [];
  const add = (k, v) => { if (v && !S.some(([a]) => a === k)) S.push([k, v]); };
  specLines.forEach(([k, v]) => add(cap1(k.toLowerCase()), v));
  const hasOpt = (re) => options.some((o) => re.test(o.name) || o.values.some((v) => re.test(v)));

  const cone = handle.match(/cone(18|28|36)/);
  if (cone) add('Height', inch(cone[1]));
  const dims3 = T.match(/(\d+(?:\.\d+)?)"\s*W?\s*[x×]\s*(\d+(?:\.\d+)?)"\s*H?\s*[x×]\s*(\d+(?:\.\d+)?\s*(?:FT|ft|")|\.\d+")/);
  const dims2 = T.match(/(\d+(?:\.\d+)?)"?\s*[x×X]\s*(\d+(?:\.\d+)?)"(?!\s*[x×])/);
  if (dims3) {
    if (/^\.\d+"/.test(dims3[3])) { add('Size', `${dims3[1]}" × ${dims3[2]}"`); add('Thickness', dims3[3]); }
    else add('Dimensions', `${dims3[1]}" × ${dims3[2]}" × ${dims3[3].replace(/\s*ft/i, ' ft')}`);
  } else if (dims2) add('Size', `${dims2[1]}" × ${dims2[2]}"`);
  const thick = T.match(/\b(\.0[0-9]{2})"/); if (thick) add('Thickness', `${thick[1]}"`);
  const len = T.match(/(\d+(?:\.\d+)?)[ -](?:foot|feet|ft)\b(?! (?:reach|working))/i) || T.match(/\b(\d+(?:\.\d+)?)FT\b/);
  if (len && !dims3 && !/bucket|tower/i.test(title)) add('Length', `${len[1]} ft`);
  const wEmpty = T.match(/(\d[\d,]*)\s*lbs?\.?\s*(?:when\s+)?empty/i), wFull = T.match(/(?:up to\s+)?(\d[\d,]*)\s*lbs?\.?\s*(?:when\s+)?(?:filled|full)/i) || T.match(/(?:filled|full)[^.\d]{0,30}?(\d[\d,]*)\s*lbs?/i);
  if (wEmpty) add('Weight empty', `${wEmpty[1]} lbs`);
  if (wFull) add('Weight filled', `${wFull[1]} lbs`);
  if (!wEmpty && !wFull && !hasOpt(/lbs?\b/i)) { const w = T.match(/\b(\d+(?:\.\d+)?)\s*-?\s*(?:lbs?|pounds)\b\.?/i); if (w) add('Weight', `${w[1]} lbs`); }
  const refl = /diamond grade/i.test(T) ? 'Diamond grade' : /hi(gh)?[- ]intensity prismatic/i.test(T) ? 'High-intensity prismatic' : /hi(gh)?[- ]intensity/i.test(T) ? 'High-intensity' : /engineer grade/i.test(T) ? 'Engineer grade' : /non-reflective/i.test(T) && !hasOpt(/reflective/i) ? 'Non-reflective' : '';
  if (refl && !hasOpt(/^style$/i)) add('Reflectivity', refl);
  const sided = T.match(/\b(double|single)[- ](?:sided|faced)\b/i); if (sided) add('Faces', sided[1].toLowerCase() === 'double' ? 'Double-sided' : 'Single-sided');
  const mat = [[/\baluminum\b/i, 'Aluminum'], [/high-density polyethylene|\bHDPE\b/i, 'HDPE plastic'], [/\bPVC\b/i, 'PVC'], [/polyester mesh/i, 'Polyester mesh'], [/\brubber\b/i, 'Rubber'], [/galvanized/i, 'Galvanized steel'], [/powder-coated/i, 'Powder-coated steel'], [/\bsteel\b/i, 'Steel'], [/\bplastic\b/i, 'Plastic']].find(([re]) => re.test(T));
  if (mat) add('Material', mat[1]);
  const code = T.match(/\b([RWMG]\d{1,2}-\d{1,2}[a-z]?)\b/); if (code) add('MUTCD code', code[1]);
  const pw = /solar/i.test(T) && /batter/i.test(T) ? 'Solar with battery backup' : /solar/i.test(T) ? 'Solar' : (T.match(/\b(D-cell|AA|6V)\b[^.]*?batter/i) || [])[0] ? `Battery (${T.match(/\b(D-cell|AA|6V)\b/)[1]})` : '';
  if (pw && !/rental/i.test(title)) add('Power', pw);
  const stripes = T.match(/(\d)"\s*(?:hi-intensity|engineer grade|silver)?\s*reflective (?:stripes|tape)/i); if (stripes) add('Stripes', `${stripes[1]}" reflective`);
  const sizes = T.match(/sizes?\s+(medium|small|large|m)\s*[–-]\s*(\d?xl)/i); if (sizes && !hasOpt(/^size$/i)) add('Sizes', `${cap1(sizes[1])} to ${sizes[2].toUpperCase()}`);
  return S;
}

// ---------- compliance and what's included ----------
export function deriveBadges(text) {
  const T = text || '';
  const B = [];
  if (/\bMASH\b/.test(T)) B.push({ k: 'MASH', d: 'Crash tested to AASHTO MASH' });
  if (/NCHRP\s*350/i.test(T)) B.push({ k: 'NCHRP 350', d: 'Crash tested to NCHRP 350' });
  if (/\bMUTCD\b/.test(T) || /\bDOT\b/.test(T)) B.push({ k: /\bMUTCD\b/.test(T) ? 'MUTCD' : 'DOT', d: /\bMUTCD\b/.test(T) ? 'Meets MUTCD guidelines' : 'DOT ready' });
  const ansi = T.match(/ANSI(?:\/ISEA)?\s*Class\s*(\d)/i); if (ansi) B.push({ k: `ANSI Class ${ansi[1]}`, d: 'ANSI/ISEA 107 high visibility' });
  else if (/\bANSI\b/.test(T)) B.push({ k: 'ANSI', d: 'Meets ANSI standards' });
  if (/\bOSHA\b/.test(T)) B.push({ k: 'OSHA', d: 'Meets OSHA guidelines' });
  return B;
}
export function deriveIncluded(text) {
  const T = text || '';
  const out = [];
  const add = (s) => { s = cap1(s.replace(/\s+/g, ' ').trim().replace(/[.!]$/, '')); if (s && s.length < 90 && !out.some((x) => x.toLowerCase() === s.toLowerCase())) out.push(s); };
  for (const m of T.matchAll(/(?:^|[.!]\s+)([^.!]{3,80}?)\s+(?:are|is)\s+included(?: with each unit)?/gi)) add(m[1]);
  for (const m of T.matchAll(/\bincludes?\s+([^.!*]{3,60}?)(?=[.!*]|$|\s{2})/gi)) add(m[1]);
  for (const m of T.matchAll(/([\w ,&-]{3,40}?)\s+included\b(?!\s+with)/gi)) { const s = m[1].trim(); if (!/\bnot$|batter/i.test(s) && !/\b(are|is)$/i.test(s)) add(s); }
  for (const m of T.matchAll(/\(([^)]{3,30}?)\s+included\)/gi)) add(m[1]);
  return out.filter((s) => !/^(the|a|an|and|with)$/i.test(s)).slice(0, 4);
}

// ---------- category defaults ----------
export const USES = {
  cones: ['Lane closures and work zones', 'Parking lots and loading docks', 'School zones and crosswalks', 'Events and perimeter control', 'Utility and emergency crews'],
  barricades: ['Road and lane closures', 'Sidewalk and pedestrian detours', 'Utility excavations', 'Events and police lines'],
  'water-filled-barriers': ['Work zone separation', 'Event and venue perimeters', 'Pedestrian channeling', 'Parking and access control'],
  'traffic-drums': ['Highway lane closures', 'Lane shifts and tapers', 'Long-term work zones', 'Detours and ramp closures'],
  'sign-shop': ['Roads and intersections', 'Parking lots and garages', 'Campuses and facilities', 'Municipal and DOT projects'],
  lights: ['Barricades and drums', 'Night lane closures', 'Roadside alerts', 'Emergency scenes'],
  reflectors: ['Concrete and water-filled barriers', 'Guardrail and walls', 'Night work zones'],
  'safety-gear': ['Roadway and flagging crews', 'Utility and public works', 'Construction sites', 'Event staff'],
  'sign-stands': ['Work zone signs', 'Detours and closures', 'Event wayfinding'],
  deliniators: ['Lane separation', 'Parking and queue lines', 'Pedestrian channeling'],
  'equipment-rentals': ['Lane closures and detours', 'Night work', 'Events and traffic management', 'Utility and roadside work'],
  'truck-rentals': ['Lane closure crews', 'Utility and signal work', 'Equipment hauling', 'Work zone protection']
};

// Accessories that go with each product (only shown when the handle exists in the catalog).
export function accessoriesFor(handle, cols) {
  const has = (c) => cols.includes(c);
  if (/^cone(18|28|36)/.test(handle)) return ['cone-weight-8lb-for-28-36-wide-body-cones', 'conebars6-10ft', 'typea-c2006', 'class3safetyvest'];
  if (handle.startsWith('waterbarrier') || handle.startsWith('tss-890')) return ['waterbarrierpin', 'tss-water-barrier-filler-cap-for-tss-590-tss-890', 'tss-water-barrier-drain-plug-with-gasket-for-tss-590-tss-890', 'top-mount-barrier-reflector-6w-x-12h-hi-intensity-white-yellow-double-sided'];
  if (handle.startsWith('a-frame-plastic-rail')) return ['a-frame-leg-end-white-blank', 'typea-c2006', 'typea-c2006solar'];
  if (handle.startsWith('a-frame-leg')) return ['a-frame-plastic-rail-2w-x-10-5h-x-6ft-double-faced-left-right-hi-intensity-orange-white-stripes', 'a-frame-plastic-rail-2w-x-10-5h-x-6ft-double-faced-left-right-engineer-grade-orange-white-stripes', 'typea-c2006'];
  if (handle.startsWith('traffic-drum')) return ['tire-ring-for-drums-25lbs', 'typea-c2006', 'typea-c2006solar'];
  if (handle.startsWith('type-iii')) return ['typea-c2006', 'typea-c2006solar'];
  if (handle.startsWith('delineator-42')) return ['delineator-base-12lb-black-octagon', 'conebars6-10ft'];
  if (handle.startsWith('delineator-base')) return ['delineator-42-tall-orange-with-2-3-white-reflective-bands-ring-top-no-bases', 'delineator-42-tall-orange-with-2-3-white-reflective-bands-knob-top-no-bases'];
  if (handle.startsWith('crashgard')) return ['crashgard-sand-barrel-with-lid-insert-200-400-700-1400lb-empty-no-sand', 'crashgard-sand-drum-lid-only', 'crashgard-sand-drum-insert-only', 'sand-drum-lifter'];
  if (has('sign-shop') || handle.startsWith('sign-')) return ['heavy-duty-tripod-sign-stand-for-rigid-signs-orange', 'green-u-channel-posts', 'u-channel-breakaway-posts', 'windmaster-4818k-2-sign-stand-with-2-rigid-brackets'];
  if (has('sign-stands')) return ['rollupcarrycase', 'flags', 'typea-c2006'];
  if (has('safety-gear')) return ['class3safetyvest', 'hardhatparent', 'parkajacket', 'bomberjacketparent'];
  if (has('reflectors')) return ['waterbarriertss590rparent', 'typea-c2006'];
  if (has('lights')) return ['typea-c2006', 'typea-c2006solar', 'type-iii-breakaway-barricade-hi-intensity-left-stripes'];
  return [];
}
