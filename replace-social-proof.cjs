const fs = require('fs');

const filePath = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const regex = /\/\/ ─+[\r\n]+\/\/ SOCIAL PROOF BAR[\r\n]+\/\/ ─+[\s\S]*?(?=\/\/ ─+[\r\n]+\/\/ OUTPUT SHOWCASE)/;

if (!regex.test(content)) {
    console.error('Could not find markers');
    process.exit(1);
}

const newSocialProof = `// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL PROOF BAR
// ─────────────────────────────────────────────────────────────────────────────
const SocialProofBar: React.FC = () => {
  return (
    <section className="cs-sp-section">
      <div className="cs-sp-container">
        
        {/* Header Typography & Pill Badge */}
        <h2 className="cs-sp-header">
          More than 
          <span className="cs-sp-badge">
            <span className="cs-sp-badge-dark">30k creator</span>
            <span className="cs-sp-badge-blue">s</span>
          </span>
          choose ContentSplit to repurpose better content
        </h2>

        {/* Logo Cloud & Ticker */}
        <div className="cs-sp-ticker-wrapper">
          <div className="cs-sp-ticker">
            {/* Set 1 */}
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">OpenAI</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Webflow</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Retool</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg"><text x="65" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">rudderstack</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg"><text x="60" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">ATLASSIAN</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Zapier</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 150 32" xmlns="http://www.w3.org/2000/svg"><text x="75" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Quantum Metric</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">SENTRY</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Acme Corp</text></svg>
            
            {/* Set 2 (for seamless loop) */}
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">OpenAI</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Webflow</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Retool</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg"><text x="65" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">rudderstack</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg"><text x="60" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">ATLASSIAN</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Zapier</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 150 32" xmlns="http://www.w3.org/2000/svg"><text x="75" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Quantum Metric</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">SENTRY</text></svg>
            <svg className="cs-sp-logo" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><text x="50" y="22" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">Acme Corp</text></svg>
          </div>
        </div>
      </div>
    </section>
  )
}

`;

content = content.replace(regex, newSocialProof);
fs.writeFileSync(filePath, content);
console.log('Successfully updated LandingPage.tsx');
