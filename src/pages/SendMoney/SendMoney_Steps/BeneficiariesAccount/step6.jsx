import React from 'react';
import { Link } from 'react-router-dom';
import DeclineImg from '../../../../assets/images/Group 10275-decline.png';
import PropTypes from 'prop-types';

const DeclinePage = ({ errorMessage }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 xl:ml-80 xl:pt-12 md:pt-10 mx-auto">
      <div className="img">
        <img src={DeclineImg} alt="suceessImg"></img>
      </div>
      <div className="text-md md:text-xl font-medium">Transaction Failed</div>
      {errorMessage && <div className="text-red-500 text-center p-2 max-w-sm">{errorMessage}</div>}
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

export default DeclinePage;

DeclinePage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};