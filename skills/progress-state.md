# ContentSplit Progress State System

## Overview

The ContentSplit Progress State System follows Google Material Design 3 guidelines for determinate progress indicators. Progress states provide visual feedback for operations with known duration or measurable progress, such as file uploads, multi-step processes, and content generation. Unlike loading states (which are indeterminate), progress states show exact completion percentage.

## Material Design 3 Progress Principles

### Core Principles
1. **Determinate**: Show exact progress (0-100%)
2. **Predictable**: Provide accurate time/effort estimation
3. **Contextual**: Place progress indicators near relevant content
4. **Informative**: Include percentage labels when helpful
5. **Accessible**: Support screen readers and keyboard navigation

## Progress Indicator Types (Material Design 3)

### 1. Linear Determinate Progress
Horizontal progress bar showing exact completion percentage.

**Usage:** File uploads, form completion, content generation
**Size:** Height 4px (standard), 8px (thick)
**Labels:** Optional percentage, time remaining, status text
**Placement:** Top of content, within cards, inline

### 2. Circular Determinate Progress
Circular progress indicator showing exact completion percentage.

**Usage:** Download progress, installation, profile completion
**Size:** Small (24px), Medium (40px), Large (56px)
**Labels:** Optional center percentage, status icon
**Placement:** Center of containers, avatar overlays

### 3. Buffer Progress
Shows both completed progress and buffered/preloaded amount.

**Usage:** Video streaming, audio playback, data preloading
**Components:** Progress track, buffer track, progress indicator
**Placement:** Media players, streaming interfaces

### 4. Segmented Progress
Divides progress into discrete steps or segments.

**Usage:** Multi-step forms, tutorials, onboarding flows
**Segments:** 3-7 segments maximum
**Labels:** Step names, completion status per segment
**Placement:** Top of multi-step interfaces

### 5. Progress with Labels
Includes text labels showing percentage, time, or status.

**Usage:** Critical operations where feedback is essential
**Labels:** Percentage, time remaining, file size, speed
**Placement:** Below or adjacent to progress indicator

## Anatomy

### Linear Determinate Anatomy
```
┌─────────────────────────────────────────────┐
│ ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Progress track (background)
│ ██████████████                              │ ← Progress indicator (foreground)
│ 75% complete                                │ ← Label (optional)
└─────────────────────────────────────────────┘
```

### Circular Determinate Anatomy
```
          ┌─────────────────┐
          │                 │
          │      █████      │ ← Progress track (background)
          │    ██     ██    │
          │   █   75%   █   │ ← Progress indicator (foreground) + Label
          │  █           █  │
          │  █           █  │
          │   █         █   │
          │    ██     ██    │
          │      █████      │
          │                 │
          └─────────────────┘
```

### Segmented Progress Anatomy
```
┌───┬───┬───┬───┬───┬───┬───┐
│ ✓ │ ✓ │ ✓ │ • │ ○ │ ○ │ ○ │ ← Segment indicators
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ ← Step numbers
└───┴───┴───┴───┴───┴───┴───┘
```

## Design Tokens

### Linear Progress Tokens
```css
/* Linear progress styles */
--sys-progress-linear-height: 4px;
--sys-progress-linear-height-thick: 8px;
--sys-progress-linear-track-color: var(--sys-color-neutral-90);
--sys-progress-linear-indicator-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-progress-linear-buffer-color: var(--sys-color-neutral-80);
--sys-progress-linear-border-radius: var(--sys-radius-full);
--sys-progress-linear-transition-duration: 0.3s;
```

### Circular Progress Tokens
```css
/* Circular progress styles */
--sys-progress-circular-size-sm: 24px;
--sys-progress-circular-size-md: 40px;
--sys-progress-circular-size-lg: 56px;
--sys-progress-circular-track-color: var(--sys-color-neutral-90);
--sys-progress-circular-indicator-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-progress-circular-track-width: 4px;
--sys-progress-circular-indicator-width: 4px;
--sys-progress-circular-label-font-size: var(--sys-typography-label-small-font-size);
--sys-progress-circular-label-color: var(--sys-color-neutral-30);
```

### Segmented Progress Tokens
```css
/* Segmented progress styles */
--sys-progress-segment-gap: var(--sys-spacing-xs);
--sys-progress-segment-height: 4px;
--sys-progress-segment-width: 40px;
--sys-progress-segment-completed-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-progress-segment-current-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-progress-segment-pending-color: var(--sys-color-neutral-90);
--sys-progress-segment-border-radius: var(--sys-radius-full);
```

