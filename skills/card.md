# ContentSplit Card System

## Overview

The ContentSplit Card System follows Google Material Design 3 guidelines for surface containers that hold content and actions about a single subject. Cards provide clear visual separation and hierarchy for grouped information.

## Card Anatomy (Material Design 3)

### Core Components
1. **Container** - Rounded surface with elevation
2. **Media (optional)** - Image, video, or graphic
3. **Headline** - Primary title text
4. **Subhead** - Supporting text or metadata
5. **Supporting text** - Descriptive content
6. **Actions** - Buttons, icons, or toggles
7. **Icons** - Action or status indicators

### Card Types

#### 1. Elevated Card (`card-elevated`)
Cards with shadow elevation for floating appearance.

**Usage:** Primary content cards, product listings, article previews
**Elevation:** Level 1 (resting), Level 2 (hover/selected)
**Corner Radius:** 12px (Material Design 3 large component shape)

```css
.card-elevated {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  box-shadow: var(--sys-elevation-1);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.card-elevated:hover {
  box-shadow: var(--sys-elevation-2);
}
```

#### 2. Filled Card (`card-filled`)
Cards with filled background color.

**Usage:** Secondary content, dashboard widgets, status cards
**Elevation:** Level 0 (no shadow)
**Corner Radius:** 12px

```css
.card-filled {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  border: 1px solid var(--sys-color-neutral-90);
}
```

#### 3. Outlined Card (`card-outlined`)
Cards with outlined border.

**Usage:** Data tables, settings panels, inline content
**Elevation:** Level 0
**Corner Radius:** 12px

```css
.card-outlined {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  border: 1px solid var(--sys-color-neutral-90);
}
```

## Card Layouts

### Media Card
```css
.card-media {
  display: flex;
  flex-direction: column;
}

.card-media-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-media-content {
  padding: 16px;
}
```

### Text-Only Card
```css
.card-text-only {
  padding: 24px;
}
```

### Action Card
```css
.card-actions {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-actions-footer {
  padding: 16px;
  border-top: 1px solid var(--sys-color-neutral-90);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
```

### Dashboard Card
```css
.card-dashboard {
  padding: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
  align-items: start;
}

.card-dashboard-icon {
  grid-row: 1 / 3;
  grid-column: 1;
  margin-right: 12px;
}

.card-dashboard-title {
  grid-row: 1;
  grid-column: 2;
  margin: 0;
}

.card-dashboard-value {
  grid-row: 2;
  grid-column: 2;
  margin: 0;
}
```

## Card Content Structure

### Headline
```css
.card-headline {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  font-weight: var(--sys-typography-title-medium-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin: 0 0 8px 0;
  line-height: var(--sys-typography-title-medium-line-height);
}
```

### Subhead
```css
.card-subhead {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin: 0 0 12px 0;
  line-height: var(--sys-typography-body-text-line-height);
}
```

### Supporting Text
```css
.card-supporting-text {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin: 0 0 16px 0;
  line-height: var(--sys-typography-body-text-line-height);
}
```

### Metadata
```css
.card-metadata {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  margin: 12px 0 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

## Interactive States

### Hover State
```css
.card-elevated:hover {
  box-shadow: var(--sys-elevation-2);
  cursor: pointer;
}

.card-filled:hover {
  background-color: var(--sys-color-neutral-98);
  border-color: var(--sys-color-neutral-80);
}

.card-outlined:hover {
  border-color: var(--sys-color-neutral-80);
}
```

### Focus State
```css
.card-elevated:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}

.card-filled:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}

.card-outlined:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

### Selected/Active State
```css
.card-elevated.selected {
  box-shadow: var(--sys-elevation-2);
  border: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
}

.card-filled.selected {
  background-color: var(--sys-color-primary-95);
  border: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
}

.card-outlined.selected {
  border: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Disabled State
```css
.card-elevated.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.card-filled.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--sys-color-roles-disable-state);
}

.card-outlined.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  border-color: var(--sys-color-neutral-80);
}
```

## Card Actions

### Primary Action
```css
.card-action-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border: none;
  border-radius: 8px;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
}
```

### Secondary Action
```css
.card-action-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: 1px solid var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: 8px;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
}
```

### Icon Actions
```css
.card-action-icon {
  background: none;
  border: none;
  color: var(--sys-color-neutral-60);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-action-icon:hover {
  background-color: var(--sys-color-neutral-95);
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

## Usage Guidelines

### 1. Card Hierarchy
- **Primary content:** Elevated cards with shadow
- **Secondary content:** Filled or outlined cards
- **Supporting content:** Nested within primary cards
- **Status indicators:** Use color-coded borders or icons

### 2. Content Organization
- Place most important information at the top
- Use consistent spacing (8px grid system)
- Group related actions together
- Limit card content to single subject
- Use appropriate media aspect ratios (16:9 for images)

### 3. Responsive Behavior
- **Mobile:** Full-width cards with 16px margin
- **Tablet:** Flexible grid with 24px gap
- **Desktop:** Fixed-width or percentage-based cards
- **Large screens:** Consider card grouping in columns

### 4. Accessibility Requirements
- Use semantic HTML (`<article>`, `<section>`)
- Provide descriptive aria-labels for interactive cards
- Ensure proper heading hierarchy within cards
- Maintain minimum 4.5:1 contrast ratio for text
- Support keyboard navigation for card actions

### 5. Do's and Don'ts

**✅ Do:**
- Use elevated cards for primary content
- Maintain consistent corner radii (12px)
- Provide clear visual hierarchy within cards
- Use appropriate card types for different contexts
- Include loading states for async content

**❌ Don't:**
- Nest cards more than one level deep
- Use multiple card types on the same page
- Overload cards with too much content
- Use custom styling that breaks Material Design patterns
- Make cards too small for touch targets on mobile

## Implementation Notes

1. **CSS Custom Properties**: Card styles should reference design tokens.
2. **Component Architecture**: Create reusable card components with slots for content.
3. **Performance**: Lazy-load card media content when appropriate.
4. **Animation**: Use subtle transitions for state changes (100-200ms).

## File Structure

- `components/card/` - Card component implementation
- `design-tokens-ultimate.css` - Color, typography, elevation, and spacing tokens

## Testing Cards

1. **Visual:** Verify all card types and states render correctly
2. **Functional:** Test interactive elements and actions
3. **Accessibility:** Test keyboard navigation and screen reader announcements
4. **Performance:** Test with various content lengths and media types
5. **Responsive:** Verify card behavior across breakpoints