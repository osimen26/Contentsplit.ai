// Vercel serverless function - wraps Express app using serverless-http
import serverless from 'serverless-http';

<<<<<<< HEAD
let cachedApp = null;
let initError = null;

export default async function handler(req, res) {
  console.log('API function called:', req.method, req.url);

  if (!cachedApp) {
    try {
      console.log('Loading server/index.js...');
      const { default: app } = await import('../server/index.js');
      cachedApp = app;
      console.log('Server loaded successfully');
    } catch (e) {
      initError = e.message;
      console.error('Failed to load server:', e.message, e.stack);
      return res.status(500).json({ 
        error: 'Server initialization failed', 
        details: e.message,
        stack: e.stack 
      });
    }
  }

  if (initError) {
    return res.status(500).json({ error: 'Server failed to initialize', details: initError });
  }

  try {
    return cachedApp(req, res);
=======
let cachedHandler = null;

export default async function handler(req, res) {
  if (!cachedHandler) {
    try {
      const { default: app } = await import('../server/index.js');
      cachedHandler = serverless(app, {
        binary: ['*/*']
      });
    } catch (e) {
      console.error('Failed to load server:', e.message, e.stack);
      return res.status(500).json({ error: 'Server initialization failed', details: e.message });
    }
  }

  try {
    return cachedHandler(req, res);
>>>>>>> d8afaf3 (Add serverless-http adapter for Vercel)
  } catch (e) {
    console.error('Request error:', e.message, e.stack);
    return res.status(500).json({ error: 'Request failed', details: e.message });
  }
}
