# ContentSplit Tooltip System

## Overview

The ContentSplit Tooltip System follows Google Material Design 3 guidelines for tooltip components. Tooltips provide contextual information about UI elements, helping users understand features, parameters, and functionality within the AI content generation platform.

## Material Design 3 Tooltip Principles

### Core Principles
1. **Contextual**: Provide relevant information about the element being hovered
2. **Concise**: Deliver information succinctly and clearly
3. **Timely**: Appear after a short delay and disappear appropriately
4. **Accessible**: Support keyboard navigation and screen readers
5. **Unobtrusive**: Do not block content or interfere with interaction

## Tooltip Types (Material Design 3)

### 1. Plain Tooltip
Basic tooltip with text content only.

**Usage:** Simple descriptions, field explanations
**Components:** Text content, arrow pointer
**Position:** Top, bottom, left, right, auto
**Delay:** 300ms show, 0ms hide

### 2. Rich Tooltip
Tooltip with formatted content (headings, paragraphs, lists).

**Usage:** Detailed explanations, feature descriptions
**Components:** Title, description, optional actions
**Position:** Top, bottom, left, right
**Delay:** 300ms show, 100ms hide

### 3. Interactive Tooltip
Tooltip that contains interactive elements.

**Usage:** Complex features requiring user input
**Components:** Interactive controls, buttons, forms
**Position:** Top, bottom, left, right
**Delay:** 0ms show, 300ms hide (to allow interaction)

### 4. Teaching Tooltip
Tooltip for onboarding and feature discovery.

**Usage:** New features, tutorials, walkthroughs
**Components:** Step indicator, navigation buttons, dismiss option
**Position:** Centered or positioned relative to target
**Delay:** Configurable based on context

### 5. Error Tooltip
Tooltip for displaying validation errors.

**Usage:** Form validation, error explanations
**Components:** Error message, optional icon
**Position:** Top, bottom (usually follows input field)
**Delay:** 0ms show, 0ms hide

## Anatomy

### Plain Tooltip Anatomy
```
      ┌─────────────────────────────┐
      │  Tooltip text content       │
      └─────────────────────────────┘
                ▲
                │
           [Pointer arrow]
                │
          [Target element]
```

### Rich Tooltip Anatomy
```
┌─────────────────────────────────────────┐
│  Title                                 │
├─────────────────────────────────────────┤
│  Description text that provides        │
│  detailed information about the        │
│  element or feature.                   │
│                                         │
│  • Bullet point 1                      │
│  • Bullet point 2                      │
├─────────────────────────────────────────┤
│  [Action button] [Action button]       │
└─────────────────────────────────────────┘
                ▲
                │
           [Pointer arrow]
```

### Interactive Tooltip Anatomy
```
┌─────────────────────────────────────────┐
│  Configure settings                    │
├─────────────────────────────────────────┤
│  ↕ Quality: Standard                   │
│  ↕ Length: Medium                      │
│  ↕ Tone: Professional                  │
├─────────────────────────────────────────┤
│  [Apply] [Cancel]                      │
└─────────────────────────────────────────┘
```

## Design Tokens

### Container Tokens
```css
/* Tooltip container styles */
--sys-tooltip-background: var(--sys-color-neutral-10);
--sys-tooltip-color: var(--sys-color-neutral-100);
--sys-tooltip-border-radius: var(--sys-radius-md);
--sys-tooltip-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
--sys-tooltip-max-width: 200px;
--sys-tooltip-min-width: 40px;
--sys-tooltip-elevation: var(--sys-elevation-3);
--sys-tooltip-z-index: 9999;
--sys-tooltip-font-family: var(--sys-typography-body-text-font-family);
--sys-tooltip-font-size: var(--sys-typography-body-text-font-size);
--sys-tooltip-line-height: var(--sys-typography-body-text-line-height);
```

### Arrow/Pointer Tokens
```css
/* Tooltip arrow styles */
--sys-tooltip-arrow-size: 8px;
--sys-tooltip-arrow-color: var(--sys-color-neutral-10);
--sys-tooltip-arrow-offset: 4px;
--sys-tooltip-arrow-border: none;

/* Arrow positions */
--sys-tooltip-arrow-top-transform: translateX(-50%);
--sys-tooltip-arrow-bottom-transform: translateX(-50%) rotate(180deg);
--sys-tooltip-arrow-left-transform: translateY(-50%) rotate(-90deg);
--sys-tooltip-arrow-right-transform: translateY(-50%) rotate(90deg);
```

### Rich Tooltip Tokens
```css
/* Rich tooltip specific */
--sys-tooltip-rich-background: var(--sys-color-neutral-100);
--sys-tooltip-rich-color: var(--sys-color-neutral-10);
--sys-tooltip-rich-border: 1px solid var(--sys-color-neutral-95);
--sys-tooltip-rich-max-width: 320px;
--sys-tooltip-rich-padding: var(--sys-spacing-md);
--sys-tooltip-rich-gap: var(--sys-spacing-sm);

/* Title styles */
--sys-tooltip-title-font-family: var(--sys-typography-title-small-font-family);
--sys-tooltip-title-font-size: var(--sys-typography-title-small-font-size);
--sys-tooltip-title-font-weight: var(--sys-typography-title-small-font-weight);
--sys-tooltip-title-color: var(--sys-color-neutral-10);
--sys-tooltip-title-margin: 0 0 var(--sys-spacing-xs) 0;

/* Description styles */
--sys-tooltip-description-font-family: var(--sys-typography-body-text-font-family);
--sys-tooltip-description-font-size: var(--sys-typography-body-text-font-size);
--sys-tooltip-description-color: var(--sys-color-neutral-30);
--sys-tooltip-description-margin: 0 0 var(--sys-spacing-sm) 0;

/* Action area styles */
--sys-tooltip-actions-gap: var(--sys-spacing-sm);
--sys-tooltip-actions-margin: var(--sys-spacing-sm) 0 0 0;
--sys-tooltip-actions-justify: flex-end;
```

### Interactive Tooltip Tokens
```css
/* Interactive tooltip specific */
--sys-tooltip-interactive-background: var(--sys-color-neutral-100);
--sys-tooltip-interactive-border: 1px solid var(--sys-color-neutral-95);
--sys-tooltip-interactive-max-width: 400px;
--sys-tooltip-interactive-padding: var(--sys-spacing-md);
--sys-tooltip-interactive-gap: var(--sys-spacing-md);

/* Form control styles */
--sys-tooltip-control-gap: var(--sys-spacing-sm);
--sys-tooltip-control-margin: var(--sys-spacing-sm) 0;
--sys-tooltip-control-label-font-family: var(--sys-typography-label-small-font-family);
--sys-tooltip-control-label-font-size: var(--sys-typography-label-small-font-size);
--sys-tooltip-control-label-color: var(--sys-color-neutral-30);

/* Button styles */
--sys-tooltip-button-gap: var(--sys-spacing-sm);
--sys-tooltip-button-justify: flex-end;
```

### Teaching Tooltip Tokens
```css
/* Teaching tooltip specific */
--sys-tooltip-teaching-background: var(--sys-color-primary-95);
--sys-tooltip-teaching-color: var(--sys-color-neutral-10);
--sys-tooltip-teaching-border: 2px solid var(--sys-color-primary-40);
--sys-tooltip-teaching-max-width: 360px;
--sys-tooltip-teaching-padding: var(--sys-spacing-lg);
--sys-tooltip-teaching-gap: var(--sys-spacing-md);

/* Step indicator styles */
--sys-tooltip-step-size: 24px;
--sys-tooltip-step-background: var(--sys-color-neutral-90);
--sys-tooltip-step-active-background: var(--sys-color-primary-40);
--sys-tooltip-step-color: var(--sys-color-neutral-60);
--sys-tooltip-step-active-color: var(--sys-color-neutral-100);
--sys-tooltip-step-gap: var(--sys-spacing-xs);
--sys-tooltip-step-margin: 0 0 var(--sys-spacing-md) 0;

/* Navigation styles */
--sys-tooltip-nav-gap: var(--sys-spacing-md);
--sys-tooltip-nav-justify: space-between;
--sys-tooltip-dismiss-color: var(--sys-color-neutral-60);
--sys-tooltip-dismiss-hover-color: var(--sys-color-neutral-30);
```

### Error Tooltip Tokens
```css
/* Error tooltip specific */
--sys-tooltip-error-background: var(--sys-color-roles-error-color-role-error-role-container);
--sys-tooltip-error-color: var(--sys-color-roles-error-color-role-error-role);
--sys-tooltip-error-border: 1px solid var(--sys-color-roles-error-color-role-error-role);
--sys-tooltip-error-max-width: 240px;
--sys-tooltip-error-padding: var(--sys-spacing-sm) var(--sys-spacing-md);

/* Error icon styles */
--sys-tooltip-error-icon-size: 16px;
--sys-tooltip-error-icon-color: var(--sys-color-roles-error-color-role-error-role);
--sys-tooltip-error-icon-gap: var(--sys-spacing-xs);
```

### Animation Tokens
```css
/* Animation and timing */
--sys-tooltip-show-delay: 300ms;
--sys-tooltip-hide-delay: 0ms;
--sys-tooltip-show-duration: 150ms;
--sys-tooltip-hide-duration: 75ms;
--sys-tooltip-show-easing: ease-out;
--sys-tooltip-hide-easing: ease-in;
--sys-tooltip-interactive-show-delay: 0ms;
--sys-tooltip-interactive-hide-delay: 300ms;

/* Entrance animations */
--sys-tooltip-scale-from: 0.95;
--sys-tooltip-scale-to: 1;
--sys-tooltip-opacity-from: 0;
--sys-tooltip-opacity-to: 1;
--sys-tooltip-translate-distance: 8px;
```

