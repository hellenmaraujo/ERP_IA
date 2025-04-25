import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Uploads from "../pages/Upload/Uploads";
import Entregas from "../pages/Entregas/Entregas";
import Roteirizacao from "../pages/Roteirizacao/Roteirizacao";
import Motoristas from "../pages/Motoristas/Motoristas";
import Veiculos from "../pages/Veiculos/Veiculos";
import Usuarios from "../pages/Usuarios/Usuarios";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.perfil)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["motorista", "operacional", "administrativo"]}><Dashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute allowedRoles={["operacional", "administrativo"]}><Uploads /></ProtectedRoute>} />
        <Route path="/entregas" element={<ProtectedRoute allowedRoles={["motorista", "operacional", "administrativo"]}><Entregas /></ProtectedRoute>} />
        <Route path="/roteirizacao" element={<ProtectedRoute allowedRoles={["operacional", "administrativo"]}><Roteirizacao /></ProtectedRoute>} />
        <Route path="/motoristas" element={<ProtectedRoute allowedRoles={["administrativo"]}><Motoristas /></ProtectedRoute>} />
        <Route path="/veiculos" element={<ProtectedRoute allowedRoles={["operacional", "administrativo"]}><Veiculos /></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute allowedRoles={["administrativo"]}><Usuarios /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
