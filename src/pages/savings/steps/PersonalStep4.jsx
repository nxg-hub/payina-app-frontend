import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../../Redux/modalSlice';

const PersonalStep4 = ({ data, onChange, onNext, onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.modalOpen);

  const handleCloseModal = () => {
    navigate('/account/dashboard');
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
    onBack();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="-[#005978] bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] text-white">
        <article className="text-center md:px-6 py-8  text-[#0F172A]">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Confirm Your Commitment</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            By proceeding, you acknowledge and agree to lock your savings for the selected duration.
            During this period, withdrawals will not be permitted until your chosen maturity date.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mt-3">
            This commitment helps you stay disciplined with your financial goals and ensures your
            funds grow steadily. We encourage you to only proceed if you're fully ready to commit.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mt-3">
            You will receive notifications as your savings maturity date approaches.
          </p>
          <p className="text-sm text-black mt-4 font-semibold">
            Your commitment today is a step toward financial freedom. 💰
          </p>
        </article>
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handleCancel}
            className="px-2 md:px-4 py-2 border  text-[#0F172A] border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={onNext}
            className="px-2 md:px-4 py-2 bg-[#006181] text-white rounded-md hover:bg-[#004f5f]">
            I Understand & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalStep4;
