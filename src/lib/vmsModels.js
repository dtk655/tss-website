// The three Wanco message boards TSS offers. Specs are from Wanco's product pages:
// https://www.wanco.com/product/matrix-message-signs/
// https://www.wanco.com/product/mini-matrix-message-sign/
// https://www.wanco.com/product/color-message-signs/
// Photos are Wanco's product shots; swap `img` for a local /photos file to use your own.
export const VMS_MODELS = [
  {
    id: 'full',
    name: 'Full-Size Matrix',
    model: 'Wanco WTMMB',
    img: 'https://www.wanco.com/wp-content/uploads/2021/06/featr-prod-msgbd-matrix-full.jpg',
    lede: 'Our largest board, built for big roadwork projects, highways and public events.',
    tags: ['18 in. Characters', 'Hydraulic Lift'],
    specs: [
      ['Display', '48 × 27 pixels, amber LEDs'],
      ['Standard Text', '3 lines of 8 characters, 18 in. tall'],
      ['Smallest Text', '4 lines of 9 characters'],
      ['Power', '130 W solar, 430 Ah batteries (up to 390 W / 645 Ah optional)'],
      ['Mast', 'One-person hydraulic lift, rotates 360°'],
      ['Weight', 'About 2,640 lb, 2 in. ball hitch']
    ],
    sheet: 'https://www.wanco.com/wp-content/uploads/2022/02/specs_MessageSignsFullsizeMatrix_WTMMB.pdf'
  },
  {
    id: 'mini',
    name: 'Mini Matrix',
    model: 'Wanco WVTM',
    img: 'https://www.wanco.com/wp-content/uploads/2020/04/featr-prod-msgbd-matrix-mini.jpg',
    lede: 'About 30% smaller and lighter than the full-size board, and towable by most vehicles.',
    tags: ['Compact', 'Light Tow'],
    specs: [
      ['Display', '48 × 27 pixels, amber LEDs'],
      ['Standard Text', '3 lines of 8 characters, 12.6 in. tall'],
      ['Smallest Text', '4 lines of 9 characters'],
      ['Power', '85 W solar, 430 Ah batteries (up to 130 W / 645 Ah optional)'],
      ['Mast', 'Hand winch, rotates 360° (hydraulic lift optional)'],
      ['Weight', 'About 1,580 lb, 2 in. ball hitch']
    ],
    sheet: 'https://www.wanco.com/wp-content/uploads/2022/02/specs_MessageSignsMiniMatrix_WVTM.pdf'
  },
  {
    id: 'color',
    name: '5-Color Matrix',
    model: 'Wanco WVTM-5C',
    img: 'https://www.wanco.com/wp-content/uploads/2025/05/featr-prod-msgbd-matrix-mini-color.jpg',
    lede: 'A full-color board for text and graphics in red, blue, green, amber and white.',
    colors: ['#e53935', '#1e88e5', '#43a047', '#ffb300', '#ffffff'],
    tags: ['5 LED Colors', 'Graphics'],
    specs: [
      ['Display', '60 × 32 pixels, 5-color LEDs'],
      ['Smallest Text', '4 lines of 12 characters'],
      ['Largest Text', '1 line of 5 characters'],
      ['Power', '260 W solar, 600 Ah AGM batteries'],
      ['Mast', 'One-person hydraulic lift, rotates 360°'],
      ['Weight', 'About 1,763 lb, 2 in. ball hitch']
    ],
    sheet: 'https://www.wanco.com/wp-content/uploads/2022/02/specs_MessageSignsColorMini_WVTM5C.pdf'
  }
];
