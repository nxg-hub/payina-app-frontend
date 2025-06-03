export default function PersonalStep1({ data, onChange, onNext, onBack }) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
        <input
          type="text"
          placeholder="e.g. Rent, Car, Vacation..."
          value={data?.goalName}
          name="goalName"
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        <p className="text-xs text-gray-500 mt-1">
          This is a description of what you want to save for.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Set Your Goal</label>
        <input
          type="number"
          placeholder="₦100,000"
          value={data?.goalAmount}
          name="goalAmount"
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        <p className="text-xs text-gray-500 mt-1">
          This is the amount you want to have saved up and available for withdrawal at the end of
          the saving period.
        </p>
      </div>

      <div className="flex justify-between pt-4">
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