### State Tokens
```css
/* Hover state (for interactive elements within tooltip) */
--sys-tooltip-hover-background: var(--sys-color-neutral-98);
--sys-tooltip-hover-color: var(--sys-color-neutral-10);

/* Focus state */
--sys-tooltip-focus-outline: 2px solid var(--sys-color-primary-40);
--sys-tooltip-focus-outline-offset: 2px;

/* Disabled state */
--sys-tooltip-disabled-opacity: 0.6;
--sys-tooltip-disabled-cursor: not-allowed;
```

## Tooltip Implementation

### Base Tooltip Implementation
```css
.tooltip {
  position: absolute;
  background-color: var(--sys-tooltip-background);
  color: var(--sys-tooltip-color);
  border-radius: var(--sys-tooltip-border-radius);
  padding: var(--sys-tooltip-padding);
  max-width: var(--sys-tooltip-max-width);
  min-width: var(--sys-tooltip-min-width);
  box-shadow: var(--sys-tooltip-elevation);
  z-index: var(--sys-tooltip-z-index);
  font-family: var(--sys-tooltip-font-family);
  font-size: var(--sys-tooltip-font-size);
  line-height: var(--sys-tooltip-line-height);
  pointer-events: none;
  user-select: none;
  white-space: normal;
  word-wrap: break-word;
  opacity: 0;
  transform: scale(var(--sys-tooltip-scale-from));
  transition: 
    opacity var(--sys-tooltip-show-duration) var(--sys-tooltip-show-easing),
    transform var(--sys-tooltip-show-duration) var(--sys-tooltip-show-easing);
}

.tooltip.show {
  opacity: var(--sys-tooltip-opacity-to);
  transform: scale(var(--sys-tooltip-scale-to));
  pointer-events: auto;
}

.tooltip.hide {
  opacity: var(--sys-tooltip-opacity-from);
  transform: scale(var(--sys-tooltip-scale-from));
  transition: 
    opacity var(--sys-tooltip-hide-duration) var(--sys-tooltip-hide-easing),
    transform var(--sys-tooltip-hide-duration) var(--sys-tooltip-hide-easing);
}

/* Arrow/pointer */
.tooltip::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: var(--sys-tooltip-arrow-size) solid transparent;
}

/* Position classes */
.tooltip.top {
  transform: translateY(calc(-100% - var(--sys-tooltip-arrow-offset)));
}

.tooltip.top::before {
  bottom: calc(var(--sys-tooltip-arrow-size) * -2);
  left: 50%;
  transform: var(--sys-tooltip-arrow-top-transform);
  border-top-color: var(--sys-tooltip-arrow-color);
}

.tooltip.bottom {
  transform: translateY(var(--sys-tooltip-arrow-offset));
}

.tooltip.bottom::before {
  top: calc(var(--sys-tooltip-arrow-size) * -2);
  left: 50%;
  transform: var(--sys-tooltip-arrow-bottom-transform);
  border-bottom-color: var(--sys-tooltip-arrow-color);
}

.tooltip.left {
  transform: translateX(calc(-100% - var(--sys-tooltip-arrow-offset)));
}

.tooltip.left::before {
  right: calc(var(--sys-tooltip-arrow-size) * -2);
  top: 50%;
  transform: var(--sys-tooltip-arrow-left-transform);
  border-left-color: var(--sys-tooltip-arrow-color);
}

.tooltip.right {
  transform: translateX(var(--sys-tooltip-arrow-offset));
}

.tooltip.right::before {
  left: calc(var(--sys-tooltip-arrow-size) * -2);
  top: 50%;
  transform: var(--sys-tooltip-arrow-right-transform);
  border-right-color: var(--sys-tooltip-arrow-color);
}
```

### Rich Tooltip Implementation
```css
.tooltip-rich {
  background-color: var(--sys-tooltip-rich-background);
  color: var(--sys-tooltip-rich-color);
  border: var(--sys-tooltip-rich-border);
  max-width: var(--sys-tooltip-rich-max-width);
  padding: var(--sys-tooltip-rich-padding);
  display: flex;
  flex-direction: column;
  gap: var(--sys-tooltip-rich-gap);
}

.tooltip-rich-title {
  font-family: var(--sys-tooltip-title-font-family);
  font-size: var(--sys-tooltip-title-font-size);
  font-weight: var(--sys-tooltip-title-font-weight);
  color: var(--sys-tooltip-title-color);
  margin: var(--sys-tooltip-title-margin);
}

.tooltip-rich-description {
  font-family: var(--sys-tooltip-description-font-family);
  font-size: var(--sys-tooltip-description-font-size);
  color: var(--sys-tooltip-description-color);
  margin: var(--sys-tooltip-description-margin);
  line-height: 1.5;
}

.tooltip-rich-list {
  margin: var(--sys-spacing-sm) 0;
  padding-left: var(--sys-spacing-lg);
}

.tooltip-rich-list-item {
  margin-bottom: var(--sys-spacing-xs);
  color: var(--sys-tooltip-description-color);
}

.tooltip-rich-actions {
  display: flex;
  gap: var(--sys-tooltip-actions-gap);
  margin: var(--sys-tooltip-actions-margin);
  justify-content: var(--sys-tooltip-actions-justify);
}

.tooltip-rich-action {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  padding: var(--sys-spacing-xs) var(--sys-spacing-md);
  border: none;
  border-radius: var(--sys-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tooltip-rich-action.primary {
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-neutral-100);
}

.tooltip-rich-action.primary:hover {
  background-color: var(--sys-color-primary-30);
}

.tooltip-rich-action.secondary {
  background-color: var(--sys-color-neutral-95);
  color: var(--sys-color-neutral-30);
}

.tooltip-rich-action.secondary:hover {
  background-color: var(--sys-color-neutral-90);
}
```

### Interactive Tooltip Implementation
```css
.tooltip-interactive {
  background-color: var(--sys-tooltip-interactive-background);
  border: var(--sys-tooltip-interactive-border);
  max-width: var(--sys-tooltip-interactive-max-width);
  padding: var(--sys-tooltip-interactive-padding);
  display: flex;
  flex-direction: column;
  gap: var(--sys-tooltip-interactive-gap);
  pointer-events: auto;
}

.tooltip-interactive-title {
  font-family: var(--sys-tooltip-title-font-family);
  font-size: var(--sys-tooltip-title-font-size);
  font-weight: var(--sys-tooltip-title-font-weight);
  color: var(--sys-tooltip-title-color);
  margin: 0 0 var(--sys-spacing-sm) 0;
}

.tooltip-interactive-controls {
  display: flex;
  flex-direction: column;
  gap: var(--sys-tooltip-control-gap);
  margin: var(--sys-tooltip-control-margin);
}

.tooltip-interactive-control {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}

.tooltip-interactive-label {
  font-family: var(--sys-tooltip-control-label-font-family);
  font-size: var(--sys-tooltip-control-label-font-size);
  color: var(--sys-tooltip-control-label-color);
  min-width: 80px;
}

.tooltip-interactive-input {
  flex: 1;
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
}

.tooltip-interactive-select {
  flex: 1;
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  background-color: var(--sys-color-neutral-100);
}

.tooltip-interactive-slider {
  flex: 1;
  -webkit-appearance: none;
  height: 4px;
  background: var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-full);
  outline: none;
}

.tooltip-interactive-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: var(--sys-color-primary-40);
  border-radius: 50%;
  cursor: pointer;
}

.tooltip-interactive-buttons {
  display: flex;
  gap: var(--sys-tooltip-button-gap);
  justify-content: var(--sys-tooltip-button-justify);
  margin-top: var(--sys-spacing-sm);
}

.tooltip-interactive-button {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  border: none;
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tooltip-interactive-button.primary {
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-neutral-100);
}

.tooltip-interactive-button.primary:hover {
  background-color: var(--sys-color-primary-30);
}

.tooltip-interactive-button.secondary {
  background-color: var(--sys-color-neutral-95);
  color: var(--sys-color-neutral-30);
}

.tooltip-interactive-button.secondary:hover {
  background-color: var(--sys-color-neutral-90);
}
```

