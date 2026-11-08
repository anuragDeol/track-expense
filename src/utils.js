const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const pad = (n) => String(n).padStart(2, '0');

// 120000 -> "1,20,000" (Indian digit grouping). `fmt` adds the rupee sign.
export const formatAmount = (n) => n.toLocaleString('en-IN');
export const fmt = (n) => '₹' + formatAmount(n);

// "1,200" or "₹ 450" -> 1200 / 450. Anything else -> 0.
export const parseRupees = (text) => {
  const n = parseInt(String(text).replace(/[^0-9]/g, ''), 10);
  return Number.isNaN(n) ? 0 : n;
};

// "2026-10-03" for a local calendar date (month starts at 0).
export const dayKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

export const monthLabel = (year, month) => `${MONTHS[month]} ${year}`;

// One row per day of the month, each holding that day's expenses (oldest first).
export const buildDays = (expenses, year, month, todayKey) => {
  const count = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => {
    const key = dayKey(year, month, i + 1);
    const date = `${MONTHS[month]}-${pad(i + 1)}`;
    const weekday = WEEKDAYS[new Date(year, month, i + 1).getDay()];
    const entries = expenses.filter((e) => e.day === key).sort((a, b) => (a.id < b.id ? -1 : 1));
    return {
      index: i,
      key,
      date,
      weekday,
      label: `${date} (${weekday})`,
      entries,
      total: entries.reduce((t, e) => t + e.amount, 0),
      future: key > todayKey,
    };
  });
};

// Month total, highest and lowest spending day, and the daily average (over days so far).
export const summarize = (days) => {
  const total = days.reduce((t, d) => t + d.total, 0);
  const spent = days.filter((d) => d.total > 0);
  const pick = (better) => (spent.length ? spent.reduce((a, b) => (better(b.total, a.total) ? b : a)) : null);
  return {
    total,
    highest: pick((x, y) => x > y),
    lowest: pick((x, y) => x < y),
    average: days.length ? Math.round(total / days.length) : 0,
  };
};

// Turns [[x, y], ...] into straight, sharp-cornered SVG line segments.
export const linePath = (points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
