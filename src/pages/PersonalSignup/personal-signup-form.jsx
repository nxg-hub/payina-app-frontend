import { useRef, useState, useEffect } from 'react';

import {
  StepFive,
  StepFour,
  StepOne,
  StepSeven,
  StepSeventeen,
  StepSixteen,
  StepThree,
  StepTwo
} from './_components';

export default function PersonalSignupForm() {
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
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const steps = [
    <StepOne next={handleNextStep} />,
    <StepTwo next={handleNextStep} initialValues={data} />,
    <StepThree next={handleNextStep} data={data} />,
    <StepFour next={handleNextStep} />,
    <StepFive next={handleNextStep} bvnData={data} initialValues={data} email={data.email} />,
    <StepSixteen next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="You Have Successfully Set Your Pin" />,
    <StepSeventeen next={handleNextStep} data={data} />,
  ];

  return (
    <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-28">
      {steps[currentStep]}
    </div>
  );
}
