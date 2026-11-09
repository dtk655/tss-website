// Build-time catalog for the quote builder's category popups.
// cats: handle -> { t, p: [product handles] }   prods: handle -> { t, i, v: [variant titles] (only when > 1), r }
import { loadCatalog, PRODUCT_COLLECTIONS, RENTAL_COLLECTIONS, img } from '../lib/shopify.js';

export async function GET() {
  const { colByHandle } = await loadCatalog();
  const cats = {}, prods = {};
  const add = (p) => {
    if (prods[p.handle]) return;
    const vs = p.variants.filter((v) => v.title !== 'Default Title').map((v) => v.title);
    prods[p.handle] = { t: p.title, i: p.featuredImage ? img(p.featuredImage.url, 200) : '', v: vs.length > 1 ? vs : [], r: p.isRental ? 1 : 0 };
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
