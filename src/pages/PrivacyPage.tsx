import React from 'react';
import { Link } from 'react-router-dom';

const syne  = (size: number, weight = 700, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"Syne", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})
const dm = (size: number, weight = 400, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: '"DM Sans", sans-serif', fontWeight: weight, fontSize: size, ...extra,
})

const PrivacyPage: React.FC = () => {
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
          Privacy Policy
        </h2>
        
        <div style={{ ...dm(15, 400, { color: '#475569', lineHeight: 1.7 }) }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>Last updated: 8/13/2026</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>1. Information We Collect</h3>
            <p>At Contentsplit, we collect information you provide directly to us when you create an account, connect social media profiles, or use our content repurposing features. This may include your name, email address, payment information, and the content you submit for processing.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>2. How We Use Your Information</h3>
            <p>We use the information we collect to operate and improve our services, process your content repurposing requests using AI models, and communicate with you about your account. Your submitted content is processed strictly for the purpose of generating the requested outputs and is not used to train our AI models without your explicit consent.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>3. Third-Party Integrations</h3>
            <p>If you connect third-party platforms (such as X, LinkedIn, or Facebook) to Contentsplit, we may access certain information from those accounts as permitted by their respective APIs and your privacy settings on those platforms.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>4. Data Security</h3>
            <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginTop: '12px' }}>5. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@contentsplit.ai.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
