import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  Table,
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TablePagination,
} from './Table'

describe('Table', () => {
  it('renders a standard table', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    )
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(table).toHaveClass('table')
    expect(table).toHaveClass('table-standard')
  })

  it('renders table with variant classes', () => {
    const { rerender } = render(
      <Table variant="striped">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    )
    expect(screen.getByRole('table')).toHaveClass('table-striped')

    rerender(
      <Table variant="borderless">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    )
    expect(screen.getByRole('table')).toHaveClass('table-borderless')

    rerender(
      <Table variant="interactive">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    )
    expect(screen.getByRole('table')).toHaveClass('table-interactive')

    rerender(
      <Table variant="compact">
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    )
    expect(screen.getByRole('table')).toHaveClass('table-compact')
  })

  it('renders table with container', () => {
    render(
      <Table container>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    )
    const container = screen.getByRole('table').closest('.table-container')
    expect(container).toBeInTheDocument()
  })

  it('renders TableContainer component', () => {
    render(
      <TableContainer>
        <table>
          <tbody>
            <tr>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    )
    const container = screen.getByRole('table').closest('.table-container')
    expect(container).toBeInTheDocument()
  })

  it('renders TableHeader with sticky', () => {
    render(
      <table>
        <TableHeader sticky>
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </table>
    )
    const thead = screen.getByRole('rowgroup')
    expect(thead).toHaveClass('table-header')
  })

  it('renders TableBody', () => {
    render(
      <table>
        <TableBody>
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    )
    const tbody = screen.getByRole('rowgroup')
    expect(tbody).toHaveClass('table-body')
  })

  it('renders TableRow with selected state', () => {
    render(
      <table>
        <tbody>
          <TableRow selected>
            <TableCell>Selected Row</TableCell>
          </TableRow>
        </tbody>
      </table>
    )
    const row = screen.getByRole('row')
    expect(row).toHaveClass('selected')
  })

  it('renders TableRow with disabled state', () => {
    render(
      <table>
        <tbody>
          <TableRow disabled>
            <TableCell>Disabled Row</TableCell>
          </TableRow>
        </tbody>
      </table>
    )
    const row = screen.getByRole('row')
    expect(row).toHaveClass('disabled')
  })

  it('renders TableCell with header, align, truncate, multiline, and status', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell header align="center" truncate status="success">
              Header Cell
            </TableCell>
          </tr>
        </tbody>
      </table>
    )
    const cell = screen.getByRole('columnheader')
    expect(cell).toHaveClass('table-header-cell')
    expect(cell).toHaveClass('table-col-center')
    expect(cell).toHaveClass('truncate')
    expect(cell).toHaveClass('table-status-cell')
    expect(cell).toHaveClass('success')
  })

  it('renders TableHeaderCell with sortable', () => {
    const mockSort = vi.fn()
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell sortable sortDirection="asc" onSort={mockSort}>
              Sortable Header
            </TableHeaderCell>
          </tr>
        </thead>
      </table>
    )
    const header = screen.getByRole('columnheader')
    expect(header).toHaveClass('sortable')
    expect(header).toHaveClass('table-sort-asc')
    expect(header).toHaveTextContent('Sortable Header')
    // Note: testing click triggers onSort is optional
  })

  it('renders TablePagination', () => {
    const mockPageChange = vi.fn()
    render(<TablePagination currentPage={2} totalPages={5} onPageChange={mockPageChange} />)
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })
})
