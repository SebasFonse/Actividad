import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Payment from './components/Payment.jsx'
import UserMenu from './components/UserMenu.jsx'
import Login from './components/Login.jsx'
import './App.css'

function Nav({ onLogout }) {
  const location = useLocation()
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-dot" />
          Boletica
        </Link>
        <div className="nav-actions">
          <Link to="/" className={'nav-pill' + (location.pathname === '/' ? ' active' : '')}>
            Eventos
          </Link>
          <Link to="/user" className={'nav-pill' + (location.pathname === '/user' ? ' active' : '')}>
            Mi cuenta
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}

function BlockedPage() {
  return (
    <div className="blocked-wrapper">
      <div className="blocked-card">
        <div className="blocked-icon">🚫</div>
        <div className="blocked-title">Acceso restringido</div>
        <p className="blocked-desc">
          Esta dirección IP ya ha sido utilizada para crear una cuenta.
          Solo permitimos una cuenta por IP para garantizar acceso justo
          a boletas en alta demanda. Si crees que esto es un error,
          contacta a nuestro soporte.
        </p>
        <a href="mailto:soporte@boletica.com" className="btn btn-secondary">
          Contactar soporte
        </a>
      </div>
    </div>
  )
}

function AppRoutes({ onLogout }) {
  return (
    <>
      <Nav onLogout={onLogout} />
      <main className="main">
        <Routes>
          <Route path="/"        element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user"    element={<UserMenu />} />
          <Route path="*"        element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [userIP, setUserIP] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(data => {
        setUserIP(data.ip)
        const list = JSON.parse(localStorage.getItem('blockedIPs') || '[]')
        if (list.includes(data.ip)) setBlocked(true)
      })
      .catch(() => setUserIP('desconocida'))
  }, [])

  function handleLogin() {
    if (userIP && userIP !== 'desconocida') {
      const list = JSON.parse(localStorage.getItem('blockedIPs') || '[]')
      if (!list.includes(userIP)) {
        list.push(userIP)
        localStorage.setItem('blockedIPs', JSON.stringify(list))
      }
    }
    setLoggedIn(true)
  }

  if (blocked) {
    return (
      <BrowserRouter>
        <div className="app"><BlockedPage /></div>
      </BrowserRouter>
    )
  }

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <div className="app">
          <Login onLogin={handleLogin} userIP={userIP} />
        </div>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <div className="app">
        <AppRoutes onLogout={() => setLoggedIn(false)} />
      </div>
    </BrowserRouter>
  )
}
