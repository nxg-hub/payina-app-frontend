import React, { useState } from 'react';

import {
  StepEight,
  // StepEleven,
  // StepFifteen,
  // StepFive,
  // StepFour,
  // StepFourteen,
  StepNine,
  // StepOne,
  // StepSeven,
  StepSeventeen,
  // StepSix,
  // StepSixteen,
  // StepTen,
  // StepThirteen,
  // StepThree,
  StepTwelve,
  // StepTwo,
} from './_components';

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
    // <StepOne next={handleNextStep} />,
    // <StepTwo next={handleNextStep} initialValues={data} />,
    // <StepThree next={handleNextStep} data={data} />,
    // <StepFour next={handleNextStep} />,
    // <StepFive next={handleNextStep} bvnData={data} initialValues={data} email={data.email} />,
    // <StepSix next={handleNextStep} email={data.email} />,
    // <StepSeven next={handleNextStep} text="Your Identity Has been Verified!" />,
    <StepEight next={handleNextStep} />,
    <StepNine next={handleNextStep} email={data.email} />,
    // <StepTen next={handleNextStep} />,
    // <StepEleven next={handleNextStep} data={data} />,
    <StepTwelve next={handleNextStep} email={data.email} />,
    // <StepThirteen next={handleNextStep} email={data.email} initialValues={data} />,
    // <StepFourteen next={handleNextStep} />,
    // <StepFifteen next={handleNextStep} email={data.email} />,
    // <StepSixteen next={handleNextStep} email={data.email} />,
    // <StepSeven next={handleNextStep} text="You Have Successfully Set Your Pin" />,
    <StepSeventeen next={handleNextStep} data={data} />,
  ];

  return (
    <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {steps[currentStep]}
    </div>
  );
}
