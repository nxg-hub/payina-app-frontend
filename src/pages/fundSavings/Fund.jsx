import React, { useState } from 'react';
import backArrow from '../../assets/images/Group-backArrow.png';
import { BsBank } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import SuccessSavingsModal from '../savings/_components/SuccessSavingsModal';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavings } from '../../Redux/savingsSlice';
const Fund = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const savingsId = useSelector((state) => state.savings.savingsId);
  const goalName = useSelector((state) => state.savings.savingsName);
  const currentBalance = useSelector((state) => state.wallet?.wallet?.data?.balance?.amount);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [formData, setFormData] = useState({
    fundAmount: '',
    savingsId: savingsId,
  });

  const formatCurrency = (amount) => {
    const number = parseFloat(amount.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/[^0-9]/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : '';
    const formatted = rawValue ? formatCurrency(rawValue) : '';

    setValue(formatted);

    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  };
  const backButtonClick = () => {
    navigate('/mysavings');
  };
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const fundPlan = async () => {
    if (formData.fundAmount > currentBalance) {
      setUploadStatus(`Fund Amount is greater than available balance. Balance:₦${currentBalance}`);
      return;
    }
    if (formData.fundAmount === '') {
      setUploadStatus('required');
      return;
    }
    setLoading(true);
    setUploadStatus('');
    try {
      // Example of an API call to authenticate the user
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_FUND_SAVINGS}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        dispatch(fetchSavings(newAuthToken));
        nextStep();
      }
    } catch (error) {
      console.log(error);
      setUploadStatus('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  return (
    <div className=" mx-auto p-6 px-4 py-4  w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right rounded">
      <div
        className={`${'flex flex-row gap-2 items-center cancelAction-img cursor-pointer'}`}
        onClick={backButtonClick}>
        <img src={backArrow} alt="cancelAction"></img>

        <h2 className="text-md md:text-2xl font-semibold ml-5">Fund Goal</h2>
      </div>
      {currentStep === 0 && (
        <>
          <div className="max-w-md mx-auto mt-28 p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-2xl text-center space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-800"> Fund {goalName} Savings</h2>
            <p className="text-gray-600 text-sm">Fund your savings goal with</p>

            <button
              onClick={() => nextStep()}
              className="flex items-center justify-center gap-3 w-full p-4 bg-[#00678F] hover:bg-[#005978] text-white rounded-full font-semibold shadow-md transition-transform transform hover:scale-105">
              <BsBank size={24} className="text-white" />
              Your Payina Account
            </button>
            <span className="text-sm">
              Fund your savings goal directly from your mintyn account
            </span>
          </div>
        </>
      )}
      {currentStep === 1 && (
        <div className="max-w-md mx-auto mt-28 p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-2xl text-center space-y-4">
          <label className="block font-bold">Fund Amount</label>
          <input
            type="text"
            name="fundAmount"
            value={value || formData?.fundAmount}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
            required
          />

          {uploadStatus && (
            <p className="text-red-500 text-sm text-justify !mt-[-1px]">{uploadStatus}</p>
          )}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition">
              ← Back
            </button>
            <button
              onClick={fundPlan}
              className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
              {loading ? 'loading...' : 'Fund Plan'}
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && <SuccessSavingsModal />}
    </div>
  );
};

export default Fund;
