import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@components/ui'
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
        navigate('/dashboard') // Go directly to dashboard
      }
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--sys-color-roles-neutral-color-role-neutral-container-role)',
      padding: 'var(--sys-spacing-xl)'
    }}>
      <Card variant="elevated" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', padding: 'var(--sys-spacing-2xl)', gap: 'var(--sys-spacing-xl)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--sys-typography-headline-medium-font-family)', fontSize: '1.75rem', marginBottom: 'var(--sys-spacing-sm)' }}>
            Welcome to ContentSplit
          </h1>
          <p style={{ color: 'var(--sys-color-neutral-50)' }}>
            Let's configure your unique Brand Voice. We'll automatically apply this to all your future content.
          </p>
        </div>

        {/* Step 1: Persona */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-md)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>1. Who are you generating content for?</h3>
            <div style={{ display: 'grid', gap: 'var(--sys-spacing-sm)' }}>
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  style={{
                    padding: 'var(--sys-spacing-md)',
                    border: `2px solid ${persona === p.id ? 'var(--sys-color-roles-primary-color-role-primary-role)' : 'var(--sys-color-border-tertiary)'}`,
                    borderRadius: 'var(--sys-radius-md)',
                    backgroundColor: persona === p.id ? 'var(--sys-color-primary-99)' : 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--sys-color-neutral-10)' }}>{p.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)', marginTop: '4px' }}>{p.description}</div>
                </button>
              ))}
            </div>
            
            <Button
              variant="filled"
              onClick={handleNext}
              disabled={!persona}
              style={{ marginTop: 'var(--sys-spacing-lg)' }}
            >
              Next Step
            </Button>
          </div>
        )}

        {/* Step 2: Tone */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sys-spacing-md)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>2. Select your default writing tone</h3>
            <div style={{ display: 'grid', gap: 'var(--sys-spacing-sm)' }}>
              {TONES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  style={{
                    padding: 'var(--sys-spacing-md)',
                    border: `2px solid ${tone === t.id ? 'var(--sys-color-roles-primary-color-role-primary-role)' : 'var(--sys-color-border-tertiary)'}`,
                    borderRadius: 'var(--sys-radius-md)',
                    backgroundColor: tone === t.id ? 'var(--sys-color-primary-99)' : 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--sys-color-neutral-10)' }}>{t.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)', marginTop: '4px' }}>{t.description}</div>
                </button>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--sys-spacing-md)', marginTop: 'var(--sys-spacing-lg)' }}>
              <Button variant="outlined" onClick={() => setStep(1)}>Back</Button>
              <Button
                variant="filled"
                onClick={handleComplete}
                disabled={!tone || isPending}
                style={{ flex: 1 }}
              >
                {isPending ? 'Saving...' : 'Finish Setup'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default OnboardingPage
