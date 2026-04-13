# ContentSplit Navigation System

## Overview

The ContentSplit Navigation System follows Google Material Design 3 guidelines for navigation patterns. Navigation components help users move through the application, access different features, and understand their current location within the AI content generation workflow.

## Material Design 3 Navigation Principles

### Core Principles
1. **Clarity**: Clearly indicate current location and available destinations
2. **Efficiency**: Enable quick access to frequently used features
3. **Consistency**: Maintain consistent navigation patterns across the application
4. **Hierarchy**: Organize navigation items based on importance and frequency of use
5. **Accessibility**: Support keyboard navigation, screen readers, and touch targets

## Navigation Types (Material Design 3)

### 1. Top App Bar
Primary navigation container at the top of the screen.

**Usage:** Main navigation, page titles, global actions
**Components:** Logo, title, navigation icon, action icons, menu
**Variants:** Center-aligned, small, medium, large

### 2. Navigation Drawer
Side panel for primary navigation destinations.

**Usage:** App structure, main sections, user account
**Components:** Header, navigation items, divider, footer
**Variants:** Standard, modal, permanent (desktop)

### 3. Bottom Navigation Bar
Navigation bar at the bottom for mobile apps.

**Usage:** 3-5 primary destinations on mobile
**Components:** Navigation items, active indicator, labels
**States:** Active, inactive, disabled

### 4. Tabs
Horizontal navigation for switching between views.

**Usage:** Related content sections, filtering views
**Components:** Tab labels, active indicator, scroll area
**Variants:** Primary, secondary, scrollable, fixed

### 5. Breadcrumbs
Hierarchical navigation showing current location path.

**Usage:** Deep navigation, file structures, multi-level workflows
**Components:** Separators, clickable items, current page
**Variants:** Collapsed, expanded

### 6. Stepper
Multi-step navigation for linear workflows.

**Usage:** Form wizards, onboarding, multi-step processes
**Components:** Steps, connectors, labels, status indicators
**Variants:** Horizontal, vertical

## Anatomy

### Top App Bar Anatomy
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌───┐ ContentSplit                 ┌───┐ ┌───┐ ┌───┐          │
│ │ ◀ │ AI Content Platform          │ 🔍 │ │ ⚙ │ │ 👤 │         │
│ └───┘                              └───┘ └───┘ └───┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Navigation Drawer Anatomy
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │       User Avatar           │    │
│  │       user@email.com        │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Dashboard                  │    │
│  │  Content Generator          │▶   │
│  │  Templates                  │    │
│  │  Analytics                  │    │
│  │  Settings                   │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Help & Support             │    │
│  │  Logout                     │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Bottom Navigation Anatomy
```
┌─────────────────────────────────────┐
│                                     │
│           Page Content              │
│                                     │
│                                     │
└─────────────────────────────────────┘
┌─────┬─────┬─────┬─────┬─────┐
│  🏠  │  📝  │  ⭐  │  📊  │  ⚙  │
│ Home│Create│Saved│Stats│Settings
└─────┴─────┴─────┴─────┴─────┘
```

## Design Tokens

### Top App Bar Tokens
```css
/* Container styles */
--sys-top-app-bar-height: 64px;
--sys-top-app-bar-background: var(--sys-color-neutral-100);
--sys-top-app-bar-elevation: var(--sys-elevation-2);
--sys-top-app-bar-padding: 0 var(--sys-spacing-lg);

/* Title styles */
--sys-top-app-bar-title-font-family: var(--sys-typography-title-large-font-family);
--sys-top-app-bar-title-font-size: var(--sys-typography-title-large-font-size);
--sys-top-app-bar-title-font-weight: var(--sys-typography-title-large-font-weight);
--sys-top-app-bar-title-color: var(--sys-color-neutral-10);

/* Icon styles */
--sys-top-app-bar-icon-size: 24px;
--sys-top-app-bar-icon-color: var(--sys-color-neutral-50);
--sys-top-app-bar-icon-hover-color: var(--sys-color-neutral-30);
--sys-top-app-bar-icon-active-color: var(--sys-color-primary-40);
--sys-top-app-bar-icon-gap: var(--sys-spacing-md);
```

