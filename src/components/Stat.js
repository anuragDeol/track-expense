function Stat({ label, value, note }) {
  return (
    <div className="flex-1 px-5 py-1 text-center sm:text-left">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="my-1 text-2xl font-extrabold">{value}</p>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}

export default Stat;
