// Converts expenses to and from CSV with two columns: date (YYYY-MM-DD), amount (whole rupees).

export const toCsv = (expenses) => {
  const rows = [...expenses].sort((a, b) => (a.day + a.id < b.day + b.id ? -1 : 1));
  return ['date,amount', ...rows.map((e) => `${e.day},${e.amount}`)].join('\n');
};

// Splits one CSV line into cells, allowing quoted cells like "1,200".
const splitLine = (line) =>
  (line.match(/("([^"]|"")*"|[^,]*)(,|$)/g) || [])
    .map((cell) => cell.replace(/,$/, '').trim().replace(/^"|"$/g, '').replace(/""/g, '"'))
    .slice(0, -1);

const isRealDay = (day) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  return new Date(`${day}T12:00:00Z`).toISOString().slice(0, 10) === day;
};

// Returns valid rows plus a count of the lines it had to skip.
// Skips: a header line, bad dates, future dates, and amounts that aren't positive numbers.
export const parseCsv = (text, todayKey) => {
  const rows = [];
  let skipped = 0;
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    const [day = '', amountText = ''] = splitLine(line);
    if (i === 0 && !isRealDay(day)) return; // header row
    const amount = Math.round(Number(amountText.replace(/[₹,\s]/g, '')));
    if (isRealDay(day) && day <= todayKey && amount >= 1) rows.push({ day, amount });
    else skipped += 1;
  });
  return { rows, skipped };
};

// Makes the browser download `text` as a file.
export const downloadFile = (text, filename) => {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};