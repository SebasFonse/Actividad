import { useState } from 'react'
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

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <div className="app">
          <Login onLogin={() => setLoggedIn(true)} />
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
