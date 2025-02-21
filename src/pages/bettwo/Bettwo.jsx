import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ServiceImages from '../../assets/serviceImages.jsx';
import apiService from '../../services/apiService';
import CustomButton from '../../components/button/button.jsx';

const Bettwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, selectedBettingService, phoneNumber } = location.state?.formValues || {};

  const [billerOptions, setBillerOptions] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [amount, setAmount] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanSlug, setSelectedPlanSlug] = useState(null);

  const handleImageClick = (billerSlug) => {
    const selectedBillerObj = billerOptions.find((biller) => biller.slug === billerSlug);
    setSelectedBiller(selectedBillerObj || null);
    resetForm();
  };

  const fetchBillerOptions = useCallback(async (billerGroupSlug) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.fetchBillerBySlug(billerGroupSlug);
      setBillerOptions(response);
    } catch (error) {
      console.error('Error fetching biller options:', error);
      setError('Failed to fetch biller options. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPlans = useCallback(async (billerSlug) => {
    setIsLoading(true);
    setError(null);
    setPlanLoading(true);
    try {
      const planData = await apiService.fetchBillerPlans(billerSlug);
      if (Array.isArray(planData) && planData.length > 0) {
        setPlans(planData);
      } else {
        setPlans([]);
        setError('No plans available for this biller. You may enter an amount manually.');
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
      setError('Failed to fetch plans. Please try again or enter an amount manually.');
    } finally {
      setIsLoading(false);
      setPlanLoading(false);
    }
  }, []);

  const verifyUser = useCallback(
    async (customerId) => {
      if (!selectedBiller) return;
      setIsLoading(true);
      resetVerification();

      try {
        const response = await apiService.verifyCustomer({
          customerId,
          billerSlug: selectedBiller.slug,
          productName: selectedPlan.slug,
        });

        if (response.error) {
          setVerificationResult({
            status: 'failed',
            narration: response.message || 'Verification failed.',
          });
          setError(response.message || 'An error occurred during verification.');
          setCustomerDetails(null);
        } else {
          setVerificationResult({
            status: 'success',
            narration: response.message || 'Verification successful.',
          });
          setCustomerDetails(response.responseData?.customer || null);
          setError(null);
        }
      } catch (error) {
        // console.error('Error verifying user:', error);
        setVerificationResult({
          status: 'failed',
          narration: "An error occurred while validating the customer's identity.",
        });
        setError('Failed to verify user. Please check your customer reference.');
        setCustomerDetails(null);
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

  const handleBillerChange = (e) => {
    const selectedBillerSlug = e.target.value;
    const selectedBillerObj = billerOptions.find((biller) => biller.slug === selectedBillerSlug);
    setSelectedBiller(selectedBillerObj || null);
    resetForm();
  };

  const handlePlanChange = (e) => {
    const selectedPlanId = e.target.value;

    if (!selectedPlanId) {
      // console.warn('No plan selected');
      setSelectedPlan(null);
      setAmount('');
      setSelectedPlanSlug(null);
      return;
    }

    const selectedPlanObj = plans.find((plan) => plan.id && plan.id.toString() === selectedPlanId);

    if (selectedPlanObj) {
      setSelectedPlan(selectedPlanObj);
      setAmount(selectedPlanObj.amount?.toString() || '');
      setSelectedPlanSlug(selectedPlanObj.slug || '');
      // console.log('Selected Plan Slug:', selectedPlanObj.slug);
    } else {
      // console.warn('Selected plan not found in the list');
      setSelectedPlan(null);
      setAmount('');
      setSelectedPlanSlug(null);
    }
  };

  const handleCustomerReferenceChange = (e) => {
    const newReference = e.target.value;
    setCustomerReference(newReference);
    if (newReference && selectedBiller) {
      verifyUser(newReference);
    }
  };

  const handleProceed = () => {
    if (!customerDetails) {
      setError('Customer verification is required before proceeding.');
      return;
    }
    navigate('/bills/review', {
      state: {
        selectedBiller,
        amount,
        customerReference,
        email,
        phoneNumber,
        customerDetails,
        verificationResult,
        selectedPlan,
        packageSlug: selectedPlanSlug,
      },
    });
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

  const resetForm = () => {
    setVerificationResult(null);
    setCustomerDetails(null);
    setError(null);
    setSelectedPlan(null);
    setAmount('');
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCustomerDetails(null);
    setError(null);
  };

  return (
    <section className="bg-black">
      <Navbar />
      <div className="container bg-black">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          {getServiceTitle()}
        </p>

        <div className="flex justify-start">
          <ServiceImages
            selectedService={selectedBettingService}
            selectedBiller={selectedBiller}
            onBillerSelect={handleImageClick}
          />
        </div>

        <div className="flex-col">
          <label htmlFor="biller-select" className="block text-primary mb-2">
            Chosen Service Platform
          </label>
          <select
            id="biller-select"
            value={selectedBiller?.slug || ''}
            onChange={handleBillerChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-white text-slate-600 w-[64%] mb-3">
            <option value="">Select a Service platform</option>
            {billerOptions?.map((biller) => (
              <option key={biller.slug} value={biller.slug}>
                {biller.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBiller && (
          <div className="flex-col">
            <label htmlFor="plan-select" className="block text-primary mb-2">
              Select Plan
            </label>
            <select
              id="plan-select"
              value={selectedPlan?.id || ''}
              onChange={handlePlanChange}
              className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-white text-slate-600 w-[64%] mb-3">
              <option value="">{planLoading ? 'Loading plans...' : 'Select a plan'}</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ₦{plan.amount}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex-col">
          <label htmlFor="customer-reference" className="block text-primary mb-2">
            Customer Reference
          </label>
          <input
            id="customer-reference"
            type="text"
            value={customerReference}
            onChange={handleCustomerReferenceChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-white text-slate-600 w-[64%] mb-3"
            placeholder="Enter customer reference"
          />
        </div>

        {customerDetails && (
          <div className="">
            <p className="text-lightBlue">Name: {customerDetails.customerName}</p>
            {customerDetails.address && (
              <p className="text-lightBlue">Address: {customerDetails.address}</p>
            )}
          </div>
        )}

        {error && <div className="mb-4 p-4 bg-red-900 text-white rounded-md w-[64%]">{error}</div>}

        <div className="flex-col">
          <label htmlFor="amount" className="block text-primary mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-white text-slate-600 w-[64%] mb-3"
            placeholder="Enter amount"
          />
        </div>

        <CustomButton
          onClick={handleProceed}
          className="mt-4 mb-10 px-16 py-4 bg-lightBlue text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading || !customerDetails}>
          {isLoading ? 'Loading...' : 'Proceed'}
        </CustomButton>
        {/*<button*/}
        {/*  onClick={handleProceed}*/}
        {/*  className="mt-4 mb-10 px-16 py-4 bg-lightBlue text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"*/}
        {/*  disabled={isLoading || !customerDetails}>*/}
        {/*  {isLoading ? 'Loading...' : 'Proceed'}*/}
        {/*</button>*/}
      </div>
      <Footer />
    </section>
  );
};

export default Bettwo;
