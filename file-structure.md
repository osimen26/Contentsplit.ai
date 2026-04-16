# ContentSplit.ai — File Structure & Code Organisation

## Project Root

```
Contentsplit.ai/
├── public/                         # Static assets
├── src/
│   ├── components/
│   │   ├── analytics/              # Page view tracking
│   │   ├── application/            # Feature-level components (ChatInput, PlatformSelector, etc.)
│   │   ├── data-display/           # (reserved)
│   │   ├── feedback/               # (reserved)
│   │   ├── forms/                  # (reserved)
│   │   ├── layout/                 # (reserved)
│   │   ├── navigation/             # (reserved)
│   │   └── ui/                     # Primitive UI components (Button, Card, Select, etc.)
│   ├── contexts/                   # React context providers (Auth, Theme)
│   ├── hooks/                      # Custom React hooks
│   ├── layouts/                    # Page layout wrappers
│   ├── pages/                      # Route-level page components
│   ├── services/                   # API client and React Query hooks
│   ├── styles/                     # Global CSS and theme overrides
│   ├── test/                       # Test utilities / setup
│   ├── utils/                      # Pure utility functions (date, string, validation, analytics)
│   ├── App.tsx                     # Root app component and router
│   └── main.tsx                    # Vite entry point
├── server/
│   └── index.js                    # Express backend proxy (DeepSeek API key lives here only)
├── design-tokens-ultimate.css      # Generated CSS custom properties from design tokens
├── design-tokens.tokens.json       # Source design token definitions
├── convert-tokens-ultimate.js      # Token-to-CSS generation script
├── agent.md                        # AI assistant profile and project brief
├── index.html                      # Vite HTML entry
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies and scripts
```

---

## ⚠️ File Size Rule — 600-Line Limit

> **No source file should exceed 600 lines of code.**
>
> If a file grows beyond 600 lines, it must be refactored by splitting it into smaller,
> focused modules. This keeps components discoverable, maintainable, and reviewable.

### What to do when a file hits 600 lines

| Scenario | Recommended Action |
|---|---|
| Page component | Extract sub-sections into child components |
| UI component | Split variants into separate files |
| CSS file | Split by concern (layout, theme, component) |
| Utility file | Group by domain and split into sub-modules |
| Service / hook | Extract per-resource hooks or API methods |

### Current Violations (⚠️ Requires Refactoring)

The following files **currently exceed 600 lines** and should be addressed:

| File Path | Number of Lines |
|---|---|
| `design-tokens.tokens.json` | 6,433 |
| `skills/tooltips.md` | 2,946 |
| `skills/chips.md` | 2,213 |
| `test.html` | 1,928 |
| `skills/navigation.md` | 1,660 |
| `skills/testing.md` | 1,096 |
| `skills/select.md` | 1,003 |
| `design-tokens-ultimate.css` | 981 |
| `skills/progress-state.md` | 972 |
| `skills/validation.md` | 933 |
| `skills/loading-state.md` | 869 |
| `skills/modal.md` | 861 |
| `skills/notification.md` | 766 |
| `skills/responsive.md` | 754 |
| `skills/error-usage.md` | 745 |
| `skills/form-field.md` | 683 |
| `skills/onboarding-login-flow.md` | 673 |
| `skills/toast.md` | 659 |
| `skills/layout.md` | 656 |
| `skills/empty-states.md` | 653 |
| `skills/mobile.md` | 620 |

> **Note:** Auto-generated files (like `design-tokens.tokens.json`, `design-tokens-ultimate.css`) and pure documentation/specification files inside the `skills/` directory are currently exempt from the 600-line split enforcement unless explicitly instructed otherwise. Any **hand-authored source code file** that breaches 600 lines must be split.

---

## File Naming Conventions

- **Components:** `PascalCase.tsx` — e.g. `ChatInput.tsx`, `PlatformSelector.tsx`
- **Tests:** `ComponentName.test.tsx` — collocated with the component
- **Hooks:** `camelCase.ts` starting with `use` — e.g. `useDebounce.ts`
- **Utilities:** `camelCase.ts` by domain — e.g. `date.ts`, `validation.ts`
- **Styles:** `kebab-case.css` — e.g. `theme-dark.css`, `global.css`
- **Index barrels:** Each directory exports via `index.ts`

---

## Import Path Aliases

| Alias | Resolves To |
|---|---|
| `@components/*` | `src/components/*` |
| `@services/*` | `src/services/*` |
| `@/services/*` | `src/services/*` |
| `@utils/*` | `src/utils/*` |
| `@hooks/*` | `src/hooks/*` |
| `@contexts/*` | `src/contexts/*` |
