import { useState } from 'react';
import { fmt, linePath } from '../utils';

const W = 480;
const H = 200;

// Straight-line area chart. The x-axis spans `slots` days (the whole month);
// `values` holds only the days so far, so the line stops at today.
// Hover (or drag a finger) to see that day's expense.
function AreaChart({ values, labels, yMax, slots }) {
  const [hover, setHover] = useState(null);

  const x = (i) => (i / (slots - 1)) * W;
  const y = (v) => H - (v / yMax) * H;
  const line = linePath(values.map((v, i) => [x(i), y(v)]));
  const endX = x(values.length - 1);

  // Pointer position -> nearest day (days after today snap to today).
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setHover(Math.min(values.length - 1, Math.round(ratio * (slots - 1))));
  };

  const left = hover === null ? 0 : (x(hover) / W) * 100;
  const top = hover === null ? 0 : (y(values[hover]) / H) * 100;
  // Keep the label inside the chart near the edges.
  const shiftX = left < 15 ? '0%' : left > 85 ? '-100%' : '-50%';

  return (
    <div
      className="relative h-full w-full cursor-crosshair touch-pan-y"
      onMouseMove={onMove}
      onTouchMove={onMove}
      onMouseLeave={() => setHover(null)}
      onTouchEnd={() => setHover(null)}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <path d={`${line} L${endX},${H} L0,${H} Z`} className="fill-peach" />
        <path d={line} className="fill-none stroke-brown" strokeWidth="2" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" />
      </svg>

      {hover !== null && (
        <>
          <span className="pointer-events-none absolute inset-y-0 w-px bg-brown/40" style={{ left: `${left}%` }} />
          <span
            className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-brown shadow"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
          <div
            role="status"
            className="pointer-events-none absolute -top-2 z-10 whitespace-nowrap rounded-xl bg-ink px-3 py-1.5 text-card shadow-lift"
            style={{ left: `${left}%`, transform: `translate(${shiftX}, -100%)` }}
          >
            <p className="text-xs text-hair">{labels[hover]}</p>
            <p className="text-base font-bold">{fmt(values[hover])}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default AreaChart;
