import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '60px 20px',
      fontFamily: 'var(--sys-font-body-text-regular-font-family)',
      color: 'var(--sys-color-neutral-10)',
      lineHeight: '1.6'
    }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/" style={{ color: 'var(--sys-color-primary-40)', textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to Home
        </Link>
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--sys-color-neutral-60)', marginBottom: '40px' }}>Last Updated: August 13, 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. Information We Collect</h2>
          <p>
            When you use ContentSplit.ai, we collect information that you provide to us directly, such as your name, email address, and billing information when you register for an account or subscribe to our service.
            We also collect the text, links, and media you submit for processing in order to provide our core AI-repurposing features.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. How We Use Your Information</h2>
          <p>
            We use your information to operate, maintain, and provide the features of ContentSplit.ai. 
            This includes generating repurposed content, processing subscriptions, and communicating with you about updates or support requests.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>3. Third-Party Integrations and Social Media</h2>
          <p>
            ContentSplit.ai allows you to connect third-party social media accounts (such as X, LinkedIn, Facebook, and Instagram) for direct publishing. 
            When you connect these accounts, we request specific permissions to post on your behalf. We do not use these tokens for any purpose other than executing the publishing actions you explicitly authorize. We do not sell your personal data to these third parties.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>4. AI and Data Processing</h2>
          <p>
            We use third-party AI models (such as those provided by Anthropic or OpenAI) to process your input and generate content. Your input text is sent to these providers strictly for the purpose of generating the requested outputs. We ensure that our providers are not permitted to use your private data to train their foundational models.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>5. Data Retention and Deletion</h2>
          <p>
            We retain your data for as long as your account is active. You can delete your account and all associated data at any time from your account settings. Upon deletion, your data is permanently removed from our active databases.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@contentsplit.ai.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
