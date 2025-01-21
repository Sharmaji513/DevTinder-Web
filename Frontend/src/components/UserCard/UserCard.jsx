import React from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { removeFeed } from "../../utils/feedSlice";
import { useDispatch } from "react-redux";


const UserCard = ({user}) => {
  
  const { _id,firstName, lastName, photoUrl, age, skills, gender, about } = user || "";
  // console.log(user);
  
  const dispatch = useDispatch();

  const handleSendConnectionRequest = async(status , userId)=>{

    const res = await axios.post(BASE_URL +"/api/v1//request/send/" + status + "/" + userId  ,   {},{ withCredentials: true })
    // console.log(res);
    dispatch(removeFeed(userId))
    
  }
  
  return user && (
 
    <div className="flex justify-center items-center min-h-screen ">
      <div className="card w-screen  bottom-0 md:w-[25vw] h-screen md:h-[38vw]  rounded-2xl shadow-2xl relative overflow-hidden bg-base-300 ">
        <figure className="relative h-screen w-screen md:w-full md:h-full  ">
          <img
            className="w-full h-full object-cover object-center opacity-90  "
            src={photoUrl}
            alt="MS Dhoni"
          />
          <div className="absolute bottom-0 left-0 w-full  bg-gradient-to-t from-black via-transparent to-transparent py-2 px-2  ">
            <div className="relative">
              <div className="absolute   inset-0 bg-gradient-to-r from-black to-transparent opacity-75 rounded-lg "></div>
              {firstName && lastName && (
                <h1 className="relative text-3xl w-full px-2 mt-2 font-bold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
                  {firstName + " " + lastName}
                </h1>
              )}

              <h3 className="relative text-sm px-2 mt-1 font-medium text-white  drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
                {about}
              </h3>

              {age && gender && (
                <h5 className="relative text-sm px-2 mt-1 flex  justify-between  font-medium text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
                  🎂{age} , 🧑‍🤝‍🧑{gender.toUpperCase()} 🕓Active few hour
                </h5>
              )}
            </div>
          </div>
          <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 flex gap-10">
            <div onClick={()=> handleSendConnectionRequest('ignored' , _id)} className="text-center cursor-pointer flex items-center justify-center w-16 h-16 text-3xl text-black rounded-full bg-white shadow-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition-transform">
              ❌
            </div>
            <div onClick={()=> handleSendConnectionRequest('interested' , _id)} className="text-center cursor-pointer flex items-center justify-center w-16 h-16 text-3xl text-black rounded-full bg-white shadow-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] hover:scale-110 transition-transform">
              💙
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default UserCard;
