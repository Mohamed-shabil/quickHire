import { currentSubscription } from "@/services/api/payments.service";
import { Subscription } from "@/types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubscription = createAsyncThunk(
    "fetchSubscription",
    async () => {
        try {
            const response = await currentSubscription();
            return response.data.subscription;
        } catch (error: any) {
            console.log(error);
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
