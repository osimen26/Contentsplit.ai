import React, { useState, useEffect } from 'react'
import { useCurrentUser, useUpdateProfile, useUpdatePassword, useDeleteAccount } from '@/services/query-hooks'
import TwitterConnectButton from '@/components/social/TwitterConnectButton'
import LinkedInConnectButton from '@/components/social/LinkedInConnectButton'
import InstagramConnectButton from '@/components/social/InstagramConnectButton'
import FacebookConnectButton from '@/components/social/FacebookConnectButton'
import ThreadsConnectButton from '@/components/social/ThreadsConnectButton'
import NewsletterAudiencePanel from '@/components/social/NewsletterAudiencePanel'
import PostsHistoryPanel from '@/components/social/PostsHistoryPanel'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type SettingsSection = 'account' | 'password' | 'appearance' | 'integrations' | 'delete'

const NAV_ITEMS: { id: SettingsSection; label: string }[] = [
  { id: 'account', label: 'General' },
  { id: 'password', label: 'Password' },
  { id: 'appearance', label: 'Preferences' },
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
      backgroundColor: checked ? '#0F172A' : 'var(--sys-color-neutral-80)',
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
                backgroundColor: '#0F172A',
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
    else if (!/(?=.*\d)/.test(newPassword)) newErrors.new = "Password must include at least one number"
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
                backgroundColor: '#0F172A',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px', 
                fontWeight: 500, 
                fontSize: '0.9rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
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


const IntegrationsSection: React.FC = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <section>
        <SectionHeader title="Social Publishing" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

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
            <div>
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
            <div>
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
            <div>
              <InstagramConnectButton />
            </div>
          </div>

          {/* Newsletter */}
          <NewsletterAudiencePanel />

          {/* Facebook */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#1877F2' }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Facebook</p>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#666' }}>
              Connect your Facebook Page to publish content directly.
            </p>
            <div>
              <FacebookConnectButton />
            </div>
          </div>

          {/* Threads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#000000' }}>
                <path d="M12.002 0c6.627 0 12 5.373 12 12s-5.373 12-12 12c-6.627 0-12-5.373-12-12S5.375 0 12.002 0zm-1.847 16.903c1.782 0 3.195-1.077 3.655-2.617h-.058c-.522.688-1.503 1.137-2.662 1.137-2.316 0-4.004-1.781-4.004-4.225 0-2.43 1.638-4.24 3.99-4.24 1.258 0 2.193.53 2.72 1.253h.057V7.126h3.407v9.645h-3.407v-1.12c-.522.75-1.476 1.252-2.735 1.252zm.478-8.497c-1.03 0-1.784.81-1.784 1.896 0 1.074.755 1.884 1.784 1.884.972 0 1.77-.796 1.77-1.884 0-1.074-.798-1.896-1.77-1.896z" />
              </svg>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Threads</p>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#666' }}>
              Connect your Threads account to publish posts directly.
            </p>
            <div>
              <ThreadsConnectButton />
            </div>
          </div>
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
  const navigate = useNavigate()

  useEffect(() => {
    const returnUrl = localStorage.getItem('social_return_url')
    if (returnUrl && returnUrl !== '/dashboard/settings') {
      localStorage.removeItem('social_return_url')
      navigate(returnUrl)
    }
  }, [navigate])

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
                  border: isActive ? '1.5px solid #0F172A' : '1.5px solid transparent',
                  backgroundColor: isActive ? '#F8FAFC' : 'transparent',
                  color: isActive ? '#0F172A' : '#64748B',
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
