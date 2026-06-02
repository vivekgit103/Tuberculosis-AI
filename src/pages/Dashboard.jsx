import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from '../hooks/useHistory.js';
import { SkeletonLoader } from '../components/ui/SkeletonLoader.jsx';
import { MonthlyTrendChart } from '../components/charts/MonthlyTrendChart.jsx';
import { RiskDistributionPie } from '../components/charts/RiskDistributionPie.jsx';
import { SymptomAreaChart } from '../components/charts/SymptomAreaChart.jsx';
import { ScoreLineChart } from '../components/charts/ScoreLineChart.jsx';

export const Dashboard = () => {
  const { history, loadHistory } = useHistory();
  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState({ total: 0, high: 0, medium: 0, low: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const data = loadHistory();
    const total = data.length;
    const high = data.filter((item) => item.category === 'High').length;
    const medium = data.filter((item) => item.category === 'Medium').length;
    const low = data.filter((item) => item.category === 'Low').length;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setCounters({
        total: Math.min(total, Math.round((total / 12) * step)),
        high: Math.min(high, Math.round((high / 12) * step)),
        medium: Math.min(medium, Math.round((medium / 12) * step)),
        low: Math.min(low, Math.round((low / 12) * step)),
      });
      if (step >= 12) clearInterval(interval);
    }, 42);
    return () => clearInterval(interval);
  }, [loadHistory]);

  const monthlyTrend = useMemo(
    () => [
      { month: 'Jan', assessments: 12 },
      { month: 'Feb', assessments: 18 },
      { month: 'Mar', assessments: 27 },
      { month: 'Apr', assessments: 34 },
      { month: 'May', assessments: 48 },
      { month: 'Jun', assessments: 39 },
    ],
    []
  );

  const distribution = useMemo(
    () => [
      { label: 'Low', value: counters.low || 1 },
      { label: 'Medium', value: counters.medium || 1 },
      { label: 'High', value: counters.high || 1 },
    ],
    [counters]
  );

  const symptomTrend = useMemo(
    () => [
      { name: 'Cough', count: 42 },
      { name: 'Night sweats', count: 28 },
      { name: 'Fever', count: 21 },
      { name: 'Weight loss', count: 18 },
      { name: 'Fatigue', count: 15 },
    ],
    []
  );

  const scoreHistory = useMemo(
    () => history.slice(0, 8).map((item) => ({ date: item.date, score: item.score })),
    [history]
  );

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Analytics dashboard</h1>
            <p className="section-copy">Review screening volume, risk distribution and metric trends for the current TB program.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-2" style={{ gap: '18px' }}>
        {[
          { label: 'Total assessments', value: counters.total, theme: 'primary' },
          { label: 'High risk cases', value: counters.high, theme: 'danger' },
          { label: 'Medium risk cases', value: counters.medium, theme: 'warning' },
          { label: 'Low risk cases', value: counters.low, theme: 'success' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div style={{ color: 'var(--color-muted)', marginBottom: 10 }}>{stat.label}</div>
            <strong>{loading ? <SkeletonLoader lines={1} /> : stat.value}</strong>
          </div>
        ))}
      </section>

      <section className="section grid grid-2">
        <div className="card">
          <div className="card-inner">
            <div className="section-header">
              <h2 className="card-title">Monthly assessments</h2>
            </div>
            {loading ? <SkeletonLoader lines={6} /> : <MonthlyTrendChart data={monthlyTrend} />}
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <div className="section-header">
              <h2 className="card-title">Risk distribution</h2>
            </div>
            {loading ? <SkeletonLoader lines={6} /> : <RiskDistributionPie data={distribution} />}
          </div>
        </div>
      </section>

      <section className="section grid grid-2">
        <div className="card">
          <div className="card-inner">
            <div className="section-header">
              <h2 className="card-title">Symptom frequency</h2>
            </div>
            {loading ? <SkeletonLoader lines={6} /> : <SymptomAreaChart data={symptomTrend} />}
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <div className="section-header">
              <h2 className="card-title">Score trend</h2>
            </div>
            {loading ? <SkeletonLoader lines={6} /> : <ScoreLineChart data={scoreHistory} />}
          </div>
        </div>
      </section>
    </main>
  );
};
