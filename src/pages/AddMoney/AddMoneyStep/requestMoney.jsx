import React, { useState } from 'react';
import backArrow from '../../../assets/images/Group-backArrow.png';
import PayinaUser from './PayinaUser/index';
import AnotherPerson from './AnotherPerson/index';
import payinaUserImg from '../../../assets/images/Group-PayinaUser.png';
import anotherPersonImg from '../../../assets/images/Layer_x0020_1.png';

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
          <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
            <div className="flex flex-row justify-between items-left lg:gap-[45rem] gap-[5rem]">
              <div className="text-xl md:text-3xl">Request Money</div>
              <div className="flex flex-row gap-2 cancelAction-img cursor-pointer" onClick={goBack}>
                <img src={backArrow} alt="cancelAction"></img>
                <div className="text-md text-center mt-2">Back</div>
              </div>
            </div>
            <div className="text-md md:text-xl font-bold mt-12">
              Who are you requesting money from?
            </div>
            <div
              onClick={() => setSelectedForm('payinaUser')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="relative border border-yellow rounded-full p-3">
                <div className="ml-12 mb-3 w-10 h-10">
                  <img src={payinaUserImg} alt="payinaUserImg" />
                </div>
                <div className="absolute bottom-[3px]">
                  <img src={anotherPersonImg} alt="anotherPersonImg" />
                </div>
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Payina User
              </div>
            </div>
            <div
              onClick={() => setSelectedForm('anotherPerson')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-9 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={payinaUserImg} alt="payinaUserImg" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Another Person
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="">{renderForm()}</div>;
};

export default RequestMoney;
