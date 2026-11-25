// The 2–3 highlight badges shown in the header of each equipment and fleet page.
// Edit BADGE_SETS to change which badges a unit shows; edit BADGES to change the wording.
const I = {
  check: 'M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z M8.5 12l2.5 2.5 4.5-5',
  shield: 'M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z',
  impact: 'M4 12h6 M7 9l3 3-3 3 M14 5v14 M17 7v10 M20 9v6',
  link: 'M9 15l6-6 M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7l-1.8 1.8 M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7l1.8-1.8',
  grid: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
  box: 'M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8',
  truck: 'M3 7h11v9H3z M14 10h4l3 3v3h-7 M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  crew: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 11a3 3 0 1 0 0-6 M18 14c2.2.6 4 2.9 4 6',
  cal: 'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5'
};
export const BADGES = {
  mutcd: { icon: I.check, t: 'MUTCD Compliant', d: 'Meets federal work zone standards.' },
  ntcip: { icon: I.link, t: 'NTCIP Compliant', d: 'Works with DOT traffic systems.' },
  models3: { icon: I.grid, t: '3 Models', d: 'Full-size, mini and 5-color boards.' },
  dot: { icon: I.shield, t: 'DOT Approved', d: 'Ready for state DOT work.' },
  mash: { icon: I.impact, t: 'MASH Tested', d: 'Crash tested to current federal standards.' },
  stock: { icon: I.box, t: 'Stocked and Ready', d: 'Units on hand in our South Plainfield yard.' },
  pickup: { icon: I.truck, t: 'Delivery or Pick Up', d: 'We deliver, or use Customer Pick Up.' },
  crew: { icon: I.crew, t: 'Operator Available', d: 'Rent it with our certified and experienced crew.' },
  rental: { icon: I.cal, t: 'Daily, Weekly, Monthly', d: 'Rent for one shift or the whole job.' }
};
const BADGE_SETS = {
  'variable-message-sign-vms-board': ['mutcd', 'ntcip', 'models3'],
  'arrow-board': ['dot', 'mutcd', 'stock'],
  'light-tower': ['stock', 'pickup', 'rental'],
  'portable-traffic-light': ['mutcd', 'stock', 'pickup'],
  'speed-limit-trailer': ['stock', 'pickup', 'rental'],
  'scorpion-trailer-with-arrow-board': ['mash', 'dot', 'stock'],
  'ground-mount-attenuator-gma': ['mash', 'dot', 'stock'],
  'concrete-barrier': ['dot', 'stock', 'pickup'],
  'concrete-barrier-lifter': ['stock', 'pickup', 'rental'],
  'sand-drum-lifter': ['stock', 'pickup', 'rental'],
  'truck-mounted-attenuator-tma': ['mash', 'dot', 'crew'],
  'bucket-truck': ['crew', 'stock', 'rental'],
  'bucket-van': ['crew', 'stock', 'rental'],
  'basket-truck': ['crew', 'stock', 'rental'],
  'flatbed-truck': ['crew', 'rental', 'stock']
};
export const badgesFor = (handle) => (BADGE_SETS[handle] || ['stock', 'rental']).map((k) => BADGES[k]);
