import React from "react";
import { TbCardsFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";


const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open gap-20 fixed inset-0 mt-16">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
      <label
        for="my-drawer-2"
        className="btn btn-primary drawer-button hidden"
      >
        <GiHamburgerMenu />
      </label>
    </div>
    <div className="drawer-side ">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-300 text-base-content h-full w-80 p-10 gap-10 text-2xl">
        <li>
          <Link to="/feed"><TbCardsFilled /> Explore</Link>
        </li>
        <li>
          <Link to="/connections"><FaUsers /> Connections</Link>
        </li>
        <li>
          <Link to="/requests"><FaBell /> Notifications</Link>
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
