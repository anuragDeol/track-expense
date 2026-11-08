import { StarIcon } from './Icons';
import { formatAmount } from '../utils';

// One day in the table. Past days open that day's expenses; future days are dimmed.
function ExpenseRow({ day, selected, starred, onOpen }) {
  const look = selected
    ? 'rounded-full bg-peach'
    : 'border-b border-dotted border-hair hover:bg-peach/50 disabled:text-muted/50 disabled:hover:bg-transparent';
  return (
    <li className="relative">
      {starred && <StarIcon className="absolute -left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orange" />}
      <button
        type="button"
        onClick={() => onOpen(day.index)}
        disabled={day.future}
        aria-label={`Open ${day.label}`}
        className={`flex h-full w-full items-center justify-between px-3 py-2.5 text-left text-base font-medium disabled:cursor-default ${look}`}
      >
        <span>{day.label}</span>
        <span>{day.total ? formatAmount(day.total) : '—'}</span>
      </button>
    </li>
  );
}

export default ExpenseRow;
