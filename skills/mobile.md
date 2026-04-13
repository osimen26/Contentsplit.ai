# ContentSplit Mobile Design System

## Overview

The ContentSplit Mobile Design System follows Google Material Design 3 guidelines for mobile interfaces. This system addresses the unique constraints and opportunities of mobile devices, including touch interactions, smaller screens, and varying device capabilities.

## Mobile Design Principles (Material Design 3)

### Core Principles
1. **Touch-First Design** - Optimize for finger touch, not mouse precision
2. **Content Priority** - Present most important content first
3. **Simplified Navigation** - Reduce hierarchy depth for mobile
4. **Responsive Feedback** - Provide immediate visual feedback for interactions
5. **Device Integration** - Leverage device capabilities (camera, location, etc.)

### Touch Targets
- **Minimum Size:** 48x48px (Material Design recommendation)
- **Preferred Size:** 56x56px for important actions
- **Spacing:** 8px minimum between touch targets
- **Hit Area:** Can extend beyond visual bounds

## Mobile-Specific Components

### 1. Bottom Navigation (`mobile-bottom-nav`)
Navigation bar at the bottom of the screen for primary destinations.

```css
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-top: 1px solid var(--sys-color-neutral-90);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 1000;
}

.mobile-bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-spacing-xs);
  padding: var(--sys-spacing-sm);
  background: none;
  border: none;
  min-width: 64px;
  min-height: 64px;
  cursor: pointer;
}

.mobile-bottom-nav-icon {
  width: 24px;
  height: 24px;
  color: var(--sys-color-neutral-60);
}

.mobile-bottom-nav-label {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.mobile-bottom-nav-item.active .mobile-bottom-nav-icon {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}

.mobile-bottom-nav-item.active .mobile-bottom-nav-label {
  color: var(--sys-color-roles-primary-color-role-primary-role);
  font-weight: var(--sys-typography-label-small-font-weight-bold);
}
```

### 2. Mobile App Bar (`mobile-app-bar`)
Collapsible app bar with contextual actions.

```css
.mobile-app-bar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  display: flex;
  align-items: center;
  padding: 0 var(--sys-spacing-md);
  z-index: 1000;
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.mobile-app-bar-collapsed {
  height: 112px;
}

.mobile-app-bar-title {
  flex: 1;
  font-family: var(--sys-typography-headline-small-font-family);
  font-size: var(--sys-typography-headline-small-font-size);
  font-weight: var(--sys-typography-headline-small-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-app-bar-actions {
  display: flex;
  gap: var(--sys-spacing-xs);
}

.mobile-app-bar-action {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sys-color-neutral-60);
}

.mobile-app-bar-action:hover {
  background-color: var(--sys-color-neutral-95);
}
```

### 3. Mobile Drawer (`mobile-drawer`)
Side navigation drawer that slides in from edge.

```css
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1100;
  box-shadow: var(--sys-elevation-8);
}

.mobile-drawer.open {
  transform: translateX(0);
}

.mobile-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.32);
  z-index: 1099;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-drawer-overlay.open {
  opacity: 1;
  visibility: visible;
}

.mobile-drawer-header {
  padding: var(--sys-spacing-xl) var(--sys-spacing-lg);
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.mobile-drawer-content {
  padding: var(--sys-spacing-md) 0;
  overflow-y: auto;
  height: calc(100% - 80px);
}

.mobile-drawer-item {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-md) var(--sys-spacing-lg);
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
}

.mobile-drawer-item:hover {
  background-color: var(--sys-color-neutral-95);
}

.mobile-drawer-item.active {
  background-color: var(--sys-color-primary-95);
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### 4. Mobile Search Bar (`mobile-search-bar`)
Expandable search bar for mobile interfaces.

```css
.mobile-search-bar {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  background-color: var(--sys-color-neutral-95);
  border-radius: var(--sys-radius-full);
  margin: var(--sys-spacing-md);
}

.mobile-search-bar-input {
  flex: 1;
  background: none;
  border: none;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  padding: var(--sys-spacing-xs) 0;
}

.mobile-search-bar-input::placeholder {
  color: var(--sys-color-neutral-60);
}

.mobile-search-bar-input:focus {
  outline: none;
}

.mobile-search-bar-icon {
  width: 20px;
  height: 20px;
  color: var(--sys-color-neutral-60);
}
```

### 5. Mobile Action Sheet (`mobile-action-sheet`)
Bottom action sheet for contextual actions.

```css
.mobile-action-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: var(--sys-radius-xl) var(--sys-radius-xl) 0 0;
  padding: var(--sys-spacing-md) var(--sys-spacing-lg) env(safe-area-inset-bottom);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 1100;
  box-shadow: var(--sys-elevation-24);
}

.mobile-action-sheet.open {
  transform: translateY(0);
}

.mobile-action-sheet-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-40);
  margin: 0 0 var(--sys-spacing-md) 0;
  text-align: center;
}

