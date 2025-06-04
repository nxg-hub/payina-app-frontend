import React from 'react';

const DateModal = ({ isOpen, onClose, onSelectDate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
        <input
          type="date"
          className="border px-3 py-2 rounded-md w-full mb-4"
          onChange={(e) => onSelectDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;
