import { useState } from 'react';
import { PlusIcon } from './Icons';
import { parseRupees } from '../utils';

function AddExpenseForm({ onAdd }) {
  const [draft, setDraft] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const amount = parseRupees(draft);
    if (!amount) return;
    onAdd(amount);
    setDraft('');
  };

  return (
    <form onSubmit={submit} className="flex gap-3">
      <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-hair bg-card px-4 shadow-sm focus-within:border-brown">
        <span className="text-lg text-muted">₹</span>
        <input
          autoFocus
          inputMode="numeric"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add expense..."
          aria-label="New expense amount"
          className="h-14 min-w-0 flex-1 bg-transparent font-hand text-xl outline-none placeholder:text-muted/70"
        />
      </label>
      <button type="submit" aria-label="Add expense" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-card hover:bg-brown">
        <PlusIcon className="h-6 w-6" />
      </button>
    </form>
  );
}

export default AddExpenseForm;