### Navigation Drawer Tokens
```css
/* Drawer container */
--sys-nav-drawer-width: 280px;
--sys-nav-drawer-background: var(--sys-color-neutral-100);
--sys-nav-drawer-elevation: var(--sys-elevation-3);
--sys-nav-drawer-padding: var(--sys-spacing-md);

/* Header styles */
--sys-nav-drawer-header-height: 128px;
--sys-nav-drawer-header-background: var(--sys-color-primary-95);
--sys-nav-drawer-header-padding: var(--sys-spacing-lg);

/* Item styles */
--sys-nav-drawer-item-height: 48px;
--sys-nav-drawer-item-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
--sys-nav-drawer-item-gap: var(--sys-spacing-md);
--sys-nav-drawer-item-font-family: var(--sys-typography-body-text-font-family);
--sys-nav-drawer-item-font-size: var(--sys-typography-body-text-font-size);
--sys-nav-drawer-item-color: var(--sys-color-neutral-30);
--sys-nav-drawer-item-active-color: var(--sys-color-primary-40);
--sys-nav-drawer-item-active-background: var(--sys-color-primary-98);
--sys-nav-drawer-item-hover-background: var(--sys-color-neutral-98);

/* Icon styles */
--sys-nav-drawer-icon-size: 20px;
--sys-nav-drawer-icon-color: var(--sys-color-neutral-50);
--sys-nav-drawer-icon-active-color: var(--sys-color-primary-40);

/* Divider styles */
--sys-nav-drawer-divider-color: var(--sys-color-neutral-95);
--sys-nav-drawer-divider-height: 1px;
--sys-nav-drawer-divider-margin: var(--sys-spacing-sm) 0;
```

### Bottom Navigation Tokens
```css
/* Container styles */
--sys-bottom-nav-height: 80px;
--sys-bottom-nav-background: var(--sys-color-neutral-100);
--sys-bottom-nav-elevation: var(--sys-elevation-4);
--sys-bottom-nav-padding: var(--sys-spacing-xs) var(--sys-spacing-md);

/* Item styles */
--sys-bottom-nav-item-min-width: 80px;
--sys-bottom-nav-item-gap: var(--sys-spacing-xs);
--sys-bottom-nav-item-padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
--sys-bottom-nav-item-active-color: var(--sys-color-primary-40);
--sys-bottom-nav-item-inactive-color: var(--sys-color-neutral-60);

/* Icon styles */
--sys-bottom-nav-icon-size: 24px;
--sys-bottom-nav-icon-active-color: var(--sys-color-primary-40);
--sys-bottom-nav-icon-inactive-color: var(--sys-color-neutral-60);

/* Label styles */
--sys-bottom-nav-label-font-family: var(--sys-typography-label-small-font-family);
--sys-bottom-nav-label-font-size: var(--sys-typography-label-small-font-size);
--sys-bottom-nav-label-active-color: var(--sys-color-primary-40);
--sys-bottom-nav-label-inactive-color: var(--sys-color-neutral-60);

/* Active indicator */
--sys-bottom-nav-active-indicator-height: 2px;
--sys-bottom-nav-active-indicator-color: var(--sys-color-primary-40);
--sys-bottom-nav-active-indicator-radius: var(--sys-radius-full);
```

### Tabs Tokens
```css
/* Container styles */
--sys-tabs-height: 48px;
--sys-tabs-background: var(--sys-color-neutral-100);
--sys-tabs-padding: 0 var(--sys-spacing-md);
--sys-tabs-gap: var(--sys-spacing-lg);

/* Tab styles */
--sys-tab-min-width: 90px;
--sys-tab-padding: var(--sys-spacing-sm) var(--sys-spacing-md);
--sys-tab-font-family: var(--sys-typography-label-large-font-family);
--sys-tab-font-size: var(--sys-typography-label-large-font-size);
--sys-tab-font-weight: var(--sys-typography-label-large-font-weight);
--sys-tab-color: var(--sys-color-neutral-60);
--sys-tab-active-color: var(--sys-color-primary-40);
--sys-tab-hover-color: var(--sys-color-neutral-30);

/* Indicator styles */
--sys-tab-indicator-height: 2px;
--sys-tab-indicator-color: var(--sys-color-primary-40);
--sys-tab-indicator-radius: var(--sys-radius-full);
--sys-tab-indicator-transition: transform 0.3s ease;

/* Scrollable tabs */
--sys-tabs-scroll-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
--sys-tabs-scroll-button-size: 48px;
```

### Breadcrumbs Tokens
```css
/* Container styles */
--sys-breadcrumbs-gap: var(--sys-spacing-xs);
--sys-breadcrumbs-padding: var(--sys-spacing-sm) 0;

/* Item styles */
--sys-breadcrumb-item-font-family: var(--sys-typography-body-text-font-family);
--sys-breadcrumb-item-font-size: var(--sys-typography-body-text-font-size);
--sys-breadcrumb-item-color: var(--sys-color-neutral-60);
--sys-breadcrumb-item-hover-color: var(--sys-color-neutral-30);
--sys-breadcrumb-item-active-color: var(--sys-color-neutral-10);

/* Separator styles */
--sys-breadcrumb-separator-size: 16px;
--sys-breadcrumb-separator-color: var(--sys-color-neutral-80);
--sys-breadcrumb-separator-margin: 0 var(--sys-spacing-xs);

/* Current page styles */
--sys-breadcrumb-current-font-weight: var(--sys-typography-body-text-bold-font-weight);
--sys-breadcrumb-current-color: var(--sys-color-neutral-10);
```

