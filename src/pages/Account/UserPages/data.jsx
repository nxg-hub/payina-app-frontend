// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Navbar, Sidebar } from '../_components';
// import { useForm } from '../../../context/formContext';
// import { useDataPlans } from '../../../hooks/useDataPlans';
// import NetworkSelection from '../../../components/NetworkSelection';
// import DataPlansSelection from '../../../components/DataPlansSelection';
// import TransactionModal from '../../../utilities/TransactionModal';
// import Loader from '../../../assets/LoadingSpinner';
// import VendInitiator from '../../../utilities/VendInitiator';
// import WalletBalanceChecker from '../../../utilities/WalletBalanceChecker';
// import InputStyle from '../../../utilities/InputStyle';
// import { useAuth } from '../../../context/useAuth';
//
// const UserData = () => {
//   const { formValues, updateFormValues } = useForm();
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalStatus, setModalStatus] = useState('error');
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [modalDetails, setModalDetails] = useState('');
//   const [isProcessingVend, setIsProcessingVend] = useState(false);
//   const [accountNumber, setAccountNumber] = useState('');
//   const [merchantId, setMerchantId] = useState('');
//   const auth = useAuth();
//   const { plans, selectedPlan, setSelectedPlan, isLoading, error } = useDataPlans(
//     formValues.selectedNetwork
//   );
//
//   useEffect(() => {
//     const userEmail = auth?.userCredentials?.email || formValues.email;
//     console.log('User Email:', userEmail);
//     setAccountNumber('1238215449');
//     setMerchantId('k76huhvtvcb');
//   }, [formValues, formValues.email]);
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//
//     const newErrors = {};
//     if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
//     if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
//     if (!selectedPlan) newErrors.selectedPlan = 'Please select a data plan';
//
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//
//   };
//
//   const handlePaystackCallback = useCallback(
//     (response) => {
//       if (response.status === 'success') {
//         setModalStatus('success');
//         setModalTitle('Transaction Successful');
//         setModalMessage('Successfully processed the data plan purchase');
//         setModalDetails(`Reference: ${response.reference}`);
//         setShowModal(true);
//         navigate('/account/data');
//       } else {
//         setModalStatus('error');
//         setModalTitle('Transaction Failed');
//         setModalMessage('Payment was not completed.');
//         setModalDetails('');
//         setShowModal(true);
//       }
//     },
//     [navigate]
//   );
//
//   const handleError = (err) => {
//     setModalStatus('error');
//     setModalTitle('Transaction Failed');
//     setModalMessage(err.message || 'An unknown error occurred');
//     setModalDetails('');
//     setShowModal(true);
//   };
//
//   const handleFundWallet = () => {
//     navigate('/account/fund-wallet');
//   };
//
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar />
//         {/*<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">*/}
//           {/*<div className="container mx-auto px-6 py-8 ml-96 mt-28">*/}
//           {/*  <h3 className="text-white text-3xl font-medium">Buy Data Plan</h3>*/}
//             <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
//               <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:ml-96 mt-16 sm:mt-28">
//                 <h3 className="text-white text-2xl sm:text-3xl font-medium">Buy Data</h3>
//
//                 <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-2xl">
//                   <NetworkSelection
//                     selectedNetwork={formValues.selectedNetwork}
//                     onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
//                     error={errors.selectedNetwork}
//                   />
//                   <DataPlansSelection
//                     networkSlug={formValues.selectedNetwork}
//                     selectedPlan={selectedPlan}
//                     onPlanChange={setSelectedPlan}
//                     error={errors.selectedPlan}
//                     plans={plans}
//                   />
//
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-white">Phone</label>
//                     <InputStyle
//                       type="tel"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                       value={formValues.phoneNumber}
//                       onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
//                     />
//                     {errors.phoneNumber && (
//                       <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
//                     )}
//                   </div>
//
//                   {isProcessingVend && <div>Processing...</div>}
//
//                   <div className="mt-4">
//                     <WalletBalanceChecker
//                       amount={selectedPlan?.amount}
//                       onInsufficientFunds={(balance, requiredAmount) => {
//                         setModalStatus('error');
//                         setModalTitle('Insufficient Funds');
//                         setModalMessage('Wallet balance too low. Fund your wallet to proceed.');
//                         setModalDetails(
//                           `Wallet Balance: ₦${balance.toFixed(2)}, Required Amount: ₦${requiredAmount}`
//                         );
//                         setShowModal(true);
//                       }}
//                       onSufficientFunds={() => {
//                       }}
//                     />
//                   </div>
//
//                   <div className="mt-4">
//                     <VendInitiator
//                       selectedPlan={selectedPlan}
//                       formValues={formValues}
//                       amount={selectedPlan?.amount}
//                       onVendInitiated={handlePaystackCallback}
//                       onError={handleError}
//                       accountNumber={accountNumber}
//                       merchantId={merchantId}
//                     />
//                   </div>
//                 </form>
//               </div>
//             </main>
//       </div>
//       <TransactionModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         status={modalStatus}
//         title={modalTitle}
//         message={modalMessage}
//         details={modalDetails}
//         onBack={() => setShowModal(false)}
//         onProceed={handleFundWallet}
//         proceedText="Fund Wallet"
//       />
//     </div>
//   );
// };
//
// export default UserData;

