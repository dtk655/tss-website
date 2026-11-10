#!/usr/bin/env python3
"""Replace the WATERCADE pages' header with the sitewide TSS commerce header (static copy).
Re-runnable: strips any previously injected tsshdr header, style and script first."""
import re, sys

HEADER = '''<header class="tsshdr">
<div class="tsshdr-main"><div class="tsshdr-wrap tsshdr-in">
<button type="button" class="tsshdr-menu" aria-expanded="false" aria-controls="tssmnav" aria-label="Menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
<a href="/" class="tsshdr-logo" aria-label="Traffic Safety Service home"><img src="/brand/tss-logo-tight.png" alt="TSS, Traffic Safety Service" width="400" height="161"></a>
<div class="tsshdr-search" data-tss-search>
<span class="tsshdr-coney" aria-hidden="true"><svg viewBox="0 0 100 116"><rect x="9" y="97" width="82" height="13" rx="4" fill="#1a1d21"/><path d="M44 9 Q50 3 56 9 L84 98 L16 98 Z" fill="#f26a1b"/><path d="M39.7 21 L60.3 21 L63 30 L37 30 Z" fill="#f4f6f8"/><path d="M22.7 80 L77.3 80 L80.3 90 L19.7 90 Z" fill="#f4f6f8"/><circle cx="40" cy="51" r="7" fill="#fff"/><circle cx="41" cy="52" r="3.8" fill="#1f2933"/><circle cx="60" cy="51" r="7" fill="#fff"/><circle cx="61" cy="52" r="3.8" fill="#1f2933"/><path d="M40.5 62 Q50 75 59.5 62 Z" fill="#5b1d06"/></svg></span>
<input type="search" placeholder="Ask Conner, your AI shopping assistant. Tell him what your job needs&hellip;" aria-label="Ask Conner, the AI shopping assistant, or search products" autocomplete="off" spellcheck="false">
<span class="tsshdr-ai" aria-hidden="true">AI</span>
<button type="button" class="tsshdr-searchbtn" data-ask-send aria-label="Ask Conner"><svg viewBox="0 0 24 24"><path d="M5 12h13 M12.5 5.5L19 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<div class="tsshdr-spanel" hidden></div>
</div>
<div class="tsshdr-act">
<a class="tsshdr-phone" href="tel:+19085614800" aria-label="Call 908-561-4800"><span class="tsshdr-phonebadge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.6 1.6a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg></span><span class="tsshdr-phonetxt"><small>Call us 24/7</small><b>908-561-4800</b></span></a>
<a href="/pages/request-a-quote" class="tsshdr-cta">Request a quote</a>
<button class="menu-btn" style="display:none!important" aria-hidden="true" tabindex="-1"><span class="menu-ico"><span></span><span></span><span></span></span></button>
</div></div>
<div class="tsshdr-msearch"><div class="tsshdr-wrap"><div class="tsshdr-search tsshdr-search--m" data-tss-search>
<span class="tsshdr-coney" aria-hidden="true"><svg viewBox="0 0 100 116"><rect x="9" y="97" width="82" height="13" rx="4" fill="#1a1d21"/><path d="M44 9 Q50 3 56 9 L84 98 L16 98 Z" fill="#f26a1b"/><path d="M39.7 21 L60.3 21 L63 30 L37 30 Z" fill="#f4f6f8"/><path d="M22.7 80 L77.3 80 L80.3 90 L19.7 90 Z" fill="#f4f6f8"/><circle cx="40" cy="51" r="7" fill="#fff"/><circle cx="41" cy="52" r="3.8" fill="#1f2933"/><circle cx="60" cy="51" r="7" fill="#fff"/><circle cx="61" cy="52" r="3.8" fill="#1f2933"/><path d="M40.5 62 Q50 75 59.5 62 Z" fill="#5b1d06"/></svg></span>
<input type="search" placeholder="Ask Conner, your AI assistant&hellip;" aria-label="Ask Conner, the AI shopping assistant, or search products" autocomplete="off" spellcheck="false">
<button type="button" class="tsshdr-searchbtn" data-ask-send aria-label="Ask Conner"><svg viewBox="0 0 24 24"><path d="M5 12h13 M12.5 5.5L19 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<div class="tsshdr-spanel" hidden></div>
</div></div></div>
</div>
<div class="tsshdr-navrow"><div class="tsshdr-wrap tsshdr-navin">
<nav class="tsshdr-nav" aria-label="Main">
<a href="/collections"><span>Products</span></a>
<a href="/collections/equipment-rentals"><span>Equipment</span></a>
<a href="/collections/truck-rentals"><span>Fleet</span></a>
<a href="/pages/lane-closure"><span>Lane Closures</span></a>
<a href="/watercade/" aria-current="page" aria-label="WATERCADE"><span class="tsshdr-wc"><img src="/brand/watercade-nav.png" alt="" width="540" height="72"></span></a>
<div class="tsshdr-more"><a href="#" aria-haspopup="true" aria-expanded="false" data-tssmore><span>More</span><svg class="tsshdr-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a><div class="tsshdr-moremenu"><a href="/pages/custom-stenciling"><b>Custom shop</b><small>Your colors, logo and stenciling</small></a><a href="/tools"><b>Planning tools</b><small>Work zone builder, closure plan, calculators</small></a><a href="/collections/equipment-rentals"><b>All rentals</b><small>Everything you can rent, in one place</small></a><a href="/pages/about"><b>About TSS</b><small>Since 1971, South Plainfield, NJ</small></a><a href="/pages/contact"><b>Contact</b><small>908-561-4800</small></a></div></div>
</nav>
<p class="tsshdr-tag">Ships nationwide &middot; Rentals &amp; crews in NJ, NY, PA, CT</p>
</div></div>
__DRAWER_HTML__
</header>
<script id="tss-shell-js">(function(){
var b=document.querySelector('.tsshdr-menu'),d=document.querySelector('[data-mdrw]');
if(b&&d){var ct=0;function chat(){return document.getElementById('tss-chat-assistant')}
function op(){clearTimeout(ct);d.hidden=false;requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('is-open')})});b.setAttribute('aria-expanded','true');document.documentElement.style.overflow='hidden';var c=chat();if(c)c.style.visibility='hidden';setTimeout(function(){var x=d.querySelector('.tssd__x');x&&x.focus()},60)}
function cl(){d.classList.remove('is-open');b.setAttribute('aria-expanded','false');document.documentElement.style.overflow='';var c=chat();if(c)c.style.visibility='';ct=setTimeout(function(){d.hidden=true},380);b.focus()}
b.addEventListener('click',function(){d.classList.contains('is-open')?cl():op()});
d.querySelectorAll('[data-mclose]').forEach(function(e){e.addEventListener('click',cl)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.classList.contains('is-open'))cl()});
d.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setTimeout(cl,50)})});
var mk=d.querySelector('[data-mask]');mk&&mk.addEventListener('click',function(){cl();setTimeout(function(){window.TSSChat&&window.TSSChat.open()},250)});
var acs=[].slice.call(d.querySelectorAll('[data-macc]'));acs.forEach(function(ac){ac.addEventListener('click',function(){var on=ac.getAttribute('aria-expanded')!=='true';acs.forEach(function(o){o.setAttribute('aria-expanded','false');o.closest('.tssd__grp').classList.remove('is-exp')});ac.setAttribute('aria-expanded',String(on));ac.closest('.tssd__grp').classList.toggle('is-exp',on)})});
var sx=0,sy=0,pn=d.querySelector('.tssd__panel');pn.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});pn.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(dx<-70&&Math.abs(dy)<60)cl()},{passive:true});
addEventListener('resize',function(){if(innerWidth>1010&&d.classList.contains('is-open'))cl()});}
var mo=document.querySelector('[data-tssmore]');if(mo){var mw=mo.parentNode;function ms(on){mw.classList.toggle('is-open',on);mo.setAttribute('aria-expanded',String(on))}mo.addEventListener('click',function(e){e.preventDefault();ms(!mw.classList.contains('is-open'))});mw.addEventListener('mouseenter',function(){ms(true)});mw.addEventListener('mouseleave',function(){ms(false)});document.addEventListener('click',function(e){if(!mw.contains(e.target))ms(false)});document.addEventListener('keydown',function(e){if(e.key==='Escape')ms(false)})}
var h=document.querySelector('.tsshdr');function s(){h.classList.toggle('is-stuck',window.scrollY>56)}addEventListener('scroll',s,{passive:true});s();
var idx=null,loading=null;function load(){return loading||(loading=fetch('/search-index.json').then(function(r){return r.json()}).then(function(d){idx=d}).catch(function(){idx={cats:[],prods:[]}}))}
function fmt(n){return Number(n).toLocaleString('en-US',{style:'currency',currency:'USD'})}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function score(t,q){t=t.toLowerCase();if(t.indexOf(q)===0)return 3;if(t.indexOf(' '+q)>-1)return 2;if(t.indexOf(q)>-1)return 1;var ks=q.split(/\\s+/).filter(Boolean);return ks.length>1&&ks.every(function(w){return t.indexOf(w)>-1})?1:0}
function mark(t,q){var i=t.toLowerCase().indexOf(q);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length))}
document.querySelectorAll('[data-tss-search]').forEach(function(root){
var input=root.querySelector('input'),panel=root.querySelector('.tsshdr-spanel'),active=-1;
function close(){panel.hidden=true;active=-1}
function ask(){var q=input.value.trim();close();if(window.TSSChat){q?window.TSSChat.ask(q):window.TSSChat.open();input.value='';}else{location.href='/pages/request-a-quote';}}
function go(row){if(row.hasAttribute('data-ask-row')){ask()}else{location.href=row.getAttribute('href')}}
function render(){var q=input.value.trim().toLowerCase();if(!q||!idx){close();return}
var cats=idx.cats.map(function(c){return[score(c.t,q),c]}).filter(function(x){return x[0]}).sort(function(a,b){return b[0]-a[0]}).slice(0,3);
var prods=idx.prods.map(function(p){return[score(p.t,q),p]}).filter(function(x){return x[0]}).sort(function(a,b){return b[0]-a[0]}).slice(0,6);
if(!cats.length&&!prods.length){panel.innerHTML='<div class="tsshdr-snone">Nothing matches \\u201c'+esc(input.value.trim())+'\\u201d.<br><a href="/pages/request-a-quote">Ask us for a quote</a> or call 908-561-4800.</div>';panel.hidden=false;return}
var html='';
if(cats.length)html+='<p class="tsshdr-sh">Categories</p>'+cats.map(function(x){var c=x[1];return '<a class="tsshdr-srow" href="/collections/'+c.h+'"><span class="tsshdr-sthumb"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span><span>'+mark(c.t,q)+'</span><small>'+c.n+'</small></a>'}).join('');
if(prods.length)html+='<p class="tsshdr-sh">Products</p>'+prods.map(function(x){var p=x[1];return '<a class="tsshdr-srow" href="/products/'+p.h+'">'+(p.i?'<img src="'+p.i+'" alt="" loading="lazy">':'<span class="tsshdr-sthumb"></span>')+'<span>'+mark(p.t,q)+'</span><small>'+(p.r?'Rental':(p.pr!=null?fmt(p.pr):''))+'</small></a>'}).join('');
panel.innerHTML=html;panel.hidden=false;active=-1}
input.addEventListener('focus',function(){load().then(function(){input.value.trim()&&render()})});
input.addEventListener('input',function(){load().then(render)});
input.addEventListener('keydown',function(e){var rows=[].slice.call(panel.querySelectorAll('.tsshdr-srow'));
if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!rows.length)return;active=(active+(e.key==='ArrowDown'?1:-1)+rows.length)%rows.length;rows.forEach(function(r,i){r.classList.toggle('is-active',i===active)});rows[active].scrollIntoView({block:'nearest'})}
else if(e.key==='Enter'){e.preventDefault();if(!panel.hidden&&active>=0&&rows[active]){go(rows[active])}else{ask()}}
else if(e.key==='Escape')close()});
panel.addEventListener('click',function(e){if(e.target.closest('[data-ask-row]'))ask()});
var sb=root.querySelector('[data-ask-send]');sb&&sb.addEventListener('click',ask);
document.addEventListener('click',function(e){if(!root.contains(e.target))close()});
});
})();</script><script src="/coney.js" defer></script>'''

