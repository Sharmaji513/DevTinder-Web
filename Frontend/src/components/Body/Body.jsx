import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((store) => store?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/feed"); // Redirect to feed if user is logged in
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
