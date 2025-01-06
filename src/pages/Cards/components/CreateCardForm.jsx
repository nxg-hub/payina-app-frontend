import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TransactionModal from '../../../utilities/TransactionModal.jsx';

export function CreateCardForm() {
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userDetails.user);
  const customerId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/virtual-cards/create-virtual-card/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency,
          amount: Number(amount),
          title,
        }),
      });

      if (!response.ok) throw new Error('Failed to create card');

      setShowModal(true);
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-6">Setup Your Card</h2>

        {/* Currency Selection */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-full ${
              currency === 'usd' ? 'bg-yellow-400' : 'bg-white border'
            }`}
            onClick={() => setCurrency('usd')}
          >
            USD Cards
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-full ${
              currency === 'ngn' ? 'bg-yellow-400' : 'bg-white border'
            }`}
            onClick={() => setCurrency('ngn')}
          >
            Naira Cards
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Card Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Spending"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Enter Amount (min $3)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              min="3"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Creating Card...' : 'Create Card'}
      </button>

      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        status="success"
        title="Card Created Successfully!"
        message={`Your ${currency.toUpperCase()} card has been created with an initial balance of ${amount}`}
        buttons={['back']}
      />
    </form>
  );
}

