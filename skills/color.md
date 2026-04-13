# ContentSplit Color System

> This file is the single source of truth for all color decisions in ContentSplit.
> Extracted directly from `design-tokens.tokens.json`.
> Antigravity must reference this file for every color applied in the UI.

---

## 1. Key Colors (Brand Source)

These are the raw seed colors the entire palette is generated from. Never use these directly in UI — use the palette tokens or semantic roles below instead.

| Name | Hex | Role |
|------|-----|------|
| Primary Key | `#6b61e7` | Core brand identity — violet-indigo |
| Secondary Key | `#0da2e7` | Supporting — sky blue |
| Tertiary Key | `#9947eb` | Expressive accent — purple |
| Neutral Key | `#858993` | Structural grey |
| Neutral Variant Key | `#737e96` | Slightly cooler structural grey |
| Accent Key | `#f9a91f` | Highlight — amber/gold |
| Success Key | `#22c35d` | Positive state — green |
| Warning Key | `#f4e13c` | Caution — yellow |
| Error Key | `#eb4747` | Destructive / failed state — red |

---

## 2. Color Palettes (Primitives)

> Scale: 0 = darkest, 100 = lightest/white. Reference these via token name, not hex.

---

### 🟣 Primary (Violet-Indigo)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-primary-0` | `#000000` | Pure black |
| `--sys-color-primary-10` | `#09062d` | Near-black, deep navy |
| `--sys-color-primary-20` | `#120d59` | Very dark indigo |
| `--sys-color-primary-30` | `#1c1386` | Dark brand purple |
| `--sys-color-primary-40` | `#251ab2` | **Primary action color** |
| `--sys-color-primary-50` | `#2e20df` | Vibrant primary |
| `--sys-color-primary-60` | `#574ce5` | Mid-tone violet |
| `--sys-color-primary-70` | `#8279ec` | Soft violet |
| `--sys-color-primary-80` | `#aba6f2` | Light violet tint |
| `--sys-color-primary-90` | `#d5d2f9` | Very light lavender |
| `--sys-color-primary-95` | `#eae9fc` | Near-white lavender |
| `--sys-color-primary-98` | `#f7f6fe` | Surface tint |
| `--sys-color-primary-99` | `#fbfbfe` | Near-white |
| `--sys-color-primary-100` | `#ffffff` | **App background / Pure white** |

---

### 🔵 Secondary (Sky Blue)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-secondary-0` | `#000000` | Pure black |
| `--sys-color-secondary-10` | `#032230` | Deep ocean |
| `--sys-color-secondary-20` | `#064460` | Dark navy blue |
| `--sys-color-secondary-30` | `#086591` | Rich blue |
| `--sys-color-secondary-40` | `#0b87c1` | Action blue |
| `--sys-color-secondary-50` | `#0ea9f1` | Bright sky blue |
| `--sys-color-secondary-60` | `#3ebaf4` | Mid-tone blue |
| `--sys-color-secondary-70` | `#6ecbf7` | Soft blue |
| `--sys-color-secondary-80` | `#9fddf9` | Pale blue |
| `--sys-color-secondary-90` | `#cfeefcff` | Very light blue |
| `--sys-color-secondary-95` | `#e7f6fe` | Near-white blue tint |
| `--sys-color-secondary-98` | `#f5fcfe` | Surface tint |
| `--sys-color-secondary-99` | `#fafdff` | Near-white |
| `--sys-color-secondary-100` | `#ffffff` | White |

---

### 🟪 Tertiary (Purple)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-tertiary-0` | `#000000` | Pure black |
| `--sys-color-tertiary-10` | `#1a052e` | Very dark purple |
| `--sys-color-tertiary-20` | `#330a5c` | Deep purple |
| `--sys-color-tertiary-30` | `#4c0f8a` | Strong purple |
| `--sys-color-tertiary-40` | `#6614b8` | Vivid purple |
| `--sys-color-tertiary-50` | `#7f19e6` | Bright purple |
| `--sys-color-tertiary-60` | `#9947eb` | Key tertiary |
| `--sys-color-tertiary-70` | `#b275f0` | Soft purple |
| `--sys-color-tertiary-80` | `#cca3f5` | Pale purple |
| `--sys-color-tertiary-90` | `#e5d1fa` | Light lavender |
| `--sys-color-tertiary-95` | `#f2e8fc` | Near-white purple |
| `--sys-color-tertiary-98` | `#faf6fe` | Surface tint |
| `--sys-color-tertiary-99` | `#fcfafe` | Near-white |
| `--sys-color-tertiary-100` | `#ffffff` | White |

