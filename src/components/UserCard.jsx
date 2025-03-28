import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, isEditProfile = false }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res?.data?.data) {
        dispatch(removeUserFromFeed(userId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm justify-self-center my-8 mb-40">
      <figure>
        <img
          src={photoUrl}
          alt="User Profile Photo"
          className="h-80 object-cover overflow-hidden"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{`${age}, ${gender}`}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => sendRequest("ignored", _id)}
            disabled={isEditProfile}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => sendRequest("interested", _id)}
            disabled={isEditProfile}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
