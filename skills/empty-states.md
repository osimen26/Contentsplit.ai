# ContentSplit Empty States System

## Overview

The ContentSplit Empty States System follows Google Material Design 3 guidelines for empty states (also called "zero states" or "empty views"). Empty states provide meaningful feedback when no content is available, guiding users toward next actions and reducing frustration.

## Empty State Anatomy (Material Design 3)

### Core Components
1. **Illustration/Icon** - Visual element indicating the empty state
2. **Title** - Clear description of why the state is empty
3. **Description** - Additional context or explanation
4. **Primary Action** - Main button to resolve the empty state
5. **Secondary Action** - Alternative actions (optional)
6. **Container** - Surface holding the empty state content

### Empty State Types

#### 1. First Use Empty State (`empty-first-use`)
Displayed when a user first accesses a feature with no data.

**Usage:** New user onboarding, initial feature access
**Illustration:** Welcoming, simple illustration
**Tone:** Encouraging, helpful

```css
.empty-first-use {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-3xl);
  max-width: 600px;
  margin: 0 auto;
}

.empty-first-use-illustration {
  width: 200px;
  height: 200px;
  margin-bottom: var(--sys-spacing-xl);
  color: var(--sys-color-neutral-80);
}

.empty-first-use-title {
  font-family: var(--sys-typography-headline-small-font-family);
  font-size: var(--sys-typography-headline-small-font-size);
  font-weight: var(--sys-typography-headline-small-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-md);
  line-height: var(--sys-typography-headline-small-line-height);
}

.empty-first-use-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-xl);
  line-height: var(--sys-typography-body-text-line-height);
  max-width: 400px;
}
```

#### 2. No Results Empty State (`empty-no-results`)
Displayed when a search or filter returns no results.

**Usage:** Search results, filtered views, data queries
**Illustration:** Magnifying glass or search-related icon
**Tone:** Helpful, suggestive

```css
.empty-no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-2xl);
}

.empty-no-results-icon {
  width: 120px;
  height: 120px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-neutral-70);
  opacity: 0.8;
}

.empty-no-results-title {
  font-family: var(--sys-typography-title-large-font-family);
  font-size: var(--sys-typography-title-large-font-size);
  font-weight: var(--sys-typography-title-large-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-sm);
  line-height: var(--sys-typography-title-large-line-height);
}

.empty-no-results-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-lg);
  line-height: var(--sys-typography-body-text-line-height);
}
```

#### 3. No Data Empty State (`empty-no-data`)
Displayed when a dataset is empty but can be populated.

**Usage:** Empty lists, tables, collections
**Illustration:** Empty box or document icon
**Tone:** Action-oriented, inviting

```css
.empty-no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-2xl);
  border: 2px dashed var(--sys-color-neutral-90);
  border-radius: var(--sys-radius-lg);
  background-color: var(--sys-color-neutral-98);
}

.empty-no-data-icon {
  width: 100px;
  height: 100px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-neutral-70);
}

.empty-no-data-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  font-weight: var(--sys-typography-title-medium-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-xs);
  line-height: var(--sys-typography-title-medium-line-height);
}

.empty-no-data-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-lg);
  line-height: var(--sys-typography-body-text-line-height);
}
```

#### 4. Error Empty State (`empty-error`)
Displayed when an error prevents content from loading.

**Usage:** Failed data fetches, network errors, permission issues
**Illustration:** Error or warning icon
**Tone:** Informative, reassuring

```css
.empty-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-2xl);
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  border-radius: var(--sys-radius-lg);
}

.empty-error-icon {
  width: 100px;
  height: 100px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
}

.empty-error-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  font-weight: var(--sys-typography-title-medium-font-weight);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  margin-bottom: var(--sys-spacing-xs);
  line-height: var(--sys-typography-title-medium-line-height);
}

.empty-error-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  margin-bottom: var(--sys-spacing-lg);
  line-height: var(--sys-typography-body-text-line-height);
}
```

#### 5. No Permissions Empty State (`empty-no-permissions`)
Displayed when user lacks permissions to view content.

**Usage:** Restricted sections, admin-only features
**Illustration:** Lock or shield icon
**Tone:** Clear, directing

```css
.empty-no-permissions {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-2xl);
  background-color: var(--sys-color-neutral-98);
  border-radius: var(--sys-radius-lg);
  border: 1px solid var(--sys-color-neutral-90);
}

.empty-no-permissions-icon {
  width: 100px;
  height: 100px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-neutral-70);
}

.empty-no-permissions-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  font-weight: var(--sys-typography-title-medium-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-xs);
  line-height: var(--sys-typography-title-medium-line-height);
}

.empty-no-permissions-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-lg);
  line-height: var(--sys-typography-body-text-line-height);
}
```

