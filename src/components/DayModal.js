import { useEffect } from 'react';
import AddExpenseForm from './AddExpenseForm';
import DayNav from './DayNav';
import EntryList from './EntryList';
import { CloseIcon } from './Icons';

// Centered popup for one day. Click outside or press Escape to close.
function DayModal({ day, canPrev, canNext, onClose, onPrev, onNext, onAdd, onEdit, onRemove }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="day-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-md flex-col gap-6 rounded-[2rem] border border-hair bg-card p-6 shadow-lift sm:p-10"
      >
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-5 top-5 rounded-full p-1 text-muted hover:text-ink">
          <CloseIcon className="h-6 w-6" />
        </button>
        <DayNav label={day.label} onPrev={onPrev} onNext={onNext} canPrev={canPrev} canNext={canNext} />
        <EntryList entries={day.entries} total={day.total} onEdit={onEdit} onRemove={onRemove} />
        <AddExpenseForm key={day.index} onAdd={onAdd} />
      </div>
    </div>
  );
}

export default DayModal;
