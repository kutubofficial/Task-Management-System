import React, { useState, useEffect } from "react";
import { getProfile } from "../../api/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-gray-500">No profile data available</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-gray-100"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
            >
              Edit Profile
            </button>
            <button
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
