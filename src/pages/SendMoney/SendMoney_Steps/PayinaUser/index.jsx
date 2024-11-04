import React, { useState } from 'react';
import RecipientDetails from './step1';
import AmountDetails from './step2';
import ReviewTransaction from './step3';
import EnterPin from './step4';
import SuccessMessage from './step5';
import DeclineMessage from './step6';

const PayinaUser = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [transactionData, setTransactionData] = useState({
    payinaTag: '',
    amount: '',
    purpose: '',
  });

  const nextStep = (data) => {
    setTransactionData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RecipientDetails nextStep={nextStep} />;
      case 2:
        return <AmountDetails nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <ReviewTransaction data={transactionData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <EnterPin data={transactionData} prevStep={prevStep} />;
      default:
        return <RecipientDetails nextStep={prevStep} />;
    }
  };

  return <div className="step-container">{renderStep()}</div>;
};

export default PayinaUser;
