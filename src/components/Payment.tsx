import React, { useState } from 'react';

const Payment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Pago procesado exitosamente');
  };

  return (
    <div className="card payment-card">
      <h1>Pasarela de Pagos</h1>
      <form className="form-grid" onSubmit={handlePayment}>
        <input
          className="input-field"
          type="text"
          placeholder="Número de Tarjeta"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Fecha de Expiración"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <button className="primary" type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default Payment;