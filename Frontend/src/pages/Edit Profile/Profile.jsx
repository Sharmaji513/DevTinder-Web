import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.user);
  console.log(user);
  
  return (
    <div className="flex gap-[5vw] min-h-screen">
      {/* Sidebar Section */}
      <div className="w-1/5 shadow-lg fixed">
        <Sidebar />
      </div>

      {/* Profile Content */}
      {user && (
      <div className="flex flex-col">
        <EditProfile user={user} />
      </div>
    )}
    </div>
  );
};

export default Profile;
