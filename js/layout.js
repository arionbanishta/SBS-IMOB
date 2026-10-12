/* =========================================================
   Shared layout: icons, header, footer, forms, helpers
   ========================================================= */
(function () {
  const S = window.SITE;

  /* ---------- Icons (inline SVG, stroke based) ---------- */
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
    apartment: '<rect x="3" y="7" width="10" height="14" rx="1"/><path d="M13 11h7v10h-7M6 11h1M9 11h1M6 15h1M9 15h1M16 15h1"/><path d="M6 7V3h5v4"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 8.7-8.7M17 6l2.5 2.5M14.5 8.5 16.5 10.5"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6.5h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    area: '<path d="M4 4h16v16H4z"/><path d="M4 9h5V4M20 15h-5v5"/>',
    rooms: '<path d="M3 21V4h18v17"/><path d="M3 12h8v9M11 4v5"/>',
    bed: '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M3 18v2M21 18v2"/><path d="M6 9V6h5v3"/>',
    bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V5a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    alert: '<path d="M12 8v5M12 16.5h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    handshake: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3.5 3.5 0 0 1 4.3-.5l.4.2a2 2 0 0 0 1.5.2L21 6"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    euro: '<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z"/><path d="M5 19 13 11"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    stairs: '<path d="M3 21h5v-5h5v-5h5V6h3"/>'
  };
  window.icon = function (name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  };
  window.hydrateIcons = function (root) {
    (root || document).querySelectorAll('[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className); });
  };

  /* ---------- Formatting ---------- */
  const loc = () => (window.I18N && I18N.lang === 'en') ? 'en-GB' : 'de-DE';
  window.eur = (n, dec) => new Intl.NumberFormat(loc(), { style: 'currency', currency: 'EUR', maximumFractionDigits: dec || 0, minimumFractionDigits: dec || 0 }).format(n);
  window.num = (n, dec) => new Intl.NumberFormat(loc(), { maximumFractionDigits: dec || 0, minimumFractionDigits: dec || 0 }).format(n);
  window.pct = (n, dec) => num(n, dec === undefined ? 2 : dec) + ' %';

  /* ---------- Header / footer ---------- */
  const logo = () => `
    <a class="logo" href="index.html" aria-label="${S.company}">
      <span class="logo-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/></svg></span>
      <span class="logo-text">${S.company}<small>${S.tagline}</small></span>
    </a>`;

  function currentKey() {
    const f = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const deal = new URLSearchParams(location.search).get('deal');
    if (f.startsWith('immobilien')) return deal === 'miete' ? 'miete' : 'kauf';
    return f.replace('.html', '');
  }

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const k = currentKey();
    const a = key => k === key ? ' class="active"' : '';
    el.innerHTML = `
      <div class="topbar"><div class="container">
        <div class="tb-left">
          <span>${icon('phone')}<a href="tel:${S.phoneLink}">${S.phone}</a></span>
          <span class="tb-hide">${icon('mail')}<a href="mailto:${S.email}">${S.email}</a></span>
          <span class="tb-hide">${icon('clock')}${S.hours[I18N.lang]}</span>
        </div>
        <div class="lang-switch" role="group" aria-label="Language">
          <button data-lang="de" class="${I18N.lang === 'de' ? 'active' : ''}">DE</button>
          <button data-lang="en" class="${I18N.lang === 'en' ? 'active' : ''}">EN</button>
        </div>
      </div></div>
      <header class="site-header"><div class="container">
        ${logo()}
        <nav class="main-nav" id="main-nav">
          <a href="immobilien.html?deal=kauf"${a('kauf')}>${t('nav.buy')}</a>
          <a href="immobilien.html?deal=miete"${a('miete')}>${t('nav.rent')}</a>
          <a href="verkaufen.html"${a('verkaufen')}>${t('nav.sell')}</a>
          <a href="finanzierung.html"${a('finanzierung')}>${t('nav.calc')}</a>
          <a href="ueber-uns.html"${a('ueber-uns')}>${t('nav.about')}</a>
          <a href="kontakt.html"${a('kontakt')}>${t('nav.contact')}</a>
          <a class="btn btn-primary hidden-desktop" href="verkaufen.html" style="display:none">${t('nav.cta')}</a>
        </nav>
        <div class="header-cta">
          <a class="btn btn-primary" href="verkaufen.html">${icon('tag')} ${t('nav.cta')}</a>
          <button class="nav-toggle" aria-label="Menu" aria-expanded="false">${icon('menu')}</button>
        </div>
      </div></header>`;
    const nav = el.querySelector('#main-nav');
    const tog = el.querySelector('.nav-toggle');
    tog.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      tog.setAttribute('aria-expanded', open);
      nav.querySelector('.btn').style.display = open ? 'flex' : 'none';
    });
    el.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
      <footer class="site-footer"><div class="container">
        <div class="footer-grid">
          <div>
            ${logo()}
            <p>${t('footer.about')}</p>
          </div>
          <div>
            <h4>${t('footer.props')}</h4>
            <ul>
              <li><a href="immobilien.html?deal=kauf">${t('footer.buy')}</a></li>
              <li><a href="immobilien.html?deal=miete">${t('footer.rent')}</a></li>
              <li><a href="immobilien.html?deal=kauf&type=mfh">${t('footer.mfh')}</a></li>
              <li><a href="finanzierung.html">${t('nav.calc')}</a></li>
            </ul>
          </div>
          <div>
            <h4>${t('footer.company')}</h4>
            <ul>
              <li><a href="verkaufen.html">${t('footer.sell')}</a></li>
              <li><a href="ueber-uns.html">${t('nav.about')}</a></li>
              <li><a href="kontakt.html">${t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4>${t('footer.contact')}</h4>
            <ul>
              <li>${S.legalName}<br>${S.street}<br>${S.zip} ${S.city}</li>
              <li><a href="tel:${S.phoneLink}">${S.phone}</a></li>
              <li><a href="mailto:${S.email}">${S.email}</a></li>
              <li>${S.hours[I18N.lang]}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${S.legalName}</span>
          <nav><a href="impressum.html">Impressum</a><a href="datenschutz.html">${t('footer.privacy')}</a></nav>
        </div>
      </div></footer>`;
  }

  /* ---------- Forms (contact, sell, inquiry) ---------- */
  window.setupForms = setupForms;
  function setupForms() {
    document.querySelectorAll('form[data-form]').forEach(form => {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!validate(form)) return;
        const btn = form.querySelector('[type=submit]');
        if (btn) { btn.disabled = true; btn.style.opacity = .6; }
        const data = Object.fromEntries(new FormData(form).entries());
        data._form = form.dataset.form;
        data._page = location.href;
        try {
          if (S.formEndpoint) {
            const r = await fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
            if (!r.ok) throw new Error('send failed');
          } else {
            console.info('[Demo] Form submitted – set SITE.formEndpoint in js/config.js to receive it:', data);
          }
          form.classList.add('hidden');
          const ok = document.getElementById(form.dataset.success);
          if (ok) { ok.classList.add('show'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        } catch (err) {
          alert(t('form.error'));
          if (btn) { btn.disabled = false; btn.style.opacity = 1; }
        }
      });
    });
  }
  window.validate = function (scope) {
    let ok = true, first = null;
    scope.querySelectorAll('[required]').forEach(f => {
      if (f.closest('.hidden')) return;
      let valid = f.type === 'checkbox' ? f.checked : f.value.trim() !== '';
      if (valid && f.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
      if (f.type === 'radio') valid = !!scope.querySelector(`[name="${f.name}"]:checked`);
      f.classList.toggle('invalid', !valid);
      if (!valid) { ok = false; first = first || f; }
    });
    if (first) { first.focus({ preventScroll: true }); first.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    return ok;
  };
  document.addEventListener('input', e => { if (e.target.classList) e.target.classList.remove('invalid'); });

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
    els.forEach(e => io.observe(e));
  }
  window.setupReveal = setupReveal;

  /* ---------- Image fallback ---------- */
  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && !img.dataset.fallback) {
      img.dataset.fallback = '1';
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#d9d2c4"/><path d="M150 170 200 128l50 42v52h-100z" fill="none" stroke="#a79c86" stroke-width="6" stroke-linejoin="round"/></svg>');
    }
  }, true);

  /* ---------- Boot ---------- */
  function boot() {
    renderHeader();
    renderFooter();
    applyStatic();
    hydrateIcons();
    setupForms();
    setupReveal();
    document.querySelectorAll('[data-site]').forEach(el => { el.textContent = S[el.dataset.site]; });
    document.querySelectorAll('a[data-site-href]').forEach(el => {
      el.href = el.dataset.siteHref === 'phone' ? 'tel:' + S.phoneLink : 'mailto:' + S.email;
    });
  }
  document.addEventListener('langchange', () => { renderHeader(); renderFooter(); setupReveal(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
