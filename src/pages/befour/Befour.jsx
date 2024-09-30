// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
//
// const Befour = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedBiller, amount, customerReference } = location.state || {};
//
//   const handleProceed = () => {
//     // Handle the proceed action, e.g., navigate to the next page or submit the order
//     navigate('/thanks');
//   };
//
//   return (
//     <section className="text-primary">
//       <Navbar className="pt-6" />
//       <div className="container">
//         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
//         <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
//           Review your Order
//         </button>
//         <div className="flex px-5 gap-4">
//           <p className="pt-8 pr-5 text-sm">Product</p>
//           <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
//           <p className="pt-8 text-sm">Bet</p>
//         </div>
//         <div className="flex px-5 gap-4">
//           <p className="pt-8 pr-5 text-sm">Platform</p>
//           <div className="w-[42%] mt-24 ml-5 h-1 border-none bg-yellow"></div>
//           <p className="pt-8 text-sm">{selectedBiller?.name || 'N/A'}</p>
//         </div>
//         <div className="flex gap-4">
//           <p className="pt-8 pl-5 pr-5 text-sm">Custom Ref</p>
//           <div className="w-[41%] mt-24 h-1 border-none pl-32 bg-yellow"></div>
//           <p className="pt-8 text-sm">{customerReference || 'N/A'}</p>
//         </div>
//         <div className="flex justify-start gap-4">
//           <p className="pt-8 pl-5 text-sm">Amount</p>
//           <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
//           <p className="pt-8 pl-14 text-sm">{amount || 'N/A'}</p>
//         </div>
//         <div>
//           <button
//             onClick={handleProceed}
//             className="text-primary mb-10 mt-3 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//       <div className="mt-10">
//         <Footer />
//       </div>
//     </section>
//   );
// };
//
// export default Befour;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import apiService from '../../services/apiService';
//
// const Befour = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const { selectedBiller, amount, customerReference, email } = location.state || {};
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { selectedBiller, amount, customerReference, email } = location.state || {};
//   const [isSubmitting, setIsSubmitting] = useState(false);
//
//   // const handleProceed = async () => {
//   //   setIsLoading(true);
//   //   setError(null);
//   //
//   //   try {
//   //     const planId = selectedBiller?.id;
//   //
//   //     if (!planId || !email || !amount) {
//   //       throw new Error('Missing required information for payment');
//   //     }
//   //
//   //
//   //     // Initialize payment
//   //     const initializeResponse = await apiService.initializePayment(planId, email, amount);
//   //     console.log('Payment initialized:', initializeResponse);
//   //
//   //     if (initializeResponse.status === 'success') {
//   //       // Vend value
//   //       const vendResponse = await apiService.vendValue(initializeResponse.data.paymentReference);
//   //       console.log('Value vended:', vendResponse);
//   //
//   //       if (vendResponse.status === 'success') {
//   //         navigate('/thanks', { state: { transactionDetails: vendResponse.data } });
//   //       } else {
//   //         setError('Value vending failed. Please try again.');
//   //       }
//   //     } else {
//   //       setError('Payment initialization failed. Please try again.');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error during payment process:', err);
//   //     setError(err.message || 'An error occurred during the payment process. Please try again.');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//
//   const handleProceed = async () => {
//     setIsSubmitting(true);
//     setError(null);
//     try {
//       const planId = selectedBiller?.id;
//
//       if (!planId || !email || !amount) {
//         throw new Error('Missing required information for payment');
//       }
//
//       // try {
//       const amountInKobo = Math.round(amount * 100);
//
//       const initializePaymentResponse = await apiService.initializePayment(
//         planId,
//         email,
//         amountInKobo
//       );
//
//       if (
//         initializePaymentResponse.status === true &&
//         initializePaymentResponse.message === 'Authorization URL created'
//       ) {
//         const authorizationUrl = initializePaymentResponse.data.authorization_url;
//         const paymentReference = initializePaymentResponse.data.reference;
//
//         window.open(authorizationUrl, '_blank');
//
//         const vendValueResponse = await apiService.vendValue(paymentReference);
//
//         if (vendValueResponse.status === true) {
//           navigate('/transaction-success', { state: { message: vendValueResponse.message } });
//         } else {
//           throw new Error(vendValueResponse.message || 'Vend value API call failed');
//         }
//       } else {
//         throw new Error(initializePaymentResponse.message || 'Payment initialization failed');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   return (
//     <section className="text-primary">
//       <Navbar className="pt-6" />
//       <div className="container">
//         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
//         <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
//           Review your Order
//         </button>
//         <div className="flex px-5 gap-4">
//           <p className="pt-8 pr-5 text-sm">Product</p>
//           <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
//           <p className="pt-8 text-sm">Bet</p>
//         </div>
//         <div className="flex px-5 gap-4">
//           <p className="pt-8 pr-5 text-sm">Platform</p>
//           <div className="w-[42%] mt-24 ml-5 h-1 border-none bg-yellow"></div>
//           <p className="pt-8 text-sm">{selectedBiller?.name || 'N/A'}</p>
//         </div>
//         <div className="flex gap-4">
//           <p className="pt-8 pl-5 pr-5 text-sm">Custom Ref</p>
//           <div className="w-[41%] mt-24 h-1 border-none pl-32 bg-yellow"></div>
//           <p className="pt-8 text-sm">{customerReference || 'N/A'}</p>
//         </div>
//         <div className="flex justify-start gap-4">
//           <p className="pt-8 pl-5 text-sm">Amount</p>
//           <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
//           <p className="pt-8 pl-14 text-sm">{amount || 'N/A'}</p>
//         </div>
//         <div className="flex justify-start gap-4">
//           <p className="pt-8 pl-5 text-sm">Email</p>
//           <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
//           <p className="pt-8 pl-14 text-sm">{email || 'N/A'}</p>
//         </div>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         <div>
//           <button
//             onClick={handleProceed}
//             disabled={isLoading || !email || !amount || !selectedBiller}
//             className={`text-primary mb-10 mt-3 text-left px-16 py-4 border-none rounded-[5px] ${
//               isLoading || !email || !amount || !selectedBiller
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-lightBlue cursor-pointer hover:bg-neutral'
//             } transition-all duration-200`}>
//             {isLoading ? 'Processing...' : 'Proceed'}
//           </button>
//         </div>
//       </div>
//       <div className="mt-10">
//         <Footer />
//       </div>
//     </section>
//   );
// };
//
// export default Befour;


