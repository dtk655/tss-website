// Screenshot helper: serves cdn.shopify.com images from public/cdn-mirror so previews
// look like production. Usage: node shoot.js <url-path> <outfile> <width> [scrollY|full] [delayMs]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const MIRROR = path.join(__dirname, 'public/cdn-mirror');
const TYPES = { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
(async () => {
  const [, , upath, out, w = '1440', scroll = '0', delay = '1400'] = process.argv;
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl'] });
  const pg = await b.newPage({ viewport: { width: +w, height: 940 }, deviceScaleFactor: 2 });
  await pg.route('**cdn.shopify.com/**', (route) => {
    const u = new URL(route.request().url());
    const name = decodeURIComponent(u.pathname.split('/').pop());
    const f = path.join(MIRROR, name);
    if (fs.existsSync(f)) {
      route.fulfill({ body: fs.readFileSync(f), contentType: TYPES[name.split('.').pop().toLowerCase()] || 'application/octet-stream' });
    } else route.abort();
  });
  await pg.goto('http://localhost:4500' + upath, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  if (scroll !== '0' && scroll !== 'full') { await pg.evaluate((y) => window.scrollTo(0, +y), scroll); }
  await pg.waitForTimeout(+delay);
  await pg.screenshot({ path: out, fullPage: scroll === 'full' });
  await b.close();
  console.log('shot', out);
})();
