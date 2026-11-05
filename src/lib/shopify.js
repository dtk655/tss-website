// Build-time data from the Shopify Storefront API.
// The public token is designed to be shipped in client code; it can only read
// published products and manage carts.
import sample from '../data/sample.json';

export const SHOP_DOMAIN = '24f975-2.myshopify.com';
export const API_VERSION = '2025-07';
export const STOREFRONT_TOKEN = '10d044d2c1eb893c94c1f357ac7533e1';
export const ENDPOINT = `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`;

// Collections shown in navigation and category tiles, in order.
export const NAV_COLLECTIONS = [
  'cones', 'barricades', 'water-filled-barriers', 'traffic-drums', 'sign-shop',
  'lights', 'reflectors', 'safety-gear', 'sign-stands', 'deliniators',
  'equipment-rentals', 'truck-rentals'
];
// Collections that are internal/merchandising only.
const HIDDEN = new Set(['frontpage', 'featured-collection', 'new-collection', 'best-selling-collection', 'you-might-also-like', 'lane-closure', 'custom-signage']);

const PRODUCT_FIELDS = `
  id handle title description descriptionHtml productType tags availableForSale
  featuredImage { url altText width height }
  images(first: 10) { nodes { url altText width height } }
  options { name values }
  priceRange { minVariantPrice { amount } maxVariantPrice { amount } }
  variants(first: 100) { nodes { id title availableForSale price { amount } compareAtPrice { amount } selectedOptions { name value } image { url altText width height } } }
  collections(first: 20) { nodes { handle } }
  seo { title description }
`;

async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(`Storefront API HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error('Storefront API: ' + JSON.stringify(json.errors));
  return json.data;
}

function normalizeProduct(p) {
  const min = parseFloat(p.priceRange.minVariantPrice.amount);
  const max = parseFloat(p.priceRange.maxVariantPrice.amount);
  const isRental = max === 0 || (p.tags || []).some((t) => t.toLowerCase() === 'rental');
  return {
    ...p,
    images: p.images.nodes,
    variants: p.variants.nodes,
    collections: p.collections.nodes.map((c) => c.handle),
    minPrice: min,
    maxPrice: max,
    isRental
  };
}

let cache;
export async function loadCatalog() {
  if (cache) return cache;
  if (process.env.TSS_SAMPLE === '1') {
    cache = buildCatalog(sample.products.map(normalizeProduct), sample.collections);
    return cache;
  }
  const products = [];
  let after = null;
  do {
    const d = await gql(`query($after: String) { products(first: 100, after: $after) { pageInfo { hasNextPage endCursor } nodes { ${PRODUCT_FIELDS} } } }`, { after });
    products.push(...d.products.nodes.map(normalizeProduct));
    after = d.products.pageInfo.hasNextPage ? d.products.pageInfo.endCursor : null;
  } while (after);
  const c = await gql(`{ collections(first: 100) { nodes { handle title description image { url altText } } } }`);
  cache = buildCatalog(products, c.collections.nodes);
  return cache;
}

function buildCatalog(products, collections) {
  const byHandle = new Map(products.map((p) => [p.handle, p]));
  const cols = collections
    .filter((c) => !HIDDEN.has(c.handle))
    .map((c) => {
      const items = products.filter((p) => p.collections.includes(c.handle));
      const cover = c.image || items.find((p) => p.featuredImage)?.featuredImage || null;
      return { ...c, products: items, cover };
    })
    .filter((c) => c.products.length > 0);
  return { products, byHandle, collections: cols, colByHandle: new Map(cols.map((c) => [c.handle, c])) };
}

export function money(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
export function priceLabel(p) {
  if (p.isRental) return 'Rental. Request a quote';
  if (p.minPrice === p.maxPrice) return money(p.minPrice);
  return `From ${money(p.minPrice)}`;
}
// Shopify CDN image resizing
export function img(url, width) {
  if (!url) return '';
  if (/\.svg(\?|$)/i.test(url)) return url;
  return url + (url.includes('?') ? '&' : '?') + 'width=' + width;
}
