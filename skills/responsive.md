# ContentSplit Responsive Design System

## Overview

The ContentSplit Responsive Design System follows Google Material Design 3 guidelines for creating interfaces that adapt to different screen sizes, orientations, and device capabilities. This system provides a systematic approach to responsive design using CSS Grid, Flexbox, and modern layout techniques.

## Responsive Design Principles (Material Design 3)

### Core Principles
1. **Mobile-First** - Design for smallest screens first, then enhance for larger screens
2. **Fluid Grids** - Use relative units (%, fr, vw) instead of fixed pixels
3. **Flexible Images** - Images that scale appropriately within their containers
4. **Breakpoint-Based** - Adapt layout at specific screen width thresholds
5. **Content Priority** - Ensure most important content remains accessible on all screens

### Breakpoint Strategy
- **Extra small:** 0-599px (phones)
- **Small:** 600-899px (tablets portrait, large phones)
- **Medium:** 900-1199px (tablets landscape, small desktops)
- **Large:** 1200-1799px (desktops)
- **Extra large:** 1800px+ (large desktops, TVs)

## Responsive Layout Patterns

### 1. Fluid Container (`responsive-container`)
Container that scales with viewport width.

```css
.responsive-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 var(--sys-spacing-lg);
}

@media (min-width: 600px) {
  .responsive-container {
    padding: 0 var(--sys-spacing-xl);
  }
}

@media (min-width: 900px) {
  .responsive-container {
    padding: 0 var(--sys-spacing-2xl);
  }
}

@media (min-width: 1200px) {
  .responsive-container {
    max-width: 1200px;
    padding: 0;
  }
}
```

### 2. Responsive Grid (`responsive-grid`)
Grid that adjusts columns based on screen size.

```css
.responsive-grid {
  display: grid;
  gap: var(--sys-spacing-lg);
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .responsive-grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .responsive-grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .responsive-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .responsive-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .responsive-grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .responsive-grid-6 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1800px) {
  .responsive-grid-6 {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### 3. Responsive Flex (`responsive-flex`)
Flex container that adjusts direction and wrapping.

```css
.responsive-flex {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-lg);
}

@media (min-width: 600px) {
  .responsive-flex-row {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .responsive-flex-row > * {
    flex: 1 1 300px;
  }
}

@media (min-width: 900px) {
  .responsive-flex-row > * {
    flex: 1 1 250px;
  }
  
  .responsive-flex-nowrap {
    flex-wrap: nowrap;
  }
}
```

### 4. Responsive Sidebar (`responsive-sidebar`)
Sidebar that collapses or moves on smaller screens.

```css
.responsive-sidebar {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--sys-spacing-2xl);
  min-height: 100vh;
}

.responsive-sidebar-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

