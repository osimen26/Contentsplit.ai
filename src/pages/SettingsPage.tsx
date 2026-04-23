import React, { useState } from 'react'
import { useCurrentUser, useUpdateProfile } from '@/services/query-hooks'
import { useTheme } from '@/contexts/ThemeContext'
import { User, Palette, CreditCard } from 'lucide-react'

type SettingsSection = 'account' | 'appearance' | 'billing'

const NAV_ITEMS: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
  { id: 'account', label: 'Account', icon: <User size={18} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
]

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

const ThemeModeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const modes: Array<{ id: 'light' | 'dark' | 'system'; label: string }> = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
  ]

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {modes.map(mode => {
        const isSelected = theme === mode.id
        return (
          <button
            key={mode.id}
            onClick={() => setTheme(mode.id)}
            style={{
              width: 100, padding: '10px 0',
              borderRadius: 10,
              border: isSelected ? '2px solid var(--sys-color-primary-40)' : '1px solid var(--sys-color-border-tertiary)',
              backgroundColor: mode.id === 'dark' ? '#1a1a1a' : mode.id === 'system' ? 'linear-gradient(135deg,#fff 50%,#1a1a1a 50%)' : 'var(--sys-color-neutral-98)',
              color: mode.id === 'dark' ? 'white' : 'var(--sys-color-neutral-20)',
              fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
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
  const tier = user?.tier === 'pro' ? 'Pro' : user?.tier === 'agency' ? 'Enterprise' : 'Free'
  const [notifications, setNotifications] = useState({ responses: true, dispatch: false })

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

  const handleCancel = () => {
    const reset = getInitialValues()
    setDisplayName(reset.displayName)
    setNickname(reset.nickname)
    setBio(reset.bio)
  }

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
            <button
              className="button button-filled"
              onClick={handleSave}
              disabled={updateProfile.isPending}
              style={{ padding: '10px 28px', fontWeight: 600, fontSize: '0.9rem' }}
            >
              {updateProfile.isPending ? 'Saving...' : 'Save changes'}
            </button>
            <button
              className="button button-outlined"
              onClick={handleCancel}
              disabled={updateProfile.isPending}
              style={{ padding: '10px 20px', fontWeight: 500, fontSize: '0.9rem' }}
            >
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
          <ThemeModeSelector />
        </div>
      </section>
    </div>
  )
}

const SettingsPage: React.FC = () => {
  const [active, setActive] = useState<SettingsSection>('account')

  return (
    <div style={{
      display: 'flex', height: '100%', overflow: 'hidden',
      backgroundColor: 'var(--sys-color-neutral-100)',
    }}>

      {/* Left Nav - Claude inspired sidebar */}
      <nav style={{
        width: 220, flexShrink: 0,
        padding: '24px 12px',
        borderRight: '1px solid var(--sys-color-border-tertiary)',
        display: 'flex', flexDirection: 'column', gap: 2,
        overflowY: 'auto',
        backgroundColor: 'var(--sys-color-neutral-100)',
      }}>
        <h1 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 600, 
          color: 'var(--sys-color-neutral-10)', 
          marginBottom: 24,
          padding: '0 12px',
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
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                backgroundColor: isActive ? 'var(--sys-color-neutral-90)' : 'transparent',
                color: isActive ? 'var(--sys-color-neutral-10)' : 'var(--sys-color-neutral-40)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ 
                color: isActive ? 'var(--sys-color-primary-50)' : 'var(--sys-color-neutral-40)',
                display: 'flex',
              }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '32px 40px', 
        overflowY: 'auto', 
        maxWidth: 680,
      }}>
        {active === 'account' && <AccountSection />}
        {active === 'appearance' && <AppearanceSection />}
        {active === 'billing' && <BillingSection />}
      </main>
    </div>
  )
}

// Appearance section component
const AppearanceSection: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const modes: Array<{ id: 'light' | 'dark' | 'system'; label: string }> = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <SectionDivider title="Appearance" subtitle="Customize how ContentSplit looks." />
      <section>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--sys-color-neutral-20)', marginBottom: 12 }}>Color mode</p>
        <div style={{ display: 'flex', gap: 12 }}>
          {modes.map(mode => {
            const isSelected = theme === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                style={{
                  width: 100, padding: '12px 0',
                  borderRadius: 10,
                  border: isSelected ? '2px solid var(--sys-color-primary-40)' : '1px solid var(--sys-color-border-tertiary)',
                  backgroundColor: mode.id === 'dark' ? '#1a1a1a' : mode.id === 'system' ? 'linear-gradient(135deg,#fff 50%,#1a1a1a 50%)' : 'var(--sys-color-neutral-98)',
                  color: mode.id === 'dark' ? 'white' : 'var(--sys-color-neutral-20)',
                  fontSize: '0.85rem', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {mode.label}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

// Billing section placeholder  
const BillingSection: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    <SectionDivider title="Billing" subtitle="Manage your subscription and credits." />
    <p style={{ color: 'var(--sys-color-neutral-50)' }}>Billing settings coming soon.</p>
  </div>
)

export default SettingsPage