### Progress Label Tokens
```css
/* Progress label styles */
--sys-progress-label-font-family: var(--sys-typography-body-small-text-font-family);
--sys-progress-label-font-size: var(--sys-typography-body-small-text-font-size);
--sys-progress-label-font-weight: var(--sys-typography-body-small-text-font-weight);
--sys-progress-label-line-height: var(--sys-typography-body-small-text-line-height);
--sys-progress-label-color: var(--sys-color-neutral-30);
--sys-progress-label-gap: var(--sys-spacing-xs);
```

## Progress Indicator Implementation

### Linear Determinate Progress
```css
.progress-linear {
  width: 100%;
  height: var(--sys-progress-linear-height);
  background-color: var(--sys-progress-linear-track-color);
  border-radius: var(--sys-progress-linear-border-radius);
  overflow: hidden;
  position: relative;
}

.progress-linear-indicator {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--sys-progress-linear-indicator-color);
  border-radius: var(--sys-progress-linear-border-radius);
  transform-origin: left center;
  transition: transform var(--sys-progress-linear-transition-duration) ease;
}

/* Thick variant */
.progress-linear-thick {
  height: var(--sys-progress-linear-height-thick);
}

/* Color variants */
.progress-linear-success .progress-linear-indicator {
  background-color: var(--sys-color-roles-success-color-role-success-role);
}

.progress-linear-warning .progress-linear-indicator {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
}

.progress-linear-error .progress-linear-indicator {
  background-color: var(--sys-color-roles-error-color-role-error-role);
}

/* With labels */
.progress-linear-with-labels {
  display: flex;
  flex-direction: column;
  gap: var(--sys-progress-label-gap);
}

.progress-linear-labels {
  display: flex;
  justify-content: space-between;
  font-family: var(--sys-progress-label-font-family);
  font-size: var(--sys-progress-label-font-size);
  color: var(--sys-progress-label-color);
}
```

### Circular Determinate Progress
```css
.progress-circular {
  display: inline-block;
  width: var(--sys-progress-circular-size-md);
  height: var(--sys-progress-circular-size-md);
  position: relative;
}

.progress-circular-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circular-track {
  fill: none;
  stroke: var(--sys-progress-circular-track-color);
  stroke-width: var(--sys-progress-circular-track-width);
}

.progress-circular-indicator {
  fill: none;
  stroke: var(--sys-progress-circular-indicator-color);
  stroke-width: var(--sys-progress-circular-indicator-width);
  stroke-linecap: round;
  stroke-dasharray: 283; /* 2 * π * r (where r = 45) */
  stroke-dashoffset: 283;
  transition: stroke-dashoffset var(--sys-progress-linear-transition-duration) ease;
}

.progress-circular-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-progress-circular-label-font-size);
  color: var(--sys-progress-circular-label-color);
  text-align: center;
}

/* Size variants */
.progress-circular-sm {
  width: var(--sys-progress-circular-size-sm);
  height: var(--sys-progress-circular-size-sm);
}

.progress-circular-lg {
  width: var(--sys-progress-circular-size-lg);
  height: var(--sys-progress-circular-size-lg);
}

/* Color variants */
.progress-circular-success .progress-circular-indicator {
  stroke: var(--sys-color-roles-success-color-role-success-role);
}

.progress-circular-warning .progress-circular-indicator {
  stroke: var(--sys-color-roles-warning-color-role-warning-role);
}

.progress-circular-error .progress-circular-indicator {
  stroke: var(--sys-color-roles-error-color-role-error-role);
}
```

### Buffer Progress
```css
.progress-buffer {
  width: 100%;
  height: var(--sys-progress-linear-height);
  background-color: var(--sys-progress-linear-track-color);
  border-radius: var(--sys-progress-linear-border-radius);
  overflow: hidden;
  position: relative;
}

.progress-buffer-track {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--sys-progress-linear-buffer-color);
  border-radius: var(--sys-progress-linear-border-radius);
  transition: transform var(--sys-progress-linear-transition-duration) ease;
}

.progress-buffer-indicator {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--sys-progress-linear-indicator-color);
  border-radius: var(--sys-progress-linear-border-radius);
  transition: transform var(--sys-progress-linear-transition-duration) ease;
  transform-origin: left center;
}
```

