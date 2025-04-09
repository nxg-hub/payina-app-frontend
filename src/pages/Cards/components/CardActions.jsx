import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionModal from '../../../utilities/TransactionModal.jsx';

export function CardActions({ cardId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const navigate = useNavigate();

  const handleCardAction = async (action) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/virtual-cards/${cardId}/${action}`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error(`Failed to ${action} card`);
      setActionType(action);
      setShowModal(true);
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModalContent = () => {
    switch (actionType) {
      case 'terminate':
        return {
          title: 'Card Terminated Successfully',
          message: 'Your virtual card has been permanently terminated.',
        };
      case 'block':
        return {
          title: 'Card Blocked Successfully',
          message: 'Your virtual card has been temporarily blocked.',
        };
      case 'unblock':
        return {
          title: 'Card Unblocked Successfully',
          message: 'Your virtual card has been unblocked and is now active.',
        };
      case 'freeze':
        return {
          title: 'Card Frozen Successfully',
          message: 'Your virtual card has been frozen. You can unfreeze it at any time.',
        };
      default:
        return { title: '', message: '' };
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleCardAction('block')}
        disabled={isLoading}
        className="w-full p-3 flex justify-between items-center bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
      >
        Block Card
      </button>

      <button
        onClick={() => handleCardAction('unblock')}
        disabled={isLoading}
        className="w-full p-3 flex justify-between items-center bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Unblock Card
      </button>

      <button
        onClick={() => handleCardAction('freeze')}
        disabled={isLoading}
        className="w-full p-3 flex justify-between items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Freeze Card
      </button>

      <button
        onClick={() => handleCardAction('terminate')}
        disabled={isLoading}
        className="w-full p-3 flex justify-between items-center bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Terminate Card
      </button>

      <TransactionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate('/virtual-cards');
        }}
        status="success"
        title={getModalContent().title}
        message={getModalContent().message}
        buttons={['Back']}
      />
    </div>
  );
}

