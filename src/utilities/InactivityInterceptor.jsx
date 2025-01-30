import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityInterceptor = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(90); // 1:30 in seconds
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const [countdownTimer, setCountdownTimer] = useState(null);

  // const INACTIVITY_TIMEOUT = 160; // for testing
  const INACTIVITY_TIMEOUT = 270000; // 4:30 in milliseconds

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (countdownTimer) clearInterval(countdownTimer);
    setShowModal(false);
    setCountdown(90);

    const newTimer = setTimeout(() => {
      startCountdown();
    }, INACTIVITY_TIMEOUT);

    setInactivityTimer(newTimer);
  };

  const startCountdown = () => {
    setShowModal(true);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setCountdownTimer(timer);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (countdownTimer) clearInterval(countdownTimer);

    // Redirect to login
    navigate('/login');
  };

  const handleCancel = () => {
    resetInactivityTimer();
  };

  useEffect(() => {
    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'click'
    ];

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    resetInactivityTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (countdownTimer) clearInterval(countdownTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Session Timeout Warning
          </h2>
          <p className="text-gray-500">
            Due to inactivity, your session will expire in:
          </p>
          <div className="text-3xl font-bold text-red-600">
            {formatTime(countdown)}
          </div>
          <p className="text-sm text-gray-500">
            Click 'Cancel' to continue your session
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 min-w-24 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 min-w-24 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityInterceptor;