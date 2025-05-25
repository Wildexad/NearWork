import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = ({ email, role, firstName, lastName, avatarUrl }) => {
    const userData = { email, role, firstName, lastName, avatarUrl };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const register = async ({ email, password, firstName, lastName, avatarUrl }) => {
    // Check if the user should be an admin
    const isAdminUser = email === 'waldexaad@gmail.com' && password === '123456';
    const userData = {
      email,
      role: isAdminUser ? 'admin' : 'user',
      firstName,
      lastName,
      avatarUrl
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, register }}>
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