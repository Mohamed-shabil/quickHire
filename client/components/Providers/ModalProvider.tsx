"use client"
import { useEffect, useState } from "react";
import { AboutFormModal } from "../Modals/aboutFormModal";
import { EducationFormModal } from "../Modals/educationFormModal";

const ModalProvider = () => {
    const [isMounted,setIsMouted] = useState(false);
    useEffect(()=>{
        setIsMouted(true);
    },[]);
    
    if(!isMounted){
        return null
    }

    return ( 
        <>
            <AboutFormModal/>
            <EducationFormModal/>
        </>
    );
}
 
export default ModalProvider;