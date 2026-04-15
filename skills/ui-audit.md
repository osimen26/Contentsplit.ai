# ContentSplit UI & Code Audit

> **Audited by:** Antigravity  
> **Date:** 2026-04-15  
> **Reference docs:** `contentsplit-dashboard-redesign.md`, `color.md`, `skill.md`, `testing.md`, `architecture.md`  
> **Reference UI:** Claude.ai sidebar layout pattern  

---

## Audit Summary

| Category | Pass | Fail | Warning |
|----------|------|------|---------|
| Dashboard Redesign Compliance | 6 | 2 | 1 |
| Color System Compliance | 5 | 2 | 1 |
| Code Quality (skill.md rules) | 7 | 3 | 2 |
| Accessibility | 4 | 2 | 1 |
| Functional Correctness | 5 | 1 | 2 |
| **Totals** | **27** | **10** | **7** |

---

## 1. Dashboard Redesign Compliance

Checked against: `contentsplit-dashboard-redesign.md`

### ✅ Passes

| # | Requirement | Status | File |
|---|-------------|--------|------|
| 1 | Lucide icons instead of Material Icons | ✅ Pass | DashboardPage.tsx — uses `TrendingUp`, `Zap`, `CheckCircle`, `FolderKanban`, `Plus`, `Upload`, etc. |
| 2 | Stat cards with icon + trend indicator | ✅ Pass | Lines 24–66 — each stat renders icon, value, label, and trend with green/red coloring |
| 3 | Two-column bottom grid (1.6fr / 1fr) | ✅ Pass | Line 81 — `dashboard-grid-2-col dashboard-grid-2-col-aside` used correctly |
| 4 | Primary button (filled + icon) + secondary button (outlined) | ✅ Pass | Lines 70–77 — `button-filled` with Plus icon, `button-outlined` with Upload icon |
| 5 | VIEW TEMPLATES moved to Quick Actions | ✅ Pass | Line 170–173 — "View templates" now inside Quick Actions card |
| 6 | Recent Conversions with metadata | ✅ Pass | Lines 91–146 — each row shows file icon, title, platform icon, timestamp, status badge |

### ❌ Failures

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 7 | **TierUsagePanel still in main content area** | **P1** | The redesign spec says: *"Move credit usage to the sidebar footer. It's ambient context."* The sidebar footer has a small credit bar (good ✅), but the full `TierUsagePanel` component (lines 179–232 of DashboardPage.tsx) is still rendered in the main content area with a subscription section, upgrade options, and billing info. This contradicts the spec's intent to keep credit usage ambient and not interrupting content flow. |
| 8 | **No header row with date** | **P1** | The redesign component structure specifies: `Header (title + date + Import / New content buttons)`. Currently there is no date displayed. The title "Dashboard Overview" and the two buttons exist, but they are in separate visual blocks (title at top, buttons below stats). The spec wants them in a single header row. |

### ⚠️ Warnings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 9 | **Stat cards have no borders but have box-shadow on hover** | **P2** | The spec says *"no borders needed for metric cards"*. The CSS (layout.css:888) correctly omits borders, but the hover state adds `box-shadow: 0 4px 12px rgba(107, 97, 231, 0.05)` which is a subtle branded glow — acceptable but worth verifying it aligns with the "lighter visual weight" intent. |

---

## 2. Color System Compliance

Checked against: `color.md`

### ✅ Passes

| # | Rule | Status | Details |
|---|------|--------|---------|
| 1 | Primary CTA uses `--sys-color-primary-40` | ✅ Pass | `button-filled` in button.css uses gradient from `primary-40` to `primary-60` — gradient is a slight deviation but primary-40 is the base |
| 2 | Body text uses appropriate dark tokens | ✅ Pass | `global.css` body color uses `on-neutral-container-role` token |
| 3 | Card borders use `--sys-color-neutral-95` | ✅ Pass | `dashboard-card` uses `border: 1px solid var(--sys-color-neutral-95)` |
| 4 | Success/Error trends use `success-30` / `error-30` | ✅ Pass | layout.css lines 940-946 |
| 5 | Sidebar credit usage uses `neutral-98` bg | ✅ Pass | `.sidebar-credit-usage` uses `--sys-color-neutral-98` |

