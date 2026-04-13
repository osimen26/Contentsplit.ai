# ContentSplit Validation System

## Overview

The ContentSplit Validation System follows Google Material Design 3 guidelines for form validation and error handling. Validation ensures data integrity, provides user feedback, and prevents errors before submission. The system supports real-time validation, async validation, and graceful error recovery.

## Material Design 3 Validation Principles

### Core Principles
1. **Immediate Feedback**: Validate as users type or on blur
2. **Clear Communication**: Use plain language for error messages
3. **Progressive Disclosure**: Show errors near the problematic field
4. **Preventive Design**: Guide users away from errors with constraints
5. **Accessible**: Support screen readers and keyboard navigation

## Validation Types

### 1. Real-time Validation
Validates as user types (after debounce).

**Usage:** Format validation, character limits
**Trigger:** `onChange` with debounce
**Feedback:** Inline messages, character counters

### 2. On-blur Validation
Validates when user leaves a field.

**Usage:** Required fields, format validation
**Trigger:** `onBlur`
**Feedback:** Error message below field

### 3. On-submit Validation
Validates all fields on form submission.

**Usage:** Complex validation, cross-field validation
**Trigger:** `onSubmit`
**Feedback:** Error summary + field-level errors

### 4. Async Validation
Validates against server/database.

**Usage:** Username availability, email uniqueness
**Trigger:** After user pauses typing
**Feedback:** Loading state, then success/error

### 5. Cross-field Validation
Validates relationships between fields.

**Usage:** Password confirmation, date ranges
**Trigger:** When related fields change
**Feedback:** Error on primary field or group

## Anatomy

### Field-level Validation Anatomy
```
┌─────────────────────────────────────────────┐
│  Label                                      │
│  ┌─────────────────────────────────────┐   │
│  │  Input field with error border      │   │
│  └─────────────────────────────────────┘   │
│  ✗ Error message text                      │
│  (Optional: Character counter)             │
└─────────────────────────────────────────────┘
```

### Form-level Validation Anatomy
```
┌─────────────────────────────────────────────┐
│  ⚠ Please fix the following errors:         │
│  • Email is required                         │
│  • Password must be at least 8 characters    │
│  • Passwords do not match                    │
│                                              │
│  [Individual fields with errors]             │
└─────────────────────────────────────────────┘
```

## Design Tokens

### Validation State Tokens
```css
/* Validation state colors */
--sys-validation-valid-color: var(--sys-color-roles-success-color-role-success-role);
--sys-validation-invalid-color: var(--sys-color-roles-error-color-role-error-role);
--sys-validation-warning-color: var(--sys-color-roles-warning-color-role-warning-role);
--sys-validation-info-color: var(--sys-color-roles-primary-color-role-primary-role);

/* Field states */
--sys-field-valid-border-color: var(--sys-validation-valid-color);
--sys-field-invalid-border-color: var(--sys-validation-invalid-color);
--sys-field-warning-border-color: var(--sys-validation-warning-color);
--sys-field-focus-border-color: var(--sys-color-roles-primary-color-role-primary-role);

/* Validation message styles */
--sys-validation-message-font-family: var(--sys-typography-label-small-font-family);
--sys-validation-message-font-size: var(--sys-typography-label-small-font-size);
--sys-validation-message-font-weight: var(--sys-typography-label-small-font-weight);
--sys-validation-message-line-height: var(--sys-typography-label-small-line-height);
--sys-validation-message-gap: var(--sys-spacing-xs);
```

### Error Message Tokens
```css
/* Error message specific */
--sys-error-message-color: var(--sys-validation-invalid-color);
--sys-error-message-background: var(--sys-color-roles-error-color-role-error-container-role);
--sys-error-message-border-color: var(--sys-validation-invalid-color);
--sys-error-message-padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
--sys-error-message-border-radius: var(--sys-radius-sm);
```

### Success Message Tokens
```css
/* Success message specific */
--sys-success-message-color: var(--sys-validation-valid-color);
--sys-success-message-background: var(--sys-color-roles-success-color-role-success-container-role);
--sys-success-message-border-color: var(--sys-validation-valid-color);
```

