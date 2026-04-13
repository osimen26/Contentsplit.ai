# ContentSplit Elevation System

## Overview

The ContentSplit Elevation System follows Google Material Design 3 guidelines to create visual hierarchy and depth through shadows and surface relationships. Elevation helps users understand the relative importance of UI elements and their interactive relationships.

## Material Design Elevation Levels

Material Design defines elevation through shadow values that correspond to different surface heights. The system uses 8-bit opacity values (0-255) for shadow colors.

### Elevation Tokens (`--sys-elevation-*`)

**Format:** `--sys-elevation-{level}` (composite box-shadow) or `--sys-elevation-{level}-{property}` (individual shadow properties). Currently only composite tokens are implemented.

**Levels:** 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 (following Material Design 3 scale)

**Properties:**
- `shadow-color` - Shadow color with alpha channel
- `shadow-offset-x` - Horizontal shadow offset
- `shadow-offset-y` - Vertical shadow offset  
- `shadow-blur` - Shadow blur radius
- `shadow-spread` - Shadow spread radius

### Recommended Elevation Values

| Level | Usage | Shadow (Material Design 3) |
|-------|-------|----------------------------|
| 0 | App background, flat surfaces | No shadow |
| 1 | Cards, buttons, dialogs | `box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)` |
| 2 | Floating action buttons, menus | `box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)` |
| 3 | Navigation drawers, modals | `box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)` |
| 4 | Dialogs, bottom sheets | `box-shadow: 0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)` |
| 5 | Tooltips, popovers | `box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)` |

## Surface Relationships

### Z-Index Scale
- `0`: Base content
- `1`: Cards, buttons
- `10`: Dropdowns, tooltips  
- `20`: Modals, dialogs
- `30`: Toasts, notifications
- `40`: Loading overlays
- `50`: Tooltips with highest priority

### Surface Elevation Examples
```css
/* Card at elevation level 1 */
.card {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  box-shadow: var(--sys-elevation-1);
  border-radius: 12px; /* Material Design 3 large component shape */
}

/* Button at elevation level 2 (when pressed) */
.button-elevated:active {
  box-shadow: var(--sys-elevation-2);
}

/* Modal dialog at elevation level 4 */
.modal {
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  box-shadow: var(--sys-elevation-4);
  border-radius: 28px; /* Material Design 3 extra-large component shape */
}
```

## Usage Guidelines

### 1. Progressive Elevation
Increase elevation for interactive states:
- Default: Level 0 or 1
- Hover: Increase by 1 level
- Focus/Active: Increase by 2 levels
- Selected: Maintain elevated state

### 2. Contextual Elevation
- **Cards:** Level 1 (resting), Level 2 (hover/selected)
- **Buttons:** Level 0 (text), Level 1 (filled/outlined), Level 2 (elevated)
- **Dialogs:** Level 4
- **Navigation:** Level 3 (side drawers), Level 1 (bottom navigation)
- **Menus:** Level 2
- **Tooltips:** Level 5

### 3. Accessibility Considerations
- Ensure sufficient contrast between elevated surfaces and background
- Use elevation changes to indicate interactive states (not just color)
- Maintain consistent elevation patterns across the application
- Test elevation with screen readers to ensure proper content hierarchy

## Implementation Notes

1. **CSS Custom Properties**: Elevation tokens should be defined in the `:root` selector alongside other design tokens.
2. **Performance**: Use `box-shadow` sparingly; prefer CSS transforms for animations involving elevation changes.
3. **Browser Support**: Test shadow rendering across different browsers and devices.
4. **Dark Mode**: Adjust shadow opacity for dark mode (darker backgrounds require stronger shadows).

## File Structure

- `design-tokens-ultimate.css` - Contains elevation CSS custom properties (when implemented)
- `design-tokens.tokens.json` - Source design tokens from Figma

## Updating Elevation

1. Export updated tokens from Figma as `design-tokens.tokens.json`
2. Run the conversion script:
   ```bash
   node convert-tokens-ultimate.js
   ```
3. Verify the generated `design-tokens-ultimate.css` file contains elevation tokens
4. Test elevation usage in the application
5. Update this documentation if elevation levels or values change

**Note:** Elevation tokens are now implemented in `design-tokens-ultimate.css`. Use `--sys-elevation-0` through `--sys-elevation-5` for Material Design 3 compliant shadows.