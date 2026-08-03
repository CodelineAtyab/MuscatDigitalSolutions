# AGENTS.md — Muscat AI Markets

## Project Identity

**Muscat AI Markets** — a Muscat-based digital transformation, AI and creative technology company serving Oman and the GCC. Site content is derived from the company profile deck at `organization_profile/macro_digital_profile.pdf` (22 slides, image-only — no text layer).

Ten service domains: Digital Marketing & Growth · Branding, Creative & Content · Website & E-Commerce · Software Development · AI & Automation · Data & Annotation · Cloud & IT Infrastructure · Managed IT & Transformation · 3D/Virtual/Interactive · Digital Asset Management.

> The profile deck is branded "Macro Digital" throughout. **The site brand is "Muscat AI Markets".** Take copy from the deck, not the deck's name.

---

## Tech Stack

Flat-file, zero-build. **No CDN — every third-party asset is vendored under `assets/vendor/` (1.6 MB), so the site runs with no network.** No Node.js, bundler, or `package.json`.

| File | Purpose |
|---|---|
| `index.html` | Single-page HTML, all sections, anchor nav |
| `styles.css` | Custom components over Tailwind utilities |
| `portfolio-data.js` | Portfolio content — edit case studies here, not in HTML |
| `script.js` | Vanilla JS: portfolio carousel, AOS, accordion, header, mobile nav |
| `assets/portfolio/<slug>/` | Web-optimised images (`01.jpg`…`NN.jpg`, `logo.png`) |
| `assets/clients/` | Client logos for the marquee, transparent PNG |
| `assets/vendor/` | Vendored Tailwind, Plus Jakarta Sans, AOS, Font Awesome, three.js, Vanta, vanilla-tilt |

### Source material (not shipped)

| Dir | Contents |
|---|---|
| `organization_profile/` | Company profile PDF — all site copy comes from here |
| `portfolio/<client>/` | Original case-study exports: a full-card `.jpg`/`.pdf` plus an `images/` dir of source visuals |

The per-client **`.jpg` is the rendered portfolio card** and is the source of truth for its copy, tagline, and tag pills. Several `.pdf` siblings are 0 bytes — use the `.jpg`.

### Vendored deps (`assets/vendor/`, all free/public license)

| Library | License | Usage |
|---|---|---|
| Tailwind CSS 3.4.5 (Play build) | MIT | Layout, spacing, colors |
| Plus Jakarta Sans (variable) | OFL | All typography |
| AOS 2.3.4 | MIT | Scroll fade/zoom animations |
| Font Awesome 6.5.2 | Free (SIL OFL / MIT) | Icons |
| three.js **r134** | MIT | Required by Vanta — see below |
| Vanta.js 0.5.24 | MIT | Hero waves + page background |
| vanilla-tilt 1.8.1 | MIT | 3D tilt/glare on content cards |

**Keep it offline.** The only remote reference left in the shipped files is the `wa.me` WhatsApp *link* (an anchor, not a resource). Verified by loading the page with all DNS blocked (`--host-resolver-rules="MAP * ~NOTFOUND"`): fonts resolve, icons render, 0 broken images. Don't reintroduce a CDN `<link>`/`<script>`.

> When re-vendoring Font Awesome: fix the `../webfonts/` paths, and if you strip the `.ttf` sources remove the **leading comma** with them. Leaving `src:url(...woff2) format("woff2"),` with a trailing comma invalidates the whole declaration and every icon silently renders as an empty box.

---

## Design System

### Colors

