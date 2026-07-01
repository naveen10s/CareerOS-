# NaveenOS Design System Documentation

Welcome to the **NaveenOS Design System** documentation. This document acts as the single source of truth for design tokens, reusable components, motion configurations, and accessibility specs of the NaveenOS SaaS platform.

---

## 🎨 1. Design Tokens

### Color Palette

The NaveenOS color space leverages `oklch` curves to maintain visual parity and contrast requirements in dark/light transitions.

- **Background**: Root container colors (`oklch(0.99 ...)` for light, `oklch(0.09 ...)` for dark).
- **Surfaces**: Layer boxes (`--surface` and `--surface-elevated`) designed to frame typography content.
- **Primary / Accents**: Vibrant Violet (`oklch(0.52 0.21 268)`) serving as key highlights.
- **Alert States**: Success (Emerald Green), Warning (Amber Orange), Danger (Crimson Red), and Info (Cyan Blue) mapped to status grids.

### Typographic Scale

Configured with custom line heights to enforce maximum legibility across all viewport breakpoints.

- **Hero XXL** (`text-hero-xxl`): `4rem / 64px` - Ultra bold headings.
- **Display XL** (`text-display-xl`): `3rem / 48px` - Hero subtitles.
- **Heading XL/L/M/S**: Hierarchical titles ranging from `36px` down to `20px`.
- **Body / Body Small**: Primary reading font stacks (`16px` and `14px`).
- **Caption / Label**: Metadata indicators (`12px` and `11px`).
- **Mono**: Standard tabular metrics and code blocks (`14px` monospace).

### Borders & Radius

- **`radius-lg`**: `0.75rem` - Primary card outline corners.
- **`radius-md`**: `calc(var(--radius) - 2px)` - Inner elements/buttons.
- **`radius-sm`**: `calc(var(--radius) - 4px)` - Checkbox tags and chips.

### Motion Easing & Transitions

- **`ease-premium`**: `cubic-bezier(0.16, 1, 0.3, 1)` - Ultra smooth deceleration curves.
- **`ease-bounce`**: `cubic-bezier(0.34, 1.56, 0.64, 1)` - Snap reactions for buttons.
- **`duration-fast / normal / slow`**: `150ms / 300ms / 600ms` bounds for interface states.

---

## 🧱 2. Reusable Component Library

### Tactile Buttons

- **Why**: Buttons provide primary feedback actions, utilizing tap scaling (`whileTap: { scale: 0.98 }`) to represent tactile push buttons.
- **Usage**:
  ```tsx
  import Button from "@/components/buttons/button";

  <Button variant="glass" size="md" rightIcon={<ArrowRight />}>
    Review Analytics
  </Button>;
  ```

### Interactive Spotlight Cards

- **Why**: Spotlights focus visual attention onto specific grid cells by casting hover radial gradients.
- **Usage**:
  ```tsx
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";

  <Card variant="glow" withSpotlight animateHover>
    <CardHeader>
      <CardTitle>Core Velocity</CardTitle>
    </CardHeader>
    <CardContent>Metric telemetry content...</CardContent>
  </Card>;
  ```

### Collapse Navigation Sidebar & Floating Dock

- **Why**: Simplifies app exploration. The **Floating Dock** utilizes mouse coordinates to dynamically scale icons based on proximity, creating a premium Apple-inspired interactive navigation bar.
- **Usage**:
  ```tsx
  import { FloatingDock } from "@/components/navigation/floating-dock";

  <FloatingDock items={dockLinks} />;
  ```

---

## ♿ 3. Accessibility & WCAG AA Guidelines

- **Contrast Integrity**: All color definitions satisfy WCAG AA ratio benchmarks (4.5:1 for body copy).
- **Keyboard Focus Navigation**: Focus borders (`focus-visible:ring-1 focus-visible:ring-ring`) provide visual cues for tabs, dropdowns, and button components.
- **Escape Portal Portability**: Dialog modals and Command Palettes automatically close on `Escape` key inputs, and restore document scroll status.
- **ARIA labels**: Custom input tags and icon trigger hooks support `aria-invalid` and `aria-label` attributes out-of-the-box.
