// import React, { useEffect, useState, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import apiService from '../../services/apiService';
// import NoValidSelection from '../../utilities/NoValidSelection';
// import OrderReview from '../OrderReview/OrderReview.jsx';
// import TransactionModal from '../../utilities/TransactionModal';
// import Loader from '../../assets/LoadingSpinner';
// import { useNavigate } from 'react-router-dom';
// import successIcon from '../../assets/images/tansIcon.png';
// import errorIcon from '../../assets/images/redrectangle.png';
//
// const Planb = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isProcessingVend, setIsProcessingVend] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [paymentReference, setPaymentReference] = useState(null);
//
//   const [modalState, setModalState] = useState({
//     isOpen: false,
//     status: 'success',
//     title: 'Congrats!',
//     message: 'Your Transaction was Successful',
//     reference: '',
//   });
//
//   useEffect(() => {
//     if (location.state) {
//       setFormData(location.state);
//     }
//   }, [location.state]);
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = import.meta.env.VITE_SCRIPT;
//     script.async = true;
//     document.body.appendChild(script);
//
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
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
//   const pollVendStatus = useCallback(
//     async (reference) => {
//       try {
//         const maxAttempts = 10;
//         const pollInterval = 5000;
//
//         for (let attempt = 0; attempt < maxAttempts; attempt++) {
//           const response = await apiService.checkVendStatus(reference);
//
//           if (response.status === 'completed') {
//             setModalState({
//               isOpen: true,
//               status: 'success',
//               title: 'Transaction Successful',
//               message: 'Successfully processed the vend request',
//               reference: response.paymentReference,
//             });
//             setIsProcessingVend(false);
//             return;
//           } else if (response.status === 'failed') {
//             throw new Error(response.message || 'Vend process failed');
//           }
//
//           await new Promise((resolve) => setTimeout(resolve, pollInterval));
//         }
//
//         throw new Error('Vend process timed out');
//       } catch (err) {
//         handleError(err, reference);
//       } finally {
//         setIsProcessingVend(false);
//       }
//     },
//     [handleError]
//   );
//
//   const vendValue = useCallback(
//     async (reference) => {
//       try {
//         setIsProcessingVend(true);
//         const { formValues, selectedPlan } = formData;
//         if (!selectedPlan || !selectedPlan.planSlug) {
//           throw new Error('Selected plan or plan slug is missing');
//         }
//
//         const payload = {
//           paymentReference: reference,
//           customerId: formValues.phoneNumber,
//           packageSlug: selectedPlan.planSlug,
//           channel: 'WEB',
//           amount: Math.round(selectedPlan.planPrice * 1),
//           customerName: 'Non-Payina-User',
//           phoneNumber: formValues.phoneNumber,
//           email: formValues.email,
//         };
//
//         const vendValueResponse = await apiService.vendValue(reference, payload);
//
//         if (vendValueResponse.status === 202) {
//           setStatusMessage('Vend request accepted. Processing...');
//           pollVendStatus(reference);
//         } else if (vendValueResponse.status === 'success') {
//           setModalState({
//             isOpen: true,
//             status: 'success',
//             title: 'Transaction Successful',
//             message: 'Successfully processed the vend request',
//             reference: vendValueResponse.responseData.paymentReference,
//           });
//           setIsProcessingVend(false);
//         } else {
//           throw new Error(vendValueResponse.message || 'Vend value failed');
//         }
//       } catch (err) {
//         handleError(err, reference);
//         setIsProcessingVend(false);
//       }
//     },
//     [formData, handleError, pollVendStatus]
//   );
//
//   const handlePaystackCallback = useCallback(
//     (response) => {
//       if (response.status === 'success') {
//         setStatusMessage('Payment successful. Processing vend request...');
//         vendValue(response.reference);
//       } else {
//         setStatusMessage('Payment was not completed.');
//       }
//     },
//     [vendValue]
//   );
//   const closeModal = () => {
//     setModalState((prevState) => ({ ...prevState, isOpen: false }));
//     navigate(-1);
//   };
//
//   const handleProceed = async () => {
//     setIsSubmitting(true);
//     setStatusMessage('Initializing payment...');
//
//     try {
//       const { formValues, selectedPlan } = formData;
//
//       if (!selectedPlan || !selectedPlan.planPrice) {
//         throw new Error('Selected plan or plan price is missing');
//       }
//
//       const amountInKobo = Math.round(selectedPlan.planPrice);
//
//       const initializePaymentResponse = await apiService.initializePayment({
//         order: {
//           customerEmail: formValues.email,
//           amount: amountInKobo,
//         },
//         tokenizeCard: true,
//       });
//
//       if (
//         initializePaymentResponse.success === true &&
//         initializePaymentResponse.message === 'Success'
//       ) {
//         const { checkoutLink, orderReference } = initializePaymentResponse;
//         setPaymentReference(orderReference);
//
//         // Redirect to the checkout page
//         window.location.href = checkoutLink;
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
//   const handleRegister = () => {
//     // closeModal();
//     navigate('/signup');
//   };
//
//   const handleLogin = () => {
//     // closeModal();
//     navigate('/login');
//   };
//
//   if (!formData || !formData.selectedPlan) {
//     return (
//       <section className="text-primary">
//         <Navbar />
//         <NoValidSelection message="No valid plan selected. Please go back and select a plan." />
//         <Footer />
//       </section>
//     );
//   }
//
//   const { formValues, selectedPlan } = formData;
//   const { planName, planPrice } = selectedPlan;
//   const network = formValues?.selectedNetwork || 'Unknown Network';
//   const phoneNumber = formValues?.phoneNumber || '';
//   const email = formValues?.email || '';
//
//   return (
//     <section className="text-primary bg-black">
//       <Navbar />
//       <OrderReview
//         planName={planName}
//         network={network}
//         phoneNumber={phoneNumber}
//         planPrice={planPrice}
//         email={email}
//       />
//       {/*{statusMessage && <p className="text-blue-500 mt-4">{statusMessage}</p>}*/}
//       {isProcessingVend && <Loader />}
//       <button
//         className="w-[50%] mb-10 ml-[22%] text-primary mt-[25] text-center px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
//         onClick={handleProceed}
//         disabled={isSubmitting || isProcessingVend}>
//         {isSubmitting ? 'Processing...' : 'Proceed'}
//       </button>
//       <Footer />
//       <TransactionModal
//         isOpen={modalState.isOpen}
//         onClose={closeModal}
//         status={modalState.status}
//         title={modalState.title}
//         message={modalState.message}
//         reference={modalState.reference}
//         buttons={['login', 'register']}
//         successIcon={successIcon}
//         errorIcon={errorIcon}
//         buttonStyles={{
//           login: 'bg-blue-600 hover:bg-blue-700',
//           register: 'bg-blue-500 hover:bg-blue-600',
//         }}
//         onLogin={handleLogin}
//         onRegister={handleRegister}
//       />
//     </section>
//   );
// };
//
// export default Planb;

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';
import TransactionModal from '../../utilities/TransactionModal';
import Loader from '../../assets/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import successIcon from '../../assets/images/tansIcon.png';
import errorIcon from '../../assets/images/redrectangle.png';
import { useDispatch } from 'react-redux';
import { setVendPayload } from '../../Redux/WalletSlice.jsx';

