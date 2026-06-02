import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../components/forms/AuthForm.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (values) => {
    const result = register(values);
    if (result.error) {
      setMessage(result.error);
      return;
    }
    navigate('/login');
  };

  return (
    <main className="page-shell" style={{ maxWidth: 680 }}>
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">Create your account</h1>
            <p className="section-copy">Register to access the TB Guardian AI platform and store assessment history securely in your browser.</p>
          </div>
        </div>
        {message && <div className="card" style={{ padding: 18, marginBottom: 18, borderLeft: '4px solid var(--color-danger)', color: 'var(--color-danger)' }}>{message}</div>}
        <AuthForm mode="register" onSubmit={handleSubmit} />
        <p style={{ marginTop: 18, color: 'var(--color-muted)' }}>Already registered? <Link to="/login">Sign in</Link>.</p>
      </section>
    </main>
  );
};
