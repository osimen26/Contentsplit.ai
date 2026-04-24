import app from '../server/index.js'

export default function handler(req, res) {
  return new Promise((resolve) => {
    // Use express as request listener
    app(req, res, resolve)
  })
}