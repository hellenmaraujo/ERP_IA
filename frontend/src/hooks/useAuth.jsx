import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);

      // Buscar informações do usuário
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userData = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Redirecionar conforme perfil
      if (userData.perfil === 'motorista') {
        window.location.href = '/entregas';
      } else if (userData.perfil === 'operacional') {
        window.location.href = '/roteirizacao';
      } else if (userData.perfil === 'administrativo') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erro de login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const checkTokenExpiration = () => {
    if (!token) {
      logout();
    }
    // Opcional: pode adicionar verificação de expiração de JWT se necessário
  };

  return {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    checkTokenExpiration,
  };
}
