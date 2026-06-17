import React from 'react'

const UserCard = () => {
  // Your exact user data object structure
  const user = {
    _id: "6a2e70ad210a78133397da43",
    firstName: "Suresh",
    lastName: "Raina",
    about: "Hey! , I am Using WhatsApp",
    photoUrl: "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
    skills: ['Batting', 'flex', 'Bihari', 'PowerHitter']
  };

  return (
    <div className="w-full max-w-95 bg-[#11131c] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] hover:border-zinc-700/60 transition-colors duration-200 shrink-0">
      
      {/* Decorative Subtle Header Background Accent */}
      <div className="h-24 bg-linear-to-b from-zinc-800/20 to-transparent w-full"></div>

      {/* Main Card Content */}
      <div className="px-6 pb-7 relative flex flex-col items-center text-center">
        
        {/* Avatar Area with Negative Margin to Overlap the Header */}
        <div className="relative -mt-12 mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#11131c] bg-zinc-900 shadow-md">
            <img 
              src={user.photoUrl} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Identity */}
        <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
          {user.firstName} {user.lastName}
        </h2>
        
        {/* About / Bio Status Section */}
        <p className="mt-3 text-[14px] leading-relaxed text-zinc-400 font-normal max-w-70">
          "{user.about}"
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-800/50 my-5"></div>

        {/* Skills Stack Title */}
        <div className="w-full text-left mb-3">
          <span className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
            Specialties
          </span>
        </div>

        {/* Skills Tag Cloud */}
        <div className="w-full flex flex-wrap gap-1.5 justify-start">
          {user.skills.map((skill, index) => (
            <span 
              key={index} 
              className="text-[12px] font-medium text-zinc-300 bg-[#0d0e14] border border-zinc-800/80 px-2.5 py-1 rounded-md hover:text-zinc-100 hover:border-zinc-700 transition-colors duration-150"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Buttons Footer */}
        <div className="w-full mt-8 pt-5 border-t border-zinc-800/60 grid grid-cols-2 gap-3">
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