# ContentSplit Select System

## Overview

The ContentSplit Select System follows Google Material Design 3 guidelines for selection controls. Select components allow users to choose one or more options from a list. They are used for form inputs, filters, and configuration settings where space is limited.

## Material Design 3 Select Principles

### Core Principles
1. **Clarity**: Clearly indicate selected state and available options
2. **Efficiency**: Allow quick selection with minimal interaction
3. **Feedback**: Provide clear visual feedback for selection changes
4. **Accessibility**: Support keyboard navigation and screen readers
5. **Consistency**: Maintain consistent behavior across all select components

## Select Types (Material Design 3)

### 1. Filled Select
Selection control with filled background.

**Usage:** Primary selection in forms, high emphasis
**Components:** Label, selected value, dropdown arrow, menu
**States:** Default, hover, focused, error, disabled

### 2. Outlined Select
Selection control with outlined border.

**Usage:** Secondary selection, lower emphasis
**Components:** Label, selected value, dropdown arrow, menu
**States:** Default, hover, focused, error, disabled

### 3. Multi-Select
Allows selection of multiple options.

**Usage:** Tag selection, filter applications
**Components:** Label, selected chips, dropdown arrow, menu with checkboxes
**States:** Default, hover, focused, error, disabled

### 4. Autocomplete Select
Combines text input with dropdown suggestions.

**Usage:** Large option sets, fuzzy matching
**Components:** Input field, dropdown menu, suggestions
**States:** Default, typing, suggestions visible, loading

## Anatomy

### Standard Select Anatomy
```
┌─────────────────────────────────────────────┐
│  Label                                      │
│  ┌─────────────────────────────────────┐   │
│  │  Selected option          ▼         │   │
│  └─────────────────────────────────────┘   │
│  Helper text (optional)                    │
└─────────────────────────────────────────────┘
```

### Components
1. **Container**: Wrapper for the select component
2. **Label**: Descriptive text above the select
3. **Trigger**: Clickable area showing selected value
4. **Selected Value**: Display of currently selected option
5. **Dropdown Arrow**: Indicator for expandable menu
6. **Menu**: Popup containing option list
7. **Options**: Individual selectable items
8. **Helper Text**: Additional description or error message

## Design Tokens

### Container Tokens
```css
/* Select container styles */
--sys-select-background-color: var(--sys-color-neutral-100);
--sys-select-border-color: var(--sys-color-neutral-80);
--sys-select-border-radius: var(--sys-radius-sm);
--sys-select-border-width: 1px;
--sys-select-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
--sys-select-gap: var(--sys-spacing-xs);
```

### Label Tokens
```css
/* Label styles */
--sys-select-label-font-family: var(--sys-typography-label-small-font-family);
--sys-select-label-font-size: var(--sys-typography-label-small-font-size);
--sys-select-label-font-weight: var(--sys-typography-label-small-font-weight);
--sys-select-label-line-height: var(--sys-typography-label-small-line-height);
--sys-select-label-color: var(--sys-color-neutral-30);
--sys-select-label-gap: var(--sys-spacing-xs);
```

### Trigger Tokens
```css
/* Trigger styles */
--sys-select-trigger-height: 56px;
--sys-select-trigger-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
--sys-select-trigger-gap: var(--sys-spacing-sm);
--sys-select-trigger-hover-background: var(--sys-color-neutral-98);
--sys-select-trigger-focus-border-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-select-trigger-focus-border-width: 2px;
```

### Selected Value Tokens
```css
/* Selected value styles */
--sys-select-value-font-family: var(--sys-typography-body-text-font-family);
--sys-select-value-font-size: var(--sys-typography-body-text-font-size);
--sys-select-value-font-weight: var(--sys-typography-body-text-font-weight);
--sys-select-value-line-height: var(--sys-typography-body-text-line-height);
--sys-select-value-color: var(--sys-color-neutral-10);
--sys-select-value-placeholder-color: var(--sys-color-neutral-60);
```

### Dropdown Arrow Tokens
```css
/* Dropdown arrow styles */
--sys-select-arrow-size: 24px;
--sys-select-arrow-color: var(--sys-color-neutral-50);
--sys-select-arrow-rotation: 0deg;
--sys-select-arrow-open-rotation: 180deg;
--sys-select-arrow-transition: transform 0.2s ease;
```

### Menu Tokens
```css
/* Menu styles */
--sys-select-menu-background: var(--sys-color-neutral-100);
--sys-select-menu-border-radius: var(--sys-radius-md);
--sys-select-menu-elevation: var(--sys-elevation-3);
--sys-select-menu-padding: var(--sys-spacing-sm) 0;
--sys-select-menu-max-height: 300px;
--sys-select-menu-min-width: 200px;
--sys-select-menu-z-index: 1000;
```

