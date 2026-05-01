import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Payment from './components/Payment';
import UserMenu from './components/UserMenu';
import Login from './components/Login';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    // Simulate getting IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setUserIP(data.ip);
        const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
        if (blockedIPs.includes(data.ip)) {
          alert('Esta IP ya ha sido utilizada. Acceso denegado.');
          // In a real app, redirect or block
        }
      });
  }, []);

  const handleLogin = () => {
    if (userIP) {
      const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs') || '[]');
      blockedIPs.push(userIP);
      localStorage.setItem('blockedIPs', JSON.stringify(blockedIPs));
      setIsLoggedIn(true);
    }
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/user" element={<UserMenu />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;