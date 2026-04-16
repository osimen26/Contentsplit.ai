import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Check } from 'lucide-react'
import { useUpdateProfile } from '@services/query-hooks'

const PERSONAS = [
  { id: 'founder', label: 'Founder / CEO', description: 'Visionary, authoritative, authentic' },
  { id: 'agency', label: 'Marketing Agency', description: 'Results-driven, professional, persuasive' },
  { id: 'creator', label: 'Content Creator', description: 'Engaging, relatable, community-focused' },
  { id: 'marketer', label: 'In-House Marketer', description: 'Strategic, brand-aligned, clear' }
]

const TONES = [
  { id: 'professional', label: 'Professional', description: 'Formal and trustworthy' },
  { id: 'bold', label: 'Bold', description: 'Punchy, opinionated, direct' },
  { id: 'minimalist', label: 'Minimalist', description: 'Short, clean, no-fluff' },
  { id: 'conversational', label: 'Conversational', description: 'Friendly and approachable' }
]

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [persona, setPersona] = useState('')
  const [tone, setTone] = useState('')
  
  const navigate = useNavigate()
  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const handleNext = () => {
    if (step === 1 && persona) setStep(2)
  }

  const handleComplete = () => {
    if (!tone) return
    updateProfile({ persona, tone } as any, {
      onSuccess: () => {
        navigate('/dashboard')
      }
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--sys-color-surface-container-lowest)',
      padding: '24px',
      fontFamily: 'var(--sys-typography-body-large-font-family)'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '440px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '40px' 
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <Sparkles size={36} color="var(--sys-color-neutral-10)" strokeWidth={1.5} />
          </div>
          <h1 style={{ 
            fontFamily: 'var(--sys-typography-display-small-font-family)', 
            fontSize: '2rem', 
            fontWeight: 600, 
            letterSpacing: '-0.5px', 
            marginBottom: '12px', 
            color: 'var(--sys-color-neutral-10)' 
          }}>
            Welcome to ContentSplit
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--sys-color-neutral-50)', lineHeight: 1.5 }}>
            Let's configure your unique Brand Voice. We'll automatically apply this to your generated content.
          </p>
        </div>

        {/* Step 1: Persona */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.4s ease-out' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--sys-color-neutral-30)' }}>
              1. What is your role?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PERSONAS.map(p => {
                const isSelected = persona === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    style={{
                      padding: '16px 20px',
                      border: isSelected ? '1px solid var(--sys-color-roles-primary-color-role-primary-role)' : '1px solid var(--sys-color-border-tertiary)',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'var(--sys-color-primary-99)' : 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: isSelected ? 'var(--sys-color-roles-primary-color-role-primary-role)' : 'var(--sys-color-neutral-20)', fontSize: '1rem' }}>
                        {p.label}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)', marginTop: '4px' }}>
                        {p.description}
                      </div>
                    </div>
                    {isSelected && <Check size={20} color="var(--sys-color-roles-primary-color-role-primary-role)" />}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={handleNext}
              disabled={!persona}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '16px',
                backgroundColor: !persona ? 'var(--sys-color-neutral-90)' : 'var(--sys-color-neutral-10)',
                color: !persona ? 'var(--sys-color-neutral-60)' : 'var(--sys-color-surface-container-lowest)',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: !persona ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Tone */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.4s ease-out' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--sys-color-neutral-30)' }}>
              2. Select your default tone
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TONES.map(t => {
                const isSelected = tone === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    style={{
                      padding: '16px 20px',
                      border: isSelected ? '1px solid var(--sys-color-roles-primary-color-role-primary-role)' : '1px solid var(--sys-color-border-tertiary)',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'var(--sys-color-primary-99)' : 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: isSelected ? 'var(--sys-color-roles-primary-color-role-primary-role)' : 'var(--sys-color-neutral-20)', fontSize: '1rem' }}>
                        {t.label}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)', marginTop: '4px' }}>
                        {t.description}
                      </div>
                    </div>
                    {isSelected && <Check size={20} color="var(--sys-color-roles-primary-color-role-primary-role)" />}
                  </button>
                )
              })}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button 
                onClick={() => setStep(1)}
                style={{
                  padding: '16px 24px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--sys-color-border-tertiary)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--sys-color-neutral-30)'
                }}
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={!tone || isPending}
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: (!tone || isPending) ? 'var(--sys-color-neutral-90)' : 'var(--sys-color-neutral-10)',
                  color: (!tone || isPending) ? 'var(--sys-color-neutral-60)' : 'var(--sys-color-surface-container-lowest)',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: (!tone || isPending) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {isPending ? 'Saving...' : 'Finish Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingPage
