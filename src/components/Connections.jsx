import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import axios from 'axios'
import ConnectionItem from './ConnectionItem'
import { Link } from 'react-router'

const Connections = () => {
    const connection = useSelector(store => store.connection);
    const dispatch = useDispatch();

    const fetchConnections = async ()=>{
        if(connection) return;
        try{
            const res = await axios.get(baseUrl+"/user/connections",{
                withCredentials:true,
            })
            
            dispatch(addConnections(res.data.data));
        }
        catch(err){
            //TODO
            console.error(err)
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connection) return;
    if(connection.length===0){
        return <div className='text-center font-bold text-4xl my-10'>Lalla , You Have No One.</div>
    }
  return (
    <div className='flex flex-col justify-center items-center m-10 gap-4'>
        <h1 className='font-bold text-4xl'>Your Connections</h1>
        <p>{`You have ${connection.length} Connections`}</p>
        {
            connection.map((user) =>{
            return  <ConnectionItem connection={user} key={user._id}/>
            })
        }
    </div>
  )
}

export default Connections