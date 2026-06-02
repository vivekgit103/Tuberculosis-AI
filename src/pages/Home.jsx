import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export const Home = () => {
  return (
    <main className="page-shell">
      <section className="hero-panel section">
        <div className="section-header">
          <div>
            <p className="label-pill">AI-powered early screening</p>
            <h1>TB risk prediction with transparency and confidence.</h1>
            <p className="section-copy">TB Guardian AI is built for caregivers, clinics, and public health teams who need fast risk assessment without sacrificing explainability.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '18px', maxWidth: 820 }}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/assess" className="btn btn-primary">Start assessment</Link>
            <Link to="/dashboard" className="btn btn-secondary">View analytics</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trusted clinical screening, designed for modern health teams</h2>
          </div>
        </div>
        <div className="grid grid-3">
          <Card title="Explainable insights">
            <p className="card-copy">Understand what drives each risk assessment with top contributing factors and targeted recommendations.</p>
          </Card>
          <Card title="Patient history">
            <p className="card-copy">Keep a record of every assessment in local memory so every decision is backed by context.</p>
          </Card>
          <Card title="Actionable guidance">
            <p className="card-copy">Rule-based recommendations translate risk into next steps for symptom tracking and referral.</p>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Snapshot performance</h2>
            <p className="section-copy">A clean, clinical dashboard for monitoring screening volume, risk distribution, and symptom trends.</p>
          </div>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <strong>1,342</strong>
            <div>Assessments completed</div>
          </div>
          <div className="stat-card">
            <strong>24%</strong>
            <div>High risk alerts</div>
          </div>
          <div className="stat-card">
            <strong>18</strong>
            <div>Top contributing symptoms</div>
          </div>
          <div className="stat-card">
            <strong>98%</strong>
            <div>Uptime confidence</div>
          </div>
        </div>
      </section>
    </main>
  );
};
