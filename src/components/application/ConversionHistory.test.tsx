import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ConversionHistory, type ConversionItem, type ConversionStats } from './ConversionHistory'

describe('ConversionHistory', () => {
  const mockConversions: ConversionItem[] = [
    {
      id: '1',
      title: 'Blog Post to Social Media',
      status: 'success',
      platform: 'Twitter',
      platformIcon: '🐦',
      originalLength: 1200,
      convertedLength: 280,
      date: '2024-01-15',
      time: '14:30',
      creditsUsed: 5,
    },
    {
      id: '2',
      title: 'Email Newsletter',
      status: 'pending',
      platform: 'Email',
      platformIcon: '📧',
      originalLength: 800,
      convertedLength: 500,
      date: '2024-01-14',
      time: '10:15',
      creditsUsed: 3,
    },
    {
      id: '3',
      title: 'LinkedIn Article',
      status: 'failed',
      platform: 'LinkedIn',
      platformIcon: '💼',
      originalLength: 2000,
      convertedLength: 0,
      date: '2024-01-13',
      time: '16:45',
      creditsUsed: 8,
    },
  ]

  const mockStats: ConversionStats = {
    totalConversions: 3,
    creditsUsed: 16,
    avgConversionTime: '45s',
    successRate: 66.7,
    change: { value: 12, direction: 'positive' },
  }

  it('renders with conversions and stats', () => {
    render(<ConversionHistory conversions={mockConversions} stats={mockStats} />)

    // Check stats are displayed
    expect(screen.getByText(/total conversions/i)).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText(/credits used/i)).toBeInTheDocument()
    expect(screen.getByText('16')).toBeInTheDocument()
    expect(screen.getByText(/success rate/i)).toBeInTheDocument()
    expect(screen.getByText('66.7%')).toBeInTheDocument()

    // Check table headers
    expect(screen.getByRole('columnheader', { name: /title/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /platform/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument()

    // Check conversion rows
    expect(screen.getByText('Blog Post to Social Media')).toBeInTheDocument()
    expect(screen.getAllByText('Twitter').length).toBeGreaterThan(0)
    expect(screen.getByText('Email Newsletter')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn Article')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(<ConversionHistory conversions={[]} loading={true} />)

    expect(screen.getByText(/loading conversions/i)).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('renders empty state when no conversions', () => {
    render(<ConversionHistory conversions={[]} />)

    expect(screen.getByText(/no conversions yet/i)).toBeInTheDocument()
    expect(screen.getByText(/start creating ai-powered content/i)).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('handles pagination page change', () => {
    const handlePageChange = vi.fn()
    render(
      <ConversionHistory
        conversions={mockConversions}
        currentPage={1}
        totalPages={5}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    )

    const nextButton = screen.getByRole('button', { name: '→' })
    fireEvent.click(nextButton)

    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it('handles filter change', () => {
    const handleFilterChange = vi.fn()
    render(
      <ConversionHistory
        conversions={mockConversions}
        filters={{ platform: 'twitter' }}
        onFilterChange={handleFilterChange}
      />
    )

    // Change platform filter
    const platformSelect = screen.getByTestId('platform-filter-select')
    fireEvent.change(platformSelect, { target: { value: 'linkedin' } })

    expect(handleFilterChange).toHaveBeenCalledWith({ platform: 'linkedin' })
  })

  it('handles view detail action', () => {
    const handleViewDetail = vi.fn()
    render(<ConversionHistory conversions={mockConversions} onViewDetail={handleViewDetail} />)

    // Find the first row's view button
    const viewButtons = screen.getAllByRole('button', { name: /view/i })
    fireEvent.click(viewButtons[0])

    expect(handleViewDetail).toHaveBeenCalledWith('1')
  })

  it('handles regenerate action', () => {
    const handleRegenerate = vi.fn()
    render(<ConversionHistory conversions={mockConversions} onRegenerate={handleRegenerate} />)

    const regenerateButtons = screen.getAllByRole('button', { name: /regenerate/i })
    fireEvent.click(regenerateButtons[0])

    expect(handleRegenerate).toHaveBeenCalledWith('1')
  })

  it('handles delete action', () => {
    const handleDelete = vi.fn()
    render(<ConversionHistory conversions={mockConversions} onDelete={handleDelete} />)

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])

    expect(handleDelete).toHaveBeenCalledWith('1')
  })

  it('shows status badges correctly', () => {
    render(<ConversionHistory conversions={mockConversions} />)

    expect(screen.getAllByText('Success').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Failed').length).toBeGreaterThan(0)
  })

  it('calculates and displays conversion ratio', () => {
    render(<ConversionHistory conversions={mockConversions} />)

    // Should show conversion lengths like "1200 → 280 chars"
    expect(screen.getByText('1200 → 280 chars')).toBeInTheDocument()
    expect(screen.getByText('800 → 500 chars')).toBeInTheDocument()
    expect(screen.getByText('2000 → 0 chars')).toBeInTheDocument()
  })
})
