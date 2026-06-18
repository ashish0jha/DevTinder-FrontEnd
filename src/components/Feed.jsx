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
      dispatch(addFeed(feed));
    }
    catch (err) {
      console.error(err.message)
    }
  }
  useEffect(()=>{
    fetchFeed();
  },[])

  if(!feed) return ;

  if(feed.length <=0 ) return <p className="text-xl text-zinc-500 text-center py-8">You ate all Users.</p>
  return (
    feed && <div className="flex justify-center flex-wrap gap-10 m-5">
    {
      feed.map((user)=>{
        return <UserCard key={user?._id} user={user}/>
      })
    }
      
    </div>
  )
}

export default Feed