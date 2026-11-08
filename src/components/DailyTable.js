import Card from './Card';
import TableColumn from './TableColumn';

const COLUMNS = 3;

// Splits the month into 3 columns: side by side on wide screens, stacked on phones.
function DailyTable({ days, selectedIndex, starIndex, onOpen }) {
  const perColumn = Math.ceil(days.length / COLUMNS);
  const columns = Array.from({ length: COLUMNS }, (_, c) => days.slice(c * perColumn, (c + 1) * perColumn));

  return (
    <Card className="flex flex-1 flex-col gap-6 py-6 md:flex-row md:gap-0 md:divide-x md:divide-hair">
      {columns.map((col) => (
        <TableColumn key={col[0].date} days={col} rowCount={perColumn} selectedIndex={selectedIndex} starIndex={starIndex} onOpen={onOpen} />
      ))}
    </Card>
  );
}

export default DailyTable;
