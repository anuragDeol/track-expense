import { useEffect, useState } from 'react';
import { CloseIcon } from './Icons';
import { formatAmount as show, parseRupees } from '../utils';

// One expense. Click the amount to edit it; Enter or clicking away saves, Escape cancels.
function EntryItem({ amount, onEdit, onRemove }) {
  const [draft, setDraft] = useState(show(amount));

  useEffect(() => setDraft(show(amount)), [amount]);

  const save = () => {
    const next = parseRupees(draft);
    if (next && next !== amount) onEdit(next);
    else setDraft(show(amount)); // empty or invalid: put the old value back
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') e.currentTarget.blur();
    if (e.key === 'Escape') {
      e.stopPropagation(); // cancel the edit without closing the popup
      setDraft(show(amount));
      e.currentTarget.blur();
    }
  };

  return (
    <li className="flex items-center justify-between gap-3 border-b border-dotted border-hair py-1.5">
      <input
        value={draft}
        inputMode="numeric"
        aria-label={`Edit expense ${amount}`}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={onKeyDown}
        className="min-w-0 flex-1 rounded-lg bg-transparent px-1 font-hand text-3xl outline-none hover:bg-peach/40 focus:bg-peach/60"
      />
      <button type="button" aria-label={`Remove ${amount}`} onClick={onRemove} className="rounded-full p-2 text-muted hover:bg-peach hover:text-ink">
        <CloseIcon className="h-5 w-5" />
      </button>
    </li>
  );
}

export default EntryItem;
