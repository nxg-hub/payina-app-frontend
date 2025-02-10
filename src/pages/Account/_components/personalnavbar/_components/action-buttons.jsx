/* eslint-disable prettier/prettier */
// import { Link, useLocation } from 'react-router-dom';
// import { images } from '../../../../../constants';
//
// const ActionButtons = () => {
//   const location = useLocation();
//   const route = location.pathname;
//   return (
//     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
//       <div className="flex space-x-16 justify-center items-center">
//         <Link href={'/'} className="md:flex items-center hidden">
//           <div className="hover:scale-95">
//             <img src={images.Headphone} alt="customer_care" />
//           </div>
//         </Link>
//
//         <Link to={'/'}>
//           <div className="hover:scale-95">
//             <img src={images.Bell} alt="customer_care" />
//           </div>
//         </Link>
//         <Link to={'/'}>
//           <div className="hover:scale-95">
//             <img src={images.Settings} alt="customer_care" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };
//
// export default ActionButtons;


import { useEffect, useRef, useState } from "react"
import NotificationModal from "/src/components/navbar/_components/NotificationModalProps"
import { Link } from "react-router-dom"
import { images } from '../../../../../constants';

const ActionButtons = () => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const notificationRef = useRef(null)
  const userEmail = localStorage.getItem("userEmail")

  const fetchNotifications = async () => {
    try {
      if (!userEmail) {
        console.error("No user email found in localStorage")
        return
      }

      const response = await fetch(
        `http://localhost:8081/api/v1/user-actions?customerId=${encodeURIComponent(userEmail)}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setNotifications(data.content)
      const unreadCount = data.content.filter((notification) => !notification.read).length
      setNotificationCount(unreadCount)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  useEffect(() => {
    fetchNotifications()
    // Set up polling to fetch notifications every 5 minutes
    const intervalId = setInterval(fetchNotifications, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [userEmail])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleNotificationClick = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/user-actions/${notificationId}/read?customerId=${encodeURIComponent(userEmail)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Update the local state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
      setNotificationCount((prevCount) => Math.max(0, prevCount - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex space-x-16 justify-center items-center">
        <Link href={'/'} className="md:flex items-center hidden">
          <div className="hover:scale-95">
            <img src={images.Headphone} alt="customer_care" />
          </div>
        </Link>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="hover:scale-95 focus:outline-none relative p-2"
            aria-label="Notifications"
          >
            <div className="hover:scale-95">
              <img src={images.Bell || "/placeholder.svg"} alt="notifications" />
            </div>
            {notificationCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </button>
          <NotificationModal
            isOpen={isModalOpen}
            notifications={notifications}
            onClose={() => setIsModalOpen(false)}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>

        <Link to={'/'}>
          <div className="hover:scale-95">
            <img src={images.Settings} alt="customer_care" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ActionButtons