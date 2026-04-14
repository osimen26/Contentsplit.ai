/**
 * Date utilities for ContentSplit.ai
 */

/**
 * Format a date string or Date object to localized date string.
 * @param date - Date string, timestamp, or Date object
 * @param locale - Locale string (default: 'en-US')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: string | number | Date,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * Format a date to relative time (e.g., "2 hours ago", "yesterday").
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | number | Date): string {
  const now = new Date()
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`
  if (diffDay === 1) return 'yesterday'
  if (diffDay < 7) return `${diffDay} days ago`
  return formatDate(d)
}

/**
 * Check if a date is today.
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: string | number | Date): boolean {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const today = new Date()
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a date is within the last N days.
 * @param date - Date to check
 * @param days - Number of days
 * @returns True if date is within last N days
 */
export function isWithinLastDays(date: string | number | Date, days: number): boolean {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return d >= cutoff
}

/**
 * Get the start of the day (midnight) for a given date.
 * @param date - Date
 * @returns Start of day Date object
 */
export function startOfDay(date: string | number | Date): Date {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const start = new Date(d)
  start.setHours(0, 0, 0, 0)
  return start
}

/**
 * Get the end of the day (23:59:59.999) for a given date.
 * @param date - Date
 * @returns End of day Date object
 */
export function endOfDay(date: string | number | Date): Date {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const end = new Date(d)
  end.setHours(23, 59, 59, 999)
  return end
}

/**
 * Add days to a date.
 * @param date - Original date
 * @param days - Number of days to add (can be negative)
 * @returns New Date object
 */
export function addDays(date: string | number | Date, days: number): Date {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const newDate = new Date(d)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

/**
 * Calculate the difference in days between two dates.
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Difference in days (positive if date2 > date1)
 */
export function diffInDays(date1: string | number | Date, date2: string | number | Date): number {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' || typeof date2 === 'number' ? new Date(date2) : date2
  const diffMs = d2.getTime() - d1.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}
