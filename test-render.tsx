import React from 'react';
import { renderToString } from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './src/pages/LandingPage';

try {
  const html = renderToString(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
  console.log("Render successful!");
} catch (error) {
  console.error("REACT RUNTIME ERROR:", error);
}
