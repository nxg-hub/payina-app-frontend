import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaPiggyBank } from 'react-icons/fa';

const SuccessSavingsModal = () => {
  const navigate = useNavigate();

  const handleGoToSavings = () => {
    navigate('/mysavings');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-2xl p-8 w-[90%] max-w-md text-center animate__animated animate__fadeInUp">
        <div className="flex flex-col items-center">
          <AiOutlineCheckCircle className="text-green-500 text-6xl mb-3" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations! 🎉</h2>
          <FaPiggyBank className="text-[#FF9900] text-5xl mb-4" />
        </div>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Your savings account has been{' '}
          <span className="font-semibold text-green-600">successfully funded</span>. You're now one
          step closer to your financial goals!
        </p>

        <p className="text-sm text-gray-600 mb-6">
          Keep saving, stay consistent, and watch your money grow 💸
        </p>

        <button
          onClick={handleGoToSavings}
          className="mt-2 bg-[#006181] hover:bg-[#004f5f] text-white px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105">
          View My Savings
        </button>
      </div>
    </div>
  );
};

export default SuccessSavingsModal;
