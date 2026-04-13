# ContentSplit Toast System

## Overview

The ContentSplit Toast System follows Google Material Design 3 guidelines for transient notifications (Snackbars). Toasts provide brief feedback about an operation through a message at the bottom of the screen. They disappear automatically after a timeout or can be dismissed by the user.

## Material Design 3 Toast Principles

### Core Principles
1. **Transient**: Appear temporarily (4-10 seconds) then auto-dismiss
2. **Non-disruptive**: Appear at the bottom, above other UI elements
3. **Actionable**: May contain a single action button
4. **Stackable**: Multiple toasts can stack vertically
5. **Accessible**: Support screen readers and keyboard navigation

## Toast Types (Material Design 3)

### 1. Standard Toast
Basic notification with text message only.

**Usage:** Informational messages, success confirmations
**Duration:** 4 seconds
**Position:** Bottom center (above FAB if present)

### 2. Action Toast
Includes a single action button for user interaction.

**Usage:** Undo actions, retry failed operations
**Duration:** 10 seconds (longer for actionable toasts)
**Position:** Bottom center

### 3. Stacked Toast
Multiple lines of text with optional action.

**Usage:** Longer messages with actions
**Duration:** 10 seconds
**Position:** Bottom center

### 4. Floating Toast (Snackbar)
Appears above other content with slight elevation.

**Usage:** Critical notifications requiring attention
**Duration:** User-dismissed only
**Position:** Bottom center, above navigation bars

## Anatomy

```
┌─────────────────────────────────────────────┐
│  [Icon] Message text              [Action]  │
└─────────────────────────────────────────────┘
```

### Components
1. **Container**: Rounded rectangle with background color
2. **Icon** (optional): Leading icon indicating type
3. **Message**: Primary text content
4. **Action** (optional): Text button for user action
5. **Dismiss** (optional): Close button (X icon)

## Design Tokens

### Container Tokens
```css
/* Toast container styles */
--sys-toast-background-color: var(--sys-color-neutral-10);
--sys-toast-text-color: var(--sys-color-neutral-100);
--sys-toast-border-radius: var(--sys-radius-md);
--sys-toast-elevation: var(--sys-elevation-3);
--sys-toast-padding: var(--sys-spacing-md);
--sys-toast-gap: var(--sys-spacing-sm);
```

### Icon Tokens
```css
/* Icon colors by type */
--sys-toast-icon-color-info: var(--sys-color-roles-primary-color-role-primary-role);
--sys-toast-icon-color-success: var(--sys-color-roles-success-color-role-success-role);
--sys-toast-icon-color-warning: var(--sys-color-roles-warning-color-role-warning-role);
--sys-toast-icon-color-error: var(--sys-color-roles-error-color-role-error-role);
```

### Action Button Tokens
```css
/* Action button styles */
--sys-toast-action-background: transparent;
--sys-toast-action-text-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-toast-action-hover-background: var(--sys-color-primary-95);
--sys-toast-action-padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
```

## Toast Implementation

### Standard Toast
```css
.toast {
  display: flex;
  align-items: center;
  gap: var(--sys-toast-gap);
  padding: var(--sys-toast-padding);
  background-color: var(--sys-toast-background-color);
  color: var(--sys-toast-text-color);
  border-radius: var(--sys-toast-border-radius);
  box-shadow: var(--sys-toast-elevation);
  max-width: 600px;
  min-width: 300px;
  animation: toast-slide-up 0.3s ease-out;
}

.toast-message {
  flex: 1;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  line-height: var(--sys-typography-body-text-line-height);
  margin: 0;
}
```

### Action Toast
```css
.toast-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.toast-action-button {
  background: var(--sys-toast-action-background);
  color: var(--sys-toast-action-text-color);
  border: none;
  padding: var(--sys-toast-action-padding);
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  text-transform: uppercase;
  cursor: pointer;
  margin-left: var(--sys-spacing-md);
  white-space: nowrap;
}

.toast-action-button:hover {
  background-color: var(--sys-toast-action-hover-background);
}
```

### Stacked Toast
```css
.toast-stacked {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--sys-spacing-xs);
}

.toast-stacked .toast-message {
  margin-bottom: var(--sys-spacing-xs);
}

.toast-stacked .toast-actions {
  align-self: flex-end;
  display: flex;
  gap: var(--sys-spacing-sm);
}
```

## States

### Default State
```css
.toast {
  opacity: 1;
  transform: translateY(0);
}
```

