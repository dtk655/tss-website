#!/usr/bin/env python3
"""Replace the WATERCADE pages' header with the sitewide TSS commerce header (static copy).
Re-runnable: strips any previously injected tsshdr header, style and script first."""
import re, sys

HEADER = '''<header class="tsshdr">
<div class="tsshdr-main"><div class="tsshdr-wrap tsshdr-in">
<button type="button" class="tsshdr-menu" aria-expanded="false" aria-controls="tssmnav" aria-label="Menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
<a href="/" class="tsshdr-logo" aria-label="Traffic Safety Service home"><img src="/brand/tss-logo-420.png" alt="TSS, Traffic Safety Service" width="420" height="210"></a>
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
<a href="/collections/equipment-rentals"><span>Rentals</span></a>
<a href="/pages/lane-closure"><span>Lane closures</span></a>
<a href="/watercade/" aria-current="page"><span>WATERCADE</span></a>
<a href="/tools"><span>Planning tools</span></a>
<a href="/pages/custom-stenciling"><span>Custom shop</span></a>
<a href="/pages/contact"><span>Contact</span></a>
</nav>
<p class="tsshdr-tag">Ships nationwide &middot; Rentals &amp; crews in NJ, NY, PA, CT</p>
</div></div>
<div class="tssd" id="tssmnav" hidden data-mdrw>
<div class="tssd__bg" data-mclose></div>
<aside class="tssd__panel" role="dialog" aria-modal="true" aria-label="Menu">
<div class="tssd__top"><a href="/" class="tssd__logo" aria-label="Traffic Safety Service home"><img src="/brand/tss-logo-420.png" alt="TSS" width="420" height="210"></a><button type="button" class="tssd__x" data-mclose aria-label="Close menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></div>
<div class="tssd__scroll">
<button type="button" class="tssd__ask tssd__in" style="--i:0" data-mask><span class="tssd__askcone" aria-hidden="true"><svg viewBox="0 0 100 116"><rect x="9" y="97" width="82" height="13" rx="4" fill="#1a1d21"/><path d="M44 9 Q50 3 56 9 L84 98 L16 98 Z" fill="#f26a1b"/><path d="M39.7 21 L60.3 21 L63 30 L37 30 Z" fill="#f4f6f8"/><path d="M22.7 80 L77.3 80 L80.3 90 L19.7 90 Z" fill="#f4f6f8"/><circle cx="40" cy="51" r="7" fill="#fff"/><circle cx="41" cy="52" r="3.8" fill="#1f2933"/><circle cx="60" cy="51" r="7" fill="#fff"/><circle cx="61" cy="52" r="3.8" fill="#1f2933"/><path d="M40.5 62 Q50 75 59.5 62 Z" fill="#5b1d06"/></svg></span><span class="tssd__asktxt"><b>Ask Conner</b><small>Products, prices, quotes &mdash; answered fast</small></span><span class="tssd__ai">AI</span></button>
<nav class="tssd__nav" aria-label="Mobile"><div class="tssd__grp tssd__in" style="--i:1"><button type="button" class="tssd__link" aria-expanded="false" data-macc><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M4.5 4.5h6v6h-6z M13.5 4.5h6v6h-6z M4.5 13.5h6v6h-6z M13.5 13.5h6v6h-6z"/></svg></span><span class="tssd__lbl">Products</span><svg class="tssd__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="tssd__sub"><div class="tssd__subin"><div class="tssd__cats"><a href="/collections/cones" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/cones.svg" alt="" loading="lazy"></span><span>Cones</span></a><a href="/collections/barricades" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/barricades.png" alt="" loading="lazy"></span><span>Barricades</span></a><a href="/collections/water-filled-barriers" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/water-filled-barriers.png" alt="" loading="lazy"></span><span>Water-Filled Barriers</span></a><a href="/collections/traffic-drums" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/traffic-drums.svg" alt="" loading="lazy"></span><span>Traffic Drums</span></a><a href="/collections/sign-shop" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/sign-shop.png" alt="" loading="lazy"></span><span>Sign Shop</span></a><a href="/collections/lights" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/lights.png" alt="" loading="lazy"></span><span>Lights</span></a><a href="/collections/reflectors" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/reflectors.png" alt="" loading="lazy"></span><span>Reflectors</span></a><a href="/collections/safety-gear" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/safety-gear.png" alt="" loading="lazy"></span><span>Safety Gear</span></a><a href="/collections/sign-stands" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/sign-stands.png" alt="" loading="lazy"></span><span>Sign Stands</span></a><a href="/collections/deliniators" class="tssd__cat"><span class="tssd__catimg"><img src="/cats/deliniators.png" alt="" loading="lazy"></span><span>Delineators</span></a></div><a href="/collections" class="tssd__all">Browse all products <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13 M12.5 5.5L19 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div></div></div><a href="/collections/equipment-rentals" class="tssd__link tssd__in" style="--i:2"><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M2.5 7h11v9h-11z M13.5 10h4l3 3.5V16h-7z M6.5 19a1.7 1.7 0 1 0 0-.01 M16.5 19a1.7 1.7 0 1 0 0-.01"/></svg></span><span class="tssd__lbl">Rentals</span><svg class="tssd__arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a><a href="/pages/lane-closure" class="tssd__link tssd__in" style="--i:3"><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M10.4 3.5h3.2L18 18.5H6z M8.4 12h7.2 M4 20.5h16"/></svg></span><span class="tssd__lbl">Lane closures</span><svg class="tssd__arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a><a href="/watercade/" class="tssd__link tssd__in is-cur" style="--i:4"><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M3 9h18v8H3z M7 9v8 M12 9v8 M17 9v8 M3 13h18"/></svg></span><span class="tssd__lbl">WATERCADE</span><svg class="tssd__arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a><a href="/tools" class="tssd__link tssd__in" style="--i:5"><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M4 20l5.5-5.5 M14 4l6 6-9.5 9.5-6-6z M12 9l3 3"/></svg></span><span class="tssd__lbl">Planning tools</span><svg class="tssd__arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a><a href="/pages/custom-stenciling" class="tssd__link tssd__in" style="--i:6"><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M4 20c3 0 5-2 5-5l9-9a2.1 2.1 0 0 0-3-3l-9 9c-3 0-5 2-5 5 M13 6l5 5"/></svg></span><span class="tssd__lbl">Custom shop</span><svg class="tssd__arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a><a href="/pages/contact" class="tssd__link tssd__in" style="--i:7"><span class="tssd__ico"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z M8 10h8 M8 13h5"/></svg></span><span class="tssd__lbl">Contact</span><svg class="tssd__arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a></nav>
<div class="tssd__quick tssd__in" style="--i:8"><a href="tel:+19085614800" class="tssd__qa"><span class="tssd__qaico"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.6 1.6a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4z"/></svg></span><span><small>Call us 24/7</small><b>908-561-4800</b></span></a><a href="/pages/request-a-quote" class="tssd__qa tssd__qa--red"><span class="tssd__qaico"><svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6"/></svg></span><span><small>Products, rentals or crews</small><b>Build a quote</b></span></a></div>
<p class="tssd__foot tssd__in" style="--i:9">Ships nationwide &middot; Rentals &amp; crews in NJ, NY, PA and CT &middot; Since 1971</p>
</div>
</aside>
</div>
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
var ac=d.querySelector('[data-macc]');ac&&ac.addEventListener('click',function(){var on=ac.getAttribute('aria-expanded')!=='true';ac.setAttribute('aria-expanded',String(on));ac.closest('.tssd__grp').classList.toggle('is-exp',on)});
var sx=0,sy=0,pn=d.querySelector('.tssd__panel');pn.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});pn.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(dx<-70&&Math.abs(dy)<60)cl()},{passive:true});
addEventListener('resize',function(){if(innerWidth>1010&&d.classList.contains('is-open'))cl()});}
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
.tsshdr-wrap{max-width:1600px;margin:0 auto;padding-inline:clamp(18px,4vw,44px)}
.tsshdr-main{position:relative;z-index:2;background:rgba(255,255,255,.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);transition:box-shadow .25s ease}
.tsshdr.is-stuck .tsshdr-main{box-shadow:0 12px 32px -20px rgba(20,23,26,.35)}
.tsshdr-in{height:92px;display:flex;align-items:center;gap:clamp(12px,1.4vw,24px);transition:height .25s ease}
.tsshdr.is-stuck .tsshdr-in{height:72px}
.tsshdr-logo{flex:none;display:flex}
.tsshdr-logo img{height:72px;width:auto;display:block;transition:height .25s ease}
.tsshdr.is-stuck .tsshdr-logo img{height:56px}
.tsshdr-search{position:relative;flex:1;min-width:0;max-width:640px;height:50px}
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
.tsshdr-tag{margin:0;color:#5b6670;font-size:.86rem;white-space:nowrap}
.tsshdr-menu{display:none;width:44px;height:44px;place-items:center;background:none;border:0;border-radius:10px;cursor:pointer;color:#14171a;padding:0}
.tsshdr-menu:hover{background:#f5f6f7}
.tsshdr-menu svg{width:23px;height:23px}
.tsshdr-msearch{display:none;border-top:1px solid #e4e7ea;padding-block:10px}
.tsshdr-msearch .tsshdr-search{max-width:none;height:46px}
@media(max-width:1420px){.tsshdr-tag{display:none}}
@media(max-width:1230px){.tsshdr-phonetxt{display:none}.tsshdr-phone{gap:0}}
@media(max-width:640px){.tsshdr-ai{display:none}}
@media(max-width:1010px){.tsshdr-navrow,.tsshdr-cta,.tsshdr-phone,.tsshdr-in>.tsshdr-search{display:none}.tsshdr-menu{display:grid;justify-self:start}.tsshdr-in{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;height:82px}.tsshdr.is-stuck .tsshdr-in{height:72px}.tsshdr-logo{justify-self:center}.tsshdr-act{justify-self:end;margin-left:0}.tsshdr-logo img{height:64px}.tsshdr.is-stuck .tsshdr-logo img{height:56px}.tsshdr-msearch{display:block}}
.tsshdr-cta{border-radius:999px}
@media(min-width:1011px){.tssd{display:none!important}}
__DRAWER_CSS__
</style>'''

