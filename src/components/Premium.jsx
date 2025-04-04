import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => verifyPremiumUser(), []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });

      if (res.data.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.log("ERROR : ", err.message);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      // It should open the razorpay dialog box
      const { keyId, amount, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9000090000",
        },
        theme: {
          color: "#3399cc",
        },
        handler: verifyPremiumUser, //calls after successful payment
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("ERROR : ", err.message);
    }
  };

  return isUserPremium ? (
    <h2 className="text-3xl font-bold text-center my-8">
      You are already premium user!
    </h2>
  ) : (
    <div>
      <div className="p-20 flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h2 className="text-3xl font-bold">Silver Membership</h2>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-primary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h2 className="text-3xl font-bold">Gold Membership</h2>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-secondary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
