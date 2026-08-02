import React, { useState } from 'react'

const syne = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const CheckIcon = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '4px' }}>
    <path d="M1 5L5 9L13 1" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const plans = [
  {
    name: 'Free',
    price: '₦0',
    period: '',
    subtitle: 'For creators just getting started',
    features: [
      '5 repurposes per day',
      'Twitter, LinkedIn, Instagram, Youtube, Email, Threads',
      'Copy-to-clipboard export',
      'Basic editor'
    ],
    buttonText: 'Try for free',
    buttonVariant: 'secondary'
  },
  {
    name: 'Pro',
    price: '₦5,000',
    period: 'per user / month',
    subtitle: 'For teams and serious creators',
    features: [
      '100 repurposes per month',
      'All 6 output formats',
      'Batch mode (up to 10 posts)',
      'Inline editor + version history',
      'Priority AI generation',
      'Early access to new formats'
    ],
    buttonText: 'Get Pro →',
    buttonVariant: 'primary',
    popular: true
  },
  {
    name: 'Agency',
    price: '₦15,000',
    period: '/ month',
    subtitle: 'For agencies managing multiple clients',
    features: [
      'Everything in Pro',
      'Unlimited repurposes',
      'Multi-brand workspaces',
      'Train custom brand voices',
      'White-label dashboard'
    ],
    buttonText: 'Get Agency',
    buttonVariant: 'secondary'
  }
]

const LandingPricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" style={{ background: '#FFFFFF', padding: '128px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ ...syne(48, 700, { color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '16px' }), fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            Pricing
          </h2>
          <p style={{ ...dm(16, 400, { color: '#64748B', marginBottom: '32px' }) }}>
            Looking for enterprise pricing? Email enterprise@contentsplit.ai
          </p>
          
          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ ...dm(15, 500, { color: '#475569' }) }}>Pay annually (save 10%)</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                background: isAnnual ? '#0F172A' : '#94A3B8',
                position: 'relative',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#FFFFFF',
                position: 'absolute',
                top: '2px',
                left: isAnnual ? '22px' : '2px',
                transition: 'left 0.3s'
              }} />
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {plans.map((plan, i) => {
            // Apply 10% discount for annual if applicable
            let displayPrice = plan.price;
            if (isAnnual && plan.price !== '₦0') {
              const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, ''), 10);
              const discounted = numericPrice * 0.9;
              displayPrice = '₦' + discounted.toLocaleString();
            }

            return (
              <div key={i} style={{ 
                background: '#FFFFFF', 
                borderRadius: '8px', 
                border: '1px solid #E2E8F0',
                padding: '40px 32px', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative'
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '32px',
                    right: '32px',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    ...dm(11, 700),
                    padding: '4px 10px',
                    borderRadius: '4px',
                  }}>
                    Popular
                  </div>
                )}
                
                <div style={{ ...dm(20, 500, { color: '#0F172A', marginBottom: '16px' }) }}>
                  {plan.name}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                  <div style={{ ...dm(36, 500, { color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }) }}>
                    {displayPrice}
                  </div>
                  {plan.period && (
                    <div style={{ ...dm(14, 400, { color: '#475569' }) }}>
                      {plan.period}
                    </div>
                  )}
                </div>

                <div style={{ ...dm(14, 400, { color: '#475569', marginBottom: '32px' }) }}>
                  {plan.subtitle}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <CheckIcon />
                      <span style={{ ...dm(14, 400, { color: '#64748B', lineHeight: 1.5 }) }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: plan.buttonVariant === 'primary' ? '#0F172A' : '#F1F5F9',
                  color: plan.buttonVariant === 'primary' ? '#FFFFFF' : '#0F172A',
                  ...dm(14, 600),
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {plan.buttonText}
                </button>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default LandingPricing
