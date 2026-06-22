import { createSlice }  from "@reduxjs/toolkit";

const sentRequestSlice = createSlice({
    name:"sentrequest",
    initialState:null,
    reducers:{
        addSentRequests : (state,action) =>{
            return  action.payload
        },
        removeSentRequests : (state,action)=>{
            const newCollection = state.filter(val => val._id !== action.payload);
            return newCollection;
        }
    }
})

export const {addSentRequests , removeSentRequests } = sentRequestSlice.actions;

export default sentRequestSlice.reducer;