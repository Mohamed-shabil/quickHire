"use client"
import { useEffect, useState } from "react";
import { AboutFormModal } from "@/components/Modals/aboutFormModal";
import { EducationFormModal } from "@/components/Modals/educationFormModal";
import { ExperienceFormModal } from '@/components/Modals/experienceModal'
import { LinkFormModal} from '@/components/Modals/LinksFormModal'
import { AvatarModal } from '@/components/Modals/avatarModal'
<<<<<<< HEAD
import { CreatePostModal } from "../Modals/createPostModal";
=======
>>>>>>> fd6c3a30b5168342a2b5143c4b3a22665afcdd05
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
            <CreatePostModal/>
            <AvatarModal/>
            <LinkFormModal/>
            <AboutFormModal/>
            <EducationFormModal/>
            <ExperienceFormModal/>
        </>
    );
}
 
export default ModalProvider;