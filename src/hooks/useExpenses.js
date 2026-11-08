import { useEffect, useState } from 'react';
import * as api from '../api/api';

const IMPORT_BATCH_SIZE = 5; // parallel requests per batch during CSV import

// Loads all of the user's expenses once, and keeps them in sync on add / edit / remove.
function useExpenses({ onUnauthorized }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs a server call; turns failures into a message (or a logout if the session expired).
  const run = async (task) => {
    setError(null);
    try {
      await task();
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else setError(err.message);
    }
  };

  useEffect(() => {
    run(async () => setExpenses(await api.fetchExpenses())).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addExpense = (day, amount) =>
    run(async () => {
      const created = await api.createExpense(day, amount);
      setExpenses((list) => [...list, created]);
    });

  const editExpense = (id, amount) =>
    run(async () => {
      const updated = await api.updateExpense(id, amount);
      setExpenses((list) => list.map((e) => (e.id === id ? updated : e)));
    });

  const removeExpense = (id) =>
    run(async () => {
      await api.deleteExpense(id);
      setExpenses((list) => list.filter((e) => e.id !== id));
    });

  // Adds many expenses (from a CSV), a few at a time. Returns how many were added / failed.
  const importExpenses = async (rows) => {
    const created = [];
    for (let i = 0; i < rows.length; i += IMPORT_BATCH_SIZE) {
      const batch = rows.slice(i, i + IMPORT_BATCH_SIZE);
      const results = await Promise.allSettled(batch.map((r) => api.createExpense(r.day, r.amount)));
      results.forEach((r) => r.status === 'fulfilled' && created.push(r.value));
      if (results.some((r) => r.reason?.status === 401)) {
        onUnauthorized();
        break;
      }
    }
    setExpenses((list) => [...list, ...created]);
    return { added: created.length, failed: rows.length - created.length };
  };

  return { expenses, loading, error, clearError: () => setError(null), addExpense, editExpense, removeExpense, importExpenses };
}

export default useExpenses;
