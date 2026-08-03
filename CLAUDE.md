# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read AGENTS.md first

`AGENTS.md` is the canonical, detailed guide for this repo (design system, CSS/JS conventions, portfolio data model, Vanta background rationale, headless-Chrome caveats). This file is a summary and a pointer — when the two disagree, `AGENTS.md` wins, and new durable knowledge belongs there rather than here.

## What this is

Marketing site for **Muscat AI Markets** (a Muscat/Oman digital transformation, AI and creative-tech company). All site copy derives from the company profile deck in `organization_profile/macro_digital_profile.pdf`. The deck is branded "Macro Digital" — take copy from it, not its name.

## Run & verify

```bash
python3 -m http.server 8231   # http://localhost:8231
node --check script.js portfolio-data.js
```

Serve it — do not open via `file://`; the carousel loads sibling scripts and images. No build step, no `package.json`, no linter, no test suite; verification is manual in a browser (anchor nav, each filter, autoplay wrap, gallery/zoom open-close-Esc, 390/768/1280/1920 px, clean console).

Headless-Chrome gotchas that produce false failures — see `AGENTS.md` "Run & Test" and "Hero Background" for the full list. The big three: the viewport clamps to a 500 px minimum (a 390 px screenshot is a crop, not a phone layout — measure with `getBoundingClientRect`); `--virtual-time-budget` neither drives `requestAnimationFrame` nor advances CSS transitions; and WebGL needs `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.

## Architecture

Flat-file, zero-build, and **fully offline** — every third-party library is vendored under `assets/vendor/` (Tailwind Play, Plus Jakarta Sans, AOS, Font Awesome, three.js **r134**, Vanta, vanilla-tilt). Never reintroduce a CDN `<link>`/`<script>`; the only remote reference in shipped files is the `wa.me` anchor.

| File | Role |
|---|---|
| `index.html` | The whole page — every section, plus empty shells for the carousel/lightbox/zoom |
| `styles.css` | Flat descriptive component classes layered over Tailwind utilities |
| `portfolio-data.js` | `window.PORTFOLIO` + `window.PORTFOLIO_FILTERS` — **all case-study content lives here**, not in HTML |
| `script.js` | Vanilla JS: Vanta init, carousel, gallery/zoom, AOS, header, accordion |

`portfolio-data.js` must load before `script.js`. Vanilla JS only; `IntersectionObserver` for scroll logic.

Two Vanta layers back the page: `#hero-waves` (WAVES, hero only) and `#site-topology` (**NET**, a fixed `z-index: -3` field behind the whole page — NET, not TOPOLOGY, deliberately; see AGENTS.md). Both are gated behind an `.is-on` / `body.topology-on` class added only after the effect constructs, and both no-op under `prefers-reduced-motion` or without WebGL — the un-enhanced fallback must stay a finished-looking page.

Section order in `index.html` is deliberate (`hero → marquee → #work → #ai-solutions → #services → #why → #process → #team → #about → Supporting Oman's Digital Future → #contact → CTA → footer`), and nav links mirror it. The FAQ block is commented out in place, not deleted.

### Portfolio

Each entry carries `slug`, `brand`, `sub`, `desc`, `tags[]`, `cats[]`, `ar[]`, optional `logo`/`logoAr`/`logoInvert`. `ar` (width÷height per image, source order) doubles as the image count — it must match the number of `assets/portfolio/<slug>/NN.jpg` files exactly. Logos scale to constant visual *area*, not height. To add an item: read `portfolio/<client>/*.jpg` (that rendered card is the source of truth for its copy and tag pills), optimise visuals into `assets/portfolio/<slug>/`, then add the entry.

Gallery tiles keep each image's own proportions — `object-fit: contain`, never cropped or stretched, with a blurred copy of the same file filling leftover space. Put `aspect-ratio` on the inner `.pf-tile-sizer`, never on `.pf-tile`. Gallery/zoom open state lives in the `galleryOpen` / `zoomOpen` flags, not in `.hidden` (which lags on a 200 ms exit timer).

### Cards

`.card-grid*` rows are flex, not grid, so a short final row centres. `.tilt-card` must never get `overflow: hidden` (it forces `transform-style: flat` and kills every `translateZ`), and tilted cards must not set `transform` in `:hover` — vanilla-tilt writes `transform` inline and the two fight.

## Constraints

- **Brand:** "Muscat AI Markets" — never "Macro Digital" or "Muscat Digital Solutions".
- **Content:** only from the profile deck. Do not invent stats, testimonials, or client quotes; the deck has none.
- **Client logos:** never substitute stock or look-alike marks for a named client. Clients without real artwork (Ministry of Health, BRIMFUL) stay off the marquee until it arrives. G Forge Studios and Legit Design Studios are partners, not clients.
- **Theme:** dark indigo + orange accent only. No light sections, no off-palette colours.
- **Icons:** Font Awesome 6 free *solid* glyphs from the vendored font — confirm with `grep '\.fa-<name>:before' assets/vendor/fontawesome.css` before use.
- **Contrast is measured, not eyeballed** — sample text-free background regions; hero badge and body text are held above the 7:1 AAA threshold.
- Untracked source dirs `organization_profile/` and `portfolio/` are gitignored and not shipped.
- Outstanding client-side work is tracked in `notes.txt`; `version.txt` holds the release version matching the `release/*` branch.
