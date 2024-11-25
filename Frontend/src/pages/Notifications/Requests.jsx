import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.request);
  console.log(requests);

  const connectionRequest = async () => {
    const res = await axios.get(BASE_URL + "user/requests/received", {
      withCredentials: true,
    });
    console.log(res);
    dispatch(addRequests(res.data.data));
  };


  useEffect(() => {
    connectionRequest();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <Sidebar />
      </div>

      {/* Notifications Section */}
      <div className="w-full md:w-3/4">
        <h1 className="text-2xl mt-16 font-bold text-center text-white mb-8">
          Pending Requests
        </h1>
        {requests?.length > 0 ? (
          requests.map((request) => {
            const {
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = request.fromUserId;

            return (
              <div
                key={request.id}
                className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-4xl mx-auto p-6 rounded-lg bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 mb-6"
              >
              
                <img
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                  src={photoUrl || "https://via.placeholder.com/150"}
                />

              
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-bold text-xl text-white">
                    {firstName + " " + lastName}
                  </h2>
                  <p className="text-green-600 mt-2">{about || "No bio provided."}</p>
                  {age && gender && (
                    <p className="text-gray-500 mt-1"> {age} years old, {gender}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                <Link  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition duration-200 cursor-pointer">
                  Interested
                </Link>
                <Link className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 transition duration-200 cursor-pointer">
                  Ignore
                </Link>
                </div>

              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No connection requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
