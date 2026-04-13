# ContentSplit Chips System

## Overview

The ContentSplit Chips System follows Google Material Design 3 guidelines for chip components. Chips are compact elements that represent input, attribute, or action. They are particularly useful for content categorization, filtering, tag management, and selection in AI content generation workflows.

## Material Design 3 Chip Principles

### Core Principles
1. **Clarity**: Clearly indicate chip purpose and state
2. **Efficiency**: Enable quick selection and deselection
3. **Compactness**: Display multiple options in limited space
4. **Feedback**: Provide clear visual feedback for interactions
5. **Accessibility**: Support keyboard navigation and screen readers

## Chip Types (Material Design 3)

### 1. Input Chips
Represent discrete pieces of information entered by users.

**Usage:** Tags, keywords, user-generated content
**Components:** Label, remove button, optional avatar
**States:** Default, hover, focused, selected, disabled

### 2. Choice Chips
Allow single selection from a set of options.

**Usage:** Filtering, categorization, single-select options
**Components:** Label, optional icon
**States:** Default, hover, focused, selected, disabled

### 3. Filter Chips
Allow multiple selection for filtering content.

**Usage:** Multi-select filtering, content categorization
**Components:** Label, optional icon, selection indicator
**States:** Default, hover, focused, selected, disabled

### 4. Action Chips
Trigger actions or operations.

**Usage:** Quick actions, shortcuts, operations
**Components:** Label, icon (optional)
**States:** Default, hover, focused, pressed, disabled

### 5. Assist Chips
Suggest or assist user actions.

**Usage:** Smart suggestions, AI recommendations
**Components:** Label, icon, optional badge
**States:** Default, hover, focused, pressed, disabled

## Anatomy

### Standard Chip Anatomy
```
┌─────────────────────────────────────────┐
│  ┌───┐ Label                     ×     │
│  │ 🏷️ │ Content Tag                    │
│  └───┘                                  │
└─────────────────────────────────────────┘
```

### Input Chip Anatomy
```
┌─────────────────────────────────────────┐
│  ┌───┐ User Input                 ×     │
│  │ 👤 │ @username                        │
│  └───┘                                  │
└─────────────────────────────────────────┘
```

### Filter Chip Anatomy
```
┌─────────────────────────────────────────┐
│  ✓  Category                           │
└─────────────────────────────────────────┘
```

### Action Chip Anatomy
```
┌─────────────────────────────────────────┐
│  ⚡  Generate Content                   │
└─────────────────────────────────────────┘
```

## Design Tokens

### Container Tokens
```css
/* Chip container styles */
--sys-chip-height: 32px;
--sys-chip-background: var(--sys-color-neutral-95);
--sys-chip-selected-background: var(--sys-color-primary-95);
--sys-chip-border-radius: var(--sys-radius-full);
--sys-chip-padding: 0 var(--sys-spacing-md);
--sys-chip-gap: var(--sys-spacing-xs);
--sys-chip-border: 1px solid transparent;
--sys-chip-border-selected: 1px solid var(--sys-color-primary-40);
--sys-chip-elevation: var(--sys-elevation-1);
--sys-chip-elevation-hover: var(--sys-elevation-2);
```

### Label Tokens
```css
/* Label styles */
--sys-chip-label-font-family: var(--sys-typography-label-small-font-family);
--sys-chip-label-font-size: var(--sys-typography-label-small-font-size);
--sys-chip-label-font-weight: var(--sys-typography-label-small-font-weight);
--sys-chip-label-line-height: var(--sys-typography-label-small-line-height);
--sys-chip-label-color: var(--sys-color-neutral-30);
--sys-chip-label-selected-color: var(--sys-color-primary-40);
--sys-chip-label-disabled-color: var(--sys-color-neutral-60);
```

### Icon Tokens
```css
/* Icon styles */
--sys-chip-icon-size: 18px;
--sys-chip-icon-color: var(--sys-color-neutral-50);
--sys-chip-icon-selected-color: var(--sys-color-primary-40);
--sys-chip-icon-hover-color: var(--sys-color-neutral-30);
--sys-chip-icon-disabled-color: var(--sys-color-neutral-70);
--sys-chip-icon-gap: var(--sys-spacing-xs);
```

### Avatar Tokens
```css
/* Avatar styles (for input chips) */
--sys-chip-avatar-size: 20px;
--sys-chip-avatar-border-radius: var(--sys-radius-full);
--sys-chip-avatar-background: var(--sys-color-neutral-90);
--sys-chip-avatar-color: var(--sys-color-neutral-30);
--sys-chip-avatar-gap: var(--sys-spacing-xs);
```

### Remove Button Tokens
```css
/* Remove button styles */
--sys-chip-remove-size: 18px;
--sys-chip-remove-color: var(--sys-color-neutral-50);
--sys-chip-remove-hover-color: var(--sys-color-neutral-30);
--sys-chip-remove-background: transparent;
--sys-chip-remove-border-radius: var(--sys-radius-full);
--sys-chip-remove-padding: 4px;
--sys-chip-remove-gap: var(--sys-spacing-xs);
```

### Selection Indicator Tokens
```css
/* Selection indicator (filter chips) */
--sys-chip-selection-size: 18px;
--sys-chip-selection-color: var(--sys-color-primary-40);
--sys-chip-selection-background: var(--sys-color-primary-95);
--sys-chip-selection-border-radius: var(--sys-radius-full);
--sys-chip-selection-gap: var(--sys-spacing-xs);
```

### Assist Chip Tokens
```css
/* Assist chip specific */
--sys-chip-assist-background: var(--sys-color-secondary-95);
--sys-chip-assist-color: var(--sys-color-secondary-40);
--sys-chip-assist-border: 1px solid var(--sys-color-secondary-80);
--sys-chip-assist-badge-background: var(--sys-color-primary-40);
--sys-chip-assist-badge-color: var(--sys-color-neutral-100);
--sys-chip-assist-badge-size: 6px;
--sys-chip-assist-badge-position: top right;
```

### State Tokens
```css
/* Hover state */
--sys-chip-hover-background: var(--sys-color-neutral-90);
--sys-chip-hover-elevation: var(--sys-chip-elevation-hover);

/* Focus state */
--sys-chip-focus-outline: 2px solid var(--sys-color-primary-40);
--sys-chip-focus-outline-offset: 2px;

/* Disabled state */
--sys-chip-disabled-background: var(--sys-color-neutral-98);
--sys-chip-disabled-opacity: 0.5;
--sys-chip-disabled-cursor: not-allowed;

/* Pressed state */
--sys-chip-pressed-transform: translateY(1px);
--sys-chip-pressed-elevation: var(--sys-elevation-0);
```

