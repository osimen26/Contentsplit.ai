# ContentSplit Modal System

## Overview

The ContentSplit Modal System follows Google Material Design 3 guidelines for dialogs and modal surfaces. Modals are focused windows that appear above the main content, requiring user interaction before continuing. They are used for critical actions, confirmations, and focused tasks.

## Material Design 3 Modal Principles

### Core Principles
1. **Focus**: Modals focus user attention on a specific task or decision
2. **Temporary**: Appear temporarily and can be dismissed
3. **Layered**: Appear above other content with elevation
4. **Accessible**: Support keyboard navigation and screen readers
5. **Consistent**: Follow consistent patterns for similar actions

## Modal Types (Material Design 3)

### 1. Alert Dialog
Interrupts user flow for critical confirmation or decision.

**Usage:** Confirm destructive actions, important decisions
**Components:** Title, supporting text, action buttons
**Size:** Fixed width (560px max), auto height

### 2. Simple Dialog
Presents a list of items or simple choices.

**Usage:** Selection from options, simple choices
**Components:** Title (optional), list items, action buttons (optional)
**Size:** Fixed width (560px max)

### 3. Fullscreen Dialog
Covers the entire screen for complex tasks.

**Usage:** Complex forms, multi-step workflows
**Components:** Toolbar, content area, action buttons
**Size:** Fullscreen

### 4. Bottom Sheet
Slides up from the bottom of the screen.

**Usage:** Quick actions, secondary content
**Components:** Handle, content area, action buttons (optional)
**Size:** Variable height (up to 90% of screen)

### 5. Side Sheet
Slides in from the side (left or right).

**Usage:** Navigation, filters, secondary content
**Components:** Header, content area, action buttons (optional)
**Size:** Fixed width (400px-600px), full height

## Anatomy

### Alert Dialog Anatomy
```
┌─────────────────────────────────────────────┐
│  Title (optional)                           │
│                                             │
│  Supporting text (required)                 │
│                                             │
│  [Action buttons: Cancel | Confirm]         │
└─────────────────────────────────────────────┘
```

### Components
1. **Backdrop**: Semi-transparent overlay behind modal
2. **Container**: Rounded rectangle with elevation
3. **Title** (optional): Dialog title
4. **Content**: Primary message or UI components
5. **Actions**: Button group (typically 2 actions)
6. **Close Button** (optional): X icon for dismissal

## Design Tokens

### Backdrop Tokens
```css
/* Backdrop styles */
--sys-modal-backdrop-background: rgba(0, 0, 0, 0.32);
--sys-modal-backdrop-z-index: 100;
```

### Container Tokens
```css
/* Modal container styles */
--sys-modal-background-color: var(--sys-color-neutral-100);
--sys-modal-text-color: var(--sys-color-neutral-10);
--sys-modal-border-radius: var(--sys-radius-lg);
--sys-modal-elevation: var(--sys-elevation-5);
--sys-modal-padding: var(--sys-spacing-xl);
--sys-modal-gap: var(--sys-spacing-md);
--sys-modal-max-width: 560px;
--sys-modal-min-width: 280px;
```

### Title Tokens
```css
/* Title styles */
--sys-modal-title-font-family: var(--sys-typography-title-small-font-family);
--sys-modal-title-font-size: var(--sys-typography-title-small-font-size);
--sys-modal-title-font-weight: var(--sys-typography-title-small-font-weight);
--sys-modal-title-line-height: var(--sys-typography-title-small-line-height);
--sys-modal-title-color: var(--sys-color-neutral-10);
```

### Content Tokens
```css
/* Content styles */
--sys-modal-content-font-family: var(--sys-typography-body-text-font-family);
--sys-modal-content-font-size: var(--sys-typography-body-text-font-size);
--sys-modal-content-font-weight: var(--sys-typography-body-text-font-weight);
--sys-modal-content-line-height: var(--sys-typography-body-text-line-height);
--sys-modal-content-color: var(--sys-color-neutral-30);
```

### Action Button Tokens
```css
/* Action button styles */
--sys-modal-action-gap: var(--sys-spacing-sm);
--sys-modal-action-button-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
```

## Modal Implementation

### Base Modal Structure
```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sys-modal-backdrop-background);
  z-index: var(--sys-modal-backdrop-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sys-spacing-lg);
  animation: backdrop-fade-in 0.2s ease-out;
}

.modal-container {
  background-color: var(--sys-modal-background-color);
  color: var(--sys-modal-text-color);
  border-radius: var(--sys-modal-border-radius);
  box-shadow: var(--sys-modal-elevation);
  max-width: var(--sys-modal-max-width);
  min-width: var(--sys-modal-min-width);
  width: 100%;
  animation: modal-slide-up 0.3s ease-out;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - var(--sys-spacing-lg) * 2);
  overflow: hidden;
}
```

