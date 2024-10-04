import React from 'react';
import PropTypes from 'prop-types';
import successIcon from '../assets/images/tansIcon.png';
import errorIcon from '../assets/images/redrectangle.png';

const TransactionModal = ({ isOpen, onClose, status, title, message, details, reference, onRegister }) => {
  if (!isOpen) return null;

  const isSuccess = status === 'success';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white p-8 rounded-lg max-w-md w-full text-center ${isSuccess ? 'border-green-500' : 'border-red-500'} border-4`}>
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
        {reference && (
          <p className="mb-4 text-sm text-black">Reference: {reference}</p>
        )}
        {isSuccess && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            onClick={onRegister}
          >
            Register
          </button>
        )}
        <button
          className={`${isSuccess ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-2 rounded`}
          onClick={onClose}
        >
          Close
        </button>
        {isSuccess && (
          <p className="mt-4 text-black">
            Or{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        )}
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
  reference: PropTypes.string,
  onRegister: PropTypes.func,
};

export default TransactionModal;