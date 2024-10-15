import React from 'react';
import PropTypes from 'prop-types';
import successIcon from '../assets/images/tansIcon.png';
import errorIcon from '../assets/images/redrectangle.png';

const TransactionModal = ({ isOpen, onClose, status, title, message, details, onBack, onProceed, proceedText }) => {
  if (!isOpen) return null;

  const isSuccess = status === 'success';

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackClick = (e) => {
    e.stopPropagation();
    onBack();
  };

  const handleProceedClick = (e) => {
    e.stopPropagation();
    onProceed();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-8 rounded-lg max-w-md w-full text-center text-black ${isSuccess ? 'border-green-500' : 'border-red-500'} border-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? 'Success' : 'Error'}
          className="w-16 h-16 mb-4 mx-auto"
        />
        <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {title || (isSuccess ? 'Transaction Successful' : 'Transaction Failed')}
        </h2>
        <p className="mb-2 text-black">{message}</p>
        {details && <p className="mb-2 text-sm text-gray-600">{details}</p>}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="bg-blue-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
            onClick={handleProceedClick}
          >
            {proceedText || 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

TransactionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['success', 'error']).isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  details: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  proceedText: PropTypes.string,
};

export default TransactionModal;

// import React from 'react';
// import PropTypes from 'prop-types';
// import successIcon from '../assets/images/tansIcon.png';
// import errorIcon from '../assets/images/redrectangle.png';
//
// const TransactionModal = ({ isOpen, onClose, status, title, message, details, onBack, onProceed }) => {
//   console.log('TransactionModal rendered. isOpen:', isOpen);
//
//   if (!isOpen) return null;
//
//   const isSuccess = status === 'success';
//
//   const handleOverlayClick = (e) => {
//     console.log('Overlay clicked');
//     if (e.target === e.currentTarget) {
//       console.log('Closing modal via overlay click');
//       onClose();
//     }
//   };
//
//   const handleBackClick = (e) => {
//     console.log('Back button clicked');
//     e.stopPropagation();
//     onBack();
//   };
//
//   const handleProceedClick = (e) => {
//     console.log('Proceed button clicked');
//     e.stopPropagation();
//     onProceed();
//   };
//
//   console.log('Rendering modal content');
//
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={handleOverlayClick}
//     >
//       <div
//         className={`bg-white p-8 rounded-lg max-w-md w-full text-center text-black ${isSuccess ? 'border-green-500' : 'border-red-500'} border-4`}
//         onClick={(e) => {
//           console.log('Modal content clicked');
//           e.stopPropagation();
//         }}
//       >
//         <img
//           src={isSuccess ? successIcon : errorIcon}
//           alt={isSuccess ? 'Success' : 'Error'}
//           className="w-16 h-16 mb-4 mx-auto"
//         />
//         <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
//           {title || (isSuccess ? 'Transaction Successful' : 'Insufficient Funds')}
//         </h2>
//         <p className="mb-2 text-black">{message}</p>
//         {details && <p className="mb-2 text-sm text-gray-600">{details}</p>}
//         <div className="mt-6 flex justify-center space-x-4">
//           <button
//             className="bg-blue-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
//             onClick={handleBackClick}
//           >
//             Back
//           </button>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
//             onClick={handleProceedClick}
//           >
//             Proceed to Fund Wallet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// TransactionModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   status: PropTypes.oneOf(['success', 'error']).isRequired,
//   title: PropTypes.string,
//   message: PropTypes.string.isRequired,
//   details: PropTypes.string,
//   onBack: PropTypes.func.isRequired,
//   onProceed: PropTypes.func.isRequired,
// };
//
// export default TransactionModal;