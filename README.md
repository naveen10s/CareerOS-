# CareerOS

CareerOS is a premium, high-fidelity SaaS dashboard application built for Business Analysts transitioning to Product Management. Rather than displaying standard resume text, CareerOS presents career progression as structured database records, analytics funnels, strategic telemetry specs, and interactive timelines.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router, Static Site Generation)
- **Runtime**: React 19 & TypeScript (Strict Types)
- **Styling**: Tailwind CSS & Vanilla CSS (Curated Dark/Light Themes)
- **Interactions**: Framer Motion & GSAP
- **Data Layers**: Strict JSON Databases (Zod Schema Validation)
- **Analytics Charts**: Recharts & D3.js

---

## 🚀 Key Modules

1. **AI Workspace**: Auto-prompting spec builders, STAR interview refiners, and pipeline workflows.
2. **Learning Hub**: Accreditations verification cards, books list, and target learning roadmaps.
3. **LinkedIn Center**: SaaS-styled profile bio, skills endorsements count, and testimonial mock grids.
4. **Blog Engine**: Client-side articles searches, categorised tabs, tags, and code syntax highlighting.
5. **Resume Center**: Interactive view, plain-text copy formats, and `@media print` custom print stylesheets.
6. **Command Bar**: Global Ctrl+K command palette querying details across 5 distinct databases.

---

## 💻 Local Setup

Ensure you have Node.js 18+ and `pnpm` installed.

```bash
# Install package dependencies
pnpm install

# Setup local configurations env keys
cp .env.example .env.local

# Trigger local hot-reloaded development server
pnpm run dev

# Run strict local typechecks
pnpm tsc --noEmit

# Compile production-optimized static release builds
pnpm run build
```

---

## 📄 License

MIT © CareerOS Development Core