### Segmented Progress
```css
.progress-segmented {
  display: flex;
  gap: var(--sys-progress-segment-gap);
  align-items: center;
}

.progress-segment {
  height: var(--sys-progress-segment-height);
  flex: 1;
  background-color: var(--sys-progress-segment-pending-color);
  border-radius: var(--sys-progress-segment-border-radius);
  position: relative;
  overflow: hidden;
}

.progress-segment-completed {
  background-color: var(--sys-progress-segment-completed-color);
}

.progress-segment-current {
  background-color: var(--sys-progress-segment-current-color);
  animation: segment-pulse 2s infinite;
}

.progress-segment-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: var(--sys-color-neutral-100);
  border: 2px solid currentColor;
  border-radius: 50%;
  z-index: 1;
}

.progress-segment-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-50);
  white-space: nowrap;
  margin-top: var(--sys-spacing-xs);
}

@keyframes segment-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

## Progress States

### Default State (0%)
```css
.progress-linear-indicator[style*="transform: scaleX(0)"] {
  /* At 0% progress */
  opacity: 0.3;
}
```

### Intermediate State (1-99%)
```css
.progress-linear-indicator[style*="transform: scaleX(0.5)"] {
  /* At 50% progress */
}
```

### Complete State (100%)
```css
.progress-linear-complete .progress-linear-indicator {
  background-color: var(--sys-color-roles-success-color-role-success-role);
  animation: progress-complete 0.5s ease-out;
}

@keyframes progress-complete {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.05);
  }
  100% {
    transform: scaleX(1);
  }
}
```

### Error State
```css
.progress-error .progress-linear-indicator {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  animation: progress-error 0.5s ease-out;
}

@keyframes progress-error {
  0%, 100% {
    transform: scaleX(var(--progress, 0.5));
  }
  25%, 75% {
    transform: scaleX(calc(var(--progress, 0.5) * 0.9));
  }
  50% {
    transform: scaleX(calc(var(--progress, 0.5) * 1.1));
  }
}
```

### Paused State
```css
.progress-paused .progress-linear-indicator {
  opacity: 0.7;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.3) 10px,
    rgba(255, 255, 255, 0.3) 20px
  );
}
```

## Progress Labels & Metadata

### Percentage Label
```css
.progress-percentage {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-font-weight-bold);
  color: var(--sys-color-neutral-10);
  min-width: 3em;
  text-align: right;
}
```

### Time Remaining
```css
.progress-time-remaining {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-50);
  font-variant-numeric: tabular-nums;
}
```

### File Size & Speed
```css
.progress-file-size {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
}

.progress-speed {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  font-variant-numeric: tabular-nums;
}
```

### Progress with Metadata Container
```css
.progress-with-meta {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
}

.progress-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-meta-left {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
}

.progress-meta-right {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}
```

## Progress in AI Interfaces

### AI Content Generation Progress
```css
.progress-ai-generation {
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-lg);
  padding: var(--sys-spacing-lg);
  background-color: var(--sys-color-neutral-98);
}

.progress-ai-generation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sys-spacing-md);
}

.progress-ai-generation-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-10);
  margin: 0;
}

.progress-ai-generation-details {
  display: flex;
  gap: var(--sys-spacing-md);
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-50);
}

.progress-ai-generation-linear {
  margin: var(--sys-spacing-md) 0;
}
```

### AI Model Training Progress
```css
.progress-ai-training {
  background: linear-gradient(135deg, 
    var(--sys-color-primary-95), 
    var(--sys-color-secondary-95)
  );
  border-radius: var(--sys-radius-lg);
  padding: var(--sys-spacing-xl);
}

.progress-ai-training-circular {
  margin: 0 auto;
  display: block;
}

.progress-ai-training-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sys-spacing-md);
  margin-top: var(--sys-spacing-lg);
}

.progress-ai-training-stat {
  text-align: center;
}

.progress-ai-training-stat-value {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-neutral-10);
  margin: 0;
}

.progress-ai-training-stat-label {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-50);
  margin: var(--sys-spacing-xs) 0 0 0;
}
```

### Multi-step AI Workflow
```css
.progress-ai-workflow {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-lg);
}

.progress-ai-step {
  display: flex;
  align-items: flex-start;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
  border: 1px solid var(--sys-color-neutral-90);
  background-color: var(--sys-color-neutral-98);
}

