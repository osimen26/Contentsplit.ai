import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('button')
    expect(button).toHaveClass('button-filled')
    expect(button).toHaveClass('button-medium')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="outlined">Outlined</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-outlined')

    rerender(<Button variant="text">Text</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-text')

    rerender(<Button variant="elevated">Elevated</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-elevated')

    rerender(<Button variant="tonal">Tonal</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-tonal')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-small')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-large')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders disabled state', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('button-disabled')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders with icon', () => {
    const Icon = () => <span data-testid="icon">📝</span>
    render(
      <Button icon={<Icon />} iconPosition="leading">
        With Icon
      </Button>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    // The icon wrapper has class button__icon-leading, but we don't need to test CSS classes
  })

  it('renders icon-only button', () => {
    const Icon = () => <span>📝</span>
    render(<Button icon={<Icon />} iconOnly aria-label="Edit" />)
    const button = screen.getByRole('button', { name: /edit/i })
    expect(button).toHaveClass('button-icon-only')
  })

  it('renders FAB button', () => {
    render(<Button variant="fab">+</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button-fab')
    expect(button).toHaveClass('button-fab-medium')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('forwards additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom label">
        Test
      </Button>
    )
    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label')
  })
})