### Stepper Tokens
```css
/* Container styles */
--sys-stepper-gap: var(--sys-spacing-lg);
--sys-stepper-padding: var(--sys-spacing-lg) 0;

/* Step styles */
--sys-step-size: 24px;
--sys-step-background: var(--sys-color-neutral-95);
--sys-step-active-background: var(--sys-color-primary-40);
--sys-step-completed-background: var(--sys-color-primary-40);
--sys-step-error-background: var(--sys-color-roles-error-color-role-error-role);
--sys-step-border-radius: var(--sys-radius-full);
--sys-step-border: 2px solid var(--sys-color-neutral-100);

/* Step label styles */
--sys-step-label-font-family: var(--sys-typography-body-text-font-family);
--sys-step-label-font-size: var(--sys-typography-body-text-font-size);
--sys-step-label-color: var(--sys-color-neutral-60);
--sys-step-label-active-color: var(--sys-color-neutral-10);
--sys-step-label-completed-color: var(--sys-color-neutral-30);

/* Connector styles */
--sys-step-connector-height: 2px;
--sys-step-connector-background: var(--sys-color-neutral-90);
--sys-step-connector-active-background: var(--sys-color-primary-40);
--sys-step-connector-completed-background: var(--sys-color-primary-40);

/* Icon styles */
--sys-step-icon-size: 16px;
--sys-step-icon-color: var(--sys-color-neutral-100);
--sys-step-icon-error-color: var(--sys-color-neutral-100);
```

## Navigation Implementation

### Top App Bar Implementation
```css
.top-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--sys-top-app-bar-height);
  background-color: var(--sys-top-app-bar-background);
  box-shadow: var(--sys-top-app-bar-elevation);
  padding: var(--sys-top-app-bar-padding);
  display: flex;
  align-items: center;
  z-index: 1000;
}

.top-app-bar-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--sys-top-app-bar-icon-gap);
}

.top-app-bar-title {
  flex: 1;
  font-family: var(--sys-top-app-bar-title-font-family);
  font-size: var(--sys-top-app-bar-title-font-size);
  font-weight: var(--sys-top-app-bar-title-font-weight);
  color: var(--sys-top-app-bar-title-color);
  margin: 0;
}

.top-app-bar-actions {
  display: flex;
  align-items: center;
  gap: var(--sys-top-app-bar-icon-gap);
}

.top-app-bar-icon {
  width: var(--sys-top-app-bar-icon-size);
  height: var(--sys-top-app-bar-icon-size);
  color: var(--sys-top-app-bar-icon-color);
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-app-bar-icon:hover {
  color: var(--sys-top-app-bar-icon-hover-color);
}

.top-app-bar-icon.active {
  color: var(--sys-top-app-bar-icon-active-color);
}
```

### Navigation Drawer Implementation
```css
.nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sys-nav-drawer-width);
  background-color: var(--sys-nav-drawer-background);
  box-shadow: var(--sys-nav-drawer-elevation);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1100;
  display: flex;
  flex-direction: column;
}

.nav-drawer.open {
  transform: translateX(0);
}

.nav-drawer-header {
  height: var(--sys-nav-drawer-header-height);
  background-color: var(--sys-nav-drawer-header-background);
  padding: var(--sys-nav-drawer-header-padding);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.nav-drawer-content {
  flex: 1;
  padding: var(--sys-nav-drawer-padding);
  overflow-y: auto;
}

.nav-drawer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-drawer-item {
  height: var(--sys-nav-drawer-item-height);
  padding: var(--sys-nav-drawer-item-padding);
  display: flex;
  align-items: center;
  gap: var(--sys-nav-drawer-item-gap);
  font-family: var(--sys-nav-drawer-item-font-family);
  font-size: var(--sys-nav-drawer-item-font-size);
  color: var(--sys-nav-drawer-item-color);
  cursor: pointer;
  border-radius: var(--sys-radius-md);
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-drawer-item:hover {
  background-color: var(--sys-nav-drawer-item-hover-background);
}

.nav-drawer-item.active {
  color: var(--sys-nav-drawer-item-active-color);
  background-color: var(--sys-nav-drawer-item-active-background);
}

.nav-drawer-icon {
  width: var(--sys-nav-drawer-icon-size);
  height: var(--sys-nav-drawer-icon-size);
  color: var(--sys-nav-drawer-icon-color);
}

.nav-drawer-item.active .nav-drawer-icon {
  color: var(--sys-nav-drawer-icon-active-color);
}

.nav-drawer-divider {
  height: var(--sys-nav-drawer-divider-height);
  background-color: var(--sys-nav-drawer-divider-color);
  margin: var(--sys-nav-drawer-divider-margin);
  border: none;
}
```

