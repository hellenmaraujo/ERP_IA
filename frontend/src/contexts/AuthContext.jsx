// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ nome: "", perfil: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");
    const perfil = localStorage.getItem("perfil");

    if (!token || !nome || !perfil) {
      // Em vez de usar navigate, usamos uma redireção direta
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    } else {
      setUser({ nome, perfil });
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);