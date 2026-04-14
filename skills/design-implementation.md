# ContentSplit Design Implementation Guidelines

## Overview

This document provides guidelines for creative execution within the **Google Material Design 3 (MD3)** framework and the **ContentSplit Design Token System (`--sys-*`)**. While MD3 establishes a consistent, accessible foundation, these guidelines show how to implement expressive, engaging UI experiences that remain fully compliant with the system.

**Core Philosophy:** Creativity happens **within** the constraints of the design token system, not outside it. All visual decisions must reference `--sys-*` tokens, ensuring maintainability, scalability, and brand consistency across the ContentSplit application.

## Human Documentation

### 1. Typography Enhancement Within MD3

MD3's typography system (`skills/typography.md`) provides a robust foundation. Creative expression comes from **hierarchical contrast** and **purposeful pairing**.

**Guidelines:**
- **Headlines:** Use `--sys-typography-display-large` for primary page titles, but consider increasing letter-spacing (tracking) slightly (`0.25px`) for a more open, airy feel when paired with dense AI content.
- **Body Text:** Maintain `--sys-typography-body-large` for readability. For **emphasis within paragraphs**, use the **`--sys-color-primary-40`** token applied via `<strong>` or a `.text-emphasis` class, not a font weight change.
- **Supporting Text (Labels, Captions):** Use `--sys-typography-label-small` for form labels, but **increase contrast** by setting color to `--sys-color-primary-100` instead of the default `--sys-color-on-surface-variant` for high-priority actions.
- **Creative Pairing:** For marketing or landing sections, you may pair `--sys-typography-headline-medium` (headline) with `--sys-typography-body-medium` (body). This creates a clear visual step without deviating from the token scale.

**Do Not:**
- Introduce new font families. MD3 uses **Inter** as the system font.
- Use font weights not defined in the typography token scale (e.g., `font-weight: 800`).
- Apply inline `font-size`, `line-height`, or `letter-spacing` values. Always use the composite token (e.g., `var(--sys-typography-headline-small)`).

### 2. Motion & Animation Within the Token System

Motion brings interfaces to life. All motion must be defined as **design tokens** for consistency.

**Current Token Gap:** The `design-tokens.tokens.json` file currently lacks `time` (duration) and `easing` (animation curve) tokens. Until these are added:

1.  **Use Standard MD3 Durations:** Short interactions: **100ms**. Medium transitions: **250ms**. Complex animations: **500ms**.
2.  **Use Standard MD3 Easing:** **`cubic-bezier(0.4, 0.0, 0.2, 1)`** (standard curve) for most transitions. Use **`cubic-bezier(0.0, 0.0, 0.2, 1)`** (emphasized deceleration) for entering elements.
3.  **Token Implementation Pattern:** Define CSS custom properties in a `motion.css` file that mirrors the token structure:
    ```css
    :root {
      /* Duration Tokens */
      --sys-motion-duration-short: 100ms;
      --sys-motion-duration-medium: 250ms;
      --sys-motion-duration-long: 500ms;
      /* Easing Tokens */
      --sys-motion-easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
      --sys-motion-easing-emphasized: cubic-bezier(0.0, 0.0, 0.2, 1);
    }
    ```
4.  **Component Usage:** Reference these tokens in component animations:
    ```css
    .dialog-enter-active {
      animation: dialog-enter var(--sys-motion-duration-medium) var(--sys-motion-easing-emphasized);
    }
    ```

### 3. Spatial Creativity with the 8dp Grid

The MD3 spacing system (`skills/spacing.md`) uses an **8dp baseline grid**. Creativity comes from **asymmetric layouts** and **negative space**, not arbitrary numbers.

**Guidelines:**
- **Baseline:** All component padding, margins, and gaps must be multiples of **`--sys-spacing-unit` (8px)**.
- **Breaking the Grid (Intentionally):** To create visual interest, you can use **odd multiples** of the base unit (e.g., `calc(var(--sys-spacing-unit) * 3)` = 24px) for a more dynamic rhythm than the standard 16px or 32px.
- **Negative Space:** Use large padding (`--sys-spacing-3xl`: 64px) around key content blocks (like the AI output cards) to create focus and reduce cognitive load.
- **Density Modes:** For data-dense tables, use the **compact** spacing scale (`--sys-spacing-xs`: 4px) for row padding. For editorial layouts (like the onboarding flow), use the **comfortable** scale (`--sys-spacing-lg`: 32px).

**Example – Creative Card Layout:**
```css
.creative-card {
  /* Standard padding, but using an odd multiple for rhythm */
  padding: calc(var(--sys-spacing-unit) * 5); /* 40px instead of 32px or 48px */
  /* Large, intentional negative space below */
  margin-block-end: var(--sys-spacing-3xl); /* 64px */
}
```

### 4. Color Expression Within the System

The color system (`skills/color.md`) is extensive. Creative use involves **token pairing** and **contextual application**.

