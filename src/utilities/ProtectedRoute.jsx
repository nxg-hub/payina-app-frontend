import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import InactivityInterceptor from './InactivityInterceptor';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <InactivityInterceptor />
      {children}
    </>
  );
};

export default ProtectedRoute;