## Chip Implementation

### Base Chip Implementation
```css
.chip {
  display: inline-flex;
  align-items: center;
  height: var(--sys-chip-height);
  background-color: var(--sys-chip-background);
  border-radius: var(--sys-chip-border-radius);
  padding: var(--sys-chip-padding);
  border: var(--sys-chip-border);
  cursor: pointer;
  transition: all 0.2s ease;
  gap: var(--sys-chip-gap);
  user-select: none;
  box-shadow: var(--sys-chip-elevation);
}

.chip:hover {
  background-color: var(--sys-chip-hover-background);
  box-shadow: var(--sys-chip-hover-elevation);
}

.chip:focus-visible {
  outline: var(--sys-chip-focus-outline);
  outline-offset: var(--sys-chip-focus-outline-offset);
}

.chip:active {
  transform: var(--sys-chip-pressed-transform);
  box-shadow: var(--sys-chip-pressed-elevation);
}

.chip.disabled {
  background-color: var(--sys-chip-disabled-background);
  opacity: var(--sys-chip-disabled-opacity);
  cursor: var(--sys-chip-disabled-cursor);
  pointer-events: none;
}

.chip-label {
  font-family: var(--sys-chip-label-font-family);
  font-size: var(--sys-chip-label-font-size);
  font-weight: var(--sys-chip-label-font-weight);
  line-height: var(--sys-chip-label-line-height);
  color: var(--sys-chip-label-color);
  white-space: nowrap;
}

.chip.disabled .chip-label {
  color: var(--sys-chip-label-disabled-color);
}

.chip-icon {
  width: var(--sys-chip-icon-size);
  height: var(--sys-chip-icon-size);
  color: var(--sys-chip-icon-color);
  flex-shrink: 0;
}

.chip:hover .chip-icon {
  color: var(--sys-chip-icon-hover-color);
}

.chip.disabled .chip-icon {
  color: var(--sys-chip-icon-disabled-color);
}
```

### Input Chip Implementation
```css
.chip-input {
  background-color: var(--sys-chip-background);
  border: var(--sys-chip-border);
}

.chip-input.selected {
  background-color: var(--sys-chip-selected-background);
  border: var(--sys-chip-border-selected);
}

.chip-input.selected .chip-label {
  color: var(--sys-chip-label-selected-color);
}

.chip-input.selected .chip-icon {
  color: var(--sys-chip-icon-selected-color);
}

.chip-input-avatar {
  width: var(--sys-chip-avatar-size);
  height: var(--sys-chip-avatar-size);
  border-radius: var(--sys-chip-avatar-border-radius);
  background-color: var(--sys-chip-avatar-background);
  color: var(--sys-chip-avatar-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--sys-chip-avatar-size) * 0.6);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
  flex-shrink: 0;
}

.chip-input-remove {
  width: var(--sys-chip-remove-size);
  height: var(--sys-chip-remove-size);
  background-color: var(--sys-chip-remove-background);
  border: none;
  border-radius: var(--sys-chip-remove-border-radius);
  color: var(--sys-chip-remove-color);
  cursor: pointer;
  padding: var(--sys-chip-remove-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
  margin-left: var(--sys-chip-remove-gap);
}

.chip-input-remove:hover {
  color: var(--sys-chip-remove-hover-color);
  background-color: var(--sys-color-neutral-90);
}

.chip-input-remove:focus-visible {
  outline: var(--sys-chip-focus-outline);
  outline-offset: 1px;
}
```

### Choice Chip Implementation
```css
.chip-choice {
  background-color: var(--sys-chip-background);
  border: var(--sys-chip-border);
}

.chip-choice.selected {
  background-color: var(--sys-chip-selected-background);
  border: var(--sys-chip-border-selected);
}

.chip-choice.selected .chip-label {
  color: var(--sys-chip-label-selected-color);
}

.chip-choice.selected .chip-icon {
  color: var(--sys-chip-icon-selected-color);
}

/* Choice chip group */
.chip-group-choice {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sys-spacing-sm);
}

.chip-group-choice .chip-choice {
  margin: 0;
}

/* Single selection behavior */
.chip-group-choice[data-single-select] .chip-choice.selected ~ .chip-choice.selected {
  background-color: var(--sys-chip-background);
  border: var(--sys-chip-border);
}

.chip-group-choice[data-single-select] .chip-choice.selected ~ .chip-choice.selected .chip-label {
  color: var(--sys-chip-label-color);
}

.chip-group-choice[data-single-select] .chip-choice.selected ~ .chip-choice.selected .chip-icon {
  color: var(--sys-chip-icon-color);
}
```

### Filter Chip Implementation
```css
.chip-filter {
  background-color: var(--sys-chip-background);
  border: var(--sys-chip-border);
  position: relative;
  padding-left: calc(var(--sys-chip-selection-size) + var(--sys-chip-selection-gap) * 2);
}

.chip-filter.selected {
  background-color: var(--sys-chip-selected-background);
  border: var(--sys-chip-border-selected);
}

.chip-filter.selected .chip-label {
  color: var(--sys-chip-label-selected-color);
}

.chip-filter.selected .chip-icon {
  color: var(--sys-chip-icon-selected-color);
}

.chip-filter-selection {
  position: absolute;
  left: var(--sys-chip-selection-gap);
  width: var(--sys-chip-selection-size);
  height: var(--sys-chip-selection-size);
  border-radius: var(--sys-chip-selection-border-radius);
  background-color: var(--sys-chip-selection-background);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.chip-filter.selected .chip-filter-selection {
  opacity: 1;
}

.chip-filter-selection-icon {
  width: calc(var(--sys-chip-selection-size) * 0.6);
  height: calc(var(--sys-chip-selection-size) * 0.6);
  color: var(--sys-chip-selection-color);
}

/* Filter chip group */
.chip-group-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sys-spacing-sm);
}

.chip-group-filter .chip-filter {
  margin: 0;
}
```

### Action Chip Implementation
```css
.chip-action {
  background-color: var(--sys-chip-background);
  border: var(--sys-chip-border);
}

.chip-action:hover {
  background-color: var(--sys-chip-hover-background);
  box-shadow: var(--sys-chip-hover-elevation);
}

.chip-action:active {
  transform: var(--sys-chip-pressed-transform);
  box-shadow: var(--sys-chip-pressed-elevation);
}

.chip-action-icon {
  width: var(--sys-chip-icon-size);
  height: var(--sys-chip-icon-size);
  color: var(--sys-chip-icon-color);
  transition: transform 0.2s ease;
}

.chip-action:hover .chip-action-icon {
  color: var(--sys-chip-icon-hover-color);
  transform: scale(1.1);
}

.chip-action:active .chip-action-icon {
  transform: scale(0.95);
}

/* Action chip with loading state */
.chip-action.loading {
  pointer-events: none;
  opacity: 0.8;
}

.chip-action.loading .chip-action-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Assist Chip Implementation
```css
.chip-assist {
  background-color: var(--sys-chip-assist-background);
  border: var(--sys-chip-assist-border);
  color: var(--sys-chip-assist-color);
  position: relative;
}

