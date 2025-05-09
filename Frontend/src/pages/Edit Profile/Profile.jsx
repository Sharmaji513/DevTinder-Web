import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((store) => store?.user);
    
    return (
        <div className="flex flex-col md:flex-row md:gap-[5vw] min-h-screen">
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block md:w-1/5 shadow-lg fixed h-full">
                <Sidebar />
            </div>
            
            {/* Mobile header with back button */}
            <div className="md:hidden p-4 bg-base-200 shadow-md">
                <button className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            {/* Profile Content */}
            <div className="md:ml-[20%] w-full md:w-4/5 p-4 ">
                {user && <EditProfile user={user} />}
            </div>
        </div>
    );
};

export default Profile;