import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import useLocalStorage from '../hooks/useLocalStorage.js';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

const SignOut = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [authToken, , removeAuthToken] = useLocalStorage('authToken', '');

  const handleSignOut = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://payina-be-6f08cdfb4414.herokuapp.com/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (response.ok) {
        removeAuthToken();
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to sign out');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="w-full flex items-center space-x-6 hover:text-lightBlue transition-colors"
      >
        <VscSignOut size={22} />
        <span>Sign Out</span>
      </button>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Are you sure you want to sign out?</h2>
          <p className="text-gray-600 mb-6">
            You will need to sign in again to access your account.
            {error && (
              <span className="block text-red-500 mt-2">{error}</span>
            )}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignOut;