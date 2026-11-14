// Store policies, pulled from Shopify at build time so edits made in the Shopify admin flow through on the next deploy.
import { ENDPOINT, STOREFRONT_TOKEN } from './shopify.js';
import { PHONE, EMAIL } from './config.js';

export const POLICY_NAV = [
  ['refund-policy', 'Refund policy'],
  ['privacy-policy', 'Privacy policy'],
  ['terms-of-service', 'Terms of service'],
  ['shipping-policy', 'Shipping policy'],
  ['contact-information', 'Contact information']
];
// Same policy documents on Shopify's own host, used as a fallback source and never dependent on our domain.
const HOSTED = {
  'refund-policy': 'https://checkout.shopify.com/58777010241/policies/31104729153.html?locale=en',
  'privacy-policy': 'https://checkout.shopify.com/58777010241/policies/31104761921.html?locale=en',
  'terms-of-service': 'https://checkout.shopify.com/58777010241/policies/31104794689.html?locale=en',
  'shipping-policy': 'https://checkout.shopify.com/58777010241/policies/31104827457.html?locale=en'
};
const FIELD = { 'refund-policy': 'refundPolicy', 'privacy-policy': 'privacyPolicy', 'terms-of-service': 'termsOfService', 'shipping-policy': 'shippingPolicy' };
const CONTACT = `<p><strong>Company:</strong> Traffic Safety Service</p>
<p><strong>Phone number:</strong> <a href="tel:+19085614800">908-561-4800</a></p>
<p><strong>Email:</strong> <a href="mailto:info@trafficsafetyservice.com">info@trafficsafetyservice.com</a></p>
<p><strong>Physical address:</strong> 601 Hadley Road, South Plainfield NJ 07080, United States</p>`;
const fallback = (h) => `<p>Please call our office at <a href="tel:+19085614800">${PHONE}</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a> for our ${h.replace(/-/g, ' ')}.</p>`;

// remove anything executable from policy HTML before it is rendered
const clean = (html) => String(html || '')
  .replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1>/gi, '')
  .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/javascript:/gi, '');

async function fromStorefront() {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
    body: JSON.stringify({ query: '{ shop { refundPolicy { body } privacyPolicy { body } termsOfService { body } shippingPolicy { body } } }' })
  });
  const j = await res.json();
  return j?.data?.shop || {};
}
async function fromHosted(handle) {
  const res = await fetch(HOSTED[handle]);
  if (!res.ok) return '';
  const html = await res.text();
  const m = html.match(/<div class="rte[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i) || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1].replace(/<h1[\s\S]*?<\/h1>/i, '') : '';
}

let cache;
export async function loadPolicies() {
  if (cache) return cache;
  const out = {};
  if (process.env.TSS_SAMPLE === '1') {
    for (const [h, t] of POLICY_NAV) out[h] = { handle: h, title: t, html: h === 'contact-information' ? CONTACT : `<p>Sample build. The live ${t.toLowerCase()} loads from Shopify when the site deploys.</p><h2>Section heading</h2><p>Sample paragraph text for layout.</p><ul><li>Sample item</li><li>Sample item</li></ul>` };
    return (cache = out);
  }
  let shop = {};
  try { shop = await fromStorefront(); } catch {}
  for (const [h, t] of POLICY_NAV) {
    if (h === 'contact-information') { out[h] = { handle: h, title: t, html: CONTACT }; continue; }
    let html = shop[FIELD[h]]?.body || '';
    if (!html) { try { html = await fromHosted(h); } catch {} }
    out[h] = { handle: h, title: t, html: clean(html) || fallback(h) };
  }
  return (cache = out);
}
