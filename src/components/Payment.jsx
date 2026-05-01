import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Payment() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function fmtCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function fmtExpiry(v) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1400)
  }

  return (
    <>
      <div className="page-header">
        <h1>Completar Compra</h1>
        <p>Proceso seguro y encriptado. Tus datos están protegidos.</p>
      </div>

      <div className="payment-layout">
        <div className="payment-card">
          <h2>Información de pago</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section">Datos del comprador</div>
            <div className="form-row" style={{ marginBottom: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Nombre completo</label>
                <input className="input-field" placeholder="María García"
                  value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Correo electrónico</label>
                <input className="input-field" type="email" placeholder="tu@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="form-section">Tarjeta de crédito o débito</div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label className="input-label">Número de tarjeta</label>
              <input className="input-field" placeholder="1234 5678 9012 3456"
                value={card} onChange={e => setCard(fmtCard(e.target.value))}
                maxLength={19} required />
            </div>
            <div className="card-row">
              <div className="input-group">
                <label className="input-label">Titular</label>
                <input className="input-field" placeholder="Como en la tarjeta" required />
              </div>
              <div className="input-group">
                <label className="input-label">Vence</label>
                <input className="input-field" placeholder="MM/AA"
                  value={expiry} onChange={e => setExpiry(fmtExpiry(e.target.value))}
                  maxLength={5} required />
              </div>
              <div className="input-group">
                <label className="input-label">CVV</label>
                <input className="input-field" placeholder="•••"
                  value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,4))}
                  maxLength={4} required />
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
                {loading ? 'Procesando...' : 'Pagar $228.120 COP'}
              </button>
            </div>
            <p className="secure-note">🔐 Pago cifrado con SSL · PCI DSS Compliant</p>
          </form>
        </div>

        <div className="order-card">
          <h3>Resumen del pedido</h3>
          <div className="order-event">
            <div className="order-thumb" style={{ background: 'rgba(99,102,241,0.15)' }}>🐇</div>
            <div>
              <div className="order-name">Bad Bunny: World Hottest Tour</div>
              <div className="order-date">15 Nov 2025 · 8:00 PM</div>
              <div className="order-date">Estadio El Campín, Bogotá</div>
            </div>
          </div>
          <div className="order-lines">
            <div className="order-line"><span>1× Boleta General</span><span>$180.000</span></div>
            <div className="order-line"><span>Cargo de servicio</span><span>$12.000</span></div>
            <div className="order-line"><span>IVA (19%)</span><span>$36.120</span></div>
            <div className="order-line total"><span>Total</span><span>$228.120 COP</span></div>
          </div>
          <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'var(--surface)', borderRadius: 'var(--r-sm)', fontSize: '0.8rem', color: 'var(--text2)', lineHeight: '1.6' }}>
            🎫 Recibirás tus boletas digitales al correo registrado. Válidas solo con QR.
          </div>
        </div>
      </div>

      {success && (
        <div className="success-overlay" onClick={() => { setSuccess(false); navigate('/') }}>
          <div className="success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-icon">✅</div>
            <h2>¡Pago exitoso!</h2>
            <p>Tus boletas han sido enviadas a tu correo. ¡Disfruta el evento!</p>
            <button className="btn btn-primary btn-full" onClick={() => { setSuccess(false); navigate('/') }}>
              Ver mis eventos
            </button>
          </div>
        </div>
      )}
    </>
  )
}
