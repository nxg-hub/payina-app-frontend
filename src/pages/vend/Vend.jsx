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

const Vend = () => {
  const navigate = useNavigate();
  const isVendCalled = useRef(false); // Use ref to track if vendPayment is called
  const [statusMessage, setStatusMessage] = useState('');
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    isOpen: false,
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
      dispatch(showLoading());
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BILL_VERIFY}?transactionRef=${transactionalRefs}`,
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
      console.log(vendValueResponse);
      if (vendValueResponse.status === 202) {
        setStatusMessage('Vend request accepted. Processing...');
      } else if (vendValueResponse.status === 'success') {
        setModalState({
          isOpen: true,
          status: 'success',
          title: 'Transaction Successful',
          message: 'Successfully processed the vend request',
          reference: vendValueResponse.responseData.paymentReference,
        });
        dispatch(hideLoading());
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
      isOpen: true,
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
  };
  const handleRegister = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default Vend;
