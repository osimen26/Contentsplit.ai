# ContentSplit Notification System

## Overview

The ContentSplit Notification System follows Google Material Design 3 guidelines for persistent notifications (Banners) and status indicators (Badges). Banners display important messages that require user action, while badges indicate status or count on navigation items and icons.

## Material Design 3 Notification Principles

### Core Principles
1. **Persistent**: Banners remain until dismissed or action taken
2. **Contextual**: Appear near relevant content or at top of screen
3. **Actionable**: Include clear actions (dismiss, retry, etc.)
4. **Hierarchical**: Visual hierarchy matches importance (info → warning → error)
5. **Accessible**: Support screen readers and keyboard navigation

## Banner Types (Material Design 3)

### 1. Informational Banner
Communicates general information or updates.

**Usage:** System status, feature announcements
**Priority:** Low
**Actions:** Optional dismiss button
**Duration:** Until dismissed

### 2. Success Banner
Confirms successful completion of an operation.

**Usage:** Form submissions, successful updates
**Priority:** Medium
**Actions:** Optional dismiss, optional action (view details)
**Duration:** Auto-dismiss after 5 seconds or manual dismiss

### 3. Warning Banner
Alerts users about potential issues that require attention.

**Usage:** Deprecation warnings, non-critical errors
**Priority:** High
**Actions:** Recommended action, dismiss
**Duration:** Until addressed or dismissed

### 4. Error Banner
Indicates critical errors that prevent normal operation.

**Usage:** System failures, validation errors
**Priority:** Critical
**Actions:** Required action (retry, contact support), dismiss
**Duration:** Until resolved

### 5. Inline Banner
Appears within content context, not at top of screen.

**Usage:** Section-specific notifications, form-level errors
**Priority:** Contextual
**Actions:** Context-dependent
**Duration:** Until context changes

## Badge Types (Material Design 3)

### 1. Numeric Badge
Displays a count (e.g., unread notifications).

**Usage:** Notification counts, cart items
**Position:** Top-right corner of parent
**Size:** Small (16-24px diameter)
**Limit:** Show 99+ for counts > 99

### 2. Status Badge
Indicates status with color and optional icon.

**Usage:** Online status, verification status
**Position:** Overlapping element corner
**Size:** Small (8-12px diameter)
**Colors:** Green (active), Gray (inactive), Red (error)

### 3. Label Badge
Small text label for categorization.

**Usage:** Tags, categories, status labels
**Position:** Adjacent to content
**Size:** Based on content, with padding
**Shape:** Pill-shaped (full rounding)

### 4. Icon Badge
Icon-only indicator for subtle notifications.

**Usage:** New content indicator, attention needed
**Position:** Top-right corner
**Size:** Dot (6-8px diameter)
**Colors:** Primary color or semantic colors

## Anatomy

### Banner Anatomy
```
┌─────────────────────────────────────────────────────────┐
│  [Icon]  Title (optional)                               │
│          Description text                               │
│          [Primary Action]  [Secondary Action]  [Close]  │
└─────────────────────────────────────────────────────────┘
```

### Badge Anatomy
```
       [Parent Element]
          ┌───┐
          │ ● │  ← Badge (dot)
          └───┘
```

## Design Tokens

### Banner Tokens
```css
/* Banner container styles */
--sys-banner-background-color: var(--sys-color-neutral-100);
--sys-banner-border-color: var(--sys-color-neutral-90);
--sys-banner-border-radius: var(--sys-radius-md);
--sys-banner-border-width: 1px;
--sys-banner-padding: var(--sys-spacing-md);
--sys-banner-gap: var(--sys-spacing-sm);
--sys-banner-elevation: var(--sys-elevation-1);

/* Banner type colors */
--sys-banner-info-background: var(--sys-color-roles-primary-color-role-primary-container-role);
--sys-banner-info-border: var(--sys-color-roles-primary-color-role-primary-role);
--sys-banner-success-background: var(--sys-color-roles-success-color-role-success-container-role);
--sys-banner-success-border: var(--sys-color-roles-success-color-role-success-role);
--sys-banner-warning-background: var(--sys-color-roles-warning-color-role-warning-container-role);
--sys-banner-warning-border: var(--sys-color-roles-warning-color-role-warning-role);
--sys-banner-error-background: var(--sys-color-roles-error-color-role-error-container-role);
--sys-banner-error-border: var(--sys-color-roles-error-color-role-error-role);

/* Banner text colors */
--sys-banner-title-color: var(--sys-color-neutral-10);
--sys-banner-description-color: var(--sys-color-neutral-30);
--sys-banner-icon-color: currentColor;
```

