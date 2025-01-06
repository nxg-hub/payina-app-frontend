import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionModal from '../../../utilities/TransactionModal.jsx';

export function FundCardForm({ cardId }) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userDetails.user);
  const customerId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/virtual-cards/customer/${customerId}/card/${cardId}/fund`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: Number(amount) }),
        }
      );

      if (!response.ok) throw new Error('Failed to fund card');
      setShowModal(true);
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Fund Your Card</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Enter Amount (min $3)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter amount"
            min="3"
            required
          />
        </div>

        <div className="text-sm text-gray-600">
          Equivalent USD Amount: ${(Number(amount) / 1575).toFixed(2)}
        </div>

        <div className="text-xs text-gray-500">N1575 = $1</div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Fund Card'}
        </button>
      </form>

      <TransactionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate('/virtual-cards');
        }}
        status="success"
        title="Card Funded Successfully!"
        message={`Successfully funded card with $${amount}`}
        buttons={['back']}
      />
    </div>
  );
}

