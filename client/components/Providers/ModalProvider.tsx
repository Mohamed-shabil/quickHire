"use client";
import { useEffect, useState } from "react";
import { AboutFormModal } from "@/components/Modals/AboutFormModal";
import { EducationFormModal } from "@/components/Modals/educationFormModal";
import { ExperienceFormModal } from "@/components/Modals/experienceModal";
import { LinkFormModal } from "@/components/Modals/LinksFormModal";
import { AvatarModal } from "@/components/Modals/avatarModal";
import { CreatePostModal } from "../Modals/createPostModal";
import { CreateJobModal } from "../Modals/createJobModal";
import { ProjectFormModal } from "../Modals/projectModal";
const ModalProvider = () => {
    const [isMounted, setIsMouted] = useState(false);
    useEffect(() => {
        setIsMouted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ProjectFormModal />
            {/* <CreateJobModal/> */}
            <CreatePostModal />
            <AvatarModal />
            <LinkFormModal />
            <AboutFormModal />
            <EducationFormModal />
            <ExperienceFormModal />
        </>
    );
};

export default ModalProvider;
