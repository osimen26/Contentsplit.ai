import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Wand2, Zap, Layers, Sparkles, Shield, Lock, CheckCircle, ArrowRight, MessageSquare, Mail } from 'lucide-react'
import { useAuth } from '@contexts/AuthContext'
import '../styles/landing.css'

const TwitterIcon = ({ size, color }: { size: number, color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)

const LinkedinIcon = ({ size, color }: { size: number, color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const InstagramIcon = ({ size, color }: { size: number, color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LandingPage: React.FC = () => {
  const { user, isLoading } = useAuth()

  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="landing-wrapper">
      {/* Navigation App Bar */}
      <nav className="landing-navbar">
        <Link to="/" className="landing-logo">
          <Sparkles size={24} color="var(--sys-color-roles-primary-color-role-primary-role)" />
          ContentSplit
        </Link>
        <div className="landing-nav-links">
          <Link to="/login" className="nav-link">Log In</Link>
          <Link to="/register" className="nav-cta" style={{ color: '#ffffff' }}>Get started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" style={{ paddingBottom: '40px' }}>
        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}>
          Don't just write.<br/>
          <span style={{ color: 'var(--sys-color-roles-primary-color-role-primary-role)' }}>Multiply.</span>
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--sys-color-neutral-30)', maxWidth: '750px', marginTop: '24px', marginBottom: '0' }}>
          Turn a single brain-dump into a week’s worth of platform-native content. ContentSplit learns your exact Brand Voice and automates the repetition—zero prompt engineering required.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', marginTop: '32px' }}>
          <Link to="/register" className="cta-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '18px 48px', fontSize: '1.2rem', color: '#ffffff' }}>
            Start Multiplying For Free <ArrowRight size={20} />
          </Link>
        </div>

        {/* Platform Capsules */}
        <div style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
          <div className="hero-capsule">
            <TwitterIcon size={18} color="#1DA1F2" /> Twitter Threads
          </div>
          <div className="hero-capsule">
            <LinkedinIcon size={18} color="#0077b5" /> LinkedIn Posts
          </div>
          <div className="hero-capsule">
            <Mail size={18} color="var(--sys-color-roles-error-color-role-error-role)" /> Professional Email
          </div>
          <div className="hero-capsule">
            <InstagramIcon size={18} color="#E1306C" /> Instagram Captions
          </div>
        </div>
      </section>

      {/* Dashboard Mockup Section */}
      <section style={{ backgroundColor: 'var(--sys-color-primary-99)', paddingBottom: '96px', marginTop: '-40px' }}>
        <div className="dashboard-mockup-wrapper">
          <div className="dashboard-mockup-background"></div>
          <div className="dashboard-mockup-window">
             <div className="mock-sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.2rem', marginBottom: '24px' }}>
                  <MessageSquare size={20} color="var(--sys-color-roles-primary-color-role-primary-role)" /> Chat Board
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sys-color-neutral-50)', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Projects</div>
                <div style={{ padding: '10px 12px', background: 'var(--sys-color-primary-95)', color: 'var(--sys-color-roles-primary-color-role-primary-role)', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}># Q3-launch-repurpose</div>
                <div style={{ padding: '10px 12px', color: 'var(--sys-color-neutral-40)', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}># weekly-newsletter</div>
                <div style={{ padding: '10px 12px', color: 'var(--sys-color-neutral-40)', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}># tech-blog-syndication</div>
             </div>
             <div className="mock-main">
                <div className="mock-chat-bubble">
                  <strong>You:</strong> Transform this 20-page PDF report into a 5-tweet thread and a LinkedIn thought leadership post using my minimalist tone.
                </div>
                <div className="mock-chat-bubble" style={{ background: 'var(--sys-color-primary-99)', border: '1px solid var(--sys-color-border-tertiary)', alignSelf: 'flex-start' }}>
                  <strong>ContentSplit:</strong> I've analyzed the report. The key hook is the 40% growth metric on page 3. Generation is complete! Formats are attached below.
                </div>
                <div className="mock-input">
                  <span>Type a message or paste a link...</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'var(--sys-color-roles-primary-color-role-primary-role)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={18} color="white" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* High-Fidelity 3-Step Timeline (Jace.ai reference) */}
      <section style={{ padding: '96px 5%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'var(--sys-color-surface-container-lowest)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '600px', textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--sys-color-neutral-10)', marginBottom: '16px', lineHeight: 1.2 }}>Reclaim 90% of your publishing time</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>Watch how ContentSplit transforms a chaotic workflow into an organized, automated content machine.</p>
          </div>
          <Link to="/register" className="cta-primary" style={{ backgroundColor: 'var(--sys-color-neutral-10)', color: '#ffffff' }}>
            Get Started for Free
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          {/* Step 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--sys-color-neutral-20)', marginBottom: '12px' }}>Define your identity</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>Set your Persona and Tone exactly once. We secure and lock in your Brand Voice instantly.</p>
            </div>
            <div style={{ background: 'var(--sys-color-primary-99)', borderRadius: '24px', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '200px', border: '1px solid var(--sys-color-border-tertiary)' }}>
              <div style={{ padding: '6px 16px', background: '#fce7f3', color: '#be185d', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: 'auto' }}>Takes 1 min</div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', alignSelf: 'center' }}>
                 <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><TwitterIcon size={32} color="#1DA1F2" /></div>
                 <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}><LinkedinIcon size={32} color="#0077b5" /></div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--sys-color-neutral-20)', marginBottom: '12px' }}>We learn your context</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>No sterile AI robot-speak. ContentSplit inherits your unique cadence organically.</p>
            </div>
            <div style={{ background: 'var(--sys-color-primary-99)', borderRadius: '24px', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '200px', border: '1px solid var(--sys-color-border-tertiary)' }}>
              <div style={{ padding: '6px 16px', background: '#fef08a', color: '#854d0e', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: 'auto' }}>Takes 5 min</div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', alignSelf: 'center' }}>
                 <div style={{ width: '80px', height: '64px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative' }}>
                   <Wand2 size={32} color="var(--sys-color-roles-primary-color-role-primary-role)" />
                 </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--sys-color-neutral-20)', marginBottom: '12px' }}>Paste and distribute</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>Drop a single draft. Approve perfectly formatted threads and posts simultaneously.</p>
            </div>
            <div style={{ background: 'var(--sys-color-primary-99)', borderRadius: '24px', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '200px', border: '1px solid var(--sys-color-border-tertiary)' }}>
              <div style={{ padding: '6px 16px', background: '#e0e7ff', color: '#4338ca', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: 'auto' }}>Save 10+ hours a week</div>
              <div style={{ marginTop: '24px', width: '100%', background: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--sys-color-neutral-50)', marginBottom: '8px', fontWeight: 600 }}>Draft Ready: LinkedIn Post</div>
                <div style={{ height: '6px', background: 'var(--sys-color-neutral-90)', width: '100%', marginBottom: '10px', borderRadius: '4px' }}></div>
                <div style={{ height: '6px', background: 'var(--sys-color-neutral-90)', width: '80%', marginBottom: '10px', borderRadius: '4px' }}></div>
                <div style={{ height: '6px', background: 'var(--sys-color-neutral-90)', width: '60%', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="features-section" style={{ backgroundColor: 'var(--sys-color-primary-99)' }}>
        <div className="features-header">
          <h2 className="features-title">The engine behind your content empire</h2>
        </div>
        
        <style>{`
          .bento-grid {
            display: grid;
            gap: 24px;
            grid-template-columns: 1fr;
            padding: 0 5%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .bento-card {
            background: var(--sys-color-surface-container-lowest);
            display: flex;
            flex-direction: column;
            padding: 40px;
            border-radius: 24px;
            border: 1px solid var(--sys-color-border-tertiary);
            transition: transform 0.2s;
          }
          .bento-card:hover { border-color: var(--sys-color-border-secondary); }
          .bento-card-icon {
            background: var(--sys-color-primary-99);
            padding: 14px;
            border-radius: 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            align-self: flex-start;
          }
          @media (min-width: 900px) {
            .bento-grid {
              grid-template-columns: repeat(3, 1fr);
              grid-auto-rows: minmax(320px, auto);
            }
            .bento-large-1 { grid-column: span 2; }
            .bento-small-1 { grid-column: span 1; }
            .bento-small-2 { grid-column: span 1; }
            .bento-large-2 { grid-column: span 2; }
          }
        `}</style>
        
        <div className="bento-grid">
          {/* Card 1: Large Span */}
          <div className="bento-card bento-large-1">
            <div className="bento-card-icon">
              <Zap size={32} color="var(--sys-color-roles-primary-color-role-primary-role)" />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px', color: 'var(--sys-color-neutral-10)' }}>Zero-Prompt Generation</h3>
            <p style={{ color: 'var(--sys-color-neutral-40)', lineHeight: '1.6', fontSize: '1.1rem', maxWidth: '420px', marginTop: 'auto' }}>
              Stop fighting with ChatGPT. Just paste your raw thoughts. We handle the strict formatting, line breaks, and narrative structure automatically.
            </p>
          </div>

          {/* Card 2: Small Span */}
          <div className="bento-card bento-small-1">
            <div className="bento-card-icon">
              <Layers size={32} color="var(--sys-color-roles-primary-color-role-primary-role)" />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px', color: 'var(--sys-color-neutral-10)' }}>Native Nuance</h3>
            <p style={{ color: 'var(--sys-color-neutral-40)', lineHeight: '1.6', fontSize: '1.1rem', marginTop: 'auto' }}>
              A Thread isn't just a chopped up post. Outputs are highly optimized for every specific destination format.
            </p>
          </div>

          {/* Card 3: Small Span */}
          <div className="bento-card bento-small-2">
            <div className="bento-card-icon">
              <CheckCircle size={32} color="var(--sys-color-roles-primary-color-role-primary-role)" />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px', color: 'var(--sys-color-neutral-10)' }}>Instant Export</h3>
            <p style={{ color: 'var(--sys-color-neutral-40)', lineHeight: '1.6', fontSize: '1.1rem', marginTop: 'auto' }}>
              Read, review, edit inline, and copy high-converting drafts directly to your clipboard in one tap. No bloat.
            </p>
          </div>

          {/* Card 4: Large Span */}
          <div className="bento-card bento-large-2" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="bento-card-icon">
              <Wand2 size={32} color="var(--sys-color-roles-primary-color-role-primary-role)" />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '16px', color: 'var(--sys-color-neutral-10)' }}>Mass-Parallel Processing</h3>
            <p style={{ color: 'var(--sys-color-neutral-40)', lineHeight: '1.6', fontSize: '1.1rem', maxWidth: '420px', marginTop: 'auto' }}>
              While other tools force you to generate posts one by one, our backend architecture builds your entire multi-channel campaign concurrently to save you hours of wait time.
            </p>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Social Proof / Testimonials */}
      <section style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-surface-container-low)', textAlign: 'center' }}>
        <h2 className="features-title" style={{ marginBottom: '64px' }}>Loved by growth teams and solo-creators alike</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ background: 'var(--sys-color-surface-container-lowest)', padding: '32px', borderRadius: '16px', boxShadow: 'var(--sys-elevation-1)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--sys-color-neutral-30)', marginBottom: '24px', lineHeight: 1.6 }}>"ContentSplit has entirely reshaped the way I approach content. It saves me over 10 hours a week—I literally just paste my raw brain dumps and it hands me perfect threads. Absolutely elite tool."</p>
            <div style={{ fontWeight: 700, color: 'var(--sys-color-neutral-10)' }}>Sarah J.</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)' }}>Growth Marketer</div>
          </div>
          <div style={{ background: 'var(--sys-color-surface-container-lowest)', padding: '32px', borderRadius: '16px', boxShadow: 'var(--sys-elevation-1)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--sys-color-neutral-30)', marginBottom: '24px', lineHeight: 1.6 }}>"I'm deeply impressed by how good the generated replies are. The Brand Voice engine actually gets it right. It sounds exactly like me, preventing endless editing."</p>
            <div style={{ fontWeight: 700, color: 'var(--sys-color-neutral-10)' }}>Marcus D.</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)' }}>SaaS Founder</div>
          </div>
          <div style={{ background: 'var(--sys-color-surface-container-lowest)', padding: '32px', borderRadius: '16px', boxShadow: 'var(--sys-elevation-1)' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--sys-color-neutral-30)', marginBottom: '24px', lineHeight: 1.6 }}>"Instead of paying a social media manager $2,000/mo, I use this. The parallel processing gives me 5 platforms of content in 15 seconds. Unbelievable ROI."</p>
            <div style={{ fontWeight: 700, color: 'var(--sys-color-neutral-10)' }}>Elena W.</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--sys-color-neutral-50)' }}>Content Agency Owner</div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-surface-container-lowest)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="features-title" style={{ marginBottom: '64px' }}>Enterprise-grade boundaries for your IP</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', textAlign: 'left' }}>
            <div>
              <Lock size={32} color="var(--sys-color-neutral-40)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>End-to-End Encryption</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)' }}>Your proprietary drafts and thoughts are strictly encrypted in transit and at rest.</p>
            </div>
            <div>
              <Shield size={32} color="var(--sys-color-neutral-40)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Absolute Privacy</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)' }}>We never train public AI models on your private drafts or internal business communication.</p>
            </div>
            <div>
              <CheckCircle size={32} color="var(--sys-color-neutral-40)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>SOC-Secure Architecture</h3>
              <p style={{ color: 'var(--sys-color-neutral-50)' }}>Secured entirely by industry-best encryption parameters via our advanced, isolated proxy layer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: FAQ */}
      <section style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-primary-99)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="features-title" style={{ textAlign: 'center', marginBottom: '64px' }}>Everything you need to know</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--sys-color-surface-container-lowest)', padding: '24px', borderRadius: '16px', border: '1px solid var(--sys-color-border-tertiary)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--sys-color-neutral-10)' }}>Do I need to write complex prompts?</h4>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>Absolutely not. ContentSplit is a "Zero-Prompt" engine. You simply paste your text. Your pre-configured Brand Voice (Persona + Tone) handles all the strict instructional architecture behind the scenes.</p>
            </div>
            <div style={{ background: 'var(--sys-color-surface-container-lowest)', padding: '24px', borderRadius: '16px', border: '1px solid var(--sys-color-border-tertiary)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--sys-color-neutral-10)' }}>Does the output sound like an AI wrote it?</h4>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>Because our ingestion engine strictly adheres to your configured Persona and Tone parameters, the output avoids standard "ChatGPT-isms". We explicitly instruct the model to use your syntax.</p>
            </div>
            <div style={{ background: 'var(--sys-color-surface-container-lowest)', padding: '24px', borderRadius: '16px', border: '1px solid var(--sys-color-border-tertiary)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--sys-color-neutral-10)' }}>What platforms do you support out of the box?</h4>
              <p style={{ color: 'var(--sys-color-neutral-50)', lineHeight: 1.6 }}>We natively generate optimized outputs for Twitter (Threads), LinkedIn (Thought Leadership Posts), Instagram (Captions), and Email (Newsletters).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ padding: '96px 5%', backgroundColor: 'var(--sys-color-primary-95)', textAlign: 'center' }}>
        <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to reclaim your time?</h2>
        <p style={{ color: 'var(--sys-color-neutral-40)', fontSize: '1.2rem', marginBottom: '40px' }}>
          Join thousands of professionals who've already transformed their creation workflow.
        </p>
        <Link to="/register" className="cta-primary" style={{ color: '#ffffff' }}>
          Get Started For Free
        </Link>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '64px 5%', color: 'var(--sys-color-neutral-50)', background: 'var(--sys-color-surface-container-lowest)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
        <div>
          <div className="landing-logo" style={{ marginBottom: '16px', fontSize: '1.2rem' }}>
            <Sparkles size={20} color="var(--sys-color-roles-primary-color-role-primary-role)" /> ContentSplit
          </div>
          <p>© 2026 ContentSplit.ai. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <strong style={{ color: 'var(--sys-color-neutral-10)' }}>Product</strong>
            <Link to="/pricing" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Pricing</Link>
            <Link to="/features" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Features</Link>
            <Link to="/changelog" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Changelog</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <strong style={{ color: 'var(--sys-color-neutral-10)' }}>Company</strong>
            <Link to="/about" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>About us</Link>
            <Link to="/terms" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Terms of service</Link>
            <Link to="/privacy" style={{ color: 'var(--sys-color-neutral-50)', textDecoration: 'none' }}>Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
