import React from "react";
import JobsCard from "@/components/Jobs/JobsCard";
import { toast } from "@/components/ui/use-toast";
import { Jobs } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JobPreview } from "@/components/Jobs/JobPreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

import { searchJob } from "@/services/api/jobs.service";

interface IFilter {
    title?: string;
    location?: string;
    experience?: string;
}

const getJobs = async (token: string, filter: IFilter) => {
    try {
        console.log("TOKEN in JOB", token);
        const response = await searchJob(filter, token);
        return response.data.jobs;
    } catch (error: any) {
        throw new Error(
            error.response.data.errors[0].message || "Something Went Wrong"
        );
    }
};

export default async function page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const token = cookies().get("jwt")?.value;
    const currentJob = searchParams?.currentJob || "";
    const filter = {
        location: searchParams?.location || "",
        title: searchParams?.title || "",
        experience: searchParams?.experience || "",
    };

    if (!token) {
        toast({
            title: "You are not authenticated !",
            description: "Please login to continue",
        });
        return redirect("/signup");
    }
    const jobs: Jobs[] = await getJobs(token, filter);
    console.log("here is the jobs.....", jobs);

    if (!jobs.length) {
        return (
            <section className="h-[60vh]">
                <div className="flex items-center h-full w-full justify-center">
                    <h3 className="font-semibold text-sm">No data found</h3>
                </div>
            </section>
        );
    }

    return (
        <section className="flex w-full h-screen">
            <>
                <ScrollArea className="w-full max-w-lg border-r p-2 h-screen">
                    {jobs.map((job) => (
                        <Link href={`jobs?currentJob=${job._id}`} key={job._id}>
                            <JobsCard job={job} />
                        </Link>
                    ))}
                </ScrollArea>
                <section className="w-full">
                    <JobPreview currentJob={currentJob} />
                </section>
            </>
        </section>
    );
}
