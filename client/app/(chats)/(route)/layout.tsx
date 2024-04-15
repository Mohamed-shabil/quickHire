import React from "react";
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import { Inter } from "next/font/google";
import { PeerProvider } from "@/components/Providers/PeerProvider";
import Sidebar from "@/components/Sidebar";
const inter = Inter({ subsets: ["latin"] });

const mainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
        </div>
    );
};

export default mainLayout;