---

### ⬜ Neutral (Grey)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-neutral-0` | `#000000` | Pure black |
| `--sys-color-neutral-10` | `#1a1d23` | Near-black |
| `--sys-color-neutral-20` | `#24272e` | Dark charcoal |
| `--sys-color-neutral-30` | `#32363e` | Charcoal |
| `--sys-color-neutral-40` | `#464a53` | Mid-dark grey |
| `--sys-color-neutral-50` | `#5e636e` | Mid grey |
| `--sys-color-neutral-60` | `#858993` | Grey (key neutral) |
| `--sys-color-neutral-70` | `#93979f` | Light-mid grey |
| `--sys-color-neutral-80` | `#aeb1b7` | Light grey |
| `--sys-color-neutral-90` | `#cdd0d5` | Very light grey |
| `--sys-color-neutral-95` | `#e3e4e8` | Near-white grey |
| `--sys-color-neutral-98` | `#f1f2f4` | Off-white |
| `--sys-color-neutral-99` | `#f9fafb` | Near-white |
| `--sys-color-neutral-100` | `#ffffff` | White |

---

### 🔘 Neutral Variant (Cool Grey)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-neutral-variant-0` | `#000000` | Pure black |
| `--sys-color-neutral-variant-10` | `#0f1729` | Near-black navy |
| `--sys-color-neutral-variant-20` | `#182239` | Deep navy grey |
| `--sys-color-neutral-variant-30` | `#26314a` | Dark slate |
| `--sys-color-neutral-variant-40` | `#3a455f` | Mid slate |
| `--sys-color-neutral-variant-50` | `#545f78` | Slate grey |
| `--sys-color-neutral-variant-60` | `#737e96` | Key neutral variant |
| `--sys-color-neutral-variant-70` | `#97a0b4` | Soft blue-grey |
| `--sys-color-neutral-variant-80` | `#a9afbc` | Pale blue-grey |
| `--sys-color-neutral-variant-90` | `#c0c4ce` | Light cool grey |
| `--sys-color-neutral-variant-95` | `#dcdfe5` | Near-white cool grey |
| `--sys-color-neutral-variant-98` | `#edeff2` | Off-white cool |
| `--sys-color-neutral-variant-99` | `#f9fafb` | Near-white |
| `--sys-color-neutral-variant-100` | `#ffffff` | White |

---

### 🟡 Accent (Amber / Gold)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-accent-0` | `#000000` | Pure black |
| `--sys-color-accent-10` | `#322001` | Dark brown |
| `--sys-color-accent-20` | `#634003` | Deep amber |
| `--sys-color-accent-30` | `#956004` | Rich amber |
| `--sys-color-accent-40` | `#c78005` | Strong amber |
| `--sys-color-accent-50` | `#f8a007` | Key accent / gold |
| `--sys-color-accent-60` | `#fab338` | Warm amber |
| `--sys-color-accent-70` | `#fbc66a` | Soft amber |
| `--sys-color-accent-80` | `#fcd99c` | Pale amber |
| `--sys-color-accent-90` | `#feeccd` | Light cream |
| `--sys-color-accent-95` | `#fef5e6` | Near-white amber |
| `--sys-color-accent-98` | `#fffbf5` | Surface tint |
| `--sys-color-accent-99` | `#fffdfaff` | Near-white |
| `--sys-color-accent-100` | `#ffffff` | White |

---

### 🔴 Error (Red)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-error-0` | `#000000` | Pure black |
| `--sys-color-error-10` | `#2e0505` | Deep crimson |
| `--sys-color-error-20` | `#5c0a0a` | Dark red |
| `--sys-color-error-30` | `#8a0f0f` | Strong red |
| `--sys-color-error-40` | `#b81414` | Deep error red |
| `--sys-color-error-50` | `#e51919` | Vivid red |
| `--sys-color-error-60` | `#eb4747` | Key error |
| `--sys-color-error-70` | `#f07575` | Soft red |
| `--sys-color-error-80` | `#f5a3a3` | Pale red |
| `--sys-color-error-90` | `#fad1d1` | Light red tint |
| `--sys-color-error-95` | `#fce8e8` | Near-white red |
| `--sys-color-error-98` | `#fef6f6` | Surface tint |
| `--sys-color-error-99` | `#fefafa` | Near-white |
| `--sys-color-error-100` | `#ffffff` | White |

---

