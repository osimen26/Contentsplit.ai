/**
 * Validation utilities for ContentSplit.ai
 */

/**
 * Validate a password strength.
 * Requirements: at least 8 characters, one uppercase, one lowercase, one number.
 * @param password - Password to validate
 * @returns Object with isValid and message
 */
export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' }
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' }
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' }
  }
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' }
  }
  return { isValid: true, message: 'Password is valid' }
}

/**
 * Validate platform name.
 * @param platform - Platform name (e.g., 'twitter', 'linkedin')
 * @returns True if valid platform
 */
export function validatePlatform(platform: string): boolean {
  const validPlatforms = [
    'twitter',
    'linkedin',
    'facebook',
    'instagram',
    'tiktok',
    'youtube',
    'email',
    'blog',
  ]
  return validPlatforms.includes(platform.toLowerCase())
}

/**
 * Validate content length against platform character limits.
 * @param content - Content text
 * @param platform - Platform identifier
 * @returns Object with isValid, message, and remaining characters
 */
export function validateContentLength(
  content: string,
  platform: string
): { isValid: boolean; message: string; remaining: number } {
  const limits: Record<string, number> = {
    twitter: 280,
    linkedin: 3000,
    facebook: 63206,
    instagram: 2200,
    email: 5000,
    blog: 10000,
    tiktok: 2200,
    youtube: 5000,
  }

  const limit = limits[platform.toLowerCase()] || 5000
  const length = content.length
  const remaining = limit - length

  if (remaining < 0) {
    return {
      isValid: false,
      message: `Content exceeds ${platform} limit by ${-remaining} characters`,
      remaining,
    }
  }

  if (remaining < limit * 0.1) {
    // Less than 10% remaining
    return {
      isValid: true,
      message: `${remaining} characters remaining`,
      remaining,
    }
  }

  return {
    isValid: true,
    message: `${remaining} characters remaining`,
    remaining,
  }
}

/**
 * Validate a URL format.
 * @param url - URL string
 * @returns True if valid URL format
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate a credit card number using Luhn algorithm.
 * @param cardNumber - Credit card number (without spaces)
 * @returns True if valid Luhn number
 */
export function validateCreditCard(cardNumber: string): boolean {
  const trimmed = cardNumber.replace(/\s/g, '')
  if (!/^\d+$/.test(trimmed)) return false

  let sum = 0
  let isEven = false
  for (let i = trimmed.length - 1; i >= 0; i--) {
    let digit = parseInt(trimmed.charAt(i), 10)
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    isEven = !isEven
  }
  return sum % 10 === 0
}

/**
 * Validate a phone number (basic North American format).
 * @param phone - Phone number string
 * @returns True if matches pattern
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))
}

export { validateEmail } from './string'
