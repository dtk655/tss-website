import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://trafficsafetyservice.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  image: { domains: ['cdn.shopify.com'] }
});
