# ContentSplit Table System

## Overview

The ContentSplit Table System follows Google Material Design 3 guidelines for data tables that display sets of data. Tables organize information in a grid of rows and columns, making complex data easily scannable and comparable.

## Table Anatomy (Material Design 3)

### Core Components
1. **Container** - Surface containing the table
2. **Header Row** - Column titles with sorting indicators
3. **Data Rows** - Individual data entries
4. **Cells** - Individual data points at row/column intersections
5. **Divider Lines** - Visual separation between rows/columns
6. **Pagination** - Navigation for multi-page tables
7. **Action Controls** - Selection, sorting, filtering

### Table Types

#### 1. Standard Table (`table-standard`)
Basic table with divider lines and header.

**Usage:** Data display, configuration tables, settings
**Elevation:** Level 0 (no shadow)
**Corner Radius:** 0px (square corners for tables)

```css
.table-standard {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
}

.table-standard th,
.table-standard td {
  padding: var(--sys-spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--sys-color-neutral-90);
}

.table-standard th {
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  font-weight: var(--sys-typography-title-small-font-weight);
  color: var(--sys-color-neutral-40);
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-title-small-letter-spacing);
}

.table-standard td {
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
}
```

#### 2. Striped Table (`table-striped`)
Alternating row colors for better readability.

**Usage:** Large datasets, financial data, logs
**Elevation:** Level 0

```css
.table-striped tr:nth-child(even) {
  background-color: var(--sys-color-neutral-98);
}

.table-striped tr:hover {
  background-color: var(--sys-color-neutral-95);
}
```

#### 3. Borderless Table (`table-borderless`)
Table without divider lines, using spacing for separation.

**Usage:** Simple lists, mobile interfaces, minimal designs
**Elevation:** Level 0

```css
.table-borderless th,
.table-borderless td {
  border: none;
  padding: var(--sys-spacing-lg);
}

.table-borderless tr + tr td {
  padding-top: var(--sys-spacing-xl);
}
```

#### 4. Interactive Table (`table-interactive`)
Rows are clickable for actions or navigation.

**Usage:** User lists, product catalogs, search results
**Elevation:** Level 0

```css
.table-interactive tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-interactive tr:hover {
  background-color: var(--sys-color-neutral-95);
}

.table-interactive tr.selected {
  background-color: var(--sys-color-primary-95);
  border-left: 4px solid var(--sys-color-roles-primary-color-role-primary-role);
}
```

#### 5. Compact Table (`table-compact`)
Dense spacing for displaying many rows.

**Usage:** Admin panels, data-intensive applications
**Elevation:** Level 0

```css
.table-compact th,
.table-compact td {
  padding: var(--sys-spacing-sm);
  font-size: var(--sys-typography-body-small-text-font-size);
}

.table-compact th {
  font-size: var(--sys-typography-label-large-font-size);
}
```

## Table Layouts

### Basic Table Structure
```css
.table-container {
  overflow-x: auto;
  border-radius: var(--sys-radius-md);
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
}

.table {
  width: 100%;
  min-width: 600px;
}

.table-header {
  position: sticky;
  top: 0;
  background-color: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  z-index: 10;
}
```

### Column Alignment
```css
.table-col-left {
  text-align: left;
}

.table-col-center {
  text-align: center;
}

.table-col-right {
  text-align: right;
}

.table-col-numeric {
  text-align: right;
  font-family: var(--sys-typography-title-small-font-family);
  font-variant-numeric: tabular-nums;
}
```

### Column Widths
```css
.table-col-auto {
  width: auto;
}

.table-col-fixed {
  width: 120px;
  min-width: 120px;
  max-width: 120px;
}

.table-col-flex {
  flex: 1;
  min-width: 200px;
}
```

## Table Content Structure

### Header Cells
```css
.table-header-cell {
  padding: var(--sys-spacing-md);
  font-family: var(--sys-typography-title-small-font-family);
  font-size: var(--sys-typography-title-small-font-size);
  font-weight: var(--sys-typography-title-small-font-weight);
  color: var(--sys-color-neutral-40);
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-title-small-letter-spacing);
  user-select: none;
}

.table-header-cell.sortable {
  cursor: pointer;
}

.table-header-cell.sortable:hover {
  background-color: var(--sys-color-neutral-95);
}

.table-sort-indicator {
  margin-left: var(--sys-spacing-xs);
  color: var(--sys-color-neutral-60);
}
```

### Data Cells
```css
.table-data-cell {
  padding: var(--sys-spacing-md);
  font-family: var(--sys-typography-body-text-font-family);
  font-size: var(--sys-typography-body-text-font-size);
  color: var(--sys-color-roles-neutral-color-role-on-neutral-container-role);
  line-height: var(--sys-typography-body-text-line-height);
}

.table-data-cell.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.table-data-cell.multiline {
  white-space: normal;
  line-height: 1.4;
}
```

### Status Cells
```css
.table-status-cell {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
  padding: var(--sys-spacing-xs) var(--sys-spacing-sm);
  border-radius: var(--sys-radius-full);
  font-family: var(--sys-typography-label-small-font-family);
  font-size: var(--sys-typography-label-small-font-size);
  font-weight: var(--sys-typography-label-small-font-weight);
  text-transform: uppercase;
  letter-spacing: var(--sys-typography-label-small-letter-spacing);
}

.table-status-cell.success {
  background-color: var(--sys-color-roles-success-color-role-success-container-role);
  color: var(--sys-color-roles-success-color-role-on-success-container-role);
}

.table-status-cell.warning {
  background-color: var(--sys-color-roles-warning-color-role-warning-container-role);
  color: var(--sys-color-roles-warning-color-role-on-warning-container-role);
}

.table-status-cell.error {
  background-color: var(--sys-color-roles-error-color-role-error-container-role);
  color: var(--sys-color-roles-error-color-role-on-error-container-role);
}
```

