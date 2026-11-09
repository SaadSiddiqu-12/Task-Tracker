const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function pad(n) {
  return String(n).padStart(2, '0');
}

function toISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toISO(d);
}

export function formatDate(iso) {
  if (!ISO_PATTERN.test(iso || '')) return '';
  const [year, month, day] = iso.split('-').map(Number);
  const thisYear = new Date().getFullYear();
  const base = `${day} ${MONTHS[month - 1]}`;
  return year === thisYear ? base : `${base} ${year}`;
}

export function isOverdue(iso) {
  return ISO_PATTERN.test(iso || '') && iso < todayISO();
}

export function dueText(iso) {
  if (!ISO_PATTERN.test(iso || '')) return '';
  if (iso === todayISO()) return 'Due today';
  if (iso === addDays(1)) return 'Due tomorrow';
  if (isOverdue(iso)) return `Overdue since ${formatDate(iso)}`;
  return `Due ${formatDate(iso)}`;
}
