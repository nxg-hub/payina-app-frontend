import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';
import TransactionModal from '../../utilities/TransactionModal';

const Befour = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [paymentReference, setPaymentReference] = useState(null);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: 'success',
    title: '',
    message: '',
    reference: ''
  });

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  const closeModal = () => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
  };

  const handleError = useCallback((err, reference) => {
    let errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
    if (errorMessage === 'Transaction was not successful, vending cannot be completed.') {
      errorMessage += ' Please try again or contact support.';
    }
    setModalState({
      isOpen: true,
      status: 'error',
      title: 'Transaction Failed',
      message: errorMessage,
      reference
    });
  }, []);

  const verifyTransaction = useCallback(
    async (reference) => {
      try {
        const {
          selectedBiller,
          amount,
          customerReference,
          email,
          phoneNumber,
          customerDetails,
          verificationResult
        } = formData;
        if (!selectedBiller || !selectedBiller.slug) {
          throw new Error('Selected biller or biller slug is missing');
        }

        if (!customerDetails || !verificationResult || verificationResult.status !== 'success') {
          throw new Error('Customer verification is required before proceeding');
        }

        const payload = {
          paymentReference: reference,
          customerId: customerReference,
          packageSlug: `${selectedBiller.slug}_PREPAID`,
          channel: 'WEB',
          amount: Math.round(amount * 1),
          customerName: customerDetails?.customerName || 'Non-Payina-User',
          phoneNumber: phoneNumber,
          email: email,
          customerEnquiryResult: customerDetails
        };

        const vendValueResponse = await apiService.vendValue(reference, payload);

        if (vendValueResponse.status === 'success') {
          setModalState({
            isOpen: true,
            status: 'success',
            title: 'Transaction Successful',
            message: vendValueResponse.responseData.customerMessage || vendValueResponse.message,
            reference: vendValueResponse.responseData.paymentReference
          });
          return true;
        } else {
          throw new Error(vendValueResponse.message || 'Transaction verification failed');
        }
      } catch (err) {
        handleError(err, reference);
        return false;
      }
    },
    [formData, handleError]
  );

  const pollTransactionStatus = useCallback(
    async (reference) => {
      const maxAttempts = 2;
      const pollInterval = 1000;

      for (let attempts = 0; attempts < maxAttempts; attempts++) {
        try {
          setStatusMessage('Verifying payment...');
          const success = await verifyTransaction(reference);
          if (success) return;
        } catch (err) {
          if (attempts === maxAttempts - 1) {
            handleError(err, reference);
            return;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      }

      handleError(new Error('Payment verification timed out.'), reference);
    },
    [verifyTransaction, handleError]
  );

  const handleProceed = async () => {
    if (
      !formData.customerDetails ||
      !formData.verificationResult ||
      formData.verificationResult.status !== 'success'
    ) {
      setModalState({
        isOpen: true,
        status: 'error',
        title: 'Error',
        message:
          'Customer verification is required before proceeding. Please go back and verify the customer details.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Initializing payment...');

    try {
      const { selectedBiller, amount, email } = formData;

      if (!selectedBiller || !selectedBiller.id || !amount) {
        throw new Error('Selected biller or amount is missing');
      }

      const amountInKobo = Math.round(amount * 100);

      const initializePaymentResponse = await apiService.initializePayment(
        selectedBiller.id,
        email,
        amountInKobo
      );

      if (
        initializePaymentResponse.status === true &&
        initializePaymentResponse.message === 'Authorization URL created'
      ) {
        const { authorization_url, reference } = initializePaymentResponse.data;
        setPaymentReference(reference);

        setStatusMessage('Payment page opened. Please complete the payment in the new window.');
        window.open(authorization_url, '_blank');

        setIsPaymentInitiated(true);

        setTimeout(() => {
          pollTransactionStatus(reference);
        }, 60000);
      } else {
        throw new Error(initializePaymentResponse.message || 'Payment initialization failed');
      }
    } catch (err) {
      handleError(err, paymentReference);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualVerification = () => {
    if (paymentReference) {
      setIsSubmitting(true);
      verifyTransaction(paymentReference);
    } else {
      setModalState({
        isOpen: true,
        status: 'error',
        title: 'Error',
        message: 'No payment reference available. Please try initiating the payment again.'
      });
    }
  };

  const handleRegister = () => {
    // registration Logic
    closeModal();
  };

  if (!formData || !formData.selectedBiller) {
    return (
      <section className="text-primary">
        <Navbar />
        <NoValidSelection message="No valid biller selected. Please go back and select a biller." />
        <Footer />
      </section>
    );
  }

  const { selectedBiller, amount, customerReference, email, phoneNumber } = formData;

  return (
    <section className="text-primary">
      <Navbar />
      <OrderReview
        planName={selectedBiller.name}
        network="Betting Platform"
        phoneNumber={phoneNumber}
        planPrice={amount}
        email={email}
        customerReference={customerReference}
      />
      {statusMessage && <p className="text-blue-500 mt-4">{statusMessage}</p>}
      {!isPaymentInitiated ? (
        <button
          className="text-primary mt-[25] text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
          onClick={handleProceed}
          disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
        </button>
      ) : (
        <button
          className="text-primary mt-[25] text-left px-16 py-4 border-none rounded-[5px] bg-green-500 cursor-pointer hover:bg-green-600 transition-all duration-200"
          onClick={handleManualVerification}
          disabled={isSubmitting}>
          Verify Payment Manually
        </button>
      )}
      <Footer />

      <TransactionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        status={modalState.status}
        title={modalState.title}
        message={modalState.message}
        reference={modalState.reference}
        onRegister={handleRegister}
      />
    </section>
  );
};

export default Befour;
