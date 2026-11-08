function IconButton({ icon: Icon, label, onClick, disabled = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hair bg-card text-ink shadow-sm hover:bg-peach disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-card"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

export default IconButton;
