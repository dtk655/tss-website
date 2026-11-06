// Build-time search index for the header's instant search.
import { loadCatalog, PRODUCT_COLLECTIONS, RENTAL_COLLECTIONS, img } from '../lib/shopify.js';

export async function GET() {
  const { products, colByHandle } = await loadCatalog();
  const cats = [...PRODUCT_COLLECTIONS, ...RENTAL_COLLECTIONS]
    .map((h) => colByHandle.get(h))
    .filter(Boolean)
    .map((c) => ({ k: 'c', h: c.handle, t: c.title, n: c.products.length }));
  const prods = products.map((p) => ({
    k: 'p',
    h: p.handle,
    t: p.title,
    i: p.featuredImage ? img(p.featuredImage.url, 120) : '',
    r: p.isRental ? 1 : 0,
    pr: p.isRental ? null : p.minPrice,
    c: p.collections.slice(0, 4)
  }));
  return new Response(JSON.stringify({ cats, prods }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
  });
}
