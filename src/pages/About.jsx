import React from 'react';
import { tbInfo } from '../data/tbInfo.js';
import { Card } from '../components/ui/Card.jsx';

export const About = () => {
  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">About tuberculosis</h1>
            <p className="section-copy">TB Guardian AI produces a supportive screening experience designed to educate and minimize delays in care.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-2">
        <Card title="Overview">
          <p className="card-copy">{tbInfo.overview.text}</p>
        </Card>

        <Card title="What we track">
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--color-muted)' }}>
            {tbInfo.symptoms.map((item) => (
              <li key={item} style={{ marginBottom: 10 }}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid grid-3">
        <Card title="Prevention">
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--color-muted)' }}>
            {tbInfo.prevention.map((item) => (
              <li key={item} style={{ marginBottom: 10 }}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card title="Treatment">
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--color-muted)' }}>
            {tbInfo.treatment.map((item) => (
              <li key={item} style={{ marginBottom: 10 }}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card title="Care philosophy">
          <p className="card-copy">Prioritize early detection, evidence-based referrals, and a person-centered follow-up plan to improve outcomes.</p>
        </Card>
      </section>
    </main>
  );
};
