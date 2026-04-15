import React, { useState } from 'react'
import { SettingsProfile, TierUsagePanel } from '@components/application'

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'billing'>('profile')

  return (
    <div className="settings-page" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-xl)' }}>
      <div style={{ paddingBottom: 'var(--sys-spacing-md)', borderBottom: '1px solid var(--sys-color-border-tertiary)' }}>
        <h1 style={{ marginBottom: 'var(--sys-spacing-lg)', fontFamily: 'var(--sys-typography-headline-small-font-family)', fontSize: 'var(--sys-typography-headline-small-font-size)' }}>Settings</h1>
        <div style={{ display: 'flex', gap: 'var(--sys-spacing-lg)' }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: 'var(--sys-spacing-sm) 0',
              fontWeight: 600,
              color: activeTab === 'profile' ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)',
              borderBottom: activeTab === 'profile' ? '2px solid var(--sys-color-primary-40)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            style={{
              padding: 'var(--sys-spacing-sm) 0',
              fontWeight: 600,
              color: activeTab === 'billing' ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)',
              borderBottom: activeTab === 'billing' ? '2px solid var(--sys-color-primary-40)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Billing & Subscription
          </button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {activeTab === 'profile' ? (
          <SettingsProfile />
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default SettingsPage
