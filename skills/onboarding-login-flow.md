# ContentSplit Onboarding & Login Flow Guidelines

## Overview

The ContentSplit Onboarding & Login Flow Guidelines follow Google Material Design 3 principles to create seamless, secure, and accessible authentication experiences. These guidelines cover user registration, login, account recovery, and onboarding workflows.

## Authentication Design Principles

### 1. User-Centric Security
- Balance security with user convenience
- Provide clear feedback on authentication status
- Support multiple authentication methods

### 2. Progressive Disclosure
- Request minimal information initially
- Guide users through complex processes step-by-step
- Provide help and explanations when needed

### 3. Consistent Experience
- Maintain consistent patterns across authentication flows
- Use familiar authentication metaphors
- Provide clear navigation between flows

## Login Flow

### Login Screen
```css
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background-color: var(--sys-color-primary-100);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 28px; /* Material Design 3 extra-large shape */
  padding: 40px 32px;
  box-shadow: var(--sys-elevation-1);
}

.login-title {
  font-family: var(--sys-typography-title-large-font-family);
  font-size: var(--sys-typography-title-large-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  text-align: center;
  margin-bottom: 8px;
}

.login-subtitle {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  text-align: center;
  margin-bottom: 32px;
  line-height: var(--sys-typography-body-text-line-height);
}
```

### Login Form
```css
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-input {
  background-color: var(--sys-color-primary-100);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 12px;
  padding: 16px 12px 4px 12px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  width: 100%;
}

.login-input:focus {
  border-color: var(--sys-color-roles-primary-color-role-primary-role);
  outline: none;
  box-shadow: 0 0 0 2px var(--sys-color-primary-90);
}

.login-label {
  position: absolute;
  left: 12px;
  top: 16px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  transition: all 0.2s ease;
  pointer-events: none;
}

.login-label.floating {
  top: 4px;
  font-size: 12px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Login Actions
```css
.login-primary-action {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
  width: 100%;
  margin-top: 8px;
}

.login-secondary-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.login-link {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-roles-primary-color-role-primary-role);
  text-decoration: none;
  cursor: pointer;
}

.login-link:hover {
  text-decoration: underline;
}

.login-divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: var(--sys-color-neutral-60);
}

.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--sys-color-neutral-90);
}

.login-divider-text {
  padding: 0 16px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
}
```

## Registration Flow

### Registration Steps
```css
.registration-stepper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;
}

.registration-stepper::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--sys-color-neutral-90);
  z-index: 0;
}

.registration-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--sys-color-neutral-90);
  color: var(--sys-color-primary-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  margin-bottom: 8px;
}

.step-indicator.active {
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
}

.step-indicator.completed {
  background-color: var(--sys-color-roles-success-color-role-success-color-role);
}

.step-label {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  text-align: center;
}

