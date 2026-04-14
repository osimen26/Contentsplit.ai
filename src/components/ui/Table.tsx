import React from 'react'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: 'standard' | 'striped' | 'borderless' | 'interactive' | 'compact'
  container?: boolean
  className?: string
  children: React.ReactNode
}

export const Table: React.FC<TableProps> = ({
  variant = 'standard',
  container = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'table'
  const variantClass = `table-${variant}`
  const containerClass = container ? 'table-container' : ''

  const combinedClasses = [baseClass, variantClass, containerClass, className]
    .filter(Boolean)
    .join(' ')

  const tableElement = (
    <table className={combinedClasses} {...props}>
      {children}
    </table>
  )

  if (container) {
    return <div className="table-container">{tableElement}</div>
  }

  return tableElement
}

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export const TableContainer: React.FC<TableContainerProps> = ({
  className = '',
  children,
  ...props
}) => {
  const combinedClasses = ['table-container', className].filter(Boolean).join(' ')
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean
  className?: string
  children: React.ReactNode
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  sticky = false,
  className = '',
  children,
  ...props
}) => {
  const stickyClass = sticky ? 'table-header-sticky' : ''
  const combinedClasses = ['table-header', stickyClass, className].filter(Boolean).join(' ')
  return (
    <thead className={combinedClasses} {...props}>
      {children}
    </thead>
  )
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
  children: React.ReactNode
}

export const TableBody: React.FC<TableBodyProps> = ({ className = '', children, ...props }) => {
  const combinedClasses = ['table-body', className].filter(Boolean).join(' ')
  return (
    <tbody className={combinedClasses} {...props}>
      {children}
    </tbody>
  )
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const TableRow: React.FC<TableRowProps> = ({
  selected = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const combinedClasses = [
    'table-row',
    selected ? 'selected' : '',
    disabled ? 'disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <tr className={combinedClasses} {...props}>
      {children}
    </tr>
  )
}

export interface TableCellProps extends Omit<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  'align'
> {
  header?: boolean
  align?: 'left' | 'center' | 'right' | 'numeric'
  truncate?: boolean
  multiline?: boolean
  status?: 'success' | 'warning' | 'error' | 'default'
  className?: string
  children: React.ReactNode
}

export const TableCell: React.FC<TableCellProps> = ({
  header = false,
  align = 'left',
  truncate = false,
  multiline = false,
  status = 'default',
  className = '',
  children,
  ...props
}) => {
  const alignClass = `table-col-${align}`
  const truncateClass = truncate ? 'truncate' : ''
  const multilineClass = multiline ? 'multiline' : ''
  const statusClass = status !== 'default' ? `table-status-cell ${status}` : ''

  const combinedClasses = [
    header ? 'table-header-cell' : 'table-data-cell',
    alignClass,
    truncateClass,
    multilineClass,
    statusClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const Element = header ? 'th' : 'td'
  return (
    <Element className={combinedClasses} {...props}>
      {children}
    </Element>
  )
}

export interface TableHeaderCellProps extends TableCellProps {
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | 'none'
  onSort?: () => void
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  sortable = false,
  sortDirection = 'none',
  onSort,
  align = 'left',
  className = '',
  children,
  ...props
}) => {
  const sortClass = sortDirection !== 'none' ? `table-sort-${sortDirection}` : ''
  const alignClass = `table-col-${align}`
  const combinedClasses = [
    'table-header-cell',
    sortable ? 'sortable' : '',
    sortClass,
    alignClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (sortable && onSort) {
      onSort()
    }
  }

  return (
    <th className={combinedClasses} onClick={handleClick} {...props}>
      {children}
      {sortable && sortDirection !== 'none' && (
        <span className="table-sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
      )}
    </th>
  )
}

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  ...props
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  const combinedClasses = ['table-pagination', className].filter(Boolean).join(' ')

  return (
    <div className={combinedClasses} {...props}>
      <div className="table-pagination-info">
        Page {currentPage} of {totalPages}
      </div>
      <div className="table-pagination-controls">
        <button
          className="table-pagination-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="table-pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