### Teaching Tooltip Implementation
```css
.tooltip-teaching {
  background-color: var(--sys-tooltip-teaching-background);
  color: var(--sys-tooltip-teaching-color);
  border: var(--sys-tooltip-teaching-border);
  max-width: var(--sys-tooltip-teaching-max-width);
  padding: var(--sys-tooltip-teaching-padding);
  display: flex;
  flex-direction: column;
  gap: var(--sys-tooltip-teaching-gap);
}

.tooltip-teaching-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--sys-spacing-md);
}

.tooltip-teaching-title {
  font-family: var(--sys-tooltip-title-font-family);
  font-size: var(--sys-tooltip-title-font-size);
  font-weight: var(--sys-tooltip-title-font-weight);
  color: var(--sys-tooltip-title-color);
  margin: 0;
  flex: 1;
}

.tooltip-teaching-dismiss {
  background: none;
  border: none;
  color: var(--sys-tooltip-dismiss-color);
  cursor: pointer;
  padding: var(--sys-spacing-xs);
  font-size: 18px;
  line-height: 1;
  transition: color 0.2s ease;
}

.tooltip-teaching-dismiss:hover {
  color: var(--sys-tooltip-dismiss-hover-color);
}

.tooltip-teaching-content {
  font-family: var(--sys-tooltip-description-font-family);
  font-size: var(--sys-tooltip-description-font-size);
  color: var(--sys-tooltip-description-color);
  line-height: 1.5;
  margin: 0;
}

.tooltip-teaching-steps {
  display: flex;
  gap: var(--sys-tooltip-step-gap);
  margin: var(--sys-tooltip-step-margin);
  justify-content: center;
}

.tooltip-teaching-step {
  width: var(--sys-tooltip-step-size);
  height: var(--sys-tooltip-step-size);
  border-radius: 50%;
  background-color: var(--sys-tooltip-step-background);
  color: var(--sys-tooltip-step-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
}

.tooltip-teaching-step.active {
  background-color: var(--sys-tooltip-step-active-background);
  color: var(--sys-tooltip-step-active-color);
}

.tooltip-teaching-navigation {
  display: flex;
  gap: var(--sys-tooltip-nav-gap);
  justify-content: var(--sys-tooltip-nav-justify);
  margin-top: var(--sys-spacing-md);
}

.tooltip-teaching-nav-button {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  border: none;
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tooltip-teaching-nav-button.primary {
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-neutral-100);
}

.tooltip-teaching-nav-button.primary:hover {
  background-color: var(--sys-color-primary-30);
}

.tooltip-teaching-nav-button.secondary {
  background-color: var(--sys-color-neutral-95);
  color: var(--sys-color-neutral-30);
}

.tooltip-teaching-nav-button.secondary:hover {
  background-color: var(--sys-color-neutral-90);
}

.tooltip-teaching-skip {
  background: none;
  border: none;
  color: var(--sys-tooltip-dismiss-color);
  cursor: pointer;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  padding: var(--sys-spacing-sm);
}

.tooltip-teaching-skip:hover {
  color: var(--sys-tooltip-dismiss-hover-color);
  text-decoration: underline;
}
```

### Error Tooltip Implementation
```css
.tooltip-error {
  background-color: var(--sys-tooltip-error-background);
  color: var(--sys-tooltip-error-color);
  border: var(--sys-tooltip-error-border);
  max-width: var(--sys-tooltip-error-max-width);
  padding: var(--sys-tooltip-error-padding);
  display: flex;
  align-items: flex-start;
  gap: var(--sys-tooltip-error-icon-gap);
}

.tooltip-error-icon {
  width: var(--sys-tooltip-error-icon-size);
  height: var(--sys-tooltip-error-icon-size);
  color: var(--sys-tooltip-error-icon-color);
  flex-shrink: 0;
  margin-top: 2px;
}

.tooltip-error-message {
  font-family: var(--sys-tooltip-font-family);
  font-size: var(--sys-tooltip-font-size);
  line-height: var(--sys-tooltip-line-height);
  margin: 0;
}

/* Error tooltip positioning (usually below input fields) */
.tooltip-error.bottom {
  margin-top: var(--sys-spacing-xs);
}

.tooltip-error.bottom::before {
  border-bottom-color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Tooltip Trigger Implementation
```css
.tooltip-trigger {
  position: relative;
  display: inline-block;
}

.tooltip-trigger:hover .tooltip,
.tooltip-trigger:focus .tooltip,
.tooltip-trigger:focus-within .tooltip {
  opacity: var(--sys-tooltip-opacity-to);
  transform: scale(var(--sys-tooltip-scale-to));
  pointer-events: auto;
  transition-delay: var(--sys-tooltip-show-delay);
}

/* For interactive tooltips that need to stay open */
.tooltip-trigger.interactive .tooltip {
  pointer-events: auto;
}

.tooltip-trigger.interactive:hover .tooltip,
.tooltip-trigger.interactive:focus .tooltip,
.tooltip-trigger.interactive:focus-within .tooltip {
  transition-delay: var(--sys-tooltip-interactive-show-delay);
}

.tooltip-trigger.interactive .tooltip.hide {
  transition-delay: var(--sys-tooltip-interactive-hide-delay);
}

/* Keyboard focus indicator */
.tooltip-trigger:focus-visible {
  outline: var(--sys-tooltip-focus-outline);
  outline-offset: var(--sys-tooltip-focus-outline-offset);
}
```

## States

### Default/Hidden State
```css
.tooltip {
  opacity: var(--sys-tooltip-opacity-from);
  transform: scale(var(--sys-tooltip-scale-from));
  pointer-events: none;
}
```

### Visible State
```css
.tooltip.show {
  opacity: var(--sys-tooltip-opacity-to);
  transform: scale(var(--sys-tooltip-scale-to));
  pointer-events: auto;
}

/* With entrance animation */
.tooltip.show.animate {
  animation: tooltip-entrance var(--sys-tooltip-show-duration) var(--sys-tooltip-show-easing);
}

@keyframes tooltip-entrance {
  from {
    opacity: var(--sys-tooltip-opacity-from);
    transform: scale(var(--sys-tooltip-scale-from)) translateY(var(--sys-tooltip-translate-distance));
  }
  to {
    opacity: var(--sys-tooltip-opacity-to);
    transform: scale(var(--sys-tooltip-scale-to)) translateY(0);
  }
}
```

### Hover State (within tooltip)
```css
.tooltip-rich-action:hover,
.tooltip-interactive-button:hover,
.tooltip-teaching-nav-button:hover {
  background-color: var(--sys-tooltip-hover-background);
  color: var(--sys-tooltip-hover-color);
}

.tooltip-teaching-dismiss:hover {
  color: var(--sys-tooltip-dismiss-hover-color);
}
```

### Focus State (within interactive tooltips)
```css
.tooltip-interactive-input:focus,
.tooltip-interactive-select:focus,
.tooltip-interactive-slider:focus {
  outline: var(--sys-tooltip-focus-outline);
  outline-offset: var(--sys-tooltip-focus-outline-offset);
  border-color: var(--sys-color-primary-40);
}

.tooltip-rich-action:focus-visible,
.tooltip-interactive-button:focus-visible,
.tooltip-teaching-nav-button:focus-visible {
  outline: var(--sys-tooltip-focus-outline);
  outline-offset: var(--sys-tooltip-focus-outline-offset);
}
```

### Disabled State
```css
.tooltip.disabled,
.tooltip-trigger.disabled .tooltip {
  opacity: var(--sys-tooltip-disabled-opacity);
  cursor: var(--sys-tooltip-disabled-cursor);
  pointer-events: none;
}

.tooltip-rich-action:disabled,
.tooltip-interactive-button:disabled,
.tooltip-teaching-nav-button:disabled {
  opacity: var(--sys-tooltip-disabled-opacity);
  cursor: var(--sys-tooltip-disabled-cursor);
}
```

### Loading State
```css
.tooltip.loading .tooltip-content {
  opacity: 0.5;
  pointer-events: none;
}

.tooltip.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--sys-color-neutral-90);
  border-top-color: var(--sys-color-primary-40);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Plain tooltip -->
<button class="tooltip-trigger" aria-describedby="tooltip-1">
  Settings
</button>
<div id="tooltip-1" class="tooltip" role="tooltip" aria-hidden="true">
  Configure application settings
</div>

<!-- Rich tooltip -->
<button class="tooltip-trigger" aria-describedby="tooltip-2">
  AI Model
</button>
<div id="tooltip-2" class="tooltip tooltip-rich" role="tooltip" aria-hidden="true">
  <h3 class="tooltip-rich-title">GPT-4 Model</h3>
  <p class="tooltip-rich-description">
    Advanced AI model for complex content generation with 
    128k context window and improved reasoning.
  </p>
  <div class="tooltip-rich-actions">
    <button class="tooltip-rich-action primary" aria-label="Select GPT-4 model">
      Select
    </button>
  </div>
</div>

<!-- Interactive tooltip -->
<div class="tooltip-trigger interactive">
  <button aria-describedby="tooltip-3">Quality Settings</button>
  <div id="tooltip-3" class="tooltip tooltip-interactive" role="dialog" aria-modal="false" aria-hidden="true">
    <h3 class="tooltip-interactive-title">Configure Quality</h3>
    <div class="tooltip-interactive-controls">
      <div class="tooltip-interactive-control">
        <label class="tooltip-interactive-label" for="quality">Quality:</label>
        <select class="tooltip-interactive-select" id="quality">
          <option>Standard</option>
          <option>High</option>
          <option>Maximum</option>
        </select>
      </div>
    </div>
    <div class="tooltip-interactive-buttons">
      <button class="tooltip-interactive-button secondary" aria-label="Cancel configuration">
        Cancel
      </button>
      <button class="tooltip-interactive-button primary" aria-label="Apply quality settings">
        Apply
      </button>
    </div>
  </div>
</div>

<!-- Teaching tooltip -->
<div class="tooltip-trigger">
  <button aria-describedby="tooltip-4">New Feature</button>
  <div id="tooltip-4" class="tooltip tooltip-teaching" role="dialog" aria-label="Feature tutorial" aria-hidden="true">
    <div class="tooltip-teaching-header">
      <h3 class="tooltip-teaching-title">AI Content Assistant</h3>
      <button class="tooltip-teaching-dismiss" aria-label="Dismiss tutorial">×</button>
    </div>
    <p class="tooltip-teaching-content">
      Our new AI assistant can help you generate content faster 
      with smart suggestions and templates.
    </p>
    <div class="tooltip-teaching-steps">
      <span class="tooltip-teaching-step active" aria-current="step">1</span>
      <span class="tooltip-teaching-step">2</span>
      <span class="tooltip-teaching-step">3</span>
    </div>
    <div class="tooltip-teaching-navigation">
      <button class="tooltip-teaching-skip" aria-label="Skip tutorial">
        Skip
      </button>
      <button class="tooltip-teaching-nav-button primary" aria-label="Next step">
        Next
      </button>
    </div>
  </div>
