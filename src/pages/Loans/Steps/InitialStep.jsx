import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiClock } from 'react-icons/fi';
import { CiBag1 } from 'react-icons/ci';
import { TbUserDollar } from 'react-icons/tb';
import { LuDot } from 'react-icons/lu';
import { closeModal } from '../../../Redux/modalSlice';

const InitialStep = ({ onNext }) => {
  const dispatch = useDispatch;
  const showModal = useSelector((state) => state.modal.modalOpen);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleContinue = () => {
    onNext();
    dispatch(closeModal());
  };
  if (!showModal) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className=" bg-gradient-to-br from-white via-blue-100 to-blue-300  rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] text-white">
        <div className="bg-[#005978]  w-full ">
          <h2 className="md:text-xl p-3  text-white font-bold">
            How we evaluate your loan application
          </h2>
        </div>
        <article className="border border-blue-300 px-3 pb-3 text-stone-900">
          <p className="mb-4 mt-2">
            Your loan offer is based on the following financial information:
          </p>
          <div className="flex items-center gap-2">
            <FiClock className="items-center text-[#005978]" />
            <p className="mb-4 font-bold">
              Your transaction history with Payina
              <span className="block text-sm font-normal">
                Higher loans with more payina transactions
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CiBag1 className="items-center text-[#005978]" />
            <p className="mb-4 font-bold">
              Your history with other borrowers
              <span className="block text-sm font-normal">
                Better credit history means better loans
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TbUserDollar className="items-center text-[#005978]" />
            <p className="mb-4 font-bold">
              Your Details
              <span className="block text-sm font-normal">
                Keep employment and bank statement updated
              </span>
            </p>
          </div>

          <div className="bg-red-100 text-red-800 font-bold p-2">
            <p className="flex text-sm">
              <LuDot size={30} />
              First-time loan offers range from N10,000.00 to N240,000.00
            </p>
            <p className="flex text-sm">
              <LuDot size={30} />A non-refundable fee of N500.00 is charged to process your loan
              application.
            </p>
          </div>
        </article>
        <p className="mt-2 text-sm font-normal text-stone-950">
          Repayment periods range from 61 days to 365 days with Annual Percentage Rates (APRs) from
          5% - 36%. Late repayment fees apply.
        </p>
        <div className="mt-5 w-full flex gap-3 items-center text-stone-950">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <p>
            I agree to the <span>Terms of use and Privacy Policy</span>
          </p>
        </div>
        <button
          onClick={handleContinue}
          disabled={!isChecked}
          className={`mt-4 m-auto bg-[#005978] ${isChecked ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}  text-white font-bold px-4 py-2 rounded `}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default InitialStep;
