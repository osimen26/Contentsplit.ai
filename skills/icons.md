# ContentSplit Icon System

## Overview

The ContentSplit Icon System follows Google Material Design 3 guidelines for visual communication through symbolic imagery. Icons represent actions, objects, and concepts in a simple, recognizable way.

## Icon Styles (Material Design 3)

### 1. Filled Icons (`icon-filled`)
Solid fill icons for primary actions and navigation.

**Usage:** Primary navigation, main actions, selected states
**Weight:** 400 (regular)
**Fill:** 100% solid color

```css
.icon-filled {
  fill: currentColor;
  stroke: none;
}
```

### 2. Outlined Icons (`icon-outlined`)
Outline-style icons for secondary actions and unselected states.

**Usage:** Secondary actions, unselected items, toolbars
**Weight:** 200 (light outline)
**Stroke:** 1.5px stroke width

```css
.icon-outlined {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

### 3. Rounded Icons (`icon-rounded`)
Icons with rounded corners and endpoints.

**Usage:** Friendly interfaces, consumer applications
**Corner Radius:** 2px internal corners
**Endpoints:** Rounded line endings

```css
.icon-rounded {
  fill: currentColor;
  stroke: none;
  border-radius: 2px;
}
```

### 4. Sharp Icons (`icon-sharp`)
Icons with sharp corners and endpoints.

**Usage:** Professional interfaces, enterprise applications
**Corners:** 90-degree angles
**Endpoints:** Flat line endings

```css
.icon-sharp {
  fill: currentColor;
  stroke: none;
}
```

## Icon Sizes (Material Design 3)

### Standard Sizes
| Size | Dimension | Usage |
|------|-----------|-------|
| X-Small | 12px | Dense interfaces, inline indicators |
| Small | 18px | Toolbar icons, status indicators |
| Medium | 24px | **Standard action icons** |
| Large | 36px | Feature icons, section headers |
| X-Large | 48px | Promotional icons, empty states |

### Responsive Sizes
```css
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 18px; height: 18px; }
.icon-md { width: 24px; height: 24px; }
.icon-lg { width: 36px; height: 36px; }
.icon-xl { width: 48px; height: 48px; }
```

## Icon Colors

### Semantic Colors
```css
.icon-primary {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}

.icon-secondary {
  color: var(--sys-color-roles-secondary-color-role-secondary-role);
}

.icon-success {
  color: var(--sys-color-roles-success-color-role-success-color-role);
}

.icon-error {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.icon-warning {
  color: var(--sys-color-roles-warning-color-role-warning-role);
}

.icon-disabled {
  color: var(--sys-color-roles-disable-state);
  opacity: 0.6;
}
```

### Contextual Colors
```css
.icon-on-primary {
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
}

.icon-on-secondary {
  color: var(--sys-color-roles-secondary-color-role-on-secondary-role);
}

.icon-on-surface {
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
}

.icon-on-background {
  color: var(--sys-color-roles-neutral-color-role-on-neutral-color-role);
}
```

## Icon Usage Patterns

### Standalone Icons
```css
.icon-standalone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
```

### Icon with Text
```css
.icon-with-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.icon-before {
  margin-right: 8px;
}

.icon-after {
  margin-left: 8px;
}
```

### Icon Buttons
```css
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sys-color-roles-primary-color-role-primary-role);
}

.icon-button:hover {
  background-color: var(--sys-color-primary-95);
}

.icon-button:active {
  background-color: var(--sys-color-primary-90);
}

.icon-button:disabled {
  color: var(--sys-color-roles-disable-state);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Icon Toggles
```css
.icon-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sys-color-neutral-60);
}

.icon-toggle.selected {
  color: var(--sys-color-roles-primary-color-role-primary-role);
  background-color: var(--sys-color-primary-95);
}

.icon-toggle:hover {
  background-color: var(--sys-color-neutral-95);
}
```

## Interactive States

### Hover State
```css
.icon-button:hover .icon {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
```

### Focus State
```css
.icon-button:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

### Active/Pressed State
```css
.icon-button:active .icon {
  transform: scale(0.95);
}
```

### Disabled State
```css
.icon-button:disabled .icon {
  opacity: 0.6;
  cursor: not-allowed;
}
```

## Icon Categories

### Navigation Icons
- Menu, home, back, forward, up, down, close
- Size: 24px (medium)
- Style: Filled or outlined

### Action Icons
- Add, edit, delete, save, share, download, upload
- Size: 24px (medium)  
- Style: Filled

### Social Icons
- Like, comment, retweet, share, follow
- Size: 24px (medium)
- Style: Outlined

### Status Icons
- Check, error, warning, info, loading
- Size: 18px (small) or 24px (medium)
- Style: Filled with semantic colors

### File Type Icons
- Document, image, video, audio, PDF, spreadsheet
- Size: 24px (medium)
- Style: Outlined

## Icon Implementation

### SVG Best Practices
```svg
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  <path d="..." />
</svg>
```

### Icon Font Implementation
```css
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/material-icons.woff2') format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
```

### React Component Example
```jsx
const Icon = ({ name, size = 'md', color = 'primary', style = 'filled' }) => (
  <svg
    className={`icon icon-${size} icon-${style} icon-${color}`}
    width={SIZE_MAP[size]}
    height={SIZE_MAP[size]}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <use xlinkHref={`/icons.svg#${name}`} />
  </svg>
);
```

## Usage Guidelines

### 1. Icon Selection
- Choose universally recognized symbols
- Maintain visual consistency across icon set
- Test icon recognition with target users
- Avoid culturally specific symbols

### 2. Icon Placement
- Align icons to 8px grid system
- Maintain consistent spacing (8px from text)
- Center icons within touch targets (44×44px minimum)
- Use appropriate icon sizes for context

### 3. Accessibility Requirements
- All interactive icons must have text labels or `aria-label`
- Decorative icons should have `aria-hidden="true"`
- Icon buttons must be keyboard navigable
- Provide text alternatives for complex icons
- Ensure minimum 3:1 contrast ratio for icons

### 4. Do's and Don'ts

**✅ Do:**
- Use filled icons for primary actions
- Use outlined icons for secondary actions
- Maintain consistent stroke width (1.5px)
- Use semantic colors for status icons
- Provide hover and focus states

**❌ Don't:**
- Mix icon styles within the same component
- Use custom colors that break contrast requirements
- Make icons too small for touch targets
- Use icons without proper accessibility attributes
- Animate icons excessively

## Implementation Notes

1. **SVG Sprites**: Use SVG sprite sheets for performance.
2. **Icon Fonts**: Consider icon fonts for simple icon sets.
3. **Component Library**: Create reusable icon components.
4. **Performance**: Lazy-load icon assets when appropriate.
5. **Tree Shaking**: Only include used icons in production bundle.

## File Structure

- `assets/icons/` - SVG icon files
- `components/icon/` - Icon component implementation
- `design-tokens-ultimate.css` - Color and sizing tokens

## Testing Icons

1. **Visual:** Verify icon rendering at all sizes
2. **Functional:** Test interactive icon states
3. **Accessibility:** Test screen reader announcements
4. **Performance:** Test icon loading and rendering speed
5. **Cross-browser:** Verify consistent SVG rendering