### Bottom Navigation Implementation
```css
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--sys-bottom-nav-height);
  background-color: var(--sys-bottom-nav-background);
  box-shadow: var(--sys-bottom-nav-elevation);
  padding: var(--sys-bottom-nav-padding);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

.bottom-nav-item {
  min-width: var(--sys-bottom-nav-item-min-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-bottom-nav-item-gap);
  padding: var(--sys-bottom-nav-item-padding);
  cursor: pointer;
  text-decoration: none;
  color: var(--sys-bottom-nav-item-inactive-color);
  transition: color 0.2s ease;
}

.bottom-nav-item.active {
  color: var(--sys-bottom-nav-item-active-color);
}

.bottom-nav-icon {
  width: var(--sys-bottom-nav-icon-size);
  height: var(--sys-bottom-nav-icon-size);
  color: inherit;
}

.bottom-nav-item.active .bottom-nav-icon {
  color: var(--sys-bottom-nav-icon-active-color);
}

.bottom-nav-label {
  font-family: var(--sys-bottom-nav-label-font-family);
  font-size: var(--sys-bottom-nav-label-font-size);
  color: inherit;
}

.bottom-nav-item.active .bottom-nav-label {
  color: var(--sys-bottom-nav-label-active-color);
}

.bottom-nav-active-indicator {
  position: absolute;
  bottom: 0;
  height: var(--sys-bottom-nav-active-indicator-height);
  background-color: var(--sys-bottom-nav-active-indicator-color);
  border-radius: var(--sys-bottom-nav-active-indicator-radius);
  transition: transform 0.3s ease;
}
```

### Tabs Implementation
```css
.tabs {
  display: flex;
  height: var(--sys-tabs-height);
  background-color: var(--sys-tabs-background);
  padding: var(--sys-tabs-padding);
  gap: var(--sys-tabs-gap);
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  min-width: var(--sys-tab-min-width);
  padding: var(--sys-tab-padding);
  font-family: var(--sys-tab-font-family);
  font-size: var(--sys-tab-font-size);
  font-weight: var(--sys-tab-font-weight);
  color: var(--sys-tab-color);
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  border: none;
  background: none;
  position: relative;
  transition: color 0.2s ease;
}

.tab:hover {
  color: var(--sys-tab-hover-color);
}

.tab.active {
  color: var(--sys-tab-active-color);
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  height: var(--sys-tab-indicator-height);
  background-color: var(--sys-tab-indicator-color);
  border-radius: var(--sys-tab-indicator-radius);
  transition: var(--sys-tab-indicator-transition);
}

.tabs-scrollable {
  position: relative;
}

.tabs-scrollable::before,
.tabs-scrollable::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  pointer-events: none;
  z-index: 1;
}

.tabs-scrollable::before {
  left: 0;
  background: linear-gradient(to right, var(--sys-color-neutral-100), transparent);
}

.tabs-scrollable::after {
  right: 0;
  background: linear-gradient(to left, var(--sys-color-neutral-100), transparent);
}
```

### Breadcrumbs Implementation
```css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--sys-breadcrumbs-gap);
  padding: var(--sys-breadcrumbs-padding);
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--sys-breadcrumbs-gap);
}

.breadcrumb-link {
  font-family: var(--sys-breadcrumb-item-font-family);
  font-size: var(--sys-breadcrumb-item-font-size);
  color: var(--sys-breadcrumb-item-color);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--sys-breadcrumb-item-hover-color);
  text-decoration: underline;
}

.breadcrumb-current {
  font-family: var(--sys-breadcrumb-item-font-family);
  font-size: var(--sys-breadcrumb-item-font-size);
  color: var(--sys-breadcrumb-current-color);
  font-weight: var(--sys-breadcrumb-current-font-weight);
  cursor: default;
}

.breadcrumb-separator {
  width: var(--sys-breadcrumb-separator-size);
  height: var(--sys-breadcrumb-separator-size);
  color: var(--sys-breadcrumb-separator-color);
  margin: var(--sys-breadcrumb-separator-margin);
  display: flex;
  align-items: center;
  justify-content: center;
}

.breadcrumbs-collapsed {
  display: flex;
  align-items: center;
}

.breadcrumbs-collapsed-toggle {
  font-family: var(--sys-breadcrumb-item-font-family);
  font-size: var(--sys-breadcrumb-item-font-size);
  color: var(--sys-breadcrumb-item-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--sys-spacing-xs);
}
```

### Stepper Implementation
```css
.stepper {
  display: flex;
  align-items: center;
  gap: var(--sys-stepper-gap);
  padding: var(--sys-stepper-padding);
}

.stepper-horizontal {
  flex-direction: row;
}

.stepper-vertical {
  flex-direction: column;
  align-items: flex-start;
}

.step {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  position: relative;
}

.step-circle {
  width: var(--sys-step-size);
  height: var(--sys-step-size);
  border-radius: var(--sys-step-border-radius);
  background-color: var(--sys-step-background);
  border: var(--sys-step-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  z-index: 1;
}

.step.active .step-circle {
  background-color: var(--sys-step-active-background);
  color: var(--sys-color-neutral-100);
}

.step.completed .step-circle {
  background-color: var(--sys-step-completed-background);
  color: var(--sys-color-neutral-100);
}

.step.error .step-circle {
  background-color: var(--sys-step-error-background);
  color: var(--sys-color-neutral-100);
}

.step-icon {
  width: var(--sys-step-icon-size);
  height: var(--sys-step-icon-size);
  color: inherit;
}

.step-label {
  font-family: var(--sys-step-label-font-family);
  font-size: var(--sys-step-label-font-size);
  color: var(--sys-step-label-color);
}

.step.active .step-label {
  color: var(--sys-step-label-active-color);
}

.step.completed .step-label {
  color: var(--sys-step-label-completed-color);
}

.step-connector {
  flex: 1;
  height: var(--sys-step-connector-height);
  background-color: var(--sys-step-connector-background);
}

.step.active .step-connector {
  background-color: var(--sys-step-connector-active-background);
}

.step.completed .step-connector {
  background-color: var(--sys-step-connector-completed-background);
}

.stepper-horizontal .step-connector {
  width: 40px;
}

.stepper-vertical .step-connector {
  width: var(--sys-step-connector-height);
  height: 20px;
  margin-left: calc(var(--sys-step-size) / 2 - var(--sys-step-connector-height) / 2);
}
```

