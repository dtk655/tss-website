#!/usr/bin/env python3
"""Replace the WATERCADE pages' own header with the sitewide TSS header (static copy)."""
import re, sys

HEADER = '''<header class="tsshdr">
<div class="tsshdr-util"><div class="tsshdr-wrap tsshdr-utilin">
<span class="tsshdr-since">Family-run in New Jersey since 1971</span>
<span class="tsshdr-area">Rentals and crews in NJ, NY, PA and CT &nbsp;&middot;&nbsp; Products ship nationwide</span>
<a href="/pages/create-c-m-account">Contractor &amp; municipal accounts</a>
<a href="/pages/contact">Contact</a>
<a href="tel:+19085614800" class="tsshdr-utilphone"><strong>24/7</strong>&ensp;908-561-4800</a>
</div></div>
<div class="tsshdr-main"><div class="tsshdr-wrap tsshdr-in">
<a href="/" class="tsshdr-logo" aria-label="Traffic Safety Service home"><img src="/brand/tss-logo-420.png" alt="TSS, Traffic Safety Service" width="420" height="210"></a>
<nav class="tsshdr-nav" aria-label="Main">
<a href="/collections"><span>Shop</span></a>
<a href="/collections/equipment-rentals"><span>Rentals</span></a>
<a href="/pages/lane-closure"><span>Lane closures</span></a>
<a href="/watercade/" aria-current="page"><span>WATERCADE</span></a>
<a href="/tools"><span>Planning tools</span></a>
</nav>
<div class="tsshdr-act">
<a class="tsshdr-phone" href="tel:+19085614800" aria-label="Call 908-561-4800"><span class="tsshdr-phonebadge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.6 1.6a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg></span><span class="tsshdr-phonetxt"><small>Call us 24/7</small><b>908-561-4800</b></span></a>
<a href="/pages/request-a-quote" class="tsshdr-cta">Request a quote</a>
<button type="button" class="tsshdr-menu" aria-expanded="false" aria-controls="tssmnav" aria-label="Menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
<button class="menu-btn" style="display:none!important" aria-hidden="true" tabindex="-1"><span class="menu-ico"><span></span><span></span><span></span></span></button>
</div></div></div>
<nav id="tssmnav" class="tsshdr-mnav" aria-label="Mobile" hidden>
<a href="/collections">Shop</a>
<a href="/collections/equipment-rentals">Rentals</a>
<a href="/pages/lane-closure">Lane closures</a>
<a href="/watercade/">WATERCADE</a>
<a href="/tools">Planning tools</a>
<a href="/pages/request-a-quote" class="tsshdr-mcta">Request a quote</a>
<a href="tel:+19085614800">Call 908-561-4800 (24/7)</a>
</nav>
</header>
<script>(function(){var b=document.querySelector('.tsshdr-menu'),m=document.getElementById('tssmnav');b&&b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));if(m)m.hidden=o;});var h=document.querySelector('.tsshdr');function s(){h.classList.toggle('is-stuck',window.scrollY>24)}addEventListener('scroll',s,{passive:true});s();})();</script>'''

