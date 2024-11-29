import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserCard from "../../components/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addFeed } from "../../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store)=> store?.feed)
  const dispatch = useDispatch();
  console.log(feed);
  

  const getFeed = async()=>{
   
    try {
      const res = await axios.get(BASE_URL + 'feed' , {withCredentials: true});
      console.log(res);
      
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
    </div>
    
     {
     feed?.length> 0 ? ( <div className="mt-5">
        <UserCard user={feed[4]} />
      </div>) :
      (
        <h2  className="text-grey text-xl relative top-52  ">No Feed Found</h2>
      )

    }
 
    </div>
  );
};

export default Feed;
