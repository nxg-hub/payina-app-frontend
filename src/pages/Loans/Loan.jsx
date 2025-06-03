import React, { useState } from 'react';
import backArrow from '../../assets/images/Group-backArrow.png';
import Step1 from './Steps/Step1';
import Step3 from './Steps/Step3';
import { useNavigate } from 'react-router-dom';
import Step2 from './Steps/Step2';
import InitialStep from './Steps/InitialStep';
import FinalStep from './Steps/FinalStep';
import LoanBalanceCard from './_components/LoanBalanceCard';

const Loan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    purpose: '',
    amount: '',
    duration: '',
    repayment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const backButtonClick = () => {
    navigate('/account/dashboard');
  };
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className=" mx-auto p-6 px-4 py-4  w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right rounded">
      <div className="w-[90%] m-auto flex justify-between mb-2">
        <h2 className="text-xl md:text-2xl"> Loan</h2>
        <div
          className={`${'flex flex-row gap-2 cancelAction-img cursor-pointer'}`}
          onClick={backButtonClick}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-1">Back</div>
        </div>
      </div>
      <div>{currentStep === 0 && <LoanBalanceCard onNext={nextStep} />}</div>
      {currentStep === 1 && <InitialStep onNext={nextStep} />}
      {currentStep === 2 && <Step1 data={formData} onChange={handleChange} onNext={nextStep} />}
      {currentStep === 3 && <Step2 data={formData} onBack={prevStep} onNext={nextStep} />}
      {currentStep === 4 && <Step3 data={formData} onBack={prevStep} onNext={nextStep} />}
      {currentStep === 5 && <FinalStep />}
    </div>
  );
};

export default Loan;
