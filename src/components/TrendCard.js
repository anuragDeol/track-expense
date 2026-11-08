import AreaChart from './AreaChart';
import Card from './Card';

const LABEL_EVERY = 7; // Oct-01, Oct-08, Oct-15 ...

// `days` is the whole month; only days up to today are plotted.
function TrendCard({ days }) {
  const pastDays = days.filter((d) => !d.future);
  const values = pastDays.map((d) => d.total);
  const yMax = Math.max(1, Math.ceil(Math.max(...values) / 1000)) * 1000;
  const ticks = Array.from({ length: yMax / 1000 + 1 }, (_, i) => yMax - i * 1000);

  if (pastDays.length < 2) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold">Daily Expense Trend</h2>
        <p className="mt-6 font-hand text-2xl text-muted">The chart fills in as the month goes on.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">Daily Expense Trend</h2>
      <div className="mt-10 flex gap-3">
        <div className="flex h-44 flex-col justify-between xl:h-56 text-sm font-semibold text-muted">
          {ticks.map((t) => (
            <span key={t}>{t ? `${(t / 1000).toFixed(1)}K` : '0'}</span>
          ))}
        </div>
        <div className="relative mb-8 h-44 min-w-0 flex-1 xl:h-56">
          <AreaChart values={values} labels={pastDays.map((d) => d.label)} yMax={yMax} slots={days.length} />
          {days.map((d, i) =>
            i % LABEL_EVERY === 0 ? (
              <span
                key={d.date}
                className="absolute top-full mt-3 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-muted"
                style={{ left: `${(i / (days.length - 1)) * 100}%` }}
              >
                {d.date}
              </span>
            ) : null
          )}
        </div>
      </div>
    </Card>
  );
}

export default TrendCard;
