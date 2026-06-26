import axios from 'axios';
import React from 'react'
import { baseUrl } from '../utils/constants';
import { useState } from 'react'
import { useNavigate } from 'react-router';

const ReceivingRejectingRequest = ({ id, request, receivedRequests, setReceivedRequests }) => {
    const _id = id;
    const { photoUrl, firstName, lastName, about } = request;
    const [visible, setvisible] = useState(true);
    const navigate = useNavigate();

    const acceptRejectHandler = async (status, _id) => {
        try {
            const res = await axios.post(baseUrl + `/request/review/${status}/${_id}`, {},
                { withCredentials: true }
            )
            setReceivedRequests((receivedRequests)=>(receivedRequests.filter(request=>request._id !== id)))
        }
        catch (err) {
            console.error(err.message)
        }
    }
    return (visible &&
        <div onClick={() => navigate("/feedUser/" + _id, { state: { user: request }})} className="w-full flex items-center justify-between p-4 bg-[#11131c] border border-zinc-800/60 rounded-xl hover:border-zinc-700/50 transition-all duration-150 group cursor-pointer">
            <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                    <img src={photoUrl} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="min-w-0 text-left">
                    <h3 className="text-[15px] font-medium text-zinc-100 tracking-tight truncate">{firstName} {lastName}</h3>
                    <p className="text-[13px] text-zinc-400 font-normal truncate mt-0.5">"{about}"</p>
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
                <button className="px-3 py-1.5 text-[12px] font-medium text-zinc-400 hover:text-red-400 bg-[#0d0e14] hover:bg-red-950/20 border border-zinc-800 rounded-lg transition-colors duration-150 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    acceptRejectHandler("Rejected", _id)
                    setvisible(false)
                }}>
                    Decline
                </button>
                <button className="px-3 py-1.5 text-[12px] font-medium text-zinc-950 bg-zinc-100 hover:bg-green-400 rounded-lg transition-colors duration-150 cursor-pointer shadow-xs" onClick={(e) => {
                    e.stopPropagation();
                    acceptRejectHandler("Accepted", _id)
                    setvisible(false);
                }}>
                    Accept
                </button>
            </div>
        </div>
    )
}

export default ReceivingRejectingRequest