//
// import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Navbar, Sidebar } from '../_components';
// import { useForm } from '../../../context/formContext';
// import { useDataPlans } from '../../../hooks/useDataPlans';
// import NetworkSelection from '../../../components/NetworkSelection';
// import DataPlansSelection from '../../../components/DataPlansSelection';
// import TransactionModal from '../../../utilities/TransactionModal';
// import Loader from '../../../assets/LoadingSpinner';
// import VendInitiator from '../../../utilities/VendInitiator';
// import WalletBalanceChecker from '../../../utilities/WalletBalanceChecker';
// import InputStyle from '../../../utilities/InputStyle';
// import { useAuth } from '../../../context/useAuth';
// import useLocalStorage from '../../../hooks/useLocalStorage';
//
// const UserData = () => {
//   const { formValues, updateFormValues } = useForm();
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalStatus, setModalStatus] = useState('error');
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalMessage, setModalMessage] = useState('');
//   const [modalDetails, setModalDetails] = useState('');
//   const [isProcessingVend, setIsProcessingVend] = useState(false);
//   const auth = useAuth();
//   const [userDetails] = useLocalStorage('userDetails', '');
//
//   const {
//     plans,
//     selectedPlan,
//     setSelectedPlan,
//     isLoading,
//     error: plansError
//   } = useDataPlans(formValues.selectedNetwork);
//
//   // Get package slug from selected plan
//   const packageSlug = useMemo(() => {
//     return selectedPlan?.slug || '';
//   }, [selectedPlan]);
//
//   // Update form values when package slug changes
//   useEffect(() => {
//     if (packageSlug) {
//       updateFormValues({ packageSlug });
//     }
//   }, [packageSlug, updateFormValues]);
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//
//     const newErrors = {};
//     if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
//     if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
//     if (!selectedPlan) newErrors.selectedPlan = 'Please select a data plan';
//     if (!packageSlug) newErrors.packageSlug = 'Network plan not available';
//     if (!userDetails.sub) newErrors.email = 'Email is required';
//
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//
//     setIsProcessingVend(true);
//   };
//
//   const handlePaystackCallback = useCallback((response) => {
//     setIsProcessingVend(false);
//     if (response.status === 'success') {
//       setModalStatus('success');
//       setModalTitle('Transaction Successful');
//       setModalMessage('Successfully processed the data plan purchase');
//       setModalDetails(`Reference: ${response.reference}`);
//       setShowModal(true);
//       navigate('/account/data');
//     } else {
//       setModalStatus('error');
//       setModalTitle('Transaction Failed');
//       setModalMessage('Payment was not completed.');
//       setModalDetails('');
//       setShowModal(true);
//     }
//   }, [navigate]);
//
//   const handleError = (err) => {
//     setIsProcessingVend(false);
//     setModalStatus('error');
//     setModalTitle('Transaction Failed');
//     setModalMessage(err.message || 'An unknown error occurred');
//     setModalDetails('');
//     setShowModal(true);
//   };
//
//   const handleFundWallet = () => {
//     navigate('/account/fund-wallet');
//   };
//
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader />
//       </div>
//     );
//   }
//
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
//           <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:ml-96 mt-16 sm:mt-28">
//             <h3 className="text-white text-2xl sm:text-3xl font-medium">Buy Data</h3>
//
//             <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-2xl">
//               <NetworkSelection
//                 selectedNetwork={formValues.selectedNetwork}
//                 onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
//                 error={errors.selectedNetwork}
//               />
//
//               <DataPlansSelection
//                 networkSlug={formValues.selectedNetwork}
//                 selectedPlan={selectedPlan}
//                 onPlanChange={setSelectedPlan}
//                 error={errors.selectedPlan}
//                 plans={plans}
//               />
//
//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-white">Phone</label>
//                 <InputStyle
//                   type="tel"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   value={formValues.phoneNumber}
//                   onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
//                 )}
//               </div>
//
//               {packageSlug && (
//                 <div className="mt-2 text-sm text-gray-400">
//                   Selected Plan ID: {packageSlug}
//                 </div>
//               )}
//
//               <div className="mt-4">
//                 <WalletBalanceChecker
//                   amount={selectedPlan?.amount}
//                   onInsufficientFunds={(balance, requiredAmount) => {
//                     setModalStatus('error');
//                     setModalTitle('Insufficient Funds');
//                     setModalMessage('Wallet balance too low. Fund your wallet to proceed.');
//                     setModalDetails(
//                       `Wallet Balance: ₦${balance.toFixed(2)}, Required Amount: ₦${requiredAmount}`
//                     );
//                     setShowModal(true);
//                   }}
//                   onSufficientFunds={() => {}}
//                 />
//               </div>
//
//               <VendInitiator
//                 selectedPlan={selectedPlan}
//                 formValues={{
//                   ...formValues,
//                   email: userDetails.sub,
//                   packageSlug,
//                   phoneNumber: formValues.phoneNumber,
//                   selectedNetwork: formValues.selectedNetwork
//                 }}
//                 amount={selectedPlan?.amount}
//                 packageSlug={packageSlug}
//                 onVendInitiated={handlePaystackCallback}
//                 onError={handleError}
//                 isProcessing={isProcessingVend}
//                 setIsProcessing={setIsProcessingVend}
//               />
//             </form>
//           </div>
//         </main>
//       </div>
//       <TransactionModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         status={modalStatus}
//         title={modalTitle}
//         message={modalMessage}
//         details={modalDetails}
//         onBack={() => setShowModal(false)}
//         onProceed={handleFundWallet}
//         proceedText="Fund Wallet"
//       />
//     </div>
//   );
// };
//
// export default UserData;

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import { useForm } from '../../../context/formContext';
import { useDataPlans } from '../../../hooks/useDataPlans';
import NetworkSelection from '../../../components/NetworkSelection';
import DataPlansSelection from '../../../components/DataPlansSelection';
import TransactionModal from '../../../utilities/TransactionModal';
import VendInitiator from '../../../utilities/VendInitiator';
import WalletBalanceChecker from '../../../utilities/WalletBalanceChecker';
import InputStyle from '../../../utilities/InputStyle';
import { useAuth } from '../../../context/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loader from '../../../assets/LoadingSpinner';

