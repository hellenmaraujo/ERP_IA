import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Uploads from './pages/Upload/Uploads';
import Deliveries from './pages/Entregas/Entregas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/deliveries" element={<Deliveries />} />
      </Routes>
    </Router>
  );
}

export default App;