### Enter Animation
```css
@keyframes toast-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Exit Animation
```css
@keyframes toast-slide-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.toast-exiting {
  animation: toast-slide-down 0.3s ease-in forwards;
}
```

### Hover State
```css
.toast:hover {
  box-shadow: var(--sys-elevation-4);
}
```

### Focus State
```css
.toast:focus-within {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}
```

## Positioning

### Bottom Center (Default)
```css
.toast-container {
  position: fixed;
  bottom: var(--sys-spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--sys-z-index-toast, 1000);
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-sm);
  align-items: center;
  pointer-events: none;
}

.toast-container > * {
  pointer-events: auto;
}
```

### Bottom Start (Left-aligned)
```css
.toast-container-start {
  left: var(--sys-spacing-lg);
  transform: none;
  align-items: flex-start;
}
```

### Bottom End (Right-aligned)
```css
.toast-container-end {
  left: auto;
  right: var(--sys-spacing-lg);
  transform: none;
  align-items: flex-end;
}
```

### Top Positions
```css
.toast-container-top {
  top: var(--sys-spacing-lg);
  bottom: auto;
}

.toast-container-top-start {
  top: var(--sys-spacing-lg);
  left: var(--sys-spacing-lg);
  bottom: auto;
  transform: none;
}

.toast-container-top-end {
  top: var(--sys-spacing-lg);
  right: var(--sys-spacing-lg);
  bottom: auto;
  transform: none;
}
```

## Toast Types with Icons

### Informational Toast
```css
.toast-info {
  border-left: 4px solid var(--sys-toast-icon-color-info);
}

.toast-info .toast-icon {
  color: var(--sys-toast-icon-color-info);
}
```

### Success Toast
```css
.toast-success {
  border-left: 4px solid var(--sys-toast-icon-color-success);
}

.toast-success .toast-icon {
  color: var(--sys-toast-icon-color-success);
}
```

### Warning Toast
```css
.toast-warning {
  border-left: 4px solid var(--sys-toast-icon-color-warning);
}

.toast-warning .toast-icon {
  color: var(--sys-toast-icon-color-warning);
}
```

### Error Toast
```css
.toast-error {
  border-left: 4px solid var(--sys-toast-icon-color-error);
}

.toast-error .toast-icon {
  color: var(--sys-toast-icon-color-error);
}
```

## Toast Stacking

### Single Toast
```css
.toast-container > .toast {
  margin-bottom: var(--sys-spacing-sm);
}

.toast-container > .toast:last-child {
  margin-bottom: 0;
}
```

### Multiple Toasts (Stacked)
```css
.toast-stack {
  display: flex;
  flex-direction: column-reverse; /* Newest at the top */
  gap: var(--sys-spacing-xs);
  max-height: 80vh;
  overflow-y: auto;
}
```

### Toast Limit
```css
/* Maximum 3 visible toasts */
.toast-container > .toast:nth-child(n+4) {
  display: none;
}
```

## Duration & Timing

### Auto-dismiss
```css
.toast-auto-dismiss {
  animation: toast-progress 4s linear forwards;
}

@keyframes toast-progress {
  from { width: 100%; }
  to { width: 0%; }
}

.toast-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: var(--sys-color-primary-40);
  border-radius: 0 0 var(--sys-toast-border-radius) var(--sys-toast-border-radius);
}
```

### Extended Duration (Action Toasts)
```css
.toast-action .toast-progress-bar {
  animation-duration: 10s;
}
```

### Persistent Toasts
```css
.toast-persistent {
  /* No auto-dismiss */
}

.toast-persistent .toast-progress-bar {
  display: none;
}
```

## Accessibility

### Screen Reader Support
```css
.toast[role="status"] {
  /* Polite announcements */
}

.toast[role="alert"] {
  /* Assertive announcements for errors */
}

.toast[aria-live] {
  /* Live region announcements */
}
```

### Keyboard Navigation
```css
.toast:focus {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}

.toast-action-button:focus {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}
```

### ARIA Attributes
```html
<div class="toast" role="status" aria-live="polite" aria-atomic="true">
  <span class="toast-message">Message sent successfully</span>
  <button class="toast-action-button" aria-label="Undo send">Undo</button>
</div>
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  .toast {
    border: 2px solid var(--sys-color-neutral-0);
  }
  
  .toast-action-button {
    border: 1px solid var(--sys-color-neutral-0);
  }
}
```

## Toast in AI Interfaces

### AI Processing Toast
```css
.toast-ai-processing {
  background-color: var(--sys-color-primary-95);
  border-left: 4px solid var(--sys-color-primary-40);
}

