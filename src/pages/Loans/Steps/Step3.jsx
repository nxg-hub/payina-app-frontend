import { duration } from '@mui/material';
import React, { useState } from 'react';

const Step3 = ({ data, onBack, onNext }) => {
  function parseDurationAndCalculateDate(durationString) {
    const [numberStr, unit] = durationString.split(' ');
    const number = parseInt(numberStr, 10);
    const durationInMonths = unit.toLowerCase().includes('year') ? number * 12 : number;

    const date = new Date();
    date.setMonth(date.getMonth() + durationInMonths);
    return formatPrettyDate(date); // Reuse your date formatting function
  }

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

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md mt-[100px] m-auto md:w-[40%] ">
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-3">Confirm Your Details</h2>
        <p className="flex justify-between">
          <strong>Loan Purpose:</strong> {data?.purpose}
        </p>

        <p className="flex justify-between">
          <strong>Loan Amount:</strong> ₦{formatCurrency(data?.amount)}
        </p>

        <p className="flex justify-between">
          <strong>Interest Rate:</strong>10% Per Annum
        </p>
        <p className="flex justify-between">
          <strong>Estimated Interest:</strong>₦{formatCurrency(0.1 * data?.amount)}
        </p>
        <p className="flex justify-between">
          <strong>Total:</strong> ₦
          {formatCurrency(0.1 * Number(data?.amount) + Number(data?.amount))}
        </p>
        <p className="flex justify-between">
          <strong> Duration:</strong> {data?.duration}
        </p>
        <p className="flex justify-between">
          <strong> Loan Date:</strong> {formatPrettyDate(today)}
        </p>
        <p className="flex justify-between">
          <strong> Repayment Date:</strong> {parseDurationAndCalculateDate(data?.duration)}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition">
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
