import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const handleInputChange = (e) => {
    if (e?.target?.name === "firstName") {
      setFirstName(e?.target?.value);
    } else if (e?.target?.name === "lastName") {
      setLastName(e?.target?.value);
    } else if (e?.target?.name === "email") {
      setEmailId(e?.target?.value);
    } else if (e?.target?.name === "password") {
      setPassword(e?.target?.value);
    } else if (e?.target?.name === "age") {
      setAge(e?.target?.value);
    } else {
      setGender(e?.target?.value);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signin",
        {
          emailId,
          password,
        },
        { withCredentials: true } // To store cookies on browser while using axios
      );

      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
        setError("");
        return navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password, age, gender },
        { withCredentials: true }
      );

      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
        setFirstName("");
        setLastName("");
        setEmailId("");
        setPassword("");
        setAge("");
        setGender("");
        setError("");
        return navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data?.error);
      console.error("ERR : ", err?.response?.data?.error);
    }
  };

  return (
    <div className="card card-border bg-base-300 w-96 justify-self-center mt-8">
      <div className="card-body">
        <h2 className="card-title justify-center">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        <div>
          {!isSignIn && (
            <>
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
            </>
          )}

          <fieldset className="fieldset mb-4">
            <legend className="fieldset-legend">Email ID :</legend>
            <input
              type="text"
              className="input"
              name="email"
              value={emailId}
              onChange={handleInputChange}
            />
          </fieldset>

          <fieldset className="fieldset mb-4">
            <legend className="fieldset-legend">Password :</legend>
            <input
              type="password"
              className="input"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </fieldset>

          {!isSignIn && (
            <>
              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend">Age :</legend>
                <input
                  type="number"
                  className="input"
                  name="age"
                  value={age}
                  onChange={handleInputChange}
                />
              </fieldset>

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
            </>
          )}
        </div>

        <p className="text-red-500">{error}</p>

        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={isSignIn ? handleSignIn : handleSignUp}
          >
            Sign In
          </button>
        </div>

        <p
          onClick={() => {
            setIsSignIn((value) => !value);
            setError("");
          }}
          className="my-2 text-primary text-center underline cursor-pointer"
        >
          {isSignIn ? "New User? Sign Up Here" : "Existing User? Sign In Here"}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
