import { Subscription } from "@/constants/constants";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubscription = createAsyncThunk(
    "fetchSubscription",
    async () => {
        try {
            const response = await axios.get(
                "http://localhost:3007/api/payments/subscriptions/my-subscriptions",
                {
                    withCredentials: true,
                }
            );
            console.log("thunk subscription ----", response.data);
            return response.data.subscription;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

interface SubscriptionState {
    subscription: Subscription | null;
}

const initialState: SubscriptionState = {
    subscription: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<Subscription>) => {
            state.subscription = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSubscription.fulfilled, (state, action) => {
            state.subscription = action.payload;
        });
    },
});

export default subscriptionSlice.reducer;
