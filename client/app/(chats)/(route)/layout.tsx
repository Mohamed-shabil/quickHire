import React from "react";
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const mainLayout = async ({children}:{children:React.ReactNode;}) => {
    return ( 
        <div className="h-full">
                <ModalProvider/>
                <Navbar/>
                {children}
        </div>
     )
}
 
export default mainLayout;