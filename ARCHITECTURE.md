# CareerOS System Architecture Documentation

This document details the system design, directory structures, design system tokens, database layer interfaces, and verification controls of the CareerOS v1.0 enterprise platform.

---

## 🏗️ 1. Architecture Overview

CareerOS utilizes a modular, domain-driven structure centered around a Next.js 15 App Router interface. It decouples core structural modules, custom reusable components, dynamic state contexts, and type-checked JSON databases:

```
c:/Users/navee/Naveen Development/
├── app/                       # Dynamic App Router routes & layout entries
│   ├── ai-workspace/          # AI Prompt library cockpit
│   ├── analytics/             # Executive analytics widgets & Recharts
│   ├── blog/                  # Blog strategies engine (list & detail views)
│   ├── contact/               # Availability forms with validations
│   ├── dashboard/             # Core KPI snapshot widgets
│   ├── experience/            # Work history collapsible timeline accordions
│   ├── journey/               # Interactive GSAP timeline grids
│   ├── learning/              # Certifications gallery, books, & roadmap
│   ├── linkedin/              # Recommendations mockup grid
│   ├── product-lab/           # PM case study documentation templates
│   ├── resume/                # ATS view mode & media print configurations
│   ├── admin/                 # Internal CMS CRUD cockpit tabs
│   └── layout.tsx             # Global HTML root layout & skip links
├── components/                # Reusable UI primitives & global layouts
│   ├── animations/            # spring variant hooks & reduced motion gates
│   ├── buttons/               # custom CVA-button components
│   ├── cards/                 # glassmorphic card containers
│   ├── layouts/               # Responsive sidebar grid layout
│   ├── navigation/            # Mobile navigation elements & docks
│   └── seo/                   # JSON-LD ProfilePage structured scripts
├── data/                      # Structured database JSON files & schemas
├── providers/                 # Global context state wrappers (theme, command bar)
├── utils/                     # Format utilities, scroll, and animations scripts
└── vercel.json                # Security Content-Security-Policy filters
```

---

## 🎨 2. Design System & Styling Tokens

CareerOS is styled using curated modern CSS design tokens implemented via Tailwind CSS:

- **Glassmorphism**: Visual panels utilize `.glass-panel` combined with `backdrop-blur-md` and low-opacity border strokes (`border-white/10` or `border-border/40`) to create a premium depth layer.
- **Aurora & Mesh Glow Backgrounds**: Global backgrounds render subtle animating aurora gradients and grids (`components/ui/background-effects.tsx`) that adapt automatically to dark and light mode settings.
- **Motion System**: spring animation presets are central:
  - Default: `stiffness: 150, damping: 15, mass: 0.1` (used in Magnetic hover controls).
  - Tilt: `stiffness: 350, damping: 25` (used in CardLift tilts).

---

## 💾 3. Data & Validation Layer (Repository Interface)

Everything in CareerOS is structured under strict data-driven files. Hardcoded personal info is strictly banned.

### Schema Validations

Each collection under `data/` defines:

1. `schema.ts`: Zod schema validating database configurations (e.g. `data/experience/schema.ts`).
2. `types.ts`: TS types generated from Zod infer models.
3. `validation.ts`: Validation wrapper returning parsed objects or throws error traces.
4. `example.json` / `[collection].json`: JSON data storage file representing the current database values.

---

## ♿ 4. Accessibility Specification (WCAG AA Compliance)

- **Skip Navigation Link**: Keyboard tab selectors can trigger skip links (`#main-content`) instantly, bypassing header navigation structures directly into main content containers.
- **Vestibular & Motion Gating**: Motion hooks reference Framer Motion's `useReducedMotion()` query; blocks offset coordinate transforms for users with animation sensitivities.
- **Contrast Checkers**: Inputs, buttons, and badges leverage high-contrast background configurations.

---

## 🔒 5. Security & Deployment

- **vercel.json Security Headers**: Enforces `Content-Security-Policy` limits, `X-Frame-Options: DENY` blocking frame-ancestors hijacking, and `X-Content-Type-Options: nosniff`.
- **Environment variables**: Blueprints are locked in [.env.example](file:///c:/Users/navee/Naveen%20Development/.env.example) separating API targets.
