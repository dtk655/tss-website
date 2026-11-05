(function () {
  if (window.__tssChatLoaded) return;
  window.__tssChatLoaded = true;

  var WEBHOOK = 'https://dylan-tss.app.n8n.cloud/webhook/dfdd5bcb-7e22-4c54-aaca-b2a725b67b61/chat';
  var BOT_NAME = 'Coney';
  var PHONE = '908-561-4800';
  var EMAIL = 'info@trafficsafetyservice.com';
  var WELCOME = [
    "Hi, I'm " + BOT_NAME + ", Traffic Safety Service's AI shopping assistant.",
    'I can help you find the right products, check rentals, or put together a quote right away. What are you working on?'
  ];
  var CHIPS = ['Request a quote', 'Equipment rentals', 'Lane closure services', 'WATERCADE barriers'];

  /* ---------- per-visit storage (cleared when the tab closes) ---------- */
  function sGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function sSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  function newId() {
    try { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
    });
  }
  var sessionId = sGet('tss_chat_sid');
  if (!sessionId) { sessionId = newId(); sSet('tss_chat_sid', sessionId); }
  var log = [];
  try { log = JSON.parse(sGet('tss_chat_log') || '[]') || []; } catch (e) { log = []; }
  function saveLog() { sSet('tss_chat_log', JSON.stringify(log.slice(-40))); }

  var mq = window.matchMedia ? window.matchMedia('(max-width: 640px)') : { matches: false };
  function isMobile() { return mq.matches; }

  /* ---------- Coney ---------- */
  var CONE_ID = 0;
  function cone(cls) {
    var g = 'tssConeGrad' + (CONE_ID++);
    return '<svg class="cone ' + (cls || '') + '" viewBox="0 0 100 116" aria-hidden="true">' +
      '<defs><linearGradient id="' + g + '" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#e85a00"/><stop offset=".45" stop-color="#ff7d1a"/><stop offset="1" stop-color="#d94f00"/>' +
      '</linearGradient></defs>' +
      '<rect x="9" y="97" width="82" height="13" rx="4" fill="#26292e"/>' +
      '<rect x="9" y="97" width="82" height="4" rx="2" fill="#3a3f46"/>' +
      '<path d="M44 9 Q50 3 56 9 L84 98 L16 98 Z" fill="url(#' + g + ')"/>' +
      '<path d="M39.7 21 L60.3 21 L63 30 L37 30 Z" fill="#f4f6f8"/>' +
      '<path d="M22.7 80 L77.3 80 L80.3 90 L19.7 90 Z" fill="#f4f6f8"/>' +
      '<path d="M34 42.5 Q40 39.5 45 42" stroke="#7a2a00" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M55 42 Q60 39.5 66 42.5" stroke="#7a2a00" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<g class="eye"><circle cx="40" cy="51" r="7" fill="#fff"/><circle cx="41" cy="52" r="3.8" fill="#1f2933"/><circle cx="42.4" cy="50.4" r="1.3" fill="#fff"/></g>' +
      '<g class="eye"><circle cx="60" cy="51" r="7" fill="#fff"/><circle cx="61" cy="52" r="3.8" fill="#1f2933"/><circle cx="62.4" cy="50.4" r="1.3" fill="#fff"/></g>' +
      '<ellipse cx="31.5" cy="63" rx="4.2" ry="2.6" fill="#ffb199" opacity=".8"/>' +
      '<ellipse cx="68.5" cy="63" rx="4.2" ry="2.6" fill="#ffb199" opacity=".8"/>' +
      '<g class="mouth"><path d="M40.5 62 Q50 75 59.5 62 Z" fill="#5b1d06"/><path d="M45 68 Q50 71.5 55 68 Q50 65.8 45 68 Z" fill="#ff8f86"/></g>' +
      '</svg>';
  }

  /* ---------- styles ---------- */
  var css = '' +
    ':host{all:initial}' +
    '*{box-sizing:border-box;margin:0;padding:0}' +
    '.wrap{--red:#b60606;--red-dark:#8f0505;--char:#1f2933;--char-2:#111820;--ink:#1f2933;--muted:#6b7480;--line:#e4e7eb;--bg:#f5f6f8;' +
      'font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}' +
    'button,textarea{font-family:inherit}' +

    /* only the big cones animate (cheap transform animations) */
    '.head-cone .eye,.launch-cone .eye{transform-box:fill-box;transform-origin:center;animation:blink 5.5s infinite}' +
    '.cone .mouth{transform-box:fill-box;transform-origin:50% 0}' +
    '.talking .mouth{animation:talk .22s ease-in-out infinite alternate}' +
    '@keyframes blink{0%,95%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}' +
    '@keyframes talk{from{transform:scaleY(.35)}to{transform:scaleY(1.15)}}' +
    '@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}' +
    '@keyframes pop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}' +
    '@keyframes msg{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}' +
    '@keyframes dot{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}' +

    '.launcher{position:fixed;right:22px;bottom:22px;width:74px;height:74px;overflow:visible;border-radius:50%;border:0;cursor:pointer;background:#fff;' +
      'box-shadow:0 10px 28px rgba(17,24,32,.28),0 0 0 3px var(--red) inset;display:grid;place-items:center;z-index:2147483000;transition:transform .18s ease}' +
    '.launcher:hover{transform:translateY(-2px)}' +
    '.launcher:focus-visible{outline:3px solid #f2a900;outline-offset:3px}' +
    '.launcher .cone{width:58px;height:68px;margin-top:-16px;animation:bob 3s ease-in-out infinite}' +
    '.launcher .x{display:none;width:24px;height:24px;stroke:#fff;stroke-width:2.5;fill:none}' +
    '.open .launcher{background:var(--char);box-shadow:0 10px 28px rgba(17,24,32,.3)}' +
    '.open .launcher .cone{display:none}.open .launcher .x{display:block}' +

    '.teaser{position:fixed;right:110px;bottom:30px;width:250px;background:#fff;color:var(--ink);border-radius:16px;padding:13px 34px 13px 15px;border:1px solid var(--line);' +
      'box-shadow:0 12px 32px rgba(17,24,32,.2);font-size:14px;line-height:1.45;z-index:2147483000;cursor:pointer;animation:pop .35s ease both}' +
    '.teaser:after{content:"";position:absolute;right:-8px;bottom:22px;width:14px;height:14px;background:#fff;border-right:1px solid var(--line);border-top:1px solid var(--line);transform:rotate(45deg)}' +
    '.teaser b{display:block;font-size:14px;color:var(--ink);margin-bottom:3px}' +
    '.teaser .tag{display:inline-block;margin-left:5px;font-size:10px;font-weight:800;letter-spacing:.5px;padding:1px 6px;border-radius:999px;background:var(--red);color:#fff;vertical-align:1px}' +
    '.teaser .cta{display:inline-block;margin-top:8px;font-size:13px;font-weight:700;color:var(--red)}' +
    '.teaser .tx{position:absolute;top:6px;right:6px;width:24px;height:24px;border:0;background:none;color:var(--muted);font-size:17px;cursor:pointer;border-radius:50%}' +
    '.open .teaser{display:none}' +

    '.backdrop{display:none}' +

    '.panel{position:fixed;right:22px;bottom:110px;width:384px;height:min(640px,calc(100vh - 130px));background:#fff;border-radius:18px;overflow:hidden;' +
      'box-shadow:0 24px 60px rgba(17,24,32,.28),0 2px 8px rgba(17,24,32,.08);display:none;flex-direction:column;z-index:2147483001}' +
    '.open .panel{display:flex;animation:pop .28s cubic-bezier(.2,.8,.2,1) both}' +

    '.head{position:relative;background:linear-gradient(135deg,var(--char),var(--char-2));color:#fff;padding:16px 16px 24px;display:flex;align-items:center;gap:12px;flex:none}' +
    '.head:after{content:"";position:absolute;left:0;right:0;bottom:0;height:8px;background:repeating-linear-gradient(-45deg,var(--red) 0 12px,#fff 12px 24px)}' +
    '.avatar{width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;flex:none}' +
    '.avatar .cone{width:46px;height:54px;margin-top:2px}' +
    '.who{flex:1;min-width:0}' +
    '.ai{display:inline-block;vertical-align:2px;margin-left:6px;font-size:10.5px;font-weight:800;letter-spacing:.6px;padding:2px 7px;border-radius:999px;background:var(--red);color:#fff}' +
    '.name{font-size:17px;font-weight:700;letter-spacing:.1px;line-height:1.2}' +
    '.sub{font-size:12.5px;color:#c3cbd4;margin-top:2px}' +
    '.status{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#d7dde3;margin-top:5px}' +
    '.status i{width:8px;height:8px;border-radius:50%;background:#3ccf6e;box-shadow:0 0 0 3px rgba(60,207,110,.2)}' +
    '.hbtn{width:36px;height:36px;border-radius:10px;border:0;background:rgba(255,255,255,.1);color:#fff;cursor:pointer;display:grid;place-items:center;flex:none;align-self:flex-start}' +
    '.hbtn:hover{background:rgba(255,255,255,.18)}' +
    '.hbtn svg{width:18px;height:18px;stroke:currentColor;stroke-width:2.4;fill:none}' +

    '.msgs{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;background:var(--bg);padding:18px 14px 10px;display:flex;flex-direction:column;gap:10px}' +
    '.row{display:flex;gap:8px;align-items:flex-end;animation:msg .22s ease both}' +
    '.row.restored{animation:none}' +
    '.row.user{justify-content:flex-end}' +
    '.mini{width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid var(--line);display:grid;place-items:center;flex:none}' +
    '.mini .cone{width:23px;height:27px;margin-top:1px}' +
    '.row.grouped .mini{visibility:hidden}' +
    '.bubble{max-width:80%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.5;overflow-wrap:anywhere}' +
    '.bot .bubble{background:#fff;border:1px solid var(--line);border-bottom-left-radius:5px;color:var(--ink)}' +
    '.user .bubble{background:var(--red);color:#fff;border-bottom-right-radius:5px}' +
    '.bubble p+p,.bubble p+ul,.bubble ul+p{margin-top:8px}' +
    '.bubble ul{padding-left:18px}.bubble li+li{margin-top:3px}' +
    '.bubble a{color:var(--red);font-weight:600;text-decoration:underline;text-underline-offset:2px}' +
    '.user .bubble a{color:#fff}' +
    '.typing .bubble{display:flex;gap:4px;padding:13px 14px}' +
    '.typing .bubble span{width:7px;height:7px;border-radius:50%;background:#9aa3ad;animation:dot 1.2s infinite}' +
    '.typing .bubble span:nth-child(2){animation-delay:.15s}.typing .bubble span:nth-child(3){animation-delay:.3s}' +
    '.chips{display:flex;flex-wrap:wrap;gap:8px;padding:2px 0 4px 40px}' +
    '.chip{border:1px solid #d9dde2;background:#fff;color:var(--ink);font-size:13px;font-weight:600;padding:8px 12px;border-radius:999px;cursor:pointer}' +
    '.chip:hover{border-color:var(--red);color:var(--red);background:#fff5f5}' +

    '.compose{border-top:1px solid var(--line);background:#fff;padding:10px 12px;display:flex;gap:8px;align-items:flex-end;flex:none}' +
    '.compose textarea{flex:1;resize:none;border:1px solid transparent;background:#f1f3f5;border-radius:14px;padding:10px 13px;font-size:14px;color:var(--ink);' +
      'line-height:1.4;max-height:110px;outline:none;-webkit-appearance:none;appearance:none}' +
    '.compose textarea:focus{border-color:#c9ced4;background:#fff}' +
    '.send{width:42px;height:42px;border-radius:50%;border:0;background:var(--red);color:#fff;cursor:pointer;display:grid;place-items:center;flex:none}' +
    '.send:hover{background:var(--red-dark)}.send:disabled{opacity:.4;cursor:default;background:var(--red)}' +
    '.send svg{width:18px;height:18px;fill:currentColor;margin-left:2px}' +
    '.foot{font-size:11px;color:var(--muted);text-align:center;padding:0 12px 9px;background:#fff;flex:none}' +
    '.foot a{color:var(--muted)}' +

    /* ---------- phones: bottom sheet that sits above the keyboard ---------- */
    '@media (max-width:640px){' +
      '.launcher{right:16px;bottom:16px;width:64px;height:64px}' +
      '.launcher .cone{width:50px;height:58px;margin-top:-12px;animation:none}' +
      '.open .launcher{display:none}' +
      '.teaser{right:90px;bottom:20px;width:210px;font-size:13px;padding:11px 30px 11px 13px}.teaser b{font-size:13.5px}.teaser .cta{margin-top:6px}.teaser:after{bottom:18px}' +
      '.backdrop{display:block;position:fixed;inset:0;background:rgba(17,24,32,.45);opacity:0;pointer-events:none;transition:opacity .25s ease;z-index:2147483000}' +
      '.open .backdrop{opacity:1;pointer-events:auto}' +
      '.panel{display:flex;left:0;right:0;bottom:0;width:100%;height:85vh;border-radius:20px 20px 0 0;box-shadow:0 -8px 30px rgba(17,24,32,.25);' +
        'transform:translate3d(0,105%,0);visibility:hidden;transition:transform .28s cubic-bezier(.2,.8,.2,1),visibility 0s linear .28s;will-change:transform}' +
      '.open .panel{animation:none;transform:translate3d(0,0,0);visibility:visible;transition:transform .28s cubic-bezier(.2,.8,.2,1),visibility 0s}' +
      '.head{padding:16px 14px 20px;gap:10px}' +
      '.head:before{content:"";position:absolute;top:6px;left:50%;width:36px;height:4px;margin-left:-18px;border-radius:2px;background:rgba(255,255,255,.3)}' +
      '.avatar{width:48px;height:48px}.avatar .cone{width:36px;height:42px}' +
      '.name{font-size:16px}.status{margin-top:3px}' +
      '.msgs{padding:14px 12px 8px}' +
      '.bubble{max-width:84%;font-size:15px}' +
      '.chip{font-size:14px;padding:9px 13px}' +
      '.compose{padding:8px 10px}' +
      '.compose textarea{font-size:16px}' +
      '.foot{padding-bottom:calc(8px + env(safe-area-inset-bottom))}' +
      '.kb .foot{display:none}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}';

  /* ---------- build ---------- */
  var host = document.createElement('div');
  host.id = 'tss-chat-assistant';
  document.body.appendChild(host);
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

  root.innerHTML = '<style>' + css + '</style>' +
    '<div class="wrap">' +
      '<div class="teaser" role="button" tabindex="0"><b>Hi, I\'m ' + BOT_NAME + '<span class="tag">AI</span></b>Your AI shopping assistant. I can help you find what you need right away.<br><span class="cta">Ask me anything &rarr;</span><button class="tx" aria-label="Dismiss">&times;</button></div>' +
      '<div class="backdrop"></div>' +
      '<section class="panel" role="dialog" aria-label="Chat with ' + BOT_NAME + '">' +
        '<header class="head">' +
          '<div class="avatar">' + cone('head-cone') + '</div>' +
          '<div class="who"><div class="name">' + BOT_NAME + ' <span class="ai">AI</span></div><div class="sub">AI shopping assistant</div>' +
          '<div class="status"><i></i>Online now &middot; Instant answers</div></div>' +
          '<button class="hbtn close" aria-label="Minimize chat"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '</header>' +
        '<div class="msgs" aria-live="polite"></div>' +
        '<form class="compose"><textarea rows="1" placeholder="Ask about products, rentals or a quote..." aria-label="Message" enterkeyhint="send"></textarea>' +
          '<button class="send" type="submit" aria-label="Send" disabled><svg viewBox="0 0 24 24"><path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.99.99 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/></svg></button></form>' +
        '<div class="foot">AI assistant &middot; Need a person? Call <a href="tel:+19085614800">' + PHONE + '</a></div>' +
      '</section>' +
      '<button class="launcher" aria-label="Chat with ' + BOT_NAME + '">' + cone('launch-cone') +
        '<svg class="x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '</div>';

  var $ = function (s) { return root.querySelector(s); };
  var wrap = $('.wrap'), panel = $('.panel'), msgs = $('.msgs'), ta = $('textarea'), sendBtn = $('.send'), headCone = $('.head-cone');
  var started = false, busy = false, talkTimer = null;
  ta.placeholder = isMobile() ? 'Type a message...' : 'Ask about products, rentals or a quote...';

  /* ---------- text rendering ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function inline(s) {
    s = esc(s);
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return s;
  }
  function md(text) {
    var lines = String(text || '').split(/\r?\n/), out = '', list = null, para = [];
    function flushPara() { if (para.length) { out += '<p>' + para.join('<br>') + '</p>'; para = []; } }
    function flushList() { if (list) { out += '<ul>' + list.join('') + '</ul>'; list = null; } }
    lines.forEach(function (l) {
      var m = l.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
      if (m) { flushPara(); (list = list || []).push('<li>' + inline(m[1]) + '</li>'); }
      else if (!l.trim()) { flushPara(); flushList(); }
      else { flushList(); para.push(inline(l)); }
    });
    flushPara(); flushList();
    return out;
  }

  /* ---------- messages ---------- */
  function talk(ms) {
    headCone.classList.add('talking');
    clearTimeout(talkTimer);
    if (ms) talkTimer = setTimeout(function () { headCone.classList.remove('talking'); }, ms);
  }
  function scroll() { msgs.scrollTop = msgs.scrollHeight; }
  function addMsg(who, text, restored) {
    var last = msgs.lastElementChild;
    var cont = last && last.classList.contains('row') && last.classList.contains(who) && !last.classList.contains('typing');
    if (cont) last.classList.add('grouped');
    var row = document.createElement('div');
    row.className = 'row ' + who + (restored ? ' restored' : '');
    row.innerHTML = (who === 'bot' ? '<div class="mini">' + cone() + '</div>' : '') +
      '<div class="bubble">' + (who === 'bot' ? md(text) : esc(text).replace(/\n/g, '<br>')) + '</div>';
    msgs.appendChild(row);
    if (!restored) { log.push({ w: who, t: text }); saveLog(); }
    scroll();
    return row;
  }
  function addChips() {
    var c = document.createElement('div');
    c.className = 'chips';
    CHIPS.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = t;
      b.onclick = function () { send(t); };
      c.appendChild(b);
    });
    msgs.appendChild(c); scroll();
  }
  function showTyping() {
    var row = document.createElement('div');
    row.className = 'row bot typing';
    row.innerHTML = '<div class="mini">' + cone('talking') + '</div><div class="bubble"><span></span><span></span><span></span></div>';
    msgs.appendChild(row); scroll();
    return row;
  }
  function post(body) {
    body.sessionId = sessionId;
    return fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) { try { return JSON.parse(t); } catch (e) { return { output: t }; } });
  }
  function replyText(d) {
    if (Array.isArray(d)) d = d[0] || {};
    return (d && (d.output || d.text || d.message || (d.data && d.data.output))) || '';
  }

  function welcome(i) {
    i = i || 0;
    if (i >= WELCOME.length) { addChips(); return; }
    talk(900);
    setTimeout(function () { addMsg('bot', WELCOME[i]); welcome(i + 1); }, i ? 650 : 250);
  }
  function start() {
    if (started) return;
    started = true;
    if (!log.length) return welcome();
    log.forEach(function (m) { addMsg(m.w, m.t, true); });
    var userSpoke = log.some(function (m) { return m.w === 'user'; });
    if (!userSpoke) addChips();
    scroll();
  }

  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    var chips = root.querySelector('.chips'); if (chips) chips.remove();
    addMsg('user', text);
    ta.value = ''; resize(); sendBtn.disabled = true;
    var typing = showTyping();
    talk();
    post({ action: 'sendMessage', chatInput: text }).then(function (d) {
      typing.remove();
      var out = replyText(d) || "Sorry, I didn't catch that. Could you rephrase?";
      addMsg('bot', out);
      talk(Math.min(4000, 600 + out.length * 18));
    }).catch(function () {
      typing.remove();
      addMsg('bot', "Sorry, I'm having trouble connecting right now. Please call " + PHONE + ' or email ' + EMAIL + '.');
      talk(1500);
    }).then(function () {
      busy = false; sendBtn.disabled = !ta.value.trim();
      if (!isMobile()) ta.focus();
    });
  }
  function resize() { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 110) + 'px'; }

  /* ---------- phone: keep the sheet above the keyboard, stop the page scrolling behind ---------- */
  var locked = false, lockY = 0, saved = null;
  function lockPage() {
    if (locked || !isMobile()) return;
    locked = true;
    lockY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var b = document.body.style;
    saved = { position: b.position, top: b.top, left: b.left, right: b.right, width: b.width, overflow: b.overflow };
    b.position = 'fixed'; b.top = (-lockY) + 'px'; b.left = '0'; b.right = '0'; b.width = '100%'; b.overflow = 'hidden';
  }
  function unlockPage() {
    if (!locked) return;
    locked = false;
    var b = document.body.style;
    b.position = saved.position; b.top = saved.top; b.left = saved.left; b.right = saved.right; b.width = saved.width; b.overflow = saved.overflow;
    window.scrollTo(0, lockY);
  }
  var fitFrame = null;
  function fit() {
    if (fitFrame) return;
    fitFrame = requestAnimationFrame(function () {
      fitFrame = null;
      if (!isMobile() || !wrap.classList.contains('open')) {
        panel.style.height = ''; panel.style.bottom = ''; wrap.classList.remove('kb');
        return;
      }
      var vv = window.visualViewport;
      var ih = window.innerHeight;
      var vh = vv ? vv.height : ih;
      var top = vv ? vv.offsetTop : 0;
      var keyboard = ih - vh > 120;
      wrap.classList.toggle('kb', keyboard);
      panel.style.height = Math.round(keyboard ? vh : vh * 0.85) + 'px';
      panel.style.bottom = Math.max(0, Math.round(ih - vh - top)) + 'px';
      scroll();
    });
  }
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fit);
    window.visualViewport.addEventListener('scroll', fit);
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
  ta.addEventListener('focus', function () { setTimeout(fit, 50); setTimeout(fit, 350); });
  ta.addEventListener('blur', function () { setTimeout(fit, 50); setTimeout(fit, 350); });

  /* ---------- open / close ---------- */
  function open() {
    wrap.classList.add('open');
    sSet('tss_chat_open', '1');
    hideTeaser();
    lockPage();
    fit();
    start();
    if (!isMobile()) setTimeout(function () { ta.focus(); }, 250);
  }
  function close() {
    wrap.classList.remove('open', 'kb');
    sSet('tss_chat_open', '0');
    ta.blur();
    unlockPage();
    fit();
  }
  function hideTeaser() { var t = $('.teaser'); if (t) t.remove(); sSet('tss_chat_teaser', '1'); }

  $('.launcher').onclick = function () { wrap.classList.contains('open') ? close() : open(); };
  $('.close').onclick = close;
  $('.backdrop').onclick = close;
  $('.compose').onsubmit = function (e) { e.preventDefault(); send(ta.value); };
  ta.addEventListener('input', function () { resize(); sendBtn.disabled = busy || !ta.value.trim(); });
  ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(ta.value); } });
  root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('open')) close(); });
  if (mq.addEventListener) mq.addEventListener('change', function () { if (wrap.classList.contains('open')) { isMobile() ? lockPage() : unlockPage(); } fit(); });

  var teaser = $('.teaser');
  teaser.style.display = 'none';
  teaser.onclick = function (e) { if (e.target.classList.contains('tx')) { e.stopPropagation(); hideTeaser(); return; } open(); };

  /* returning to another page mid-visit: on desktop reopen the chat if it was open */
  if (sGet('tss_chat_open') === '1' && log.length && !isMobile()) {
    open();
  } else if (!sGet('tss_chat_teaser') && !log.length) {
    setTimeout(function () {
      if (wrap.classList.contains('open') || !$('.teaser')) return;
      teaser.style.display = '';
      var lc = $('.launch-cone'); lc.classList.add('talking');
      setTimeout(function () { lc.classList.remove('talking'); }, 1600);
    }, 2500);
  }

  /* public API for site tools: TSSChat.open(), TSSChat.ask("question") */
  window.TSSChat = {
    open: function () { if (!wrap.classList.contains('open')) open(); },
    ask: function (text) { if (!wrap.classList.contains('open')) open(); setTimeout(function () { send(text); }, 400); }
  };
})();
