import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const concerts = [
    { id: 1, name: 'Concierto A', date: '2023-10-01' },
    { id: 2, name: 'Concierto B', date: '2023-10-05' },
    { id: 3, name: 'Festival Pop', date: '2023-11-12' },
  ];

  return (
    <div className="card dashboard-card">
      <div className="dashboard-header">
        <h1>Dashboard de Conciertos</h1>
        <p>Encuentra conciertos actuales con fecha y compra tu boleta.</p>
      </div>
      <ul className="dashboard-list">
        {concerts.map(concert => (
          <li className="dashboard-item" key={concert.id}>
            <div>
              <strong>{concert.name}</strong>
              <span>{concert.date}</span>
            </div>
            <Link className="secondary" to="/payment">Comprar Boleta</Link>
          </li>
        ))}
      </ul>
      <Link className="secondary" to="/user">Ir al Menú de Usuario</Link>
    </div>
  );
};

export default Dashboard;