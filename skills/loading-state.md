# ContentSplit Loading State System

## Overview

The ContentSplit Loading State System follows Google Material Design 3 guidelines for loading indicators and skeleton screens. Loading states provide visual feedback during asynchronous operations, data fetching, and processing times, maintaining user engagement and setting clear expectations.

## Material Design 3 Loading Principles

### Core Principles
1. **Immediate Feedback**: Show loading state within 100ms of user action
2. **Progressive Disclosure**: Reveal content gradually as it loads
3. **Contextual Placement**: Place loading indicators near the content being loaded
4. **Predictable Timing**: Set realistic expectations for loading duration
5. **Accessible**: Support screen readers and provide alternative text

## Loading Indicator Types (Material Design 3)

### 1. Circular Progress
Indeterminate or determinate circular loading indicator.

**Usage:** General loading, indeterminate operations
**Size:** Small (24px), Medium (40px), Large (56px)
**Variants:** Indeterminate, Determinate, Buffer
**Placement:** Center of containers, inline with text

### 2. Linear Progress
Horizontal progress bar for loading operations.

**Usage:** Page loading, file uploads, multi-step processes
**Size:** Height 4px (standard), 8px (thick)
**Variants:** Indeterminate, Determinate, Buffer
**Placement:** Top of content, within cards, inline

### 3. Skeleton Screens
Content placeholders that mimic the final layout.

**Usage:** Initial page loads, content-heavy interfaces
**Shape:** Rectangles, circles, text lines
**Animation:** Pulse or wave effect
**Placement:** Exact position of final content

### 4. Content Placeholders
Simplified shapes representing content areas.

**Usage:** Dashboard widgets, cards, lists
**Shape:** Generic rectangles with rounded corners
**Animation:** Subtle pulse
**Placement:** Where content will appear

### 5. Text Loading
Placeholder text with animated background.

**Usage:** Paragraphs, headings, lists
**Effect:** Gradient animation over placeholder text
**Placement:** Within text containers

## Anatomy

### Circular Progress Anatomy
```
          ┌─────────────────┐
          │                 │
          │      █████      │ ← Progress track
          │    ██     ██    │
          │   █         █   │
          │  █           █  │
          │  █           █  │ ← Progress indicator
          │   █         █   │
          │    ██     ██    │
          │      █████      │
          │                 │
          └─────────────────┘
```

### Linear Progress Anatomy
```
┌─────────────────────────────────────────────┐
│ ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Progress track
│ ██████████████                              │ ← Progress indicator
└─────────────────────────────────────────────┘
```

### Skeleton Anatomy
```
┌─────────────────────────────────────────────┐
│ ███████████████████████████████████████████ │ ← Skeleton line
│ ██████████████    █████████████████████████ │
│ ██████████        ██████████    ███████████ │
└─────────────────────────────────────────────┘
```

