"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import { Inter } from "next/font/google";
import { PeerProvider } from "@/components/Providers/PeerProvider";
import Sidebar from "@/components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
    const currentUser = useSelector((state: RootState) => state.user.userData);
    if (currentUser?.verified == false) {
        toast({
            title: "Please verify your account",
        });
        return redirect("/otpVerify");
    }
    return (
        <div className="h-full">
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
        </div>
    );
};

export default ChatsLayout;
