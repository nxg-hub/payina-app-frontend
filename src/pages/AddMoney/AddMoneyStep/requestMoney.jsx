import React, { useState } from 'react';
import backArrow from '../../../assets/images/Group-backArrow.png';
import PayinaUser from './PayinaUser/index';
import AnotherPerson from './AnotherPerson/index';
import payinaUserImg from '../../../assets/images/Group-PayinaUser.png';
import anotherPersonImg from '../../../assets/images/Layer_x0020_1.png';

const AddOption = ({ iconSrc, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 md:space-x-4 bg-[#D9D9D9] border-[0.1px] border-[#006181] rounded-lg hover:border-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 md:p-4 h-16 md:h-20">
    <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#D9D9D9] rounded-full border-4 md:border-6 lg:border-8 border-white flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
      <img src={iconSrc} alt={`${label} icon`} className="w-6 h-6 md:w-8 md:h-8" />
    </div>
    <span className="text-black font-medium text-sm md:text-base">{label}</span>
  </button>
);

const RequestMoney = ({ goBack }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const backClick = () => {
    setSelectedForm(null);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'payinaUser':
        return <PayinaUser backClick={backClick} />;
      case 'anotherPerson':
        return <AnotherPerson backClick={backClick} />;
      default:
        return (
          <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto w-full">
                <div className="flex justify-between items-center pt-8 md:pt-16 lg:pt-28">
                  <div>
                    <h1 className="text-xl md:text-3xl font-medium">Request Money</h1>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer" onClick={goBack}>
                    <img src={backArrow} alt="Back" className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-sm md:text-base">Back</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
              <div className="max-w-md mx-auto w-full">
                <h2 className="text-md md:text-xl font-bold mb-6">Who are you requesting money from?</h2>

                <div className="space-y-3 md:space-y-4">
                  <AddOption
                    iconSrc={payinaUserImg}
                    label="Payina User"
                    onClick={() => setSelectedForm('payinaUser')}
                  />

                  <AddOption
                    iconSrc={anotherPersonImg}
                    label="Another Person"
                    onClick={() => setSelectedForm('anotherPerson')}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{renderForm()}</>;
};

export default RequestMoney;