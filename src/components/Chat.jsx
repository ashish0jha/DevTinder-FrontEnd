import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");

    useEffect(()=>{
        if(!userId) return;
        const socket = createSocketConnection();
        socket.emit("joinChat",{firstName:user?.firstName ,userId,targetUserId});

        socket.on("messageReceived",({firstName,text})=>{
            setMessages((messages) => [...messages, { firstName, text }])
        })

        return ()=>{
            socket.disconnect();
        }
    },[userId,targetUserId]);   

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage",{
            firstName:user.firstName,
            userId,
            targetUserId,
            text:newMsg,
        })
        setNewMsg("");
    }

    return (
        <div className='flex flex-col items-center justify-between h-[80vh] bg-gray-900 w-3/4 mx-auto my-10'>
            <h1 className='font-bold text-2xl bg-gray-800 w-full text-center p-3'>Chat Section</h1>
            <div className='overflow-y-scroll bg-gray-700 w-4/5 m-3 rounded-2xl p-6 h-full mx-10'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className='mb-2'>
                            <p className='text-sm mx-5'>{msg.firstName}</p>
                            <p className='bg-gray-900 max-w-fit px-4 py-2 rounded-2xl'>{msg.text}</p>
                        </div>
                    )
                })}
            </div>
            <div className='w-full flex justify-between mx-10'>
                <input type='text' value={newMsg} className='bg-gray-800 px-10 w-full outline-0' placeholder='Type your message' onChange={(e) => {
                    setNewMsg(e.target.value)
                }} />
                <button className='btn btn-secondary' onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
}

export default Chat