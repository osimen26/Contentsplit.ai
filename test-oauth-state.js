const crypto = require('crypto')

const SOCIAL_TOKEN_KEY = Buffer.from('ScW0xUq1Ngp4PYMBzjeefTRcfQZLh3lzElB52nXhsKg=', 'base64')

function encryptToken(text) {
  try {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', SOCIAL_TOKEN_KEY, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    const authTag = cipher.getAuthTag().toString('hex')
    return `${iv.toString('hex')}:${authTag}:${encrypted}`
  } catch (e) {
    console.error('Token encryption failed:', e.message)
    return null
  }
}

function decryptToken(ciphertext) {
  try {
    const [ivHex, tagHex, dataHex] = ciphertext.split(':')
    const decipher = crypto.createDecipheriv('aes-256-gcm', SOCIAL_TOKEN_KEY, Buffer.from(ivHex, 'hex'))
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'))
    return decipher.update(Buffer.from(dataHex, 'hex')) + decipher.final('utf8')
  } catch (e) {
    console.error('Token decryption failed:', e.message)
    return null
  }
}

function createOAuthState(userId, codeVerifier) {
  const payload = JSON.stringify({ userId, codeVerifier, expiresAt: Date.now() + 10 * 60 * 1000 })
  return encryptToken(payload)
}

function verifyOAuthState(state) {
  try {
    const payload = decryptToken(state)
    if (!payload) return null
    const data = JSON.parse(payload)
    if (!data.userId || !data.codeVerifier || !data.expiresAt) return null
    if (data.expiresAt < Date.now()) return null
    return data
  } catch {
    return null
  }
}

const state = createOAuthState('test-user-id', 'test-code-verifier')
console.log('Generated state:', state)
console.log('URL encoded state:', encodeURIComponent(state))

const decodedState = decodeURIComponent(encodeURIComponent(state))
console.log('Decoded state:', decodedState)

const result = verifyOAuthState(decodedState)
console.log('Verification result:', result)

// Now simulate express query decoding
const expressDecoded = decodeURIComponent(encodeURIComponent(state))
const doubleDecoded = decodeURIComponent(expressDecoded)
console.log('Double decoded state:', doubleDecoded)
const result2 = verifyOAuthState(doubleDecoded)
console.log('Double decoded verification:', result2)
