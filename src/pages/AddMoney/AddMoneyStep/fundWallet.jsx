import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import TransactionModal from '../../utilities/TransactionModal';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Loader from '../../../assets/LoadingSpinner';
import FundWalletComponent from '../../../utilities/FundWalletComponent.jsx';
import backArrow from '../../../assets/images/Group-backArrow.png';

const FundWallet = ({ goBack }) => {
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
    <section className="">
      <div className="flex flex-col ml-[50px] items-center justify-center xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
        <div className="flex flex-row justify-between items-left lg:gap-[45rem] gap-[10rem] mt-3">
          <div className="text-xl md:text-3xl">Add Money</div>
          <div className="flex flex-row gap-2 cancelAction-img cursor-pointer" onClick={goBack}>
            <img src={backArrow} alt="cancelAction"></img>
            <div className="text-md text-center mt-2">Back</div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-[80px] bg-[#EBEBEB] rounded-md py-5 px-8 xl:py-10 xl:px-14 w-[300px] lg:w-[700px]">
          <label className="py-4 text-lg">How much would you like to add to your Wallet?</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="border-2 rounded-lg px-5 py-3 border-black text-slate-600 w-[250px] lg:w-[500px] hover:border-yellow"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {amount && (
            <FundWalletComponent
              className="mt-10"
              amount={amount}
              onFundingInitiated={handleFundingSuccess}
              onError={handleFundingError}
              formValues={{
                email: userDetails.sub,
                phoneNumber: userDetails.phone,
              }}
            />
          )}
        </div>

        {statusMessage && <p className="text-lightBlue text-center">{statusMessage}</p>}

        {isProcessingVend && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
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
