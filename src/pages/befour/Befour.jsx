import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';
import TransactionModal from '../../utilities/TransactionModal';
import Loader from '../../assets/LoadingSpinner';
import successIcon from '../../assets/images/tansIcon.png';
import errorIcon from '../../assets/images/redrectangle.png';
import { useNavigate } from 'react-router-dom';
import { setVendPayload } from '../../Redux/WalletSlice.jsx';
import { useDispatch } from 'react-redux';

const Befour = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [paymentReference, setPaymentReference] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  useEffect(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const closeModal = () => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
  };

  const isBettingOrLottery = useCallback((selectedBiller) => {
    return selectedBiller?.slug === 'BETTING_AND_LOTTERY';
  }, []);

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
    if (!formData || !formData.selectedBiller) {
      setModalState({
        isOpen: true,
        status: 'error',
        title: 'Error',
        message: 'No valid biller selected. Please go back and select a biller.',
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
            'Customer verification is required before proceeding. Please go back and verify the customer details.',
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

      const amountWithCharges = Math.round(Number(amount) + 70);
      const amountInKobo = Math.round(amountWithCharges);

      const initializePaymentResponse = await apiService.initializePayment(email, amountInKobo);

      if (
        initializePaymentResponse.success === true &&
        initializePaymentResponse.message === 'Success'
      ) {
        const { checkoutLink, orderReference } = initializePaymentResponse;
        setPaymentReference(orderReference);
        // vend payload
        const payload = {
          customerId: formData.customerReference,
          packageSlug: formData.selectedPlan.slug,
          channel: 'web',
          amount: formData.amount,
          customerName: formData.customerDetails.customerName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          accountNumber: formData.customerReference,
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

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
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
        planPrice={Number(amount) + 70}
        email={email}
        customerReference={customerReference}
      />
      {/*{statusMessage && <p className="text-blue-500 mt-4 ml-[25%]">{statusMessage}</p>}*/}
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

export default Befour;
