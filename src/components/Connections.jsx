import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((state) => state?.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      if (res?.data?.data?.length > 0) {
        dispatch(addConnections(res?.data?.data));
      } else {
        dispatch(addConnections([]));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections?.length === 0) {
    return (
      <h2 className="text-3xl font-bold text-center my-8">
        No Connections Found!
      </h2>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-8">Connections</h2>

      <div className="flex flex-col items-center mb-20">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={_id}
              className="w-2/3 p-4 rounded-2xl mb-4 flex bg-base-300"
            >
              <div className="w-[10%] mr-4 justify-center items-center">
                <img
                  src={photoUrl}
                  alt="User Photo"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="w-[90%]">
                <h3 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h3>
                <p className="text-lg">{`${age}, ${gender}`}</p>
                <p className="text-sm">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
