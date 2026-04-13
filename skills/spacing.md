# ContentSplit Spacing System

## Overview

The ContentSplit Spacing System follows Google Material Design 3 guidelines to create consistent, predictable layouts through a systematic spacing scale. This system uses CSS custom properties (`--sys-spacing-*`) to ensure visual rhythm and alignment across all components and layouts.

## Material Design 3 Spacing Principles

Material Design uses an **8dp grid system** (8 density-independent pixels) as the foundational unit for most measurements. Components align to this grid to ensure consistency and rhythm.

### Core Principles
1. **Consistent Rhythm**: Use multiples of 4dp for fine adjustments, multiples of 8dp for most spacing
2. **Predictable Density**: Maintain consistent spacing relationships across components
3. **Responsive Adaptation**: Scale spacing appropriately for different screen sizes
4. **Accessible Spacing**: Ensure sufficient space for touch targets and readability

## Spacing Tokens (`--sys-spacing-*`)

### Base Scale (8dp Multiples)
| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| Extra Small | 4px | `--sys-spacing-xs` | Tight spacing, icon padding, fine adjustments |
| Small | 8px | `--sys-spacing-s` | Icon spacing, tight component padding |
| Small Medium | 12px | `--sys-spacing-sm` | Button padding, form field spacing |
| Medium | 16px | `--sys-spacing-md` | Default padding, section spacing |
| Large | 24px | `--sys-spacing-lg` | Card padding, larger component spacing |
| Extra Large | 32px | `--sys-spacing-l` | Section margins, large containers |
| 2X Large | 40px | `--sys-spacing-xl` | Page sections, major dividers |
| 3X Large | 48px | `--sys-spacing-xxl` | Major section breaks |
| 4X Large | 64px | `--sys-spacing-2xl` | Hero sections, large banners |
| 5X Large | 80px | `--sys-spacing-3xl` | Full-page breaks |
| 6X Large | 96px | `--sys-spacing-4xl` | Extreme spacing (rare) |
| 7X Large | 128px | `--sys-spacing-5xl` | Maximum spacing (special cases) |
| 8X Large | 160px | `--sys-spacing-6xl` | Absolute maximum (edge cases) |

### Token Implementation
```css
/* Spacing tokens in design-tokens-ultimate.css */
:root {
  --sys-spacing-xs: 4px;
  --sys-spacing-s: 8px;
  --sys-spacing-sm: 12px;
  --sys-spacing-md: 16px;
  --sys-spacing-lg: 24px;
  --sys-spacing-l: 32px;
  --sys-spacing-xl: 40px;
  --sys-spacing-xxl: 48px;
  --sys-spacing-2xl: 64px;
  --sys-spacing-3xl: 80px;
  --sys-spacing-4xl: 96px;
  --sys-spacing-5xl: 128px;
  --sys-spacing-6xl: 160px;
}
```

## Usage Guidelines

### 1. Component Spacing
```css
/* Button with consistent spacing */
.button {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  margin: var(--sys-spacing-xs);
}

/* Card with systematic spacing */
.card {
  padding: var(--sys-spacing-md);
  margin-bottom: var(--sys-spacing-lg);
}

/* Form field spacing */
.form-field {
  margin-bottom: var(--sys-spacing-md);
}

.form-field label {
  margin-bottom: var(--sys-spacing-xs);
}
```

### 2. Layout Spacing
```css
/* Section layouts */
.section {
  padding: var(--sys-spacing-xl) var(--sys-spacing-lg);
}

.section-header {
  margin-bottom: var(--sys-spacing-md);
}

.section-content {
  margin-top: var(--sys-spacing-lg);
}

/* Grid spacing */
.grid {
  display: grid;
  gap: var(--sys-spacing-md);
}

.grid-tight {
  gap: var(--sys-spacing-sm);
}

.grid-loose {
  gap: var(--sys-spacing-lg);
}
```

### 3. Responsive Spacing
```css
/* Responsive spacing adjustments */
.container {
  padding: var(--sys-spacing-md);
}

@media (min-width: 768px) {
  .container {
    padding: var(--sys-spacing-lg);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--sys-spacing-xl);
  }
}
```

## Spacing Patterns

