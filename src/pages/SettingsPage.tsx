import React, { useState } from 'react'
import { useCurrentUser } from '@/services/query-hooks'
import { TierUsagePanel } from '@components/application'

type SettingsSection = 'general' | 'account' | 'billing' | 'notifications'

const NAV_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing' },
]

// Small iOS-style toggle
const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
      backgroundColor: checked ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-80)',
      position: 'relative', transition: 'background-color 0.2s', flexShrink: 0,
      padding: 0,
    }}
  >
    <span style={{
      position: 'absolute', top: 2,
      left: checked ? 22 : 2,
      width: 20, height: 20,
      borderRadius: '50%',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'left 0.2s',
    }} />
  </button>
)

// Labelled form field
const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode; hint?: string }> = ({
  label, required, children, hint
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--sys-color-neutral-20)' }}>
      {label}{required && <span style={{ color: 'var(--sys-color-error-50)', marginLeft: 2 }}>*</span>}
    </label>
    {children}
    {hint && <p style={{ fontSize: '0.78rem', color: 'var(--sys-color-neutral-50)', margin: 0 }}>{hint}</p>}
  </div>
)

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  border: '1px solid var(--sys-color-border-secondary)',
  borderRadius: 8, outline: 'none',
  fontSize: '0.9rem', color: 'var(--sys-color-neutral-10)',
  backgroundColor: 'var(--sys-color-neutral-99)',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

const SectionDivider: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div style={{ paddingBottom: 20, marginBottom: 4 }}>
    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--sys-color-neutral-10)', margin: 0 }}>{title}</h2>
    {subtitle && <p style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)', margin: '4px 0 0' }}>{subtitle}</p>}
  </div>
)

