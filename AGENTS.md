# AGENTS.md — Muscat Digital Solutions

## Project Identity

**Muscat Digital Solutions** — premium AI-driven digital marketing agency based in Oman, serving the GCC. Offerings: Digital Marketing, Performance Marketing (Meta & Google Ads), Branding & Graphic Design, Website Development, AI Automation & Chatbots, E-commerce Transformation, Content Creation & Video Production. Target: SMEs, real estate, restaurants/retail, e-commerce, corporate/luxury brands, startups.

---

## Tech Stack

Flat-file, zero-build. Three source files, CDN deps. No Node.js, bundler, or `package.json`.

| File | Purpose |
|---|---|
| `index.html` | Single-page HTML, all sections, anchor nav |
| `styles.css` | Custom components over Tailwind utilities |
| `script.js` | Vanilla JS: AOS, counters, accordion, header |

### CDN deps (in `<head>`, all free/public license)

| Library | License | Usage |
|---|---|---|
| Tailwind CSS | MIT | Layout, spacing, colors |
| Google Fonts (Inter + Space Grotesk) | OFL | Body + display typography |
| AOS | MIT | Scroll fade/zoom animations |
| Font Awesome 6 | Free (SIL OFL / MIT) | Icons |

> Download locally if a CDN lacks a free license.

---

## Design System

### Colors

| Var | Hex | Role |
|---|---|---|
| `--bg` | `#050505` | Page bg |
| `--surface` | `#0e0e10` | Card/section bg |
| `--violet` | `#8b5cf6` | Primary accent (violet-500) |
| `--violet-soft` | `#a78bfa` | Secondary accent (violet-400) |
| `--border` | `rgba(255,255,255,0.08)` | Subtle borders |

Dark theme only. Gradient direction: violet → indigo → blue. No light sections.

### Typography

- Headings: `Space Grotesk`, `letter-spacing: -0.02em`, responsive `clamp()`
- Body: `Inter`, `#fff` or `rgba(255,255,255,0.7)` for secondary
- Inline accent: `<em class="not-italic text-violet-400">`

### Gradient text

```css
.stat-num {
  background: linear-gradient(to right, var(--violet-soft), var(--violet));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```

---

## CSS Conventions

Flat descriptive class names on top of Tailwind. Hover adds `translateY(-4px)` / `translateY(-6px)` + violet border. Responsive at `@media (max-width: 768px)`.

| Class | Purpose |
|---|---|
| `.display` / `.display-sm` | Hero/section headings, `clamp()` |
| `.eyebrow` | Uppercase violet label above headings |
| `.badge` | Violet border + bg pill |
| `.btn` / `.btn-primary` / `.btn-ghost` | Primary (gradient bg, dark text) / ghost (outlined) |
| `.bubble` / `.bubble-dark` / `.bubble-light` | Hero mockup chat bubbles |
| `.marquee` / `.marquee-track` | Infinite `@keyframes scroll` logos |
| `.chip` / `.chip-active` | Portfolio filter pills |
| `.case-card` / `.case-thumb` / `.tag` | Case study cards, gradient thumb + skill tag |
| `.path-card` / `.path-card-featured` / `.path-icon` / `.path-link` | Service pathway cards |
| `.stat` / `.stat-num` / `.stat-label` | Stats: gradient number + label |
| `.service-card` / `.service-num` | Numbered service cards |
| `.step` / `.step-num` | Process step cards |
| `.faq` | `<details>` accordion items |
| `.cta` | Gradient CTA wrapper |
| `.chat-fab` | Fixed violet-to-indigo FAB |

---

## JS Conventions

Vanilla JS only. `script.js` loaded with `defer`.

| Pattern | API |
|---|---|
| Scroll animations | `AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' })` — use `data-aos="fade-up"` |
| Count-up stats | `IntersectionObserver` + `requestAnimationFrame` (easeOutCubic, 1400ms, `.stat-num`, fires once) |
| Accordion | `toggle` on `<details.faq>` — only one open at a time |
| Header opacity | `scrollY > 30` → add `bg-black/70` to `<header>` |

**New JS:** Vanilla only. `IntersectionObserver` for scroll logic. ~800ms durations. Attach after `DOMContentLoaded`.

---

## Section Map

| Page | `#id` | Status |
|---|---|---|
| Home / Hero | (no id) | Exists, needs rebranding |
| Portfolio / Case Studies | `#work` | Exists, needs real content |
| Services | `#services` | Exists, needs req-doc categories |
| About Us | Stats block | Exists as stats, needs full section |
| Process | `#process` | Exists |
| Industries Served | — | **New** |
| AI Solutions | — | **New** |
| Contact | — | **New** (form + WhatsApp + location) |
| FAQ | `#faq` | Exists, needs agency questions |

---

## Run & Test

```bash
xdg-open index.html   # or open index.html
```

Check: anchor nav, 320/768/1280/1920px responsive, scroll animations, stat counters fire once, one FAQ open at a time, header bg on scroll, no console errors.

---

## Lint

None configured. If added: Prettier defaults. No build-step tools.

---

## Key Reminders

- **Brand:** "Muscat Digital Solutions" (NOT "Legit Design Studio" / "LDS.")
- **CTAs:** "Get Free Consultation", "Request Proposal", "Book Meeting"
- **WhatsApp:** contact section + floating chat button
- **Arabic RTL:** keep layout agnostic
- **SEO:** `<title>`, `<meta name="description">`, OG tags for GCC market
- **CDN:** free/public license only; download if restricted
- **Theme:** dark + violet/neon, no light sections, no off-palette colors
- **New sections:** follow existing class patterns + `data-aos`
