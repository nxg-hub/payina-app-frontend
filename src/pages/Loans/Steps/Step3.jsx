import { useState } from 'react';

const Step3 = ({ data, onBack, onChange, onNext }) => {
  const [currentGuarantor, setCurrentGuarantor] = useState({
    name: '',
    phoneNumber: '',
  });

  const loanAmount = Number(data.loanAmount);
  const requiredGuarantors = loanAmount > 500000 ? 2 : 1;
  const hasEnoughGuarantors = data.guarantors.length >= requiredGuarantors;

  const handleAddGuarantor = () => {
    if (!currentGuarantor.name || !currentGuarantor.phoneNumber) return;
    const updatedGuarantors = [...data.guarantors, currentGuarantor];
    onChange('guarantors', updatedGuarantors);
    setCurrentGuarantor({ name: '', phoneNumber: '' });
  };

  const handleRemoveGuarantor = (index) => {
    const updated = [...data.guarantors];
    updated.splice(index, 1);
    onChange('guarantors', updated);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md mt-[100px] m-auto md:w-[50%]">
      <h2 className="text-lg font-semibold">Add Guarantors</h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Guarantor Name"
          value={currentGuarantor.name}
          onChange={(e) => setCurrentGuarantor({ ...currentGuarantor, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        <input
          type="tel"
          placeholder="phone Number"
          value={currentGuarantor.phoneNumber}
          onChange={(e) =>
            setCurrentGuarantor({ ...currentGuarantor, phoneNumber: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition"
        />
        <button
          onClick={handleAddGuarantor}
          type="button"
          className="px-3 py-1 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {data.guarantors?.map((g, index) => (
          <li
            key={index}
            className="flex items-center justify-between  p-2  w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#EAF3F6] focus:ring-2 focus:ring-[#006181] focus:outline-none transition">
            <div>
              <p className="font-medium">{g.name}</p>
              <p className="text-sm text-gray-500">{g.phoneNumber}</p>
            </div>
            <button type="button" onClick={() => handleRemoveGuarantor(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition">
          ← Back
        </button>
        <button
          className="px-6 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-xl text-sm shadow-sm transition"
          onClick={onNext}
          disabled={!hasEnoughGuarantors}>
          Continue
        </button>
      </div>

      {!hasEnoughGuarantors && (
        <p className="text-red-500 text-sm">
          Please add at least {requiredGuarantors} guarantor
          {requiredGuarantors > 1 ? 's' : ''} to proceed.
        </p>
      )}
    </div>
  );
};

export default Step3;
