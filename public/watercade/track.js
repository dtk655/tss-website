// Lightweight, cookie-free visit tracking. Sends small events to /api/track.
(function () {
  var host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || /^192\.168\./.test(host)) return;
  if (navigator.webdriver) return;

  function send(e, extra) {
    var first = false;
    if (e === 'pageview') {
      try { first = !sessionStorage.getItem('wc-v'); sessionStorage.setItem('wc-v', '1'); } catch (_) { first = true; }
    }
    var body = JSON.stringify({ e: e, p: location.pathname, r: e === 'pageview' && first ? document.referrer : '', v: first ? 1 : 0, x: extra || '' });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/track', new Blob([body], { type: 'text/plain' }))) return;
    } catch (_) {}
    try { fetch('/api/track', { method: 'POST', body: body, keepalive: true, headers: { 'content-type': 'text/plain' } }); } catch (_) {}
  }
  window.__wcTrack = send;
  send('pageview');
  // Arrived from the QR code on a barrier decal (/watercade/qr redirects to /?src=qr).
  if (/[?&]src=qr(&|$)/.test(location.search)) {
    send('qr_scan');
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (_) {}
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a,button');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/^tel:/.test(href)) send('call_click', location.pathname);
    else if (/\.pdf($|\?)/i.test(href)) send('spec_download', href.split('/').pop().replace(/\.pdf.*/i, ''));
    else if (a.id === 'snap') send('design_download');
  }, true);
})();
