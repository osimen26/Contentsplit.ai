import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeadline, CardSupportingText, CardActions, CardAction } from './Card'

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('card-elevated')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="filled">Filled</Card>)
    expect(screen.getByText('Filled')).toHaveClass('card-filled')

    rerender(<Card variant="outlined">Outlined</Card>)
    expect(screen.getByText('Outlined')).toHaveClass('card-outlined')
  })

  it('renders with layout variants', () => {
    const { rerender } = render(<Card layout="media">Media</Card>)
    expect(screen.getByText('Media')).toHaveClass('card-media')

    rerender(<Card layout="text-only">Text Only</Card>)
    expect(screen.getByText('Text Only')).toHaveClass('card-text-only')

    rerender(<Card layout="actions">Actions</Card>)
    expect(screen.getByText('Actions')).toHaveClass('card-actions')

    rerender(<Card layout="dashboard">Dashboard</Card>)
    expect(screen.getByText('Dashboard')).toHaveClass('card-dashboard')
  })

  it('renders selected state', () => {
    render(<Card selected>Selected Card</Card>)
    expect(screen.getByText('Selected Card')).toHaveClass('selected')
  })

  it('renders disabled state', () => {
    render(<Card disabled>Disabled Card</Card>)
    expect(screen.getByText('Disabled Card')).toHaveClass('disabled')
  })

  it('applies custom className', () => {
    render(<Card className="custom-card">Custom</Card>)
    expect(screen.getByText('Custom')).toHaveClass('custom-card')
  })

  it('renders interactive card with role button', () => {
    render(<Card interactive>Interactive</Card>)
    const card = screen.getByRole('button', { name: /interactive/i })
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('tabindex', '0')
  })
})

describe('CardHeadline', () => {
  it('renders headline', () => {
    render(<CardHeadline>Headline</CardHeadline>)
    const headline = screen.getByRole('heading', { name: /headline/i })
    expect(headline).toBeInTheDocument()
    expect(headline).toHaveClass('card-headline')
  })
})

describe('CardSupportingText', () => {
  it('renders supporting text', () => {
    render(<CardSupportingText>Supporting text</CardSupportingText>)
    const text = screen.getByText('Supporting text')
    expect(text).toBeInTheDocument()
    expect(text).toHaveClass('card-supporting-text')
  })
})

describe('CardActions', () => {
  it('renders actions container', () => {
    render(<CardActions>Actions content</CardActions>)
    expect(screen.getByText('Actions content')).toHaveClass('card-actions')
  })

  it('renders with alignment', () => {
    render(<CardActions alignment="start">Start aligned</CardActions>)
    expect(screen.getByText('Start aligned')).toHaveClass('layout-justify-start')
  })
})

describe('CardAction', () => {
  it('renders primary action', () => {
    render(<CardAction variant="primary">Primary Action</CardAction>)
    const button = screen.getByRole('button', { name: /primary action/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('card-action-primary')
  })

  it('renders secondary action', () => {
    render(<CardAction variant="secondary">Secondary Action</CardAction>)
    const button = screen.getByRole('button', { name: /secondary action/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('card-action-secondary')
  })

  it('renders icon action', () => {
    render(<CardAction variant="icon" aria-label="Icon action" />)
    const button = screen.getByRole('button', { name: /icon action/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('card-action-icon')
  })
})
