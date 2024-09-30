// // // import React, { useEffect } from 'react';
// // // import Navbar from '../../components/navbar/navbar';
// // // import Footer from '../../components/footer/footer';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import { useForm } from '../../context/formContext';
// // //
// // // const PlanB = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { formValues, selectedPlan, updateSelectedPlan } = useForm();
// // //
// // //   useEffect(() => {
// // //     const planFromLocation = location.state?.selectedPlan;
// // //     if (planFromLocation) {
// // //       updateSelectedPlan(planFromLocation);
// // //     }
// // //   }, [location.state, updateSelectedPlan]);
// // //
// // //   if (!selectedPlan) {
// // //     return <p>No plan selected. Please go back and select a plan.</p>;
// // //   }
// // //
// // //   const { name: product, amount } = selectedPlan;
// // //   const network = product.split(' ')[0] || 'Unknown Network';
// // //   const phoneNumber = formValues.phoneNumber || '';
// // //
// // //   const handleProceed = () => {
// // //     if (selectedPlan) {
// // //       navigate('/renew');
// // //     } else {
// // //       alert('No plan selected.');
// // //     }
// // //   };
// // //   return (
// // //     <section className="text-primary">
// // //       <Navbar />
// // //       <div className="container">
// // //         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
// // //         <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
// // //           Review your Order
// // //         </button>
// // //         <div className="flex px-5 gap-4">
// // //           <p className="pt-8 pr-5 text-sm">Product</p>
// // //           <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
// // //           <p className="pt-8 pl-5 text-sm">{product}</p>
// // //         </div>
// // //         <div className="flex px-5 gap-4">
// // //           <p className="pt-8 pr-5 text-sm">Network</p>
// // //           <div className="w-[42%] mt-24 ml-5 h-1 border-none bg-yellow"></div>
// // //           <p className="pt-8 pl-5 text-sm">{network}</p>
// // //         </div>
// // //         <div className="flex gap-4">
// // //           <p className="pt-8 pl-5 text-sm">Phone number</p>
// // //           <div className="w-[40%] mt-24 h-1 border-none bg-yellow"></div>
// // //           <p className="pt-8 text-sm">{phoneNumber}</p>
// // //         </div>
// // //         <div className="flex justify-start gap-4">
// // //           <p className="pt-8 pl-5 text-sm">Amount</p>
// // //           <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
// // //           <p className="pt-14 text-sm">{amount}</p>
// // //         </div>
// // //         <button
// // //           onClick={handleProceed}
// // //           className="text-primary mb-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
// // //         >
// // //           Proceed
// // //         </button>
// // //       </div>
// // //       <div className="mt-10">
// // //         <Footer />
// // //       </div>
// // //     </section>
// // //   );
// // // };
// // //
// // // export default PlanB;


import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';
import TransactionModal from '../../utilities/TransactionModal';

const PlanB = () => {
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
    reference: '',
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
      reference,
    });
  }, []);

  const verifyTransaction = useCallback(
    async (reference) => {
      try {
        const { formValues, selectedPlan } = formData;
        if (!selectedPlan || !selectedPlan.planSlug) {
          throw new Error('Selected plan or plan slug is missing');
        }

        const payload = {
          paymentReference: reference,
          customerId: formValues.phoneNumber,
          packageSlug: selectedPlan.planSlug,
          channel: 'WEB',
          amount: Math.round(selectedPlan.planPrice * 1),
          customerName: 'Non-Payina-User',
          phoneNumber: formValues.phoneNumber,
          email: formValues.email,
        };

        const vendValueResponse = await apiService.vendValue(reference, payload);

        if (vendValueResponse.status === "success") {
          setModalState({
            isOpen: true,
            status: 'success',
            title: 'Transaction Successful',
            message: vendValueResponse.responseData.customerMessage || vendValueResponse.message,
            reference: vendValueResponse.responseData.paymentReference,
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
    setIsSubmitting(true);
    setStatusMessage('Initializing payment...');

    try {
      const { formValues, selectedPlan } = formData;

      if (!selectedPlan || !selectedPlan.planPrice) {
        throw new Error('Selected plan or plan price is missing');
      }

      const amountInKobo = Math.round(selectedPlan.planPrice * 100);

      const initializePaymentResponse = await apiService.initializePayment(
        selectedPlan.id,
        formValues.email,
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
        message: 'No payment reference available. Please try initiating the payment again.',
      });
    }
  };

  const handleRegister = () => {
    // registration Logic
    closeModal();
  };

  if (!formData || !formData.selectedPlan) {
    return (
      <section className="text-primary">
        <Navbar />
        <NoValidSelection message="No valid plan selected. Please go back and select a plan." />
        <Footer />
      </section>
    );
  }

  const { formValues, selectedPlan } = formData;
  const { planName, planPrice } = selectedPlan;
  const network = formValues?.selectedNetwork || 'Unknown Network';
  const phoneNumber = formValues?.phoneNumber || '';
  const email = formValues?.email || '';

  return (
    <section className="text-primary">
      <Navbar />
      <OrderReview
        planName={planName}
        network={network}
        phoneNumber={phoneNumber}
        planPrice={planPrice}
        email={email}
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

export default PlanB;