export function formatWeekdayName(weekday: Date): string {
  return weekday.toLocaleString('en', { weekday: 'short' });
}