const UserData = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const auth = useAuth();
  const [userDetails] = useLocalStorage('userDetails', '');

  const {
    plans,
    selectedPlan,
    setSelectedPlan,
    error: plansError,
    loading: plansLoading,
  } = useDataPlans(formValues.selectedNetwork);

  const { currentPlan, packageSlug } = useMemo(() => {
    if (!selectedPlan) {
      return { currentPlan: null, packageSlug: '' };
    }

    return {
      currentPlan: selectedPlan,
      packageSlug: selectedPlan.slug || '',
    };
  }, [selectedPlan]);

  useEffect(() => {
    if (packageSlug) {
      updateFormValues({ packageSlug });
    }
  }, [packageSlug, updateFormValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!selectedPlan) newErrors.selectedPlan = 'Please select a data plan';
    if (!packageSlug) newErrors.packageSlug = 'Network plan not available';
    if (!userDetails.sub) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessingVend(true);
  };

  const handleVendInitiated = (reference) => {
    setIsProcessingVend(false);
    setModalStatus('success');
    setModalTitle('Transaction Successful');
    setModalMessage('Successfully processed the vend request');
    setModalDetails(`Reference: ${reference}`);
    setShowModal(true);
  };

  const handleError = (err) => {
    setIsProcessingVend(false);
    setModalStatus('error');
    setModalTitle('Transaction Failed');
    setModalMessage(err.message || 'An unknown error occurred');
    setModalDetails('');
    setShowModal(true);
  };

  const handleFundWallet = () => {
    navigate('/account/fund-wallet');
  };

  if (plansLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:ml-96 mt-16 sm:mt-28">
            <h3 className="text-white text-2xl sm:text-3xl font-medium">Buy Data</h3>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-2xl">
              <NetworkSelection
                selectedNetwork={formValues.selectedNetwork}
                onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                error={errors.selectedNetwork}
              />

              <DataPlansSelection
                networkSlug={formValues.selectedNetwork}
                selectedPlan={selectedPlan}
                onPlanChange={setSelectedPlan}
                error={errors.selectedPlan}
                plans={plans}
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-white">Phone</label>
                <InputStyle
                  type="tel"
                  value={formValues.phoneNumber}
                  onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              {packageSlug && (
                <div className="mt-2 text-sm text-gray-400">Selected Plan ID: {packageSlug}</div>
              )}

              <div className="mt-4">
                <WalletBalanceChecker
                  amount={selectedPlan?.amount}
                  onInsufficientFunds={(balance, requiredAmount) => {
                    setModalStatus('error');
                    setModalTitle('Insufficient Funds');
                    setModalMessage('Wallet balance too low. Fund your wallet to proceed.');
                    setModalDetails(
                      `Wallet Balance: ₦${balance.toFixed(2)}, Required Amount: ₦${requiredAmount}`
                    );
                    setShowModal(true);
                  }}
                  onSufficientFunds={() => {}}
                />
              </div>

              <VendInitiator
                selectedPlan={currentPlan}
                formValues={{
                  ...formValues,
                  email: userDetails.sub,
                  packageSlug,
                  phoneNumber: formValues.phoneNumber,
                  selectedNetwork: formValues.selectedNetwork,
                }}
                amount={selectedPlan?.amount}
                packageSlug={packageSlug}
                onVendInitiated={handleVendInitiated}
                onError={handleError}
                isProcessing={isProcessingVend}
                setIsProcessing={setIsProcessingVend}
              />
            </form>
          </div>
        </main>
      </div>
      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        status={modalStatus}
        title={modalTitle}
        message={modalMessage}
        details={modalDetails}
        onBack={() => setShowModal(false)}
        onProceed={handleFundWallet}
        proceedText="Fund Wallet"
      />
    </div>
  );
};

export default UserData;
