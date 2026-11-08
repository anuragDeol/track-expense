import ExpenseRow from './ExpenseRow';

function TableColumn({ days, rowCount, selectedIndex, starIndex, onOpen }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col px-4">
      <div className="flex justify-between border-b border-hair px-3 pb-3 text-base font-bold">
        <span>Date</span>
        <span>Expense (₹)</span>
      </div>
      <ul className="mt-2 grid flex-1 content-stretch" style={{ gridTemplateRows: `repeat(${rowCount}, minmax(2.75rem, 1fr))` }}>
        {days.map((day) => (
          <ExpenseRow
            key={day.date}
            day={day}
            selected={day.index === selectedIndex}
            starred={day.index === starIndex}
            onOpen={onOpen}
          />
        ))}
      </ul>
    </div>
  );
}

export default TableColumn;