## Interactive States

### Hover State
```css
.table-row:hover {
  background-color: var(--sys-color-neutral-95);
}

.table-cell-hover {
  position: relative;
}

.table-cell-hover:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sys-color-neutral-95);
  z-index: -1;
}
```

### Focus State
```css
.table-row:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: -2px;
}

.table-cell:focus {
  outline: 2px solid var(--sys-color-primary-60);
  outline-offset: 2px;
}
```

### Selected State
```css
.table-row.selected {
  background-color: var(--sys-color-primary-95);
}

.table-cell.selected {
  background-color: var(--sys-color-primary-90);
  color: var(--sys-color-roles-primary-color-role-on-primary-role);
}
```

### Disabled State
```css
.table-row.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.table-cell.disabled {
  color: var(--sys-color-neutral-60);
}
```

## Table Actions

### Row Selection
```css
.table-select-checkbox {
  width: 40px;
  text-align: center;
}

.table-select-all {
  padding: var(--sys-spacing-md);
}
```

### Sorting Controls
```css
.table-sort-button {
  display: inline-flex;
  align-items: center;
  gap: var(--sys-spacing-xs);
  background: none;
  border: none;
  padding: var(--sys-spacing-sm);
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.table-sort-button:hover {
  background-color: var(--sys-color-neutral-95);
  border-radius: var(--sys-radius-sm);
}

.table-sort-asc,
.table-sort-desc {
  color: var(--sys-color-roles-primary-color-role-primary-role);
}
```

### Filter Controls
```css
.table-filter {
  margin-bottom: var(--sys-spacing-lg);
}

.table-filter-input {
  width: 100%;
  max-width: 300px;
}
```

### Pagination
```css
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sys-spacing-lg);
  border-top: 1px solid var(--sys-color-neutral-90);
}

.table-pagination-info {
  font-family: var(--sys-typography-body-small-text-font-family);
  font-size: var(--sys-typography-body-small-text-font-size);
  color: var(--sys-color-neutral-60);
}

.table-pagination-controls {
  display: flex;
  gap: var(--sys-spacing-xs);
}

.table-pagination-button {
  padding: var(--sys-spacing-sm) var(--sys-spacing-md);
  border: 1px solid var(--sys-color-neutral-90);
  background: var(--sys-color-roles-neutral-color-role-neutral-container-role);
  border-radius: var(--sys-radius-sm);
  cursor: pointer;
}

.table-pagination-button:hover:not(:disabled) {
  background-color: var(--sys-color-neutral-95);
}

.table-pagination-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

## Usage Guidelines

### 1. Table Hierarchy
- **Primary data tables:** Standard or striped tables
- **Configuration tables:** Borderless or compact tables
- **Interactive lists:** Interactive tables with row actions
- **Mobile tables:** Responsive tables with horizontal scroll

### 2. Content Organization
- Place most important columns first
- Use consistent column widths based on content type
- Group related columns together
- Provide appropriate column headers
- Use alignment (left for text, right for numbers)

### 3. Responsive Behavior
- **Mobile:** Horizontal scroll with fixed first column
- **Tablet:** Full-width with adjustable column widths
- **Desktop:** Fixed layout with optimal column sizing
- **Large screens:** Consider split-view or multi-column tables

### 4. Accessibility Requirements
- Use semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<th>` with `scope`)
- Provide `aria-label` or `aria-labelledby` for tables
- Ensure proper heading hierarchy within tables
- Support keyboard navigation for interactive tables
- Use `aria-sort` for sortable columns
- Provide `aria-selected` for selectable rows

### 5. Do's and Don'ts

**✅ Do:**
- Use tables for structured, comparable data
- Provide clear column headers
- Use appropriate spacing and alignment
- Implement sorting and filtering for large datasets
- Include pagination for tables with many rows
- Make tables accessible with proper markup

**❌ Don't:**
- Use tables for layout purposes
- Overload tables with too many columns
- Use inconsistent styling across tables
- Forget to handle empty states
- Ignore mobile responsiveness
- Make cells too small for touch targets

## Implementation Notes

1. **CSS Custom Properties:** Table styles should reference design tokens for colors, spacing, and typography.
2. **Component Architecture:** Create reusable table components with configurable columns and data.
3. **Performance:** Implement virtualization for tables with hundreds of rows.
4. **Sorting/Filters:** Implement client-side or server-side sorting and filtering based on data size.
5. **Empty States:** Provide meaningful empty states when no data is available.

## File Structure

- `components/table/` - Table component implementation
- `design-tokens-ultimate.css` - Color, typography, spacing, and radius tokens

## Testing Tables

1. **Visual:** Verify all table types render correctly with various data
2. **Functional:** Test sorting, filtering, pagination, and row selection
3. **Accessibility:** Test screen reader announcements, keyboard navigation, and ARIA attributes
4. **Performance:** Test with large datasets and virtualization
5. **Responsive:** Verify table behavior across breakpoints and orientations
6. **Interaction:** Test hover, focus, and selection states