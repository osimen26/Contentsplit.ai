import React, { useState } from 'react'
import { useCurrentUser, useUpdateProfile, useUsageStats } from '@/services/query-hooks'
import { useTheme } from '@contexts/ThemeContext'
import { TierUsagePanel } from '@components/application'
import { ArrowLeft } from 'lucide-react'
import { apiClient } from '@/services/api-client'
import { useNavigate } from 'react-router-dom'

type SettingsSection = 'account' | 'appearance' | 'subscription' | 'delete'

const NAV_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: 'account', label: 'General' },
  { id: 'appearance', label: 'Preferences' },
  { id: 'subscription', label: 'Billing' },
  { id: 'delete', label: 'Danger Zone' },
]

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked ? "true" : "false"}
    aria-label={checked ? "Toggle off" : "Toggle on"}
    onClick={() => onChange(!checked)}
    style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
      backgroundColor: checked ? '#10a37f' : 'var(--sys-color-neutral-80)', // Claude uses green or blue?
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

const FieldRow: React.FC<{ label: string; children: React.ReactNode; hint?: React.ReactNode; noBorder?: boolean }> = ({ label, children, hint, noBorder }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '16px 0', 
    borderBottom: noBorder ? 'none' : '1px solid rgba(0,0,0,0.05)',
    gap: 24
  }}>
    <div style={{ flex: 1, paddingRight: 24 }}>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>{label}</p>
      {hint && <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#666' }}>{hint}</p>}
    </div>
    <div style={{ flexShrink: 0, width: '100%', maxWidth: 360, display: 'flex', justifyContent: 'flex-end' }}>
      {children}
    </div>
  </div>
)

const FieldStack: React.FC<{ label: string; children: React.ReactNode; hint?: React.ReactNode; noBorder?: boolean }> = ({ label, children, hint, noBorder }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    padding: '16px 0', 
    borderBottom: noBorder ? 'none' : '1px solid rgba(0,0,0,0.05)',
    gap: 12
  }}>
    <div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>{label}</p>
      {hint && <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#666' }}>{hint}</p>}
    </div>
    <div style={{ width: '100%' }}>
      {children}
    </div>
  </div>
)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '6px',
  outline: 'none',
  fontSize: '0.9rem',
  color: '#333',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 style={{ 
    fontSize: '1.05rem', 
    fontWeight: 700, 
    color: '#111', 
    margin: '0 0 8px 0',
    paddingBottom: 16,
    borderBottom: '1px solid rgba(0,0,0,0.05)'
  }}>
    {title}
  </h2>
)

const ThemeModeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const modes: Array<{ id: 'light' | 'dark' | 'system'; label: string }> = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
  ]

  return (
    <div style={{ display: 'flex', gap: 0, backgroundColor: 'rgba(0,0,0,0.03)', padding: 4, borderRadius: 8 }}>
      {modes.map(mode => {
        const isSelected = theme === mode.id
        return (
          <button
            key={mode.id}
            onClick={() => setTheme(mode.id)}
            style={{
              flex: 1, padding: '6px 16px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: isSelected ? 'white' : 'transparent',
              color: isSelected ? '#111' : '#666',
              boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              fontSize: '0.85rem', fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}

const AccountSection: React.FC = () => {
  const { data: user } = useCurrentUser()
  const updateProfile = useUpdateProfile()
  const username = (user?.email || 'user@example.com').split('@')[0]
  const initials = username.slice(0, 2).toUpperCase()
  
  const [notifications, setNotifications] = useState({ responses: true })

  const getInitialValues = () => ({
    displayName: user?.displayName || username,
    nickname: user?.nickname || username,
    bio: user?.preferences || '',
  })

  const [initialValues] = useState(getInitialValues)
  const [displayName, setDisplayName] = useState(initialValues.displayName)
  const [nickname, setNickname] = useState(initialValues.nickname)
  const [bio, setBio] = useState(initialValues.bio)

  const handleSave = () => {
    updateProfile.mutate({
      displayName,
      nickname,
      preferences: bio,
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Profile */}
      <section>
        <SectionHeader title="Profile" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FieldRow label="Avatar">
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              backgroundColor: '#e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#374151', fontWeight: 600, fontSize: '1rem',
            }}>
              {initials}
            </div>
          </FieldRow>

          <FieldRow label="Full name">
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#999')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
            />
          </FieldRow>

          <FieldRow label="What should ContentSplit call you?">
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#999')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
            />
          </FieldRow>

          <FieldRow label="What best describes your work?">
            <select
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              onFocus={e => (e.target.style.borderColor = '#999')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
            >
              <option value="">Select</option>
              <option>Content Creator</option>
              <option>Marketing Manager</option>
              <option>Social Media Manager</option>
              <option>Copywriter</option>
            </select>
          </FieldRow>

          <FieldStack label="What personal preferences should ContentSplit consider in responses?" hint="e.g. keep explanations brief and to the point" noBorder>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5, fontFamily: 'inherit' }}
              onFocus={e => (e.target.style.borderColor = '#999')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
            />
          </FieldStack>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}>
            <button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              style={{ 
                padding: '8px 16px', 
                fontWeight: 500, 
                fontSize: '0.9rem',
                backgroundColor: '#111',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              {updateProfile.isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <SectionHeader title="Notifications" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FieldRow label="Response completions" noBorder>
            <Toggle
              checked={notifications.responses}
              onChange={v => setNotifications({ ...notifications, responses: v })}
            />
          </FieldRow>
        </div>
      </section>
    </div>
  )
}

const AppearanceSection: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Preferences" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FieldRow label="Color mode">
            <ThemeModeSelector />
          </FieldRow>
          <FieldRow label="Chat font">
            <select
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option>Default (System)</option>
              <option>Inter</option>
              <option>Serif</option>
            </select>
          </FieldRow>
          <FieldRow label="Voice" noBorder>
            <select
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option>Default</option>
              <option>Professional</option>
              <option>Casual</option>
            </select>
          </FieldRow>
        </div>
      </section>
    </div>
  )
}

const SubscriptionSection: React.FC<{ usageStats: any }> = ({ usageStats }) => {
  const { data: user } = useCurrentUser()

  const handleUpgrade = async (tier: string) => {
    try {
      const data = await apiClient.initiatePayment(tier)
      if (data.paymentLink) {
        window.location.href = data.paymentLink
      }
    } catch (err) {
      console.error('Payment initiation failed:', err)
      alert('Failed to initiate payment. Please try again.')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Billing & Subscription" />
        <div style={{ paddingTop: 16 }}>
          <TierUsagePanel
            currentPlan={{
              title: user?.tier === 'pro' ? 'Pro Plan' : user?.tier === 'agency' ? 'Agency Plan' : 'Free Plan',
              badge: user?.tier && user.tier !== 'free' ? 'Active' : undefined,
              description: user?.tier === 'pro' ? 'You have access to all premium features.' : 'You are currently on the free tier.',
              features: [
                { id: '1', text: user?.tier === 'pro' ? 'Unlimited conversions' : '5 conversions per day' },
                { id: '2', text: 'All target platforms' },
              ]
            }}
            usageStats={[
              {
                id: 'daily',
                title: 'Daily Usage',
                value: `${usageStats?.daily_usage || 0} / ${usageStats?.daily_limit || 5}`,
                label: 'Conversions today',
                progress: ((usageStats?.daily_usage || 0) / (usageStats?.daily_limit || 5)) * 100,
                progressVariant: (usageStats?.daily_usage || 0) >= (usageStats?.daily_limit || 5) ? 'error' : 'default'
              }
            ]}
            upgradeOptions={user?.tier === 'pro' ? [] : [
              {
                id: 'pro',
                title: 'Pro Plan',
                price: '$15',
                period: 'month',
                features: [
                  { id: '1', text: 'Unlimited daily conversions' },
                  { id: '2', text: 'Advanced tone matching' }
                ],
                recommended: true
              }
            ]}
            onUpgrade={(planId) => handleUpgrade(planId)}
          />
        </div>
      </section>
    </div>
  )
}

const DeleteSection: React.FC = () => {
  const [confirm, setConfirm] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Danger Zone" />
        <div style={{ paddingTop: 16 }}>
          {!confirm ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
               <div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#111', fontWeight: 500 }}>Delete Account</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#666' }}>Permanently remove your account and all data.</p>
               </div>
               <button
                onClick={() => setConfirm(true)}
                style={{ 
                  padding: '8px 16px', 
                  fontWeight: 500, 
                  fontSize: '0.85rem', 
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                Delete account
              </button>
            </div>
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
              <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: '#991b1b', fontWeight: 500 }}>
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  style={{ 
                    padding: '8px 16px', 
                    fontWeight: 500, 
                    fontSize: '0.85rem', 
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer'
                  }}
                >
                  Yes, delete my account
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  style={{ 
                    padding: '8px 16px', 
                    fontWeight: 500, 
                    fontSize: '0.85rem', 
                    backgroundColor: 'transparent',
                    border: '1px solid #fca5a5',
                    color: '#991b1b',
                    borderRadius: 6,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const SettingsPage: React.FC = () => {
  const [active, setActive] = useState<SettingsSection>('account')
  const { data: usageStats } = useUsageStats()
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100dvh', 
      backgroundColor: '#fbfbfb',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      {/* Top Header with Back Button */}
      <header style={{
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            color: '#666',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '8px 0',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#111'}
          onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </header>

      {/* Main Settings Container */}
      <div style={{
        display: 'flex',
        flex: 1,
        maxWidth: 1024,
        margin: '0 auto',
        width: '100%',
        padding: '0 32px 64px 32px',
        gap: 64
      }}>

        {/* Left Nav */}
        <aside style={{
          width: 200, 
          flexShrink: 0,
          display: 'flex', 
          flexDirection: 'column', 
          gap: 4,
        }}>
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#111', 
            margin: '0 0 24px 0',
            padding: '0 12px',
            fontFamily: 'ui-serif, Georgia, serif'
          }}>
            Settings
          </h1>
          
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: 'none',
                  backgroundColor: isActive ? '#f0f0f0' : 'transparent',
                  color: isActive ? '#111' : '#555',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {item.label}
              </button>
            )
          })}
        </aside>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          maxWidth: 680,
          paddingTop: 48
        }}>
          {active === 'account' && <AccountSection />}
          {active === 'appearance' && <AppearanceSection />}
          {active === 'subscription' && <SubscriptionSection usageStats={usageStats} />}
          {active === 'delete' && <DeleteSection />}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .settings-page > div { flex-direction: column !important; gap: 32px !important; }
          .settings-page aside { width: 100% !important; flex-direction: row !important; overflow-x: auto; gap: 8px !important; }
          .settings-page aside h1 { display: none !important; }
          .settings-page aside button { white-space: nowrap; }
          .settings-page main { padding-top: 0 !important; }
        }
      `}</style>
    </div>
  )
}

export default SettingsPage
