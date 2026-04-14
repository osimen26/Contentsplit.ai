import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  TierUsagePanel,
  type PlanFeature,
  type UsageStat,
  type UpgradeOption,
  type BillingInfo,
} from './TierUsagePanel'

describe('TierUsagePanel', () => {
  const mockCurrentPlan = {
    title: 'Pro Plan',
    badge: 'Current',
    description: 'Advanced features for professional content creators',
    features: [
      { id: '1', text: 'Unlimited conversions' },
      { id: '2', text: 'Priority support' },
      { id: '3', text: 'Advanced analytics' },
    ] as PlanFeature[],
  }

  const mockUsageStats: UsageStat[] = [
    {
      id: 'credits',
      title: 'Credits Used',
      value: '1,250',
      label: 'of 5,000 monthly credits',
      progress: 25,
      progressVariant: 'default',
    },
    {
      id: 'conversions',
      title: 'Conversions',
      value: 48,
      label: 'this month',
      progress: 60,
      progressVariant: 'warning',
    },
    {
      id: 'storage',
      title: 'Storage Used',
      value: '2.5 GB',
      label: 'of 10 GB',
      progress: 25,
      progressVariant: 'default',
    },
  ]

  const mockUpgradeOptions: UpgradeOption[] = [
    {
      id: 'team',
      title: 'Team Plan',
      price: '$49',
      period: 'month',
      features: [
        { id: 'f1', text: 'Everything in Pro' },
        { id: 'f2', text: '5 team members' },
        { id: 'f3', text: 'Shared workspaces' },
      ],
      buttonText: 'Upgrade to Team',
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      price: '$199',
      period: 'month',
      features: [
        { id: 'f1', text: 'Everything in Team' },
        { id: 'f2', text: 'Unlimited seats' },
        { id: 'f3', text: 'Custom integrations' },
      ],
      recommended: true,
      buttonText: 'Contact Sales',
    },
  ]

  const mockBillingInfo: BillingInfo = {
    nextBillingDate: '2024-12-15',
    paymentMethod: 'Visa **** 1234',
    billingEmail: 'billing@example.com',
  }

  it('renders current plan with features', () => {
    render(<TierUsagePanel currentPlan={mockCurrentPlan} usageStats={[]} upgradeOptions={[]} />)

    expect(screen.getByText('Subscription & Usage')).toBeInTheDocument()
    expect(
      screen.getByText('Manage your plan, track usage, and upgrade your account')
    ).toBeInTheDocument()
    expect(screen.getByText('Pro Plan')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
    expect(
      screen.getByText('Advanced features for professional content creators')
    ).toBeInTheDocument()
    expect(screen.getByText('Unlimited conversions')).toBeInTheDocument()
    expect(screen.getByText('Priority support')).toBeInTheDocument()
    expect(screen.getByText('Advanced analytics')).toBeInTheDocument()
  })

  it('renders usage stats with progress bars', () => {
    const { container } = render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={[]}
      />
    )

    expect(screen.getByText('Credits Used')).toBeInTheDocument()
    expect(screen.getByText('1,250')).toBeInTheDocument()
    expect(screen.getByText('of 5,000 monthly credits')).toBeInTheDocument()
    expect(screen.getByText('Conversions')).toBeInTheDocument()
    expect(screen.getByText('48')).toBeInTheDocument()
    expect(screen.getByText('this month')).toBeInTheDocument()
    expect(screen.getByText('Storage Used')).toBeInTheDocument()
    expect(screen.getByText('2.5 GB')).toBeInTheDocument()
    expect(screen.getByText('of 10 GB')).toBeInTheDocument()

    // Check progress bars are present (they are divs with style width)
    const progressBars = container.querySelectorAll('.tier-usage-stat-progress-bar')
    expect(progressBars.length).toBe(3)
    expect(progressBars[0]).toHaveStyle('width: 25%')
    expect(progressBars[1]).toHaveStyle('width: 60%')
    expect(progressBars[2]).toHaveStyle('width: 25%')
  })

  it('renders upgrade options with recommended highlight', () => {
    render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={mockUpgradeOptions}
      />
    )

    expect(screen.getByText('Upgrade Your Plan')).toBeInTheDocument()
    expect(screen.getByText('Team Plan')).toBeInTheDocument()
    expect(screen.getByText('$49')).toBeInTheDocument()
    expect(screen.getAllByText('/month').length).toBe(2)
    expect(screen.getByText('Everything in Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
    expect(screen.getByText('$199')).toBeInTheDocument()
    expect(screen.getByText('Custom integrations')).toBeInTheDocument()
    expect(screen.getByText('Upgrade to Team')).toBeInTheDocument()
    expect(screen.getByText('Contact Sales')).toBeInTheDocument()

    // Recommended card should have recommended class (check via button style)
    const recommendedButton = screen.getByRole('button', { name: 'Contact Sales' })
    expect(recommendedButton).toHaveClass('button-filled')
    const regularButton = screen.getByRole('button', { name: 'Upgrade to Team' })
    expect(regularButton).toHaveClass('button-outlined')
  })

  it('calls onUpgrade when upgrade button is clicked', () => {
    const handleUpgrade = vi.fn()
    render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={mockUpgradeOptions}
        onUpgrade={handleUpgrade}
      />
    )

    const teamButton = screen.getByRole('button', { name: 'Upgrade to Team' })
    fireEvent.click(teamButton)
    expect(handleUpgrade).toHaveBeenCalledWith('team')

    const enterpriseButton = screen.getByRole('button', { name: 'Contact Sales' })
    fireEvent.click(enterpriseButton)
    expect(handleUpgrade).toHaveBeenCalledWith('enterprise')
  })

  it('renders billing information when provided', () => {
    render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={mockUpgradeOptions}
        billingInfo={mockBillingInfo}
      />
    )

    expect(screen.getByText('Billing Information')).toBeInTheDocument()
    expect(screen.getByText('Next Billing Date')).toBeInTheDocument()
    expect(screen.getByText('2024-12-15')).toBeInTheDocument()
    expect(screen.getByText('Payment Method')).toBeInTheDocument()
    expect(screen.getByText('Visa **** 1234')).toBeInTheDocument()
    expect(screen.getByText('Billing Email')).toBeInTheDocument()
    expect(screen.getByText('billing@example.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update Payment Method' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download Invoice' })).toBeInTheDocument()
  })

  it('calls onManageBilling when update payment method button clicked', () => {
    const handleManageBilling = vi.fn()
    render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={mockUpgradeOptions}
        billingInfo={mockBillingInfo}
        onManageBilling={handleManageBilling}
      />
    )

    const updateButton = screen.getByRole('button', { name: 'Update Payment Method' })
    fireEvent.click(updateButton)
    expect(handleManageBilling).toHaveBeenCalled()
  })

  it('does not render upgrade options section when empty array', () => {
    render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={[]}
      />
    )

    expect(screen.queryByText('Upgrade Your Plan')).not.toBeInTheDocument()
  })

  it('does not render billing section when billingInfo not provided', () => {
    render(
      <TierUsagePanel
        currentPlan={mockCurrentPlan}
        usageStats={mockUsageStats}
        upgradeOptions={mockUpgradeOptions}
      />
    )

    expect(screen.queryByText('Billing Information')).not.toBeInTheDocument()
  })
})
