# ContentSplit Button System

## Overview

The ContentSplit Button System follows Google Material Design 3 guidelines for interactive components. Buttons allow users to take actions, make choices, and navigate through the interface with clear visual feedback.

## Button Types (Material Design 3)

### 1. Filled Button (`button-filled`)
Primary action buttons with solid background color.

**Usage:** Primary actions, high emphasis CTAs, form submissions
**Elevation:** Level 0 (no shadow)
**States:** Default, hover, focused, pressed, disabled

```css
.button-filled {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border-radius: var(--sys-radius-button); /* Material Design 3 full shape */
  padding: 10px 24px;
  border: none;
  font-family: var(--sys-typography-label-small-font-family);
  font-weight: var(--sys-typography-label-small-font-weight);
  font-size: var(--sys-typography-label-small-font-size);
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
  text-transform: uppercase;
  cursor: pointer;
}
```

### 2. Outlined Button (`button-outlined`)
Secondary action buttons with outlined border.

**Usage:** Secondary actions, medium emphasis, alternative choices  
**Elevation:** Level 0
**States:** Default, hover, focused, pressed, disabled

```css
.button-outlined {
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: 1px solid var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: var(--sys-radius-button);
  padding: 10px 24px;
  font-family: var(--sys-typography-label-small-font-family);
  font-weight: var(--sys-typography-label-small-font-weight);
  font-size: var(--sys-typography-label-small-font-size);
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
  text-transform: uppercase;
  cursor: pointer;
}
```

### 3. Text Button (`button-text`)
Low emphasis buttons with text-only styling.

**Usage:** Low emphasis actions, inline actions, tertiary choices
**Elevation:** Level 0  
**States:** Default, hover, focused, pressed, disabled

```css
.button-text {
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: none;
  border-radius: var(--sys-radius-button);
  padding: 10px 12px;
  font-family: var(--sys-typography-label-small-font-family);
  font-weight: var(--sys-typography-label-small-font-weight);
  font-size: var(--sys-typography-label-small-font-size);
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
  text-transform: uppercase;
  cursor: pointer;
}
```

### 4. Elevated Button (`button-elevated`)
Buttons with shadow elevation for floating appearance.

**Usage:** Contained actions that need visual separation
**Elevation:** Level 1 (default), Level 2 (pressed)
**States:** Default, hover, focused, pressed, disabled

```css
.button-elevated {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: var(--sys-radius-button);
  padding: 10px 24px;
  border: none;
  box-shadow: var(--sys-elevation-1);
  font-family: var(--sys-typography-label-small-font-family);
  font-weight: var(--sys-typography-label-small-font-weight);
  font-size: var(--sys-typography-label-small-font-size);
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
  text-transform: uppercase;
  cursor: pointer;
}
```

### 5. Tonal Button (`button-tonal`)
Buttons with secondary container color.

**Usage:** Medium emphasis with tonal background
**Elevation:** Level 0
**States:** Default, hover, focused, pressed, disabled

```css
.button-tonal {
  background-color: var(--sys-color-roles-secondary-color-role-secondary-container);
  color: var(--sys-color-roles-secondary-color-role-on-secondary-container);
  border-radius: var(--sys-radius-button);
  padding: 10px 24px;
  border: none;
  font-family: var(--sys-typography-label-small-font-family);
  font-weight: var(--sys-typography-label-small-font-weight);
  font-size: var(--sys-typography-label-small-font-size);
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
  text-transform: uppercase;
  cursor: pointer;
}
```

### 6. Floating Action Button (`button-fab`)
Circular buttons for primary actions.

**Usage:** Primary action that floats above content
**Elevation:** Level 3 (default), Level 4 (pressed)
**States:** Default, hover, focused, pressed, disabled
**Sizes:** Small (40px), Regular (56px), Large (72px)

```css
.button-fab {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: none;
  box-shadow: var(--sys-elevation-3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

## Button Sizes

| Size | Height | Padding | Font Size | Usage |
|------|--------|---------|-----------|-------|
| Small | 32px | 8px 16px | 12px | Dense interfaces, data tables |
| Medium | 40px | 10px 24px | 14px | Standard button size |
| Large | 48px | 12px 32px | 16px | High visibility CTAs |

## Interactive States

### Hover State
```css
.button-filled:hover {
  background-color: var(--sys-color-primary-30); /* Darker shade */
  box-shadow: var(--sys-elevation-1);
}
```

### Focus State  
```css
.button-filled:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

### Pressed/Active State
```css
.button-filled:active {
  background-color: var(--sys-color-primary-20);
  box-shadow: var(--sys-elevation-0);
  transform: translateY(1px);
}
```

### Disabled State
```css
.button-filled:disabled {
  background-color: var(--sys-color-roles-disable-state);
  color: var(--sys-color-neutral-60);
  cursor: not-allowed;
  opacity: 0.6;
}
```

## Icon Button Guidelines

### Icon Placement
- **Leading icon:** Icon before text (16px spacing)
- **Trailing icon:** Icon after text (16px spacing)  
- **Icon-only:** No text, descriptive aria-label required

### Icon Sizes
- Small buttons: 16px icons
- Medium buttons: 20px icons  
- Large buttons: 24px icons
- FAB: 24px icons

## Usage Guidelines

### 1. Button Hierarchy
- **Primary action:** Filled button or FAB
- **Secondary action:** Outlined or tonal button
- **Tertiary action:** Text button
- **Destructive action:** Filled button with error color role

### 2. Button Placement
- Place primary buttons in predictable locations (bottom-right for dialogs)
- Align buttons to content grid (8px increments)
- Maintain consistent spacing between button groups (8px horizontal, 12px vertical)

### 3. Accessibility Requirements
- All buttons must have descriptive text or aria-label
- Focus states must be clearly visible (minimum 3:1 contrast)
- Button text must have 4.5:1 contrast against background
- Disabled buttons must be programmatically disabled (not just visually)

### 4. Do's and Don'ts

**✅ Do:**
- Use filled buttons for primary actions
- Use text buttons for cancel actions
- Maintain consistent button widths within button groups
- Include loading states for async actions
- Provide clear feedback on interaction

**❌ Don't:**
- Mix button types within the same group
- Use more than one primary button per screen
- Use icons without text labels unless standard patterns (FAB, close)
- Make buttons too small for touch targets (minimum 44×44px on mobile)

## Implementation Notes

1. **CSS Custom Properties**: Button styles should reference design tokens for consistency.
2. **Component Architecture**: Create reusable button components with props for type, size, state.
3. **Animation**: Use subtle transitions (100-200ms) for state changes.
4. **Touch Targets**: Ensure minimum 44×44px touch target on mobile devices.

## File Structure

- `components/button/` - Button component implementation
- `design-tokens-ultimate.css` - Color, typography, and elevation tokens

## Testing Buttons

1. **Visual:** Verify button states render correctly
2. **Functional:** Test click handlers and disabled states  
3. **Accessibility:** Test keyboard navigation and screen reader announcements
4. **Performance:** Ensure button animations are smooth and responsive