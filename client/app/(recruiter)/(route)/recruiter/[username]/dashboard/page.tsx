import React from "react";
import { Jobs } from "@/types/types";
import JobsCard from "@/components/Jobs/JobsCard";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import DeactivateJob from "@/components/Recruiter/DeactivateJob";
import DeleteJobTrigger from "@/components/Recruiter/DeleteJobTrigger";
import Link from "next/link";
import { CreateJobModal } from "@/components/Modals/CreateJobModal";
import { axiosInstance } from "@/axios/axios";

const getMyJob = async (token: string, recruiter: string) => {
    try {
        const response = await axiosInstance.get(
            `/api/jobs/${recruiter}/get-jobs`,
            {
                headers: {
                    Cookie: `jwt=${token}`,
                },
                withCredentials: true,
            }
        );
        return response.data.jobs as Jobs[];
    } catch (error) {
        toast({
            title: "Something went wrong!😢",
            description: "Something went wrong, Please try again",
        });
    }
};

const Recruiter = async ({ params }: { params: { username: string } }) => {
    const token = cookies().get("jwt")?.value;
    const recruiter = params.username;
    if (!token) {
        return redirect("/signin");
    }
    const jobs = await getMyJob(token, recruiter);

    return (
        <main className="min-h-screen flex items-start justify-between container">
            <div className="w-full h-full container ">
                <header className="flex items-start h-16 justify-between w-full">
                    <h1 className="font-semibold text-xl">My Jobs</h1>
                    {/* {
                        jobs?.length == 3 ? 
                            <h2>You are already complete all your 3 free job posts</h2> :
                        } */}
                    <CreateJobModal jobsCount={jobs?.length || 0} />
                </header>
                <section className="flex items-start flex-wrap">
                    {jobs && jobs.length ? (
                        jobs.map((job) => (
                            <div
                                className="border rounded-md shadow-sm p-4 "
                                key={job._id}
                            >
                                <div className="w-full flex flex-row items-center justify-between mb-2">
                                    <div className="max-w-min flex gap-2">
                                        <Link
                                            href={`dashboard/edit-job/${job._id}`}
                                        >
                                            <Button
                                                variant={"fade"}
                                                size={"icon"}
                                            >
                                                <Pencil />
                                            </Button>
                                        </Link>
                                        <DeleteJobTrigger job={job} />
                                    </div>
                                    <DeactivateJob job={job} />
                                </div>
                                <Link href={`dashboard/${job._id}`}>
                                    <JobsCard job={job} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <h2>You Dont have any Job posts</h2>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Recruiter;