@media (max-width: 899px) {
  .responsive-sidebar {
    grid-template-columns: 1fr;
  }
  
  .responsive-sidebar-nav {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .responsive-sidebar-nav.open {
    left: 0;
  }
  
  .responsive-sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .responsive-sidebar-overlay.open {
    opacity: 1;
    visibility: visible;
  }
}
```

### 5. Responsive Table (`responsive-table`)
Table that adapts for small screens.

```css
.responsive-table {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 599px) {
  .responsive-table-mobile {
    display: block;
  }
  
  .responsive-table-mobile thead {
    display: none;
  }
  
  .responsive-table-mobile tbody,
  .responsive-table-mobile tr,
  .responsive-table-mobile td {
    display: block;
    width: 100%;
  }
  
  .responsive-table-mobile tr {
    margin-bottom: var(--sys-spacing-lg);
    border: 1px solid var(--sys-color-neutral-90);
    border-radius: var(--sys-radius-md);
    padding: var(--sys-spacing-md);
  }
  
  .responsive-table-mobile td {
    padding: var(--sys-spacing-xs) 0;
    border: none;
  }
  
  .responsive-table-mobile td::before {
    content: attr(data-label);
    display: block;
    font-family: var(--sys-typography-label-small-font-family);
    font-size: var(--sys-typography-label-small-font-size);
    color: var(--sys-color-neutral-40);
    margin-bottom: var(--sys-spacing-xs);
  }
}
```

## Responsive Typography

### Fluid Typography
```css
.responsive-headline {
  font-size: clamp(1.5rem, 5vw, 3rem);
  line-height: 1.2;
}

.responsive-title {
  font-size: clamp(1.25rem, 4vw, 2rem);
  line-height: 1.3;
}

.responsive-body {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}

.responsive-small {
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.5;
}
```

### Breakpoint-Based Typography
```css
.typography-responsive {
  font-family: var(--sys-typography-body-text-font-family);
  line-height: var(--sys-typography-body-text-line-height);
  font-size: var(--sys-typography-body-text-font-size);
}

@media (min-width: 600px) {
  .typography-responsive {
    font-size: calc(var(--sys-typography-body-text-font-size) * 1.05);
  }
}

@media (min-width: 900px) {
  .typography-responsive {
    font-size: calc(var(--sys-typography-body-text-font-size) * 1.1);
  }
}

@media (min-width: 1200px) {
  .typography-responsive {
    font-size: calc(var(--sys-typography-body-text-font-size) * 1.15);
  }
}
```

## Responsive Spacing

### Fluid Spacing
```css
.responsive-padding {
  padding: clamp(var(--sys-spacing-md), 4vw, var(--sys-spacing-2xl));
}

.responsive-margin {
  margin: clamp(var(--sys-spacing-sm), 3vw, var(--sys-spacing-xl));
}

.responsive-gap {
  gap: clamp(var(--sys-spacing-md), 3vw, var(--sys-spacing-lg));
}
```

### Breakpoint-Based Spacing
```css
.spacing-responsive {
  padding: var(--sys-spacing-md);
}

@media (min-width: 600px) {
  .spacing-responsive {
    padding: var(--sys-spacing-lg);
  }
}

@media (min-width: 900px) {
  .spacing-responsive {
    padding: var(--sys-spacing-xl);
  }
}

@media (min-width: 1200px) {
  .spacing-responsive {
    padding: var(--sys-spacing-2xl);
  }
}
```

## Responsive Images

### Fluid Images
```css
.responsive-image {
  max-width: 100%;
  height: auto;
}

.responsive-image-cover {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.responsive-image-contain {
  width: 100%;
  height: auto;
  object-fit: contain;
}
```

### Art Direction (picture element)
```html
<picture>
  <source media="(min-width: 1200px)" srcset="large.jpg">
  <source media="(min-width: 600px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description" class="responsive-image">
</picture>
```

### Responsive Background Images
```css
.responsive-bg {
  background-image: url('small.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 600px) {
  .responsive-bg {
    background-image: url('medium.jpg');
  }
}

@media (min-width: 1200px) {
  .responsive-bg {
    background-image: url('large.jpg');
  }
}
```

## Responsive Navigation Patterns

### 1. Hamburger Menu for Mobile
```css
.responsive-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.responsive-nav-links {
  display: none;
}

@media (min-width: 900px) {
  .responsive-nav-links {
    display: flex;
    gap: var(--sys-spacing-lg);
  }
  
  .responsive-nav-toggle {
    display: none;
  }
}

.responsive-nav-mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  padding: var(--sys-spacing-2xl);
}

.responsive-nav-mobile.open {
  transform: translateX(0);
}
```

### 2. Responsive Tabs
```css
.responsive-tabs {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-md);
}

@media (min-width: 600px) {
  .responsive-tabs {
    flex-direction: row;
    border-bottom: 1px solid var(--sys-color-neutral-90);
  }
  
  .responsive-tab {
    padding: var(--sys-spacing-md) var(--sys-spacing-lg);
    border: none;
    background: none;
    border-bottom: 2px solid transparent;
  }
  
  .responsive-tab.active {
    border-bottom: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
  }
}
```

### 3. Responsive Breadcrumbs
```css
.responsive-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sys-spacing-xs);
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
}

@media (max-width: 599px) {
  .responsive-breadcrumbs-truncated {
    display: none;
  }
  
  .responsive-breadcrumbs-mobile {
    display: flex;
    align-items: center;
    gap: var(--sys-spacing-xs);
  }
}
```

## Responsive Component Behavior

### 1. Responsive Cards
```css
.responsive-card {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-lg);
}

@media (min-width: 600px) {
  .responsive-card-horizontal {
    flex-direction: row;
    align-items: center;
  }
  
  .responsive-card-horizontal-image {
    width: 200px;
    height: 150px;
    flex-shrink: 0;
  }
}

@media (min-width: 900px) {
  .responsive-card-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--sys-spacing-xl);
  }
}
```

### 2. Responsive Forms
```css
.responsive-form {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-lg);
}

.responsive-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

@media (min-width: 600px) {
  .responsive-form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sys-spacing-lg);
  }
  
  .responsive-form-field-full {
    grid-column: 1 / -1;
  }
}
```

### 3. Responsive Modals/Dialogs
```css
.responsive-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: var(--sys-radius-lg);
  padding: var(--sys-spacing-xl);
  z-index: 1000;
  overflow-y: auto;
}

