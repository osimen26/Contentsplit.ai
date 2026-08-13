import React, { useState } from 'react'
import { useCurrentUser, useUpdateProfile, useUpdatePassword, useUsageStats, useDeleteAccount } from '@/services/query-hooks'
import TwitterConnectButton from '@/components/social/TwitterConnectButton'
import LinkedInConnectButton from '@/components/social/LinkedInConnectButton'
import InstagramConnectButton from '@/components/social/InstagramConnectButton'
import NewsletterAudiencePanel from '@/components/social/NewsletterAudiencePanel'
import PostsHistoryPanel from '@/components/social/PostsHistoryPanel'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type SettingsSection = 'account' | 'password' | 'appearance' | 'subscription' | 'integrations' | 'delete'

const NAV_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: 'account', label: 'General' },
  { id: 'password', label: 'Password' },
  { id: 'appearance', label: 'Preferences' },
  { id: 'subscription', label: 'Billing' },
  { id: 'integrations', label: 'Integrations' },
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
      backgroundColor: '#FFFFFF',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'left 0.2s',
    }} />
  </button>
)

const FieldRow: React.FC<{ label: string; children: React.ReactNode; hint?: React.ReactNode; noBorder?: boolean }> = ({ label, children, hint, noBorder }) => (
  <div className="field-row" style={{ 
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
  backgroundColor: '#FFFFFF',
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
              color: '#F0F0F5', fontWeight: 600, fontSize: '1rem',
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
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px', 
                fontWeight: 500, 
                fontSize: '0.9rem',
                lineHeight: 1,
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
  const updatePasswordMutation = useUpdatePassword()

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
      try {
        await updatePasswordMutation.mutateAsync({ currentPassword, newPassword })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2000)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setErrors({})
      } catch (err: any) {
        setErrors({ current: err.response?.data?.error || 'Failed to update password' })
      } finally {
        setLoading(false)
      }
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
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px', 
                fontWeight: 500, 
                fontSize: '0.9rem',
                lineHeight: 1,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SubscriptionSection: React.FC<{ usageStats: any }> = ({ usageStats }) => {
  const { data: user } = useCurrentUser()
  const navigate = useNavigate()

  const isFree = !user?.tier || user.tier === 'free'
  const isPro = user?.tier === 'pro'
  const isAgency = user?.tier === 'agency'

  const planName = isAgency ? 'Agency Plan' : isPro ? 'Pro Plan' : 'Free plan'
  const planTagline = isAgency ? 'Higher limits, team access' : isPro ? 'Create content at scale' : 'Start repurposing content'

  const features = isFree
    ? ['1 conversion per day', 'All supported platforms', 'Basic tone options', 'Copy to clipboard']
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
                  backgroundColor: 'var(--sys-color-primary-40)',
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
                  backgroundColor: dailyUsed >= dailyLimit ? '#ef4444' : 'var(--sys-color-primary-40, #111827)',
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

const IntegrationsSection: React.FC = () => {
  const { data: user } = useCurrentUser()
  const isPremium = user?.tier === 'pro' || user?.tier === 'agency'
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Social Publishing" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {!isPremium && (
            <div style={{
              padding: '14px 18px',
              backgroundColor: 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Pro feature</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#666' }}>
                  Upgrade to Pro or Agency to publish directly to X and more platforms.
                </p>
              </div>
              <button
                onClick={() => navigate('/upgrade')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--sys-color-primary-40)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Upgrade
              </button>
            </div>
          )}

          {/* X (Twitter) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#0F172A' }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.264 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>X (Twitter)</p>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#666' }}>
              Connect your X account to publish generated tweets directly from ContentSplit.
            </p>
            <div style={{ opacity: isPremium ? 1 : 0.45, pointerEvents: isPremium ? 'auto' : 'none' }}>
              <TwitterConnectButton />
            </div>
          </div>

          {/* LinkedIn */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#0A66C2' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>LinkedIn</p>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#666' }}>
              Connect your LinkedIn account to publish generated posts directly from ContentSplit.
            </p>
            <div style={{ opacity: isPremium ? 1 : 0.45, pointerEvents: isPremium ? 'auto' : 'none' }}>
              <LinkedInConnectButton />
            </div>
          </div>

          {/* Instagram */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E1306C' }}>
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Instagram</p>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#666' }}>
              Connect your Instagram Professional account to publish images and videos.
            </p>
            <div style={{ opacity: isPremium ? 1 : 0.45, pointerEvents: isPremium ? 'auto' : 'none' }}>
              <InstagramConnectButton />
            </div>
          </div>

          {/* Newsletter */}
          <NewsletterAudiencePanel />

          {/* Coming soon platforms */}
          {(['Facebook', 'Threads'] as const).map(name => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', opacity: 0.5 }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: '#333' }}>{name}</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#999' }}>Coming soon</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', backgroundColor: 'rgba(0,0,0,0.05)', padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>Soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* Post History */}
      <section>
        <SectionHeader title="Post History" />
        <PostsHistoryPanel />
      </section>
    </div>
  )
}

const DeleteSection: React.FC = () => {
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate()
  const deleteAccount = useDeleteAccount()

  const handleDelete = async () => {
    try {
      await deleteAccount.mutateAsync()
      navigate('/login')
    } catch (error) {
      console.error('Failed to delete account:', error)
    }
  }

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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 16px', 
                  fontWeight: 500, 
                  fontSize: '0.85rem', 
                  lineHeight: 1,
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  color: '#FF6B6B',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                Delete account
              </button>
            </div>
          ) : (
            <div style={{ padding: '20px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8 }}>
              <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: '#FF6B6B', fontWeight: 500 }}>
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={handleDelete}
                  disabled={deleteAccount.isPending}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 16px', 
                    fontWeight: 500, 
                    fontSize: '0.85rem', 
                    lineHeight: 1,
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: deleteAccount.isPending ? 'not-allowed' : 'pointer',
                    opacity: deleteAccount.isPending ? 0.7 : 1
                  }}
                >
                  {deleteAccount.isPending ? 'Deleting...' : 'Yes, delete my account'}
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 16px', 
                    fontWeight: 500, 
                    fontSize: '0.85rem', 
                    lineHeight: 1,
                    backgroundColor: 'transparent',
                    border: '1px solid #fca5a5',
                    color: '#FF6B6B',
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
      backgroundColor: '#F8FAFC',
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
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: isActive ? '1.5px solid #111' : '1.5px solid transparent',
                  backgroundColor: isActive ? 'var(--sys-color-primary-95)' : 'transparent',
                  color: isActive ? 'var(--sys-color-primary-30)' : '#555',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 400,
                  lineHeight: 1,
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
          {active === 'integrations' && <IntegrationsSection />}
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