## States

### Active State
```css
.nav-item.active {
  color: var(--sys-color-primary-40);
  background-color: var(--sys-color-primary-98);
}

.tab.active {
  color: var(--sys-tab-active-color);
}

.bottom-nav-item.active {
  color: var(--sys-bottom-nav-item-active-color);
}
```

### Hover State
```css
.nav-item:hover {
  background-color: var(--sys-color-neutral-98);
}

.tab:hover {
  color: var(--sys-tab-hover-color);
}

.breadcrumb-link:hover {
  color: var(--sys-breadcrumb-item-hover-color);
  text-decoration: underline;
}
```

### Focus State
```css
.nav-item:focus-visible {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

.tab:focus-visible {
  outline: 2px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}
```

### Disabled State
```css
.nav-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step.disabled .step-circle {
  opacity: 0.5;
}
```

### Loading State
```css
.nav-item.loading {
  opacity: 0.7;
  pointer-events: none;
}

.nav-item.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid var(--sys-color-neutral-90);
  border-top-color: var(--sys-color-primary-40);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: var(--sys-spacing-sm);
}
```

## Accessibility

### ARIA Attributes
```html
<!-- Top App Bar -->
<header class="top-app-bar" role="banner" aria-label="Main navigation">
  <button class="top-app-bar-icon" aria-label="Open navigation menu">☰</button>
  <h1 class="top-app-bar-title">ContentSplit</h1>
</header>

<!-- Navigation Drawer -->
<nav class="nav-drawer" role="navigation" aria-label="Main menu">
  <ul class="nav-drawer-list" role="menubar">
    <li role="none">
      <a href="/dashboard" class="nav-drawer-item" role="menuitem" aria-current="page">Dashboard</a>
    </li>
  </ul>
</nav>

<!-- Tabs -->
<div class="tabs" role="tablist" aria-label="Content sections">
  <button class="tab active" role="tab" aria-selected="true" aria-controls="tab1-panel">All Content</button>
  <button class="tab" role="tab" aria-selected="false" aria-controls="tab2-panel">Drafts</button>
</div>

<!-- Breadcrumbs -->
<nav class="breadcrumbs" aria-label="Breadcrumb navigation">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">Home</a>
    </li>
    <li class="breadcrumb-item" aria-current="page">
      <span class="breadcrumb-current">Current Page</span>
    </li>
  </ol>
</nav>
```

### Keyboard Navigation
```css
.nav-item:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

.tab:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}

/* Focus management for modals */
.nav-drawer:focus {
  outline: none;
}

.nav-drawer *:focus-visible {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: 2px;
}
```

### Screen Reader Support
```css
/* Hide decorative icons from screen readers */
.nav-drawer-icon[aria-hidden="true"] {
  /* Icons are decorative */
}

/* Ensure active state is announced */
.nav-item[aria-current="page"] {
  /* Screen readers will announce "current page" */
}

/* Provide context for navigation regions */
.tabs[role="tablist"] {
  /* Screen readers understand tablist semantics */
}
```

### Keyboard Interactions
```javascript
// Example: Keyboard navigation for tabs
function handleTabKeydown(event) {
  const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'));
  const currentIndex = tabs.indexOf(document.activeElement);
  
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
      break;
      
    case 'ArrowLeft':
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[prevIndex].focus();
      tabs[prevIndex].click();
      break;
      
    case 'Home':
      event.preventDefault();
      tabs[0].focus();
      tabs[0].click();
      break;
      
    case 'End':
      event.preventDefault();
      tabs[tabs.length - 1].focus();
      tabs[tabs.length - 1].click();
      break;
  }
}

// Example: Keyboard navigation for navigation drawer
function handleNavDrawerKeydown(event) {
  const items = Array.from(event.currentTarget.querySelectorAll('[role="menuitem"]'));
  const currentIndex = items.indexOf(document.activeElement);
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
      break;
      
    case 'Escape':
      event.preventDefault();
      closeNavDrawer();
      break;
  }
}
```

## Navigation in AI Interfaces

