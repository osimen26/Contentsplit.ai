# ContentSplit Form Field Guidelines

## Overview

The ContentSplit Form Field Guidelines provide comprehensive standards for designing and implementing form fields following Google Material Design 3 principles. These guidelines cover field types, layouts, validation, accessibility, and interactive states for optimal user experience.

## Form Field Anatomy

### Complete Field Structure
```css
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  position: relative;
}

.field-container {
  position: relative;
  background-color: var(--sys-color-primary-100);
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid var(--sys-color-neutral-60);
  transition: border-color 0.2s ease;
}

.field-container.focused {
  border-bottom: 2px solid var(--sys-color-roles-primary-color-role-primary-role);
  padding-bottom: 0; /* Adjust for thicker border */
}

.field-container.error {
  border-bottom-color: var(--sys-color-roles-error-color-role-error-role);
}

.field-input {
  width: 100%;
  padding: 16px 12px 4px 12px;
  background: transparent;
  border: none;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  outline: none;
}

.field-label {
  position: absolute;
  left: 12px;
  top: 16px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  transform-origin: left top;
}

.field-label.floating {
  top: 4px;
  font-size: 12px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  transform: translateY(-50%) scale(0.75);
}

.field-helper-text {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-top: 4px;
  padding: 0 12px;
}

.field-error-text {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-roles-error-color-role-error-role);
  margin-top: 4px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

## Field Types

### Text Input
```css
.text-input {
  /* Base styles from field-input */
}

.text-input::placeholder {
  color: var(--sys-color-neutral-70);
  opacity: 1;
}
```

### Text Area
```css
.textarea {
  min-height: 80px;
  resize: vertical;
  line-height: var(--sys-typography-body-text-line-height);
  padding-top: 20px; /* Adjust for label */
}

.textarea ~ .field-label {
  top: 20px;
}
```

### Select/Dropdown
```css
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23858993' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 40px;
  cursor: pointer;
}

.select:focus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23251ab2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
}
```

### Date Picker
```css
.date-picker {
  cursor: pointer;
}

.date-picker-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sys-color-neutral-60);
  pointer-events: none;
}
```

### File Upload
```css
.file-upload {
  display: none;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  border: 2px dashed var(--sys-color-neutral-80);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-upload-label:hover {
  border-color: var(--sys-color-roles-primary-color-role-primary-role);
  background-color: var(--sys-color-primary-95);
}

.file-upload-icon {
  width: 48px;
  height: 48px;
  color: var(--sys-color-neutral-60);
  margin-bottom: 16px;
}

.file-upload-label:hover .file-upload-icon {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--sys-color-neutral-95);
  border-radius: 8px;
  margin-top: 12px;
}

.file-remove {
  margin-left: auto;
  color: var(--sys-color-roles-error-color-role-error-role);
  cursor: pointer;
}
```

### Range Slider
```css
.range-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: var(--sys-color-neutral-90);
  border-radius: 2px;
  outline: none;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--sys-color-primary-100);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--sys-color-primary-100);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.range-value {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-primary-color-role-primary-role);
  text-align: center;
  margin-top: 8px;
}
```

## Field States

### Default State
```css
.field-container {
  border-bottom-color: var(--sys-color-neutral-60);
}

.field-label {
  color: var(--sys-color-neutral-60);
}
```

### Hover State
```css
.field-container:hover:not(.focused):not(.error) {
  border-bottom-color: var(--sys-color-neutral-40);
}

.field-container:hover .field-label {
  color: var(--sys-color-neutral-40);
}
```

### Focus State
```css
.field-container.focused {
  border-bottom-color: var(--sys-color-roles-primary-color-role-primary-role);
}

.field-container.focused .field-label {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Error State
```css
.field-container.error {
  border-bottom-color: var(--sys-color-roles-error-color-role-error-role);
}

.field-container.error .field-label {
  color: var(--sys-color-roles-error-color-role-error-role);
}

.field-container.error .field-input {
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Disabled State
```css
.field-container.disabled {
  border-bottom-color: var(--sys-color-neutral-80);
  background-color: var(--sys-color-roles-disable-state);
  opacity: 0.6;
  cursor: not-allowed;
}

.field-container.disabled .field-input {
  color: var(--sys-color-neutral-60);
  cursor: not-allowed;
}

.field-container.disabled .field-label {
  color: var(--sys-color-neutral-60);
}
```

### Readonly State
```css
.field-container.readonly {
  border-bottom-style: dotted;
}

.field-container.readonly .field-input {
  color: var(--sys-color-neutral-60);
}
```

## Validation Patterns

### Real-time Validation
```javascript
const validateField = (field, value) => {
  const errors = [];
  
  switch (field.type) {
    case 'email':
      if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Please enter a valid email address');
      }
      break;
      
    case 'password':
      if (value.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      if (!value.match(/[A-Z]/)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!value.match(/[0-9]/)) {
        errors.push('Password must contain at least one number');
      }
      break;
      
    case 'url':
      try {
        new URL(value);
      } catch {
        errors.push('Please enter a valid URL');
      }
      break;
  }
  
  return errors;
};
```

### Cross-field Validation
```javascript
const validateForm = (formData) => {
  const errors = {};
  
  // Password confirmation
  if (formData.password && formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = ['Passwords do not match'];
    }
  }
  
  // Date range validation
  if (formData.startDate && formData.endDate) {
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      errors.endDate = ['End date must be after start date'];
    }
  }
  
  return errors;
};
```

### Async Validation
```javascript
const validateUsernameAvailability = async (username) => {
  try {
    const response = await fetch(`/api/validate/username?q=${username}`);
    const data = await response.json();
    return data.available ? [] : ['Username is already taken'];
  } catch (error) {
    return ['Unable to validate username'];
  }
};
```

## Accessibility Features

### Screen Reader Support
```html
<div class="form-field">
  <div class="field-container" id="email-container">
    <input
      type="email"
      id="email"
      class="field-input"
      aria-labelledby="email-label"
      aria-describedby="email-helper email-error"
      aria-invalid="false"
      aria-required="true"
    />
    <label id="email-label" class="field-label" for="email">
      Email Address
    </label>
  </div>
  <div id="email-helper" class="field-helper-text">
    We'll never share your email with anyone else.
  </div>
  <div id="email-error" class="field-error-text" role="alert" aria-live="polite">
    <!-- Error messages appear here -->
  </div>
