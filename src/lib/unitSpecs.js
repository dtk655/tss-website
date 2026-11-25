// Manufacturer detail for units where we know the exact make and model.
// When a unit is listed here, its page uses this instead of the short store description.
// Source for the arrow board: https://www.wanco.com/product/weco-folding-frame-arrow-boards/
const W = 'https://www.wanco.com/wp-content/uploads';

export const UNIT_SPECS = {
  'arrow-board': {
    maker: 'Wanco',
    model: 'W|ECO Folding Frame Arrow Board',
    headline: 'Seen from a mile away. Runs on a fraction of the power.',
    patternsDemo: {
      note: 'Switch between arrows, chevrons and caution modes from the control box, set on the side away from traffic.',
      list: [['right', 'Arrow Right'], ['left', 'Arrow Left'], ['seqRight', 'Sequential Arrow'], ['chevRight', 'Sequential Chevron'], ['double', 'Double Arrow'], ['caution', 'Caution']]
    },
    buyPoints: ['15-light or 25-light display', 'Connected Pro package with Wanco Fleet Manager', 'Extra solar and battery capacity', 'Ball and pintle combo hitch or lunette ring', 'Customer Pick Up at our South Plainfield yard, or we deliver'],
    specGroups: [
      { t: 'Display', rows: [['Lamps', '15 or 25 amber LEDs'], ['Patterns', '7 or 12'], ['Dimming', 'Automatic'], ['Standard', 'MUTCD Type C'], ['Visibility', '1 mile or more']] },
      { t: 'Power', rows: [['Solar', 'One 50 W panel'], ['Batteries', 'Two sealed 12 V VRLA'], ['Capacity', '36 Ah total'], ['Charging', 'Solar or commercial'], ['Protection', 'Low-voltage disconnect']] },
      { t: 'Trailer', rows: [['Weight', 'About 1,250 lb'], ['Frame', 'All-welded steel'], ['Axle', '2,000 lb tubular'], ['Wheel track', '60 in.'], ['Tires', 'ST205/75 D15']] }
    ],
    lead: [
      'The Wanco W|ECO is built to be seen from a mile or more away, while drawing a fraction of the power of a traditional solar arrow board.',
      'Its folding frame swings the panel upright on site and flat for travel, held by a single support. One person can raise it with the hand winch.'
    ],
    stats: [
      ['1+ mile', 'Visibility'],
      ['Up to 80%', 'Less power than traditional solar boards'],
      ['15 or 25', 'High-output amber LEDs'],
      ['MUTCD', 'Type C arrow panel']
    ],
    benefits: [
      { label: 'Visible From A Mile', text: 'High-output amber LEDs with automatic dimming for day and night work.' },
      { label: 'One-Person Setup', text: 'Hand winch with a safety brake and one locking point for work and travel.' },
      { label: 'Long Run Times', text: 'An efficient power system that uses up to 80% less power than traditional solar boards.' },
      { label: 'Solar Charging', text: 'The solar panel charges the batteries and shuts off when they are full.' },
      { label: 'Stable In Wind', text: 'Stabilizer legs lift the tires off the ground once the board is set.' },
      { label: 'Controls Away From Traffic', text: 'A lockable, weather-resistant control box placed on the safe side of the trailer.' }
    ],
    groups: [
      { t: 'Operation', items: ['High-output amber LED arrow and display patterns', 'Automatic dimming', 'Hand winch with safety brake', 'Single locking device for operation and transport', 'Lockable, weather-resistant control box', 'Stabilizer legs for high wind'] },
      { t: 'Power System', items: ['Solar charging with automatic shut-off when full', 'Charges from solar or commercial power', 'Low-voltage disconnect and reverse polarity protection', 'Resettable fuses and a charge indicator'] },
      { t: 'Built To Last', items: ['Rigid, all-welded tubular steel frame', 'Powder-coated finish', 'No rear braces needed for travel, so less transport damage', 'Easy-to-replace lamps, visors and bolt-on fenders'] },
      { t: 'Cleaner Power', items: ['Up to 80% less power than traditional solar boards', 'Batteries with 80% less lead', 'Sealed batteries that will not leak', 'Nearly all components recyclable'] }
    ],
    patterns: {
      img: `${W}/2017/02/detail-prod-arrowbd-patterns.png`,
      lines: [['15-Light', '7 display patterns'], ['25-Light', '12 display patterns']]
    },
    specs: [
      ['Make and model', 'Wanco W|ECO folding frame (WTSP)'],
      ['Display', '15 or 25 high-output amber LEDs'],
      ['Patterns', '7 on the 15-light, 12 on the 25-light'],
      ['Dimming', 'Automatic'],
      ['Standard', 'MUTCD Type C'],
      ['Batteries', 'Two sealed 12 V VRLA batteries, 36 Ah total'],
      ['Solar', 'One 50 W panel'],
      ['Charging', 'Solar or commercial power'],
      ['Weight', 'About 1,250 lb'],
      ['Frame', 'All-welded structural steel, powder-coated'],
      ['Sign cabinet', 'Aluminum sheet with welded channels'],
      ['Axle', '2,000 lb tubular axle, 60 in. wheel track'],
      ['Suspension', 'Double-eye leaf springs'],
      ['Tires', 'ST205/75 D15']
    ],
    options: ['15-light or 25-light display', 'Connected Pro package with Wanco Fleet Manager', 'Extra solar or battery capacity', '2-amp battery charger', 'Ball and pintle combo hitch, or lunette ring', 'Swivel jacks'],
    docs: [
      ['Manufacturer Spec Sheet', `${W}/2024/03/specs_ArrowBoardsTrailerFolding_WTSP.pdf`],
      ['W|ECO Brochure', `${W}/2020/03/brochure_WancoArrowboardWeco.pdf`],
      ["Owner's Manual", `${W}/2024/03/Owner_WTSP_WTSV_CABtrailers_239332_RevA.pdf`]
    ],
    gallery: [
      { src: `${W}/2020/03/featr-prod-arrowbd-trailer-folding.jpg`, alt: 'Wanco W|ECO folding arrow board trailer' },
      { src: `${W}/2017/02/gallery-prod-arrowbd-trailer-folding-depl.jpg`, alt: 'Arrow board raised and deployed' },
      { src: `${W}/2017/02/gallery-prod-arrowbd-trailer-folding-travl.jpg`, alt: 'Arrow board folded flat for travel' },
      { src: `${W}/2020/03/gallery-prod-arrowbd-trailer-folding.jpg`, alt: 'W|ECO arrow board on site' },
      { src: `${W}/2018/06/gallery-prod-arrowbd-trailer-ctrl-12.jpg`, alt: 'Arrow board controller, 12 patterns' },
      { src: `${W}/2018/06/gallery-prod-arrowbd-trailer-ctrl-7.jpg`, alt: 'Arrow board controller, 7 patterns' }
    ]
  }
};
export const specsFor = (handle) => UNIT_SPECS[handle] || null;
