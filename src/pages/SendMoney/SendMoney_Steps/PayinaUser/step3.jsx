import React from 'react';
import backArrow from '../../../../assets/images/Group-backArrow.png';
import progressLine from '../../../../assets/images/Union.png';
import PropTypes from 'prop-types';

const ReviewTransaction = ({ data, nextStep, prevStep }) => {
  return (
    <div className="flex flex-col justify-center items-start xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[45rem]">
        <div className="text-xl md:text-3xl font-medium">Send Money</div>
        <div className="flex flex-row gap-2 cancelAction-img" onClick={prevStep}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="item-center mt-5 mx-auto">
        <img src={progressLine} alt="progressLine"></img>
      </div>
      <div className="text-md md:text-xl font-medium mt-5">Review Transaction Details</div>
      <div className="flex flex-col items-left justify-between gap-4 bg-[#EBEBEB] rounded-md py-10 px-14 mt-5">
        <div className="flex flex-row justify-between gap-[20rem]">
          <div className="text-md font-medium">Receiver Name</div>
          <div className="text-md font-medium">{data.payinaTag}</div>
        </div>

        <div className="flex flex-row justify-between gap-[20rem]">
          <div className="text-md font-medium">Trannsaction Amount</div>
          <div className="text-md font-medium">{data.amount}</div>
        </div>

        <div className="flex flex-row justify-between gap-[20rem]">
          <div className="text-md font-medium">Transaction Purpose</div>
          <div className="text-md font-medium">{data.purpose}</div>
        </div>
      </div>
      <div className="flex justify-end mt-5 ml-[22rem]">
        <button
          type="submit"
          onClick={nextStep}
          className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
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
  }).isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default ReviewTransaction;
