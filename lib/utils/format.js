export function formatMonthYear(input) {
  if (!input) return 'Present'
  // Expect 'YYYY-MM' or ISO date
  const [year, month] = String(input).split('-')
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const m = parseInt(month, 10)
  if (!year) return input
  return `${monthNames[(m || 1) - 1]} ${year}`
}

export function dateRange(start, end) {
  return `${formatMonthYear(start)} — ${formatMonthYear(end)}`
}
