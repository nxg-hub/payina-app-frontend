// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import useLocalStorage from '../hooks/useLocalStorage';
// import Loader from '../assets/LoadingSpinner.jsx';
// import CustomButton from '../components/button/button.jsx';
//
// const VendInitiator = ({
//   selectedPlan,
//   formValues,
//   packageSlug,
//   amount,
//   phoneNumber,
//   onVendInitiated,
//   onError,
//   accountNumber,
//   customerReference,
//   isProcessing,
//   setIsProcessing,
// }) => {
//   const [statusMessage, setStatusMessage] = useState('');
//   const [newAuthToken] = useLocalStorage('authToken', '');
//   const [userData, setUserData] = useState(null);
//   const [walletData, setWalletData] = useState(null);
//   const walletDetailsRef = useRef(null);
//   const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);
//   const hasLoadedWalletRef = useRef(false);
//
//   const fetchWalletDetails = useCallback(async () => {
//     if (hasLoadedWalletRef.current) {
//       return walletDetailsRef.current;
//     }
//
//     try {
//       const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${newAuthToken}`,
//           'Content-Type': 'application/json',
//           apiKey: apiKey,
//         },
//       });
//
//       if (!response.ok) {
//         throw new Error('Failed to fetch wallet data');
//       }
//
//       const walletData = await response.json();
//
//       const {
//         businessId,
//         walletId,
//         balance,
//         name: walletName,
//         payStackVirtualAccountNumber,
//       } = walletData.data;
//
//       const walletDetails = {
//         businessId,
//         walletId,
//         balance: balance?.amount || 0,
//         walletName,
//         accountNumber: payStackVirtualAccountNumber,
//       };
//
//       walletDetailsRef.current = walletDetails;
//       setWalletData(walletDetails);
//       hasLoadedWalletRef.current = true;
//       return walletDetails;
//     } catch (error) {
//       console.error('Error fetching wallet details:', error);
//       onError(error);
//       return null;
//     }
//   }, [newAuthToken, apiKey, onError]);
//
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const userResponse = await fetch(import.meta.env.VITE_GET_USER, {
//           method: 'GET',
//           headers: {
//             accept: '*/*',
//             apiKey: apiKey,
//             Authorization: `Bearer ${newAuthToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//
//         if (!userResponse.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//
//         const userDataResponse = await userResponse.json();
//         setUserData(userDataResponse);
//
//         if (!hasLoadedWalletRef.current) {
//           await fetchWalletDetails();
//         }
//       } catch (error) {
//         // console.error('Error fetching initial data:', error);
//         onError(error);
//       }
//     };
//
//     fetchInitialData();
//   }, [apiKey, newAuthToken]);
//
//   const handleVendProcess = async () => {
//     if (!packageSlug) {
//       onError(new Error('Package slug is required for this transaction'));
//       return;
//     }
//
//     try {
//       setIsProcessing(true);
//       setStatusMessage('Processing vend request...');
//
//       if (!walletDetailsRef.current) {
//         throw new Error('Wallet details not available');
//       }
//
//       const vendData = {
//         customerId: userData?.customerReference || customerReference,
//         packageSlug: packageSlug,
//         channel: 'web',
//         amount: amount,
//         customerName: userData ? `${userData.firstName} ${userData.lastName}` : '',
//         phoneNumber: phoneNumber,
//         accountNumber: userData?.accountNumber || accountNumber,
//         email: userData?.email || formValues.email,
//         merchantId: walletDetailsRef.current.businessId,
//       };
//
//       // console.log('Final Vend Data:', vendData);
//
//       const vendValueResponse = await axios.post(import.meta.env.VITE_VEND_VALUE_PAYINA, vendData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: '*/*',
//           Authorization: `Bearer ${newAuthToken}`,
//           apiKey: apiKey,
//         },
//       });
//
//       if (vendValueResponse.data.status === 'success') {
//         const responseData = vendValueResponse.data.responseData || {};
//         let customerMessage = responseData.customerMessage || '';
//
//         // Remove "C'Gate" from the customer message
//         customerMessage = customerMessage.replace(" C'Gate", '');
//
//         onVendInitiated(vendValueResponse.data);
//         setStatusMessage(customerMessage || 'Transaction completed successfully');
//       } else {
//         // if (vendValueResponse.data.status === 'success') {
//         //   onVendInitiated(vendValueResponse.data);
//         //   setStatusMessage('Transaction completed successfully');
//         // } else {
//         // Handle the error case with debug message
//         // const errorMessage = vendValueResponse.data.debugMessage || 'Vend value failed';
//         // throw new Error(errorMessage);
//         const responseData = vendValueResponse.data.responseData || {};
//         const errorNarration =
//           responseData.narration || responseData.errorNarration || 'Unknown error occurred';
//         const debugMessage =
//           vendValueResponse.data.debugMessage || `Vend value failed: ${errorNarration}`;
//
//         throw new Error(debugMessage);
//       }
//     } catch (err) {
//       console.error('Error in vend process:', err);
//
//       // Extract the debug message if available
//       const errorMessage =
//         err.response?.data?.debugMessage ||
//         err.message ||
//         'Vend process failed';
//
//       setStatusMessage(errorMessage);
//       onError(err);
//     } finally {
//       setIsProcessing(false);
//     }
//   };
//
//   return (
//     <div className="mt-4">
//       {!packageSlug && (
//         <div className="text-sm text-red-600 mb-2">Warning: User package details is missing</div>
//       )}
//       {statusMessage && (
//         <div
//           className={`text-sm mb-2 ${
//             statusMessage.includes('failed') ||
//             statusMessage.includes('error') ||
//             statusMessage.includes('insufficient')
//               ? 'text-green-600'
//               : 'text-red-600'
//           }`}>
//           {statusMessage}
//         </div>
//       )}
//       <CustomButton
//         onClick={handleVendProcess}
//         disabled={isProcessing || !userData || !walletData || !packageSlug}
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
//         {isProcessing ? (
//           <div className="flex justify-center items-center">
//             <Loader />
//             <span className="ml-2">Processing...</span>
//           </div>
//         ) : (
//           'Proceed to Vend'
//         )}
//       </CustomButton>
//     </div>
//   );
// };
//
// export default VendInitiator;




import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import CustomButton from '../components/button/button.jsx';
import PayinaLoader from './PayinaLoader';
import { useNavigate } from 'react-router-dom';

const VendInitiatorBills = ({
                              selectedBill,
                              formValues,
                              billSlug,
                              phoneNumber,
                              amount,
                              onBillPaymentInitiated,
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

  const handleBillPayment = async () => {
    if (!billSlug) {
      onError(new Error('Bill service details are required for this transaction'));
      return;
    }

    if (isInsufficientBalance) {
      onError(
        new Error(
          `Insufficient funds. Required: ₦${Number(amount).toLocaleString()}, Available: ₦${walletBalance.toLocaleString()}`
        )
      );
      return;
    }

    try {
      setIsProcessing(true);
      setShowLoader(true);

      if (!walletDetailsRef.current) {
        throw new Error('Wallet details not available');
      }

      const billData = {
        customerId: phoneNumber || '',
        billSlug: billSlug,
        channel: 'web',
        amount: amount,
        customerName: userData ? `${userData.firstName} ${userData.lastName}` : '',
        phoneNumber: phoneNumber,
        accountNumber: userData?.accountNumber || accountNumber,
        email: userData?.email || formValues.email,
        merchantId: walletDetailsRef.current.businessId,
        billType: selectedBill?.type || 'utility',
        serviceCategory: selectedBill?.category || 'bill_payment',
      };

      const billPaymentResponse = await axios.post(
        import.meta.env.VITE_PAY_BILL_ENDPOINT,
        billData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: `Bearer ${newAuthToken}`,
            apiKey: apiKey,
          },
        }
      );

      if (billPaymentResponse.data.status === 'success') {
        const responseData = billPaymentResponse.data.responseData || {};
        let customerMessage = responseData.customerMessage || '';
        customerMessage = customerMessage.replace(" C'Gate", '');
        onBillPaymentInitiated(billPaymentResponse.data);
      } else {
        const responseData = billPaymentResponse.data.responseData || {};
        const errorNarration =
          responseData.narration || responseData.errorNarration || 'Unknown error occurred';
        const debugMessage =
          billPaymentResponse.data.debugMessage || `Bill payment failed: ${errorNarration}`;
        throw new Error(debugMessage);
      }
    } catch (err) {
      console.error('Error in bill payment process:', err);
      const errorMessage =
        err.response?.data?.debugMessage ||
        err.response?.data?.message ||
        err.message ||
        'Bill payment failed';
      onError(new Error(errorMessage));
    } finally {
      setIsProcessing(false);
      setShowLoader(false);
    }
  };

  return (
    <div className="mt-4">
      <PayinaLoader isVisible={showLoader} />
      {/*{!billSlug && (*/}
      {/*  <div className="text-sm text-red-600 mb-2">Warning: Bill service details are missing</div>*/}
      {/*)}*/}

      <div className="mb-4 p-4 bg-gray-50">
        <div className="text-sm text-gray-600">Available Balance</div>
        <div
          className={`text-xl font-semibold ${isInsufficientBalance ? 'text-red-600' : 'text-gray-800'}`}>
          ₦
          {walletBalance?.toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
          {isInsufficientBalance && (
            <div className="text-sm text-red-600 mt-1">
              Required: ₦{Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
          )}
        </div>
      </div>

      <CustomButton
        onClick={isInsufficientBalance ? handleFundWallet : handleBillPayment}
        disabled={isProcessing || !userData || !walletBalance || !billSlug}
        className={`w-full py-2 px-4 rounded-md text-white transition-colors ${
          isInsufficientBalance
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-blue-600 hover:bg-blue-700'
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}>
        {isProcessing ? 'Processing...' : isInsufficientBalance ? 'Fund Wallet' : 'Pay Bill'}
      </CustomButton>
    </div>
  );
};

export default VendInitiatorBills;
