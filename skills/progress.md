# ContentSplit Progress Indicators System

## Overview

The ContentSplit Progress Indicators System follows Google Material Design 3 guidelines for visual indicators that show completion status of processes, tasks, or operations. This system provides UI components for displaying progress, while the comprehensive state management and usage patterns are documented in [progress-state.md](progress-state.md).

## Component Types

### 1. Linear Progress Bar (`progress-linear`)
Horizontal bar showing progress from 0-100%.

```css
.progress-linear {
  width: 100%;
  height: 4px;
  background-color: var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-full);
  overflow: hidden;
}

.progress-linear-track {
  height: 100%;
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: var(--sys-radius-full);
  transition: width 0.3s ease;
}

.progress-linear-thick {
  height: 8px;
}

.progress-linear-buffer {
  background: linear-gradient(
    to right,
    var(--sys-color-roles-primary-color-role-primary-role) 0%,
    var(--sys-color-roles-primary-color-role-primary-role) var(--progress-percent),
    var(--sys-color-primary-80) var(--progress-percent),
    var(--sys-color-primary-80) var(--buffer-percent),
    var(--sys-color-neutral-90) var(--buffer-percent),
    var(--sys-color-neutral-90) 100%
  );
}
```

### 2. Circular Progress Indicator (`progress-circular`)
Circular indicator showing progress with optional center label.

```css
.progress-circular {
  position: relative;
  width: 40px;
  height: 40px;
}

.progress-circular-track {
  fill: none;
  stroke: var(--sys-color-neutral-90);
  stroke-width: 4;
}

.progress-circular-fill {
  fill: none;
  stroke: var(--sys-color-roles-primary-color-role-primary-role);
  stroke-width: 4;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.3s ease;
}

.progress-circular-small {
  width: 24px;
  height: 24px;
}

.progress-circular-large {
  width: 56px;
  height: 56px;
}

.progress-circular-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
}
```

### 3. Step Progress (`progress-steps`)
Visual representation of progress through discrete steps.

```css
.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: var(--sys-spacing-xl) 0;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--sys-color-neutral-90);
  transform: translateY(-50%);
  z-index: 1;
}

.progress-steps-progress {
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  transform: translateY(-50%);
  z-index: 2;
  transition: width 0.3s ease;
}

.progress-step {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
}

.progress-step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--sys-color-neutral-90);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-color-neutral-40);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  transition: all 0.3s ease;
}

.progress-step.active .progress-step-circle {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
}

.progress-step.completed .progress-step-circle {
  background-color: var(--sys-color-roles-success-color-role-success-role);
  color: var(--sys-color-roles-success-color-role-on-success-role);
}

.progress-step-label {
  margin-top: var(--sys-spacing-xs);
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  text-align: center;
  white-space: nowrap;
}
```

### 4. Progress with Labels (`progress-labeled`)
Progress indicator with integrated text labels.

```css
.progress-labeled {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}

.progress-labeled-bar {
  flex: 1;
}

.progress-labeled-text {
  min-width: 60px;
  text-align: right;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.progress-labeled-primary {
  display: block;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-xs);
}

.progress-labeled-secondary {
  display: block;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
}
```

## Interactive States

### Hover State
```css
.progress-linear:hover .progress-linear-track {
  background-color: var(--sys-color-primary-60);
}

.progress-step-circle:hover {
  transform: scale(1.1);
  box-shadow: var(--sys-elevation-1);
}
```

### Focus State
```css
.progress-linear:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
  border-radius: var(--sys-radius-full);
}

.progress-step-circle:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

### Disabled State
```css
.progress-linear.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.progress-linear.disabled .progress-linear-track {
  background-color: var(--sys-color-neutral-70);
}

.progress-step.disabled .progress-step-circle {
  background-color: var(--sys-color-neutral-95);
  color: var(--sys-color-neutral-70);
}
```

## Usage Guidelines

### 1. Component Selection
- **Linear progress:** File uploads, content generation, form completion
- **Circular progress:** Profile completion, download status, avatar overlays
- **Step progress:** Multi-step forms, onboarding flows, tutorials
- **Labeled progress:** Operations with time estimates or status details

### 2. Placement
- Place progress indicators near the content they affect
- Use linear progress at the top of content areas
- Use circular progress for centered, focused operations
- Use step progress for multi-step processes with clear stages

### 3. Accessibility
- Provide `aria-valuemin`, `aria-valuemax`, `aria-valuenow` for progress bars
- Use `aria-label` to describe the progress operation
- Ensure sufficient color contrast for progress indicators
- Support keyboard navigation for interactive progress components
- Update `aria-valuenow` dynamically as progress changes

### 4. Performance
- Use CSS transitions for smooth progress updates
- Throttle progress updates to avoid excessive re-renders
- Consider using `will-change` for complex animations
- Test performance on low-end devices

## Integration with Progress State System

This component system works with the comprehensive progress state patterns documented in [progress-state.md](progress-state.md). Refer to that document for:

- Detailed usage patterns for different progress scenarios
- State management strategies for progress operations
- Error handling and interruption patterns
- Accessibility implementation details
- Testing strategies for progress components

## File Structure

- `components/progress/` - Progress component implementation
- `design-tokens-ultimate.css` - Color, spacing, and radius tokens
- `skills/progress-state.md` - Comprehensive progress state documentation

## Testing Progress Indicators

1. **Visual:** Verify all progress types render correctly at various percentages
2. **Functional:** Test progress updates, animations, and interactive states
3. **Accessibility:** Test screen reader announcements and ARIA attributes
4. **Performance:** Test smoothness of progress animations
5. **Responsive:** Verify progress indicator behavior across breakpoints
6. **Edge Cases:** Test 0%, 100%, and rapid progress updates