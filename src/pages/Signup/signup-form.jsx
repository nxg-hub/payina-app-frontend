import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useAuth} from '../../useAuth';

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
  StepTwo
} from './_components';

const REGISTRATION_LEVELS = {
  BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
  BVN_DETAILS_CONFIRMATION: 1,
  FACIAL_CAPTURE_AND_UPLOAD: 2,
  CORPORATE_PROFILE_UPDATE: 3,
  SET_TRANSACTION_PIN: 4,
  KYC_COMPLETED: 5,//adjust as needed
};

export default function SignUpForm() {
  const [data, setData] = useState({
    email: '', bvnData: {}, password: '', confirmPassword: '',
    identificationNumber: "", houseNumber: '', street: '', state: '',
    lga: '', businessHouseNumber: '', businessStreetName: '', businessState: '',
    businessLGA: '', businessName: '', tin_No: '', businessRegNumber: '',
    businessCategory: '', businessType: ''
  });

  const { step } = useParams(); // Get step from URL
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const auth = useAuth(); // Use the custom hook

  useEffect(() => {
    const fetchRegistrationLevel = async () => {
      try {
        // Fetch registration level from auth
        const registrationLevel = await auth.checkUserRegistrationLevel();

        // Convert registration level to step index
        const stepIndex = REGISTRATION_LEVELS[registrationLevel] || 0;
        setCurrentStep(stepIndex);
      } catch (error) {
        console.error('Error fetching registration level:', error);
        setCurrentStep(0); // Default to the first step on error
      }
    };

    fetchRegistrationLevel();
  }, []);

  useEffect(() => {
    const savedStep = localStorage.getItem('signupStep');

    // Check if essential data (like email and password) is present
    const isEssentialDataMissing = !data.email || !data.password;

    if (isEssentialDataMissing) {
      // If essential data is missing, reset to step 1 (index 0)
      setCurrentStep(0);
      localStorage.removeItem('signupStep'); // Clear the saved step
    } else if (step) {
      // If URL contains a step, use that step
      setCurrentStep(parseInt(step, 10));
    } else if (savedStep) {
      // If localStorage contains a step, use it
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, [step, data]);

  // Function to handle step progression
  const handleNextStep = (newData) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));

    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;

      // Save the next step to localStorage
      localStorage.setItem('signupStep', nextStep);

      return nextStep;
    });
  };

  const steps = [
    <StepOne next={handleNextStep} />,
    <StepTwo next={handleNextStep} initialValues={data} />,
    <StepThree next={handleNextStep} data={data} />,
    <StepFour next={handleNextStep} />,
    <StepFive next={handleNextStep} bvnData={data} initialValues={data} email={data.email} />,
    <StepSix next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="Your Identity Has been Verified!" />,
    <StepEight next={handleNextStep} />,
    <StepNine next={handleNextStep} email={data.email} />,
    <StepTen next={handleNextStep} />,
    <StepEleven next={handleNextStep} data={data} />,
    <StepTwelve next={handleNextStep} email={data.email} />,
    <StepThirteen next={handleNextStep} email={data.email} initialValues={data} />,
    <StepFourteen next={handleNextStep} />,
    <StepFifteen next={handleNextStep} email={data.email} />,
    <StepSixteen next={handleNextStep} email={data.email} />,
    <StepSeven next={handleNextStep} text="You Have Successfully Set Your Pin" />,
    <StepSeventeen next={handleNextStep} data={data} />,
  ];

  return (
      <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {steps[currentStep]}
      </div>
  );
}
