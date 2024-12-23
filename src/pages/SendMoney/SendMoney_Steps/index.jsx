// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import cancelImg from '../../../assets/images/CancelSendMoney.png';
import { Link } from 'react-router-dom';
import PayinaUser from './PayinaUser/index';
import AnotherBank from './AnotherBank/index';
import Beneficiaries from './BeneficiariesAccount/index';
import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
import anotherBankImg from '../../../assets/images/Group-AnotherBank.png';
import beneficiaryImg from '../../../assets/images/Group-beneficiaries.png';
import Stepper from '../stepper';

const SendMoneySteps = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const resetFormSelection = () => {
    setSelectedForm(null);
    setCurrentStep(1);
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const handlePrev = () => {
    if (currentStep === 1) {
      resetFormSelection();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'payinaUser':
        return (
          <PayinaUser
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrev={handlePrev}
            resetFormSelection={resetFormSelection}
          />
        );
      case 'anotherBank':
        return (
          <AnotherBank
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrev={handlePrev}
            resetFormSelection={resetFormSelection}
          />
        );
      case 'beneficiaries':
        return (
          <Beneficiaries
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrev={handlePrev}
            resetFormSelection={resetFormSelection}
          />
        );
      default:
        return (
          <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
            <div className="flex flex-row justify-between items-left gap-[5rem] lg:gap-[45rem]">
              <div className="text-xl md:text-3xl font-medium">Send Money</div>
              <Link to="/account/dashboard">
                <div className="cancelAction-img">
                  <img src={cancelImg} alt="cancelAction"></img>
                </div>
              </Link>
            </div>
            <div className="item-center mt-5 mx-auto">
              <Stepper currentStep={selectedForm ? 1 : 0} numberOfSteps={totalSteps} />
            </div>
            <div className="text-md md:text-xl font-medium mt-5">Send To</div>
            <div
              onClick={() => setSelectedForm('payinaUser')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={payinaUserImg} alt="payrollSelect" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Payina User
              </div>
            </div>
            <div
              onClick={() => setSelectedForm('anotherBank')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={anotherBankImg} alt="payrollSelect" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Another Bank
              </div>
            </div>
            <div
              onClick={() => setSelectedForm('beneficiaries')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={beneficiaryImg} alt="payrollSelect" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Beneficiaries
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="">{renderForm()}</div>;
};

export default SendMoneySteps;
