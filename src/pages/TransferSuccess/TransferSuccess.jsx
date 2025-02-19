import React from 'react';
import successImg from '../../assets/images/Group-successful.png';
import { Link } from 'react-router-dom';

const TransferSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 xl:pt-5 md:pt-5 mx-auto bg-blue-50 h-screen">
      <div className="mx-auto">
        <img src={successImg} alt="suceessImg"></img>
      </div>
      <div className="text-md md:text-xl font-medium">Transaction Successful</div>
      <Link to="/login">
        <button
          type="submit"
          className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
          Login
        </button>
      </Link>
    </div>
  );
};

export default TransferSuccess;
