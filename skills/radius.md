# ContentSplit Radius System

## Overview

The ContentSplit Radius System follows Google Material Design 3 guidelines to create consistent, predictable border-radius across all components. This system uses CSS custom properties (`--sys-radius-*`) to ensure visual harmony and brand consistency.

## Material Design 3 Shape Principles

Material Design uses a **shape system** to define the roundness of components. The shape scale provides consistent corner rounding that aligns with the component's size and purpose.

### Core Principles
1. **Consistent Hierarchy**: Larger components get larger radii, smaller components get smaller radii
2. **Visual Balance**: Radius values maintain visual weight and proportion
3. **Brand Personality**: Shape contributes to brand identity (rounded vs sharp)
4. **Accessible Design**: Ensure sufficient contrast between rounded corners and backgrounds

## Radius Tokens (`--sys-radius-*`)

### Standard Scale (Based on Material Design 3)
| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| Extra Small | 2px | `--sys-radius-xs` | Small badges, tags, tiny elements |
| Small | 4px | `--sys-radius-sm` | Buttons, small inputs, chips |
| Medium | 8px | `--sys-radius-md` | Cards, medium components, dialogs |
| Large | 12px | `--sys-radius-lg` | Large cards, containers, modals |
| Extra Large | 16px | `--sys-radius-xl` | Hero sections, large containers |
| Full | 9999px | `--sys-radius-full` | Pill-shaped elements, circular avatars |

### Component-Specific Radii
| Component | CSS Variable | Value | Notes |
|-----------|--------------|-------|-------|
| Button | `--sys-radius-button` | `var(--sys-radius-sm)` | Standard button radius |
| Card | `--sys-radius-card` | `var(--sys-radius-md)` | Card corner radius |
| Input | `--sys-radius-input` | `var(--sys-radius-sm)` | Form input fields |
| Modal | `--sys-radius-modal` | `var(--sys-radius-lg)` | Dialog and modal containers |
| Avatar | `--sys-radius-avatar` | `var(--sys-radius-full)` | Circular profile images |
| Badge | `--sys-radius-badge` | `var(--sys-radius-xs)` | Small status indicators |

## Token Implementation

```css
/* Radius tokens (to be added to design-tokens-ultimate.css) */
:root {
  /* Base radius scale */
  --sys-radius-xs: 2px;
  --sys-radius-sm: 4px;
  --sys-radius-md: 8px;
  --sys-radius-lg: 12px;
  --sys-radius-xl: 16px;
  --sys-radius-full: 9999px;
  
  /* Component-specific radii */
  --sys-radius-button: var(--sys-radius-sm);
  --sys-radius-card: var(--sys-radius-md);
  --sys-radius-input: var(--sys-radius-sm);
  --sys-radius-modal: var(--sys-radius-lg);
  --sys-radius-avatar: var(--sys-radius-full);
  --sys-radius-badge: var(--sys-radius-xs);
}
```

## Usage Guidelines

### 1. Component Radius Application
```css
/* Button with consistent radius */
.button {
  border-radius: var(--sys-radius-button);
  border: 1px solid var(--sys-color-neutral-90);
}

/* Card with systematic radius */
.card {
  border-radius: var(--sys-radius-card);
  overflow: hidden;
}

/* Input field radius */
.input {
  border-radius: var(--sys-radius-input);
  border: 1px solid var(--sys-color-neutral-80);
}

/* Modal container radius */
.modal {
  border-radius: var(--sys-radius-modal);
  box-shadow: var(--sys-elevation-3);
}

/* Circular avatar */
.avatar {
  border-radius: var(--sys-radius-avatar);
  width: 40px;
  height: 40px;
}

/* Small badge */
.badge {
  border-radius: var(--sys-radius-badge);
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
}
```

### 2. Progressive Rounding
```css
/* Larger components get larger radii */
.small-component {
  border-radius: var(--sys-radius-sm);
}

.medium-component {
  border-radius: var(--sys-radius-md);
}

.large-component {
  border-radius: var(--sys-radius-lg);
}

.extra-large-component {
  border-radius: var(--sys-radius-xl);
}

/* Pill-shaped elements */
.pill {
  border-radius: var(--sys-radius-full);
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
}
```

