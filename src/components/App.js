import useAuth from '../hooks/useAuth';
import AuthScreen from './AuthScreen';
import Dashboard from './Dashboard';
import LoadingScreen from './LoadingScreen';

// Checks the session first, then shows either the login screen or the dashboard.
function App() {
  const { user, checking, login, register, logout, sessionExpired } = useAuth();

  if (checking) return <LoadingScreen />;
  if (!user) return <AuthScreen onLogin={login} onRegister={register} />;
  return <Dashboard key={user.id} user={user} onLogout={logout} onUnauthorized={sessionExpired} />;
}

export default App;
