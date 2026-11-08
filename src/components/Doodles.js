// Hand-drawn extras: a wobbly underline and three small sparks.
export const HandUnderline = ({ className }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M3 8 C 50 3, 110 4, 197 2" />
  </svg>
);

export const Sparks = ({ className }) => (
  <svg viewBox="0 0 40 30" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M6 14 L12 4 M18 17 L26 7 M28 24 L38 20" />
  </svg>
);
