import IconButton from './IconButton';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { HandUnderline } from './Doodles';

// "‹  Oct-03 (Sat)  ›" at the top of the modal.
function DayNav({ label, onPrev, onNext, canPrev, canNext }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <IconButton icon={ChevronLeftIcon} label="Previous day" onClick={onPrev} disabled={!canPrev} />
      <div className="relative min-w-0 rounded-full bg-sand/60 px-5 py-1 text-center">
        <h2 id="day-title" className="whitespace-nowrap font-hand text-2xl sm:text-3xl">{label}</h2>
        <HandUnderline className="absolute bottom-1 left-5 h-2 w-20 text-orange" />
      </div>
      <IconButton icon={ChevronRightIcon} label="Next day" onClick={onNext} disabled={!canNext} />
    </div>
  );
}

export default DayNav;
