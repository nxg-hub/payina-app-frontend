import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotificationModal = ({ isOpen, notifications = [], onClose, onMarkAsRead }) => {
  if (!isOpen) return null;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    if (isOpen && notifications && notifications.length > 0) {
      notifications.forEach((notification) => {
        if (!notification.read) {
          onMarkAsRead(notification.id);
        }
      });
    }
  }, [isOpen, notifications, onMarkAsRead]);

  return (
    <div className="absolute right-0 top-12 w-96 z-50 bg-white border rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-lg text-lightBlue">Notifications</h3>
        <button onClick={onClose} className="text-lightBlue hover:text-lightBlueDark">
          ✕
        </button>
      </div>
      <div className="max-h-[32rem] overflow-y-auto">
        {!notifications || notifications.length === 0 ? (
          <div className="text-lightBlue text-sm p-4 text-center">No notifications yet</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.slice(0, 20).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${
                  notification.successful ? 'bg-green-50' : 'bg-red-50'
                } hover:bg-opacity-80 transition-colors duration-200`}>
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm text-lightBlue">
                    {/*{notification.actionType}*/}
                    <p className="text-sm mt-1 text-lightBlue">{notification.description}</p>
                  </span>
                  <span className="text-xs text-lightBlue">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
                {/*<p className="text-sm mt-1 text-lightBlue">{notification.description}</p>*/}
              </div>
            ))}
          </div>
        )}
      </div>
      {/*<div className="p-4 border-t text-center">*/}
      {/*  <Link to="/notifications" className="text-lightBlue hover:text-lightBlueDark font-medium">*/}
      {/*    See All Notifications*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </div>
  );
};

export default NotificationModal;