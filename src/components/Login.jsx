import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 900)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-icon">🎟️</div>
        <h1>Bienvenido a Boletica</h1>
        <p className="login-subtitle">
          Tu plataforma de boletas para los mejores eventos de Colombia.
        </p>

        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="login-fields">
              <div className="input-group">
                <label className="input-label">Correo electrónico</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Contraseña</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="btn btn-primary btn-full btn-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>

        <p className="login-footer">
          Al acceder aceptas nuestros términos de servicio y política de privacidad.
        </p>
      </div>
    </div>
  )
}
