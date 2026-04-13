# Contentsplit.ai - AI Agent Guide

## Project Overview
Contentsplit.ai is a design token system for consistent styling across the application.

## Design Token System
The system uses CSS custom properties with `--sys-` prefix.

### Color System
See [skills/color.md](skills/color.md) (includes warning color role tokens)

### Typography System  
See [skills/typography.md](skills/typography.md)

### Elevation System
See [skills/elevation.md](skills/elevation.md)

### Spacing System
See [skills/spacing.md](skills/spacing.md)

### Radius System
See [skills/radius.md](skills/radius.md)

### Architecture Overview
See [skills/architecture.md](skills/architecture.md)

### Error Handling System
See [skills/errorusage.md](skills/errorusage.md)

### UX Experience Strategy
See [skills/ux-experience.md](skills/ux-experience.md)

### Engineering Standards
See [skills/skill.md](skills/skill.md)

### Component System
- **Buttons**: See [skills/button.md](skills/button.md)
- **Inputs**: See [skills/input.md](skills/input.md)
- **Cards**: See [skills/card.md](skills/card.md)
- **Form Fields**: See [skills/form-field.md](skills/form-field.md)
- **Icons**: See [skills/icons.md](skills/icons.md)
- **Toasts**: See [skills/toast.md](skills/toast.md)
- **Modals**: See [skills/modal.md](skills/modal.md)
- **Selects**: See [skills/select.md](skills/select.md)
- **Tables**: See [skills/table.md](skills/table.md)
- **Progress Indicators**: See [skills/progress.md](skills/progress.md)
- **Navigation**: See [skills/navigation.md](skills/navigation.md)
- **Chips**: See [skills/chips.md](skills/chips.md)
- **Tooltips**: See [skills/tooltips.md](skills/tooltips.md)

### State & Feedback System
- **Notifications**: See [skills/notification.md](skills/notification.md)
- **Loading States**: See [skills/loading-state.md](skills/loading-state.md)
- **Progress States**: See [skills/progress-state.md](skills/progress-state.md)
- **Validation**: See [skills/validation.md](skills/validation.md)
- **Empty States**: See [skills/empty-states.md](skills/empty-states.md)
- **Testing**: See [skills/testing.md](skills/testing.md)

### Layout & Responsive System
- **Layout Grid**: See [skills/layout.md](skills/layout.md)
- **Mobile Design**: See [skills/mobile.md](skills/mobile.md)
- **Responsive Design**: See [skills/responsive.md](skills/responsive.md)

## Key Files
- `design-tokens.tokens.json` - Source tokens from Figma
- `convert-tokens-ultimate.js` - Conversion script
- `design-tokens-ultimate.css` - Generated CSS variables

## Updating Tokens
1. Export updated tokens from Figma as `design-tokens.tokens.json`
2. Run `node convert-tokens-ultimate.js`
3. Verify generated `design-tokens-ultimate.css`
4. Update documentation if needed

## Usage in CSS
Use CSS custom properties with `var()`.

## Notes for AI Agents
- Follow engineering standards in `skills/skill.md`
- Maintain consistency with existing patterns
- Validate changes with linting/testing if available