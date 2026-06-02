import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getItem('tbGuardianSession');
    if (session) {
      setUser(session);
    }
  }, []);

  const login = ({ email, password }) => {
    const users = getItem('tbGuardianUsers', []);
    const hashed = btoa(password);
    const account = users.find((item) => item.email === email && item.password === hashed);
    if (!account) {
      return { error: 'Invalid credentials' };
    }
    const active = { name: account.name, email: account.email, role: account.email.includes('admin@') ? 'admin' : 'user' };
    setItem('tbGuardianSession', active);
    setUser(active);
    return { success: true };
  };

  const register = ({ name, email, password }) => {
    const users = getItem('tbGuardianUsers', []);
    const existing = users.some((userItem) => userItem.email === email);
    if (existing) {
      return { error: 'Email already registered' };
    }
    const account = { name, email, password: btoa(password) };
    setItem('tbGuardianUsers', [...users, account]);
    return { success: true };
  };

  const logout = () => {
    removeItem('tbGuardianSession');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
