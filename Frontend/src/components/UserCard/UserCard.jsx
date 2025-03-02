import React from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { removeFeed } from "../../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  if (!user) return null; // Prevent rendering if user is undefined

  const { _id, firstName, lastName, photoUrl, age, skills, gender, about } = user;

  const dispatch = useDispatch();

  const handleSendConnectionRequest = async (status, userId) => {
    if (!userId) return; // Prevent API call if userId is missing

    try {
      console.log("Sending request to userId:", userId);
      const res = await axios.post(
        `${BASE_URL}/api/v1/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Response:", res.data);

      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-screen md:w-[25vw] h-screen md:h-[38vw] rounded-2xl shadow-2xl relative overflow-hidden bg-base-300">
        <figure className="relative h-screen w-screen md:w-full md:h-full">
          {/* User Image */}
          <img className="w-full h-full object-cover opacity-90" src={photoUrl} alt={`${firstName} ${lastName}`} />

          {/* User Details */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent py-2 px-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-75 rounded-lg"></div>
              
              {/* User Name */}
              {firstName && lastName && (
                <h1 className="relative text-3xl w-full px-2 mt-2 font-bold text-white drop-shadow-md">
                  {firstName} {lastName}
                </h1>
              )}

              {/* About */}
              {about && (
                <h3 className="relative text-sm px-2 mt-1 font-medium text-white drop-shadow-md">
                  {about}
                </h3>
              )}

              {/* Age & Gender */}
              {(age || gender) && (
                <h5 className="relative text-sm px-2 mt-1 flex justify-between font-medium text-white drop-shadow-md">
                  🎂 {age} {gender ? `, 🧑‍🤝‍🧑 ${gender.toUpperCase()}` : ""} 🕓 Active few hours ago
                </h5>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 flex gap-10">
            <button
              onClick={() => handleSendConnectionRequest("ignored", _id)}
              className="text-center cursor-pointer flex items-center justify-center w-16 h-16 text-3xl text-black rounded-full bg-white shadow-xl hover:scale-110 transition-transform"
            >
              ❌
            </button>
            <button
              onClick={() => handleSendConnectionRequest("interested", _id)}
              className="text-center cursor-pointer flex items-center justify-center w-16 h-16 text-3xl text-black rounded-full bg-white shadow-xl hover:scale-110 transition-transform"
            >
              💙
            </button>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default UserCard;
