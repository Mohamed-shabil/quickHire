import React from "react";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import Sidebar from "@/components/Sidebar";
const mainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <ModalProvider />
            {/* <Navbar /> */}
            <Sidebar>{children}</Sidebar>
        </div>
    );
};

export default mainLayout;