.chip-assist .chip-label {
  color: var(--sys-chip-assist-color);
}

.chip-assist .chip-icon {
  color: var(--sys-chip-assist-color);
}

.chip-assist:hover {
  background-color: var(--sys-color-secondary-90);
  border-color: var(--sys-color-secondary-70);
}

.chip-assist-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: var(--sys-chip-assist-badge-size);
  height: var(--sys-chip-assist-badge-size);
  border-radius: var(--sys-radius-full);
  background-color: var(--sys-chip-assist-badge-background);
  color: var(--sys-chip-assist-badge-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: bold;
}

/* AI suggestion chip */
.chip-ai-suggestion {
  border-style: dashed;
  border-color: var(--sys-color-primary-80);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### Chip Group Implementation
```css
.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sys-spacing-sm);
  align-items: center;
}

.chip-group-label {
  font-family: var(--sys-typography-label-medium-font-family);
  font-size: var(--sys-typography-label-medium-font-size);
  font-weight: var(--sys-typography-label-medium-font-weight);
  color: var(--sys-color-neutral-30);
  margin-bottom: var(--sys-spacing-xs);
  display: block;
}

.chip-group-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-top: var(--sys-spacing-xs);
  display: block;
}

/* Horizontal scrollable chip group */
.chip-group-scrollable {
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding: var(--sys-spacing-sm) 0;
  gap: var(--sys-spacing-sm);
  scrollbar-width: thin;
}

.chip-group-scrollable::-webkit-scrollbar {
  height: 4px;
}

.chip-group-scrollable::-webkit-scrollbar-track {
  background: var(--sys-color-neutral-95);
  border-radius: var(--sys-radius-full);
}

.chip-group-scrollable::-webkit-scrollbar-thumb {
  background: var(--sys-color-neutral-80);
  border-radius: var(--sys-radius-full);
}

.chip-group-scrollable .chip {
  flex-shrink: 0;
}
```

## States

### Default State
```css
.chip {
  background-color: var(--sys-chip-background);
  border: var(--sys-chip-border);
  box-shadow: var(--sys-chip-elevation);
}

.chip-label {
  color: var(--sys-chip-label-color);
}

.chip-icon {
  color: var(--sys-chip-icon-color);
}
```

### Hover State
```css
.chip:hover {
  background-color: var(--sys-chip-hover-background);
  box-shadow: var(--sys-chip-hover-elevation);
}

.chip:hover .chip-label {
  color: var(--sys-chip-label-color);
}

.chip:hover .chip-icon {
  color: var(--sys-chip-icon-hover-color);
}
```

### Focus State
```css
.chip:focus-visible {
  outline: var(--sys-chip-focus-outline);
  outline-offset: var(--sys-chip-focus-outline-offset);
}

.chip-input-remove:focus-visible {
  outline: var(--sys-chip-focus-outline);
  outline-offset: 1px;
}
```

### Selected State
```css
.chip.selected {
  background-color: var(--sys-chip-selected-background);
  border: var(--sys-chip-border-selected);
}

.chip.selected .chip-label {
  color: var(--sys-chip-label-selected-color);
}

.chip.selected .chip-icon {
  color: var(--sys-chip-icon-selected-color);
}

.chip-filter.selected .chip-filter-selection {
  opacity: 1;
}
```

### Disabled State
```css
.chip.disabled {
  background-color: var(--sys-chip-disabled-background);
  opacity: var(--sys-chip-disabled-opacity);
  cursor: var(--sys-chip-disabled-cursor);
  pointer-events: none;
}

.chip.disabled .chip-label {
  color: var(--sys-chip-label-disabled-color);
}

.chip.disabled .chip-icon {
  color: var(--sys-chip-icon-disabled-color);
}
```

### Loading State
```css
.chip.loading {
  pointer-events: none;
  position: relative;
  overflow: hidden;
}

.chip.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.chip.loading .chip-label,
.chip.loading .chip-icon {
  opacity: 0.7;
}
```

### Error State
```css
.chip.error {
  border-color: var(--sys-color-roles-error-color-role-error-role);
  background-color: var(--sys-color-roles-error-color-role-error-role-container);
}

.chip.error .chip-label {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.chip.error .chip-icon {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.chip.error::before {
  content: '!';
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: white;
  border-radius: 50%;
  font-size: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Input chip -->
<div class="chip chip-input" role="listitem">
  <span class="chip-input-avatar">JS</span>
  <span class="chip-label">JavaScript</span>
  <button class="chip-input-remove" aria-label="Remove JavaScript">
    ×
  </button>
</div>

<!-- Choice chip group -->
<div class="chip-group chip-group-choice" role="listbox" aria-label="Content types">
  <button class="chip chip-choice" role="option" aria-selected="true">
    <span class="chip-icon">📝</span>
    <span class="chip-label">Article</span>
  </button>
  <button class="chip chip-choice" role="option" aria-selected="false">
    <span class="chip-icon">📊</span>
    <span class="chip-label">Report</span>
  </button>
</div>

<!-- Filter chip group -->
<div class="chip-group chip-group-filter" role="group" aria-label="Content filters">
  <button class="chip chip-filter" role="checkbox" aria-checked="true">
    <span class="chip-filter-selection">
      <span class="chip-filter-selection-icon">✓</span>
    </span>
    <span class="chip-label">Published</span>
  </button>
</div>

<!-- Action chip -->
<button class="chip chip-action" role="button" aria-label="Generate content">
  <span class="chip-icon">⚡</span>
  <span class="chip-label">Generate</span>
</button>

<!-- Assist chip -->
<button class="chip chip-assist" role="button" aria-label="AI suggestion: Try blog outline">
  <span class="chip-icon">🤖</span>
  <span class="chip-label">Try: Blog Outline</span>
  <span class="chip-assist-badge" aria-hidden="true">AI</span>
</button>
```

### Keyboard Navigation
```css
.chip:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

.chip-input-remove:focus-visible {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 1px;
}

/* Focus management for chip groups */
.chip-group[role="listbox"] .chip:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
  z-index: 1;
}
```

### Screen Reader Support
```css
/* Hide decorative icons from screen readers */
.chip-icon[aria-hidden="true"] {
  /* Icons are decorative */
}

/* Ensure selected state is announced */
.chip[aria-selected="true"],
.chip[aria-checked="true"] {
  /* Screen readers will announce selected/checked state */
}

/* Provide context for chip groups */
.chip-group[role="listbox"],
.chip-group[role="group"] {
  /* Screen readers understand listbox/group semantics */
}
```

### Keyboard Interactions
```javascript
// Example: Keyboard navigation for chip groups
function handleChipGroupKeydown(event) {
  const chips = Array.from(event.currentTarget.querySelectorAll('.chip'));
  const currentIndex = chips.indexOf(document.activeElement);
  
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % chips.length;
      chips[nextIndex].focus();
      break;
      
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + chips.length) % chips.length;
      chips[prevIndex].focus();
      break;
      
    case 'Home':
      event.preventDefault();
      chips[0].focus();
      break;
      
    case 'End':
      event.preventDefault();
      chips[chips.length - 1].focus();
      break;
      
    case 'Enter':
    case ' ':
      if (event.currentTarget.hasAttribute('data-single-select')) {
        // For single-select chips, deselect others
        chips.forEach(chip => {
          chip.setAttribute('aria-selected', 'false');
          chip.classList.remove('selected');
        });
      }
      break;
      
    case 'Delete':
    case 'Backspace':
      if (event.target.classList.contains('chip-input')) {
        event.preventDefault();
        removeChip(event.target);
      }
      break;
  }
}

// Example: Input chip removal
function handleInputChipKeydown(event) {
  if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();
    const chip = event.target.closest('.chip-input');
    if (chip) {
      removeChip(chip);
    }
  }
}

// Example: Chip selection toggle
function toggleChipSelection(chip) {
  const isSelected = chip.getAttribute('aria-selected') === 'true' ||
                    chip.getAttribute('aria-checked') === 'true';
  
  if (chip.classList.contains('chip-choice')) {
    chip.setAttribute('aria-selected', !isSelected);
    chip.classList.toggle('selected');
  } else if (chip.classList.contains('chip-filter')) {
    chip.setAttribute('aria-checked', !isSelected);
    chip.classList.toggle('selected');
  }
  
  // Trigger change event
  const event = new CustomEvent('chipChange', {
    detail: {
      chip: chip,
      selected: !isSelected,
      value: chip.dataset.value
    }
  });
  chip.dispatchEvent(event);
}
```

## Chips in AI Interfaces

### Content Category Chips
```css
.chip-category {
  border-left: 3px solid var(--sys-color-primary-40);
}

.chip-category-article {
  border-left-color: var(--sys-color-roles-success-color-role-success-role);
}

.chip-category-report {
  border-left-color: var(--sys-color-roles-info-color-role-info-role);
}

.chip-category-social {
  border-left-color: var(--sys-color-roles-warning-color-role-warning-role);
}

.chip-category-marketing {
  border-left-color: var(--sys-color-roles-error-color-role-error-role);
}

.chip-category-count {
  margin-left: var(--sys-spacing-xs);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  background-color: var(--sys-color-neutral-90);
  padding: 0 var(--sys-spacing-xs);
  border-radius: var(--sys-radius-sm);
}
```

### AI Model Chips
```css
.chip-model {
  padding-right: calc(var(--sys-spacing-md) * 2);
  position: relative;
}

.chip-model-icon {
  width: 24px;
  height: 24px;
  background-color: var(--sys-color-primary-95);
  border-radius: var(--sys-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-primary-40);
}

.chip-model-info {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

.chip-model-name {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-10);
}

.chip-model-stats {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  display: flex;
  gap: var(--sys-spacing-sm);
}

.chip-model-status {
  position: absolute;
  top: var(--sys-spacing-xs);
  right: var(--sys-spacing-xs);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--sys-color-roles-success-color-role-success-role);
}

.chip-model-status.offline {
  background-color: var(--sys-color-neutral-60);
}

.chip-model-status.loading {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
  animation: pulse 1s infinite;
}
```

### Tone/Voice Chips
```css
.chip-tone {
  min-width: 80px;
  text-align: center;
  border-width: 2px;
}

.chip-tone-formal {
  border-color: var(--sys-color-primary-60);
  background-color: var(--sys-color-primary-98);
}

.chip-tone-casual {
  border-color: var(--sys-color-roles-success-color-role-success-role);
  background-color: var(--sys-color-roles-success-color-role-success-role-container);
}

.chip-tone-professional {
  border-color: var(--sys-color-roles-info-color-role-info-role);
  background-color: var(--sys-color-roles-info-color-role-info-role-container);
}

.chip-tone-creative {
  border-color: var(--sys-color-roles-warning-color-role-warning-role);
  background-color: var(--sys-color-roles-warning-color-role-warning-role-container);
}

.chip-tone.selected {
  transform: scale(1.05);
  box-shadow: var(--sys-elevation-2);
}
```

### Language Chips
```css
.chip-language {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
}

.chip-language-flag {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
}

.chip-language-code {
  margin-left: auto;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  background-color: var(--sys-color-neutral-95);
  padding: 1px var(--sys-spacing-xs);
  border-radius: var(--sys-radius-xs);
}
```

### Template Chips
```css
.chip-template {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  min-width: 180px;
}

.chip-template-icon {
  width: 32px;
  height: 32px;
  background-color: var(--sys-color-primary-95);
  border-radius: var(--sys-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-primary-40);
  flex-shrink: 0;
}

.chip-template-info {
  flex: 1;
  min-width: 0;
}

.chip-template-name {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-10);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-template-stats {
  display: flex;
  gap: var(--sys-spacing-sm);
  margin-top: var(--sys-spacing-xs);
}

.chip-template-stat {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.chip-template-stat-icon {
  width: 12px;
  height: 12px;
  color: inherit;
}
```

### AI Suggestion Chips
```css
.chip-suggestion {
  background: linear-gradient(135deg, 
    var(--sys-color-primary-95) 0%,
    var(--sys-color-secondary-95) 100%
  );
  border: 1px dashed var(--sys-color-primary-60);
  animation: suggestion-pulse 3s ease-in-out infinite;
}

@keyframes suggestion-pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.9;
    transform: scale(1.02);
  }
}

.chip-suggestion-ai {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
}

.chip-suggestion-ai-icon {
  width: 16px;
  height: 16px;
  color: var(--sys-color-primary-40);
  animation: ai-bounce 2s infinite;
}

@keyframes ai-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

.chip-suggestion-content {
  flex: 1;
}

.chip-suggestion-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-bold-font-weight);
  color: var(--sys-color-neutral-10);
}

.chip-suggestion-description {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  margin-top: var(--sys-spacing-xs);
}

.chip-suggestion-confidence {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  background-color: var(--sys-color-neutral-95);
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  border-radius: var(--sys-radius-full);
  margin-left: var(--sys-spacing-sm);
}
```

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .chip {
    height: 36px;
    padding: 0 var(--sys-spacing-sm);
    font-size: var(--sys-typography-label-medium-font-size);
  }
  
  .chip-icon {
    width: 16px;
    height: 16px;
  }
  
  .chip-group {
    gap: var(--sys-spacing-xs);
  }
  
  .chip-group-scrollable {
    padding: var(--sys-spacing-xs) 0;
  }
  
  .chip-template {
    min-width: 150px;
    padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  }
  
  .chip-template-icon {
    width: 24px;
    height: 24px;
  }
  
  .chip-suggestion {
    min-width: 100%;
    margin: var(--sys-spacing-xs) 0;
  }
  
  /* Stack chip groups on small screens */
  .chip-group-stackable {
    flex-direction: column;
    align-items: stretch;
  }
  
  .chip-group-stackable .chip {
    width: 100%;
    justify-content: center;
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .chip {
    height: 32px;
    padding: 0 var(--sys-spacing-md);
  }
  
  .chip-group {
    gap: var(--sys-spacing-sm);
  }
  
  .chip-template {
    min-width: 160px;
  }
  
  .chip-suggestion {
    max-width: 300px;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .chip {
    height: 32px;
    padding: 0 var(--sys-spacing-md);
  }
  
  .chip-group {
    gap: var(--sys-spacing-md);
  }
  
  .chip-template {
    min-width: 180px;
  }
  
  .chip-suggestion {
    max-width: 350px;
  }
  
  /* Hover effects only on desktop */
  .chip:hover {
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
  
  .chip:active {
    transform: translateY(0);
  }
}
```

## Best Practices

### ✅ Do
- Use input chips for tags and user-generated content
- Use choice chips for single selection from related options
- Use filter chips for multiple selection filtering
- Use action chips for quick actions and operations
- Use assist chips for AI suggestions and recommendations
- Group related chips together with clear labels
- Provide clear visual feedback for all interactions
- Ensure adequate touch targets (minimum 44×44px on mobile)
- Support keyboard navigation for all chip types
- Provide ARIA labels for screen readers
- Handle loading and error states gracefully
- Use appropriate chip type for the context
- Limit the number of chips in a group (max 10-12 visible)
- Provide a way to remove or clear selected chips
- Test with screen readers and keyboard-only users

### ❌ Don't
- Don't use chips for primary actions (use buttons instead)
- Don't overload interfaces with too many chips
- Don't use ambiguous icons without text labels
- Don't forget to handle focus management in chip groups
- Don't use chips for hierarchical navigation (use tabs or breadcrumbs)
- Don't ignore mobile touch targets
- Don't create chips with too long text (truncate with ellipsis)
- Don't use custom chips without proper accessibility support
- Don't auto-select chips without user confirmation
- Don't forget to handle chip removal confirmation for important data
- Don't neglect error states for chip operations
- Don't use chips for binary choices (use toggle/checkbox)

## Testing and Validation

### Visual Testing
1. **States**: Test default, hover, focus, selected, disabled, loading, error states
2. **Types**: Test all chip types (input, choice, filter, action, assist)
3. **Groups**: Test chip group behavior and selection
4. **Responsive**: Test across all breakpoints
5. **Animations**: Test selection, removal, and loading animations
6. **Overflow**: Test with long text and many chips
7. **Accessibility**: Test color contrast and focus indicators
8. **Performance**: Test rendering performance with many chips

### Functional Testing
```javascript
// Example: Chip selection test
describe('Chip System', () => {
  test('Choice chip can be selected', () => {
    const chip = document.querySelector('.chip-choice');
    chip.click();
    expect(chip.classList.contains('selected')).toBe(true);
    expect(chip.getAttribute('aria-selected')).toBe('true');
  });
  
  test('Filter chip toggles selection', () => {
    const chip = document.querySelector('.chip-filter');
    const initialSelected = chip.classList.contains('selected');
    chip.click();
    expect(chip.classList.contains('selected')).toBe(!initialSelected);
    expect(chip.getAttribute('aria-checked')).toBe(!initialSelected ? 'true' : 'false');
  });
  
  test('Input chip can be removed', () => {
    const chip = document.querySelector('.chip-input');
    const removeButton = chip.querySelector('.chip-input-remove');
    const removeHandler = jest.fn();
    chip.addEventListener('remove', removeHandler);
    removeButton.click();
    expect(removeHandler).toHaveBeenCalled();
  });
  
  test('Chip group single selection works', () => {
    const chipGroup = document.querySelector('[data-single-select]');
    const chips = chipGroup.querySelectorAll('.chip-choice');
    chips[0].click();
    chips[1].click();
    expect(chips[0].classList.contains('selected')).toBe(false);
    expect(chips[1].classList.contains('selected')).toBe(true);
    expect(chips[0].getAttribute('aria-selected')).toBe('false');
    expect(chips[1].getAttribute('aria-selected')).toBe('true');
  });
  
  test('Keyboard navigation works', () => {
    const chipGroup = document.querySelector('.chip-group');
    const chips = chipGroup.querySelectorAll('.chip');
    chips[0].focus();
    fireEvent.keyDown(chips[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[1]);
  });
  
  test('Action chip triggers action', () => {
    const chip = document.querySelector('.chip-action');
    const clickHandler = jest.fn();
    chip.addEventListener('click', clickHandler);
    chip.click();
    expect(clickHandler).toHaveBeenCalled();
  });
  
  test('Assist chip shows AI badge', () => {
    const chip = document.querySelector('.chip-assist');
    const badge = chip.querySelector('.chip-assist-badge');
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe('AI');
  });
});

// Example: Chip state management test
describe('Chip State Management', () => {
  let chipManager;
  
  beforeEach(() => {
    chipManager = new ChipManager();
  });
  
  test('Adds input chip', () => {
    const chip = chipManager.addInputChip('JavaScript', 'js');
    expect(chip).toBeDefined();
    expect(chip.value).toBe('js');
    expect(chip.label).toBe('JavaScript');
  });
  
  test('Removes input chip', () => {
    const chip = chipManager.addInputChip('JavaScript', 'js');
    chipManager.removeChip(chip.id);
    expect(chipManager.getChips()).not.toContain(chip);
  });
  
  test('Filters chips by selection', () => {
    const chip1 = chipManager.addFilterChip('Published', 'published', true);
    const chip2 = chipManager.addFilterChip('Draft', 'draft', false);
    const selected = chipManager.getSelectedChips();
    expect(selected).toContain(chip1);
    expect(selected).not.toContain(chip2);
  });
  
  test('Updates chip state', () => {
    const chip = chipManager.addChoiceChip('Article', 'article', false);
    chipManager.updateChipState(chip.id, { selected: true });
    expect(chip.selected).toBe(true);
  });
  
  test('Handles chip events', () => {
    const handler = jest.fn();
    chipManager.on('chipChange', handler);
    
    const chip = chipManager.addChoiceChip('Article', 'article', false);
    chipManager.toggleChipSelection(chip.id);
    
    expect(handler).toHaveBeenCalledWith({
      chipId: chip.id,
      selected: true,
      value: 'article'
    });
  });
});
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for chip styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/radius.md` - Radius tokens reference
- `skills/component-specification.md` - Component specifications

### Chip Component Files
- `chips.css` - Chip styles (if separated)
- `chips.js` - Chip logic and behavior
- `chips.stories.js` - Storybook stories (if using Storybook)

### Integration Files
- `chip-manager.js` - Chip state management
- `chip-events.js` - Chip event handling

## Integration with AI Systems

### Content Tagging System
```javascript
// Example: AI content tagging with chips
class ContentTaggingSystem {
  constructor() {
    this.tags = new Set();
    this.suggestedTags = [];
    this.categoryChips = new Map();
  }
  
  addTag(tag, category = 'general') {
    this.tags.add(tag);
    
    // Create or update category chip
    if (!this.categoryChips.has(category)) {
      this.categoryChips.set(category, {
        name: category,
        tags: new Set(),
        chip: this.createCategoryChip(category)
      });
    }
    
    this.categoryChips.get(category).tags.add(tag);
    this.updateCategoryChip(category);
    
    // Create tag chip
    const tagChip = this.createTagChip(tag, category);
    this.renderTagChip(tagChip);
    
    // Update AI model with new tags
    this.updateAITaggingModel(tag, category);
  }
  
  createCategoryChip(category) {
    return {
      type: 'filter',
      label: this.formatCategoryName(category),
      value: category,
      selected: true,
      count: 0,
      onToggle: (selected) => {
        this.toggleCategoryVisibility(category, selected);
      }
    };
  }
  
  createTagChip(tag, category) {
    return {
      type: 'input',
      label: tag,
      value: tag,
      category: category,
      avatar: this.generateTagAvatar(tag),
      onRemove: () => {
        this.removeTag(tag, category);
      },
      onClick: () => {
        this.filterByTag(tag);
      }
    };
  }
  
  generateTagAvatar(tag) {
    // Generate avatar based on tag
    return tag.substring(0, 2).toUpperCase();
  }
  
  suggestTags(content, context) {
    // Call AI service to suggest tags
    return this.aiService.suggestTags({
      content: content,
      context: context,
      existingTags: Array.from(this.tags)
    }).then(suggestions => {
      this.suggestedTags = suggestions;
      this.renderSuggestedTags();
    });
  }
  
  renderSuggestedTags() {
    const suggestions = this.suggestedTags.map(suggestion => ({
      type: 'assist',
      label: suggestion.tag,
      confidence: suggestion.confidence,
      reason: suggestion.reason,
      onClick: () => {
        this.addTag(suggestion.tag, suggestion.category);
        this.removeSuggestion(suggestion);
      },
      onDismiss: () => {
        this.removeSuggestion(suggestion);
      }
    }));
    
    this.renderChips(suggestions, 'suggestions-container');
  }
  
  removeSuggestion(suggestion) {
    this.suggestedTags = this.suggestedTags.filter(s => s !== suggestion);
    this.renderSuggestedTags();
  }
  
  updateCategoryChip(category) {
    const categoryData = this.categoryChips.get(category);
    if (categoryData) {
      categoryData.chip.count = categoryData.tags.size;
      this.renderCategoryChips();
    }
  }
  
  renderCategoryChips() {
    const categoryChips = Array.from(this.categoryChips.values())
      .map(data => data.chip);
    
    this.renderChips(categoryChips, 'categories-container');
  }
  
  renderChips(chips, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    chips.forEach(chipConfig => {
      const chipElement = this.createChipElement(chipConfig);
      container.appendChild(chipElement);
    });
  }
  
  createChipElement(config) {
    const chip = document.createElement('div');
    chip.className = `chip chip-${config.type}`;
    chip.dataset.value = config.value;
    
    if (config.selected) {
      chip.classList.add('selected');
    }
    
    // Add chip content based on type
    switch (config.type) {
      case 'input':
        chip.innerHTML = `
          <span class="chip-input-avatar">${config.avatar}</span>
          <span class="chip-label">${config.label}</span>
          <button class="chip-input-remove" aria-label="Remove ${config.label}">×</button>
        `;
        break;
      case 'filter':
        chip.innerHTML = `
          <span class="chip-filter-selection">
            <span class="chip-filter-selection-icon">✓</span>
          </span>
          <span class="chip-label">${config.label}</span>
          ${config.count ? `<span class="chip-category-count">${config.count}</span>` : ''}
        `;
        break;
      case 'assist':
        chip.innerHTML = `
          <span class="chip-icon">🤖</span>
          <span class="chip-label">${config.label}</span>
          <span class="chip-assist-badge">AI</span>
          ${config.confidence ? `<span class="chip-suggestion-confidence">${Math.round(config.confidence * 100)}%</span>` : ''}
        `;
        break;
    }
    
    // Add event listeners
    chip.addEventListener('click', () => {
      if (config.onClick) config.onClick();
    });
    
    if (config.type === 'input') {
      const removeBtn = chip.querySelector('.chip-input-remove');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (config.onRemove) config.onRemove();
      });
    }
    
    return chip;
  }
}

// Example usage
const taggingSystem = new ContentTaggingSystem();

// Add initial tags
taggingSystem.addTag('JavaScript', 'technology');
taggingSystem.addTag('React', 'framework');
taggingSystem.addTag('TypeScript', 'language');

// Get AI suggestions for content
taggingSystem.suggestTags(
  'Building modern web applications with React and TypeScript',
  { type: 'article', audience: 'developers' }
).then(() => {
  console.log('AI suggestions loaded');
});
```

### Content Filtering System
```javascript
// Example: AI content filtering with chips
class ContentFilteringSystem {
  constructor() {
    this.filters = new Map();
    this.activeFilters = new Set();
    this.filterGroups = new Map();
  }
  
  registerFilter(group, filter) {
    if (!this.filterGroups.has(group)) {
      this.filterGroups.set(group, {
        name: group,
        filters: new Map(),
        multiSelect: filter.multiSelect || false
      });
    }
    
    const groupData = this.filterGroups.get(group);
    groupData.filters.set(filter.id, {
      ...filter,
      selected: false,
      chip: this.createFilterChip(filter, group)
    });
    
    this.renderFilterGroup(group);
  }
  
  createFilterChip(filter, group) {
    return {
      type: 'filter',
      label: filter.label,
      value: filter.id,
      selected: false,
      group: group,
      count: filter.count || 0,
      onToggle: (selected) => {
        this.toggleFilter(filter.id, group, selected);
      }
    };
  }
  
  toggleFilter(filterId, group, selected) {
    const groupData = this.filterGroups.get(group);
    if (!groupData) return;
    
    const filter = groupData.filters.get(filterId);
    if (!filter) return;
    
    // Handle single-select groups
    if (!groupData.multiSelect && selected) {
      // Deselect all other filters in this group
      groupData.filters.forEach((f, id) => {
        if (id !== filterId && f.selected) {
          f.selected = false;
          f.chip.selected = false;
        }
      });
    }
    
    filter.selected = selected;
    filter.chip.selected = selected;
    
    // Update active filters
    if (selected) {
      this.activeFilters.add(filterId);
    } else {
      this.activeFilters.delete(filterId);
    }
    
    // Apply filters to content
    this.applyFilters();
    
    // Render updated chips
    this.renderFilterGroup(group);
  }
  
  applyFilters() {
    const filterCriteria = this.buildFilterCriteria();
    this.filterContent(filterCriteria);
  }
  
  buildFilterCriteria() {
    const criteria = {};
    
    this.filterGroups.forEach((groupData, groupName) => {
      const selectedFilters = Array.from(groupData.filters.values())
        .filter(f => f.selected)
        .map(f => f.value);
      
      if (selectedFilters.length > 0) {
        criteria[groupName] = groupData.multiSelect ? 
          selectedFilters : selectedFilters[0];
      }
    });
    
    return criteria;
  }
  
  filterContent(criteria) {
    // Call AI/content service with filter criteria
    this.contentService.filter(criteria).then(results => {
      this.updateContentDisplay(results);
      this.updateFilterCounts(results);
    });
  }
  
  updateFilterCounts(contentResults) {
    // Update filter counts based on current content
    this.filterGroups.forEach((groupData, groupName) => {
      groupData.filters.forEach((filter, filterId) => {
        const count = this.countContentForFilter(filterId, contentResults);
        filter.count = count;
        filter.chip.count = count;
      });
    });
    
    // Re-render all filter groups
    this.filterGroups.forEach((groupData, groupName) => {
      this.renderFilterGroup(groupName);
    });
  }
  
  countContentForFilter(filterId, contentResults) {
    // Count how many items match this filter
    return contentResults.filter(item => 
      this.itemMatchesFilter(item, filterId)
    ).length;
  }
  
  itemMatchesFilter(item, filterId) {
    // Check if item matches the filter
    // This would be implemented based on your data structure
    return true;
  }
  
  renderFilterGroup(group) {
    const groupData = this.filterGroups.get(group);
    if (!groupData) return;
    
    const container = document.getElementById(`filter-group-${group}`);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Add group label
    const label = document.createElement('div');
    label.className = 'chip-group-label';
    label.textContent = groupData.name;
    container.appendChild(label);
    
    // Create chip group
    const chipGroup = document.createElement('div');
    chipGroup.className = `chip-group chip-group-filter ${!groupData.multiSelect ? 'single-select' : ''}`;
    chipGroup.dataset.group = group;
    
    // Add chips
    Array.from(groupData.filters.values()).forEach(filter => {
      const chipElement = this.createFilterChipElement(filter.chip);
      chipGroup.appendChild(chipElement);
    });
    
    container.appendChild(chipGroup);
  }
  
  createFilterChipElement(chipConfig) {
    const chip = document.createElement('button');
    chip.className = `chip chip-filter ${chipConfig.selected ? 'selected' : ''}`;
    chip.dataset.value = chipConfig.value;
    chip.dataset.group = chipConfig.group;
    chip.setAttribute('role', 'checkbox');
    chip.setAttribute('aria-checked', chipConfig.selected);
    
    chip.innerHTML = `
      <span class="chip-filter-selection">
        <span class="chip-filter-selection-icon">✓</span>
      </span>
      <span class="chip-label">${chipConfig.label}</span>
      ${chipConfig.count ? `<span class="chip-category-count">${chipConfig.count}</span>` : ''}
    `;
    
    chip.addEventListener('click', () => {
      chipConfig.onToggle(!chipConfig.selected);
    });
    
    return chip;
  }
}

// Example usage
const filteringSystem = new ContentFilteringSystem();

// Register content type filters (single-select)
filteringSystem.registerFilter('content-type', {
  id: 'article',
  label: 'Articles',
  multiSelect: false
});

filteringSystem.registerFilter('content-type', {
  id: 'blog-post',
  label: 'Blog Posts',
  multiSelect: false
});

// Register status filters (multi-select)
filteringSystem.registerFilter('status', {
  id: 'published',
  label: 'Published',
  multiSelect: true
});

filteringSystem.registerFilter('status', {
  id: 'draft',
  label: 'Drafts',
  multiSelect: true
});

// Register AI model filters
filteringSystem.registerFilter('ai-model', {
  id: 'gpt-4',
  label: 'GPT-4',
  multiSelect: true
});

filteringSystem.registerFilter('ai-model', {
  id: 'claude',
  label: 'Claude',
  multiSelect: true
});
```

### AI Recommendation System
```javascript
// Example: AI recommendation chips
class AIRecommendationSystem {
  constructor() {
    this.recommendations = new Map();
    this.userPreferences = new Set();
    this.contextHistory = [];
  }
  
  analyzeContext(content, metadata) {
    // Analyze content and metadata for recommendations
    return this.aiService.analyze({
      content: content,
      metadata: metadata,
      userPreferences: Array.from(this.userPreferences),
      history: this.contextHistory
    }).then(analysis => {
      this.generateRecommendations(analysis);
      return analysis;
    });
  }
  
  generateRecommendations(analysis) {
    const recommendations = [];
    
    // Content type recommendations
    if (analysis.suggestedContentTypes) {
      recommendations.push(...this.createContentTypeRecommendations(
        analysis.suggestedContentTypes
      ));
    }
    
    // Tone/style recommendations
    if (analysis.suggestedTones) {
      recommendations.push(...this.createToneRecommendations(
        analysis.suggestedTones
      ));
    }
    
    // Template recommendations
    if (analysis.suggestedTemplates) {
      recommendations.push(...this.createTemplateRecommendations(
        analysis.suggestedTemplates
      ));
    }
    
    // Tag recommendations
    if (analysis.suggestedTags) {
      recommendations.push(...this.createTagRecommendations(
        analysis.suggestedTags
      ));
    }
    
    // Update recommendations
    this.recommendations = new Map(
      recommendations.map(rec => [rec.id, rec])
    );
    
    // Render recommendations
    this.renderRecommendations();
  }
  
  createContentTypeRecommendations(contentTypes) {
    return contentTypes.map((type, index) => ({
      id: `content-type-${index}`,
      type: 'assist',
      label: type.name,
      confidence: type.confidence,
      category: 'content-type',
      action: () => {
        this.applyContentType(type.id);
      },
      icon: this.getContentTypeIcon(type.id)
    }));
  }
  
  createToneRecommendations(tones) {
    return tones.map((tone, index) => ({
      id: `tone-${index}`,
      type: 'choice',
      label: tone.name,
      confidence: tone.confidence,
      category: 'tone',
      action: () => {
        this.applyTone(tone.id);
      },
      style: this.getToneStyle(tone.id)
    }));
  }
  
  createTemplateRecommendations(templates) {
    return templates.map((template, index) => ({
      id: `template-${index}`,
      type: 'action',
      label: template.name,
      confidence: template.confidence,
      category: 'template',
      action: () => {
        this.applyTemplate(template.id);
      },
      icon: template.icon,
      stats: {
        usage: template.usageCount,
        rating: template.rating
      }
    }));
  }
  
  createTagRecommendations(tags) {
    return tags.map((tag, index) => ({
      id: `tag-${index}`,
      type: 'input',
      label: tag.name,
      confidence: tag.confidence,
      category: 'tag',
      action: () => {
        this.addTag(tag.name);
      },
      reason: tag.reason
    }));
  }
  
  renderRecommendations() {
    const container = document.getElementById('ai-recommendations');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Group recommendations by category
    const byCategory = new Map();
    Array.from(this.recommendations.values()).forEach(rec => {
      if (!byCategory.has(rec.category)) {
        byCategory.set(rec.category, []);
      }
      byCategory.get(rec.category).push(rec);
    });
    
    // Render each category
    byCategory.forEach((recommendations, category) => {
      const categorySection = this.createCategorySection(
        category,
        recommendations
      );
      container.appendChild(categorySection);
    });
  }
  
  createCategorySection(category, recommendations) {
    const section = document.createElement('div');
    section.className = 'recommendation-category';
    
    // Category header
    const header = document.createElement('div');
    header.className = 'recommendation-category-header';
    header.innerHTML = `
      <h3>${this.formatCategoryName(category)}</h3>
      <span class="recommendation-count">${recommendations.length} suggestions</span>
    `;
    section.appendChild(header);
    
    // Recommendation chips
    const chipGroup = document.createElement('div');
    chipGroup.className = 'chip-group chip-group-scrollable';
    
    recommendations.forEach(rec => {
      const chip = this.createRecommendationChip(rec);
      chipGroup.appendChild(chip);
    });
    
    section.appendChild(chipGroup);
    return section;
  }
  
  createRecommendationChip(recommendation) {
    const chip = document.createElement('button');
    chip.className = `chip chip-${recommendation.type} chip-recommendation`;
    chip.dataset.id = recommendation.id;
    chip.dataset.confidence = recommendation.confidence;
    
    // Add confidence indicator
    if (recommendation.confidence > 0.8) {
      chip.classList.add('high-confidence');
    } else if (recommendation.confidence > 0.6) {
      chip.classList.add('medium-confidence');
    } else {
      chip.classList.add('low-confidence');
    }
    
    // Build chip content based on type
    let content = '';
    
    switch (recommendation.type) {
      case 'assist':
        content = `
          <span class="chip-icon">${recommendation.icon || '💡'}</span>
          <span class="chip-label">${recommendation.label}</span>
          <span class="chip-assist-badge">AI</span>
          <span class="chip-confidence">${Math.round(recommendation.confidence * 100)}%</span>
        `;
        break;
        
      case 'choice':
        content = `
          <span class="chip-label">${recommendation.label}</span>
          ${recommendation.style ? `<span class="chip-tone-indicator" style="${recommendation.style}"></span>` : ''}
        `;
        break;
        
      case 'action':
        content = `
          <span class="chip-icon">${recommendation.icon || '⚡'}</span>
          <span class="chip-label">${recommendation.label}</span>
          ${recommendation.stats ? `
            <span class="chip-stats">
              <span class="chip-stat">${recommendation.stats.usage} uses</span>
              <span class="chip-stat">${recommendation.stats.rating}★</span>
            </span>
          ` : ''}
        `;
        break;
        
      case 'input':
        content = `
          <span class="chip-label">${recommendation.label}</span>
          ${recommendation.reason ? `
            <span class="chip-reason" title="${recommendation.reason}">?</span>
          ` : ''}
        `;
        break;
    }
    
    chip.innerHTML = content;
    
    // Add click handler
    chip.addEventListener('click', () => {
      recommendation.action();
      this.trackRecommendationUsage(recommendation.id);
    });
    
    return chip;
  }
  
  trackRecommendationUsage(recommendationId) {
    const recommendation = this.recommendations.get(recommendationId);
    if (recommendation) {
      // Send usage data to AI service
      this.aiService.trackRecommendationUsage({
        recommendationId: recommendationId,
        category: recommendation.category,
        confidence: recommendation.confidence,
        timestamp: Date.now()
      });
      
      // Update user preferences
      this.userPreferences.add(recommendation.category);
    }
  }
  
  formatCategoryName(category) {
    return category.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  getContentTypeIcon(typeId) {
    const icons = {
      'article': '📝',
      'blog-post': '📖',
      'social-media': '💬',
      'email': '📧',
      'ad-copy': '📢'
    };
    return icons[typeId] || '📄';
  }
  
  getToneStyle(toneId) {
    const styles = {
      'formal': 'border-color: var(--sys-color-primary-60)',
      'casual': 'border-color: var(--sys-color-roles-success-color-role-success-role)',
      'professional': 'border-color: var(--sys-color-roles-info-color-role-info-role)',
      'creative': 'border-color: var(--sys-color-roles-warning-color-role-warning-role)'
    };
    return styles[toneId] || '';
  }
}

// Example usage
const recommendationSystem = new AIRecommendationSystem();

// Analyze content for recommendations
recommendationSystem.analyzeContext(
  'How to build a modern web application with React',
  { type: 'tutorial', audience: 'developers' }
).then(analysis => {
  console.log('Analysis complete, recommendations generated');
});
```

---

*This chips system ensures consistent, accessible, and user-friendly chip components across ContentSplit. All chip components should follow Material Design 3 guidelines and use the design token system for styling.*