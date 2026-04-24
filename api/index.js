const http = require('http')
const { createServer } = require('http')

// Import the Express app as a handler
const appModule = require('../server/index.js')
const app = appModule.default || appModule

// Create a Vercel-compatible handler
module.exports = async function handler(req, res) {
  // Express app expects a req/res pair - wrap it
  return new Promise((resolve) => {
    // Handle the request
    app(req, res)
    resolve()
  })
}