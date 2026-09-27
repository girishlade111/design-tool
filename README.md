# Design Tool

A live, interactive **generative ASCII-art design tool** built with Next.js. It renders animated canvas patterns composed of ASCII characters, with a control panel to tweak every aspect of the artwork in real time — frequencies, pattern modes, density, character sets, colors, and scale.

Originally prototyped with [v0.app](https://v0.app) and then developed further.

## What it does

- Renders a full-screen animated canvas of generative ASCII-art patterns (driven by time, wave frequencies, and character density maps).
- Side control panel ("Design Controls") with sliders and inputs to tune the artwork live:
  - **Frequencies** — Frequency A / Frequency B wave parameters
  - **Centers** — speed of the pattern's two moving centers
  - **Pattern** — render mode selection and pattern alternation toggle
  - **Appearance** — density, character set (e.g. ` ..._-:=+abcXW@#ÑÑÑ`), dark/light mode, background color, scale
- 60 FPS animation loop; click the canvas to interact with the artwork.
- Theme switching (dark / light) via `next-themes`.

## Features

- Real-time generative ASCII-art canvas with configurable wave math (`utils/math.ts`)
- Fully client-side rendering — no backend, no API routes, no database
- Responsive controls built on Radix UI primitives (sliders, switches, accordions, labels, inputs, buttons)
- Tailwind CSS styling with light/dark themes
- Click interaction on the canvas (cursor hints interactivity)

## Tech stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS, PostCSS, `tailwindcss-animate`
- **UI components:** Radix UI primitives, shadcn-style `components/ui/*`
- **State/icons:** React hooks, `lucide-react`
- **Theming:** `next-themes`

## Quick start

```bash
npm install        # or: pnpm install
npm run dev        # open http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx        Root layout, theme provider
  page.tsx          Main page: canvas animation loop + parameter state
  globals.css       Global styles
components/
  design-panel.tsx  "Design Controls" sidebar (sliders, switches, accordians)
  theme-provider.tsx
  ui/               Reusable UI primitives (button, input, label, slider, switch, accordion)
lib/
  utils.ts          Classname/style helpers
utils/
  math.ts           Vector math and pattern generation helpers
public/             Static assets
```

## Environment variables

None required. The app is fully client-side.

## Deployment

- **Static export ready:** the app has no API routes or server actions, so it can be built as a static site. Set `output: "export"` in `next.config.mjs` and run `npm run build` to produce an `out/` directory.
- **GitHub Pages:** this repo ships with a `gh-pages` branch hosting the static export at `https://girishlade111.github.io/design-tool/`.
- **Vercel:** also deployable as a standard Next.js app (`next build` + `next start`).

---

Built by Girish Lade — [ladestack.in](https://ladestack.in)
