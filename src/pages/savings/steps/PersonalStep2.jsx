import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const frequency = [
  { id: 0, value: 'DAILY' },
  { id: 1, value: 'WEEKLY' },
  { id: 2, value: 'MONTHLY' },
  { id: 3, value: 'QUARTERLY' },
  { id: 4, value: 'SIX_MONTHS' },
  { id: 5, value: 'YEARLY' },
];

export default function PersonalStep2({ data, onChange, onNext, onBack }) {
  const currentBalance = useSelector((state) => state.wallet?.wallet?.data?.balance?.amount);
  const [activeTab, setActiveTab] = useState('Automatic');
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
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : '';
    const formatted = rawValue ? formatCurrency(rawValue) : '';

    setValue(formatted);
    onChange('fundAmount', numericValue);
  };

  const validate = () => {
    const newErrors = {};
    if (activeTab === 'Automatic') {
      if (!data.fundFrequency) newErrors.fundFrequency = 'Required';
      if (!data.autoStartDate) newErrors.autoStartDate = 'Required';
      if (!data.fundAmount) newErrors.fundAmount = 'Required';
      if (data.fundAmount > currentBalance)
        newErrors.fundAmount = `Fund Amount is greater than available balance. Balance:₦${currentBalance}`;
    } else {
      if (!data.fundAmount) newErrors.fundAmount = 'Required';
      if (data.fundAmount < 100) newErrors.fundAmount = 'minimum fund amount is ₦100';
      if (data.fundAmount > currentBalance)
        newErrors.fundAmount = `Fund Amount is greater than available balance. Balance:₦${currentBalance}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  useEffect(() => {
    if (data.fundAmount !== undefined && data.fundAmount !== null) {
      setValue(formatCurrency(data.fundAmount.toString()));
    }
  }, [data.fundAmount]);
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="font-semibold mt-4 text-center ">Fund this goal</h2>
      <div className="flex w-[70%] m-auto justify-between mt-4 mb-2 shadow-md rounded-3xl p-2">
        <div
          onClick={() => {
            setActiveTab('Automatic');
          }}
          className={`${activeTab === 'Automatic' ? 'bg-[#006181] text-white' : ''} cursor-pointer w-[50%] rounded-2xl text-center py-1 `}>
          Automatic
        </div>
        <div
          onClick={() => {
            setActiveTab('Manual');
            onChange('fundFrequency', null);
            onChange('autoStartDate', null);
          }}
          className={`${activeTab === 'Manual' ? 'bg-[#006181] text-white' : ''} cursor-pointer w-[50%] rounded-2xl text-center py-1`}>
          Manual
        </div>
      </div>
      {activeTab === 'Automatic' && (
        <p className="text-xs text-stone-500">
          This means your account will be debited automatically at specific intervals beginning from
          the selected start date.
        </p>
      )}
      {activeTab === 'Manual' && (
        <p className="text-xs text-stone-500">
          This means you can fund your savings goal whenever you want.
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount(₦)</label>
        <input
          onChange={handleChange}
          value={value}
          name="fundAmount"
          placeholder="₦1,000"
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        {errors.fundAmount && <p className="text-red-500 text-sm mt-1">{errors.fundAmount}</p>}
      </div>
      {activeTab === 'Automatic' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
          <select
            id="frequency"
            name="fundFrequency"
            value={data?.fundFrequency || ''}
            onChange={(e) => onChange('fundFrequency', e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
            <option value="">Select frequency</option>
            {frequency.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
          {errors.fundFrequency && (
            <p className="text-red-500 text-sm mt-1">{errors.fundFrequency}</p>
          )}
        </div>
      )}
      {activeTab === 'Automatic' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            onChange={(e) => onChange('autoStartDate', e.target.value)}
            value={data?.autoStartDate || ''}
            type="date"
            id="autoStartDate"
            name="autoStartDate"
            placeholder="choose date"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
          />
          {errors.autoStartDate && (
            <p className="text-red-500 text-sm mt-1">{errors.autoStartDate}</p>
          )}
        </div>
      )}
      <div className="mt-4 flex justify-between">
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
}