### 🟢 Success (Green)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-success-0` | `#000000` | Pure black |
| `--sys-color-success-10` | `#082b15` | Very dark green |
| `--sys-color-success-20` | `#0f5729` | Dark green |
| `--sys-color-success-30` | `#17823e` | Rich green |
| `--sys-color-success-40` | `#1eae53` | Strong green |
| `--sys-color-success-50` | `#26d968` | Vibrant green |
| `--sys-color-success-60` | `#51e186` | Bright green |
| `--sys-color-success-70` | `#7de8a4` | Soft green |
| `--sys-color-success-80` | `#a8f0c2` | Pale green |
| `--sys-color-success-90` | `#d4f7e1` | Light mint |
| `--sys-color-success-95` | `#e9fbf0` | Near-white green |
| `--sys-color-success-98` | `#f6fdf9` | Surface tint |
| `--sys-color-success-99` | `#fbfefc` | Near-white |
| `--sys-color-success-100` | `#ffffff` | White |

---

### 🟡 Warning (Yellow)

| Token | Hex | Lightness Sense |
|-------|-----|-----------------|
| `--sys-color-warning-0` | `#000000` | Pure black |
| `--sys-color-warning-10` | `#302c03` | Dark olive |
| `--sys-color-warning-20` | `#615705` | Deep olive |
| `--sys-color-warning-30` | `#918308` | Rich yellow-green |
| `--sys-color-warning-40` | `#c1ae0b` | Strong yellow |
| `--sys-color-warning-50` | `#f2dd2b` | Vivid yellow |
| `--sys-color-warning-60` | `#f4e13c` | Key warning |
| `--sys-color-warning-70` | `#f7e96e` | Soft yellow |
| `--sys-color-warning-80` | `#faf09e` | Pale yellow |
| `--sys-color-warning-90` | `#fcf8cf` | Light cream yellow |
| `--sys-color-warning-95` | `#fefbe7` | Near-white yellow |
| `--sys-color-warning-98` | `#fefef5` | Surface tint |
| `--sys-color-warning-99` | `#fffefa` | Near-white |
| `--sys-color-warning-100` | `#ffffff` | White |

---

### ⚪ Disabled State

| Token | Hex | Usage |
|-------|-----|-------|
| `--sys-color-disable` | `#e5e7eb` | All disabled UI elements |

---

## 3. Semantic Color Roles

These are the **role-mapped tokens** — what Antigravity should use when building components. Always prefer these over raw palette tokens. Role tokens correspond to CSS custom properties with the prefix `--sys-color-roles-` (e.g., `color-primary` maps to `--sys-color-roles-primary-color-role-primary-role`).

### Primary Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-primary` | `primary key color` | `#6b61e7` | Brand identity, active states |
| `color-on-primary` | `--sys-color-primary-90` | `#d5d2f9` | Text/icon on primary surfaces |
| `color-primary-container` | `--sys-color-primary-100` | `#ffffff` | Container with primary context |
| `color-on-primary-container` | `--sys-color-primary-30` | `#1c1386` | Text/icon on primary container |

### Secondary Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-secondary` | `secondary key color` | `#0da2e7` | Supporting actions, links |
| `color-on-secondary` | `--sys-color-secondary-100` | `#ffffff` | Text/icon on secondary surfaces |
| `color-secondary-container` | `--sys-color-secondary-90` | `#cfeefcff` | Soft secondary tinted surfaces |
| `color-on-secondary-container` | `--sys-color-secondary-30` | `#086591` | Text on secondary container |

### Tertiary Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-tertiary` | `tertiary key color` | `#9947eb` | Expressive highlights, badges |
| `color-on-tertiary` | `--sys-color-tertiary-100` | `#ffffff` | Text/icon on tertiary surfaces |
| `color-tertiary-container` | `--sys-color-tertiary-90` | `#e5d1fa` | Soft purple tinted surfaces |
| `color-on-tertiary-container` | `--sys-color-tertiary-30` | `#4c0f8a` | Text on tertiary container |

### Neutral Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-neutral` | `neutral key color` | `#858993` | Borders, dividers, placeholders |
| `color-on-neutral` | `--sys-color-neutral-100` | `#ffffff` | Text on neutral surfaces |
| `color-neutral-container` | `--sys-color-neutral-90` | `#cdd0d5` | Subtle surface backgrounds |
| `color-on-neutral-container` | `--sys-color-neutral-30` | `#32363e` | Text on neutral container |

