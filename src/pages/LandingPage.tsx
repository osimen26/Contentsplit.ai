import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@components/application';
import { TwitterIcon, LinkedInIcon, InstagramIcon, FacebookIcon, NewsletterIcon } from '@components/ui/SocialIcons';
import { GoogleAuth } from '@/components/auth/GoogleAuth';

// Exact colors from image
const COLORS = {
  bg: '#F5F5F7',
  primary: '#5B50D6',
  textMain: '#1A1D23',
  textMuted: '#6B7280',
  white: '#FFFFFF',
  border: '#E5E7EB',
  pillBg: '#F3F4F6',
  supportText: '#4B5563',
};

const LandingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const DEMO_FULL_TEXT = "Repurposing content isn't just about reaching more people; it's about respecting your audience's platform of choice. A 2,000-word deep dive might be perfect for a Sunday morning newsletter, but on Twitter, your audience wants the punchy, high-level takeaways in under 60 seconds.";
  const [demoText, setDemoText] = useState("");
  const [demoState, setDemoState] = useState<'idle' | 'typing' | 'done'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDemoState(prev => prev === 'idle' ? 'typing' : prev);
        }
      },
      { threshold: 0.5 }
    );
    const demoSection = document.getElementById('demo');
    if (demoSection) observer.observe(demoSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (demoState !== 'typing') return;
    let i = 0;
    const interval = setInterval(() => {
      setDemoText(DEMO_FULL_TEXT.substring(0, i));
      i++;
      if (i > DEMO_FULL_TEXT.length) {
        clearInterval(interval);
        setDemoState('done');
      }
    }, 15);
    return () => clearInterval(interval);
  }, [demoState]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'pricing'];
      const scrollPosition = window.scrollY + 200; // Increased offset for header

      let foundSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            foundSection = section;
            break;
          }
        }
      }
      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1')
            setActiveStep(step)
          }
        })
      },
      { threshold: 0.6, rootMargin: '-10% 0px -20% 0px' }
    )

    const steps = document.querySelectorAll('.how-it-works-step')
    steps.forEach((s) => observer.observe(s))

    return () => steps.forEach((s) => observer.unobserve(s))
  }, []);

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', fontFamily: '"Inter", "DM Sans", sans-serif', color: COLORS.textMain, overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: isMobile ? '16px 24px' : '24px 48px', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: COLORS.primary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo size={16} color="white" />
          </div>
          ContentSplit
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a href="#how-it-works" className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}>How it works</a>
            <a href="#pricing" className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}>Pricing</a>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '24px', fontSize: '14px', fontWeight: 600 }}>
          {!isMobile && <Link to="/login" style={{ color: COLORS.textMuted, textDecoration: 'none' }}>Log in</Link>}
          <Link to="/register" className="btn-primary" style={{ padding: isMobile ? '8px 16px' : '10px 24px', fontSize: isMobile ? '13px' : '14px' }}>
            {isMobile ? 'Start Free' : 'Start free \u2192'}
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ paddingTop: isMobile ? '120px' : '160px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: COLORS.textMuted, textTransform: 'uppercase', marginBottom: '20px' }}>AI-POWERED CONTENT REPURPOSING</p>
        
        <h1 style={{ fontSize: isMobile ? '36px' : '64px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px', maxWidth: '800px' }}>
          Turn one blog post into a <br />
          week's worth of <span style={{ color: COLORS.primary }}>content</span>
        </h1>
        
        <p style={{ fontSize: isMobile ? '16px' : '18px', color: COLORS.textMuted, maxWidth: '640px', lineHeight: 1.5, marginBottom: '32px' }}>
          Paste your article. ContentSplit transforms it into optimized posts for Twitter, Facebook, LinkedIn, Instagram, and newsletters — all in seconds.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: isMobile ? '100%' : 'auto', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '12px', width: '100%' }}>
            <Link to="/register" className="btn-primary" style={{ flex: 1, padding: isMobile ? '14px 24px' : '16px 32px', fontSize: '16px' }}>
              Start for free &rarr;
            </Link>
            <a href="#how-it-works" className="btn-secondary" style={{ flex: 1, padding: isMobile ? '14px 24px' : '16px 32px', fontSize: '16px' }}>
              See how it works
            </a>
          </div>
          <div style={{ width: isMobile ? '100%' : '280px' }}>
            <GoogleAuth buttonText="Sign up with Google" />
          </div>
        </div>
        
        <p style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: isMobile ? '40px' : '64px' }}>
          No credit card required • 1 free repurpose per day
        </p>

        {/* HERO MOCKUP */}
        <div className="animate-float hero-mockup-container" style={{ position: 'relative', width: '100%', maxWidth: '900px', height: isMobile ? '360px' : '480px', margin: '0 auto', marginTop: '20px' }}>
          {/* Background Cards (Peek out on mobile, fan on desktop) */}
          <div className="hero-card-fan-1" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: isMobile ? 'translate(-85%, -40%) rotate(-12deg)' : 'translate(-160%, -35%) rotate(-15deg)', 
            width: isMobile ? '200px' : '240px', 
            backgroundColor: COLORS.white, borderRadius: '24px', border: `1px solid ${COLORS.border}`, 
            boxShadow: '0 15px 30px rgba(0,0,0,0.04)', zIndex: 0, overflow: 'hidden', 
            opacity: isMobile ? 0.4 : 0.8 
          }}>
            <div style={{ padding: '12px', borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><InstagramIcon size={12}/></div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: COLORS.textMain }}>Instagram</span>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ width: '100%', height: isMobile ? '60px' : '100px', backgroundColor: '#F3F4F6', borderRadius: '12px' }}></div>
            </div>
          </div>

          <div className="hero-card-fan-2" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: isMobile ? 'translate(-15%, -40%) rotate(12deg)' : 'translate(60%, -35%) rotate(15deg)', 
            width: isMobile ? '200px' : '240px', 
            backgroundColor: COLORS.white, borderRadius: '24px', border: `1px solid ${COLORS.border}`, 
            boxShadow: '0 15px 30px rgba(0,0,0,0.04)', zIndex: 0, overflow: 'hidden', 
            opacity: isMobile ? 0.4 : 0.8 
          }}>
            <div style={{ padding: '12px', borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#1877F2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FacebookIcon size={12}/></div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: COLORS.textMain }}>Facebook</span>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ width: '100%', height: isMobile ? '60px' : '100px', backgroundColor: '#EBF5FF', borderRadius: '12px' }}></div>
            </div>
          </div>

          {/* Twitter Card */}
          <div className="hero-card-left" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: isMobile ? 'translate(-95%, -45%) rotate(-6deg)' : 'translate(-115%, -45%) rotate(-8deg)', 
            width: isMobile ? '220px' : '280px', 
            backgroundColor: COLORS.white, borderRadius: '24px', border: `1px solid ${COLORS.border}`, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)', zIndex: 1, overflow: 'hidden',
            opacity: isMobile ? 0.7 : 1
          }}>
            <div style={{ padding: '16px', borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1D9BF0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TwitterIcon size={14}/></div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textMain }}>Twitter Thread</span>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '80px', height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px' }}></div>
              <p style={{ margin: 0, fontSize: '12px', color: COLORS.textMain, lineHeight: 1.4 }}>1/ Turn your blog posts into punchy threads...</p>
              <div style={{ width: '100%', height: '40px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}></div>
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="hero-card-right" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: isMobile ? 'translate(-5%, -45%) rotate(6deg)' : 'translate(15%, -45%) rotate(8deg)', 
            width: isMobile ? '220px' : '280px', 
            backgroundColor: COLORS.white, borderRadius: '24px', border: `1px solid ${COLORS.border}`, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)', zIndex: 2, overflow: 'hidden',
            opacity: isMobile ? 0.7 : 1
          }}>
            <div style={{ padding: '16px', borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EA4335', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NewsletterIcon size={14}/></div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textMain }}>Newsletter</span>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ width: '100%', height: '60px', backgroundColor: '#FCE8E8', borderRadius: '12px', marginBottom: '12px' }}></div>
              <p style={{ margin: 0, fontSize: '12px', color: COLORS.supportText, lineHeight: 1.4 }}>Automate your email content...</p>
            </div>
          </div>

          {/* Center Card - LinkedIn (Focus) */}
          <div className="hero-card-center" style={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: isMobile ? '260px' : '320px', 
            backgroundColor: COLORS.white, borderRadius: '24px', border: `1px solid ${COLORS.border}`, 
            boxShadow: '0 30px 60px rgba(0,0,0,0.1)', zIndex: 3, overflow: 'hidden' 
          }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LinkedInIcon size={28}/>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textMain }}>LinkedIn Post</div>
                <div style={{ fontSize: '11px', color: COLORS.textMuted }}>Professional Tone</div>
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: COLORS.primary, opacity: 0.1 }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ width: '60px', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '3px', marginBottom: '4px' }}></div>
                  <div style={{ width: '40px', height: '4px', backgroundColor: '#F3F4F6', borderRadius: '2px' }}></div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: COLORS.textMain, lineHeight: 1.5, textAlign: 'center' }}>
                I just discovered a game-changing workflow for content distribution. Instead of starting from scratch...
              </p>
              <div style={{ width: '100%', height: isMobile ? '100px' : '140px', backgroundColor: '#F3F4F6', borderRadius: '16px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" style={{ paddingTop: '100px', paddingBottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#FAFAFA' }}>
        <div className="animate-slideUp" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: COLORS.primary, textTransform: 'uppercase', marginBottom: '16px' }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 800, color: COLORS.textMain, letterSpacing: '-0.03em', marginBottom: '16px' }}>Three steps. Zero friction.</h2>
          <p style={{ fontSize: '16px', color: COLORS.textMuted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Our streamlined workflow takes the heavy lifting out of content distribution.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '64px', maxWidth: '1000px', width: '100%', position: 'relative' }}>
          {!isMobile && (
            <div style={{ position: 'sticky', top: '200px', height: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
              {/* Background Line */}
              <div style={{ position: 'absolute', top: '30px', bottom: '30px', width: '2px', backgroundColor: '#E5E7EB', zIndex: 0 }}></div>
              
              {/* Active Progress Line */}
              <div style={{ 
                position: 'absolute', 
                top: '30px', 
                width: '3px', 
                backgroundColor: COLORS.primary, 
                zIndex: 1, 
                transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                height: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%',
                boxShadow: `0 0 10px ${COLORS.primary}40`
              }}></div>

              {[1, 2, 3].map((num) => (
                <div key={num} style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  backgroundColor: activeStep >= num ? COLORS.primary : COLORS.white, 
                  color: activeStep >= num ? COLORS.white : '#9CA3AF', 
                  border: `2px solid ${activeStep >= num ? COLORS.primary : '#E5E7EB'}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  zIndex: 2, 
                  marginBottom: '100px',
                  transition: 'all 0.4s ease',
                  boxShadow: activeStep === num ? `0 0 20px ${COLORS.primary}40` : 'none',
                  transform: activeStep === num ? 'scale(1.15)' : 'scale(1)'
                }}>
                  {num}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
            {[
              { 
                step: 1, 
                title: "Paste your content", 
                desc: "Drop in your blog post URL or paste the full text. ContentSplit reads it and understands the key ideas, tone, and structure.",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> 
              },
              { 
                step: 2, 
                title: "Choose your platforms", 
                desc: "Pick which formats you need — one or all six. ContentSplit generates each one separately, tailored to each platform.",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
              },
              { 
                step: 3, 
                title: "Copy and publish", 
                desc: "Each output is editable before you copy. Tweak the tone, swap out phrases, and publish directly.",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> 
              }
            ].map((s, i) => (
              <div 
                key={i} 
                data-step={s.step}
                className="how-it-works-step"
                style={{ 
                  backgroundColor: COLORS.white, 
                  border: `1px solid ${activeStep === s.step ? COLORS.primary + '30' : COLORS.border}`, 
                  borderRadius: '24px', 
                  padding: isMobile ? '24px' : '40px', 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row', 
                  gap: '24px', 
                  alignItems: 'flex-start', 
                  boxShadow: activeStep === s.step ? '0 20px 40px rgba(0,0,0,0.04)' : '0 4px 12px rgba(0,0,0,0.01)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeStep === s.step ? 'translateX(10px)' : 'translateX(0)',
                  opacity: activeStep === s.step ? 1 : 0.6
                }}
              >
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  backgroundColor: activeStep === s.step ? COLORS.primary + '10' : '#F3F4F6', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: activeStep === s.step ? COLORS.primary : '#9CA3AF', 
                  flexShrink: 0,
                  transition: 'all 0.4s ease'
                }}>
                  {s.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: COLORS.textMain, marginBottom: '12px' }}>{isMobile && `${s.step}. `}{s.title}</h3>
                  <p style={{ fontSize: '15px', color: COLORS.supportText, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo" style={{ paddingTop: '60px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 700, color: COLORS.textMain, letterSpacing: '-0.02em', marginBottom: '16px', textAlign: 'center' }}>See it work before you sign up.</h2>
        <p style={{ fontSize: isMobile ? '14px' : '16px', color: COLORS.textMuted, maxWidth: '500px', textAlign: 'center', lineHeight: 1.5, marginBottom: isMobile ? '40px' : '64px' }}>
          No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.
        </p>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '32px' : '48px', maxWidth: '1100px', width: '100%', position: 'relative', alignItems: 'center' }}>
          {!isMobile && (
            <div className="animate-pulseArrow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5, pointerEvents: 'none' }}>
              <div style={{ backgroundColor: COLORS.white, width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
              </div>
            </div>
          )}

          <div style={{ width: '100%', flex: 1, backgroundColor: COLORS.white, borderRadius: '16px', border: `1px solid ${COLORS.border}`, padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: COLORS.textMuted, textTransform: 'uppercase' }}>BLOG EXCERPT</div>
            </div>
            <textarea 
              value={demoText}
              readOnly
              placeholder="Waiting for input..."
              style={{ width: '100%', height: isMobile ? '200px' : '240px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '12px', padding: '16px', fontSize: '14px', color: COLORS.textMain, resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6 }}
            ></textarea>
          </div>

          <div style={{ width: '100%', flex: 1, backgroundColor: COLORS.white, borderRadius: '16px', border: `1px solid ${COLORS.border}`, padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: COLORS.textMuted, textTransform: 'uppercase' }}>GENERATED THREAD</div>
              <TwitterIcon size={16} />
            </div>
            <div style={{ width: '100%', height: isMobile ? '200px' : '240px', backgroundColor: '#F9FAFB', border: `1px solid ${COLORS.border}`, borderRadius: '12px', padding: '16px', overflowY: 'auto' }}>
              {demoState === 'done' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="demo-generated-line" style={{ fontSize: '13px', color: COLORS.textMain, lineHeight: 1.5, animationDelay: '0.2s' }}>1/ Content repurposing is NOT just copy-pasting. It’s about platform-native storytelling. 🧵</div>
                  <div className="demo-generated-line" style={{ fontSize: '13px', color: COLORS.textMain, lineHeight: 1.5, animationDelay: '1.2s' }}>2/ Respect the channel. Twitter users want punchy takeaways, not 2000 words.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURES SECTION */}
      <section id="features" style={{ paddingTop: '100px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bg, paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="animate-slideUp" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDE9FE', color: COLORS.primary, padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' }}>FEATURES</div>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: COLORS.textMain, letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.2, maxWidth: '600px', margin: '0 auto 20px' }}>Everything you need to scale.</h2>
          <p style={{ fontSize: '16px', color: COLORS.textMuted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
            Powerful features designed to turn your single blog post into a multi-channel content engine.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '32px' : '64px', maxWidth: '1100px', width: '100%', alignItems: 'flex-start' }}>
          
          {/* Left Column: Interactive Feature Tabs */}
          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '12px', marginTop: isMobile ? '24px' : '0' }}>
            {[
              {
                title: "AI-Powered Analysis",
                desc: "Paste any blog post or article. Our AI breaks down your content to understand key takeaways, tone, and specific audience segments.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              },
              {
                title: "One Article, Six Channels",
                desc: "Transform a single piece of long-form content into platform-native posts for Twitter, LinkedIn, Instagram, and more in seconds.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              },
              {
                title: "Bulk Content Processing",
                desc: "Batch-process up to 10 articles at once. Run your entire week’s social media strategy in a single 5-minute session.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              }
            ].map((f, i) => (
              <div 
                key={i}
                onClick={() => setActiveFeature(i)}
                style={{ 
                  padding: isMobile ? '16px 20px' : '24px 32px', 
                  borderRadius: isMobile ? '12px' : '0 16px 16px 0', 
                  borderLeft: isMobile ? 'none' : `4px solid ${activeFeature === i ? COLORS.primary : 'transparent'}`,
                  borderTop: isMobile ? `4px solid ${activeFeature === i ? COLORS.primary : 'transparent'}` : 'none',
                  backgroundColor: activeFeature === i ? '#F5F3FF' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: activeFeature === i ? 1 : 0.6
                }}
                onMouseEnter={(e) => { if (activeFeature !== i) { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.opacity = '0.9'; } }}
                onMouseLeave={(e) => { if (activeFeature !== i) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.opacity = '0.6'; } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: activeFeature === i ? COLORS.primary : COLORS.textMuted }}>{f.icon}</div>
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 600, color: activeFeature === i ? COLORS.primary : COLORS.textMain, margin: 0 }}>{f.title}</h3>
                </div>
                {activeFeature === i && (
                  <div style={{ animation: 'fadeIn 0.4s ease' }}>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: COLORS.supportText, lineHeight: 1.6 }}>{f.desc}</p>
                    
                    {/* Mobile Inline Mockup */}
                    {isMobile && (
                      <div className="animate-scaleIn" style={{ 
                        width: '100%', 
                        marginTop: '20px',
                        backgroundColor: COLORS.white, 
                        borderRadius: '16px', 
                        border: `1px solid ${COLORS.border}`, 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                        overflow: 'hidden',
                        padding: '24px'
                      }}>
                        {activeFeature === 0 && (
                          <div style={{ width: '100%' }}>
                            <div className="animate-slideUp" style={{ fontSize: '11px', fontWeight: 700, color: COLORS.primary, marginBottom: '20px', letterSpacing: '1px' }}>STEP 1: ANALYZE</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div className="skeleton-line" style={{ width: '100%', height: '10px', borderRadius: '5px', animationDelay: '0.1s' }}></div>
                              <div className="skeleton-line" style={{ width: '90%', height: '10px', borderRadius: '5px', animationDelay: '0.2s' }}></div>
                              <div className="skeleton-line" style={{ width: '95%', height: '10px', borderRadius: '5px', animationDelay: '0.3s' }}></div>
                              <div className="skeleton-line" style={{ width: '70%', height: '10px', borderRadius: '5px', animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        )}
                        {activeFeature === 1 && (
                          <div style={{ width: '100%' }}>
                            <div className="animate-slideUp" style={{ fontSize: '11px', fontWeight: 700, color: COLORS.primary, marginBottom: '20px', letterSpacing: '1px' }}>STEP 2: SPLIT</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                              {[TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon].map((Icon, idx) => (
                                <div key={idx} className="animate-slideUp" style={{ padding: '12px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: '8px', animationDelay: `${idx * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}>
                                   <Icon size={14} />
                                   <div className="skeleton-line" style={{ width: '60%', height: '4px', borderRadius: '2px' }}></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {activeFeature === 2 && (
                          <div style={{ width: '100%' }}>
                            <div className="animate-slideUp" style={{ fontSize: '11px', fontWeight: 700, color: COLORS.primary, marginBottom: '20px', letterSpacing: '1px' }}>STEP 3: SCALE</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {[1, 2, 3].map(idx => (
                                <div key={idx} className="animate-slideUp" style={{ padding: '12px', borderRadius: '10px', backgroundColor: idx === 1 ? '#F5F3FF' : '#F9FAFB', border: idx === 1 ? `1px solid ${COLORS.primary}20` : 'none', display: 'flex', alignItems: 'center', gap: '12px', animationDelay: `${idx * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}>
                                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: idx === 1 ? COLORS.primary : '#E5E7EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>{idx}</div>
                                  <div style={{ flex: 1 }}>
                                    <div className="skeleton-line" style={{ width: '80px', height: '6px', borderRadius: '3px', marginBottom: '4px' }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Mockups */}
          {!isMobile && (
            <div style={{ flex: 1.2, height: '480px', position: 'relative' }}>
              <div key={activeFeature} className="animate-scaleIn" style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: COLORS.white, 
                borderRadius: '16px', 
                border: `1px solid ${COLORS.border}`, 
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* macOS Window Header */}
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }}></div>
                </div>
                
                {/* Inner Canvas */}
                <div style={{ flex: 1, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
                {/* Dynamic Mockup Render */}
                {activeFeature === 0 && (
                  <div style={{ width: '100%', animation: 'fadeIn 0.5s ease' }}>
                    <div className="animate-slideUp" style={{ fontSize: '11px', fontWeight: 800, color: COLORS.primary, marginBottom: '24px', letterSpacing: '1.5px', opacity: 0.8 }}>STEP 1: ANALYZE</div>
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
                      {/* Scanning Beam */}
                      <div style={{ 
                        position: 'absolute', 
                        left: 0, 
                        right: 0, 
                        height: '2px', 
                        background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`, 
                        boxShadow: `0 0 10px ${COLORS.primary}`,
                        animation: 'scan 2s linear infinite',
                        zIndex: 2
                      }}></div>
                      
                      <div className="skeleton-line" style={{ width: '100%', height: '10px', borderRadius: '5px', animationDelay: '0.1s' }}></div>
                      <div className="skeleton-line" style={{ width: '90%', height: '10px', borderRadius: '5px', animationDelay: '0.2s' }}></div>
                      <div className="skeleton-line" style={{ width: '95%', height: '10px', borderRadius: '5px', animationDelay: '0.3s' }}></div>
                      <div className="skeleton-line" style={{ width: '70%', height: '10px', borderRadius: '5px', animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                {activeFeature === 1 && (
                  <div style={{ width: '100%', animation: 'fadeIn 0.5s ease' }}>
                    <div className="animate-slideUp" style={{ fontSize: '11px', fontWeight: 800, color: COLORS.primary, marginBottom: '24px', letterSpacing: '1.5px', opacity: 0.8 }}>STEP 2: SPLIT</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {[TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon].map((Icon, i) => (
                        <div key={i} className="animate-slideUp" style={{ 
                          padding: '12px', 
                          borderRadius: '12px', 
                          backgroundColor: 'white',
                          border: `1px solid ${COLORS.border}`, 
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: '10px', 
                          animationDelay: `${i * 0.1}s`, 
                          opacity: 0, 
                          animationFillMode: 'forwards',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <Icon size={12} />
                             </div>
                             <div className="skeleton-line" style={{ width: '40%', height: '4px', borderRadius: '2px' }}></div>
                           </div>
                           <div className="skeleton-line" style={{ width: '100%', height: '3px', borderRadius: '1.5px' }}></div>
                           <div className="skeleton-line" style={{ width: '80%', height: '3px', borderRadius: '1.5px' }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeFeature === 2 && (
                  <div style={{ width: '100%', animation: 'fadeIn 0.5s ease' }}>
                    <div className="animate-slideUp" style={{ fontSize: '11px', fontWeight: 800, color: COLORS.primary, marginBottom: '24px', letterSpacing: '1.5px', opacity: 0.8 }}>STEP 3: SCALE</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-slideUp" style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: '12px', animationDelay: `${i * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: i === 1 ? COLORS.primary : '#F3F4F6', color: i === 1 ? 'white' : '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>{i}</div>
                          <div style={{ flex: 1 }}>
                            <div className="skeleton-line" style={{ width: '40%', height: '6px', borderRadius: '3px', marginBottom: '4px' }}></div>
                            <div style={{ width: '100%', height: '3px', backgroundColor: '#F3F4F6', borderRadius: '1.5px', position: 'relative', overflow: 'hidden' }}>
                              <div style={{ 
                                position: 'absolute', 
                                left: 0, 
                                top: 0, 
                                bottom: 0, 
                                width: i === 1 ? '85%' : i === 2 ? '45%' : '20%', 
                                backgroundColor: i === 1 ? COLORS.primary : '#D1D5DB', 
                                borderRadius: '1.5px',
                                transition: 'width 1s ease-out'
                              }}></div>
                            </div>
                          </div>
                          <div style={{ fontSize: '10px', fontWeight: 600, color: i === 1 ? COLORS.primary : '#9CA3AF' }}>{i === 1 ? 'LIVE' : 'QUEUE'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ paddingTop: '60px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F5F3FF', borderTop: `1px solid ${COLORS.border}`, paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, color: COLORS.white, padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: 700, color: COLORS.textMain, letterSpacing: '-0.02em', marginBottom: '16px' }}>What creators are saying.</h2>
        </div>
        <div style={{ maxWidth: '1100px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : 'row', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              {
                name: "Sarah J.",
                role: "Solo Creator",
                quote: "ContentSplit turned my 2-hour social media 'grind' into a 10-minute task. I can finally focus on writing again.",
                initial: "S"
              },
              {
                name: "David L.",
                role: "Agency Owner",
                quote: "We use it for all our clients. The ability to batch-process articles and maintain a human voice is a massive win.",
                initial: "D"
              },
              {
                name: "Elena R.",
                role: "Writer",
                quote: "My LinkedIn engagement has doubled since I started using native platform-specific posts. It just works.",
                initial: "E"
              }
            ].map((t, i) => (
              <div key={i} style={{ backgroundColor: COLORS.white, borderRadius: '20px', padding: '24px', border: `1px solid ${COLORS.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#FBBF24', display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map(star => <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                </div>
                <p style={{ fontSize: '15px', color: COLORS.textMain, lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: `1px solid ${COLORS.border}`, paddingTop: '16px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: COLORS.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.white, fontWeight: 700, fontSize: '16px' }}>{t.initial}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: COLORS.primary }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: COLORS.textMuted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ paddingTop: '60px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: 700, color: COLORS.textMain, letterSpacing: '-0.02em', marginBottom: '16px' }}>Simple, transparent pricing</h2>
          <p style={{ fontSize: '16px', color: COLORS.textMuted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
            Start free, upgrade when you're ready.
          </p>
        </div>

        <div style={{ display: 'flex', backgroundColor: '#F3F4F6', padding: '4px', borderRadius: '100px', marginBottom: isMobile ? '32px' : '40px', border: `1px solid ${COLORS.border}` }}>
          <button onClick={() => setBillingCycle('monthly')} style={{ padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: billingCycle === 'monthly' ? COLORS.primary : 'transparent', color: billingCycle === 'monthly' ? COLORS.white : COLORS.textMuted, transition: 'all 0.3s' }}>Monthly</button>
          <button onClick={() => setBillingCycle('yearly')} style={{ padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: billingCycle === 'yearly' ? COLORS.primary : 'transparent', color: billingCycle === 'yearly' ? COLORS.white : COLORS.textMuted, transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '6px' }}>Yearly <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: billingCycle === 'yearly' ? COLORS.white : COLORS.primary, padding: '2px 6px', borderRadius: '100px', fontSize: '10px' }}>-20%</span></button>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', maxWidth: '1050px', width: '100%' }}>
          {[
            { 
              name: "STARTER", 
              price: "$0", 
              desc: "For individual creators.", 
              features: ["1 repurpose / day", "All core platforms", "Community support"],
              btn: "Get Started Free"
            },
            { 
              name: "PROFESSIONAL", 
              price: billingCycle === 'monthly' ? "$12" : "$10", 
              desc: "For serious business creators.", 
              features: ["Unlimited repurposes", "Bulk processing", "Custom AI training", "Priority support"],
              btn: "Start Free Trial",
              popular: true
            },
            { 
              name: "AGENCY", 
              price: billingCycle === 'monthly' ? "$40" : "$32", 
              desc: "Scale across all your clients.", 
              features: ["Unlimited team members", "Client workspaces", "API Access", "Dedicated manager"],
              btn: "Contact Sales"
            }
          ].map((plan, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedPlan(i)}
              className={`pricing-card ${selectedPlan === i ? 'active' : ''}`}
              style={{ 
                flex: 1, 
                backgroundColor: COLORS.white, 
                borderRadius: '24px', 
                padding: isMobile ? '32px 24px' : '48px 32px', 
                border: `2px solid ${selectedPlan === i ? COLORS.primary : COLORS.border}`, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {plan.popular && <div style={{ position: 'absolute', top: '-12px', backgroundColor: COLORS.primary, color: COLORS.white, padding: '4px 16px', borderRadius: '100px', fontSize: '10px', fontWeight: 800 }}>MOST POPULAR</div>}
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: COLORS.textMuted, marginBottom: '24px' }}>{plan.name}</h3>
              <div style={{ fontSize: '40px', fontWeight: 700, color: COLORS.textMain }}>{plan.price}<span style={{ fontSize: '14px', color: COLORS.textMuted }}>/mo</span></div>
              <p style={{ fontSize: '14px', color: COLORS.supportText, margin: '16px 0 32px', minHeight: '40px' }}>{plan.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: COLORS.textMain }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" style={{ display: 'block', width: '100%', padding: '14px', backgroundColor: selectedPlan === i ? COLORS.primary : 'transparent', border: `1px solid ${COLORS.primary}`, borderRadius: '12px', color: selectedPlan === i ? COLORS.white : COLORS.primary, fontWeight: 700, textDecoration: 'none', marginTop: '32px' }}>{plan.btn}</Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQ SECTION */}
      <section id="faq" style={{ paddingTop: '60px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FAFAFA', borderTop: `1px solid ${COLORS.border}`, paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDE9FE', color: COLORS.primary, padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' }}>FAQ</div>
          <h2 style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: 700, color: COLORS.textMain, letterSpacing: '-0.02em', marginBottom: '12px' }}>Questions worth answering.</h2>
          <p style={{ fontSize: '14px', color: COLORS.textMuted, maxWidth: '480px', margin: '0 auto' }}>Everything you need to know about ContentSplit.</p>
        </div>
        <div style={{ maxWidth: '720px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { q: "Does ContentSplit work with any blog post?", a: "Yes. Simply paste the text and it handles the rest. No formatting required." },
            { q: "Will the output actually sound like me?", a: "Yes. ContentSplit analyzes your writing style before generating outputs." },
            { q: "Can I edit the outputs before I publish?", a: "Absolutely. Every generated output is fully editable inside ContentSplit." },
            { q: "What platforms are supported?", a: "X threads, LinkedIn, Instagram, Facebook, and newsletters." },
            { q: "Is there a free plan?", a: "Yes! Our Starter plan is completely free with 1 repurpose per day." }
          ].map((item, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ backgroundColor: COLORS.white, border: `1px solid ${openFaq === i ? COLORS.primary : COLORS.border}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: openFaq === i ? COLORS.primary : COLORS.textMain, flex: 1 }}>{item.q}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={openFaq === i ? COLORS.primary : COLORS.textMuted} strokeWidth="3" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              {openFaq === i && <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${COLORS.border}`, fontSize: '13px', color: COLORS.supportText, lineHeight: 1.6, paddingTop: '16px' }}>{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#F8F7FF', paddingLeft: '20px', paddingRight: '20px' }}>
        <h2 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 700, color: COLORS.textMain, letterSpacing: '-0.02em', marginBottom: '24px', maxWidth: '800px', lineHeight: 1.1 }}>
          Your next blog post<br/>should be everywhere.
        </h2>
        <p style={{ fontSize: '16px', color: COLORS.textMuted, marginBottom: '40px' }}>
          Start free. No credit card. Just paste and go.
        </p>
        <Link to="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px', width: isMobile ? '100%' : 'auto' }}>
          Start for free &rarr;
        </Link>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0F172A', paddingTop: '80px', paddingBottom: '48px', paddingLeft: isMobile ? '20px' : '48px', paddingRight: isMobile ? '20px' : '48px', display: 'flex', justifyContent: 'center', color: '#94A3B8' }}>
        <div style={{ maxWidth: '1100px', width: '100%', display: 'flex', flexDirection: 'column', gap: isMobile ? '48px' : '80px', alignItems: 'flex-start' }}>
          
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '20px', color: COLORS.white }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: COLORS.primary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Logo size={16} color="white" />
                </div>
                ContentSplit
              </div>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                The ultimate content distribution engine for creators. Turn one article into 10+ social posts in seconds.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[TwitterIcon, LinkedInIcon, InstagramIcon].map((Icon, i) => (
                  <div key={i} style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}>
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, auto)', gap: isMobile ? '40px' : '64px', textAlign: 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: COLORS.white, textTransform: 'uppercase' }}>Product</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <Link to="#features" style={{ color: '#94A3B8', textDecoration: 'none' }}>Features</Link>
                  <Link to="#pricing" style={{ color: '#94A3B8', textDecoration: 'none' }}>Pricing</Link>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: COLORS.white, textTransform: 'uppercase' }}>Resources</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <Link to="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Blog</Link>
                  <Link to="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Docs</Link>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: COLORS.white, textTransform: 'uppercase' }}>Legal</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <Link to="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy</Link>
                  <Link to="#" style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms</Link>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%', paddingTop: '32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '20px', textAlign: isMobile ? 'left' : 'center' }}>
            <div style={{ fontSize: '13px', color: '#64748B' }}>
              © {new Date().getFullYear()} ContentSplit.ai
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748B' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
              All systems operational
            </div>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-mockup-container {
          perspective: 1000px;
        }

        .hero-card-center, .hero-card-left, .hero-card-right, .hero-card-fan-1, .hero-card-fan-2 {
          transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hero-mockup-container:hover .hero-card-center {
          transform: translate(-50%, -55%) scale(1.02);
          box-shadow: 0 40px 80px rgba(0,0,0,0.15);
        }

        .hero-mockup-container:hover .hero-card-left {
          transform: translate(-125%, -48%) rotate(-12deg) scale(0.98);
        }

        .hero-mockup-container:hover .hero-card-right {
          transform: translate(25%, -48%) rotate(12deg) scale(0.98);
        }

        .hero-mockup-container:hover .hero-card-fan-1 {
          transform: translate(-180%, -38%) rotate(-20deg) scale(0.95);
          opacity: 0.9;
        }

        .hero-mockup-container:hover .hero-card-fan-2 {
          transform: translate(80%, -38%) rotate(20deg) scale(0.95);
          opacity: 0.9;
        }

        @keyframes scan {
          0% { top: -20%; }
          100% { top: 120%; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes pulseArrow {
          0% { box-shadow: 0 0 0 0 rgba(91, 80, 214, 0.4); transform: translate(-50%, -50%) scale(1); }
          50% { box-shadow: 0 0 0 15px rgba(91, 80, 214, 0); transform: translate(-50%, -50%) scale(1.05); }
          100% { box-shadow: 0 0 0 0 rgba(91, 80, 214, 0); transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes skeletonShimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }

        @keyframes revealText {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-mockup-container {
            display: none;
          }
          .pricing-card.active {
            transform: none !important;
          }
          .nav-link {
            display: none;
          }
        }

        @media (max-width: 480px) {
          h2 { font-size: 28px !important; }
        }

        .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-scaleIn { animation: scaleIn 0.3s ease forwards; }
        .animate-pulseArrow { animation: pulseArrow 2s infinite cubic-bezier(0.4, 0, 0.2, 1); border-radius: 50%; }

        .skeleton-line {
          background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
          background-size: 200px 100%;
          animation: skeletonShimmer 1.5s infinite linear;
        }

        .demo-generated-line {
          opacity: 0;
          animation: revealText 0.6s ease forwards;
        }

        .pricing-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
          border-color: ${COLORS.primary}40 !important;
        }
        .pricing-card.active {
          border-color: ${COLORS.primary} !important;
          box-shadow: 0 20px 40px rgba(91, 80, 214, 0.1) !important;
          background-color: ${COLORS.white} !important;
        }

        .btn-primary {
          background-color: ${COLORS.primary};
          color: ${COLORS.white};
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 10px 20px rgba(91, 80, 214, 0.2);
        }

        .btn-secondary {
          background-color: ${COLORS.white};
          color: ${COLORS.textMain};
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          border: 1px solid ${COLORS.border};
          cursor: pointer;
        }
        .btn-secondary:hover {
          background-color: ${COLORS.pillBg};
          transform: translateY(-1px);
        }

        .nav-link {
          color: ${COLORS.textMuted};
          text-decoration: none;
          transition: all 0.2s;
          padding: 4px 0;
          position: relative;
        }
        .nav-link:hover {
          color: ${COLORS.textMain};
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: transparent;
          border-radius: 100px;
          transition: background-color 0.2s;
        }
        .nav-link:hover {
          color: ${COLORS.primary};
        }

        .nav-link.active {
          color: ${COLORS.textMain};
          font-weight: 600;
        }
        .nav-link.active::after {
          background-color: ${COLORS.primary};
        }
        
      `}</style>
    </div>
  );
};

export default LandingPage;