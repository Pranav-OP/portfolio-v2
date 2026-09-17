# Pranav Jagtap — Portfolio v2

A modern, professional, and subtly futuristic personal portfolio built with **React + Vite**, styled with **Tailwind CSS v4**, and animated with **Framer Motion**. All content is driven by **JSON data files** — no hunting through JSX to update your résumé.

Design language: deep, calm surfaces with a single teal accent, a mouse-follow spotlight, a faint animated grid, and restrained scroll-in animations. Layout is inspired by [brittanychiang.com](https://brittanychiang.com/) — a fixed left intro column beside a scrolling content pane on desktop, collapsing to a clean single column with a slide-in menu on mobile.

## ✨ Features

- **Data-driven** — every section reads from a JSON file in `src/data/`. Update content without touching components.
- **The Lab** — a monthly log of what you're into (videos, case studies, essays, podcasts). Add one JSON entry per month to track your growth over time. _(This is the headline feature — see [Updating "The Lab"](#-updating-the-lab-monthly).)_
- **Light / dark mode** — toggle with persisted preference, respects the OS setting on first visit, and paints the correct theme before first render (no flash).
- **Fully responsive** — fixed sidebar layout on desktop, single-column with a full-screen menu on mobile.
- **Minimal, interactive animations** — scroll-reveal, staggered lists, active-section nav highlighting, hover lifts, mouse spotlight. All respect `prefers-reduced-motion`.
- **Accessible** — semantic landmarks, skip link, focus-visible rings, ARIA labels, keyboard-friendly.
- **SEO / social ready** — title, description, Open Graph, and Twitter card meta tags.
- **"Go back in time" portal** — a rotating spaceship badge (fixed bottom-right on desktop; revealed at the foot of the page on mobile) opens a full-screen animated "Portal to Tomorrow" that links to previous versions of the site. Driven by `previousSites` in `profile.json`.
- **Live experience easter egg** — the "Years of experience" stat card carries a subtle breathing glow; hover it (desktop) or tap it (mobile) and the value morphs into a live count-up — years, months, days, hours, minutes, seconds — since `experienceStart` in `profile.json`. The 1-second timer runs only while active, so it's idle otherwise. On mobile you tap anywhere outside to close; if it's left open ~30s a playful nudge fades in, and closing pops a quick thumbs-up "thanks" — so the timer never lingers.

## 🛠 Tech Stack

| Concern      | Choice                                             |
| ------------ | -------------------------------------------------- |
| Framework    | React 19                                           |
| Build tool   | Vite 6                                             |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`)              |
| Animation    | Framer Motion                                      |
| Icons        | `react-icons`                                      |
| Fonts        | Inter (variable) + JetBrains Mono, self-hosted via `@fontsource` |

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type/lint check
npm run lint

# production build -> dist/
npm run build

# preview the production build locally
npm run preview
```

Requires Node 18+ (developed on Node 24).

## 📁 File Structure

```
portfolio_react_2/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI: lint + build on PRs, deploy to Netlify on push to main
├── public/                     # served as-is at the site root
│   ├── favicon.svg             # PJ monogram
│   ├── Pranav_Jagtap_Resume.pdf   # one-page résumé (Download Résumé button)
│   ├── Pranav_Jagtap_CV.pdf       # detailed CV (View Detailed CV button)
│   └── assets/                 # images (profile photo, project thumbnails)
│
├── src/
│   ├── main.jsx                # React entry; wraps <App> in <ThemeProvider>
│   ├── App.jsx                 # page shell: layout + section composition
│   ├── index.css               # Tailwind import, theme tokens, base styles, keyframes
│   │
│   ├── data/                   # ⭐ ALL CONTENT LIVES HERE — edit these to update the site
│   │   ├── profile.json        # name, role, intro, stats, résumé/CV paths, previous sites
│   │   ├── socials.json        # social links + handles
│   │   ├── navigation.json     # section order + nav labels
│   │   ├── greetings.json      # rotating multilingual greetings in the header
│   │   ├── experience.json     # work history
│   │   ├── projects.json       # project cards
│   │   ├── skills.json         # skills grouped by category
│   │   └── lab.json            # ⭐ monthly "what I'm into" log
│   │
│   ├── context/
│   │   └── ThemeContext.jsx    # light/dark state, persistence, <html> class toggle
│   │
│   ├── hooks/
│   │   └── useActiveSection.js # IntersectionObserver -> active nav highlight
│   │
│   ├── lib/
│   │   ├── motion.js           # shared Framer Motion variants
│   │   └── icons.jsx           # social + Lab-type icon registry
│   │
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.jsx     # desktop fixed intro column + nav + socials
│       │   └── MobileNav.jsx   # mobile top bar + slide-in menu
│       ├── ui/
│       │   ├── Background.jsx      # grid + glows + mouse spotlight
│       │   ├── Reveal.jsx          # scroll-reveal wrapper
│       │   ├── SectionHeading.jsx  # numbered section titles
│       │   ├── ThemeToggle.jsx     # animated sun/moon button
│       │   ├── Greeting.jsx        # rotating multilingual greeting
│       │   ├── ExperienceStat.jsx  # ⭐ hover/tap live experience count-up (easter egg)
│       │   └── TimeMachine.jsx     # ⭐ rocket badge + "Portal to Tomorrow" overlay
│       └── sections/
│           ├── About.jsx
│           ├── Experience.jsx
│           ├── Skills.jsx
│           ├── Lab.jsx          # ⭐ renders the monthly timeline
│           ├── Projects.jsx
│           └── Contact.jsx
│
├── index.html                  # HTML shell + meta tags + anti-flash theme script
├── vite.config.js              # React + Tailwind plugins
├── eslint.config.js
├── netlify.toml                # Netlify build + SPA redirect
├── vercel.json                 # Vercel build + SPA rewrite
└── package.json
```

## ✏️ Updating Content

All content is in `src/data/*.json`. No component edits needed for routine updates.

- **Intro, stats, résumé/CV** → `profile.json`
- **Jobs** → `experience.json` (newest first). Add an optional `links: [{ label, url }]` array to a role to show one or more live-product links under its summary.
- **Projects** → `projects.json` (set `"image": ""` to fall back to an icon tile; put images in `public/assets/`)
- **Skills** → `skills.json` (grouped by `category`)
- **Social links** → `socials.json`
- **Header greetings** → `greetings.json` (rotates through the list)
- **Previous site versions** (the "go back in time" portal) → `previousSites` in `profile.json`. Each entry: `{ label, host, url, year, thumbnail }`; add thumbnails to `public/assets/`.
- **Live experience counter** → set `experienceStart` (an ISO date, e.g. `"2023-02-01T00:00:00"`) in `profile.json`; the stat with `"live": true` in `highlights` powers the hover/tap count-up.

To swap the résumé/CV, replace the PDFs in `public/` (keep the filenames, or update the paths in `profile.json`).

### ⭐ Updating "The Lab" (monthly)

This is the feature meant to grow with your career. Once a month, open `src/data/lab.json` and add a new object at the **top** of the array:

```json
{
  "month": "2026-08",
  "title": "August 2026",
  "note": "One line on the theme of the month (optional).",
  "entries": [
    {
      "title": "Title of the thing",
      "type": "paper",
      "url": "https://…",
      "description": "Why it caught your attention / what you took from it."
    }
  ]
}
```

Supported `type` values (each renders its own coloured badge + icon):

`youtube` · `ieee` · `paper` · `blog` · `course` · `tool` · `podcast`

Anything else falls back to a generic "Link" badge. To add a new type, extend `labTypes` in `src/lib/icons.jsx`.

## 🎨 Theming

Colours are semantic CSS variables defined in `src/index.css` under `:root` (light) and `.dark` (dark), then mapped onto Tailwind utilities via `@theme inline`. To rebrand, change the `--accent` values (and friends) in those two blocks — every component picks it up automatically. Fonts are set on `--font-sans` / `--font-mono` in the same file.

## 🚀 Continuous Deployment

The site is hosted on **Netlify** and deployed via GitHub Actions (`.github/workflows/deploy.yml`):

- **On a pull request to `main`** → runs `npm ci` → `npm run lint` → `npm run build`. A failure shows a red check on the PR, acting as a merge gate. It does **not** deploy.
- **On a push / merged PR to `main`** → runs the same checks, then deploys the freshly built `dist/` to the production Netlify site.

`dist/` is git-ignored and rebuilt fresh on every run, so nothing stale is ever published.

### First-time setup

1. **Create a Netlify auth token** — Netlify → avatar → **User settings → Applications → Personal access tokens → New access token**. Copy it.
2. **Find the Site ID** — Netlify → your site → **Site configuration → General → Site details → Site ID**.
3. **Add both as GitHub repository secrets** — repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - `NETLIFY_AUTH_TOKEN` = the token from step 1
   - `NETLIFY_SITE_ID` = the ID from step 2
4. **Disable Netlify's built-in auto-build** (so Actions is the single deployer and you don't get double deploys) — Netlify → your site → **Site configuration → Build & deploy → Continuous deployment → Stop builds**.

> If you'd rather let Netlify's native Git integration handle deploys, skip steps 3–4 and treat the workflow as a lint/build check only (remove the "Deploy to Netlify" step).

CI uses **Node 20 (LTS)**; the app builds on Node 18+.

---

Built by Pranav Jagtap.