Taken from the profile deck: deep indigo/violet field, magenta mid-tones, **orange as the primary accent** (the deck's "Macro" wordmark, its `Services:` headings, and its left rules are all orange).

| Var | Hex | Role |
|---|---|---|
| `--bg` / `--bg-2` | `#060518` / `#0c0a26` | Page bg (indigo-black) |
| `--surface` / `--surface-2` | `#121030` / `#191540` | Card bg |
| `--orange` / `--orange-soft` | `#f4661f` / `#ff8a3d` | **Primary accent** |
| `--magenta` | `#e5399a` | Secondary accent |
| `--violet` / `--violet-soft` | `#7c4dff` / `#a78bfa` | Tertiary accent |
| `--border` / `--border-lit` | `rgba(255,255,255,.09)` / orange 45% | Idle / hover borders |
| `--grad` | violet → magenta → orange, 120° | Buttons, gradient text |

Dark theme only. No light sections.

> `--grad` only reads as a gradient across a **wide** box. On short text (a 2-digit number, a small dot) it renders as flat violet — use a tighter two-stop ramp there instead. See `.step-num`.

### Typography

- One family throughout: **Plus Jakarta Sans**, `letter-spacing: -0.02em` on headings, responsive `clamp()`
- Chosen by comparing candidates against a full-resolution crop of the deck's body copy. The deck has a **double-storey `a`**, single-storey `g` and round bowls — Space Grotesk's quirky forms (its `a`, `g`, `y`, `M`) appear nowhere in the deck, so it was replaced. Poppins is out too: single-storey `a`.
- Display weight is **800** (the deck sets headings very heavy and tight); `.thin` is 300
- The deck pairs a **light word with a bold word** in every heading. Mirror it: `<span class="thin">Our</span> approach`
- Inline accent: `<em class="accent">`

---

## CSS Conventions

Flat descriptive class names on top of Tailwind. Hover adds `translateY(-4px)` + orange border. Responsive at `@media (max-width: 768px)`.

| Class | Purpose |
|---|---|
| `.display` / `.display-sm` | Hero/section headings, `clamp()` |
| `.thin` | The light half of a two-weight heading |
| `.eyebrow` | Uppercase orange label above headings |
| `.rule-left` | Orange left rule before body copy (deck motif) |
| `.badge` / `.btn` / `.btn-primary` / `.btn-ghost` | Pills and buttons |
| `.marquee` / `.marquee-track` | Infinite `@keyframes scroll` client names |
| `.chip` / `.chip-active` | Portfolio filter pills |
| `.pf-*` | Portfolio carousel — see below |
| `.path-card` / `.path-card-featured` / `.path-icon` | Vision/Mission cards |
| `.service-card` / `.service-num` | Numbered service cards |
| `.step` / `.step-num` | Our Approach stages |
| `.ai-card` / `.ai-icon` | AI solutions |
| `.pill-card` | Single-line capability pills (Supporting Oman's Digital Future only) |
| `.reason-card` | Why-choose-us — `.ai-card` shell, compact translucent row, no body copy |
| `.team-card` | Our Team — same compact translucent row, icon chip + role heading |
| `.card-grid` / `-3` / `-4` / `-5` | Flex card rows that centre a short final row |
| `.tilt-card` | Card chrome + vanilla-tilt target — see below |
| `.faq` | `<details>` accordion items |
| `.cta` / `.chat-fab` | Gradient CTA, WhatsApp FAB |

---

## Vertical Rhythm

Sections are `py-12 md:py-16`, and the heading-to-card-grid gap is `mt-10`. Because adjacent sections each contribute their own padding, the *visible* gap is double the utility — measured 128–133 px on desktop and 96–101 px on mobile, uniform across every boundary. The earlier `py-28` doubled to 224 px and read as dead space.

Two exceptions, deliberate: the client marquee is a compact `py-8` band, and the hero closes with `pb-16 md:pb-24` so its gap to the marquee matches the rest.

Measure this rather than eyeballing it — adjacent sections abut, so the whitespace is the distance from one section's last in-flow child to the next section's first, not the gap between the section boxes (which is always 0). Filter out `position: fixed`/`absolute` children first, or the portfolio lightbox shells inside `#work` report a ~2000 px phantom gap.

## Section Order

Deliberate, do not reshuffle casually:

`hero → client marquee → #work → #ai-solutions → #services → #why → #process → #team → #about → Supporting Oman's Digital Future → #contact → CTA → footer`

**FAQ is commented out** in `index.html` (kept in place, not deleted) — uncomment the `<!-- FAQ — hidden for now … -->` block to restore it.

The two AI sections sit **immediately after the portfolio** (show the work, then what powers it), and **About sits directly above the Let's Talk contact block** so the page closes on who we are and how to reach us. The nav links follow the same order.

---

## Card Rows (`.card-grid`)

Card rows are **flex, not grid**. With `grid`, a final row holding fewer cards than there are columns hugs the left edge; flex + `justify-content: center` centres it under the rest. Basis is `(100% - (cols-1) × gap) / cols`, one class per column count.

Verified: the 10-card services row (last row = 1 card) measures 399 px of gap on both sides; the 7-step approach row (last row = 3) measures 150 px on both sides.

Sections using it: AI Solutions (`-5`), Services (`-3`), Why Choose Us (`-4`), Our Approach (`-4`), Our Team (`-4`).

---

## Card Chrome (`.tilt-card`)

44 cards carry it: `.service-card`, `.ai-card` (incl. `.reason-card` and `.team-card`), `.path-card`, `.step`. Applied in `index.html` as an extra class; the effects are CSS plus vanilla-tilt.

- `::before` — a 1px gradient edge in the brand ramp, drawn with a `mask-composite: exclude` trick so only the border paints. Fades in on hover.
- `::after` — warm orange bloom in the top corner, echoing the deck's gradient corners.
- `.service-card .service-num` **and `.step .step-num`** — the deck numbers its service pages, so the number is a large outlined ghost figure in the corner (`-webkit-text-stroke`, no fill) that warms to orange on hover. Both numbered sections share this treatment; keep them identical.
- vanilla-tilt supplies the tilt and glare sheen, and card contents `translateZ` off the surface (icon 34 px, number 42 px, heading 20 px, copy 10 px) so the tilt reads as real parallax.

> **Never put `overflow: hidden` on `.tilt-card`.** Per spec it forces `transform-style` back to `flat`, silently killing every `translateZ` and flattening the 3D. That is why the `::after` bloom is `inset: 0` with an off-centre radial rather than an overhanging circle — nothing needs clipping. Check with `getComputedStyle(card).transformStyle === 'preserve-3d'`.

> Tilted cards must **not** have a `transform` in their `:hover` rule — vanilla-tilt writes `transform` inline and the two fight. Hover feedback on these is border + shadow only. `.team-card` carries `.tilt-card` in the markup, so it shares that rule too.

`.ai-card` and `.path-card` lay out as a two-column grid: the icon and the heading share row 1, everything after them spans both columns beneath. Every child spans by default and only `.ai-icon`/`.path-icon` and the heading are pinned to row 1, so a new child can't fall into the icon column. `.reason-card` and `.team-card` have no body copy, so the same grid renders them as one compact row — tightened padding and a translucent `rgba(255,255,255,.045)` surface that lets the NET background read through. **No `backdrop-filter` on these:** like `filter` and `opacity < 1` it is a grouping property, so it forces `transform-style` back to `flat` and kills the `translateZ` depth exactly as `overflow: hidden` does.

Tilt is initialised only when the pointer is fine and hover-capable, and never under `prefers-reduced-motion` — on touch there is no hover and the transform is just battery cost.

All card icons are Font Awesome 6 free **solid** glyphs from the vendored webfont — no new downloads needed. Confirm a glyph exists with `grep '\.fa-<name>:before' assets/vendor/fontawesome.css` before using it.

---

## Page Background (Vanta NET)

`#site-topology` — a `position: fixed` layer at `z-index: -3`, so one continuous animated field sits behind the whole page and does not scroll.

```
#site-topology (node network)  →  body.topology-on::before (translucent wash)  →  page content
```

**It is VANTA.NET, not VANTA.TOPOLOGY**, despite "topology" being the brief. TOPOLOGY is a p5.js effect: it would add ~1 MB (236 KB gzipped) of **LGPL-2.1** p5 on top of the three.js already loaded, and it renders as an almost invisible flow-field texture — verified blank at 2227 real frames, at four different colour pairs, on both p5 0.9.0 and 1.9.0, with no JS errors. NET draws the connected node-and-edge network the brief actually wanted, reuses three.js, and stays MIT. Switching back is a one-liner if a real GPU browser shows TOPOLOGY differently.

`body::before` is **opaque by default** and only swaps to its translucent variant via `body.topology-on`, added after NET constructs — otherwise the page loses its background entirely when the effect is skipped.

The hero must stay fully opaque on top of this: `.hero-waves` carries its own solid gradient background so the fixed network never shows through the hero, including when no canvas is drawn there.

Contrast over the network, sampled on text-free regions: white **19.6–20.2:1**, `#ff8a3d` **8.4–8.6:1**. Lightening the wash further must keep those above 7:1.

## Hero Background (Vanta WAVES)

`#hero-waves` in the hero section; initialised at the top of `script.js`.

**Pin three.js to r134.** Later three releases drop APIs Vanta calls and the effect silently fails to construct.

WAVES takes a **single** base colour — it is a lit 3D mesh, not a gradient shader — so the brand gradient is layered rather than passed in:

```
canvas (violet waves)  →  .hero-waves.is-on::after (dark scrim)  →  .aurora (warm tint)  →  content (z-10)
```

Vanta's lighting brightens the base colour substantially, so `color` is set far darker (`0x2a1466`) than the violet it ends up looking like. The scrim is heavy directly behind the text column and falls away fast towards the edges, where the animation stays visible.

**Contrast is the constraint, and it is measured, not eyeballed.** Screenshot the hero and sample *text-free* background regions (sampling over the text measures the text against itself and is meaningless). Current values: background luminance 0.10–0.12 behind the copy, giving the `#ff8a3d` badge **7.1–7.4:1** and white text **16.6–17.3:1** — both past the 7:1 WCAG AAA threshold. Brightening the waves or thinning the scrim must keep the badge above 7:1.

`.is-on` is added **only after** `VANTA.WAVES()` constructs successfully. The scrim and the dimmed `.aurora` are gated behind it because both are tuned against a live canvas — without one they render the hero flat and over-dark. The init no-ops under `prefers-reduced-motion`, or if either CDN script or WebGL is missing; in every such case full-strength `.aurora` alone is the finished background. Verified in all three states.

> Headless screenshots of this need `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`; plain `--disable-gpu` gives no WebGL and the run times out. Software rasterising is slow — keep the window small.
>
> **`--virtual-time-budget` does not drive requestAnimationFrame** — measured 9 rAF frames in 9 s of virtual time. Any effect that builds up over frames therefore screenshots as blank, which is an artifact, not the effect. To capture one properly you need *real* elapsed time: serve the page from a server with an endpoint that sleeps (see the `/slow` handler used during development) and reference it from an `<img>`, which holds the load event open while rAF runs at full rate — that yielded 2227 frames in 14 s. Puppeteer cannot launch Windows Chrome from WSL, and Chrome refuses `--remote-debugging-address` here, so this is the workable route.

## Client Marquee

13 real client lockups in `assets/clients/`, static markup in `index.html`.

**Never substitute stock or look-alike marks for a named client.** Ten of these were lifted from the Clients & Partners slide of the profile deck (page 18); blumen, Haddaya and Gulfood came from the portfolio source folders. Two clients named in the deck have no usable logo yet — **Ministry of Health** and **BRIMFUL** — so they are absent from the marquee rather than faked. Add them when real artwork arrives.

The deck slide sets its logos on a near-white card, so extraction derives alpha from each pixel's distance to the card colour and then un-blends the observed colour back out of that background, giving clean transparent PNGs. `filter: brightness(0) invert(1)` flattens them to white at display time, so the colour originals survive in the files if a colour treatment is ever wanted.

Heights are inline per logo, set to a constant visual **area** (5200) exactly as `.pf-logo` does — measured spread across all 13 is ±4%, rendering between 31 px and 73 px tall. Resize by changing that one constant and recomputing every `style="height:Npx"`; don't hand-tune individual logos or they stop reading as one set.

The track holds the 13 logos **twice**; `@keyframes scroll` translates by `-50%`, so the two halves must stay identical in width or the loop jumps. The duplicate set is `aria-hidden` with empty `alt`.

Duration is 38s on desktop and **20s under 768px**. The animation moves the same distance either way, but a phone shows only two or three lockups at a time, so the desktop timing reads as barely moving — the shorter loop keeps the perceived speed matched.

Every lockup carries its **intrinsic `width`/`height` attributes and must not be `loading="lazy"`** — both are load-order correctness, not micro-optimisation. `-50%` resolves against the track's own box, and a composited transform animation keeps whatever pixel distance it resolved when it was committed. Lazy, dimensionless images made the track start at roughly the sum of its gaps and grow as files landed, so the animation was committed short: the marquee crawled, and the first hover (which changes `animation-play-state` and forces a re-commit) snapped it to the correctly-resolved position — the "resets on first hover, fine afterwards" bug. The attributes let `width: auto` resolve through the aspect ratio at first layout, so the box is final before the animation starts. Measured: track width at `DOMContentLoaded` was 2816 px against a final 3474 px at 430 px wide; with attributes it is 3474 px at both events, and 4074 px at both on desktop.

G Forge Studios and Legit Design Studios sit in a separate sub-card on that slide — they are **partners, not clients**, and belong in the Our Partners section noted in `notes.txt`, not this marquee.

## Portfolio Carousel

Rendered from `window.PORTFOLIO` in `portfolio-data.js` — **add or edit case studies there**, not in `index.html`. `index.html` only supplies the empty shell (`#portfolio-filters`, `#portfolio-carousel`).

Each entry: `slug`, `brand`, `sub`, `desc`, `tags[]` (pills shown on the card, matching the source PDF), `cats[]` (drives filtering), `ar[]`, optional `logo` + `logoAr` + `logoInvert`.

**`ar` is the width÷height of each image, in source order.** It is the single source of truth for the image count (files must be `assets/portfolio/<slug>/01.jpg`… in the same order) and it drives the gallery mosaic. There is no separate count field — keep `ar.length` equal to the number of files.

**`logoAr` is the logo's width÷height.** Logos are scaled to a constant visual **area** (`LOGO_AREA` in `script.js`, currently 92×52 — what the OMAN summit lockup rendered at), not a constant height. Capping height alone left the square Haddaya mark at 52×52 while the 5.3:1 blumen mark ran to 221×41. `script.js` sets `--logo-h: sqrt(LOGO_AREA / logoAr)` per item; CSS reads it in the card, ×1.3 in the lightbox, ×0.85 on phones. Exact perceptual parity across a 5.3:1 wordmark and a 1:1 stacked mark isn't reachable without distorting them — equal area is the closest honest fit.

Two nested motions:
- **Outer** — slides between cards. 2 per view on desktop, 1 on phones (set by `.pf-slide`'s CSS width; JS *measures* it rather than duplicating the breakpoint). Autoplays every 5.5 s, wraps, with arrows, dots, and pointer-drag swipe.
- **Inner** — each card crossfades through its own images every 3.4 s, staggered per card.

Both pause on hover/focus, when the tab is hidden, and while the gallery is open; both are disabled under `prefers-reduced-motion`.

Filters are generated from `window.PORTFOLIO_FILTERS`. A card may belong to several categories. Keep every filter non-empty.

### Gallery lightbox

The card's image frame is covered by a transparent `.pf-open` button (with a "View all N" hover cue). It opens `#pf-lightbox`: the client's header, description and tags, then **every** visual in a mosaic. One column on phones, strict source order.

**Tiles keep each image's own proportions — do not uniform them.** The set should read the way the source PDF lays it out; blur-fill is only for the leftover space, not a reason to normalise every tile.

- Each image's `ar` goes on an inner `.pf-tile-sizer`, **never on `.pf-tile` itself**. On the tile it fights `align-self: stretch`: stretch makes the height definite from the row, then `aspect-ratio` recomputes the *width* from that height and tiles burst out of their column (measured 1185 px tiles in a 904 px grid). The sizer contributes the natural height to row sizing while the tile stays one column wide.
- Wide shots (`ar >= 1.5`) take `grid-column: span 2`, as in the PDFs.
- `align-self: stretch` pulls a short tile up to its row's height, so no gap is left under it.
- The image is `object-fit: contain` — **never cropped or stretched**. `.pf-tile-bg` is a second copy of the same file, `cover` + `blur(26px)` + `scale(1.25)`, behind it, so whatever space the stretch added is filled with that image's own colours. No sampled-colour data to maintain; the scale-up stops the blur bleeding transparent pixels in at the edges; same URL, so no extra request.
- `grid-auto-flow: dense` backfills leftover single-column tiles so there are no holes; it can reorder slightly, which is the accepted trade.

Result across the 12 sets: 51 of 63 images display at 100% of their natural size; 12 get some blur fill. The heaviest are handbags (one image at 38%), dolmen-mall (40%) and haddaya (55%) — always a short landscape sharing a row with a very tall portrait.

Clicking a tile opens `#pf-zoom`, a single-image layer with ←/→ (wrapping), a counter, and Esc.

Both shells live in `index.html` and are populated by `script.js`.

> Open/closed state lives in the `galleryOpen` / `zoomOpen` flags, **not** in `.hidden`. `.hidden` is set on a 200 ms timer so the exit animation can play, so reading it back gives stale answers — that previously made a second Escape re-close the zoom instead of the gallery and let the focus trap steal focus mid-close. Keep new logic on the flags.

### Adding a portfolio item

1. Read `portfolio/<client>/*.jpg` — that image *is* the card (copy, tagline, tag pills).
2. Optimise the source visuals into `assets/portfolio/<slug>/NN.jpg` (max width 1200, JPEG q80) and any logo to `logo.png` (max width 460, keep alpha).
3. Add the entry to `portfolio-data.js`, including an `ar` value per image (`width/height`, 2 dp).

No ImageMagick/PIL in this environment — resize via PowerShell + `System.Drawing` (see git history) or any available tool.

---

## JS Conventions

Vanilla JS only. `portfolio-data.js` must load **before** `script.js`.

| Pattern | API |
|---|---|
| Scroll animations | `AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' })` — `data-aos="fade-up"`; call `AOS.refresh()` after injecting DOM |
| Accordion | `toggle` on `<details.faq>` — only one open at a time |
| Header opacity | `scrollY > 30` → add `bg-black/70` to `<header>` |
| Count-up stats | `IntersectionObserver` + `requestAnimationFrame` on `.stat-num` (helper retained; no stats currently on the page) |

**New JS:** Vanilla only. `IntersectionObserver` for scroll logic. ~800 ms durations.

---

## Run & Test

```bash
python3 -m http.server 8231   # then open http://localhost:8231
```

Serve it — do not `file://` it; the carousel fetches sibling scripts and images.

Check: anchor nav, 390/768/1280/1920 px responsive, each filter renders and resets the carousel, autoplay advances and wraps, arrows disable at the ends, gallery opens/closes (Esc, backdrop, ×) and restores scroll and focus, zoom arrows wrap, scroll animations, one FAQ open at a time, no console errors.

> An image-load audit will always report one "broken" image: the src-less `<img>` inside `.pf-zoom-fig`, which is assigned on demand. Exclude it.

> Headless Chrome clamps its viewport to a **500 px minimum width**. A `--window-size=390` screenshot renders at 500 px and is merely cropped — it is not a real phone layout, and apparent overflow in such a shot is an artifact. Measure with `getBoundingClientRect` instead of eyeballing.
>
> `--virtual-time-budget` also fast-forwards timers without advancing CSS transitions, so `getComputedStyle` right after a click returns mid-transition values. Disable transitions when asserting on computed styles.

---

## Lint

None configured. `node --check` the two JS files. If a formatter is added: Prettier defaults. No build step.

---

## Key Reminders

- **Brand:** "Muscat AI Markets" (NOT "Macro Digital" / "Muscat Digital Solutions")
- **Content source:** the profile deck. Do not invent stats, testimonials, or client quotes — the deck contains none
- **Contact (from the deck):** Muscat, Sultanate of Oman · +968 7773 9396 · info@macrodigital.om — see `notes.txt` for pending corrections
- **CTAs:** "Start a Conversation", "View Our Work"
- **Arabic RTL:** keep layout agnostic
- **CDN:** free/public license only
- **Theme:** dark indigo + orange accent, no light sections, no off-palette colors
- **New sections:** follow existing class patterns + `data-aos`
- Outstanding work is tracked in `notes.txt`
