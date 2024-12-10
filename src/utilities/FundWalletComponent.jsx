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
  const [paymentReference, setPaymentReference] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            accept: '*/*',
            apiKey: API_KEY,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userDataResponse = await userResponse.json();
        setUserData(userDataResponse);

        const walletResponse = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
            apiKey: API_KEY,
          },
        });

        if (!walletResponse.ok) {
          throw new Error('Failed to fetch wallet balance');
        }

        const walletDataResponse = await walletResponse.json();
        setWalletData(walletDataResponse);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        onError(error);
      }
    };

    fetchInitialData();
  }, []);

  const handlePaymentCompletion = async (reference, initializeData) => {
    if (!paymentCompleted) {
      setStatusMessage('Payment completed successfully');
      setPaymentCompleted(true);
      onFundingInitiated(reference, { status: 'success' });
      setIsProcessing(false);

      navigate(-1);
    }
  };

  const handlePaystackPayment = (initializeData) => {
    if (!window.PaystackPop) {
      console.error('Paystack script not loaded');
      setStatusMessage('Payment system not available');
      setIsProcessing(false);
      return;
    }

    setPaymentReference(initializeData.reference);
    setPaymentCompleted(false);

    const config = {
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: userData?.email || formValues.email,
      amount: Number(amount) * 100,
      ref: initializeData.reference,
      access_code: initializeData.access_code,
      onClose: () => {
        if (!paymentCompleted) {
          axios
            .get(import.meta.env.VITE_VERIFY_PAYMENT, {
              headers: {
                Authorization: `Bearer ${newAuthToken}`,
                'Content-Type': 'application/json',
                apiKey: API_KEY,
              },
            })
            .then((response) => {
              if (response.data.status === 'success' && response.data.data.status === 'success') {
                handlePaymentCompletion(initializeData.reference, initializeData);
              } else {
                setStatusMessage('Payment was not completed');
                setIsProcessing(false);
              }
            })
            .catch((error) => {
              console.error('Error verifying payment:', error);
              setStatusMessage('Error verifying payment status');
              setIsProcessing(false);
            });
        }
      },
      callback: (response) => {
        if (response.status === 'success') {
          handlePaymentCompletion(response.reference, initializeData);
        }
      },
    };

    const handler = window.PaystackPop.setup(config);
    handler.openIframe();
  };

  const handleProceedToFund = async () => {
    setIsProcessing(true);
    setStatusMessage('Initializing payment...');

    try {
      const initializePaymentResponse = await axios.post(
        import.meta.env.VITE_FUND_WALLET_API,
        {
          email: userData?.email || formValues.email,
          amount: Number(amount),
          channels: ['card'],
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

      if (initializePaymentResponse.data.status === true && initializePaymentResponse.data.data) {
        handlePaystackPayment(initializePaymentResponse.data.data);
      } else {
        throw new Error(initializePaymentResponse.data.message || 'Payment initialization failed');
      }
    } catch (err) {
      console.error('Error in payment initialization:', err);
      setStatusMessage('Payment initialization failed');
      onError(err);
      setIsProcessing(false);
    }
  };

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