### Warning Message Tokens
```css
/* Warning message specific */
--sys-warning-message-color: var(--sys-validation-warning-color);
--sys-warning-message-background: var(--sys-color-roles-warning-color-role-warning-container-role);
--sys-warning-message-border-color: var(--sys-validation-warning-color);
```

## Validation Implementation

### Field Validation States
```css
/* Base field styles */
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--sys-spacing-xs);
  margin-bottom: var(--sys-spacing-md);
}

.form-field-label {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  color: var(--sys-color-neutral-30);
}

.form-field-input {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  border: 1px solid var(--sys-color-neutral-80);
  border-radius: var(--sys-radius-sm);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  transition: border-color 0.2s ease;
}

/* Valid state */
.form-field-valid .form-field-input {
  border-color: var(--sys-field-valid-border-color);
  border-width: 2px;
}

.form-field-valid .form-field-label {
  color: var(--sys-validation-valid-color);
}

/* Invalid state */
.form-field-invalid .form-field-input {
  border-color: var(--sys-field-invalid-border-color);
  border-width: 2px;
}

.form-field-invalid .form-field-label {
  color: var(--sys-validation-invalid-color);
}

/* Warning state */
.form-field-warning .form-field-input {
  border-color: var(--sys-field-warning-border-color);
  border-width: 2px;
}

.form-field-warning .form-field-label {
  color: var(--sys-validation-warning-color);
}

/* Focus state */
.form-field-input:focus {
  outline: none;
  border-color: var(--sys-field-focus-border-color);
  border-width: 2px;
}
```

### Validation Messages
```css
/* Validation message container */
.form-field-message {
  font-family: var(--sys-validation-message-font-family);
  font-size: var(--sys-validation-message-font-size);
  line-height: var(--sys-validation-message-line-height);
  min-height: 1em;
  display: flex;
  align-items: flex-start;
  gap: var(--sys-validation-message-gap);
}

/* Error message */
.form-field-error {
  color: var(--sys-error-message-color);
}

.form-field-error::before {
  content: "⚠";
  flex-shrink: 0;
}

/* Success message */
.form-field-success {
  color: var(--sys-success-message-color);
}

.form-field-success::before {
  content: "✓";
  flex-shrink: 0;
}

/* Warning message */
.form-field-warning-message {
  color: var(--sys-warning-message-color);
}

.form-field-warning-message::before {
  content: "⚠";
  flex-shrink: 0;
}

/* Info message */
.form-field-info {
  color: var(--sys-validation-info-color);
}

.form-field-info::before {
  content: "ℹ";
  flex-shrink: 0;
}
```

### Character Counters
```css
.form-field-counter {
  font-family: var(--sys-validation-message-font-family);
  font-size: var(--sys-validation-message-font-size);
  color: var(--sys-color-neutral-60);
  text-align: right;
  margin-top: var(--sys-spacing-xs);
}

.form-field-counter-warning {
  color: var(--sys-validation-warning-color);
}

.form-field-counter-error {
  color: var(--sys-validation-invalid-color);
}
```

### Form-level Error Summary
```css
.form-error-summary {
  background-color: var(--sys-error-message-background);
  border: 1px solid var(--sys-error-message-border-color);
  border-radius: var(--sys-error-message-border-radius);
  padding: var(--sys-error-message-padding);
  margin-bottom: var(--sys-spacing-lg);
}

.form-error-summary-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-font-weight-bold);
  color: var(--sys-error-message-color);
  margin: 0 0 var(--sys-spacing-xs) 0;
  display: flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
}

.form-error-summary-title::before {
  content: "⚠";
}

.form-error-summary-list {
  margin: 0;
  padding-left: var(--sys-spacing-lg);
}

.form-error-summary-item {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-30);
  margin-bottom: var(--sys-spacing-xs);
}

.form-error-summary-item:last-child {
  margin-bottom: 0;
}

.form-error-summary-item a {
  color: var(--sys-error-message-color);
  text-decoration: underline;
}
```

## Validation Rules & Patterns

### Required Field Validation
```javascript
// Required field validation rule
const requiredRule = {
  validate: (value) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value != null && value !== '';
  },
  message: 'This field is required',
};
```

### Email Validation
```javascript
// Email validation rule
const emailRule = {
  validate: (value) => {
    if (!value) return true; // Skip if empty (use with required rule)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message: 'Please enter a valid email address',
};
```

