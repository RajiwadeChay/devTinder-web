import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Creating socket
    const socket = createSocketConnection();

    // Made socket connection & emit joinChat event
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // Listen sendMessage event
    socket.on("messageReceived", ({ userId, firstName, text, photoUrl }) => {
      // console.log(firstName + " Sent Message : " + text);
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { userId, firstName, text, photoUrl },
      ]);
    });

    // Clean up or disconnect socket
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSend = async () => {
    // Creating socket
    const socket = createSocketConnection();

    // Made socket connection & emit sendMessage event
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
      photoUrl: user.photoUrl,
    });
    setNewMessage("");
  };

  return (
    <div className="w-2/3 my-8 m-auto bg-base-300 rounded-2xl overflow-hidden">
      <div className="p-4 bg-base-200 border-b-1 border-b-gray-500">
        <h2>Chat</h2>
      </div>

      <div className="p-4 bg-base-300 border-b-1 border-b-gray-500">
        {messages.map((msg, idx) => {
          return userId === msg.userId ? (
            <div key={idx} className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={msg.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-secondary">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          ) : (
            <div key={idx} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={msg.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-primary">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-base-200 flex flex-row items-center justify-between">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-[80%] p-2 bg-base-100 border-1 border-gray-500 rounded-2xl"
        />

        <button onClick={handleSend} className="btn btn-secondary m-auto">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
