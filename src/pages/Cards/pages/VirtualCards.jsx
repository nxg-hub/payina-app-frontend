import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb } from '../components/Breadcrumb.jsx';
import TransactionModal from '../../../utilities/TransactionModal.jsx';
import { CreateCardForm } from '../components/CreateCardForm';
import { CardDetails } from '../components/CardDetails';
import { CardActions } from '../components/CardActions';
import { CardTransactions } from '../components/CardTransactions';

export function VirtualCards() {
  const [activeTab, setActiveTab] = useState('virtual');
  const [showModal, setShowModal] = useState(false);
  const [cardType, setCardType] = useState('usd');
  const [selectedCard, setSelectedCard] = useState(null);
  const user = useSelector((state) => state.userDetails.user);
  const customerId = user?.id;

  const handleCreateCard = () => {
    if (!customerId) {
      setShowModal(true);
      return;
    }
    setSelectedCard('new');
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const renderContent = () => {
    if (selectedCard === 'new') {
      return <CreateCardForm onSuccess={() => setSelectedCard(null)} />;
    }
    if (selectedCard) {
      return (
        <div>
          <CardDetails card={selectedCard} />
          <CardActions cardId={selectedCard.id} />
          <CardTransactions cardId={selectedCard.id} />
        </div>
      );
    }
    return (
      <div>
        {/* Card list would go here */}
        <p>No cards available. Create a new card to get started.</p>
      </div>
    );
  };

  return (
    <div className="p-6">
      <Breadcrumb />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Cards</h1>

        {/* Card Type Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === 'virtual' ? 'bg-yellow-400' : 'bg-white border'
            }`}
            onClick={() => setActiveTab('virtual')}>
            Virtual Cards
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === 'physical' ? 'bg-yellow-400' : 'bg-white border'
            }`}
            onClick={() => setActiveTab('physical')}>
            Physical Cards
          </button>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Why Payna {activeTab === 'virtual' ? 'Virtual' : 'Physical'} Cards
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
              <div className="p-2 bg-green-100 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Enhanced Security</h3>
                <p className="text-gray-600">
                  Virtual cards provide an added layer of security for online transactions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Instant Creation</h3>
                <p className="text-gray-600">
                  Create and use virtual cards instantly for your online purchases
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
              <div className="p-2 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Easy Management</h3>
                <p className="text-gray-600">
                  Control and manage your virtual cards with just a few clicks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Card Button */}
        <button
          onClick={handleCreateCard}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-8">
          Get {activeTab === 'virtual' ? 'Virtual' : 'Physical'} Card
        </button>

        {/* Card Content */}
        {renderContent()}

        {/* Login Modal */}
        <TransactionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Login Required"
          message="Please login to create a virtual card"
          status="error"
          buttons={['login', 'register']}
        />
      </div>
    </div>
  );
}
