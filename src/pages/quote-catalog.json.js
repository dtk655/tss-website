// Build-time catalog for the quote builder's category popups.
// cats: handle -> { t, p: [product handles] }   prods: handle -> { t, i, v: [variant titles] (only when > 1), r }
import { loadCatalog, PRODUCT_COLLECTIONS, RENTAL_COLLECTIONS, img } from '../lib/shopify.js';

export async function GET() {
  const { colByHandle } = await loadCatalog();
  const cats = {}, prods = {};
  const add = (p) => {
    if (prods[p.handle]) return;
    const vars = p.variants.filter((v) => v.title !== 'Default Title');
    const e = { t: p.title, i: p.featuredImage ? img(p.featuredImage.url, 200) : '', v: [], r: p.isRental ? 1 : 0 };
    if (vars.length > 1) {
      e.v = vars.map((v) => v.title);
      // per-variant photo, so the popup can swap the picture when an option changes
      if (vars.some((v) => v.image?.url)) e.vi = vars.map((v) => (v.image?.url ? img(v.image.url, 200) : ''));
      // option names + values, so the popup can show color swatches and option buttons
      const names = (vars[0].selectedOptions || []).map((o) => o.name);
      if (names.length && vars.every((v) => (v.selectedOptions || []).length === names.length)) {
        e.o = names.map((n, k) => [n, [...new Set(vars.map((v) => v.selectedOptions[k].value))]]);
        e.vo = vars.map((v) => v.selectedOptions.map((o) => o.value));
      }
    }
    prods[p.handle] = e;
  };
  for (const h of [...PRODUCT_COLLECTIONS, ...RENTAL_COLLECTIONS]) {
    const c = colByHandle.get(h);
    if (!c) continue;
    c.products.forEach(add);
    cats[h] = { t: c.title, p: c.products.map((p) => p.handle) };
  }
  // Equipment that can be bought: in equipment rentals but not a fleet vehicle.
  const fleet = new Set(cats['truck-rentals']?.p || []);
  cats['equipment-sale'] = { t: 'Equipment', p: (cats['equipment-rentals']?.p || []).filter((h) => !fleet.has(h)) };
  return new Response(JSON.stringify({ cats, prods }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
  });
}
