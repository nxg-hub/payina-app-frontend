import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import { useForm } from '../../../context/formContext';
import { useDataPlans } from '../../../hooks/useDataPlans';
import NetworkSelection from '../../../components/NetworkSelection';
import TransactionModal from '../../../utilities/TransactionModal';
import VendInitiator from '../../../utilities/VendInitiator';
import WalletBalanceChecker from '../../../utilities/WalletBalanceChecker';
import InputStyle from '../../../utilities/InputStyle';
import { useAuth } from '../../../context/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loader from '../../../assets/LoadingSpinner.jsx';

const UserAirtime = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState('');
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
    if (packageSlug) {
      updateFormValues({ packageSlug });
    }
  }, []);

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);

    setErrors((prev) => ({
      ...prev,
      amount: Number(enteredAmount) < 70 ? 'Amount must be 70 Naira or above' : undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!amount) newErrors.amount = 'Amount is required';
    if (amount && Number(amount) < 70) newErrors.amount = 'Amount must be 70 Naira or above';
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
            <h3 className="text-white text-2xl sm:text-3xl font-medium">Buy Airtime</h3>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-2xl">
              <NetworkSelection
                selectedNetwork={formValues.selectedNetwork}
                onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                error={errors.selectedNetwork}
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

              <div className="mt-4">
                <label className="block text-sm font-medium text-white">Amount</label>
                <InputStyle type="number" value={amount} onChange={handleAmountChange} min="70" />
                {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
              </div>

              {packageSlug && (
                <div className="mt-2 text-sm text-gray-400">Selected Plan ID: {packageSlug}</div>
              )}

              <div className="mt-4">
                <WalletBalanceChecker
                  amount={amount}
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
                amount={amount}
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

export default UserAirtime;
