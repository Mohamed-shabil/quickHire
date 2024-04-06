import { UserType } from "@/constants/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserDataInterface {
    _id: string;
    name: string;
    phone: string;
    email: string;
    avatar?: string;
    role: UserType;
    verified: boolean;
    isBlocked: boolean;
}

interface UserState {
    userData: UserDataInterface | null;
}

const initialState: UserState = {
    userData: null,
};

export const fetchUser = createAsyncThunk("fetchTodos", async () => {
    const response = await axios.get(
        "http://localhost:3001/api/auth/users/currentuser",
        {
            withCredentials: true,
        }
    );
    console.log("thunk data ----", response.data);
    return response.data.currentUser;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserDataInterface>) => {
            state.userData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
