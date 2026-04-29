// Vercel serverless function - re-export server app
// Express app is exported as default from server/index.js
// Vercel Node.js runtime supports ES modules with default export

export { default } from '../server/index.js';
