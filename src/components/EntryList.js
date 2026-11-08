import EntryItem from './EntryItem';
import { Sparks } from './Doodles';
import { formatAmount } from '../utils';

// The day's expenses (each editable), then a ruled line and the day's total.
function EntryList({ entries, total, onEdit, onRemove }) {
  return (
    <div>
      <ul className="max-h-60 overflow-y-auto pr-1">
        {entries.map((e) => (
          <EntryItem key={e.id} amount={e.amount} onEdit={(amount) => onEdit(e.id, amount)} onRemove={() => onRemove(e.id)} />
        ))}
        {entries.length === 0 && <li className="py-3 font-hand text-2xl text-muted">No expenses yet</li>}
      </ul>
      <div className="mt-2 border-y-2 border-ink py-3">
        <div className="relative inline-block">
          <span className="font-hand text-5xl font-bold">{formatAmount(total)}</span>
          <Sparks className="absolute -right-10 -top-1 h-6 w-8" />
        </div>
      </div>
    </div>
  );
}

export default EntryList;
