import { useEffect, useRef, useState } from 'react';
import NotificationModal from '/src/components/navbar/_components/NotificationModalProps';
import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';
import { useSelector } from 'react-redux';

const ActionButtons = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef(null);
  const customerId = useSelector((state) => state.user.user.customerId);

  const fetchNotifications = async () => {
    try {
      if (!customerId) {
        console.error('No customer ID found');
        return;
      }

      const apiUrl = `https://payina-be-6f08cdfb4414.herokuapp.com/api/v1/user-actions?customerId=${encodeURIComponent(customerId)}&page=0&size=20`;
      console.log('Fetching notifications from:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Notification data received:', data);

      if (data && data.content) {
        setNotifications(data.content);
        const unreadCount = data.content.filter((notification) => !notification.read).length;
        setNotificationCount(unreadCount);
        console.log(`Found ${unreadCount} unread notifications`);
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    console.log('ActionButtons component mounted, fetching notifications...');
    fetchNotifications();

    // Set up polling to fetch notifications every 5 minutes
    const intervalId = setInterval(
      () => {
        console.log('Polling for new notifications...');
        fetchNotifications();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [customerId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // New useEffect to mark all notifications as read when modal opens
  useEffect(() => {
    if (isModalOpen && notifications.length > 0) {
      const unreadNotifications = notifications.filter((notification) => !notification.read);
      if (unreadNotifications.length > 0) {
        // Mark all unread notifications as read
        unreadNotifications.forEach((notification) => {
          handleMarkAsRead(notification.id);
        });
      }
    }
  }, [isModalOpen, notifications]);

  const handleNotificationClick = () => {
    console.log('Notification bell clicked, toggling modal...');
    console.log('Current notifications:', notifications);
    setIsModalOpen(!isModalOpen);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      // Fixed: using customerId instead of userEmail
      const apiUrl = `https://payina-be-6f08cdfb4414.herokuapp.com/api/v1/user-actions/${notificationId}/read?customerId=${encodeURIComponent(customerId)}`;
      console.log('Marking notification as read:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the local state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setNotificationCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex space-x-16 justify-center items-center">
        <Link to={'/'} className="md:flex items-center hidden">
          {/* Fixed: changed href to to since we're using react-router */}
          <div className="hover:scale-95">
            <img src={images.Headphone} alt="customer_care" />
          </div>
        </Link>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={handleNotificationClick}
            className="hover:scale-95 focus:outline-none relative p-2"
            aria-label="Notifications">
            <div className="hover:scale-95">
              <img src={images.Bell || '/placeholder.svg'} alt="notifications" />
            </div>
            {notificationCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </button>
          {isModalOpen && (
            <NotificationModal
              isOpen={isModalOpen}
              notifications={notifications}
              onClose={() => setIsModalOpen(false)}
              onMarkAsRead={handleMarkAsRead}
            />
          )}
        </div>

        <Link to={'/'}>
          <div className="hover:scale-95">
            <img src={images.Settings} alt="customer_care" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
