import { useState } from 'react';

import {
  StepEight,
  StepEleven,
  StepFive,
  StepFour,
  StepNine,
  StepOne,
  StepSeven,
  StepSix,
  StepTen,
  StepThree,
  StepTwo
} from './_components';

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  // console.log(data);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    <StepOne next={handleNextStep} />,
    <StepTwo next={handleNextStep} />,
    <StepThree next={handleNextStep} data={data} />,
    <StepFour next={handleNextStep} />,
    <StepFive next={handleNextStep} />,
    <StepSix next={handleNextStep} />,
    <StepSeven next={handleNextStep} />,
    <StepEight next={handleNextStep} />,
    <StepNine next={handleNextStep} />,
    <StepTen next={handleNextStep} />,
    <StepEleven next={handleNextStep} />
  ];

  return (
    <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {steps[currentStep]}
    </div>
  );
}
