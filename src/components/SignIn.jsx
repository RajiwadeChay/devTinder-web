import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [emailId, setEmailId] = useState("stark@gmail.com");
  const [password, setPassword] = useState("Stark@007");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmailId(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/signin",
        {
          emailId,
          password,
        },
        { withCredentials: true } // To store cookies on browser while using axios
      );

      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card card-border bg-base-300 w-96 justify-self-center mt-8">
      <div className="card-body">
        <h2 className="card-title justify-center">Sign In</h2>
        <div>
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
              type="text"
              className="input"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </fieldset>
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