### Alert Dialog
```css
.modal-alert {
  padding: var(--sys-modal-padding);
  display: flex;
  flex-direction: column;
  gap: var(--sys-modal-gap);
}

.modal-alert-title {
  font-family: var(--sys-modal-title-font-family);
  font-size: var(--sys-modal-title-font-size);
  font-weight: var(--sys-modal-title-font-weight);
  line-height: var(--sys-modal-title-line-height);
  color: var(--sys-modal-title-color);
  margin: 0;
}

.modal-alert-content {
  font-family: var(--sys-modal-content-font-family);
  font-size: var(--sys-modal-content-font-size);
  font-weight: var(--sys-modal-content-font-weight);
  line-height: var(--sys-modal-content-line-height);
  color: var(--sys-modal-content-color);
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.modal-alert-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--sys-modal-action-gap);
  margin-top: var(--sys-spacing-md);
}
```

### Simple Dialog (List)
```css
.modal-simple {
  padding: 0;
  max-height: 60vh;
}

.modal-simple-title {
  padding: var(--sys-spacing-lg) var(--sys-spacing-xl) var(--sys-spacing-md);
  font-family: var(--sys-modal-title-font-family);
  font-size: var(--sys-modal-title-font-size);
  font-weight: var(--sys-modal-title-font-weight);
  line-height: var(--sys-modal-title-line-height);
  color: var(--sys-modal-title-color);
  margin: 0;
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.modal-simple-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.modal-simple-item {
  padding: var(--sys-spacing-md) var(--sys-spacing-xl);
  border-bottom: 1px solid var(--sys-color-neutral-95);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-simple-item:hover {
  background-color: var(--sys-color-neutral-98);
}

.modal-simple-item:last-child {
  border-bottom: none;
}
```

### Fullscreen Dialog
```css
.modal-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  max-width: none;
  max-height: none;
  display: flex;
  flex-direction: column;
  animation: modal-fade-in 0.3s ease-out;
}

.modal-fullscreen-header {
  display: flex;
  align-items: center;
  padding: var(--sys-spacing-md) var(--sys-spacing-lg);
  border-bottom: 1px solid var(--sys-color-neutral-90);
  min-height: 64px;
}

.modal-fullscreen-title {
  flex: 1;
  font-family: var(--sys-modal-title-font-family);
  font-size: var(--sys-modal-title-font-size);
  font-weight: var(--sys-modal-title-font-weight);
  line-height: var(--sys-modal-title-line-height);
  color: var(--sys-modal-title-color);
  margin: 0;
}

.modal-fullscreen-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--sys-spacing-lg);
}

.modal-fullscreen-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--sys-modal-action-gap);
  padding: var(--sys-spacing-md) var(--sys-spacing-lg);
  border-top: 1px solid var(--sys-color-neutral-90);
}
```

### Bottom Sheet
```css
.modal-bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: none;
  max-height: 90vh;
  border-radius: var(--sys-modal-border-radius) var(--sys-modal-border-radius) 0 0;
  animation: bottom-sheet-slide-up 0.3s ease-out;
}

.modal-bottom-sheet-handle {
  width: 40px;
  height: 4px;
  background-color: var(--sys-color-neutral-80);
  border-radius: 2px;
  margin: var(--sys-spacing-md) auto;
}

.modal-bottom-sheet-content {
  padding: 0 var(--sys-spacing-lg) var(--sys-spacing-lg);
  overflow-y: auto;
  max-height: calc(90vh - 60px);
}
```

### Side Sheet
```css
.modal-side-sheet {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 90vw;
  max-height: none;
  border-radius: var(--sys-modal-border-radius) 0 0 var(--sys-modal-border-radius);
  animation: side-sheet-slide-in 0.3s ease-out;
}

.modal-side-sheet-left {
  left: 0;
  right: auto;
  border-radius: 0 var(--sys-modal-border-radius) var(--sys-modal-border-radius) 0;
}

.modal-side-sheet-header {
  display: flex;
  align-items: center;
  padding: var(--sys-spacing-lg);
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.modal-side-sheet-content {
  padding: var(--sys-spacing-lg);
  overflow-y: auto;
  height: calc(100vh - 120px);
}
```

## States & Animations