def drawer_css():
    h = open('src/components/Header.astro', encoding='utf8').read()
    a = h.index('  /* ---------- mobile drawer ---------- */')
    b = h.index('  /* hamburger morphs to X while open */', a)
    css = h[a:b].replace('.mdrw', '.tssd')
    tokens = '.tssd{--ink:#14171a;--ink-2:#353b41;--steel:#5b6670;--haze:#f5f6f7;--haze-2:#eceef0;--line:#e4e7ea;--line-dark:#cfd4d9;--red:#b60606;--red-tint:#fbeeee;--gold:#f5b800;font-family:\'Archivo Variable\',\'Archivo\',\'Helvetica Neue\',Arial,sans-serif;line-height:1.4}\n.tssd *,.tssd *::before,.tssd *::after{box-sizing:border-box}\n.tssd p{margin:0}\n.tssd a,.tssd button{color:var(--ink)!important;text-decoration:none!important}.tssd a.tssd__all,.tssd a.tssd__qa--red{color:#fff!important}.tssd .tssd__link.is-cur .tssd__lbl{color:var(--red)!important}\n'
    morph = '.tsshdr-menu svg path{transition:d .3s ease}.tsshdr-menu[aria-expanded="true"] svg path{d:path("M6 6L18 18M18 6L6 18")}\n@media (prefers-reduced-motion: reduce){.tssd__panel,.tssd__bg,.tssd__in,.tssd__sub{transition:none}}\n'
    return tokens + css + morph

STYLE = STYLE.replace('__DRAWER_CSS__', drawer_css())

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