### Accent Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-accent` | `accent key color` | `#f9a91f` | Highlights, badges, callouts |
| `color-on-accent` | `--sys-color-accent-100` | `#ffffff` | Text/icon on accent surfaces |
| `color-accent-container` | `--sys-color-accent-90` | `#feeccd` | Soft amber tinted containers |
| `color-on-accent-container` | `--sys-color-accent-30` | `#956004` | Text on accent container |

### Error Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-error` | `error key color` | `#eb4747` | Destructive actions, errors |
| `color-on-error` | `--sys-color-accent-100` | `#ffffff` | Text/icon on error surfaces |
| `color-error-container` | `--sys-color-error-90` | `#fad1d1` | Error message backgrounds |
| `color-on-error-container` | `--sys-color-error-30` | `#8a0f0f` | Text on error container |

### Success Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-success` | `success key color` | `#22c35d` | Confirmations, completions |
| `color-on-success` | `--sys-color-success-100` | `#ffffff` | Text/icon on success surfaces |
| `color-success-container` | `--sys-color-success-90` | `#d4f7e1` | Success message backgrounds |
| `color-on-success-container` | `--sys-color-success-30` | `#17823e` | Text on success container |

### Warning Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-warning` | `warning key color` | `#f4e13c` | Caution, alerts |
| `color-on-warning` | `--sys-color-warning-100` | `#ffffff` | Text/icon on warning surfaces |
| `color-warning-container` | `--sys-color-warning-90` | `#fcf8cf` | Warning message backgrounds |
| `color-on-warning-container` | `--sys-color-warning-30` | `#918308` | Text on warning container |

### Neutral Variant Roles
| Role Token | Resolves To | Hex | Usage |
|------------|-------------|-----|-------|
| `color-neutral-variant` | `neutral variant key color` | `#737e96` | Subtle UI text, captions |
| `color-on-neutral-variant` | `--sys-color-neutral-variant-100` | `#ffffff` | Text on neutral variant surface |
| `color-neutral-v-container` | `--sys-color-neutral-variant-90` | `#c0c4ce` | Cool grey tinted surfaces |
| `color-on-neutral-v-container` | `--sys-color-neutral-variant-30` | `#26314a` | Text on neutral-variant container |

### Disabled
| Role Token | Hex | Usage |
|------------|-----|-------|
| `color-disabled` | `#e5e7eb` | Disabled buttons, inputs, labels |

---

## 4. Usage Guidelines

> These guidelines mirror the clean, focused design language of Claude.ai and ChatGPT. Follow them to maintain a calm, trustworthy, and readable interface.

---

### 4.1 Backgrounds & Surfaces

```
App background:         --sys-color-primary-100 (#ffffff)
Page canvas:            --sys-color-primary-100
Sidebar / nav panel:    --sys-color-primary-98 or --sys-color-neutral-98
Card surface:           --sys-color-primary-99 or --sys-color-neutral-99
Elevated card:          --sys-color-neutral-98
Input background:       --sys-color-primary-98 or --sys-color-neutral-99
Modal background:       --sys-color-primary-100
Overlay backdrop:       rgba(0,0,0,0.3)
```

> **Rule:** The canvas must feel light and airy. Never use a colored background except for tinted surface containers (e.g., toast messages, banners).

---

### 4.2 Text Colors

```
Primary body text:       --sys-color-primary-10  (#09062d)
Secondary / subtext:     --sys-color-neutral-variant-60  (#737e96)
Placeholder text:        --sys-color-neutral-60  (#858993)
Caption / metadata:      --sys-color-neutral-50  (#5e636e)
Disabled text:           --sys-color-neutral-70  (#93979f)
Headings:                --sys-color-primary-10 or --sys-color-neutral-10
Link text:               color-secondary (#0da2e7)
Error text:              color-error (#eb4747)
Success text:            color-success (#22c35d)
Warning text:            --sys-color-warning-40  (#c1ae0b)
```

> **Rule:** Never use more than 3 text color variants in a single view. Stick to primary text + one secondary shade + a status color when needed.

---

### 4.3 Buttons

```
Primary button:
  background:     --sys-color-primary-40  (#251ab2)
  text:           --sys-color-primary-100 (#ffffff)
  hover:          --sys-color-primary-30  (#1c1386)
  active:         --sys-color-primary-20  (#120d59)
  focus ring:     --sys-color-primary-60 at 30% opacity

Secondary button:
  background:     transparent
  border:         1px solid --sys-color-primary-80
  text:           --sys-color-primary-40
  hover:          --sys-color-primary-98 background

Danger button:
  background:     color-error  (#eb4747)
  text:           #ffffff
  hover:          --sys-color-error-50

Accent / Highlight button:
  background:     color-accent  (#f9a91f)
  text:           --sys-color-accent-10
  hover:          --sys-color-accent-40

Disabled button:
  background:     color-disabled  (#e5e7eb)
  text:           --sys-color-neutral-60
  cursor:         not-allowed
```

