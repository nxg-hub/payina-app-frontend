import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


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


export default function SignUpForm() {
  const [data, setData] = useState({ email: '', bvnData: {}, password: '', confirmPassword: '',  identificationNumber: "", houseNumber: '', 
    street: '',state: '', lga: '',  businessHouseNumber: '',
    businessStreetName:  '',
    businessState:  '',
    businessLGA:  '', businessName: '',
    tin_No: '',
    businessRegNumber: '',
    businessCategory: '',
    businessType: '',  });
    const { step } = useParams(); // Get step from URL

  const [currentStep, setCurrentStep] = useState(0);

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


//  useEffect(() => {
//     const savedStep = localStorage.getItem('signupStep');

//     // Check if essential data (like email and password) is present in data
//     const isEssentialDataMissing = !data.email || !data.password;

//     if (isEssentialDataMissing) {
//       // If email or password is missing, start from step 1
//       setCurrentStep(0);
//       localStorage.removeItem('signupStep'); // Clear saved step if the essential data is missing
//     } else if (step) {
//       // If there's a step in the URL, use that step
//       setCurrentStep(parseInt(step));
//     } else if (savedStep) {
//       // If there's a saved step and essential data exists, set the saved step
//       setCurrentStep(parseInt(savedStep));
//     }
//   }, [step, data]);


  

//   const handleNextStep = (newData) => {
//     setData((prevData) => ({ ...prevData, ...newData }));
//     setCurrentStep((prevStep) => {
//       const nextStep = prevStep + 1;

//        // Save the current step to localStorage
//     localStorage.setItem('signupStep', nextStep);

//     return nextStep;
//   });
// };
  

  const steps = [
    <StepOne next={handleNextStep} />,
    <StepTwo next={handleNextStep} initialValues={data} />,
    <StepThree next={handleNextStep} data={data} />,
    <StepFour next={handleNextStep} />,
    <StepFive next={handleNextStep} bvnData={data}  initialValues={data} email={data.email} />,
    <StepSix next={handleNextStep}  email={data.email}/>,
    <StepSeven next={handleNextStep} text="Your Identity Has been Verified!" />,
    <StepEight next={handleNextStep} />,
    <StepNine next={handleNextStep} email={data.email} />,
    <StepTen next={handleNextStep} />,
    <StepEleven next={handleNextStep} data={data}/>,
    <StepTwelve next={handleNextStep} email={data.email} />,
    <StepThirteen next={handleNextStep}email={data.email} initialValues={data} />,
    <StepFourteen next={handleNextStep} />,
    <StepFifteen next={handleNextStep} email={data.email}/>,
    <StepSixteen next={handleNextStep} email={data.email}/>,
    <StepSeven next={handleNextStep} text="You Have Successfully Set Your Pin" />,
    <StepSeventeen next={handleNextStep} data={data}  />,
  ];


  return (
    <div className="xl:mb-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {steps[currentStep]}
    </div>
  );
}
