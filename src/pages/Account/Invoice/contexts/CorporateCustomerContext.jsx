// CorporateCustomerContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CorporateCustomerContext = createContext();

// Provider component
export const CorporateCustomerProvider = ({ children }) => {
  const [corporateCustomerId, setCorporateCustomerId] = useState(
    localStorage.getItem('') || '');
    const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      authenticateEmail(storedEmail);
    }
  }, []);

  const authenticateEmail = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        setCorporateCustomerId(data.customerId);  
      } else {
        console.error('Failed to authenticate email:', response.statusText);
      }
    } catch (error) {
      console.error('Error authenticating email:', error);
    }
  };
 

  return (
    <CorporateCustomerContext.Provider value={{ corporateCustomerId }}>
      {children}
    </CorporateCustomerContext.Provider>
  );
};
