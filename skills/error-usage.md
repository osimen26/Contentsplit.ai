# ContentSplit Error Handling System

## Overview

The ContentSplit Error Handling System provides consistent patterns for handling errors across the application. Following Material Design 3 principles, errors should be communicated clearly, constructively, and accessibly to users while providing developers with robust error management tools.

## Error Classification

### 1. User-Facing Errors
Errors that require user attention or action.

| Error Type | Severity | User Action Required | Example |
|------------|----------|---------------------|---------|
| **Validation Errors** | Low | Immediate correction | Invalid email format, required field missing |
| **Authentication Errors** | Medium | Re-authentication | Invalid credentials, session expired |
| **Authorization Errors** | High | Permission request | Insufficient permissions, access denied |
| **System Errors** | Critical | Technical support | Server unavailable, database error |
| **Network Errors** | Medium | Retry or check connection | Connection timeout, offline mode |
| **Data Errors** | Medium | Data correction | Invalid data format, duplicate entry |

### 2. Developer/System Errors
Errors for logging and debugging, not shown to users.

| Error Type | Log Level | Action Required |
|------------|-----------|-----------------|
| **Runtime Errors** | ERROR | Fix code logic |
| **API Errors** | WARN | Check integration |
| **Performance Errors** | INFO | Optimize code |
| **Deprecation Warnings** | WARN | Update implementation |

## Error Design Tokens

### Color Tokens for Errors
```css
/* Error color palette */
--sys-color-error-0: #000000ff;      /* Pure black */
--sys-color-error-10: #2e0505ff;     /* Deep crimson */
--sys-color-error-30: #8a0f0fff;     /* Strong red (text on error container) */
--sys-color-error-40: #b81414ff;     /* Deep error red */
--sys-color-error-60: #eb4747ff;     /* Key error (primary error color) */
--sys-color-error-90: #fad1d1ff;     /* Light red tint (error container) */
--sys-color-error-100: #ffffffff;    /* White */

/* Error semantic roles */
--sys-color-roles-error-color-role-error-role: var(--sys-color-error);          /* #eb4747 */
--sys-color-roles-error-color-role-on-error-color-role: var(--sys-color-accent-100); /* #ffffff */
--sys-color-roles-error-color-role-error-container-role: var(--sys-color-error-90); /* #fad1d1 */
--sys-color-roles-error-color-role-on-error-container-role: var(--sys-color-error-30); /* #8a0f0f */
```

### Typography Tokens for Error Messages
```css
/* Error message typography */
--sys-typography-body-small-text-font-family: var(--sys-font-body-small-text-regular-fontfamily);
--sys-typography-body-small-text-font-size: var(--sys-font-body-small-text-regular-fontsize);
--sys-typography-body-small-text-fontweight: var(--sys-font-body-small-text-regular-fontweight);
--sys-typography-body-small-text-lineheight: var(--sys-font-body-small-text-regular-lineheight);
```

## Error UI Components

### 1. Error Messages (Inline)
Displayed near the field or element causing the error.

```css
/* Inline error message */
.error-message {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-roles-error-color-role-error-role);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.error-message::before {
  content: "⚠";
  font-size: calc(var(--sys-typography-body-small-text-font-size) * 1.2);
}
```

```html
<div class="field-container error">
  <label for="email" class="field-label">Email Address</label>
  <input type="email" id="email" class="field-input" aria-describedby="email-error" aria-invalid="true">
  <div id="email-error" class="error-message" role="alert" aria-live="polite">
    Please enter a valid email address
  </div>
</div>
```

### 2. Error Banners (Global)
Displayed at the top of the page or section for system-wide errors.

```css
/* Error banner */
.error-banner {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  border-left: 4px solid var(--sys-color-roles-error-color-role-error-role);
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.error-banner-icon {
  color: var(--sys-color-roles-error-color-role-error-role);
  font-size: 20px;
  flex-shrink: 0;
}

.error-banner-content {
  flex: 1;
}

.error-banner-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-fontweight);
  margin: 0 0 4px 0;
}

.error-banner-description {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  margin: 0;
}

.error-banner-action {
  margin-top: 8px;
}
```

### 3. Error States for Inputs
Visual indication of field errors.

