// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import RecipientDetails from './step1';
import AmountDetails from './step2';
import ReviewTransaction from './step3';
import EnterPin from './step4';
import Stepper from '../../stepper';
import backArrow from '../../../../assets/images/Group-backArrow.png';

const PayinaUser = ({ currentStep, totalSteps, handleNext, handlePrev, resetFormSelection }) => {
  const [transactionData, setTransactionData] = useState({
    payinaTag: '',
    amount: '',
    purpose: '',
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
        return <RecipientDetails nextStep={nextStep} />;
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
    <div className="flex flex-col justify-center items-start lg:ml-80 lg:pt-28 pt-10 ml-[25px] mx-auto">
      <div className="flex flex-row justify-between w-[95%] items-left lg:gap-[45rem] gap-[5rem]">
        <div className="text-xl lg:text-3xl font-semibold">Send Money</div>
        {currentStep !== 4 && (
          <div
            className="flex flex-row gap-2 cancelAction-img cursor-pointer"
            onClick={backButtonClick}>
            <img src={backArrow} alt="cancelAction"></img>
            <h2 className="text-md text-center mt-1">Back</h2>
          </div>
        )}
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
export default PayinaUser;
