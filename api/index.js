// Vercel serverless function - wraps Express app using serverless-http
import serverless from 'serverless-http';

let cachedHandler = null;

export default async function handler(req, res) {
  console.log('API function called:', req.method, req.url);

  if (!cachedHandler) {
    try {
      console.log('Loading server/index.js...');
      const { default: app } = await import('../server/index.js');
      console.log('Server loaded successfully, type:', typeof app);
      
      cachedHandler = serverless(app, {
        binary: ['*/*']
      });
    } catch (e) {
      console.error('Failed to load server:', e.message, e.stack);
      return res.status(500).json({ 
        error: 'Server initialization failed', 
        details: e.message
      });
    }
  }

  try {
    return await cachedHandler(req, res);
  } catch (e) {
    console.error('Request error:', e.message, e.stack);
    return res.status(500).json({ error: 'Request failed', details: e.message });
  }
}
