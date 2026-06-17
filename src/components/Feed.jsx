import axios from "axios"
import { baseUrl } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCards";

const Feed = () => {
  const feed = useSelector(store => store.feed)
  const dispatch = useDispatch();
  
  const fetchFeed = async () =>{
    if(feed) return;
    try{
      const res = await axios.get(baseUrl+"/user/feed" , {withCredentials:true});
      const feed = res.data;
      console.log("feed",feed)
      dispatch(addFeed(feed));
    }
    catch (err) {
      //TODO
    }
  }
  useEffect(()=>{
    fetchFeed();
  },[])
  return (
    feed && <div className="flex justify-center flex-wrap gap-10 m-5">
    {
      feed.map((user)=>{
        return <UserCard key={user?._id}/>
      })
    }
      
    </div>
  )
}

export default Feed