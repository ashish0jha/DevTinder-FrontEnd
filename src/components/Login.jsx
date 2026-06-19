import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { baseUrl } from '../utils/constants'

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [error ,setError] = useState("");
  
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
      setError(err?.response?.data || "Something went wrong")
      console.error(err?.response)
    }
  }

  const signUpHandler = async ()=>{
    try{
      const res = await axios.post(baseUrl+"/signup",{
        firstName,
        lastName,
        emailId,
        password,
      },{
        withCredentials:true,
      })

      dispatch(addUser(res.data));
      navigate("/profile")
    }
    catch(err) {
      console.error("ERROR : " + err.message)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#090a0f] px-6 antialiased selection:bg-zinc-800 selection:text-zinc-200">
      <fieldset className="fieldset w-full max-w-100 bg-[#11131c] border border-zinc-800/80 rounded-2xl p-8 sm:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]">
        
        <legend className="fieldset-legend text-4xl font-semibold text-zinc-100 tracking-tight mb-2">
          {isLoginForm ? "Login" : "Sign up"}
        </legend>

        {!isLoginForm && (
          <div className="grid grid-cols-2 gap-4 animate-fadeIn">
            <div>
              <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                placeholder="Alex"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                placeholder="Rivera"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        )}

        <label className="label text-[13px] font-medium text-zinc-300 mt-5 mb-2 block">
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

        {error && (
          <p className="mt-4 text-xs font-medium text-red-400 bg-red-950/30 border border-red-900/40 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          className="btn mt-8 w-full py-2.5 rounded-lg bg-zinc-200 hover:bg-white text-zinc-950 font-medium text-[14px] active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-sm"
          onClick={isLoginForm ? logInHandler : signUpHandler}
        >
          {isLoginForm ? "Continue" : "Create account"}
        </button>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
            className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors duration-150 cursor-pointer underline underline-offset-4"
          >
            {isLoginForm ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </fieldset>
    </div>
  )
}

export default Login;