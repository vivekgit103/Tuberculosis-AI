import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="card" style={{ padding: 24, minWidth: 240, background: 'rgba(247,246,241,0.98)' }}>
      <h3>Admin navigation</h3>
      <nav style={{ display: 'grid', gap: 12, marginTop: 18 }}>
        <NavLink to="/admin" style={{ padding: '12px 16px', borderRadius: 18, display: 'block', color: 'var(--color-text)', background: 'rgba(15,110,86,0.05)' }}>User list</NavLink>
        <NavLink to="/admin" style={{ padding: '12px 16px', borderRadius: 18, display: 'block', color: 'var(--color-text)', background: 'rgba(15,110,86,0.05)' }}>Model stats</NavLink>
        <NavLink to="/history" style={{ padding: '12px 16px', borderRadius: 18, display: 'block', color: 'var(--color-text)', background: 'rgba(15,110,86,0.05)' }}>Assessment history</NavLink>
      </nav>
    </aside>
  );
};
