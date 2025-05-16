import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatList from "../../components/ChatList/ChatList";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

// Dummy data for testing
const dummyConversations = [
  {
    _id: "conv1",
    participants: [
      { _id: "user1", firstName: "Amit", lastName: "Sharma", photoUrl: "https://placehold.co/40x40" },
      { _id: "user2", firstName: "Priya", lastName: "Verma", photoUrl: "https://placehold.co/40x40" },
    ],
    lastMessage: { content: "Hey, kaise ho?", timestamp: "2025-05-15T12:30:00Z" },
  },
  {
    _id: "conv2",
    participants: [
      { _id: "user1", firstName: "Amit", lastName: "Sharma", photoUrl: "https://placehold.co/40x40" },
      { _id: "user3", firstName: "Rahul", lastName: "Singh", photoUrl: "https://placehold.co/40x40" },
    ],
    lastMessage: { content: "Project update kya hai?", timestamp: "2025-05-15T12:25:00Z" },
  },
];

const dummyMessages = {
  conv1: [
    {
      _id: "msg1",
      conversationId: "conv1",
      sender: { _id: "user2", firstName: "Priya", lastName: "Verma" },
      content: "Hey, kaise ho?",
      timestamp: "2025-05-15T12:30:00Z",
    },
    {
      _id: "msg2",
      conversationId: "conv1",
      sender: { _id: "user1", firstName: "Amit", lastName: "Sharma" },
      content: "Main theek, tu bata!",
      timestamp: "2025-05-15T12:31:00Z",
    },
  ],
  conv2: [
    {
      _id: "msg3",
      conversationId: "conv2",
      sender: { _id: "user3", firstName: "Rahul", lastName: "Singh" },
      content: "Project update kya hai?",
      timestamp: "2025-05-15T12:25:00Z",
    },
  ],
};

const Message = () => {
  const [conversations] = useState(dummyConversations);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

 
  useEffect(() => {
    console.log("Message.jsx: selectedChatId:", selectedChatId);
    if (selectedChatId) {
      console.log("Message.jsx: Loading messages for", selectedChatId);
      setMessages(dummyMessages[selectedChatId] || []);
    }
  }, [selectedChatId]);

  // Handle chat selection
  const handleSelectChat = (chatId) => {
    console.log("Message.jsx: Chat clicked, ID:", chatId);
    setSelectedChatId(chatId);
  };

  // sending a message
  const sendMessage = (content) => {
    if (selectedChatId && content.trim()) {
      const newMessage = {
        _id: `msg${Date.now()}`,
        conversationId: selectedChatId,
        sender: { _id: "user1", firstName: "Amit", lastName: "Sharma" },
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  // Find selected conversation
  const selectedChat = conversations.find((conv) => conv._id === selectedChatId);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-base-200 relative z-0  ">
      <div className="w-full lg:w-80 lg:h-full relative z-20" >
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col lg:flex-row relative z-30 w-full mt-16 h-screen ">
        <div
          className={`${
            selectedChatId ? "hidden lg:block" : "block"
          } w-full lg:w-1/3 bg-base-200 p-6 overflow-y-auto lg:h-screen relative z-10 pointer-events-auto`}
        >
          <ChatList
            conversations={conversations}
            setSelectedChat={handleSelectChat}
            selectedChatId={selectedChatId}
            userId="user1"
          />
        </div>
        <div
          className={`${
            selectedChatId ? "block" : "hidden lg:block"
          } flex-1 bg-base-200 lg:h-screen relative z-5 pointer-events-auto `}
        >
          {selectedChat ? (
            <ChatWindow
              messages={messages}
              sendMessage={sendMessage}
              selectedChat={selectedChat}
              userId="user1"
              setSelectedChat={setSelectedChatId}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-blue-800">
              <h1 className="text-gray-400  text-lg lg:text-2xl">
                Select a chat to start messaging
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;