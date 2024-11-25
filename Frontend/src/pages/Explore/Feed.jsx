import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserCard from "../../components/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addFeed } from "../../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store)=> store.feed)
  const dispatch = useDispatch();
  console.log(feed);
  

  const getFeed = async()=>{
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + 'feed' , {withCredentials: true});
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=> {
    getFeed();
  },[])

  return (
    <div className="flex gap-[45vw] ">
    <div>
      <Sidebar/>
    </div> {
     feed && <div className="mt-5">
        <UserCard user={feed[4]} />
      </div>

    }
 
    </div>
  );
};

export default Feed;