## Design Tokens

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
--sys-progress-circular-animation-duration: 1.4s;
```

### Linear Progress Tokens
```css
/* Linear progress styles */
--sys-progress-linear-height: 4px;
--sys-progress-linear-height-thick: 8px;
--sys-progress-linear-track-color: var(--sys-color-neutral-90);
--sys-progress-linear-indicator-color: var(--sys-color-roles-primary-color-role-primary-role);
--sys-progress-linear-buffer-color: var(--sys-color-neutral-80);
--sys-progress-linear-animation-duration: 2s;
--sys-progress-linear-border-radius: var(--sys-radius-full);
```

### Skeleton Tokens
```css
/* Skeleton styles */
--sys-skeleton-background: var(--sys-color-neutral-95);
--sys-skeleton-highlight: var(--sys-color-neutral-98);
--sys-skeleton-animation-duration: 1.5s;
--sys-skeleton-border-radius: var(--sys-radius-sm);
--sys-skeleton-text-height: 1em;
--sys-skeleton-text-margin: 0.5em 0;
--sys-skeleton-image-aspect-ratio: 16/9;
```

### Loading State Tokens
```css
/* Loading container styles */
--sys-loading-backdrop-color: rgba(255, 255, 255, 0.8);
--sys-loading-backdrop-blur: 4px;
--sys-loading-z-index: 1000;
--sys-loading-overlay-opacity: 0.9;
```

## Loading Indicator Implementation

### Circular Progress (Indeterminate)
```css
.progress-circular {
  display: inline-block;
  width: var(--sys-progress-circular-size-md);
  height: var(--sys-progress-circular-size-md);
  animation: circular-rotate var(--sys-progress-circular-animation-duration) linear infinite;
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
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: circular-dash 1.4s ease-in-out infinite;
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

/* Animations */
@keyframes circular-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes circular-dash {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
}
```

### Linear Progress (Indeterminate)
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
  animation: linear-indeterminate var(--sys-progress-linear-animation-duration) infinite linear;
  transform-origin: left center;
}

/* Thick variant */
.progress-linear-thick {
  height: var(--sys-progress-linear-height-thick);
}

/* Determinate variant */
.progress-linear-determinate .progress-linear-indicator {
  animation: none;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

/* Buffer variant */
.progress-linear-buffer {
  background: linear-gradient(
    to right,
    var(--sys-progress-linear-indicator-color) 0%,
    var(--sys-progress-linear-buffer-color) 0%,
    var(--sys-progress-linear-buffer-color) 30%,
    var(--sys-progress-linear-track-color) 30%,
    var(--sys-progress-linear-track-color) 100%
  );
}

/* Animations */
@keyframes linear-indeterminate {
  0% {
    transform: translateX(-100%) scaleX(0.1);
  }
  50% {
    transform: translateX(0%) scaleX(0.5);
  }
  100% {
    transform: translateX(100%) scaleX(0.1);
  }
}

@keyframes linear-indeterminate-short {
  0% {
    transform: translateX(-100%) scaleX(0.1);
  }
  50% {
    transform: translateX(500%) scaleX(0.5);
  }
  100% {
    transform: translateX(1000%) scaleX(0.1);
  }
}
```

### Skeleton Screens
```css
.skeleton {
  background-color: var(--sys-skeleton-background);
  border-radius: var(--sys-skeleton-border-radius);
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--sys-skeleton-highlight) 50%,
    transparent 100%
  );
  animation: skeleton-wave var(--sys-skeleton-animation-duration) infinite;
}

/* Skeleton text */
.skeleton-text {
  height: var(--sys-skeleton-text-height);
  margin: var(--sys-skeleton-text-margin);
}

.skeleton-text-sm {
  height: calc(var(--sys-skeleton-text-height) * 0.75);
}

.skeleton-text-lg {
  height: calc(var(--sys-skeleton-text-height) * 1.5);
}

.skeleton-text-xl {
  height: calc(var(--sys-skeleton-text-height) * 2);
}

/* Skeleton image */
.skeleton-image {
  aspect-ratio: var(--sys-skeleton-image-aspect-ratio);
  width: 100%;
}

/* Skeleton circle */
.skeleton-circle {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.skeleton-circle-sm {
  width: 24px;
  height: 24px;
}

.skeleton-circle-lg {
  width: 56px;
  height: 56px;
}

/* Skeleton card */
.skeleton-card {
  padding: var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-sm);
}

/* Animation */
@keyframes skeleton-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton-pulse::after {
  display: none;
}

.skeleton-pulse {
  animation: skeleton-pulse var(--sys-skeleton-animation-duration) infinite;
}
```

## Loading State Components

### Full-page Loading Overlay
```css
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sys-loading-backdrop-color);
  backdrop-filter: blur(var(--sys-loading-backdrop-blur));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--sys-loading-z-index);
  opacity: 0;
  animation: fade-in 0.3s ease-out forwards;
}

.loading-overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-spacing-md);
  text-align: center;
}

.loading-overlay-message {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-30);
  margin: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: var(--sys-loading-overlay-opacity);
  }
}
```

### Inline Loading State
```css
.loading-inline {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
}

.loading-inline-message {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-50);
}
```

### Button Loading State
```css
.button-loading {
  position: relative;
  color: transparent;
}

.button-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid var(--sys-color-neutral-100);
  border-top-color: transparent;
  border-radius: 50%;
  animation: button-spin 1s linear infinite;
}

@keyframes button-spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

## Loading States for AI Interfaces

### AI Processing Indicator
```css
.loading-ai-processing {
  border-left: 4px solid var(--sys-color-primary-40);
  background-color: var(--sys-color-primary-95);
  padding: var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
}

.loading-ai-processing-indicator {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}

.loading-ai-processing-dots {
  display: flex;
  gap: var(--sys-spacing-xs);
}

.loading-ai-processing-dot {
  width: 8px;
  height: 8px;
  background-color: var(--sys-color-primary-40);
  border-radius: 50%;
  animation: ai-dot-bounce 1.4s infinite;
}

.loading-ai-processing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-ai-processing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes ai-dot-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
```

### Content Generation Skeleton
```css
.skeleton-content-generation {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-md);
  padding: var(--sys-spacing-lg);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-lg);
}

