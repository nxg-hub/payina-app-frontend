// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useLocalStorage from '../hooks/useLocalStorage';
// import TransactionModal from '../utilities/TransactionModal';
// import CustomButton from '../components/button/button.jsx';
//
// const WalletBalanceChecker = ({ amount, onInsufficientFunds, onSufficientFunds }) => {
//   const navigate = useNavigate();
//   const [balance, setBalance] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [newAuthToken] = useLocalStorage('authToken', '');
//   const [showTransferModal, setShowTransferModal] = useState(false);
//   const [showInsufficientModal, setShowInsufficientModal] = useState(false);
//
//   const accountNumber = '1234567890';
//   const bankName = 'Test Bank';
//
//   const fetchWalletBalance = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//
//       const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           accept: '*/*',
//           apiKey: import.meta.env.VITE_API_KEY,
//           Authorization: `Bearer ${newAuthToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
//
//       if (!response.ok) {
//         const text = await response.text();
//         console.error('Raw API Response:', text);
//         throw new Error(`API error: ${response.status} ${response.statusText}`);
//       }
//
//       const text = await response.text();
//       if (!text) {
//         throw new Error('Empty response from server');
//       }
//
//       let data;
//       try {
//         data = JSON.parse(text);
//         console.log('Wallet API Response:', data);
//       } catch (e) {
//         console.error('JSON Parse Error:', e);
//         console.error('Raw Response:', text);
//         throw new Error('Invalid JSON response from server');
//       }
//
//       const ledgerBalance = data.data.balance.amount;
//       setBalance(ledgerBalance);
//
//       if (amount && Number(amount) > ledgerBalance) {
//         setShowInsufficientModal(true);
//         onInsufficientFunds(ledgerBalance, Number(amount));
//       } else if (amount) {
//         onSufficientFunds();
//       }
//     } catch (err) {
//       console.error('Error fetching balance:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     if (newAuthToken) {
//       fetchWalletBalance();
//     } else {
//       setError('No authentication token available');
//       setLoading(false);
//     }
//
//     const intervalId = setInterval(fetchWalletBalance, 12000);
//     return () => clearInterval(intervalId);
//   }, []);
//
//   const handleFundWithCard = () => {
//     navigate('/account/fund-wallet');
//     setShowInsufficientModal(false);
//   };
//
//   const handleTransfer = () => {
//     setShowInsufficientModal(false);
//     setShowTransferModal(true);
//   };
//
//   if (loading) {
//     return <div className="text-white">Checking wallet balance...</div>;
//   }
//
//   if (error) {
//     return <div className="text-red-500">Error: {error}</div>;
//   }
//
//   return (
//     <CustomButton className="flex justify-start text-black">
//       <h2 className="">Available Balance: </h2>
//       <p className="">{balance !== null ? `₦${Number(balance).toLocaleString()}` : 'Unable to fetch balance'}</p>
//
//       {/*/!* Insufficient Funds Modal *!/*/}
//       {/*<TransactionModal*/}
//       {/*  isOpen={showInsufficientModal}*/}
//       {/*  onClose={() => setShowInsufficientModal(false)}*/}
//       {/*  status="error"*/}
//       {/*  title="Insufficient Funds"*/}
//       {/*  message={`Your wallet balance (₦${Number(balance).toLocaleString()}) is insufficient for this transaction (₦${Number(amount).toLocaleString()})`}*/}
//       {/*  customButtons={*/}
//       {/*    <div className="flex flex-col space-y-2 w-full mt-4">*/}
//       {/*      <button*/}
//       {/*        onClick={() => setShowInsufficientModal(false)}*/}
//       {/*        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"*/}
//       {/*      >*/}
//       {/*        Back*/}
//       {/*      </button>*/}
//       {/*      <button*/}
//       {/*        onClick={handleFundWithCard}*/}
//       {/*        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"*/}
//       {/*      >*/}
//       {/*        Fund with Card*/}
//       {/*      </button>*/}
//       {/*      <button*/}
//       {/*        onClick={handleTransfer}*/}
//       {/*        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"*/}
//       {/*      >*/}
//       {/*        Transfer*/}
//       {/*      </button>*/}
//       {/*    </div>*/}
//       {/*  }*/}
//       {/*/>*/}
//
//       {/* Transfer Details Modal */}
//       <TransactionModal
//         isOpen={showTransferModal}
//         onClose={() => setShowTransferModal(false)}
//         status="info"
//         title="Bank Transfer Details"
//         message={
//           <div className="space-y-4">
//             <div>
//               <p className="font-semibold">Account Number:</p>
//               <p className="text-lg">{accountNumber}</p>
//             </div>
//             <div>
//               <p className="font-semibold">Bank Name:</p>
//               <p className="text-lg">{bankName}</p>
//             </div>
//             <p className="text-sm text-gray-400 mt-4">
//               Please note that it may take a few minutes for your transfer to reflect in your wallet balance.
//             </p>
//           </div>
//         }
//         customButtons={
//           <button
//             onClick={() => setShowTransferModal(false)}
//             className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4"
//           >
//             Close
//           </button>
//         }
//       />
//     </CustomButton>
//   );
// };
//
// export default WalletBalanceChecker;

// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useLocalStorage from '../hooks/useLocalStorage';
// import TransactionModal from '../utilities/TransactionModal';
// import CustomButton from '../components/button/button.jsx';
//
// const WalletBalanceChecker = forwardRef(({ amount, onInsufficientFunds, onSufficientFunds }, ref) => {
//   const navigate = useNavigate();
//   const [balance, setBalance] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [newAuthToken] = useLocalStorage('authToken', '');
//   const [showTransferModal, setShowTransferModal] = useState(false);
//   const [showInsufficientModal, setShowInsufficientModal] = useState(false);
//   const [bankDetails, setBankDetails] = useState({
//     accountNumber: '',
//     bankName: '',
//   });
//
//   const fetchWalletBalance = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//
//       const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           accept: '*/*',
//           apiKey: import.meta.env.VITE_API_KEY,
//           Authorization: `Bearer ${newAuthToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
//
//       if (!response.ok) {
//         const text = await response.text();
//         console.error('Raw API Response:', text);
//         throw new Error(`API error: ${response.status} ${response.statusText}`);
//       }
//
//       const text = await response.text();
//       if (!text) {
//         throw new Error('Empty response from server');
//       }
//
//       let data;
//       try {
//         data = JSON.parse(text);
//         console.log('Wallet API Response:', data);
//       } catch (e) {
//         console.error('JSON Parse Error:', e);
//         console.error('Raw Response:', text);
//         throw new Error('Invalid JSON response from server');
//       }
//
//       const { balance: { amount: ledgerBalance }, payStackVirtualAccountNumber, bankName } = data.data;
//
//       setBalance(ledgerBalance);
//       setBankDetails({
//         accountNumber: payStackVirtualAccountNumber || '',
//         bankName: bankName || '',
//       });
//
//       if (amount && Number(amount) > ledgerBalance) {
//         setShowInsufficientModal(true);
//         onInsufficientFunds?.(ledgerBalance, Number(amount));
//       } else if (amount) {
//         onSufficientFunds?.();
//       }
//     } catch (err) {
//       console.error('Error fetching balance:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   // Expose fetchWalletBalance through ref
//   useImperativeHandle(ref, () => ({
//     checkBalance: fetchWalletBalance
//   }));
//
//   // Initial fetch only when component mounts
//   useEffect(() => {
//     if (newAuthToken) {
//       fetchWalletBalance();
//     } else {
//       setError('No authentication token available');
//       setLoading(false);
//     }
//   }, [newAuthToken]);
//
//   const handleFundWithCard = () => {
//     navigate('/account/fund-wallet');
//     setShowInsufficientModal(false);
//   };
//
//   const handleTransfer = () => {
//     setShowInsufficientModal(false);
//     setShowTransferModal(true);
//   };
//
//   return (
//     <div>
//       <CustomButton className="flex justify-start text-black">
//         <h2 className="">Available Balance: </h2>
//         <p className="">
//           {loading ? (
//             'Checking balance...'
//           ) : balance !== null ? (
//             `₦${Number(balance).toLocaleString()}`
//           ) : (
//             'Unable to fetch balance'
//           )}
//         </p>
//       </CustomButton>
//
//       <TransactionModal
//         isOpen={showTransferModal}
//         onClose={() => setShowTransferModal(false)}
//         status="info"
//         title="Bank Transfer Details"
//         message={
//           <div className="space-y-4">
//             {bankDetails.accountNumber && (
//               <div>
//                 <p className="font-semibold">Account Number:</p>
//                 <p className="text-lg">{bankDetails.accountNumber}</p>
//               </div>
//             )}
//             {bankDetails.bankName && (
//               <div>
//                 <p className="font-semibold">Bank Name:</p>
//                 <p className="text-lg">{bankDetails.bankName}</p>
//               </div>
//             )}
//             <p className="text-sm text-gray-400 mt-4">
//               Please note that it may take a few minutes for your transfer to reflect in your wallet balance.
//             </p>
//           </div>
//         }
//         customButtons={
//           <button
//             onClick={() => setShowTransferModal(false)}
//             className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4"
//           >
//             Close
//           </button>
//         }
//       />
//     </div>
//   );
// });
//
// export default WalletBalanceChecker;

