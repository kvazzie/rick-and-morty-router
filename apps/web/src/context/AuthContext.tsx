import React, { createContext, useState, useEffect, use, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loggedInStatus = localStorage.getItem('isLoggedIn');
  useMemo(() => {
    setIsLoggedIn(loggedInStatus === 'true');
  }, [loggedInStatus]);

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext>
  );
};
