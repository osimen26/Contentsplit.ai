import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Briefcase, Users, Camera, Megaphone, Zap, Target, MessageCircle, Rocket } from 'lucide-react'
import { apiClient } from '@/services/api-client'

const PERSONAS = [
  { id: 'founder', label: 'Founder / CEO', description: 'Lead the vision with authority', icon: Rocket },
  { id: 'agency', label: 'Marketing Agency', description: 'Results-driven and persuasive', icon: Megaphone },
  { id: 'creator', label: 'Content Creator', description: 'Engaging and relatable', icon: Camera },
  { id: 'marketer', label: 'In-House Marketer', description: 'Strategic and brand-aligned', icon: Target }
]

const TONES = [
  { id: 'professional', label: 'Professional', description: 'Formal and trustworthy', icon: Briefcase },
  { id: 'bold', label: 'Bold', description: 'Punchy and direct', icon: Zap },
  { id: 'minimalist', label: 'Minimalist', description: 'Short and clean', icon: Users },
  { id: 'conversational', label: 'Conversational', description: 'Friendly and warm', icon: MessageCircle }
]

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [persona, setPersona] = useState('')
  const [tone, setTone] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const handleSkip = () => {
    navigate('/dashboard')
  }

  const handleComplete = async () => {
    setIsSaving(true)
    setError('')
    try {
      await apiClient.updateUserProfile({ persona: persona || 'founder', tone: tone || 'conversational' })
      navigate('/dashboard')
    } catch {
      setError('Failed to save. Taking you to dashboard...')
      setTimeout(() => navigate('/dashboard'), 1500)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--sys-color-surface-container-lowest)',
      padding: '24px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '480px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '32px' 
      }}>
        
        {/* Progress */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ 
              width: step === s ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: step >= s ? 'var(--sys-color-primary-40)' : 'var(--sys-color-primary-90)',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <img src="/icon.svg" alt="ContentSplit" style={{ width: '96px', height: '96px' }} />
          </div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            marginBottom: '8px', 
            color: 'var(--sys-color-primary-20)' 
          }}>
            {step === 1 ? 'What is your role?' : 'Choose your tone'}
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--sys-color-neutral-50)' }}>
            {step === 1 ? 'This helps us tailor your content experience.' : 'Your content will use this style.'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: 'var(--sys-color-error-98)',
            color: 'var(--sys-color-error-40)',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Step 1: Persona */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {PERSONAS.map(p => {
                const isSelected = persona === p.id
                const Icon = p.icon
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    style={{
                      padding: '16px',
                      border: isSelected ? '2px solid var(--sys-color-primary-40)' : '1px solid var(--sys-color-primary-80)',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'var(--sys-color-primary-98)' : 'var(--sys-color-surface-container-high)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      position: 'relative'
                    }}
                  >
                    <Icon size={24} color={isSelected ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)'} />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? 'var(--sys-color-primary-40)' : 'var(--sys-color-primary-20)' }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)' }}>
                      {p.description}
                    </div>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                        <Check size={16} color="var(--sys-color-primary-40)" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleSkip}
                style={{
                  padding: '14px 20px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--sys-color-primary-80)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--sys-color-primary-40)',
                  fontSize: '0.9rem'
                }}
              >
                Skip
              </button>
              <button
                onClick={() => persona && setStep(2)}
                disabled={!persona}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  backgroundColor: !persona ? 'var(--sys-color-primary-90)' : 'var(--sys-color-primary-40)',
                  color: !persona ? 'var(--sys-color-primary-30)' : 'white',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: !persona ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Tone */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {TONES.map(t => {
                const isSelected = tone === t.id
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    style={{
                      padding: '16px',
                      border: isSelected ? '2px solid var(--sys-color-primary-40)' : '1px solid var(--sys-color-primary-80)',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'var(--sys-color-primary-98)' : 'var(--sys-color-surface-container-high)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      position: 'relative'
                    }}
                  >
                    <Icon size={24} color={isSelected ? 'var(--sys-color-primary-40)' : 'var(--sys-color-neutral-40)'} />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? 'var(--sys-color-primary-40)' : 'var(--sys-color-primary-20)' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)' }}>
                      {t.description}
                    </div>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                        <Check size={16} color="var(--sys-color-primary-40)" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setStep(1)}
                style={{
                  padding: '14px 20px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--sys-color-primary-80)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--sys-color-primary-40)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleComplete}
                disabled={isSaving}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  backgroundColor: isSaving ? 'var(--sys-color-primary-90)' : 'var(--sys-color-primary-40)',
                  color: isSaving ? 'var(--sys-color-primary-30)' : 'white',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {isSaving ? 'Saving...' : 'Complete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingPage