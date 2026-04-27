import React, { useState } from 'react'
import { useCurrentUser, useUpdateProfile } from '@/services/query-hooks'
import { useTheme } from '@/contexts/ThemeContext'
import { User, Palette, Wallet, Lock, Trash2, Eye, EyeOff } from 'lucide-react'

type SettingsSection = 'account' | 'password' | 'appearance' | 'billing' | 'delete'

const NAV_ITEMS: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
  { id: 'account', label: 'Account', icon: <User size={18} /> },
  { id: 'password', label: 'Password', icon: <Lock size={18} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
  { id: 'billing', label: 'Billing', icon: <Wallet size={18} /> },
  { id: 'delete', label: 'Delete Account', icon: <Trash2 size={18} /> },
]

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked ? "true" : "false"}
    aria-label={checked ? "Toggle off" : "Toggle on"}
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

          <Field label="What best describes your work?" htmlFor="work-function">
            <select
              id="work-function"
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

const PasswordSection: React.FC = () => {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{current?: string; new?: string; confirm?: string}>({})

  const validate = () => {
    const newErrors: {current?: string; new?: string; confirm?: string} = {}
    if (!currentPassword) newErrors.current = "password is required"
    if (!newPassword) newErrors.new = "password is required"
    else if (newPassword.length < 8) newErrors.new = "Password must be at least 8 characters"
    if (!confirmPassword) newErrors.confirm = "Please confirm your password"
    else if (newPassword !== confirmPassword) newErrors.confirm = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionDivider title="Password" subtitle="Update your password to keep your account secure." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <Field label="Current password" required>
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={e => { setCurrentPassword(e.target.value); if(errors.current) setErrors(prev => ({ ...prev, current: undefined })) }}
            onKeyDown={e => { if (e.key === 'Enter') document.getElementById('new-password')?.focus() }}
            style={{ ...inputStyle, borderColor: errors.current ? 'var(--sys-color-error-50)' : undefined }}
            onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
            onBlur={e => (e.target.style.borderColor = errors.current ? 'var(--sys-color-error-50)' : 'var(--sys-color-border-secondary)')}
          />
          {errors.current && <p style={{ fontSize: '0.78rem', color: 'var(--sys-color-error-50)', marginTop: 4 }}>{errors.current}</p>}
        </Field>
        <Field label="New password" required>
          <div style={{ position: 'relative' }}>
            <input
              id="new-password"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={e => { setNewPassword(e.target.value); if(errors.new) setErrors(prev => ({ ...prev, new: undefined })) }}
              onKeyDown={e => { if (e.key === 'Enter') document.getElementById('confirm-password')?.focus() }}
              style={{ ...inputStyle, paddingRight: 44, borderColor: errors.new ? 'var(--sys-color-error-50)' : undefined }}
              onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
              onBlur={e => (e.target.style.borderColor = errors.new ? 'var(--sys-color-error-50)' : 'var(--sys-color-border-secondary)')}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                color: 'var(--sys-color-neutral-40)', display: 'flex',
              }}
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.new && <p style={{ fontSize: '0.78rem', color: 'var(--sys-color-error-50)', marginTop: 4 }}>{errors.new}</p>}
        </Field>
        <Field label="Confirm new password" required>
          <div style={{ position: 'relative' }}>
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); if(errors.confirm) setErrors(prev => ({ ...prev, confirm: undefined })) }}
              onKeyDown={e => { if (e.key === 'Enter') validate() }}
              style={{ ...inputStyle, paddingRight: 44, borderColor: errors.confirm ? 'var(--sys-color-error-50)' : undefined }}
              onFocus={e => (e.target.style.borderColor = 'var(--sys-color-primary-60)')}
              onBlur={e => (e.target.style.borderColor = errors.confirm ? 'var(--sys-color-error-50)' : 'var(--sys-color-border-secondary)')}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                color: 'var(--sys-color-neutral-40)', display: 'flex',
              }}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirm && <p style={{ fontSize: '0.78rem', color: 'var(--sys-color-error-50)', marginTop: 4 }}>{errors.confirm}</p>}
        </Field>
        <button
          className="button button-filled"
          onClick={validate}
          style={{ padding: '12px 28px', fontWeight: 600, fontSize: '0.95rem', alignSelf: 'flex-start' }}
        >
          Update password
        </button>
      </div>
    </div>
  )
}

