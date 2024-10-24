import React from 'react';
import backArrow from '../../../../assets/images/Group-backArrow.png';

const EnterPin = ({ nextStep, prevStep }) => {
  return (
    <div className="flex flex-col justify-center items-center xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[45rem]">
        <div className="text-xl md:text-3xl font-medium">Send Money</div>
        <div className="flex flex-row gap-2 cancelAction-img" onClick={prevStep}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="transaction-pin flex flex-col justify-center items-center bg-[#D2D2D285] rounded-md py-[3rem] px-[5rem] mt-[5rem] gap-8">
        <span>Enter Transaction Pin</span>
        <div className="circle flex flex-row justify-center items-center gap-6">
          <input
            type="text"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            className="rounded-full border-2 border-lightBlue bg-[#D2D2D285] w-12 h-12 text-center text-lg"
          />
          <input
            type="text"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            className="rounded-full border-2 border-lightBlue bg-[#D2D2D285] w-12 h-12 text-center text-lg"
          />
          <input
            type="text"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            className="rounded-full border-2 border-lightBlue bg-[#D2D2D285] w-12 h-12 text-center text-lg"
          />
          <input
            type="text"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            className="rounded-full border-2 border-lightBlue bg-[#D2D2D285] w-12 h-12 text-center text-lg"
          />
        </div>
        <div className="flex mt-5 justify-center">
          <button
            type="submit"
            onClick={nextStep}
            className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[200px] text-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterPin;