### 3. Asymmetric Radii
```css
/* Top-only radius (for tabs, headers) */
.top-radius {
  border-radius: var(--sys-radius-md) var(--sys-radius-md) 0 0;
}

/* Bottom-only radius (for footers, tooltips) */
.bottom-radius {
  border-radius: 0 0 var(--sys-radius-md) var(--sys-radius-md);
}

/* Left-only radius (for side navigation) */
.left-radius {
  border-radius: var(--sys-radius-md) 0 0 var(--sys-radius-md);
}

/* Right-only radius */
.right-radius {
  border-radius: 0 var(--sys-radius-md) var(--sys-radius-md) 0;
}
```

## Component Radius Specifications

### Button Radius
```css
.button {
  /* Standard button radius */
  border-radius: var(--sys-radius-button);
}

.button-pill {
  /* Pill-shaped button */
  border-radius: var(--sys-radius-full);
}

.button-square {
  /* Square button (no radius) */
  border-radius: 0;
}

.button-group .button:first-child {
  /* Rounded left side only in button groups */
  border-radius: var(--sys-radius-button) 0 0 var(--sys-radius-button);
}

.button-group .button:last-child {
  /* Rounded right side only */
  border-radius: 0 var(--sys-radius-button) var(--sys-radius-button) 0;
}
```

### Card Radius
```css
.card {
  /* Standard card radius */
  border-radius: var(--sys-radius-card);
}

.card-flat {
  /* Card with no radius (for edge-to-edge layouts) */
  border-radius: 0;
}

.card-rounded {
  /* More rounded card */
  border-radius: var(--sys-radius-lg);
}

.card-image {
  /* Card with rounded top only */
  border-radius: var(--sys-radius-card) var(--sys-radius-card) 0 0;
}
```

### Input Radius
```css
.input {
  /* Standard input radius */
  border-radius: var(--sys-radius-input);
}

.input-search {
  /* Search input with left radius only */
  border-radius: var(--sys-radius-input) 0 0 var(--sys-radius-input);
}

.input-group .input:first-child {
  border-radius: var(--sys-radius-input) 0 0 var(--sys-radius-input);
}

.input-group .input:last-child {
  border-radius: 0 var(--sys-radius-input) var(--sys-radius-input) 0;
}
```

### Modal & Dialog Radius
```css
.modal {
  /* Standard modal radius */
  border-radius: var(--sys-radius-modal);
}

.modal-small {
  /* Smaller modal with smaller radius */
  border-radius: var(--sys-radius-md);
}

.modal-fullscreen {
  /* Fullscreen modal (no radius) */
  border-radius: 0;
}

.modal-bottom-sheet {
  /* Bottom sheet with top-only radius */
  border-radius: var(--sys-radius-modal) var(--sys-radius-modal) 0 0;
}
```

### Avatar & Icon Radius
```css
.avatar {
  /* Circular avatar */
  border-radius: var(--sys-radius-avatar);
}

.avatar-small {
  /* Small avatar with smaller radius */
  border-radius: var(--sys-radius-sm);
}

.avatar-square {
  /* Square avatar (no radius) */
  border-radius: 0;
}

.icon-container {
  /* Icon container with consistent radius */
  border-radius: var(--sys-radius-xs);
}
```

## Radius in AI Interfaces

### 1. Chat Interface Radius
```css
.chat-message {
  border-radius: var(--sys-radius-md);
  padding: var(--sys-spacing-md);
  margin-bottom: var(--sys-spacing-sm);
}

.chat-message-user {
  /* User messages (right-aligned, different radius) */
  border-radius: var(--sys-radius-md) var(--sys-radius-xs) var(--sys-radius-xs) var(--sys-radius-md);
}

.chat-message-ai {
  /* AI messages (left-aligned, different radius) */
  border-radius: var(--sys-radius-xs) var(--sys-radius-md) var(--sys-radius-md) var(--sys-radius-xs);
}
```

### 2. Content Generation Interface
```css
.content-preview {
  border-radius: var(--sys-radius-lg);
  border: 1px solid var(--sys-color-neutral-90);
  padding: var(--sys-spacing-lg);
}

.content-block {
  border-radius: var(--sys-radius-md);
  background-color: var(--sys-color-neutral-98);
  padding: var(--sys-spacing-md);
}

.ai-thinking-indicator {
  border-radius: var(--sys-radius-full);
  width: 4px;
  height: 4px;
  animation: pulse 1s infinite;
}
```