.progress-ai-step-active {
  border-color: var(--sys-color-primary-40);
  background-color: var(--sys-color-primary-95);
}

.progress-ai-step-completed {
  border-color: var(--sys-color-success-40);
  background-color: var(--sys-color-success-95);
}

.progress-ai-step-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-ai-step-icon-pending {
  background-color: var(--sys-color-neutral-90);
  color: var(--sys-color-neutral-60);
}

.progress-ai-step-icon-active {
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-neutral-100);
}

.progress-ai-step-icon-completed {
  background-color: var(--sys-color-success-40);
  color: var(--sys-color-neutral-100);
}

.progress-ai-step-content {
  flex: 1;
}

.progress-ai-step-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-10);
  margin: 0 0 var(--sys-spacing-xs) 0;
}

.progress-ai-step-description {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-50);
  margin: 0;
}

.progress-ai-step-progress {
  margin-top: var(--sys-spacing-sm);
}
```

## Accessibility

### ARIA Attributes for Progress Indicators
```html
<!-- Linear progress with ARIA -->
<div class="progress-linear" 
     role="progressbar" 
     aria-valuemin="0" 
     aria-valuemax="100" 
     aria-valuenow="75"
     aria-valuetext="75 percent complete"
     aria-label="File upload progress">
  <div class="progress-linear-indicator" style="transform: scaleX(0.75);"></div>
</div>

<!-- Circular progress with ARIA -->
<div class="progress-circular" 
     role="progressbar" 
     aria-valuemin="0" 
     aria-valuemax="100" 
     aria-valuenow="60"
     aria-valuetext="60 percent complete">
  <svg class="progress-circular-svg" viewBox="0 0 100 100">
    <circle class="progress-circular-track" cx="50" cy="50" r="45"></circle>
    <circle class="progress-circular-indicator" cx="50" cy="50" r="45"
            stroke-dasharray="283" stroke-dashoffset="113.2"></circle>
  </svg>
  <div class="progress-circular-label">60%</div>
</div>

<!-- Segmented progress with ARIA -->
<div class="progress-segmented" 
     role="progressbar" 
     aria-valuemin="1" 
     aria-valuemax="7" 
     aria-valuenow="4"
     aria-valuetext="Step 4 of 7: Content generation">
  <!-- Segment elements -->
</div>
```

### Screen Reader Support
```css
/* Hide decorative progress elements from screen readers */
.progress-circular-svg[aria-hidden="true"] {
  /* Already hidden */
}

/* Ensure progress labels are announced */
.progress-linear[aria-valuenow] {
  /* Value updates should trigger announcements */
}
```

### Keyboard Navigation
```css
.progress-linear:focus-within {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}