</div>

<!-- Error tooltip -->
<div class="tooltip-trigger">
  <input type="text" aria-describedby="tooltip-5" aria-invalid="true">
  <div id="tooltip-5" class="tooltip tooltip-error" role="alert" aria-hidden="true">
    <span class="tooltip-error-icon">⚠</span>
    <p class="tooltip-error-message">
      Please enter a valid email address
    </p>
  </div>
</div>
```

### Keyboard Navigation
```css
.tooltip-trigger:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

.tooltip:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

/* Ensure tooltip content is focusable when interactive */
.tooltip-interactive *:focus-visible,
.tooltip-rich-actions *:focus-visible,
.tooltip-teaching-navigation *:focus-visible {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}
```

### Screen Reader Support
```css
/* Hide tooltip from screen readers when not shown */
.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
}

/* Ensure tooltip is accessible when shown */
.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
}

/* Hide decorative icons from screen readers */
.tooltip-error-icon[aria-hidden="true"] {
  /* Icon is decorative, text describes error */
}
```

### Keyboard Interactions
```javascript
// Example: Keyboard navigation for tooltips
function handleTooltipKeydown(event) {
  const tooltip = event.currentTarget.querySelector('.tooltip');
  const isInteractive = tooltip.classList.contains('tooltip-interactive') ||
                       tooltip.classList.contains('tooltip-teaching');
  
  switch (event.key) {
    case 'Escape':
      if (tooltip.classList.contains('show')) {
        event.preventDefault();
        hideTooltip(tooltip);
        // Return focus to trigger
        event.currentTarget.focus();
      }
      break;
      
    case 'Tab':
      if (isInteractive && tooltip.classList.contains('show')) {
        // Trap focus within interactive tooltip
        const focusableElements = tooltip.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
      break;
      
    case 'Enter':
    case ' ':
      if (!isInteractive && tooltip.classList.contains('show')) {
        event.preventDefault();
        hideTooltip(tooltip);
      }
      break;
  }
}

// Example: Show/hide tooltip with keyboard
function toggleTooltip(tooltipId, show) {
  const tooltip = document.getElementById(tooltipId);
  const trigger = document.querySelector(`[aria-describedby="${tooltipId}"]`);
  
  if (show) {
    tooltip.setAttribute('aria-hidden', 'false');
    tooltip.classList.add('show');
    tooltip.classList.remove('hide');
    
    // Position tooltip
    positionTooltip(tooltip, trigger);
    
    // Focus first interactive element if tooltip is interactive
    if (tooltip.classList.contains('tooltip-interactive') ||
        tooltip.classList.contains('tooltip-teaching')) {
      const firstFocusable = tooltip.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 10);
      }
    }
  } else {
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.classList.add('hide');
    tooltip.classList.remove('show');
    
    // Return focus to trigger
    if (trigger) {
      setTimeout(() => trigger.focus(), 10);
    }
  }
}

// Example: Position tooltip relative to trigger
function positionTooltip(tooltip, trigger) {
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate available space
  const spaceAbove = triggerRect.top;
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;
  
  // Determine best position
  let position = 'top';
  let arrowClass = 'top';
  
  if (spaceBelow >= tooltipRect.height + 10) {
    position = 'bottom';
    arrowClass = 'bottom';
  } else if (spaceAbove >= tooltipRect.height + 10) {
    position = 'top';
    arrowClass = 'top';
  } else if (spaceRight >= tooltipRect.width + 10) {
    position = 'right';
    arrowClass = 'right';
  } else if (spaceLeft >= tooltipRect.width + 10) {
    position = 'left';
    arrowClass = 'left';
  }
  
  // Apply position classes
  tooltip.className = tooltip.className.replace(
    /\b(top|bottom|left|right)\b/g, ''
  ).trim();
  tooltip.classList.add(position);
  
  // Calculate position
  let top = 0;
  let left = 0;
  
  switch (position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - 10;
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      break;
    case 'bottom':
      top = triggerRect.bottom + 10;
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
      left = triggerRect.left - tooltipRect.width - 10;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
      left = triggerRect.right + 10;
      break;
  }
  
  // Ensure tooltip stays within viewport
  top = Math.max(10, Math.min(top, viewportHeight - tooltipRect.height - 10));
  left = Math.max(10, Math.min(left, viewportWidth - tooltipRect.width - 10));
  
  // Apply position
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}
```

## Tooltips in AI Interfaces

### AI Parameter Explanations
```css
.tooltip-ai-parameter {
  border-left: 3px solid var(--sys-color-primary-40);
}

.tooltip-ai-parameter-title {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  margin-bottom: var(--sys-spacing-xs);
}

.tooltip-ai-parameter-icon {
  width: 20px;
  height: 20px;
  color: var(--sys-color-primary-40);
}

.tooltip-ai-parameter-name {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-10);
}

.tooltip-ai-parameter-value {
  display: inline-block;
  background-color: var(--sys-color-primary-95);
  color: var(--sys-color-primary-40);
  padding: 2px 8px;
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  margin-left: var(--sys-spacing-xs);
}

.tooltip-ai-parameter-description {
  color: var(--sys-color-neutral-30);
  line-height: 1.5;
  margin-bottom: var(--sys-spacing-sm);
}

.tooltip-ai-parameter-effects {
  background-color: var(--sys-color-neutral-98);
  border-radius: var(--sys-radius-sm);
  padding: var(--sys-spacing-sm);
  margin: var(--sys-spacing-sm) 0;
}

.tooltip-ai-parameter-effect {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  margin-bottom: var(--sys-spacing-xs);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-30);
}

.tooltip-ai-parameter-effect-icon {
  width: 16px;
  height: 16px;
  color: var(--sys-color-primary-40);
}

.tooltip-ai-parameter-recommendation {
  background-color: var(--sys-color-secondary-95);
  border-left: 3px solid var(--sys-color-secondary-40);
  padding: var(--sys-spacing-sm);
  margin-top: var(--sys-spacing-sm);
  border-radius: 0 var(--sys-radius-sm) var(--sys-radius-sm) 0;
}

.tooltip-ai-parameter-recommendation-title {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
  color: var(--sys-color-secondary-40);
  margin-bottom: var(--sys-spacing-xs);
}

.tooltip-ai-parameter-recommendation-text {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-30);
}
```

### Model Comparison Tooltips
```css
.tooltip-model-comparison {
  max-width: 400px;
}

.tooltip-model-comparison-header {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  margin-bottom: var(--sys-spacing-md);
}

.tooltip-model-comparison-icon {
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

.tooltip-model-comparison-info {
  flex: 1;
}

.tooltip-model-comparison-name {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-10);
  margin-bottom: var(--sys-spacing-xs);
}

.tooltip-model-comparison-provider {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.tooltip-model-comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--sys-spacing-md) 0;
}

.tooltip-model-comparison-row {
  border-bottom: 1px solid var(--sys-color-neutral-95);
}

.tooltip-model-comparison-row:last-child {
  border-bottom: none;
}

.tooltip-model-comparison-cell {
  padding: var(--sys-spacing-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  text-align: left;
}

.tooltip-model-comparison-cell.label {
  color: var(--sys-color-neutral-30);
  width: 40%;
}

.tooltip-model-comparison-cell.value {
  color: var(--sys-color-neutral-10);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
}

.tooltip-model-comparison-cell.highlight {
  color: var(--sys-color-primary-40);
  background-color: var(--sys-color-primary-98);
  border-radius: var(--sys-radius-sm);
}

.tooltip-model-comparison-actions {
  display: flex;
  gap: var(--sys-spacing-sm);
  margin-top: var(--sys-spacing-md);
}

.tooltip-model-comparison-action {
  flex: 1;
  text-align: center;
}
```

### Content Quality Tooltips
```css
.tooltip-content-quality {
  max-width: 350px;
}

.tooltip-content-quality-meter {
  height: 8px;
  background-color: var(--sys-color-neutral-95);
  border-radius: var(--sys-radius-full);
  margin: var(--sys-spacing-md) 0;
  position: relative;
  overflow: hidden;
}

.tooltip-content-quality-fill {
  height: 100%;
  border-radius: var(--sys-radius-full);
  transition: width 0.3s ease;
}

.tooltip-content-quality-fill.low {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  width: 30%;
}

.tooltip-content-quality-fill.medium {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
  width: 60%;
}

.tooltip-content-quality-fill.high {
  background-color: var(--sys-color-roles-success-color-role-success-role);
  width: 90%;
}

.tooltip-content-quality-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--sys-spacing-xs);
}

.tooltip-content-quality-label {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.tooltip-content-quality-label.active {
  color: var(--sys-color-neutral-10);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
}

.tooltip-content-quality-factors {
  margin: var(--sys-spacing-md) 0;
}

.tooltip-content-quality-factor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sys-spacing-sm);
}

.tooltip-content-quality-factor-name {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-30);
}

.tooltip-content-quality-factor-score {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-10);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
}

.tooltip-content-quality-factor-score.good {
  color: var(--sys-color-roles-success-color-role-success-role);
}

.tooltip-content-quality-factor-score.average {
  color: var(--sys-color-roles-warning-color-role-warning-role);
}

.tooltip-content-quality-factor-score.poor {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.tooltip-content-quality-suggestions {
  background-color: var(--sys-color-neutral-98);
  border-radius: var(--sys-radius-sm);
  padding: var(--sys-spacing-sm);
  margin-top: var(--sys-spacing-md);
}

.tooltip-content-quality-suggestion {
  display: flex;
  align-items: flex-start;
  gap: var(--sys-spacing-sm);
  margin-bottom: var(--sys-spacing-xs);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-30);
}

