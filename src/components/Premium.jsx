import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
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
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("ERROR : ", err.message);
    }
  };

  return (
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
