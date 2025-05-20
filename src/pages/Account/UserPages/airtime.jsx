import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import { useForm } from '../../../context/formContext';
import { useDataPlans } from '../../../hooks/useDataPlans';
import NetworkSelection from '../../../components/NetworkSelection';
import TransactionModal from '../../../utilities/TransactionModal';
import VendInitiator from '../../../utilities/VendInitiator';
import TransactionReceipt from '../../../utilities/TransactionReceipt';
import { useAuth } from '../../../context/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loader from '../../../assets/LoadingSpinner.jsx';
import { FaNairaSign } from 'react-icons/fa6';
import CustomButton from '../../../components/button/button.jsx';
import successImage from '../../../assets/images/Group-successful.png';
import errorImage from '../../../assets/images/Group 10275-decline.png';

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
  const [modalContent, setModalContent] = useState(null);
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const auth = useAuth();
  const [userDetails] = useLocalStorage('userDetails', '');
  const [authToken] = useLocalStorage('authToken', '');
  const walletCheckerRef = useRef(null);

  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
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

  const { currentPlan, packageSlug } = useMemo(() => {
    if (!Array.isArray(plans) || plans.length === 0) return { currentPlan: null, packageSlug: '' };
    const firstPlan = plans[0];
    return { currentPlan: firstPlan, packageSlug: firstPlan.slug || '' };
  }, [plans]);

  useEffect(() => {
    if (packageSlug) updateFormValues({ packageSlug });
  }, [packageSlug, updateFormValues]);

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);
    setErrors((prev) => ({
      ...prev,
      amount: Number(enteredAmount) < 100 ? 'Amount must be 100 Naira or above' : undefined,
    }));
  };

  const handleVendInitiated = (response) => {
    // console.log('Vend initiated with response:', response);

    const paymentRef = response?.responseData?.paymentReference;
    // console.log('Extracted payment reference:', paymentRef);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!amount) newErrors.amount = 'Amount is required';
    if (amount && Number(amount) < 100) newErrors.amount = 'Amount must be 100 Naira or above';
    if (!packageSlug) newErrors.packageSlug = 'Network plan not available';
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
    } else {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: 'Unable to fetch your phone number. Please enter it manually.',
      }));
    }
  };

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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 mt-16">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Buy Airtime</h2>

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
                      How Much Airtime are you buying?
                    </label>
                    <div className="relative">
                      <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        // type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Amount"
                        min="70"
                      />
                    </div>
                    {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
                  </div>
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
                  phoneNumber={formValues.phoneNumber}
                  userData={userData}
                  packageSlug={packageSlug}
                  onVendInitiated={handleVendInitiated}
                  onError={handleError}
                  isProcessing={isProcessingVend}
                  setIsProcessing={setIsProcessingVend}
                  walletBalance={walletBalance}>
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
            ? ['pullReceipt', 'back']
            : modalStatus === 'error' && walletBalance !== null && Number(amount) > walletBalance
              ? ['fundWallet', 'back']
              : modalStatus
                ? ['back']
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

export default UserAirtime;
