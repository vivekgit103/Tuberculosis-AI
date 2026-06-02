import React, { useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { getItem } from '../utils/storage.js';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { Button } from '../components/ui/Button.jsx';

export const Admin = () => {
  const { user } = useAuth();
  const users = getItem('tbGuardianUsers', []);
  const history = getItem('tbGuardianHistory', []);
  const [message, setMessage] = useState('');

  const stats = useMemo(
    () => ({
      totalUsers: users.length,
      totalAssessments: history.length,
      averageScore: history.length ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length) : 0,
    }),
    [users.length, history.length]
  );

  const downloadCsv = () => {
    const headers = ['Name', 'Email', 'Date', 'Score', 'Category', 'Factors'];
    const rows = history.map((record) => [record.name, record.email, record.date, record.score, record.category, record.factors.join('; ')]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tb_guardian_history.csv';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    setMessage('CSV export ready to download.');
  };

  if (!user || user.role !== 'admin') {
    return (
      <main className="page-shell">
        <section className="section">
          <div className="card card-inner">
            <h1 className="section-title">Admin access required</h1>
            <p className="section-copy">This panel is available only to admin users. Please sign in with an admin account.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
      <Sidebar />
      <section>
        <div className="section-header">
          <div>
            <h1 className="section-title">Admin panel</h1>
            <p className="section-copy">Monitor users, model performance and manage exports for clinical screening operations.</p>
          </div>
        </div>

        {message && <div className="card" style={{ padding: 18, marginBottom: 18, borderLeft: '4px solid var(--color-primary)', color: 'var(--color-primary)' }}>{message}</div>}

        <div className="grid grid-3" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div style={{ color: 'var(--color-muted)', marginBottom: 10 }}>Registered users</div>
            <strong>{stats.totalUsers}</strong>
          </div>
          <div className="stat-card">
            <div style={{ color: 'var(--color-muted)', marginBottom: 10 }}>Assessment records</div>
            <strong>{stats.totalAssessments}</strong>
          </div>
          <div className="stat-card">
            <div style={{ color: 'var(--color-muted)', marginBottom: 10 }}>Average score</div>
            <strong>{stats.averageScore}</strong>
          </div>
        </div>

        <div className="card card-inner" style={{ marginBottom: 24 }}>
          <div className="section-header">
            <h2 className="card-title">Model statistics</h2>
          </div>
          <p className="text-sm">Model scores are based on deterministic symptom weights and rule-based clinical feature importance. The system explains results with top contributing factors that can be reviewed in each assessment.</p>
        </div>

        <div className="card card-inner">
          <div className="section-header">
            <h2 className="card-title">Export data</h2>
          </div>
          <p className="text-sm">Download a CSV export of all assessment records for offline review or reporting.</p>
          <Button variant="primary" onClick={downloadCsv}>Export CSV</Button>
        </div>
      </section>
    </main>
  );
};
