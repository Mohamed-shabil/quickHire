import { UserType } from "@/constants/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface UserDataInterface{
    _id:string;
    name:string;
    phone:string;
    email:string;
    avatar?:string;
    followers:string[] | [],
    followings:string[] | [],
    role:UserType,
    verified:boolean,
    isBlocked:boolean,
}

interface UserState {
    userData: UserDataInterface | null;
  }
  
const initialState: UserState = {
  userData: null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserData:(state,action:PayloadAction<UserDataInterface>)=>{
            state.userData = action.payload;
        }
    },
    
})

export const { setUserData } = userSlice.actions; 
export default userSlice.reducer;