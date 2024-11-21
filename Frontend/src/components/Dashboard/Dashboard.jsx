import React from "react";
import Feed from "../../pages/Explore/Feed";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex  gap-[20vw]">
      <div>
        <Sidebar />
      </div>

      <div>
        <Feed />
      </div>
    </div>
  );
};

export default Dashboard;
