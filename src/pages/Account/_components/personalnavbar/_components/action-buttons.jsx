// // import { Link, useLocation } from 'react-router-dom';
// // import { images } from '../../../../../constants';
// //
// // const ActionButtons = () => {
// //   const location = useLocation();
// //   const route = location.pathname;
// //   return (
// //     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
// //       <div className="flex space-x-16 justify-center items-center">
// //         <Link href={'/'} className="md:flex items-center hidden">
// //           <div className="hover:scale-95">
// //             <img src={images.Headphone} alt="customer_care" />
// //           </div>
// //         </Link>
// //
// //         <Link to={'/'}>
// //           <div className="hover:scale-95">
// //             <img src={images.Bell} alt="customer_care" />
// //           </div>
// //         </Link>
// //         <Link to={'/'}>
// //           <div className="hover:scale-95">
// //             <img src={images.Settings} alt="customer_care" />
// //           </div>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default ActionButtons;
//
//
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { images } from '../../../../../constants';
// import NotificationModal from '../../../../../components/navbar/_components/NotificationModalProps.jsx';
// import { connectWebSocket } from '../../../../../components/navbar/_components/websocket';
//
// const ActionButtons = () => {
//   const location = useLocation();
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [messages, setMessages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//
//   useEffect(() => {
//     const handleNewMessage = (message) => {
//       setNotificationCount((prevCount) => prevCount + 1);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };
//
//     const closeWebSocket = connectWebSocket(handleNewMessage);
//
//     return () => {
//       closeWebSocket();
//     };
//   }, []);
//
//   const handleNotificationClick = () => {
//     setIsModalOpen(true);
//   };
//
//   const clearMessages = () => {
//     setNotificationCount(0);
//     setMessages([]);
//   };
//
//   return (
//     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
//       <div className="flex space-x-16 justify-center items-center">
//         <Link to={'/'} className="md:flex items-center hidden">
//           <div className="hover:scale-95">
//             <img src={images.Headphone} alt="customer_care" />
//           </div>
//         </Link>
//
//         <div className="relative">
//           <button onClick={handleNotificationClick} className="hover:scale-95">
//             <img src={images.Bell} alt="notifications" />
//             {notificationCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {notificationCount}
//               </span>
//             )}
//           </button>
//         </div>
//
//         <Link to={'/'}>
//           <div className="hover:scale-95">
//             <img src={images.Settings} alt="settings" />
//           </div>
//         </Link>
//       </div>
//
//       <NotificationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         messages={messages}
//         clearMessages={clearMessages}
//       />
//     </div>
//   );
// };
//
// export default ActionButtons;
//
//
//

//
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { images } from '../../../../../constants';
// import NotificationModal from '../../../../../components/navbar/_components/NotificationModalProps.jsx';
// import { connectWebSocket } from '../../../../../components/navbar/_components/websocket';
//
// const ActionButtons = () => {
//   const location = useLocation();
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [messages, setMessages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const notificationRef = useRef(null);
//
//   useEffect(() => {
//     const handleNewMessage = (data) => {
//       setNotificationCount((prevCount) => prevCount + 1);
//       let message = '';
//       switch (data.type) {
//         case 'user-login':
//           message = `User logged in: ${data.email}`;
//           break;
//         case 'user-logout':
//           message = `User logged out: ${data.email}`;
//           break;
//         case 'file-upload':
//           message = `File uploaded successfully. Type: ${data.fileType}`;
//           break;
//         default:
//           message = data.message || 'New notification received';
//       }
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };
//
//     const closeWebSocket = connectWebSocket(handleNewMessage);
//
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setIsModalOpen(false);
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
//   const handleNotificationClick = () => {
//     setIsModalOpen(!isModalOpen);
//     if (!isModalOpen) {
//       setNotificationCount(0);
//     }
//   };
//
//   return (
//     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
//       <div className="flex space-x-16 justify-center items-center">
//         <Link to={'/'} className="md:flex items-center hidden">
//           <div className="hover:scale-95">
//             <img src={images.Headphone} alt="customer_care" />
//           </div>
//         </Link>
//
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={handleNotificationClick}
//             className="hover:scale-95 focus:outline-none"
//             aria-label="Notifications"
//           >
//             <img src={images.Bell} alt="" />
//             {notificationCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {notificationCount}
//               </span>
//             )}
//           </button>
//           <NotificationModal isOpen={isModalOpen} messages={messages} />
//         </div>
//
//         <Link to={'/'}>
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
//
//
//

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { images } from '../../../../../constants';
// import { connectWebSocket } from '../../../../../components/navbar/_components/websocket';
// import NotificationModal from '../../../../../components/navbar/_components/NotificationModalProps.jsx';
//
// const ActionButtons = () => {
//   const location = useLocation();
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [messages, setMessages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const notificationRef = useRef(null);
//
//   useEffect(() => {
//     console.log('Initializing WebSocket connection...');
//
//     const handleNewNotification = (data) => {
//       console.log('New notification received:', data); // Log received notification
//       setNotificationCount((prevCount) => prevCount + 1); // Increment the notification count
//       setMessages((prevMessages) => [...prevMessages, data]); // Add new notification to the list
//     };
//
//     const closeWebSocket = connectWebSocket((data) => {
//       console.log('WebSocket message received:', data); // Log all messages from WebSocket
//       handleNewNotification(data);
//     });
//
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         console.log('Clicked outside notification modal. Closing modal.');
//         setIsModalOpen(false);
//       }
//     };
//
//     document.addEventListener('mousedown', handleClickOutside);
//
//     return () => {
//       console.log('Cleaning up WebSocket connection and event listeners...');
//       closeWebSocket();
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
//
//   const handleNotificationClick = () => {
//     console.log('Notification button clicked. Current modal state:', isModalOpen);
//     setIsModalOpen(!isModalOpen);
//     if (!isModalOpen) {
//       console.log('Resetting notification count to 0.');
//       setNotificationCount(0); // Reset the count when modal is opened
//     }
//   };
//
//   return (
//     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
//       <div className="flex space-x-16 justify-center items-center">
//         {/* Customer care link */}
//         <Link to={'/'} className="md:flex items-center hidden">
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
//             aria-label="Notifications"
//           >
//             <img src={images.Bell} alt="Notifications" />
//             {notificationCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {notificationCount}
//               </span>
//             )}
//           </button>
//           <NotificationModal isOpen={isModalOpen} messages={messages} />
//         </div>
//
//         {/* Settings link */}
//         <Link to={'/'}>
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
import { Link, useLocation } from 'react-router-dom';
import { images } from '../../../../../constants';
import { connectWebSocket } from '../../../../../components/navbar/_components/websocket';
import NotificationModal from '../../../../../components/navbar/_components/NotificationModalProps.jsx';

const ActionButtons = () => {
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    console.log('Initializing WebSocket connection...');

    const handleNewNotification = (data) => {
      console.log('Notification received from backend:', data); // Log notification from backend
      setNotificationCount((prevCount) => prevCount + 1); // Increment the notification count
      setMessages((prevMessages) => [...prevMessages, data]); // Add new notification to the list
    };

    const closeWebSocket = connectWebSocket((data) => {
      console.log('WebSocket message received:', data); // Log the raw message
      handleNewNotification(data); // Pass the message to the notification handler
    });

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        console.log('Clicked outside notification modal. Closing modal.');
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      console.log('Cleaning up WebSocket connection and event listeners...');
      closeWebSocket();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    console.log('Notification button clicked. Current modal state:', isModalOpen);
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      console.log('Resetting notification count to 0.');
      setNotificationCount(0); // Reset the count when modal is opened
    }
  };

  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex space-x-16 justify-center items-center">
        {/* Customer care link */}
        <Link to={'/'} className="md:flex items-center hidden">
          <div className="hover:scale-95">
            <img src={images.Headphone} alt="customer_care" />
          </div>
        </Link>

        {/* Notification Button */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="hover:scale-95 focus:outline-none"
            aria-label="Notifications"
          >
            <img src={images.Bell} alt="Notifications" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          <NotificationModal isOpen={isModalOpen} messages={messages} />
        </div>

        {/* Settings link */}
        <Link to={'/'}>
          <div className="hover:scale-95">
            <img src={images.Settings} alt="settings" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
