import React, { useState } from 'react'
import UserCard from "./UserCards";
import axios from 'axios';
import { baseUrl } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfileCard = (users) => {
    const user = users.user;
    const [firstName, setfirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setphotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [error ,setError] = useState("");
    const [updateMsg , setUpdateMsg] = useState(false);

    const dispatch = useDispatch()

    const saveDetails = async ()=>{
        try{
            const res = await axios.patch(baseUrl+"/profile/edit",{
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about,
                skills,
            },
            {withCredentials:true})
            dispatch(addUser(res.data))
            setUpdateMsg(true);
            setTimeout(()=>{
                setUpdateMsg(false)
            },3000)
        }
        catch(err){
            setError(err?.response?.data)
        }
    }

    return (
        <div className="min-h-screen bg-[#090a0f] flex justify-center items-center p-6 sm:p-12 antialiased">
            <div className="flex items-start justify-center gap-8 sm:gap-12 max-w-5xl w-full mx-auto">
                <fieldset className="fieldset w-full max-w-110 bg-[#11131c] border border-zinc-800/80 rounded-2xl p-8 sm:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] shrink-0">
                <legend className="fieldset-legend text-3xl font-semibold text-zinc-100 tracking-tight mb-2">Edit Profile</legend>
                <p className="text-[14px] text-zinc-400 mb-8 font-normal">Update your public identity and technical details.</p>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                        placeholder="First name"
                        onChange={(e) => setfirstName(e.target.value)}
                    />
                    </div>
                    <div>
                    <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                        placeholder="Last name"
                        onChange={(e) => setlastName(e.target.value)}
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                    <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">Age</label>
                    <input
                        type="number"
                        value={age}
                        className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                        placeholder="Age"
                        onChange={(e) => setAge(e.target.value)}
                    />
                    </div>
                    <div className="relative">
                        <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">Gender</label>
                        <div className="relative">
                            <select
                            value={gender}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 text-[14px] transition-all duration-200 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none appearance-none cursor-pointer pr-10 group"
                            onChange={(e) => setGender(e.target.value)}
                            >
                            <option value="" >Select Gender</option>
                            <option value="male" className="bg-[#11131c]">male</option>
                            <option value="female" className="bg-[#11131c]">female</option>
                            <option value="others" className="bg-[#11131c]">others</option>
                            </select>
                            
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor" 
                                className="w-4 h-4 transition-transform duration-200"
                            >
                                <path 
                                fillRule="evenodd" 
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" 
                                clipRule="evenodd" 
                                />
                            </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <label className="label text-[13px] font-medium text-zinc-300 mt-5 mb-2 block">Skills</label>
                <input
                    type="text"
                    value={skills}
                    className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                    placeholder="React, Node.js, TypeScript"
                    onChange={(e) =>{
                        const inputSkills = e.target.value.split(",").map(skill => skill);
                        setSkills(inputSkills)
                    }}
                />

                <label className="label text-[13px] font-medium text-zinc-300 mt-5 mb-2 block">About</label>
                <div className="w-full">
                <label className="label text-[13px] font-medium text-zinc-300 mb-2 block">About</label>
                <textarea
                    value={about}
                    rows={4}
                    className="w-full h-28 px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none resize-none"
                    placeholder="Tell us about yourself"
                    onChange={(e) => setAbout(e.target.value)}
                />
                </div>

                <label className="label text-[13px] font-medium text-zinc-300 mt-5 mb-2 block">Photo URL</label>
                <input
                    type="text"
                    value={photoUrl}
                    className="input w-full px-3.5 py-2.5 rounded-lg bg-[#0d0e14] border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-[14px] transition-all duration-150 focus:border-zinc-500 focus:bg-[#0d0e14] focus:outline-none"
                    placeholder="https://example.com/photo.jpg"
                    onChange={(e) => setphotoUrl(e.target.value)}
                />

                {error && !updateMsg && <p className="mt-4 text-xs font-medium text-red-400 bg-red-950/30 border border-red-900/40 px-3 py-2 rounded-lg">{error}</p>}

                <button
                    onClick={saveDetails}
                    className="btn mt-8 w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-[14px] active:scale-[0.99] transition-all duration-150 cursor-pointer shadow-sm"
                >
                    Save Changes
                </button>
                </fieldset>
                    
                <div className="shrink-0 hidden lg:block">
                    <h1 className='font-bold text-center text-xl'>Your Profile will feature like this</h1>
                    <UserCard user={{ firstName, lastName, age, gender, about, skills, photoUrl }} />
                </div>
            </div>

            {updateMsg && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Updated successfully.</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditProfileCard;