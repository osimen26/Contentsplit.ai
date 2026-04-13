# ContentSplit AI Integration Guidelines

## Overview

The ContentSplit AI Integration Guidelines provide standards for incorporating artificial intelligence features into the UI following Google Material Design 3 principles. These guidelines ensure AI features are intuitive, transparent, and accessible while maintaining consistent user experiences across the platform.

## AI Integration Principles

### 1. User Control & Transparency
- AI features should augment, not replace, user control
- Clearly indicate when AI is being used
- Provide explanations for AI suggestions and decisions
- Allow users to easily accept, modify, or reject AI output

### 2. Progressive Enhancement
- AI features should enhance existing workflows
- Provide graceful degradation when AI is unavailable
- Load AI features progressively to avoid performance impact
- Offer manual alternatives for all AI-powered actions

### 3. Ethical & Responsible AI
- Clearly communicate AI capabilities and limitations
- Implement guardrails to prevent harmful content generation
- Provide opt-out mechanisms for AI features
- Maintain user privacy and data security

## AI-Powered UI Patterns

### AI Suggestion Interface
```css
.ai-suggestion-container {
  background-color: var(--sys-color-primary-98);
  border: 1px solid var(--sys-color-primary-90);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: var(--sys-elevation-1);
}

.ai-suggestion-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.ai-suggestion-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--sys-color-primary-95);
  color: var(--sys-color-primary-40);
  border-radius: 12px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  font-weight: var(--sys-typography-body-small-text-font-weight);
}

.ai-suggestion-content {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  line-height: var(--sys-typography-body-text-line-height);
  margin-bottom: 16px;
}

.ai-suggestion-actions {
  display: flex;
  gap: 8px;
}

.ai-suggestion-accept {
  background-color: var(--sys-color-roles-success-color-role-success-color-role);
  color: var(--sys-color-roles-success-color-role-on-success-color-role);
}

.ai-suggestion-modify {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
}

.ai-suggestion-reject {
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: 1px solid var(--sys-color-primary-80);
}
```

### AI Loading States
```css
.ai-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  text-align: center;
}

.ai-loading-indicator {
  width: 48px;
  height: 48px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  margin-bottom: 16px;
  animation: aiPulse 1.5s ease-in-out infinite;
}

@keyframes aiPulse {
  0%, 100% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
}

.ai-loading-progress {
  width: 100%;
  height: 4px;
  background-color: var(--sys-color-neutral-90);
  border-radius: 2px;
  overflow: hidden;
  margin: 16px 0;
}

.ai-loading-progress-fill {
  height: 100%;
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  animation: aiProgress 2s ease-in-out infinite;
}

@keyframes aiProgress {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

.ai-loading-status {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-top: 8px;
}
```

### AI Content Generation
```css
.ai-content-generator {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--sys-elevation-1);
}

.ai-prompt-input {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background-color: var(--sys-color-primary-100);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 8px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  resize: vertical;
  margin-bottom: 16px;
}

.ai-prompt-input:focus {
  border-color: var(--sys-color-roles-primary-color-role-primary-role);
  outline: none;
  box-shadow: 0 0 0 2px var(--sys-color-primary-90);
}

.ai-generation-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.ai-option-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--sys-color-neutral-95);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ai-option-chip:hover {
  background-color: var(--sys-color-neutral-90);
}

.ai-option-chip.selected {
  background-color: var(--sys-color-primary-95);
  border-color: var(--sys-color-primary-90);
  color: var(--sys-color-primary-40);
}

.ai-generate-button {
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
  width: 100%;
}
```

## AI Feature Categories

### Content Enhancement AI
```css
.ai-enhancement-toolbar {
  display: flex;
  gap: 8px;
  padding: 12px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 12px;
  margin-bottom: 16px;
}

.ai-enhancement-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--sys-color-primary-100);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 8px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-roles-primary-color-role-primary-role);
  cursor: pointer;
  transition: all 0.2s ease;
}

.ai-enhancement-button:hover {
  background-color: var(--sys-color-primary-95);
  border-color: var(--sys-color-primary-90);
}

.ai-enhancement-button:active {
  transform: translateY(1px);
}
```

### Smart Recommendations
```css
.ai-recommendations {
  background-color: var(--sys-color-primary-98);
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
}

.ai-recommendations-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.ai-recommendations-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-primary-10);
}

.ai-recommendations-refresh {
  background: none;
  border: none;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

.ai-recommendations-refresh:hover {
  background-color: var(--sys-color-primary-95);
}

.ai-recommendation-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.ai-recommendation-item:hover {
  background-color: var(--sys-color-primary-95);
}

.ai-recommendation-icon {
  width: 20px;
  height: 20px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  flex-shrink: 0;
}

.ai-recommendation-content {
  flex: 1;
}

.ai-recommendation-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-primary-10);
  margin-bottom: 4px;
}

.ai-recommendation-description {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
}
```