### 3. Dashboard Components
```css
.metric-card {
  border-radius: var(--sys-radius-lg);
  background: linear-gradient(135deg, var(--sys-color-primary-95), var(--sys-color-primary-90));
  padding: var(--sys-spacing-lg);
}

.data-visualization {
  border-radius: var(--sys-radius-md);
  background-color: var(--sys-color-neutral-100);
  padding: var(--sys-spacing-md);
}

.insight-panel {
  border-radius: 0 var(--sys-radius-xl) var(--sys-radius-xl) 0;
  background-color: var(--sys-color-neutral-98);
}
```

## Best Practices

### ✅ Do
- Use radius tokens for all border-radius values
- Match radius size to component size (larger components = larger radii)
- Maintain consistency within component families
- Use `--sys-radius-full` for circular elements (avatars, pills)
- Test radius with different background colors and contrasts
- Ensure rounded corners don't clip important content

### ❌ Don't
- Don't mix different radius sizes arbitrarily within the same component
- Don't use arbitrary values (stick to the radius scale)
- Don't apply radius to elements that contain critical information near corners
- Don't forget to test radius in high-contrast mode
- Don't use extreme radii that may cause accessibility issues
- Don't neglect radius consistency across breakpoints

## Responsive Radius Strategy

### Breakpoint-Based Radius Adjustments
| Breakpoint | Base Radius | Component Radius | Notes |
|------------|-------------|------------------|-------|
| Mobile (< 768px) | `--sys-radius-sm` | Slightly smaller radii for touch targets | |
| Tablet (768px–1024px) | `--sys-radius-md` | Standard radii | |
| Desktop (> 1024px) | `--sys-radius-md` | Standard radii | |

### Implementation
```css
.component {
  border-radius: var(--sys-radius-sm);
}

@media (min-width: 768px) {
  .component {
    border-radius: var(--sys-radius-md);
  }
}
```

## Accessibility Considerations

### 1. Focus Indicators with Radius
```css
.focusable {
  position: relative;
}

.focusable:focus {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
  border-radius: var(--sys-radius-sm);
}
```

### 2. High Contrast Mode
```css
@media (prefers-contrast: high) {
  .component {
    /* Ensure rounded corners maintain visibility */
    border: 2px solid var(--sys-color-neutral-10);
    border-radius: var(--sys-radius-md);
  }
}
```

### 3. Touch Target Radius
```css
.touch-target {
  /* Ensure rounded corners don't reduce touch target area */
  min-height: 44px;
  min-width: 44px;
  border-radius: var(--sys-radius-md);
}
```

## Testing and Validation

### Visual Testing
1. **Radius Consistency**: Verify all instances of a component use the same radius
2. **Content Clipping**: Ensure rounded corners don't clip text or icons
3. **Border Alignment**: Check that borders follow the radius correctly
4. **Focus Indicators**: Test focus rings with rounded corners
5. **High Contrast**: Test in high contrast mode

### Automated Testing
```javascript
// Example radius consistency test
describe('Radius Consistency', () => {
  test('All components use radius tokens', () => {
    const styleSheets = document.styleSheets;
    // Check for hardcoded radius values
  });
});
```

## File Structure

### Related Files
- `design-tokens.tokens.json` - Source radius tokens (to be added)
- `design-tokens-ultimate.css` - Generated CSS radius variables (to be added)
- `convert-tokens-ultimate.js` - Radius token conversion script (updated)
- `component-specification.md` - Component radius patterns
- `spacing.md` - Related spacing system

### Token Management
- **Source**: Figma design tokens → `design-tokens.tokens.json` (future)
- **Conversion**: `convert-tokens-ultimate.js` processes radius tokens
- **Output**: `design-tokens-ultimate.css` includes `--sys-radius-*` variables
- **Usage**: Components reference radius tokens via CSS custom properties

---

*This radius system ensures consistent, accessible, and visually balanced components across ContentSplit. All team members should use radius tokens for all border-radius values to maintain visual consistency and simplify design updates.*

**Note**: Radius tokens are not yet implemented in the design token system. This document serves as a specification for future implementation. When radius tokens are added to Figma and exported, the conversion script will automatically generate the corresponding CSS variables.*