**Guidelines:**
- **Backgrounds:** Surfaces should use `--sys-color-surface-container-lowest` to `--sys-color-surface-container-high`. For a vibrant, focused section (like a CTA banner), use `--sys-color-primary-95` (light primary) as a background with `--sys-color-primary-10` text.
- **Borders:** Use `--sys-color-outline-variant` for subtle separation. For interactive focus states, combine `--sys-color-primary-40` with a `--sys-elevation-1` shadow.
- **Gradients:** Gradients are permitted but must be constructed from **existing color tokens**. Example (header gradient):
    ```css
    .gradient-header {
      background: linear-gradient(
        135deg,
        var(--sys-color-primary-80) 0%,
        var(--sys-color-primary-60) 50%,
        var(--sys-color-primary-40) 100%
      );
    }
    ```
- **Dynamic Theming:** All color decisions must work across both light and dark themes. Test contrast ratios using the `--sys-color-on-*` tokens.

## AI Agent Implementation Notes

**Purpose:** This section provides specific, actionable instructions for AI agents (like opencode) implementing UI features for ContentSplit. The goal is to achieve a **polished, expressive interface** while **strictly adhering** to the MD3 framework and `--sys-*` token system.

### Core Directives for AI Agents

1.  **Token Compliance is Non-Negotiable:**
    - **NEVER** write hard-coded CSS values (e.g., `color: #007bff;`, `margin: 16px;`).
    - **ALWAYS** use the appropriate `--sys-*` CSS custom property.
    - If a required token does not exist (e.g., a specific radius), first check `design-tokens.tokens.json`. If missing, simulate it using the nearest logical token and add a `/* TODO: Add token */` comment. **Do not** create new `--sys-*` variables without updating the source JSON.

2.  **Implement "Creative Execution" as Defined Above:**
    - **Typography:** Follow the hierarchical contrast patterns in the Human Documentation. Use the `text-emphasis` class for inline emphasis.
    - **Motion:** Use the proposed `--sys-motion-*` tokens. If the motion CSS file doesn't exist, create it with the standard values above.
    - **Space:** Use the 8dp grid. Experiment with odd multiples (40px, 56px) for visual rhythm in marketing components.
    - **Color:** Build gradients from tokens. Use surface container tokens for depth.

3.  **Component Implementation Pattern:**
    When building a new component (e.g., a "Feature Card" for the landing page):
    1.  **Research:** First, read the relevant MD3 component spec (e.g., `skills/card.md`) and any existing similar components in the codebase.
    2.  **Token Audit:** Identify all needed tokens (color, typography, spacing, elevation, radius). Verify they exist in `design-tokens-ultimate.css`.
    3.  **Build:** Write the component's styles using **only** the identified tokens.
    4.  **Enhance:** Apply one "creative execution" principle (e.g., use a 40px padding for rhythm, or add a subtle gradient from primary tokens).
    5.  **Validate:** Ensure the component works in both light/dark themes and meets WCAG AA contrast ratios.

4.  **Handling Missing Tokens:**
    - **If a spacing token is needed:** Use `calc()` with `--sys-spacing-unit` (e.g., `calc(var(--sys-spacing-unit) * 7)` for 56px).
    - **If a radius token is needed:** The radius system is currently incomplete. Use the global `--sys-radius-md` (20px) for now and add a `/* TODO: Add radius token */` comment.
    - **If a motion token is needed:** Implement the `--sys-motion-*` tokens as described above.

5.  **Example: Building an "AI Output Card" with Creative Flair**
    ```css
    .ai-output-card {
      /* --- FOUNDATION (Strict MD3 Compliance) --- */
      background-color: var(--sys-color-surface-container-low);
      border-radius: var(--sys-radius-md);
      padding: var(--sys-spacing-xl);
      margin-block-end: var(--sys-spacing-2xl);
      box-shadow: var(--sys-elevation-1);
      font-family: var(--sys-typography-body-large-font-family);
      
      /* --- CREATIVE EXECUTION (Within System) --- */
      /* 1. Spatial Creativity: Asymmetric top/bottom padding */
      padding-block: calc(var(--sys-spacing-unit) * 5) var(--sys-spacing-xl); /* 40px top, 24px bottom */
      /* 2. Typographic Hierarchy */
      .card-title {
        font: var(--sys-typography-headline-small);
        color: var(--sys-color-primary-40); /* Using primary for emphasis */
        margin-block-end: var(--sys-spacing-xs);
      }
      /* 3. Subtle Interactive Enhancement */
      transition: box-shadow var(--sys-motion-duration-short) var(--sys-motion-easing-standard);
      &:hover {
        box-shadow: var(--sys-elevation-2);
      }
    }
    ```

## File Structure

```
skills/
├── design-implementation.md          # This file
├── architecture.md                   # Overall system architecture
├── color.md                          # Color token system
├── typography.md                     # Typography token system
├── spacing.md                        # Spacing/8dp grid system
├── radius.md                         # Radius/shape system
├── ...                               # Other component files
└── (proposed) motion.css             # Motion token definitions
```

**Related Files:**
- `design-tokens.tokens.json` – Source of all design tokens.
- `design-tokens-ultimate.css` – Generated CSS custom properties.
- `agent.md` – Main project guide referencing this document.