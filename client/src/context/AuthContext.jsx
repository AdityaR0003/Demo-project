import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vibrant_saas_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('vibrant_saas_token');
      if (token) {
        try {
          const data = await authService.getCurrentUser();
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('vibrant_saas_user', JSON.stringify(data.user));
          }
        } catch (error) {
          console.warn('Session verification failed, logging out...');
          localStorage.removeItem('vibrant_saas_token');
          localStorage.removeItem('vibrant_saas_user');
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data.success && data.token) {
      localStorage.setItem('vibrant_saas_token', data.token);
      localStorage.setItem('vibrant_saas_user', JSON.stringify(data.user));
      setUser(data.user);
    }
    return data;
  };

  const register = async (fullName, email, password) => {
    const data = await authService.register(fullName, email, password);
    if (data.success && data.token) {
      localStorage.setItem('vibrant_saas_token', data.token);
      localStorage.setItem('vibrant_saas_user', JSON.stringify(data.user));
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
