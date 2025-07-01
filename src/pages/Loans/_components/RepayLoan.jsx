import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoan, fetchLoanSchedule } from '../../../Redux/loanSlice';
import useLocalStorage from '../../../hooks/useLocalStorage';

const RepayLoan = ({ setModal, setAction }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const currentBalance = useSelector((state) => state.wallet?.wallet?.data?.balance?.amount);
  const loanId = useSelector((state) => state.loan.loanId);
  const loanName = useSelector((state) => state.loan.loanName);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [formData, setFormData] = useState({
    loanId: loanId,
    amount: '',
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

  const repayLoan = async () => {
    if (formData.amount > currentBalance) {
      setUploadStatus(`Amount is greater than available balance. Balance:₦${currentBalance}`);
      return;
    }
    if (formData.amount === '') {
      setUploadStatus('required');
      return;
    }
    setSuccess('');
    setLoading(true);
    setUploadStatus('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REPAY_LOAN}`,
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
        setSuccess('loan repaid successfully.');
      } else {
        setUploadStatus('Something went wrong.');
      }
    } catch (error) {
      console.log(error);
      setUploadStatus('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="max-w-md mx-auto mt-28 p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-2xl text-center space-y-4">
        <h2 className="text-stone-700"> Loan repayment for {loanName}</h2>
        <label className="block font-normal"> Amount</label>
        <input
          type="text"
          name="amount"
          value={value || formData?.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
          required
        />

        {uploadStatus && (
          <p className="text-red-500 text-sm text-justify !mt-[-1px]">{uploadStatus}</p>
        )}
        {success && <p className="text-green-500 text-sm text-justify !mt-[-1px]">{success}</p>}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setModal(false);
              dispatch(fetchLoan({ newAuthToken }));
              dispatch(fetchLoanSchedule({ newAuthToken, id: loanId }));
              setAction(false);
            }}
            className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition">
            Close
          </button>
          <button
            onClick={repayLoan}
            className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
            {loading ? 'Processing...' : 'Repay loan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepayLoan;
