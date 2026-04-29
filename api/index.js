// Vercel serverless function - just re-export the server app
// This avoids top-level await issues in Vercel's Node.js runtime

// Dynamic import to avoid top-level await
let cachedApp = null;

export default async function handler(req, res) {
  if (!cachedApp) {
    const { default: app } = await import('../server/index.js');
    cachedApp = app;
  }
  return cachedApp(req, res);
}
