"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import Sidebar from "@/components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    const currentUser = useSelector((state: RootState) => state.user.userData);
    if (currentUser?.verified == false) {
        toast({
            title: "Please verify your account",
        });
        return redirect("/verifyOtp");
    }
    return (
        <div className="h-full">
            <ModalProvider />
            {/* <Navbar /> */}
            <Sidebar>{children}</Sidebar>
        </div>
    );
};

export default ProfileLayout;
