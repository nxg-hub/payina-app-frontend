import React, { useState } from 'react';
import SavingsTypeSelector from './SavingsTypeSelector';
import PersonalStep1 from './steps/PersonalStep1';
import PersonalStep2 from './steps/PersonalStep2';
import GroupStep1 from './steps/GroupStep1';
import GroupStep2 from './steps/GroupStep2';
import PairStep1 from './steps/PairStep1';
import PairStep2 from './steps/PairStep2';
import backArrow from '../../assets/images/Group-backArrow.png';
import { useNavigate } from 'react-router-dom';
import PersonalStep3 from './steps/PersonalStep3';
import PersonalStep4 from './steps/PersonalStep4';
import SuccessSavingsModal from './_components/SuccessSavingsModal';

const Save = () => {
  const [savingsType, setSavingsType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [personalFormData, setPersonalFormData] = useState({
    goalName: '',
    goalAmount: '',
    fundAmount: '',
    fundFrequency: '',
    autoStartDate: '',
  });

  let steps = [];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const handleBack = () => {
    if (currentStep === 0) {
      setSavingsType(null);
    }
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (savingsType === 'personal') {
    steps = [
      <PersonalStep1
        data={personalFormData}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
      />,
      <PersonalStep2
        data={personalFormData}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
      />,
      <PersonalStep3
        data={personalFormData}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
      />,
      <PersonalStep4
        data={personalFormData}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
      />,
      <SuccessSavingsModal />,
    ];
  } else if (savingsType === 'group') {
    steps = [<GroupStep1 />, <GroupStep2 />];
  } else if (savingsType === 'pair') {
    steps = [<PairStep1 />, <PairStep2 />];
  }

  const backButtonClick = () => {
    navigate('/account/dashboard');
  };
  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className=" w-[95%] md:w-[90%] m-auto flex justify-between md:mt-[100px]">
        <h2 className="text-xl md:text-2xl font-bold">Payina Vault</h2>
        {savingsType === null && (
          <div
            className={`${'flex flex-row gap-2 cancelAction-img cursor-pointer'}`}
            onClick={backButtonClick}>
            <img src={backArrow} alt="cancelAction"></img>
            <div className="text-md text-center mt-1">Back</div>
          </div>
        )}
      </div>
      {!savingsType ? (
        <SavingsTypeSelector onSelect={setSavingsType} />
      ) : (
        <div className="shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 p-5 rounded-md mt-11">
          <h2 className="text-xl font-bold capitalize mb-4">{savingsType} savings</h2>
          <div>{steps[currentStep]}</div>
        </div>
      )}
    </div>
  );
};

export default Save;
