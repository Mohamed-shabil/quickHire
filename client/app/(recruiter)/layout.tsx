import React from "react";
import Sidebar from '@/components/Recruiter/Sidebar'
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";

const mainLayout = async ({children}:{children:React.ReactNode;}) => {
    return ( 
        <div className="h-full">
            <ModalProvider/>
            <Navbar/>
            <section className="flex items-start justify-between">
                <aside className="z-30 w-full max-w-[300px]">
                    <Sidebar />
                </aside>
                <main className="w-full">
                    {children}
                </main>
            </section>
        </div>
     )
}
 
export default mainLayout;