import React from 'react';

const UserMenu: React.FC = () => {
  return (
    <div className="card user-card">
      <h1>Menú de Usuario</h1>
      <ul className="user-list">
        <li>
          <strong>Mis Compras</strong>
          <p>Revisa tus entradas compradas y estados de pago.</p>
        </li>
        <li>
          <strong>Mis Boletas</strong>
          <p>Accede a tus códigos y boletas digitales.</p>
        </li>
        <li>
          <strong>Mi Historial</strong>
          <p>Consulta eventos anteriores y compras.</p>
        </li>
        <li>
          <strong>Mi Información Personal</strong>
          <p>Actualiza tu nombre, email y datos de contacto.</p>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;