/* Mockup-only: shared header (Products mega-menu), mobile nav, footer, WhatsApp, quote list (+ sticky bar), table scroll cue.
   In the build these become React components. Usage: <div data-part="header" data-current="products"></div> */
(function () {
  const P = {
    home: 'home.html', products: 'products.html', category: 'category.html', glands: 'glands.html', product: 'product.html', accessory: 'accessory.html',
    capabilities: 'capabilities.html', quality: 'quality.html', industries: 'industries.html', resources: 'resources.html', pg: 'resource.html',
    about: 'about.html', exports: 'exports.html', rfq: 'rfq.html', contact: 'contact.html'
  };
  const chev = '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
  const cur = (k, c) => (k === c ? ' aria-current="page"' : '');

  const mega = `
  <div class="mega" id="mega-products" role="region" aria-label="Products">
    <div class="wrap mega__in">
      <div>
        <p class="mh"><a href="${P.products}#custom">Made to your drawing</a></p>
        <ul>
          <li><a href="${P.category}">Brass turned components</a></li>
          <li><a href="fittings.html">Brass fittings</a></li>
          <li><a href="forged.html">Forged brass components</a></li>
          <li><a href="inserts.html">Moulding inserts</a></li>
          <li><a href="terminals.html">Electrical terminals &amp; connectors</a></li>
          <li><a href="fasteners.html">Special fasteners</a></li>
          <li><a href="stamping.html">Metal stamping parts</a></li>
        </ul>
      </div>
      <div>
        <p class="mh"><a href="${P.glands}">Brass cable glands</a></p>
        <ul>
          <li><a href="clamping-jaw.html">Clamping-jaw gland</a></li>
          <li><a href="favorit.html">Strain-relief gland</a></li>
          <li><a href="${P.product}">Pressure screws</a></li>
        </ul>
        <p class="mh" style="margin-top:var(--s-5)"><a href="${P.resources}">Thread charts</a></p>
        <ul>
          <li><a href="${P.pg}">PG thread chart</a></li>
          <li><a href="metric-chart.html">Metric thread chart</a></li>
          <li><a href="bsp-chart.html">BSP thread chart</a></li>
          <li><a href="npt-chart.html">NPT thread chart</a></li>
        </ul>
      </div>
      <div>
        <p class="mh"><a href="${P.glands}#accessories">Gland accessories</a></p>
        <ul>
          <li><a href="${P.accessory}">Lock nuts</a></li>
          <li><a href="thread-adapters.html">Reducers, enlargers &amp; adapters</a></li>
          <li><a href="stop-plugs.html">Stop plugs</a></li>
          <li><a href="earth-tags.html">Earth tags</a></li>
          <li><a href="conduit-parts.html">Conduit gland parts</a></li>
        </ul>
      </div>
      <div class="mega__aside">
        <span class="eyebrow eyebrow--brass">Not listed?</span>
        <p>Most of what we make is to customer drawings. Send yours for a quote.</p>
        <a class="btn btn--sm" href="${P.rfq}">Send a drawing <span class="arr" aria-hidden="true">→</span></a>
        <p style="margin:var(--s-4) 0 0"><a class="link" href="${P.products}">All products</a></p>
      </div>
    </div>
  </div>`;

  const header = (c) => `
  <header class="hdr">
    <div class="wrap hdr__bar">
      <a class="brand" href="${P.home}"><img src="img/logo.svg" alt="AirGrip – Air Grip Group of Companies, home" width="70" height="52"></a>
      <nav class="nav" aria-label="Main">
        <button type="button" aria-expanded="false" aria-controls="mega-products"${c === 'products' ? ' aria-current="page"' : ''} data-mega>Products ${chev}</button>
        <a href="${P.capabilities}"${cur('capabilities', c)}>Capabilities</a>
        <a href="${P.quality}"${cur('quality', c)}>Quality</a>
        <a href="${P.exports}"${cur('exports', c)}>Ordering &amp; shipping</a>
        <a href="${P.resources}"${cur('resources', c)}>Resources</a>
        <a href="${P.about}"${cur('about', c)}>About</a>
        <a href="${P.contact}"${cur('contact', c)}>Contact</a>
      </nav>
      <div class="hdr__end">
        <a class="hdr__tel" href="tel:+919316615007">+91 93166 15007</a>
        <a class="btn btn--sm basket-btn" href="${P.rfq}"><span class="hide-s">Request a quote</span><span class="show-s">Quote</span><span class="count" data-count hidden>0</span></a>
        <button class="btn btn--ghost btn--sm hdr__menu" type="button" aria-expanded="false" aria-controls="mnav" data-mnav>Menu</button>
      </div>
    </div>
    ${mega}
    <nav class="mnav" id="mnav" aria-label="Mobile" hidden>
      <div class="wrap">
        <details><summary>Products</summary>
          <ul>
            <li><a href="${P.products}">All products</a></li>
            <li><a href="${P.category}">Brass turned components</a></li>
            <li><a href="fittings.html">Brass fittings</a></li>
            <li><a href="forged.html">Forged brass components</a></li>
            <li><a href="inserts.html">Moulding inserts</a></li>
            <li><a href="terminals.html">Electrical terminals &amp; connectors</a></li>
            <li><a href="fasteners.html">Special fasteners</a></li>
            <li><a href="stamping.html">Metal stamping parts</a></li>
            <li><a href="${P.glands}">Brass cable glands &amp; accessories</a></li>
          </ul>
        </details>
        <a href="${P.capabilities}">Capabilities</a><a href="${P.quality}">Quality</a><a href="${P.exports}">Ordering &amp; shipping</a>
        <a href="${P.resources}">Resources</a><a href="${P.about}">About</a><a href="${P.contact}">Contact</a>
        <div class="mnav__c"><a href="tel:+919316615007">Call +91 93166 15007</a><a href="https://wa.me/919316615007">WhatsApp</a><a href="mailto:sales@airgrip.in">sales@airgrip.in</a></div>
      </div>
    </nav>
  </header>`;

  const footer = `
  <footer class="ftr">
    <div class="wrap">
      <div class="ftr__grid">
        <div>
          <a class="brand brand--ftr" href="${P.home}"><img src="img/logo.svg" alt="AirGrip – Air Grip Group of Companies" width="108" height="80"></a>
          <address>Plot No. 3966 &amp; 3967, Road No. U, GIDC Phase-III<br>Dared, Jamnagar 361004, Gujarat, India<br>
          <a class="mono" href="tel:+919316615007">+91 93166 15007</a> · <a href="mailto:sales@airgrip.in">sales@airgrip.in</a><br>
          <span class="muted">Sat–Thu 09:30–18:30 IST</span></address>
        </div>
        <div><p class="fh">Products</p><ul><li><a href="${P.category}">Brass turned components</a></li><li><a href="fittings.html">Brass fittings</a></li><li><a href="forged.html">Forged brass components</a></li><li><a href="inserts.html">Moulding inserts</a></li><li><a href="terminals.html">Electrical terminals &amp; connectors</a></li><li><a href="fasteners.html">Special fasteners</a></li><li><a href="stamping.html">Metal stamping parts</a></li><li><a href="${P.glands}">Brass cable glands &amp; accessories</a></li></ul></div>
        <div><p class="fh">Capabilities</p><ul><li><a href="${P.capabilities}">Processes &amp; machines</a></li><li><a href="${P.capabilities}#range">Range &amp; accuracy</a></li><li><a href="${P.capabilities}#finishing">Plating &amp; finishing</a></li><li><a href="${P.quality}">Quality</a></li></ul></div>
        <div><p class="fh">Resources</p><ul><li><a href="${P.resources}">All resources</a></li><li><a href="${P.resources}#downloads">Downloads</a></li><li><a href="${P.pg}">PG thread chart</a></li><li><a href="metric-chart.html">Metric thread chart</a></li><li><a href="bsp-chart.html">BSP thread chart</a></li><li><a href="npt-chart.html">NPT thread chart</a></li><li><a href="grades.html">Brass grade equivalents</a></li></ul></div>
        <div><p class="fh">Company</p><ul><li><a href="${P.about}">About AirGrip</a></li><li><a href="${P.industries}">Industries</a></li><li><a href="${P.exports}">Ordering &amp; shipping</a></li><li><a href="${P.contact}">Contact</a></li><li><a href="${P.rfq}">Request a quote</a></li></ul></div>
      </div>
      <div class="ftr__base">
        <span>© 2026 <span class="tbc">Registered company name</span> · GSTIN <span class="tbc">TBC</span> · IEC <span class="tbc">TBC</span></span>
        <span>ISO 9001:2015 · <span class="vfy">RoHS</span></span><a href="privacy.html">Privacy policy</a>
      </div>
    </div>
  </footer>
  <a class="wa" href="https://wa.me/919316615007" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>WhatsApp</a>`;

  const css = document.createElement('style');
  css.textContent = `.mnav{position:absolute;left:0;right:0;top:100%;background:var(--paper);border-bottom:1px solid var(--ink-line);max-height:calc(100vh - var(--header-h));overflow:auto;padding-block:var(--s-4) var(--s-6)}
  .mnav a,.mnav summary{display:block;padding:12px 0;border-bottom:var(--hair);text-decoration:none;font-size:var(--t-18);font-weight:500;cursor:pointer}
  .mnav ul{list-style:none;margin:0;padding:0 0 var(--s-2) var(--s-4)} .mnav ul a{font-size:var(--t-16);color:var(--ink-2);padding:9px 0}
  .mnav__c{display:grid;gap:8px;margin-top:var(--s-5)} .mnav__c a{border:1px solid var(--field);padding:0 14px;min-height:48px;display:flex;align-items:center;font-size:var(--t-15)}`;
  document.head.appendChild(css);

  document.querySelectorAll('[data-part]').forEach(el => { el.outerHTML = el.dataset.part === 'header' ? header(el.dataset.current || '') : footer; });

  // mega menu
  const btn = document.querySelector('[data-mega]'), panel = document.getElementById('mega-products');
  if (btn && panel) {
    const set = (open) => { btn.setAttribute('aria-expanded', open); panel.classList.toggle('open', open); };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
    document.addEventListener('click', e => { if (!panel.contains(e.target) && !btn.contains(e.target)) set(false); });
  }
  // mobile nav
  const mb = document.querySelector('[data-mnav]'), mn = document.getElementById('mnav');
  if (mb && mn) mb.addEventListener('click', () => { const o = mb.getAttribute('aria-expanded') !== 'true'; mb.setAttribute('aria-expanded', o); mn.hidden = !o; mb.textContent = o ? 'Close' : 'Menu'; });

  // quote list (mockup: localStorage)
  const KEY = 'ag-basket';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
  window.AGBasket = {
    items: read,
    add(code, label) { const b = read(); if (!b.some(i => i.code === code)) { b.push({ code, label }); write(b); } paint(); },
    remove(code) { write(read().filter(i => i.code !== code)); paint(); },
    has(code) { return read().some(i => i.code === code); }
  };
  // sticky quote bar on pages that have add buttons
  let qbar = null;
  if (document.querySelector('.addq')) {
    qbar = document.createElement('div'); qbar.className = 'qbar'; qbar.setAttribute('role', 'status');
    qbar.innerHTML = `<div class="wrap"><span><b data-qn>0</b> <span data-qw>items</span> in your quote <span class="qcodes" data-qc></span></span><a class="btn btn--sm" href="${P.rfq}">Review &amp; send <span class="arr" aria-hidden="true">→</span></a></div>`;
    document.body.appendChild(qbar);
    document.addEventListener('click', e => { const b = e.target.closest('.addq'); if (!b) return; AGBasket.has(b.dataset.code) ? AGBasket.remove(b.dataset.code) : AGBasket.add(b.dataset.code, b.dataset.label); });
  }
  function paint() {
    const n = read().length;
    document.querySelectorAll('[data-count]').forEach(c => { c.textContent = n; c.hidden = !n; });
    document.querySelectorAll('.addq').forEach(b => { const on = AGBasket.has(b.dataset.code); b.setAttribute('aria-pressed', on); b.textContent = on ? '✓ Added' : '+ Add'; b.setAttribute('aria-label', (on ? 'Remove ' : 'Add ') + b.dataset.label + (on ? ' from quote' : ' to quote')); });
    if (qbar) { qbar.classList.toggle('on', n > 0); document.body.classList.toggle('has-qbar', n > 0); qbar.querySelector('[data-qn]').textContent = n; qbar.querySelector('[data-qw]').textContent = n === 1 ? 'item' : 'items'; const it = read(); qbar.querySelector('[data-qc]').textContent = it.length ? '· ' + it.slice(0, 3).map(i => i.code).join(', ') + (it.length > 3 ? ' …' : '') : ''; }
    document.dispatchEvent(new CustomEvent('basket'));
  }
  paint();

  // label cells of stacked mobile tables
  document.querySelectorAll('table.stack-m').forEach(t => { const h = [...t.querySelectorAll('thead th')].map(th => th.textContent.trim()); t.querySelectorAll('tbody tr').forEach(tr => [...tr.children].forEach((td, i) => { if (h[i]) td.dataset.l = h[i]; })); });
  // table scroll cue
  const cue = () => document.querySelectorAll('.tbl').forEach(t => t.classList.toggle('can-scroll', t.scrollWidth - t.clientWidth - t.scrollLeft > 4));
  document.querySelectorAll('.tbl').forEach(t => t.addEventListener('scroll', cue, { passive: true }));
  addEventListener('resize', cue); cue();

  // hide WhatsApp over footer
  const wa = document.querySelector('.wa'), ft = document.querySelector('.ftr');
  if (wa) { document.addEventListener('focusin', e => { if (e.target.matches('input,select,textarea')) wa.classList.add('away'); }); document.addEventListener('focusout', () => wa.classList.remove('away')); }
  if (wa && ft && 'IntersectionObserver' in window) new IntersectionObserver(([e]) => wa.classList.toggle('away', e.isIntersecting), { rootMargin: '0px 0px -40px 0px' }).observe(ft);
})();
