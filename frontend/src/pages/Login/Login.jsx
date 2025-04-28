import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import '../../assets/styles/pages/_login.css';
import Logo from '../../assets/images/logo.png'; // Confirm correct logo path

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fakeUser = { nome: 'Admin User', perfil: 'administrativo' };
    login(fakeUser);
    navigate('/dashboard');
  };

  return (
    <div className="login-page container vh-100 d-flex justify-center align-center">
      <div className="login-container">
        <div className="logo-container">
          <img src={Logo} alt="SPMax Transporte e Logística" className="logo" />
          <div className="divider"></div>
        </div>

        <div className="welcome-text">Bem-vindo à Plataforma</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
