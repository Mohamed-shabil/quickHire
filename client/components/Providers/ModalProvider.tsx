"use client";
import { useEffect, useState } from "react";
import { AboutFormModal } from "@/components/Modals/AboutFormModal";
import { EducationFormModal } from "@/components/Modals/EducationFormModal";
import { ExperienceFormModal } from "@/components/Modals/ExperienceModal";
import { LinkFormModal } from "@/components/Modals/LinksFormModal";
import { AvatarModal } from "@/components/Modals/AvatarModal";
import { CreatePostModal } from "@/components/Modals/CreatePostModal";
import { CreateJobModal } from "@/components/Modals/CreateJobModal";
import { ProjectFormModal } from "@/components/Modals/ProjectModal";
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
