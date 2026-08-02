const fs = require('fs');

// 1. Prepare CSS
const arcadeCss = `
/* ─── ARCADE-STYLE HERO REDESIGN ─── */
:root {
  --arcade-primary: #2458FF;
  --arcade-dark: #0F172A;
  --arcade-gray: #475569;
  --arcade-bg: #FCFCFD;
  --arcade-nav-height: 88px;
}

.cs-arcade-hero-section {
  position: relative;
  min-height: 100vh;
  background-color: #FDFDFD;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: var(--arcade-dark);
}

/* Glowing Blurred Background Blobs */
.cs-arcade-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  pointer-events: none;
}

.blob-1 { /* Strong blue glow lower right */
  width: 800px;
  height: 800px;
  background: #0E58FF;
  bottom: -200px;
  right: -100px;
  opacity: 0.35;
}

.blob-2 { /* Lighter blue lower left */
  width: 600px;
  height: 600px;
  background: #77C4FF;
  bottom: -100px;
  left: -150px;
  opacity: 0.25;
}

.blob-3 { /* Medium blue center right */
  width: 700px;
  height: 700px;
  background: #2D7EFF;
  top: 30%;
  right: 10%;
  opacity: 0.2;
}

.blob-4 { /* Soft cyan top left */
  width: 500px;
  height: 500px;
  background: #DDEFFF;
  top: 10%;
  left: 20%;
  opacity: 0.4;
}

.blob-5 { /* Bright white center */
  width: 900px;
  height: 900px;
  background: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
}

/* Navbar */
.cs-arcade-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--arcade-nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 10;
}

.cs-arcade-nav-logo {
  font-weight: 700;
  font-size: 20px;
  color: var(--arcade-dark);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.cs-arcade-nav-links {
  display: flex;
  gap: 40px;
  align-items: center;
}

.cs-arcade-nav-link {
  font-size: 16px;
  font-weight: 500;
  color: var(--arcade-dark);
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.cs-arcade-nav-link:hover { opacity: 1; }

.cs-arcade-nav-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cs-btn-secondary {
  height: 48px;
  padding: 0 24px;
  border-radius: 16px;
  background: white;
  color: var(--arcade-dark);
  font-weight: 500;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 20px rgba(0,0,0,.04);
  cursor: pointer;
  transition: all 0.2s;
}
.cs-btn-secondary:hover { background: #F8FAFC; }

.cs-btn-primary {
  height: 48px;
  padding: 0 24px;
  border-radius: 16px;
  background: var(--arcade-primary);
  color: white;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.cs-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(36, 88, 255, 0.3);
}

/* Hero Content */
.cs-arcade-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: var(--arcade-nav-height);
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}

.cs-arcade-title {
  font-size: 72px;
  line-height: 0.95;
  font-weight: 700;
  color: var(--arcade-dark);
  max-width: 700px;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
}

.cs-arcade-desc {
  font-size: 22px;
  line-height: 1.6;
  font-weight: 400;
  color: var(--arcade-gray);
  max-width: 560px;
  margin-bottom: 48px;
}

/* Segment Toggle */
.cs-arcade-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 999px;
  padding: 6px;
  margin-bottom: 32px;
  box-shadow: 0 8px 30px rgba(0,0,0,.06);
}

.cs-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: var(--arcade-gray);
}
.cs-toggle-btn.active {
  background: white;
  color: var(--arcade-dark);
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
}
.cs-toggle-btn:not(.active):hover {
  background: rgba(255,255,255,0.4);
}

/* URL Input */
.cs-arcade-input-container {
  width: 560px;
  height: 88px;
  background: white;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  padding: 0 16px 0 32px;
  margin-bottom: 16px;
}

.cs-arcade-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  color: var(--arcade-dark);
  background: transparent;
}
.cs-arcade-input::placeholder {
  color: #9AA4B2;
}

.cs-arcade-submit {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--arcade-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.cs-arcade-submit:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(36, 88, 255, 0.4);
}

.cs-arcade-helper {
  font-size: 14px;
  color: var(--arcade-gray);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 768px) {
  .cs-arcade-nav { padding: 0 24px; }
  .cs-arcade-nav-links { display: none; }
  .cs-arcade-title { font-size: 40px; }
  .cs-arcade-desc { font-size: 18px; width: 100%; padding: 0 24px; }
  .cs-arcade-input-container { width: calc(100% - 48px); height: 72px; padding: 0 12px 0 24px; }
  .cs-arcade-input { font-size: 16px; }
}
`;
fs.appendFileSync('src/styles/landing.css', arcadeCss);

