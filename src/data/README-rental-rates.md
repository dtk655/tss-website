# Rental rates (rental-rates.json)

The rent or buy calculator (/tools/rent-vs-buy) reads rental prices from `rental-rates.json`.
The numbers in it today are ESTIMATES, not TSS's real rates.

To set real rates, edit each item:

- `daily`, `weekly`, `monthly`: price per unit, in dollars.
- `placeholder`: change to `false` once the numbers are real.
  While any item still says `true`, the calculator shows
  "Rental rates shown are estimates. Your quote will have exact pricing."
- `fallbackBuy`: purchase price used only if the product can't be found in Shopify.
  The real purchase price always comes live from Shopify.

To add an item to the calculator, add a new entry with the product's Shopify handle
(the last part of its URL, e.g. /products/cone28inch -> `cone28inch`).
Then commit and push. Netlify rebuilds the site automatically.