@media (min-width: 600px) {
  .responsive-modal {
    width: 80%;
    max-width: 600px;
  }
}

@media (min-width: 900px) {
  .responsive-modal {
    width: 70%;
    max-width: 800px;
  }
}

@media (max-width: 599px) {
  .responsive-modal-fullscreen {
    width: 100%;
    height: 100vh;
    max-width: none;
    max-height: none;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
  }
}
```

## Responsive Utility Classes

### Display Utilities
```css
.hide-xs {
  @media (max-width: 599px) {
    display: none !important;
  }
}

.hide-sm {
  @media (min-width: 600px) and (max-width: 899px) {
    display: none !important;
  }
}

.hide-md {
  @media (min-width: 900px) and (max-width: 1199px) {
    display: none !important;
  }
}

.hide-lg {
  @media (min-width: 1200px) {
    display: none !important;
  }
}

.show-xs {
  @media (max-width: 599px) {
    display: block !important;
  }
}

.show-sm {
  @media (min-width: 600px) and (max-width: 899px) {
    display: block !important;
  }
}

.show-md {
  @media (min-width: 900px) and (max-width: 1199px) {
    display: block !important;
  }
}

.show-lg {
  @media (min-width: 1200px) {
    display: block !important;
  }
}
```

### Order Utilities
```css
.order-first-xs {
  @media (max-width: 599px) {
    order: -1 !important;
  }
}

.order-last-xs {
  @media (max-width: 599px) {
    order: 999 !important;
  }
}

.order-first-sm {
  @media (min-width: 600px) and (max-width: 899px) {
    order: -1 !important;
  }
}

.order-last-sm {
  @media (min-width: 600px) and (max-width: 899px) {
    order: 999 !important;
  }
}
```

### Text Alignment Utilities
```css
.text-center-xs {
  @media (max-width: 599px) {
    text-align: center !important;
  }
}

.text-left-xs {
  @media (max-width: 599px) {
    text-align: left !important;
  }
}

.text-right-xs {
  @media (max-width: 599px) {
    text-align: right !important;
  }
}

.text-center-sm {
  @media (min-width: 600px) and (max-width: 899px) {
    text-align: center !important;
  }
}
```

## Testing Responsive Designs

### 1. Breakpoint Testing
- Test at exact breakpoint boundaries (599px, 600px, 899px, 900px, etc.)
- Test common device widths (320px, 375px, 414px, 768px, 1024px, 1366px, 1920px)
- Test with browser zoom (100%, 125%, 150%, 200%)

### 2. Orientation Testing
- Test portrait and landscape orientations on mobile devices
- Test orientation changes during interaction
- Verify content reflows correctly

### 3. Content Testing
- Test with short and long content
- Test with images of different aspect ratios
- Test with dynamic content (loading states, error states)
- Test with different font sizes (user preference)

### 4. Interaction Testing
- Test touch interactions on mobile devices
- Test hover states on desktop
- Test keyboard navigation across breakpoints
- Test focus states and visible focus indicators

### 5. Performance Testing
- Measure layout shift (CLS) across breakpoints
- Test loading performance on mobile networks
- Verify images load appropriate sizes for viewport
- Test JavaScript execution on low-powered devices

## Implementation Guidelines

### 1. Mobile-First Approach
- Start with styles for smallest screens
- Use `min-width` media queries for enhancements
- Avoid `max-width` media queries for base styles
- Test on actual mobile devices during development

### 2. Performance Considerations
- Use `srcset` and `sizes` for responsive images
- Implement lazy loading for below-the-fold content
- Minimize CSS and JavaScript for mobile
- Use CSS containment for complex layouts

### 3. Accessibility in Responsive Design
- Maintain logical reading order across breakpoints
- Ensure touch targets are large enough on mobile
- Test with screen readers at different viewport sizes
- Support browser zoom and text size preferences

### 4. Maintenance Strategy
- Document breakpoint decisions and reasoning
- Use consistent naming conventions for responsive utilities
- Create responsive design system tokens
- Regularly test on new devices and screen sizes

## File Structure

- `styles/responsive/` - Responsive CSS utilities and components
- `components/responsive/` - Responsive React/Vue components
- `design-tokens-ultimate.css` - Breakpoint and spacing tokens
- `skills/layout.md` - Layout system documentation
- `skills/mobile.md` - Mobile-specific patterns