.skeleton-content-generation-header {
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-md);
}

.skeleton-content-generation-body {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-sm);
}
```

### AI Model Loading
```css
.loading-ai-model {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--sys-spacing-xl);
  gap: var(--sys-spacing-md);
}

.loading-ai-model-progress {
  width: 200px;
  height: var(--sys-progress-linear-height);
  background: linear-gradient(90deg, 
    var(--sys-color-primary-40), 
    var(--sys-color-secondary-40)
  );
  border-radius: var(--sys-progress-linear-border-radius);
  animation: ai-model-progress 2s ease-in-out infinite;
}

@keyframes ai-model-progress {
  0%, 100% {
    transform: scaleX(0.1);
  }
  50% {
    transform: scaleX(0.8);
  }
}
```

## Accessibility

### ARIA Attributes for Loading States
```html
<!-- Circular progress with ARIA -->
<div class="progress-circular" 
     role="progressbar" 
     aria-valuetext="Loading"
     aria-label="Content loading">
  <svg class="progress-circular-svg" viewBox="0 0 100 100">
    <circle class="progress-circular-track" cx="50" cy="50" r="45"></circle>
    <circle class="progress-circular-indicator" cx="50" cy="50" r="45"></circle>
  </svg>
</div>

<!-- Linear progress with ARIA -->
<div class="progress-linear" 
     role="progressbar" 
     aria-valuemin="0" 
     aria-valuemax="100" 
     aria-valuenow="75"
     aria-label="Upload progress">
  <div class="progress-linear-indicator" style="transform: scaleX(0.75);"></div>
</div>

<!-- Loading overlay with ARIA -->
<div class="loading-overlay" 
     role="alert" 
     aria-live="polite"
     aria-label="Please wait, loading content">
  <div class="loading-overlay-content">
    <div class="progress-circular"></div>
    <p class="loading-overlay-message">Loading your content...</p>
  </div>
</div>
```

### Screen Reader Support
```css
/* Hide decorative loading animations from screen readers */
.progress-circular[aria-hidden="true"] {
  /* Already hidden */
}

