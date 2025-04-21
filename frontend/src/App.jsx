import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', email, senha);
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
    </div>
  );
}

export default Login;
