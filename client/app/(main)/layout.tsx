"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import SideBar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
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

export default MainLayout;
