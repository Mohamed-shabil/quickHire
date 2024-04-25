import React from "react";
import { axiosInstance } from "@/axios/axios";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Jobs } from "@/types/types";
import ApplyJobModal from "@/components/Modals/ApplyJobModal";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import DOMPurify from "dompurify";
import {
    MapPin as LocationIcon,
    Briefcase as JobTypeIcon,
    BadgeIndianRupee as CashIcon,
    Settings as SkillsIcon,
    Award as ExperienceIcon,
    Users as OpeningsIcon,
    Building2 as EmploymentIcon,
    Zap,
    Terminal,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getJob } from "@/services/api/jobs.service";

const getCurrentJob = async (token: string, currentJob: string) => {
    try {
        const response = await getJob(currentJob, token);
        return response.data.job;
    } catch (error) {
        console.error(error);
    }
};

export const JobPreview = async ({
    currentJob,
}: {
    currentJob: string | null;
}) => {
    const token = cookies().get("jwt")?.value;
    if (!currentJob) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <Alert className="w-full max-w-[400px]">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }
    if (!token) {
        toast({
            title: "Awwww your are not authenticated",
            description: "Please Signup to continue",
        });
        return redirect("/signup");
    }

    const currency = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    });

    const job: Jobs = await getCurrentJob(token, currentJob);
    console.log("JOB IS HERE _____-0---", job);
    return (
        <main className="p-2 max-h-screen overflow-y-scroll">
            <div className="p-4 rounded-md mb-2 px-6">
                <section className="flex justify-between align-middle">
                    <div className="flex flex-row space-x-4">
                        <div className="my-auto flex shrink-0">
                            <Image
                                src={job.companyImage || "/photo.png"}
                                alt={job.company}
                                height={60}
                                width={60}
                            />
                        </div>
                        <div className="flex flex-1 flex-col">
                            <h3 className="font-normal text-base leading-3 text-slate-700-600 capitalize">
                                {job.company}
                            </h3>
                            <h2 className="font-bold text-lg py-1 capitalize">
                                {job.title}
                            </h2>
                        </div>
                    </div>
                    <ApplyJobModal job={job} />
                </section>
                {!!job.isActive ? (
                    ""
                ) : (
                    <p className="text-xs text-rose-500 mt-2">
                        No longer accepting application
                    </p>
                )}
                <Separator className="px-4 mt-5" />
                <section className="space-y-2 my-4 mt-6 ">
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <LocationIcon
                            size={"1.2em"}
                            className="text-blue-600"
                        />{" "}
                        {job.location}
                    </p>
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <JobTypeIcon
                            size={"1.2em"}
                            className="text-blue-600 "
                        />{" "}
                        {job.workPlace}
                    </p>
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <EmploymentIcon
                            size={"1.2em"}
                            className="text-blue-600"
                        />{" "}
                        {job.employmentType}
                    </p>
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <ExperienceIcon
                            size={"1.2em"}
                            className="text-blue-600"
                        />
                        <span className="bg-blue-500/10 p-1 rounded capitalize">
                            <p className="text-blue-500 text-sm">
                                {job.experience}
                            </p>
                        </span>
                    </p>
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <OpeningsIcon
                            size={"1.2em"}
                            className="text-blue-600"
                        />
                        Openings - {job.openings}
                    </p>
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <CashIcon size={"1.2em"} className="text-blue-600" />{" "}
                        {currency.format(job.minSalary)} -{" "}
                        {currency.format(job.maxSalary)}
                    </p>
                    <p className="font-normal text-base flex gap-2 items-center capitalize">
                        <SkillsIcon size={"1.2em"} className="text-blue-600" />
                        {job.skills.map((skill, index) => (
                            <span
                                className="bg-blue-500/10 p-1 rounded"
                                key={index}
                            >
                                <p className="text-blue-500 text-xs capitalize">
                                    {skill}
                                </p>
                            </span>
                        ))}
                    </p>
                </section>
                <Separator className="mb-2" />
                <div>
                    <h1 className="font-bold my-1 text-base">
                        Job Description
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: job.jobDescription,
                        }}
                        className="text-sm p-4 border rounded-md dark:text-white capitalize"
                    ></div>
                    <h4 className="font-bold my-1 text-base mt-4 ">
                        Requirements
                    </h4>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: job.requirements,
                        }}
                        className="text-sm border p-4 rounded-md dark:text-white capitalize"
                    ></div>
                </div>
            </div>
        </main>
    );
};
