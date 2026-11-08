import { useEffect, useState } from 'react';
import * as api from '../api/api';

// Who is logged in. Checks the session once on load, then handles login / register / logout.
function useAuth() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api.fetchMe()
      .then(setUser)
      .catch(() => setUser(null)) // 401: no session yet
      .finally(() => setChecking(false));
  }, []);

  const login = async (username, password) => setUser(await api.login(username, password));
  const register = async (username, password) => setUser(await api.register(username, password));

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setUser(null); // leave the app even if the server call fails
    }
  };

  // Called when the session expires mid-use.
  const sessionExpired = () => setUser(null);

  return { user, checking, login, register, logout, sessionExpired };
}

export default useAuth;