</div>
```

### Keyboard Navigation
```css
.field-input:focus,
.select:focus,
.file-upload-label:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}

.field-input:focus:not(:focus-visible) {
  outline: none;
}

.field-input:focus-visible {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

## Layout Patterns

### Single Column Form
```css
.single-column-form {
  max-width: 480px;
  margin: 0 auto;
}

.single-column-form .form-field {
  margin-bottom: 24px;
}
```

### Multi-column Form
```css
.multi-column-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.multi-column-form .form-field-full {
  grid-column: 1 / -1;
}
```

### Inline Form
```css
.inline-form {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.inline-form .form-field {
  flex: 1;
  margin-bottom: 0;
}

.inline-form .field-label.floating {
  top: 4px;
}
```

## Helper Elements

### Character Counter
```css
.character-counter {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  text-align: right;
  margin-top: 4px;
  padding: 0 12px;
}

.character-counter.warning {
  color: var(--sys-color-roles-warning-color-role-warning-role);
}

.character-counter.error {
  color: var(--sys-color-roles-error-color-role-error-role);
}
```

### Password Strength Meter
```css
.password-strength {
  height: 4px;
  background-color: var(--sys-color-neutral-90);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.password-strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.password-strength-weak {
  background-color: var(--sys-color-roles-error-color-role-error-role);
  width: 25%;
}

.password-strength-fair {
  background-color: var(--sys-color-roles-warning-color-role-warning-role);
  width: 50%;
}

.password-strength-good {
  background-color: var(--sys-color-success-60);
  width: 75%;
}

.password-strength-strong {
  background-color: var(--sys-color-roles-success-color-role-success-color-role);
  width: 100%;
}
```

### Tooltip Help
```css
.field-help {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sys-color-neutral-60);
  cursor: help;
}

.field-help-tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: var(--sys-color-primary-10);
  color: var(--sys-color-primary-100);
  padding: 8px 12px;
  border-radius: 6px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  white-space: nowrap;
  z-index: 1000;
  box-shadow: var(--sys-elevation-2);
}

.field-help-tooltip::before {
  content: '';
  position: absolute;
  bottom: 100%;
  right: 12px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent var(--sys-color-primary-10) transparent;
}
```

## Internationalization

### RTL Support
```css
[dir="rtl"] .field-label {
  left: auto;
  right: 12px;
  transform-origin: right top;
}

[dir="rtl"] .field-input {
  text-align: right;
}

[dir="rtl"] .select {
  background-position: left 12px center;
  padding-left: 40px;
  padding-right: 12px;
}

[dir="rtl"] .field-help {
  right: auto;
  left: 12px;
}
```

## Performance Optimization

### Debounced Validation
```javascript
import { debounce } from 'lodash';

const debouncedValidate = debounce((field, value) => {
  const errors = validateField(field, value);
  updateFieldErrors(field.name, errors);
}, 300);

// Usage
input.addEventListener('input', (e) => {
  debouncedValidate(field, e.target.value);
});
```

### Lazy Loading
```javascript
// Lazy load heavy validation libraries
const validateEmail = async (email) => {
  const emailValidator = await import('email-validator');
  return emailValidator.validate(email);
};
```

## Testing Guidelines

### Unit Tests
```javascript
describe('Form Field Validation', () => {
  it('validates email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });
  
  it('validates password strength', () => {
    expect(validatePassword('weak')).toBe(false);
    expect(validatePassword('StrongPass123')).toBe(true);
  });
});
```

### Integration Tests
```javascript
describe('Form Submission', () => {
  it('submits valid form data', async () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com'
      });
    });
  });
});
```

## File Structure

- `components/forms/` - Form field components
- `utils/validation/` - Validation utilities
- `hooks/useForm/` - Form state management hooks
- `types/forms.ts` - TypeScript definitions for forms

## References

- [Material Design 3 Text Fields](https://m3.material.io/components/text-fields)
- [WCAG 2.1 Forms Guidance](https://www.w3.org/WAI/WCAG21/Understanding/forms)
- [HTML Living Standard Forms](https://html.spec.whatwg.org/multipage/forms.html)
- [Form Design Patterns](https://www.smashingmagazine.com/printed-books/form-design-patterns/)