```css
/* Input error states */
.input-error {
  border-color: var(--sys-color-roles-error-color-role-error-role) !important;
}

.input-error-label {
  color: var(--sys-color-roles-error-color-role-error-role) !important;
}

.input-error:focus {
  border-color: var(--sys-color-roles-error-color-role-error-role) !important;
  box-shadow: 0 0 0 2px rgba(235, 71, 71, 0.2) !important;
}
```

### 4. Error Toast Notifications
Temporary notifications for non-critical errors.

```css
/* Error toast */
.error-toast {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  border-left: 4px solid var(--sys-color-roles-error-color-role-error-role);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: var(--sys-elevation-2);
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## Error Messaging Guidelines

### 1. Writing Error Messages
**DO:**
- Be specific about what went wrong
- Suggest how to fix the issue
- Use clear, simple language
- Maintain a helpful tone
- Use the active voice

**DON'T:**
- Use technical jargon
- Blame the user
- Be vague or generic
- Use ALL CAPS or excessive punctuation
- Make assumptions about user knowledge

### 2. Error Message Templates
```javascript
// Validation errors
const validationErrors = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  passwordLength: 'Password must be at least 8 characters',
  passwordComplexity: 'Password must include uppercase, lowercase, and numbers',
  url: 'Please enter a valid URL',
  phone: 'Please enter a valid phone number',
  dateRange: 'End date must be after start date',
  fileSize: 'File size must be less than 10MB',
  fileType: 'File type not supported. Please upload PDF, JPG, or PNG'
};

// System errors
const systemErrors = {
  network: 'Connection lost. Please check your internet connection and try again.',
  server: 'Server temporarily unavailable. Please try again in a few minutes.',
  timeout: 'Request timed out. Please try again.',
  unauthorized: 'Session expired. Please log in again.',
  forbidden: 'You don\'t have permission to perform this action.',
  notFound: 'The requested resource was not found.',
  conflict: 'This action conflicts with existing data.',
  validation: 'Please check the form for errors and try again.'
};
```

### 3. Error Message Localization
```javascript
// Error message structure for localization
const errorMessages = {
  en: {
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address'
    },
    system: {
      network: 'Connection lost. Please check your internet connection.'
    }
  },
  es: {
    validation: {
      required: 'Este campo es obligatorio',
      email: 'Por favor, introduce una dirección de correo válida'
    },
    system: {
      network: 'Conexión perdida. Por favor, verifica tu conexión a internet.'
    }
  }
};
```

## Technical Error Handling

### 1. JavaScript Error Handling Patterns
```javascript
/**
 * Global error handler for uncaught exceptions
 */
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  
  // Log to error tracking service
  logError({
    type: 'uncaught',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.toString(),
    stack: event.error?.stack
  });
  
  // Prevent default browser error handling
  event.preventDefault();
});

/**
 * Promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  logError({
    type: 'promise',
    reason: event.reason?.toString(),
    promise: event.promise
  });
  
  event.preventDefault();
});

/**
 * API error handling utility
 */
async function handleApiCall(apiFunction, options = {}) {
  try {
    const result = await apiFunction();
    return { success: true, data: result };
  } catch (error) {
    console.error('API call failed:', error);
    
    // Categorize error
    const errorType = categorizeApiError(error);
    
    // Log error
    logError({
      type: 'api',
      endpoint: options.endpoint,
      method: options.method,
      errorType,
      statusCode: error.response?.status,
      message: error.message
    });
    
    // Show user-friendly message
    if (options.showToast !== false) {
      showErrorToast(getUserFriendlyMessage(errorType));
    }
    
    return { 
      success: false, 
      error: errorType,
      message: getUserFriendlyMessage(errorType),
      originalError: options.debug ? error : undefined
    };
  }
}

/**
 * Error categorization
 */
function categorizeApiError(error) {
  if (!error.response) {
    return 'network'; // No response from server
  }
  
  const status = error.response.status;
  
  switch (status) {
    case 400: return 'validation';
    case 401: return 'unauthorized';
    case 403: return 'forbidden';
    case 404: return 'notFound';
    case 409: return 'conflict';
    case 422: return 'validation'; // Unprocessable entity
    case 429: return 'rateLimit';
    case 500: case 502: case 503: case 504: return 'server';
    default: return 'unknown';
  }
}
```

### 2. Form Validation Error Handling
```javascript
/**
 * Form validation utility
 */
