import React, { useState } from "react";
import { TbCardsFilled } from "react-icons/tb";
import { FaUsers, FaUserEdit, FaEye } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { SubscriptionCard } from "../SubscriptionCard/SubscriptionCard";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="absolute drawer lg:drawer-open  inset-0 mt-16 h-full ">
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
        <ul className="menu bg-base-300 text-base-content h-full w-80 p-10 gap-10 text-2xl">
          <li>
            <Link to="/feed">
              <TbCardsFilled /> Explore
            </Link>
          </li>
          <li>
            <Link to="/connections">
              <FaUsers /> Connections
            </Link>
          </li>
          <li>
            <Link to="/requests">
              <MdOutlineNotifications /> Notifications
            </Link>
          </li>
          <li>
            <button onClick={openModal} className="flex items-center gap-2">
              <FaEye /> Views
            </button>
          </li>
          <li>
            <button onClick={openModal} className="flex items-center gap-2">
            <AiOutlineMessage /> Messages
            </button>
          </li>
          <li>
            <Link to="/profile">
              <FaUserEdit /> Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Modal and Overlay */}
      {isModalOpen && (
        <>
          {/* Background Blur Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

          {/* Modal Content */}
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
