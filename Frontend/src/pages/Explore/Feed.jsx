import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Feed = () => {
  return (
    <div className="flex  gap-[20vw]">
      <div>
        <Sidebar />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-[25vw] h-[38vw] rounded-2xl shadow-2xl relative overflow-hidden">
          <figure className="relative w-full h-full">
            <img
              className="w-full h-full object-cover"
              src="https://i.pinimg.com/736x/46/73/c8/4673c8705087f0dd4eb9eefe071a9802.jpg"
              alt="MS Dhoni"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent py-6 px-2 ">
              <div className="relative">
                <div className="absolute  inset-0 bg-gradient-to-r from-black to-transparent opacity-75 rounded-lg "></div>
                <h1 className="relative text-3xl w-full px-2  font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
                  MS Dhoni, 16
                </h1>
                <h3 className="relative text-lg px-2  font-medium text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
                  Indian international cricketer
                </h3>
                <h3 className="relative text-sm px-2  font-light text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
                  Cricketer, Batsman, Athlete
                </h3>
              </div>
            </div>
            <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 flex gap-10">
              <div className="text-center flex items-center justify-center w-16 h-16 text-3xl text-black rounded-full bg-white shadow-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition-transform">
                ❌
              </div>
              <div className="text-center flex items-center justify-center w-16 h-16 text-3xl text-black rounded-full bg-white shadow-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition-transform">
                💙
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Feed;
