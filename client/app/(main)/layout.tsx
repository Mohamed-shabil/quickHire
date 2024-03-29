import React from "react";
import Navbar from "@/components/navbar";
import ModalProvider from "@/components/Providers/ModalProvider";
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