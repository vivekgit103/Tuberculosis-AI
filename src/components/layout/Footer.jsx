import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer" style={{ background: '#ffffff', borderTop: '1px solid rgba(44,44,42,0.08)' }}>
      <div className="page-shell" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', padding: '26px 0' }}>
        <div>
          <strong>TB Guardian AI</strong> — Trusted preventive screening for tuberculosis.
        </div>
        <div style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>© 2026 TB Guardian AI. All rights reserved.</div>
      </div>
    </footer>
  );
};
