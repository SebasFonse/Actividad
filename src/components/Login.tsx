import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="card login-card">
      <h1>Login</h1>
      <p>Al iniciar sesión, tu IP será registrada y bloqueada para futuros accesos.</p>
      <button className="primary" onClick={onLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;