### AI Workflow Navigation
```css
.nav-ai-workflow {
  border-left: 4px solid var(--sys-color-primary-40);
}

.nav-ai-step {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-md);
  background-color: var(--sys-color-neutral-98);
  border-radius: var(--sys-radius-md);
}

.nav-ai-step-icon {
  width: 24px;
  height: 24px;
  color: var(--sys-color-primary-40);
}

.nav-ai-step-info {
  flex: 1;
}

.nav-ai-step-name {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-bold-font-weight);
  color: var(--sys-color-neutral-10);
}

.nav-ai-step-description {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.nav-ai-step-status {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  border-radius: var(--sys-radius-full);
  background-color: var(--sys-color-primary-95);
  color: var(--sys-color-primary-40);
}
```

### Model Selection Navigation
```css
.nav-model-selector {
  background-color: var(--sys-color-neutral-98);
  border-radius: var(--sys-radius-lg);
  padding: var(--sys-spacing-md);
}

.nav-model-item {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.nav-model-item:hover {
  background-color: var(--sys-color-neutral-95);
}

.nav-model-item.active {
  background-color: var(--sys-color-primary-95);
  border-left: 3px solid var(--sys-color-primary-40);
}

.nav-model-icon {
  width: 32px;
  height: 32px;
  background-color: var(--sys-color-primary-95);
  border-radius: var(--sys-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-primary-40);
}

.nav-model-details {
  flex: 1;
}

.nav-model-name {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-bold-font-weight);
  color: var(--sys-color-neutral-10);
}

.nav-model-description {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.nav-model-stats {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}
```

### Content Type Navigation
```css
.nav-content-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--sys-spacing-sm);
}

.nav-content-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-spacing-xs);
  padding: var(--sys-spacing-md);
  background-color: var(--sys-color-neutral-98);
  border-radius: var(--sys-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-content-type:hover {
  background-color: var(--sys-color-neutral-95);
  transform: translateY(-2px);
}

.nav-content-type.active {
  background-color: var(--sys-color-primary-95);
  border: 2px solid var(--sys-color-primary-40);
}

.nav-content-type-icon {
  width: 40px;
  height: 40px;
  background-color: var(--sys-color-primary-95);
  border-radius: var(--sys-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-primary-40);
}

.nav-content-type.active .nav-content-type-icon {
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-neutral-100);
}

.nav-content-type-name {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  text-align: center;
  color: var(--sys-color-neutral-30);
}

.nav-content-type.active .nav-content-type-name {
  color: var(--sys-color-primary-40);
  font-weight: var(--sys-typography-label-small-bold-font-weight);
}
```

### Template Navigation
```css
.nav-templates {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-sm);
}

.nav-template-category {
  padding: var(--sys-spacing-sm) 0;
}

.nav-template-category-name {
  font-family: var(--sys-typography-label-large-font-family);
  font-size: var(--sys-typography-label-large-font-size);
  font-weight: var(--sys-typography-label-large-font-weight);
  color: var(--sys-color-neutral-30);
  padding: var(--sys-spacing-xs) var(--sys-spacing-md);
  margin-bottom: var(--sys-spacing-xs);
}

.nav-template-item {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.nav-template-item:hover {
  background-color: var(--sys-color-neutral-98);
}

.nav-template-item.active {
  background-color: var(--sys-color-primary-95);
  border-left: 3px solid var(--sys-color-primary-40);
}

.nav-template-icon {
  width: 24px;
  height: 24px;
  color: var(--sys-color-neutral-60);
}

.nav-template-item.active .nav-template-icon {
  color: var(--sys-color-primary-40);
}

.nav-template-details {
  flex: 1;
}

.nav-template-name {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-10);
}

.nav-template-description {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}
```

