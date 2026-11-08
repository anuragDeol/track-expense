import { HandUnderline } from './Doodles';
import MonthPicker from './MonthPicker';

// Full-width bar that stays at the top while the page scrolls.
function Header({ title, username, onLogout, month, actions }) {
  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div>
          <h1 className="-rotate-1 font-hand text-3xl font-bold sm:text-4xl">{title}</h1>
          <HandUnderline className="h-2.5 w-40" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* {actions} */}
          <MonthPicker {...month} />
          <span className="text-sm text-muted">
            Hi, <b className="text-ink">{username}</b> ·{' '}
            <button type="button" onClick={onLogout} className="font-bold text-brown underline underline-offset-2">
              Log out
            </button>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
