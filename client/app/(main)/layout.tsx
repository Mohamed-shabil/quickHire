import React from "react";
import Navbar from "@/components/navbar";
const mainLayout = async ({children}:{children:React.ReactNode;}) => {
    return ( 
        <div className="h-full">
            <Navbar/>
            {children}
        </div>
     )
}
 
export default mainLayout;