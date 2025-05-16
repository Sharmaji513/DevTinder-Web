// src/components/ChatWindow/ChatWindow.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ChatWindow = ({ messages, sendMessage, selectedChat, userId, setSelectedChat }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("ChatWindow.jsx: Rendered, selectedChat:", selectedChat, "messages:", messages);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const otherParticipant = selectedChat.participants.find((p) => p._id !== userId);

  return (
    <div className="flex flex-col h-full lg:h-full bg-base-200 relative z-5 pointer-events-auto">
      <div className="flex items-center p-4 bg-base-300 border-b border-gray-600 fixed  w-full">

        <button
          className="lg:hidden mr-4 text-white"
          onClick={() => {
            console.log("ChatWindow.jsx: Back button clicked");
            setSelectedChat(null);
          }}
          aria-label="Back to chat list"
          type="button"
        >
          <FaArrowLeft size={20} />
        </button>

        <img
          src={otherParticipant?.photoUrl || "https://placehold.co/40x40"}
          alt={`${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
          className="w-10 h-10 rounded-full object-cover mr-3"
          onError={(e) => (e.target.src = "https://placehold.co/40x40")}
        />

        <h2 className="text-lg font-bold text-white">
          {otherParticipant?.firstName} {otherParticipant?.lastName}
        </h2>

      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-800 mt-16 ">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex mb-4 ${msg.sender._id === userId ? "justify-end" : "justify-start"}`}
            >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${msg.sender._id === userId? "bg-blue-600 text-white" : "bg-base-100 text-white"}`}
            >
              <p>{msg.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-8 md:p-2  bg-base-300 fixed overflow-y-auto bottom-20 md:bottom-0 lg:w-[52%]   w-full">
        <div className="flex items-center ">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg bg-base-200 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;