// 2. Prepare React Component code
const tsxPath = 'src/pages/LandingPage.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');

const newHeroCode = `import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check, ChevronDown, Copy,
  Star, Sparkles, Zap, Edit3, CheckCircle,
  FileText, Pointer, ArrowUpRight
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

const ArcadeHero: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'text' | 'visual'>('text')
  
  return (
    <div className="cs-arcade-hero-section">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="cs-arcade-blob blob-1" animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="cs-arcade-blob blob-2" animate={{ y: [0, 40, 0], x: [0, -20, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="cs-arcade-blob blob-3" animate={{ y: [0, -20, 0], x: [0, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="cs-arcade-blob blob-4" animate={{ y: [0, 30, 0], x: [0, 30, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="cs-arcade-blob blob-5" />
      </div>

      {/* Navbar */}
      <motion.nav 
        className="cs-arcade-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to="/" className="cs-arcade-nav-logo">
          <div style={{ width: 24, height: 24, background: '#2458FF', borderRadius: '50%' }}></div>
          ContentSplit
        </Link>
        <div className="cs-arcade-nav-links">
          <a href="#" className="cs-arcade-nav-link">Product</a>
          <a href="#" className="cs-arcade-nav-link">Solutions</a>
          <a href="#" className="cs-arcade-nav-link">Resources</a>
          <a href="#" className="cs-arcade-nav-link">Pricing</a>
        </div>
        <div className="cs-arcade-nav-actions">
          <button className="cs-btn-secondary">Talk to sales</button>
          <button className="cs-btn-primary">Sign up for free</button>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="cs-arcade-content">
        <motion.h1 
          className="cs-arcade-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          One blog post.<br/>Six platforms.<br/>Zero rewrites.
        </motion.h1>
        
        <motion.p 
          className="cs-arcade-desc"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          ContentSplit takes your long-form blog and breaks it into ready-to-publish content for Twitter, LinkedIn, Instagram, newsletters, YouTube, and more.
        </motion.p>

        <motion.div 
          className="cs-arcade-toggle"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        >
          <button 
            className={\`cs-toggle-btn \${activeSegment === 'text' ? 'active' : ''}\`}
            onClick={() => setActiveSegment('text')}
          >
            <FileText size={16} /> Content
          </button>
          <button 
            className={\`cs-toggle-btn \${activeSegment === 'visual' ? 'active' : ''}\`}
            onClick={() => setActiveSegment('visual')}
          >
            <Pointer size={16} /> Demo
          </button>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        >
          <div className="cs-arcade-input-container">
            <input 
              type="text" 
              placeholder="https://yourblog.com/post" 
              className="cs-arcade-input"
            />
            <button className="cs-arcade-submit">
              <ArrowUpRight size={24} />
            </button>
          </div>
          <div className="cs-arcade-helper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="M14 9h6a2 2 0 0 1 2 2v8"/><path d="M10 14h12"/><path d="m14 10-4 4 4 4"/></svg>
            Try with your website!
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="landing-page-redesign">
      <ArcadeHero />
      
`;

const replaceRegex = /import React, { useState }[\s\S]*?(?=\/\/ ─+[\r\n]+\/\/ SOCIAL PROOF BAR)/;
tsxContent = tsxContent.replace(replaceRegex, newHeroCode);

fs.writeFileSync(tsxPath, tsxContent);
console.log('Successfully updated LandingPage.tsx with Arcade Hero');