## Empty State Layouts

### Centered Layout
```css
.empty-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 400px;
  padding: var(--sys-spacing-3xl);
}
```

### Side-by-Side Layout
```css
.empty-side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sys-spacing-2xl);
  align-items: center;
  padding: var(--sys-spacing-2xl);
}

.empty-side-by-side-illustration {
  justify-self: center;
}

.empty-side-by-side-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
```

### Compact Layout
```css
.empty-compact {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-lg);
}

.empty-compact-icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--sys-spacing-md);
}

.empty-compact-title {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  margin-bottom: var(--sys-spacing-xs);
}
```

## Empty State Content Structure

### Illustrations & Icons
```css
.empty-illustration {
  width: 200px;
  height: 200px;
  margin-bottom: var(--sys-spacing-xl);
  color: var(--sys-color-neutral-80);
}

.empty-icon-large {
  width: 120px;
  height: 120px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-neutral-70);
}

.empty-icon-medium {
  width: 80px;
  height: 80px;
  margin-bottom: var(--sys-spacing-md);
  color: var(--sys-color-neutral-70);
}
```

### Titles
```css
.empty-title-large {
  font-family: var(--sys-typography-headline-small-font-family);
  font-size: var(--sys-typography-headline-small-font-size);
  font-weight: var(--sys-typography-headline-small-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-md);
  line-height: var(--sys-typography-headline-small-line-height);
}

.empty-title-medium {
  font-family: var(--sys-typography-title-large-font-family);
  font-size: var(--sys-typography-title-large-font-size);
  font-weight: var(--sys-typography-title-large-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-sm);
  line-height: var(--sys-typography-title-large-line-height);
}

.empty-title-small {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  font-weight: var(--sys-typography-title-medium-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-xs);
  line-height: var(--sys-typography-title-medium-line-height);
}
```

### Descriptions
```css
.empty-description-large {
  font-family: var(--sys-typography-body-large-text-font-family);
  font-size: var(--sys-typography-body-large-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-xl);
  line-height: var(--sys-typography-body-large-text-line-height);
  max-width: 500px;
}

.empty-description-medium {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-lg);
  line-height: var(--sys-typography-body-text-line-height);
  max-width: 400px;
}

.empty-description-small {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-md);
  line-height: var(--sys-typography-body-small-text-line-height);
  max-width: 300px;
}
```

## Action Buttons

### Primary Action
```css
.empty-action-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  padding: var(--sys-spacing-md) var(--sys-spacing-xl);
  background-color: var(--sys-color-roles-primary-color-role-primary-role);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
  border: none;
  border-radius: var(--sys-radius-md);
  font-family: var(--sys-typography-label-large-font-family);
  font-size: var(--sys-typography-label-large-font-size);
  font-weight: var(--sys-typography-label-large-font-weight);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-large-letter-spacing);
}

.empty-action-primary:hover {
  background-color: var(--sys-color-primary-60);
}
```

### Secondary Action
```css
.empty-action-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  padding: var(--sys-spacing-md) var(--sys-spacing-xl);
  background-color: transparent;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  border: 1px solid var(--sys-color-roles-primary-color-role-primary-role);
  border-radius: var(--sys-radius-md);
  font-family: var(--sys-typography-label-large-font-family);
  font-size: var(--sys-typography-label-large-font-size);
  font-weight: var(--sys-typography-label-large-font-weight);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-large-letter-spacing);
}

.empty-action-secondary:hover {
  background-color: var(--sys-color-primary-95);
}
```

### Link Action
```css
.empty-action-link {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
  background: none;
  border: none;
  color: var(--sys-color-roles-primary-color-role-primary-role);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: var(--sys-color-primary-60);
  text-underline-offset: 4px;
}

.empty-action-link:hover {
  color: var(--sys-color-primary-60);
  text-decoration-color: var(--sys-color-primary-40);
}
```

## KI (AI) Content Specific Empty States

### No AI Content Generated (`empty-ai-no-content`)
When no AI-generated content exists yet.

```css
.empty-ai-no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-3xl);
  background: linear-gradient(135deg, var(--sys-color-primary-95), var(--sys-color-secondary-95));
  border-radius: var(--sys-radius-xl);
}

.empty-ai-no-content-icon {
  width: 150px;
  height: 150px;
  margin-bottom: var(--sys-spacing-xl);
  color: var(--sys-color-primary-60);
}

.empty-ai-no-content-title {
  font-family: var(--sys-typography-headline-small-font-family);
  font-size: var(--sys-typography-headline-small-font-size);
  font-weight: var(--sys-typography-headline-small-font-weight);
  color: var(--sys-color-primary-40);
  margin-bottom: var(--sys-spacing-md);
}
```

