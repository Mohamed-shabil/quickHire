import React from "react";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/components/Providers/ModalProvider";

const mainLayout = async ({ children }: { children: React.ReactNode }) => {
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

export default mainLayout;
