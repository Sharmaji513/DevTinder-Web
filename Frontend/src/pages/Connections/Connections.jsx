import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  // console.log(connections); //testing log
  

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/v1/user/connections", { withCredentials: true});
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
            <h1 className="text-bold text-white text-3xl">Connections</h1>

       
        {connections?.length > 0 ? (
          connections.map((connection) => {
            const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
            
            return (
              <div  className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" >
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full"
                    src={photoUrl}
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
          <h2 className="text-grey text-xl relative top-52 ">No Connections Found</h2>
        )}
      </div>
    </div>
  );
};

export default Connections;
