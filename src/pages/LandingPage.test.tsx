import React from 'react';
import { Link } from 'react-router-dom';

const LandingPageTest: React.FC = () => {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>ContentSplit.ai - Test Page</h1>
      <p>If you can see this, the app is working!</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default LandingPageTest;
