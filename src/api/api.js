// Every call to the backend lives in this file.
// Set REACT_APP_API_URL in .env (no trailing slash). Defaults to the local server.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000';

// The backend stores amounts in paise (₹1 = 100). The UI works in whole rupees.
const toPaise = (rupees) => rupees * 100;
const toRupees = (paise) => Math.round(paise / 100);

// Sends the session cookie, parses JSON, and throws the server's message on failure.
const request = async (path, method = 'GET', body) => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || data.error || 'Something went wrong');
    error.status = response.status;
    throw error;
  }
  return data;
};

// The backend's expense shape -> the UI's: amount in rupees, day as "YYYY-MM-DD".
const fromServer = (e) => ({
  id: e._id,
  amount: toRupees(e.amount),
  day: e.timestamp.slice(0, 10), // timestamps are noon UTC, so the first 10 chars are the day
});

// Auth
export const fetchMe = async () => (await request('/api/auth/me')).user;
export const login = async (username, password) => (await request('/api/auth/login', 'POST', { username, password })).user;
export const register = async (username, password) => (await request('/api/auth/register', 'POST', { username, password })).user;
export const logout = () => request('/api/auth/logout', 'POST');

// Expenses
export const fetchExpenses = async () => (await request('/api/expense/get-expenses')).expenses.map(fromServer);

export const createExpense = async (day, rupees) =>
  fromServer((await request('/api/expense/add-expense', 'POST', { day, amount: toPaise(rupees) })).expense);

export const updateExpense = async (id, rupees) =>
  fromServer((await request(`/api/expense/update-expense/${id}`, 'PATCH', { amount: toPaise(rupees) })).expense);

export const deleteExpense = (id) => request(`/api/expense/delete-expense/${id}`, 'DELETE');
