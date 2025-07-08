import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function PersonalStep1({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState('');
  const mysavings = useSelector((state) => state.savings.savings);
  const formatCurrency = (amount) => {
    const number = parseFloat(amount.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(number);
  };
  const activeSavings = mysavings?.filter((savings) => {
    return savings.active;
  });
  const isGoalNameUsed = (inputName) => {
    const normalizedInput = inputName.trim().toLowerCase();

    return activeSavings.some(
      (savings) => savings.goalName.trim().toLowerCase() === normalizedInput
    );
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : '';
    const formatted = rawValue ? formatCurrency(rawValue) : '';

    setValue(formatted);
    onChange('goalAmount', numericValue);
  };
  useEffect(() => {
    if (data.goalAmount !== undefined && data.goalAmount !== null) {
      setValue(formatCurrency(data.goalAmount.toString()));
    }
  }, [data.goalAmount]);
  const validate = () => {
    const newErrors = {};
    if (!data.goalName) newErrors.goalName = 'Required';
    if (isGoalNameUsed(data.goalName))
      newErrors.goalName = `You already set ${data.goalName} as one of your active goal names. Try another name.`;
    if (!data.goalAmount) newErrors.goalAmount = 'Required';

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
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
        <input
          type="text"
          placeholder="e.g. Rent, Car, Vacation..."
          value={data?.goalName}
          name="goalName"
          onChange={(e) => {
            onChange('goalName', e.target.value);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        <p className="text-xs text-gray-500 mt-1">
          This is a description of what you want to save for.
        </p>
        {errors.goalName && <p className="text-red-500 text-sm mt-1">{errors.goalName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Set Your Goal</label>
        <input
          type="text"
          placeholder="₦100,000"
          value={value || data.goalAmount}
          name="goalAmount"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        <p className="text-xs text-gray-500 mt-1">
          This is the amount you want to have saved up and available for withdrawal at the end of
          the saving period.
        </p>
        {errors.goalAmount && <p className="text-red-500 text-sm mt-1">{errors.goalAmount}</p>}
      </div>

      <div className="flex justify-between pt-4">
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
