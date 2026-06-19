import axios from 'axios';
import React, { useState } from 'react'
import { baseUrl } from '../utils/constants';

const SentRequestSection = (req) => {
    const _id = req.id;
    const { firstName , lastName , photoUrl,about } = req.req;
    const [visible,setvisible] = useState(true);

    const cancelRequest = async (_id) =>{
        try{
            const res = await axios.delete(baseUrl+`/request/cancel/${_id}`,
                {withCredentials:true})
        }
        catch(err){
            console.error(err.message)
        }
    }

  return (visible &&
    <div className="w-full flex items-center justify-between p-4 bg-[#11131c] border border-zinc-800/60 rounded-xl hover:border-zinc-700/50 transition-all duration-150 group">
        <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
            <img src={photoUrl} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
        </div>
        <div className="min-w-0 text-left">
            <h3 className="text-[15px] font-medium text-zinc-100 tracking-tight truncate">{firstName} {lastName}</h3>
            <p className="text-[13px] text-zinc-400 font-normal truncate mt-0.5">"{about}"</p>
        </div>
        </div>
        <button className="shrink-0 ml-4 px-3.5 py-1.5 text-3 font-medium text-zinc-400 hover:text-zinc-200 bg-[#0d0e14] hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-colors duration-150 cursor-pointer" onClick={() => {
            cancelRequest(_id);
            setvisible(false)
        }}>
        Cancel
        </button>
    </div>
  )
}

export default SentRequestSection