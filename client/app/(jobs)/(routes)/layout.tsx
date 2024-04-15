import React from "react";
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import SideBar from "@/components/Sidebar";
const mainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <ModalProvider />
            <SideBar>{children}</SideBar>
        </div>
    );
};

export default mainLayout;
