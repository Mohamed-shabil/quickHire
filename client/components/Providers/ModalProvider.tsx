"use client"
import { useEffect, useState } from "react";
import { AboutFormModal } from "../Modals/aboutFormModal";
import { EducationFormModal } from "../Modals/educationFormModal";
import { ExperienceFormModal } from '../Modals/experienceModal'
import { LinkFormModal} from '@/components/Modals/LinksFormModal'
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
            <LinkFormModal/>
            <AboutFormModal/>
            <EducationFormModal/>
            <ExperienceFormModal/>
        </>
    );
}
 
export default ModalProvider;