STYLE = '''<style id="tss-shell">
@font-face{font-family:'Archivo Variable';src:url('/brand/archivo-var.woff2') format('woff2-variations');font-weight:100 900;font-style:normal;font-display:swap}
.tsshdr{position:sticky;top:0;z-index:40;background:#fff;font-family:'Archivo Variable','Archivo','Helvetica Neue',Arial,sans-serif;line-height:1.4}
.tsshdr a{color:inherit}
.tsshdr-wrap{max-width:none;margin:0 auto;padding-inline:clamp(18px,4vw,160px)}
.tsshdr-main{position:relative;z-index:2;background:rgba(255,255,255,.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);transition:box-shadow .25s ease}
.tsshdr.is-stuck .tsshdr-main{box-shadow:0 12px 32px -20px rgba(20,23,26,.35)}
.tsshdr-in{height:92px;display:flex;align-items:center;gap:clamp(12px,1.4vw,24px);transition:height .25s ease}
.tsshdr.is-stuck .tsshdr-in{height:72px}
.tsshdr-logo{flex:none;display:flex}
.tsshdr-logo img{height:55px;width:auto;display:block;transition:height .25s ease}
.tsshdr.is-stuck .tsshdr-logo img{height:54px}
.tsshdr-search{position:relative;flex:1;min-width:0;max-width:min(860px,46vw);margin-inline:auto;height:50px}
.tsshdr-search input{width:100%;height:100%;padding:12px 84px 11px 52px;border:1.5px solid #cfd4d9;border-radius:999px;background:#f5f6f7;font:inherit;font-size:.98rem;color:#14171a;transition:background .15s,border-color .15s,box-shadow .15s}
.tsshdr-search input::placeholder{color:#5b6670}
.tsshdr-search input:hover{background:#eceef0}
.tsshdr-search input:focus{outline:none;background:#fff;border-color:#14171a;box-shadow:0 12px 32px -16px rgba(20,23,26,.25)}
.tsshdr-search input::-webkit-search-cancel-button{-webkit-appearance:none}
.tsshdr-coney{position:absolute;left:16px;top:50%;translate:0 -50%;width:25px;height:29px;pointer-events:none}
.tsshdr-coney svg{width:100%;height:100%;display:block}
.tsshdr-ai{position:absolute;right:52px;top:50%;translate:0 -50%;padding:3px 7px 2px;border-radius:6px;background:#f5b800;color:#3a2c00;font-size:.68rem;letter-spacing:.06em;font-variation-settings:'wght' 800;pointer-events:none}
.tsshdr-searchbtn{position:absolute;right:5px;top:5px;bottom:5px;aspect-ratio:1;display:grid;place-items:center;border:0;border-radius:50%;background:#b60606;color:#fff;cursor:pointer;transition:background .15s}
.tsshdr-searchbtn:hover{background:#940505}
.tsshdr-srow-ask{width:100%;border:0;background:#fbeeee;font:inherit;cursor:pointer;text-align:left;margin-bottom:4px}
.tsshdr-srow-ask:hover,.tsshdr-srow-ask.is-active{background:#f6dede}
.tsshdr-srow-ask>span:not(.tsshdr-askthumb){color:#b60606!important;font-variation-settings:'wght' 680}
.tsshdr-askthumb{width:40px;height:40px;border-radius:7px;background:#b60606;color:#fff;display:grid;place-items:center;flex:none}
.tsshdr-askthumb svg{width:20px;height:20px}
.tsshdr-searchbtn svg{width:18px;height:18px}
.tsshdr-spanel{position:absolute;top:calc(100% + 10px);left:0;right:0;max-height:min(66vh,540px);overflow:auto;background:#fff;border:1px solid #e4e7ea;border-radius:12px;box-shadow:0 24px 60px -24px rgba(20,23,26,.35);padding:8px;z-index:59}
.tsshdr-spanel[hidden]{display:none}
.tsshdr-sh{margin:6px 10px 4px;font-size:.78rem;letter-spacing:.04em;color:#5b6670;font-variation-settings:'wght' 680;text-transform:uppercase}
.tsshdr-srow{display:flex;align-items:center;gap:12px;padding:8px 10px;border-radius:9px;text-decoration:none}
.tsshdr-srow:hover,.tsshdr-srow.is-active{background:#f5f6f7}
.tsshdr-srow img{width:40px;height:40px;object-fit:contain;border:1px solid #eceef0;border-radius:7px;background:#fff;flex:none}
.tsshdr-sthumb{width:40px;height:40px;border-radius:7px;background:#f5f6f7;color:#5b6670;display:grid;place-items:center;flex:none}
.tsshdr-sthumb svg{width:18px;height:18px}
.tsshdr-srow>span:not(.tsshdr-sthumb):not(.tsshdr-askthumb){flex:1;font-size:.95rem;font-variation-settings:'wght' 580;line-height:1.3;color:#14171a}
.tsshdr-srow mark{background:none;color:#b60606;font-variation-settings:'wght' 720}
.tsshdr-srow small{color:#5b6670;font-size:.85rem;white-space:nowrap}
.tsshdr-snone{padding:16px 14px;color:#5b6670;font-size:.95rem;line-height:1.5}
.tsshdr-snone a{color:#b60606;font-variation-settings:'wght' 650}
.tsshdr-act{display:flex;align-items:center;gap:5px;flex:none}
.tsshdr-phone{display:flex;align-items:center;gap:10px;text-decoration:none;white-space:nowrap;color:#14171a}
.tsshdr-phonebadge{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#fbeeee;color:#b60606;flex:none;transition:background .15s,color .15s}
.tsshdr-phonebadge svg{width:19px;height:19px}
.tsshdr-phone:hover .tsshdr-phonebadge{background:#b60606;color:#fff}
.tsshdr-phonetxt{display:grid;line-height:1.2}
.tsshdr-phonetxt small{font-size:.78rem;color:#5b6670}
.tsshdr-phonetxt b{font-variation-settings:'wght' 700;font-size:.98rem}
.tsshdr-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:13px 24px 12px;margin-left:9px;border-radius:8px;background:#b60606;color:#fff!important;font-variation-settings:'wght' 640;font-size:1rem;text-decoration:none;line-height:1;white-space:nowrap;transition:background .15s}
.tsshdr-cta:hover{background:#940505}
.tsshdr-navrow{position:relative;z-index:1;background:#fff;border-top:1px solid #eceef0;border-bottom:1px solid #e4e7ea;transition:translate .28s ease,opacity .22s ease}
.tsshdr.is-stuck .tsshdr-navrow{position:absolute;left:0;right:0;translate:0 -105%;opacity:0;pointer-events:none}
.tsshdr-navin{display:flex;align-items:center;justify-content:space-between;gap:20px}
.tsshdr-nav{display:flex;gap:clamp(2px,.6vw,14px);margin-left:-12px}
.tsshdr-nav a{position:relative;display:flex;align-items:center;text-decoration:none;font-variation-settings:'wght' 620;font-size:.99rem;padding:13px 12px 12px;color:#353b41;white-space:nowrap;transition:color .14s}
.tsshdr-nav a span{position:relative}
.tsshdr-nav a span::after{content:'';position:absolute;left:0;right:100%;bottom:-13px;height:2.5px;background:#b60606;transition:right .22s cubic-bezier(.4,0,.2,1)}
.tsshdr-nav a:hover{color:#14171a}
.tsshdr-nav a:hover span::after{right:0}
.tsshdr-nav a[aria-current]{color:#14171a;font-variation-settings:'wght' 700}
.tsshdr-nav a[aria-current] span::after{right:0}
.tsshdr-more{position:relative;display:flex}.tsshdr-chev{width:14px;height:14px;margin-left:4px;transition:rotate .2s}.tsshdr-more.is-open .tsshdr-chev{rotate:180deg}
.tsshdr-nav .tsshdr-moremenu{position:absolute;top:100%;left:-8px;width:300px;display:grid;gap:2px;padding:8px;background:#fff;border:1px solid #e4e7ea;border-radius:16px;box-shadow:0 30px 60px -28px rgba(20,23,26,.35);opacity:0;translate:0 -6px;visibility:hidden;transition:opacity .2s,translate .2s,visibility .2s;z-index:60}
.tsshdr-more.is-open .tsshdr-moremenu{opacity:1;translate:0 0;visibility:visible}
.tsshdr-nav .tsshdr-moremenu a{display:grid;gap:2px;padding:11px 12px;border-radius:10px;white-space:normal;color:#14171a}.tsshdr-nav .tsshdr-moremenu a:hover{background:#f5f6f7}.tsshdr-moremenu b{font-variation-settings:'wght' 680;font-size:.98rem}.tsshdr-moremenu a:hover b{color:#b60606}.tsshdr-moremenu small{color:#5b6670;font-size:.82rem;font-variation-settings:'wght' 450}
.tsshdr-tag{margin:0;color:#5b6670;font-size:.86rem;white-space:nowrap}
.tsshdr-menu{display:none;width:44px;height:44px;place-items:center;background:none;border:0;border-radius:10px;cursor:pointer;color:#14171a;padding:0}
.tsshdr-menu:hover{background:#f5f6f7}
.tsshdr-menu svg{width:23px;height:23px}
.tsshdr-msearch{display:none;border-top:1px solid #e4e7ea;padding-block:10px}
.tsshdr-msearch .tsshdr-search{max-width:none;height:46px}
@media(max-width:1420px){.tsshdr-tag{display:none}}
@media(max-width:1230px){.tsshdr-phonetxt{display:none}.tsshdr-phone{gap:0}}
@media(max-width:640px){.tsshdr-ai{display:none}}
@media(max-width:1010px){.tsshdr-navrow,.tsshdr-cta,.tsshdr-phone,.tsshdr-in>.tsshdr-search{display:none}.tsshdr-menu{display:grid;justify-self:start}.tsshdr-in{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;height:82px}.tsshdr.is-stuck .tsshdr-in{height:72px}.tsshdr-logo{justify-self:center}.tsshdr-act{justify-self:end;margin-left:0}.tsshdr-logo img{height:50px}.tsshdr.is-stuck .tsshdr-logo img{height:54px}.tsshdr-msearch{display:block}}
.tsshdr-cta{border-radius:999px}
.tssd__wc{display:flex;align-items:center}.tssd__wc img{width:auto;display:block}.tssd .tssd__foot{margin-top:18px}
.tsshdr-wc{display:inline-flex;align-items:center}.tsshdr-wc img{height:20px;width:auto;display:block}
@media(min-width:1011px){.tssd{display:none!important}}
__DRAWER_CSS__
</style>'''