### 1. The 8-Point Grid System
```css
/* Base 8-point multiples */
.spacing-1 { margin: 4px; }   /* 0.5 × 8 */
.spacing-2 { margin: 8px; }   /* 1 × 8 */
.spacing-3 { margin: 12px; }  /* 1.5 × 8 */
.spacing-4 { margin: 16px; }  /* 2 × 8 */
.spacing-5 { margin: 24px; }  /* 3 × 8 */
.spacing-6 { margin: 32px; }  /* 4 × 8 */
.spacing-7 { margin: 40px; }  /* 5 × 8 */
.spacing-8 { margin: 48px; }  /* 6 × 8 */
```

### 2. Vertical Rhythm
```css
/* Consistent vertical spacing */
.vertical-rhythm > * + * {
  margin-top: var(--sys-spacing-md);
}

.vertical-rhythm-tight > * + * {
  margin-top: var(--sys-spacing-sm);
}

.vertical-rhythm-loose > * + * {
  margin-top: var(--sys-spacing-lg);
}
```

### 3. Inline Spacing
```css
/* Consistent horizontal spacing */
.inline-spacing > * + * {
  margin-left: var(--sys-spacing-md);
}

.inline-spacing-tight > * + * {
  margin-left: var(--sys-spacing-sm);
}

.inline-spacing-loose > * + * {
  margin-left: var(--sys-spacing-lg);
}
```

## Component Spacing Specifications

### Button Spacing
```css
.button {
  /* Internal spacing */
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  
  /* Icon spacing */
  gap: var(--sys-spacing-xs);
  
  /* External spacing */
  margin: 0 var(--sys-spacing-xs) var(--sys-spacing-xs) 0;
}

.button-group > .button + .button {
  margin-left: var(--sys-spacing-sm);
}
```

### Card Spacing
```css
.card {
  /* Internal spacing */
  padding: var(--sys-spacing-md);
  
  /* Content spacing */
  gap: var(--sys-spacing-md);
}

.card-header {
  margin-bottom: var(--sys-spacing-sm);
}

.card-footer {
  margin-top: var(--sys-spacing-md);
  padding-top: var(--sys-spacing-md);
  border-top: 1px solid var(--sys-color-neutral-90);
}
```

### Form Spacing
```css
.form-group {
  margin-bottom: var(--sys-spacing-lg);
}

.form-label {
  margin-bottom: var(--sys-spacing-xs);
}

.form-input {
  margin-bottom: var(--sys-spacing-xs);
}

.form-help {
  margin-top: var(--sys-spacing-xs);
}

.form-error {
  margin-top: var(--sys-spacing-xs);
}
```

### Navigation Spacing
```css
.nav-item {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
}

.nav-item + .nav-item {
  margin-left: var(--sys-spacing-xs);
}

.nav-dropdown {
  padding: var(--sys-spacing-sm) 0;
}

.nav-dropdown-item {
  padding: var(--sys-spacing-xs) var(--sys-spacing-md);
}
```

## Grid and Layout Spacing

### Grid System
```css
/* 12-column grid with consistent gutters */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--sys-spacing-md);
}

.grid-item {
  grid-column: span 4; /* 3 columns */
}

/* Responsive grid spacing */
@media (max-width: 768px) {
  .grid-12 {
    gap: var(--sys-spacing-sm);
  }
}
```

### Flexbox Layouts
```css
.flex-container {
  display: flex;
  gap: var(--sys-spacing-md);
}

.flex-container.tight {
  gap: var(--sys-spacing-sm);
}

.flex-container.loose {
  gap: var(--sys-spacing-lg);
}

.flex-item {
  flex: 1;
}
```

## Accessibility Considerations

### 1. Touch Target Size
```css
/* Minimum touch target size (44×44px) */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: var(--sys-spacing-sm);
}

/* Ensure sufficient spacing between touch targets */
.touch-target + .touch-target {
  margin-left: var(--sys-spacing-sm);
}
```

### 2. Focus Spacing
```css
/* Sufficient spacing for focus indicators */
.focusable {
  position: relative;
}

.focusable:focus {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}
```

### 3. Text Spacing for Readability
```css
/* Line height and paragraph spacing */
.readable-text {
  line-height: 1.6;
  margin-bottom: var(--sys-spacing-md);
}

.readable-text p + p {
  margin-top: var(--sys-spacing-md);
}

.readable-text h2 + p {
  margin-top: var(--sys-spacing-sm);
}
```

