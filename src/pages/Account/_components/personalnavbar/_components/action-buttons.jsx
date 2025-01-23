// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { images } from '../../../../../constants';
// import NotificationModal from '../../../../../components/navbar/_components/NotificationModalProps.jsx';
// import useLocalStorage from '../../../../../hooks/useLocalStorage.js';
// import { Client } from '@stomp/stompjs';
//
// const ActionButtons = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const clientRef = useRef(null);
//   const [authToken] = useLocalStorage('authToken', '');
//   const [userDetails] = useLocalStorage('userDetails', '');
//   const notificationRef = useRef(null);
//
//   const currentUserId = userDetails?.id;
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081';
//
//   useEffect(() => {
//     if (!currentUserId || !authToken) return;
//
//     clientRef.current = new Client({
//       brokerURL: `ws://${BACKEND_URL.replace('http://', '').replace('https://', '')}/ws-notifications`,
//       connectHeaders: {
//         Authorization: `Bearer ${authToken}`,
//       },
//       onConnect: (frame) => {
//         console.log('WebSocket Connected');
//         clientRef.current.subscribe(`/topic/notifications/${currentUserId}`, (message) => {
//           const newNotification = JSON.parse(message.body);
//           setNotifications((prev) => [newNotification, ...prev]);
//           setUnreadCount((prev) => prev + 1);
//         });
//       },
//       onStompError: (frame) => {
//         console.error('WebSocket Error: ' + frame.headers['message']);
//       },
//     });
//
//     clientRef.current.activate();
//
//     return () => {
//       if (clientRef.current) {
//         clientRef.current.deactivate();
//       }
//     };
//   }, [currentUserId, authToken]);
//
//   const handleNotificationClick = () => {
//     setIsModalOpen(!isModalOpen);
//     setUnreadCount(0);
//   };
//
//   return (
//     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
//       <div className="flex space-x-16 justify-center items-center">
//         {/* Customer care link */}
//         <Link to={'/contact-us'} className="md:flex items-center hidden">
//           <div className="hover:scale-95">
//             <img src={images.Headphone} alt="customer_care" />
//           </div>
//         </Link>
//
//         {/* Notification Button */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={handleNotificationClick}
//             className="hover:scale-95 focus:outline-none"
//             aria-label="Notifications">
//             <img src={images.Bell} alt="Notifications" />
//             {unreadCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {unreadCount}
//               </span>
//             )}
//           </button>
//           <NotificationModal
//             isOpen={isModalOpen}
//             messages={notifications.map((n) => n.description)}
//           />
//         </div>
//
//         {/* Settings link */}
//         <Link to={'/account/settings'}>
//           <div className="hover:scale-95">
//             <img src={images.Settings} alt="settings" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };
//
// export default ActionButtons;


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { images } from '../../../../../constants';
import NotificationModal from '../../../../../components/navbar/_components/NotificationModalProps.jsx';
import useLocalStorage from '../../../../../hooks/useLocalStorage.js';

const ActionButtons = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef(null);
  const clientRef = useRef(null);

  const [authToken] = useLocalStorage('authToken', '');
  const [userDetails] = useLocalStorage('userDetails', '');
  const currentUserId = userDetails?.id;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    if (!currentUserId || !authToken) return;

    clientRef.current = new Client({
      brokerURL: `ws://${BACKEND_URL.replace('http://', '').replace('https://', '')}/ws-notifications`,
      connectHeaders: {
        'Authorization': `Bearer ${authToken}`
      },
      onConnect: (frame) => {
        console.log('WebSocket Connected');
        clientRef.current.subscribe(`/topic/notifications/${currentUserId}`, (message) => {
          const newNotification = JSON.parse(message.body);
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        });
      },
      onStompError: (frame) => {
        console.error('WebSocket Error: ' + frame.headers['message']);
      },
    });

    clientRef.current.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [currentUserId, authToken]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    setIsModalOpen(!isModalOpen);
    setUnreadCount(0);
  };

  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex space-x-16 justify-center items-center">
        <Link to={'/contact-us'} className="md:flex items-center hidden">
          <div className="hover:scale-95">
            <img src={images.Headphone} alt="customer_care" />
          </div>
        </Link>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="hover:scale-95 focus:outline-none"
            aria-label="Notifications"
          >
            <img src={images.Bell} alt="Notifications" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <NotificationModal
            isOpen={isModalOpen}
            messages={notifications.map(n => n.description || 'No description')}
          />
        </div>

        <Link to={'/account/settings'}>
          <div className="hover:scale-95">
            <img src={images.Settings} alt="settings" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;