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
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex w-full gap-[20vw] top-10">
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full text-center my-20">
        <h1 className="font-bold text-white text-3xl">Connections</h1>

        {connections?.length > 0 ? (
          connections.map((connection, index) => {
            if (!connection) return   <p className="text-center mt-5 text-gray-500">No connection found.</p>

            const { firstName, lastName, photoUrl, age, gender, about } = connection;

            return (
              <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-4xl mx-auto p-6 rounded-lg bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 mb-6"
            >
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full"
                    src={photoUrl || "/default-avatar.png"} // Provide a default image if photoUrl is missing
                  />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center mt-5 text-gray-500">No connection found.</p>
        )}
      </div>
    </div>
  );
};

export default Connections;
