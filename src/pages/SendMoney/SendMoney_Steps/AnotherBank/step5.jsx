import React from 'react';
import successImg from '../../../../assets/images/Group-successful.png';
import { Link } from 'react-router-dom';

const SuccessPage = ({ prevStep }) => {
  return (
    <div className="flex flex-col justify-center xl:ml-80 xl:pt-28 md:pt-10 mx-auto gap-5">
      <div className="text-xl md:text-3xl font-medium text-left">Send Money</div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="img">
          <img src={successImg} alt="suceessImg"></img>
        </div>
        <div className="text-md md:text-xl font-medium">Transaction Successful</div>
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

export default SuccessPage;
