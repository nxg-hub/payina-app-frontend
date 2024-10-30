import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Account/_components/index.js';
import Footer from '../../components/footer/footer';
import TransactionModal from '../../utilities/TransactionModal';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Sidebar } from '../Account/_components';
import Loader from '../../assets/LoadingSpinner';
import FundWalletComponent from '../../utilities/FundWalletComponent';

const FundWallet = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isProcessingVend, setIsProcessingVend] = useState(false);
  const [userDetails] = useLocalStorage('userDetails', '');
  const [statusMessage, setStatusMessage] = useState('');

  const [modalState, setModalState] = useState({
    isOpen: false,
    status: 'success',
    title: '',
    message: '',
    reference: '',
  });

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    navigate('/account/airtime');
  };

  const handleFundingSuccess = (reference, data) => {
    setIsProcessingVend(false);
    setModalState({
      isOpen: true,
      status: 'success',
      title: 'Transaction Successful',
      message: 'Your wallet has been funded successfully',
      reference,
    });
  };

  const handleFundingError = (error) => {
    setIsProcessingVend(false);
    const errorMessage =
      error.response?.data?.message || error.message || 'An unknown error occurred';
    setModalState({
      isOpen: true,
      status: 'error',
      title: 'Transaction Failed',
      message: errorMessage,
      reference: '',
    });
  };

  return (
    <section className="text-primary min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="container mx-auto px-4 md:px-8 flex-grow bg-black">
            <div className="md:ml-80 w-full max-w-2xl mx-auto py-8">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col w-full">
                  <label className="py-4 text-lg">
                    How much would you like to add to your Wallet?
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="border-2 rounded-lg px-5 py-3 border-primary bg-black text-slate-600 w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                {amount && (
                  <FundWalletComponent
                    amount={amount}
                    onFundingInitiated={handleFundingSuccess}
                    onError={handleFundingError}
                    formValues={{
                      email: userDetails.sub,
                      phoneNumber: userDetails.phone,
                    }}
                  />
                )}

                {statusMessage && <p className="text-blue-500 text-center">{statusMessage}</p>}

                {isProcessingVend && (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/*<TransactionModal*/}
      {/*  isOpen={modalState.isOpen}*/}
      {/*  onClose={closeModal}*/}
      {/*  status={modalState.status}*/}
      {/*  title={modalState.title}*/}
      {/*  message={modalState.message}*/}
      {/*  reference={modalState.reference}*/}
      {/*  onRegister={closeModal}*/}
      {/*/>*/}
    </section>
  );
};

export default FundWallet;
