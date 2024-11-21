import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Profile = () => {
  return (
    <div className="flex  gap-[20vw]">
      <div>
        <Sidebar />
      </div>

      <div>edit profile</div>
    </div>
  );
};

export default Profile;