### Option Tokens
```css
/* Option styles */
--sys-select-option-height: 48px;
--sys-select-option-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
--sys-select-option-font-family: var(--sys-typography-body-text-font-family);
--sys-select-option-font-size: var(--sys-typography-body-text-font-size);
--sys-select-option-font-weight: var(--sys-typography-body-text-font-weight);
--sys-select-option-line-height: var(--sys-typography-body-text-line-height);
--sys-select-option-color: var(--sys-color-neutral-10);
--sys-select-option-hover-background: var(--sys-color-neutral-98);
--sys-select-option-selected-background: var(--sys-color-primary-95);
--sys-select-option-selected-color: var(--sys-color-roles-primary-color-role-primary-role);
```

### Helper Text Tokens
```css
/* Helper text styles */
--sys-select-helper-font-family: var(--sys-typography-label-small-font-family);
--sys-select-helper-font-size: var(--sys-typography-label-small-font-size);
--sys-select-helper-font-weight: var(--sys-typography-label-small-font-weight);
--sys-select-helper-line-height: var(--sys-typography-label-small-line-height);
--sys-select-helper-color: var(--sys-color-neutral-60);
--sys-select-helper-error-color: var(--sys-color-roles-error-color-role-error-role);
--sys-select-helper-gap: var(--sys-spacing-xs);
```

## Select Implementation

### Filled Select
```css
.select-filled {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sys-select-gap);
  width: 100%;
}

.select-filled-label {
  font-family: var(--sys-select-label-font-family);
  font-size: var(--sys-select-label-font-size);
  font-weight: var(--sys-select-label-font-weight);
  line-height: var(--sys-select-label-line-height);
  color: var(--sys-select-label-color);
  margin-bottom: var(--sys-select-label-gap);
}

.select-filled-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--sys-select-trigger-height);
  padding: var(--sys-select-trigger-padding);
  background-color: var(--sys-select-background-color);
  border: var(--sys-select-border-width) solid var(--sys-select-border-color);
  border-radius: var(--sys-select-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  gap: var(--sys-select-trigger-gap);
}

.select-filled-trigger:hover {
  background-color: var(--sys-select-trigger-hover-background);
}

.select-filled-trigger:focus-within {
  border-color: var(--sys-select-trigger-focus-border-color);
  border-width: var(--sys-select-trigger-focus-border-width);
  outline: none;
}

.select-filled-value {
  flex: 1;
  font-family: var(--sys-select-value-font-family);
  font-size: var(--sys-select-value-font-size);
  font-weight: var(--sys-select-value-font-weight);
  line-height: var(--sys-select-value-line-height);
  color: var(--sys-select-value-color);
  text-align: left;
}

.select-filled-value::placeholder {
  color: var(--sys-select-value-placeholder-color);
}

.select-filled-arrow {
  width: var(--sys-select-arrow-size);
  height: var(--sys-select-arrow-size);
  color: var(--sys-select-arrow-color);
  transition: var(--sys-select-arrow-transition);
}

.select-filled.open .select-filled-arrow {
  transform: rotate(var(--sys-select-arrow-open-rotation));
}
```

### Outlined Select
```css
.select-outlined {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sys-select-gap);
  width: 100%;
}

.select-outlined-label {
  position: absolute;
  top: 0;
  left: var(--sys-spacing-sm);
  transform: translateY(-50%);
  background-color: var(--sys-color-neutral-100);
  padding: 0 var(--sys-spacing-xs);
  font-family: var(--sys-select-label-font-family);
  font-size: var(--sys-select-label-font-size);
  font-weight: var(--sys-select-label-font-weight);
  line-height: var(--sys-select-label-line-height);
  color: var(--sys-select-label-color);
  z-index: 1;
}

.select-outlined-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--sys-select-trigger-height);
  padding: var(--sys-select-trigger-padding);
  background-color: var(--sys-select-background-color);
  border: var(--sys-select-border-width) solid var(--sys-select-border-color);
  border-radius: var(--sys-select-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  gap: var(--sys-select-trigger-gap);
}

.select-outlined-trigger:hover {
  border-color: var(--sys-color-neutral-60);
}

.select-outlined-trigger:focus-within {
  border-color: var(--sys-select-trigger-focus-border-color);
  border-width: var(--sys-select-trigger-focus-border-width);
  outline: none;
}
```

