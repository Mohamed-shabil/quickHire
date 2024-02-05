import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";import axios from "axios";
import { root } from "postcss";
import rootReducer from "../reducers";


const userSlice = createSlice({
    name:'user',
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload;
        }
    },
    
})

export const { setUserData } = userSlice.actions; 
export default userSlice.reducer;