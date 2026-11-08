import { useState } from 'react';
import useExpenses from '../hooks/useExpenses';
import { buildDays, dayKey, monthLabel, summarize } from '../utils';
import DailyTable from './DailyTable';
import DayModal from './DayModal';
import Header from './Header';
import LoadingScreen from './LoadingScreen';
import Notice from './Notice';
import StatsCard from './StatsCard';
import TotalSpent from './TotalSpent';
import TrendCard from './TrendCard';

// The logged-in screen: one month of expenses, plus the popup for editing a day.
function Dashboard({ user, onLogout, onUnauthorized }) {
  const { expenses, loading, error, clearError, addExpense, editExpense, removeExpense } = useExpenses({ onUnauthorized });

  const now = new Date();
  const todayKey = dayKey(now.getFullYear(), now.getMonth(), now.getDate());
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [openIndex, setOpenIndex] = useState(null);

  const days = buildDays(expenses, view.year, view.month, todayKey);
  const pastDays = days.filter((d) => !d.future); // today and earlier
  const summary = summarize(pastDays);
  const isCurrentMonth = view.year === now.getFullYear() && view.month === now.getMonth();

  const changeMonth = (by) => {
    setOpenIndex(null);
    setView(({ year, month }) => {
      const d = new Date(year, month + by, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const openDay = openIndex === null ? null : days[openIndex];
  const lastIndex = pastDays.length - 1;
  const step = (by) => setOpenIndex((i) => Math.min(lastIndex, Math.max(0, i + by)));

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="Expense Tracker"
        username={user.username}
        onLogout={onLogout}
        month={{ label: monthLabel(view.year, view.month), onPrev: () => changeMonth(-1), onNext: () => changeMonth(1), canNext: !isCurrentMonth }}
      />
      <Notice message={error} onClose={clearError} />

      {loading ? (
        <LoadingScreen text="Loading your expenses…" />
      ) : (
        <main className="mx-auto my-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-stretch">
          <div className="flex min-w-0 flex-col justify-between gap-8 border-l-2 border-orange pl-5 sm:pl-8 lg:w-5/12 xl:w-4/12">
            <TotalSpent amount={summary.total} />
            <TrendCard days={days} />
            <StatsCard summary={summary} dayCount={pastDays.length} />
          </div>
          <div className="flex min-w-0 flex-col lg:w-7/12 xl:w-8/12">
            <DailyTable days={days} selectedIndex={openIndex} starIndex={summary.highest?.index} onOpen={setOpenIndex} />
          </div>
        </main>
      )}

      {openDay && (
        <DayModal
          day={openDay}
          canPrev={openIndex > 0}
          canNext={openIndex < lastIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onAdd={(amount) => addExpense(openDay.key, amount)}
          onEdit={(id, amount) => editExpense(id, amount)}
          onRemove={(id) => removeExpense(id)}
        />
      )}
    </div>
  );
}

export default Dashboard;
