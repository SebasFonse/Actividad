import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: '🎫', title: 'Mis Compras', desc: 'Revisa el estado de tus pedidos y boletas adquiridas.', color: 'rgba(99,102,241,0.15)' },
  { icon: '📱', title: 'Mis Boletas', desc: 'Accede a tus códigos QR y boletas digitales para presentar en el evento.', color: 'rgba(52,211,153,0.12)' },
  { icon: '📋', title: 'Historial', desc: 'Consulta todos los eventos y conciertos a los que has asistido.', color: 'rgba(244,114,182,0.12)' },
  { icon: '👤', title: 'Información Personal', desc: 'Actualiza tu nombre, correo y datos de contacto.', color: 'rgba(251,191,36,0.1)' },
  { icon: '🔔', title: 'Notificaciones', desc: 'Gestiona alertas de nuevos eventos y actualizaciones de tus compras.', color: 'rgba(239,68,68,0.1)' },
  { icon: '🔒', title: 'Seguridad', desc: 'Cambia tu contraseña y configura la verificación de dos pasos.', color: 'rgba(99,102,241,0.1)' },
];

const UserMenu: React.FC = () => {
  return (
    <>
      <div className="page-header">
        <h1>Mi Cuenta</h1>
        <p>Gestiona tu perfil, boletas y preferencias.</p>
      </div>

      <div className="profile-section">
        <div className="avatar">👤</div>
        <div>
          <div className="profile-name">María García</div>
          <div className="profile-sub">maria.garcia@email.com · Miembro desde 2023</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className="badge badge-green">✓ Verificado</span>
        </div>
      </div>

      <div className="user-grid">
        {menuItems.map((item, i) => (
          <div className="user-card-item" key={i}>
            <div className="user-card-icon" style={{ background: item.color }}>
              {item.icon}
            </div>
            <div className="user-card-content">
              <div className="user-card-title">{item.title}</div>
              <div className="user-card-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/" className="btn btn-ghost">← Volver a eventos</Link>
      </div>
    </>
  );
};

export default UserMenu;
