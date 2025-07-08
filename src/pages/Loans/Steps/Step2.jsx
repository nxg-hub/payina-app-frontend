import React, { useState } from 'react';

const Step2 = ({ data, onChange, onBack, onNext }) => {
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [errors, setErrors] = useState({});
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

    onChange('monthlySalary', numericValue);
  };
  const validate = () => {
    const newErrors = {};
    if (!data.employmentStatus) newErrors.employmentStatus = 'required';
    if (employmentStatus === 'employed' || employmentStatus === 'self-employed') {
      if (!data.companyName) newErrors.companyName = 'required';
      if (!data.employmentStartDate) newErrors.employmentStartDate = 'required';
      if (!data.monthlySalary) newErrors.monthlySalary = 'required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSelectChange = (e) => {
    if (employmentStatus === 'unemployed' || employmentStatus === 'retired') {
      onChange('companyName', null);
      onChange('employmentStartDate', null);
      onChange('monthlySalary', 0);
    }
    const { name, value } = e.target;
    setEmploymentStatus(value);
    onChange(name, value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md mt-[100px] m-auto md:w-[50%]">
      <div className="">
        <label htmlFor="employmentStatus" className="block mb-2 font-semibold">
          What's your current employment status
        </label>
        <select
          id="employmentStatus"
          name="employmentStatus"
          value={data.employmentStatus}
          onChange={handleSelectChange}
          className="w-full p-2  px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
          <option value="">-- Select Employment Status --</option>
          <option value="employed">Employed</option>
          <option value="self-employed">Self-Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="retired">Retired</option>
        </select>
      </div>
      {(employmentStatus === 'employed' || employmentStatus === 'self-employed') && (
        <>
          <div>
            <label className="block font-semibold">What's your company name?</label>
            <input
              type="text"
              name="companyName"
              value={data?.companyName}
              onChange={(e) => {
                onChange('companyName', e.target.value);
              }}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
              required
            />

            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">When did you start to work there? </label>
            <input
              type="date"
              name="employmentStartDate"
              value={data?.employmentStartDate}
              onChange={(e) => {
                onChange('employmentStartDate', e.target.value);
              }}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
              required
            />

            {errors.employmentStartDate && (
              <p className="text-red-500 text-sm mt-1">{errors.employmentStartDate}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold">How much do you earn per month? </label>
            <input
              type="text"
              name="monthlySalary"
              value={value || data?.monthlySalary}
              onChange={handleChange}
              placeholder="100,000"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
              required
            />

            {errors.monthlySalary && (
              <p className="text-red-500 text-sm mt-1">{errors.monthlySalary}</p>
            )}
            <p className="text-sm mt-2">
              We ask about your income so we can better understand your needs. This is just between
              us.
            </p>
          </div>
        </>
      )}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition">
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step2;
