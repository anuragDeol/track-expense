function Card({ children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-hair bg-card shadow-soft ${className}`}>
      {children}
    </section>
  );
}

export default Card;
