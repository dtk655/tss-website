# TSS website

The new trafficsafetyservice.com: an Astro site that uses Shopify headless for
products, cart and checkout.

- `npm install && npm run dev` to work locally (add `TSS_SAMPLE=1` to skip Shopify
  and use the small sample catalog in `src/data/sample.json`).
- `npm run build` builds the real site: it pulls every product and collection from
  the Shopify Storefront API at build time.
- Products, prices, images and collections are edited in Shopify admin, same as
  always. The site rebuilds on each deploy; set up a Shopify→Netlify build hook to
  rebuild automatically on product changes.
- Quote/contact forms POST to the n8n workflow "TSS Website: Quote Form Intake",
  which emails dylan@trafficsafetyservice.com. URL in `src/lib/config.js`.
- Coney the chat assistant is `public/coney.js` (talks to the existing n8n chatbot).
- Rental rates for the rent-vs-buy tool are placeholders in `src/data/rental-rates.json`.
- `netlify.toml` currently sends `X-Robots-Tag: noindex`; remove that block at launch.
