import React, { useState } from 'react'
import { useCurrentUser, useUpdateProfile, useUsageStats } from '@/services/query-hooks'
import { useTheme } from '@contexts/ThemeContext'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type SettingsSection = 'account' | 'password' | 'appearance' | 'subscription' | 'delete'

const NAV_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: 'account', label: 'General' },
  { id: 'password', label: 'Password' },
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
                backgroundColor: 'var(--sys-color-primary-40)',
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

const PasswordSection: React.FC = () => {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{current?: string; new?: string; confirm?: string}>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = async () => {
    const newErrors: {current?: string; new?: string; confirm?: string} = {}
    if (!currentPassword) newErrors.current = "password is required"
    if (!newPassword) newErrors.new = "password is required"
    else if (newPassword.length < 8) newErrors.new = "Password must be at least 8 characters"
    if (!confirmPassword) newErrors.confirm = "Please confirm your password"
    else if (newPassword !== confirmPassword) newErrors.confirm = "Passwords do not match"
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      await new Promise(r => setTimeout(r, 1500))
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setErrors({})
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Password" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FieldRow label="Current password">
            <div style={{ width: '100%' }}>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={e => { setCurrentPassword(e.target.value); if(errors.current) setErrors(prev => ({ ...prev, current: undefined })) }}
                style={{ ...inputStyle, borderColor: errors.current ? '#ef4444' : 'rgba(0,0,0,0.1)' }}
                onFocus={e => (e.target.style.borderColor = errors.current ? '#ef4444' : '#999')}
                onBlur={e => (e.target.style.borderColor = errors.current ? '#ef4444' : 'rgba(0,0,0,0.1)')}
              />
              {errors.current && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '4px 0 0 0' }}>{errors.current}</p>}
            </div>
          </FieldRow>

          <FieldRow label="New password">
            <div style={{ width: '100%', position: 'relative' }}>
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => { setNewPassword(e.target.value); if(errors.new) setErrors(prev => ({ ...prev, new: undefined })) }}
                style={{ ...inputStyle, paddingRight: 40, borderColor: errors.new ? '#ef4444' : 'rgba(0,0,0,0.1)' }}
                onFocus={e => (e.target.style.borderColor = errors.new ? '#ef4444' : '#999')}
                onBlur={e => (e.target.style.borderColor = errors.new ? '#ef4444' : 'rgba(0,0,0,0.1)')}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute', right: 12, top: errors.new ? '17px' : '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  color: '#666', display: 'flex',
                }}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.new && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '4px 0 0 0' }}>{errors.new}</p>}
            </div>
          </FieldRow>

          <FieldRow label="Confirm new password" noBorder>
            <div style={{ width: '100%', position: 'relative' }}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); if(errors.confirm) setErrors(prev => ({ ...prev, confirm: undefined })) }}
                style={{ ...inputStyle, paddingRight: 40, borderColor: errors.confirm ? '#ef4444' : 'rgba(0,0,0,0.1)' }}
                onFocus={e => (e.target.style.borderColor = errors.confirm ? '#ef4444' : '#999')}
                onBlur={e => (e.target.style.borderColor = errors.confirm ? '#ef4444' : 'rgba(0,0,0,0.1)')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute', right: 12, top: errors.confirm ? '17px' : '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  color: '#666', display: 'flex',
                }}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.confirm && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '4px 0 0 0' }}>{errors.confirm}</p>}
            </div>
          </FieldRow>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}>
            <button
              onClick={validate}
              disabled={loading}
              style={{ 
                padding: '8px 16px', 
                fontWeight: 500, 
                fontSize: '0.9rem',
                backgroundColor: success ? '#10b981' : 'var(--sys-color-primary-40)',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                minWidth: 140
              }}
            >
              {loading ? 'Updating...' : success ? 'Updated!' : 'Update password'}
            </button>
          </div>
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
  const navigate = useNavigate()

  const isFree = !user?.tier || user.tier === 'free'
  const isPro = user?.tier === 'pro'
  const isAgency = user?.tier === 'agency'

  const planName = isAgency ? 'Agency Plan' : isPro ? 'Pro Plan' : 'Free plan'
  const planTagline = isAgency ? 'Higher limits, team access' : isPro ? 'Create content at scale' : 'Start repurposing content'

  const features = isFree
    ? ['5 conversions per day', 'All supported platforms', 'Basic tone options', 'Copy to clipboard']
    : isPro
    ? ['Unlimited daily conversions', 'All supported platforms', 'Advanced tone matching', 'Priority AI processing', 'Early access to new platforms', 'Content history (30 days)']
    : ['Everything in Pro', 'Up to 5 team members', 'Unlimited content history', 'Custom tone presets', 'Priority support']

  const dailyUsed = usageStats?.daily_usage || 0
  const dailyLimit = usageStats?.daily_limit || 5

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Billing & Subscription" />
        <div style={{ paddingTop: 8 }}>

          {/* Current Plan Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            padding: '20px 0',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Plan Icon */}
              <div style={{
                width: 44, height: 44,
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#555',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
                  {isPro || isAgency ? (
                    <path d="M18 4l2.5 8h8.5l-7 5 2.5 8-7-5-7 5 2.5-8-7-5h8.5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  ) : (
                    <>
                      <circle cx="18" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M10 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{planName}</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#888' }}>{planTagline}</p>
              </div>
            </div>

            {isFree && (
              <button
                onClick={() => navigate('/upgrade')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#111',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Upgrade plan
              </button>
            )}
          </div>

          {/* Features List */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            {features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize: '0.875rem', color: '#555' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Usage */}
          {isFree && (
            <div style={{ padding: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 500 }}>Daily conversions</span>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>{dailyUsed} / {dailyLimit}</span>
              </div>
              <div style={{ height: 4, backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min((dailyUsed / dailyLimit) * 100, 100)}%`,
                  backgroundColor: dailyUsed >= dailyLimit ? '#ef4444' : 'var(--sys-color-primary-40, #6366f1)',
                  borderRadius: 2,
                  transition: 'width 0.3s',
                }} />
              </div>
            </div>
          )}
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


  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      height: '100%', 
      backgroundColor: '#fbfbfb',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      


      {/* Main Settings Container */}
      <div style={{
        display: 'flex',
        flex: 1,
        maxWidth: 1024,
        margin: '0 auto',
        width: '100%',
        padding: '48px 32px 64px 32px',
        gap: 64,
        overflow: 'hidden'
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
                  backgroundColor: isActive ? 'var(--sys-color-primary-95)' : 'transparent',
                  color: isActive ? 'var(--sys-color-primary-30)' : '#555',
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

        <main style={{ 
          flex: 1, 
          maxWidth: 680,
          paddingTop: 0,
          overflowY: 'auto',
          paddingRight: 16
        }}>
          {active === 'account' && <AccountSection />}
          {active === 'password' && <PasswordSection />}
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
