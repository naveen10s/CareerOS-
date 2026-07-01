# Component Map Spec - CareerOS

This spec lists and maps every reusable UI component built inside the **CareerOS** design system.

---

## 🧭 1. Navigation Components

### Navbar

- **Location**: `components/navigation/nav-elements.tsx`
- **Purpose**: floating sticky header hosting branding and global site utility buttons.
- **Props**: `logo`, `navItems`, `actions`.
- **A11y**: Hamburger trigger utilizes standard aria-expanded flags.

### Sidebar

- **Location**: `components/navigation/nav-elements.tsx`
- **Purpose**: Collapsible sidebar navigation drawer.
- **Props**: `title`, `items`, `footerProfile`.
- **A11y**: Keyboard tab index lists are bypassed when collapsed.

### Floating Dock

- **Location**: `components/navigation/floating-dock.tsx`
- **Purpose**: macOS-proximity dock icons.
- **Props**: `items`.
- **tactile**: Spring animation proximity tracking values.

---

## 📦 2. Card & Dashboard Components

### Card

- **Location**: `components/cards/card.tsx`
- **Purpose**: Layout framing panel.
- **Props**: `variant` (`solid` / `outline` / `glass` / `glow`), `withSpotlight`, `animateHover`.
- **tactile**: Cursor spotlight gradient trackers and 3D card tilt triggers.

### MetricWidget / Stat Card

- **Location**: `components/dashboard/widget.tsx`
- **Purpose**: Display numerical metrics and mini charts.
- **Props**: `title`, `value`, `change`, `trend`, `sparklineData`.

### ProgressWidget

- **Location**: `components/dashboard/widget.tsx`
- **Purpose**: Displays linear target completion charts.
- **Props**: `title`, `goalName`, `current`, `target`.

### ActivityWidget / Timeline Card

- **Location**: `components/dashboard/widget.tsx`
- **Purpose**: Chronological log listing.
- **Props**: `title`, `activities`.

---

## 🛠️ 3. Overlay & Input Components

### Dialog / Modal

- **Location**: `components/ui/overlay-primitives.tsx`
- **Purpose**: Escapable popups for core operations.
- **Props**: `isOpen`, `onClose`, `title`.
- **A11y**: escape listener closes active focus trap.

### Command Palette

- **Location**: `components/ui/command-palette.tsx`
- **Purpose**: `Ctrl+K` searchable command hub.
- **A11y**: Arrow keys cycle selections, Enter commits action.

### Tooltip

- **Location**: `components/ui/overlay-primitives.tsx`
- **Purpose**: Micro-context hover popups.
- **Props**: `content`, `delay`.

### Input / Textarea / SearchInput

- **Location**: `components/ui/inputs.tsx`
- **Purpose**: Text data collecting fields.
- **A11y**: explicit htmlFor bindings.

### Switch / Select

- **Location**: `components/ui/inputs.tsx`
- **Purpose**: Selection and state toggles.

---

## 🏷️ 4. Badge & Tag Components

### Badge / Chip

- **Location**: `components/ui/badges.tsx`
- **Purpose**: Tagging indicators and dismissable chips.
- **Props**: `variant`, `onRemove`.
