import React from 'react';
import PropTypes from 'prop-types';

const ReviewTransaction = ({ data, nextStep }) => {
  return (
    <div className="flex flex-col justify-between items-left">
      <div className="text-md lg:text-xl font-medium mt-5">Review Transaction Details</div>
      <div className="flex flex-col items-left justify-between gap-4 bg-[#EBEBEB] rounded-md py-5 px-2 lg:py-10 lg:px-14 mt-5">
        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Receiver Name</div>
          <div className="text-md font-medium">{data.selectedBeneficiaryName}</div>
        </div>

        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Trannsaction Amount</div>
          <div className="text-md font-medium">{data.amount}</div>
        </div>

        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Currency</div>
          <div className="text-md font-medium">{data.currency}</div>
        </div>

        <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
          <div className="text-md font-medium">Transaction Purpose</div>
          <div className="text-md font-medium">{data.purpose}</div>
        </div>
      </div>
      <div className="flex justify-end mt-5 ml-[5rem] lg:ml-[22rem]">
        <button
          type="submit"
          onClick={nextStep}
          className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[250px] lg:mr-0 mr-5 lg:w-[300px] text-primary">
          Next
        </button>
      </div>
    </div>
  );
};

ReviewTransaction.propTypes = {
  data: PropTypes.shape({
    selectedBeneficiaryName: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
  }).isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default ReviewTransaction;
