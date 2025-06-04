import React, { useState } from 'react';
const loanPurpose = [
  { id: 0, value: 'Education' },
  { id: 1, value: 'Refinance' },
  { id: 2, value: 'Home Equity' },
  { id: 3, value: 'Mortgage' },
  { id: 4, value: 'Others' },
];

const duration = [
  { id: 0, value: '1 Month' },
  { id: 1, value: '6 Months' },
  { id: 2, value: '1 Year' },
  { id: 3, value: '2 Years' },
];
const Step1 = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!data.purpose) newErrors.purpose = 'Please select a loan purpose';
    if (!data.amount) newErrors.amount = 'Amount is required';
    if (!data.duration) newErrors.duration = 'Please select a loan purpose';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md mt-[50px] m-auto md:w-[50%]  ">
      <div>
        <label className="block font-bold">Loan Purpose</label>
        <select
          id="purpose"
          name="purpose"
          value={data.purpose}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
          <option value="">Select purpose</option>
          {loanPurpose.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>

        {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
      </div>
      <div>
        <label className="block font-bold">Loan Amount</label>
        <input
          type="number"
          name="amount"
          value={data?.amount}
          onChange={onChange}
          placeholder="Enter Amount"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
          required
        />

        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
      </div>

      <div>
        <label className="block font-bold">Loan Duration</label>
        <select
          id="duration"
          name="duration"
          value={data.duration}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
          <option value="">Select Duration</option>
          {duration.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>

        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
      </div>
      <button
        onClick={handleNext}
        className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
        Next →
      </button>
    </div>
  );
};

export default Step1;
