import { useState } from 'react';

const frequency = [
  { id: 0, value: 'Daily' },
  { id: 1, value: 'Weekly' },
  { id: 2, value: 'Monthly' },
];
export default function PersonalStep2({ data, onChange, onNext, onBack }) {
  const [activeTab, setActiveTab] = useState('Automatic');
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
          onChange={onChange}
          value={data?.fundAmount}
          name="fundAmount"
          placeholder="₦1,000"
          type="number"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
      </div>
      {activeTab === 'Automatic' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
          <select
            id="frequency"
            name="fundFrequency"
            value={data?.fundFrequency}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
            <option value="">Select frequency</option>
            {frequency.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>

          {/* {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>} */}
        </div>
      )}
      {activeTab === 'Automatic' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            onChange={onChange}
            type="date"
            id="autoStartDate"
            name="autoStartDate"
            placeholder="choose date"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
          />
        </div>
      )}
      <div className="mt-4 flex justify-between">
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
}
