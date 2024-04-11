import React from "react";
import axios from "axios";
import JobsCard from "@/components/Jobs/JobsCard";

import { toast } from "@/components/ui/use-toast";
import { Jobs } from "@/constants/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JobPreview } from "@/components/Jobs/JobPreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface IFilter {
    title: string | null;
    location: string | null;
    experience: string | null;
}

const getJobs = async (token: string, filter: IFilter) => {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`http://localhost:3005/api/jobs/search-job?`, {
        params: {
            experience: filter.experience,
            location: filter.location,
        },
        headers: {
            Cookie: `jwt=${token}`,
        },
    });

    return res.data.jobs;
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
        title: searchParams?.location || "",
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
    return (
        <section className="flex w-full h-screen">
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
        </section>
    );
}
