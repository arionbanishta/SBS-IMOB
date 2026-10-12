/* =========================================================
   Catalog, property detail, home page search
   ========================================================= */
(function () {
  const PROPS = window.PROPERTIES;
  const L = () => I18N.lang;
  const tx = o => (o && typeof o === 'object') ? (o[L()] || o.de) : o;

  /* ---------- Helpers ---------- */
  const yieldOf = p => p.rentIncomeYear ? p.rentIncomeYear / p.price * 100 : (p.rentIncome ? p.rentIncome * 12 / p.price * 100 : null);

  function badgesHtml(p) {
    const b = [];
    b.push(`<span class="badge ${p.deal === 'kauf' ? 'badge-dark' : 'badge-accent'}">${t(p.deal === 'kauf' ? 'deal.kauf' : 'deal.miete')}</span>`);
    if (p.status) b.push(`<span class="badge">${t('status.' + p.status)}</span>`);
    if (p.deal === 'kauf' && p.commission === 0) b.push(`<span class="badge badge-ok">${t('status.provisionsfrei')}</span>`);
    return `<div class="badges">${b.join('')}</div>`;
  }

  function priceHtml(p) {
    if (p.deal === 'miete') return `<strong>${eur(p.rent)}</strong><small>${t('card.coldRent')}</small>`;
    const y = yieldOf(p);
    return `<strong>${eur(p.price)}</strong><small>${p.type === 'mfh' && y ? t('card.yield') + ' ' + pct(y, 1) : t('card.price')}</small>`;
  }

  window.propCard = function (p) {
    const facts = [`<span>${icon('area')} ${num(p.area)} m²</span>`];
    if (p.type === 'mfh') facts.push(`<span>${icon('building')} ${p.units} ${t('card.units')}</span>`);
    else facts.push(`<span>${icon('rooms')} ${p.rooms} ${t('card.rooms')}</span>`, `<span>${icon('bath')} ${p.baths}</span>`);
    return `
      <a class="card prop-card reveal" href="objekt.html?id=${p.id}">
        <div class="prop-img">
          <img src="${imgUrl(p.images[0], 800)}" alt="${tx(p.title)}" loading="lazy">
          ${badgesHtml(p)}
        </div>
        <div class="prop-body">
          <div class="prop-loc">${icon('pin')} ${SITE.city} – ${p.district} · ${t('type.' + p.type)}</div>
          <div class="prop-title">${tx(p.title)}</div>
          <div class="prop-facts">${facts.join('')}</div>
          <div class="prop-price">${priceHtml(p)}</div>
        </div>
      </a>`;
  };

  /* ---------- Home: featured + search ---------- */
  function renderFeatured() {
    const el = document.getElementById('featured');
    if (!el) return;
    const list = PROPS.filter(p => p.deal === 'kauf' && p.type !== 'mfh').sort((a, b) => b.added.localeCompare(a.added)).slice(0, 6);
    el.innerHTML = list.map(propCard).join('');
    const mfh = document.getElementById('featured-mfh');
    if (mfh) mfh.innerHTML = PROPS.filter(p => p.type === 'mfh').map(propCard).join('');
    const rent = document.getElementById('featured-rent');
    if (rent) rent.innerHTML = PROPS.filter(p => p.deal === 'miete').slice(0, 3).map(propCard).join('');
    setupReveal();
  }

  const priceOptions = {
    kauf: [250000, 400000, 600000, 800000, 1000000, 2500000, 5000000],
    miete: [700, 1000, 1500, 2000, 3000]
  };
  function fillPriceSelect(sel, deal, value) {
    if (!sel) return;
    const opts = priceOptions[deal] || priceOptions.kauf;
    sel.innerHTML = `<option value="">${t('filter.any')}</option>` +
      opts.map(v => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${t('filter.upTo')} ${eur(v)}</option>`).join('');
  }

  function setupHomeSearch() {
    const form = document.getElementById('home-search');
    if (!form) return;
    let deal = 'kauf';
    const tabs = form.querySelectorAll('.tab');
    const priceSel = form.querySelector('[name=maxPrice]');
    fillPriceSelect(priceSel, deal);
    tabs.forEach(tb => tb.addEventListener('click', () => {
      tabs.forEach(x => x.classList.toggle('active', x === tb));
      deal = tb.dataset.deal;
      fillPriceSelect(priceSel, deal);
      form.querySelector('[data-price-label]').textContent = t(deal === 'miete' ? 'filter.maxRent' : 'filter.maxPrice');
    }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = new URLSearchParams({ deal });
      ['type', 'maxPrice', 'rooms'].forEach(k => { const v = form.querySelector(`[name=${k}]`).value; if (v) q.set(k, v); });
      location.href = 'immobilien.html?' + q.toString();
    });
  }

  /* ---------- Catalog ---------- */
  function setupCatalog() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;
    const q = new URLSearchParams(location.search);
    const state = {
      deal: q.get('deal') || 'kauf', type: q.get('type') || '', maxPrice: q.get('maxPrice') || '',
      rooms: q.get('rooms') || '', area: q.get('area') || '', sort: q.get('sort') || 'new'
    };
    const $ = s => document.querySelector(s);
    const seg = document.querySelectorAll('#f-deal button');

    function syncControls() {
      seg.forEach(b => b.classList.toggle('active', b.dataset.deal === state.deal));
      $('#f-type').value = state.type;
      fillPriceSelect($('#f-price'), state.deal === 'alle' ? 'kauf' : state.deal, state.maxPrice);
      $('#f-price').disabled = state.deal === 'alle';
      $('#f-price-label').textContent = t(state.deal === 'miete' ? 'filter.maxRent' : 'filter.maxPrice');
      $('#f-rooms').value = state.rooms;
      $('#f-area').value = state.area;
      $('#f-sort').value = state.sort;
      const h = document.getElementById('catalog-title');
      if (h) h.textContent = t(state.deal === 'miete' ? 'catalog.titleRent' : state.deal === 'alle' ? 'catalog.titleAll' : 'catalog.titleBuy');
    }

    function render() {
      let list = PROPS.filter(p =>
        (state.deal === 'alle' || p.deal === state.deal) &&
        (!state.type || p.type === state.type) &&
        (!state.maxPrice || state.deal === 'alle' || (p.deal === 'miete' ? p.rent : p.price) <= +state.maxPrice) &&
        (!state.rooms || p.rooms >= +state.rooms) &&
        (!state.area || p.area >= +state.area));
      const price = p => p.deal === 'miete' ? p.rent : p.price;
      const sorters = {
        new: (a, b) => b.added.localeCompare(a.added),
        priceAsc: (a, b) => price(a) - price(b),
        priceDesc: (a, b) => price(b) - price(a),
        area: (a, b) => b.area - a.area
      };
      list.sort(sorters[state.sort] || sorters.new);
      $('#result-count').textContent = `${list.length} ${t(list.length === 1 ? 'catalog.result' : 'catalog.results')}`;
      grid.innerHTML = list.length ? list.map(propCard).join('') :
        `<div class="card empty-state" style="grid-column:1/-1"><h3>${t('catalog.emptyTitle')}</h3><p class="muted">${t('catalog.emptyText')}</p><button class="btn btn-outline" id="reset-filters">${t('catalog.reset')}</button></div>`;
      const r = document.getElementById('reset-filters');
      if (r) r.addEventListener('click', reset);
      setupReveal();
      const nq = new URLSearchParams();
      Object.entries(state).forEach(([k, v]) => { if (v && !(k === 'sort' && v === 'new')) nq.set(k, v); });
      history.replaceState(null, '', 'immobilien.html?' + nq.toString());
    }
    function reset() { Object.assign(state, { type: '', maxPrice: '', rooms: '', area: '', sort: 'new' }); syncControls(); render(); }

    seg.forEach(b => b.addEventListener('click', () => { state.deal = b.dataset.deal; state.maxPrice = ''; syncControls(); render(); }));
    [['#f-type', 'type'], ['#f-price', 'maxPrice'], ['#f-rooms', 'rooms'], ['#f-area', 'area'], ['#f-sort', 'sort']].forEach(([sel, key]) =>
      $(sel).addEventListener('change', e => { state[key] = e.target.value; render(); }));
    $('#f-reset').addEventListener('click', reset);
    document.addEventListener('langchange', () => { syncControls(); render(); });
    syncControls();
    render();
  }

  /* ---------- Property detail ---------- */
  function monthlyEstimate(p) {
    const R = RATES;
    const nk = p.price * ((R.transferTax[SITE.state] + R.notaryAndLandRegistry + (p.commission || 0)) / 100);
    const loan = p.price * 0.8;
    const eff = R.base10ByLtv[1].rate / 100;
    const soll = 12 * (Math.pow(1 + eff, 1 / 12) - 1);
    return { rate: loan * (soll + 0.02) / 12, nk, equity: p.price * 0.2 + nk };
  }

  function setupDetail() {
    const root = document.getElementById('detail-root');
    if (!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const p = PROPS.find(x => x.id === id);
    if (!p) {
      root.innerHTML = `<div class="container section center"><h1>${t('detail.notFound')}</h1><p class="muted">${t('detail.notFoundText')}</p><a class="btn btn-primary" href="immobilien.html">${t('detail.toCatalog')}</a></div>`;
      return;
    }
    let active = 0;

    function render() {
      document.title = `${tx(p.title)} – ${SITE.company}`;
      const isBuy = p.deal === 'kauf';
      const y = yieldOf(p);

      const facts = [
        [t(isBuy ? 'card.price' : 'card.coldRent'), isBuy ? eur(p.price) : eur(p.rent)],
        [t('detail.area'), num(p.area) + ' m²'],
        p.type === 'mfh' ? [t('detail.units'), p.units] : [t('detail.rooms'), p.rooms],
        p.type === 'mfh' && y ? [t('card.yield'), pct(y, 2)] : [t('detail.year'), p.year]
      ];

      const details = [];
      details.push([t('detail.type'), t('type.' + p.type)]);
      details.push([t('detail.year'), p.year]);
      if (p.renovated) details.push([t('detail.renovated'), p.renovated]);
      if (p.floor) details.push([t('detail.floor'), p.floor]);
      if (p.type !== 'mfh') details.push([t('detail.bedrooms'), p.bedrooms], [t('detail.baths'), p.baths]);
      if (p.type === 'mfh') details.push([t('detail.roomsTotal'), p.rooms]);
      if (p.plot) details.push([t('detail.plot'), num(p.plot) + ' m²']);
      if (p.hausgeld) details.push([t('detail.hausgeld'), eur(p.hausgeld) + ' / ' + t('detail.month')]);
      if (p.rentIncome) details.push([t('detail.currentRent'), eur(p.rentIncome) + ' / ' + t('detail.month')]);
      if (p.available) details.push([t('detail.available'), tx(p.available)]);
      if (isBuy) details.push([t('detail.commission'), p.commission ? pct(p.commission, 2) + ' ' + t('detail.inclVat') : t('status.provisionsfrei')]);

      const classes = ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const colors = ['#1a7f3c', '#2e9444', '#5cae3f', '#9cc437', '#e3d12b', '#f0b429', '#ec8a24', '#e25b20', '#c9281b'];

      let side;
      if (isBuy) {
        const est = monthlyEstimate(p);
        const calcUrl = `finanzierung.html?price=${p.price}&commission=${p.commission}&area=${p.area}&id=${p.id}` + (p.rentIncome ? `&rent=${p.rentIncome}` : '') + (p.rentIncomeYear ? `&rent=${Math.round(p.rentIncomeYear / 12)}` : '');
        side = `
          <div class="muted small">${t('card.price')}</div>
          <div class="price-big">${eur(p.price)}</div>
          <div class="muted small">${num(p.price / p.area)} € / m²</div>
          ${p.type === 'mfh' && y ? `
            <dl class="kv mt-3">
              <dt>${t('detail.rentYear')}</dt><dd>${eur(p.rentIncomeYear)}</dd>
              <dt>${t('card.yield')}</dt><dd>${pct(y, 2)}</dd>
              <dt>${t('detail.factor')}</dt><dd>${num(p.price / p.rentIncomeYear, 1)}</dd>
            </dl>` : ''}
          ${p.type !== 'mfh' ? `<div class="notice mt-3">
            <strong style="color:var(--ink)">${t('detail.from')} ${eur(est.rate)} / ${t('detail.month')}*</strong><br>
            ${t('detail.estText')}
          </div>` : ''}
          <a class="btn btn-primary btn-block mt-2" href="${calcUrl}">${icon('calc')} ${t('detail.calcBtn')}</a>
          <a class="btn btn-outline btn-block mt-2" href="#inquiry">${icon('calendar')} ${t('detail.viewing')}</a>`;
      } else {
        side = `
          <div class="muted small">${t('card.coldRent')}</div>
          <div class="price-big">${eur(p.rent)}</div>
          <dl class="kv mt-3">
            <dt>${t('detail.utilities')}</dt><dd>${eur(p.utilities)}</dd>
            <dt class="total">${t('detail.warmRent')}</dt><dd class="total">${eur(p.rent + p.utilities)}</dd>
            <dt>${t('detail.deposit')}</dt><dd>${eur(p.deposit)}</dd>
            <dt>${t('detail.available')}</dt><dd>${tx(p.available)}</dd>
          </dl>
          <a class="btn btn-primary btn-block mt-3" href="#inquiry">${icon('calendar')} ${t('detail.viewing')}</a>`;
      }

      const nkBlock = isBuy ? (() => {
        const taxRate = RATES.transferTax[SITE.state], tax = p.price * taxRate / 100, notary = p.price * RATES.notaryAndLandRegistry / 100, com = p.price * (p.commission || 0) / 100;
        return `
          <div class="card detail-block">
            <h3>${t('detail.costsTitle')}</h3>
            <dl class="kv">
              <dt>${t('card.price')}</dt><dd>${eur(p.price)}</dd>
              <dt>${t('detail.transferTax')} (${pct(taxRate, 1)})</dt><dd>${eur(tax)}</dd>
              <dt>${t('detail.notary')} (${pct(RATES.notaryAndLandRegistry, 1)})</dt><dd>${eur(notary)}</dd>
              <dt>${t('detail.commission')} (${pct(p.commission || 0, 2)})</dt><dd>${eur(com)}</dd>
              <dt class="total">${t('detail.totalCost')}</dt><dd class="total">${eur(p.price + tax + notary + com)}</dd>
            </dl>
            <p class="small muted mt-2 mb-0">${t('detail.costsNote')}</p>
          </div>`;
      })() : '';

      const similar = PROPS.filter(x => x.id !== p.id && x.deal === p.deal && (x.type === p.type || p.type !== 'mfh')).slice(0, 3);

      root.innerHTML = `
        <section class="page-hero" style="padding:40px 0 36px">
          <div class="container">
            <div class="breadcrumb"><a href="index.html">${t('nav.home')}</a> / <a href="immobilien.html?deal=${p.deal}">${t(isBuy ? 'nav.buy' : 'nav.rent')}</a> / ${p.id.toUpperCase()}</div>
            <div class="flex gap-2 wrap" style="margin-bottom:12px">${badgesHtml(p).replace('class="badges"', 'class="flex gap-2 wrap"')}</div>
            <h1 style="margin-bottom:8px">${tx(p.title)}</h1>
            <div style="display:flex;align-items:center;gap:6px">${icon('pin')} ${SITE.city} – ${p.district}</div>
          </div>
        </section>
        <section class="section-sm"><div class="container detail-layout">
          <div>
            <div class="gallery-main"><img id="g-main" src="${imgUrl(p.images[active], 1600)}" alt="${tx(p.title)}"></div>
            <div class="thumbs">${p.images.map((im, i) => `<button data-i="${i}" class="${i === active ? 'active' : ''}" aria-label="Bild ${i + 1}"><img src="${imgUrl(im, 400)}" alt="" loading="lazy"></button>`).join('')}</div>
            <div class="facts-grid">${facts.map(f => `<div class="fact"><span>${f[0]}</span><strong>${f[1]}</strong></div>`).join('')}</div>

            <div class="card detail-block">
              <h3>${t('detail.descTitle')}</h3>
              <p class="mb-0">${tx(p.desc)}</p>
            </div>
            <div class="card detail-block">
              <h3>${t('detail.featuresTitle')}</h3>
              <div class="feature-chips">${p.features.map(f => `<span class="chip">${icon('check')} ${t('feat.' + f)}</span>`).join('')}</div>
            </div>
            <div class="card detail-block">
              <h3>${t('detail.detailsTitle')}</h3>
              <dl class="kv">${details.map(d => `<dt>${d[0]}</dt><dd>${d[1]}</dd>`).join('')}</dl>
            </div>
            <div class="card detail-block">
              <h3>${t('detail.energyTitle')}</h3>
              <dl class="kv">
                <dt>${t('detail.energyKind')}</dt><dd>${p.energy.kind}</dd>
                <dt>${t('detail.energyValue')}</dt><dd>${p.energy.value} kWh/(m²·a)</dd>
                <dt>${t('detail.energySource')}</dt><dd>${p.energy.source}</dd>
                <dt>${t('detail.energyClass')}</dt><dd>${p.energy.cls}</dd>
              </dl>
              <div class="energy-scale">${classes.map((c, i) => `<span style="background:${colors[i]}" class="${c === p.energy.cls ? 'on' : ''}">${c}</span>`).join('')}</div>
            </div>
            ${nkBlock}
            <div class="card detail-block" id="inquiry">
              <h3>${t('detail.inquiryTitle')}</h3>
              <p class="muted">${t('detail.inquiryText')}</p>
              <form data-form="inquiry" data-success="inq-ok" novalidate>
                <input type="hidden" name="property" value="${p.id} – ${tx(p.title)}">
                <div class="form-grid">
                  <div class="field"><label>${t('form.name')} *</label><input type="text" name="name" required autocomplete="name"></div>
                  <div class="field"><label>${t('form.email')} *</label><input type="email" name="email" required autocomplete="email"></div>
                  <div class="field"><label>${t('form.phone')}</label><input type="tel" name="phone" autocomplete="tel"></div>
                  <div class="field"><label>${t('form.request')}</label>
                    <select name="request">
                      <option>${t('form.reqViewing')}</option><option>${t('form.reqExpose')}</option><option>${t('form.reqCall')}</option>${isBuy ? `<option>${t('form.reqFinance')}</option>` : ''}
                    </select></div>
                  <div class="field full"><label>${t('form.message')}</label><textarea name="message"></textarea></div>
                  <label class="check full"><input type="checkbox" name="consent" required> <span>${t('form.consent')}</span></label>
                </div>
                <button class="btn btn-primary mt-3" type="submit">${t('form.send')} ${icon('arrow')}</button>
              </form>
              <div class="form-success" id="inq-ok"><h3>${t('form.thanks')}</h3>${t('form.thanksText')}</div>
            </div>
          </div>
          <aside>
            <div class="card sidebar-card">
              ${side}
              <hr style="border:0;border-top:1px solid var(--line);margin:22px 0">
              <div class="flex gap-2" style="align-items:center">
                <img src="${imgUrl('1560250097-0b93528c311a', 160)}" alt="" style="width:52px;height:52px;border-radius:50%;object-fit:cover">
                <div><strong style="color:var(--ink)">Thomas Berger</strong><div class="small muted">${t('detail.contactPerson')}</div></div>
              </div>
              <a class="btn btn-outline btn-block mt-2" href="tel:${SITE.phoneLink}">${icon('phone')} ${SITE.phone}</a>
            </div>
          </aside>
        </div></section>
        ${similar.length ? `<section class="section-sm section-alt"><div class="container">
          <h2>${t('detail.similar')}</h2>
          <div class="grid grid-3 mt-3">${similar.map(propCard).join('')}</div>
        </div></section>` : ''}`;

      root.querySelectorAll('.thumbs button').forEach(b => b.addEventListener('click', () => {
        active = +b.dataset.i;
        root.querySelector('#g-main').src = imgUrl(p.images[active], 1600);
        root.querySelectorAll('.thumbs button').forEach(x => x.classList.toggle('active', x === b));
      }));
      document.querySelectorAll('form[data-form]').forEach(f => delete f.dataset.bound);
      setupForms();
      setupReveal();
    }
    render();
    document.addEventListener('langchange', render);
  }

  function boot() {
    renderFeatured();
    setupHomeSearch();
    setupCatalog();
    setupDetail();
  }
  document.addEventListener('langchange', renderFeatured);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
