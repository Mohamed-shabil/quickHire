import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";

const mainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <ModalProvider />
            {/* <aside className="z-30 w-full max-w-[300px]">
                        <Sidebar />
                    </aside> */}
            <Sidebar>
                <section className="flex items-start justify-between">
                    <main className="w-full">{children}</main>
                </section>
            </Sidebar>
        </div>
    );
};

export default mainLayout;
