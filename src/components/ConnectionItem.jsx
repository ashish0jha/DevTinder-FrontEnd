import React from 'react'

const ConnectionItem = ({ connection }) => {
    const {firstName,lastName,about,skills,photoUrl} = connection;
    
  return (
    <div className="w-full max-w-xl flex items-center justify-between p-4 bg-[#11131c] border border-zinc-800/60 rounded-xl hover:border-zinc-700/50 transition-all duration-150 group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
          <img 
            src={photoUrl} 
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <div className="min-w-0 text-left">
          <h3 className="text-[15px] font-medium text-zinc-100 tracking-tight truncate">
            {firstName} {lastName}
          </h3>
          <p className="text-[13px] text-zinc-400 font-normal truncate mt-0.5">
            {about ? `"${about}"` : "No status details provided"}
          </p>
        </div>
      </div>

      <button className="shrink-0 ml-4 px-3.5 py-1.5 text-[12px] font-medium text-zinc-300 bg-[#0d0e14] hover:bg-zinc-900 border border-zinc-800 rounded-lg hover:text-zinc-100 transition-colors duration-150 cursor-pointer">
        Message
      </button>
    </div>
  )
}

export default ConnectionItem;