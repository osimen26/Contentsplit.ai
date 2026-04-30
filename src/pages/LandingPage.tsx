import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@components/application';
import { TwitterIcon, LinkedInIcon, InstagramIcon, FacebookIcon, NewsletterIcon } from '@components/ui/SocialIcons';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stepPreviews = [
    {
      label: 'Step 1 — Paste your content',
      html: (
        <>
          <div className="preview-item">
            <strong>Blog URL or text</strong>
            <br />
            Drop in your article and ContentSplit parses the full text, extracting key ideas and tone.
          </div>
          <div className="preview-item" style={{ background: 'var(--sys-color-neutral-100)', borderColor: 'var(--sys-color-primary-90)', color: 'var(--sys-color-primary)' }}>
            ✓ Tone detected: casual + expert
            <br />
            ✓ Key ideas extracted: 5
            <br />✓ Reading level: professional
          </div>
        </>
      )
    },
    {
      label: 'Step 2 — Choose your platforms',
      html: (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <span style={{ background: 'var(--sys-color-secondary-95)', color: '#1D9BF0', padding: 'var(--sys-spacing-xs) var(--sys-spacing-sm)', borderRadius: 'var(--sys-radius-full)', fontSize: 'var(--sys-font-small-text-regular-font-size, 12px)' }}><TwitterIcon size={12} /> Twitter</span>
            <span style={{ background: 'var(--sys-color-secondary-90)', color: '#0A66C2', padding: 'var(--sys-spacing-xs) var(--sys-spacing-sm)', borderRadius: 'var(--sys-radius-full)', fontSize: 'var(--sys-font-small-text-regular-font-size, 12px)' }}><LinkedInIcon size={12} /> LinkedIn</span>
            <span style={{ background: 'var(--sys-color-secondary-90)', color: '#1877F2', padding: 'var(--sys-spacing-xs) var(--sys-spacing-sm)', borderRadius: 'var(--sys-radius-full)', fontSize: 'var(--sys-font-small-text-regular-font-size, 12px)' }}><FacebookIcon size={12} /> Facebook</span>
            <span style={{ background: 'var(--sys-color-error-95)', color: '#E1306C', padding: 'var(--sys-spacing-xs) var(--sys-spacing-sm)', borderRadius: 'var(--sys-radius-full)', fontSize: 'var(--sys-font-small-text-regular-font-size, 12px)' }}><InstagramIcon size={12} /> Instagram</span>
            <span style={{ background: 'var(--sys-color-success-95)', color: '#10B981', padding: 'var(--sys-spacing-xs) var(--sys-spacing-sm)', borderRadius: 'var(--sys-radius-full)', fontSize: 'var(--sys-font-small-text-regular-font-size, 12px)' }}><NewsletterIcon size={12} /> Newsletter</span>
          </div>
          <div className="preview-item" style={{ fontSize: '13px' }}>
            Select one or all — ContentSplit generates each format independently, optimised for each platform.
          </div>
        </>
      )
    },
    {
      label: 'Step 3 — Copy and publish',
      html: (
        <>
          <div className="preview-item" style={{ background: 'var(--sys-color-neutral-100)', borderColor: 'var(--sys-color-primary-90)' }}>
            <strong style={{ color: 'var(--sys-color-primary)' }}>Twitter thread ready</strong>
            <br />
            <span style={{ fontSize: '13px', color: 'var(--sys-color-neutral-50)' }}>🚀 Building a coding habit in 30 days? Here's the secret…</span>
          </div>
          <div className="preview-item" style={{ fontSize: '13px' }}>
            Edit any output directly, then copy with one click. Changes auto-save as you type.
          </div>
        </>
      )
    }
  ];

  const faqs = [
    {
      q: 'Does ContentSplit work with any blog post?',
      a: 'Yes — paste a URL or the raw text. ContentSplit handles any length, any topic. It works best with blog posts over 300 words, as that gives it enough material to generate strong, distinct outputs for every platform.'
    },
    {
      q: 'Will the output actually sound like me?',
      a: "ContentSplit analyses your writing — tone, cadence, vocabulary — and mirrors it across every output. It's not generic AI-speak. That said, every output is editable, so you can tweak anything before you publish."
    },
    {
      q: 'Can I edit the outputs before I publish?',
      a: 'Absolutely. Every output opens in an editable field. You can change the tone, rephrase lines, or shorten the copy — and your changes auto-save as you type. Nothing gets lost.'
    },
    {
      q: 'How is this different from just using ChatGPT?',
      a: 'ChatGPT requires careful prompting, doesn\'t understand platform-specific formats, and produces generic output. ContentSplit is purpose-built for content repurposing — it knows what a LinkedIn post, a Twitter thread, and a newsletter intro actually look like, and it preserves your voice automatically.'
    },
    {
      q: "What's included in the free plan?",
      a: "The free plan gives you 5 repurposes per day — no credit card required. That's enough to see the full output quality across all five platforms before you decide if you want more."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="landing-page-redesign">
      {/* NAV */}
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">
            <Logo size={16} color="white" />
          </div>
          <span className="nav-logo-text">ContentSplit</span>
        </Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="btn-ghost">Log in</Link>
          <Link to="/register" className="btn-primary">Start free →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div className="hero-split">
            <div className="hero-left fade-up">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                <span>AI-powered content repurposing</span>
              </div>
            <h1>One blog post. A week of <em>content.</em></h1>
            <p className="hero-sub">Paste your article. Get platform-ready posts in seconds.</p>
              <div className="hero-ctas">
                <Link to="/register" className="btn-hero-primary">Start for free →</Link>
                <a href="#how" className="btn-hero-ghost">See how it works</a>
              </div>
              <div className="hero-trust">
                <div className="trust-avatars">
                  <span style={{ background: 'var(--sys-color-primary)' }}>MT</span>
                  <span style={{ background: 'var(--sys-color-success)' }}>PK</span>
                  <span style={{ background: 'var(--sys-color-warning)' }}>JR</span>
                  <span style={{ background: 'var(--sys-color-accent)' }}>SA</span>
                </div>
                <span className="trust-text"><strong>2,000+ creators</strong> already saving hours every week</span>
              </div>
            </div>
            <div className="hero-right fade-up" style={{ transitionDelay: '.15s' }}>
              <div className="hero-mockup">
                <div className="mockup-input-row">
                  <div className="mockup-input-text">How to build a consistent coding habit in 30 days — practical tips for developers…</div>
                  <div className="mockup-send">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                <div className="output-tabs">
                  <div className="output-tab active">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M4 6.5l1.5 1.5 2.5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                    Twitter/X
                  </div>
                  <div className="output-tab">LinkedIn</div>
                  <div className="output-tab">Facebook</div>
                  <div className="output-tab">Instagram</div>
                </div>
                <div className="output-card">
                  <div className="output-platform-row">
                    <span className="platform-dot"></span>
                    <span className="platform-name">Twitter/X · Thread</span>
                  </div>
                  <div className="output-text">🚀 Building a coding habit in 30 days? Here's the secret: start small, stay consistent, and track your progress. Here's what actually worked for me (thread)↓</div>
                  <div className="output-meta">
                    <span className="output-meta-tag">Thread · 8 tweets · 2.1k chars</span>
                    <span className="copy-btn">Copy all →</span>
                  </div>
                </div>
                <div className="output-stack">
                  <div className="output-mini">
                    <span className="output-mini-dot" style={{ background: '#0A66C2' }}></span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>LinkedIn Post ready</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginLeft: 'auto' }}>420 words</span>
                  </div>
                  <div className="output-mini">
                    <span className="output-mini-dot" style={{ background: '#1877F2' }}></span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Facebook Post ready</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginLeft: 'auto' }}>280 words</span>
                  </div>
                  <div className="output-mini">
                    <span className="output-mini-dot" style={{ background: '#E1306C' }}></span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Instagram Caption ready</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginLeft: 'auto' }}>140 words</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div id="trust">
        <div className="trust-strip">
          <span className="trust-strip-label">We support</span>
          <div className="platform-pill"><TwitterIcon size={16} /> Twitter/X</div>
          <div className="platform-pill"><FacebookIcon size={16} /> Facebook</div>
          <div className="platform-pill"><LinkedInIcon size={16} /> LinkedIn</div>
          <div className="platform-pill"><InstagramIcon size={16} /> Instagram</div>
          <div className="platform-pill"><NewsletterIcon size={16} /> Newsletter</div>
        </div>
      </div>

      {/* OUTPUT CARDS */}
      <section id="outputs">
        <div className="section-inner">
          <div className="outputs-head fade-up">
            <p className="eyebrow">What it creates</p>
            <h2 className="section-heading">Your blog, <em>everywhere</em> it needs to be.</h2>
            <p className="section-sub">Paste your article. In seconds, ContentSplit generates six distinct content formats, each optimised for how people actually consume content on that platform.</p>
          </div>
          <div className="outputs-grid">
            <div className="output-platform-card card-twitter fade-up">
              <div className="card-platform-row">
                <div className="card-platform-icon" style={{ background: '#E8F5FD' }}><TwitterIcon size={20} /></div>
                <div>
                  <div className="card-platform-name">Twitter/X</div>
                  <div className="card-platform-type">Thread</div>
                </div>
              </div>
              <div className="card-content">
                🚀 Building a coding habit in 30 days? Here's the secret: start small, stay consistent, and track your progress (thread)↓
                <div className="card-tag">8 tweets · Hook + CTA</div>
              </div>
            </div>
            <div className="output-platform-card card-linkedin fade-up" style={{ transitionDelay: '.05s' }}>
              <div className="card-platform-row">
                <div className="card-platform-icon" style={{ background: '#E8F0FB' }}><LinkedInIcon size={20} /></div>
                <div>
                  <div className="card-platform-name">LinkedIn</div>
                  <div className="card-platform-type">Thought leadership post</div>
                </div>
              </div>
              <div className="card-content">
                After helping 50+ developers build consistent habits, I found one thing that separates those who ship from those who don't…
                <div className="card-tag">Professional tone</div>
              </div>
            </div>
            <div className="output-platform-card card-facebook fade-up" style={{ transitionDelay: '.1s' }}>
              <div className="card-platform-row">
                <div className="card-platform-icon" style={{ background: '#E7F0FD' }}><FacebookIcon size={20} /></div>
                <div>
                  <div className="card-platform-name">Facebook</div>
                  <div className="card-platform-type">Engaging post</div>
                </div>
              </div>
              <div className="card-content">
                I tried building a coding habit 3 times before it finally stuck. The difference wasn't willpower — it was these 5 small changes.
                <div className="card-tag">Conversational</div>
              </div>
            </div>
            <div className="output-platform-card card-instagram fade-up" style={{ transitionDelay: '.15s' }}>
              <div className="card-platform-row">
                <div className="card-platform-icon" style={{ background: '#FDE8F5' }}><InstagramIcon size={20} /></div>
                <div>
                  <div className="card-platform-name">Instagram</div>
                  <div className="card-platform-type">Caption + hashtags</div>
                </div>
              </div>
              <div className="card-content">
                Consistency beats perfection every time 🔁 Here's a simple 30-day framework that works…
                <div className="card-tag">Hook + 15 hashtags</div>
              </div>
            </div>
            <div className="output-platform-card card-newsletter fade-up" style={{ transitionDelay: '.2s' }}>
              <div className="card-platform-row">
                <div className="card-platform-icon" style={{ background: '#E8FDF4' }}><NewsletterIcon size={20} /></div>
                <div>
                  <div className="card-platform-name">Newsletter</div>
                  <div className="card-platform-type">Email intro</div>
                </div>
              </div>
              <div className="card-content">
                This week I want to share something that changed how I approach coding — a dead-simple 30-day system that actually sticks.
                <div className="card-tag">Warm, direct tone</div>
              </div>
            </div>
            <div className="output-platform-card fade-up" style={{ transitionDelay: '.25s', background: 'linear-gradient(135deg, var(--sys-color-primary-95) 0%, var(--sys-color-primary-90) 100%)', borderColor: 'var(--sys-color-primary-80)' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '140px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>✦</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--sys-color-primary-30)', marginBottom: '6px' }}>All 5 platforms. One paste.</div>
                <div style={{ fontSize: '13px', color: 'var(--sys-color-primary)' }}>No credit card required · 5 free repurposes/day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="section-inner">
          <div className="fade-up">
            <p className="eyebrow">How it works</p>
            <h2 className="section-heading">Blog to every platform.<br />Three steps.</h2>
          </div>
          <div className="how-layout">
            <div className="steps-list">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`step-item ${activeStep === i ? 'active' : ''}`} onClick={() => setActiveStep(i)}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-text">
                    <div className="step-title">{['Paste content', 'Choose platforms', 'Copy and publish'][i]}</div>
                    <div className="step-desc">
                      {[
                        'Drop in your blog post. ContentSplit reads it and matches your voice.',
                        'Pick formats. Each output is tailored to the platform.',
                        'Edit before copying. Changes auto-saved.'
                      ][i]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="how-preview" id="how-preview">
                <div className="preview-label" id="preview-label">{stepPreviews[activeStep].label}</div>
                <div className="preview-screen">
                  <div className="preview-step-vis" id="preview-vis">
                    {stepPreviews[activeStep].html}
                  </div>
                </div>
              </div>
              <div className="how-cta fade-up">
                <Link to="/register" className="btn-hero-primary" style={{ background: 'var(--sys-color-primary)' }}>Try it free — no card needed →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '100px 0' }}>
        <div className="section-inner" style={{ padding: '0 40px' }}>
          <div className="features-head fade-up">
            <p className="eyebrow">Features</p>
            <h2 className="section-heading">Built different from basic AI writers.</h2>
            <p className="section-sub">Three things that make ContentSplit actually useful — not just another wrapper around GPT.</p>
          </div>
        </div>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 40px' }}>
          <div className="features-list">
            <div className="feature-row">
              <div className="feature-copy">
                <div className="feature-num">Feature 01</div>
                <h3 className="feature-title">It writes like you, not like a robot.</h3>
                <p className="feature-desc">ContentSplit preserves your unique voice across every platform. It analyses your writing style — your cadence, vocabulary, and tone — and mirrors it in every output.</p>
                <div className="feature-tag">◆ Voice preservation</div>
              </div>
              <div className="feature-visual">
                <div className="fv-card">
                  <div className="fv-row">
                    <div className="fv-avatar" style={{ background: 'var(--sys-color-primary)' }}>MT</div>
                    <div>
                      <div className="fv-name">Marcus T.</div>
                      <div className="fv-handle">@marcust · Just now</div>
                    </div>
                  </div>
                  <div className="fv-text">🚀 Building a coding habit in 30 days? Here's the secret that changed everything for me…</div>
                  <div className="fv-meta">Voice match: your style ✓</div>
                </div>
              </div>
            </div>
            <div className="feature-row" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="feature-copy">
                <div className="feature-num">Feature 02</div>
                <h3 className="feature-title">One article. Five platforms. Seconds.</h3>
                <p className="feature-desc">Stop spending hours reformatting the same content. ContentSplit generates all five platform formats simultaneously — each tailored, each ready to copy and paste.</p>
                <div className="feature-tag">◆ Instant repurposing</div>
              </div>
              <div className="feature-visual">
                <div className="fv-card">
                  <div style={{ marginBottom: '14px' }}>
                    <div className="fv-bar-label" style={{ marginBottom: '5px' }}><span>Generating outputs</span><span>5/5 done</span></div>
                    <div className="fv-bar-wrap"><div className="fv-bar" style={{ width: '100%' }}></div></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {['🐦 Twitter thread', '💼 LinkedIn post', '📘 Facebook post', '📷 Instagram caption', '✉ Newsletter intro'].map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                        <span>{item}</span><span style={{ color: 'var(--sys-color-success)' }}>✓ Ready</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '14px', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>Generated in 4.2 seconds</div>
                </div>
              </div>
            </div>
            <div className="feature-row" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="feature-copy">
                <div className="feature-num">Feature 03</div>
                <h3 className="feature-title">Edit. Auto-saved.</h3>
                <p className="feature-desc">Tweak tone, swap phrases. Auto-saves as you go.</p>
                <div className="feature-tag">◆ Auto-saved edits</div>
              </div>
              <div className="feature-visual">
                <div className="fv-card">
                  <div className="fv-edit-box">
                    Building a coding habit in 30 days? Here's the secret that changed everything for me<span className="fv-edit-cursor"></span>
                  </div>
                  <div className="fv-toolbar">
                    <button className="fv-tool">Tone ▾</button>
                    <button className="fv-tool">Shorten</button>
                    <button className="fv-tool">Rephrase</button>
                    <button className="fv-tool" style={{ marginLeft: 'auto', color: 'var(--sys-color-success)' }}>Auto-saved ✓</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="section-inner">
          <div className="testi-head fade-up">
            <p className="eyebrow">Testimonials</p>
            <h2 className="section-heading">What creators say.</h2>
            <p className="section-sub" style={{ color: 'var(--sys-color-neutral-50)', fontWeight: 300, fontSize: '16px' }}>Joined by 2,000+ creators.</p>
          </div>
          <div className="testi-grid">
            <div className="testi-card fade-up">
              <div className="testi-stars"><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span></div>
              <p className="testi-quote">"LinkedIn output is scary good. Doesn't sound like AI."</p>
              <div className="testi-author">
                <div className="author-avatar" style={{ background: 'var(--sys-color-primary)' }}>MT</div>
                <div>
                  <div className="author-name">Marcus T.</div>
                  <div className="author-title">Newsletter Writer</div>
                </div>
              </div>
            </div>
            <div className="testi-card fade-up" style={{ transitionDelay: '.06s' }}>
              <div className="testi-stars"><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span></div>
              <p className="testi-quote">"Whole week of content in 5 minutes."</p>
              <div className="testi-author">
                <div className="author-avatar" style={{ background: 'var(--sys-color-success)' }}>PK</div>
                <div>
                  <div className="author-name">Priya K.</div>
                  <div className="author-title">Growth Marketer</div>
                </div>
              </div>
            </div>
            <div className="testi-card fade-up" style={{ transitionDelay: '.12s' }}>
              <div className="testi-stars"><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span></div>
              <p className="testi-quote">"Cut content time in half. Engagement up."</p>
              <div className="testi-author">
                <div className="author-avatar" style={{ background: 'var(--sys-color-warning)' }}>JR</div>
                <div>
                  <div className="author-name">James R.</div>
                  <div className="author-title">Creator & Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PRICING */}
      <section id="pricing">
        <div className="section-inner">
          <div className="pricing-head fade-up">
            <p className="eyebrow">Pricing</p>
            <h2 className="section-heading">Built for every <em>stage</em> of your growth.</h2>
            <p className="section-sub">Start free, upgrade when you're ready. All plans include our core AI engine.</p>
          </div>

          <div className="pricing-grid">
            {/* Starter Plan */}
            <div className="pricing-card fade-up" style={{ transitionDelay: '.05s' }}>
              <div className="plan-name">Starter</div>
              <div className="plan-price">$0 <span>/mo</span></div>
              <p className="plan-desc">For creators just starting to explore the power of repurposing.</p>
              <ul className="plan-features">
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 5 conversions per day</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> All 5 core platforms</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Standard AI model</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Community support</li>
              </ul>
              <Link to="/register" className="btn-plan btn-plan-outline">Start for free</Link>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card popular fade-up" style={{ transitionDelay: '.1s' }}>
              <div className="popular-badge">Most Popular</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">$29 <span>/mo</span></div>
              <p className="plan-desc">For serious creators and marketers who need high-volume output.</p>
              <ul className="plan-features">
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited conversions</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Advanced "Voice" model</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Multi-document batching</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority email support</li>
              </ul>
              <Link to="/register" className="btn-plan btn-plan-primary">Get Pro Access</Link>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card fade-up" style={{ transitionDelay: '.15s' }}>
              <div className="plan-name">Team</div>
              <div className="plan-price">$79 <span>/mo</span></div>
              <p className="plan-desc">For content teams and agencies managing multiple clients.</p>
              <ul className="plan-features">
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 5 team seats included</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Collaborative workspace</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom platform templates</li>
                <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated account manager</li>
              </ul>
              <Link to="/register" className="btn-plan btn-plan-outline">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="section-inner">
          <div className="faq-layout">
            <div className="faq-aside fade-up">
              <p className="eyebrow">FAQ</p>
              <h2 className="section-heading" style={{ fontSize: '36px' }}>Common questions.</h2>
              <p className="section-sub" style={{ fontSize: '15px', marginTop: '12px' }}>Still need help? <Link to="/contact" style={{ color: 'var(--sys-color-primary)', textDecoration: 'none' }}>Chat with us →</Link></p>
            </div>
            <div className="faq-list fade-up" style={{ transitionDelay: '.1s' }}>
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => toggleFaq(i)}>
                    {faq.q}
                    <svg className="faq-arrow" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                  <div className="faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta">
        <div className="hero-glow"></div>
        <div className="cta-inner">
          <p className="eyebrow" style={{ color: 'var(--sys-color-primary)' }}>Get started</p>
          <h2 className="section-heading">One blog post.<br /><em>A week of content.</em></h2>
          <p className="section-sub">Start repurposing for free. No credit card, no setup, no waiting.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-hero-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>Start for free →</Link>
            <a href="#how" className="btn-hero-ghost">See how it works</a>
          </div>
          <p className="cta-note">5 free repurposes per day · No credit card required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-area">
        <div className="footer-inner">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <Logo size={14} color="white" />
            </div>
            <span className="footer-logo-text">ContentSplit</span>
          </Link>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <span className="footer-copy">© 2025 ContentSplit</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;