class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.errors = new Map();
    this.setupValidation();
  }
  
  setupValidation() {
    // Add real-time validation
    this.form.addEventListener('input', (event) => {
      this.validateField(event.target);
    });
    
    // Add form submission validation
    this.form.addEventListener('submit', (event) => {
      if (!this.validateForm()) {
        event.preventDefault();
        this.showAllErrors();
      }
    });
  }
  
  validateField(field) {
    const errors = this.getFieldErrors(field);
    
    if (errors.length === 0) {
      this.clearFieldError(field);
      return true;
    } else {
      this.showFieldError(field, errors[0]);
      return false;
    }
  }
  
  validateForm() {
    let isValid = true;
    const fields = this.form.querySelectorAll('[data-validate]');
    
    this.errors.clear();
    
    fields.forEach(field => {
      const errors = this.getFieldErrors(field);
      
      if (errors.length > 0) {
        this.errors.set(field.name || field.id, errors);
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  getFieldErrors(field) {
    const errors = [];
    const value = field.value.trim();
    const rules = field.dataset.validate?.split(' ') || [];
    
    rules.forEach(rule => {
      switch (rule) {
        case 'required':
          if (!value) errors.push('This field is required');
          break;
        case 'email':
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.push('Please enter a valid email address');
          }
          break;
        case 'password':
          if (value && value.length < 8) {
            errors.push('Password must be at least 8 characters');
          }
          break;
        // Add more validation rules as needed
      }
    });
    
    return errors;
  }
  
  showFieldError(field, message) {
    // Remove existing error
    this.clearFieldError(field);
    
    // Add error class
    field.classList.add('input-error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.id = `${field.id || field.name}-error`;
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Update aria attributes
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id);
  }
  
  clearFieldError(field) {
    field.classList.remove('input-error');
    field.removeAttribute('aria-invalid');
    
    const errorId = field.getAttribute('aria-describedby');
    if (errorId) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) errorElement.remove();
      field.removeAttribute('aria-describedby');
    }
  }
  
  showAllErrors() {
    this.errors.forEach((errors, fieldName) => {
      const field = this.form.querySelector(`[name="${fieldName}"]`) || 
                    document.getElementById(fieldName);
      if (field && errors.length > 0) {
        this.showFieldError(field, errors[0]);
      }
    });
    
    // Focus first error field
    const firstErrorField = this.form.querySelector('.input-error');
    if (firstErrorField) {
      firstErrorField.focus();
    }
  }
}
```

### 3. Error Logging and Monitoring
```javascript
/**
 * Error logging service
 */
class ErrorLogger {
  constructor(config = {}) {
    this.endpoint = config.endpoint || '/api/logs/errors';
    this.environment = config.environment || 'development';
    this.appVersion = config.appVersion || '1.0.0';
    this.userId = config.userId || null;
    this.enabled = config.enabled !== false;
  }
  
  logError(errorData) {
    if (!this.enabled) return;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      appVersion: this.appVersion,
      userId: this.userId,
      ...errorData
    };
    
    // Send to server
    this.sendToServer(logEntry).catch(() => {
      // Fallback to localStorage if server fails
      this.saveToLocalStorage(logEntry);
    });
    
    // Console in development
    if (this.environment === 'development') {
      console.error('Logged error:', logEntry);
    }
  }
  
  async sendToServer(logEntry) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logEntry)
    });
    
    if (!response.ok) {
      throw new Error('Failed to send error log');
    }
  }
  
  saveToLocalStorage(logEntry) {
    try {
      const logs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      logs.push(logEntry);
      
      // Keep only last 100 logs
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('errorLogs', JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to save error to localStorage:', error);
    }
  }
  
  getStoredErrors() {
    try {
      return JSON.parse(localStorage.getItem('errorLogs') || '[]');
    } catch (error) {
      console.error('Failed to get stored errors:', error);
      return [];
    }
  }
  
  clearStoredErrors() {
    localStorage.removeItem('errorLogs');
  }
}

// Initialize error logger
const errorLogger = new ErrorLogger({
  environment: process.env.NODE_ENV,
  appVersion: process.env.APP_VERSION,
  endpoint: process.env.ERROR_LOGGING_ENDPOINT
});
```

## Accessibility Considerations

### 1. ARIA Attributes for Errors
```html
<!-- Field with error -->
<div class="field-container">
  <label for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    aria-invalid="true"
    aria-describedby="email-error"
    aria-required="true"
  >
  <div id="email-error" class="error-message" role="alert" aria-live="polite">
    Please enter a valid email address
  </div>