const Planb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [paymentReference, setPaymentReference] = useState(null);
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: 'success',
    title: 'Congrats!',
    message: 'Your Transaction was Successful',
    reference: '',
  });
  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);
  console.log(Location.state);
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

  const handleProceed = async () => {
    setIsSubmitting(true);
    setStatusMessage('Initializing payment...');

    try {
      const { formValues, selectedPlan } = formData;

      if (!selectedPlan || !selectedPlan.planPrice) {
        throw new Error('Selected plan or plan price is missing');
      }

      const amountInKobo = Math.round(
        selectedPlan.planPrice >= 1000 ? selectedPlan.planPrice + 100 : selectedPlan.planPrice
      );

      const initializePaymentResponse = await apiService.initializePayment(
        formValues.email,
        amountInKobo
      );

      if (
        initializePaymentResponse.success === true &&
        initializePaymentResponse.message === 'Success'
      ) {
        const { checkoutLink, orderReference } = initializePaymentResponse;

        setPaymentReference(orderReference);
        sessionStorage.setItem('pendingFormData', JSON.stringify(formData));
        // vend payload
        const payload = {
          customerId: formData.formValues.phoneNumber,
          packageSlug: formData.selectedPlan.planSlug,
          channel: 'web',
          amount: formData.formValues.amount,
          customerName: formData.formValues.email,
          phoneNumber: formData.formValues.phoneNumber,
          email: formData.formValues.email,
          accountNumber: formData.formValues.phoneNumber,
        };
        //store the vend payload in redux store
        dispatch(setVendPayload(payload));
        // Redirect to the checkout link
        window.location.href = checkoutLink;
      } else {
        throw new Error(initializePaymentResponse.message || 'Payment initialization failed');
      }
    } catch (err) {
      handleError(err, paymentReference);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
    navigate(-1);
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const storedFormData = sessionStorage.getItem('pendingFormData');
    if (storedFormData && !formData) {
      setFormData(JSON.parse(storedFormData));
      sessionStorage.removeItem('pendingFormData');
    }
  }, [formData]);
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
    <section className="text-primary bg-black">
      <Navbar />
      <OrderReview
        planName={planName}
        network={network}
        phoneNumber={phoneNumber}
        planPrice={planPrice >= 1000 ? planPrice + 100 : planPrice}
        email={email}
      />
      {isProcessingVend && <Loader />}
      <button
        className="w-[50%] mb-10 ml-[22%] text-primary mt-[25] text-center px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
        onClick={handleProceed}
        disabled={isSubmitting || isProcessingVend}>
        {isSubmitting ? 'Processing...' : 'Proceed'}
      </button>
      <Footer />
      <TransactionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        status={modalState.status}
        title={modalState.title}
        message={modalState.message}
        reference={modalState.reference}
        buttons={['login', 'register']}
        successIcon={successIcon}
        errorIcon={errorIcon}
        buttonStyles={{
          login: 'bg-blue-600 hover:bg-blue-700',
          register: 'bg-blue-500 hover:bg-blue-600',
        }}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </section>
  );
};

export default Planb;
