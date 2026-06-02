import React, { useState } from 'react';
import { validateAuth } from '../../utils/validators.js';
import { Button } from '../ui/Button.jsx';

export const AuthForm = ({ mode, onSubmit }) => {
  const isRegister = mode === 'register';
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAuth(values, isRegister);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setErrors({});
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-inner" style={{ maxWidth: 520, margin: '0 auto' }}>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={values.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your name" />
        {errors.name && <span className="input-error">{errors.name}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={values.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" />
        {errors.email && <span className="input-error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={values.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Enter password" />
        {errors.password && <span className="input-error">{errors.password}</span>}
      </div>

      {isRegister && (
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" value={values.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="Repeat password" />
          {errors.confirmPassword && <span className="input-error">{errors.confirmPassword}</span>}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
        <Button type="submit" variant="primary">{isRegister ? 'Create account' : 'Sign in'}</Button>
      </div>
    </form>
  );
};
