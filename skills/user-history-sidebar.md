# User History Sidebar - ContentSplit

## Overview

The user history (Recents) sidebar shows previously generated conversions, allowing users to quickly access and revisit past content. This feature is similar to ChatGPT/Claude's sidebar design.

## Requirements

### 1. Data Loading

- On login, fetch user's previous conversions from API
- Store in React Query cache for sidebar access
- Show loading skeleton while fetching
- Display "Your conversions will appear here" when empty

### 2. Sidebar Display

- **Location**: Left sidebar, above Settings/Footer section
- **Label**: "Recents" with uppercase styling
- **Items**: Up to 25 most recent conversions
- **Display**: First 32 characters of input text + ellipsis if longer
- **Timestamp**: Show relative time (e.g., "2 hours ago", "Yesterday")
- **Platform icon**: Show platform badge (Twitter, LinkedIn, Instagram, Email)

### 3. Interaction

- Click to navigate to `/c/{id}`
- Active item highlighted with different background
- Search/filter functionality available

### 4. Sections

Group by time:
- **Today** - Conversions from today
- **Previous 7 Days** - Conversions from last 7 days
- **Older** - Remaining conversions

## Implementation

### API Integration

```typescript
// Fetch user's conversions
const { data: conversions } = useConversions()

// In sidebar...
const grouped = useMemo(() => groupByTime(conversions), [conversions])
```

### Query Hook

```typescript
export const useConversions = () => {
  return useQuery({
    queryKey: queryKeys.conversions,
    queryFn: () => apiClient.getConversions(),
    staleTime: 5 * 60 * 1000,
  })
}
```

### Display Structure

```
Recents (label)
├── Today
│   ├── [Twitter icon] "How to write a blog post..." • 2h ago
│   └── [LinkedIn icon] "Exciting news about our..." • 5h ago
├── Previous 7 Days
│   └── [Email icon] "Weekly newsletter templa..." • Yesterday
└── Older
    └── [Instagram icon] "Product launch update..." • Jan 15
```

## Styling

- Font: 0.88rem for items, 0.75rem uppercase for labels
- Padding: 7px 10px
- Border radius: 7px
- Active: `--sys-color-neutral-90` background
- Default hover: `--sys-color-neutral-95` background

## Edge Cases

1. **No conversions**: Show empty state message
2. **Too many conversions**: Limit to 25 items
3. **Long input text**: Truncate with ellipsis
4. **API error**: Show error state, allow retry
5. **Search**: Filter items by input_text

## File Structure

- `src/services/query-hooks.ts` - useConversions hook
- `src/services/api-client.ts` - getConversions API method
- `src/layouts/ClaudeLayout.tsx` - Recents section in sidebar

## Sync Behavior

On page load:
1. Check if user is authenticated
2. If yes, fetch conversions
3. Populate Recents sidebar automatically
4. Cache data for future navigation
5. Refresh in background when returning to dashboard