import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads'; // <-- tem que importar Uploads!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploads" element={<Uploads />} />
      </Routes>
    </Router>
  );
}

export default App;