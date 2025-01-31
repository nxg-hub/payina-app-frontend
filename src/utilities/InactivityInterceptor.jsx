import React, { useEffect, useCallback, useRef } from 'react';

const InactivityInterceptor = () => {
  // Use useRef instead of useState for values that shouldn't trigger re-renders
  const modalRef = useRef(false);
  const countdownRef = useRef(300);
  const inactivityTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const [, forceUpdate] = React.useState({});

  const INACTIVITY_TIMEOUT = 300; // 5 minutes in seconds

  const startCountdown = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    modalRef.current = true;
    forceUpdate({});

    countdownTimerRef.current = setInterval(() => {
      countdownRef.current -= 1;

      if (countdownRef.current <= 0) {
        handleLogout();
      } else {
        forceUpdate({});
      }
    }, 1000);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    // Clear existing timers
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    // Reset states
    modalRef.current = false;
    countdownRef.current = 300;

    // Start new inactivity timer
    inactivityTimerRef.current = setTimeout(() => {
      startCountdown();
    }, INACTIVITY_TIMEOUT * 1000);

    forceUpdate({});
  }, [startCountdown]);

  const handleLogout = () => {
    // Clear timers
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login
    window.location.href = '/login';
  };

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    resetInactivityTimer();
  }, [resetInactivityTimer]);

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
      if (!modalRef.current) {
        resetInactivityTimer();
      }
    };

    // Set up event listeners
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    // Initial timer setup
    resetInactivityTimer();

    // Cleanup
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetInactivityTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!modalRef.current) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Session Timeout Warning
          </h2>
          <p className="text-gray-500">
            Due to inactivity, your session will expire in:
          </p>
          <div className="text-3xl font-bold text-red-600">
            {formatTime(countdownRef.current)}
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