### Password Validation
```javascript
// Password validation rule
const passwordRule = {
  validate: (value) => {
    if (!value) return true;
    return value.length >= 8;
  },
  message: 'Password must be at least 8 characters',
};

// Password strength validation
const passwordStrengthRule = {
  validate: (value) => {
    if (!value) return true;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return hasLower && hasUpper && hasNumber && hasSpecial;
  },
  message: 'Password must include lowercase, uppercase, number, and special character',
};
```

### URL Validation
```javascript
// URL validation rule
const urlRule = {
  validate: (value) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  message: 'Please enter a valid URL',
};
```

### Number Range Validation
```javascript
// Number range validation rule
const numberRangeRule = (min, max) => ({
  validate: (value) => {
    if (!value && value !== 0) return true;
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },
  message: `Please enter a number between ${min} and ${max}`,
});
```

### Custom Pattern Validation
```javascript
// Regex pattern validation rule
const patternRule = (regex, message) => ({
  validate: (value) => {
    if (!value) return true;
    return regex.test(value);
  },
  message,
});
```

### Async Validation
```javascript
// Async validation rule (username availability)
const usernameAvailableRule = {
  validate: async (value) => {
    if (!value) return true;
    try {
      const response = await fetch(`/api/check-username?username=${encodeURIComponent(value)}`);
      const data = await response.json();
      return data.available;
    } catch {
      return false;
    }
  },
  message: 'Username is already taken',
};
```

## Validation States

### Pristine State (No interaction)
```css
.form-field-pristine .form-field-input {
  /* Default styling */
}

.form-field-pristine .form-field-message {
  display: none;
}
```

### Dirty State (User has interacted)
```css
.form-field-dirty .form-field-input {
  /* May show validation state */
}
```

### Touched State (User has focused and blurred)
```css
.form-field-touched .form-field-message {
  display: flex;
}
```

### Validating State (Async validation in progress)
```css
.form-field-validating .form-field-input {
  border-color: var(--sys-validation-info-color);
  border-style: dashed;
}

.form-field-validating .form-field-message {
  color: var(--sys-validation-info-color);
}

.form-field-validating .form-field-message::before {
  content: "⏳";
  animation: validating-spin 1s linear infinite;
}

@keyframes validating-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Valid State
```css
.form-field-valid .form-field-message {
  color: var(--sys-validation-valid-color);
}
```

### Invalid State
```css
.form-field-invalid .form-field-message {
  color: var(--sys-validation-invalid-color);
}
```

### Warning State
```css
.form-field-warning .form-field-message {
  color: var(--sys-validation-warning-color);
}
```

## Accessibility

### ARIA Attributes for Validation
```html
<!-- Field with ARIA validation attributes -->
<div class="form-field form-field-invalid" 
     aria-invalid="true"
     aria-describedby="email-error">
  <label for="email" class="form-field-label">Email</label>
  <input id="email" 
         type="email" 
         class="form-field-input"
         aria-invalid="true"
         aria-describedby="email-error">
  <div id="email-error" class="form-field-message form-field-error" role="alert">
    Please enter a valid email address
  </div>
</div>

<!-- Form error summary with ARIA -->
<div class="form-error-summary" 
     role="alert" 
     aria-labelledby="error-summary-title"
     aria-describedby="error-summary-list">
  <h3 id="error-summary-title" class="form-error-summary-title">
    Please fix the following errors:
  </h3>
  <ul id="error-summary-list" class="form-error-summary-list">
    <li class="form-error-summary-item">
      <a href="#email">Email is required</a>
    </li>
  </ul>
</div>
```

### Screen Reader Support
```css
/* Hide decorative icons from screen readers */
.form-field-message::before {
  aria-hidden: "true";
}

/* Ensure error messages are announced */
.form-field-error[role="alert"] {
  /* Live region for error announcements */
}

/* Hide validation messages when not needed */
.form-field-message:empty {
  display: none;
}
```

### Keyboard Navigation
```css
.form-field-input:focus-visible {
  outline: 3px solid var(--sys-field-focus-border-color);
  outline-offset: 2px;
}

.form-error-summary-item a:focus {
  outline: 2px solid var(--sys-field-focus-border-color);
  outline-offset: 2px;
}
```

### Focus Management
```javascript
// Example: Focus first error on form submission
function focusFirstError(form) {
  const firstError = form.querySelector('[aria-invalid="true"]');
  if (firstError) {
    firstError.focus();
  }
}
```

## Validation in AI Interfaces

### AI Content Validation
```css
/* AI content validation states */
.form-field-ai-content .form-field-input {
  font-family: var(--sys-typography-code-font-family);
  font-size: var(--sys-typography-code-font-size);
}

.form-field-ai-content-valid {
  border-left: 4px solid var(--sys-validation-valid-color);
}

.form-field-ai-content-invalid {
  border-left: 4px solid var(--sys-validation-invalid-color);
}

.form-field-ai-content-warning {
  border-left: 4px solid var(--sys-validation-warning-color);
}
```

### AI Prompt Validation
```css
/* AI prompt validation */
.form-field-ai-prompt-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--sys-spacing-xs);
}

.form-field-ai-prompt-tokens {
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  color: var(--sys-color-neutral-60);
  font-variant-numeric: tabular-nums;
}

.form-field-ai-prompt-tokens-warning {
  color: var(--sys-validation-warning-color);
}

.form-field-ai-prompt-tokens-error {
  color: var(--sys-validation-invalid-color);
}
```

### AI Response Validation
```css
/* AI response validation feedback */
.ai-response-validation {
  display: flex;
  align-items: flex-start;
  gap: var(--sys-spacing-sm);
  padding: var(--sys-spacing-md);
  border-radius: var(--sys-radius-md);
  margin-top: var(--sys-spacing-sm);
}

.ai-response-validation-error {
  background-color: var(--sys-error-message-background);
  border: 1px solid var(--sys-error-message-border-color);
}

.ai-response-validation-warning {
  background-color: var(--sys-warning-message-background);
  border: 1px solid var(--sys-warning-message-border-color);
}

.ai-response-validation-success {
  background-color: var(--sys-success-message-background);
  border: 1px solid var(--sys-success-message-border-color);
}

.ai-response-validation-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.ai-response-validation-content {
  flex: 1;
}

.ai-response-validation-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-font-weight-bold);
  margin: 0 0 var(--sys-spacing-xs) 0;
}

.ai-response-validation-message {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  margin: 0;
}
```

## Best Practices

### ✅ Do
- Validate as early as possible (real-time when feasible)
- Use clear, actionable error messages
- Place error messages close to the problematic field
- Highlight both the field and label when invalid
- Provide examples or suggestions for fixing errors
- Use positive language when possible ("Please enter" vs "Don't enter")
- Support keyboard navigation to error fields
- Announce errors to screen readers immediately
- Group related validation errors together
- Allow submission after fixing errors without losing data

### ❌ Don't
- Don't use technical jargon in error messages
- Don't validate required fields until user interacts with them
- Don't show multiple errors for the same field simultaneously
- Don't use red for non-error states
- Don't hide error messages on focus (keep until fixed)
- Don't rely solely on color to indicate errors
- Don't validate on every keystroke (use debouncing)
- Don't block paste operations for format validation
- Don't forget to validate on blur for required fields
- Don't use generic error messages like "Invalid input"

## Responsive Validation

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .form-error-summary {
    margin: var(--sys-spacing-md) 0;
    padding: var(--sys-spacing-sm);
  }
  
  .form-error-summary-list {
    padding-left: var(--sys-spacing-md);
  }
  
  .form-field-message {
    font-size: calc(var(--sys-validation-message-font-size) * 0.9);
  }
  
  .form-field-counter {
    font-size: calc(var(--sys-validation-message-font-size) * 0.9);
  }
}
```

