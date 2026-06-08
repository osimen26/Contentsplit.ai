import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Menu, X, ArrowRight, Check, ChevronDown, Copy,
  FileText, Layers, Star, Sparkles, Zap, Edit3, CheckCircle,
  Mail, List,
} from 'lucide-react'
import {
  TwitterIcon as TwIcon,
  LinkedInIcon as LiIcon,
  InstagramIcon as IgIcon,
} from '@components/ui/SocialIcons'

const YoutubeIcon = ({ size = 20, color = '#FF0000' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)


// ─── Design tokens (ContentSplit BUILD_GUIDE v1.0) ───────────────────────────
const T = {
  bg:          '#080B10',
  surface:     '#0D1018',
  surface2:    '#151C28',
  border:      '#1E2838',
  accent:      '#14B8A6',
  accentWarm:  '#FF6B6B',
  textPrimary:   '#F0F0F5',
  textSecondary: '#8A9BB5',
  textMuted:     '#3D5068',
  white:       '#FFFFFF',
  rSm:  '6px',
  rMd:  '12px',
  rLg:  '20px',
  rPill:'999px',
}

// ─── Shared font import (only loaded once) ────────────────────────────────────
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');`

// ─── Utility styles ───────────────────────────────────────────────────────────
const syne  = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const mono = (size: number): React.CSSProperties => ({
  fontFamily: '"JetBrains Mono", monospace', fontSize: size,
})
const label: React.CSSProperties = {
  ...dm(11, 600),
  letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent,
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
const Nav: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const navItems = [
    { label: 'Features',     href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing',      href: '#pricing' },
  ]
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '64px', zIndex: 1000,
        background: `${T.bg}cc`, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
      }} className="cs-nav">
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
          <span style={{ color: T.accent, fontSize: '26px', fontWeight: 700, lineHeight: 1, marginRight: '2px' }}>●</span>
          <span style={syne(20, 700, { color: T.textPrimary })}>ContentSplit</span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display:'flex', gap:'32px', listStyle:'none', margin:0, padding:0 }} className="cs-nav-links">
          {navItems.map(({ label: l, href }) => (
            <li key={href}>
              <a href={href} style={{ ...dm(14, 500, { color: T.textSecondary, textDecoration:'none' }) }} className="cs-nav-link">{l}</a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }} className="cs-nav-right">
          <button onClick={() => navigate('/login')} style={{ ...dm(14, 500, { color: T.textSecondary }), background:'transparent', border:'none', cursor:'pointer', padding:'8px 16px', borderRadius: T.rSm }} className="cs-ghost-btn">
            Log in
          </button>
          <Link to="/register" style={{ ...dm(14, 500, { color: T.white }), background: T.accent, border:'none', padding:'10px 22px', borderRadius: T.rPill, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'6px' }} className="cs-pill-btn">
            Start free →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button aria-label="Open menu" onClick={() => setOpen(true)} style={{ display:'none', background:'transparent', border:'none', cursor:'pointer', padding:'8px', color: T.textPrimary }} className="cs-mobile-btn">
          <Menu size={24} aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position:'fixed', inset:0, background:`${T.bg}ee`,
          backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
          zIndex:1001, display:'flex', flexDirection:'column', padding:'24px',
        }} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button aria-label="Close menu" onClick={() => setOpen(false)} style={{ position:'absolute', top:16, right:16, background:'transparent', border:'none', cursor:'pointer', color: T.textPrimary }}><X size={24} aria-hidden="true"/></button>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginTop:'80px' }}>
            {navItems.map(({ label: l, href }) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                style={{ ...dm(18, 500, { color: T.textPrimary, textDecoration:'none' }), padding:'16px 0', borderBottom:`1px solid ${T.border}` }}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginTop:'auto' }}>
            <button onClick={() => { navigate('/login'); setOpen(false) }}
              style={{ ...dm(16, 500, { color: T.textSecondary }), background:'transparent', border:`1px solid ${T.border}`, cursor:'pointer', padding:'14px', borderRadius: T.rMd }}>
              Log in
            </button>
            <Link to="/register" onClick={() => setOpen(false)}
              style={{ ...dm(16, 500, { color: T.white }), background: T.accent, padding:'14px', borderRadius: T.rMd, textDecoration:'none', textAlign:'center' }}>
              Start free →
            </Link>
          </div>
        </div>
      )}

      <style>{`
        ${FONT_IMPORT}

        /* Skip link */
        .cs-skip-link {
          position: absolute; top: -100%; left: 0;
          background: ${T.accent}; color: ${T.white};
          padding: 12px 24px; font-weight: 600; font-size: 14px;
          text-decoration: none; z-index: 9999; border-radius: 0 0 8px 0;
        }
        .cs-skip-link:focus { top: 0; }

        /* Nav */
        .cs-nav-link { position: relative; }
        .cs-nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:${T.accent}; transition:width 0.2s ease; }
        .cs-nav-link:hover { color:${T.textPrimary} !important; }
        .cs-nav-link:hover::after { width:100%; }
        .cs-ghost-btn:hover { color:${T.textPrimary} !important; background:${T.surface} !important; }
        .cs-pill-btn:hover { transform:scale(1.03); box-shadow:0 4px 20px ${T.accent}40; }

        /* Focus visible — every interactive element */
        :focus-visible {
          outline: 2px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* touch-action on all clickable elements */
        button, a, [role="button"] { touch-action: manipulation; }
        -webkit-tap-highlight-color: transparent;

        @media (max-width: 768px) {
          .cs-nav-links, .cs-nav-right { display:none !important; }
          .cs-mobile-btn { display:flex !important; }
        }

        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-8px); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
const platformTabs = [
  { id:'twitter',    label:'Twitter/X',  Icon: TwIcon  },
  { id:'linkedin',   label:'LinkedIn',   Icon: LiIcon  },
  { id:'instagram',  label:'Instagram',  Icon: IgIcon  },
  { id:'newsletter', label:'Newsletter', Icon: Mail    },
  { id:'youtube',    label:'YouTube',    Icon: YoutubeIcon },
  { id:'summary',    label:'Summary',    Icon: List    },
]

const mockOutputs: Record<string, string[]> = {
  twitter: [
    '🌟 Just discovered the secret to 10x content creation.',
    'Most creators spend hours repurposing one piece of content. Here is the better way:',
    '1/ Write once  2/ Auto-distribute  3/ Never repeat yourself',
    'Your time is worth more than editing AI outputs.',
    'The future of content is one-click everywhere. 🚀',
  ],
  linkedin: [
    `I'm excited to share a framework that has transformed my content creation workflow.\n\nAfter months of experimentation, here is what actually works:\n→ Write once\n→ Adapt for each platform\n→ Distribute everywhere\n\nWhat's your content strategy? 👇`,
  ],
  instagram: [
    `The secret to 10x your content creation 🔥\n\nWrite once. Distribute everywhere. Here's the framework creators are using to dominate every platform without burning out.\n\n#contentcreator #growthhacks #socialmedia #contentmarketing #creator`,
  ],
  newsletter: [
    `Subject: The content creation secret nobody talks about\n\nHey,\n\nMost creators grind for hours repurposing a single blog post. There's a better way — and I'm going to show you exactly how it works.`,
  ],
  youtube: [
    `Hook (0-15s): "What if I told you that a single blog post could power your entire week of content across every platform?"\n\n[CUT] Setup (15-45s): "Today I'm sharing the exact framework I use..."\n\n[CUT] Main content...`,
  ],
  summary: [
    `📝 TL;DR\n• Key insight: One article → unlimited content\n• Framework: Write once, adapt everywhere  \n• Result: 10x output, same effort`,
  ],
}

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('twitter')

  return (
    <section style={{
      minHeight: '100vh', background: T.bg,
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'120px 24px 80px', position:'relative', overflow:'hidden',
    }}>
      {/* Radial accent glow */}
      <div style={{
        position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
        width:'700px', height:'500px', pointerEvents:'none',
        background:`radial-gradient(ellipse at 50% 0%, ${T.accent}20 0%, transparent 65%)`,
      }} />

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', maxWidth:'900px' }}>
        {/* Badge */}
        <div style={{
          ...dm(13, 400, { color: T.textSecondary }),
          border:`1px solid ${T.border}`, background: T.surface,
          padding:'6px 16px', borderRadius: T.rPill,
          marginBottom:'24px',
          opacity:0, animation:'fadeInUp 0.6s ease forwards',
          animationDelay: '0ms',
        }}>
          ✦ AI-Powered Content Repurposing
        </div>

        {/* Headline */}
        <h1 style={{
          ...syne(72, 800, { color: T.textPrimary, textAlign:'center', lineHeight:1.05, maxWidth:'860px', marginBottom:'24px' }),
          fontSize:'clamp(2.5rem, 7vw, 4.5rem)',
          textWrap:'balance',
          opacity:0, animation:'fadeInUp 0.6s ease forwards', animationDelay:'150ms',
        }}>
          One blog post.<br />
          <span style={{ color: T.accent }}>Six</span> platforms.<br />
          Zero rewrites.
        </h1>

        {/* Sub */}
        <p style={{
          ...dm(18, 400, { color: T.textSecondary, textAlign:'center', lineHeight:1.6, maxWidth:'580px', marginBottom:'40px' }),
          fontSize:'clamp(1rem, 2vw, 1.25rem)',
          opacity:0, animation:'fadeInUp 0.6s ease forwards', animationDelay:'300ms',
        }}>
          ContentSplit takes your long-form blog and breaks it into ready-to-publish content for Twitter/X, LinkedIn, Instagram, newsletters, YouTube, and more. Paste once. Publish everywhere.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'12px', marginBottom:'16px', flexWrap:'wrap', justifyContent:'center', opacity:0, animation:'fadeInUp 0.6s ease forwards', animationDelay:'450ms' }}>
          <Link to="/register" style={{ ...dm(16, 600, { color: T.white }), background: T.accent, padding:'16px 32px', borderRadius: T.rPill, textDecoration:'none', display:'flex', alignItems:'center', gap:'8px' }} className="cs-cta-primary">
            Start for free <ArrowRight size={18} />
          </Link>
          <a href="#how-it-works" style={{ ...dm(16, 500, { color: T.textSecondary }), border:`1px solid ${T.border}`, padding:'16px 32px', borderRadius: T.rPill, textDecoration:'none', display:'flex', alignItems:'center', gap:'8px' }} className="cs-cta-ghost">
            See how it works
          </a>
        </div>

        {/* Below CTA */}
        <p style={{ ...dm(12, 400, { color: T.textMuted }), marginBottom:'64px', opacity:0, animation:'fadeInUp 0.6s ease forwards', animationDelay:'600ms' }}>
          No credit card required · 5 free repurposes per day
        </p>

        {/* Hero Mockup */}
        <div style={{
          width:'100%', maxWidth:'1000px',
          opacity:0, animation:'fadeInUp 0.6s ease forwards, floatY 4s ease-in-out 750ms infinite',
          animationDelay:'750ms',
        }} className="cs-hero-mockup">
          <div style={{ background: T.surface, border:`1px solid ${T.border}`, borderRadius: T.rLg, overflow:'hidden', boxShadow:`0 0 80px ${T.accent}12` }}>
            {/* Window chrome */}
            <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'14px 20px', background: T.surface2, borderBottom:`1px solid ${T.border}` }}>
              {['#FF5F57','#FFBD2E','#28CA41'].map((c,i) => <div key={i} style={{ width:12, height:12, borderRadius:'50%', background:c }}/>)}
              <span style={{ ...mono(11), color: T.textMuted, marginLeft:'12px' }}>ContentSplit — editor</span>
            </div>

            {/* Two-panel content */}
            <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', minHeight:'380px' }} className="cs-mockup-grid">
              {/* Left: Input */}
              <div style={{ padding:'20px', background: T.surface2, borderRight:`1px solid ${T.border}` }} className="cs-input-panel">
                <div style={{ ...label, marginBottom:'12px' }}>Your Blog Post</div>
                <div style={{ background: T.surface, border:`1px solid ${T.border}`, borderRadius: T.rMd, padding:'16px', height:'300px', ...dm(13, 400, { color: T.textSecondary, lineHeight:1.6 }), overflow:'hidden' }}>
{`The secret to 10x your content creation...

Most creators spend hours repurposing one piece of content across multiple platforms. But there's a better way.

By treating your content as a reusable asset and using AI to handle the formatting, you can turn one article into weeks worth of social posts.

Here's the framework I use:
1. Write once
2. Adapt for each platform
3. Distribute everywhere

The future of content is one-click everywhere.`}
                </div>
              </div>

              {/* Right: Output */}
              <div style={{ display:'flex', flexDirection:'column' }}>
                {/* Platform tabs */}
                <div style={{ display:'flex', borderBottom:`1px solid ${T.border}`, overflowX:'auto' }}>
                  {platformTabs.map(({ id, label: lbl, Icon }) => (
                    <button key={id} onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} style={{
                      ...dm(12, 500),
                      color: activeTab === id ? T.accent : T.textMuted,
                      background:'transparent', border:'none', cursor:'pointer',
                      padding:'14px 16px', whiteSpace:'nowrap',
                      borderBottom:`2px solid ${activeTab === id ? T.accent : 'transparent'}`,
                      display:'flex', alignItems:'center', gap:'6px',
                      transition:'color 0.2s ease, border-color 0.2s ease',
                    }}>
                      <Icon size={13} /> {lbl}
                    </button>
                  ))}
                </div>

                {/* Output content */}
                <div style={{ padding:'20px', flex:1, overflow:'auto', display:'flex', flexDirection:'column', gap:'10px' }}>
                  {(mockOutputs[activeTab] ?? []).map((t, i) => (
                    <div key={i} style={{ padding:'12px 16px', background: T.surface2, border:`1px solid ${T.border}`, borderRadius: T.rMd, ...dm(13, 400, { color: T.textPrimary, lineHeight:1.55 }), whiteSpace:'pre-wrap' }}>
                      {activeTab === 'twitter' && <span style={{ ...dm(11,600,{ color: T.accent }), marginRight:'8px' }}>{i+1}</span>}
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cs-cta-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px ${T.accent}40; }
        .cs-cta-ghost:hover   { color:${T.textPrimary} !important; border-color:${T.textMuted} !important; }
        @media (max-width: 768px) {
          .cs-hero-mockup { display:none; }
          .cs-mockup-grid { grid-template-columns:1fr !important; }
          .cs-input-panel { border-right:none !important; border-bottom:1px solid ${T.border} !important; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL PROOF BAR
// ─────────────────────────────────────────────────────────────────────────────
const SocialProofBar: React.FC = () => {
  const logos = ['Indie Hackers', 'Product Hunt', 'Growth.design', 'Beehiiv', 'Substack']
  return (
    <section style={{ background: T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:'28px 24px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
        <p style={{ ...dm(14, 400, { color: T.textMuted, textAlign:'center' }) }}>
          Trusted by 2,000+ creators, marketers, and content teams
        </p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'24px', flexWrap:'wrap', opacity:0.4 }}>
          {logos.map((l, i) => (
            <React.Fragment key={l}>
              <span style={{ ...mono(12), color: T.textMuted, letterSpacing:'0.05em' }}>{l}</span>
              {i < logos.length - 1 && <span style={{ width:4, height:4, borderRadius:'50%', background: T.textMuted, display:'inline-block', opacity:0.3 }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// OUTPUT SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────
const formats = [
  { id:'twitter',    Icon: TwIcon,      color:'#1DA1F2', label:'Twitter/X',  format:'Thread',      desc:'Hook → thread → CTA, tweet by tweet',       stats:'280 chars · 5–10 tweets' },
  { id:'linkedin',   Icon: LiIcon,      color:'#0A66C2', label:'LinkedIn',   format:'Post',        desc:'Professional thought leadership post',       stats:'Professional tone · 3000 chars' },
  { id:'instagram',  Icon: IgIcon,      color:'#E1306C', label:'Instagram',  format:'Caption',     desc:'Scroll-stopping caption with hashtags',      stats:'2200 chars · 30 hashtags' },
  { id:'newsletter', Icon: Mail,        color:'#EA4335', label:'Newsletter', format:'Email',       desc:'Email-ready section with subject line',      stats:'Subject line + opening paragraph' },
  { id:'youtube',    Icon: YoutubeIcon, color:'#FF0000', label:'YouTube',    format:'Description', desc:'SEO-optimized video description',            stats:'Timestamps · keywords · CTAs' },
  { id:'summary',    Icon: FileText,    color:'#14B8A6', label:'Summary',    format:'TL;DR',       desc:'Quick summary for busy readers',             stats:'3–5 bullet points' },
]

const OutputShowcase: React.FC = () => (
  <section style={{ background: T.bg, padding:'96px 24px' }}>
    <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
      <span style={{ ...label, display:'block', marginBottom:'12px' }}>WHAT IT CREATES</span>
      <h2 style={{ ...syne(48, 700, { color: T.textPrimary, marginBottom:'16px' }), fontSize:'clamp(2rem, 4vw, 3rem)' }}>
        Your blog, everywhere it needs to be.
      </h2>
      <p style={{ ...dm(17, 400, { color: T.textSecondary, lineHeight:1.6, maxWidth:'600px', marginBottom:'48px' }) }}>
        Paste your article. In seconds, ContentSplit generates six distinct content formats, each optimised for how people actually consume content on that platform.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px' }}>
        {formats.map(f => (
          <div key={f.id} style={{ background: T.surface, border:`1px solid ${T.border}`, borderRadius: T.rLg, padding:'24px', transition:'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease' }} className="cs-format-card">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:40, height:40, borderRadius: T.rMd, background:`${f.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <f.Icon size={20} color={f.color} />
                </div>
                <span style={{ ...dm(14, 600, { color: T.textPrimary }) }}>{f.label}</span>
              </div>
              <ArrowRight size={16} color={T.textMuted} aria-hidden="true" />
            </div>
            <div style={{ ...dm(18, 700, { color: T.textPrimary, marginBottom:'8px' }) }}>{f.format}</div>
            <p style={{ ...dm(13, 400, { color: T.textSecondary, lineHeight:1.5, marginBottom:'16px' }) }}>{f.desc}</p>
            <div style={{ ...mono(11), color: T.textMuted, padding:'8px 12px', background: T.surface2, borderRadius:'8px', display:'inline-block' }}>{f.stats}</div>
          </div>
        ))}
      </div>
    </div>
    <style>{`.cs-format-card:hover { border-color:${T.accent}40 !important; transform:translateY(-4px); box-shadow:0 8px 32px ${T.accent}15; }`}</style>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
const steps = [
  { step:1, Icon: FileText, title:'Paste your content',     desc:'Drop in your blog post URL or paste the full text. ContentSplit reads it and understands the key ideas, tone, and structure.' },
  { step:2, Icon: Layers,   title:'Choose your platforms',  desc:"Pick which formats you need — one or all six. ContentSplit generates each one separately, tailored to that platform's content style." },
  { step:3, Icon: Copy,     title:'Copy and publish',       desc:'Each output is editable before you copy. Tweak the tone, swap out phrases, and publish directly from the editor.' },
]

const HowItWorks: React.FC = () => (
  <section id="how-it-works" style={{ background: T.bg, padding:'96px 24px', scrollMarginTop:'64px' }}>
    <div style={{ maxWidth:'800px', margin:'0 auto' }}>
      <span style={{ ...label, display:'block', textAlign:'center', marginBottom:'12px' }}>HOW IT WORKS</span>
      <h2 style={{ ...syne(48, 700, { color: T.textPrimary, textAlign:'center', marginBottom:'56px' }), fontSize:'clamp(2rem, 4vw, 3rem)' }}>
        Three steps. Zero friction.
      </h2>
      <div style={{ position:'relative', display:'flex', flexDirection:'column', gap:'48px' }}>
        <div style={{ position:'absolute', left:'32px', top:0, bottom:0, width:'2px', background: T.border, zIndex:0 }}/>
        {steps.map(s => (
          <div key={s.step} style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-start', gap:'24px' }}>
            {/* Ghost number */}
            <div style={{ position:'absolute', left:'-8px', top:'-16px', ...syne(120, 800, { color: T.accent }), opacity:0.06, lineHeight:1, pointerEvents:'none', userSelect:'none' }}>{s.step}</div>
            {/* Icon box */}
            <div style={{ width:64, height:64, flexShrink:0, borderRadius: T.rMd, background: T.surface, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <s.Icon size={24} color={T.accent} />
            </div>
            <div style={{ paddingTop:'8px' }}>
              <h3 style={{ ...syne(20, 600, { color: T.textPrimary, marginBottom:'10px' }) }}>{s.title}</h3>
              <p style={{ ...dm(16, 400, { color: T.textSecondary, lineHeight:1.65, maxWidth:'440px' }) }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// LIVE DEMO
// ─────────────────────────────────────────────────────────────────────────────
const LiveDemo: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateThread = async () => {
    if (!input.trim()) return
    setLoading(true)
    setOutput([])
    try {
      const res = await fetch('/api/generate-thread', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ content: input }),
      })
      const data = await res.json()
      if (data.tweets) {
        for (let i = 0; i < data.tweets.length; i++) {
          await new Promise(r => setTimeout(r, 100))
          setOutput(prev => [...prev, data.tweets[i]])
        }
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const copyAll = () => {
    navigator.clipboard.writeText(output.map((t,i) => `${i+1}. ${t}`).join('\n\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{ background: T.surface, padding:'96px 24px' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <h2 style={{ ...syne(48, 700, { color: T.textPrimary, textAlign:'center', marginBottom:'16px' }), fontSize:'clamp(2rem, 4vw, 3rem)' }}>
          See it work before you sign up.
        </h2>
        <p style={{ ...dm(16, 400, { color: T.textSecondary, textAlign:'center', marginBottom:'48px' }) }}>
          No account needed. Paste any blog excerpt and watch ContentSplit generate a Twitter thread in real time.
        </p>
        <div style={{ background: T.bg, border:`1px solid ${T.border}`, borderRadius: T.rLg, display:'grid', gridTemplateColumns:'1fr 1fr', overflow:'hidden' }} className="cs-demo-grid">
          {/* Left */}
          <div style={{ padding:'24px', borderRight:`1px solid ${T.border}` }} className="cs-demo-left">
            <label htmlFor="cs-demo-input" style={{ ...label, display:'block', marginBottom:'12px' }}>Blog excerpt</label>
            <textarea
              id="cs-demo-input"
              aria-label="Blog excerpt — paste a paragraph from any blog post"
              style={{ width:'100%', height:'200px', background: T.surface2, border:`1px solid ${T.border}`, borderRadius: T.rMd, padding:'16px', ...dm(15, 400, { color: T.textSecondary }), resize:'none', outline:'none', transition:'border-color 0.2s ease', boxSizing:'border-box' }}
              placeholder="Paste a paragraph from any blog post…"
              value={input} onChange={e => setInput(e.target.value)}
              className="cs-demo-textarea"
            />
            <button
              onClick={generateThread} disabled={loading || !input.trim()}
              style={{ ...dm(14, 600, { color: T.white }), background: T.accent, border:'none', cursor:'pointer', padding:'14px 24px', borderRadius: T.rMd, marginTop:'16px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease' }}
              className="cs-gen-btn"
            >
              {loading ? 'Generating...' : <><Sparkles size={16}/> Generate Twitter Thread <ArrowRight size={16}/></>}
            </button>
          </div>
          {/* Right */}
          <div style={{ padding:'24px', display:'flex', flexDirection:'column' }}>
            <div style={{ ...label, marginBottom:'12px' }} aria-hidden="true">Generated Twitter/X Thread</div>
            <div role="status" aria-live="polite" aria-label="Generated Twitter/X Thread" style={{ display:'flex', flexDirection:'column', gap:'10px', maxHeight:'280px', overflow:'auto', flex:1 }}>
            {output.length > 0 ? (
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {output.map((t,i) => (
                  <div key={i} style={{ padding:'12px 16px', background: T.surface2, border:`1px solid ${T.border}`, borderRadius: T.rMd, ...dm(14, 400, { color: T.textPrimary, lineHeight:1.55 }) }}>
                    <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:20, height:20, borderRadius:'50%', background: T.accent, ...dm(11, 600, { color: T.white }), marginRight:'8px' }}>{i+1}</span>
                    {t}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ ...dm(14, 400, { color: T.textMuted, fontStyle:'italic', textAlign:'center' }), padding:'48px 0' }}>
                Generated output will appear here…
              </div>
            )}
            </div>
            {output.length > 0 && (
              <button onClick={copyAll} style={{ ...dm(13, 500, { color: T.textSecondary }), background:'transparent', border:'none', cursor:'pointer', padding:'8px 12px', borderRadius:'8px', display:'flex', alignItems:'center', gap:'6px', marginTop:'12px', transition:'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease' }} className="cs-copy-btn">
                {copied ? <><Check size={14}/> Copied!</> : <><Copy size={14}/> Copy all</>}
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .cs-demo-textarea:focus { border-color:${T.accent} !important; }
        .cs-gen-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 4px 16px ${T.accent}40; }
        .cs-gen-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .cs-copy-btn:hover { background:${T.surface} !important; }
        @media (max-width:640px) {
          .cs-demo-grid { grid-template-columns:1fr !important; }
          .cs-demo-left { border-right:none !important; border-bottom:1px solid ${T.border}; }
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE HIGHLIGHTS
// ─────────────────────────────────────────────────────────────────────────────
const features = [
  {
    label:'Tone Awareness',
    headline:"It writes like you, not like a robot.",
    desc:"ContentSplit preserves the voice, vocabulary, and energy of your original post. The LinkedIn version doesn't sound like the Twitter version — because they shouldn't.",
    visual:'comparison',
  },
  {
    label:'Batch Mode',
    headline:"Run a whole content calendar in one session.",
    desc:"Upload multiple blog posts and queue them. ContentSplit processes each one and returns a full set of outputs per article — ready for scheduling.",
    visual:'queue',
  },
  {
    label:'Edit Before Export',
    headline:"Every output is a starting point, not a final draft.",
    desc:"The editor is inline. Click any generated text and edit it directly. No jumping between tabs or copy-pasting into Notion.",
    visual:'editor',
  },
]

const FeatureVisual: React.FC<{ visual: string }> = ({ visual }) => {
  if (visual === 'comparison') return (
    <>
      <div style={{ display:'flex', gap:'10px', marginBottom:'12px' }}>
        <TwIcon size={15} /><LiIcon size={15} />
      </div>
      {[
        { platform:'Twitter version', text:'🚀 Just discovered the secret to 10x your content creation. Here is the framework:' },
        { platform:'LinkedIn version', text:"I'm excited to share a framework that has transformed my content creation workflow. After months of experimentation, here is what actually works..." },
      ].map(({ platform, text }) => (
        <div key={platform} style={{ padding:'12px', background: T.surface2, borderRadius: T.rMd, border:`1px solid ${T.border}`, marginBottom:'10px' }}>
          <span style={{ ...dm(10, 600, { color: T.textMuted, textTransform:'uppercase', letterSpacing:'0.1em', display:'block', marginBottom:'8px' }) }}>{platform}</span>
          <p style={{ ...dm(13, 400, { color: T.textPrimary, lineHeight:1.5, margin:0 }) }}>{text}</p>
        </div>
      ))}
    </>
  )
  if (visual === 'queue') return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
        <span style={{ ...dm(12, 600, { color: T.textSecondary }) }}>Content Queue</span>
        <span style={{ ...dm(11, 400, { color: T.accent }) }}>3 posts processing</span>
      </div>
      {[
        { text:'SEO framework blog post...', active:true },
        { text:'Announcing new feature...', active:false },
        { text:'Weekly newsletter #42...',  active:false },
      ].map(({ text, active }, i) => (
        <div key={i} style={{ padding:'12px', background: T.surface2, borderRadius: T.rMd, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px' }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background: active ? T.accent : T.border, flexShrink:0 }}/>
          <span style={{ ...dm(13, 400, { color: T.textPrimary }), flex:1 }}>{text}</span>
          {active && <Zap size={14} color={T.accent}/>}
        </div>
      ))}
    </>
  )
  if (visual === 'editor') return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
        <span style={{ ...dm(12, 600, { color: T.textSecondary }) }}>Tweet #1</span>
        <Edit3 size={14} color={T.textMuted}/>
      </div>
      <div style={{ padding:'12px', background: T.surface2, borderRadius: T.rMd, border:`2px solid ${T.accent}`, marginBottom:'12px' }}>
        <textarea defaultValue="🚀 Just discovered the secret to 10x your content creation. Here is the framework:"
          style={{ width:'100%', background:'transparent', border:'none', ...dm(13, 400, { color: T.textPrimary }), resize:'none', outline:'none', minHeight:'80px', fontFamily:'"DM Sans", sans-serif' }}/>
      </div>
      <div style={{ display:'flex', gap:'6px', alignItems:'center', ...dm(12, 400, { color: T.accent }) }}>
        <CheckCircle size={12}/> Changes auto-saved
      </div>
    </>
  )
  return null
}

const FeatureHighlights: React.FC = () => (
  <section id="features" style={{ background: T.bg, padding:'96px 24px', scrollMarginTop:'64px' }}>
    <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
      <span style={{ ...label, display:'block', marginBottom:'12px' }}>FEATURES</span>
      <h2 style={{ ...syne(48, 700, { color: T.textPrimary, marginBottom:'64px' }), fontSize:'clamp(2rem, 4vw, 3rem)' }}>
        The engine behind your content empire.
      </h2>
      {features.map((f, i) => (
        <div key={f.label} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'center', padding:'48px 0', borderBottom:`1px solid ${T.border}` }} className="cs-feature-row">
          {/* Text (swaps sides on even rows) */}
          <div style={{ order: i % 2 === 1 ? 2 : 1, display:'flex', flexDirection:'column', gap:'14px' }}>
            <span style={{ ...dm(12, 600, { color: T.accent, textTransform:'uppercase', letterSpacing:'0.1em' }) }}>{f.label}</span>
            <h3 style={{ ...syne(24, 600, { color: T.textPrimary }) }}>{f.headline}</h3>
            <p style={{ ...dm(16, 400, { color: T.textSecondary, lineHeight:1.65 }) }}>{f.desc}</p>
          </div>
          {/* Visual */}
          <div style={{ order: i % 2 === 1 ? 1 : 2, background: T.surface, border:`1px solid ${T.border}`, borderRadius: T.rLg, padding:'24px', minHeight:'240px' }}>
            <FeatureVisual visual={f.visual}/>
          </div>
        </div>
      ))}
    </div>
    <style>{`.cs-feature-row { @media (max-width:768px) { grid-template-columns:1fr !important; } }`}</style>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
const testimonials = [
  { quote:"I write one post a week and now it shows up everywhere. Saves me 3 hours minimum.",       author:'Adaeze O.', role:'Content Strategist' },
  { quote:"The LinkedIn output is scary good. It doesn't sound like AI. That's rare.",               author:'Marcus T.', role:'Indie Hacker & Newsletter Writer' },
  { quote:"I use it for every Substack issue. Twitter thread → newsletter intro → caption. Done.",   author:'Priya K.',  role:'Growth Marketer at a B2B SaaS' },
]

const Testimonials: React.FC = () => (
  <section style={{ background: T.surface, padding:'96px 24px' }}>
    <div style={{ maxWidth:'960px', margin:'0 auto' }}>
      <h2 style={{ ...syne(48, 700, { color: T.textPrimary, textAlign:'center', marginBottom:'48px' }), fontSize:'clamp(2rem, 4vw, 3rem)' }}>
        What creators are saying.
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: T.bg, border:`1px solid ${T.border}`, borderRadius: T.rMd, padding:'28px', display:'flex', flexDirection:'column', gap:'16px', transition:'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease' }} className="cs-tcard">
            <div style={{ display:'flex', gap:'4px' }} aria-label="5 out of 5 stars">
              {[...Array(5)].map((_,j) => <Star key={j} size={15} fill={T.accent} color={T.accent} aria-hidden="true"/>)}
            </div>
            <p style={{ ...dm(16, 400, { color: T.textSecondary, lineHeight:1.65, fontStyle:'italic' }), flex:1 }}>"{t.quote}"</p>
            <div>
              <div style={{ ...dm(14, 600, { color: T.textPrimary }) }}>{t.author}</div>
              <div style={{ ...dm(13, 400, { color: T.textMuted }) }}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`.cs-tcard:hover { border-color:${T.accent}40 !important; transform:translateY(-4px); }`}</style>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────────────────────
const plans = [
  {
    name:'Free', price:'$0', period:'/month',
    subtitle:'For creators just getting started',
    features:['5 repurposes per day','Twitter, LinkedIn, Instagram','Copy-to-clipboard export','Basic editor'],
    cta:'Get started free', popular:false,
  },
  {
    name:'Pro', price:'$12', period:'/month',
    subtitle:'For teams and serious creators',
    features:['Unlimited repurposes','All 6 output formats','Batch mode (up to 10 posts/session)','Inline editor + version history','Priority AI generation','Early access to new formats'],
    cta:'Start Pro free for 7 days', popular:true,
  },
]

const Pricing: React.FC = () => (
  <section id="pricing" style={{ background: T.surface, padding:'96px 24px', scrollMarginTop:'64px' }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <h2 style={{ ...syne(48, 700, { color: T.textPrimary, textAlign:'center', marginBottom:'48px' }), fontSize:'clamp(2rem, 4vw, 3rem)' }}>
        One tool. Every platform.
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'24px' }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background: T.bg, border:`1px solid ${plan.popular ? T.accent : T.border}`, borderRadius: T.rLg, padding:'32px', display:'flex', flexDirection:'column', position:'relative', boxShadow: plan.popular ? `0 0 40px ${T.accent}15` : 'none' }}>
            {plan.popular && (
              <div style={{ position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', background: T.accent, ...dm(11, 600, { color: T.white }), letterSpacing:'0.05em', textTransform:'uppercase', padding:'6px 16px', borderRadius:'20px' }}>
                Most popular
              </div>
            )}
            <h3 style={{ ...syne(20, 600, { color: T.textPrimary, marginBottom:'8px' }) }}>{plan.name}</h3>
            <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'4px' }}>
              <span style={{ ...syne(48, 700, { color: T.textPrimary }) }}>{plan.price}</span>
              <span style={{ ...dm(14, 400, { color: T.textMuted }) }}>{plan.period}</span>
            </div>
            <p style={{ ...dm(14, 400, { color: T.textSecondary, marginBottom:'24px' }) }}>{plan.subtitle}</p>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'12px', flex:1, marginBottom:'32px' }}>
              {plan.features.map((f,j) => (
                <li key={j} style={{ display:'flex', alignItems:'center', gap:'12px', ...dm(14, 400, { color: T.textSecondary }) }}>
                  <Check size={16} color={T.accent}/> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" style={{ ...dm(15, 600, { color: plan.popular ? T.white : T.textSecondary }), background: plan.popular ? T.accent : 'transparent', border:`1px solid ${plan.popular ? T.accent : T.border}`, padding:'16px 24px', borderRadius: T.rMd, textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease' }} className={plan.popular ? 'cs-cta-primary' : 'cs-cta-ghost'}>
              {plan.cta} <ArrowRight size={16}/>
            </Link>
          </div>
        ))}
      </div>
      <p style={{ ...dm(13, 400, { color: T.textMuted, textAlign:'center', marginTop:'24px' }) }}>No contracts. Cancel anytime.</p>
    </div>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
const faqs = [
  { q:'Does ContentSplit work with any blog post?',      a:'Yes. Paste raw text or a URL. It works with Substack, Medium, WordPress, Ghost, or plain Google Docs exports.' },
  { q:'Will the output actually sound like me?',         a:"ContentSplit uses your original post's vocabulary and sentence structure as a reference. The more specific and human your writing, the better the outputs." },
  { q:'Can I edit the outputs before I publish?',        a:'Every output is editable inline. ContentSplit generates a starting draft — you always have the final say.' },
  { q:'What platforms are supported?',                   a:'Twitter/X threads, LinkedIn posts, Instagram captions, newsletter intros, YouTube script hooks, and blog summaries. More formats are in the roadmap.' },
  { q:'Is there a free plan?',                           a:'Yes. 5 repurposes per day, no credit card required. Upgrade anytime for unlimited access.' },
  { q:'What happens to my content after I paste it?',   a:"Your content is used only to generate the outputs in your session. We don't train on user data, and nothing is stored after your session ends." },
]

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section style={{ background: T.surface, padding:'96px 24px' }}>
      <div style={{ maxWidth:'680px', margin:'0 auto' }}>
        <h2 style={{ ...syne(40, 700, { color: T.textPrimary, textAlign:'center', marginBottom:'48px' }), fontSize:'clamp(1.75rem, 3vw, 2.5rem)' }}>
          Questions worth answering.
        </h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ background: T.bg, border:`1px solid ${open===i ? T.accent+'60' : T.border}`, borderRadius: T.rMd, overflow:'hidden', transition:'border-color 0.2s ease' }} className="cs-faq-item">
              <div onClick={() => setOpen(open===i ? null : i)}
                style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px', cursor:'pointer', gap:'16px' }}>
                <span style={{ ...dm(16, 600, { color: T.textPrimary }), flex:1 }}>{f.q}</span>
                <ChevronDown size={18} color={T.textMuted} style={{ transform: open===i ? 'rotate(180deg)' : 'none', transition:'transform 0.2s ease', flexShrink:0 }}/>
              </div>
              {open===i && (
                <p style={{ ...dm(15, 400, { color: T.textSecondary, lineHeight:1.65 }), padding:'0 20px 20px', borderTop:`1px solid ${T.border}`, paddingTop:'16px' }}>
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`.cs-faq-item:hover { border-color:${T.accent}40 !important; }`}</style>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
const FinalCTA: React.FC = () => (
  <section style={{ background:`linear-gradient(180deg, ${T.bg} 0%, ${T.surface} 100%)`, padding:'96px 24px', textAlign:'center' }}>
    <h2 style={{ ...syne(64, 800, { color: T.textPrimary, marginBottom:'24px', lineHeight:1.05 }), fontSize:'clamp(2.5rem, 5vw, 4rem)' }}>
      Your next blog post<br />should be everywhere.
    </h2>
    <p style={{ ...dm(16, 400, { color: T.textSecondary, marginBottom:'40px' }) }}>
      Start free. No credit card. No setup. Just paste and go.
    </p>
    <Link to="/register" style={{ ...syne(18, 600, { color: T.white }), background: T.accent, padding:'18px 40px', borderRadius: T.rPill, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'8px', transition:'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease' }} className="cs-final-cta">
      Start repurposing for free <ArrowRight size={20} aria-hidden="true"/>
    </Link>
    <p style={{ ...dm(12, 400, { color: T.textMuted, marginTop:'24px' }) }}>
      5 free repurposes daily · Cancel Pro anytime · Built by creators, for creators
    </p>
    <style>{`.cs-final-cta:hover { transform:translateY(-2px); box-shadow:0 8px 32px ${T.accent}50; }`}</style>
  </section>
)

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const cols = [
    { title:'Product',   links:['Features','How it works','Pricing','Changelog','API'] },
    { title:'Resources', links:['Blog','Templates','Use cases','Docs'] },
    { title:'Company',   links:['About','Privacy Policy','Terms of Service','Contact'] },
  ]
  return (
    <footer style={{ background: T.surface, borderTop:`1px solid ${T.border}`, padding:'48px 24px' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'2fr repeat(3, 1fr)', gap:'48px' }} className="cs-footer-grid">
        {/* Brand */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
            <span style={{ color: T.accent, fontSize:'24px', fontWeight:700, marginRight:'2px' }}>●</span>
            <span style={syne(18, 700, { color: T.textPrimary })}>ContentSplit</span>
          </Link>
          <p style={{ ...dm(14, 400, { color: T.textMuted, lineHeight:1.6 }) }}>Turn your blog into everywhere.</p>
          <div style={{ display:'flex', gap:'10px' }}>
            {([['Twitter', TwIcon], ['LinkedIn', LiIcon], ['Instagram', IgIcon]] as const).map(([name, Icon], i) => (
              <a key={i} href="#" aria-label={`ContentSplit on ${name}`} style={{ width:34, height:34, borderRadius:'8px', border:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'center', color: T.textMuted, textDecoration:'none', transition:'color 0.2s ease, border-color 0.2s ease' }} className="cs-social-link">
                <Icon size={15} aria-hidden />
              </a>
            ))}
          </div>
        </div>
        {/* Link cols */}
        {cols.map(({ title, links }) => (
          <div key={title} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <h4 style={{ ...dm(12, 600, { color: T.textPrimary, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'4px' }) }}>{title}</h4>
            {links.map(l => <a key={l} href="#" style={{ ...dm(14, 400, { color: T.textMuted, textDecoration:'none' }) }} className="cs-footer-link">{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ maxWidth:'1200px', margin:'40px auto 0', paddingTop:'24px', borderTop:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <p style={{ ...dm(12, 400, { color: T.textMuted }) }}>© {new Date().getFullYear()} ContentSplit. All rights reserved.</p>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', ...dm(12, 400, { color: T.textMuted }) }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', display:'inline-block' }}/>
          All systems operational
        </div>
      </div>
      <style>{`
        .cs-social-link:hover { color:${T.textPrimary} !important; border-color:${T.textMuted} !important; }
        .cs-footer-link:hover { color:${T.textSecondary} !important; }
        @media (max-width:768px) { .cs-footer-grid { grid-template-columns:1fr 1fr !important; } }
        @media (max-width:480px) { .cs-footer-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => (
  <div style={{ background: T.bg, minHeight:'100vh', fontFamily:'"DM Sans", sans-serif', color: T.textPrimary, overflowX:'hidden' }}>
    <a href="#main-content" className="cs-skip-link">Skip to main content</a>
    <Nav />
    <main id="main-content">
      <Hero />
      <SocialProofBar />
      <OutputShowcase />
      <HowItWorks />
      <LiveDemo />
      <FeatureHighlights />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
  </div>
)

export default LandingPage