### Backdrop Fade In
```css
@keyframes backdrop-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Modal Slide Up
```css
@keyframes modal-slide-up {
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

### Bottom Sheet Slide Up
```css
@keyframes bottom-sheet-slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

### Side Sheet Slide In
```css
@keyframes side-sheet-slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes side-sheet-slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

### Modal Exit Animations
```css
.modal-exiting {
  animation: modal-slide-down 0.3s ease-in forwards;
}

@keyframes modal-slide-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

## Focus Management

### Initial Focus
```css
.modal-container:focus {
  outline: none;
}

.modal-container[aria-modal="true"] {
  /* Ensure modal is focusable */
}
```

### Focus Trap
```javascript
// Example: Trap focus within modal
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  firstElement.focus();
}
```

### Return Focus
```javascript
// Example: Return focus to triggering element
let previousActiveElement;

function openModal() {
  previousActiveElement = document.activeElement;
  // Show modal
}

function closeModal() {
  // Hide modal
  if (previousActiveElement) {
    previousActiveElement.focus();
  }
}
```

## Accessibility

### ARIA Attributes
```html
<div class="modal-backdrop" aria-hidden="true">
  <div class="modal-container" 
       role="dialog" 
       aria-modal="true" 
       aria-labelledby="modal-title"
       aria-describedby="modal-description">
    <h2 id="modal-title">Delete document?</h2>
    <p id="modal-description">This action cannot be undone.</p>
    <div class="modal-actions">
      <button>Cancel</button>
      <button>Delete</button>
    </div>
  </div>
</div>
```

### Screen Reader Support
```css
/* Hide backdrop from screen readers when modal is open */
.modal-backdrop[aria-hidden="true"] {
  visibility: hidden;
}

.modal-container[aria-modal="true"] {
  /* Ensure modal is announced */
}
```

### Keyboard Navigation
```css
.modal-container:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}

.modal-close-button:focus {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}
```

### Escape Key Support
```javascript
// Example: Close modal on Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOpen) {
    closeModal();
  }
});
```

## Modal Actions & Buttons

### Primary Action
```css
.modal-action-primary {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border: none;
  border-radius: var(--sys-radius-sm);
  padding: var(--sys-modal-action-button-padding);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  text-transform: uppercase;
  cursor: pointer;
  min-width: 64px;
}

.modal-action-primary:hover {
  background-color: var(--sys-color-primary-60);
}
```

### Secondary Action
```css
.modal-action-secondary {
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: 1px solid var(--sys-color-neutral-80);
  border-radius: var(--sys-radius-sm);
  padding: var(--sys-modal-action-button-padding);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  text-transform: uppercase;
  cursor: pointer;
  min-width: 64px;
}

.modal-action-secondary:hover {
  background-color: var(--sys-color-primary-95);
}
```

### Destructive Action
```css
.modal-action-destructive {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: var(--sys-color-roles-error-color-role-on-error-role);
  border: none;
  border-radius: var(--sys-radius-sm);
  padding: var(--sys-modal-action-button-padding);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  text-transform: uppercase;
  cursor: pointer;
  min-width: 64px;
}

.modal-action-destructive:hover {
  background-color: var(--sys-color-error-60);
}
```

## Modal in AI Interfaces

### AI Confirmation Modal
```css
.modal-ai-confirmation {
  border-left: 4px solid var(--sys-color-primary-40);
}

.modal-ai-confirmation-title {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
}

.modal-ai-confirmation-title::before {
  content: "🤖";
  font-size: 1.5em;
}
```

### Content Generation Modal
```css
.modal-content-generation {
  max-width: 800px;
}

.modal-content-generation-preview {
  background-color: var(--sys-color-neutral-98);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-md);
  padding: var(--sys-spacing-lg);
  margin: var(--sys-spacing-md) 0;
  max-height: 400px;
  overflow-y: auto;
}

.modal-content-generation-controls {
  display: flex;
  gap: var(--sys-spacing-md);
  margin-top: var(--sys-spacing-lg);
}
```

### AI Settings Modal
```css
.modal-ai-settings {
  max-width: 600px;
}

.modal-ai-settings-section {
  margin-bottom: var(--sys-spacing-xl);
}

.modal-ai-settings-section-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  font-weight: var(--sys-typography-title-small-font-weight);
  margin-bottom: var(--sys-spacing-md);
  color: var(--sys-color-neutral-20);
}

