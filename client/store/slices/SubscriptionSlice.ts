import { Subscription } from "@/types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubscription = createAsyncThunk(
    "fetchSubscription",
    async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/subscriptions/current-subscription`,
            {
                withCredentials: true,
            }
        );
        console.log("thunk subscription ----", response.data);
        return response.data.subscription;
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
