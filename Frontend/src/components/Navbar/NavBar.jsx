import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import axios from "axios";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
  FaBell,
  FaEnvelope,
  FaCompass,
  FaUserEdit,
} from "react-icons/fa";
import { TbMessageChatbotFilled } from "react-icons/tb";

const NavBar = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-base-300 shadow-md fixed w-full z-50">
      <div className="max-w-screen-2xl flex items-center justify-between gap-5 mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🦸🏻</span>
          <span className="text-2xl font-mono text-blue-600  sm:inline ">
            tinderDev
          </span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {!user ? (
            <Link to="/login">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <FaUserCircle size={20} />
                <span>Login</span>
              </button>
            </Link>
          ) : (
            <>
              <span className="text-sm font-medium text-gray-700">
                Welcome, {user.firstName || user.data?.firstName}
              </span>
              <div className="relative group">
                <div className="avatar">
                  <div className="w-10 rounded-full overflow-hidden">
                    <img
                      src={
                        user.photoUrl ||
                        user.data?.photoUrl ||
                        "/default-profile.png"
                      }
                      alt="User profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                {/* Desktop Dropdown */}
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-10">
                  <li>
                    <Link
                      to="/dashboard"
                      className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                        location.pathname === "/dashboard" ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      <FaTachometerAlt size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/connections"
                      className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                        location.pathname === "/connections" ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      <FaUsers size={16} />
                      <span>Connections</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/requests"
                      className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                        location.pathname === "/requests" ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      <FaBell size={16} />
                      <span>Notifications</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/messages"
                      className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                        location.pathname === "/messages" ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      <FaEnvelope size={16} />
                      <span>Messages</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                    >
                      <FaSignOutAlt size={16} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu (Hamburger) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 flex justify-end w-full rounded-b-xl">
            <ul className="flex flex-col p-4 ">
              {!user ? (
                <li>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 py-3 px-4 text-white bg-blue-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    onClick={toggleMenu}
                  >
                    <FaUserCircle size={24} />
                    <span className="text-lg font-medium">Login</span>
                  </Link>
                </li>
              ) : (
                <>
                 
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="flex items-center space-x-3 py-3 px-4 text-white bg-blue-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg "
                    >
                      <FaSignOutAlt size={24} />
                      <span className="text-lg font-medium">Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Mobile Bottom Navigation Bar */}
        {user && (
          <div className="fixed bottom-0 left-0 w-full bg-black shadow-lg md:hidden z-50">
            <div className="flex justify-around items-center py-3 px-4">
              <Link
                to="/feed"
                className={`flex flex-col items-center p-2 rounded-full ${
                  location.pathname === "/explore"
                    ? " text-blue-600"
                    : "text-gray-500  hover:text-blue-700"
                }`}
              >
                <FaCompass
                  size={26}
                  className={location.pathname === "/feed" ? "text-blue-600" : "text-gray-500"}
                />
                <span className="text-xs mt-1">Explore</span>
              </Link>
              <Link
                to="/connections"
                className={`flex flex-col items-center p-2 rounded-full ${
                  location.pathname === "/connections"
                    ? " text-blue-600"
                    : "text-gray-500  hover:text-blue-700"
                }`}
              >
                <FaUsers
                  size={26}
                  className={location.pathname === "/connections" ? "text-blue-600" : "text-gray-500"}
                />
                <span className="text-xs mt-1">Connections</span>
              </Link>
              <Link
                to="/requests"
                className={`flex flex-col items-center p-2 rounded-full ${
                  location.pathname === "/requests"
                    ? " text-blue-600"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <FaBell
                  size={26}
                  className={location.pathname === "/requests" ? "text-blue-600" : "text-gray-500"}
                />
                <span className="text-xs mt-1">Notifications</span>
              </Link>
              <Link
                to="/messages"
                className={`flex flex-col items-center p-2 rounded-full ${
                  location.pathname === "/messages"
                    ? " text-blue-600"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <TbMessageChatbotFilled
                  size={26}
                  className={location.pathname === "/messages" ? "text-blue-600" : "text-gray-500"}
                />
                <span className="text-xs mt-1">Messages</span>
              </Link>
              <Link
                to="/profile"
                className={`flex flex-col items-center p-2 rounded-full ${
                  location.pathname === "/profile"
                    ? " text-blue-600"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <FaUserEdit
                  size={26}
                  className={location.pathname === "/profile" ? "text-blue-600" : "text-gray-500"}
                />
                <span className="text-xs mt-1">Profile</span>
              </Link>
              
              {/* <button
                onClick={handleLogout}
                className="flex flex-col items-center p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-700"
              >
                <FaSignOutAlt size={26} className="text-gray-500" />
                <span className="text-xs mt-1">Logout</span>
              </button> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;