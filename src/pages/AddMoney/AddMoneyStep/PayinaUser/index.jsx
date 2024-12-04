import React, { useState } from 'react';
import backArrow from '../../../../assets/images/Group-backArrow.png';
import PhoneNumber from './phoneNumber';
import PayinaTag from './payinaTag';

const PayinaDetails = ({ backClick }) => {
  const [activeForm, setActiveForm] = useState('payinaTag');

  const renderForm = () => {
    if (activeForm === 'payinaTag') {
      return <PayinaTag />;
    } else if (activeForm === 'phoneNumber') {
      return <PhoneNumber />;
    }
  };
  return (
    <div className="flex flex-col justify-center items-start gap-7 ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[45rem]">
        <div className="text-xl md:text-3xl">Request Money</div>
        <div className="flex flex-row gap-2 cancelAction-img cursor-pointer" onClick={backClick}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="flex flex-row gap-4 cursor-pointer">
        <div
          className="text-center font-bold text-md xl:text-[18px] hover:border-b-2 border-lightBlue"
          onClick={() => setActiveForm('payinaTag')}>
          Payina Tag
        </div>
        <div
          className="text-center font-bold text-md xl:text-[18px] hover:border-b-2 border-lightBlue"
          onClick={() => setActiveForm('phoneNumber')}>
          Phone Number
        </div>
      </div>
      <div className="form-container">{renderForm()}</div>
    </div>
  );
};

export default PayinaDetails;
