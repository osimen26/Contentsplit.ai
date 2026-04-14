import React from 'react'
import { TierUsagePanel } from '@components/application'

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-section">
      <h2 className="dashboard-section-title">Dashboard Overview</h2>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <h3 className="dashboard-stat-value">1,234</h3>
          <p className="dashboard-stat-label">Total Conversions</p>
        </div>
        <div className="dashboard-stat">
          <h3 className="dashboard-stat-value">567</h3>
          <p className="dashboard-stat-label">Credits Used</p>
        </div>
        <div className="dashboard-stat">
          <h3 className="dashboard-stat-value">89%</h3>
          <p className="dashboard-stat-label">Success Rate</p>
        </div>
        <div className="dashboard-stat">
          <h3 className="dashboard-stat-value">24</h3>
          <p className="dashboard-stat-label">Active Projects</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="button button-filled button-large">New Content</button>
        <button className="button button-outlined button-large">Import Content</button>
        <button className="button button-text button-large">View Templates</button>
      </div>

      <div className="dashboard-grid-3-col" style={{ marginTop: 'var(--sys-spacing-2xl)' }}>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h4 className="dashboard-card-title">Recent Conversions</h4>
            <span className="badge badge-md badge-success">Live</span>
          </div>
          <div className="dashboard-card-content">
            <p>
              Your latest content conversions appear here. Click any item to edit or regenerate.
            </p>
            <div className="layout-list" style={{ marginTop: 'var(--sys-spacing-md)' }}>
              <div className="layout-list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Blog Post - AI Trends</span>
                  <span className="badge badge-sm badge-info">Twitter</span>
                </div>
              </div>
              <div className="layout-list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Product Announcement</span>
                  <span className="badge badge-sm badge-success">LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h4 className="dashboard-card-title">AI Usage</h4>
            <span className="badge badge-md badge-warning">Monitor</span>
          </div>
          <div className="dashboard-card-content">
            <p>Track your AI model usage and optimize your credits.</p>
            <div className="progress-linear" style={{ marginTop: 'var(--sys-spacing-lg)' }}>
              <div className="progress-linear-indicator" style={{ width: '65%' }}></div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'var(--sys-spacing-sm)',
                fontFamily: 'var(--sys-typography-label-small-font-family)',
                fontSize: 'var(--sys-typography-label-small-font-size)',
                color: 'var(--sys-color-neutral-60)',
              }}
            >
              <span>65% used</span>
              <span>350/500 credits</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h4 className="dashboard-card-title">Quick Actions</h4>
            <span className="badge badge-md badge-neutral">Tips</span>
          </div>
          <div className="dashboard-card-content">
            <div className="layout-list">
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>📝</span>
                Create new content
              </button>
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>🔄</span>
                Regenerate previous
              </button>
              <button className="button button-text" style={{ justifyContent: 'flex-start' }}>
                <span style={{ marginRight: 'var(--sys-spacing-md)' }}>📊</span>
                View analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription & Usage Panel */}
      <div style={{ marginTop: 'var(--sys-spacing-2xl)' }}>
        <TierUsagePanel
          currentPlan={{
            title: 'Pro Plan',
            badge: 'Active',
            description:
              'Your current plan includes 10,000 credits per month with access to all AI models and priority support.',
            features: [
              { id: '1', text: '10,000 credits/month' },
              { id: '2', text: 'All AI models (GPT-4, Claude 3, Gemini)' },
              { id: '3', text: 'Priority email support' },
              { id: '4', text: 'Advanced analytics dashboard' },
            ],
          }}
          usageStats={[
            {
              id: 'credits',
              title: 'Credits Used',
              value: '1,234',
              label: 'of 10,000 total',
              progress: 65,
            },
            {
              id: 'conversions',
              title: 'Conversions',
              value: '42',
              label: 'this month',
              progress: 42,
            },
            { id: 'success', title: 'Success Rate', value: '89%', label: 'average', progress: 89 },
          ]}
          upgradeOptions={[
            {
              id: 'enterprise',
              title: 'Enterprise',
              price: '$99',
              period: 'month',
              features: [
                { id: 'f1', text: 'Unlimited credits' },
                { id: 'f2', text: 'Custom AI models' },
                { id: 'f3', text: 'Dedicated support' },
                { id: 'f4', text: 'Team collaboration' },
              ],
              buttonText: 'Contact Sales',
            },
          ]}
          billingInfo={{
            nextBillingDate: '2025-05-14',
            paymentMethod: 'Visa **** 4242',
            billingEmail: 'john@example.com',
          }}
        />
      </div>
    </div>
  )
}

export default DashboardPage
