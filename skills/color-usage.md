# ContentSplit Color Usage Guidelines

## Overview

The ContentSplit Color Usage Guidelines provide practical guidance for applying the color system following Google Material Design 3 principles. These guidelines ensure consistent, accessible, and effective use of color across the application.

## Color Application Principles

### 1. Purpose-Driven Color
- **Functional:** Use color to communicate status, hierarchy, and interactivity
- **Emotional:** Use color to establish brand personality and mood
- **Accessible:** Ensure sufficient contrast for readability

### 2. Systematic Application
- Use color tokens consistently across all components
- Follow the color role hierarchy (primary → secondary → tertiary)
- Maintain color relationships across states and themes

### 3. Restraint and Focus
- Limit the number of colors in a single view
- Use neutral colors for backgrounds and structure
- Reserve accent colors for highlights and calls to action

## Color Token Usage

### Semantic Color Roles
```css
/* Primary Action */
.primary-action {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
}

/* Secondary Action */
.secondary-action {
  background-color: var(--sys-color-roles-secondary-color-role-secondary-role);
  color: var(--sys-color-roles-secondary-color-role-on-secondary-role);
}

/* Error State */
.error-state {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: var(--sys-color-roles-error-color-role-on-error-color-role);
}

/* Success State */
.success-state {
  background-color: var(--sys-color-roles-success-color-role-success-color-role);
  color: var(--sys-color-roles-success-color-role-on-success-color-role);
}
```

### Color Palette Usage
```css
/* Backgrounds */
.app-background {
  background-color: var(--sys-color-primary-100); /* #ffffff */
}

.surface-background {
  background-color: var(--sys-color-neutral-99); /* #f9fafb */
}

.container-background {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
}

/* Text Colors */
.primary-text {
  color: var(--sys-color-primary-10); /* #09062d */
}

.secondary-text {
  color: var(--sys-color-neutral-60); /* #858993 */
}

.disabled-text {
  color: var(--sys-color-neutral-70); /* #93979f */
}

/* Borders and Dividers */
.border-subtle {
  border-color: var(--sys-color-neutral-90); /* #cdd0d5 */
}

.border-medium {
  border-color: var(--sys-color-neutral-80); /* #aeb1b7 */
}

.border-strong {
  border-color: var(--sys-color-neutral-60); /* #858993 */
}
```

## Color Combinations

### Accessible Combinations
```css
/* Good: High contrast (4.5:1+) */
.high-contrast {
  background-color: var(--sys-color-primary-100); /* white */
  color: var(--sys-color-primary-10); /* near-black */
}

/* Good: Medium contrast (3:1+) */
.medium-contrast {
  background-color: var(--sys-color-primary-90); /* light lavender */
  color: var(--sys-color-primary-30); /* dark purple */
}

/* Avoid: Low contrast (<3:1) */
.low-contrast {
  background-color: var(--sys-color-primary-95); /* very light lavender */
  color: var(--sys-color-primary-90); /* light lavender */
}
```

### Status Color Combinations
```css
/* Success Message */
.success-message {
  background-color: var(--sys-color-success-90); /* light mint */
  color: var(--sys-color-success-30); /* rich green */
  border-left: 4px solid var(--sys-color-roles-success-color-role-success-color-role);
}

/* Warning Message */
.warning-message {
  background-color: var(--sys-color-warning-90); /* light cream */
  color: var(--sys-color-warning-30); /* yellow-green */
  border-left: 4px solid var(--sys-color-roles-warning-color-role-warning-role);
}

/* Error Message */
.error-message {
  background-color: var(--sys-color-error-90); /* light red */
  color: var(--sys-color-error-30); /* strong red */
  border-left: 4px solid var(--sys-color-roles-error-color-role-error-role);
}

/* Info Message */
.info-message {
  background-color: var(--sys-color-secondary-90); /* light blue */
  color: var(--sys-color-secondary-30); /* rich blue */
  border-left: 4px solid var(--sys-color-roles-secondary-color-role-secondary-role);
}
```

## Component Color Patterns

### Buttons
```css
/* Primary Button */
.button-primary {
  background-color: var(--sys-color-primary-40); /* #251ab2 */
  color: var(--sys-color-primary-100); /* white */
}

.button-primary:hover {
  background-color: var(--sys-color-primary-30); /* #1c1386 */
}

.button-primary:active {
  background-color: var(--sys-color-primary-20); /* #120d59 */
}

/* Secondary Button */
.button-secondary {
  background-color: transparent;
  color: var(--sys-color-primary-40); /* #251ab2 */
  border: 1px solid var(--sys-color-primary-80); /* light violet */
}

/* Danger Button */
.button-danger {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: var(--sys-color-roles-error-color-role-on-error-color-role);
}
```

### Cards
```css
/* Elevated Card */
.card-elevated {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  box-shadow: var(--sys-elevation-1);
}

/* Highlighted Card */
.card-highlighted {
  background-color: var(--sys-color-primary-98); /* surface tint */
  color: var(--sys-color-primary-10); /* near-black */
  border: 1px solid var(--sys-color-primary-90); /* light lavender */
}

/* Status Card */
.card-status-success {
  background-color: var(--sys-color-success-95); /* near-white green */
  color: var(--sys-color-success-30); /* rich green */
  border-left: 4px solid var(--sys-color-roles-success-color-role-success-color-role);
}
```

