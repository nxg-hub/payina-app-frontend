import React, { useState } from 'react';
import axios from 'axios';

const TransactionPinModal = ({
                               isOpen,
                               onClose,
                               email,
                               onPinValidated,
                               onPinError
                             }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`pin-input-${index - 1}`).focus();
    }
  };

  const validatePin = async () => {
    const pinString = pin.join('');
    if (pinString.length < 4) {
      setError('Please enter a complete PIN');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        import.meta.env.VITE_VALIDATE_TRANSACTION_PIN_ENDPOINT,
        null,
        {
          params: {
            email: email,
            transactionPin: pinString
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response.status === 200) {
        onPinValidated();
        onClose();
      } else {
        setError('Invalid PIN. Please try again.');
        onPinError('Invalid PIN');
      }
    } catch (error) {
      setError('Transaction pin validation failed');
      onPinError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Enter Transaction PIN</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-center gap-4 mb-6">
          {pin.map((_, i) => (
            <input
              key={i}
              id={`pin-input-${i}`}
              type="password"
              maxLength="1"
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-12 h-12 text-center text-lg border-2 border-lightBlue rounded-full"
              value={pin[i]}
              onChange={(e) => handlePinChange(e, i)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={validatePin}
            disabled={loading}
            className="bg-lightBlue text-white px-4 py-2 rounded hover:bg-lightBlue-600 disabled:opacity-50"
          >
            {loading ? 'Validating...' : 'Submit'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPinModal;