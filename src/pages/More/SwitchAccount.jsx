import React from 'react';
import { images } from '../../constants';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SwitchAccount = ({ goBack }) => {
  return (
    <div className="flex flex-col justify-between lg:items-center items-start py-7 px-5 lg:px-0 ml-0 lg:ml-80 lg:py-28 pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[5rem] lg:gap-[45rem] pb-7">
        <div className="text-xl md:text-3xl font-medium">Switch Account</div>
        <div className="cancelAction-img mr-[5rem]" onClick={goBack}>
          <img src={images.BackIcon} alt="cancelAction"></img>
        </div>
      </div>
      <div className="text-center mt-5">
        <h1 className="text-2xl font-semibold text-neutral">Choose account type</h1>
        <p className="text-gray-500 text-wrap">
          Kindly choose the preferred account type to access.
        </p>
      </div>

      <div className="flex flex-col justify-between items-start mt-5">
        <Link to="/login">
          <div
            className="flex flex-row items-center justify-center gap-5 lg:gap-[5rem] lg:w-[550px] w-[340px] bg-lightBlue border border-yellow rounded-lg py-5 px-5 lg:px-10 hover:bg-secondary hover:text-white cursor-pointer transition-colors duration-200 shadow-sm mb-10"
            role="button"
            tabIndex={0}>
            {/* User Icon */}
            <svg
              className="w-6 h-6 text-yellow-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>

            <div>
              <h2 className="font-medium text-white">Personal account</h2>
              <p className="text-sm text-gray-200">Login to your Payina personal account</p>
            </div>
            {/* Chevron Right Icon */}
            <svg
              className="w-5 h-5 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>

        <Link to="/login">
          <div
             className="flex flex-row items-center justify-center gap-5 lg:gap-[5rem] lg:w-[550px] w-[340px] bg-lightBlue border border-yellow rounded-lg py-5 px-5 lg:px-10 hover:bg-secondary hover:text-white cursor-pointer transition-colors duration-200 shadow-sm mb-10"
            role="button"
            tabIndex={0}>
            {/* Building Icon */}
            <svg
              className="w-6 h-6 text-yellow-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4v18" />
              <path d="M19 21V11l-6-4" />
              <path d="M9 9h1" />
              <path d="M9 13h1" />
              <path d="M9 17h1" />
            </svg>

            <div>
              <h2 className="font-medium text-white">Business account</h2>
              <p className="text-sm text-gray-200">Login to your business account</p>
            </div>

            {/* Chevron Right Icon */}
            <svg
              className="w-5 h-5 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>
      </div>

      <div className="text-center text-neutral pt-8 mt-5">
        <p className="text-secondary font-medium">Payina Financial Services Limited</p>
        <p className="text-sm text-yellow">Licensed by the Central Bank of Nigeria (CBN)</p>
      </div>
    </div>
  );
};

export default SwitchAccount;

SwitchAccount.propTypes = {
  goBack: PropTypes.func.isRequired,
};
