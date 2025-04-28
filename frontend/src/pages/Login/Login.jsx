import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/styles/pages/_login.css';
import Logo from '../../assets/images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('E-mail ou senha inválidos!');
      }

      const data = await response.json();

      login(data);

      // Decodificar o token JWT para extrair informações do usuário
      const tokenParts = data.access_token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const { nome, email, perfil } = payload;

        // Salvar no localStorage
        localStorage.setItem('nome', nome || 'Usuário');
        localStorage.setItem('email', email || '');
        localStorage.setItem('perfil', perfil || 'Indefinido');
        localStorage.setItem('usuario', JSON.stringify(payload));
      }

      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
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
