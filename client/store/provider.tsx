"use client";
import store from "./store";
import { fetchUser } from "./slices/userSlice";
import { fetchSubscription } from "./slices/SubscriptionSlice";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
