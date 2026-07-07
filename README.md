# Subramanian Raj Narayanan — Portfolio

A "clinical intelligence console" — the personal portfolio of an AI/ML engineer who
trains generative clinical AI. The whole site reads like a futuristic clinical AI
system: an ECG boot sequence, live vitals counters, a Hugging Face-style **model
card** About section, terminal-window skill listings, and a 3D neural field hero.

## ✨ Highlights

- **Clinical console concept** — animated ECG trace dividers, count-up "vitals"
  readouts (26M+ clinical events, AUROC 0.856, …), bracketed console-log section
  eyebrows, and an About section framed as a model card (`~/models/…/README.md`).
- **Interactive 3D hero** — a GPU-rendered neural-network field (instanced points +
  edges, custom shaders) that reacts to the pointer and drifts.
- **Performance-first** — the three.js bundle is lazy-loaded (never blocks first
  paint), `dpr` is clamped to `[1, 2]`, and the render loop **pauses when the hero
  scrolls offscreen**. Mobile / low-power GPUs and `prefers-reduced-motion` users
  get a lightweight static fallback automatically.
- **Design system** — carbon-green base (`#040807`), ECG-mint (`#2EE8A5`) + violet
  (`#7C66FF`) + amber (`#FFBE5C`) accents; Space Grotesk display, Instrument Serif
  italic accent words, JetBrains Mono micro-labels, Inter body.
- **Polished motion** — scroll-reveal, a rotating hero role line (framer-motion),
  magnetic buttons, a cursor-aware accent ring, and a scroll-progress bar.
- **Accessible** — semantic HTML, keyboard focus styles, AA-contrast text, reduced
  motion support.

## 🛠️ Tech Stack

| Area      | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | React 18 + TypeScript + Vite                    |
| 3D        | three.js · @react-three/fiber · @react-three/drei |
| Styling   | Tailwind CSS (custom design tokens)             |
| Icons     | lucide-react                                    |
| Email     | EmailJS                                          |
| Deploy    | Vercel                                          |

## 🚀 Run locally

```bash
npm install      # install deps (includes the three.js stack)
npm run dev      # start Vite dev server → http://localhost:5173
npm run build    # type-check + production build into /dist
npm run preview  # preview the production build locally
```

## ☁️ Deploy to Vercel

The repo already includes `vercel.json`. Either:

- **Dashboard:** import the GitHub repo at [vercel.com/new](https://vercel.com/new).
  Framework preset **Vite**, build command `npm run build`, output dir `dist`.
- **CLI:**
  ```bash
  npm i -g vercel
  vercel          # preview deploy
  vercel --prod   # production deploy
  ```

## ✏️ Where to edit content

All copy lives as plain data arrays at the top of each section component — no CMS:

| What                         | File                                  |
| ---------------------------- | ------------------------------------- |
| Name, tagline, social links  | `src/components/Hero.tsx`             |
| About narrative, skill chips | `src/components/About.tsx`            |
| **Projects** (cards + detail)| `src/components/Projects.tsx` → `PROJECTS` |
| Experience / education / leadership | `src/components/Experience.tsx` (`ROLES`, `EDUCATION`, `LEADERSHIP`) |
| Skills + proficiency bars    | `src/components/Skills.tsx` → `CATEGORIES`, `MARQUEE` |
| Contact info + EmailJS keys  | `src/components/Contact.tsx` (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`) |
| Nav links                    | `src/components/Nav.tsx` → `LINKS`    |
| Colors / fonts / shadows     | `tailwind.config.js` + `src/index.css` |
| 3D hero look (density, color)| `src/three/NeuralField.tsx`           |

### Replace the résumé / images

- Drop your résumé at `public/resume.pdf` (the nav + hero buttons link to it).
- Profile / OG image: `public/profile.jpg`.

### Tune the 3D hero

In `src/three/NeuralField.tsx`:

- `nodeCount` (passed from `HeroBackground`) — number of graph nodes.
- `uSize` uniform — node glow size.
- `CYAN` / `VIOLET` — palette of the field.
- Dust count / size — ambient particle density.

To disable WebGL entirely, render `<StaticField />` directly in
`src/components/HeroBackground.tsx`.

## 📁 Structure

```
src/
├── App.tsx                 # section orchestration
├── index.css               # design system / utilities
├── components/             # Nav, Hero, About, Projects, Experience, Skills, Contact, Footer …
├── hooks/                  # reduced-motion, device capability, active-section
└── three/                  # NeuralField (R3F scene) + HeroCanvas (lazy Canvas)
```

## 📞 Contact

- **Email:** rvanush3@gmail.com
- **LinkedIn:** [in/subraraj](https://www.linkedin.com/in/subraraj)
- **GitHub:** [subra4112](https://github.com/subra4112)

---

Designed & built with React, React Three Fiber, and Tailwind.
