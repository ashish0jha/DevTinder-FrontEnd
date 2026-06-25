import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const FeedUser = () => {
  const location = useLocation();
  const user = location.state?.user;

  if(!user) return (
    <div className='font-bold text-2xl text-center m-10'>Something is Wrong</div>
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const {_id,firstName,lastName,age,gender,photoUrl,about,skills} = user;

  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans pb-16">

      <div className="max-w-3xl mx-auto px-4 pt-10 pb-8 border-b border-zinc-900">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
   
          <div className="shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900">
              <img 
                src={photoUrl} 
                alt={firstName+" "+lastName} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center sm:text-left w-full">
         
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                  {firstName+" "+lastName} 
                  <span className="text-xs font-normal text-zinc-500 font-mono">({gender}, {age})</span>
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Lucknow</p>
              </div>
              
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-8 text-xs text-zinc-400 border-y border-zinc-900 sm:border-none py-2.5 sm:py-0">
              <div>
                Exp: <span className="text-white font-medium">3.5 yrs</span>
              </div>
              <div>
                Connections: <span className="text-white font-medium">23</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto flex justify-center gap-12 border-b border-zinc-900/50">
        <button 
          onClick={() => setActiveTab("about")}
          className={`py-4 text-xs font-semibold tracking-widest uppercase border-b-2 transition-all cursor-pointer ${activeTab === "about" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab("connections")}
          className={`py-4 text-xs font-semibold tracking-widest uppercase border-b-2 transition-all cursor-pointer ${activeTab === "connections" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
        >
          Network
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8">
        {activeTab === "about" ? (
          <div className="grid md:grid-cols-3 gap-8 items-start">
       
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase font-mono">Biography</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">{about}</p>
              </div>
            </div>

            {/* Right Skills Panel view */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase font-mono">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills && skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2.5 py-1 bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-md font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl max-w-md mx-auto">
            <svg className="w-8 h-8 text-zinc-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h4 className="text-sm font-medium text-zinc-300">Connections are hidden</h4>
            <div className="text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl max-w-md mx-auto px-6">
              {/* Modern Minimalist Key/Lock Icon */}
              <svg className="w-8 h-8 text-zinc-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              
              <h4 className="text-sm font-medium text-zinc-300 tracking-tight">
                Network Privacy Protected
              </h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1.5 leading-relaxed">
                Connections and mutual networks are kept private on DevTinder. You cannot browse another member's connection list.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default FeedUser;