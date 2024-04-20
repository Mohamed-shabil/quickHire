import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { EducationCard } from "@/components/Profile/EducationCard";
import { ExperienceCard } from "@/components/Profile/ExperienceCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Profile } from "@/types/types";
import { axiosInstance } from "@/axios/axios";

const getProfile = async (token: string, username: string) => {
    console.log("here is the token", token);
    const res = await axiosInstance.get(`/api/profile/${username}`, {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    return res.data.profile;
};

export default async function EditProfile({
    params,
}: {
    params: { username: string };
}) {
    const token = cookies().get("jwt")?.value;
    const username = params.username;
    if (!token) {
        return redirect("/signup");
    }

    const profile: Profile = await getProfile(token, username);
    console.log({ profile });

    return (
        <main className="container">
            <section className="w-full min-h-[100vh - 100px] flex items-center justify-center">
                <div className="w-full max-w-[1000px]">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>About</AccordionTrigger>
                            <AccordionContent></AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Links</AccordionTrigger>
                            <AccordionContent>
                                {
                                    "Yes. It comes with default styles that matches the other components aesthetic."
                                }
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Education</AccordionTrigger>
                            <AccordionContent className="flex justify-between gap-2">
                                {profile.education?.map((education, index) => (
                                    <EducationCard
                                        education={education}
                                        key={index}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Experiece</AccordionTrigger>
                            <AccordionContent className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {profile.experience?.map((experience, i) => (
                                    <ExperienceCard
                                        experience={experience}
                                        key={i}
                                        userId={profile._id}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </main>
    );
}
