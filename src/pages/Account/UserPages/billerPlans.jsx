import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import Footer from '../../../components/footer/footer';
import ServiceImages from '../../../assets/serviceImages.jsx';
import apiService from '../../../services/apiService';
import CustomButton from '../../../components/button/button.jsx';
// import WalletBalanceChecker from '../../../utilities/WalletBalanceChecker';
// import VendInitiator from '../../../utilities/VendInitiator';
import TransactionModal from '../../../utilities/TransactionModal';
import useLocalStorage from '../../../hooks/useLocalStorage';
import VendInitiatorBills from '../../../utilities/VendInitiatorBills.jsx';
import successImage from '../../../assets/images/Group-successful.png';
import errorImage from '../../../assets/images/Group 10275-decline.png';

const BillerPlans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    email,
    selectedBettingService,
    // phoneNumber
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
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [isCustomerVerified, setIsCustomerVerified] = useState(false);
  const [userDetails] = useLocalStorage('userDetails', '');
  const walletCheckerRef = useRef();
  const verificationTimeoutRef = useRef(null);

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
    [selectedBiller, selectedPlan]
  );

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

  // Auto-verification effect
  useEffect(() => {
    if (verificationTimeoutRef.current) {
      clearTimeout(verificationTimeoutRef.current);
    }

    if (customerReference && customerReference.length >= 3 && selectedBiller && selectedPlan) {
      verificationTimeoutRef.current = setTimeout(() => {
        verifyUser(customerReference);
      }, 1000); // Delay verification by 1 second after user stops typing
    }

    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
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

      // Trigger verification if customer reference exists
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

  const handleVendInitiated = (reference) => {
    setIsProcessingVend(false);
    setModalStatus('success');
    setModalTitle('Transaction Successful');
    setModalMessage('Successfully processed the vend request');
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
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
    navigate('/addmoney');
  };

  const getServiceTitle = () => {
    const titles = {
      BETTING_AND_LOTTERY: 'Choose Your Betting Platform',
      PAY_TV: 'Select Your TV Provider',
      ELECTRIC_DISCO: 'Choose Your Electricity Provider',
      AIRTIME_AND_DATA: 'Select Your Network Provider',
      ENTERTAINMENT_AND_LIFESTYLE: 'Choose Your Entertainment Service',
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
                    {/* Service Platform Selection */}
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
                            {biller.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Plan Selection */}
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
                              {plan.name} - ₦{plan.amount}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Customer Reference Input */}
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

                    {/* Amount */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                        // readOnly={selectedPlan !== null}
                      />
                    </div>
                    {/*phone*/}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="amount"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                        // readOnly={selectedPlan !== null}
                      />
                    </div>

                    {/* Verification Status */}
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

                    {/* Customer Details */}
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
                          Amount: {customerDetails.totalAmount}
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    {/*<WalletBalanceChecker*/}
                    {/*  ref={walletCheckerRef}*/}
                    {/*  amount={amount}*/}
                    {/*  onInsufficientFunds={(balance, requiredAmount) => {*/}
                    {/*    setModalStatus('error');*/}
                    {/*    setModalTitle('Insufficient Funds');*/}
                    {/*    setModalMessage('Wallet balance too low. Fund your wallet to proceed.');*/}
                    {/*    setModalDetails(*/}
                    {/*      `Wallet Balance: ₦${balance.toFixed(2)}, Required Amount: ₦${requiredAmount}`*/}
                    {/*    );*/}
                    {/*    setShowModal(true);*/}
                    {/*  }}*/}
                    {/*  onSufficientFunds={() => {*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </div>

                  <VendInitiatorBills
                    selectedPlan={selectedPlan}
                    formValues={{
                      ...location.state?.formValues,
                      email: userDetails.sub,
                      packageSlug: selectedPlanSlug,
                      phoneNumber,
                      selectedBiller,
                      customerId: customerReference, // Set accountNumber in formValues to use customerReference
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
        onClose={() => setShowModal(false)}
        status={modalStatus}
        title={modalTitle}
        message={modalMessage}
        details={modalDetails}
        successIcon={successImage}
        errorIcon={errorImage}
        onBack={() => setShowModal(false)}
        onProceed={handleFundWallet}
        proceedText="Fund Wallet"
      />
    </div>
  );
};

export default BillerPlans;
