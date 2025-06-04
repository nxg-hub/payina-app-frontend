import React, { useState } from 'react';

const Step2 = ({ data, onChange, onBack, onNext }) => {
  const [employmentStatus, setEmploymentStatus] = useState('');

  const handleChange = (e) => {
    setEmploymentStatus(e.target.value);
  };
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md mt-[100px] m-auto md:w-[50%]">
      <div className="">
        <label htmlFor="employmentStatus" className="block mb-2 font-semibold">
          What's your current employment status
        </label>
        <select
          id="employmentStatus"
          value={employmentStatus}
          onChange={handleChange}
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
              name="amount"
              //   value={data?.amount}
              onChange={onChange}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
              required
            />

            {/* {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>} */}
          </div>
          <div>
            <label className="block font-semibold">When did you start to work there? </label>
            <input
              type="date"
              name="amount"
              //   value={data?.amount}
              onChange={onChange}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
              required
            />

            {/* {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>} */}
          </div>
          <div>
            <label className="block font-semibold">How much do you earn per month? </label>
            <input
              type="number"
              name="amount"
              //   value={data?.amount}
              onChange={onChange}
              placeholder="100,000"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
              required
            />

            {/* {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>} */}
            <p className="text-sm mt-2">
              We ask about your income so we can better understand your needs. This just between us.
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
          onClick={onNext}
          className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step2;
