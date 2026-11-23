// Forwards a lane closure quote request from the website's quote builder to the
// Operations Portal's Quote Requests page.
//
// The browser posts here (same site). This function adds the shared key, which lives
// only in Netlify's settings, and passes the request on. The key never reaches the browser.
//
// Netlify settings this needs (Site configuration > Environment variables):
//   QUOTE_REQUEST_SECRET  the same value that is set on the portal site
//   PORTAL_QUOTE_URL      optional; defaults to the live portal

const PORTAL = 'https://tssmptscheduler.netlify.app/api/quote-requests';
const MAX_BYTES = 60_000;

// A light per-visitor limit. It resets when the function restarts; the portal keeps its own hourly cap.
const seen = new Map();
function tooMany(ip) {
  const now = Date.now();
  const hits = (seen.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 2000) seen.clear();
  return hits.length > 6;
}

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export default async (request, context) => {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'POST only.' });

  // Only this site's own pages may post here.
  const origin = request.headers.get('origin') || '';
  const host = new URL(request.url).host;
  if (origin && new URL(origin).host !== host) return json(403, { ok: false, error: 'Not allowed.' });

  const secret = (process.env.QUOTE_REQUEST_SECRET || '').trim();
  if (!secret) return json(503, { ok: false, error: 'The portal link is not set up yet.' });

  if (tooMany(context?.ip || request.headers.get('x-nf-client-connection-ip') || 'unknown')) return json(429, { ok: false, error: 'Too many requests. Try again in a few minutes.' });

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json(413, { ok: false, error: 'That request is too large.' });
  let body;
  try { body = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'Send JSON.' }); }
  if (body?.type !== 'lane-closure') return json(400, { ok: false, error: 'Only lane closure requests go to the portal.' });

  try {
    const r = await fetch(process.env.PORTAL_QUOTE_URL || PORTAL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-quote-secret': secret },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12_000),
    });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch {
    return json(502, { ok: false, error: 'The portal did not answer.' });
  }
};

export const config = { path: '/api/portal-quote' };
