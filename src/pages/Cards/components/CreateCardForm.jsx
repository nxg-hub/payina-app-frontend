// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import TransactionModal from '../../../utilities/TransactionModal.jsx';
// import useLocalStorage from '../../../hooks/useLocalStorage.js';
//
// export function CreateCardForm({ onSuccess, user }) {
//   const [currency, setCurrency] = useState('usd');
//   const [amount, setAmount] = useState('');
//   const [title, setTitle] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [authToken] = useLocalStorage('authToken', '');
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//
//     try {

//       const response = await fetch(`https://payina-be.onrender.com/api/virtual-cards/create-virtual-card/${user.customerId}`, {
//         method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${authToken}`,
//             apiKey: import.meta.env.VITE_API_KEY,
//           },
//         body: JSON.stringify({
//           currency,
//           amount: Number(amount),
//           title,
//         }),
//       });
//
//       if (!response.ok) throw new Error('Failed to create card');
//
//       setShowModal(true);
//     } catch (error) {
//       console.error(error);
//       // Handle error (e.g., show error message to user)
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
//       <div>
//         <h2 className="text-xl font-bold mb-6">Setup Your Card</h2>
//
//         {/* Currency Selection */}
//         <div className="flex gap-4 mb-6">
//           <button
//             type="button"
//             className={`flex-1 py-2 rounded-full ${
//               currency === 'usd' ? 'bg-yellow-400' : 'bg-white border'
//             }`}
//             onClick={() => setCurrency('usd')}
//           >
//             USD Cards
//           </button>
//           <button
//             type="button"
//             className={`flex-1 py-2 rounded-full ${
//               currency === 'ngn' ? 'bg-yellow-400' : 'bg-white border'
//             }`}
//             onClick={() => setCurrency('ngn')}
//           >
//             Naira Cards
//           </button>
//         </div>
//
//         {/* Form Fields */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Card Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-2 border rounded-lg"
//               placeholder="Spending"
//               required
//             />
//           </div>
//
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Enter Amount (min $3)
//             </label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full p-2 border rounded-lg"
//               min="3"
//               required
//             />
//           </div>
//         </div>
//       </div>
//
//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {isLoading ? 'Creating Card...' : 'Create Card'}
//       </button>
//
//       <TransactionModal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           onSuccess();
//         }}
//         status="success"
//         title="Card Created Successfully!"
//         message={`Your ${currency.toUpperCase()} card has been created with an initial balance of ${amount}`}
//         buttons={['back']}
//       />
//     </form>
//   );
// }
//


import React, { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage.js';
import TransactionModal from '../../../utilities/TransactionModal.jsx';

export function CreateCardForm({ onSuccess, user }) {
  const [currency, setCurrency] = useState('usd');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState({
    status: '',
    title: '',
    message: '',
  });
  const [authToken] = useLocalStorage('authToken', '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/virtual-cards/create-virtual-card/${user.customerId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            apiKey: import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            currency,
            amount: Number(amount),
            title,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create card');
      }

      // Handle success
      setModalContent({
        status: 'success',
        title: 'Card Created Successfully!',
        message: `Your ${currency.toUpperCase()} card has been created with an initial balance of ${amount}.`,
      });
      setShowModal(true);
    } catch (error) {
      // Handle error
      console.error(error);
      setModalContent({
        status: 'error',
        title: 'Card Creation Failed',
        message: error.message || 'Something went wrong while creating the card.',
      });
      setShowModal(true);
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

      {/* Modal for Success or Error */}
      <TransactionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          if (modalContent.status === 'success') onSuccess();
        }}
        status={modalContent.status} // Pass 'success' or 'error'
        title={modalContent.title}
        message={modalContent.message}
        buttons={['back']}
      />
    </form>
  );
}
