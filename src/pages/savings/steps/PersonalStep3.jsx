import { useState } from 'react';
import DateModal from '../../../utilities/DateModal';

export default function PersonalStep3({ data, onChange, onNext, onBack }) {
  const [activeTab, setActiveTab] = useState('10 days');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(data);
  function parseDurationAndCalculateDate(input) {
    const date = new Date();

    // If input looks like a date (e.g., 2025-05-31), return that date
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      const parsedDate = new Date(input);
      if (!isNaN(parsedDate)) {
        return formatPrettyDate(parsedDate);
      }
    }

    // Otherwise, treat it as a duration string (e.g., "10 days")
    const [numberStr, unitRaw] = input?.trim()?.split(' ');
    const number = parseInt(numberStr, 10);
    const unit = unitRaw?.toLowerCase();

    if (unit.includes('day')) {
      date.setDate(date.getDate() + number);
    } else if (unit.includes('month')) {
      date.setMonth(date.getMonth() + number);
    } else if (unit.includes('year')) {
      date.setFullYear(date.getFullYear() + number);
    } else {
      throw new Error('Unsupported time unit');
    }

    return formatPrettyDate(date);
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      //   style: "currency",
      currency: 'NGN',
    }).format(amount);
  };

  const date = [
    { id: 0, value: '10 days' },
    { id: 1, value: '30 days' },
    { id: 2, value: '60 days' },
    { id: 3, value: '90 days' },
    { id: 4, value: 'Pick my date' },
  ];

  function formatPrettyDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];

    // Get ordinal suffix
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month} ${year}`;
  }

  const today = new Date().toISOString().split('T')[0];

  const handleSelect = (value) => {
    setActiveTab(value);

    if (value === 'Pick my date') {
      // Open the modal immediately
      setShowModal(true);
    } else {
      // Do something with other values
      const result = parseDurationAndCalculateDate(value);
    }
  };
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
      <p className="text-sm font-semibold">How long do you want to save for?</p>
      <div className="w-full grid grid-cols-4 gap-2">
        {date.map((date) => {
          return (
            <div
              onClick={() => {
                handleSelect(date.value);
              }}
              className={`${activeTab === date.value ? 'bg-[#006181] text-white' : ''} cursor-pointer rounded-2xl text-center p-1`}
              key={date.id}>
              {date.value}
            </div>
          );
        })}
      </div>
      <div className="space-y-5">
        <p className="flex justify-between">
          <strong>Maturity Period:</strong>{' '}
          {activeTab !== 'Pick my date' ? activeTab : selectedDate ? selectedDate : 'Pick a date'}
        </p>

        <p className="flex justify-between">
          <strong>Minimum fund amount:</strong>₦{formatCurrency(100)}
        </p>

        <p className="flex justify-between">
          <strong>Annual interest rate</strong>5%
        </p>
        <p className="flex justify-between">
          <strong>Matures by</strong>
          {activeTab !== 'Pick my date'
            ? parseDurationAndCalculateDate(activeTab)
            : selectedDate
              ? parseDurationAndCalculateDate(selectedDate)
              : 'Pick a date'}
        </p>
        <p className="flex justify-between">
          <strong>Withdrawal possible by</strong>{' '}
          {activeTab !== 'Pick my date'
            ? parseDurationAndCalculateDate(activeTab)
            : selectedDate
              ? parseDurationAndCalculateDate(selectedDate)
              : 'Pick a date'}
        </p>
        <p className="flex justify-between">
          <strong> Withdrawal Tax</strong>
        </p>
      </div>
      <DateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setShowModal(false);
        }}
      />
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
