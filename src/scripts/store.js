// Client-side cart (Shopify Storefront Cart API) and quote list (localStorage).
// Public API for every page and tool:
//   TSSCart.add(variantId, qty)            -> adds to Shopify cart, opens drawer
//   TSSQuote.add([{ title, handle?, image?, qty, mode: 'rent'|'buy', note? }])
//   TSSQuote.items() / TSSQuote.clear()
//   TSSDrawer.open('cart'|'quote')

const SF = window.TSS_SF;
const CART_KEY = 'tss_cart_id';
const QUOTE_KEY = 'tss_quote_list';

const ls = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const money = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function toast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
window.TSSToast = toast;

/* ---------------- Shopify cart ---------------- */
async function sf(query, variables) {
  const r = await fetch(SF.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': SF.token },
    body: JSON.stringify({ query, variables })
  });
  const j = await r.json();
  if (j.errors) throw new Error(j.errors[0].message);
  return j.data;
}
const CART_FIELDS = `id checkoutUrl totalQuantity cost { subtotalAmount { amount } }
  lines(first: 100) { nodes { id quantity merchandise { ... on ProductVariant { id title image { url } product { title handle featuredImage { url } } price { amount } } } } }`;

let cart = null;
async function loadCart() {
  const id = ls.get(CART_KEY);
  if (!id) return null;
  try {
    const d = await sf(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id });
    if (!d.cart) { ls.del(CART_KEY); return null; }
    return d.cart;
  } catch { return null; }
}
async function addToCart(variantId, quantity = 1) {
  const lines = [{ merchandiseId: variantId, quantity }];
  let d;
  if (cart?.id) {
    d = await sf(`mutation($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { id: cart.id, lines });
    cart = d.cartLinesAdd.cart;
  } else {
    d = await sf(`mutation($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } userErrors { message } } }`, { lines });
    cart = d.cartCreate.cart;
    ls.set(CART_KEY, cart.id);
  }
  renderCart();
}
async function updateLine(lineId, quantity) {
  const d = quantity > 0
    ? await sf(`mutation($id: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } } }`, { id: cart.id, lines: [{ id: lineId, quantity }] })
    : await sf(`mutation($id: ID!, $ids: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $ids) { cart { ${CART_FIELDS} } } }`, { id: cart.id, ids: [lineId] });
  cart = (d.cartLinesUpdate || d.cartLinesRemove).cart;
  renderCart();
}

function setCount(sel, n) {
  document.querySelectorAll(sel).forEach((el) => { el.textContent = n; el.hidden = !n; });
}
function renderCart() {
  const lines = cart?.lines?.nodes || [];
  const n = cart?.totalQuantity || 0;
  setCount('[data-cart-count]', n);
  document.querySelectorAll('[data-cart-count-inline]').forEach((el) => { el.textContent = n ? `(${n})` : ''; });
  const ul = document.querySelector('[data-cart-lines]');
  if (!ul) return;
  ul.innerHTML = lines.map((l) => {
    const m = l.merchandise;
    const img = m.image?.url || m.product.featuredImage?.url || '';
    const sub = m.title === 'Default Title' ? '' : m.title;
    return `<li class="line" data-line="${esc(l.id)}">
      <img src="${esc(img)}" alt="" loading="lazy" />
      <div><a class="line__t" href="/products/${esc(m.product.handle)}">${esc(m.product.title)}</a>
        <div class="line__s">${esc(sub)}</div>
        <div class="line__q"><button data-dec aria-label="Decrease">−</button><input type="number" min="0" value="${l.quantity}" aria-label="Quantity" /><button data-inc aria-label="Increase">+</button></div></div>
      <div><strong>${money(m.price.amount * l.quantity)}</strong></div>
    </li>`;
  }).join('');
  document.querySelector('[data-cart-empty]').hidden = lines.length > 0;
  document.querySelector('[data-cart-foot]').hidden = lines.length === 0;
  if (cart) {
    document.querySelector('[data-cart-subtotal]').textContent = money(cart.cost.subtotalAmount.amount);
    document.querySelector('[data-checkout]').href = cart.checkoutUrl;
  }
}
document.addEventListener('click', (e) => {
  const li = e.target.closest('[data-line]');
  if (!li) return;
  const input = li.querySelector('input');
  if (e.target.closest('[data-inc]')) updateLine(li.dataset.line, +input.value + 1);
  if (e.target.closest('[data-dec]')) updateLine(li.dataset.line, Math.max(0, +input.value - 1));
});
document.addEventListener('change', (e) => {
  const li = e.target.closest('[data-line]');
  if (li && e.target.matches('input')) updateLine(li.dataset.line, Math.max(0, parseInt(e.target.value, 10) || 0));
});

/* ---------------- Quote list ---------------- */
function quoteItems() { try { return JSON.parse(ls.get(QUOTE_KEY) || '[]'); } catch { return []; } }
function saveQuote(items) { ls.set(QUOTE_KEY, JSON.stringify(items)); renderQuote(); }
function addQuote(list) {
  const items = quoteItems();
  for (const it of list) {
    const key = (it.handle || '') + '|' + it.title + '|' + (it.note || '') + '|' + (it.variant || '') + '|' + it.mode;
    const ex = items.find((x) => x.key === key);
    if (ex) ex.qty += it.qty || 1;
    else items.push({ key, title: it.title, handle: it.handle || '', image: it.image || '', variant: it.variant || '', qty: it.qty || 1, mode: it.mode || 'rent', note: it.note || '', logo: it.logo || '' });
  }
  saveQuote(items);
}
function renderQuote() {
  const items = quoteItems();
  const n = items.length;
  setCount('[data-quote-count]', n);
  document.querySelectorAll('[data-quote-count-inline]').forEach((el) => { el.textContent = n ? `(${n})` : ''; });
  const ul = document.querySelector('[data-quote-lines]');
  if (!ul) return;
  ul.innerHTML = items.map((it, i) => `<li class="line" data-qi="${i}">
      ${it.image ? `<img src="${esc(it.image)}" alt="" loading="lazy" />` : '<span></span>'}
      <div><div class="line__t">${esc(it.title)}</div>
        ${it.variant ? `<div class="line__s">${esc(it.variant)}</div>` : ''}
        ${it.note ? `<div class="line__s">${esc(it.note)}</div>` : ''}
        <div class="line__q"><input type="number" min="1" value="${it.qty}" aria-label="Quantity" data-qq />
          <select data-qm aria-label="Rent or buy"><option value="rent"${it.mode === 'rent' ? ' selected' : ''}>Rent</option><option value="buy"${it.mode === 'buy' ? ' selected' : ''}>Buy</option></select></div></div>
      <button class="line__rm" data-qrm>Remove</button>
    </li>`).join('');
  document.querySelector('[data-quote-empty]').hidden = n > 0;
  document.querySelector('[data-quote-foot]').hidden = n === 0;
  document.dispatchEvent(new CustomEvent('tss:quote-change', { detail: items }));
}
document.addEventListener('change', (e) => {
  const li = e.target.closest('[data-qi]');
  if (!li) return;
  const items = quoteItems(); const it = items[+li.dataset.qi];
  if (e.target.matches('[data-qq]')) it.qty = Math.max(1, parseInt(e.target.value, 10) || 1);
  if (e.target.matches('[data-qm]')) it.mode = e.target.value;
  saveQuote(items);
});
document.addEventListener('click', (e) => {
  const rm = e.target.closest('[data-qrm]');
  if (!rm) return;
  const items = quoteItems(); items.splice(+rm.closest('[data-qi]').dataset.qi, 1); saveQuote(items);
});

/* ---------------- Drawer ---------------- */
const drawer = document.querySelector('[data-drawer]');
let lastFocus = null;
function openDrawer(tab = 'cart') {
  lastFocus = document.activeElement;
  drawer.hidden = false;
  document.body.style.overflow = 'hidden';
  selectTab(tab);
  drawer.querySelector(`[data-tab="${tab}"]`).focus();
}
function closeDrawer() {
  drawer.hidden = true;
  document.body.style.overflow = '';
  lastFocus?.focus?.();
}
function selectTab(tab) {
  drawer.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
  drawer.querySelectorAll('[data-pane]').forEach((p) => { p.hidden = p.dataset.pane !== tab; });
}
document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-open-drawer]');
  if (o) { e.preventDefault(); openDrawer(o.dataset.openDrawer); }
  if (e.target.closest('[data-close-drawer]')) closeDrawer();
  const t = e.target.closest('[data-tab]');
  if (t) selectTab(t.dataset.tab);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });

window.TSSDrawer = { open: openDrawer, close: closeDrawer };
window.TSSCart = {
  async add(variantId, qty = 1) {
    try { await addToCart(variantId, qty); toast('Added to cart'); openDrawer('cart'); }
    catch (err) { toast('Couldn’t add that to the cart. Please try again or call 908-561-4800.'); throw err; }
  }
};
window.TSSQuote = {
  add(list, { open = true } = {}) { addQuote(Array.isArray(list) ? list : [list]); toast(Array.isArray(list) && list.length > 1 ? `${list.length} items added to your quote list` : 'Added to your quote list'); if (open) openDrawer('quote'); },
  items: quoteItems,
  clear() { saveQuote([]); }
};

renderQuote();
loadCart().then((c) => { cart = c; renderCart(); });
