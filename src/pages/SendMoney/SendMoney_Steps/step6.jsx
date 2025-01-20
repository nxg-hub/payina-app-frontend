import React from 'react';
import { Link } from 'react-router-dom';
import DeclineImg from '../../../assets/images/Group 10275-decline.png';
import PropTypes from 'prop-types';

const DeclinePage = ({ errorMessage }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mx-auto">
      <div className="img">
        <img className="w-full h-[300px]" src={DeclineImg} alt="suceessImg"></img>
      </div>
      <div className="text-md md:text-xl font-medium">Transaction Failed</div>
      {errorMessage && <div className="text-red-500 text-center p-2 max-w-sm">{errorMessage}</div>}
      <div className="flex flex-row gap-4 items-center">
        <Link to="/addMoney">
          <button
            type="submit"
            className="rounded-[5px] text-xs md:text-base py-2 px-[30px] border border-lightBlue bg-lightBlue text-primary">
            FundWallet
          </button>
        </Link>
        <Link to="/account/dashboard">
          <button
            type="submit"
            className="rounded-[5px] text-xs md:text-base py-2 px-[25px] border border-lightBlue bg-lightBlue text-primary">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

DeclinePage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default DeclinePage;
