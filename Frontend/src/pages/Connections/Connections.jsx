import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/v1/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessage = (connectionId) => {
    console.log(`Initiate messaging with connection ID: ${connectionId}`);
    // Replace with actual messaging logic (e.g., navigate to chat)
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-full md:w-64 md:fixed md:h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-4 md:ml-64">
        <h1 className="text-xl md:text-3xl font-bold text-white text-center my-4 md:my-6">
          Connections
        </h1>

        {connections?.length > 0 ? (
          <div className="grid gap-3 md:gap-4 max-w-3xl mx-auto">
            {connections.map((connection, index) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;
              return (
                <div
                  key={_id || index}
                  className="flex items-center p-3 md:p-4 rounded-xl bg-base-300 w-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover"
                      src={photoUrl || "https://via.placeholder.com/80"}
                    />
                  </div>
                  <div className="ml-3 md:ml-4 flex-1">
                    <h2 className="font-bold text-base md:text-xl">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-xs md:text-base text-gray-300">
                        {age}, {gender}
                      </p>
                    )}
                    <p className="text-xs md:text-base text-gray-400 line-clamp-2">
                      {about}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-2 md:ml-4">
                    <button
                      onClick={() => handleMessage(_id)}
                      className="btn btn-primary btn-xs md:btn-md text-white px-2 md:px-4"
                      aria-label={`Message ${firstName} ${lastName}`}
                    >
                      Message
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className="text-lg md:text-xl text-gray-400 text-center mt-16 md:mt-20">
            No Connections Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Connections;