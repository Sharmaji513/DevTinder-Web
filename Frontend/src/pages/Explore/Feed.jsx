import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserCard from "../../components/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addFeed } from "../../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/v1/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Number of cards to show in the stack (top card + background cards)
  const VISIBLE_CARDS = 3;

  return (
    <div className="flex flex-col md:flex-row min-h-screen   ">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden sm:hidden md:block md:w-48 lg:w-80 xl:w-96 fixed top-0 h-full">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center md:ml-64 lg:ml-80 xl:ml-96 overflow-hidden">
        {feed?.length > 0 ? (
          <div className="relative w-full max-w-[100%] sm:max-w-[28rem] md:max-w-[30rem] lg:max-w-[36rem] xl:max-w-[40rem] h-[90vh] sm:h-[80vh]">
            {feed.slice(0, VISIBLE_CARDS).map((user, index) => (
              <UserCard
                key={user._id}
                user={user}
                index={index}
                isTopCard={index === 0}
                totalVisibleCards={VISIBLE_CARDS}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4 p-6 sm:p-8 bg-base-200 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
            <h2 className="text-gray-500 text-lg sm:text-xl md:text-2xl font-medium">
              No Feed Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;