### AI-Powered Search
```css
.ai-search-container {
  position: relative;
}

.ai-search-input {
  width: 100%;
  padding: 16px 48px 16px 16px;
  background-color: var(--sys-color-primary-100);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 20px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  outline: none;
}

.ai-search-input:focus {
  border-color: var(--sys-color-roles-primary-color-role-primary-role);
  box-shadow: 0 0 0 2px var(--sys-color-primary-90);
}

.ai-search-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

.ai-search-button:hover {
  background-color: var(--sys-color-primary-95);
}

.ai-search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--sys-color-primary-100);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 12px;
  margin-top: 8px;
  box-shadow: var(--sys-elevation-2);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.ai-search-suggestion {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.ai-search-suggestion:hover {
  background-color: var(--sys-color-primary-95);
}

.ai-search-suggestion.selected {
  background-color: var(--sys-color-primary-95);
  border-left: 4px solid var(--sys-color-roles-primary-color-role-primary-role);
}
```

## Error Handling & Fallbacks

### AI Error States
```css
.ai-error-state {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin: 16px 0;
}

.ai-error-icon {
  width: 48px;
  height: 48px;
  color: var(--sys-color-roles-error-color-role-error-role);
  margin-bottom: 16px;
}

.ai-error-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  margin-bottom: 8px;
}

.ai-error-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  margin-bottom: 16px;
  line-height: var(--sys-typography-body-text-line-height);
}

.ai-error-retry {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  color: var(--sys-color-roles-error-color-role-on-error-color-role);
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

### AI Fallback UI
```css
.ai-fallback {
  background-color: var(--sys-color-roles-warning-color-role-warning-container-role);
  color: var(--sys-color-roles-warning-color-role-on-warning-container-role);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.ai-fallback-content {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  line-height: var(--sys-typography-body-text-line-height);
  margin-bottom: 16px;
}

.ai-fallback-manual {
  background-color: transparent;
  color: var(--sys-color-roles-warning-color-role-on-warning-container-role);
  border: 1px solid currentColor;
  border-radius: 20px;
  padding: 12px 24px;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
}
```

## Accessibility Considerations

### Screen Reader Support
```html
<div class="ai-suggestion-container" role="region" aria-label="AI suggestion">
  <div class="ai-suggestion-header">
    <span class="ai-suggestion-badge" aria-hidden="true">
      <svg class="ai-icon">...</svg>
      AI Suggestion
    </span>
    <span class="sr-only">Artificial Intelligence suggestion</span>
  </div>
  <div class="ai-suggestion-content" id="ai-suggestion-1">
    Suggested content here...
  </div>
  <div class="ai-suggestion-actions">
    <button 
      class="ai-suggestion-accept"
      aria-describedby="ai-suggestion-1"
    >
      Accept
    </button>
    <button 
      class="ai-suggestion-modify"
      aria-describedby="ai-suggestion-1"
    >
      Modify
    </button>
    <button 
      class="ai-suggestion-reject"
      aria-describedby="ai-suggestion-1"
    >
      Reject
    </button>
  </div>
</div>
```

### Keyboard Navigation
```css
.ai-suggestion-accept:focus,
.ai-suggestion-modify:focus,
.ai-suggestion-reject:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}

.ai-search-suggestion:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: -2px;
}
```

## Implementation Guidelines

### 1. AI Feature Introduction
- Clearly label AI-powered features with appropriate badges
- Provide brief explanations of how AI is being used
- Offer tutorials or tooltips for new AI features
- Allow users to disable AI features easily

### 2. Performance Optimization
- Lazy load AI models and heavy dependencies
- Implement request debouncing for AI interactions
- Cache AI responses when appropriate
- Provide loading states that don't block UI

### 3. Privacy & Security
- Anonymize data sent to AI services
- Implement rate limiting for AI requests
- Provide clear data usage policies
- Allow users to delete AI-generated content

### 4. Testing AI Features
- Test with various input lengths and types
- Verify graceful degradation when AI fails
- Test accessibility of all AI interfaces
- Validate privacy and security measures

## Do's and Don'ts

### ✅ Do
- Clearly label AI-generated content
- Provide manual overrides for AI suggestions
- Implement progressive enhancement
- Test AI features with diverse user groups
- Provide clear error messages and fallbacks
- Respect user privacy and data preferences

### ❌ Don't
- Use AI as a black box without explanation
- Force AI features on users
- Block UI while AI processes
- Store sensitive data with AI services
- Use AI for critical decisions without human review
- Assume AI will always work correctly

## File Structure

- `components/ai/` - AI-specific UI components
- `services/ai/` - AI service integration
- `hooks/useAI/` - AI feature hooks
- `utils/ai/` - AI utility functions
- `types/ai.ts` - TypeScript definitions for AI features

## References

- [Material Design AI Patterns](https://m3.material.io/)
- [Google AI Principles](https://ai.google/principles/)
- [Microsoft Responsible AI](https://www.microsoft.com/en-us/ai/responsible-ai)
- [WCAG 2.1 AI Accessibility](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [EU AI Act Guidelines](https://digital-strategy.ec.europa.eu/en/policies/european-ai-act)