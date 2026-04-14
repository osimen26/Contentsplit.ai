import React from 'react'

export interface PlanFeature {
  id: string
  text: string
}

export interface UsageStat {
  id: string
  title: string
  value: string | number
  label: string
  progress?: number
  progressVariant?: 'default' | 'warning' | 'error'
}

export interface UpgradeOption {
  id: string
  title: string
  price: string
  period: string
  features: PlanFeature[]
  recommended?: boolean
  buttonText?: string
}

export interface BillingInfo {
  nextBillingDate: string
  paymentMethod: string
  billingEmail: string
}

export interface TierUsagePanelProps {
  currentPlan: {
    title: string
    badge?: string
    description: string
    features: PlanFeature[]
  }
  usageStats: UsageStat[]
  upgradeOptions: UpgradeOption[]
  billingInfo?: BillingInfo
  onUpgrade?: (planId: string) => void
  onManageBilling?: () => void
}

export const TierUsagePanel: React.FC<TierUsagePanelProps> = ({
  currentPlan,
  usageStats,
  upgradeOptions,
  billingInfo,
  onUpgrade,
  onManageBilling,
}) => {
  return (
    <div className="tier-usage-panel">
      {/* Header */}
      <div className="tier-usage-panel-header">
        <div>
          <h2 className="tier-usage-panel-title">Subscription & Usage</h2>
          <p className="tier-usage-panel-subtitle">
            Manage your plan, track usage, and upgrade your account
          </p>
        </div>
      </div>

      {/* Current Plan Card */}
      <div className="tier-usage-current-plan">
        <div className="tier-usage-current-plan-header">
          <h3 className="tier-usage-current-plan-title">{currentPlan.title}</h3>
          {currentPlan.badge && (
            <span className="tier-usage-current-plan-badge">{currentPlan.badge}</span>
          )}
        </div>
        <p className="tier-usage-current-plan-description">{currentPlan.description}</p>
        <div className="tier-usage-current-plan-features">
          {currentPlan.features.map((feature) => (
            <div key={feature.id} className="tier-usage-current-plan-feature">
              <span className="tier-usage-current-plan-feature-icon">✓</span>
              <span className="tier-usage-current-plan-feature-text">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="tier-usage-stats">
        {usageStats.map((stat) => (
          <div key={stat.id} className="tier-usage-stat">
            <div className="tier-usage-stat-header">
              <h4 className="tier-usage-stat-title">{stat.title}</h4>
            </div>
            <div className="tier-usage-stat-value">{stat.value}</div>
            <div className="tier-usage-stat-label">{stat.label}</div>
            {stat.progress !== undefined && (
              <div className="tier-usage-stat-progress">
                <div
                  className={`tier-usage-stat-progress-bar ${stat.progressVariant || 'default'}`}
                  style={{ width: `${Math.min(100, Math.max(0, stat.progress))}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upgrade Options */}
      {upgradeOptions.length > 0 && (
        <div className="tier-usage-upgrade-options">
          <h3 className="tier-usage-upgrade-title">Upgrade Your Plan</h3>
          <div className="tier-usage-upgrade-grid">
            {upgradeOptions.map((option) => (
              <div
                key={option.id}
                className={`tier-usage-upgrade-card ${option.recommended ? 'recommended' : ''}`}
              >
                <div className="tier-usage-upgrade-card-header">
                  <h4 className="tier-usage-upgrade-card-title">{option.title}</h4>
                  <div>
                    <div className="tier-usage-upgrade-card-price">{option.price}</div>
                    <div className="tier-usage-upgrade-card-period">/{option.period}</div>
                  </div>
                </div>
                <div className="tier-usage-upgrade-card-features">
                  {option.features.map((feature) => (
                    <div key={feature.id} className="tier-usage-upgrade-card-feature">
                      <span className="tier-usage-upgrade-card-feature-icon">✓</span>
                      <span className="tier-usage-upgrade-card-feature-text">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`button ${option.recommended ? 'button-filled' : 'button-outlined'}`}
                  style={{ width: '100%' }}
                  onClick={() => onUpgrade?.(option.id)}
                >
                  {option.buttonText || (option.recommended ? 'Upgrade Now' : 'Select Plan')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing Information */}
      {billingInfo && (
        <div className="tier-usage-billing">
          <h3 className="tier-usage-billing-title">Billing Information</h3>
          <div className="tier-usage-billing-details">
            <div className="tier-usage-detail-item">
              <span className="tier-usage-detail-label">Next Billing Date</span>
              <span className="tier-usage-detail-value">{billingInfo.nextBillingDate}</span>
            </div>
            <div className="tier-usage-detail-item">
              <span className="tier-usage-detail-label">Payment Method</span>
              <span className="tier-usage-detail-value">{billingInfo.paymentMethod}</span>
            </div>
            <div className="tier-usage-detail-item">
              <span className="tier-usage-detail-label">Billing Email</span>
              <span className="tier-usage-detail-value">{billingInfo.billingEmail}</span>
            </div>
          </div>
          <div className="tier-usage-billing-action">
            <button className="button button-text" onClick={onManageBilling}>
              Update Payment Method
            </button>
            <button className="button button-filled">Download Invoice</button>
          </div>
        </div>
      )}
    </div>
  )
}
