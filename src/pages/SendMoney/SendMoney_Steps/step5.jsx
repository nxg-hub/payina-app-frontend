import React from 'react';
import successImg from '../../../assets/images/Group-successful.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SuccessPage = () => {
  //getting the userDetails  from the store
  const userDetails = useSelector((state) => state.user.user);
  const userType = userDetails.userType;
  return (
    <div className="flex flex-col justify-center items-center gap-2 xl:ml-80 xl:pt-12 md:pt-10 mx-auto">
      <div className="img">
        <img src={successImg} alt="suceessImg"></img>
      </div>
      <div className="text-md md:text-xl font-medium">
        {userType === 'CORPORATE'
          ? 'Transfer request sent for approval to signatories'
          : 'Transaction Successful'}
      </div>
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

export default SuccessPage;