### Badge Tokens
```css
/* Badge container styles */
--sys-badge-background-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-badge-text-color: var(--sys-color-roles-primary-color-role-on-primary-role);
--sys-badge-border-radius: var(--sys-radius-full);
--sys-badge-font-family: var(--sys-typography-label-small-font-family);
--sys-badge-font-size: var(--sys-typography-label-small-font-size);
--sys-badge-font-weight: var(--sys-typography-label-small-font-weight);
--sys-badge-line-height: var(--sys-typography-label-small-line-height);

/* Badge sizes */
--sys-badge-size-sm: 8px;
--sys-badge-size-md: 16px;
--sys-badge-size-lg: 24px;
--sys-badge-padding-sm: 2px;
--sys-badge-padding-md: var(--sys-spacing-xs) var(--sys-spacing-sm);
--sys-badge-padding-lg: var(--sys-spacing-xs) var(--sys-spacing-md);

/* Badge type colors */
--sys-badge-info-background: var(--sys-color-roles-primary-color-role-primary-role);
--sys-badge-success-background: var(--sys-color-roles-success-color-role-success-role);
--sys-badge-warning-background: var(--sys-color-roles-warning-color-role-warning-role);
--sys-badge-error-background: var(--sys-color-roles-error-color-role-error-role);
--sys-badge-neutral-background: var(--sys-color-neutral-60);
```

## Banner Implementation

### Base Banner Structure
```css
.banner {
  display: flex;
  align-items: flex-start;
  gap: var(--sys-banner-gap);
  padding: var(--sys-banner-padding);
  background-color: var(--sys-banner-background-color);
  border: var(--sys-banner-border-width) solid var(--sys-banner-border-color);
  border-radius: var(--sys-banner-border-radius);
  box-shadow: var(--sys-banner-elevation);
  width: 100%;
  animation: banner-slide-in 0.3s ease-out;
}

.banner-icon {
  color: var(--sys-banner-icon-color);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.banner-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

.banner-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  font-weight: var(--sys-typography-title-small-font-weight);
  line-height: var(--sys-typography-title-small-line-height);
  color: var(--sys-banner-title-color);
  margin: 0;
}

.banner-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-font-weight);
  line-height: var(--sys-typography-body-text-line-height);
  color: var(--sys-banner-description-color);
  margin: 0;
}

.banner-actions {
  display: flex;
  gap: var(--sys-spacing-sm);
  margin-top: var(--sys-spacing-sm);
  flex-wrap: wrap;
}

.banner-close {
  background: none;
  border: none;
  color: var(--sys-color-neutral-50);
  cursor: pointer;
  padding: var(--sys-spacing-xs);
  margin: -4px -4px -4px auto;
  border-radius: var(--sys-radius-xs);
}

.banner-close:hover {
  background-color: var(--sys-color-neutral-95);
}
```

### Banner Types
```css
/* Informational Banner */
.banner-info {
  background-color: var(--sys-banner-info-background);
  border-color: var(--sys-banner-info-border);
  border-left-width: 4px;
}

/* Success Banner */
.banner-success {
  background-color: var(--sys-banner-success-background);
  border-color: var(--sys-banner-success-border);
  border-left-width: 4px;
}

/* Warning Banner */
.banner-warning {
  background-color: var(--sys-banner-warning-background);
  border-color: var(--sys-banner-warning-border);
  border-left-width: 4px;
}

/* Error Banner (see errorusage.md for detailed error banners) */
.banner-error {
  background-color: var(--sys-banner-error-background);
  border-color: var(--sys-banner-error-border);
  border-left-width: 4px;
}
```

### Banner Positions
```css
/* Top banner (fixed position) */
.banner-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0;
  border-left: none;
  border-right: none;
  z-index: var(--sys-z-index-banner, 1100);
  animation: banner-slide-down 0.3s ease-out;
}

/* Inline banner (within content flow) */
.banner-inline {
  margin: var(--sys-spacing-md) 0;
}

/* Sticky banner (scrolls with content) */
.banner-sticky {
  position: sticky;
  top: 0;
  z-index: var(--sys-z-index-banner, 1100);
}
```

## Badge Implementation

