import { createSlice }  from "@reduxjs/toolkit";

const sentRequestSlice = createSlice({
    name:"sentrequest",
    initialState:null,
    reducers:{
        addSentRequests : (state,action) =>{
            return  action.payload
        },
        removeSentRequests : (state,action)=>{
            const newList = state.filter(user =>{
                return  user._id !== action.payload ;
            });
            return newList;
        }
    }
})

export const {addSentRequests , removeSentRequests } = sentRequestSlice.actions;

export default sentRequestSlice.reducer;