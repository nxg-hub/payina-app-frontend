import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionModal from '../utilities/TransactionModal.jsx';
import successIcon from '../assets/images/tansIcon.png';
import errorIcon from '../assets/images/redrectangle.png';
import apiService from '../services/apiService.js';
import { persistor } from '../Redux/Store.jsx';

const SignOut = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSignOut = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.signout();

      if (response.status === 'ACCEPTED') {
        setModalMessage(response.message || 'Logged out successfully');
        setShowModal(true);

        persistor.purge(); // Clears all persisted state

        // Delay navigation
        setTimeout(() => {
          // Clear any auth state/tokens if needed
          // localStorage.removeItem('authToken');
          setShowModal(false);
          navigate('/login');
        }, 2000); // 2 second delay
      } else {
        setError(response.message || 'Failed to sign out');
        setShowModal(true);
      }
    } catch (err) {
      setError('Network error occurred');
      setShowModal(true);
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        {isLoading ? 'Signing Out...' : 'Sign Out'}
      </button>

      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        status={error ? 'error' : 'success'}
        title={error ? 'Sign Out Failed' : 'Sign Out Successful'}
        message={error || modalMessage}
        buttons={[]}
        successIcon={successIcon}
        errorIcon={errorIcon}
      />
    </>
  );
};

export default SignOut;