const GeneralSection: React.FC = () => {
  const { data: user } = useCurrentUser()
  const username = (user?.email || 'user@example.com').split('@')[0]
  const initials = username.slice(0, 2).toUpperCase()
  const tier = user?.tier === 'pro' ? 'Pro' : user?.tier === 'agency' ? 'Enterprise' : 'Free'
  const [notifications, setNotifications] = useState({ responses: true, dispatch: false })
  const [displayName, setDisplayName] = useState(username)
  const [nickname, setNickname]       = useState(username)
  const [bio, setBio]                 = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      {/* ── Profile Avatar Card ── */}
      <section>
        <SectionDivider title="Profile" subtitle="Manage your personal information and how ContentSplit identifies you." />

        {/* Avatar row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          padding: '20px 24px',
          borderRadius: 14,
          border: '1px solid var(--sys-color-border-tertiary)',
          backgroundColor: 'var(--sys-color-neutral-98)',
          marginBottom: 24,
        }}>
          {/* Avatar with edit overlay */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 68, height: 68, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--sys-color-primary-60), var(--sys-color-primary-30))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '1.4rem',
              boxShadow: '0 4px 14px var(--sys-color-primary-90)',
            }}>
              {initials}
            </div>
            <button style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 22, height: 22, borderRadius: '50%',
              backgroundColor: 'var(--sys-color-neutral-10)',
              color: 'white', border: '2px solid var(--sys-color-neutral-99)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '11px',
            }} aria-label="Change avatar">✎</button>
          </div>

          {/* Name + meta */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: 'var(--sys-color-neutral-10)' }}>{displayName}</p>
            <p style={{ margin: '2px 0 8px', fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email || 'user@example.com'}
            </p>
            <span style={{
              display: 'inline-block',
              padding: '2px 10px', borderRadius: 20,
              fontSize: '0.75rem', fontWeight: 600,
              backgroundColor: tier === 'Free' ? 'var(--sys-color-neutral-90)' : 'var(--sys-color-primary-90)',
              color: tier === 'Free' ? 'var(--sys-color-neutral-40)' : 'var(--sys-color-primary-30)',
            }}>
              {tier} Plan
            </span>
          </div>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Display name">
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your full name"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
                onBlur={e => (e.target.style.borderColor = 'var(--sys-color-border-secondary)')}
              />
            </Field>
            <Field label="Nickname" required hint="How ContentSplit will address you in responses">
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="e.g. Victor"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
                onBlur={e => (e.target.style.borderColor = 'var(--sys-color-border-secondary)')}
              />
            </Field>
          </div>

          <Field label="Email address">
            <input
              type="email"
              defaultValue={user?.email || ''}
              placeholder="you@example.com"
              style={{ ...inputStyle, color: 'var(--sys-color-neutral-40)' }}
              readOnly
            />
          </Field>

          <Field label="What best describes your work?">
            <select
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
              onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
              onBlur={e => (e.target.style.borderColor = 'var(--sys-color-border-secondary)')}
            >
              <option value="">Select your work function</option>
              <option>Content Creator</option>
              <option>Marketing Manager</option>
              <option>Social Media Manager</option>
              <option>Copywriter</option>
              <option>Journalist / Blogger</option>
              <option>Entrepreneur</option>
              <option>Other</option>
            </select>
          </Field>

          <Field
            label="Personal content preferences"
            hint="These preferences will apply to all generated outputs."
          >
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="e.g. keep posts concise and punchy, avoid jargon, use emojis sparingly"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit' }}
              onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
              onBlur={e => (e.target.style.borderColor = 'var(--sys-color-border-secondary)')}
            />
          </Field>

          {/* Actions */}
          <div style={{
            display: 'flex', gap: 10, alignItems: 'center',
            paddingTop: 8,
            borderTop: '1px solid var(--sys-color-border-tertiary)',
            marginTop: 4,
          }}>
            <button className="button button-filled" style={{ padding: '10px 28px', fontWeight: 600, fontSize: '0.9rem' }}>
              Save changes
            </button>
            <button className="button button-outlined" style={{ padding: '10px 20px', fontWeight: 500, fontSize: '0.9rem' }}>
              Cancel
            </button>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--sys-color-border-tertiary)', margin: 0 }} />

      {/* Notifications */}
      <section>
        <SectionDivider title="Notifications" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            {
              key: 'responses' as const,
              title: 'Generation completions',
              desc: 'Get notified when ContentSplit has finished generating your content.',
            },
            {
              key: 'dispatch' as const,
              title: 'Product updates',
              desc: 'Receive emails about new features and improvements.',
            },
          ].map(item => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem', color: 'var(--sys-color-neutral-10)' }}>{item.title}</p>
                <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: 'var(--sys-color-neutral-50)', lineHeight: 1.4 }}>{item.desc}</p>
              </div>
              <Toggle
                checked={notifications[item.key]}
                onChange={v => setNotifications(prev => ({ ...prev, [item.key]: v }))}
              />
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--sys-color-border-tertiary)', margin: 0 }} />

      {/* Appearance */}
      <section>
        <SectionDivider title="Appearance" />
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--sys-color-neutral-20)', marginBottom: 12 }}>Color mode</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Light', 'Dark', 'System'].map(mode => (
              <button
                key={mode}
                style={{
                  width: 100, padding: '10px 0',
                  borderRadius: 10,
                  border: mode === 'Light' ? '2px solid var(--sys-color-primary-40)' : '1px solid var(--sys-color-border-tertiary)',
                  backgroundColor: mode === 'Dark' ? '#1a1a1a' : mode === 'System' ? 'linear-gradient(135deg,#fff 50%,#1a1a1a 50%)' : 'var(--sys-color-neutral-98)',
                  color: mode === 'Dark' ? 'white' : 'var(--sys-color-neutral-20)',
                  fontSize: '0.8rem', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const SettingsPage: React.FC = () => {
  const [active, setActive] = useState<SettingsSection>('general')

  return (
    <div style={{
      display: 'flex', height: '100%', overflow: 'hidden',
      backgroundColor: 'var(--sys-color-neutral-99)',
    }}>

      {/* Left Nav */}
      <nav style={{
        width: 200, flexShrink: 0,
        padding: '40px 24px',
        borderRight: '1px solid var(--sys-color-border-tertiary)',
        display: 'flex', flexDirection: 'column', gap: 0,
        overflowY: 'auto',
      }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--sys-color-neutral-10)', marginBottom: 24 }}>Settings</h1>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              display: 'block', width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              marginBottom: 2,
              borderRadius: 7,
              border: 'none',
              backgroundColor: active === item.id ? 'var(--sys-color-neutral-90)' : 'transparent',
              color: active === item.id ? 'var(--sys-color-neutral-10)' : 'var(--sys-color-neutral-40)',
              fontSize: '0.9rem',
              fontWeight: active === item.id ? 500 : 400,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.backgroundColor = 'var(--sys-color-neutral-93)' }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto', maxWidth: 760 }}>
        {active === 'general' && <GeneralSection />}
        {active === 'account' && (
          <div>
            <SectionDivider title="Account" />
            <p style={{ color: 'var(--sys-color-neutral-50)' }}>Account settings coming soon.</p>
          </div>
        )}
        {active === 'notifications' && (
          <div>
            <SectionDivider title="Notifications" />
            <p style={{ color: 'var(--sys-color-neutral-50)' }}>Notification preferences are available in General.</p>
          </div>
        )}
        {active === 'billing' && (
          <TierUsagePanel
            currentPlan={{
              title: 'Free Plan',
              badge: 'Active',
              description: 'You are on the free tier with limited monthly credits.',
              features: [
                { id: '1', text: '5,000 credits/month' },
                { id: '2', text: 'Twitter, LinkedIn, Instagram, Email' },
                { id: '3', text: 'Community support' },
              ],
            }}
            usageStats={[
              { id: 'credits', title: 'Credits Used', value: '1,234', label: 'of 5,000 total', progress: 25 },
              { id: 'conversions', title: 'Conversions', value: '12', label: 'this month', progress: 24 },
              { id: 'success', title: 'Success Rate', value: '94%', label: 'average', progress: 94 },
            ]}
            upgradeOptions={[
              {
                id: 'pro', title: 'Pro', price: '$19', period: 'month',
                features: [
                  { id: 'f1', text: '30,000 credits/month' },
                  { id: 'f2', text: 'Priority support' },
                  { id: 'f3', text: 'Advanced analytics' },
                ],
                buttonText: 'Upgrade to Pro',
              },
            ]}
            billingInfo={{ nextBillingDate: '—', paymentMethod: 'None', billingEmail: '' }}
          />
        )}
      </main>
    </div>
  )
}

export default SettingsPage
