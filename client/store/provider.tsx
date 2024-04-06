"use client";

import { fetchUser } from "./slices/userSlice";
import store from "./store";
import { Provider } from "react-redux";

store.dispatch(fetchUser());
export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
