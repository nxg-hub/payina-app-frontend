import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../../Redux/modalSlice';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { fetchSavings } from '../../../Redux/savingsSlice';

const PersonalStep4 = ({ data, onNext, onBack }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.modalOpen);
  const savings = useSelector((state) => state.savings.savings);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(true);
  const [shouldFund, setShouldFund] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');

  const handleCancel = () => {
    dispatch(closeModal());
    onBack();
  };

  const handleFunding = async (savingItem) => {
    const payload = {
      fundAmount: savingItem.fundAmount,
      savingsId: savingItem.id,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FUND_SAVINGS}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        dispatch(fetchSavings(newAuthToken));
        onNext();
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setUploadStatus('Something went wrong while funding!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setUploadStatus('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CREATE_SAVINGS}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        dispatch(fetchSavings(newAuthToken));
        setShouldFund(true);
      } else {
        setUploadStatus('Something went wrong while creating savings.');
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setUploadStatus('Something went wrong while creating savings.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFund && savings.length > 0) {
      const match = savings.find(
        (saving) => saving.goalName.trim().toLowerCase() === data.goalName.trim().toLowerCase()
      );
      if (match) {
        handleFunding(match);
        setShouldFund(false);
      }
    }
  }, [savings, shouldFund]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] text-white">
        <article className="text-center md:px-6 py-8 text-[#0F172A]">
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

        {uploadStatus && <p className="text-red-500 text-center">{uploadStatus}</p>}

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handleCancel}
            className="px-2 md:px-4 py-2 border text-[#0F172A] border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-2 md:px-4 py-2 bg-[#006181] text-white rounded-md hover:bg-[#004f5f]">
            {loading ? 'Processing...' : 'I Understand & Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalStep4;