---

### 4.4 Interactive States

```
Default:        Base token value
Hover:          Step one shade darker (e.g., --sys-color-primary-40 → --sys-color-primary-30)
Active/Press:   Two steps darker (e.g., --sys-color-primary-40 → --sys-color-primary-20)
Focus:          2px ring using --sys-color-primary-60 at 30–40% opacity, 2px offset
Disabled:       color-disabled bg + --sys-color-neutral-60 text, 40% opacity
Selected:       --sys-color-primary-95 background + --sys-color-primary-40 border
```

---

### 4.5 Borders & Dividers

```
Subtle divider:      --sys-color-neutral-90  (#cdd0d5)
Card border:         --sys-color-neutral-95  (#e3e4e8)
Input border:        --sys-color-neutral-90
Input focus border:  --sys-color-primary-40  (#251ab2)
Section separator:   --sys-color-neutral-95 at 1px
Error border:        color-error  (#eb4747)
```

> **Rule:** Borders should be barely-there. Use them to define space, not decorate it. Never stack multiple border styles in one component.

---

### 4.6 Status & Feedback

```
Success banner:
  background:   color-success-container  (#d4f7e1)
  text:         color-on-success-container  (#17823e)
  icon:         color-success  (#22c35d)

Error banner:
  background:   color-error-container  (#fad1d1)
  text:         color-on-error-container  (#8a0f0f)
  icon:         color-error  (#eb4747)

Warning banner:
  background:   --sys-color-warning-90  (#fcf8cf)
  text:         --sys-color-warning-30  (#918308)
  icon:         --sys-color-warning-50  (#f2dd2b)

Info banner:
  background:   color-secondary-container  (#cfeefcff)
  text:         color-on-secondary-container  (#086591)
  icon:         color-secondary  (#0da2e7)
```

---

### 4.7 Badges & Tags

```
Primary badge:      --sys-color-primary-95 bg + --sys-color-primary-40 text
Secondary badge:    --sys-color-secondary-95 bg + --sys-color-secondary-30 text
Accent badge:       --sys-color-accent-90 bg + --sys-color-accent-30 text
Success badge:      --sys-color-success-95 bg + --sys-color-success-30 text
Error badge:        --sys-color-error-95 bg + --sys-color-error-30 text
Warning badge:      --sys-color-warning-95 bg + --sys-color-warning-30 text
Neutral badge:      --sys-color-neutral-95 bg + --sys-color-neutral-40 text
```

---

### 4.8 Dark Mode Mapping (Reference Only)

> If dark mode is implemented in the future, invert the scale per role:

```
App background:     --sys-color-primary-10 or --sys-color-neutral-10
Surface:            --sys-color-primary-20 or --sys-color-neutral-20
Primary action:     --sys-color-primary-80 (on dark background)
Body text:          --sys-color-primary-95 or --sys-color-neutral-95
Subtext:            --sys-color-neutral-variant-70
Border:             --sys-color-neutral-30
```

---

## 5. Do's and Don'ts

### ✅ Do
- Use `--sys-color-primary-100` (#ffffff) as the app background at all times
- Use `--sys-color-primary-40` (#251ab2) as the **only** primary call-to-action color
- Use semantic role tokens (`color-primary`, `color-error`, etc.) in components
- Use `--sys-color-neutral-variant-60` for all secondary/caption text
- Keep status colors (success, error, warning) confined to their container roles in banners/toasts
- Use `color-accent` (#f9a91f) sparingly — highlights, streaks, premium indicators only

### ❌ Don't
- Don't apply `--sys-color-primary-50` or `--sys-color-primary-60` as button colors — always use `--sys-color-primary-40`
- Don't use the `key color` values directly in the UI — route through roles
- Don't use `color-tertiary` (#9947eb) and `color-primary` (#6b61e7) in the same component — they clash
- Don't use `color-accent` (#f9a91f) for text on white backgrounds — low contrast
- Don't combine more than 2 semantic color roles in a single card or banner
- Don't use `--sys-color-warning-60` (#f4e13c) as a text color — it fails contrast checks
- Don't add decorative color blocks or gradients unless explicitly approved