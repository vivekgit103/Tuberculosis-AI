import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../components/forms/AuthForm.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (values) => {
    const result = login(values);
    if (result.error) {
      setMessage(result.error);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <main className="page-shell" style={{ maxWidth: 680 }}>
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Welcome back</h1>
            <p className="section-copy">Sign in to manage assessments, view analytics, and track patient history.</p>
          </div>
        </div>
        {message && <div className="card" style={{ padding: 18, marginBottom: 18, borderLeft: '4px solid var(--color-danger)', color: 'var(--color-danger)' }}>{message}</div>}
        <AuthForm mode="login" onSubmit={handleSubmit} />
        <p style={{ marginTop: 18, color: 'var(--color-muted)' }}>New to TB Guardian AI? <Link to="/register">Create an account</Link>.</p>
      </section>
    </main>
  );
};