.step-label.active {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Registration Form
```css
.registration-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.registration-field-full {
  grid-column: 1 / -1;
}

.registration-terms {
  grid-column: 1 / -1;
  margin-top: 16px;
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.terms-text {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  line-height: var(--sys-typography-body-small-text-line-height);
}

.terms-link {
  color: var(--sys-color-roles-primary-color-role-primary-role);
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}
```

## Password Recovery

### Forgot Password Flow
```css
.recovery-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: 28px;
  padding: 40px 32px;
  box-shadow: var(--sys-elevation-1);
}

.recovery-icon {
  width: 64px;
  height: 64px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  margin: 0 auto 24px;
  display: block;
}

.recovery-instructions {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  text-align: center;
  margin-bottom: 24px;
  line-height: var(--sys-typography-body-text-line-height);
}

.recovery-email-sent {
  background-color: var(--sys-color-roles-success-color-role-success-container-role);
  color: var(--sys-color-roles-success-color-role-on-success-container-role);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.recovery-email-icon {
  color: var(--sys-color-roles-success-color-role-success-color-role);
  flex-shrink: 0;
}
```

### Reset Password Form
```css
.reset-password-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.password-strength {
  height: 4px;
  background-color: var(--sys-color-neutral-90);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.password-strength-fill {
  height: 100%;
  transition: width 0.3s ease;
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

.password-requirements {
  margin-top: 8px;
}

.password-requirement {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: 4px;
}

.password-requirement.met {
  color: var(--sys-color-roles-success-color-role-success-color-role);
}
```

## Social Authentication

### Social Login Buttons
```css
.social-auth-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: var(--sys-color-primary-100);
  border: 1px solid var(--sys-color-neutral-90);
  border-radius: 12px;
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-button:hover {
  background-color: var(--sys-color-neutral-95);
  border-color: var(--sys-color-neutral-80);
}

.social-button-google {
  color: #4285F4;
}

.social-button-github {
  color: #24292e;
}

.social-button-apple {
  color: #000000;
}

.social-icon {
  width: 20px;
  height: 20px;
}
```

## Onboarding Experience

### Welcome Screen
```css
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(
    135deg,
    var(--sys-color-primary-98) 0%,
    var(--sys-color-primary-100) 100%
  );
}

.welcome-hero {
  max-width: 480px;
  text-align: center;
  margin-bottom: 48px;
}

.welcome-title {
  font-family: var(--sys-typography-display-small-font-family);
  font-size: var(--sys-typography-display-small-font-size);
  color: var(--sys-color-primary-10);
  margin-bottom: 16px;
  line-height: var(--sys-typography-display-small-line-height);
}

.welcome-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  line-height: var(--sys-typography-body-text-line-height);
}
```

### Feature Highlights
```css
.feature-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
  max-width: 960px;
}

.feature-card {
  background-color: var(--sys-color-primary-100);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--sys-elevation-1);
  text-align: center;
}

.feature-icon {
  width: 48px;
  height: 48px;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  margin: 0 auto 16px;
}

.feature-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  color: var(--sys-color-primary-10);
  margin-bottom: 8px;
}

.feature-description {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  line-height: var(--sys-typography-body-small-text-line-height);
}
```

## Error States

### Authentication Errors
```css
.auth-error {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.auth-error-icon {
  color: var(--sys-color-roles-error-color-role-error-role);
  flex-shrink: 0;
}

.auth-error-title {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  font-weight: var(--sys-typography-body-text-font-weight);
  margin-bottom: 4px;
}

.auth-error-description {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
}
```

### Validation Errors
```css
.validation-error {
  border-color: var(--sys-color-roles-error-color-role-error-role) !important;
}

.validation-message {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-roles-error-color-role-error-role);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

## Success States

### Registration Success
```css
.registration-success {
  background-color: var(--sys-color-roles-success-color-role-success-container-role);
  color: var(--sys-color-roles-success-color-role-on-success-container-role);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.success-icon {
  width: 64px;
  height: 64px;
  color: var(--sys-color-roles-success-color-role-success-color-role);
  margin: 0 auto 16px;
}

.success-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  color: var(--sys-color-roles-success-color-role-on-success-container-role);
  margin-bottom: 8px;
}

.success-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  margin-bottom: 24px;
  line-height: var(--sys-typography-body-text-line-height);
}
```

## Accessibility Considerations

### Screen Reader Support
```javascript
// Announce authentication state changes
const announceAuthState = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
};

// Usage
announceAuthState('Login successful. Redirecting to dashboard.');
```

### Keyboard Navigation
```css
.login-input:focus,
.social-button:focus,
.login-primary-action:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

## Implementation Guidelines

### 1. Login Flow
1. Display login form with email/username and password
2. Validate credentials client-side
3. Show loading state during authentication
4. Handle success (redirect) or error (show message)
5. Offer password recovery option

### 2. Registration Flow
1. Collect minimal required information
2. Validate each field in real-time
3. Show password strength indicator
4. Require terms acceptance
5. Send verification email
6. Confirm registration success

### 3. Password Recovery
1. Request email address
2. Send recovery email with unique token
3. Verify token validity
4. Allow password reset with confirmation
5. Confirm reset success

## Testing Authentication Flows

### User Testing Scenarios
- Successful login with correct credentials
- Failed login with incorrect credentials
- Registration with valid/invalid data
- Password recovery process
- Social authentication

### Security Testing
- Rate limiting for failed attempts
- Password strength enforcement
- Token expiration validation
- Secure session management

## File Structure

- `components/auth/` - Authentication components
- `pages/login/` - Login page and related pages
- `pages/register/` - Registration page
- `pages/recover/` - Password recovery pages
- `utils/auth/` - Authentication utilities

## References

- [Material Design Authentication Patterns](https://m3.material.io/components/text-fields)
- [OWASP Authentication Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [WCAG 2.1 Authentication Requirements](https://www.w3.org/WAI/WCAG21/Understanding/authentication.html)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)