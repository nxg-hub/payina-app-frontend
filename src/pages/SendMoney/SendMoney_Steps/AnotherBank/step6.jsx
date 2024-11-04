import React from 'react';
import backArrow from '../../../../assets/images/Group-backArrow.png';
import DeclineImg from '../../../../assets/images/Group 10275-decline.png';

const DeclinePage = () => {
  return (
    <div className="flex flex-col justify-center items-start xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="text-xl md:text-3xl font-medium text-left">Send Money</div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="img">
          <img src={DeclineImg} alt="suceessImg"></img>
        </div>
        <div className="text-md md:text-xl font-medium">Transaction Failed</div>
        <button
          type="submit"
          className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeclinePage;
