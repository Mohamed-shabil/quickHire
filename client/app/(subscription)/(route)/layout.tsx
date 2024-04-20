import React from "react";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
const SubsciptionLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <ModalProvider />
            <Navbar />
            <main className="w-full">{children}</main>
        </div>
    );
};

export default SubsciptionLayout;
