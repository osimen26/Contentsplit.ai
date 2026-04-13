# ContentSplit Layout System

## Overview

The ContentSplit Layout System follows Google Material Design 3 guidelines for creating consistent, responsive layouts. The system uses an 8dp grid for alignment and spacing, with flexible breakpoints and layout patterns that adapt across devices.

## Layout Principles (Material Design 3)

### Core Principles
1. **8dp Grid System** - All measurements align to multiples of 8dp
2. **Consistent Spacing** - Use standardized spacing tokens
3. **Responsive Breakpoints** - Adapt layout at specific screen widths
4. **Visual Hierarchy** - Guide user attention through layout structure
5. **Flexible Containers** - Components adapt to available space

### Grid Units
- **1dp** = 1 density-independent pixel
- **8dp** = Base grid unit (spacing between elements)
- **4dp** = Half grid unit (fine adjustments)
- **16dp, 24dp, 32dp** = Common spacing increments

## Layout Anatomy

### Core Components
1. **Container** - Outer wrapper with max-width and padding
2. **Grid** - Column-based layout system
3. **Spacer** - Flexible space between elements
4. **Divider** - Visual separation between sections
5. **Breakpoint** - Screen width thresholds for layout changes

## Layout Types

### 1. Fixed Width Layout (`layout-fixed`)
Container with fixed maximum width, centered on screen.

**Usage:** Content-heavy pages, forms, articles
**Max Width:** 1200px (desktop), 100% (mobile)
**Padding:** 24px (desktop), 16px (mobile)

```css
.layout-fixed {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--sys-spacing-xl);
}

@media (max-width: 600px) {
  .layout-fixed {
    padding: 0 var(--sys-spacing-lg);
  }
}
```

### 2. Fluid Layout (`layout-fluid`)
Container that expands to fill available space.

**Usage:** Dashboards, data visualizations, admin panels
**Max Width:** 100%
**Padding:** Responsive based on screen size

```css
.layout-fluid {
  width: 100%;
  padding: 0 var(--sys-spacing-2xl);
}

@media (max-width: 900px) {
  .layout-fluid {
    padding: 0 var(--sys-spacing-xl);
  }
}

@media (max-width: 600px) {
  .layout-fluid {
    padding: 0 var(--sys-spacing-lg);
  }
}
```

### 3. Split Layout (`layout-split`)
Two-column layout with adjustable ratio.

**Usage:** Settings pages, detail views, side-by-side comparisons
**Ratios:** 50/50, 70/30, 30/70
**Breakpoint:** Stack on mobile

```css
.layout-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sys-spacing-2xl);
}

.layout-split-70-30 {
  grid-template-columns: 70% 30%;
}

.layout-split-30-70 {
  grid-template-columns: 30% 70%;
}

@media (max-width: 900px) {
  .layout-split,
  .layout-split-70-30,
  .layout-split-30-70 {
    grid-template-columns: 1fr;
    gap: var(--sys-spacing-xl);
  }
}
```

### 4. Card Grid Layout (`layout-card-grid`)
Grid of cards with consistent spacing.

**Usage:** Product listings, content feeds, dashboard widgets
**Columns:** 1-4 based on screen width
**Gap:** 24px between cards

```css
.layout-card-grid {
  display: grid;
  gap: var(--sys-spacing-xl);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.layout-card-grid-compact {
  gap: var(--sys-spacing-lg);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.layout-card-grid-dense {
  gap: var(--sys-spacing-md);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

### 5. List Layout (`layout-list`)
Vertical list of items with consistent spacing.

**Usage:** Navigation menus, settings lists, data rows
**Item Spacing:** 8px, 16px, or 24px
**Padding:** 16px container padding

```css
.layout-list {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-md);
}

.layout-list-tight {
  gap: var(--sys-spacing-xs);
}

.layout-list-loose {
  gap: var(--sys-spacing-lg);
}

.layout-list-item {
  padding: var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
}
```

## Grid System

### 12-Column Grid (`grid-12`)
Traditional 12-column grid for complex layouts.

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--sys-spacing-lg);
}

.grid-col-1 { grid-column: span 1; }
.grid-col-2 { grid-column: span 2; }
.grid-col-3 { grid-column: span 3; }
.grid-col-4 { grid-column: span 4; }
.grid-col-5 { grid-column: span 5; }
.grid-col-6 { grid-column: span 6; }
.grid-col-7 { grid-column: span 7; }
.grid-col-8 { grid-column: span 8; }
.grid-col-9 { grid-column: span 9; }
.grid-col-10 { grid-column: span 10; }
.grid-col-11 { grid-column: span 11; }
.grid-col-12 { grid-column: span 12; }

@media (max-width: 900px) {
  .grid-col-1,
  .grid-col-2,
  .grid-col-3,
  .grid-col-4,
  .grid-col-5,
  .grid-col-6,
  .grid-col-7,
  .grid-col-8,
  .grid-col-9,
  .grid-col-10,
  .grid-col-11,
  .grid-col-12 {
    grid-column: span 12;
  }
}
```