## Responsive Spacing Strategy

### Breakpoint-Based Spacing
| Breakpoint | Base Spacing | Component Spacing | Layout Spacing |
|------------|--------------|-------------------|----------------|
| Mobile (< 768px) | `--sys-spacing-sm` | `--sys-spacing-xs` | `--sys-spacing-md` |
| Tablet (768px–1024px) | `--sys-spacing-md` | `--sys-spacing-sm` | `--sys-spacing-lg` |
| Desktop (> 1024px) | `--sys-spacing-md` | `--sys-spacing-md` | `--sys-spacing-xl` |

### Implementation
```css
.component {
  padding: var(--sys-spacing-sm);
  margin: var(--sys-spacing-xs);
}

@media (min-width: 768px) {
  .component {
    padding: var(--sys-spacing-md);
    margin: var(--sys-spacing-sm);
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--sys-spacing-md);
    margin: var(--sys-spacing-md);
  }
}
```

## Spacing in AI Interfaces

### 1. Chat Interface Spacing
```css
.chat-message {
  padding: var(--sys-spacing-md);
  margin-bottom: var(--sys-spacing-sm);
  border-radius: var(--sys-radius-md);
}

.chat-message + .chat-message {
  margin-top: var(--sys-spacing-xs);
}

.chat-input {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  margin-top: var(--sys-spacing-md);
}
```

### 2. AI Response Spacing
```css
.ai-response {
  padding: var(--sys-spacing-md);
  margin: var(--sys-spacing-sm) 0;
  background-color: var(--sys-color-neutral-98);
  border-left: 4px solid var(--sys-color-primary-40);
}

.ai-thinking {
  padding: var(--sys-spacing-md);
  margin: var(--sys-spacing-sm) 0;
}
```

### 3. Content Generation Interface
```css
.content-preview {
  padding: var(--sys-spacing-lg);
  margin: var(--sys-spacing-md) 0;
  border: 1px solid var(--sys-color-neutral-90);
}

.content-controls {
  padding: var(--sys-spacing-md);
  gap: var(--sys-spacing-sm);
}
```

## Best Practices

### ✅ Do
- Use spacing tokens for all measurements (never hardcode pixels)
- Maintain consistent vertical rhythm within components
- Scale spacing appropriately for different screen sizes
- Ensure sufficient spacing for touch targets (minimum 44px)
- Use `gap` property for flexbox and grid layouts
- Test spacing with real content at different breakpoints

### ❌ Don't
- Don't mix different spacing patterns within the same component
- Don't use arbitrary values (stick to the spacing scale)
- Don't forget to test spacing with high zoom levels (200%)
- Don't neglect spacing in high-density interfaces
- Don't use margin for component internal spacing (use padding)
- Don't create "spaghetti spacing" with inconsistent measurements

## Testing and Validation

### Visual Testing
1. **Overlay Grid**: Test with an 8px grid overlay
2. **Content Reflow**: Test with varying content lengths
3. **Zoom Testing**: Test at 200% zoom for accessibility
4. **RTL Testing**: Ensure spacing works in right-to-left layouts

### Automated Testing
```javascript
// Example spacing consistency test
describe('Spacing Consistency', () => {
  test('All components use spacing tokens', () => {
    const styleSheets = document.styleSheets;
    // Check for hardcoded pixel values
  });
});
```

## File Structure

### Related Files
- `design-tokens.tokens.json` - Source spacing tokens
- `design-tokens-ultimate.css` - Generated CSS spacing variables
- `convert-tokens-ultimate.js` - Spacing token conversion script
- `component-specification.md` - Component spacing patterns
- `layout.md` - Layout spacing guidelines

### Token Management
- **Source**: Figma design tokens → `design-tokens.tokens.json`
- **Conversion**: `convert-tokens-ultimate.js` processes spacing tokens
- **Output**: `design-tokens-ultimate.css` includes `--sys-spacing-*` variables
- **Usage**: Components reference spacing tokens via CSS custom properties

---

*This spacing system ensures consistent, accessible, and maintainable layouts across ContentSplit. All team members should use spacing tokens for all measurements to maintain visual consistency and simplify responsive design.*