const fs = require('fs');
const path = require('path');

const landingPagePath = path.join(__dirname, 'src', 'pages', 'LandingPage.tsx');
let content = fs.readFileSync(landingPagePath, 'utf8');

// 1. Add missing imports
content = content.replace(
  `import {
  Menu, X, ArrowRight, Check, ChevronDown, Copy,
  FileText, Layers, Star, Sparkles, Zap, Edit3, CheckCircle,
  Mail, List,
} from 'lucide-react'`,
  `import {
  Menu, X, ArrowRight, Check, ChevronDown, Copy,
  FileText, Layers, Star, Sparkles, Zap, Edit3, CheckCircle,
  Mail, List, Paperclip, MessageCircle, Calendar, CreditCard, GitMerge, PenTool
} from 'lucide-react'`
);

content = content.replace(
  `} from '@components/ui/SocialIcons'`,
  `} from '@components/ui/SocialIcons'\nimport '../styles/landing.css'`
);

// 2. Replace Nav component
const navStart = content.indexOf('// ─────────────────────────────────────────────────────────────────────────────\r\n// NAV');
const heroStart = content.indexOf('// ─────────────────────────────────────────────────────────────────────────────\r\n// HERO');
const socialProofStart = content.indexOf('// ─────────────────────────────────────────────────────────────────────────────\r\n// SOCIAL PROOF BAR');

if (navStart === -1 || heroStart === -1 || socialProofStart === -1) {
  // Try with \n instead of \r\n
  const navStart2 = content.indexOf('// ─────────────────────────────────────────────────────────────────────────────\n// NAV');
  const heroStart2 = content.indexOf('// ─────────────────────────────────────────────────────────────────────────────\n// HERO');
  const socialProofStart2 = content.indexOf('// ─────────────────────────────────────────────────────────────────────────────\n// SOCIAL PROOF BAR');
  
  if (navStart2 !== -1 && heroStart2 !== -1 && socialProofStart2 !== -1) {
    replaceComponents(navStart2, socialProofStart2, '\n');
  } else {
    console.error('Could not find markers');
    process.exit(1);
  }
} else {
  replaceComponents(navStart, socialProofStart, '\r\n');
}

function replaceComponents(startIdx, endIdx, newline) {
  const newComponents = `// ─────────────────────────────────────────────────────────────────────────────${newline}// NAV${newline}// ─────────────────────────────────────────────────────────────────────────────${newline}const Nav: React.FC = () => {${newline}  const navigate = useNavigate()${newline}  return (${newline}    <nav className="cs-anime-nav">${newline}      <Link to="/" className="cs-anime-brand">${newline}        <span style={{ color: '#1E293B', fontWeight: 800, fontSize: '20px' }}>ContentSplit</span>${newline}      </Link>${newline}      ${newline}      <div className="cs-anime-nav-links">${newline}        <a href="#products">Products ▾</a>${newline}        <a href="#templates">Templates ▾</a>${newline}        <a href="#integrations">Integrations ▾</a>${newline}        <a href="#resources">Resources ▾</a>${newline}        <a href="#pricing">Pricing</a>${newline}      </div>${newline}      ${newline}      <div className="cs-anime-nav-actions">${newline}        <button className="cs-anime-login-btn" onClick={() => navigate('/login')}>Log in</button>${newline}        <Link to="/register" className="cs-anime-start-btn">Get started →</Link>${newline}      </div>${newline}    </nav>${newline}  )${newline}}${newline}${newline}// ─────────────────────────────────────────────────────────────────────────────${newline}// HERO${newline}// ─────────────────────────────────────────────────────────────────────────────${newline}const Hero: React.FC = () => {${newline}  return (${newline}    <section className="cs-anime-hero">${newline}      <div className="cs-anime-hero-overlay">${newline}        <div className="cs-anime-hero-content">${newline}          ${newline}          <div className="cs-anime-badge">${newline}            <span className="cs-anime-badge-new">New</span>${newline}            <span>ContentSplit AI agent</span>${newline}          </div>${newline}          ${newline}          <h1 className="cs-anime-title">One blog post.<br/>Six platforms.<br/>Zero rewrites.</h1>${newline}          <p className="cs-anime-subtitle">ContentSplit takes your long-form blog and breaks it into ready-to-publish content for Twitter, LinkedIn, Instagram, newsletters, YouTube, and more.</p>${newline}          ${newline}          <div className="cs-anime-prompt-card">${newline}            <div className="cs-anime-prompt-input-wrapper">${newline}              <input type="text" placeholder="Describe the content you want to repurpose..." className="cs-anime-prompt-input" />${newline}            </div>${newline}            ${newline}            <div className="cs-anime-prompt-chips">${newline}              <button>[Announcing new feature]</button>${newline}              <button>[Weekly newsletter]</button>${newline}              <button>[Customer success story]</button>${newline}            </div>${newline}            ${newline}            <div className="cs-anime-prompt-footer">${newline}              <button className="cs-anime-icon-btn"><Paperclip size={18} /></button>${newline}              <div className="cs-anime-prompt-actions">${newline}                <div className="cs-anime-integration-icons">${newline}                  <TwIcon size={20} />${newline}                  <LiIcon size={20} />${newline}                  <IgIcon size={20} />${newline}                </div>${newline}                <button className="cs-anime-create-btn">Create content →</button>${newline}              </div>${newline}            </div>${newline}          </div>${newline}          ${newline}        </div>${newline}      </div>${newline}      ${newline}      <div className="cs-anime-bottom-nav">${newline}        <button className="cs-anime-bottom-tab"><FileText size={18} /> Twitter</button>${newline}        <button className="cs-anime-bottom-tab"><Calendar size={18} /> LinkedIn</button>${newline}        <button className="cs-anime-bottom-tab active"><CreditCard size={18} /> Instagram</button>${newline}        <button className="cs-anime-bottom-tab"><GitMerge size={18} /> Newsletter</button>${newline}        <button className="cs-anime-bottom-tab"><PenTool size={18} /> YouTube</button>${newline}      </div>${newline}      ${newline}      <button className="cs-anime-chat-widget">${newline}        <MessageCircle size={24} color="#FFF" />${newline}      </button>${newline}    </section>${newline}  )${newline}}${newline}${newline}`;

  const pre = content.substring(0, startIdx);
  const post = content.substring(endIdx);
  
  fs.writeFileSync(landingPagePath, pre + newComponents + post);
  console.log('Successfully updated LandingPage.tsx');
}

