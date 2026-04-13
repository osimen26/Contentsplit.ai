# ContentSplit Documentation Standards

## Overview

The ContentSplit Documentation Standards ensure consistent, maintainable, and useful documentation across the codebase. Following Google Material Design 3 principles, documentation should be as polished and user-friendly as the UI it describes.

## Documentation Principles

### 1. Living Documentation
- Documentation evolves with the code
- Outdated documentation is worse than no documentation
- Every change should consider documentation impact

### 2. User-Focused
- Write for the reader's needs
- Assume minimal context but not minimal intelligence
- Provide practical examples over theoretical explanations

### 3. Consistency First
- Follow established patterns and templates
- Use consistent terminology throughout
- Maintain uniform formatting and structure

## Documentation Types

### 1. Component Documentation
```markdown
# Component Name

## Overview
Brief description of component purpose and usage.

## Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' | 'outlined' | 'text'` | `'filled'` | Visual style of the component |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` | Size of the component |

## Usage
```jsx
<Component variant="filled" size="medium">
  Click me
</Component>
```

## Accessibility
- Keyboard navigable: Yes
- Screen reader: Announces as button
- Focus visible: Yes with custom focus ring

## Design Tokens
Uses: `--sys-color-roles-primary-color-role-primary-role`
```

### 2. API Documentation
```markdown
# API Endpoint: `/api/users`

## HTTP Method
`GET`, `POST`, `PUT`, `DELETE`

## Authentication
Required: Bearer token

## Request Parameters
```json
{
  "name": "string",
  "email": "string",
  "role": "admin | user | guest"
}
```

## Response
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "createdAt": "ISO8601"
}
```

## Error Codes
- `400`: Invalid request parameters
- `401`: Unauthorized
- `404`: User not found
```

### 3. Design Token Documentation
```markdown
# Token Category

## Overview
Purpose and usage of token category.

## Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--sys-color-primary` | `#6b61e7` | Primary brand color |
| `--sys-color-primary-40` | `#251ab2` | Primary button background |

## Examples
```css
.button-primary {
  background-color: var(--sys-color-primary-40);
  color: var(--sys-color-primary-100);
}
```
```

## Documentation Structure

### File Organization
```
docs/
├── components/          # Component documentation
├── api/                # API documentation
├── guides/             # How-to guides
├── reference/          # Technical reference
└── design/            # Design system documentation
```

### Component Documentation Structure
1. **Overview** - Purpose and usage
2. **Props** - Configuration options
3. **Examples** - Practical usage
4. **Accessibility** - Accessibility features
5. **Design Tokens** - Used design tokens
6. **Changelog** - Version history

### API Documentation Structure
1. **Endpoint** - URL and HTTP method
2. **Authentication** - Required auth
3. **Parameters** - Request/response schemas
4. **Examples** - Request/response examples
5. **Error Handling** - Error codes and messages

## Writing Guidelines

### Language and Tone
- **Use active voice:** "The component renders" not "The component is rendered"
- **Be concise:** Remove unnecessary words
- **Use consistent terminology:** Stick to established terms
- **Avoid jargon:** Explain technical terms when first used

### Code Examples
```jsx
// Good: Complete, runnable example
import { Button } from '@contentsplit/ui';

function Example() {
  return (
    <Button variant="filled" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}

// Avoid: Incomplete or pseudo-code
<Button>Click me</Button> // Missing imports and context
```

### Visual Examples
```markdown
## Visual States

### Default State
![Button Default](path/to/image.png)
*Caption: Default button state with primary color*

### Hover State  
![Button Hover](path/to/image.png)
*Caption: Button on hover with darker background*
```

## Documentation Tooling

### Static Site Generator
- **Framework:** Docusaurus, Next.js, or similar
- **Hosting:** Vercel, Netlify, or GitHub Pages
- **Search:** Algolia or local search

### API Documentation
- **Tool:** Swagger/OpenAPI, Postman, or similar
- **Format:** OpenAPI 3.0 specification
- **Hosting:** Integrated with API gateway

### Component Documentation
- **Tool:** Storybook, Styleguidist, or similar
- **Integration:** Live component playground
- **Testing:** Interactive examples

## Maintenance Guidelines

### Review Process
1. **Technical review:** Verify accuracy of technical content
2. **Editorial review:** Check language, clarity, and structure
3. **User testing:** Validate with target audience

### Update Frequency
- **Major features:** Document before release
- **Bug fixes:** Document if behavior changes
- **APIs:** Document immediately when changed
- **Design tokens:** Document when added or modified

### Versioning
```markdown
## Changelog

### v1.2.0 (2024-01-15)
#### Added
- New `size` prop with small, medium, large options
- Accessibility improvements for screen readers

#### Changed
- Updated to use new design tokens
- Improved hover state animation

#### Deprecated
- `type` prop (use `variant` instead)
```

## Accessibility in Documentation

### Content Accessibility
- **Headings:** Proper hierarchy (H1, H2, H3)
- **Alt text:** Descriptive alt text for images
- **Link text:** Descriptive link text (not "click here")
- **Color contrast:** Sufficient contrast for text

### Code Accessibility
```jsx
// Good: Accessible component usage
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// Document accessibility features
<Button aria-label="Submit form">
  Submit
</Button>
```

## File Structure

- `skills/` - Design system documentation (color.md, typography.md, etc.)
- `docs/` - User-facing documentation
- `README.md` - Project overview and setup
- `CONTRIBUTING.md` - Contribution guidelines

## References

- [Material Design Documentation](https://m3.material.io/)
- [Diataxis Documentation Framework](https://diataxis.fr/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)