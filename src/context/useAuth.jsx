// import { useContext } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { persistor } from '../Redux/Store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);

  const login = useCallback((email, password) => {
    // Perform login logic here
    setUserCredentials({ email, password });
    localStorage.setItem('userEmail', email);
  }, []);

  const logout = useCallback(() => {
    // Perform logout logic here
    setUserCredentials(null);
    localStorage.removeItem('userEmail');
    persistor.purge(); // Clears all persisted state
  }, []);

  return (
    <AuthContext.Provider value={{ userCredentials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