// 3. Append CSS to landing.css
const cssPath = path.join(__dirname, 'src', 'styles', 'landing.css');
const newCss = `
/* ─── ANIME SaaS HERO REDESIGN ─── */
.cs-anime-hero {
  min-height: 100vh;
  position: relative;
  background-image: url('/images/hero1.png');
  background-size: cover;
  background-position: center;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
}

.cs-anime-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(59, 153, 236, 0.2) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
}

/* Nav */
.cs-anime-nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 1200px;
  height: 60px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 24px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(255,255,255,0.4);
}

.cs-anime-brand {
  text-decoration: none;
}

.cs-anime-nav-links {
  display: flex;
  gap: 28px;
}

.cs-anime-nav-links a {
  text-decoration: none;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
}

.cs-anime-nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cs-anime-login-btn {
  background: none;
  border: none;
  color: #1E293B;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 16px;
  cursor: pointer;
}

.cs-anime-start-btn {
  background: #1E293B;
  color: #FFFFFF;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
}

/* Hero Content */
.cs-anime-hero-content {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
}

.cs-anime-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.4);
  padding: 4px 16px 4px 4px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFF;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
}

.cs-anime-badge-new {
  background: #8B5CF6;
  color: white;
  padding: 4px 10px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
}

.cs-anime-title {
  font-family: 'Syne', sans-serif;
  font-size: 72px;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.05;
  margin-bottom: 24px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.cs-anime-subtitle {
  font-size: 20px;
  color: rgba(255,255,255,0.9);
  max-width: 600px;
  margin-bottom: 48px;
  line-height: 1.6;
}

/* AI Prompt Card */
.cs-anime-prompt-card {
  background: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cs-anime-prompt-input-wrapper {
  width: 100%;
}

.cs-anime-prompt-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  color: #1E293B;
  background: transparent;
}
.cs-anime-prompt-input::placeholder {
  color: #94A3B8;
}

.cs-anime-prompt-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cs-anime-prompt-chips button {
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  color: #64748B;
  border-radius: 9999px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.cs-anime-prompt-chips button:hover {
  background: #E2E8F0;
  color: #1E293B;
}

.cs-anime-prompt-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.cs-anime-icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #F1F5F9;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cs-anime-prompt-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cs-anime-integration-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #94A3B8;
}

.cs-anime-create-btn {
  background: #F1F5F9;
  color: #1E293B;
  border: none;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

/* Bottom Nav */
.cs-anime-bottom-nav {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 8px;
  border-radius: 9999px;
  display: flex;
  gap: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.cs-anime-bottom-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.cs-anime-bottom-tab.active {
  background: rgba(255, 255, 255, 0.9);
  color: #1E293B;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.cs-anime-bottom-tab.active svg {
  color: #10B981;
}

/* Chat Widget */
.cs-anime-chat-widget {
  position: absolute;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #1E293B;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  cursor: pointer;
}
`;

fs.appendFileSync(cssPath, newCss);
console.log('Successfully appended CSS to landing.css');
