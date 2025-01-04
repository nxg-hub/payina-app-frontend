import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import Loader from '../assets/LoadingSpinner.jsx';
import CustomButton from '../components/button/button.jsx';

const VendInitiator = ({
  selectedPlan,
  formValues,
  packageSlug,
  amount,
  onVendInitiated,
  onError,
  accountNumber,
  customerReference,
  isProcessing,
  setIsProcessing,
}) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const walletDetailsRef = useRef(null);
  const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);
  const hasLoadedWalletRef = useRef(false);

  const fetchWalletDetails = useCallback(async () => {
    if (hasLoadedWalletRef.current) {
      return walletDetailsRef.current;
    }

    try {
      const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${newAuthToken}`,
          'Content-Type': 'application/json',
          apiKey: apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wallet data');
      }

      const walletData = await response.json();

      if (walletData.statusCode !== 'OK' || !walletData.data) {
        throw new Error('Wallet not found, upgrade your account now');
      }

      const {
        businessId,
        walletId,
        balance,
        name: walletName,
        payStackVirtualAccountNumber,
      } = walletData.data;

      const walletDetails = {
        businessId,
        walletId,
        balance: balance?.amount || 0,
        walletName,
        accountNumber: payStackVirtualAccountNumber,
      };

      walletDetailsRef.current = walletDetails;
      setWalletData(walletDetails);
      hasLoadedWalletRef.current = true;
      return walletDetails;
    } catch (error) {
      console.error('Error fetching wallet details:', error);
      onError(error);
      return null;
    }
  }, [newAuthToken, apiKey, onError]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            accept: '*/*',
            apiKey: apiKey,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userDataResponse = await userResponse.json();
        setUserData(userDataResponse);

        if (!hasLoadedWalletRef.current) {
          await fetchWalletDetails();
        }
      } catch (error) {
        // console.error('Error fetching initial data:', error);
        onError(error);
      }
    };

    fetchInitialData();
  }, [apiKey, newAuthToken]);

  const handleVendProcess = async () => {
    if (!packageSlug) {
      onError(new Error('Package slug is required for this transaction'));
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage('Processing vend request...');

      if (!walletDetailsRef.current) {
        throw new Error('Wallet details not available');
      }

      const vendData = {
        customerId: userData?.customerReference || customerReference,
        packageSlug: packageSlug,
        channel: 'web',
        amount: amount,
        customerName: userData ? `${userData.firstName} ${userData.lastName}` : '',
        phoneNumber: formValues.phoneNumber,
        accountNumber: userData?.accountNumber || accountNumber,
        email: userData?.email || formValues.email,
        merchantId: walletDetailsRef.current.businessId,
      };

      // console.log('Final Vend Data:', vendData);

      const vendValueResponse = await axios.post(import.meta.env.VITE_VEND_VALUE_PAYINA, vendData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${newAuthToken}`,
          apiKey: apiKey,
        },
      });

      if (vendValueResponse.data.status === 'success') {
        onVendInitiated(vendValueResponse.data);
        setStatusMessage('Transaction completed successfully');
      } else {
        // Handle the error case with debug message
        const errorMessage = vendValueResponse.data.debugMessage || 'Vend value failed';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Error in vend process:', err);
      // const errorMessage = err.message || 'Vend process failed';
      const errorMessage = 'Vend process failed';
      // const errorMessage = err.response?.data?.debugMessage || err.message || 'Vend process failed';
      setStatusMessage(errorMessage);
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4">
      {!packageSlug && (
        <div className="text-sm text-red-600 mb-2">Warning: User package details is missing</div>
      )}
      {statusMessage && (
        <div
          className={`text-sm mb-2 ${
            statusMessage.includes('failed') ||
            statusMessage.includes('error') ||
            statusMessage.includes('insufficient')
              ? 'text-red-600'
              : 'text-gray-600'
          }`}>
          {statusMessage}
        </div>
      )}
      <CustomButton
        onClick={handleVendProcess}
        disabled={isProcessing || !userData || !walletData || !packageSlug}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
        {isProcessing ? (
          <div className="flex justify-center items-center">
            <Loader />
            <span className="ml-2">Processing...</span>
          </div>
        ) : (
          'Proceed to Vend'
        )}
      </CustomButton>
    </div>
  );
};

export default VendInitiator;
