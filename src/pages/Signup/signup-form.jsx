import React, { useState } from 'react';

import {
  StepEight,
  StepEleven,
  StepFifteen,
  StepFive,
  StepFour,
  StepFourteen,
  StepNine,
  StepOne,
  StepSeven,
  StepSeventeen,
  StepSix,
  StepSixteen,
  StepTen,
  StepThirteen,
  StepThree,
  StepTwelve,
  StepTwo,
} from './_components';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '../../Redux/BusinessSignUpSlice';

export default function SignUpForm() {
  const [data, setData] = useState({
    email: '',
    phone: '',
    bvnData: {},
    ninData: {},
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
  // const [currentStep, setCurrentStep] = useState(0);
  const currentStep = useSelector((state) => state.businessSignUp.step);
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
    <StepFour next={handleNextStep} data={data} />,
    <StepFive
      next={handleNextStep}
      bvnData={data}
      ninData={data}
      datas={data}
      initialValues={data}
      email={data.email}
    />,
    <StepSix next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="Your Identity Has been Verified!" />,
    <StepEight next={handleNextStep} />,
    <StepNine next={handleNextStep} email={data.email} />,
    <StepTen next={handleNextStep} initialValues={data} />,
    <StepEleven next={handleNextStep} initialValues={data} />,
    <StepTwelve next={handleNextStep} email={data.email} />,
    <StepThirteen next={handleNextStep} email={data.email} initialValues={data} passedData />,
    <StepFourteen next={handleNextStep} />,
    <StepFifteen next={handleNextStep} email={data.email} />,
    <StepSixteen next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="You Have Successfully Set Your Pin" />,
    <StepSeventeen next={handleNextStep} email={data.email} />,
  ];

  return <div className="">{steps[currentStep]}</div>;
}
