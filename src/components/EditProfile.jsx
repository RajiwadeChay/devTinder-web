import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "photoUrl") {
      setPhotoUrl(e.target.value);
    } else if (e.target.name === "age") {
      setAge(e.target.value);
    } else if (e.target.name === "gender") {
      setGender(e.target.value);
    } else {
      setAbout(e.target.value);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );

      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
        setError("");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="card card-border bg-base-300 w-96 justify-self-center mt-8 mr-8">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <div>
              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">First Name :</legend>
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                />
              </fieldset>

              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">Last Name :</legend>
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                />
              </fieldset>

              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">Photo URL :</legend>
                <input
                  type="text"
                  className="input"
                  name="photoUrl"
                  value={photoUrl}
                  onChange={handleInputChange}
                />
              </fieldset>

              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">Age :</legend>
                <input
                  type="text"
                  className="input"
                  name="age"
                  value={age}
                  onChange={handleInputChange}
                />
              </fieldset>

              {/* <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">Gender :</legend>
                <input
                  type="text"
                  className="input"
                  name="gender"
                  value={gender}
                  onChange={handleInputChange}
                />
              </fieldset> */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender :</legend>
                <select
                  defaultValue={gender}
                  className="select"
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </fieldset>

              {/* <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">About :</legend>
                <input
                  type="text"
                  className="input"
                  name="about"
                  value={about}
                  onChange={handleInputChange}
                />
              </fieldset> */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About :</legend>
                <textarea
                  className="textarea h-24"
                  value={about}
                  name="about"
                  onChange={handleInputChange}
                ></textarea>
              </fieldset>
            </div>

            <p className="text-red-500">{error}</p>

            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
