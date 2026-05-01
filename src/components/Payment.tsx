import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvv: '' });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setShowSuccess(true); }, 1400);
  };

  return (
    <>
      <div className="page-header">
        <h1>Completar Compra</h1>
        <p>Proceso seguro y encriptado. Tus datos están protegidos.</p>
      </div>

      <div className="payment-wrapper">
        <div className="payment-form-card">
          <h2>Información de pago</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section-label">Datos del comprador</div>
            <div className="form-row" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Nombre completo</label>
                <input className="input-field" placeholder="María García" value={form.name}
                  onChange={set('name')} required />
              </div>
              <div className="input-group">
                <label className="input-label">Correo electrónico</label>
                <input className="input-field" type="email" placeholder="tu@email.com"
                  value={form.email} onChange={set('email')} required />
              </div>
            </div>

            <div className="form-section-label">Tarjeta de crédito o débito</div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label className="input-label">Número de tarjeta</label>
              <input className="input-field" placeholder="1234 5678 9012 3456"
                value={form.card}
                onChange={e => setForm(f => ({ ...f, card: formatCard(e.target.value) }))}
                maxLength={19} required />
            </div>
            <div className="card-field-row">
              <div className="input-group">
                <label className="input-label">Titular</label>
                <input className="input-field" placeholder="Como en la tarjeta" required />
              </div>
              <div className="input-group">
                <label className="input-label">Vencimiento</label>
                <input className="input-field" placeholder="MM/AA"
                  value={form.expiry}
                  onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                  maxLength={5} required />
              </div>
              <div className="input-group">
                <label className="input-label">CVV</label>
                <input className="input-field" placeholder="•••"
                  value={form.cvv}
                  onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))}
                  maxLength={4} required />
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
                {loading ? 'Procesando pago...' : 'Pagar $180.000 COP'}
              </button>
            </div>

            <div className="secure-note">
              🔐 Pago cifrado con SSL · PCI DSS Compliant
            </div>
          </form>
        </div>

        <div>
          <div className="order-summary">
            <h3>Resumen de pedido</h3>
            <div className="order-event-card">
              <div className="order-event-thumb" style={{ background: 'rgba(99,102,241,0.15)' }}>🐇</div>
              <div className="order-event-info">
                <div className="order-event-name">Bad Bunny: World Hottest Tour</div>
                <div className="order-event-date">15 Nov 2025 · 8:00 PM</div>
                <div className="order-event-date">Estadio El Campín, Bogotá</div>
              </div>
            </div>
            <div className="order-lines">
              <div className="order-line"><span>1× Boleta General</span><span>$180.000</span></div>
              <div className="order-line"><span>Cargo de servicio</span><span>$12.000</span></div>
              <div className="order-line"><span>IVA (19%)</span><span>$36.120</span></div>
              <div className="order-line total"><span>Total</span><span>$228.120 COP</span></div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.825rem',
            color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            🎫 Recibirás tus boletas digitales al correo registrado. Válidas solo con QR.
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="success-overlay" onClick={() => { setShowSuccess(false); navigate('/'); }}>
          <div className="success-card" onClick={e => e.stopPropagation()}>
            <div className="success-icon">✅</div>
            <h2>¡Pago exitoso!</h2>
            <p>Tus boletas han sido enviadas a tu correo. ¡Disfruta el evento!</p>
            <button className="btn btn-primary btn-full" onClick={() => { setShowSuccess(false); navigate('/'); }}>
              Ver mis eventos
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
