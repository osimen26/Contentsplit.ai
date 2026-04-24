import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowLeft, Check, Briefcase, Users, Camera, Megaphone, Zap, Target, MessageCircle, Rocket } from 'lucide-react'
import { apiClient } from '@/services/api-client'
import '@/styles/onboarding.css'

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
    <div className="onboarding-container">
      <div className="onboarding-card">
        
        {/* Progress Dots */}
        <div className="onboarding-progress">
          {[1, 2].map(s => (
            <div 
              key={s} 
              className={`onboarding-dot ${step >= s ? 'active' : 'inactive'}`} 
              style={{ width: step === s ? '24px' : '8px' }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-icon-wrapper">
            <Sparkles size={28} color="#6366f1" strokeWidth={1.5} />
          </div>
          <h1 className="onboarding-title">
            {step === 1 ? 'What is your role?' : 'Choose your tone'}
          </h1>
          <p className="onboarding-subtitle">
            {step === 1 ? 'This helps us tailor your content experience.' : 'Your content will use this style.'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            fontSize: '0.9rem',
            textAlign: 'center',
            fontWeight: 500
          }}>
            {error}
          </div>
        )}

        {/* Step 1: Persona */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="onboarding-grid">
              {PERSONAS.map(p => {
                const isSelected = persona === p.id
                const Icon = p.icon
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`onboarding-tile ${isSelected ? 'selected' : ''}`}
                  >
                    <Icon size={28} className="onboarding-tile-icon" />
                    <div className="onboarding-tile-label">{p.label}</div>
                    <div className="onboarding-tile-desc">{p.description}</div>
                    <div className="onboarding-tile-check">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className="onboarding-actions">
              <button onClick={handleSkip} className="onboarding-btn-secondary">
                Skip
              </button>
              <button
                onClick={() => persona && setStep(2)}
                disabled={!persona}
                className="onboarding-btn-primary"
              >
                Continue <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Tone */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="onboarding-grid">
              {TONES.map(t => {
                const isSelected = tone === t.id
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`onboarding-tile ${isSelected ? 'selected' : ''}`}
                  >
                    <Icon size={28} className="onboarding-tile-icon" />
                    <div className="onboarding-tile-label">{t.label}</div>
                    <div className="onboarding-tile-desc">{t.description}</div>
                    <div className="onboarding-tile-check">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className="onboarding-actions">
              <button onClick={() => setStep(1)} className="onboarding-btn-secondary">
                <ArrowLeft size={20} /> Back
              </button>
              <button
                onClick={handleComplete}
                disabled={isSaving || !tone}
                className="onboarding-btn-primary"
              >
                {isSaving ? 'Saving...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnboardingPage