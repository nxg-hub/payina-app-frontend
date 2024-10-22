import React, { useState } from 'react';
import RecipientDetails from './step1';
import AmountDetails from './step2';
import ReviewTransaction from './step3';
import EnterPin from './step4';
import SuccessPage from './step5';

const Beneficiaries = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 6));
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
        return <ReviewTransaction nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <EnterPin nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <SuccessPage nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <RecipientDetails nextStep={nextStep} />;
    }
  };

  return <div className="step-container">{renderStep()}</div>;
};

export default Beneficiaries;