### Multi-Select
```css
.select-multi {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sys-select-gap);
  width: 100%;
}

.select-multi-trigger {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: var(--sys-select-trigger-height);
  padding: var(--sys-spacing-xs) var(--sys-spacing-md);
  background-color: var(--sys-select-background-color);
  border: var(--sys-select-border-width) solid var(--sys-select-border-color);
  border-radius: var(--sys-select-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  gap: var(--sys-spacing-xs);
}

.select-multi-chip {
  display: inline-flex;
  align-items: center;
  background-color: var(--sys-color-primary-95);
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: var(--sys-radius-full);
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  line-height: var(--sys-typography-label-small-line-height);
  gap: var(--sys-spacing-xs);
}

.select-multi-chip-remove {
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-multi-placeholder {
  font-family: var(--sys-select-value-font-family);
  font-size: var(--sys-select-value-font-size);
  font-weight: var(--sys-select-value-font-weight);
  line-height: var(--sys-select-value-line-height);
  color: var(--sys-select-value-placeholder-color);
}
```

### Autocomplete Select
```css
.select-autocomplete {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sys-select-gap);
  width: 100%;
}

.select-autocomplete-input {
  width: 100%;
  height: var(--sys-select-trigger-height);
  padding: var(--sys-select-trigger-padding);
  background-color: var(--sys-select-background-color);
  border: var(--sys-select-border-width) solid var(--sys-select-border-color);
  border-radius: var(--sys-select-border-radius);
  font-family: var(--sys-select-value-font-family);
  font-size: var(--sys-select-value-font-size);
  font-weight: var(--sys-select-value-font-weight);
  line-height: var(--sys-select-value-line-height);
  color: var(--sys-select-value-color);
  transition: all 0.2s ease;
}

.select-autocomplete-input:focus {
  border-color: var(--sys-select-trigger-focus-border-color);
  border-width: var(--sys-select-trigger-focus-border-width);
  outline: none;
}

.select-autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--sys-select-menu-background);
  border-radius: var(--sys-select-menu-border-radius);
  box-shadow: var(--sys-select-menu-elevation);
  max-height: var(--sys-select-menu-max-height);
  overflow-y: auto;
  z-index: var(--sys-select-menu-z-index);
  margin-top: var(--sys-spacing-xs);
}
```

## Menu Implementation

