// AccountLimits.jsx
import React from 'react';
import { images } from '../../constants';
import PropTypes from 'prop-types';

const AccountLimits = ({ goBack }) => {
  const tiers = [
    {
      name: 'Basic Tier',
      description: 'Suitable for new users with minimal requirements.',
      limits: {
        dailyLimit: '₦50,000',
        monthlyLimit: '₦200,000',
        transactionLimit: '₦20,000',
      },
    },
    {
      name: 'Standard Tier',
      description: 'For users with moderate financial needs.',
      limits: {
        dailyLimit: '₦200,000',
        monthlyLimit: '₦1,000,000',
        transactionLimit: '₦100,000',
      },
    },
    {
      name: 'Premium Tier',
      description: 'Designed for high-value transactions and business users.',
      limits: {
        dailyLimit: '₦1,000,000',
        monthlyLimit: 'Unlimited',
        transactionLimit: '₦500,000',
      },
    },
  ];

  return (
    <div className="flex flex-col justify-between items-start py-7 px-5 lg:px-0 ml-0 lg:ml-80 lg:py-28 pt-10 mx-auto">
      <div className="flex flex-row justify-between items-start md:gap-[15rem] gap-[5rem] lg:gap-[45rem] pb-7">
        <div className="text-xl md:text-3xl font-medium">Account Limits</div>
        <div className="cancelAction-img" onClick={goBack}>
          <img src={images.BackIcon} alt="cancelAction"></img>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <div className="text-black ml-2 text-sm lg:text-lg lg:text-center">
          Choose your preferred account tier to unlock higher transaction limits and additional
          features.
        </div>

        <div className="flex lg:flex-row flex-col gap-5 my-0 mt-3 lg:my-5 mx-0 lg:mx-5 p-0 lg:p-5">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="flexItem flex flex-col gap-8 bg-[#eeeeee] text-black p-7 hover:bg-[#006180] hover:text-white rounded-lg shadow-md flex-1 min-h-[300px]">
              <h2 className="text-2xl font-semibold">{tier.name}</h2>
              <span className="mt-2 text-yellow">{tier.description}</span>
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-row justify-between items-start">
                  <h2>Daily Limit:</h2>
                  <span>{tier.limits.dailyLimit}</span>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <h2>Monthly Limit:</h2>
                  <span>{tier.limits.monthlyLimit}</span>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <h2 className="text-nowrap">Per Transaction Limit:</h2>
                  <span className="text-nowrap">{tier.limits.transactionLimit}</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-full text-xs md:text-base py-[10px] px-[30px] border border-lightBlue bg-yellow hover:bg-[#FFb950] text-black hover:bg-yellow-400 transition-all transform hover:scale-105 animate-bounce">
                  Upgrade Account
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountLimits;

AccountLimits.propTypes = {
  goBack: PropTypes.func.isRequired,
};
