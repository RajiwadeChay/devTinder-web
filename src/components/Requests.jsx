import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((state) => state?.requests);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      if (res?.data?.data?.length > 0) {
        dispatch(addRequests(res?.data?.data));
      } else {
        dispatch(addRequests([]));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.data) {
        dispatch(removeRequest(_id));
        setToastMsg(res?.data?.message);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMsg("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests?.length === 0) {
    return (
      <h2 className="text-3xl font-bold text-center my-8">
        No Requests Found!
      </h2>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-8">Requests</h2>

      <div className="flex flex-col items-center">
        {requests?.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId;

          return (
            <div
              key={_id}
              className="w-2/3 p-4 rounded-2xl mb-4 flex bg-base-300"
            >
              <div className="w-[10%] mr-4 flex justify-center items-center">
                <img
                  src={photoUrl}
                  alt="User Photo"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="w-[60%]">
                <h3 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h3>
                <p className="text-lg">{`${age}, ${gender}`}</p>
                <p className="text-sm">{about}</p>
              </div>
              <div className="w-[30%] flex justify-around items-center">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Interested
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
