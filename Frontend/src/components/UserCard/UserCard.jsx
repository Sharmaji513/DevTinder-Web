import React, { useState, useRef } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { removeFeed } from "../../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user, index, isTopCard, totalVisibleCards }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const dispatch = useDispatch();

  // Responsive maximum offset for swipe distance
  const getMaxOffset = () => {
    if (window.innerWidth < 640) return 100; // mobile
    if (window.innerWidth < 1024) return 150; // tablet
    return 200; 
  };

  // Maximum rotation in degrees
  const MAX_ROTATION = 15;

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, skills, gender, about } = user;

  const handleStart = (e) => {
    if (!isTopCard) return; 
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    touchStartRef.current = { x: clientX, y: clientY };
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging || !isTopCard) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const MAX_OFFSET = getMaxOffset();
    let deltaX = clientX - touchStartRef.current.x;
    let deltaY = clientY - touchStartRef.current.y;

    deltaX = Math.max(Math.min(deltaX, MAX_OFFSET), -MAX_OFFSET);
    deltaY = Math.max(Math.min(deltaY, MAX_OFFSET), -MAX_OFFSET);

    setPosition({ x: deltaX, y: deltaY });
    const newRotation = (deltaX / MAX_OFFSET) * MAX_ROTATION;
    setRotation(newRotation);
  };

  const handleEnd = () => {
    if (!isDragging || !isTopCard) return;
    setIsDragging(false);

    const MAX_OFFSET = getMaxOffset();
    const threshold = MAX_OFFSET * 0.3;

    if (Math.abs(position.x) > threshold) {
      const direction = position.x > 0 ? "right" : "left";
      handleSwipeAction(direction);
    } else {
      resetPosition();
    }
  };

  const handleSwipeAction = (direction) => {
    const MAX_OFFSET = getMaxOffset();
    const edgePosition = direction === "right" ? MAX_OFFSET : -MAX_OFFSET;
    const edgeRotation = direction === "right" ? MAX_ROTATION : -MAX_ROTATION;

    setPosition({ x: edgePosition, y: position.y });
    setRotation(edgeRotation);

    setTimeout(() => {
      handleSendConnectionRequest(
        direction === "right" ? "interested" : "ignored",
        _id
      );
      resetPosition();
    }, 300);
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleSendConnectionRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleButtonClick = (action) => {
    if (!isTopCard) return;
    const direction = action === "interested" ? "right" : "left";
    handleSwipeAction(direction);
  };

  // Calculate card style based on index and swipe position
  const getCardStyle = () => { const scale = isTopCard ? 1 : 1 - (index * 0.05); 
    const translateY = isTopCard ? 0 : index * 10; 
    const zIndex = totalVisibleCards - index; 

    // Apply swipe transform only to the top card
    const transform = isTopCard
      ? `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`
      : `translateY(${translateY}px) scale(${scale})`;

    return {
      transform,
      zIndex,
      transition: isDragging && isTopCard ? "none" : "transform 0.3s ease-out",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    };
  };

  return (
    <div
      className="relative w-full h-full md:mt-5 md:max-w-[70%] md:h-full  overflow-hidden bg-base-200  touch-none "
      style={getCardStyle()}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <figure className="relative w-full h-[95%]  md:h-full overflow-hidden">
        <img
          className="w-full h-full  object-cover opacity-90 select-none"
          src={photoUrl || "/default-profile.jpg"}
          alt={`${firstName} ${lastName}`}
          draggable="false"
        />

        {/* User Details */}
        <div className="absolute bottom-2 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent py-4 px-1 sm:py-5 sm:px-4">
          <div className="relative p-2">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-75 rounded-lg"></div>
            <h1 className="relative text-3xl sm:text-3xl md:text-3xl font-bold text-white drop-shadow-md">
              {firstName} {lastName}
            </h1>
            {about && (
              <p className="relative text-lg sm:text-sm md:text-base mt-1 text-white drop-shadow-md line-clamp-2">
                {about}
              </p>
            )}
            <div className="relative text-sm sm:text-sm mt-1 flex flex-wrap gap-2 text-white drop-shadow-md">
              {age && <span>🎂 {age}</span>}
              {gender && <span>🧑‍🤝‍🧑 {gender.toUpperCase()}</span>}
              <span>🕓 Active now</span>
            </div>
          </div>
        </div>

        {/* Swipe Indicator - Only on top card */}
        {isTopCard && Math.abs(position.x) > 50 && (
          <div
            className={`absolute top-[20%] ${
              position.x > 0 ? "left-8 sm:left-10" : "right-8 sm:right-10"
            } p-2 rounded-full bg-opacity-70 ${
              position.x > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">
              {position.x > 0 ? "LIKE" : "NOPE"}
            </span>
          </div>
        )}

        {/* Action Buttons - Only on top card */}
        {isTopCard && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4 sm:gap-6 md:gap-8">
            <button
              onClick={() => handleButtonClick("interested")}
              className="flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 text-3xl sm:text-2xl text-black rounded-full bg-white shadow-lg hover:scale-110 transition-transform active:scale-95"
              aria-label="Like profile"
            >
              💚
            </button>
            <button
              onClick={() => handleButtonClick("ignored")}
              className="flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 text-2xl sm:text-2xl text-black rounded-full bg-white shadow-lg hover:scale-110 transition-transform active:scale-95"
              aria-label="Reject profile"
            >
              ❌
            </button>
          </div>
        )}
      </figure>
    </div>
  );
};

export default UserCard;