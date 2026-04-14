import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EmptyStates } from './EmptyStates'

describe('EmptyStates', () => {
  it('renders with default props (first-use type, centered layout)', () => {
    render(<EmptyStates />)

    expect(screen.getByRole('heading', { name: /welcome to contentsplit.ai/i })).toBeInTheDocument()
    expect(
      screen.getByText(/get started by creating your first ai-powered content adaptation/i)
    ).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('renders different empty state types with correct defaults', () => {
    const { rerender } = render(<EmptyStates type="no-results" />)
    expect(screen.getByRole('heading', { name: /no results found/i })).toBeInTheDocument()
    expect(screen.getByText(/try adjusting your search or filter/i)).toBeInTheDocument()
    expect(screen.getByText('🔍')).toBeInTheDocument()

    rerender(<EmptyStates type="no-data" />)
    expect(screen.getByRole('heading', { name: /no data available/i })).toBeInTheDocument()
    expect(screen.getByText(/there is no data to display here yet/i)).toBeInTheDocument()
    expect(screen.getByText('📊')).toBeInTheDocument()

    rerender(<EmptyStates type="error" />)
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument()
    expect(screen.getByText(/we encountered an error while loading this page/i)).toBeInTheDocument()
    expect(screen.getByText('⚠️')).toBeInTheDocument()

    rerender(<EmptyStates type="no-permissions" />)
    expect(screen.getByRole('heading', { name: /access restricted/i })).toBeInTheDocument()
    expect(screen.getByText(/you don’t have permission to view this content/i)).toBeInTheDocument()
    expect(screen.getByText('🔒')).toBeInTheDocument()

    rerender(<EmptyStates type="ai-no-content" />)
    expect(
      screen.getByRole('heading', { name: /no ai content generated yet/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/start by entering your content and selecting platforms/i)
    ).toBeInTheDocument()
    expect(screen.getByText('🤖')).toBeInTheDocument()

    rerender(<EmptyStates type="ai-processing" />)
    expect(screen.getByRole('heading', { name: /processing your request/i })).toBeInTheDocument()
    expect(screen.getByText(/our ai is working on your request/i)).toBeInTheDocument()
    expect(screen.getByText('⏳')).toBeInTheDocument()

    rerender(<EmptyStates type="ai-error" />)
    expect(screen.getByRole('heading', { name: /ai processing failed/i })).toBeInTheDocument()
    expect(screen.getByText(/the ai service encountered an error/i)).toBeInTheDocument()
    expect(screen.getByText('❌')).toBeInTheDocument()
  })

  it('renders different layouts', () => {
    const { rerender } = render(<EmptyStates layout="centered" />)
    const centeredContainer = screen.getByRole('heading').closest('.empty-centered')
    expect(centeredContainer).toBeInTheDocument()

    rerender(<EmptyStates layout="side-by-side" />)
    const sideBySideContainer = screen.getByRole('heading').closest('.empty-side-by-side')
    expect(sideBySideContainer).toBeInTheDocument()

    rerender(<EmptyStates layout="compact" />)
    const compactContainer = screen.getByRole('heading').closest('.empty-compact')
    expect(compactContainer).toBeInTheDocument()
  })

  it('renders custom title, description, and icon', () => {
    const customIcon = <span data-testid="custom-icon">⭐</span>

    render(
      <EmptyStates
        type="no-results"
        title="Custom Title"
        description="Custom description text"
        icon={customIcon}
      />
    )

    expect(screen.getByRole('heading', { name: /custom title/i })).toBeInTheDocument()
    expect(screen.getByText(/custom description text/i)).toBeInTheDocument()
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders custom illustration when provided', () => {
    const customIllustration = <div data-testid="custom-illustration">Illustration</div>

    render(
      <EmptyStates
        type="no-results"
        title="Custom Title"
        description="Custom description text"
        illustration={customIllustration}
      />
    )

    expect(screen.getByRole('heading', { name: /custom title/i })).toBeInTheDocument()
    expect(screen.getByText(/custom description text/i)).toBeInTheDocument()
    expect(screen.getByTestId('custom-illustration')).toBeInTheDocument()
  })

  it('renders actions and handles clicks', () => {
    const handlePrimary = vi.fn()
    const handleSecondary = vi.fn()
    const handleLink = vi.fn()

    render(
      <EmptyStates
        actions={[
          { label: 'Primary Action', onClick: handlePrimary, variant: 'primary' },
          { label: 'Secondary Action', onClick: handleSecondary, variant: 'secondary' },
          { label: 'Link Action', onClick: handleLink, variant: 'link', icon: '🔗' },
        ]}
      />
    )

    const primaryButton = screen.getByRole('button', { name: /primary action/i })
    const secondaryButton = screen.getByRole('button', { name: /secondary action/i })
    const linkButton = screen.getByRole('button', { name: /link action/i })

    fireEvent.click(primaryButton)
    fireEvent.click(secondaryButton)
    fireEvent.click(linkButton)

    expect(handlePrimary).toHaveBeenCalledTimes(1)
    expect(handleSecondary).toHaveBeenCalledTimes(1)
    expect(handleLink).toHaveBeenCalledTimes(1)
  })

  it('does not render actions section when actions array is empty', () => {
    render(<EmptyStates actions={[]} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<EmptyStates className="custom-class" />)

    const container = screen.getByRole('heading').closest('.empty-first-use')
    expect(container).toHaveClass('custom-class')
  })

  it('applies appropriate CSS classes for type and layout', () => {
    const { rerender } = render(<EmptyStates type="no-results" layout="compact" />)
    let container = screen.getByRole('heading').closest('.empty-no-results')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('empty-compact')

    rerender(<EmptyStates type="first-use" layout="side-by-side" />)
    container = screen.getByRole('heading').closest('.empty-first-use')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('empty-side-by-side')
  })

  it('renders side-by-side layout with illustration and content sections', () => {
    const customIllustration = <div data-testid="test-illustration">Illustration</div>
    render(
      <EmptyStates
        layout="side-by-side"
        illustration={customIllustration}
        title="Side by Side"
        description="Description"
      />
    )

    expect(screen.getByTestId('test-illustration')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /side by side/i })).toBeInTheDocument()
    expect(screen.getByText(/description/i)).toBeInTheDocument()
  })
})
