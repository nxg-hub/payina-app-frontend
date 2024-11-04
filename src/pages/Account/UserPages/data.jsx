import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import { useForm } from '../../../context/formContext';
import { useDataPlans } from '../../../hooks/useDataPlans';
import NetworkSelection from '../../../components/NetworkSelection';
import TransactionModal from '../../../utilities/TransactionModal';
import VendInitiator from '../../../utilities/VendInitiator';
import WalletBalanceChecker from '../../../utilities/WalletBalanceChecker';
import { useAuth } from '../../../context/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loader from '../../../assets/LoadingSpinner';
import CustomButton from '../../../components/button/button.jsx';

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
  const [userPhone, setUserPhone] = useState('');
  const auth = useAuth();
  const [userDetails] = useLocalStorage('userDetails', '');
  const [authToken] = useLocalStorage('authToken', '');
  const walletCheckerRef = useRef();

  const {
    plans,
    selectedPlan,
    setSelectedPlan,
    error: plansError,
    loading: plansLoading,
  } = useDataPlans(formValues.selectedNetwork);

  const { currentPlan, packageSlug } = useMemo(() => {
    if (!Array.isArray(plans) || plans.length === 0) {
      return { currentPlan: null, packageSlug: '' };
    }

    const firstPlan = plans[0];
    return {
      currentPlan: firstPlan,
      packageSlug: firstPlan.slug || '',
    };
  }, [plans]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_USER_ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'apiKey': import.meta.env.VITE_API_KEY
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.phoneNumber) {
          const formattedPhone = data.phoneNumber.replace('+234', '0');
          setUserPhone(formattedPhone);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (authToken) {
      fetchUserData();
    }
  }, [authToken]);

  useEffect(() => {
    if (packageSlug) {
      updateFormValues({ packageSlug });
    }
  }, [packageSlug]);

  const handleSubmit = async (e) => {
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

    await walletCheckerRef.current.checkBalance();
    setIsProcessingVend(true);
  };

  const handleVendInitiated = (reference) => {
    setIsProcessingVend(false);
    setModalStatus('success');
    setModalTitle('Transaction Successful');
    setModalMessage('Successfully processed the vend request');
    setShowModal(true);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
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

  const handleUseMyNumber = () => {
    if (userPhone) {
      updateFormValues({ phoneNumber: userPhone });
    }
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-8 lg:px-8 mt-16">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Buy Data</h2>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <NetworkSelection
                      selectedNetwork={formValues.selectedNetwork}
                      onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                      error={errors.selectedNetwork}
                    />

                    <div className="mt-4">
                      <CustomButton
                        type="button"
                        onClick={handleUseMyNumber}
                        className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none">
                        Use My Number
                      </CustomButton>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Data Plan
                      </label>
                      <select
                        value={selectedPlan?.slug || ''}
                        onChange={(e) => {
                          const plan = plans.find(p => p.slug === e.target.value);
                          setSelectedPlan(plan);
                        }}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a plan</option>
                        {plans.map((plan) => (
                          <option key={plan.slug} value={plan.slug}>
                            {plan.name} - ₦{plan.amount}
                          </option>
                        ))}
                      </select>
                      {errors.selectedPlan && (
                        <p className="mt-2 text-sm text-red-600">{errors.selectedPlan}</p>
                      )}
                    </div>

                    <WalletBalanceChecker
                      ref={walletCheckerRef}
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
                    setIsProcessing={setIsProcessingVend}>
                    <CustomButton
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      disabled={isProcessingVend}>
                      {isProcessingVend ? 'Processing...' : 'Next'}
                    </CustomButton>
                  </VendInitiator>
                </form>
              </div>
            </div>
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