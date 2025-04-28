import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth, AuthProvider } from './hooks/useAuth';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;