import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const ARROW = 'grid h-9 w-9 place-items-center rounded-full hover:bg-peach disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent';

// ‹ Oct 2026 › — steps one month back or forward (not past the current month).
function MonthPicker({ label, onPrev, onNext, canNext }) {
  return (
    <div className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-2xl border border-hair bg-card px-2 py-1.5 font-semibold shadow-sm">
      <button type="button" aria-label="Previous month" onClick={onPrev} className={ARROW}>
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <span className="flex items-center gap-2 px-1 sm:text-lg">
        <CalendarIcon className="hidden h-5 w-5 sm:block" />
        {label}
      </span>
      <button type="button" aria-label="Next month" onClick={onNext} disabled={!canNext} className={ARROW}>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default MonthPicker;
