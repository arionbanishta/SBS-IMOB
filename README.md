# Muster Immobilien – Website

Static website (HTML/CSS/JavaScript, no build step). German by default, with an EN switch.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home: search, services, new listings, sell CTA, calculator teaser, whole buildings, rentals |
| `immobilien.html` | Catalog with filters (buy / rent / all, type, price, rooms, space, sorting) |
| `objekt.html?id=…` | Property detail: gallery, facts, energy certificate, purchase costs, viewing request |
| `verkaufen.html` | Sell your property: direct purchase or marketing, 3-step valuation form, FAQ |
| `finanzierung.html` | Mortgage calculator: eligibility check, loan terms, bank rate comparison, chart |
| `ueber-uns.html`, `kontakt.html` | About the company, contact form |
| `impressum.html`, `datenschutz.html` | Legal pages (placeholders – required in Germany) |

## Where to change things
- **Company name, address, phone, e-mail, federal state:** `js/config.js`
- **Properties:** `js/properties.js` (copy a block, change the values; images are Unsplash photo IDs – replace with your own photos in `img/`)
- **Interest rates & banks:** `js/banks.js` – update monthly. Sources are listed at the top of the file.
- **Form e-mails:** set `formEndpoint` in `js/config.js` (e.g. a free Formspree form). Until then forms run in demo mode.
- **Texts:** German text is in the HTML files; English versions are in `js/i18n.js`.

## Run locally
```
python -m http.server 8080
```
Then open http://localhost:8080

## Deploy (Cloudflare)
Live: https://sbs-imob.arion0banishta.workers.dev
GitHub: https://github.com/arionbanishta/SBS-IMOB

After changing files, commit and push to GitHub, then publish:
```
npx wrangler deploy
```
`wrangler.jsonc` holds the Cloudflare settings; `.assetsignore` keeps README and config files off the live site.

## Before going live
- Fill in Impressum & Datenschutz (have them legally checked), incl. § 34c GewO broker licence.
- Replace demo properties, team photos, stats and testimonials with real ones.
- Host fonts and images locally (GDPR), connect a form endpoint.
