import React, { useState } from 'react';
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
import DataPlansSelection from '../../../components/DataPlansSelection';

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
  const { plans, selectedPlan, setSelectedPlan, error: plansError } = useDataPlans(formValues.selectedNetwork);
  const [userDetails, setuserDetails] = useLocalStorage('userDetails', '');

  const filteredPlans = plans.length > 0 ? [plans[0]] : [];
  // Hardcoded values that were previously fetched
  const accountNumber = '';
  const merchantId = '';

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);

    const newErrors = { ...errors };
    if (Number(enteredAmount) < 0) {
      newErrors.amount = 'Amount must be 70 Naira or above';
    } else {
      delete newErrors.amount;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!amount) newErrors.amount = 'Amount is required';
    if (amount && Number(amount) < 0) newErrors.amount = 'Amount must be 70 Naira or above';
    if (!selectedPlan) newErrors.selectedPlan = 'Please select a data plan';
    if (!userDetails.sub) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  const handleVendInitiated = (reference) => {
    setModalStatus('success');
    setModalTitle('Transaction Successful');
    setModalMessage('Successfully processed the vend request');
    setModalDetails(`Reference: ${reference}`);
    setShowModal(true);
  };

  const handleError = (err) => {
    setModalStatus('error');
    setModalTitle('Transaction Failed');
    setModalMessage(err.message || 'An unknown error occurred');
    setModalDetails('');
    setShowModal(true);
  };

  const handleFundWallet = () => {
    navigate('/account/fund-wallet');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:ml-96 mt-16 sm:mt-28">
            <h3 className="text-white text-2xl sm:text-3xl font-medium">Buy Airtime</h3>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-2xl">
              <NetworkSelection
                selectedNetwork={formValues.selectedNetwork}
                onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                error={errors.selectedNetwork}
              />
              <DataPlansSelection
                plans={filteredPlans} // Pass the filtered plans with only the first item
                selectedPlan={selectedPlan}
                onPlanChange={setSelectedPlan}
                error={errors.selectedPlan}
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-white">Phone</label>
                <InputStyle
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={formValues.phoneNumber}
                  onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-white">Amount</label>
                <InputStyle
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={amount}
                  onChange={handleAmountChange}
                />
                {errors.amount && (
                  <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              {isProcessingVend && <div>Processing...</div>}

              <div className="mt-4">
                <WalletBalanceChecker
                  amount={amount}
                  onInsufficientFunds={(balance, requiredAmount) => {
                    setModalStatus('error');
                    setModalTitle('Insufficient Funds');
                    setModalMessage('Wallet balance too low. Fund your wallet to proceed.');
                    setModalDetails(`Wallet Balance: ₦${balance.toFixed(2)}, Required Amount: ₦${requiredAmount}`);
                    setShowModal(true);
                  }}
                  onSufficientFunds={() => {
                    // When funds are sufficient
                  }}
                />
              </div>

              <div className="mt-4">
                <VendInitiator
                  selectedPlan={selectedPlan}
                  formValues={{ ...formValues, email: userDetails.sub }}
                  amount={amount}
                  onVendInitiated={handleVendInitiated}
                  onError={handleError}
                  accountNumber={accountNumber}
                  merchantId={merchantId}
                />
              </div>
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





