"use client"
import { useEffect, useState } from "react";
import { AboutFormModal } from "@/components/Modals/aboutFormModal";
import { EducationFormModal } from "@/components/Modals/educationFormModal";
import { ExperienceFormModal } from '@/components/Modals/experienceModal'
import { LinkFormModal} from '@/components/Modals/LinksFormModal'
import { AvatarModal } from '@/components/Modals/avatarModal'
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
            <AvatarModal/>
            <LinkFormModal/>
            <AboutFormModal/>
            <EducationFormModal/>
            <ExperienceFormModal/>
        </>
    );
}
 
export default ModalProvider;