import axios from 'axios'
import React from 'react'
import { baseUrl } from '../utils/constants'

const Premium = () => {
    const handler = async (type) => {
      const order = await axios.post(baseUrl+"/payment/order",{
          memberShipType:type,
      },{withCredentials:true})

      const {keyId,amount,orderId,notes,currency} = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'DevTinder',
        description: 'Connect to Others Developers',
        order_id:orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };
      const rzp = new Razorpay(options);
      rzp.open(); 

    }

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-16 px-4 flex flex-col items-center justify-center font-sans">
      
      {/* Header Section */}
      <div className="text-center max-w-sm mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Premium Plans
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Choose a tier to upgrade your experience.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="w-full max-w-2xl grid sm:grid-cols-2 gap-6 px-2">
        
        {/* Silver Option */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-base font-medium text-zinc-300">Silver</h2>
            <div className="mt-4 flex items-baseline">
              <span className="text-2xl font-bold text-white">$4.99</span>
              <span className="ml-1 text-xs text-zinc-500">/mo</span>
            </div>

            <ul className="mt-6 space-y-3 text-xs text-zinc-400 border-t border-zinc-900 pt-4">
              <li className="flex items-center gap-2">✓ Free delivery over $15</li>
              <li className="flex items-center gap-2">✓ 10% extra discount</li>
              <li className="flex items-center gap-2">✓ Standard support</li>
            </ul>
          </div>

          <button className="mt-8 w-full py-2.5 text-xs font-medium text-black bg-white hover:bg-zinc-200 active:scale-98 rounded-lg transition-all cursor-pointer" onClick={()=>handler("Silver")}>
            Select Silver
          </button>
        </div>

        {/* Gold Option */}
        <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-6 flex flex-col justify-between h-full relative">
          <span className="absolute top-3 right-3 text-[10px] font-medium tracking-wide uppercase text-zinc-400 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md">
            Popular
          </span>

          <div>
            <h2 className="text-base font-medium text-white">Gold</h2>
            <div className="mt-4 flex items-baseline">
              <span className="text-2xl font-bold text-white">$9.99</span>
              <span className="ml-1 text-xs text-zinc-500">/mo</span>
            </div>

            <ul className="mt-6 space-y-3 text-xs text-zinc-300 border-t border-zinc-900 pt-4">
              <li className="flex items-center gap-2 text-white">✓ Free delivery (No minimum)</li>
              <li className="flex items-center gap-2">✓ Up to 25% off restaurant rates</li>
              <li className="flex items-center gap-2">✓ Priority kitchen routing</li>
              <li className="flex items-center gap-2">✓ 24/7 VIP support</li>
            </ul>
          </div>

          <button className="mt-8 w-full py-2.5 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 active:scale-98 border border-zinc-700 rounded-lg transition-all cursor-pointer" onClick={()=>handler("Gold")}>
            Select Gold
          </button>
        </div>

      </div>

      <p className="mt-8 text-[11px] text-zinc-600">
        Cancel anytime. Terms apply.
      </p>
    </div>
  )
}

export default Premium