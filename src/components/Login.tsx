import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  userIP: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, userIP }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <div className="login-icon">🎟️</div>
        <h1>Bienvenido a Boletica</h1>
        <p className="subtitle">
          Tu plataforma de boletas para los mejores eventos.<br />
          Inicia sesión para continuar.
        </p>
        <div className="login-card-inner">
          <form onSubmit={handleSubmit}>
            <div className="login-fields">
              <div className="input-group">
                <label className="input-label">Correo electrónico</label>
                <input className="input-field" type="email" placeholder="tu@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Contraseña</label>
                <input className="input-field" type="password" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            {userIP && (
              <div className="ip-notice">
                <span className="ip-notice-icon">🔒</span>
                <span>
                  Tu sesión está vinculada a esta IP ({userIP}). Solo una cuenta por IP para garantizar acceso justo a boletas.
                </span>
              </div>
            )}
            <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
          Al acceder aceptas nuestros términos de servicio y política de privacidad.
        </p>
      </div>
    </div>
  );
};

export default Login;