/* Ensure loading messages are announced */
.loading-overlay[aria-live] {
  /* Live region for announcements */
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .progress-circular,
  .progress-linear-indicator,
  .skeleton::after,
  .loading-ai-processing-dot {
    animation: none;
  }
  
  .progress-circular-determinate,
  .progress-linear-determinate .progress-linear-indicator {
    /* Keep determinate progress without animation */
  }
  
  .skeleton-pulse {
    animation: none;
    opacity: 0.8;
  }
}
```

## Best Practices

### ✅ Do
- Show loading state within 100ms of user action
- Use skeleton screens for initial page loads
- Match loading indicator size to container size
- Provide descriptive ARIA labels for screen readers
- Support reduced motion preferences
- Use determinate progress for known duration operations
- Place loading indicators near the content being loaded
- Provide loading percentage when possible
- Use subtle animations that don't cause distraction
- Test loading states with slow network connections

### ❌ Don't
- Don't show loading for operations under 200ms
- Don't use multiple loading indicators for the same operation
- Don't place loading indicators far from relevant content
- Don't use aggressive animations that cause motion sickness
- Don't forget to handle loading errors and timeouts
- Don't use loading states as decorative elements
- Don't hardcode animation durations - use CSS variables
- Don't ignore loading state in high contrast mode
- Don't use loading indicators for disabled states
- Don't forget to clear loading state after completion

## Performance Considerations

### Lazy Loading Patterns
```css
/* Intersection Observer for lazy loading */
.lazy-load {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-load.loaded {
  opacity: 1;
}

/* Progressive image loading */
.progressive-image {
  background-color: var(--sys-skeleton-background);
  position: relative;
}

.progressive-image-loading {
  filter: blur(10px);
}

.progressive-image-loaded {
  filter: blur(0);
  transition: filter 0.3s ease;
}
```

### Optimized Animations
```css
/* Use transform and opacity for performance */
.loading-indicator {
  will-change: transform, opacity;
}

/* Use hardware acceleration */
.skeleton::after {
  transform: translateZ(0);
}
```

## File Structure

### Related Files
- `skills/progress-state.md` - For detailed progress bar implementations
- `skills/notification.md` - For loading completion notifications
- `design-tokens-ultimate.css` - Design tokens for loading styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference

### Loading Component Files
- `components/Progress/` - Progress indicator components
  - `CircularProgress.tsx` - Circular progress component
  - `LinearProgress.tsx` - Linear progress component
  - `Progress.css` - Progress styles
  - `Progress.stories.tsx` - Storybook stories
  - `Progress.test.tsx` - Component tests
- `components/Skeleton/` - Skeleton screen components
  - `Skeleton.tsx` - Main skeleton component
  - `SkeletonText.tsx` - Text skeleton component
  - `SkeletonImage.tsx` - Image skeleton component
  - `Skeleton.css` - Skeleton styles
  - `Skeleton.stories.tsx` - Storybook stories
  - `Skeleton.test.tsx` - Component tests
- `components/Loading/` - Loading state components
  - `LoadingOverlay.tsx` - Full-page loading overlay
  - `LoadingInline.tsx` - Inline loading indicator
  - `Loading.css` - Loading styles
  - `Loading.stories.tsx` - Storybook stories
  - `Loading.test.tsx` - Component tests

### Module Organization
```bash
src/
├── components/
│   ├── Progress/
│   │   ├── index.ts
│   │   ├── CircularProgress.tsx
│   │   ├── LinearProgress.tsx
│   │   ├── Progress.css
│   │   ├── Progress.stories.tsx
│   │   └── Progress.test.tsx
│   ├── Skeleton/
│   │   ├── index.ts
│   │   ├── Skeleton.tsx
│   │   ├── SkeletonText.tsx
│   │   ├── SkeletonImage.tsx
│   │   ├── Skeleton.css
│   │   ├── Skeleton.stories.tsx
│   │   └── Skeleton.test.tsx
│   └── Loading/
│       ├── index.ts
│       ├── LoadingOverlay.tsx
│       ├── LoadingInline.tsx
│       ├── Loading.css
│       ├── Loading.stories.tsx
│       └── Loading.test.tsx
├── hooks/
│   └── useLoading.ts
└── utils/
    └── loadingHelpers.ts
```

## Integration Patterns

### React Hook for Loading States
```javascript
// useLoading.ts
import { useState, useCallback } from 'react';

export function useLoading(initialState = false) {
  const [loading, setLoading] = useState(initialState);
  const [progress, setProgress] = useState(0);
  
  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);
  }, []);
  
  const updateProgress = useCallback((value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  }, []);
  
  const stopLoading = useCallback(() => {
    setLoading(false);
    setProgress(100);
    setTimeout(() => setProgress(0), 300);
  }, []);
  
  return {
    loading,
    progress,
    startLoading,
    updateProgress,
    stopLoading,
  };
}
```

### AI Content Loading Integration
```javascript
// Example: AI content generation with loading states
async function generateContentWithLoading(prompt, options) {
  const { startLoading, updateProgress, stopLoading } = useLoading();
  
  startLoading();
  
  try {
    const stream = await aiService.generateStream(prompt, options);
    let content = '';
    
    for await (const chunk of stream) {
      content += chunk;
      updateProgress((content.length / options.estimatedLength) * 100);
      // Update UI with progressive content
    }
    
    stopLoading();
    return content;
  } catch (error) {
    stopLoading();
    throw error;
  }
}
```

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for loading indicator styling
- `skills/color.md` - Color tokens reference
- `skills/spacing.md` - Spacing tokens reference
- `skills/progress-state.md` - Progress state patterns
- `skills/progress.md` - Progress indicator components
- `component-specification.md` - Component specifications

### Loading Component Files
- `components/loading/` - Loading indicator components
  - `LoadingSpinner.tsx` - Circular loading indicator
  - `LoadingBar.tsx` - Linear progress bar
  - `Skeleton.tsx` - Skeleton screen component
  - `LoadingState.tsx` - Loading state wrapper component

---

*This loading state system ensures consistent, accessible, and performant loading indicators across ContentSplit. All loading states should follow Material Design 3 guidelines and use the design token system for styling. Coordinate with progress states for determinate operations and notifications for completion feedback.*