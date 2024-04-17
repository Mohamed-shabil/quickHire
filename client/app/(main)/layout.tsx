import React from "react";
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import SideBar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";
const mainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <ModalProvider />
            <Navbar />
            <SideBar>
                <div className="w-full flex flex-row justify-between relative">
                    <div className="container">{children}</div>
                    <div className="w-full max-w-sm flex">
                        <ProfileCard />
                    </div>
                </div>
            </SideBar>
        </div>
    );
};

export default mainLayout;
