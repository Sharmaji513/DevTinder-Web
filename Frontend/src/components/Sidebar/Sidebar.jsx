// src/components/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import { TbCardsFilled } from "react-icons/tb";
import { FaUsers, FaUserEdit, FaEye } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { SubscriptionCard } from "../SubscriptionCard/SubscriptionCard";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="absolute drawer lg:drawer-open inset-0 mt-16 h-full lg:fixed">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className={`drawer-content flex flex-col items-center justify-center ${isModalOpen ? "blur-sm" : ""}`}>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button hidden"
        >
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 text-base-content h-full w-80 p-10 gap-5 text-xl">
          <li>
            <Link to="/feed" className={location.pathname === "/feed" ? "text-blue-600" : ""}>
              <TbCardsFilled /> Explore
            </Link>
          </li>
          <li>
            <Link to="/connections" className={location.pathname === "/connections" ? "text-blue-600" : ""}>
              <FaUsers /> Connections
            </Link>
          </li>
          <li>
            <Link to="/requests" className={location.pathname === "/requests" ? "text-blue-600" : ""}>
              <MdOutlineNotifications /> Notifications
            </Link>
          </li>
          <li>
            <button onClick={openModal} className={location.pathname === "/view" ? "text-blue-600" : ""}>
              <FaEye /> Views
            </button>
          </li>
          <li>
            <Link to="/messages" className={location.pathname === "/messages" ? "text-blue-600" : ""}>
              <AiOutlineMessage /> Messages
            </Link>
          </li>
          <li>
            <Link to="/profile" className={location.pathname === "/profile" ? "text-blue-600" : ""}>
              <FaUserEdit /> Profile
            </Link>
          </li>
        </ul>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <dialog
              id="subscription_modal"
              className="modal modal-open flex justify-center items-center"
            >
              <div className="modal-box relative">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <SubscriptionCard />
              </div>
            </dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;