"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/components/Providers/ModalProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const RecruiterLayout = ({ children }: { children: React.ReactNode }) => {
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
            <Sidebar>
                <section className="flex items-start justify-between">
                    <main className="w-full">{children}</main>
                </section>
            </Sidebar>
        </div>
    );
};

export default RecruiterLayout;
