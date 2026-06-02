import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge } from '../components/ui/Gauge.jsx';
import { FeatureImportanceChart } from '../components/charts/FeatureImportanceChart.jsx';
import { Button } from '../components/ui/Button.jsx';
import { printAssessmentReport } from '../utils/pdfExport.js';
import { getItem } from '../utils/storage.js';

export const Results = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const last = getItem('tbGuardianLastResult');
    if (!last) {
      navigate('/assess');
      return;
    }
    setResult(last);
  }, [navigate]);

  if (!result) {
    return null;
  }

  const qualityColor = result.score > 70 ? '#d13f24' : result.score > 30 ? '#d18f33' : '#1f8f6c';
  const topLabels = result.topFactors.map((factor) => factor.name).slice(0, 2).join(' and ');

  return (
    <main className="page-shell">
      <section className="section report-card card" style={{ padding: 0 }}>
        <div className="card-inner">
          <div className="section-header">
            <div>
              <h1 className="section-title">Assessment results</h1>
              <p className="section-copy">Your personalised TB risk report is based on symptom patterns, risk factors and explainable contributors.</p>
            </div>
            <Button variant="secondary" onClick={() => printAssessmentReport(result)}>Download report</Button>
          </div>
          <div className="grid grid-2" style={{ gap: 24, alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: 16 }}>Risk score summary</h2>
              <p style={{ marginBottom: 20, color: 'var(--color-muted)' }}>Your assessment is intended to support screening and is not a medical diagnosis.</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span className="status-pill" style={{ background: result.category === 'High' ? 'rgba(209,63,36,0.12)' : result.category === 'Medium' ? 'rgba(209,143,51,0.12)' : 'rgba(31,143,108,0.12)', color: result.category === 'High' ? '#d13f24' : result.category === 'Medium' ? '#d18f33' : '#1f8f6c' }}>{result.category} risk</span>
                <span style={{ color: 'var(--color-muted)' }}>{result.date}</span>
              </div>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: 20 }}>Your score was driven primarily by {topLabels}. These factors contributed most strongly to the final risk profile.</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {result.recommendations.map((item) => (
                  <div key={item.title} className="card" style={{ padding: 20, borderRadius: 22, border: '1px solid rgba(15,110,86,0.08)' }}>
                    <strong>{item.title}</strong>
                    <p className="text-sm" style={{ margin: '10px 0 0' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(247,246,241,0.9)', borderRadius: 28, padding: 28 }}>
              <Gauge score={result.score} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                <span style={{ color: qualityColor, fontWeight: 700, fontSize: '1rem' }}>{result.score}/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Explainability</h2>
            <p className="section-copy">A SHAP-style breakdown of the top factors contributing to your score.</p>
          </div>
        </div>
        <FeatureImportanceChart data={result.topFactors} />
      </section>
    </main>
  );
};
