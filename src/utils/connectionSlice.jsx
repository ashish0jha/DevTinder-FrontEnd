import { createSlice }  from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnections : (state,action) =>{
            return  action.payload
        },
        removeConnections : (state,action) =>{
            const newList = state.filter(user => user._id !== action.payload);
            return newList;
        },
        removeAllConnections : (statem,action) =>{
            return null;
        }
    }
})

export const {addConnections , removeConnections , removeAllConnections} = connectionSlice.actions;

export default connectionSlice.reducer;