// Vercel serverless function - wraps Express app
// Lazy-load server/index.js to avoid top-level await issues in Vercel

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
  } catch (e) {
    console.error('Request error:', e.message, e.stack);
    return res.status(500).json({ error: 'Request failed', details: e.message });
  }
}
