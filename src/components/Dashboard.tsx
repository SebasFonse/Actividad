import React from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1, name: 'Bad Bunny: World Hottest Tour', date: '15 Nov 2025', time: '8:00 PM',
    venue: 'Estadio El Campín, Bogotá', price: 180000, category: 'Reggaeton', emoji: '🐇',
    color: 'rgba(99,102,241,0.15)', badge: 'badge-accent', sold: '92%'
  },
  {
    id: 2, name: 'Karol G: Mañana Será Bonito Tour', date: '22 Nov 2025', time: '7:30 PM',
    venue: 'Movistar Arena, Bogotá', price: 155000, category: 'Pop Latino', emoji: '💚',
    color: 'rgba(52,211,153,0.12)', badge: 'badge-green', sold: '78%'
  },
  {
    id: 3, name: 'Festival Estéreo Picnic 2025', date: '4–6 Dic 2025', time: '12:00 PM',
    venue: 'Parque Simón Bolívar', price: 290000, category: 'Festival', emoji: '🎪',
    color: 'rgba(244,114,182,0.12)', badge: 'badge-pink', sold: '65%'
  },
  {
    id: 4, name: 'Maluma: Papi Juancho Tour', date: '10 Dic 2025', time: '9:00 PM',
    venue: 'Palacio de los Deportes', price: 140000, category: 'Urbano', emoji: '🌴',
    color: 'rgba(251,191,36,0.1)', badge: 'badge-accent', sold: '84%'
  },
  {
    id: 5, name: 'J Balvin: Energía Fest', date: '18 Dic 2025', time: '8:00 PM',
    venue: 'Centro de Eventos, Medellín', price: 165000, category: 'Reggaeton', emoji: '🌈',
    color: 'rgba(99,102,241,0.1)', badge: 'badge-accent', sold: '70%'
  },
  {
    id: 6, name: 'Año Nuevo en Grande', date: '31 Dic 2025', time: '10:00 PM',
    venue: 'Cali Exposhow', price: 200000, category: 'Especial', emoji: '🎆',
    color: 'rgba(239,68,68,0.1)', badge: 'badge-pink', sold: '55%'
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="page-header">
        <h1>Eventos Disponibles</h1>
        <p>Los mejores conciertos y festivales. Consigue tus boletas antes de que se agoten.</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Eventos activos</div>
          <div className="stat-value">24</div>
          <div className="stat-sub">en toda Colombia</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Boletas vendidas</div>
          <div className="stat-value">48,219</div>
          <div className="stat-sub">esta temporada</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Próximo evento</div>
          <div className="stat-value">7 días</div>
          <div className="stat-sub">Bad Bunny — Nov 15</div>
        </div>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div className="event-card" key={event.id}>
            <div className="event-banner" style={{ background: event.color }}>
              <span style={{ fontSize: '3.5rem' }}>{event.emoji}</span>
            </div>
            <div className="event-body">
              <div className="event-badges">
                <span className={`badge ${event.badge}`}>{event.category}</span>
                {parseFloat(event.sold) > 85 && (
                  <span className="badge badge-pink">🔥 Casi agotado</span>
                )}
              </div>
              <div className="event-title">{event.name}</div>
              <div className="event-meta">
                <span>📅 {event.date} · {event.time}</span>
                <span>📍 {event.venue}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {event.sold} vendido
                </span>
              </div>
              <div className="event-footer">
                <div className="event-price">
                  ${event.price.toLocaleString('es-CO')} <span>COP</span>
                </div>
                <Link to="/payment" className="btn btn-primary btn-sm">
                  Comprar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
