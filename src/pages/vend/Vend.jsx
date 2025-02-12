import React, { useCallback, useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import Loader from '../../assets/LoadingSpinner';
import TransactionModal from '../../utilities/TransactionModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import successIcon from '../../assets/images/tansIcon.png';
import errorIcon from '../../assets/images/redrectangle.png';
import { reSetWalletDetails } from '../../Redux/WalletSlice';

const Vend = () => {
  const navigate = useNavigate();
  const [isProcessingVend, setIsProcessingVend] = useState(false);
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

  useEffect(() => {
    const vend = async () => {
      // Access query params from the current URL
      const params = new URLSearchParams(window.location.search);
      const orderReferences = params.get('orderReference');
      const transactionalRefs = params.get('orderId');

      // Clone the object and add a new key-value pair
      const updatedPayload = { ...vendPayload, paymentReference: orderReferences };
      try {
        setIsProcessingVend(true);

        const vendValueResponse = await apiService.vendValue(transactionalRefs, updatedPayload);

        if (vendValueResponse.status === 202) {
          setStatusMessage('Vend request accepted. Processing...');
          // pollVendStatus(reference);
        } else if (vendValueResponse.status === 'success') {
          setModalState({
            isOpen: true,
            status: 'success',
            title: 'Transaction Successful',
            message: 'Successfully processed the vend request',
            reference: vendValueResponse.responseData.paymentReference,
          });
          setIsProcessingVend(false);
        } else {
          throw new Error(vendValueResponse.message || 'Vend value failed');
        }
      } catch (err) {
        handleError(err, orderReferences);
        setIsProcessingVend(false);
      } finally {
        setIsProcessingVend(false);
      }
    };
    vend();
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
      {isProcessingVend ? (
        <div className="mt-11">
          <Loader />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Vend;
