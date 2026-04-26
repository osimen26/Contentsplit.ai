# ContentSplit Design System

## Brand Colors

| Color | Token | Hex | Usage |
|-------|-------|-----|-------|
| **Primary** | `--sys-color-primary-40` | `#4338ca` | All buttons, CTAs, main actions |
| Primary Dark | `--sys-color-primary-30` | darker | Button hover state |
| **Secondary** | `--sys-color-secondary-40` | `#0b87c1` | Secondary actions, accents |

## Text Colors

| Usage | Token | Hex |
|-------|-------|-----|
| Headlines | `var(--sys-color-neutral-10)` | `#1a1d23` |
| Body text | `var(--sys-color-neutral-40)` | `#464a53` |
| Labels/subtle | `var(--sys-color-neutral-60)` | `#858993` |
| Placeholders | `var(--sys-color-neutral-50)` | `#5e63ee` |

**Neutral Scale:** 10 (darkest) → 100 (white)

## Typography System

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 48-56px | 700 | Hero headlines |
| Headline | 32-40px | 700 | Section titles |
| Title | 24px | 600 | Card titles |
| Body Large | 18px | 400 | Paragraphs |
| Body | 16px | 400 | Default text |
| Label | 14px | 500 | Labels, captions |
| Small | 12px | 400 | Helper text |

## Components

### Buttons
```css
/* Primary Button */
background: var(--sys-color-primary-40);
color: white;
padding: 12px 24px;
border-radius: 8px;

/* Hover */
background: var(--sys-color-primary-30);
```

### Cards
```css
background: var(--sys-color-neutral-100);
border: 1px solid var(--sys-color-tertiary);
border-radius: 12px;
padding: 20px;
```

### Inputs
```css
border: 2px solid var(--sys-color-tertiary);
border-radius: 8px;
padding: 12px 16px;

:focus {
  border-color: var(--sys-color-primary-40);
}
```

## Mobile Breakpoints

| Breakpoint | Width |
|-----------|-------|
| Mobile | 320px - 768px |
| Tablet | 769px - 1023px |
| Desktop | 1024px+ |