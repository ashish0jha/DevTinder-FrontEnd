import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const userData = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserData =async ()=>{
    if(userData) return ;
    try{
      const res = await axios.get(baseUrl+"/profile/view",{
        withCredentials:true,
      })
      dispatch(addUser(res.data))
    }
    catch(err){
      if(err.status===401){
        navigate("/login")
      }
      console.error(err.message);
    }
  }
  useEffect(()=>{
    fetchUserData();
  },[])
  return (
    <div className='bg-black'>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body