.tooltip-content-quality-suggestion-icon {
  width: 16px;
  height: 16px;
  color: var(--sys-color-primary-40);
  flex-shrink: 0;
  margin-top: 1px;
}
```

### AI Feature Explanation Tooltips
```css
.tooltip-ai-feature {
  border: 2px solid var(--sys-color-primary-40);
}

.tooltip-ai-feature-badge {
  display: inline-block;
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-neutral-100);
  padding: 2px 8px;
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
  margin-bottom: var(--sys-spacing-sm);
}

.tooltip-ai-feature-title {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  margin-bottom: var(--sys-spacing-sm);
}

.tooltip-ai-feature-icon {
  width: 24px;
  height: 24px;
  background-color: var(--sys-color-primary-95);
  border-radius: var(--sys-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-primary-40);
}

.tooltip-ai-feature-name {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-10);
}

.tooltip-ai-feature-description {
  color: var(--sys-color-neutral-30);
  line-height: 1.5;
  margin-bottom: var(--sys-spacing-md);
}

.tooltip-ai-feature-benefits {
  background-color: var(--sys-color-primary-98);
  border-radius: var(--sys-radius-sm);
  padding: var(--sys-spacing-sm);
  margin: var(--sys-spacing-md) 0;
}

.tooltip-ai-feature-benefit {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  margin-bottom: var(--sys-spacing-xs);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-30);
}

.tooltip-ai-feature-benefit-icon {
  width: 16px;
  height: 16px;
  color: var(--sys-color-primary-40);
}

.tooltip-ai-feature-example {
  background-color: var(--sys-color-neutral-98);
  border-left: 3px solid var(--sys-color-primary-40);
  padding: var(--sys-spacing-sm);
  margin-top: var(--sys-spacing-md);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-30);
  font-style: italic;
}

.tooltip-ai-feature-cta {
  margin-top: var(--sys-spacing-md);
  text-align: center;
}
```

### Template Preview Tooltips
```css
.tooltip-template-preview {
  max-width: 320px;
  padding: 0;
  overflow: hidden;
}

.tooltip-template-preview-image {
  width: 100%;
  height: 120px;
  background-color: var(--sys-color-neutral-95);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-neutral-80);
  font-size: 48px;
}

.tooltip-template-preview-content {
  padding: var(--sys-spacing-md);
}

.tooltip-template-preview-header {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  margin-bottom: var(--sys-spacing-sm);
}

.tooltip-template-preview-icon {
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

.tooltip-template-preview-info {
  flex: 1;
}

.tooltip-template-preview-name {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-10);
  margin-bottom: var(--sys-spacing-xs);
}

.tooltip-template-preview-category {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.tooltip-template-preview-description {
  color: var(--sys-color-neutral-30);
  line-height: 1.5;
  margin-bottom: var(--sys-spacing-md);
}

.tooltip-template-preview-stats {
  display: flex;
  gap: var(--sys-spacing-md);
  margin-bottom: var(--sys-spacing-md);
}

.tooltip-template-preview-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.tooltip-template-preview-stat-value {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-primary-40);
  font-weight: var(--sys-typography-title-small-bold-font-weight);
}

.tooltip-template-preview-stat-label {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  margin-top: var(--sys-spacing-xs);
}

.tooltip-template-preview-actions {
  display: flex;
  gap: var(--sys-spacing-sm);
}

.tooltip-template-preview-action {
  flex: 1;
  text-align: center;
}
```

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .tooltip {
    max-width: 280px;
    font-size: var(--sys-typography-label-small-font-size);
    padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  }
  
  .tooltip-rich,
  .tooltip-interactive,
  .tooltip-teaching {
    max-width: 300px;
    padding: var(--sys-spacing-sm);
  }
  
  .tooltip-teaching {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 40px);
    max-width: none;
  }
  
  .tooltip-teaching::before {
    display: none; /* Hide arrow on mobile teaching tooltips */
  }
  
  .tooltip-interactive-control {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sys-spacing-xs);
  }
  
  .tooltip-interactive-label {
    min-width: auto;
  }
  
  .tooltip-model-comparison {
    max-width: 300px;
  }
  
  .tooltip-content-quality {
    max-width: 280px;
  }
  
  /* Adjust positioning for mobile */
  .tooltip.top,
  .tooltip.bottom {
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
  
  .tooltip.left,
  .tooltip.right {
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .tooltip {
    max-width: 240px;
  }
  
  .tooltip-rich,
  .tooltip-interactive,
  .tooltip-teaching {
    max-width: 320px;
  }
  
  .tooltip-model-comparison {
    max-width: 350px;
  }
  
  .tooltip-content-quality {
    max-width: 300px;
  }
  
  .tooltip-template-preview {
    max-width: 280px;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .tooltip {
    max-width: var(--sys-tooltip-max-width);
  }
  
  .tooltip-rich {
    max-width: var(--sys-tooltip-rich-max-width);
  }
  
  .tooltip-interactive {
    max-width: var(--sys-tooltip-interactive-max-width);
  }
  
  .tooltip-teaching {
    max-width: var(--sys-tooltip-teaching-max-width);
  }
  
  /* Hover effects only on desktop */
  .tooltip-trigger:hover .tooltip {
    transition-delay: var(--sys-tooltip-show-delay);
  }
  
  .tooltip-trigger.interactive:hover .tooltip {
    transition-delay: var(--sys-tooltip-interactive-show-delay);
  }
}
```

## Best Practices

### ✅ Do
- Use tooltips to explain complex AI features and parameters
- Keep tooltip text concise and actionable
- Position tooltips close to their trigger element
- Use appropriate tooltip type for the context
- Provide rich tooltips for complex features
- Use interactive tooltips for configuration
- Implement teaching tooltips for onboarding
- Show error tooltips immediately for validation
- Ensure tooltips are accessible via keyboard
- Support screen reader announcements
- Test tooltip positioning on all viewports
- Use appropriate delays (300ms show, 0ms hide for plain tooltips)
- Allow interaction with interactive tooltips
- Dismiss tooltips on Escape key press
- Return focus to trigger after tooltip dismissal
- Handle tooltip overflow gracefully
- Use semantic HTML and ARIA attributes

### ❌ Don't
- Don't use tooltips for essential information
- Don't block content with tooltips
- Don't use tooltips for error messages that need persistent display
- Don't create tooltips that are too large or complex
- Don't forget to handle mobile touch interactions
- Don't ignore tooltip performance (avoid excessive tooltips)
- Don't use tooltips for primary navigation
- Don't create tooltips that auto-open on page load (except for onboarding)
- Don't forget to test with screen readers
- Don't use tooltips for content that should be permanently visible
- Don't create tooltips that cover important UI elements
- Don't ignore z-index stacking context
- Don't forget to handle tooltip dismissal on scroll
- Don't use tooltips for binary choices (use labels instead)

## Testing and Validation

### Visual Testing
1. **Positioning**: Test tooltip positioning in all placements (top, bottom, left, right)
2. **Responsive**: Test across all breakpoints and viewport sizes
3. **Animation**: Test show/hide animations and timing
4. **Content**: Test with varying content lengths
5. **Overflow**: Test tooltip behavior near viewport edges
6. **Z-index**: Test stacking with other UI elements
7. **Accessibility**: Test color contrast and focus indicators
8. **Performance**: Test with multiple simultaneous tooltips

### Functional Testing
```javascript
// Example: Tooltip functionality tests
describe('Tooltip System', () => {
  test('Tooltip shows on hover', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300); // Show delay
    
    expect(tooltip.classList.contains('show')).toBe(true);
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
  });
  
  test('Tooltip hides on mouse leave', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    
    // Show tooltip first
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300);
    
    // Then hide
    fireEvent.mouseLeave(trigger);
    
    expect(tooltip.classList.contains('hide')).toBe(true);
    expect(tooltip.getAttribute('aria-hidden')).toBe('true');
  });
  
  test('Interactive tooltip stays open on hover', () => {
    const trigger = document.querySelector('.tooltip-trigger.interactive');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseEnter(tooltip);
    fireEvent.mouseLeave(trigger);
    
    // Tooltip should still be visible
    expect(tooltip.classList.contains('show')).toBe(true);
  });
  
  test('Escape key dismisses tooltip', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    
    // Show tooltip
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300);
    
    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(tooltip.classList.contains('hide')).toBe(true);
    expect(trigger).toHaveFocus();
  });
  
  test('Tooltip positions correctly', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    
    // Mock positioning
    const positionTooltip = jest.fn();
    
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300);
    
    expect(positionTooltip).toHaveBeenCalledWith(tooltip, trigger);
  });
  
  test('Teaching tooltip navigation works', () => {
    const tooltip = document.querySelector('.tooltip-teaching');
    const nextButton = tooltip.querySelector('.tooltip-teaching-nav-button.primary');
    const steps = tooltip.querySelectorAll('.tooltip-teaching-step');
    
    // Initial state
    expect(steps[0].classList.contains('active')).toBe(true);
    expect(steps[1].classList.contains('active')).toBe(false);
    
    // Click next
    nextButton.click();
    
    expect(steps[0].classList.contains('active')).toBe(false);
    expect(steps[1].classList.contains('active')).toBe(true);
  });
  
  test('Error tooltip shows immediately', () => {
    const input = document.querySelector('input[aria-invalid="true"]');
    const tooltip = document.getElementById(input.getAttribute('aria-describedby'));
    
    fireEvent.focus(input);
    
    // Error tooltips should show immediately (no delay)
    expect(tooltip.classList.contains('show')).toBe(true);
  });
});

// Example: Tooltip accessibility tests
describe('Tooltip Accessibility', () => {
  test('Tooltip has proper ARIA attributes', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltipId = trigger.getAttribute('aria-describedby');
    const tooltip = document.getElementById(tooltipId);
    
    expect(trigger).toHaveAttribute('aria-describedby', tooltipId);
    expect(tooltip).toHaveAttribute('role', 'tooltip');
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  });
  
  test('Tooltip becomes accessible when shown', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300);
    
    expect(tooltip.getAttribute('aria-hidden')).toBe('false');
    expect(tooltip).toBeVisible();
  });
  
  test('Interactive tooltip traps focus', () => {
    const trigger = document.querySelector('.tooltip-trigger.interactive');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    const focusableElements = tooltip.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Show tooltip
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300);
    
    // Focus should be on first interactive element
    expect(document.activeElement).toBe(focusableElements[0]);
    
    // Tab should cycle within tooltip
    fireEvent.keyDown(tooltip, { key: 'Tab' });
    expect(document.activeElement).toBe(focusableElements[1]);
    
    // Shift+Tab from first element should go to last
    focusableElements[0].focus();
    fireEvent.keyDown(tooltip, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(focusableElements[focusableElements.length - 1]);
  });
  
  test('Screen reader announces tooltip', () => {
    const trigger = document.querySelector('.tooltip-trigger');
    const tooltip = document.getElementById(trigger.getAttribute('aria-describedby'));
    const announce = jest.fn();
    
    // Mock screen reader announcement
    window.announce = announce;
    
    fireEvent.mouseEnter(trigger);
    jest.advanceTimersByTime(300);
    
    expect(announce).toHaveBeenCalledWith(tooltip.textContent);
  });
});
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for tooltip styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/radius.md` - Radius tokens reference
- `skills/component-specification.md` - Component specifications

