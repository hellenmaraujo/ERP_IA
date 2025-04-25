import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nome: "", perfil: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");
    const perfil = localStorage.getItem("perfil");

    if (!token || !nome || !perfil) {
      navigate("/");
    } else {
      setUser({ nome, perfil });
    }
    setIsLoading(false);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);