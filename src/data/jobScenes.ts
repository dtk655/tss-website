// Scene SVG strings for the lane closure header job showcase.
export const W = 400, H = 190;
const cone = (x: number, y: number, i: number, s = 1) =>
  `<g class="jb__pop" style="--c:${i}"><path d="M${x - 5 * s} ${y + 5 * s} L${x} ${y - 9 * s} L${x + 5 * s} ${y + 5 * s} Z" fill="#ff6a00"/><rect x="${x - 3.2 * s}" y="${y - 3 * s}" width="${6.4 * s}" height="${2.6 * s}" fill="#fff"/><rect x="${x - 6.5 * s}" y="${y + 4.6 * s}" width="${13 * s}" height="${2.8 * s}" rx="1" fill="#ff6a00"/></g>`;
const road = (y: number, h: number, lanes: number, two = false, dark = false) => {
  let g = `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${dark ? '#24282d' : '#3a3f45'}"/><line x1="0" x2="${W}" y1="${y + 2}" y2="${y + 2}" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><line x1="0" x2="${W}" y1="${y + h - 2}" y2="${y + h - 2}" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>`;
  const lh = h / lanes;
  for (let i = 1; i < lanes; i++) {
    const yy = y + i * lh;
    g += two ? `<line x1="0" x2="${W}" y1="${yy - 1.6}" y2="${yy - 1.6}" stroke="#f5b800" stroke-width="2"/><line x1="0" x2="${W}" y1="${yy + 1.6}" y2="${yy + 1.6}" stroke="#f5b800" stroke-width="2"/>`
      : `<line x1="0" x2="${W}" y1="${yy}" y2="${yy}" stroke="#fff" stroke-opacity=".85" stroke-width="2" stroke-dasharray="16 16"/>`;
  }
  return g;
};
const car = (x: number, y: number, color = '#5b6670', cls = '') => `<g class="${cls}"><rect x="${x}" y="${y}" width="40" height="18" rx="5" fill="${color}"/><rect x="${x + 22}" y="${y + 3}" width="11" height="12" rx="2" fill="#cfe3f3" opacity=".8"/></g>`;
const truck = (x: number, y: number, cls = '') => `<g class="${cls}" transform="translate(${x} ${y})"><rect x="0" y="0" width="22" height="22" rx="2" fill="#f5b800"/><path d="M2 2 l9 9 l-9 9 M10 2 l9 9 l-9 9" stroke="#14171a" stroke-width="3" fill="none"/><rect x="22" y="2" width="48" height="18" rx="2" fill="#b60606"/><rect x="70" y="4" width="16" height="14" rx="3" fill="#d21a1a"/><rect x="77" y="6" width="7" height="10" rx="1" fill="#cfe3f3" opacity=".85"/></g>`;
const arrowBoard = (x: number, y: number) => {
  let lamps = '';
  [0, 1, 2].forEach((n) => {
    const cx = x + 12 + n * 14;
    const pts = [[-4, -6], [0, -3], [4, 0], [0, 3], [-4, 6]];
    lamps += `<g class="jb__seq" style="--n:${n}">${pts.map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${y + 11 + dy * 1.1}" r="1.9" fill="#ffb300"/>`).join('')}</g>`;
  });
  return `<g><rect x="${x}" y="${y}" width="52" height="22" rx="3" fill="#111315"/>${lamps}<rect x="${x + 24}" y="${y + 22}" width="4" height="10" fill="#2a2e33"/></g>`;
};
const person = (x: number, y: number, extra = '') => `<g><circle cx="${x}" cy="${y}" r="6" fill="#e9c39b"/><rect x="${x - 4.5}" y="${y - 9}" width="9" height="4" rx="2" fill="#f5b800"/><rect x="${x - 7}" y="${y + 6}" width="14" height="20" rx="4" fill="#ff7a00"/><rect x="${x - 7}" y="${y + 12}" width="14" height="2.4" fill="#e9ff70"/><rect x="${x - 6}" y="${y + 26}" width="4.5" height="14" fill="#2c3a4d"/><rect x="${x + 1.5}" y="${y + 26}" width="4.5" height="14" fill="#2c3a4d"/>${extra}</g>`;

export const scenes = [
  {
    key: 'lane', t: 'Lane and road closures', d: 'Single lanes to full closures with detours, set to MUTCD and agency standards.',
    cta: ['Plan this closure', '/tools/lane-closure-plan?work=right'],
    svg: `${road(70, 96, 3)}${[0, 1, 2, 3, 4, 5].map((k) => cone(70 + k * 26, 162 - k * 5.6, k)).join('')}${[0, 1, 2, 3, 4].map((k) => cone(232 + k * 34, 134, 6 + k)).join('')}<rect class="jb__fade" x="250" y="139" width="120" height="24" rx="4" fill="#b60606"/>${car(20, 82, '#5b6670', 'jb__drive')}${car(-60, 114, '#7d8a96', 'jb__drive jb__drive--2')}`
  },
  {
    key: 'flag', t: 'Flagging operations', d: 'ATSSA-certified flaggers running one-lane, two-way traffic safely.',
    cta: ['Plan a flagging job', '/tools/lane-closure-plan?work=flagging'],
    svg: `${road(86, 72, 2, true)}${[0, 1, 2, 3, 4, 5, 6].map((k) => cone(160 + k * 26, 122, k)).join('')}<rect class="jb__fade" x="175" y="126" width="150" height="26" rx="4" fill="#b60606"/>${car(62, 132, '#5b6670')}${person(130, 92, `<g class="jb__stop"><rect x="144" y="70" width="3" height="40" fill="#5b6670"/><path d="M139 58 l6 -6 h8 l6 6 v8 l-6 6 h-8 l-6 -6z" fill="#d21a1a" stroke="#fff" stroke-width="1.5"/><text x="149" y="65.5" text-anchor="middle" font-size="6" font-weight="900" fill="#fff">STOP</text></g><g class="jb__slow"><rect x="144" y="70" width="3" height="40" fill="#5b6670"/><path d="M149 50 l11 11 l-11 11 l-11 -11z" fill="#ff8a00" stroke="#14171a" stroke-width="1.2"/><text x="149" y="63.5" text-anchor="middle" font-size="5.5" font-weight="900" fill="#14171a">SLOW</text></g>`)}`
  },
  {
    key: 'tma', t: 'TMA crash truck protection', d: 'Crash trucks with arrow boards and certified operators shielding your crew.',
    cta: ['Book a TMA', '/pages/request-a-quote?type=lane-closure'],
    svg: `${road(80, 90, 3)}${truck(220, 136)}${arrowBoard(238, 104)}${[0, 1, 2, 3].map((k) => cone(320 + k * 20, 132, k)).join('')}${car(-50, 140, '#5b6670', 'jb__approach')}${car(30, 92, '#7d8a96', 'jb__drive')}`
  },
  {
    key: 'night', t: 'Night and weekend work', d: 'Light towers, reflective devices and crews for off-peak closure windows.',
    cta: ['Plan a night closure', '/tools/lane-closure-plan?work=right'],
    dark: true,
    svg: `<rect x="0" y="0" width="${W}" height="${H}" fill="#0f1a2b"/>${[[30, 48], [90, 60], [150, 44], [210, 58], [330, 66], [380, 46]].map(([x, y], i) => `<circle class="jb__star" style="--c:${i}" cx="${x}" cy="${y}" r="1.4" fill="#fff"/>`).join('')}<circle cx="352" cy="54" r="9" fill="#f4f1de" opacity=".9"/>${road(80, 90, 3, false, true)}<path class="jb__beam" d="M286 44 L210 170 L360 170 Z" fill="url(#jbBeam)"/><rect x="284" y="44" width="4" height="96" fill="#5b6670"/><rect x="270" y="34" width="32" height="12" rx="2" fill="#2a2e33"/><g class="jb__lamp"><rect x="273" y="37" width="7" height="6" fill="#fff6c9"/><rect x="282.5" y="37" width="7" height="6" fill="#fff6c9"/><rect x="292" y="37" width="7" height="6" fill="#fff6c9"/></g><rect x="272" y="140" width="28" height="10" rx="2" fill="#f5b800"/>${[0, 1, 2, 3, 4, 5].map((k) => cone(110 + k * 30, 140 - (k < 3 ? k * 6 : 18), k)).join('')}<rect x="200" y="124" width="70" height="16" rx="3" fill="#b60606" opacity=".85"/>`
  },
  {
    key: 'event', t: 'Special events', d: 'Parades, races, concerts and game days, planned and staffed.',
    cta: ['Reserve a crew', '/pages/request-a-quote?type=lane-closure'],
    svg: `<path d="M240 70 q80 -60 160 0 v20 h-160z" fill="#cfd4d9"/><rect x="240" y="80" width="160" height="10" fill="#b8bec5"/>${road(96, 74, 2, true)}${[0, 1, 2].map((k) => `<g class="jb__pop" style="--c:${k}"><rect x="${40 + k * 110}" y="${104 + (k % 2) * 30}" width="44" height="7" fill="#fff"/><rect x="${40 + k * 110}" y="${104 + (k % 2) * 30}" width="11" height="7" fill="#ff6a00"/><rect x="${62 + k * 110}" y="${104 + (k % 2) * 30}" width="11" height="7" fill="#ff6a00"/><rect x="${43 + k * 110}" y="${111 + (k % 2) * 30}" width="3" height="12" fill="#5b6670"/><rect x="${78 + k * 110}" y="${111 + (k % 2) * 30}" width="3" height="12" fill="#5b6670"/></g>`).join('')}${Array.from({ length: 16 }, (_, i) => `<circle class="jb__crowd" style="--c:${i}" cx="${20 + i * 24}" cy="${180 - (i % 3) * 4}" r="5" fill="${['#b60606', '#14171a', '#f5b800', '#5b6670'][i % 4]}"/>`).join('')}<g class="jb__flag"><rect x="300" y="40" width="2" height="30" fill="#5b6670"/><path d="M302 40 h18 l-4 6 l4 6 h-18z" fill="#b60606"/></g>`
  },
  {
    key: 'emergency', t: 'Emergency response', d: 'Water main breaks, downed lines and incidents. Available to account customers.',
    cta: ['Open an account', '/pages/create-c-m-account'],
    svg: `${road(80, 90, 2, true)}<ellipse class="jb__water" cx="250" cy="150" rx="40" ry="10" fill="#4aa3df" opacity=".55"/>${truck(110, 132)}<g class="jb__beacon"><rect x="186" y="128" width="8" height="5" rx="1" fill="#ffb300"/><circle cx="190" cy="128" r="14" fill="#ffb300" opacity=".35"/></g>${[0, 1, 2, 3, 4].map((k) => cone(220 + k * 22, 128 + (k % 2 ? 0 : 0), k)).join('')}${[0, 1, 2].map((k) => cone(300 + k * 10, 140 + k * 8, 5 + k)).join('')}<g class="jb__badge"><rect x="16" y="44" width="132" height="24" rx="12" fill="#fff"/><circle cx="31" cy="56" r="4" fill="#1d9e4b"/><text x="41" y="60" font-size="10.5" font-weight="800" fill="#14171a">For account customers</text></g>`
  }
];