### Tooltip Component Files
- `tooltip.css` - Tooltip styles (if separated)
- `tooltip.js` - Tooltip logic and behavior
- `tooltip.stories.js` - Storybook stories (if using Storybook)

### Integration Files
- `tooltip-manager.js` - Tooltip state management
- `tooltip-positioning.js` - Tooltip positioning logic
- `tooltip-accessibility.js` - Accessibility utilities

## Integration with AI Systems

### AI Parameter Tooltip System
```javascript
// Example: AI parameter explanation tooltips
class AIParameterTooltipSystem {
  constructor() {
    this.parameters = new Map();
    this.tooltips = new Map();
    this.activeTooltip = null;
  }
  
  registerParameter(paramId, config) {
    this.parameters.set(paramId, {
      ...config,
      tooltipId: `tooltip-param-${paramId}`
    });
    
    // Create tooltip element
    const tooltip = this.createParameterTooltip(paramId, config);
    this.tooltips.set(paramId, tooltip);
    
    // Add to DOM
    document.body.appendChild(tooltip);
    
    // Set up trigger
    const trigger = document.querySelector(`[data-param="${paramId}"]`);
    if (trigger) {
      this.setupParameterTrigger(trigger, paramId);
    }
  }
  
  createParameterTooltip(paramId, config) {
    const tooltip = document.createElement('div');
    tooltip.id = `tooltip-param-${paramId}`;
    tooltip.className = 'tooltip tooltip-ai-parameter';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    
    tooltip.innerHTML = `
      <div class="tooltip-ai-parameter-title">
        <span class="tooltip-ai-parameter-icon">${config.icon || '⚙️'}</span>
        <span class="tooltip-ai-parameter-name">${config.name}</span>
        <span class="tooltip-ai-parameter-value">${config.currentValue || 'Not set'}</span>
      </div>
      <p class="tooltip-ai-parameter-description">${config.description}</p>
      
      ${config.effects ? `
        <div class="tooltip-ai-parameter-effects">
          ${config.effects.map(effect => `
            <div class="tooltip-ai-parameter-effect">
              <span class="tooltip-ai-parameter-effect-icon">${effect.icon || '→'}</span>
              <span>${effect.description}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${config.recommendation ? `
        <div class="tooltip-ai-parameter-recommendation">
          <div class="tooltip-ai-parameter-recommendation-title">
            AI Recommendation
          </div>
          <div class="tooltip-ai-parameter-recommendation-text">
            ${config.recommendation}
          </div>
        </div>
      ` : ''}
      
      ${config.actions ? `
        <div class="tooltip-rich-actions">
          ${config.actions.map(action => `
            <button class="tooltip-rich-action ${action.type || 'secondary'}"
                    data-action="${action.id}">
              ${action.label}
            </button>
          `).join('')}
        </div>
      ` : ''}
    `;
    
    return tooltip;
  }
  
  setupParameterTrigger(trigger, paramId) {
    trigger.setAttribute('aria-describedby', `tooltip-param-${paramId}`);
    trigger.classList.add('tooltip-trigger');
    
    // Add hover events
    trigger.addEventListener('mouseenter', () => {
      this.showParameterTooltip(paramId, trigger);
    });
    
    trigger.addEventListener('mouseleave', () => {
      this.hideParameterTooltip(paramId);
    });
    
    // Add keyboard events
    trigger.addEventListener('focus', () => {
      this.showParameterTooltip(paramId, trigger);
    });
    
    trigger.addEventListener('blur', () => {
      this.hideParameterTooltip(paramId);
    });
  }
  
  showParameterTooltip(paramId, trigger) {
    if (this.activeTooltip === paramId) return;
    
    // Hide any active tooltip
    if (this.activeTooltip) {
      this.hideParameterTooltip(this.activeTooltip);
    }
    
    const tooltip = this.tooltips.get(paramId);
    if (!tooltip) return;
    
    // Show tooltip
    tooltip.setAttribute('aria-hidden', 'false');
    tooltip.classList.add('show');
    tooltip.classList.remove('hide');
    
    // Position tooltip
    this.positionTooltip(tooltip, trigger);
    
    // Update active tooltip
    this.activeTooltip = paramId;
    
    // Update current value if needed
    const param = this.parameters.get(paramId);
    if (param.updateValueOnShow) {
      this.updateTooltipValue(paramId);
    }
  }
  
  hideParameterTooltip(paramId) {
    const tooltip = this.tooltips.get(paramId);
    if (!tooltip) return;
    
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.classList.add('hide');
    tooltip.classList.remove('show');
    
    if (this.activeTooltip === paramId) {
      this.activeTooltip = null;
    }
  }
  
  positionTooltip(tooltip, trigger) {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Determine best position based on available space
    const positions = [
      { pos: 'bottom', score: this.calculatePositionScore('bottom', triggerRect, tooltipRect) },
      { pos: 'top', score: this.calculatePositionScore('top', triggerRect, tooltipRect) },
      { pos: 'right', score: this.calculatePositionScore('right', triggerRect, tooltipRect) },
      { pos: 'left', score: this.calculatePositionScore('left', triggerRect, tooltipRect) }
    ];
    
    // Choose best position
    positions.sort((a, b) => b.score - a.score);
    const bestPosition = positions[0].pos;
    
    // Apply position
    tooltip.className = tooltip.className.replace(
      /\b(top|bottom|left|right)\b/g, ''
    ).trim();
    tooltip.classList.add(bestPosition);
    
    // Calculate coordinates
    let top, left;
    const offset = 10;
    
    switch (bestPosition) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + offset;
        break;
    }
    
    // Keep within viewport
    top = Math.max(10, Math.min(top, window.innerHeight - tooltipRect.height - 10));
    left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
  
  calculatePositionScore(position, triggerRect, tooltipRect) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 20;
    
    let availableSpace = 0;
    
    switch (position) {
      case 'top':
        availableSpace = triggerRect.top - margin;
        break;
      case 'bottom':
        availableSpace = viewportHeight - triggerRect.bottom - margin;
        break;
      case 'left':
        availableSpace = triggerRect.left - margin;
        break;
      case 'right':
        availableSpace = viewportWidth - triggerRect.right - margin;
        break;
    }
    
    // Score based on available space (more space = higher score)
    return Math.max(0, availableSpace - tooltipRect.height);
  }
  
  updateTooltipValue(paramId) {
    const param = this.parameters.get(paramId);
    const tooltip = this.tooltips.get(paramId);
    
    if (!param || !tooltip) return;
    
    // Get current value from UI
    const trigger = document.querySelector(`[data-param="${paramId}"]`);
    if (trigger) {
      const currentValue = this.getCurrentParamValue(paramId, trigger);
      
      // Update tooltip
      const valueElement = tooltip.querySelector('.tooltip-ai-parameter-value');
      if (valueElement) {
        valueElement.textContent = currentValue;
        
        // Update styling based on value
        if (param.valueRanges) {
          const range = param.valueRanges.find(r => 
            currentValue >= r.min && currentValue <= r.max
          );
          if (range) {
            valueElement.style.color = range.color;
            valueElement.style.backgroundColor = range.backgroundColor;
          }
        }
      }
    }
  }
  
  getCurrentParamValue(paramId, trigger) {
    // Extract value based on element type
    if (trigger.tagName === 'INPUT') {
      return trigger.value;
    } else if (trigger.tagName === 'SELECT') {
      return trigger.options[trigger.selectedIndex].text;
    } else if (trigger.dataset.value) {
      return trigger.dataset.value;
    }
    
    return 'Not set';
  }
  
  updateParameterConfig(paramId, updates) {
    const param = this.parameters.get(paramId);
    if (!param) return;
    
    // Update parameter config
    Object.assign(param, updates);
    
    // Update tooltip if it exists
    const tooltip = this.tooltips.get(paramId);
    if (tooltip) {
      // Recreate tooltip with updated config
      document.body.removeChild(tooltip);
      const newTooltip = this.createParameterTooltip(paramId, param);
      this.tooltips.set(paramId, newTooltip);
      document.body.appendChild(newTooltip);
      
      // If this tooltip is currently active, show it again
      if (this.activeTooltip === paramId) {
        const trigger = document.querySelector(`[data-param="${paramId}"]`);
        if (trigger) {
          this.showParameterTooltip(paramId, trigger);
        }
      }
    }
  }
}

// Example usage
const paramTooltips = new AIParameterTooltipSystem();

// Register AI parameters
paramTooltips.registerParameter('temperature', {
  name: 'Temperature',
  description: 'Controls randomness in AI responses. Lower values make output more deterministic, higher values more creative.',
  icon: '🌡️',
  currentValue: '0.7',
  effects: [
    {
      icon: '🎯',
      description: 'Low (0-0.3): More focused, consistent output'
    },
    {
      icon: '⚖️',
      description: 'Medium (0.4-0.7): Balanced creativity and coherence'
    },
    {
      icon: '🎨',
      description: 'High (0.8-1.0): More diverse, creative output'
    }
  ],
  recommendation: 'Use 0.7 for most content generation tasks. Adjust based on desired creativity level.',
  actions: [
    {
      id: 'set-low',
      label: 'Set Low',
      type: 'secondary'
    },
    {
      id: 'set-medium',
      label: 'Set Medium',
      type: 'primary'
    },
    {
      id: 'set-high',
      label: 'Set High',
      type: 'secondary'
    }
  ],
  valueRanges: [
    { min: 0, max: 0.3, color: 'var(--sys-color-primary-40)', backgroundColor: 'var(--sys-color-primary-95)' },
    { min: 0.4, max: 0.7, color: 'var(--sys-color-roles-success-color-role-success-role)', backgroundColor: 'var(--sys-color-roles-success-color-role-success-role-container)' },
    { min: 0.8, max: 1.0, color: 'var(--sys-color-roles-warning-color-role-warning-role)', backgroundColor: 'var(--sys-color-roles-warning-color-role-warning-role-container)' }
  ],
  updateValueOnShow: true
});

paramTooltips.registerParameter('max-tokens', {
  name: 'Max Tokens',
  description: 'Maximum length of AI response in tokens. Affects response detail and API cost.',
  icon: '📏',
  currentValue: '1000',
  effects: [
    {
      icon: '📄',
      description: 'Short (1-500): Concise responses, lower cost'
    },
    {
      icon: '📑',
      description: 'Medium (501-1500): Detailed responses, balanced cost'
    },
    {
      icon: '📚',
      description: 'Long (1501+): Comprehensive responses, higher cost'
    }
  ],
  recommendation: 'Set based on content type: 500 for social media, 1000 for articles, 2000+ for reports.'
});
```

### AI Feature Discovery System
```javascript
// Example: AI feature discovery with teaching tooltips
class AIFeatureDiscovery {
  constructor() {
    this.features = new Map();
    this.tutorials = new Map();
    this.activeTutorial = null;
    this.userProgress = new Map();
  }
  
  registerFeature(featureId, config) {
    this.features.set(featureId, {
      ...config,
      discovered: this.getUserProgress(featureId, 'discovered') || false,
      tutorialCompleted: this.getUserProgress(featureId, 'tutorialCompleted') || false
    });
    
    // Create tutorial if provided
    if (config.tutorial) {
      this.registerTutorial(featureId, config.tutorial);
    }
    
    // Check if feature should be introduced
    this.checkFeatureIntroduction(featureId);
  }
  
  registerTutorial(featureId, tutorialConfig) {
    this.tutorials.set(featureId, {
      ...tutorialConfig,
      currentStep: 0,
      totalSteps: tutorialConfig.steps.length
    });
    
    // Create teaching tooltip
    const tooltip = this.createTeachingTooltip(featureId, tutorialConfig);
    document.body.appendChild(tooltip);
  }
  
  createTeachingTooltip(featureId, tutorialConfig) {
    const tooltip = document.createElement('div');
    tooltip.id = `tooltip-tutorial-${featureId}`;
    tooltip.className = 'tooltip tooltip-teaching';
    tooltip.setAttribute('role', 'dialog');
    tooltip.setAttribute('aria-label', `${tutorialConfig.title} tutorial`);
    tooltip.setAttribute('aria-hidden', 'true');
    
    // Set initial content for step 0
    this.updateTeachingTooltip(tooltip, featureId, 0);
    
    return tooltip;
  }
  
  updateTeachingTooltip(tooltip, featureId, stepIndex) {
    const tutorial = this.tutorials.get(featureId);
    if (!tutorial || !tutorial.steps[stepIndex]) return;
    
    const step = tutorial.steps[stepIndex];
    const totalSteps = tutorial.steps.length;
    
    tooltip.innerHTML = `
      <div class="tooltip-teaching-header">
        <h3 class="tooltip-teaching-title">${step.title || tutorial.title}</h3>
        <button class="tooltip-teaching-dismiss" aria-label="Dismiss tutorial">
          ×
        </button>
      </div>
      <p class="tooltip-teaching-content">${step.content}</p>
      
      ${totalSteps > 1 ? `
        <div class="tooltip-teaching-steps">
          ${tutorial.steps.map((_, index) => `
            <span class="tooltip-teaching-step ${index === stepIndex ? 'active' : ''}" 
                  aria-current="${index === stepIndex ? 'step' : 'false'}">
              ${index + 1}
            </span>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="tooltip-teaching-navigation">
        ${stepIndex > 0 ? `
          <button class="tooltip-teaching-nav-button secondary" data-action="prev">
            Previous
          </button>
        ` : `
          <button class="tooltip-teaching-skip" data-action="skip">
            Skip Tutorial
          </button>
        `}
        
        ${stepIndex < totalSteps - 1 ? `
          <button class="tooltip-teaching-nav-button primary" data-action="next">
            Next
          </button>
        ` : `
          <button class="tooltip-teaching-nav-button primary" data-action="complete">
            Got it!
          </button>
        `}
      </div>
    `;
    
    // Add event listeners
    const dismissBtn = tooltip.querySelector('.tooltip-teaching-dismiss');
    const skipBtn = tooltip.querySelector('.tooltip-teaching-skip');
    const prevBtn = tooltip.querySelector('[data-action="prev"]');
    const nextBtn = tooltip.querySelector('[data-action="next"]');
    const completeBtn = tooltip.querySelector('[data-action="complete"]');
    
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        this.dismissTutorial(featureId);
      });
    }
    
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.skipTutorial(featureId);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.navigateTutorial(featureId, stepIndex - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.navigateTutorial(featureId, stepIndex + 1);
      });
    }
    
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        this.completeTutorial(featureId);
      });
    }
  }
  
  checkFeatureIntroduction(featureId) {
    const feature = this.features.get(featureId);
    if (!feature || feature.discovered || !feature.autoIntroduce) return;
    
    // Check if conditions are met for auto-introduction
    const shouldIntroduce = this.evaluateIntroductionConditions(feature);
    
    if (shouldIntroduce) {
      this.introduceFeature(featureId);
    }
  }
  
  evaluateIntroductionConditions(feature) {
    if (!feature.introductionConditions) return true;
    
    // Evaluate each condition
    return feature.introductionConditions.every(condition => {
      switch (condition.type) {
        case 'usageCount':
          const usage = this.getUsageCount(condition.featureId);
          return usage >= condition.min;
        case 'timeSinceSignup':
          const signupTime = this.getSignupTime();
          return Date.now() - signupTime >= condition.minDays * 24 * 60 * 60 * 1000;
        case 'featureUsed':
          return this.isFeatureUsed(condition.featureId);
        case 'custom':
          return condition.evaluate();
        default:
          return true;
      }
    });
  }
  
  introduceFeature(featureId) {
    const feature = this.features.get(featureId);
    if (!feature || feature.discovered) return;
    
    // Mark as discovered
    feature.discovered = true;
    this.saveUserProgress(featureId, 'discovered', true);
    
    // Show discovery tooltip
    this.showDiscoveryTooltip(featureId);
    
    // Track discovery event
    this.trackDiscovery(featureId);
  }
  
  showDiscoveryTooltip(featureId) {
    const feature = this.features.get(featureId);
    if (!feature) return;
    
    // Create discovery tooltip
    const tooltip = this.createDiscoveryTooltip(featureId, feature);
    document.body.appendChild(tooltip);
    
    // Position near the feature element
    const featureElement = document.querySelector(feature.selector);
    if (featureElement) {
      this.positionDiscoveryTooltip(tooltip, featureElement);
    }
    
    // Show tooltip
    tooltip.setAttribute('aria-hidden', 'false');
    tooltip.classList.add('show');
    
    // Auto-dismiss after delay
    setTimeout(() => {
      this.dismissDiscoveryTooltip(tooltip, featureId);
    }, feature.discoveryDuration || 8000);
  }
  
  createDiscoveryTooltip(featureId, feature) {
    const tooltip = document.createElement('div');
    tooltip.id = `tooltip-discovery-${featureId}`;
    tooltip.className = 'tooltip tooltip-ai-feature';
    tooltip.setAttribute('role', 'dialog');
    tooltip.setAttribute('aria-label', `New feature: ${feature.name}`);
    tooltip.setAttribute('aria-hidden', 'true');
    
    tooltip.innerHTML = `
      <div class="tooltip-ai-feature-badge">New Feature</div>
      <div class="tooltip-ai-feature-title">
        <span class="tooltip-ai-feature-icon">${feature.icon || '✨'}</span>
        <span class="tooltip-ai-feature-name">${feature.name}</span>
      </div>
      <p class="tooltip-ai-feature-description">${feature.description}</p>
      
      ${feature.benefits ? `
        <div class="tooltip-ai-feature-benefits">
          ${feature.benefits.map(benefit => `
            <div class="tooltip-ai-feature-benefit">
              <span class="tooltip-ai-feature-benefit-icon">${benefit.icon || '✓'}</span>
              <span>${benefit.text}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${feature.example ? `
        <div class="tooltip-ai-feature-example">
          Example: ${feature.example}
        </div>
      ` : ''}
      
      <div class="tooltip-ai-feature-cta">
        <button class="tooltip-rich-action primary" data-action="try-now">
          Try it now
        </button>
        <button class="tooltip-rich-action secondary" data-action="learn-more">
          Learn more
        </button>
      </div>
    `;
    
    // Add event listeners
    const tryBtn = tooltip.querySelector('[data-action="try-now"]');
    const learnBtn = tooltip.querySelector('[data-action="learn-more"]');
    
    if (tryBtn) {
      tryBtn.addEventListener('click', () => {
        this.handleTryFeature(featureId);
        this.dismissDiscoveryTooltip(tooltip, featureId);
      });
    }
    
    if (learnBtn) {
      learnBtn.addEventListener('click', () => {
        this.showTutorial(featureId);
        this.dismissDiscoveryTooltip(tooltip, featureId);
      });
    }
    
    return tooltip;
  }
  
  showTutorial(featureId) {
    const tutorial = this.tutorials.get(featureId);
    if (!tutorial) return;
    
    // Hide any active tutorial
    if (this.activeTutorial) {
      this.hideTutorial(this.activeTutorial);
    }
    
    // Show tutorial tooltip
    const tooltip = document.getElementById(`tooltip-tutorial-${featureId}`);
    if (tooltip) {
      tooltip.setAttribute('aria-hidden', 'false');
      tooltip.classList.add('show');
      
      // Position tooltip
      const featureElement = document.querySelector(`[data-feature="${featureId}"]`);
      if (featureElement) {
        this.positionTeachingTooltip(tooltip, featureElement);
      }
      
      this.activeTutorial = featureId;
      tutorial.currentStep = 0;
      
      // Update tooltip content for first step
      this.updateTeachingTooltip(tooltip, featureId, 0);
    }
  }
  
  navigateTutorial(featureId, stepIndex) {
    const tutorial = this.tutorials.get(featureId);
    if (!tutorial || !tutorial.steps[stepIndex]) return;
    
    tutorial.currentStep = stepIndex;
    
    const tooltip = document.getElementById(`tooltip-tutorial-${featureId}`);
    if (tooltip) {
      this.updateTeachingTooltip(tooltip, featureId, stepIndex);
    }
  }
  
  completeTutorial(featureId) {
    const feature = this.features.get(featureId);
    if (feature) {
      feature.tutorialCompleted = true;
      this.saveUserProgress(featureId, 'tutorialCompleted', true);
    }
    
    this.hideTutorial(featureId);
    
    // Track completion
    this.trackTutorialCompletion(featureId);
  }
  
  skipTutorial(featureId) {
    this.hideTutorial(featureId);
    
    // Track skip
    this.trackTutorialSkip(featureId);
  }
  
  dismissTutorial(featureId) {
    this.hideTutorial(featureId);
  }
  
  hideTutorial(featureId) {
    const tooltip = document.getElementById(`tooltip-tutorial-${featureId}`);
    if (tooltip) {
      tooltip.setAttribute('aria-hidden', 'true');
      tooltip.classList.remove('show');
      tooltip.classList.add('hide');
    }
    
    if (this.activeTutorial === featureId) {
      this.activeTutorial = null;
    }
  }
  
  dismissDiscoveryTooltip(tooltip, featureId) {
    if (tooltip && tooltip.parentNode) {
      tooltip.parentNode.removeChild(tooltip);
    }
  }
  
  handleTryFeature(featureId) {
    const feature = this.features.get(featureId);
    if (!feature) return;
    
    // Trigger feature action
    if (feature.onTry) {
      feature.onTry();
    }
    
    // Navigate to feature if specified
    if (feature.navigateTo) {
      window.location.href = feature.navigateTo;
    }
    
    // Track usage
    this.trackFeatureTry(featureId);
  }
  
  positionDiscoveryTooltip(tooltip, targetElement) {
    // Similar positioning logic as parameter tooltips
    this.positionTooltipNearElement(tooltip, targetElement, 'bottom');
  }
  
  positionTeachingTooltip(tooltip, targetElement) {
    // Center teaching tooltips on screen or position near element
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Center on mobile
      tooltip.style.position = 'fixed';
      tooltip.style.top = '50%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
    } else {
      // Position near element on desktop
      this.positionTooltipNearElement(tooltip, targetElement, 'right');
    }
  }
  
  positionTooltipNearElement(tooltip, targetElement, preferredPosition) {
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top, left;
    const offset = 20;
    
    switch (preferredPosition) {
      case 'top':
        top = targetRect.top - tooltipRect.height - offset;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + offset;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + offset;
        break;
    }
    
    // Adjust if out of viewport
    top = Math.max(10, Math.min(top, window.innerHeight - tooltipRect.height - 10));
    left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
  
  getUserProgress(featureId, key) {
    const progress = this.userProgress.get(featureId);
    return progress ? progress[key] : null;
  }
  
  saveUserProgress(featureId, key, value) {
    if (!this.userProgress.has(featureId)) {
      this.userProgress.set(featureId, {});
    }
    
    this.userProgress.get(featureId)[key] = value;
    
    // Save to localStorage
    localStorage.setItem(`ai-feature-${featureId}-${key}`, JSON.stringify(value));
  }
  
  getUsageCount(featureId) {
    const count = localStorage.getItem(`usage-${featureId}`);
    return count ? parseInt(count, 10) : 0;
  }
  
  getSignupTime() {
    const signupTime = localStorage.getItem('signup-time');
    return signupTime ? parseInt(signupTime, 10) : Date.now();
  }
  
  isFeatureUsed(featureId) {
    return this.getUsageCount(featureId) > 0;
  }
  
  trackDiscovery(featureId) {
    // Send analytics event
    console.log(`Feature discovered: ${featureId}`);
  }
  
  trackFeatureTry(featureId) {
    // Send analytics event
    console.log(`Feature tried: ${featureId}`);
  }
  
  trackTutorialCompletion(featureId) {
    // Send analytics event
    console.log(`Tutorial completed: ${featureId}`);
  }
  
  trackTutorialSkip(featureId) {
    // Send analytics event
    console.log(`Tutorial skipped: ${featureId}`);
  }
}

// Example usage
const featureDiscovery = new AIFeatureDiscovery();

// Register AI features
featureDiscovery.registerFeature('ai-templates', {
  name: 'AI Templates',
  description: 'Pre-built templates for different content types with AI-powered customization.',
  icon: '📋',
  selector: '[data-feature="ai-templates"]',
  autoIntroduce: true,
  discoveryDuration: 10000,
  introductionConditions: [
    {
      type: 'usageCount',
      featureId: 'content-generator',
      min: 3
    },
    {
      type: 'timeSinceSignup',
      minDays: 1
    }
  ],
  benefits: [
    {
      icon: '⚡',
      text: 'Save time with pre-built structures'
    },
    {
      icon: '🎯',
      text: 'Optimized for different content types'
    },
    {
      icon: '🔄',
      text: 'Easy customization with AI assistance'
    }
  ],
  example: 'Try the "Blog Post Outline" template for structured articles.',
  onTry: () => {
    // Open template selector
    document.querySelector('.template-selector').click();
  },
  tutorial: {
    title: 'AI Templates Tutorial',
    steps: [
      {
        title: 'Welcome to AI Templates',
        content: 'AI Templates help you create content faster with pre-built structures optimized for different purposes.'
      },
      {
        title: 'Browse Templates',
        content: 'Click the Templates button to browse categories like Blog Posts, Social Media, Emails, and more.'
      },
      {
        title: 'Customize with AI',
        content: 'After selecting a template, use AI to customize it for your specific needs and audience.'
      },
      {
        title: 'Save Your Own',
        content: 'Save your customized templates for future use and share them with your team.'
      }
    ]
  }
});

featureDiscovery.registerFeature('content-analyzer', {
  name: 'Content Analyzer',
  description: 'AI-powered analysis of your content for quality, SEO, and readability.',
  icon: '📊',
  selector: '[data-feature="content-analyzer"]',
  autoIntroduce: true,
  introductionConditions: [
    {
      type: 'usageCount',
      featureId: 'content-generator',
      min: 5
    }
  ],
  benefits: [
    {
      icon: '🔍',
      text: 'Identify areas for improvement'
    },
    {
      icon: '📈',
      text: 'Optimize for search engines'
    },
    {
      icon: '🎯',
      text: 'Improve readability scores'
    }
  ],
  onTry: () => {
    // Open content analyzer
    document.querySelector('.analyze-button').click();
  }
});
```

---

*This tooltip system ensures consistent, accessible, and user-friendly tooltip components across ContentSplit. All tooltip components should follow Material Design 3 guidelines and use the design token system for styling.*