</div>
```

### 2. Screen Reader Considerations
- Use `role="alert"` for important error messages
- Use `aria-live="polite"` for non-critical errors
- Use `aria-live="assertive"` for critical errors requiring immediate attention
- Ensure error messages are announced when they appear
- Provide error summaries for complex forms

### 3. Keyboard Navigation
- Focus should move to the first error when form submission fails
- Users should be able to navigate between errors using keyboard
- Error messages should be accessible via keyboard (tab order)

## Testing Error Handling

### 1. Unit Tests for Error Utilities
```javascript
describe('Error Handling Utilities', () => {
  test('categorizeApiError returns correct error type', () => {
    expect(categorizeApiError({ response: { status: 400 } })).toBe('validation');
    expect(categorizeApiError({ response: { status: 401 } })).toBe('unauthorized');
    expect(categorizeApiError({ response: { status: 500 } })).toBe('server');
    expect(categorizeApiError({})).toBe('network');
  });
  
  test('FormValidator shows errors correctly', () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'test';
    input.dataset.validate = 'required';
    form.appendChild(input);
    
    const validator = new FormValidator(form);
    validator.validateField(input);
    
    expect(input.classList.contains('input-error')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});
```

### 2. Integration Tests for Error Flows
```javascript
describe('Error Flow Integration', () => {
  test('API error shows user-friendly message', async () => {
    // Mock failed API call
    const mockApi = jest.fn().mockRejectedValue({ response: { status: 500 } });
    
    const result = await handleApiCall(mockApi, { showToast: false });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('server');
    expect(result.message).toBe('Server temporarily unavailable. Please try again in a few minutes.');
  });
  
  test('Network error triggers offline mode', async () => {
    // Mock network failure
    const mockApi = jest.fn().mockRejectedValue({});
    
    const result = await handleApiCall(mockApi);
    
    expect(result.error).toBe('network');
    expect(result.message).toContain('internet connection');
  });
});
```

### 3. Visual Regression Tests
- Test error states match design specifications
- Test error messages are readable with sufficient contrast
- Test error UI works in different screen sizes
- Test error states in both light and dark modes

## Performance Considerations

### 1. Error Message Optimization
- Bundle error messages for localization
- Lazy load error handling code
- Minimize error logging impact on performance
- Implement error rate limiting

### 2. Error UI Performance
- Use CSS transitions for error state changes
- Debounce real-time validation
- Virtualize error lists in large forms
- Cache error messages for reuse

### 3. Monitoring Performance Impact
- Track error handling execution time
- Monitor error logging network usage
- Alert on excessive error rates
- Implement circuit breakers for failing services

## Implementation Checklist

### For Developers
- [ ] Use design tokens for all error UI components
- [ ] Implement proper error categorization
- [ ] Add accessibility attributes to error elements
- [ ] Write user-friendly error messages
- [ ] Log errors appropriately (development/production)
- [ ] Test error states and flows
- [ ] Handle edge cases and unexpected errors
- [ ] Implement error recovery where possible

### For Designers
- [ ] Design error states for all components
- [ ] Ensure error colors meet contrast requirements
- [ ] Provide error iconography
- [ ] Design error message layouts
- [ ] Create error flow diagrams
- [ ] Test error states with real content

### For Product Managers
- [ ] Define error severity levels
- [ ] Specify user actions for each error type
- [ ] Plan error message localization
- [ ] Establish error monitoring requirements
- [ ] Define error recovery strategies
- [ ] Set error rate alerts and thresholds

## File Structure

### Related Files
- `design-tokens-ultimate.css` - Design tokens for error colors and styling
- `skills/color.md` - Color tokens reference (error palette)
- `skills/notification.md` - Notification system for error banners
- `skills/toast.md` - Toast system for transient errors
- `skills/validation.md` - Validation patterns
- `component-specification.md` - Component specifications

### Error Component Files
- `components/error/` - Error component implementations
  - `ErrorBanner.tsx` - Persistent error banners
  - `ErrorMessage.tsx` - Inline error messages
  - `ErrorBoundary.tsx` - React error boundary
  - `ErrorFallback.tsx` - Error fallback UI

---

*This error handling system ensures consistent, accessible, and user-friendly error experiences across ContentSplit. All team members should follow these patterns when implementing error handling in the application.*