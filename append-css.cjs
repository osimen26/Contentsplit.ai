const fs = require('fs');

// Append CSS
const css = `
/* ─── SOCIAL PROOF REDESIGN ─── */
:root {
  --sp-text-base: #6B7280;
  --sp-text-dark: #111827;
  --sp-text-blue: #3B82F6;
  --sp-bg-white: #FFFFFF;
  --sp-border-light: #E5E7EB;
  --sp-font-family: 'Inter', 'DM Sans', sans-serif;
}

.cs-sp-section {
  background-color: var(--sp-bg-white);
  padding: 64px 24px;
  border-top: 1px solid var(--sp-border-light);
  border-bottom: 1px solid var(--sp-border-light);
  overflow: hidden;
}

.cs-sp-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}

.cs-sp-header {
  font-family: var(--sp-font-family);
  font-size: 16px;
  font-weight: 400;
  color: var(--sp-text-base);
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}

.cs-sp-badge {
  display: inline-flex;
  align-items: center;
  background-color: var(--sp-bg-white);
  border: 1px solid var(--sp-border-light);
  border-radius: 9999px;
  padding: 4px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  font-size: 14px;
  line-height: 1.2;
}

.cs-sp-badge-dark {
  color: var(--sp-text-dark);
  font-weight: 500;
}

.cs-sp-badge-blue {
  color: var(--sp-text-blue);
  font-weight: 500;
}

.cs-sp-ticker-wrapper {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  /* Edge Fade Effect using mask-image */
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.cs-sp-ticker {
  display: flex;
  align-items: center;
  gap: 64px;
  width: max-content;
  animation: scroll-ticker 40s linear infinite;
}

@keyframes scroll-ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.cs-sp-logo {
  height: 28px;
  width: auto;
  fill: var(--sp-text-base);
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.cs-sp-logo:hover {
  opacity: 1;
}
`;
fs.appendFileSync('src/styles/landing.css', css);
console.log('Appended CSS to landing.css');

// Fix unused variables in LandingPage.tsx
let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf-8');
content = content.replace('Menu, X, ArrowRight, Check, ChevronDown, Copy,', 'ArrowRight, Check, ChevronDown, Copy,');
content = content.replace('Mail, List, Paperclip', 'Mail, Paperclip');
content = content.replace(/const FONT_IMPORT = .*?;\n/g, '');
fs.writeFileSync('src/pages/LandingPage.tsx', content);
console.log('Cleaned up LandingPage.tsx warnings');
