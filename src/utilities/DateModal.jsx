const DateModal = ({ isOpen, onClose, onSelectDate, selectedDate }) => {
  if (!isOpen) return null;
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // add 30 days
    return date.toISOString().split('T')[0]; // format as YYYY-MM-DD
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Select a Date. Minimum of 30 days.</h2>
        <input
          type="date"
          // value={selectedDate || ''}
          min={getMinDate()}
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
