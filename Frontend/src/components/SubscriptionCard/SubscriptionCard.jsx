import { FaCheck } from "react-icons/fa";

export const SubscriptionCard = () => (
 
  
    <div className="shadow-md rounded-lg p-6 relative z-10">
      <h3 className="text-lg text-blue-500 font-bold mb-2"><span className="text-3xl text-yellow-300">DevTinder+</span></h3>
      <p className="text-green-500 mb-4 text-sm">
        Unlock exclusive features with our premium subscription plan!
      </p>
      <ul className="flex gap-2 flex-col font-extrabold ">
      <li className="flex gap-2 items-center justify-start"> <FaCheck />Unlimited views and Likes</li>
      <li className="flex gap-2 items-center justify-start"> <FaCheck />See who views your profile</li>
      <li className="flex gap-2 items-center justify-start"> <FaCheck />Message before Matching</li>
      <li className="flex gap-2 items-center justify-start"> <FaCheck />Unlimited Matches</li>
      <li className="flex gap-2 items-center justify-start"> <FaCheck />And everything you love from DevTinder Plus® </li>
    
      </ul>
      <button className="btn btn-primary w-full mt-5">Subscribe Now</button>
    </div>
    
  );
  