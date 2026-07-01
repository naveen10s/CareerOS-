# Production Checklist - CareerOS Sign-Off

Ensure all items are checked and signed off before triggering production deploys.

---

## 💻 1. Technical Health & Compiles

- [ ] No local TypeScript compilation errors (`pnpm tsc --noEmit` returns 0 logs).
- [ ] ESLint validation checks pass.
- [ ] Next.js static build outputs successfully compiled (confirming 22/22 page segments).
- [ ] Hydration mismatches checked (no browser errors upon page refresh).

---

## 🎨 2. Design & Responsiveness Checks

- [ ] Mobile navigation toggles expand cleanly.
- [ ] Responsive grid wrap checked on 320px screen width.
- [ ] Ultra-wide monitor layout constrained correctly under maximum container width (`1440px` wrapper limits).
- [ ] Active page link states matched inside the Sidebar.

---

## ♿ 3. Accessibility Checks (WCAG AA)

- [ ] Skip-link focus verified on initial `Tab` key presses.
- [ ] Screen readers read active page breadcrumbs.
- [ ] Keyboard navigation: focus rings visible on all buttons.
- [ ] Vestibular user checks: motion constraints suppress Magnetic and Tilt hover offsets under `prefers-reduced-motion: reduce`.

---

## 🔍 4. SEO & Structured Metadata Checks

- [ ] JSON-LD `<SchemaOrg>` profile script matches current profile databases.
- [ ] Favicon icons exist in the root assets folder.
- [ ] OpenGraph card previews render correct URL structures.
- [ ] Sitemap registry lists all 12 navigation pages.
