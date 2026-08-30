import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) 
    return <Navigate to="/login" replace />;

  return <>{children}</>;
};