### Flexible Grid (`grid-flex`)
Grid that automatically adjusts columns based on available space.

```css
.grid-flex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--sys-spacing-lg);
}

.grid-flex-small {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--sys-spacing-md);
}

.grid-flex-large {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--sys-spacing-xl);
}
```

### Masonry Grid (`grid-masonry`)
Grid with items of varying heights, packed efficiently.

```css
.grid-masonry {
  column-count: 3;
  column-gap: var(--sys-spacing-lg);
}

.grid-masonry-item {
  break-inside: avoid;
  margin-bottom: var(--sys-spacing-lg);
}

@media (max-width: 900px) {
  .grid-masonry {
    column-count: 2;
  }
}

@media (max-width: 600px) {
  .grid-masonry {
    column-count: 1;
  }
}
```

## Spacing System

### Margin Utilities
```css
.m-0 { margin: 0; }
.m-xs { margin: var(--sys-spacing-xs); }
.m-sm { margin: var(--sys-spacing-sm); }
.m-md { margin: var(--sys-spacing-md); }
.m-lg { margin: var(--sys-spacing-lg); }
.m-xl { margin: var(--sys-spacing-xl); }
.m-2xl { margin: var(--sys-spacing-2xl); }
.m-3xl { margin: var(--sys-spacing-3xl); }

.mt-0 { margin-top: 0; }
.mt-xs { margin-top: var(--sys-spacing-xs); }
.mt-sm { margin-top: var(--sys-spacing-sm); }
.mt-md { margin-top: var(--sys-spacing-md); }
.mt-lg { margin-top: var(--sys-spacing-lg); }
.mt-xl { margin-top: var(--sys-spacing-xl); }
.mt-2xl { margin-top: var(--sys-spacing-2xl); }
.mt-3xl { margin-top: var(--sys-spacing-3xl); }

.mb-0 { margin-bottom: 0; }
.mb-xs { margin-bottom: var(--sys-spacing-xs); }
.mb-sm { margin-bottom: var(--sys-spacing-sm); }
.mb-md { margin-bottom: var(--sys-spacing-md); }
.mb-lg { margin-bottom: var(--sys-spacing-lg); }
.mb-xl { margin-bottom: var(--sys-spacing-xl); }
.mb-2xl { margin-bottom: var(--sys-spacing-2xl); }
.mb-3xl { margin-bottom: var(--sys-spacing-3xl); }

.ml-0 { margin-left: 0; }
.ml-xs { margin-left: var(--sys-spacing-xs); }
.ml-sm { margin-left: var(--sys-spacing-sm); }
.ml-md { margin-left: var(--sys-spacing-md); }
.ml-lg { margin-left: var(--sys-spacing-lg); }
.ml-xl { margin-left: var(--sys-spacing-xl); }
.ml-2xl { margin-left: var(--sys-spacing-2xl); }
.ml-3xl { margin-left: var(--sys-spacing-3xl); }

.mr-0 { margin-right: 0; }
.mr-xs { margin-right: var(--sys-spacing-xs); }
.mr-sm { margin-right: var(--sys-spacing-sm); }
.mr-md { margin-right: var(--sys-spacing-md); }
.mr-lg { margin-right: var(--sys-spacing-lg); }
.mr-xl { margin-right: var(--sys-spacing-xl); }
.mr-2xl { margin-right: var(--sys-spacing-2xl); }
.mr-3xl { margin-right: var(--sys-spacing-3xl); }
```

