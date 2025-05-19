import React, { useCallback, useEffect, useRef, useState } from 'react';
import apiService from '../../services/apiService';
import TransactionModal from '../../utilities/TransactionModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import successIcon from '../../assets/images/tansIcon.png';
import errorIcon from '../../assets/images/redrectangle.png';
import { reSetWalletDetails } from '../../Redux/WalletSlice';
import axios from 'axios';
import { hideLoading, showLoading } from '../../Redux/loadingSlice';
import VendReceipt from './VendReceipt';

const Vend = () => {
  const navigate = useNavigate();
  const isVendCalled = useRef(false); // Use ref to track if vendPayment is called
  const [statusMessage, setStatusMessage] = useState('');
  const [electicity, setElectricity] = useState(false);
  const success = localStorage.getItem('success');
  const view = localStorage.getItem('view');
  const isOpen = localStorage.getItem('isOpen');

  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    isOpen: isOpen,
    status: 'success',
    title: 'Congrats!',
    message: 'Your Transaction was Successful',
    reference: '',
  });
  const vendPayload = useSelector((state) => state.wallet.vendPayload);

  //       // Access query params from the current URL
  const params = new URLSearchParams(window.location.search);
  const orderReferences = params.get('orderReference');
  const transactionalRefs = params.get('orderId');

  useEffect(() => {
    const verifyBill = async () => {
      if (success) {
        return;
      }
      dispatch(showLoading());
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_WALLET_BASE_URL}${import.meta.env.VITE_BILL_VERIFY}?transactionRef=${transactionalRefs}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (
          response.data.status === 'SUCCESS' &&
          response.data.gateWayMessage === 'PAYMENT SUCCESSFUL'
        ) {
          // Call vendPayment only if it hasn't been called
          if (!isVendCalled.current) {
            isVendCalled.current = true; // Mark as called
            vendPayment();
          }
        } else if (response.status === 'UNKNOWN') {
          handleError('Request failed: Request status UNKNOWN', orderReferences);
        } else {
          handleError('Request Failed', orderReferences);
        }
        dispatch(hideLoading());
      } catch (err) {
        handleError(err, orderReferences);

        dispatch(hideLoading());
      } finally {
        dispatch(hideLoading());
      }
    };
    verifyBill();
    // Cleanup function to reset isVendCalled if the component unmounts
    return () => {
      isVendCalled.current = false;
    };
  }, []);

  const vendPayment = async () => {
    // Clone the object and add a new key-value pair
    const updatedPayload = { ...vendPayload, paymentReference: orderReferences };

    try {
      dispatch(showLoading());

      const vendValueResponse = await apiService.vendValue(transactionalRefs, updatedPayload);

      vendValueResponse.responseData.tokenData ? setElectricity(true) : null;
      if (vendValueResponse.status === 202) {
        setStatusMessage('Vend request accepted. Processing...');
      } else if (vendValueResponse.status === 'success') {
        // setSuccess(true);
        // setView(true);
        // setVend(vendValueResponse);
        localStorage.setItem('vendValueResponse', JSON.stringify(vendValueResponse));
        localStorage.setItem('success', true);
        vendValueResponse.responseData.tokenData ? localStorage.setItem('view', true) : null;
        localStorage.setItem('isOpen', true);
        setModalState({
          isOpen: isOpen ? isOpen : true,
          status: 'success',
          title: 'Transaction Successful',
          message: 'Successfully processed the vend request',
          reference: vendValueResponse.responseData.paymentReference,
        });
      } else {
        throw new Error(vendValueResponse.message || 'Vend value failed');
      }
    } catch (err) {
      handleError(err, orderReferences);
      dispatch(hideLoading());
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleError = useCallback((err, reference) => {
    let errorMessage =
      err.response?.data?.message ||
      err.message ||
      'An unknown error occurred, Could not verify payment.';
    if (errorMessage === 'Transaction was not successful, vending cannot be completed.') {
      errorMessage += ' Please try again or contact support.';
    }
    setModalState({
      isOpen: isOpen ? isOpen : true,
      status: 'error',
      title: 'Transaction Failed',
      message: errorMessage,
      reference,
    });
  }, []);
  const closeModal = () => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
    navigate('/');
    dispatch(reSetWalletDetails());
    // localStorage.clear();
    // localStorage.removeItem('success');
    // localStorage.removeItem('view');
    // localStorage.removeItem('isOpen');
  };
  const handleRegister = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
    // localStorage.clear();
    // localStorage.removeItem('success');
    // localStorage.removeItem('view');
    // localStorage.removeItem('isOpen');
  };

  return (
    <div>
      <div className="">
        <TransactionModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          status={modalState.status}
          title={modalState.title}
          message={modalState.message}
          reference={modalState.reference}
          buttons={['login', 'cancel']}
          successIcon={successIcon}
          errorIcon={errorIcon}
          buttonStyles={{
            login: 'bg-blue-600 hover:bg-blue-700',
            register: 'bg-blue-500 hover:bg-blue-600',
          }}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        {view && (
          <button
            onClick={() => {
              setElectricity(true);
            }}
            className="z-50 relative top-[600px] left-[10%] md:left-[40%] rounded-[5px] w-[80%] text-xs md:text-base m-auto  py-2 border border-lightBlue bg-lightBlue md:w-[20%] text-primary">
            ViewReceipt
          </button>
        )}
      </div>
      {electicity && <VendReceipt setElectricity={setElectricity} />}
    </div>
  );
};

export default Vend;
