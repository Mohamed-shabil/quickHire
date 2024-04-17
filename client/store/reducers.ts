import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";
import subscriptionReducer from "./slices/SubscriptionSlice";
import store from "./store";

const rootReducer = combineReducers({
    user: userReducer,
    modal: modalReducer,
    subscription: subscriptionReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