### ❌ Failures

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 6 | **Primary button uses gradient instead of flat `primary-40`** | **P1** | `color.md` Section 4.3 states: `Primary button background: --sys-color-primary-40 (#251ab2)`. But `button.css` line 72 uses `background: linear-gradient(...)`. The color doc says: *"Don't apply primary-50 or primary-60 as button colors"* and *"Don't add decorative gradients unless explicitly approved."* |
| 7 | **Stat card value color uses `primary-40` instead of neutral** | **P2** | `dashboard-stat-value` (layout.css:905) uses `color: var(--sys-color-primary-40)`. Per color.md, headings/values should use `primary-10` or `neutral-10`. |

### ⚠️ Warnings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 8 | **Outlined button border is 2px instead of 1px** | **P2** | color.md says `border: 1px solid --sys-color-primary-80` for secondary buttons, but button.css:104 uses `border: 2px solid var(--sys-color-primary-40)`. Deviates in both width and color. |

---

## 3. Code Quality (skill.md Rules)

Checked against: `skill.md`

### ✅ Passes

| # | Rule | Status | Details |
|---|------|--------|---------|
| 1 | File naming (kebab-case) | ✅ Pass | All CSS files are kebab-case |
| 2 | Component naming (PascalCase) | ✅ Pass | `DashboardPage`, `ContentInput`, `TierUsagePanel`, `ConversionHistory` |
| 3 | Function naming (camelCase) | ✅ Pass | `handleGenerate`, `handleFilterChange`, `formatNumber` |
| 4 | Separation of concerns | ✅ Pass | Clean separation: `/pages`, `/components/ui`, `/components/application`, `/services`, `/hooks`, `/contexts` |
| 5 | Custom hooks follow `use` prefix | ✅ Pass | `useDebounce`, `useLocalStorage`, `useMediaQuery` |
| 6 | Error handling in API client | ✅ Pass | api-client.ts has interceptors, 401 handling |
| 7 | TypeScript interfaces properly defined | ✅ Pass | All components have explicit prop interfaces |

### ❌ Failures

| # | Issue | Severity | File | Details |
|---|-------|----------|------|---------|
| 8 | **ConversionHistory.tsx exceeds 300-line limit** | **P1** | ConversionHistory.tsx | **399 lines** — should be split into sub-components: `ConversionHistoryHeader`, `ConversionHistoryFilters`, `ConversionHistoryTable`, `ConversionHistoryPagination`. |
| 9 | **Select.tsx exceeds 300-line limit** | **P1** | Select.tsx | **328 lines** — `renderTrigger`, `renderMenu`, `renderOption` should be extracted. |
| 10 | **layout.css is massive (1,442 lines)** | **P1** | layout.css | Contains grid utilities, dashboard styles, Claude layout, conversion items, error boundary — all in one file. Should be split into: `grid.css`, `dashboard.css`, `claude-layout.css`, `error-boundary.css`. |

### ⚠️ Warnings

| # | Issue | Severity | File | Details |
|---|-------|----------|------|---------|
| 11 | **Excessive inline styles in ClaudeLayout.tsx** | **P2** | ClaudeLayout.tsx | Lines 111-154 have heavy inline `style` objects for credit widget. Should be CSS classes. |
| 12 | **console.log left in ContentCreationPage** | **P2** | ContentCreationPage.tsx | Line 71: `console.log('Current conversion ID:', ...)` — debug logging in production code. |

---

## 4. Accessibility (WCAG 2.1 AA)

### ✅ Passes

| # | Check | Status | Details |
|---|-------|--------|---------|
| 1 | Focus indicators | ✅ Pass | global.css `:focus-visible` ring with `primary-40` |
| 2 | Sidebar navigation accessible | ✅ Pass | `aria-current="page"`, proper `<nav>` semantics |
| 3 | Sidebar toggle has aria-label | ✅ Pass | Dynamic label for expand/collapse |
| 4 | Progress bar roles | ✅ Pass | `role="progressbar"` with `aria-valuemin/max/now` |

### ❌ Failures

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 5 | **Dashboard stat cards have no semantic structure** | **P1** | Stat cards use generic `<div>`. Need `role="group"` or `aria-label` for screen readers. |
| 6 | **Quick action buttons lack accessible labels** | **P1** | Emoji spans (📝, 🔄, 📊, 📋) have no `aria-hidden="true"` and buttons have no `aria-label`. |

### ⚠️ Warnings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 7 | **Status badges lack screen reader context** | **P2** | Badge elements are visual-only. Add `role="status"` or `aria-label`. |

---

## 5. Functional Correctness

### ✅ Passes

