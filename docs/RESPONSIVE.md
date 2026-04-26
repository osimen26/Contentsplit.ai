# ContentSplit.ai Responsive Design System

## Device Breakpoints

| Breakpoint | Width | Devices | Status |
|----------|-------|--------|--------|--------|
| **xs** | 320-379px | iPhone SE, iPhone 12 mini | ✓ Covered |
| **sm** | 380-428px | iPhone 13/14/15, Plus | ✓ Covered |
| **md** | 429-599px | Large phones | ✓ Covered |
| **lg** | 600-767px | Small tablets | ✓ Covered |
| **xl** | 768-1023px | iPad Mini/Pro portrait | ✓ Covered |
| **2xl** | 1024-1199px | iPad Pro landscape | ✓ Covered |
| **3xl** | 1200-1399px | Laptop | ✓ Covered |
| **4xl** | 1400px+ | Desktop | ✓ Covered |

## Layout System

### CLAUDE Layout (Dashboard)
```css
/* Large Desktop */
@media (min-width: 1400px) { .claude-sidebar { width: 280px; } }

/* Desktop */
@media (min-width: 1200px) and (max-width: 1399px) { .claude-sidebar { width: 260px; } }

/* Laptop */
@media (min-width: 1024px) and (max-width: 1199px) { .claude-sidebar { width: 240px; } }

/* Tablet */
@media (max-width: 768px) {
  .mobile-header { display: flex !important; }
  .mobile-tab-bar { display: flex !important; }
  .desktop-sidebar { display: none !important; }
}
```

### Fixed Layout (Components)
```css
/* Large Desktop */
@media (min-width: 1400px) { .layout-fixed { max-width: 1400px; } }

/* Desktop */
@media (min-width: 1200px) and (max-width: 1399px) { .layout-fixed { max-width: 1200px; } }

/* Laptop */
@media (min-width: 1024px) and (max-width: 1199px) { .layout-fixed { max-width: 1024px; } }

/* Tablet landscape */
@media (min-width: 900px) and (max-width: 1023px) { .layout-fixed { max-width: 900px; } }

/* Tablet portrait */
@media (min-width: 768px) and (max-width: 899px) { .layout-fixed { max-width: 768px; } }
```

## Platform Selector Grid

| Breakpoint | Columns | Card Padding | Font Size |
|-----------|--------|------------|----------|
| 320-380px | 2 | 6px | 9px |
| 381-600px | 2 | 10px | 11px |
| 601-768px | 3 | 12px | 14px |
| 769px+ | auto-fill | 16px | 16px |

## Mobile Tab Bar

- **Breakpoint**: 768px and below
- **Height**: 60px (+ safe-area-inset-bottom)
- **Icons**: Home, Create, History, Settings
- **Min touch target**: 44x44px
- **Icons**: 22px
- **Labels**: 10px

## iOS Safe Areas

```css
/* Header (notch) */
padding-top: env(safe-area-inset-top);

/* Bottom tab bar (home indicator) */
padding-bottom: env(safe-area-inset-bottom);
height: calc(52px + env(safe-area-inset-bottom));
```

## Implementation Checklist

- [x] Bottom tab bar for mobile
- [x] Safe area insets (notch + home indicator)
- [x] 44px minimum touch targets
- [x] Platform grid: 2 cols mobile, 3 cols tablet, auto desktop
- [x] Sidebar collapses by device size
- [x] Layout max-width scales by device
- [x] Typography scales appropriately

## CSS Custom Properties

```css
:root {
  /* Spacing scale */
  --sys-spacing-xs: 4px;
  --sys-spacing-sm: 8px;
  --sys-spacing-md: 12px;
  --sys-spacing-lg: 16px;
  --sys-spacing-xl: 24px;
  --sys-spacing-2xl: 32px;
}
```

## Testing Devices

### iPhone
- [ ] iPhone SE - 320px
- [ ] iPhone 13/14/15 - 390px
- [ ] iPhone Plus/Max - 428px
- [ ] iPhone Fold (unfolded) - 720px

### Android
- [ ] Pixel 7 - 412px
- [ ] Samsung S24 - 360px
- [ ] Samsung Fold - 840px

### iPad
- [ ] iPad Mini - 768px
- [ ] iPad Pro 11" - 834px
- [ ] iPad Pro 12.9" - 1024px

### Desktop
- [ ] Laptop - 1280px
- [ ] Desktop - 1440px
- [ ] Large - 1920px