### Inputs
```css
/* Input Field */
.input-field {
  background-color: var(--sys-color-primary-100); /* white */
  color: var(--sys-color-primary-10); /* near-black */
  border: 1px solid var(--sys-color-neutral-80); /* light grey */
}

.input-field:focus {
  border-color: var(--sys-color-primary-40); /* primary action color */
  box-shadow: 0 0 0 2px var(--sys-color-primary-90); /* light tint */
}

.input-field.error {
  border-color: var(--sys-color-roles-error-color-role-error-role);
  background-color: var(--sys-color-error-98); /* very light red */
}
```

## Interactive States

### Hover States
```css
.interactive-element:hover {
  background-color: var(--sys-color-primary-95); /* very light tint */
}

.interactive-element-primary:hover {
  background-color: var(--sys-color-primary-30); /* darker shade */
}

.interactive-element-secondary:hover {
  background-color: var(--sys-color-secondary-95); /* very light blue */
}
```

### Active States
```css
.interactive-element:active {
  background-color: var(--sys-color-primary-20); /* even darker */
  transform: translateY(1px);
}

.button:active {
  box-shadow: var(--sys-elevation-0); /* remove shadow */
}
```

### Selected States
```css
.interactive-element.selected {
  background-color: var(--sys-color-primary-90); /* light tint */
  color: var(--sys-color-primary-30); /* dark text */
  border: 2px solid var(--sys-color-primary-40); /* primary color */
}

.tab.selected {
  border-bottom: 3px solid var(--sys-color-primary-40);
  color: var(--sys-color-primary-40);
}
```

### Disabled States
```css
.interactive-element:disabled {
  background-color: var(--sys-color-roles-disable-state);
  color: var(--sys-color-neutral-60);
  opacity: 0.6;
  cursor: not-allowed;
}
```

## Color in Data Visualization

### Chart Colors
```css
/* Sequential Data */
.chart-color-1 { fill: var(--sys-color-primary-40); }
.chart-color-2 { fill: var(--sys-color-primary-50); }
.chart-color-3 { fill: var(--sys-color-primary-60); }

/* Categorical Data */
.chart-category-1 { fill: var(--sys-color-primary-40); }
.chart-category-2 { fill: var(--sys-color-secondary-40); }
.chart-category-3 { fill: var(--sys-color-tertiary-40); }
.chart-category-4 { fill: var(--sys-color-accent-40); }

/* Diverging Data */
.chart-diverging-positive { fill: var(--sys-color-success-40); }
.chart-diverging-neutral { fill: var(--sys-color-neutral-60); }
.chart-diverging-negative { fill: var(--sys-color-error-40); }
```

### Status Indicators
```css
/* Status Dots */
.status-dot-success {
  background-color: var(--sys-color-roles-success-color-role-success-color-role);
  box-shadow: 0 0 0 2px var(--sys-color-success-90);
}

.status-dot-warning {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
  box-shadow: 0 0 0 2px var(--sys-color-warning-90);
}

.status-dot-error {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  box-shadow: 0 0 0 2px var(--sys-color-error-90);
}

.status-dot-neutral {
  background-color: var(--sys-color-neutral-60);
  box-shadow: 0 0 0 2px var(--sys-color-neutral-90);
}
```

## Accessibility Guidelines

### Contrast Requirements
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio
- **Focus indicators:** Minimum 3:1 contrast ratio

### Color Blindness Considerations
- Use patterns or textures in addition to color
- Ensure information isn't conveyed by color alone
- Test with color blindness simulators
- Use colorblind-friendly palettes

### Testing Contrast
```javascript
// Example contrast calculation
const contrastRatio = (l1, l2) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// WCAG 2.1 requires at least 4.5:1 for normal text
const isAccessible = contrastRatio(foregroundLuminance, backgroundLuminance) >= 4.5;
```

## Do's and Don'ts

### ✅ Do
- Use semantic color roles for consistent theming
- Test color combinations for accessibility
- Use neutral colors for backgrounds and structure
- Reserve accent colors for highlights and CTAs
- Provide sufficient contrast for all text
- Use color to reinforce hierarchy and importance
- Maintain color consistency across states

### ❌ Don't
- Use raw palette colors directly in components
- Use more than 3 accent colors in a single view
- Use color as the only means of conveying information
- Use low contrast combinations for important content
- Use fully saturated colors for large areas
- Mix warm and cool neutrals inconsistently
- Use error colors for non-error situations

## Implementation Checklist

### For Each Component
- [ ] Use appropriate semantic color roles
- [ ] Test all states (hover, active, focus, disabled)
- [ ] Verify contrast ratios meet WCAG standards
- [ ] Check color blindness compatibility
- [ ] Ensure consistency with similar components
- [ ] Document color usage in component docs

### For Each View
- [ ] Limit accent colors to 2-3 per screen
- [ ] Maintain consistent color hierarchy
- [ ] Use neutral backgrounds for readability
- [ ] Reserve primary color for main CTAs
- [ ] Use status colors appropriately
- [ ] Test in different lighting conditions

## File Structure

- `skills/color.md` - Complete color token reference
- `design-tokens-ultimate.css` - CSS custom properties
- `utils/color-contrast.js` - Contrast calculation utilities
- `test/color-accessibility.test.js` - Accessibility tests

## References

- [Material Design 3 Color System](https://m3.material.io/styles/color)
- [WCAG 2.1 Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)