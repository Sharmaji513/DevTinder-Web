import React from "react";
import { TbCardsFilled } from "react-icons/tb";
import { FaUsers, FaUserEdit, FaEye, FaBell, FaBellSlash } from "react-icons/fa"; // FaBellSlash for inactive icon
import { MdOutlineNotifications, MdOutlineNotificationsActive } from "react-icons/md"
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Sidebar = () => {

  return (
    <div className="drawer lg:drawer-open gap-20 fixed inset-0 mt-16">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button hidden"
        >
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-300 text-base-content h-full w-80 p-10 gap-10 text-2xl">
          <li>
            <Link to="/feed"><TbCardsFilled /> Explore</Link>
          </li>
          <li>
            <Link to="/connections"><FaUsers /> Connections</Link>
          </li>
          <li>
            <Link to="/requests">
             <MdOutlineNotifications />   Notifications
            </Link>
          </li>
          <li>
            <Link to="/view"><FaEye /> Views</Link>
          </li>
          <li>
            <Link to="/profile"><FaUserEdit /> Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