### Padding Utilities
```css
.p-0 { padding: 0; }
.p-xs { padding: var(--sys-spacing-xs); }
.p-sm { padding: var(--sys-spacing-sm); }
.p-md { padding: var(--sys-spacing-md); }
.p-lg { padding: var(--sys-spacing-lg); }
.p-xl { padding: var(--sys-spacing-xl); }
.p-2xl { padding: var(--sys-spacing-2xl); }
.p-3xl { padding: var(--sys-spacing-3xl); }

.pt-0 { padding-top: 0; }
.pt-xs { padding-top: var(--sys-spacing-xs); }
.pt-sm { padding-top: var(--sys-spacing-sm); }
.pt-md { padding-top: var(--sys-spacing-md); }
.pt-lg { padding-top: var(--sys-spacing-lg); }
.pt-xl { padding-top: var(--sys-spacing-xl); }
.pt-2xl { padding-top: var(--sys-spacing-2xl); }
.pt-3xl { padding-top: var(--sys-spacing-3xl); }

.pb-0 { padding-bottom: 0; }
.pb-xs { padding-bottom: var(--sys-spacing-xs); }
.pb-sm { padding-bottom: var(--sys-spacing-sm); }
.pb-md { padding-bottom: var(--sys-spacing-md); }
.pb-lg { padding-bottom: var(--sys-spacing-lg); }
.pb-xl { padding-bottom: var(--sys-spacing-xl); }
.pb-2xl { padding-bottom: var(--sys-spacing-2xl); }
.pb-3xl { padding-bottom: var(--sys-spacing-3xl); }

.pl-0 { padding-left: 0; }
.pl-xs { padding-left: var(--sys-spacing-xs); }
.pl-sm { padding-left: var(--sys-spacing-sm); }
.pl-md { padding-left: var(--sys-spacing-md); }
.pl-lg { padding-left: var(--sys-spacing-lg); }
.pl-xl { padding-left: var(--sys-spacing-xl); }
.pl-2xl { padding-left: var(--sys-spacing-2xl); }
.pl-3xl { padding-left: var(--sys-spacing-3xl); }

.pr-0 { padding-right: 0; }
.pr-xs { padding-right: var(--sys-spacing-xs); }
.pr-sm { padding-right: var(--sys-spacing-sm); }
.pr-md { padding-right: var(--sys-spacing-md); }
.pr-lg { padding-right: var(--sys-spacing-lg); }
.pr-xl { padding-right: var(--sys-spacing-xl); }
.pr-2xl { padding-right: var(--sys-spacing-2xl); }
.pr-3xl { padding-right: var(--sys-spacing-3xl); }
```

### Gap Utilities
```css
.gap-0 { gap: 0; }
.gap-xs { gap: var(--sys-spacing-xs); }
.gap-sm { gap: var(--sys-spacing-sm); }
.gap-md { gap: var(--sys-spacing-md); }
.gap-lg { gap: var(--sys-spacing-lg); }
.gap-xl { gap: var(--sys-spacing-xl); }
.gap-2xl { gap: var(--sys-spacing-2xl); }
.gap-3xl { gap: var(--sys-spacing-3xl); }

.row-gap-0 { row-gap: 0; }
.row-gap-xs { row-gap: var(--sys-spacing-xs); }
.row-gap-sm { row-gap: var(--sys-spacing-sm); }
.row-gap-md { row-gap: var(--sys-spacing-md); }
.row-gap-lg { row-gap: var(--sys-spacing-lg); }
.row-gap-xl { row-gap: var(--sys-spacing-xl); }
.row-gap-2xl { row-gap: var(--sys-spacing-2xl); }
.row-gap-3xl { row-gap: var(--sys-spacing-3xl); }

.column-gap-0 { column-gap: 0; }
.column-gap-xs { column-gap: var(--sys-spacing-xs); }
.column-gap-sm { column-gap: var(--sys-spacing-sm); }
.column-gap-md { column-gap: var(--sys-spacing-md); }
.column-gap-lg { column-gap: var(--sys-spacing-lg); }
.column-gap-xl { column-gap: var(--sys-spacing-xl); }
.column-gap-2xl { column-gap: var(--sys-spacing-2xl); }
.column-gap-3xl { column-gap: var(--sys-spacing-3xl); }
```

## Breakpoint System

### Standard Breakpoints
```css
/* Extra small devices (phones, less than 600px) */
@media (max-width: 599px) {
  /* Mobile-specific styles */
}

/* Small devices (portrait tablets, 600px and up) */
@media (min-width: 600px) {
  /* Tablet portrait styles */
}

/* Medium devices (landscape tablets, 900px and up) */
@media (min-width: 900px) {
  /* Tablet landscape styles */
}

/* Large devices (desktops, 1200px and up) */
@media (min-width: 1200px) {
  /* Desktop styles */
}

/* Extra large devices (large desktops, 1800px and up) */
@media (min-width: 1800px) {
  /* Large desktop styles */
}
```

### Breakpoint Mixins (CSS Custom Properties)
```css
:root {
  --breakpoint-xs: 0px;
  --breakpoint-sm: 600px;
  --breakpoint-md: 900px;
  --breakpoint-lg: 1200px;
  --breakpoint-xl: 1800px;
}

@media (min-width: var(--breakpoint-sm)) {
  /* Small breakpoint styles */
}

@media (min-width: var(--breakpoint-md)) {
  /* Medium breakpoint styles */
}

@media (min-width: var(--breakpoint-lg)) {
  /* Large breakpoint styles */
}

@media (min-width: var(--breakpoint-xl)) {
  /* Extra large breakpoint styles */
}
```