STYLE = '''<style id="tss-shell">
@font-face{font-family:'Archivo Variable';src:url('/brand/archivo-var.woff2') format('woff2-variations');font-weight:100 900;font-style:normal;font-display:swap}
.tsshdr{position:sticky;top:-38px;z-index:40;background:#fff;font-family:'Archivo Variable','Archivo','Helvetica Neue',Arial,sans-serif;line-height:1.4}
.tsshdr a{color:inherit}
.tsshdr-wrap{max-width:1280px;margin:0 auto;padding-inline:clamp(18px,4vw,44px)}
.tsshdr-util{background:#14171a;color:#aab1b8;font-size:.84rem}
.tsshdr-utilin{height:38px;display:flex;align-items:center;gap:28px;white-space:nowrap;overflow:hidden}
.tsshdr-since{color:#f5b800;font-variation-settings:'wght' 650}
.tsshdr-utilin a{text-decoration:none;color:#dfe3e6;font-variation-settings:'wght' 560}
.tsshdr-utilin a:hover{color:#fff}
.tsshdr-utilphone{margin-left:auto}
.tsshdr-utilphone strong{color:#f5b800;font-variation-settings:'wght' 720}
.tsshdr-main{background:rgba(255,255,255,.96);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid #e4e7ea;transition:box-shadow .25s ease}
.tsshdr.is-stuck .tsshdr-main{box-shadow:0 12px 32px -20px rgba(20,23,26,.35)}
.tsshdr-in{height:96px;display:flex;align-items:center;gap:clamp(16px,2.2vw,38px);transition:height .25s ease}
.tsshdr.is-stuck .tsshdr-in{height:74px}
.tsshdr-logo{flex:none;display:flex}
.tsshdr-logo img{height:86px;width:auto;display:block;transition:height .25s ease}
.tsshdr.is-stuck .tsshdr-logo img{height:64px}
.tsshdr-nav{display:flex;gap:clamp(2px,.6vw,10px);margin-right:auto}
.tsshdr-nav a{position:relative;text-decoration:none;font-variation-settings:'wght' 620;font-size:1.02rem;padding:10px 13px 9px;color:#353b41;white-space:nowrap;transition:color .14s}
.tsshdr-nav a span{position:relative}
.tsshdr-nav a span::after{content:'';position:absolute;left:0;right:100%;bottom:-7px;height:2.5px;border-radius:2px;background:#b60606;transition:right .22s cubic-bezier(.4,0,.2,1)}
.tsshdr-nav a:hover{color:#14171a}
.tsshdr-nav a:hover span::after{right:0}
.tsshdr-nav a[aria-current]{color:#14171a;font-variation-settings:'wght' 700}
.tsshdr-nav a[aria-current] span::after{right:0}
.tsshdr-act{display:flex;align-items:center;gap:6px}
.tsshdr-phone{display:flex;align-items:center;gap:10px;text-decoration:none;margin-right:6px;white-space:nowrap;color:#14171a}
.tsshdr-phonebadge{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#fbeeee;color:#b60606;flex:none;transition:background .15s,color .15s}
.tsshdr-phonebadge svg{width:19px;height:19px}
.tsshdr-phone:hover .tsshdr-phonebadge{background:#b60606;color:#fff}
.tsshdr-phonetxt{display:grid;line-height:1.15}
.tsshdr-phonetxt small{font-size:.74rem;color:#5b6670}
.tsshdr-phonetxt b{font-variation-settings:'wght' 720;font-size:1.02rem}
.tsshdr-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:13px 24px 12px;margin-left:10px;border-radius:8px;background:#b60606;color:#fff!important;font-variation-settings:'wght' 640;font-size:1rem;text-decoration:none;line-height:1;white-space:nowrap;transition:background .15s}
.tsshdr-cta:hover{background:#940505}
.tsshdr-menu{display:none;width:44px;height:44px;place-items:center;background:none;border:0;border-radius:10px;cursor:pointer;color:#14171a;padding:0}
.tsshdr-menu:hover{background:#f5f6f7}
.tsshdr-menu svg{width:23px;height:23px}
.tsshdr-mnav[hidden]{display:none}
.tsshdr-mnav{background:#fff;padding:6px clamp(18px,4vw,44px) 20px;display:grid;border-top:1px solid #e4e7ea;box-shadow:0 12px 32px -16px rgba(20,23,26,.18)}
.tsshdr-mnav a{padding:15px 2px 13px;text-decoration:none;font-variation-settings:'wght' 640;font-size:1.12rem;border-bottom:1px solid #eceef0;color:#14171a}
.tsshdr-mcta{color:#b60606!important}
@media(max-width:1360px){.tsshdr-phonetxt{display:none}.tsshdr-phone{margin-right:0}}
@media(max-width:1080px){.tsshdr-area{display:none}}
@media(max-width:1010px){.tsshdr-nav,.tsshdr-cta{display:none}.tsshdr-menu{display:grid}.tsshdr-act{margin-left:auto}.tsshdr-in{height:72px}.tsshdr-logo img{height:58px}.tsshdr-utilin{justify-content:space-between;gap:14px}.tsshdr-utilin>.tsshdr-area,.tsshdr-utilin>a:not(.tsshdr-utilphone){display:none}.tsshdr-utilphone{margin-left:0}}
@media(min-width:1011px){.tsshdr-mnav{display:none!important}}
</style>'''

for p in sys.argv[1:]:
    s = open(p, encoding='utf8').read()
    # drop the old override style block
    s = re.sub(r'<style id="tss-shell">.*?</style>', '', s, flags=re.S)
    # replace their header entirely
    s, n = re.subn(r'<header class="nav">.*?</header>', HEADER, s, count=1, flags=re.S)
    # inject styles before </head>
    i = s.find('</head>')
    s = s[:i] + STYLE + s[i:]
    open(p, 'w', encoding='utf8').write(s)
    print(p, 'header replaced:', n)
