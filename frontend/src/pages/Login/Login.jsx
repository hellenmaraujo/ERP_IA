import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', senha);
  
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
    try {
      const response = await axios.post(`${apiUrl}/login`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }
      });
  
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('perfil', response.data.perfil);
          localStorage.setItem('usuario', response.data.nome);
          localStorage.setItem('nome', response.data.nome);
          window.location.href = '/dashboard';
        }
        
    } catch (error) {
      console.error('Erro no login:', error);
  
      if (error.response && error.response.status === 401) {
        alert('E-mail ou senha inválidos!');
      } else {
        alert('Erro ao tentar fazer login. Código: ' + (error.response?.status || 'Desconhecido'));
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src="/assets/logo.png"
          alt="SPMax Transporte e Logística"
          className="logo"
        />
        <div className="divider"></div>
      </div>

      <div className="welcome-text">Bem-vindo à Plataforma</div>

      {mensagem ? (
        <div className="redirecting-text">{mensagem}</div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="E-mail"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;