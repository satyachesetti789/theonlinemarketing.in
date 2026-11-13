# The Online Marketing — theonlinemarketing.in

Final marketing site for **The Online Marketing** (theonlinemarketing.in), an independent
growth & media consultancy. Apple-style premium design: SF Pro system stack, sapphire blue
`#0071e3`, ivory & true-black bands, champagne-gold accents, grain texture, motion layer.

## Structure

```
theonlinemarketing/
├── index.html                  ← home page (all sections)
├── CNAME                       ← custom domain: theonlinemarketing.in
├── og-image.png                ← 1200×630 share card (spec v2 palette+fonts)
├── css/
│   └── style.css               ← shared stylesheet (home + article pages)
├── js/
│   └── main.js                 ← menu, reveals, chart, counters, parallax, link fallback
├── assets/
│   ├── anvesh.jpg              ← founder portrait (circular crop on site)
│   ├── satya.jpg               ← founder portrait (circular crop on site)
│   ├── fonts/space-grotesk-var.woff2  ← headings (variable)
│   ├── fonts/dm-sans-var.woff2        ← body (variable)
│   ├── fonts/dm-sans-var-italic.woff2
│   └── README.txt
├── articles/
│   ├── incrementality-at-scale.html
│   ├── sampling-economics.html
│   └── redefining-lead-quality.html
└── README.md
```

Pure static HTML/CSS/JS — no build step, no dependencies, no external requests
(typeface is self-hosted, so even the fonts need no CDN).

## Design system v3 — Apple x Stripe x COLLINS
- **References:** COLLINS (premium agency structure & personality), Apple (typography,
  whitespace, clean presentation, light footer), Stripe (navy hero card, aurora gradients,
  gradient headline accents).
- **Fonts (self-hosted, zero external requests):** Space Grotesk variable — headings;
  DM Sans variable — body (`assets/fonts/`). SIL Open Font License.
- **Type scale:** hero 72/44 · H2 44/34 · H3 28/24 · card H4 22/20 · sub-headings 18/17 ·
  body 16 · nav 18 (+4 per brand request) · nav CTA 18 · ribbon 17 · wordmark 18/16 ·
  buttons 14 (w600) · labels 12/11 uppercase.
- **Palette:** White primary bg · `#F5F5F7` grey bands & footer · ink `#1D1D1F` ·
  grey text `#6E6E73` · Apple blue `#0071E3` actions/accents · `#2997FF`/`#64D2FF` on dark ·
  borders `#D2D2D7` · true-black dark bands with blue/violet/cyan aurora · navy `#0A2540`
  hero chart card · multi-colour capability accents · gradient headline keyword ·
  Stripe-gradient contact CTA card.
- **Logo:** blue premium gradient disc (#37A6FF → #0071E3 → #0053B3), white orbit/arrow/star.
- **Layout:** 1440px max · 12-column desktop grid · 8px spacing · 120px sections (72 mobile) ·
  header 84/68 · white cards + 1px border, 10px radius · buttons 52/48 · images 6px radius.

## Sections & features
Hero with animated chart + parallax · **Growth-Engine infographic** (dark band right after
the hero: gold rising curve that draws itself on scroll, 4 pulsing stage nodes
DIAGNOSE→DESIGN→DEPLOY→COMPOUND, and 4 count-up proof stats) · brand marquee · capabilities grid · black manifesto band ·
case studies with count-up metrics · About us with circular founder portraits · Articles
(3 internal sub-pages + Anvesh's public playbooks) · approach · FAQ · contact (Calendly +
Gmail compose + WhatsApp +91 81431 30661) · apple-style footer · scroll progress bar ·
line-mask headline reveals · magnetic buttons · grain overlay · reduced-motion safe ·
SEO: canonical/OG/Twitter tags + JSON-LD (business + FAQ) on every page.

## Run locally
```bash
python3 -m http.server 8000     # → http://localhost:8000
```

## Deploy — GitHub Pages (used for the live custom domain)
1. Repo with these files on the `main` branch (existing repo may be renamed to
   `theonlinemarketing` in Settings → General → Repository name — optional; the custom
   domain makes the repo name irrelevant to visitors)
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)` → Save
3. **Custom domain**: `theonlinemarketing.in` → Save → tick **Enforce HTTPS** once DNS resolves
4. GoDaddy DNS for theonlinemarketing.in (My Products → Manage DNS):

   | Type  | Host  | Value                          | TTL |
   | ----- | ----- | ------------------------------ | --- |
   | A     | `@`   | `185.199.108.153`              | 600 |
   | A     | `@`   | `185.199.109.153`              | 600 |
   | A     | `@`   | `185.199.110.153`              | 600 |
   | A     | `@`   | `185.199.111.153`              | 600 |
   | CNAME | `www` | `<your-username>.github.io`    | 600 |

   (Delete any parked/forwarding records. `www` auto-redirects to the apex via `CNAME`.)

## Deploy — alternative (Netlify Drop, free)
Drag the `theonlinemarketing` folder (or zip) onto https://app.netlify.com/drop,
then claim the site with a free account and rename it. (Custom domain then lives under
Netlify's domain settings instead of GoDaddy→GitHub.)

## Upload golden rule
In GitHub's web uploader, **drag FOLDERS (css, js, articles, assets), never loose files** —
loose files land at the repo root and break the `css/style.css`-style paths (this caused a
live 404 incident once already).

## Remaining TODOs
- [ ] Confirm contact email spelling: `satyachesetti786@gmail.com` (Calendly user is `…789`)
- [ ] Optional analytics (Plausible/GA4) before `</head>`
