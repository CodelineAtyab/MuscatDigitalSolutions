# AGENTS.md — Muscat AI Markets

## Project Identity

**Muscat AI Markets** — a Muscat-based digital transformation, AI and creative technology company serving Oman and the GCC. Site content is derived from the company profile deck at `organization_profile/macro_digital_profile.pdf` (22 slides, image-only — no text layer).

Ten service domains: Digital Marketing & Growth · Branding, Creative & Content · Website & E-Commerce · Software Development · AI & Automation · Data & Annotation · Cloud & IT Infrastructure · Managed IT & Transformation · 3D/Virtual/Interactive · Digital Asset Management.

> The profile deck is branded "Macro Digital" throughout. **The site brand is "Muscat AI Markets".** Take copy from the deck, not the deck's name.

---

## Tech Stack

Flat-file, zero-build. CDN deps. No Node.js, bundler, or `package.json`.

| File | Purpose |
|---|---|
| `index.html` | Single-page HTML, all sections, anchor nav |
| `styles.css` | Custom components over Tailwind utilities |
| `portfolio-data.js` | Portfolio content — edit case studies here, not in HTML |
| `script.js` | Vanilla JS: portfolio carousel, AOS, accordion, header, mobile nav |
| `assets/portfolio/<slug>/` | Web-optimised images (`01.jpg`…`NN.jpg`, `logo.png`) |

### Source material (not shipped)

| Dir | Contents |
|---|---|
| `organization_profile/` | Company profile PDF — all site copy comes from here |
| `portfolio/<client>/` | Original case-study exports: a full-card `.jpg`/`.pdf` plus an `images/` dir of source visuals |

The per-client **`.jpg` is the rendered portfolio card** and is the source of truth for its copy, tagline, and tag pills. Several `.pdf` siblings are 0 bytes — use the `.jpg`.

### CDN deps (in `<head>`, all free/public license)

| Library | License | Usage |
|---|---|---|
| Tailwind CSS | MIT | Layout, spacing, colors |
| Google Fonts (Inter + Space Grotesk) | OFL | Body + display typography |
| AOS | MIT | Scroll fade/zoom animations |
| Font Awesome 6 | Free (SIL OFL / MIT) | Icons |

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

- Headings: `Space Grotesk`, `letter-spacing: -0.02em`, responsive `clamp()`
- Body: `Inter`
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
| `.pill-card` | Single-line capability pills |
| `.team-card` | Icon + role row |
| `.faq` | `<details>` accordion items |
| `.cta` / `.chat-fab` | Gradient CTA, WhatsApp FAB |

---

## Portfolio Carousel

Rendered from `window.PORTFOLIO` in `portfolio-data.js` — **add or edit case studies there**, not in `index.html`. `index.html` only supplies the empty shell (`#portfolio-filters`, `#portfolio-carousel`).

Each entry: `slug`, `brand`, `sub`, `desc`, `tags[]` (pills shown on the card, matching the source PDF), `cats[]` (drives filtering), `images` (count — files must be `assets/portfolio/<slug>/01.jpg`…), optional `logo` + `logoInvert`.

Two nested motions:
- **Outer** — slides between cards. 2 per view on desktop, 1 on phones (set by `.pf-slide`'s CSS width; JS *measures* it rather than duplicating the breakpoint). Autoplays every 5.5 s, wraps, with arrows, dots, and pointer-drag swipe.
- **Inner** — each card crossfades through its own images every 3.4 s, staggered per card.

Both pause on hover/focus and when the tab is hidden; both are disabled under `prefers-reduced-motion`.

Filters are generated from `window.PORTFOLIO_FILTERS`. A card may belong to several categories. Keep every filter non-empty.

### Adding a portfolio item

1. Read `portfolio/<client>/*.jpg` — that image *is* the card (copy, tagline, tag pills).
2. Optimise the source visuals into `assets/portfolio/<slug>/NN.jpg` (max width 1200, JPEG q80) and any logo to `logo.png` (max width 460, keep alpha).
3. Add the entry to `portfolio-data.js`.

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

Check: anchor nav, 390/768/1280/1920 px responsive, each filter renders and resets the carousel, autoplay advances and wraps, arrows disable at the ends, scroll animations, one FAQ open at a time, no console errors.

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
