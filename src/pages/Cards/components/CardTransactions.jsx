import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function CardTransactions({ cardId }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/virtual-cards/${cardId}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        // Handle error
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [cardId]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading transactions...</div>;
  }

  if (!transactions.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transactions found for this card
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white p-4 rounded-lg shadow-sm border"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{transaction.description}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(transaction.date), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            <div
              className={`font-medium ${
                transaction.type === 'credit'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

