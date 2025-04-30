import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Uploads from '../pages/Upload/Uploads';
import Deliveries from '../pages/Entregas/Entregas';
import Roteirizacao from '../pages/Roteirizacao/Roteirizacao';

import Indicadores from '../pages/Indicadores/Indicadores';
import Relatorios from '../pages/Relatorios/Relatorios';
import Usuarios from '../pages/Usuarios/Usuarios';
import ManutencaoVeiculos from '../pages/Veiculos/Veiculos';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Uploads />} />
      <Route path="/deliveries" element={<Deliveries />} />
      <Route path="/roteirizacao" element={<Roteirizacao />} />
      <Route path="/indicadores" element={<Indicadores />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/veiculos" element={<ManutencaoVeiculos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
