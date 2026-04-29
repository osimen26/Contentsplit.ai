// Vercel serverless function - wraps Express app
// Lazy-load server/index.js to avoid top-level await issues in Vercel

let cachedApp = null;

export default async function handler(req, res) {
  if (!cachedApp) {
    const { default: app } = await import('../server/index.js');
    cachedApp = app;
  }
  return cachedApp(req, res);
}