const DeleteSection: React.FC = () => {
  const [confirm, setConfirm] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionDivider title="Delete Account" subtitle="Permanently delete your account and all data." />
      <div style={{
        padding: 20,
        borderRadius: 12,
        border: '1px solid var(--sys-color-error-90)',
        backgroundColor: 'var(--sys-color-error-98)',
      }}>
        {!confirm ? (
          <>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--sys-color-neutral-20)', lineHeight: 1.5 }}>
              Once you delete your account, there is no going back. All your data, conversions, and saved content will be permanently removed.
            </p>
            <button
              className="button button-filled"
              onClick={() => setConfirm(true)}
              style={{ 
                padding: '10px 24px', 
                fontWeight: 600, 
                fontSize: '0.9rem', 
                backgroundColor: 'var(--sys-color-error-50)',
                color: 'white',
              }}
            >
              Delete my account
            </button>
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--sys-color-neutral-20)', fontWeight: 500 }}>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="button button-filled"
                style={{ 
                  padding: '10px 24px', 
                  fontWeight: 600, 
                  fontSize: '0.9rem', 
                  backgroundColor: 'var(--sys-color-error-50)',
                  color: 'white',
                }}
              >
                Yes, delete
              </button>
              <button
                className="button button-outlined"
                onClick={() => setConfirm(false)}
                style={{ padding: '10px 24px', fontWeight: 500, fontSize: '0.9rem' }}
              >
                No, cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const SettingsPage: React.FC = () => {
  const [active, setActive] = useState<SettingsSection>('account')

  return (
    <div style={{
      display: 'flex', height: '100%', overflow: 'hidden',
      backgroundColor: 'var(--sys-color-neutral-100)',
    }} className="settings-page">

      {/* Left Nav - Claude inspired sidebar */}
      <nav style={{
        width: 220, flexShrink: 0,
        padding: '24px 12px',
        borderRight: '1px solid var(--sys-color-border-tertiary)',
        display: 'flex', flexDirection: 'column', gap: 2,
        overflowY: 'auto',
        backgroundColor: 'var(--sys-color-neutral-100)',
      }} className="settings-nav">
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
      }} className="settings-main">
        {active === 'account' && <AccountSection />}
        {active === 'password' && <PasswordSection />}
        {active === 'appearance' && <AppearanceSection />}
        {active === 'billing' && <BillingSection />}
        {active === 'delete' && <DeleteSection />}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .settings-page { flex-direction: column !important; }
          .settings-nav { 
            width: 100% !important; 
            flex-direction: row !important;
            overflow-x: auto;
            padding: 12px 8px !important;
            border-right: none;
            border-bottom: 1px solid var(--sys-color-border-tertiary);
            gap: 4px !important;
          }
          .settings-nav h1 { display: none !important; }
          .settings-nav button {
            padding: 8px 12px !important;
            font-size: 0.8rem !important;
            white-space: nowrap;
          }
          .settings-main { 
            padding: 16px !important; 
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .settings-main { padding: 12px !important; }
        }
      `}</style>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionDivider title="Appearance" subtitle="Customize how ContentSplit looks." />
      <section>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--sys-color-neutral-20)', marginBottom: 12 }}>Color mode</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {modes.map(mode => {
            const isSelected = theme === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
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

// Billing section
const BillingSection: React.FC = () => {
  const { data: user } = useCurrentUser()
  const tier = user?.tier || 'free'
  const tiers = [
    { id: 'free', name: 'Free', price: 0, features: ['10 transformations/month', 'Basic tones'] },
    { id: 'pro', name: 'Pro', price: 5000, features: ['100 transformations/month', 'All tones', 'Priority support'] },
    { id: 'agency', name: 'Agency', price: 15000, features: ['Unlimited transformations', 'All tones', 'Team access'] },
  ]
  const currentPlan = tiers.find(t => t.id === tier) || tiers[0]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionDivider title="Billing" subtitle="Manage your subscription and credits." />
      
      {/* Current Plan Card */}
      <section style={{
        padding: 16,
        borderRadius: 12,
        border: '1px solid var(--sys-color-border-tertiary)',
        backgroundColor: 'var(--sys-color-neutral-98)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Plan</p>
            <h3 style={{ margin: '4px 0 0', fontSize: '1.2rem', fontWeight: 700, color: 'var(--sys-color-neutral-10)' }}>{currentPlan.name}</h3>
          </div>
          <span style={{
            padding: '4px 10px', borderRadius: 20,
            fontSize: '0.7rem', fontWeight: 600,
            backgroundColor: tier === 'free' ? 'var(--sys-color-neutral-90)' : 'var(--sys-color-primary-90)',
            color: tier === 'free' ? 'var(--sys-color-neutral-40)' : 'var(--sys-color-primary-30)',
          }}>
            {tier === 'free' ? 'Free' : 'Active'}
          </span>
        </div>
        
        {tier === 'free' && (
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--sys-color-border-tertiary)' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--sys-color-neutral-50)', marginBottom: 10 }}>Your usage this month</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: 'var(--sys-color-neutral-80)', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', backgroundColor: 'var(--sys-color-primary-40)', borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)', whiteSpace: 'nowrap' }}>1/10</span>
            </div>
            <button
              style={{
                width: '100%', padding: '10px 0', borderRadius: 8,
                backgroundColor: 'var(--sys-color-primary-40)',
                color: 'white', border: 'none', fontWeight: 600, fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Upgrade to Pro
            </button>
          </div>
        )}
      </section>
      
      {/* Usage Stats */}
      <section>
        <SectionDivider title="Usage" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{
            padding: 14, borderRadius: 10,
            border: '1px solid var(--sys-color-border-tertiary)',
            backgroundColor: 'var(--sys-color-neutral-98)',
          }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)' }}>Transformations</p>
            <p style={{ margin: '6px 0 0', fontSize: '1.4rem', fontWeight: 700, color: 'var(--sys-color-neutral-10)' }}>1</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: 'var(--sys-color-neutral-40)' }}>of 10 this month</p>
          </div>
          <div style={{
            padding: 14, borderRadius: 10,
            border: '1px solid var(--sys-color-border-tertiary)',
            backgroundColor: 'var(--sys-color-neutral-98)',
          }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)' }}>Saved</p>
            <p style={{ margin: '6px 0 0', fontSize: '1.4rem', fontWeight: 700, color: 'var(--sys-color-neutral-10)' }}>0</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: 'var(--sys-color-neutral-40)' }}>items saved</p>
          </div>
        </div>
      </section>
      
      {/* Payment Method */}
      {tier !== 'free' && (
        <section>
          <SectionDivider title="Payment method" />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 12, borderRadius: 8,
            border: '1px solid var(--sys-color-border-tertiary)',
            backgroundColor: 'var(--sys-color-neutral-98)',
          }}>
            <Wallet size={16} color="var(--sys-color-neutral-30)" />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--sys-color-neutral-10)', fontSize: '0.85rem' }}>Flutterwave / Debit Card</p>
            </div>
            <button style={{
              padding: '4px 10px', borderRadius: 4,
              backgroundColor: 'transparent', color: 'var(--sys-color-primary-50)',
              border: '1px solid var(--sys-color-primary-40)', fontSize: '0.75rem', fontWeight: 500,
              cursor: 'pointer',
            }}>
              Update
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default SettingsPage
