# ContentSplit Typography System

## Overview

The ContentSplit Typography System provides a comprehensive set of design tokens for consistent typography across the application. The system uses CSS custom properties (CSS variables) with two parallel naming conventions to support different use cases.

## Token Naming Conventions

### 1. `--sys-font-*` (Individual Property Tokens)
These tokens provide individual font properties with weight variants included in the name.

**Format:** `--sys-font-{category}-{variant}-{property}`

**Examples:**
- `--sys-font-display-large-regular-font-size: 56px;`
- `--sys-font-display-large-regular-font-weight: 400;`
- `--sys-font-display-large-medium-font-size: 56px;`
- `--sys-font-display-large-medium-font-weight: 500;`

**Categories:**
- `display-large` - Largest display text (56px)
- `display-small` - Smaller display text (48px)
- `heading-1` - Heading level 1 (40px)
- `heading-2` - Heading level 2 (36px)
- `heading-3` - Heading level 3 (32px)
- `title-large` - Large titles (28px)
- `title-medium` - Medium titles (24px)
- `title-small` - Small titles (20px)
- `paragraph-text` - Paragraph text (18px)
- `body-text` - Body text (16px)
- `body-small-text` - Small body text (14px)
- `small-text` - Small text (12px)
- `label-small` - Label text (10px)

**Variants:**
- `regular` (400 weight)
- `medium` (500 weight)
- `semi-bold` (600 weight)
- `bold` (700 weight)

### 2. `--sys-typography-*` (Composite Reference Tokens)
These tokens reference the regular weight variant of individual font properties using CSS `var()` functions, providing a convenient way to apply complete typography styles.

**Format:** `--sys-typography-{category}-{property}` (references the regular weight variant of the corresponding `--sys-font-*` token)

**Examples:**
```css
--sys-typography-display-large-font-size: var(--sys-font-display-large-regular-font-size);
--sys-typography-display-large-font-family: var(--sys-font-display-large-regular-font-family);
--sys-typography-display-large-font-weight: var(--sys-font-display-large-regular-font-weight);
```

**Usage in CSS:**
```css
.display-large {
  font-size: var(--sys-typography-display-large-font-size);
  font-family: var(--sys-typography-display-large-font-family);
  font-weight: var(--sys-typography-display-large-font-weight);
  line-height: var(--sys-typography-display-large-line-height);
  letter-spacing: var(--sys-typography-display-large-letter-spacing);
}
```

## Font Families

The system uses two primary font families:

1. **Plus Jakarta Sans** - Used for display sizes and headings
2. **Inter** - Used for body text, paragraphs, labels, and smaller text

## Typography Scale

| Category | Size | Line Height | Letter Spacing | Weight Variants |
|----------|------|-------------|----------------|-----------------|
| Display Large | 56px | 64px | -2.24px | Regular, Medium, Semi-bold, Bold |
| Display Small | 48px | 56px | -1.92px | Regular, Medium, Semi-bold, Bold |
| Heading 1 | 40px | 48px | -1.6px | Regular, Medium, Semi-bold, Bold |
| Heading 2 | 36px | 44px | -1.44px | Regular, Medium, Semi-bold, Bold |
| Heading 3 | 32px | 40px | -0.64px | Regular, Medium, Semi-bold, Bold |
| Title Large | 28px | 36px | -0.56px | Regular, Medium, Semi-bold, Bold |
| Title Medium | 24px | 32px | -0.48px | Regular, Medium, Semi-bold, Bold |
| Title Small | 20px | 28px | -0.4px | Regular, Medium, Semi-bold, Bold |
| Paragraph Text | 18px | 28px | 0px | Regular, Medium, Semi-bold, Bold |
| Body Text | 16px | 24px | 0px | Regular, Medium, Semi-bold, Bold |
| Body Small Text | 14px | 20px | 0px | Regular, Medium, Semi-bold, Bold |
| Small Text | 12px | 16px | 0px | Regular, Medium, Semi-bold, Bold |
| Label Small | 10px | 16px | 0px | Regular, Medium, Semi-bold, Bold |

## Usage Guidelines

### 1. Direct Property Usage
Use individual `--sys-font-*` tokens when you need specific control over individual properties or need different weight variants.

```css
.component-title {
  font-size: var(--sys-font-heading-1-medium-font-size);
  font-weight: var(--sys-font-heading-1-medium-font-weight);
  line-height: var(--sys-font-heading-1-medium-line-height);
}
```

### 2. Composite Style Usage
Use `--sys-typography-*` tokens when applying complete typography styles.

```css
.page-heading {
  font-size: var(--sys-typography-heading-1-font-size);
  font-family: var(--sys-typography-heading-1-font-family);
  font-weight: var(--sys-typography-heading-1-font-weight);
  line-height: var(--sys-typography-heading-1-line-height);
  letter-spacing: var(--sys-typography-heading-1-letter-spacing);
}
```

### 3. Weight Variants
To change weight while keeping other properties consistent:

```css
.emphasis {
  /* Use regular weight variant as base */
  font-size: var(--sys-font-body-text-regular-font-size);
  font-family: var(--sys-font-body-text-regular-font-family);
  /* Override weight with bold variant */
  font-weight: var(--sys-font-body-text-bold-font-weight);
}
```

## Implementation Notes

1. **CSS Custom Properties**: All tokens are defined in the `:root` selector in `design-tokens-ultimate.css`.
2. **Unit Consistency**: All dimension values include appropriate CSS units (px for font-size, line-height, letter-spacing).
3. **Fallbacks**: When using `var()` functions, consider providing fallback values for older browsers.
4. **Performance**: The token system has minimal performance impact as it uses native CSS custom properties.

## File Structure

- `design-tokens-ultimate.css` - Contains all CSS custom properties (recommended version)
- `convert-tokens-ultimate.js` - Script to generate CSS from design tokens JSON
- `design-tokens.tokens.json` - Source design tokens from Figma

**Note:** Earlier versions (`design-tokens-final.css`, `design-tokens-sys.css`, etc.) contain duplicate typography tokens and should be replaced with the ultimate version.

## Updating Tokens

1. Export updated tokens from Figma as `design-tokens.tokens.json`
2. Run the conversion script:
   ```bash
   node convert-tokens-ultimate.js
   ```
3. Verify the generated `design-tokens-ultimate.css` file
4. Test typography in the application

## Implementation Details

The token generation script:
- Skips the `typography` section from the Figma JSON (which contains duplicate properties)
- Generates individual `--sys-font-*` tokens for each font style variant (regular, medium, semi-bold, bold)
- Creates composite `--sys-typography-*` tokens that reference the regular weight variants
- Resolves color references to use CSS `var()` functions for maintainability