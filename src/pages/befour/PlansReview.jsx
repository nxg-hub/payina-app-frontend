import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';
import TransactionModal from '../../utilities/TransactionModal';

const plansReview = () => {
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

  const isBettingOrLottery = useCallback((selectedBiller) => {
    return selectedBiller?.slug === 'BETTING_AND_LOTTERY';
  }, []);

  const handleError = (err, reference) => {
    let errorMessage = 'An unknown error occurred';

    if (err.response) {
      const { data } = err.response;

      if (typeof data === 'string') {
        const nestedJsonMatch = data.match(/"(\{.*\})"/);

        if (nestedJsonMatch && nestedJsonMatch[1]) {
          try {
            const nestedData = JSON.parse(nestedJsonMatch[1]);

            if (
              nestedData.message &&
              nestedData.message.includes('Wallet balance too low to debit')
            ) {
              const balanceMessage = nestedData.message.match(
                /Wallet balance too low to debit\. Balance: \d+(\.\d{1,2})?/
              );
              errorMessage = balanceMessage ? balanceMessage[0] : 'Wallet balance too low to debit';
            } else {
              errorMessage = nestedData.message;
            }
          } catch (parseError) {
            errorMessage = 'Error parsing nested JSON in response';
          }
        } else {
          errorMessage = 'Invalid response format';
        }
      } else {
        errorMessage = 'Unexpected data format';
      }
    } else if (err.message) {
      errorMessage = err.message;
    }

    console.log('Parsed Error Message:', errorMessage);

    setModalState({
      isOpen: true,
      status: 'error',
      title: 'Transaction Failed',
      message: errorMessage,
      reference
    });
  };

  const verifyTransaction = useCallback(
    async (reference) => {
      if (!formData) return false;

      try {
        const {
          selectedBiller,
          selectedPlan,
          amount,
          customerReference,
          email,
          phoneNumber,
          customerDetails
        } = formData;

        if (!selectedBiller || !selectedBiller.slug) {
          throw new Error('Selected biller or biller slug is missing');
        }

        const isBettingLottery = isBettingOrLottery(selectedBiller);
        const packageSlug = selectedPlan.slug || 'UNKNOWN_SLUG';

        const payload = {
          paymentReference: reference,
          customerId: customerReference,
          packageSlug: packageSlug,
          channel: 'WEB',
          amount: Math.round(amount + 100),
          customerName: customerDetails?.customerName || 'Non-Payina-User',
          phoneNumber: phoneNumber,
          email: email,
          customerEnquiryResult: isBettingLottery ? null : customerDetails
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
    [formData, isBettingOrLottery]
  );

  // const pollTransactionStatus = useCallback(
  //   async (reference) => {
  //     const maxAttempts = 1;
  //     const pollInterval = 1000;
  //
  //     for (let attempts = 0; attempts < maxAttempts; attempts++) {
  //       try {
  //         setStatusMessage('Verifying payment...');
  //         const success = await verifyTransaction(reference);
  //         if (success) return;
  //       } catch (err) {
  //         if (attempts === maxAttempts - 1) {
  //           handleError(err, reference);
  //           return;
  //         }
  //       }
  //       await new Promise((resolve) => setTimeout(resolve, pollInterval));
  //     }
  //     handleError(new Error('Payment verification timed out.'), reference);
  //   },
  //   [verifyTransaction]
  // );

  const handleProceed = async () => {
    if (!formData || !formData.selectedBiller) {
      setModalState({
        isOpen: true,
        status: 'error',
        title: 'Error',
        message: 'No valid biller selected. Please go back and select a biller.'
      });
      return;
    }

    const isBettingLottery = isBettingOrLottery(formData.selectedBiller);

    if (!isBettingLottery) {
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
    }

    setIsSubmitting(true);
    setStatusMessage('Initializing payment...');

    try {
      const { selectedBiller, amount, email } = formData;

      if (!selectedBiller.id || !amount) {
        throw new Error('Selected biller or amount is missing');
      }

      const amountWithCharges = Math.round(Number(amount) + 100);

      const amountInKobo = Math.round(amountWithCharges);

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
    <section className="text-primary bg-black">
      <Navbar />
      <OrderReview
        planName={selectedBiller.name}
        phoneNumber={phoneNumber}
        planPrice={Number(amount) + 100}
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
        details={modalState.details}
        reference={modalState.reference}
        onRegister={handleRegister}
      />
    </section>
  );
};
export default plansReview