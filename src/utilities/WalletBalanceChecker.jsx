import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WalletBalanceChecker = ({ amount, onInsufficientFunds, onSufficientFunds }) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newAuthToken] = useLocalStorage('authtoken', '');

  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
        method: 'GET',
        headers: {
          accept: '*/*',
          apiKey: import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${newAuthToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
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
        // Log the entire response data for debugging
        console.log('Wallet API Response:', data);

        // Log specific balance values
        console.log('Ledger Balance:', data.data.ledgerBalance.amount);
        console.log('Main Balance:', data.data.balance.amount);
      } catch (e) {
        console.error('JSON Parse Error:', e);
        console.error('Raw Response:', text);
        throw new Error('Invalid JSON response from server');
      }

      // Use ledgerBalance instead of balance
      const ledgerBalance = data.data.ledgerBalance.amount;
      setBalance(ledgerBalance);

      // Check if amount exceeds balance
      if (amount && Number(amount) > ledgerBalance) {
        onInsufficientFunds(ledgerBalance, Number(amount));
      } else if (amount) {
        onSufficientFunds();
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newAuthToken) {
      fetchWalletBalance();
    } else {
      setError('No authentication token available');
      setLoading(false);
    }

    const intervalId = setInterval(fetchWalletBalance, 12000);
    return () => clearInterval(intervalId);
  }, [amount, newAuthToken]);

  if (loading) {
    return <div className="text-white">Checking wallet balance...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="text-white">
      <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
      <p>{balance !== null ? `₦${Number(balance).toLocaleString()}` : 'Unable to fetch balance'}</p>
    </div>
  );
};

export default WalletBalanceChecker;
