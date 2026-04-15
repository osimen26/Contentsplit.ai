# File Structure & Component Size Rules

> **Rule ID:** `file-structure`
> **Status:** Active
> **Last Updated:** 2026-04-15
> **Context:** Architectural constraints for code maintainability and readability.

## Strict Component Length Limit
In order to maintain a clean constraint boundary on component complexity, **no single file should exceed 600 lines of code**. 

### Execution
1. **React Components (`.ts`, `.tsx`, `.js`)**: If a component approaches 400-500 lines, it is doing too much. Extract logical hooks (`useHooks`), UI sub-components (e.g., extracting a `TableBody` out of a `Table` component), or break down the feature into smaller files in a nested folder.
2. **Stylesheets (`.css`)**: Do not create monolithic `.css` files. If a stylesheet exceeds 600 lines, extract utility classes, animations, or layout-specific logic into semantic sub-stylesheets (e.g., `layout-grid.css`, `layout-sidebar.css`).
3. **Exceptions**: Auto-generated lockfiles (like `package-lock.json` or `pnpm-lock.yaml`) and monolithic data-dumps like raw JSON tokens are naturally exempt from this rule.

*Before making any architectural PRs going forward, the AI agent must ensure the modified file remains under this hard cap.*