### Responsive Utility Classes
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
  @media (min-width: 1200px) and (max-width: 1799px) {
    display: none !important;
  }
}

.hide-xl {
  @media (min-width: 1800px) {
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
  @media (min-width: 1200px) and (max-width: 1799px) {
    display: block !important;
  }
}

.show-xl {
  @media (min-width: 1800px) {
    display: block !important;
  }
}
```

## Layout Patterns

### Header + Main + Footer
```css
.layout-app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.layout-header {
  grid-row: 1;
  padding: var(--sys-spacing-lg) var(--sys-spacing-xl);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.layout-main {
  grid-row: 2;
  padding: var(--sys-spacing-xl);
}

.layout-footer {
  grid-row: 3;
  padding: var(--sys-spacing-lg) var(--sys-spacing-xl);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-top: 1px solid var(--sys-color-neutral-90);
}
```

### Sidebar + Content
```css
.layout-sidebar {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.layout-sidebar-nav {
  grid-column: 1;
  padding: var(--sys-spacing-xl);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-right: 1px solid var(--sys-color-neutral-90);
}

.layout-sidebar-content {
  grid-column: 2;
  padding: var(--sys-spacing-xl);
}

@media (max-width: 900px) {
  .layout-sidebar {
    grid-template-columns: 1fr;
  }
  
  .layout-sidebar-nav {
    grid-column: 1;
    border-right: none;
    border-bottom: 1px solid var(--sys-color-neutral-90);
  }
  
  .layout-sidebar-content {
    grid-column: 1;
  }
}
```

### Centered Content
```css
.layout-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--sys-spacing-xl);
  text-align: center;
}

.layout-centered-content {
  max-width: 600px;
  width: 100%;
}
```

## Usage Guidelines

### 1. Layout Hierarchy
- **App Layout:** Header, main content, footer structure
- **Page Layout:** Container, grid, spacing within main content
- **Component Layout:** Internal arrangement of component elements
- **Content Layout:** Typography, images, and interactive elements

### 2. Grid Application
- Use 12-column grid for complex, multi-column layouts
- Use flexible grid for card-based content
- Use masonry grid for variable-height content
- Always align to 8dp grid for consistent spacing

### 3. Responsive Strategy
- **Mobile-first:** Start with mobile styles, enhance for larger screens
- **Breakpoint selection:** Use standard breakpoints for consistency
- **Content reflow:** Stack columns, adjust spacing, resize typography
- **Touch targets:** Ensure minimum 48x48px touch targets on mobile

### 4. Accessibility Requirements
- Maintain logical reading order in responsive layouts
- Ensure sufficient contrast in all layout elements
- Provide keyboard navigation for interactive layouts
- Use semantic HTML for layout structure
- Test with screen readers and zoom functionality

### 5. Do's and Don'ts

**✅ Do:**
- Use consistent spacing based on 8dp grid
- Implement mobile-first responsive design
- Test layouts across breakpoints and devices
- Use semantic HTML for layout structure
- Maintain visual hierarchy through spacing
- Consider loading states for dynamic content

**❌ Don't:**
- Use arbitrary spacing values
- Create overly complex nested grids
- Ignore mobile touch target sizes
- Use tables for layout purposes
- Hardcode pixel values without design tokens
- Forget to test with real content

## Implementation Notes

1. **CSS Custom Properties:** Layout styles should reference design tokens for spacing, breakpoints, and colors.
2. **Component Architecture:** Create reusable layout components with consistent patterns.
3. **Performance:** Consider CSS Grid over complex flexbox nesting for better performance.
4. **Maintenance:** Use utility classes for common spacing patterns to reduce CSS duplication.
5. **Testing:** Test layouts with various content lengths, languages, and user preferences.

## File Structure

- `components/layout/` - Layout component implementation
- `styles/layout-utilities.css` - Utility classes for spacing and grids
- `design-tokens-ultimate.css` - Spacing, breakpoint, and color tokens

## Testing Layouts

1. **Visual:** Verify layouts render correctly across breakpoints
2. **Functional:** Test interactive elements in different layouts
3. **Accessibility:** Test keyboard navigation, screen readers, and zoom
4. **Performance:** Measure layout shift (CLS) and rendering performance
5. **Content:** Test with varying content lengths and types
6. **Browser:** Test across supported browsers and devices