def drawer_css():
    h = open('src/components/Header.astro', encoding='utf8').read()
    a = h.index('  /* ---------- mobile drawer ---------- */')
    b = h.index('  /* hamburger morphs to X while open */', a)
    css = h[a:b].replace('.mdrw', '.tssd')
    tokens = '.tssd{--ink:#14171a;--ink-2:#353b41;--steel:#5b6670;--haze:#f5f6f7;--haze-2:#eceef0;--line:#e4e7ea;--line-dark:#cfd4d9;--red:#b60606;--red-tint:#fbeeee;--gold:#f5b800;font-family:\'Archivo Variable\',\'Archivo\',\'Helvetica Neue\',Arial,sans-serif;line-height:1.4}\n.tssd *,.tssd *::before,.tssd *::after{box-sizing:border-box}\n.tssd p{margin:0}\n.tssd a,.tssd button{color:var(--ink)!important;text-decoration:none!important}.tssd a.tssd__all,.tssd a.tssd__qa--red,.tssd a.tssd__btn--solid{color:#fff!important}.tssd .tssd__link.is-cur .tssd__lbl{color:var(--red)!important}\n'
    morph = '.tsshdr-menu svg path{transition:d .3s ease}.tsshdr-menu[aria-expanded="true"] svg path{d:path("M6 6L18 18M18 6L6 18")}\n@media (prefers-reduced-motion: reduce){.tssd__panel,.tssd__bg,.tssd__in,.tssd__sub{transition:none}}\n'
    return tokens + css + morph

