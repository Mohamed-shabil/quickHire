import { currentUser } from "@/services/api/auth.service";
import { UserType } from "@/types/types";
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
    const response = await currentUser();
    console.log("thunk User data ----", response.data);
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
