import React from 'react';
import { Link } from 'react-router-dom';
import DeclineImg from '../../../assets/images/Group 10275-decline.png';

const RequestDecline = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 xl:ml-80 xl:pt-12 md:pt-10 mx-auto">
      <div className="img">
        <img src={DeclineImg} alt="suceessImg"></img>
      </div>
      <div className="text-md md:text-xl font-medium">Reuest Failed</div>
      <Link to="/account/dashboard">
        <button
          type="submit"
          className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default RequestDecline;