STYLE = STYLE.replace('__DRAWER_CSS__', drawer_css())

def drawer_html():
    # The mobile drawer is copied from the built homepage (run `astro build` first) so it never drifts.
    h = open('dist/index.html', encoding='utf8').read()
    i = h.index('data-mdrw'); a = h.rfind('<div', 0, i); depth = 0; j = a
    for m in re.finditer(r'<(/?)div\b', h[a:]):
        depth += -1 if m.group(1) else 1
        if depth == 0: j = a + m.end(); break
    d = h[a:h.index('>', j) + 1]
    d = re.sub(r' data-astro-cid-[a-z0-9]+(="[^"]*")?', '', d).replace('mdrw', 'tssd').replace('id="mnav"', 'id="tssmnav"').replace('data-tssd', 'data-mdrw')
    d = d.replace(' is-cur', '')
    d = re.sub(r'(<a href="/watercade/" class="tssd__link)', r'\1 is-cur', d, count=1)
    return d

HEADER = HEADER.replace('__DRAWER_HTML__', drawer_html())

for p in sys.argv[1:]:
    s = open(p, encoding='utf8').read()
    # drop previously injected style + script
    s = re.sub(r'<style id="tss-shell">.*?</style>', '', s, flags=re.S)
    s = re.sub(r'<script id="tss-shell-js">.*?</script>', '', s, flags=re.S)
    # drop the legacy anonymous injected script (menu/sticky only)
    s = re.sub(r"<script>\(function\(\)\{var b=document\.querySelector\('\.tsshdr-menu'\).*?</script>", '', s, flags=re.S)
    # replace their original header, or a previously injected one
    s, n = re.subn(r'<header class="(?:nav|tsshdr)">.*?</header>', lambda _m: HEADER, s, count=1, flags=re.S)
    # inject styles before </head>
    i = s.find('</head>')
    s = s[:i] + STYLE + s[i:]
    open(p, 'w', encoding='utf8').write(s)
    print(p, 'header replaced:', n)
