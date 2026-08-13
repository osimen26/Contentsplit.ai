import React from 'react';
import { Link } from 'react-router-dom';

const syne  = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const TermsPage: React.FC = () => {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '700px', marginBottom: '20px' }}>
        <Link to="/" style={{ ...dm(15, 500), color: 'var(--sys-color-primary-40)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          &larr; Back to Home
        </Link>
      </div>
      
      <div style={{
        background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '700px',
        padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ ...syne(32, 700), marginBottom: '24px', color: '#0F172A' }}>
          Terms of Service
        </h2>
        
        <div style={{ ...dm(15, 400, { color: '#475569', lineHeight: 1.7 }) }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>Last updated: 8/13/2026</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>1. Acceptance of Terms</h3>
            <p>By accessing and using Contentsplit, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>2. Use of Service</h3>
            <p>Contentsplit provides AI-powered content repurposing tools. You agree to use these services only for lawful purposes. You retain all ownership rights to the original content you submit to Contentsplit.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>3. User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You must immediately notify us of any unauthorized use of your account.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>4. AI Generation and Liability</h3>
            <p>While our AI models strive to produce high-quality content, we do not guarantee the accuracy, completeness, or suitability of generated content. You are responsible for reviewing and verifying all generated content before publishing it on any platform.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>5. Modifications to Service</h3>
            <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
