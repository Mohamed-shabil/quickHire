import React from "react";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import { Inter } from "next/font/google";
import { PeerProvider } from "@/components/Providers/PeerProvider";
const inter = Inter({ subsets: ["latin"] });
const mainLayout = async ({ children }: { children: React.ReactNode }) => {
    return <div className="h-full">{children}</div>;
};

export default mainLayout;
