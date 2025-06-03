import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const FundWalletComponent = ({ amount, onFundingInitiated, onError, formValues = {} }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(import.meta.env.VITE_GET_USER, {
          headers: {
            Accept: '*/*',
            apiKey: API_KEY,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        setUserData(userResponse.data);

        // Fetch wallet data
        const walletResponse = await axios.get(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
            apiKey: API_KEY,
          },
        });

        setWalletData(walletResponse.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        onError(error);
      }
    };

    fetchInitialData();
  }, [API_KEY, newAuthToken, onError]);

  const handleProceedToFund = async () => {
    setIsProcessing(true);
    setStatusMessage('Initializing payment...');

    try {
      const response = await axios.post(
        import.meta.env.VITE_FUND_WALLET_API,
        {
          email: userData?.email || formValues.email,
          amount: Number(amount),
          // channels: ['card'],
          walletId: walletData?.walletId || userData?.walletId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            apiKey: API_KEY,
          },
        }
      );

      if (response.data.success && response.data.checkoutLink) {
        setStatusMessage('Redirecting to payment...');
        onFundingInitiated(response.data.orderReference, { status: 'success' });

        // Automatically redirect to the payment checkout page
        window.location.href = response.data.checkoutLink;
      } else {
        throw new Error(response.data.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Error in payment initialization:', error);
      setStatusMessage('Payment initialization failed');
      onError(error);
      // Redirect back to the previous page on failure
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (statusMessage.includes('Redirecting to payment...')) {
      // Redirect back to the previous page after a short delay if payment succeeds
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  }, [statusMessage, navigate]);

  return (
    <div className="flex flex-col space-y-4">
      {statusMessage && <div className="text-center text-blue-500 p-2">{statusMessage}</div>}
      <button
        onClick={handleProceedToFund}
        disabled={isProcessing}
        className="w-full bg-lightBlue text-white py-2 px-4 rounded disabled:opacity-50">
        {isProcessing ? 'Processing...' : 'Proceed to Fund'}
      </button>
    </div>
  );
};

export default FundWalletComponent;
