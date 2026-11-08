import { useState } from 'react';
import Card from './Card';
import { HandUnderline } from './Doodles';

const FIELD = 'h-12 w-full rounded-2xl border border-hair bg-card px-4 text-base outline-none focus:border-brown';

// One card for both login and register; a link at the bottom switches between them.
function AuthScreen({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isLogin = mode === 'login';
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) return setError('Enter a username and password');
    setBusy(true);
    setError('');
    try {
      await (isLogin ? onLogin : onRegister)(form.username.trim(), form.password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm p-8 sm:p-10">
        <h1 className="-rotate-1 text-center font-hand text-4xl font-bold">Expense Tracker</h1>
        <HandUnderline className="mx-auto h-2.5 w-40" />

        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold">{isLogin ? 'Log in' : 'Create an account'}</h2>
          <input name="username" value={form.username} onChange={update} placeholder="Username" aria-label="Username" autoComplete="username" className={FIELD} />
          <input name="password" type="password" value={form.password} onChange={update} placeholder="Password" aria-label="Password" autoComplete={isLogin ? 'current-password' : 'new-password'} className={FIELD} />
          {error && <p role="alert" className="text-sm font-semibold text-brown">{error}</p>}
          <button type="submit" disabled={busy} className="h-12 rounded-2xl bg-ink font-bold text-card hover:bg-brown disabled:opacity-60">
            {busy ? 'Please wait…' : isLogin ? 'Log in' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {isLogin ? 'New here?' : 'Already have an account?'}{' '}
          <button type="button" onClick={switchMode} className="font-bold text-brown underline underline-offset-2">
            {isLogin ? 'Create an account' : 'Log in'}
          </button>
        </p>
      </Card>
    </div>
  );
}

export default AuthScreen;
