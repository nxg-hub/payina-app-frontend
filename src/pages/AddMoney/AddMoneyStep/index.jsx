import React, { useState } from 'react';
import backArrow from '../../../assets/images/Group-backArrow.png';
import { Link } from 'react-router-dom';
import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
import anotherPersonImg from '../../../assets/images/Group-AnotherPerson.png';
import RequestMoney from './requestMoney';
import AccountDetails from './AccountDetails';
import FundWallet from './fundWallet';

const AddMoney = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const goBack = () => {
    setSelectedForm(null);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'accountDetails':
        return <AccountDetails goBack={goBack} />;
      case 'fundWallet':
        return <FundWallet goBack={goBack} />;
      case 'requestMoney':
        return <RequestMoney goBack={goBack} />;
      default:
        return (
          <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
            <div className="flex flex-row justify-between items-left gap-[45rem]">
              <div className="text-xl md:text-3xl">Add Money</div>
              <Link to="/account/dashboard">
                <div className="flex flex-row gap-2 cancelAction-img cursor-pointer">
                  <img src={backArrow} alt="cancelAction"></img>
                  <div className="text-md text-center mt-2">Back</div>
                </div>
              </Link>
            </div>
            <div className="text-md md:text-xl font-bold mt-12">How do you want to add money?</div>
            <div
              onClick={() => setSelectedForm('accountDetails')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={payinaUserImg} alt="payrollSelect" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Payina Account Details
              </div>
            </div>
            <div
              onClick={() => setSelectedForm('fundWallet')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-20 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={anotherPersonImg} alt="payrollSelect" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Fund With Card
              </div>
            </div>
            <div
              onClick={() => setSelectedForm('requestMoney')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-20 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
              <div className="border border-yellow rounded-full p-3">
                <img src={anotherPersonImg} alt="payrollSelect" />
              </div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                Request Money
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="">{renderForm()}</div>;
};

export default AddMoney;