.toast-ai-processing .toast-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### AI Response Success
```css
.toast-ai-success {
  background-color: var(--sys-color-success-95);
  border-left: 4px solid var(--sys-color-roles-success-color-role-success-role);
}
```

### AI Response Error
```css
.toast-ai-error {
  background-color: var(--sys-color-error-95);
  border-left: 4px solid var(--sys-color-roles-error-color-role-error-role);
}
```

### Content Generation Status
```css
.toast-content-generation {
  background-color: var(--sys-color-neutral-98);
  border: 1px solid var(--sys-color-neutral-90);
}

.toast-content-generation .toast-progress-bar {
  background: linear-gradient(90deg, 
    var(--sys-color-primary-40), 
    var(--sys-color-secondary-40)
  );
}
```

## Best Practices

### ✅ Do
- Use toasts for transient, non-critical feedback
- Keep messages concise (1-2 lines maximum)
- Include actionable buttons only when necessary
- Auto-dismiss after 4 seconds (10 seconds for actions)
- Stack toasts vertically with appropriate spacing
- Provide clear visual feedback for different toast types
- Ensure proper contrast for readability
- Support keyboard navigation and screen readers
- Test toast behavior across different screen sizes
- Limit visible toasts to 3 at a time

### ❌ Don't
- Don't use toasts for critical errors that require immediate action
- Don't place toasts where they block important UI elements
- Don't use multiple toasts for related actions (combine messages)
- Don't ignore toast stacking order (newest at the top)
- Don't forget to handle toast dismissal on mobile swipe
- Don't use aggressive animations that cause motion sickness
- Don't neglect toast positioning relative to navigation bars/FABs
- Don't hardcode colors - use design tokens
- Don't forget to test in high contrast mode
- Don't allow toasts to persist during user inactivity

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .toast {
    min-width: calc(100vw - var(--sys-spacing-lg) * 2);
    max-width: calc(100vw - var(--sys-spacing-lg) * 2);
    margin: 0 var(--sys-spacing-lg);
  }
  
  .toast-container {
    bottom: var(--sys-spacing-md);
  }
  
  .toast-stacked .toast-actions {
    align-self: stretch;
    flex-direction: column;
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .toast {
    max-width: 500px;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .toast {
    max-width: 600px;
  }
}
```

## Testing and Validation

### Visual Testing
1. **Positioning**: Verify toast appears in correct location
2. **Duration**: Test auto-dismiss timing
3. **Stacking**: Test multiple toast behavior
4. **Animations**: Ensure smooth enter/exit transitions
5. **Responsive**: Test across all breakpoints
6. **Contrast**: Verify text readability against background
7. **Focus**: Test keyboard navigation
8. **Screen Readers**: Test with NVDA/JAWS/VoiceOver

### Functional Testing
```javascript
// Example toast test
describe('Toast System', () => {
  test('Toast appears with correct message', () => {
    showToast('Operation successful');
    expect(document.querySelector('.toast')).toBeInTheDocument();
    expect(document.querySelector('.toast-message').textContent)
      .toBe('Operation successful');
  });
  
  test('Toast auto-dismisses after duration', async () => {
    showToast('Test', 4000);
    await new Promise(resolve => setTimeout(resolve, 4500));
    expect(document.querySelector('.toast')).not.toBeInTheDocument();
  });
});
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for toast styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/elevation.md` - Elevation tokens reference
- `skills/radius.md` - Radius tokens reference
- `component-specification.md` - Component specifications

### Toast Component Files
- `toast.css` - Toast styles (if separated)
- `toast.js` - Toast logic and behavior
- `toast.stories.js` - Storybook stories (if using Storybook)

## Integration with AI Systems

### AI Feedback Toasts
```javascript
// Example: Show AI processing toast
function showAIProcessingToast(message) {
  showToast({
    message: message,
    type: 'ai-processing',
    duration: null, // persistent
    icon: 'spinner'
  });
}

// Example: Show AI success toast
function showAISuccessToast(message) {
  showToast({
    message: message,
    type: 'success',
    duration: 4000,
    icon: 'check-circle'
  });
}
```

### Content Generation Updates
```javascript
// Toast for content generation progress
function showContentGenerationProgress(progress) {
  showToast({
    message: `Generating content... ${progress}%`,
    type: 'content-generation',
    duration: null,
    progress: progress
  });
}
```

---

*This toast system ensures consistent, accessible, and user-friendly notifications across ContentSplit. All toasts should follow Material Design 3 guidelines and use the design token system for styling.*