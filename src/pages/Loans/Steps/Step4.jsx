import React, { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchLoan } from '../../../Redux/loanSlice';

const Step4 = ({ data, onBack, onNext }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  console.log(data);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      currency: 'NGN',
    }).format(amount);
  };

  function formatPrettyDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];

    // Get ordinal suffix
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  }

  const today = new Date().toISOString().split('T')[0];
  const handleLoanSubmit = async () => {
    setLoading(true);
    setUploadStatus('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOAN_APPLY}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      if (response.ok || response.status === 200) {
        dispatch(fetchLoan({ newAuthToken }));
        onNext();
      } else {
        setUploadStatus('Something went wrong. Please try again later');
      }
    } catch (error) {
      console.log(error);

      // setUploadStatus(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md mt-[100px] m-auto md:w-[40%] ">
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-3">Confirm Your Details</h2>
        <p className="flex justify-between">
          <strong>Loan Purpose:</strong> {data?.loanPurpose}
        </p>

        <p className="flex justify-between">
          <strong>Loan Amount:</strong> ₦{formatCurrency(data?.loanAmount)}
        </p>

        <p className="flex justify-between">
          <strong>Interest Rate:</strong>10% Per Annum
        </p>
        <p className="flex justify-between">
          <strong>Estimated Interest:</strong>₦{formatCurrency(0.1 * data?.loanAmount)}
        </p>
        <p className="flex justify-between">
          <strong>Total:</strong> ₦
          {formatCurrency(0.1 * Number(data?.loanAmount) + Number(data?.loanAmount))}
        </p>
        <p className="flex justify-between ">
          <strong> Duration:</strong>

          <span>
            {data?.loanDuration}
            <span className="pl-2">{data.loanDuration === '1' ? 'Month' : 'Months'}</span>
          </span>
        </p>
        <p className="flex justify-between">
          <strong> Loan Date:</strong> {formatPrettyDate(today)}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition">
          ← Back
        </button>
        <button
          onClick={handleLoanSubmit}
          className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
          {loading ? 'processing...' : 'Submit'}
        </button>
      </div>
      {uploadStatus && <p className="text-red-500">{uploadStatus}</p>}
    </div>
  );
};

export default Step4;
