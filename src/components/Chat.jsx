import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { baseUrl } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const location = useLocation();
    const name = location.state.name;
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const chatref = useRef();

    useEffect(() => {
        if (chatref.current) {
            chatref.current.scrollTop = chatref.current.scrollHeight;
        }
    }, [messages]);

    const fetchPastChat = async () => {
        const chat = await axios.get(baseUrl + "/chat/" + targetUserId, { withCredentials: true });

        const data = chat.data.messages.map((item) => {
            const { firstName, lastName, _id} = item.senderId;
            const msgTime = new Date(item.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
            });
            return {
                userId: _id,
                firstName,
                lastName,
                text: item.text,
                time:msgTime
            }
        })
        setMessages(data);
    }

    useEffect(() => {
        fetchPastChat();
    }, [])

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName: user?.firstName, userId, targetUserId });

        socket.on("messageReceived", ({ userId, firstName, lastName, text }) => {
            setMessages((messages) => [...messages, { userId, firstName, lastName, text }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        if (!newMsg) return;
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMsg,
        })
        setNewMsg("");
    }

    return (
        <div className='flex flex-col h-[85vh] sm:h-[80vh] bg-black border border-zinc-800 w-full max-w-4xl mx-auto my-0 sm:my-10 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl'>
            
            {/* Elegant Header */}
            <div className='flex items-center justify-between bg-zinc-950 border-b border-zinc-800 px-6 py-4'>
                <div className='flex items-center gap-3'>
                    <h1 className='font-medium text-base tracking-tight text-zinc-200'>{name}</h1>
                </div>
                <span className='text-xs text-zinc-500 font-mono'>Secure Connection</span>
            </div>

            {/* Chat Body Bubble Window */}
            <div 
                ref={chatref} 
                className='flex-1 overflow-y-auto bg-black p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800'
            >
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.userId === userId;
                    return (
                        <div 
                            key={index} 
                            className={`flex flex-col w-full max-w-[85%] sm:max-w-[70%] ${isCurrentUser ? "ml-auto items-end" : "mr-auto items-start"}`}
                        >
                            
                            <div className={`px-4 py-2.5 rounded-2xl text-sm wrap-words leading-relaxed shadow-sm
                                ${isCurrentUser 
                                    ? "bg-blue-900 text-white rounded-tr-xs" 
                                    : "bg-pink-900 text-zinc-100 border border-zinc-800 rounded-tl-xs"
                                }`}
                            >
                                {msg.text}
                            </div>
                            <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-zinc-500">
                                <span className="font-medium text-zinc-400">
                                    {isCurrentUser ? "You" : `${msg.firstName} ${msg.lastName}`}
                                </span>
                                <span>•</span>
                                <time className="opacity-70">{msg.time || new Date().toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}</time>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Bottom Input Area Bar */}
            <div className='p-4 bg-zinc-950 border-t border-zinc-800 flex items-center gap-3'>
                <input 
                    type='text' 
                    value={newMsg} 
                    className='flex-1 h-11 bg-zinc-900 text-zinc-100 placeholder-zinc-500 text-sm px-4 rounded-xl border border-zinc-800 outline-hidden focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all' 
                    placeholder='Type your message...' 
                    onChange={(e) => setNewMsg(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />
                <button 
                    className='h-11 px-5 text-xs font-medium bg-white text-black hover:bg-zinc-200 active:scale-98 rounded-xl transition-all cursor-pointer whitespace-nowrap' 
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>

        </div>
    )
}

export default Chat