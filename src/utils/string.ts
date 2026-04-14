/**
 * String utilities for ContentSplit.ai
 */

/**
 * Truncate a string to a maximum length, adding ellipsis if truncated.
 * @param str - The string to truncate
 * @param maxLength - Maximum length (including ellipsis)
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  if (maxLength <= 3) return str.slice(0, maxLength)
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Capitalize the first letter of a string.
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert a string to a URL-friendly slug.
 * @param str - The string to slugify
 * @returns Slug string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Validate email format.
 * @param email - Email address to validate
 * @returns True if valid email format
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Format a number with commas as thousands separators.
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Generate a random string of specified length.
 * @param length - Length of random string
 * @returns Random alphanumeric string
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Check if a string is empty or only whitespace.
 * @param str - String to check
 * @returns True if empty or whitespace
 */
export function isBlank(str: string): boolean {
  return !str || /^\s*$/.test(str)
}

/**
 * Remove HTML tags from a string.
 * @param html - HTML string
 * @returns Plain text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}