// import React, { useState, useCallback, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import apiService from '../../services/apiService';
// import NoValidSelection from '../../utilities/NoValidSelection';
// import OrderReview from '../OrderReview/OrderReview.jsx';
// import TransactionModal from '../../utilities/TransactionModal';
//
// const Befour = () => {
//   const location = useLocation();
//   const [formData, setFormData] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [paymentReference, setPaymentReference] = useState(null);
//   const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
//   const [modalState, setModalState] = useState({
//     isOpen: false,
//     status: 'success',
//     title: '',
//     message: '',
//     reference: '',
//   });
//
//   useEffect(() => {
//     if (location.state) {
//       setFormData(location.state);
//     }
//   }, [location.state]);
//
//   const closeModal = () => {
//     setModalState((prevState) => ({ ...prevState, isOpen: false }));
//   };
//
//   const handleError = useCallback((err, reference) => {
//     let errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
//     if (errorMessage === 'Transaction was not successful, vending cannot be completed.') {
//       errorMessage += ' Please try again or contact support.';
//     }
//     setModalState({
//       isOpen: true,
//       status: 'error',
//       title: 'Transaction Failed',
//       message: errorMessage,
//       reference,
//     });
//   }, []);
//
//   const verifyTransaction = useCallback(
//     async (reference) => {
//       try {
//         const { selectedBiller, amount, customerReference, email, phoneNumber, customerDetails } = formData;
//         if (!selectedBiller || !selectedBiller.slug) {
//           throw new Error('Selected biller or biller slug is missing');
//         }
//
//         const payload = {
//           paymentReference: reference,
//           customerId: customerReference,
//           packageSlug: `${selectedBiller.slug}_PREPAID`,
//           channel: 'WEB',
//           amount: Math.round(amount * 1),
//           customerName: customerDetails?.customerName || 'Non-Payina-User',
//           phoneNumber: phoneNumber,
//           email: email,
//         };
//
//         const vendValueResponse = await apiService.vendValue(reference, payload);
//
//         if (vendValueResponse.status === "success") {
//           setModalState({
//             isOpen: true,
//             status: 'success',
//             title: 'Transaction Successful',
//             message: vendValueResponse.responseData.customerMessage || vendValueResponse.message,
//             reference: vendValueResponse.responseData.paymentReference,
//           });
//           return true;
//         } else {
//           throw new Error(vendValueResponse.message || 'Transaction verification failed');
//         }
//       } catch (err) {
//         handleError(err, reference);
//         return false;
//       }
//     },
//     [formData, handleError]
//   );
//
//   const pollTransactionStatus = useCallback(
//     async (reference) => {
//       const maxAttempts = 2;
//       const pollInterval = 1000;
//
//       for (let attempts = 0; attempts < maxAttempts; attempts++) {
//         try {
//           setStatusMessage('Verifying payment...');
//           const success = await verifyTransaction(reference);
//           if (success) return;
//         } catch (err) {
//           if (attempts === maxAttempts - 1) {
//             handleError(err, reference);
//             return;
//           }
//         }
//
//         await new Promise((resolve) => setTimeout(resolve, pollInterval));
//       }
//
//       handleError(new Error('Payment verification timed out.'), reference);
//     },
//     [verifyTransaction, handleError]
//   );
//
//   const handleProceed = async () => {
//     setIsSubmitting(true);
//     setStatusMessage('Initializing payment...');
//
//     try {
//       const { selectedBiller, amount, email } = formData;
//
//       if (!selectedBiller || !selectedBiller.id || !amount) {
//         throw new Error('Selected biller or amount is missing');
//       }
//
//       const amountInKobo = Math.round(amount * 100);
//
//       const initializePaymentResponse = await apiService.initializePayment(
//         selectedBiller.id,
//         email,
//         amountInKobo
//       );
//
//       if (
//         initializePaymentResponse.status === true &&
//         initializePaymentResponse.message === 'Authorization URL created'
//       ) {
//         const { authorization_url, reference } = initializePaymentResponse.data;
//         setPaymentReference(reference);
//
//         setStatusMessage('Payment page opened. Please complete the payment in the new window.');
//         window.open(authorization_url, '_blank');
//
//         setIsPaymentInitiated(true);
//
//         setTimeout(() => {
//           pollTransactionStatus(reference);
//         }, 60000);
//       } else {
//         throw new Error(initializePaymentResponse.message || 'Payment initialization failed');
//       }
//     } catch (err) {
//       handleError(err, paymentReference);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   const handleManualVerification = () => {
//     if (paymentReference) {
//       setIsSubmitting(true);
//       verifyTransaction(paymentReference);
//     } else {
//       setModalState({
//         isOpen: true,
//         status: 'error',
//         title: 'Error',
//         message: 'No payment reference available. Please try initiating the payment again.',
//       });
//     }
//   };
//
//   const handleRegister = () => {
//     // registration Logic
//     closeModal();
//   };
//
//   if (!formData || !formData.selectedBiller) {
//     return (
//       <section className="text-primary">
//         <Navbar />
//         <NoValidSelection message="No valid biller selected. Please go back and select a biller." />
//         <Footer />
//       </section>
//     );
//   }
//
//   const { selectedBiller, amount, customerReference, email, phoneNumber } = formData;
//
//   return (
//     <section className="text-primary">
//       <Navbar />
//       <OrderReview
//         planName={selectedBiller.name}
//         network="Betting Platform"
//         phoneNumber={phoneNumber}
//         planPrice={amount}
//         email={email}
//         customerReference={customerReference}
//       />
//       {statusMessage && <p className="text-blue-500 mt-4">{statusMessage}</p>}
//       {!isPaymentInitiated ? (
//         <button
//           className="text-primary mt-[25] text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
//           onClick={handleProceed}
//           disabled={isSubmitting}>
//           {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
//         </button>
//       ) : (
//         <button
//           className="text-primary mt-[25] text-left px-16 py-4 border-none rounded-[5px] bg-green-500 cursor-pointer hover:bg-green-600 transition-all duration-200"
//           onClick={handleManualVerification}
//           disabled={isSubmitting}>
//           Verify Payment Manually
//         </button>
//       )}
//       <Footer />
//
//       <TransactionModal
//         isOpen={modalState.isOpen}
//         onClose={closeModal}
//         status={modalState.status}
//         title={modalState.title}
//         message={modalState.message}
//         reference={modalState.reference}
//         onRegister={handleRegister}
//       />
//     </section>
//   );
// };
//
// export default Befour;


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
        const { selectedBiller, amount, customerReference, email, phoneNumber, customerDetails, verificationResult } = formData;
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
          customerEnquiryResult: customerDetails,
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
    if (!formData.customerDetails || !formData.verificationResult || formData.verificationResult.status !== 'success') {
      setModalState({
        isOpen: true,
        status: 'error',
        title: 'Error',
        message: 'Customer verification is required before proceeding. Please go back and verify the customer details.',
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
        message: 'No payment reference available. Please try initiating the payment again.',
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
