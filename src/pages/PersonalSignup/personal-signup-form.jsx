import { useRef, useState, useEffect } from 'react';

import {
  StepFive,
  StepFour,
  StepOne,
  StepSeven,
  StepSeventeen,
  StepSixteen,
  StepThree,
  StepTwo,
  StepSix,
  StepEight,
} from './_components';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '../../Redux/PersonalSignUpSlice';

export default function PersonalSignupForm() {
  const [data, setData] = useState({
    email: '',
    bvnData: {},
    ninData: {},
    password: '',
    confirmPassword: '',
    identificationNumber: '',
    houseNumber: '',
    street: '',
    state: '',
    lga: '',
  });
  // const [currentStep, setCurrentStep] = useState(0);
  const currentStep = useSelector((state) => state.personalSignUp.step);
  const dispatch = useDispatch();
  const handleNextStep = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    // setCurrentStep((prevStep) => prevStep + 1);
    dispatch(nextStep());
  };

  const steps = [
    <StepOne next={handleNextStep} />,
    <StepTwo next={handleNextStep} initialValues={data} />,
    <StepThree next={handleNextStep} data={data} />,
    <StepFour next={handleNextStep} />,
    <StepFive
      next={handleNextStep}
      bvnData={data}
      ninData={data}
      initialValues={data}
      email={data.email}
    />,
    <StepSix next={handleNextStep} email={data.email} />,
    <StepSixteen next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="You Have Successfully Set Your Pin" />,
    <StepSeventeen next={handleNextStep} data={data} />,
  ];

  return <div className="">{steps[currentStep]}</div>;
}
