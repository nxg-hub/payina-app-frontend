// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import RecipientDetails from './step1';
import AmountDetails from './step2';
import ReviewTransaction from './step3';
import EnterPin from './step4';
import Stepper from '../../stepper';
import backArrow from '../../../../assets/images/Group-backArrow.png';

const AnotherBank = ({ currentStep, totalSteps, handleNext, handlePrev, resetFormSelection }) => {
  const [transactionData, setTransactionData] = useState({
    amount: '',
    bankName: '',
    purpose: '',
    accountName: '',
    accountNumber: '',
    accountBankCode: '',
    currency: '',
    receiverName: '',
  });

  const nextStep = (data) => {
    setTransactionData((prev) => ({ ...prev, ...data }));
    handleNext();
  };

  const backButtonClick = () => {
    if (currentStep === 1) {
      resetFormSelection();
    } else {
      handlePrev();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RecipientDetails nextStep={nextStep} prevStep={handlePrev} />;
      case 2:
        return <AmountDetails nextStep={nextStep} prevStep={handlePrev} />;
      case 3:
        return (
          <ReviewTransaction data={transactionData} nextStep={nextStep} prevStep={handlePrev} />
        );
      case 4:
        return <EnterPin data={transactionData} prevStep={handlePrev} />;
      default:
        return <RecipientDetails nextStep={handlePrev} />;
    }
  };

  return (
    <div className="flex flex-col justify-center items-start xl:ml-80 xl:pt-28 md:pt-10 sm:ml-[30px] md:ml-[25px] mx-auto">
      <div className="flex flex-row justify-between items-left xl:gap-[45rem] md:gap-[25rem] sm:gap-[15rem]">
        <div className="text-xl md:text-3xl font-medium">Send Money</div>
        <div
          className="flex flex-row gap-2 cancelAction-img cursor-pointer"
          onClick={backButtonClick}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="item-center mt-5 mx-auto">
        {currentStep >= 1 && currentStep <= 3 && (
          <Stepper currentStep={currentStep} numberOfSteps={totalSteps} />
        )}
      </div>
      {renderStep()}
    </div>
  );
};
export default AnotherBank;
