import React, { useState } from 'react'
import { createNodeImportMeta } from 'vite/module-runner';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { baseUrl } from '../utils/constants'

const Login = () => {
  const [emailId, setemailId] = useState("ashish@gmail.com");
  const [password, setpassword] = useState("Ashish@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = async ()=>{
    try{
      const res = await axios.post(baseUrl+"/login",{
        emailId,
        password,
      },{withCredentials:true});
      
      dispatch(addUser(res.data));
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#090a0f] px-6 antialiased selection:bg-zinc-800 selection:text-zinc-200">
      <fieldset className="fieldset w-full max-w-100 bg-[#11131c] border border-zinc-800/80 rounded-2xl p-8 sm:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]">
        <legend className="fieldset-legend text-4xl font-semibold text-zinc-100 tracking-tight mb-2">
          Login
        </legend>

        <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">
          Email address
        </label>

        <input
          type="email"
          value={emailId}
          className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
          placeholder="you@example.com"
          onChange={(e)=>{
            setemailId(e.target.value);
          }}
        />

        <label className="label text-[13px] font-medium text-zinc-300 mt-5 mb-2 block">
          Password
        </label>

        <input
          type="password"
          className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
          placeholder="••••••••"
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value);
          }}
        />

        <button
          className="btn mt-8 w-full py-2.5 rounded-lg bg-zinc-200 hover:bg-white text-zinc-950 font-medium text-[14px] active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-sm"
          onClick={logInHandler}
        >
          Continue
        </button>
      </fieldset>
    </div>
  )
}

export default Login;