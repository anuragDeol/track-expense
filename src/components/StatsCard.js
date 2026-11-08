import Card from './Card';
import Stat from './Stat';
import { fmt } from '../utils';

function StatsCard({ summary, dayCount }) {
  const { highest, lowest, average } = summary;
  return (
    <Card className="flex divide-x divide-hair py-5">
      <Stat label="Highest Day" value={highest ? fmt(highest.total) : '—'} note={highest?.label ?? '—'} />
      <Stat label="Lowest Day" value={lowest ? fmt(lowest.total) : '—'} note={lowest?.label ?? '—'} />
      <Stat label="Daily Avg" value={fmt(average)} note={`(${dayCount} days)`} />
    </Card>
  );
}

export default StatsCard;