### Select Menu
```css
.select-menu {
  background-color: var(--sys-select-menu-background);
  border-radius: var(--sys-select-menu-border-radius);
  box-shadow: var(--sys-select-menu-elevation);
  max-height: var(--sys-select-menu-max-height);
  overflow-y: auto;
  padding: var(--sys-select-menu-padding);
  min-width: var(--sys-select-menu-min-width);
  z-index: var(--sys-select-menu-z-index);
  animation: menu-slide-down 0.2s ease-out;
}

@keyframes menu-slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Select Option
```css
.select-option {
  display: flex;
  align-items: center;
  height: var(--sys-select-option-height);
  padding: var(--sys-select-option-padding);
  font-family: var(--sys-select-option-font-family);
  font-size: var(--sys-select-option-font-size);
  font-weight: var(--sys-select-option-font-weight);
  line-height: var(--sys-select-option-line-height);
  color: var(--sys-select-option-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
  gap: var(--sys-spacing-sm);
}

.select-option:hover {
  background-color: var(--sys-select-option-hover-background);
}

.select-option.selected {
  background-color: var(--sys-select-option-selected-background);
  color: var(--sys-select-option-selected-color);
}

.select-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-option-checkmark {
  width: 20px;
  height: 20px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  margin-left: auto;
}
```

### Grouped Options
```css
.select-group {
  padding: var(--sys-spacing-sm) 0;
}

.select-group-label {
  padding: var(--sys-spacing-xs) var(--sys-spacing-md);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  line-height: var(--sys-typography-label-small-line-height);
  color: var(--sys-color-neutral-60);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.select-group-options {
  padding: 0;
}
```

### Option with Icon
```css
.select-option-icon {
  width: 20px;
  height: 20px;
  color: var(--sys-color-neutral-50);
}

.select-option.selected .select-option-icon {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

## States

### Default State
```css
.select-trigger {
  border-color: var(--sys-select-border-color);
}
```

### Hover State
```css
.select-trigger:hover {
  border-color: var(--sys-color-neutral-60);
  background-color: var(--sys-select-trigger-hover-background);
}
```

### Focus State
```css
.select-trigger:focus-within {
  border-color: var(--sys-select-trigger-focus-border-color);
  border-width: var(--sys-select-trigger-focus-border-width);
  outline: none;
}

.select-option:focus {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: -2px;
}
```

### Error State
```css
.select-error .select-trigger {
  border-color: var(--sys-color-roles-error-color-role-error-role);
}

.select-error-label {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.select-error-helper {
  color: var(--sys-select-helper-error-color);
}
```

### Disabled State
```css
.select-disabled .select-trigger {
  background-color: var(--sys-color-neutral-98);
  border-color: var(--sys-color-neutral-90);
  cursor: not-allowed;
  opacity: 0.6;
}

.select-disabled .select-label {
  opacity: 0.6;
}
```

### Loading State
```css
.select-loading .select-arrow {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.select-loading-option {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sys-spacing-lg);
}
```

## Helper Text & Error Messages

### Helper Text
```css
.select-helper {
  font-family: var(--sys-select-helper-font-family);
  font-size: var(--sys-select-helper-font-size);
  font-weight: var(--sys-select-helper-font-weight);
  line-height: var(--sys-select-helper-line-height);
  color: var(--sys-select-helper-color);
  margin-top: var(--sys-select-helper-gap);
  min-height: 1em;
}
```

### Error Message
```css
.select-error-message {
  font-family: var(--sys-select-helper-font-family);
  font-size: var(--sys-select-helper-font-size);
  font-weight: var(--sys-select-helper-font-weight);
  line-height: var(--sys-select-helper-line-height);
  color: var(--sys-select-helper-error-color);
  margin-top: var(--sys-select-helper-gap);
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
}

.select-error-message::before {
  content: "⚠";
  font-size: 1.2em;
}
```

## Accessibility

### ARIA Attributes
```html
<div class="select-filled" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="select-label">
  <label id="select-label" class="select-filled-label">Choose option</label>
  <div class="select-filled-trigger" tabindex="0" aria-controls="select-menu">
    <span class="select-filled-value" aria-live="polite">Option 1</span>
    <span class="select-filled-arrow">▼</span>
  </div>
  <ul id="select-menu" class="select-menu" role="listbox" aria-labelledby="select-label">
    <li class="select-option" role="option" aria-selected="true">Option 1</li>
    <li class="select-option" role="option" aria-selected="false">Option 2</li>
  </ul>
  <div class="select-helper" id="select-helper">Choose an option from the list</div>
</div>
```

### Keyboard Navigation
```css
.select-trigger:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

.select-option:focus-visible {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: -2px;
}
```

### Screen Reader Support
```css
/* Hide dropdown arrow from screen readers */
.select-arrow {
  aria-hidden: "true";
}

/* Ensure selected value is announced */
.select-value[aria-live] {
  /* Polite announcements */
}
```

### Keyboard Interactions
```javascript
// Example: Keyboard navigation for select
function handleSelectKeydown(event) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      focusNextOption();
      break;
    case 'ArrowUp':
      event.preventDefault();
      focusPreviousOption();
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      selectFocusedOption();
      break;
    case 'Escape':
      closeMenu();
      break;
    case 'Home':
      event.preventDefault();
      focusFirstOption();
      break;
    case 'End':
      event.preventDefault();
      focusLastOption();
      break;
  }
}
```

## Select in AI Interfaces

### AI Model Selector
```css
.select-ai-model {
  border-left: 4px solid var(--sys-color-primary-40);
}

.select-ai-model-option {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}

.select-ai-model-icon {
  width: 24px;
  height: 24px;
  color: var(--sys-color-primary-40);
}

.select-ai-model-info {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

.select-ai-model-name {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-font-weight);
  color: var(--sys-color-neutral-10);
}

.select-ai-model-description {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  color: var(--sys-color-neutral-60);
}
```

### Content Type Selector
```css
.select-content-type {
  max-width: 300px;
}

.select-content-type-option {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-md);
}

.select-content-type-icon {
  width: 32px;
  height: 32px;
  background-color: var(--sys-color-primary-95);
  border-radius: var(--sys-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-roles-primary-color-role-primary-role);
}

.select-content-type-details {
  flex: 1;
}
```

### Language Selector
```css
.select-language {
  min-width: 200px;
}

.select-language-option {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}

.select-language-flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.select-language-code {
  margin-left: auto;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  color: var(--sys-color-neutral-60);
}
```

### Tone/ Voice Selector
```css
.select-tone {
  border-radius: var(--sys-radius-lg);
}

.select-tone-option {
  border-radius: var(--sys-radius-md);
  margin: var(--sys-spacing-xs);
}

.select-tone-option.selected {
  background-color: var(--sys-color-primary-95);
  border: 2px solid var(--sys-color-primary-40);
}
```

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .select-trigger {
    height: 48px;
    padding: var(--sys-spacing-xs) var(--sys-spacing-md);
  }
  
  .select-menu {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 50vh;
    border-radius: var(--sys-radius-lg) var(--sys-radius-lg) 0 0;
    animation: bottom-sheet-slide-up 0.3s ease-out;
  }
  
  .select-option {
    height: 56px;
    padding: var(--sys-spacing-md) var(--sys-spacing-lg);
  }
  
  .select-multi-chip {
    font-size: var(--sys-typography-label-small-font-size);
    padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .select-menu {
    max-width: 400px;
  }
  
  .select-autocomplete-dropdown {
    max-width: 400px;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .select-menu {
    max-width: 300px;
  }
  
  .select-autocomplete-dropdown {
    max-width: 300px;
  }
}
```

## Best Practices

### ✅ Do
- Use selects when there are 5+ options (otherwise consider radio buttons)
- Keep option labels clear and concise
- Group related options using optgroups
- Provide a default selection when appropriate
- Support keyboard navigation for power users
- Include search/filter for large option sets (> 15 items)
- Provide visual feedback for selection changes
- Ensure sufficient contrast for all states
- Test with screen readers and keyboard-only users
- Use appropriate select type for the context

### ❌ Don't
- Don't use selects for binary choices (use toggle/checkbox)
- Don't overload selects with too many options (> 50)
- Don't use ambiguous option labels
- Don't forget to handle long option text (truncate with ellipsis)
- Don't ignore mobile touch targets (minimum 44px)
- Don't use custom selects without proper accessibility support
- Don't auto-submit on selection without user confirmation
- Don't hide the selected value when menu is open
- Don't forget to handle loading states for async options
- Don't neglect error states and validation messages

## Testing and Validation

### Visual Testing
1. **States**: Test default, hover, focus, error, disabled states
2. **Menu Behavior**: Test opening, closing, scrolling
3. **Option Selection**: Test single and multi-selection
4. **Responsive**: Test across all breakpoints
5. **Animations**: Test open/close transitions
6. **Overflow**: Test with long option text
7. **Positioning**: Test menu positioning relative to trigger
8. **Accessibility**: Test with screen readers and keyboard

### Functional Testing
```javascript
// Example select test
describe('Select System', () => {
  test('Select opens menu on click', () => {
    const select = document.querySelector('.select-filled');
    const trigger = select.querySelector('.select-filled-trigger');
    trigger.click();
    expect(select.classList.contains('open')).toBe(true);
    expect(document.querySelector('.select-menu')).toBeInTheDocument();
  });
  
  test('Select option can be selected', () => {
    const select = document.querySelector('.select-filled');
    const option = document.querySelector('.select-option');
    option.click();
    expect(select.querySelector('.select-filled-value').textContent)
      .toBe(option.textContent);
    expect(select.classList.contains('open')).toBe(false);
  });
  
  test('Keyboard navigation works', () => {
    const select = document.querySelector('.select-filled');
    const trigger = select.querySelector('.select-filled-trigger');
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(document.activeElement.classList.contains('select-option')).toBe(true);
  });
});
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for select styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/radius.md` - Radius tokens reference
- `component-specification.md` - Component specifications

### Select Component Files
- `select.css` - Select styles (if separated)
- `select.js` - Select logic and behavior
- `select.stories.js` - Storybook stories (if using Storybook)

## Integration with AI Systems

### AI Model Selection
```javascript
// Example: AI model selector
function createAIModelSelector(models) {
  return {
    type: 'select',
    label: 'AI Model',
    options: models.map(model => ({
      value: model.id,
      label: model.name,
      description: model.description,
      icon: model.icon
    })),
    onChange: (selectedModel) => {
      updateAIModel(selectedModel);
    }
  };
}
```

### Content Parameter Selection
```javascript
// Example: Content parameter multi-select
function createParameterSelector(parameters) {
  return {
    type: 'multi-select',
    label: 'Content Parameters',
    options: parameters.map(param => ({
      value: param.id,
      label: param.name,
      category: param.category
    })),
    onChange: (selectedParams) => {
      updateContentParameters(selectedParams);
    }
  };
}
```

### Language & Locale Selection
```javascript
// Example: Language selector with autocomplete
function createLanguageSelector(languages) {
  return {
    type: 'autocomplete',
    label: 'Language',
    options: languages,
    filter: (input, option) => {
      return option.name.toLowerCase().includes(input.toLowerCase()) ||
             option.code.toLowerCase().includes(input.toLowerCase());
    },
    onChange: (selectedLanguage) => {
      updateContentLanguage(selectedLanguage);
    }
  };
}
```

---

*This select system ensures consistent, accessible, and user-friendly selection controls across ContentSplit. All select components should follow Material Design 3 guidelines and use the design token system for styling.*