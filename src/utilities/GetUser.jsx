import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../src/hooks/useLocalStorage';

const GetUser = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails] = useLocalStorage('userDetails', '');
  const [newAuthToken, setAuthToken] = useLocalStorage('authtoken', '');

  const getUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(import.meta.env.VITE_GET_USER, {
        method: 'GET',
        headers: {
          accept: '*/*',
          apiKey: import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${newAuthToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Log the raw response for debugging
        const text = await response.text();
        console.error('Raw API Response:', text);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON Parse Error:', e);
        console.error('Raw Response:', text);
        throw new Error('Invalid JSON response from server');
      }

      if (!data || typeof data.balance === 'undefined') {
        throw new Error('Invalid response format: missing balance data');
      }

      setBalance(data.balance);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails?.token) {
      fetchWalletBalance();
    } else {
      setError('No authentication token available');
      setLoading(false);
    }

    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(getUser, 30000);

    return () => clearInterval(intervalId);
  }, [userDetails?.token]);

  if (loading) {
    return <div>Loading balance...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Wallet Balance</h2>
      <p>{balance !== null ? `₦${balance.toLocaleString()}` : 'Unable to fetch balance'}</p>
    </div>
  );
};

export default GetUser;
