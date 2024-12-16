import React from 'react';

const NotificationModal = ({ isOpen, messages }) => {
  return (
    <div className={`absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-black">Notifications</h2>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="p-4 text-center text-black">
            No notifications yet
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
              <p className="text-sm text-black">{message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;


// import React from 'react';
//
// const NotificationModal = ({ isOpen, messages }) => {
//   if (!isOpen) return null;
//
//   console.log('Rendering NotificationModal with messages:', messages);
//
//   return (
//     <div className="absolute bg-white border shadow-md rounded-lg top-10 right-0 w-80 p-4 z-50">
//       <h3 className="text-lg font-bold mb-2">Notifications</h3>
//       {messages.length === 0 ? (
//         <p className="text-gray-500">No notifications</p>
//       ) : (
//         <ul>
//           {messages.map((message, index) => (
//             <li key={index} className="border-b py-2">
//               {message}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
//
// export default NotificationModal;



//
// import React, { useState, useEffect, useRef } from 'react';
// import { connectWebSocket } from './websocket.js';
//
// const NotificationCenter = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const notificationRef = useRef(null);
//
//   useEffect(() => {
//     const handleNewNotification = (data) => {
//       setNotifications(prev => [data, ...prev].slice(0, 50));  // Keep last 50 notifications
//       setUnreadCount(count => count + 1);
//     };
//
//     const closeWebSocket = connectWebSocket(handleNewNotification);
//
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//
//     document.addEventListener('mousedown', handleClickOutside);
//
//     return () => {
//       closeWebSocket();
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
//
//   const toggleNotifications = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       setUnreadCount(0);
//     }
//   };
//
//   const formatTimestamp = (timestamp) => {
//     return new Date(timestamp).toLocaleString();
//   };
//
//   return (
//     <div className="relative" ref={notificationRef}>
//       <button
//         onClick={toggleNotifications}
//         className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
//       >
//         🔔
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
//             {unreadCount}
//           </span>
//         )}
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
//           </div>
//           {notifications.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">No notifications</div>
//           ) : (
//             notifications.map((notification, index) => (
//               <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50">
//                 <p className="text-sm font-medium text-gray-800">{notification.action}</p>
//                 <p className="text-xs text-gray-500">{notification.email}</p>
//                 <p className="text-sm text-gray-600">{notification.details}</p>
//                 <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default NotificationCenter;
//
