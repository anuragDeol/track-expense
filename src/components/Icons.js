const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const Icon = ({ className, children, ...rest }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} {...rest}>
    {children}
  </svg>
);

export const CalendarIcon = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>;
export const ChevronLeftIcon = (p) => <Icon {...p}><path d="M15 6l-6 6 6 6" /></Icon>;
export const ChevronRightIcon = (p) => <Icon {...p}><path d="M9 6l6 6-6 6" /></Icon>;
export const CloseIcon = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
export const PlusIcon = (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>;
export const StarIcon = (p) => (
  <Icon {...p} fill="currentColor" fillOpacity="0.2">
    <path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z" />
  </Icon>
);
