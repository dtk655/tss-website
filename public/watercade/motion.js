// Homepage motion only. The barrier builder (#customize), its canvas, and its
// scripts are left alone. Reveals run once. Reduced motion skips the motion.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.querySelector('.nav');
  if (nav) {
    var stuck = false;
    var onScroll = function () {
      var next = window.scrollY > 8;
      if (next === stuck) return;
      stuck = next;
      nav.classList.toggle('is-stuck', stuck);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (reduce || !('IntersectionObserver' in window)) return;

  var selectors = [
    '.spec-head',
    '.spec-block',
    '.dim-tiles > div',
    '.spec-downloads',
    '.buy-top > h2',
    '.buy-top .bt-tile',
    '.feat-title',
    '.info-card',
    '.key-strip',
    '.serve-sec .sv-title',
    '.sv-card',
    'body.home > footer'
  ];
  var nodes = [];
  selectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.closest('#customize, #spec3d, .product-shot, .hero-video')) return;
      nodes.push(el);
    });
  });

  var seen = new Map();
  nodes.forEach(function (el) {
    var parent = el.parentElement;
    var i = seen.get(parent) || 0;
    seen.set(parent, i + 1);
    el.classList.add('rise');
    el.style.setProperty('--rise', String(Math.min(i, 6)));
  });

  var vh = window.innerHeight || document.documentElement.clientHeight;
  var pending = [];
  nodes.forEach(function (el) {
    var r = el.getBoundingClientRect();
    // Anything already on screen stays visible. Only off-screen pieces rise in.
    if (r.bottom > 0 && r.top < vh) el.classList.add('is-in');
    else pending.push(el);
  });
  document.documentElement.classList.add('fx');
  if (!pending.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  pending.forEach(function (el) { io.observe(el); });
})();
