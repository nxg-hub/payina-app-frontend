import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { bet1, bet2, bet3, bet4, bet5, bet6 } from '../../constants/images';

const Bettwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, selectedBettingService, phoneNumber } = location.state?.formValues || {};

  const [billerOptions, setBillerOptions] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [amount, setAmount] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  const billerImages = {
    BET9JA: bet3,
    SPORTY: bet6,
    '1XBET': bet5,
    NAIRABET: bet4,
    '22BET': bet1,
    BETKING: bet2,
  };

  const fetchBillerOptions = useCallback(async (billerGroupSlug) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://payina-wallet-service-api.onrender.com/api/v1/vas/biller-enquiry-slug/${billerGroupSlug}`);
      const services = response.data.responseData;
      setBillerOptions(services);
    } catch (error) {
      console.error('Error fetching biller options:', error);
      setError('Failed to fetch biller options. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedBettingService) {
      fetchBillerOptions(selectedBettingService);
    }
  }, [selectedBettingService, fetchBillerOptions]);

  const verifyUser = useCallback(async (customerId, productName, billerSlug) => {
    setIsLoading(true);
    setError(null);
    setVerificationResult(null);
    setCustomerDetails(null);
    try {
      const response = await axios.post('https://payina-wallet-service-api.onrender.com/api/v1/vas/customer-enquiry', {
        customerId,
        productName: `${productName}_PREPAID`,
        billerSlug
      });

      if (response.data.error) {
        setError(response.data.message || 'An error occurred during verification.');
        setVerificationResult({
          status: 'failed',
          narration: response.data.responseData?.narration || 'Verification failed.'
        });
      } else {
        setVerificationResult({
          status: 'success',
          narration: response.data.message || 'Verification successful.'
        });
        if (response.data.responseData?.customer) {
          setCustomerDetails(response.data.responseData.customer);
        }
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setError('Failed to verify user. Please check your customer reference.');
      setVerificationResult({
        status: 'failed',
        narration: 'An error occurred while validating the customer\'s identity.'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBillerChange = (e) => {
    const selectedBillerSlug = e.target.value;
    const selectedBillerObj = billerOptions.find(biller => biller.slug === selectedBillerSlug);
    setSelectedBiller(selectedBillerObj || null);
    setVerificationResult(null);
    setCustomerDetails(null);
    setError(null);
  };

  const handleCustomerReferenceChange = (e) => {
    setCustomerReference(e.target.value);
    if (selectedBiller) {
      verifyUser(e.target.value, selectedBiller.name, selectedBiller.slug);
    }
  };

  const handleImageClick = (billerSlug) => {
    const selectedBillerObj = billerOptions.find(biller => biller.slug === billerSlug);
    setSelectedBiller(selectedBillerObj || null);
    setVerificationResult(null);
    setCustomerDetails(null);
    setError(null);
  };

  const handleProceed = () => {
    if (!customerDetails) {
      setError('Customer verification is required before proceeding.');
      return;
    }
    navigate('/befour', {
      state: {
        selectedBiller,
        amount,
        customerReference,
        email,
        phoneNumber,
        customerDetails,
        verificationResult
      }
    });
  };

  const renderBillerImage = (billerSlug, name) => (
    <div
      key={billerSlug}
      className={`flex-col cursor-pointer ${selectedBiller?.slug === billerSlug ? 'border-2 border-yellow p-2 rounded' : ''}`}
      onClick={() => handleImageClick(billerSlug)}
    >
      <img height={58} width={58} src={billerImages[billerSlug]} alt={name} />
      <p>{name}</p>
    </div>
  );

  return (
    <section>
      <Navbar />
      <div className="container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Choose Your Betting Platform
        </p>
        <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral mb-3 px-4 py-2">
          Want to enjoy discounts?
          <span className="text-yellow"> Register</span> or{' '}
          <span className="text-yellow">Login</span>{' '}
        </button>
        <p className="text-primary mb-3 mt-2">Popular Platforms</p>

        {/* Images Grid */}
        <div className="mb-10 text-lightBlue">
          <div className="flex gap-36">
            {renderBillerImage('BET9JA', 'Bet 9ja')}
            {renderBillerImage('SPORTY', 'Sporty')}
            {renderBillerImage('1XBET', '1x Bet')}
          </div>
          <div className="flex mt-10 gap-36">
            {renderBillerImage('NAIRABET', 'Naira Bet')}
            {renderBillerImage('22BET', '22 Bet')}
            {renderBillerImage('BETKING', 'Bet King')}
          </div>
        </div>

        {/* Dropdown for Biller Selection */}
        <div className="flex-col">
          <label htmlFor="biller-select" className="block text-primary mb-2">
            Chosen Betting Platform
          </label>
          <select
            id="biller-select"
            value={selectedBiller?.slug || ''}
            onChange={handleBillerChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3">
            <option value="">Select a betting platform</option>
            {billerOptions.map((biller) => (
              <option key={biller.slug} value={biller.slug}>
                {biller.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount and Customer Reference Inputs */}
        <div className="flex-col">
          <label htmlFor="amount" className="block text-primary mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex-col">
          <label htmlFor="customer-reference" className="block text-primary mb-2">
            Customer Reference
          </label>
          <input
            id="customer-reference"
            type="text"
            value={customerReference}
            onChange={handleCustomerReferenceChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
            placeholder="Enter customer reference"
          />
        </div>

        <div className="flex-col">
          <label htmlFor="phone-number" className="block text-primary mb-2">
            Phone Number
          </label>
          <input
            id="phone-number"
            type="text"
            value={phoneNumber || ''}
            readOnly
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
          />
        </div>

        {verificationResult && (
          <p className={`mt-1 ${verificationResult.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {verificationResult.narration}
          </p>
        )}
        {customerDetails && (
          <div className="mt-3 text-primary">
            <p><strong>Customer Name:</strong> {customerDetails.customerName}</p>
            <p><strong>Address:</strong> {customerDetails.address}</p>
            <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
          </div>
        )}

        {isLoading && <p className="text-primary">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <button
          onClick={handleProceed}
          className="text-primary mb-10 mt-5 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
          disabled={!selectedBiller || !amount || !customerReference || !email || !phoneNumber || isLoading || verificationResult?.status !== 'success'}>
          Proceed to Befour
        </button>
      </div>
      <Footer />
    </section>
  );
};

export default Bettwo;