.modal-ai-settings-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sys-spacing-md) 0;
  border-bottom: 1px solid var(--sys-color-neutral-95);
}
```

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .modal-container {
    margin: var(--sys-spacing-md);
    max-width: calc(100vw - var(--sys-spacing-md) * 2);
  }
  
  .modal-fullscreen {
    margin: 0;
  }
  
  .modal-bottom-sheet {
    border-radius: var(--sys-radius-lg) var(--sys-radius-lg) 0 0;
  }
  
  .modal-side-sheet {
    width: 100vw;
    max-width: 100vw;
    border-radius: 0;
  }
  
  .modal-alert-actions {
    flex-direction: column;
  }
  
  .modal-action-primary,
  .modal-action-secondary {
    width: 100%;
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .modal-container {
    max-width: 600px;
  }
  
  .modal-side-sheet {
    width: 400px;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .modal-container {
    max-width: 560px;
  }
  
  .modal-side-sheet {
    width: 400px;
  }
}
```

## Best Practices

### ✅ Do
- Use modals for focused tasks that require immediate attention
- Keep modal content concise and scannable
- Provide clear primary and secondary actions
- Ensure modal titles are descriptive and actionable
- Support keyboard navigation (Tab, Escape, Enter)
- Manage focus properly (trap focus, return focus)
- Use appropriate modal type for the task
- Test with screen readers and keyboard-only users
- Provide loading states for async operations
- Ensure sufficient color contrast

### ❌ Don't
- Don't use modals for non-essential information
- Don't nest modals within modals
- Don't use modals for error messages that can be inline
- Don't ignore mobile touch interactions
- Don't forget to handle long content (scrollable areas)
- Don't use modals for multi-step processes (consider wizard)
- Don't auto-focus destructive action buttons
- Don't ignore backdrop clicks for dismissible modals
- Don't use modals for primary navigation
- Don't forget to test with zoom/magnification

## Testing and Validation

### Visual Testing
1. **Positioning**: Verify modal appears centered and properly sized
2. **Animations**: Test enter/exit animations
3. **Responsive**: Test across all breakpoints
4. **Scroll Behavior**: Test with long content
5. **Focus Management**: Verify focus trapping and return
6. **Backdrop Interaction**: Test click outside to dismiss (if enabled)
7. **Keyboard Navigation**: Test Tab, Escape, Enter keys
8. **Screen Readers**: Test with NVDA/JAWS/VoiceOver

### Functional Testing
```javascript
// Example modal test
describe('Modal System', () => {
  test('Modal opens with correct content', () => {
    openModal({ title: 'Test', content: 'Test content' });
    expect(document.querySelector('.modal-container')).toBeInTheDocument();
    expect(document.querySelector('.modal-alert-title').textContent)
      .toBe('Test');
  });
  
  test('Modal closes on Escape key', () => {
    openModal({});
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.querySelector('.modal-container')).not.toBeInTheDocument();
  });
  
  test('Focus returns to trigger element', () => {
    const button = document.querySelector('.trigger-button');
    button.focus();
    openModal({});
    closeModal();
    expect(document.activeElement).toBe(button);
  });
});
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for modal styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/elevation.md` - Elevation tokens reference
- `skills/radius.md` - Radius tokens reference
- `component-specification.md` - Component specifications

### Modal Component Files
- `modal.css` - Modal styles (if separated)
- `modal.js` - Modal logic and behavior
- `modal.stories.js` - Storybook stories (if using Storybook)

## Integration with AI Systems

### AI Confirmation Flow
```javascript
// Example: Show AI confirmation modal
function showAIConfirmationModal(action, details) {
  return new Promise((resolve) => {
    openModal({
      type: 'alert',
      title: `AI Suggestion: ${action}`,
      content: details,
      actions: [
        { label: 'Cancel', type: 'secondary', action: () => resolve(false) },
        { label: 'Confirm', type: 'primary', action: () => resolve(true) }
      ]
    });
  });
}
```

### Content Generation Modal
```javascript
// Example: Show content generation modal
function showContentGenerationModal(options) {
  openModal({
    type: 'fullscreen',
    title: 'Generate Content',
    content: `
      <div class="content-generation-options">
        <!-- Options UI -->
      </div>
      <div class="content-preview"></div>
    `,
    actions: [
      { label: 'Cancel', type: 'secondary' },
      { label: 'Generate', type: 'primary', action: generateContent }
    ]
  });
}
```

### AI Settings Configuration
```javascript
// Example: Show AI settings modal
function showAISettingsModal(settings) {
  openModal({
    type: 'side-sheet',
    title: 'AI Settings',
    content: createSettingsForm(settings),
    actions: [
      { label: 'Reset', type: 'secondary' },
      { label: 'Save', type: 'primary', action: saveSettings }
    ]
  });
}
```

---

*This modal system ensures consistent, accessible, and user-friendly dialogs across ContentSplit. All modals should follow Material Design 3 guidelines and use the design token system for styling.*