### AI Processing Empty State (`empty-ai-processing`)
When AI is currently generating content.

```css
.empty-ai-processing {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-3xl);
}

.empty-ai-processing-spinner {
  width: 80px;
  height: 80px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-primary-60);
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-ai-processing-title {
  font-family: var(--sys-typography-title-large-font-family);
  font-size: var(--sys-typography-title-large-font-size);
  font-weight: var(--sys-typography-title-large-font-weight);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  margin-bottom: var(--sys-spacing-sm);
}

.empty-ai-processing-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-neutral-60);
  margin-bottom: var(--sys-spacing-lg);
  max-width: 400px;
}
```

### AI Error Empty State (`empty-ai-error`)
When AI content generation fails.

```css
.empty-ai-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sys-spacing-2xl);
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  border-radius: var(--sys-radius-lg);
}

.empty-ai-error-icon {
  width: 100px;
  height: 100px;
  margin-bottom: var(--sys-spacing-lg);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
}

.empty-ai-error-title {
  font-family: var(--sys-typography-title-medium-font-family);
  font-size: var(--sys-typography-title-medium-font-size);
  font-weight: var(--sys-typography-title-medium-font-weight);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  margin-bottom: var(--sys-spacing-xs);
}

.empty-ai-error-description {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
  margin-bottom: var(--sys-spacing-lg);
  max-width: 400px;
}

.empty-ai-error-retry {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-sm);
  padding: var(--sys-spacing-md) var(--sys-spacing-xl);
  background-color: var(--sys-color-roles-error-color-role-on-error-container-role);
  color: var(--sys-color-roles-error-color-role-error-container-role);
  border: none;
  border-radius: var(--sys-radius-md);
  font-family: var(--sys-typography-label-large-font-family);
  font-size: var(--sys-typography-label-large-font-size);
  font-weight: var(--sys-typography-label-large-font-weight);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-large-letter-spacing);
}
```

## Usage Guidelines

### 1. Empty State Hierarchy
- **First use:** Welcoming, encouraging tone with clear next steps
- **No results:** Helpful suggestions and alternative actions
- **No data:** Action-oriented with primary creation button
- **Errors:** Informative with retry or contact options
- **Permissions:** Clear explanation and escalation path

### 2. Content Organization
- Use appropriate illustrations/icons for each empty state type
- Provide clear, concise titles
- Include helpful descriptions with context
- Offer actionable next steps
- Keep language positive and helpful

### 3. Responsive Behavior
- **Mobile:** Centered layout with compact spacing
- **Tablet:** Balanced layout with moderate spacing
- **Desktop:** Full-width layout with generous spacing
- **Large screens:** Consider side-by-side layouts

### 4. Accessibility Requirements
- Provide `aria-live` for dynamic empty states
- Ensure sufficient color contrast for text and icons
- Use semantic HTML for structure
- Provide alternative text for illustrations
- Ensure keyboard navigation for action buttons
- Use `aria-label` for icon-only buttons

### 5. Do's and Don'ts

**✅ Do:**
- Use empty states as opportunities for guidance
- Provide clear next actions
- Use appropriate illustrations/icons
- Match empty state tone to context
- Test empty states with real users
- Update empty states based on user feedback

**❌ Don't:**
- Show empty states unnecessarily
- Use technical jargon
- Leave users without next steps
- Use generic illustrations for all contexts
- Forget about mobile responsiveness
- Ignore accessibility requirements

## Implementation Notes

1. **CSS Custom Properties:** Empty state styles should reference design tokens for consistency.
2. **Component Architecture:** Create reusable empty state components with configurable content.
3. **Illustration System:** Use consistent illustration style and sizing across empty states.
4. **Internationalization:** Ensure empty state text is translatable.
5. **Animation:** Consider subtle animations for illustrations or icons.

## File Structure

- `components/empty-state/` - Empty state component implementation
- `illustrations/empty-states/` - Empty state illustrations
- `design-tokens-ultimate.css` - Color, typography, spacing, and radius tokens

## Testing Empty States

1. **Visual:** Verify all empty state types render correctly
2. **Functional:** Test action buttons and interactive elements
3. **Accessibility:** Test screen reader announcements, keyboard navigation, and contrast ratios
4. **Responsive:** Verify empty state behavior across breakpoints
5. **Content:** Test with various text lengths and translations
6. **Performance:** Ensure illustrations load efficiently