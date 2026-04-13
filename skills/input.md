# ContentSplit Input System

## Overview

The ContentSplit Input System follows Google Material Design 3 guidelines for form controls and text entry. Input fields allow users to enter and edit text, with clear visual states and validation feedback.

## Input Types (Material Design 3)

### 1. Filled Text Field (`input-filled`)
Text fields with filled background and underline indicator.

**Usage:** Primary text input in forms, search fields
**States:** Resting, hover, focused, error, disabled
**Components:** Container, input, label, supporting text, leading/trailing icons

```css
.input-filled {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border: none;
  border-bottom: 1px solid var(--sys-color-neutral-60);
  border-radius: 4px 4px 0 0; /* Rounded top corners only */
  padding: 16px 12px 4px 12px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  width: 100%;
}

.input-filled:focus {
  border-bottom: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
  padding-bottom: 3px; /* Adjust for thicker border */
}
```

### 2. Outlined Text Field (`input-outlined`)
Text fields with outlined border and floating label.

**Usage:** Secondary text input, data-heavy interfaces
**States:** Resting, hover, focused, error, disabled
**Components:** Container, input, label, supporting text, leading/trailing icons

```css
.input-outlined {
  background-color: transparent;
  border: 1px solid var(--sys-color-neutral-60);
  border-radius: 4px;
  padding: 16px 12px 4px 12px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  width: 100%;
}

.input-outlined:focus {
  border: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
  padding: 15px 11px 3px 11px; /* Adjust for thicker border */
}
```

### 3. Standard Text Field (`input-standard`)
Legacy text fields with underline indicator (Material Design 2).

**Usage:** Simple text entry, legacy compatibility
**States:** Resting, hover, focused, error, disabled
**Components:** Container, input, label, supporting text

```css
.input-standard {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--sys-color-neutral-60);
  padding: 8px 0;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  width: 100%;
}
```

## Input Components

### Label
```css
.input-label {
  position: absolute;
  left: 12px;
  top: 16px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  transition: all 0.2s ease;
  pointer-events: none;
}

.input-label.floating {
  top: 4px;
  font-size: 12px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Supporting Text
```css
.input-supporting-text {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-top: 4px;
  padding: 0 12px;
}

.input-supporting-text.error {
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Icons
```css
.input-icon-leading {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sys-color-neutral-60);
  width: 20px;
  height: 20px;
}

.input-icon-trailing {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sys-color-neutral-60);
  width: 20px;
  height: 20px;
  cursor: pointer;
}
```

## Interactive States

### Resting State
Default appearance with neutral colors.

### Hover State
```css
.input-filled:hover {
  background-color: var(--sys-color-neutral-98);
}

.input-outlined:hover {
  border-color: var(--sys-color-neutral-40);
}
```

### Focus State
```css
.input-filled:focus {
  border-bottom-color: var(--sys-color-roles-primary-color-role-primary-role);
  background-color: var(--sys-color-neutral-99);
}

.input-outlined:focus {
  border-color: var(--sys-color-roles-primary-color-role-primary-role);
  box-shadow: 0 0 0 1px var(--sys-color-primary-60) inset;
}
```

### Error State
```css
.input-filled.error {
  border-bottom-color: var(--sys-color-roles-error-color-role-error-role);
}

.input-outlined.error {
  border-color: var(--sys-color-roles-error-color-role-error-role);
}

.input-label.error {
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Disabled State
```css
.input-filled:disabled {
  background-color: var(--sys-color-roles-disable-state);
  border-bottom-color: var(--sys-color-neutral-80);
  color: var(--sys-color-neutral-60);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-outlined:disabled {
  border-color: var(--sys-color-neutral-80);
  color: var(--sys-color-neutral-60);
  cursor: not-allowed;
  opacity: 0.6;
}
```

## Input Variants

### Text Area
```css
.textarea {
  min-height: 80px;
  resize: vertical;
  line-height: var(--sys-typography-body-text-line-height);
}
```

### Select/Dropdown
```css
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-position: right 12px center;
  background-repeat: no-repeat;
  padding-right: 40px;
  cursor: pointer;
}
```

### Search Field
```css
.search {
  padding-left: 40px;
  background-image: url("data:image/svg+xml,...");
  background-position: left 12px center;
  background-repeat: no-repeat;
}
```

### Date/Time Picker
```css
.date-picker {
  cursor: pointer;
}
```

## Validation Patterns

### Required Field
```css
.input-label.required::after {
  content: " *";
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Character Counter
```css
.character-counter {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  text-align: right;
  margin-top: 4px;
}

.character-counter.warning {
  color: var(--sys-color-roles-warning-color-role-warning-role);
}

.character-counter.error {
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Password Strength Indicator
```css
.password-strength {
  height: 4px;
  background-color: var(--sys-color-neutral-90);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.password-strength.weak {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  width: 25%;
}

.password-strength.fair {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
  width: 50%;
}

.password-strength.good {
  background-color: var(--sys-color-roles-success-color-role);
  width: 75%;
}

.password-strength.strong {
  background-color: var(--sys-color-roles-success-color-role);
  width: 100%;
}
```

## Usage Guidelines

### 1. Input Layout
- **Label placement:** Always visible (floating or static)
- **Width:** Full width of container or proportional to expected input
- **Spacing:** 16px vertical spacing between form fields
- **Alignment:** Left-aligned labels and inputs

### 2. Form Structure
- Group related fields with clear section headers
- Use appropriate input types (email, tel, url, number)
- Provide clear validation messages near each field
- Show required field indicators consistently

### 3. Mobile Considerations
- Use appropriate keyboard types (email, numeric, phone)
- Ensure minimum 44px touch target for interactive elements
- Test autofill and autocomplete behavior
- Consider screen size for date/time pickers

### 4. Accessibility Requirements
- All inputs must have associated `<label>` or `aria-label`
- Provide clear error messages with `aria-describedby`
- Ensure focus order follows logical tab sequence
- Support keyboard navigation for all interactive elements
- Minimum 4.5:1 contrast ratio for text and borders

### 5. Do's and Don'ts

**✅ Do:**
- Use filled text fields for primary forms
- Use outlined text fields for data tables and dashboards
- Provide clear placeholder text that disappears on focus
- Show validation feedback immediately after interaction
- Use appropriate autocomplete attributes

**❌ Don't:**
- Use placeholder text as substitute for labels
- Hide validation messages until form submission
- Use overly complex input masks
- Make inputs too narrow for expected content
- Use custom styling that breaks browser defaults

## Implementation Notes

1. **CSS Custom Properties**: Input styles should reference design tokens.
2. **Component Architecture**: Create reusable input components with props for type, state, validation.
3. **JavaScript**: Handle focus, blur, and validation events appropriately.
4. **Performance**: Debounce validation for real-time feedback.

## File Structure

- `components/input/` - Input component implementation
- `design-tokens-ultimate.css` - Color, typography, and spacing tokens

## Testing Inputs

1. **Visual:** Verify all states render correctly
2. **Functional:** Test validation, focus, and blur behavior
3. **Accessibility:** Test keyboard navigation and screen reader announcements
4. **Performance:** Test with various input lengths and types
5. **Cross-browser:** Verify consistent rendering across browsers