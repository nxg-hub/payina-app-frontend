import React, { useState } from 'react';
import cancelImg from '../../../assets/images/CancelSendMoney.png';
import { Link } from 'react-router-dom';
import progressLine from '../../../assets/images/Union.png';
import PayinaUser from './PayinaUser/index';
import AnotherBank from './AnotherBank/index';
import Beneficiaries from './BeneficiariesAccount/index';
import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
import anotherBankImg from '../../../assets/images/Group-AnotherBank.png';
import beneficiaryImg from '../../../assets/images/Group-beneficiaries.png';

const SendMoneySteps = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const renderForm = () => {
    switch (selectedForm) {
      case 'payinaUser':
        return <PayinaUser />;
      case 'anotherBank':
        return <AnotherBank />;
      case 'beneficiaries':
        return <Beneficiaries />;
      default:
        return (
          <div className="flex flex-col justify-center items-start xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
            <div className="flex flex-row justify-between items-left gap-[45rem]">
              <div className="text-xl md:text-3xl font-medium">Send Money</div>
              <Link to="/account/dashboard">
                <div className="cancelAction-img">
                  <img src={cancelImg} alt="cancelAction"></img>
                </div>
              </Link>
            </div>
            <div className="">
              <img src={progressLine} alt="progressLine"></img>
            </div>
            {/* <div className="item-center mt-5 mx-auto relative">
              <div className="">
                <img src={progressLine} alt="progressLine"></img>
              </div>
              <div className="color-input bg-[#006181] rounded-full px-3 py-3 absolute top-0"></div>
            </div> */}
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

