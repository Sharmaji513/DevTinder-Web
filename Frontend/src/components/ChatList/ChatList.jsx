import React from "react";

const ChatList = ({ conversations, setSelectedChat, selectedChatId, userId }) => {
  return (
    <div className="space-y-3 relative z-10 pointer-events-auto">
      <h2 className="text-xl font-bold text-white mb-4">Chats</h2>

      {conversations.length > 0 ? (
        conversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (p) => p._id !== userId
          );
          const isActive = selectedChatId === conversation._id;

          return (
            <button
              key={conversation._id}
              onClick={() => {
                // console.log("ChatList.jsx: Clicking conversation:", conversation._id);
                setSelectedChat(conversation._id);
              }}
              onMouseDown={() => console.log("ChatList.jsx: Mouse down:", conversation._id)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors bg-base-200 hover:bg-base-100 w-full text-left ${
                isActive ? "bg-blue-600 text-white" : ""
              } relative z-10 pointer-events-auto`}
              type="button"
            >
              <div className="flex-shrink-0">
                <img
                  src={otherParticipant?.photoUrl || "https://placehold.co/40x40"}
                  alt={`${otherParticipant?.firstName} ${otherParticipant?.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/40x40";
                    console.log("ChatList.jsx: Image failed for:", otherParticipant?.firstName);
                  }}
                />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-semibold text-base">
                  {otherParticipant?.firstName} {otherParticipant?.lastName}
                </h3>
                {conversation.lastMessage && (
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {conversation.lastMessage.content}
                  </p>
                )}
              </div>
            </button>
          );
        })
      ) : (
        <p className="text-gray-400 text-center">No chats found</p>
      )}
    </div>
  );
};

export default ChatList;