.progress-segmented:focus-within {
  outline: 3px solid var(--sys-color-primary-40);
  outline-offset: var(--sys-spacing-xs);
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .progress-linear-indicator,
  .progress-circular-indicator,
  .progress-buffer-indicator,
  .progress-segment-current {
    transition: none;
    animation: none;
  }
  
  .progress-linear-complete .progress-linear-indicator,
  .progress-error .progress-linear-indicator {
    animation: none;
  }
}
```

## Best Practices

### ✅ Do
- Use determinate progress only when you can accurately measure completion
- Update progress frequently (at least every 100ms for smooth animation)
- Include percentage labels for operations > 2 seconds
- Provide time remaining estimates for operations > 10 seconds
- Place progress indicators near the content being processed
- Use appropriate progress type (linear for length, circular for compact)
- Support pause/resume controls for long-running operations
- Provide completion confirmation when progress reaches 100%
- Handle errors gracefully with clear error states
- Test progress indicators with screen readers

### ❌ Don't
- Don't use determinate progress for operations with unknown duration
- Don't fake progress updates - be accurate and honest
- Don't use progress indicators for decorative purposes
- Don't place progress indicators far from relevant content
- Don't use aggressive animations that distract from primary tasks
- Don't forget to handle network interruptions and retries
- Don't use progress indicators for disabled states
- Don't hardcode progress colors - use design tokens
- Don't ignore progress state in high contrast mode
- Don't use progress indicators for trivial operations (< 200ms)

## Performance Considerations

### Efficient Progress Updates
```javascript
// Use requestAnimationFrame for smooth progress updates
function animateProgress(element, targetProgress, duration = 300) {
  const startProgress = parseFloat(element.getAttribute('data-progress') || '0');
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentValue = startProgress + (targetProgress - startProgress) * progress;
    element.style.setProperty('--progress', currentValue);
    element.setAttribute('data-progress', currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

### Debounced Progress Updates
```javascript
// Debounce progress updates for performance
const debounceProgress = debounce((progress) => {
  updateProgressUI(progress);
}, 50); // Update at most every 50ms
```

## File Structure

### Related Files
- `skills/loading-state.md` - For indeterminate loading states
- `skills/notification.md` - For progress completion notifications
- `design-tokens-ultimate.css` - Design tokens for progress styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference

### Progress Component Files
- `components/Progress/` - Progress indicator components
  - `LinearProgress.tsx` - Linear progress component
  - `CircularProgress.tsx` - Circular progress component
  - `BufferProgress.tsx` - Buffer progress component
  - `SegmentedProgress.tsx` - Segmented progress component
  - `Progress.css` - Progress styles
  - `Progress.stories.tsx` - Storybook stories
  - `Progress.test.tsx` - Component tests
- `hooks/` - Progress-related hooks
  - `useProgress.ts` - Hook for managing progress state
  - `useProgressAnimation.ts` - Hook for smooth progress animations

### Module Organization
```bash
src/
├── components/
│   └── Progress/
│       ├── index.ts
│       ├── LinearProgress.tsx
│       ├── CircularProgress.tsx
│       ├── BufferProgress.tsx
│       ├── SegmentedProgress.tsx
│       ├── Progress.css
│       ├── Progress.stories.tsx
│       └── Progress.test.tsx
├── hooks/
│   ├── useProgress.ts
│   └── useProgressAnimation.ts
└── utils/
    ├── progressHelpers.ts
    └── progressFormatters.ts
```

## Integration Patterns

### React Hook for Progress Management
```javascript
// useProgress.ts
import { useState, useCallback, useEffect } from 'react';

interface UseProgressOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export function useProgress(options: UseProgressOptions = {}) {
  const {
    initialValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
  } = options;
  
  const [progress, setProgress] = useState(initialValue);
  const [isComplete, setIsComplete] = useState(false);
  
  const updateProgress = useCallback((value: number) => {
    const clamped = Math.max(min, Math.min(max, value));
    setProgress(clamped);
    onChange?.(clamped);
    
    if (clamped >= max && !isComplete) {
      setIsComplete(true);
    } else if (clamped < max && isComplete) {
      setIsComplete(false);
    }
  }, [min, max, onChange, isComplete]);
  
  const increment = useCallback((amount: number = step) => {
    updateProgress(progress + amount);
  }, [progress, updateProgress, step]);
  
  const reset = useCallback(() => {
    setProgress(initialValue);
    setIsComplete(false);
  }, [initialValue]);
  
  const percentage = ((progress - min) / (max - min)) * 100;
  
  return {
    progress,
    percentage,
    isComplete,
    updateProgress,
    increment,
    reset,
  };
}
```

### AI Content Generation Progress Integration
```javascript
// Example: AI content generation with progress tracking
async function generateContentWithProgress(prompt, options) {
  const { updateProgress } = useProgress();
  const estimatedTokens = 1000;
  let generatedTokens = 0;
  
  try {
    const stream = await aiService.generateStream(prompt, options);
    
    for await (const chunk of stream) {
      generatedTokens += chunk.tokenCount;
      const progress = (generatedTokens / estimatedTokens) * 100;
      updateProgress(Math.min(100, progress));
      
      // Update UI with generated content
      updateContentChunk(chunk);
    }
    
    updateProgress(100);
    return getGeneratedContent();
  } catch (error) {
    updateProgress(0);
    throw error;
  }
}
```

### File Upload Progress Integration
```javascript
// Example: File upload with progress tracking
async function uploadFileWithProgress(file, endpoint) {
  const { updateProgress } = useProgress();
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        updateProgress(progress);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        updateProgress(100);
        resolve(xhr.response);
      } else {
        updateProgress(0);
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    });
    
    xhr.addEventListener('error', () => {
      updateProgress(0);
      reject(new Error('Upload failed'));
    });
    
    xhr.open('POST', endpoint);
    xhr.send(file);
  });
}
```

---

*This progress state system ensures consistent, accessible, and accurate progress indicators across ContentSplit. All progress states should follow Material Design 3 guidelines and use the design token system for styling. Coordinate with loading states for indeterminate operations and notifications for completion feedback.*