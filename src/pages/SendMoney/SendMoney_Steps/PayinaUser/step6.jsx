import React from 'react';
import DeclineImg from '../../../../assets/images/Group 10275-decline.png';
import { Link } from 'react-router-dom';

const DeclineMessage = () => {
  return (
    <div className="flex flex-col justify-center xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="text-xl md:text-3xl font-medium text-left">Send Money</div>
      <div className="main-message flex flex-col justify-center items-center gap-2 mt-10">
        <div className="img">
          <img src={DeclineImg} alt="suceessImg"></img>
        </div>
        <div className="text-md md:text-xl font-medium">Transaction Failed</div>
        <Link to="/account/dashboard">
          <button
            type="submit"
            className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DeclineMessage;