### Base Badge Structure
```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sys-badge-background-color);
  color: var(--sys-badge-text-color);
  border-radius: var(--sys-badge-border-radius);
  font-family: var(--sys-badge-font-family);
  font-size: var(--sys-badge-font-size);
  font-weight: var(--sys-badge-font-weight);
  line-height: var(--sys-badge-line-height);
  white-space: nowrap;
}

/* Badge sizes */
.badge-sm {
  width: var(--sys-badge-size-sm);
  height: var(--sys-badge-size-sm);
  min-width: var(--sys-badge-size-sm);
}

.badge-md {
  padding: var(--sys-badge-padding-md);
  min-height: var(--sys-badge-size-md);
  min-width: var(--sys-badge-size-md);
}

.badge-lg {
  padding: var(--sys-badge-padding-lg);
  min-height: var(--sys-badge-size-lg);
  min-width: var(--sys-badge-size-lg);
}

/* Badge types */
.badge-numeric {
  /* Numeric badge specific styles */
}

.badge-status {
  /* Status badge specific styles */
}

.badge-label {
  /* Label badge specific styles */
}

.badge-dot {
  width: var(--sys-badge-size-sm);
  height: var(--sys-badge-size-sm);
  border-radius: 50%;
  padding: 0;
}

/* Badge colors */
.badge-info {
  background-color: var(--sys-badge-info-background);
}

.badge-success {
  background-color: var(--sys-badge-success-background);
}

.badge-warning {
  background-color: var(--sys-badge-warning-background);
}

.badge-error {
  background-color: var(--sys-badge-error-background);
}

.badge-neutral {
  background-color: var(--sys-badge-neutral-background);
}
```

### Badge Positioning
```css
/* Container for badge positioning */
.badge-container {
  position: relative;
  display: inline-block;
}

/* Position badges relative to container */
.badge-top-right {
  position: absolute;
  top: -4px;
  right: -4px;
  transform: scale(1);
  transform-origin: top right;
}

.badge-top-left {
  position: absolute;
  top: -4px;
  left: -4px;
  transform: scale(1);
  transform-origin: top left;
}

.badge-bottom-right {
  position: absolute;
  bottom: -4px;
  right: -4px;
  transform: scale(1);
  transform-origin: bottom right;
}

.badge-bottom-left {
  position: absolute;
  bottom: -4px;
  left: -4px;
  transform: scale(1);
  transform-origin: bottom left;
}
```

## States & Animations

### Banner States
```css
/* Enter animation */
@keyframes banner-slide-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes banner-slide-down {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Exit animation */
.banner-exiting {
  animation: banner-slide-out 0.3s ease-in forwards;
}

@keyframes banner-slide-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

/* Hover state */
.banner:hover {
  box-shadow: var(--sys-elevation-2);
}

/* Focus state */
.banner:focus-within {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}
```

### Badge States
```css
/* Badge pulse animation for attention */
@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.badge-pulse {
  animation: badge-pulse 2s infinite;
}

/* Badge bounce animation for new notifications */
@keyframes badge-bounce {
  0%, 100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.3);
  }
  60% {
    transform: scale(0.9);
  }
}

.badge-new {
  animation: badge-bounce 0.6s ease;
}
```

## Accessibility

### ARIA Attributes for Banners
```html
<div class="banner banner-info" role="alert" aria-live="polite" aria-atomic="true">
  <div class="banner-icon">ℹ️</div>
  <div class="banner-content">
    <h3 class="banner-title">Information</h3>
    <p class="banner-description">Your changes have been saved successfully.</p>
    <div class="banner-actions">
      <button class="button-text">View Details</button>
    </div>
  </div>
  <button class="banner-close" aria-label="Dismiss notification">×</button>
</div>
```

### ARIA Attributes for Badges
```html
<button class="badge-container" aria-label="3 unread notifications">
  <span class="icon-bell"></span>
  <span class="badge badge-top-right badge-error badge-md" aria-hidden="true">3</span>
</button>
```

### Screen Reader Support
```css
/* Hide decorative badges from screen readers */
.badge[aria-hidden="true"] {
  /* Already hidden from screen readers */
}

/* Ensure banners are announced appropriately */
.banner[role="alert"] {
  /* Assertive announcements for critical banners */
}

.banner[role="status"] {
  /* Polite announcements for informational banners */
}
```

### Keyboard Navigation
```css
.banner-close:focus {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

.banner-actions button:focus {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}
```

## Notification in AI Interfaces

