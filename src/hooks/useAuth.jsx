import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('tbToken');
    if (!token) {
      setInitialized(true);
      return;
    }
    API.get('/api/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem('tbToken');
        setUser(null);
      })
      .finally(() => setInitialized(true));
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await API.post('/api/login', { email, password });
      const { token, user: userInfo } = res.data;
      localStorage.setItem('tbToken', token);
      setUser(userInfo);
      return { success: true };
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed';
      return { error: message };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      await API.post('/api/register', { name, email, password });
      return { success: true };
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed';
      return { error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('tbToken');
    setUser(null);
  };

  const value = useMemo(() => ({ user, initialized, login, register, logout }), [user, initialized]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
