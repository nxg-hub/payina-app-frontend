import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ReviewTransaction = ({ data, nextStep }) => {
  return (
    <div className="flex flex-col justify-between items-left">
      <div className="text-md md:text-xl font-medium mt-5">Review Transaction Details</div>
      <div className="flex flex-col items-left justify-between gap-4 bg-[#EBEBEB] rounded-md py-5 px-5 lg:py-10 lg:px-14 mt-5">
        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Receiver Name</div>
          <div className="text-md font-medium">
            {`${data.firstName} ${data.lastName}`}
          </div>
        </div>

        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Transaction Amount</div>
          <div className="text-md font-medium">{data.amount}</div>
        </div>

        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Transaction Purpose</div>
          <div className="text-md font-medium">{data.purpose}</div>
        </div>
      </div>
      <div className="flex justify-end mt-5 lg:ml-[22rem] ml-[5rem]">
        <button
          type="submit"
          onClick={nextStep}
          className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[250px] lg:mr-0 mr-5 lg:w-[300px] text-primary">
          Next
        </button>
      </div>
    </div>
  );
};

ReviewTransaction.propTypes = {
  data: PropTypes.shape({
    payinaTag: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default ReviewTransaction;
