// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Breadcrumb } from '../components/Breadcrumb.jsx';
// import TransactionModal from '../../../utilities/TransactionModal.jsx';
// import { CreateCardForm } from '../components/CreateCardForm';
// import { CardDetails } from '../components/CardDetails';
// import { CardActions } from '../components/CardActions';
// import { CardTransactions } from '../components/CardTransactions';
// import Sidebar from '../../Account/_components/sidebar/sidebar.jsx';
// import { Navbar } from '../../Account/_components/index.js';
// import useLocalStorage from '../../../hooks/useLocalStorage.js';
//
// export function VirtualCards() {
//   const [activeTab, setActiveTab] = useState('virtual');
//   const [showModal, setShowModal] = useState(false);
//   const [cardType, setCardType] = useState('usd');
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authToken] = useLocalStorage('authToken', '');
//
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(import.meta.env.VITE_GET_USER, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//             apiKey: import.meta.env.VITE_API_KEY,
//           },
//           // credentials: 'include', // This is important for including cookies in the request
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch user details');
//         }
//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchUserDetails();
//   }, []);
//
//   const handleCreateCard = () => {
//     if (!user) {
//       return;
//     }
//     setSelectedCard('new');
//   };
//   // const handleCreateCard = () => {
//   //   if (!user) {
//   //     setShowModal(true);
//   //     return;
//   //   }
//   //   setShowCreateModal(true);
//   // };
//
//   const handleCardClick = (card) => {
//     setSelectedCard(card);
//   };
//
//   const renderContent = () => {
//     if (isLoading) {
//       return <div>Loading user details...</div>;
//     }
//
//     if (error) {
//       return <div>Error: {error}</div>;
//     }
//
//     if (selectedCard === 'new') {
//       return <CreateCardForm onSuccess={() => setSelectedCard(null)} user={user} />;
//     }
//     if (selectedCard) {
//       return (
//         <div>
//           <CardDetails card={selectedCard} />
//           <CardActions cardId={selectedCard.id} />
//           <CardTransactions cardId={selectedCard.id} />
//         </div>
//       );
//     }
//     if (user?.virtualCards?.length === 0) {
//       return (
//         <div className="text-red-600">
//           <p>No cards available. Create a new card to get started.</p>
//         </div>
//       );
//     }
//
//   };
//
//   return (
//     <div>
//       <div className="">
//       <Navbar /></div>
//       <Sidebar />
//
//     <div className="p-6 max-w-md mx-auto space-y-6">
//       {/*mt-28 ml-96*/}
//       <Breadcrumb />
//
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">All Cards</h1>
//
//         {/* Card Type Tabs */}
//         <div className="flex gap-4 mb-8">
//           <button
//             className={`px-6 py-2 rounded-full ${
//               activeTab === 'virtual' ? 'bg-yellow-400' : 'bg-white border'
//             }`}
//             onClick={() => setActiveTab('virtual')}
//           >
//             Virtual Cards
//           </button>
//           <button
//             className={`px-6 py-2 rounded-full ${
//               activeTab === 'physical' ? 'bg-yellow-400' : 'bg-white border'
//             }`}
//             onClick={() => setActiveTab('physical')}
//           >
//             Physical Cards
//           </button>
//         </div>
//
//         {/* Benefits Section */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold mb-4">
//             Why Payna {activeTab === 'virtual' ? 'Virtual' : 'Physical'} Cards
//           </h2>
//           <div className="space-y-4">
//             <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
//               <div className="p-2 bg-green-100 rounded-full">
//                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="font-medium">Enhanced Security</h3>
//                 <p className="text-gray-600">Virtual cards provide an added layer of security for online transactions</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
//               <div className="p-2 bg-blue-100 rounded-full">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="font-medium">Instant Creation</h3>
//                 <p className="text-gray-600">Create and use virtual cards instantly for your online purchases</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
//               <div className="p-2 bg-purple-100 rounded-full">
//                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="font-medium">Easy Management</h3>
//                 <p className="text-gray-600">Control and manage your virtual cards with just a few clicks</p>
//               </div>
//             </div>
//           </div>
//         </div>
//
//         <button
//           onClick={handleCreateCard}
//           className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-8"
//         >
//           Get {activeTab === 'virtual' ? 'Virtual' : 'Physical'} Card
//         </button>
//
//         {/* Card Content */}
//         {renderContent()}
//
//         {/* Login Modal */}
//         <TransactionModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           title="Login Required"
//           message="Please login to create a virtual card"
//           status="error"
//           buttons={['login', 'register']}
//         />
//       </div>
//     </div>
//     </div>
//   );
// }
//


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb } from '../components/Breadcrumb.jsx';
import TransactionModal from '../../../utilities/TransactionModal.jsx';
import { CreateCardModal } from '../components/CreateCardModal.jsx';
import { CardDetails } from '../components/CardDetails';
import { CardActions } from '../components/CardActions';
import { CardTransactions } from '../components/CardTransactions';
import Sidebar from '../../Account/_components/sidebar/sidebar.jsx';
import { Navbar } from '../../Account/_components/index.js';
import useLocalStorage from '../../../hooks/useLocalStorage.js';

export function VirtualCards() {
  const [activeTab, setActiveTab] = useState('virtual');
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cardType, setCardType] = useState('usd');
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken] = useLocalStorage('authToken', '');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            apiKey: import.meta.env.VITE_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [authToken]);

  const handleCreateCard = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    setShowCreateModal(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading user details...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (user?.virtualCards?.length === 0) {
      return (
        <div className="text-red-600">
          <p>No cards available. Create a new card to get started.</p>
        </div>
      );
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user?.virtualCards?.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="p-4 border rounded-lg cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-medium">{card.title}</h3>
            <p className="text-gray-600">{card.currency.toUpperCase()}</p>
            <p className="font-bold">{card.balance}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <Sidebar />

      <div className="p-6 max-w-md mx-auto space-y-6">
        <Breadcrumb />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">All Cards</h1>

          <div className="flex gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full ${
                activeTab === 'virtual' ? 'bg-yellow-400' : 'bg-white border'
              }`}
              onClick={() => setActiveTab('virtual')}
            >
              Virtual Cards
            </button>
            <button
              className={`px-6 py-2 rounded-full ${
                activeTab === 'physical' ? 'bg-yellow-400' : 'bg-white border'
              }`}
              onClick={() => setActiveTab('physical')}
            >
              Physical Cards
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Why Payna {activeTab === 'virtual' ? 'Virtual' : 'Physical'} Cards
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <div className="p-2 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Enhanced Security</h3>
                  <p className="text-gray-600">Virtual cards provide an added layer of security for online transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Instant Creation</h3>
                  <p className="text-gray-600">Create and use virtual cards instantly for your online purchases</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <div className="p-2 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Easy Management</h3>
                  <p className="text-gray-600">Control and manage your virtual cards with just a few clicks</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateCard}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-8"
          >
            Get {activeTab === 'virtual' ? 'Virtual' : 'Physical'} Card
          </button>

          {renderContent()}

          <CreateCardModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            user={user}
          />

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
    </div>
  );
}