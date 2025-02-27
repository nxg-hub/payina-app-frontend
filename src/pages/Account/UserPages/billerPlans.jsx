import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import ServiceImages from '../../../assets/serviceImages.jsx';
import apiService from '../../../services/apiService';
import CustomButton from '../../../components/button/button.jsx';
import TransactionModal from '../../../utilities/TransactionModal';
import useLocalStorage from '../../../hooks/useLocalStorage';
import VendInitiatorBills from '../../../utilities/VendInitiatorBills.jsx';
import TransactionReceipt from '../../../utilities/TransactionReceipt';
import successImage from '../../../assets/images/Group-successful.png';
import errorImage from '../../../assets/images/Group 10275-decline.png';

const BillerPlans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    email,
    selectedBettingService,
  } = location.state?.formValues || {};

  const [billerOptions, setBillerOptions] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanSlug, setSelectedPlanSlug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [isCustomerVerified, setIsCustomerVerified] = useState(false);
  const [userDetails] = useLocalStorage('userDetails', '');
  const [authToken] = useLocalStorage('authToken', '');
  const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);
  const [currentTransactionRef, setCurrentTransactionRef] = useState(null);
  const walletCheckerRef = useRef();

  const handleImageClick = (billerSlug) => {
    const selectedBillerObj = billerOptions.find((biller) => biller.slug === billerSlug);
    setSelectedBiller(selectedBillerObj || null);
    setIsCustomerVerified(false);
  };

  const fetchBillerOptions = useCallback(async (billerGroupSlug) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.fetchBillerBySlug(billerGroupSlug);
      setBillerOptions(response);
    } catch (error) {
      setError('Failed to fetch biller options. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPlans = useCallback(async (billerSlug) => {
    setIsLoading(true);
    setError(null);
    try {
      const planData = await apiService.fetchBillerPlans(billerSlug);
      if (Array.isArray(planData) && planData.length > 0) {
        setPlans(planData);
      } else {
        setPlans([]);
        setError('No plans available for this biller. You may enter an amount manually.');
      }
    } catch (error) {
      setPlans([]);
      setError('Failed to fetch plans. Please try again or enter an amount manually.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyUser = useCallback(
    async (customerId) => {
      if (!selectedBiller || !selectedPlan) {
        setError('Please select both a biller and a plan before entering customer reference');
        return false;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiService.verifyCustomer({
          customerId,
          productName: selectedPlan.slug,
          billerSlug: selectedBiller.slug,
        });

        if (response.error) {
          setVerificationResult({
            status: 'failed',
            narration: response.message || 'Verification failed.',
          });
          setError(response.message || 'An error occurred during verification.');
          setCustomerDetails(null);
          setIsCustomerVerified(false);
          return false;
        } else {
          setVerificationResult({
            status: 'success',
            narration: response.message || 'Verification successful.',
          });
          setCustomerDetails({ ...response.responseData?.customer, totalAmount: amount } || null);
          setIsCustomerVerified(true);
          setError(null);
          return true;
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        setVerificationResult({
          status: 'failed',
          narration: "An error occurred while validating the customer's identity.",
        });
        setError('Failed to verify user. Please check your customer reference.');
        setCustomerDetails(null);
        setIsCustomerVerified(false);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [selectedBiller, selectedPlan, amount]
  );

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
        `${import.meta.env.VITE_GET_TRANSACTION_RECIEPT}/${currentTransactionRef}`,
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

  useEffect(() => {
    if (selectedBettingService) {
      fetchBillerOptions(selectedBettingService);
    }
  }, [selectedBettingService, fetchBillerOptions]);

  useEffect(() => {
    if (selectedBiller) {
      fetchPlans(selectedBiller.slug);
    } else {
      setPlans([]);
    }
  }, [selectedBiller, fetchPlans]);

  useEffect(() => {
    if (customerReference && customerReference.length >= 3 && selectedBiller && selectedPlan) {
      const timeoutId = setTimeout(() => {
        verifyUser(customerReference);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [customerReference, selectedBiller, selectedPlan, verifyUser]);

  const handleBillerChange = (e) => {
    const selectedBillerSlug = e.target.value;
    const selectedBillerObj = billerOptions.find((biller) => biller.slug === selectedBillerSlug);
    setSelectedBiller(selectedBillerObj || null);
    setIsCustomerVerified(false);
    setCustomerDetails(null);
    setVerificationResult(null);
    setError(null);
  };

  const handlePlanChange = (e) => {
    const selectedPlanId = e.target.value;
    if (!selectedPlanId) {
      setSelectedPlan(null);
      setAmount('');
      setSelectedPlanSlug(null);
      setIsCustomerVerified(false);
      setCustomerDetails(null);
      setVerificationResult(null);
      return;
    }

    const selectedPlanObj = plans.find((plan) => plan.id && plan.id.toString() === selectedPlanId);
    if (selectedPlanObj) {
      setSelectedPlan(selectedPlanObj);
      setAmount(selectedPlanObj.amount?.toString() || '');
      setSelectedPlanSlug(selectedPlanObj.slug || '');

      if (customerReference && customerReference.length >= 3) {
        verifyUser(customerReference);
      }
    } else {
      setSelectedPlan(null);
      setAmount('');
      setSelectedPlanSlug(null);
      setIsCustomerVerified(false);
      setCustomerDetails(null);
      setVerificationResult(null);
    }
  };

  const handleCustomerReferenceChange = (e) => {
    const newReference = e.target.value;
    setCustomerReference(newReference);
    setIsCustomerVerified(false);
    setCustomerDetails(null);
    setVerificationResult(null);
    setError(null);
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
    navigate('/addmoney');
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

  const getServiceTitle = () => {
    const titles = {
      BETTING_AND_LOTTERY: 'Choose Your Betting Platform',
      PAY_TV: 'Select Your TV Provider',
      ELECTRIC_DISCO: 'Choose Your Electricity Provider',
      AIRTIME_AND_DATA: 'Select Your Network Provider',
      ENTERTAINMENT_AND_LIFESTYLE: 'Choose Your Entertainment Service',
      CHURCH_COLLECTIONS: 'Pay church offerings here',
      TRANSPORT_AND_TOLL_PAYMENT: 'Transport and Toll payments',
      COLLECTIONS: 'COLLECTIONS',
      EVENTS_AND_LIFESTYLE: 'EVENTS ANDLIFESTYLE',
    };
    return titles[selectedBettingService] || 'Select Service Provider';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBiller) {
      setError('Please select a service platform');
      return;
    }

    if (!selectedPlan) {
      setError('Please select a plan');
      return;
    }

    if (!customerReference) {
      setError('Please enter a customer reference');
      return;
    }

    if (!amount) {
      setError('Please enter an amount or select a plan');
      return;
    }

    if (!isCustomerVerified) {
      const verificationSuccessful = await verifyUser(customerReference);
      if (!verificationSuccessful) {
        return;
      }
    }

    await walletCheckerRef.current.checkBalance();
    setIsProcessingVend(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-8 lg:px-8 mt-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{getServiceTitle()}</h2>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-8">
                  <ServiceImages
                    selectedService={selectedBettingService}
                    selectedBiller={selectedBiller}
                    onBillerSelect={handleImageClick}
                  />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Chosen Service Platform
                      </label>
                      <select
                        id="biller-select"
                        value={selectedBiller?.slug || ''}
                        onChange={handleBillerChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a Service platform</option>
                        {billerOptions.map((biller) => (
                          <option key={biller.slug} value={biller.slug}>
                            {biller.name.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedBiller && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Select Plan
                        </label>
                        <select
                          id="plan-select"
                          value={selectedPlan?.id || ''}
                          onChange={handlePlanChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select a plan</option>
                          {plans.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name.toUpperCase()} - ₦{plan.amount}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Customer Reference
                      </label>
                      <input
                        id="customer-reference"
                        type="text"
                        value={customerReference}
                        onChange={handleCustomerReferenceChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter customer reference"
                      />
                      {isLoading && (
                        <p className="text-sm text-gray-500">Verifying customer reference...</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                      />
                    </div>

                    {/*<div className="space-y-2">*/}
                    {/*  <label className="block text-sm font-medium text-gray-700">*/}
                    {/*    Phone Number*/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*    id="amount"*/}
                    {/*    type="text"*/}
                    {/*    value={phoneNumber}*/}
                    {/*    onChange={(e) => setPhoneNumber(e.target.value)}*/}
                    {/*    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                    {/*    placeholder="Enter phone number"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {verificationResult && (
                      <div
                        className={`p-4 rounded-lg ${
                          verificationResult.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                        <p
                          className={`text-sm ${
                            verificationResult.status === 'success'
                              ? 'text-green-700'
                              : 'text-red-700'
                          }`}>
                          {verificationResult.narration}
                        </p>
                      </div>
                    )}

                    {customerDetails && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">Customer Details</h3>
                        <p className="text-sm text-blue-700">
                          Name: {customerDetails.customerName}
                        </p>
                        {customerDetails.address && (
                          <p className="text-sm text-blue-700">
                            Address: {customerDetails.address}
                          </p>
                        )}
                        <p className="text-sm text-blue-700">
                          Amount: {customerDetails.amount}
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}
                  </div>

                  <VendInitiatorBills
                    selectedPlan={selectedPlan}
                    formValues={{
                      ...location.state?.formValues,
                      email: userDetails.sub,
                      packageSlug: selectedPlanSlug,
                      phoneNumber,
                      selectedBiller,
                      customerId: customerReference,
                    }}
                    amount={amount}
                    packageSlug={selectedPlanSlug}
                    onVendInitiated={handleVendInitiated}
                    onError={handleError}
                    isProcessing={isProcessingVend}
                    setIsProcessing={setIsProcessingVend}
                    customerReference={customerReference}>
                    <CustomButton
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      disabled={isProcessingVend}>
                      {isProcessingVend ? 'Processing...' : 'Next'}
                    </CustomButton>
                  </VendInitiatorBills>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <TransactionModal
        isOpen={showModal}
        onClose={handleModalClose}
        status={modalStatus}
        title={modalTitle}
        message={modalMessage}
        details={modalDetails}
        successIcon={successImage}
        errorIcon={errorImage}
        buttons={
          modalStatus === 'success'
            ? ['pullReceipt', 'back']
            : modalStatus === 'error'
              ? ['fundWallet', 'back']
              : modalStatus
                ? ['back']
                : []
        }
        onBack={() => setShowModal(false)}
        onProceed={handleFundWallet}
        onPullReceipt={handlePullReceipt}
        proceedText="Fund Wallet"
        modalContent={modalContent}
      />
    </div>
  );
};

export default BillerPlans;