## Responsive Behavior

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .top-app-bar {
    height: 56px;
    padding: 0 var(--sys-spacing-md);
  }
  
  .top-app-bar-title {
    font-size: var(--sys-typography-title-medium-font-size);
  }
  
  .nav-drawer {
    width: 100%;
    max-width: 320px;
  }
  
  .bottom-navigation {
    height: 72px;
  }
  
  .bottom-nav-label {
    font-size: 10px;
  }
  
  .tabs {
    padding: 0 var(--sys-spacing-sm);
    gap: var(--sys-spacing-md);
  }
  
  .tab {
    min-width: 70px;
    padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
    font-size: var(--sys-typography-label-medium-font-size);
  }
  
  .breadcrumbs {
    font-size: var(--sys-typography-label-small-font-size);
    gap: var(--sys-spacing-xs);
  }
  
  .stepper-horizontal {
    gap: var(--sys-spacing-md);
  }
  
  .step-label {
    display: none; /* Hide labels on small screens */
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .nav-drawer {
    width: 280px;
  }
  
  .top-app-bar {
    padding: 0 var(--sys-spacing-xl);
  }
  
  .bottom-navigation {
    height: 80px;
  }
  
  .tabs {
    padding: 0 var(--sys-spacing-lg);
  }
  
  .tab {
    min-width: 100px;
  }
  
  .stepper-horizontal .step-connector {
    width: 60px;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .nav-drawer {
    position: relative;
    transform: none;
    box-shadow: none;
    border-right: 1px solid var(--sys-color-neutral-95);
  }
  
  .nav-drawer.permanent {
    display: block;
  }
  
  .top-app-bar {
    padding: 0 var(--sys-spacing-2xl);
  }
  
  .bottom-navigation {
    display: none; /* Hide bottom nav on desktop */
  }
  
  .tabs {
    justify-content: center;
  }
  
  .tab {
    min-width: 120px;
  }
  
  .breadcrumbs {
    font-size: var(--sys-typography-body-text-font-size);
  }
  
  .stepper-horizontal {
    justify-content: center;
  }
  
  .stepper-horizontal .step-connector {
    width: 80px;
  }
}
```

## Best Practices

### ✅ Do
- Use top app bar for global navigation and actions
- Use navigation drawer for app structure on mobile/tablet
- Use bottom navigation for 3-5 primary destinations on mobile
- Use tabs for switching between related views
- Use breadcrumbs for hierarchical navigation
- Use steppers for linear multi-step processes
- Maintain consistent navigation patterns across the app
- Provide clear visual feedback for active states
- Ensure adequate touch targets (minimum 44×44px)
- Support keyboard navigation for all navigation elements
- Provide ARIA labels for screen readers
- Test navigation with screen readers and keyboard-only users
- Use appropriate animation durations (100-300ms)

### ❌ Don't
- Don't use too many navigation items in bottom navigation (max 5)
- Don't hide critical navigation behind hamburger menus on desktop
- Don't use ambiguous icons without text labels
- Don't forget to handle focus management in modals/drawers
- Don't use navigation patterns that break user expectations
- Don't ignore mobile touch targets
- Don't create deep nesting in navigation (max 3 levels)
- Don't use auto-expanding menus that obscure content
- Don't forget to handle loading states during navigation
- Don't neglect error states for failed navigation

## Testing and Validation

### Visual Testing
1. **States**: Test default, hover, focus, active, disabled states
2. **Responsive**: Test across all breakpoints (mobile, tablet, desktop)
3. **Animation**: Test open/close transitions and loading states
4. **Overflow**: Test with long text and many items
5. **Positioning**: Test menu positioning and z-index stacking
6. **Accessibility**: Test color contrast and focus indicators
7. **Performance**: Test animation smoothness and rendering performance

### Functional Testing
```javascript
// Example: Navigation drawer test
describe('Navigation Drawer', () => {
  test('Drawer opens on menu button click', () => {
    const menuButton = document.querySelector('.top-app-bar-icon');
    const drawer = document.querySelector('.nav-drawer');
    menuButton.click();
    expect(drawer.classList.contains('open')).toBe(true);
  });
  
  test('Drawer closes on overlay click', () => {
    const overlay = document.querySelector('.nav-drawer-overlay');
    const drawer = document.querySelector('.nav-drawer');
    overlay.click();
    expect(drawer.classList.contains('open')).toBe(false);
  });
  
  test('Drawer navigation items work', () => {
    const navItem = document.querySelector('.nav-drawer-item');
    const clickHandler = jest.fn();
    navItem.addEventListener('click', clickHandler);
    navItem.click();
    expect(clickHandler).toHaveBeenCalled();
  });
});

// Example: Tabs test
describe('Tabs System', () => {
  test('Tab click changes active tab', () => {
    const tabs = document.querySelectorAll('.tab');
    const firstTab = tabs[0];
    const secondTab = tabs[1];
    secondTab.click();
    expect(firstTab.classList.contains('active')).toBe(false);
    expect(secondTab.classList.contains('active')).toBe(true);
  });
  
  test('Tab indicator moves to active tab', () => {
    const tabs = document.querySelectorAll('.tab');
    const indicator = document.querySelector('.tab-indicator');
    const secondTab = tabs[1];
    const secondTabRect = secondTab.getBoundingClientRect();
    secondTab.click();
    expect(indicator.style.transform).toBe(`translateX(${secondTabRect.left}px)`);
  });
});

// Example: Keyboard navigation test
describe('Keyboard Navigation', () => {
  test('Tab key navigation works', () => {
    const tabs = document.querySelectorAll('.tab');
    const firstTab = tabs[0];
    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1]);
  });
  
  test('Escape closes navigation drawer', () => {
    const drawer = document.querySelector('.nav-drawer');
    drawer.classList.add('open');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(drawer.classList.contains('open')).toBe(false);
  });
});
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for navigation styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/elevation.md` - Elevation tokens reference
- `skills/radius.md` - Radius tokens reference
- `component-specification.md` - Component specifications

### Navigation Component Files
- `navigation.css` - Navigation styles (if separated)
- `navigation.js` - Navigation logic and behavior
- `navigation.stories.js` - Storybook stories (if using Storybook)

### Layout Integration
- `layout.css` - Main layout including navigation
- `responsive.css` - Responsive navigation behavior

## Integration with AI Systems

### AI Workflow Navigation
```javascript
// Example: AI workflow navigation
function createAIWorkflowNavigation(steps) {
  return {
    type: 'stepper',
    steps: steps.map((step, index) => ({
      id: step.id,
      label: step.name,
      description: step.description,
      status: step.status, // 'pending', 'active', 'completed', 'error'
      icon: step.icon,
      onClick: () => navigateToStep(step.id)
    })),
    currentStep: getCurrentStepId(),
    onStepClick: (stepId) => {
      navigateToStep(stepId);
    }
  };
}