| # | Check | Status | Details |
|---|-------|--------|---------|
| 1 | Router setup correct | ✅ Pass | Nested routes under ClaudeLayout |
| 2 | Lazy loading implemented | ✅ Pass | `React.lazy()` with `Suspense` fallback |
| 3 | Query client configured | ✅ Pass | React Query with stale time, retries |
| 4 | Auth context provides user state | ✅ Pass | Mock user for development |
| 5 | Theme toggle persists | ✅ Pass | localStorage + `prefers-color-scheme` |

### ❌ Failures

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 6 | **`progress-linear` CSS may be unstyled for sidebar** | **P1** | ClaudeLayout uses `progress-linear` class but loading-state.css styles use `scaleX()` transforms. The sidebar uses `width: 65%` approach which may conflict. Verify the credit bar renders visually. |

### ⚠️ Warnings

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 7 | **AuthContext User type differs from api-client** | **P2** | AuthContext: `plan: 'free' \| 'pro' \| 'enterprise'` vs api-client: `tier: 'free' \| 'pro' \| 'agency'`. Naming and values mismatch. |
| 8 | **Multiple dev servers running simultaneously** | **P2** | 7+ `npm run dev` processes active. Only one needed. |

---

## 6. Concrete Fixes Needed

### Fix 1: Remove TierUsagePanel from Dashboard main area
**File:** `DashboardPage.tsx` lines 179–232  
**Action:** Remove the `<TierUsagePanel>` block. Sidebar already has credit widget. Subscription details belong on Settings page.

### Fix 2: Add header row with date
**File:** `DashboardPage.tsx`  
**Action:** Combine title + date + action buttons into a single header row per the redesign spec.

### Fix 3: Fix primary button gradient
**File:** `button.css` line 72  
```diff
-.button-filled {
-  background: linear-gradient(135deg, var(--sys-color-primary-40), var(--sys-color-primary-60));
+.button-filled {
+  background-color: var(--sys-color-primary-40);
```

### Fix 4: Fix outlined button border
**File:** `button.css` line 104  
```diff
-  border: 2px solid var(--sys-color-primary-40);
+  border: 1px solid var(--sys-color-primary-80);
```

### Fix 5: Split ConversionHistory.tsx (399 lines → 4 files)

### Fix 6: Split layout.css (1,442 lines → 5 files)

### Fix 7: Add accessibility labels to Dashboard

### Fix 8: Remove debug console.log from ContentCreationPage

### Fix 9: Align User types (AuthContext vs api-client)

### Fix 10: Move ClaudeLayout inline styles to CSS classes

---

## File Size Report

| File | Lines | Status |
|------|-------|--------|
| layout.css | 1,442 | ❌ Split required |
| navigation.css | 604 | ⚠️ Large but organized |
| ConversionHistory.tsx | 399 | ❌ Split required |
| Select.tsx | 328 | ❌ Split required |
| button.css | 325 | ✅ At limit |
| ContentInput.tsx | 256 | ✅ Under limit |
| DashboardPage.tsx | 238 | ✅ Under limit |
| LoadingState.tsx | 207 | ✅ Under limit |
| query-hooks.ts | 205 | ✅ Under limit |
| ContentCreationPage.tsx | 200 | ✅ Under limit |
| TierUsagePanel.tsx | 174 | ✅ Under limit |
| ClaudeLayout.tsx | 173 | ✅ Under limit |
| api-client.ts | 172 | ✅ Under limit |
| HistoryPage.tsx | 144 | ✅ Under limit |
| App.tsx | 65 | ✅ Under limit |

---

## Priority Summary

### P0 (Must fix now)
- None — no safety/security failures detected

### P1 (Fix before next milestone) — 8 items
1. Remove TierUsagePanel from Dashboard main area
2. Add header row with date
3. Fix primary button gradient → flat `primary-40`
4. Split ConversionHistory.tsx (>300 lines)
5. Split Select.tsx (>300 lines)
6. Split layout.css (1,442 lines)
7. Fix progress-linear CSS for sidebar credit bar
8. Add accessibility labels to Dashboard stat cards and quick actions

### P2 (Recommended improvements) — 5 items
1. Fix outlined button border width/color to match spec
2. Move ClaudeLayout inline styles to CSS classes
3. Remove console.log from ContentCreationPage
4. Align AuthContext User type with api-client User type
5. Review stat card value color (primary-40 vs neutral-10)

---

*This audit should be re-run after fixes are implemented. Use the checklist above to verify each item.*
