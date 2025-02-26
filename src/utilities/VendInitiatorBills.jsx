import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import CustomButton from '../components/button/button.jsx';
import Loader from '../assets/LoadingSpinner.jsx';
import TransactionPinModal from './TransactionPinModal';
import PayinaLoader from './PayinaLoader.jsx';

const VendInitiator = ({
  formValues,
  packageSlug,
  phoneNumber,
  amount,
  onVendInitiated,
  onError,
  accountNumber,
  customerReference,
  isProcessing,
  setIsProcessing,
}) => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);
  const [buttonState, setButtonState] = useState('initial'); // 'initial', 'processing'
  const walletDetailsRef = useRef(null);
  const hasLoadedWalletRef = useRef(false);

  // Calculate total amount with transaction charge
  const totalAmount = useMemo(() => {
    const baseAmount = Number(amount || 0);
    return baseAmount + 70;
  }, [amount]);

  const isInsufficientFunds = useMemo(() => {
    return walletData && totalAmount > walletData.balance;
  }, [totalAmount, walletData]);

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
        onError(error);
      }
    };

    fetchInitialData();
  }, [apiKey, newAuthToken, fetchWalletDetails, onError]);

  const performVendTransaction = async () => {
    try {
      setIsProcessing(true);
      setShowLoader(true);
      setButtonState('processing');
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
        phoneNumber: phoneNumber,
        billType: 'CUSTOM_BILL',
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
        setStatusMessage(customerMessage || 'Transaction completed successfully');
      } else {
        const responseData = vendValueResponse.data.responseData || {};
        const errorNarration =
          responseData.narration || responseData.errorNarration || 'Unknown error occurred';
        const debugMessage =
          vendValueResponse.data.debugMessage || `Vend value failed: ${errorNarration}`;
        throw new Error(debugMessage);
      }
    } catch (err) {
      console.error('Error in vend process:', err);
      const errorMessage = err.response?.data?.debugMessage || err.message || 'Vend process failed';
      setStatusMessage(errorMessage);
      onError(err);
    } finally {
      setIsProcessing(false);
      setButtonState('initial');
      setShowLoader(false);
    }
  };

  const handleFundWallet = () => {
    navigate('/fund-wallet');
  };

  const handleVendProcess = () => {
    if (!packageSlug) {
      onError(new Error('Package slug is required for this transaction'));
      return;
    }
    setShowPinModal(true);
  };

  const isFormComplete = useMemo(() => {
    return (
      !!formValues.email &&
      !!phoneNumber &&
      !!amount &&
      !!packageSlug &&
      !!accountNumber &&
      !!customerReference
    );
  }, [formValues, phoneNumber, amount, packageSlug, accountNumber, customerReference]);

  // const renderButton = () => {
  //   if (isInsufficientFunds) {
  //     return (
  //       <CustomButton
  //         onClick={handleFundWallet}
  //         className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
  //         Fund Wallet
  //       </CustomButton>
  //     );
  //   }
  //
  //   const isDisabled = isProcessing || !userData || !walletData || !isFormComplete;
  //   const buttonStyle =
  //     'w-full py-2 px-4 rounded-md transition-colors ' +
  //     (isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white');
  //
  //   if (buttonState === 'processing') {
  //     return (
  //       <CustomButton disabled={true} className={buttonStyle}>
  //         <div className="flex justify-center items-center">
  //           <Loader />
  //           <span className="ml-2">Processing...</span>
  //         </div>
  //       </CustomButton>
  //     );
  //   }
  //
  //   return (
  //     <CustomButton onClick={handleVendProcess} disabled={isDisabled} className={buttonStyle}>
  //       Proceed to Vend
  //     </CustomButton>
  //   );
  // };

  const renderButton = () => {
    const isDisabled = !isFormComplete || !userData || !walletData || isProcessing;

    const buttonStyle =
      'w-full py-2 px-4 rounded-md transition-colors ' +
      (isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white');

    if (buttonState === 'processing') {
      return (
        <CustomButton disabled={true} className={buttonStyle}>
          <div className="flex justify-center items-center">
            <Loader />
            <span className="ml-2">Processing...</span>
          </div>
        </CustomButton>
      );
    }

    return (
      <CustomButton onClick={handleVendProcess} disabled={isDisabled} className={buttonStyle}>
        Proceed
      </CustomButton>
    );
  };

  return (
    <div className="mt-4">
      <PayinaLoader isVisible={showLoader} />
      <TransactionPinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setButtonState('initial');
        }}
        email={userData?.email || formValues.email}
        onPinValidated={performVendTransaction}
        onPinError={(error) => {
          onError(new Error('Transaction PIN validation failed'));
          setShowPinModal(false);
          setButtonState('initial');
        }}
      />

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
              : 'text-green-600'
          }`}>
          {statusMessage}
        </div>
      )}

      <div className="mb-4 p-4 bg-gray-50">
        <div className="flex flex-wrap justify-between">
          <div className="text-sm text-gray-600">Available Balance</div>
          {/*<small className="text-sm text-gray-600">Total Charge: + {amount + 70}</small>*/}
        </div>

        <div className="text-xl font-semibold">
          ₦
          {walletData?.balance?.toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
        </div>
        {/*<small>Transaction Charge: ₦70</small>*/}
        <small className="text-sm text-gray-600">Total due amount: + {amount + 70}</small>
        {/* <div className="text-sm text-gray-500 mt-1">Transaction Charge: ₦100</div> */}
        {isInsufficientFunds && (
          <div className="text-sm text-red-600 mt-1">
            Insufficient funds. Required: ₦{totalAmount.toLocaleString()}
          </div>
        )}
      </div>

      {renderButton()}
    </div>
  );
};

export default VendInitiator;
