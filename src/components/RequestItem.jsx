import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {baseUrl} from "../utils/constants"
import SentRequestSection from './SentRequestSection';
import ReceivingRejectingRequest from './ReceivingRejectingRequest';
import { useDispatch, useSelector } from 'react-redux';
import { addSentRequests } from '../utils/sentRequestSlice';

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState('received');

  const mockSentRequests = useSelector(store => store.sentRequest);

  const [mockReceivedRequests,setMockReceivedRequests] = useState([]);

  const dispatch = useDispatch();

  const fetchRequests= async ()=>{
        try{
          const res = await axios.get(baseUrl+`/user/requests/received`,{withCredentials:true});
          const res2 = await axios.get(baseUrl+`/user/requests/sent`,{withCredentials:true});

          setMockReceivedRequests(res.data);
          dispatch(addSentRequests(res2.data));
        }
        catch(err){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[])
    if(!mockReceivedRequests || !mockSentRequests) return;
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#090a0f] text-zinc-100 antialiased py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        
        <div className="flex bg-[#11131c] border border-zinc-800/60 p-1 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 cursor-pointer ${
              activeTab === 'received'
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Received ({mockReceivedRequests?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`flex-1 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 cursor-pointer ${
              activeTab === 'sent'
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sent ({mockSentRequests.length})
          </button>
        </div>

        <div className="space-y-3">
          
          {activeTab === 'received' && (
            mockReceivedRequests?.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-8">No requests received yet.</p>
            ) : (
              mockReceivedRequests?.map((req) => {
                
                return (<ReceivingRejectingRequest key={req._id} id={req._id} request={req.senderId}/>)
              })
            )
          )}

          {/* Sent Requests View */}
          {activeTab === 'sent' && (
            mockSentRequests.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-8">No pending outgoing requests.</p>
            ) : (
              mockSentRequests.map((req) => {
                return (<SentRequestSection req={req.receiverId} key={req._id}/>)
              })
            )
          )}

        </div>
      </div>
    </div>
  )
}

export default RequestsPage;