### Tablet (768px–1024px)
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .form-error-summary {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
```

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .form-error-summary {
    max-width: 600px;
  }
}
```

## File Structure

### Related Files
- `skills/errorusage.md` - For error handling patterns
- `skills/input.md` - For input field styling
- `skills/form-field.md` - For form field components
- `design-tokens-ultimate.css` - Design tokens for validation styling
- `skills/color.md` - Color tokens reference

### Validation Component Files
- `components/Form/` - Form and validation components
  - `FormField.tsx` - Form field with validation
  - `ValidationMessage.tsx` - Validation message component
  - `ErrorSummary.tsx` - Form error summary component
  - `Form.css` - Form validation styles
  - `Form.stories.tsx` - Storybook stories
  - `Form.test.tsx` - Component tests
- `hooks/` - Validation hooks
  - `useValidation.ts` - Hook for field validation
  - `useFormValidation.ts` - Hook for form-level validation
- `utils/` - Validation utilities
  - `validationRules.ts` - Predefined validation rules
  - `validationSchemas.ts` - Validation schemas (Zod, Yup)
  - `validationHelpers.ts` - Validation helper functions

### Module Organization
```bash
src/
├── components/
│   └── Form/
│       ├── index.ts
│       ├── FormField.tsx
│       ├── ValidationMessage.tsx
│       ├── ErrorSummary.tsx
│       ├── Form.css
│       ├── Form.stories.tsx
│       └── Form.test.tsx
├── hooks/
│   ├── useValidation.ts
│   └── useFormValidation.ts
└── utils/
    ├── validationRules.ts
    ├── validationSchemas.ts
    └── validationHelpers.ts
```

## Integration Patterns

### React Hook Form Integration
```javascript
// Example: useValidation hook
import { useState, useEffect } from 'react';

export function useValidation(value, rules = []) {
  const [errors, setErrors] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  
  useEffect(() => {
    const validate = async () => {
      setIsValidating(true);
      
      const validationResults = await Promise.all(
        rules.map(async (rule) => {
          const isValid = await rule.validate(value);
          return isValid ? null : rule.message;
        })
      );
      
      const newErrors = validationResults.filter(Boolean);
      setErrors(newErrors);
      setIsValidating(false);
    };
    
    validate();
  }, [value, rules]);
  
  return {
    errors,
    isValid: errors.length === 0,
    isValidating,
  };
}
```

### Zod Schema Validation
```javascript
// Example: Zod schema for AI content generation
import { z } from 'zod';

const aiContentSchema = z.object({
  prompt: z.string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(1000, 'Prompt must be less than 1000 characters'),
  tone: z.enum(['professional', 'casual', 'creative'], {
    errorMap: () => ({ message: 'Please select a valid tone' })
  }),
  length: z.number()
    .min(100, 'Content must be at least 100 words')
    .max(2000, 'Content must be less than 2000 words'),
  audience: z.string()
    .min(1, 'Please specify your target audience'),
});

// Usage
try {
  const validatedData = aiContentSchema.parse(formData);
  // Proceed with AI generation
} catch (error) {
  // Handle validation errors
  console.error(error.errors);
}
```

### AI Content Validation Integration
```javascript
// Example: AI content validation
async function validateAIContent(content, options) {
  const validations = [];
  
  // Check for inappropriate content
  if (options.safetyCheck) {
    const isSafe = await safetyService.checkContent(content);
    if (!isSafe) {
      validations.push({
        type: 'error',
        message: 'Content violates safety guidelines',
        field: 'content',
      });
    }
  }
  
  // Check for plagiarism
  if (options.plagiarismCheck) {
    const isOriginal = await plagiarismService.checkOriginality(content);
    if (!isOriginal) {
      validations.push({
        type: 'warning',
        message: 'Content may contain plagiarized material',
        field: 'content',
      });
    }
  }
  
  // Check readability
  if (options.readabilityCheck) {
    const readabilityScore = await readabilityService.calculateScore(content);
    if (readabilityScore < options.minReadabilityScore) {
      validations.push({
        type: 'warning',
        message: `Content may be difficult to read (score: ${readabilityScore})`,
        field: 'content',
      });
    }
  }
  
  return validations;
}
```

### Form Validation with AI Assistance
```javascript
// Example: Form validation with AI suggestions
async function validateFormWithAI(formData) {
  const errors = [];
  const suggestions = [];
  
  // Traditional validation
  if (!formData.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  }
  
  // AI-powered suggestions
  if (formData.content) {
    const aiSuggestions = await aiService.suggestImprovements(formData.content);
    suggestions.push(...aiSuggestions.map(suggestion => ({
      field: 'content',
      type: 'suggestion',
      message: suggestion,
    })));
  }
  
  return { errors, suggestions };
}
```

---

*This validation system ensures consistent, accessible, and user-friendly validation across ContentSplit. All validation should follow Material Design 3 guidelines and use the design token system for styling. Coordinate with error handling systems for critical errors and loading states for async validation.*