### AI Processing Banner
```css
.banner-ai-processing {
  border-left-color: var(--sys-color-primary-40);
  background: linear-gradient(90deg, 
    var(--sys-color-primary-95) 0%, 
    var(--sys-color-primary-90) 100%
  );
}

.banner-ai-processing .banner-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Content Generation Status Badge
```css
.badge-content-status {
  background: linear-gradient(135deg, 
    var(--sys-color-primary-40), 
    var(--sys-color-secondary-40)
  );
  color: var(--sys-color-neutral-100);
  font-weight: var(--sys-typography-label-small-font-weight-bold);
}
```

### AI Model Availability Badge
```css
.badge-ai-model {
  border: 1px solid var(--sys-color-neutral-90);
  background-color: var(--sys-color-neutral-98);
  color: var(--sys-color-neutral-30);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
}
```

## Best Practices

### ✅ Do
- Use banners for important messages requiring user attention
- Use badges for non-intrusive status indicators
- Place banners near relevant content when possible
- Include clear, actionable buttons in banners
- Limit banner display time (auto-dismiss after appropriate duration)
- Ensure sufficient color contrast for all badge types
- Test badge visibility on different background colors
- Provide keyboard navigation for banner dismissal
- Use appropriate ARIA roles for screen reader support
- Group related notifications to avoid banner overload

### ❌ Don't
- Don't use banners for trivial information (use toasts instead)
- Don't overload UI with too many badges
- Don't use red badges for non-error states
- Don't place banners where they block critical UI elements
- Don't forget to handle banner dismissal on mobile devices
- Don't use animated badges without user control
- Don't ignore banner stacking order
- Don't hardcode colors - use design tokens
- Don't forget to test in high contrast mode
- Don't use banners for multi-step processes (use modals)

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .banner {
    padding: var(--sys-spacing-sm);
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  
  .banner-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  
  .banner-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .banner-actions button {
    width: 100%;
  }
  
  .badge-md, .badge-lg {
    font-size: calc(var(--sys-badge-font-size) * 0.9);
    padding: var(--sys-badge-padding-sm);
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .banner {
    max-width: 80%;
    margin: var(--sys-spacing-md) auto;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .banner {
    max-width: 800px;
    margin: var(--sys-spacing-md) auto;
  }
}
```

## File Structure

### Related Files
- `skills/toast.md` - For transient notifications (snackbars)
- `skills/errorusage.md` - For error-specific banners and handling
- `skills/modal.md` - For critical notifications requiring user input
- `design-tokens-ultimate.css` - Design tokens for notification styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference

### Notification Component Files
- `components/Banner/` - Banner component directory
  - `Banner.tsx` - Main banner component
  - `Banner.css` - Banner styles
  - `Banner.stories.tsx` - Storybook stories
  - `Banner.test.tsx` - Component tests
- `components/Badge/` - Badge component directory
  - `Badge.tsx` - Main badge component
  - `Badge.css` - Badge styles
  - `Badge.stories.tsx` - Storybook stories
  - `Badge.test.tsx` - Component tests

### Module Organization
```bash
src/
├── components/
│   ├── Banner/
│   │   ├── index.ts
│   │   ├── Banner.tsx
│   │   ├── Banner.css
│   │   ├── Banner.stories.tsx
│   │   └── Banner.test.tsx
│   └── Badge/
│       ├── index.ts
│       ├── Badge.tsx
│       ├── Badge.css
│       ├── Badge.stories.tsx
│       └── Badge.test.tsx
├── hooks/
│   └── useNotifications.ts
└── utils/
    └── notificationHelpers.ts
```

## Integration with Existing Systems

### Coordinating with Toast System
```javascript
// Example: Choose between banner and toast
function showNotification(message, options) {
  if (options.persistent || options.requiresAction) {
    showBanner(message, options);
  } else {
    showToast(message, options);
  }
}
```

### Error Banner Integration
```javascript
// Use error banners from errorusage.md for system errors
import { ErrorBanner } from '../components/ErrorBanner';

function handleAPIError(error) {
  if (error.isSystemError) {
    // Use error banner from errorusage.md
    showErrorBanner(error.message);
  } else {
    // Use inline error banner
    showBanner(error.message, { type: 'error', inline: true });
  }
}
```

---

*This notification system ensures consistent, accessible, and user-friendly banners and badges across ContentSplit. All notifications should follow Material Design 3 guidelines and use the design token system for styling. Coordinate with existing toast and error systems to provide appropriate notification hierarchy.*