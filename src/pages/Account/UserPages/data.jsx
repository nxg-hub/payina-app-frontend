import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import { useForm } from '../../../context/formContext';
import { useDataPlans } from '../../../hooks/useDataPlans';
import NetworkSelection from '../../../components/NetworkSelection';
import TransactionModal from '../../../utilities/TransactionModal';
import VendInitiator from '../../../utilities/VendInitiatorData.jsx';
import { useAuth } from '../../../context/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loader from '../../../assets/LoadingSpinner';
import CustomButton from '../../../components/button/button.jsx';
import successImage from '../../../assets/images/Group-successful.png';
import errorImage from '../../../assets/images/Group 10275-decline.png';
import TransactionReceipt from '../../../utilities/TransactionReceipt.jsx';

const UserData = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const auth = useAuth();
  const [userDetails] = useLocalStorage('userDetails', '');
  const [authToken] = useLocalStorage('authToken', '');
  const walletCheckerRef = useRef();
  const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);
  const [walletBalance, setWalletBalance] = useState(null);
  const [currentTransactionRef, setCurrentTransactionRef] = useState(null);

  const {
    plans,
    selectedPlan,
    setSelectedPlan,
    error: plansError,
    loading: plansLoading,
  } = useDataPlans(formValues.selectedNetwork);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_USER}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            apiKey: import.meta.env.VITE_API_KEY,
          },
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
    if (selectedPlan?.slug) {
      updateFormValues({ packageSlug: selectedPlan.slug });
    }
  }, [selectedPlan]);

  const handlePlanSelect = async (event) => {
    const plan = plans.find((p) => p.slug === event.target.value);
    const updatedPlan = {
      ...plan,
      amount: plan.amount >= 5000 ? plan.amount + 50 : plan.amount,
    };
    setSelectedPlan(updatedPlan);
    if (plan) {
      await checkWalletBalance(plan.amount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!selectedPlan) newErrors.selectedPlan = 'Please select a data plan';
    if (!selectedPlan?.slug) newErrors.packageSlug = 'Network plan not available';
    if (!userDetails.sub) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const balance = await walletCheckerRef.current.checkBalance();
    setWalletBalance(balance);

    if (Number(amount) > balance) {
      setModalStatus('error');
      setModalTitle('Insufficient Funds');
      setModalMessage('Wallet balance too low. Fund your wallet to proceed.');
      setModalDetails(`Wallet Balance: ₦${balance.toFixed(2)}, Required Amount: ₦${amount}`);
      setShowModal(true);
    } else {
      setIsProcessingVend(true);
    }
  };

  const handleVendInitiated = (response) => {
    console.log('Vend initiated with response:', response);

    const paymentRef = response?.responseData?.paymentReference;
    console.log('Extracted payment reference:', paymentRef);

    if (paymentRef) {
      setCurrentTransactionRef(paymentRef);
      setModalStatus('success');
      setModalTitle('Transaction Successful');
      setModalMessage('Successfully processed the vend request');
      setModalDetails(`Transaction Reference: ${paymentRef}`);
      setShowModal(true);
    } else {
      console.error('Payment reference not found in response:', response);
      handleError(new Error('Invalid transaction response'));
    }

    setIsProcessingVend(false);
    setAmount('');
    updateFormValues({ phoneNumber: '', selectedNetwork: '', packageSlug: '' });
  };

  const handleError = (err) => {
    setIsProcessingVend(false);
    setModalStatus('error');
    setModalTitle('Transaction Failed');
    setModalMessage(err.message || 'An unknown error occurred');
    setModalDetails('');
    setShowModal(true);
  };

  const handlePullReceipt = async () => {
    if (!currentTransactionRef) {
      setModalStatus('error');
      setModalTitle('Error');
      setModalMessage('Transaction reference not found. Please try again or contact support.');
      setShowModal(true);
      return;
    }

    try {
      setModalStatus('loading');
      setModalTitle('Fetching Receipt');
      setModalMessage('Please wait...');

      const response = await fetch(
        `${import.meta.env.VITE_WALLET_BASE_URL}${import.meta.env.VITE_GET_TRANSACTION_RECIEPT}/${currentTransactionRef}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            apiKey: apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch receipt: ${response.statusText}`);
      }

      const receiptData = await response.json();

      if (!receiptData || !receiptData.transactionRef || !receiptData.amount) {
        throw new Error('Invalid receipt data received');
      }

      console.log('Receipt data:', receiptData);

      setModalStatus(null);
      setModalTitle('');
      setModalMessage('');
      setModalDetails('');

      setModalContent(
        <TransactionReceipt
          receiptData={receiptData}
          onClose={() => {
            setShowModal(false);
            setModalContent(null);
          }}
        />
      );

      setTimeout(() => setShowModal(true), 0);
    } catch (error) {
      console.error('Error pulling receipt:', error);
      setModalStatus('error');
      setModalTitle('Error');
      setModalMessage(`Failed to fetch receipt: ${error.message}`);
      setModalContent(null);
      setShowModal(true);
    }
  };

  const handleFundWallet = () => {
    navigate('/addmoney');
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

  const handleModalClose = () => {
    setShowModal(false);
    if (modalStatus === 'error') {
      setCurrentTransactionRef(null);
      setModalContent(null);
      setModalStatus(null);
      setModalTitle('');
      setModalMessage('');
      setModalDetails('');
    }
  };

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
                      phoneNumber={formValues.phoneNumber}
                      onPhoneChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
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
                      {/*<select*/}
                      {/*  value={selectedPlan?.slug || ''}*/}
                      {/*  onChange={handlePlanSelect}*/}
                      {/*  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">*/}
                      {/*  <option value="">Select a plan</option>*/}
                      {/*  {plans.map((plan) => (*/}
                      {/*    <option key={plan.slug} value={plan.slug}>*/}
                      {/*      {plan.name} - ₦{plan.amount}*/}
                      {/*    </option>*/}
                      {/*  ))}*/}
                      {/*</select>*/}

                      <select
                        value={selectedPlan?.slug || ''}
                        onChange={handlePlanSelect}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a plan</option>
                        {plans.map((plan) => {
                          // Add ₦1 service charge if plan.amount >= 1000 FOR TESTING PURPOSE ONLY
                          const totalAmount = plan.amount >= 5000 ? plan.amount + 50 : plan.amount;

                          return (
                            <option key={plan.slug} value={plan.slug}>
                              {plan.name} - ₦{totalAmount}
                            </option>
                          );
                        })}
                      </select>
                      {errors.selectedPlan && (
                        <p className="mt-2 text-sm text-red-600">{errors.selectedPlan}</p>
                      )}
                    </div>
                  </div>

                  <VendInitiator
                    selectedPlan={selectedPlan}
                    formValues={{
                      ...formValues,
                      email: userDetails.sub,
                      phoneNumber: formValues.phoneNumber,
                      selectedNetwork: formValues.selectedNetwork,
                    }}
                    amount={selectedPlan?.amount}
                    phoneNumber={formValues.phoneNumber}
                    packageSlug={selectedPlan?.slug}
                    onVendInitiated={handleVendInitiated}
                    onError={handleError}
                    isProcessing={isProcessingVend}
                    setIsProcessing={setIsProcessingVend}>
                    <CustomButton
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      disabled={submitDisabled || isProcessingVend}>
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
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
        status={modalStatus}
        details={modalDetails}
        successIcon={successImage}
        errorIcon={errorImage}
        buttons={
          modalStatus === 'success'
            ? ['pullReceipt', 'Back']
            : modalStatus === 'error' && walletBalance !== null && Number(amount) > walletBalance
              ? ['fundWallet', 'Back']
              : modalStatus
                ? ['Back']
                : []
        }
        onFundWallet={handleFundWallet}
        onPullReceipt={handlePullReceipt}
        transactionRef={currentTransactionRef}
        successButtonText="Fund Wallet"
        modalContent={modalContent}
      />
    </div>
  );
};

export default UserData;
