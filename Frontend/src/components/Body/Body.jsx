import React from "react";
import NavBar from "../Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
     
    </div>
  );
};

export default Body;
