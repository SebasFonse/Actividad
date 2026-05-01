import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Payment from './components/Payment';
import UserMenu from './components/UserMenu';
import Login from './components/Login';
import './App.css';

function BlockedPage() {
  return (
    <div className="blocked-wrapper">
      <div className="blocked-card">
        <div className="blocked-icon">🚫</div>
        <div className="blocked-title">Acceso restringido</div>
        <p className="blocked-desc">
          Esta dirección IP ya ha sido utilizada para crear una cuenta.<br /><br />
          Para garantizar acceso justo a boletas en alta demanda, solo permitimos
          una cuenta por dirección IP. Si crees que esto es un error, contacta a
          nuestro soporte.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a href="mailto:soporte@boletica.com" className="btn btn-secondary">
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  );
}

function Nav({ onLogout }: { onLogout: () => void }) {
  // useLocation debe usarse DENTRO del Router — aquí es correcto
  const location = useLocation();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-dot" />
          Boletica
        </Link>
        <div className="nav-actions">
          <Link
            to="/"
            className={`nav-pill${location.pathname === '/' ? ' active' : ''}`}
          >
            Eventos
          </Link>
          <Link
            to="/user"
            className={`nav-pill${location.pathname === '/user' ? ' active' : ''}`}
          >
            Mi cuenta
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}

// Layout autenticado: Nav + contenido. Vive dentro del Router.
function AuthenticatedLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <>
      <Nav onLogout={onLogout} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user" element={<UserMenu />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data: { ip: string }) => {
        setUserIP(data.ip);
        const blockedIPs: string[] = JSON.parse(
          localStorage.getItem('blockedIPs') || '[]'
        );
        if (blockedIPs.includes(data.ip)) {
          setIsBlocked(true);
        }
      })
      .catch(() => {
        setUserIP('desconocida');
      });
  }, []);

  const handleLogin = () => {
    if (userIP && userIP !== 'desconocida') {
      const blockedIPs: string[] = JSON.parse(
        localStorage.getItem('blockedIPs') || '[]'
      );
      if (!blockedIPs.includes(userIP)) {
        blockedIPs.push(userIP);
        localStorage.setItem('blockedIPs', JSON.stringify(blockedIPs));
      }
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => setIsLoggedIn(false);

  if (isBlocked) {
    return (
      <Router>
        <div className="app">
          <BlockedPage />
        </div>
      </Router>
    );
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <div className="app">
          <Login onLogin={handleLogin} userIP={userIP} />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <AuthenticatedLayout onLogout={handleLogout} />
      </div>
    </Router>
  );
}

export default App;
