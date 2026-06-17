import React from 'react'

const UserCard = (user) => {

  const {firstName , lastName , about , age , gender , photoUrl, skills } = user.user;

  return (
    <div className="w-full max-w-100 bg-[#11131c] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] hover:border-zinc-700/60 transition-colors duration-200 cursor-pointer">
      
      <div className="relative aspect-video w-full bg-zinc-900">
        <img 
          src={photoUrl} 
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-4 left-5 right-5 text-left">
          <h2 className="text-xl font-semibold text-white tracking-tight drop-shadow-xs">
            {firstName} {lastName}
          </h2>
        </div>
      </div>
      <div className="px-5 pb-6 pt-5 flex flex-col">
        {age && <p className="text-xl leading-relaxed text-zinc-300 font-bold">
          {age} , {gender}
        </p>}
        <p className="text-[14px] leading-relaxed text-zinc-300 font-normal">
          {about}
        </p>
        <div className="w-full h-px bg-zinc-800/50 my-5"></div>

        <div className="w-full text-left mb-3">
          <span className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
            Specialties
          </span>
        </div>

        <div className="w-full flex flex-wrap gap-1.5 justify-start">
          {skills && skills.map((skill, index) => (
            <span 
              key={index} 
              className="text-[12px] font-medium text-zinc-300 bg-[#0d0e14] border border-zinc-800/80 px-2.5 py-1 rounded-md hover:text-zinc-100 hover:border-zinc-700 transition-colors duration-150"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="w-full mt-7 pt-5 border-t border-zinc-800/60 grid grid-cols-2 gap-3">
          <button className="w-full py-2.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 active:scale-[0.98] transition-all cursor-pointer">
            Ignore
          </button>
          <button className="w-full py-2.5 text-[13px] font-medium text-zinc-950 bg-zinc-100 hover:bg-white rounded-lg active:scale-[0.98] transition-all cursor-pointer shadow-sm">
            Interested
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserCard;