import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import CustomButton from '../components/button/button.jsx';
import PayinaLoader from './PayinaLoader';
import { useNavigate } from 'react-router-dom';

const VendInitiator = ({
                         selectedPlan,
                         formValues,
                         packageSlug,
                         phoneNumber,
                         amount,
                         onVendInitiated,
                         onError,
                         accountNumber,
                         isProcessing,
                         setIsProcessing,
                       }) => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [userData, setUserData] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);
  const walletDetailsRef = useRef(null);

  const isInsufficientBalance = useMemo(() => {
    return walletBalance !== null && Number(amount) > walletBalance;
  }, [walletBalance, amount]);

  const handleFundWallet = () => {
    navigate('/addmoney');
  };

  const fetchUserAndWalletData = useCallback(async () => {
    try {
      const [userResponse, walletResponse] = await Promise.all([
        fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            accept: '*/*',
            apiKey: apiKey,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        }),
        fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
            apiKey: apiKey,
          },
        }),
      ]);

      if (!userResponse.ok || !walletResponse.ok) {
        throw new Error('Failed to fetch user or wallet data');
      }

      const [userData, walletData] = await Promise.all([
        userResponse.json(),
        walletResponse.json(),
      ]);

      setUserData(userData);

      const walletDetails = {
        businessId: walletData.data.businessId,
        walletId: walletData.data.walletId,
        balance: walletData.data.balance?.amount || 0,
        walletName: walletData.data.name,
        accountNumber: walletData.data.payStackVirtualAccountNumber,
      };

      setWalletBalance(walletDetails.balance);
      walletDetailsRef.current = walletDetails;

      return { userData, walletDetails };
    } catch (error) {
      console.error('Error fetching data:', error);
      onError(error);
      return null;
    }
  }, [newAuthToken, apiKey, onError]);

  useEffect(() => {
    fetchUserAndWalletData();
  }, [fetchUserAndWalletData]);

  const handleVendProcess = async () => {
    if (!packageSlug) {
      onError(new Error('Package slug is required for this transaction'));
      return;
    }

    if (isInsufficientBalance) {
      onError(new Error(`Insufficient funds. Required: ₦${Number(amount).toLocaleString()}, Available: ₦${walletBalance.toLocaleString()}`));
      return;
    }

    try {
      setIsProcessing(true);
      setShowLoader(true);

      if (!walletDetailsRef.current) {
        throw new Error('Wallet details not available');
      }

      const vendData = {
        customerId: phoneNumber || '',
        packageSlug: packageSlug,
        channel: 'web',
        amount: amount,
        customerName: userData ? `${userData.firstName} ${userData.lastName}` : '',
        phoneNumber: phoneNumber,
        accountNumber: userData?.accountNumber || accountNumber,
        email: userData?.email || formValues.email,
        merchantId: walletDetailsRef.current.businessId,
      };

      const vendValueResponse = await axios.post(import.meta.env.VITE_VEND_VALUE_PAYINA, vendData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${newAuthToken}`,
          apiKey: apiKey,
        },
      });

      if (vendValueResponse.data.status === 'success') {
        const responseData = vendValueResponse.data.responseData || {};
        let customerMessage = responseData.customerMessage || '';
        customerMessage = customerMessage.replace(" C'Gate", '');
        onVendInitiated(vendValueResponse.data);
      } else {
        const responseData = vendValueResponse.data.responseData || {};
        const errorNarration = responseData.narration || responseData.errorNarration || 'Unknown error occurred';
        const debugMessage = vendValueResponse.data.debugMessage || `Vend value failed: ${errorNarration}`;
        throw new Error(debugMessage);
      }
    } catch (err) {
      console.error('Error in vend process:', err);
      const errorMessage = err.response?.data?.debugMessage ||
        err.response?.data?.message ||
        err.message ||
        'Vend process failed';
      onError(new Error(errorMessage));
    } finally {
      setIsProcessing(false);
      setShowLoader(false);
    }
  };

  return (
    <div className="mt-4">
      <PayinaLoader isVisible={showLoader} />
      {!packageSlug && (
        <div className="text-sm text-red-600 mb-2">Warning: User package details is missing</div>
      )}

      <div className="mb-4 p-4 bg-gray-50">
      {/*<div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">*/}
        <div className="text-sm text-gray-600">Available Balance</div>
        <div className={`text-xl font-semibold ${isInsufficientBalance ? 'text-red-600' : 'text-gray-800'}`}>
          ₦{walletBalance?.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
          {isInsufficientBalance && (
            <div className="text-sm text-red-600 mt-1">
              Required: ₦{Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>
      </div>

      <CustomButton
        onClick={isInsufficientBalance ? handleFundWallet : handleVendProcess}
        disabled={isProcessing || !userData || !walletBalance || !packageSlug}
        className={`w-full py-2 px-4 rounded-md text-white transition-colors ${
          isInsufficientBalance
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-blue-600 hover:bg-blue-700'
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {isProcessing ? 'Processing...' : isInsufficientBalance ? 'Fund Wallet' : 'Proceed to Vend'}
      </CustomButton>
    </div>
  );
};

export default VendInitiator;