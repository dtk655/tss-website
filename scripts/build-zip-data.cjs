// Writes public/zip/<first 3 digits>.json → { "07080": ["South Plainfield", "NJ"], ... }
// The quote builder loads only the one small file for the ZIP typed.
// Run from a folder where the `zipcodes` npm package is installed:
//   node scripts/build-zip-data.cjs <path-to-node_modules>
const path = require('path'), fs = require('fs');
const z = require(path.join(process.argv[2] || 'node_modules', 'zipcodes'));
const out = path.join(__dirname, '..', 'public', 'zip');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const groups = {};
const title = (s) => s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\bMc([a-z])/g, (m, c) => 'Mc' + c.toUpperCase());
for (const [k, v] of Object.entries(z.codes)) {
  if (v.country !== 'US' || !/^\d{5}$/.test(k)) continue;
  (groups[k.slice(0, 3)] ||= {})[k] = [v.city === v.city.toUpperCase() ? title(v.city) : v.city, v.state];
}
for (const [p, g] of Object.entries(groups)) fs.writeFileSync(path.join(out, p + '.json'), JSON.stringify(g));
console.log(Object.keys(groups).length, 'files');
