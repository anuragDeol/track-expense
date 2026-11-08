import { HandUnderline, Sparks } from './Doodles';
import { fmt } from '../utils';

function TotalSpent({ amount }) {
  return (
    <div className="relative">
      <span className="inline-block -rotate-3 rounded-2xl bg-sand px-5 py-1 font-hand text-2xl sm:text-3xl">Total Spent</span>
      <p className="mt-3 font-hand text-6xl font-bold leading-tight sm:text-8xl">{fmt(amount)}</p>
      <HandUnderline className="ml-16 h-3 w-48 sm:ml-24 sm:w-56" />
      <Sparks className="absolute right-4 top-0 h-8 w-10" />
    </div>
  );
}

export default TotalSpent;
