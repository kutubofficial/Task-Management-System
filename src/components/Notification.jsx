import React from "react";
import dayjs from "dayjs";
import { markNotificationAsRead } from "../api/tasks";
import { toast } from "react-toastify";

const Notification = ({
  notifications = [],
  isOpen,
  onClose,
  onMarkedAsRead,
}) => {
  // Filter to only show ----> unread notifications.
  const unreadNotifications = notifications.filter((noti) => !noti.isRead);

  const handleMarkAsRead = async (id) => {
    try {
      
      onMarkedAsRead(id);

      
      await markNotificationAsRead(id);

      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  return (
    <div
      className={`fixed z-50 top-16 right-4 ${isOpen ? "block" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center p-3 bg-blue-700 text-white">
          <div className="flex items-center mx-auto">
            <h3 className="font-semibold text-lg">Notifications</h3>
            {unreadNotifications?.length > 0 && (
              <span className="ml-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications?.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-0.5 px-2 cursor-pointer rounded-full hover:bg-blue-500"
            aria-label="Close notifications"
          >
            ×
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {unreadNotifications?.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No new notifications
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {unreadNotifications?.map((notification) => (
                <li key={notification._id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {dayjs(notification.createdAt).format("MMM D, h:mm A")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="ml-2 flex-shrink-0 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Mark Read
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
