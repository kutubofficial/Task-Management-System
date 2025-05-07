import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, isAuthenticated } from "../utils/auth";
import { getNotifications } from "../api/tasks";
import Notification from "./Notification";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((noti) => !noti.isRead).length;

  useEffect(() => {
    if (isAuthenticated()) {
      fetchNotifications();

      // Set up polling for new notifications every 30 seconds.....
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data || []);
      console.log("DATA====>", data?.noti);
      console.log("DATA LENGHT====>", data.length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = (id) => {
    // Update the notification's isRead status in state
    setNotifications((prev) =>
      prev.map((noti) => (noti._id === id ? { ...noti, isRead: true } : noti))
    );
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md w-full">
      <div className="mx-auto max-w-screen-lg px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold hover:text-blue-200 whitespace-nowrap"
        >
          Task Manager
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {isAuthenticated() ? (
            <>
              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="hover:text-blue-200 flex items-center p-1 relative"
                  aria-label="Notifications"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <Notification
                  notifications={notifications}
                  isOpen={showNotifications}
                  onClose={() => setShowNotifications(false)}
                  onMarkedAsRead={handleMarkAsRead}
                />
              </div>
              <Link
                to="/profile"
                className="hover:text-blue-200 hidden sm:block whitespace-nowrap"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-blue-200 flex items-center gap-1"
                aria-label="Logout"
              >
                <span className="hidden sm:inline whitespace-nowrap">
                  Logout
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-200 bg-blue-700 px-3 py-1 rounded-md whitespace-nowrap"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
