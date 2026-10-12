/* =========================================================
   Finanzierungsrechner – eligibility, terms & bank comparison
   All assumptions live in js/banks.js (RATES).
   ========================================================= */
(function () {
  const form = document.getElementById('calc-form');
  if (!form) return;
  const R = RATES;
  const $ = id => document.getElementById(id);
  const val = id => parseFloat(String($(id).value).replace(/\./g, '').replace(',', '.')) || 0;

  /* ---------- Setup inputs ---------- */
  const stateSel = $('c-state');
  stateSel.innerHTML = Object.keys(R.transferTax).map(s => `<option value="${s}">${s} (${num(R.transferTax[s], 1)} %)</option>`).join('');
  stateSel.value = SITE.state || 'Nordrhein-Westfalen';

  const q = new URLSearchParams(location.search);
  if (q.get('price')) $('c-price').value = q.get('price');
  if (q.get('commission') !== null) $('c-commission').value = q.get('commission');
  if (q.get('area')) $('c-area').value = q.get('area');
  if (q.get('rent')) { $('c-use').value = 'kapital'; $('c-rent').value = q.get('rent'); }
  const propId = q.get('id');
  const prop = propId && window.PROPERTIES.find(p => p.id === propId);

  /* ---------- Math ---------- */
  const effToSoll = eff => 12 * (Math.pow(1 + eff / 100, 1 / 12) - 1); // nominal p.a. (decimal)

  function marketRate(ltv, term) {
    const row = R.base10ByLtv.find(r => ltv <= r.maxLtv) || R.base10ByLtv[R.base10ByLtv.length - 1];
    return row.rate + (R.termOffset[term] || 0);
  }

  function amortize(loan, soll, repay, termYears) {
    const pay = loan * (soll + repay) / 12;
    let bal = loan, month = 0, interestTerm = 0, interestTotal = 0, restTerm = loan;
    const yearly = [loan];
    while (bal > 0.5 && month < 12 * 60) {
      const i = bal * soll / 12;
      bal = Math.max(0, bal - (pay - i));
      interestTotal += i;
      month++;
      if (month <= termYears * 12) interestTerm += i;
      if (month === termYears * 12) restTerm = bal;
      if (month % 12 === 0) yearly.push(bal);
    }
    if (month < termYears * 12) restTerm = 0;
    if (month % 12 !== 0) yearly.push(0);
    return { pay, months: month, interestTerm, interestTotal, restTerm, yearly };
  }

  /* ---------- Main calculation ---------- */
  function calc() {
    const price = val('c-price'), equity = val('c-equity'), income = val('c-income'), oblig = val('c-oblig');
    const commission = parseFloat($('c-commission').value) || 0;
    const adults = +$('c-adults').value, children = +$('c-children').value, age = val('c-age');
    const area = val('c-area') || 80, use = $('c-use').value, rent = val('c-rent'), ownHousing = val('c-own');
    const term = +$('c-term').value, repay = parseFloat($('c-repay').value) / 100;
    const job = $('c-job').value;
    $('c-repay-out').textContent = pct(repay * 100, 1);
    document.querySelectorAll('.only-kapital').forEach(el => el.classList.toggle('hidden', use !== 'kapital'));

    if (!price || !income) { $('calc-results').classList.add('hidden'); $('calc-empty').classList.remove('hidden'); return; }
    $('calc-results').classList.remove('hidden'); $('calc-empty').classList.add('hidden');

    // Purchase costs
    const taxRate = R.transferTax[stateSel.value];
    const cTax = price * taxRate / 100, cNotary = price * R.notaryAndLandRegistry / 100, cCom = price * commission / 100;
    const extras = cTax + cNotary + cCom, total = price + extras;
    const loan = Math.max(0, total - equity);
    const ltv = loan / price * 100;

    // Rate & amortization at best market rate
    const market = marketRate(ltv, term);
    const eff = market + Math.min(...R.banks.map(b => b.spread)); // best available offer
    const soll = effToSoll(eff);
    const am = amortize(loan, soll, repay, term);

    // Household budget
    const living = R.living.firstAdult + (adults - 1) * R.living.extraAdult + children * R.living.child;
    const ownerCosts = use === 'eigen' ? area * R.ownerCostPerSqm : area * 1.0;
    const rentCounted = use === 'kapital' ? rent * R.rentCountedShare : 0;
    const incomeTotal = income + rentCounted;
    const housingOther = use === 'kapital' ? ownHousing : 0;
    const beforeRate = incomeTotal - living - ownerCosts - housingOther - oblig;
    const surplus = beforeRate - am.pay;
    const quota = (am.pay + oblig) / incomeTotal * 100;
    const payoffYears = am.months / 12;
    const ageEnd = age ? age + payoffYears : 0;

    // Max affordable price (rate ≤ 35 % of income and ≥ 300 € buffer)
    const extraRate = (taxRate + R.notaryAndLandRegistry + commission) / 100;
    const sollMax = effToSoll(marketRate(90, term));
    const maxPay = Math.max(0, Math.min(incomeTotal * 0.35 - oblig, beforeRate - 300));
    const maxLoan = maxPay * 12 / (sollMax + repay);
    const maxPrice = Math.max(0, (maxLoan + equity) / (1 + extraRate));

    /* ---------- Eligibility checks ---------- */
    const checks = [];
    const add = (lvl, title, text) => checks.push({ lvl, title, text });

    if (equity >= extras) add('ok', t('c.eqOk'), t('c.eqOkT').replace('{nk}', eur(extras)));
    else if (equity >= extras * 0.5) add('warn', t('c.eqWarn'), t('c.eqWarnT').replace('{nk}', eur(extras)));
    else add('bad', t('c.eqBad'), t('c.eqBadT').replace('{nk}', eur(extras)));

    if (ltv <= 80) add('ok', t('c.ltvOk').replace('{v}', pct(ltv, 0)), t('c.ltvOkT'));
    else if (ltv <= 100) add('warn', t('c.ltvWarn').replace('{v}', pct(ltv, 0)), t('c.ltvWarnT'));
    else if (ltv <= R.maxLtvFinanceable) add('warn', t('c.ltvFull').replace('{v}', pct(ltv, 0)), t('c.ltvFullT'));
    else add('bad', t('c.ltvBad').replace('{v}', pct(ltv, 0)), t('c.ltvBadT'));

    if (quota <= 35) add('ok', t('c.qOk').replace('{v}', pct(quota, 1)), t('c.qOkT'));
    else if (quota <= 45) add('warn', t('c.qWarn').replace('{v}', pct(quota, 1)), t('c.qWarnT'));
    else add('bad', t('c.qBad').replace('{v}', pct(quota, 1)), t('c.qBadT'));

    if (surplus >= 300) add('ok', t('c.sOk').replace('{v}', eur(surplus)), t('c.sOkT'));
    else if (surplus >= 0) add('warn', t('c.sWarn').replace('{v}', eur(surplus)), t('c.sWarnT'));
    else add('bad', t('c.sBad').replace('{v}', eur(surplus)), t('c.sBadT'));

    const jobLvl = { angestellt: 'ok', beamter: 'ok', selbst3: 'ok', rentner: 'ok', befristet: 'warn', probezeit: 'warn', selbst0: 'bad' }[job];
    add(jobLvl, t('job.' + job), t('c.job.' + job));

    if (age) {
      if (ageEnd <= 70) add('ok', t('c.ageOk').replace('{v}', Math.round(ageEnd)), t('c.ageOkT'));
      else if (ageEnd <= 78) add('warn', t('c.ageWarn').replace('{v}', Math.round(ageEnd)), t('c.ageWarnT'));
      else add('bad', t('c.ageBad').replace('{v}', Math.round(ageEnd)), t('c.ageBadT'));
    }

    const bad = checks.filter(c => c.lvl === 'bad').length, warn = checks.filter(c => c.lvl === 'warn').length;
    const v = bad ? 'bad' : warn >= 2 ? 'warn' : 'ok';
    const vKey = bad ? 'bad' : warn >= 2 ? 'warn' : warn === 1 ? 'good' : 'great';
    const vIcon = { ok: 'check', warn: 'alert', bad: 'x' }[v];

    $('verdict').className = 'verdict ' + v;
    $('verdict').innerHTML = `<div class="v-icon">${icon(vIcon)}</div><div><div class="eyebrow" style="margin-bottom:4px">${t('c.result')}</div><h2>${t('c.v.' + vKey)}</h2><p>${t('c.v.' + vKey + 'T')}</p></div>`;

    $('kpis').innerHTML = [
      [t('c.k.loan'), eur(loan), t('c.k.ltv') + ' ' + pct(ltv, 0)],
      [t('c.k.rate'), eur(am.pay), t('c.k.perMonth')],
      [t('c.k.interest'), pct(eff, 2), t('c.k.soll') + ' ' + pct(soll * 100, 2)],
      [t('c.k.max'), eur(Math.round(maxPrice / 5000) * 5000), t('c.k.maxT')]
    ].map(k => `<div class="card kpi"><span>${k[0]}</span><strong>${k[1]}</strong><small>${k[2]}</small></div>`).join('');

    $('checks').innerHTML = checks.map(c => `<div class="check-row ${c.lvl}"><span class="dot">${icon(c.lvl === 'ok' ? 'check' : c.lvl === 'warn' ? 'alert' : 'x')}</span><div><strong>${c.title}</strong><span class="muted">${c.text}</span></div></div>`).join('');

    $('costs').innerHTML = `
      <dt>${t('card.price')}</dt><dd>${eur(price)}</dd>
      <dt>${t('detail.transferTax')} (${pct(taxRate, 1)})</dt><dd>${eur(cTax)}</dd>
      <dt>${t('detail.notary')} (${pct(R.notaryAndLandRegistry, 1)})</dt><dd>${eur(cNotary)}</dd>
      <dt>${t('detail.commission')} (${pct(commission, 2)})</dt><dd>${eur(cCom)}</dd>
      <dt class="total">${t('detail.totalCost')}</dt><dd class="total">${eur(total)}</dd>
      <dt>– ${t('c.equity')}</dt><dd>${eur(equity)}</dd>
      <dt class="total">${t('c.k.loan')}</dt><dd class="total">${eur(loan)}</dd>`;

    $('terms').innerHTML = `
      <dt>${t('c.t.term')}</dt><dd>${term} ${t('c.years')}</dd>
      <dt>${t('c.t.repay')}</dt><dd>${pct(repay * 100, 1)}</dd>
      <dt>${t('c.t.rate')}</dt><dd>${eur(am.pay, 2)}</dd>
      <dt>${t('c.t.interestTerm')}</dt><dd>${eur(am.interestTerm)}</dd>
      <dt>${t('c.t.rest').replace('{n}', term)}</dt><dd>${eur(am.restTerm)}</dd>
      <dt>${t('c.t.payoff')}</dt><dd>${num(payoffYears, 1)} ${t('c.years')}${age ? ` (${t('c.t.age')} ${Math.round(ageEnd)})` : ''}</dd>
      <dt>${t('c.t.interestTotal')}</dt><dd>${eur(am.interestTotal)}</dd>`;

    // Bank comparison
    const rows = R.banks.map(b => {
      const e = market + b.spread, s = effToSoll(e), a = amortize(loan, s, repay, term);
      return { b, e, s, pay: a.pay, interest: a.interestTerm, rest: a.restTerm };
    }).sort((x, y) => x.e - y.e);
    const worst = rows[rows.length - 1];
    $('bank-body').innerHTML = rows.map((r, i) => `
      <tr class="${i === 0 ? 'best' : ''}">
        <td>${i + 1}</td>
        <td><div class="bank-name">${r.b.name} ${i === 0 ? `<span class="badge badge-ok" style="font-size:.62rem">${t('c.b.best')}</span>` : ''}</div><div class="bank-type">${r.b.type[I18N.lang]}</div></td>
        <td class="num"><strong>${pct(r.e, 2)}</strong><div class="bank-type">${t('c.k.soll')} ${pct(r.s * 100, 2)}</div></td>
        <td class="num">${eur(r.pay)}</td>
        <td class="num">${eur(r.interest)}</td>
        <td class="num">${eur(r.rest)}</td>
        <td><span class="src-tag ${r.b.verified ? 'verified' : 'estimate'}">${t(r.b.verified ? 'c.b.verified' : 'c.b.estimate')}</span></td>
      </tr>`).join('');
    $('bank-save').innerHTML = t('c.b.save').replace('{best}', rows[0].b.name).replace('{v}', `<strong>${eur(worst.interest - rows[0].interest)}</strong>`).replace('{n}', term);

    drawChart(am.yearly, term, loan);

    if (prop) $('calc-prop').innerHTML = `${icon('home')} ${t('c.forProp')} <a href="objekt.html?id=${prop.id}">${prop.title[I18N.lang]}</a>`;
  }

  /* ---------- Chart: remaining debt ---------- */
  function drawChart(yearly, term, loan) {
    const W = 640, H = 240, pl = 64, pr = 16, pt = 16, pb = 32;
    const n = Math.max(yearly.length - 1, 1);
    const x = i => pl + i / n * (W - pl - pr);
    const y = v => pt + (1 - v / (loan || 1)) * (H - pt - pb);
    const pts = yearly.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
    const area = `M${x(0)},${y(0)} L${pts.join(' L')} L${x(n)},${y(0)} Z`;
    const ticks = [0, .25, .5, .75, 1];
    const step = n > 30 ? 10 : 5;
    const xt = []; for (let i = 0; i <= n; i += step) xt.push(i);
    const tx = Math.min(term, n);
    $('chart').innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t('c.chartTitle')}">
        ${ticks.map(f => `<line x1="${pl}" x2="${W - pr}" y1="${y(loan * f)}" y2="${y(loan * f)}" stroke="#e4ded3"/><text x="${pl - 8}" y="${y(loan * f) + 4}" text-anchor="end" font-size="11" fill="#667085">${num(loan * f / 1000)}k</text>`).join('')}
        ${xt.map(i => `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#667085">${i}</text>`).join('')}
        <path d="${area}" fill="#b0803f" fill-opacity=".16"/>
        <polyline points="${pts.join(' ')}" fill="none" stroke="#b0803f" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="${x(tx)}" x2="${x(tx)}" y1="${pt}" y2="${H - pb}" stroke="#152238" stroke-dasharray="4 4" stroke-width="1.5"/>
        <text x="${x(tx) + 6}" y="${pt + 12}" font-size="11" font-weight="600" fill="#152238">${t('c.chartEnd').replace('{n}', term)}</text>
        <circle cx="${x(tx)}" cy="${y(yearly[tx] || 0)}" r="5" fill="#152238"/>
      </svg>`;
  }

  form.addEventListener('input', calc);
  form.addEventListener('change', calc);
  form.addEventListener('submit', e => { e.preventDefault(); calc(); document.getElementById('calc-results').scrollIntoView({ behavior: 'smooth' }); });
  document.addEventListener('langchange', () => {
    const cur = stateSel.value; calc(); stateSel.value = cur;
  });
  $('rates-updated').textContent = R.updated;
  calc();
})();
