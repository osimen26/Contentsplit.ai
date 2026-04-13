# ContentSplit Content Safety Guidelines

## Overview

The ContentSplit Content Safety Guidelines provide standards for creating safe, respectful, and trustworthy user experiences following Google Material Design 3 principles. These guidelines cover content moderation, user reporting, safety features, and accessibility considerations for sensitive content.

## Safety Design Principles

### 1. Proactive Protection
- Design interfaces that prevent harmful actions
- Provide clear community guidelines
- Implement safety features by default

### 2. Transparent Moderation
- Clearly explain content policies
- Provide specific reasons for moderation actions
- Offer appeal processes for disputed actions

### 3. User Empowerment
- Give users control over their experience
- Provide easy-to-use reporting tools
- Allow customization of safety settings

## Safety UI Patterns

### Content Warning Overlays
```css
.content-warning {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border: 1px solid var(--sys-color-roles-warning-color-role-warning-role);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: var(--sys-elevation-1);
}

.warning-icon {
  color: var(--sys-color-roles-warning-color-role-warning-role);
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
}

.warning-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: 8px;
}

.warning-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: 24px;
  line-height: var(--sys-typography-body-text-line-height);
}
```

### Sensitive Content Blurring
```css
.sensitive-content {
  position: relative;
  overflow: hidden;
}

.sensitive-content-blurred {
  filter: blur(20px);
  transition: filter 0.3s ease;
}

.sensitive-content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.sensitive-content-button {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
}
```

## Reporting System

### Report Dialog
```css
.report-dialog {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 28px; /* Material Design 3 extra-large shape */
  padding: 24px;
  max-width: 480px;
  box-shadow: var(--sys-elevation-4);
}

.report-option {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.report-option:hover {
  background-color: var(--sys-color-neutral-95);
}

.report-option.selected {
  background-color: var(--sys-color-primary-95);
  border: 1px solid var(--sys-color-primary-90);
}

.report-description {
  margin-top: 16px;
}

.report-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 8px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  resize: vertical;
}
```

### Report Categories
```javascript
const REPORT_CATEGORIES = [
  {
    id: 'harassment',
    label: 'Harassment or bullying',
    description: 'Targeted harassment or bullying behavior',
    icon: 'warning',
    severity: 'high'
  },
  {
    id: 'hate',
    label: 'Hate speech',
    description: 'Content promoting violence or hatred',
    icon: 'block',
    severity: 'high'
  },
  {
    id: 'violence',
    label: 'Violent content',
    description: 'Graphic violence or dangerous acts',
    icon: 'report',
    severity: 'high'
  },
  {
    id: 'spam',
    label: 'Spam or misleading',
    description: 'Commercial spam or misleading information',
    icon: 'spam',
    severity: 'medium'
  },
  {
    id: 'privacy',
    label: 'Privacy violation',
    description: 'Personal information without consent',
    icon: 'privacy',
    severity: 'high'
  },
  {
    id: 'other',
    label: 'Other issue',
    description: 'Another problem not listed',
    icon: 'help',
    severity: 'low'
  }
];
```

## Moderation Interface

### Moderation Dashboard
```css
.moderation-dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  padding: 24px;
}

.moderation-queue {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--sys-elevation-1);
}

.moderation-item {
  padding: 16px;
  border-bottom: 1px solid var(--sys-color-neutral-90);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.moderation-item:hover {
  background-color: var(--sys-color-neutral-95);
}

.moderation-item.selected {
  background-color: var(--sys-color-primary-95);
  border-left: 4px solid var(--sys-color-roles-primary-color-role-primary-role);
}

.moderation-severity-high {
  border-left: 4px solid var(--sys-color-roles-error-color-role-error-role);
}

.moderation-severity-medium {
  border-left: 4px solid var(--sys-color-roles-warning-color-role-warning-role);
}

.moderation-severity-low {
  border-left: 4px solid var(--sys-color-neutral-60);
}
```

### Moderation Actions
```css
.moderation-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--sys-color-neutral-90);
}

.moderation-action-approve {
  background-color: var(--sys-color-roles-success-color-role-success-color-role);
  color: var(--sys-color-roles-success-color-role-on-success-color-role);
}

.moderation-action-reject {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: var(--sys-color-roles-error-color-role-on-error-color-role);
}

.moderation-action-warn {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
  color: var(--sys-color-roles-warning-color-role-on-warning-color-role);
}

.moderation-action-ignore {
  background-color: var(--sys-color-neutral-90);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
}
```

## User Safety Features

### Block and Mute
```css
.user-actions-menu {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  padding: 8px 0;
  box-shadow: var(--sys-elevation-2);
  min-width: 200px;
}

.user-action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-action-item:hover {
  background-color: var(--sys-color-neutral-95);
}

.user-action-danger {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.user-action-icon {
  width: 20px;
  height: 20px;
  color: var(--sys-color-neutral-60);
}

.user-action-danger .user-action-icon {
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Privacy Settings
```css
.privacy-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.privacy-setting-description {
  flex: 1;
}

.privacy-setting-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: 4px;
}

.privacy-setting-help {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
}
```

## Content Filtering

### Filter Controls
```css
.filter-controls {
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--sys-color-neutral-95);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  background-color: var(--sys-color-neutral-90);
}

.filter-chip.selected {
  background-color: var(--sys-color-primary-95);
  border-color: var(--sys-color-primary-90);
  color: var(--sys-color-primary-40);
}

.filter-chip-remove {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--sys-color-neutral-80);
  color: var(--sys-color-primary-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
}
```

### Age Restriction
```css
.age-gate {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: var(--sys-elevation-2);
}

.age-gate-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: 12px;
}

.age-gate-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: 24px;
  line-height: var(--sys-typography-body-text-line-height);
}

.age-gate-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.age-gate-confirm {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
}

.age-gate-deny {
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: 1px solid var(--sys-color-primary-80);
}
```

## Accessibility Considerations

### Screen Reader Announcements
```javascript
// Announce content warnings
const announceContentWarning = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
};

// Usage
announceContentWarning('Content warning: This content may be sensitive');
```

### Keyboard Navigation
```css
.report-option:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}

.moderation-action:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

## Implementation Guidelines

### 1. Reporting Flow
1. User clicks report button
2. Show report dialog with categories
3. User selects category and provides details
4. Show confirmation with reference number
5. Send report to moderation queue
6. Notify user of resolution

### 2. Moderation Workflow
1. Monitor moderation queue
2. Review reported content
3. Apply appropriate action (approve, reject, warn)
4. Notify reporter and content owner
5. Log all actions for audit

### 3. Safety Settings
1. Provide clear safety defaults
2. Allow granular control
3. Explain consequences of settings
4. Save preferences per device
5. Support export of safety data

## Testing Safety Features

### User Testing Scenarios
- Reporting inappropriate content
- Adjusting privacy settings
- Viewing content warnings
- Blocking other users
- Appealing moderation decisions

### Accessibility Testing
- Keyboard navigation through safety dialogs
- Screen reader announcements for warnings
- High contrast modes for sensitive content
- Focus management in moderation interfaces

## File Structure

- `components/safety/` - Safety-related components
- `utils/moderation/` - Content moderation utilities
- `hooks/useSafety/` - Safety feature hooks
- `types/safety.ts` - TypeScript definitions for safety features

## References

- [Material Design Dialogs](https://m3.material.io/components/dialogs)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Online Safety by Design](https://www.esafety.gov.au/industry/online-safety-by-design)
- [Trust & Safety Professional Association](https://trustandsafetyprofessionals.com/)