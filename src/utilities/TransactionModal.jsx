// import React from 'react';
//
// const TransactionModal = ({
//                             isOpen,
//                             s,
//                             status = 'success',
//                             title,
//                             message,
//                             details,
//                             reference,
//                             buttons = ['back'],
//                             onRegister,
//                             onLogin,
//                             onFundWallet,
//                             onPullReceipt,
//                             successIcon,
//                             errorIcon,
//                             buttonStyles = {},
//                             customButtons = [],
//                           }) => {
//   if (!isOpen) return null;
//
//   const isSuccess = status === 'success';
//
//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       s();
//     }
//   };
//
//   const handleBack = () => {
//     window.location.reload();
//   };
//
//   const buttonConfigs = {
//     register: {
//       label: 'Register',
//       onClick: onRegister,
//       className: buttonStyles.register || 'bg-[#006181] hover:opacity-90',
//     },
//     login: {
//       label: 'Login',
//       onClick: onLogin,
//       className: buttonStyles.login || 'bg-[#006181] hover:opacity-90',
//     },
//     cancel: {
//       label: 'Cancel',
//       onClick: s,
//       className: buttonStyles.cancel || 'bg-[#006181] hover:opacity-90',
//     },
//     back: {
//       label: 'Back',
//       onClick: handleBack,
//       className: buttonStyles.back || 'bg-[#006181] hover:opacity-90',
//     },
//     fundWallet: {
//       label: 'Fund Wallet',
//       onClick: onFundWallet,
//       className: buttonStyles.fundWallet || 'bg-[#006181] hover:opacity-90',
//     },
//     pullReceipt: {
//       label: 'Pull Receipt',
//       onClick: () => onPullReceipt(reference),
//       className: buttonStyles.pullReceipt || 'bg-[#006181] hover:opacity-90',
//     },
//   };
//
//   const renderButtons = () => {
//     const allButtons = [
//       ...buttons,
//         ...(message.includes('Insufficient Funds') ? ['fundWallet'] : []), // Automatically add Fund Wallet button if the message contains "Insufficient Funds"
//       // ...(message?.toLowerCase().includes('insufficient funds') ? ['fundWallet'] : []),
//       ...customButtons.map((btn) => ({
//         key: btn.key,
//         label: btn.label,
//         onClick: btn.onClick,
//         className: btn.className || 'bg-[#006181] hover:opacity-90',
//       })),
//     ];
//
//     return allButtons.map((button) => {
//       const buttonConfig = typeof button === 'string' ? buttonConfigs[button] : button;
//       if (!buttonConfig) return null;
//
//       return (
//         <button
//           key={buttonConfig.key || buttonConfig.label}
//           onClick={buttonConfig.onClick}
//           className={`${buttonConfig.className} text-white px-4 py-2 rounded transition duration-300 ease-in-out`}
//         >
//           {buttonConfig.label}
//         </button>
//       );
//     });
//   };
//
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={handleOverlayClick}
//     >
//       <div
//         className={`bg-white p-8 rounded-lg max-w-md w-full text-center text-black ${
//           isSuccess ? 'border-green-500' : 'border-red-500'
//         } border-4`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={isSuccess ? successIcon : errorIcon}
//           alt={isSuccess ? 'Success' : 'Error'}
//           className="w-24 h-24 mb-4 mx-auto"
//         />
//
//         <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
//           {title || (isSuccess ? 'Transaction Successful' : 'Transaction Failed')}
//         </h2>
//
//         <p className="mb-2 text-gray-700">{message}</p>
//         {details && <p className="mb-2 text-sm text-gray-600">{details}</p>}
//         {reference && <p className="mb-2 text-sm text-gray-600">Reference: {reference}</p>}
//
//         <div className="mt-6 flex justify-center space-x-4">{renderButtons()}</div>
//       </div>
//     </div>
//   );
// };
//
// export default TransactionModal;

import React from 'react';

const TransactionModal = ({
  isOpen,
  onClose,
  status = 'success',
  title,
  message,
  details,
  reference,
  buttons = ['back'],
  onRegister,
  onLogin,
  onFundWallet,
  onPullReceipt,
  successIcon,
  errorIcon,
  buttonStyles = {},
  customButtons = [],
  modalContent = null, // New prop for custom content
}) => {
  if (!isOpen) return null;

  const isSuccess = status === 'success';

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBack = () => {
    window.location.reload();
  };

  const buttonConfigs = {
    register: {
      label: 'Register',
      onClick: onRegister,
      className: buttonStyles.register || 'bg-[#006181] hover:opacity-90',
    },
    login: {
      label: 'Login',
      onClick: onLogin,
      className: buttonStyles.login || 'bg-[#006181] hover:opacity-90',
    },
    cancel: {
      label: 'Cancel',
      onClick: onClose,
      className: buttonStyles.cancel || 'bg-[#006181] hover:opacity-90',
    },
    back: {
      label: 'Back',
      onClick: handleBack,
      className: buttonStyles.back || 'bg-[#006181] hover:opacity-90',
    },
    fundWallet: {
      label: 'Fund Wallet',
      onClick: onFundWallet,
      className: buttonStyles.fundWallet || 'bg-[#006181] hover:opacity-90',
    },
    pullReceipt: {
      label: 'Pull Receipt',
      onClick: () => onPullReceipt(reference),
      className: buttonStyles.pullReceipt || 'bg-[#006181] hover:opacity-90',
    },
  };

  const renderButtons = () => {
    const allButtons = [
      ...buttons,
      ...(message?.includes('Insufficient Funds') ? ['fundWallet'] : []),
      ...customButtons.map((btn) => ({
        key: btn.key,
        label: btn.label,
        onClick: btn.onClick,
        className: btn.className || 'bg-[#006181] hover:opacity-90',
      })),
    ];

    return allButtons.map((button) => {
      const buttonConfig = typeof button === 'string' ? buttonConfigs[button] : button;
      if (!buttonConfig) return null;

      return (
        <button
          key={buttonConfig.key || buttonConfig.label}
          onClick={buttonConfig.onClick}
          className={`${buttonConfig.className} text-white px-4 py-2 rounded transition duration-300 ease-in-out`}>
          {buttonConfig.label}
        </button>
      );
    });
  };

  // If modalContent is provided, render the custom content
  if (modalContent) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOverlayClick}>
        <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          {modalContent}
        </div>
      </div>
    );
  }

  // Default modal content
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}>
      <div
        className={`bg-white p-8 rounded-lg max-w-md w-full text-center text-black ${
          isSuccess ? 'border-green-500' : 'border-red-500'
        } border-4`}
        onClick={(e) => e.stopPropagation()}>
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? 'Success' : 'Error'}
          className="w-24 h-24 mb-4 mx-auto"
        />

        <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {title || (isSuccess ? 'Transaction Successful' : 'Transaction Failed')}
        </h2>

        <p className="mb-2 text-gray-700">{message}</p>
        {details && <p className="mb-2 text-sm text-gray-600">{details}</p>}
        {reference && <p className="mb-2 text-sm text-gray-600">Reference: {reference}</p>}

        <div className="mt-6 flex justify-center space-x-4">{renderButtons()}</div>
      </div>
    </div>
  );
};

export default TransactionModal;
