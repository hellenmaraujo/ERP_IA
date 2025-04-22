import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads'; // <-- tem que importar Uploads!
import Deliveries from './pages/Delivery';

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