// Example: Content generation navigation
function createContentGenNavigation(contentTypes) {
  return {
    type: 'tabs',
    tabs: contentTypes.map(type => ({
      id: type.id,
      label: type.name,
      icon: type.icon,
      count: type.count,
      active: type.id === activeContentType
    })),
    onTabChange: (tabId) => {
      setActiveContentType(tabId);
      loadContentByType(tabId);
    }
  };
}

// Example: Model selection navigation
function createModelSelectionNavigation(models) {
  return {
    type: 'navigation-drawer',
    header: {
      title: 'AI Models',
      subtitle: 'Select a model for content generation'
    },
    items: models.map(model => ({
      id: model.id,
      label: model.name,
      description: model.description,
      icon: model.icon,
      stats: {
        tokens: model.maxTokens,
        cost: model.costPerToken
      },
      active: model.id === selectedModelId
    })),
    onItemSelect: (modelId) => {
      setSelectedModel(modelId);
      updateGenerationParameters(modelId);
    }
  };
}

// Example: Template category navigation
function createTemplateNavigation(categories) {
  return {
    type: 'navigation-drawer',
    variant: 'nested',
    categories: categories.map(category => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
      templates: category.templates.map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        icon: template.icon,
        usageCount: template.usageCount
      }))
    })),
    onTemplateSelect: (templateId) => {
      loadTemplate(templateId);
      openEditor();
    }
  };
}
```

### Navigation State Management
```javascript
// Example: Navigation state for AI application
class AINavigationState {
  constructor() {
    this.currentView = 'dashboard';
    this.activeModel = null;
    this.contentType = 'all';
    this.workflowStep = 0;
    this.history = [];
  }
  
  navigateTo(view, params = {}) {
    this.history.push({
      view: this.currentView,
      params: this.currentParams,
      timestamp: Date.now()
    });
    
    this.currentView = view;
    this.currentParams = params;
    
    // Update UI based on navigation
    this.updateNavigationUI();
    
    // Load data for new view
    this.loadViewData(view, params);
  }
  
  updateNavigationUI() {
    // Update active states in navigation
    document.querySelectorAll('[data-nav-item]').forEach(item => {
      item.classList.toggle('active', 
        item.dataset.navView === this.currentView
      );
    });
    
    // Update breadcrumbs
    this.updateBreadcrumbs();
    
    // Update document title
    document.title = `ContentSplit - ${this.getViewTitle(this.currentView)}`;
  }
  
  updateBreadcrumbs() {
    const breadcrumbs = this.generateBreadcrumbs(this.currentView, this.currentParams);
    renderBreadcrumbs(breadcrumbs);
  }
  
  generateBreadcrumbs(view, params) {
    const crumbs = [{ label: 'Home', path: '/' }];
    
    switch (view) {
      case 'content-generator':
        crumbs.push({ label: 'Content', path: '/content' });
        crumbs.push({ label: 'Generator', path: '/content/generator' });
        if (params.template) {
          crumbs.push({ label: params.template, current: true });
        }
        break;
      case 'analytics':
        crumbs.push({ label: 'Analytics', current: true });
        break;
      case 'settings':
        crumbs.push({ label: 'Settings', current: true });
        break;
    }
    
    return crumbs;
  }
  
  getViewTitle(view) {
    const titles = {
      'dashboard': 'Dashboard',
      'content-generator': 'Content Generator',
      'analytics': 'Analytics',
      'settings': 'Settings',
      'templates': 'Templates'
    };
    return titles[view] || 'ContentSplit';
  }
  
  loadViewData(view, params) {
    switch (view) {
      case 'content-generator':
        loadContentGenerator(params.template);
        break;
      case 'analytics':
        loadAnalyticsData();
        break;
      case 'templates':
        loadTemplates();
        break;
    }
  }
}

// Example: Navigation event handling
document.addEventListener('DOMContentLoaded', () => {
  const navState = new AINavigationState();
  
  // Handle navigation clicks
  document.querySelectorAll('[data-nav-view]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.dataset.navView;
      const params = JSON.parse(item.dataset.navParams || '{}');
      navState.navigateTo(view, params);
    });
  });
  
  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      navState.navigateTo(e.state.view, e.state.params);
    }
  });
});
```

---

*This navigation system ensures consistent, accessible, and user-friendly navigation patterns across ContentSplit. All navigation components should follow Material Design 3 guidelines and use the design token system for styling.*