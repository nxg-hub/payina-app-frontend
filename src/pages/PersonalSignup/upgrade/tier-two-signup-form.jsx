import React, { useState } from 'react';

import {
  StepEight,
  StepNine,
  StepSeven,
  StepSeventeen,
  StepSix,
} from '../_components/index.js';

export default function TierTwoSignupForm() {
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
    <StepSix next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="Your Identity Has been Verified!" />,
    <StepEight next={handleNextStep} />,
    <StepNine next={handleNextStep} email={data.email} />,
    <StepSeventeen next={handleNextStep} data={data} />,
  ];

  return (
    <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {steps[currentStep]}
    </div>
  );
}
