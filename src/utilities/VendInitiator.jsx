import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

const VendInitiator = ({
  selectedPlan,
  formValues,
  amount,
  onVendInitiated,
  onError,
  accountNumber
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authtoken', '');
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [paymentReference, setPaymentReference] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

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
            apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userDataResponse = await userResponse.json();
        setUserData(userDataResponse);

        const extractedUserData = {
          customerId: userDataResponse.customerId || '',
          customerName: `${userDataResponse.firstName} ${userDataResponse.lastName}`,
          email: userDataResponse.email,
          accountNumber: userDataResponse.accountNumber
        };
        console.log('Extracted User Data:', extractedUserData);

        const walletResponse = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!walletResponse.ok) {
          throw new Error('Failed to fetch wallet balance');
        }

        const walletDataResponse = await walletResponse.json();
        setWalletData(walletDataResponse);
        console.log('Wallet Data:', walletDataResponse);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        onError(error);
      }
    };

    fetchInitialData();
  }, [newAuthToken, accountNumber]);

  const handleVendProcess = async (paystackResponse) => {
    try {
      setStatusMessage('Processing vend request...');

      const vendData = {
        paymentReference: paystackResponse.reference,
        customerId: userData?.customerId || '',
        packageSlug: selectedPlan.slug,
        channel: 'card',
        amount: amount,
        customerName: userData ? `${userData.firstName} ${userData.lastName}` : '',
        phoneNumber: formValues.phoneNumber,
        accountNumber: userData?.accountNumber || accountNumber,
        email: userData?.email || formValues.email,
        merchantId: paystackResponse.merchant_id
      };

      console.log('Prepared Vend Data:', vendData);

      const vendValueResponse = await axios.post(
        import.meta.env.VITE_VEND_VALUE_PAYINA,
        vendData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: `Bearer ${newAuthToken}`
          }
        }
      );

      if (vendValueResponse.data.status === 'success') {
        onVendInitiated(paystackResponse.reference, vendValueResponse.data);
        setStatusMessage('Transaction completed successfully');
        setPaymentCompleted(true);
      } else {
        throw new Error(vendValueResponse.data.message || 'Vend value failed');
      }
    } catch (err) {
      console.error('Error in vend process:', err);
      setStatusMessage('Vend process failed');
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentCompletion = async (reference, merchant_id) => {
    if (!paymentCompleted) {
      await handleVendProcess({
        reference: reference,
        merchant_id: merchant_id,
        status: 'success'
      });
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
    setPaymentCompleted(false); // Reset payment status

    const config = {
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: userData?.email || formValues.email,
      amount: Number(amount) * 100,
      ref: initializeData.reference,
      onClose: () => {
        if (!paymentCompleted) {
          axios
            .get(
              `https://payina-wallet-service-api.onrender.com/api/v1/bill/verify/${initializeData.reference}`,
              {
                headers: {
                  Authorization: `Bearer ${newAuthToken}`,
                  'Content-Type': 'application/json'
                }
              }
            )
            .then((response) => {
              if (response.data.status === 'success' && response.data.data.status === 'success') {
                handlePaymentCompletion(initializeData.reference, response.data.data.merchant_id);
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
        console.log('Paystack Response:', response);
        if (response.status === 'success') {
          handlePaymentCompletion(response.reference, response.data?.merchant_id);
        }
      }
    };

    const handler = window.PaystackPop.setup(config);
    handler.openIframe();
  };

  const handleProceedToVend = async () => {
    setIsProcessing(true);
    setStatusMessage('Initializing payment...');

    try {
      const initializePaymentResponse = await axios.post(
        'https://payina-wallet-service-api.onrender.com/api/v1/bill/initialize',
        {
          planId: selectedPlan.id,
          email: formValues.email,
          amount: Number(amount) * 100
        }
      );

      if (
        initializePaymentResponse.data.status === true &&
        initializePaymentResponse.data.message === 'Authorization URL created'
      ) {
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
    <div className="mt-4">
      {statusMessage && <div className="text-sm text-gray-600 mb-2">{statusMessage}</div>}
      <button
        onClick={handleProceedToVend}
        disabled={isProcessing || !userData || !walletData}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
        {isProcessing ? 'Processing...' : 'Proceed to Vend'}
      </button>
    </div>
  );
};

export default VendInitiator;
