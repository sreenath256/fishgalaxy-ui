import React, { useState } from "react";
import {
  FiEdit,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { RiChatHistoryLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { pr1 } from "../assets";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Fishgalaxy",
    email: "fishgalaxy@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    password: "********",
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes
      setProfile({ ...tempProfile });
    } else {
      // Start editing - copy current profile to temp
      setTempProfile({ ...profile });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-mainclr to-mainhvr px-6 py-8 text-center">
            <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg">
              <img
                src={pr1}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-mainclr text-white rounded-full p-2 hover:bg-mainhvr transition-colors">
                <FiEdit size={16} />
              </button>
            </div>
            <h1 className="mt-4 text-2xl font-medium text-white">
              {profile.name}
            </h1>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm md:text-xl font-medium">
                Personal Information
              </h2>
              <button
                onClick={handleEditClick}
                className="flex text-sm md:text-base items-center text-mainclr hover:text-mainclr"
              >
                <FiEdit className="mr-1" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div className="flex items-center ">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <FiUser className="text-mainclr" size={20} />
                </div>
                <div className="ml-4 flex-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={tempProfile.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.name}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="flex items-center ">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <FiMail className="text-mainclr" size={20} />
                </div>
                <div className="ml-4 flex-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempProfile.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.email}</p>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <FiPhone className="text-mainclr" size={20} />
                </div>
                <div className="ml-4 flex-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={tempProfile.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.phone}</p>
                  )}
                </div>
              </div>

              {/* Address Field */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <FiMapPin className="text-mainclr" size={20} />
                </div>
                <div className="ml-4 flex-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={tempProfile.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.address}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <FiLock className="text-mainclr" size={20} />
                </div>
                <div className="ml-4 flex-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Password
                  </label>
                  {isEditing ? (
                    <input
                      type="password"
                      name="password"
                      value={tempProfile.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-b border-gray-300 focus:border-mainclr focus:outline-none py-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.password}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Controls */}
            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-mainclr text-white rounded-md hover:bg-mainhvr"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Additional Sections */}
          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium">Account Settings</h3>
            <div className="mt-4 space-y-3">
              <Link to={"/my-order"}>
                <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-50 rounded-md">
                  My Order
                  <HiOutlineShoppingBag/>
                </button>
              </Link>
              <Link to={"/"}>
                <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-50 rounded-md text-red-600">
                  Logout
                  <IoLogOutOutline/>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
