import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Button } from '../ui/Button.jsx';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar" style={{ background: 'rgba(255,255,255,0.92)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(44,44,42,0.08)' }}>
      <div className="page-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 0' }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 16, background: 'var(--color-primary)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800 }}>TB</div>
          <div>
            <div style={{ fontWeight: 700 }}>TB Guardian AI</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Explainable risk screening</div>
          </div>
        </NavLink>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/assess">Assess</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/history">History</NavLink>
          {user ? <NavLink to="/admin">Admin</NavLink> : null}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {user ? (
            <>
              <span style={{ color: 'var(--color-muted)' }}>Hello, {user.name}</span>
              <Button variant="secondary" onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="primary" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
