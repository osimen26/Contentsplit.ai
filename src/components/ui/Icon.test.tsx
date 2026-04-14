import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Icon, IconButton, IconToggle, IconWithText } from './Icon'

describe('Icon', () => {
  it('renders with default props', () => {
    render(<Icon>⭐</Icon>)
    const icon = screen.getByText('⭐')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('icon')
    expect(icon).toHaveClass('icon-filled')
    expect(icon).toHaveClass('icon-md')
  })

  it('renders with variant classes', () => {
    const { rerender } = render(<Icon variant="outlined">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-outlined')

    rerender(<Icon variant="rounded">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-rounded')

    rerender(<Icon variant="sharp">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-sharp')
  })

  it('renders with size classes', () => {
    const { rerender } = render(<Icon size="xs">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-xs')

    rerender(<Icon size="sm">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-sm')

    rerender(<Icon size="lg">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-lg')

    rerender(<Icon size="xl">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-xl')
  })

  it('renders with color classes', () => {
    const { rerender } = render(<Icon color="primary">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-primary')

    rerender(<Icon color="success">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-success')

    rerender(<Icon color="on-surface">⭐</Icon>)
    expect(screen.getByText('⭐')).toHaveClass('icon-on-surface')
  })

  it('renders interactive and decorative', () => {
    render(
      <Icon interactive decorative>
        ⭐
      </Icon>
    )
    const icon = screen.getByText('⭐')
    expect(icon).toHaveClass('icon-interactive')
    expect(icon).toHaveClass('icon-decorative')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('IconButton', () => {
  it('renders icon button with icon', () => {
    render(<IconButton>⭐</IconButton>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('icon-button')
    expect(button).toContainElement(screen.getByText('⭐'))
  })

  it('renders selected state', () => {
    render(<IconButton selected>⭐</IconButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('selected')
  })
})

describe('IconToggle', () => {
  it('renders icon toggle', () => {
    render(<IconToggle>⭐</IconToggle>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('icon-toggle')
  })

  it('renders toggled state', () => {
    render(<IconToggle toggled>⭐</IconToggle>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('selected')
  })
})

describe('IconWithText', () => {
  it('renders icon with text on left', () => {
    render(<IconWithText icon={<span>⭐</span>} text="Star" />)
    const container = screen.getByText('Star').closest('.icon-with-text')
    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent('⭐Star')
  })

  it('renders icon with text on right', () => {
    render(<IconWithText icon={<span>⭐</span>} text="Star" position="right" />)
    const container = screen.getByText('Star').closest('.icon-with-text')
    expect(container).toHaveTextContent('Star⭐')
  })
})
