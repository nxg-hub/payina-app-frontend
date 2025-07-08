import React, { useEffect, useState } from 'react';
const loanPurpose = [
  { id: 0, value: 'Education' },
  { id: 1, value: 'Car' },
  { id: 2, value: 'Business' },
  { id: 3, value: 'House' },
  { id: 4, value: 'Others' },
];

const duration = [
  { id: 0, value: 1, text: '1 Month' },
  { id: 1, value: 6, text: '6 Month' },
  { id: 2, value: 12, text: '1 Year' },
  { id: 3, value: 24, text: '2 Years' },
];
const Step1 = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState({});
  const [purpose, setPurpose] = useState('');
  const [value, setValue] = useState('');

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

    onChange('loanAmount', numericValue);
  };

  const validate = () => {
    const newErrors = {};
    if (!data.loanPurpose) newErrors.loanPurpose = 'Please select a loan purpose';
    if (data.loanPurpose === 'Others') newErrors.customPurpose = 'required';
    if (!data.loanAmount) newErrors.loanAmount = 'loan amount is required';
    if (!data.loanDuration) newErrors.loanDuration = 'Please select loan duration';

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
          id="loanPurpose"
          name="loanPurpose"
          value={data.loanPurpose}
          onChange={(e) => {
            onChange('loanPurpose', e.target.value);
            setPurpose(e.target.value);
          }}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
          <option value="">Select loan Purpose</option>
          {loanPurpose.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>

        {errors.loanPurpose && <p className="text-red-500 text-sm mt-1">{errors.loanPurpose}</p>}
      </div>
      {purpose === 'Others' && (
        <div>
          <label className="block font-bold">Enter Purpose</label>
          <input
            type="text"
            name="customPurpose"
            value={data.loanPurpose === 'Others' ? '' : data.loanPurpose}
            onChange={(e) => {
              onChange('loanPurpose', e.target.value);
            }}
            placeholder="Enter loan purpose"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
            required
          />
          {errors.customPurpose && (
            <p className="text-red-500 text-sm mt-1">{errors.customPurpose}</p>
          )}
        </div>
      )}

      <div>
        <label className="block font-bold">Loan Amount</label>
        <input
          type="text"
          name="loanAmount"
          value={value || data?.loanAmount}
          onChange={handleChange}
          placeholder="Enter loanAmount"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
          required
        />

        {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>}
      </div>

      <div>
        <label className="block font-bold">Loan duration</label>
        <select
          id="loanDuration"
          name="loanDuration"
          value={data.loanDuration}
          onChange={(e) => {
            onChange('loanDuration', e.target.value);
          }}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
          <option value="">Select loan duration</option>
          {duration.map((item) => (
            <option key={item.id} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>

        {errors.loanDuration && <p className="text-red-500 text-sm mt-1">{errors.loanDuration}</p>}
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
