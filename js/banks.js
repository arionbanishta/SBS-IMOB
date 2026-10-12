/* =========================================================
   Mortgage market data (Germany) – used by the calculator.
   UPDATE THESE NUMBERS REGULARLY (e.g. once a month).

   Research date: 30.09.2026
   Sources:
   - baufivergleich.de/aktuelle-zinsen (Stand 25.09.2026): best effective rates, 10 years,
     by loan-to-value (LTV): 60% 4.06–4.13 · 80% 4.26 · 90% 4.48–4.55 · 100% 4.71 · >100% 5.28
   - drklein.de/aktuelle-bauzinsen (Stand 30.09.2026): best eff. rates by fixed term:
     5y 4.40 · 10y 4.23 · 15y 4.37 · 20y 4.46 · 30y 4.70
   - finanzfacts.de/bauzinsen-aktuell (Stand 26.09.2026): Interhyp 10y 4.08 % eff. (LTV ≤ 70%),
     Dr. Klein 10y 4.11 % Sollzins, PSD Bank Braunschweig 5y 4.26 % eff.
   - ING (via capitalo.de, Sept. 2026): 10y, LTV 80%, 4.43 % Sollzins
   ========================================================= */
window.RATES = {
  updated: "30.09.2026",

  // Best effective annual rate (%) for a 10-year fixed rate, by loan-to-value ceiling
  base10ByLtv: [
    { maxLtv: 60, rate: 4.06 },
    { maxLtv: 80, rate: 4.26 },
    { maxLtv: 90, rate: 4.48 },
    { maxLtv: 100, rate: 4.71 },
    { maxLtv: 110, rate: 5.28 }
  ],
  maxLtvFinanceable: 110,

  // Surcharge (percentage points) vs. 10-year fixed rate
  termOffset: { 5: 0.15, 10: 0, 15: 0.17, 20: 0.26, 25: 0.38, 30: 0.49 },

  // Spread above the market's best rate (percentage points).
  // verified = rate seen in a public source (see header); estimate = typical market position, not a quote.
  banks: [
    { name: "Interhyp", type: { de: "Vermittler · 500+ Banken", en: "Broker · 500+ banks" }, spread: 0.02, verified: true, url: "https://www.interhyp.de" },
    { name: "Dr. Klein", type: { de: "Vermittler · 600+ Banken", en: "Broker · 600+ banks" }, spread: 0.06, verified: true, url: "https://www.drklein.de" },
    { name: "PSD Bank", type: { de: "Genossenschaftsbank", en: "Cooperative bank" }, spread: 0.08, verified: true, url: "https://www.psd-bank.de" },
    { name: "DKB", type: { de: "Direktbank", en: "Direct bank" }, spread: 0.14, verified: false, url: "https://www.dkb.de" },
    { name: "Sparda-Bank", type: { de: "Genossenschaftsbank", en: "Cooperative bank" }, spread: 0.15, verified: false, url: "https://www.sparda.de" },
    { name: "Commerzbank", type: { de: "Filialbank", en: "High-street bank" }, spread: 0.19, verified: false, url: "https://www.commerzbank.de" },
    { name: "Deutsche Bank", type: { de: "Filialbank", en: "High-street bank" }, spread: 0.21, verified: false, url: "https://www.deutsche-bank.de" },
    { name: "Volksbank / Raiffeisenbank", type: { de: "Regionale Genossenschaftsbank", en: "Regional cooperative bank" }, spread: 0.24, verified: false, url: "https://www.vr.de" },
    { name: "ING", type: { de: "Direktbank", en: "Direct bank" }, spread: 0.26, verified: true, url: "https://www.ing.de" },
    { name: "Sparkasse", type: { de: "Regionale Sparkasse", en: "Regional savings bank" }, spread: 0.28, verified: false, url: "https://www.sparkasse.de" }
  ],

  // Grunderwerbsteuer (real estate transfer tax) by federal state, %
  transferTax: {
    "Baden-Württemberg": 5.0, "Bayern": 3.5, "Berlin": 6.0, "Brandenburg": 6.5, "Bremen": 5.5,
    "Hamburg": 5.5, "Hessen": 6.0, "Mecklenburg-Vorpommern": 6.0, "Niedersachsen": 5.0,
    "Nordrhein-Westfalen": 6.5, "Rheinland-Pfalz": 5.0, "Saarland": 6.5, "Sachsen": 5.5,
    "Sachsen-Anhalt": 5.0, "Schleswig-Holstein": 6.5, "Thüringen": 5.0
  },
  notaryAndLandRegistry: 2.0, // ~1.5 % notary + ~0.5 % land registry
  defaultCommission: 3.57,    // buyer share of broker commission incl. VAT

  // Household cost assumptions used by banks (monthly, EUR) – conservative 2026 values
  living: { firstAdult: 1100, extraAdult: 450, child: 350 },
  ownerCostPerSqm: 3.5,       // non-recoverable running costs / maintenance for owner-occupiers
  rentCountedShare: 0.75      // share of expected rental income banks usually count
};
