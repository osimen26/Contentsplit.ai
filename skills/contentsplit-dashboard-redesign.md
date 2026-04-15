# ContentSplit Dashboard – UI Redesign Notes

## Problems with the current UI

### 1. Broken sidebar icons
Material Icons was rendering ligature names as visible text alongside the icon, causing labels like `dashboardDashboard`, `add_circleCreate`, `historyHistory`, and `settingsSettings`. The icon and the label were both appearing because the icon font wasn't loading properly.

**Fix:** Replace Material Icons with a proper React icon library (lucide-react). Icons render correctly and are sized consistently at 16px.

---

### 2. Flat, lifeless stat cards
The four metric cards (1,234 / 567 / 89% / 24) had no context. A number on its own doesn't tell you if it's good or bad.

**Fix:**
- Add a small icon per metric (TrendingUp, Zap, CheckCircle, FolderKanban)
- Add a trend indicator below each value (+12% this month, -8% this month, etc.)
- Color the trend green or red based on direction
- Keep background `--color-background-secondary` — no borders needed for metric cards

---

### 3. Poor layout hierarchy
Everything was stacked vertically with equal visual weight. The page felt like a list, not a dashboard.

**Fix:** Two-column bottom grid:
- **Left (wider):** Recent Conversions — the most frequently referenced section
- **Right:** Quick Actions — supporting, not primary

---

### 4. Credit usage in the wrong place
The AI Usage / credit bar was placed in the middle of the main content area, interrupting the flow between conversions and quick actions.

**Fix:** Move it to the **sidebar footer**. It's ambient context — something you glance at, not interact with. It belongs near the nav, not in the content area.

---

### 5. Inconsistent button styles
Three buttons (NEW CONTENT, IMPORT CONTENT, VIEW TEMPLATES) had no visual hierarchy. All caps, no clear primary vs secondary distinction.

**Fix:**
- One **primary button** — New content (filled blue, with icon)
- One **secondary button** — Import (outlined, muted)
- Remove VIEW TEMPLATES as a top-level action — move it into Quick Actions where it fits naturally

---

### 6. Recent Conversions list had no metadata
Each conversion row only showed a title. No status, no platform, no timestamp — not useful.

**Fix:** Each row now shows:
- File icon thumbnail
- Title (bold)
- Platform (Twitter/X, LinkedIn, Email) with platform icon + timestamp
- Status badge (Done → green, Processing → amber)

---

## Component structure

```
ContentSplitDashboard
├── Sidebar
│   ├── Logo + AI badge
│   ├── Nav items (Dashboard, Create, History, Settings)
│   └── Credit usage widget (65% bar)
└── Main
    ├── Header (title + date + Import / New content buttons)
    ├── Stat cards grid (4 columns)
    └── Bottom grid (1.6fr / 1fr)
        ├── Recent Conversions card
        └── Quick Actions card
```

---

## Key design decisions

| Decision | Reasoning |
|---|---|
| Lucide icons instead of Material Icons | No ligature rendering bugs; tree-shakeable; consistent stroke weight |
| Metric cards without borders | Metric cards use surface bg, not raised card style — lighter visual weight |
| Trend indicators on stats | Numbers need context to be meaningful at a glance |
| Credit usage in sidebar | Ambient context belongs in the nav, not interrupting content flow |
| Two-column bottom layout | Establishes hierarchy — conversions are primary, actions are secondary |
| Sentence case labels | More readable; matches product tone |

---

## Tokens used

```
--color-background-primary     → card surfaces
--color-background-secondary   → metric cards, sidebar credit widget
--color-background-tertiary    → page background
--color-background-info        → logo icon bg, primary button
--color-background-success     → Done badge, AI pill
--color-background-warning     → Processing badge
--color-text-primary           → headings, values
--color-text-secondary         → labels, subtitles
--color-text-tertiary          → hints, muted icons
--color-text-info              → primary button, links
--color-text-success           → positive trends, Done status
--color-text-danger            → negative trends
--color-text-warning           → Processing status
--color-border-tertiary        → card borders, dividers
--color-border-secondary       → active nav item, secondary button
--border-radius-md             → buttons, stat cards, nav items
--border-radius-lg             → raised cards
```
