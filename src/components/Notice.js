import { useEffect } from 'react';
import { CloseIcon } from './Icons';

// Small message at the top of the screen. Hides itself after a few seconds.
function Notice({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div role="alert" className="fixed left-1/2 top-5 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-hair bg-card px-5 py-3 font-semibold shadow-lift">
      <span className="h-2 w-2 shrink-0 rounded-full bg-orange" />
      {message}
      <button type="button" aria-label="Dismiss" onClick={onClose} className="text-muted hover:text-ink">
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Notice;