.mobile-action-sheet-actions {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

.mobile-action-sheet-button {
  padding: var(--sys-spacing-lg);
  background: none;
  border: none;
  border-radius: var(--sys-radius-md);
  text-align: left;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  cursor: pointer;
}

.mobile-action-sheet-button:hover {
  background-color: var(--sys-color-neutral-95);
}

.mobile-action-sheet-button.destructive {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.mobile-action-sheet-button.destructive:hover {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
}

.mobile-action-sheet-cancel {
  margin-top: var(--sys-spacing-md);
  padding: var(--sys-spacing-lg);
  background-color: var(--sys-color-neutral-95);
  border: none;
  border-radius: var(--sys-radius-md);
  text-align: center;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  cursor: pointer;
}
```

## Touch Interactions

### Touch Feedback
```css
.touch-feedback {
  position: relative;
  overflow: hidden;
}

.touch-feedback::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: inherit;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.touch-feedback:active::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}
```

### Swipe Actions
```css
.swipe-container {
  position: relative;
  overflow: hidden;
}

.swipe-content {
  position: relative;
  z-index: 2;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  transition: transform 0.3s ease;
}

.swipe-actions {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 1;
}

.swipe-action {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--sys-spacing-lg);
  color: white;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  cursor: pointer;
}

.swipe-action.delete {
  background-color: var(--sys-color-roles-error-color-role-error-role);
}

.swipe-action.archive {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
}

.swipe-action.edit {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Pull-to-Refresh
```css
.pull-to-refresh {
  position: relative;
  overflow: hidden;
}

.pull-to-refresh-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  z-index: 10;
}

.pull-to-refresh-spinner {
  width: 24px;
  height: 24px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  animation: spin 1s linear infinite;
}
```

## Mobile-Specific Patterns

### 1. Mobile-First Cards
```css
.mobile-card {
  margin: var(--sys-spacing-md);
  padding: var(--sys-spacing-lg);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: var(--sys-radius-lg);
}

.mobile-card-compact {
  margin: var(--sys-spacing-xs);
  padding: var(--sys-spacing-md);
}

.mobile-card-full-bleed {
  margin: 0;
  border-radius: 0;
  border-bottom: 1px solid var(--sys-color-neutral-90);
}
```

### 2. Mobile Lists
```css
.mobile-list {
  display: flex;
  flex-direction: column;
}

.mobile-list-item {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-lg);
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.mobile-list-item:last-child {
  border-bottom: none;
}

.mobile-list-item-compact {
  padding: var(--sys-spacing-md);
}

.mobile-list-item-icon {
  width: 24px;
  height: 24px;
  color: var(--sys-color-neutral-60);
}

.mobile-list-item-content {
  flex: 1;
}

.mobile-list-item-arrow {
  width: 16px;
  height: 16px;
  color: var(--sys-color-neutral-60);
}
```

### 3. Mobile Forms
```css
.mobile-form {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-lg);
  padding: var(--sys-spacing-lg);
}

.mobile-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

.mobile-form-label {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.mobile-form-input {
  padding: var(--sys-spacing-md);
  background-color: var(--sys-color-neutral-95);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-md);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
}

.mobile-form-input:focus {
  outline: none;
  border-color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

## Device Considerations

### Safe Areas
```css
.safe-area-padding {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

.safe-area-margin {
  margin-top: env(safe-area-inset-top);
  margin-right: env(safe-area-inset-right);
  margin-bottom: env(safe-area-inset-bottom);
  margin-left: env(safe-area-inset-left);
}
```

### Device Orientation
```css
@media (orientation: portrait) {
  .portrait-only {
    display: block;
  }
  
  .landscape-only {
    display: none;
  }
}

@media (orientation: landscape) {
  .portrait-only {
    display: none;
  }
  
  .landscape-only {
    display: block;
  }
}
```

### Device Pixel Ratio
```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .retina-image {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
```

## Usage Guidelines

### 1. Touch Target Sizing
- Minimum 48x48px for all interactive elements
- Increase size for frequently used actions
- Ensure adequate spacing between touch targets
- Consider finger occlusion during design

### 2. Gesture Design
- Use standard gestures (swipe, pinch, tap) consistently
- Provide visual feedback for all gestures
- Avoid gesture conflicts within the same area
- Support both left and right-handed users

### 3. Mobile Navigation
- Limit navigation depth to 3-4 levels maximum
- Provide clear back navigation
- Use bottom navigation for primary destinations
- Consider hamburger menus for secondary navigation

### 4. Performance Optimization
- Optimize images for mobile bandwidth
- Minimize JavaScript execution on main thread
- Use CSS transforms for animations
- Implement lazy loading for below-the-fold content

### 5. Accessibility on Mobile
- Ensure touch targets are large enough for users with motor impairments
- Support voice control and screen readers
- Provide alternative input methods for complex gestures
- Test with device accessibility features enabled

## Testing Mobile Interfaces

1. **Touch Testing:** Verify all touch targets are appropriately sized and spaced
2. **Gesture Testing:** Test all gestures on actual mobile devices
3. **Performance Testing:** Measure load times and animation smoothness on mobile
4. **Orientation Testing:** Test portrait and landscape orientations
5. **Device Testing:** Test on various screen sizes and device capabilities
6. **Accessibility Testing:** Test with screen readers and voice control
7. **Network Testing:** Test under various network conditions (3G, 4G, offline)