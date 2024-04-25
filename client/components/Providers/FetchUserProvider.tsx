// "use client";
// import { AppDispatch } from "@/store/reducers";
// import { fetchUser } from "@/store/slices/userSlice";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// const FetchUserProvider = ({ children }: { children: React.ReactNode }) => {
//     const [isMounted, setIsMouted] = useState(false);
//     useEffect(() => {
//         setIsMouted(true);
//     }, []);

//     if (!isMounted) {
//         return null;
//     }
//     return <>{children}</>;
// };

// export default FetchUserProvider;
