import { useRef, useState } from 'react';
import { downloadFile, parseCsv, toCsv } from '../csv';

const BTN = 'rounded-xl border border-hair bg-card px-3 py-2 text-sm font-semibold shadow-sm hover:bg-peach disabled:opacity-50';

// "Export CSV" downloads every expense. "Import CSV" adds the rows from a file.
// Both buttons work on the month shown on screen. `monthKey` looks like "2026-10".
function DataButtons({ expenses, monthKey, todayKey, onImport }) {
  const fileInput = useRef(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const monthExpenses = expenses.filter((e) => e.day.startsWith(monthKey));

  const exportCsv = () => downloadFile(toCsv(monthExpenses), `pocket-expenses-${monthKey}.csv`);

  const importCsv = async (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // lets the same file be picked again later
    if (!file) return;

    const parsed = parseCsv(await file.text(), todayKey);
    const rows = parsed.rows.filter((r) => r.day.startsWith(monthKey)); // other months are skipped
    const skipped = parsed.skipped + (parsed.rows.length - rows.length);
    if (!rows.length) return setStatus(`No valid rows found${skipped ? ` (${skipped} skipped)` : ''}`);

    setBusy(true);
    setStatus(`Importing ${rows.length}…`);
    const { added, failed } = await onImport(rows);
    setBusy(false);
    setStatus(`Imported ${added}` + (failed + skipped ? ` · skipped ${failed + skipped}` : ''));
  };

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={exportCsv} disabled={!monthExpenses.length || busy} className={BTN}>
        Export CSV
      </button>
      <button type="button" onClick={() => fileInput.current.click()} disabled={busy} className={BTN}>
        Import CSV
      </button>
      <input ref={fileInput} type="file" accept=".csv,text/csv" onChange={importCsv} aria-label="CSV file to import" className="hidden" />
      {status && <span role="status" className="text-sm text-muted">{status}</span>}
    </div>
  );
}

export default DataButtons;