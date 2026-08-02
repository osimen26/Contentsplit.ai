const fs = require('fs');

const tsxPath = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(tsxPath, 'utf-8');

// 1. Add imports
if (!content.includes("import { motion }")) {
  content = content.replace("import React, { useState } from 'react'", "import React, { useState } from 'react'\nimport { motion } from 'framer-motion'");
}
if (!content.includes("ArrowUpRight")) {
  content = content.replace("Mail, List,", "Mail, List, ArrowUpRight, Pointer,");
}

// 2. Define the new Hero Component
const newHero = `const Hero: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'text' | 'visual'>('text')

  return (
    <section style={{
      minHeight: '100vh', backgroundColor: '#FDFDFD',
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'160px 24px 80px', position:'relative', overflow:'hidden',
    }}>
      {/* Animated Background Blobs using Framer Motion */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ position:'absolute', width: 800, height: 800, background: '#0E58FF', bottom: -200, right: -100, opacity: 0.25, borderRadius: '50%', filter: 'blur(120px)' }}
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{ position:'absolute', width: 600, height: 600, background: '#77C4FF', bottom: -100, left: -150, opacity: 0.15, borderRadius: '50%', filter: 'blur(120px)' }}
        />
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{ position:'absolute', width: 700, height: 700, background: '#2D7EFF', top: '30%', right: '10%', opacity: 0.15, borderRadius: '50%', filter: 'blur(120px)' }}
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, 30, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{ position:'absolute', width: 500, height: 500, background: '#DDEFFF', top: '10%', left: '20%', opacity: 0.3, borderRadius: '50%', filter: 'blur(120px)' }}
        />
        <div style={{ position:'absolute', width: 900, height: 900, background: '#ffffff', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5, borderRadius: '50%', filter: 'blur(120px)' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', maxWidth:'700px', textAlign:'center', marginTop: '20px' }}>
        
        <motion.h1 
          className="cs-arcade-hero-title"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ ...syne(72, 700, { color: T.textPrimary, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '32px' }) }}
        >
          Create On-Brand<br/>Product Videos with AI
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          style={{ ...dm(22, 400, { color: T.textSecondary, lineHeight: 1.6, maxWidth: '560px', marginBottom: '48px' }) }}
        >
          Bring your product story to life visually with ContentSplit's video agent. No designers. No agencies. No waiting.
        </motion.p>

        {/* Toggle */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '999px', padding: '6px', marginBottom: '32px', boxShadow: '0 8px 30px rgba(0,0,0,.06)' }}
        >
          <button onClick={() => setActiveSegment('text')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: activeSegment === 'text' ? 'white' : 'transparent', color: activeSegment === 'text' ? T.textPrimary : T.textSecondary, boxShadow: activeSegment === 'text' ? '0 2px 10px rgba(0,0,0,.05)' : 'none', ...dm(15, 500) }}>
            <FileText size={16} /> Video
          </button>
          <button onClick={() => setActiveSegment('visual')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: activeSegment === 'visual' ? 'white' : 'transparent', color: activeSegment === 'visual' ? T.textPrimary : T.textSecondary, boxShadow: activeSegment === 'visual' ? '0 2px 10px rgba(0,0,0,.05)' : 'none', ...dm(15, 500) }}>
            <Pointer size={16} /> Demo
          </button>
        </motion.div>

        {/* Input */}
        <motion.div 
          className="cs-arcade-input-wrapper"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '560px' }}
        >
          <div style={{ width: '100%', height: '88px', background: 'white', borderRadius: '28px', boxShadow: '0 20px 60px rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', padding: '0 16px 0 32px', marginBottom: '16px' }}>
            <input type="text" placeholder="https://yourwebsite.com" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '20px', color: T.textPrimary, background: 'transparent', fontFamily: '"DM Sans", sans-serif' }} />
            <button style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#2458FF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 14px rgba(36, 88, 255, 0.4)' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <ArrowUpRight size={24} />
            </button>
          </div>
          <div style={{ fontSize: '14px', color: T.textSecondary, opacity: 0.7, display: 'flex', alignItems: 'center', gap: '6px', ...dm(14, 400) }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="M14 9h6a2 2 0 0 1 2 2v8"/><path d="M10 14h12"/><path d="m14 10-4 4 4 4"/></svg>
            Try with your website!
          </div>
        </motion.div>
      </div>
      <style>{\`
        @media (max-width: 768px) {
          .cs-arcade-hero-title { font-size: 44px !important; }
        }
      \`}</style>
    </section>
  )
}`;

// 3. Replace the old Hero component
const heroRegex = /const Hero: React\.FC = \(\) => \{[\s\S]*?(?=\/\/ ─+[\r\n]+\/\/ SOCIAL PROOF BAR)/;
content = content.replace(heroRegex, newHero + '\n\n');

fs.writeFileSync(tsxPath, content);
console.log('Successfully injected Arcade Hero');
