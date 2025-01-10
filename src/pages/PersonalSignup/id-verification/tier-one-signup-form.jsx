import React, { useState } from 'react';

import { StepFour, StepSeventeen } from '../_components/index.js';

export default function TierOneSignupForm() {
  const [data, setData] = useState({
    email: '',
    bvnData: {},
    password: '',
    confirmPassword: '',
    identificationNumber: '',
    houseNumber: '',
    street: '',
    state: '',
    lga: '',
    businessHouseNumber: '',
    businessStreetName: '',
    businessState: '',
    businessLGA: '',
    businessName: '',
    tin_No: '',
    businessRegNumber: '',
    businessCategory: '',
    businessType: '',
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const steps = [
    <StepFour next={handleNextStep} />,
    <StepSeventeen next={handleNextStep} data={data} />,,
  ];

  return (
    <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {steps[currentStep]}
    </div>
  );
}