// WalletBalanceChecker.jsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import TransactionModal from '../utilities/TransactionModal';
import CustomButton from '../components/button/button';

const WalletBalanceChecker = forwardRef(
  ({ amount, onInsufficientFunds, onSufficientFunds }, ref) => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newAuthToken] = useLocalStorage('authToken', '');
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showInsufficientModal, setShowInsufficientModal] = useState(false);
    const [bankDetails, setBankDetails] = useState({
      accountNumber: '',
      bankName: '',
    });

    const fetchWalletBalance = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_WALLET_BASE_URL}${import.meta.env.VITE_GET_WALLET_ENDPOINT}`, {
          method: 'GET',
          headers: {
            accept: '*/*',
            apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
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
          console.log('Wallet API Response:', data);
        } catch (e) {
          console.error('JSON Parse Error:', e);
          console.error('Raw Response:', text);
          throw new Error('Invalid JSON response from server');
        }

        const {
          balance: { amount: ledgerBalance },
          payStackVirtualAccountNumber,
          bankName,
        } = data.data;

        setBalance(ledgerBalance);
        setBankDetails({
          accountNumber: payStackVirtualAccountNumber || '',
          bankName: bankName || '',
        });

        if (amount && Number(amount) > ledgerBalance) {
          setShowInsufficientModal(true);
          onInsufficientFunds?.(ledgerBalance, Number(amount));
        } else if (amount) {
          onSufficientFunds?.();
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      checkBalance: fetchWalletBalance,
    }));

    useEffect(() => {
      if (newAuthToken) {
        fetchWalletBalance();
      } else {
        setError('No authentication token available');
        setLoading(false);
      }
    }, [newAuthToken]);

    const handleFundWithCard = () => {
      navigate('/addmoney');
      setShowInsufficientModal(false);
    };

    const handleTransfer = () => {
      setShowInsufficientModal(false);
      setShowTransferModal(true);
    };

    if (!CustomButton) {
      return null; // Or a fallback UI
    }

    return (
      <div>
        <div className="flex justify-start text-black">
          <h2>Available Balance: </h2>
          <p>
            {loading
              ? 'Checking balance...'
              : balance !== null
                ? `₦${Number(balance).toLocaleString()}`
                : 'Unable to fetch balance'}
          </p>
        </div>

        {showTransferModal && (
          <TransactionModal
            isOpen={showTransferModal}
            onClose={() => setShowTransferModal(false)}
            status="info"
            title="Bank Transfer Details"
            message={
              <div className="space-y-4">
                {bankDetails.accountNumber && (
                  <div>
                    <p className="font-semibold">Account Number:</p>
                    <p className="text-lg">{bankDetails.accountNumber}</p>
                  </div>
                )}
                {bankDetails.bankName && (
                  <div>
                    <p className="font-semibold">Bank Name:</p>
                    <p className="text-lg">{bankDetails.bankName}</p>
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-4">
                  Please note that it may take a few minutes for your transfer to reflect in your
                  wallet balance.
                </p>
              </div>
            }
            customButtons={
              <button
                onClick={() => setShowTransferModal(false)}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-4">
                Close
              </button>
            }
          />
        )}
      </div>
    );
  }
);

WalletBalanceChecker.displayName = 'WalletBalanceChecker';

export default WalletBalanceChecker;
