import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Application } from "@/types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import ApplicationStatus from "@/components/Recruiter/ApplicationStatus";
import { axiosInstance } from "@/axios/axios";
import { string } from "zod";
import { getApplicants } from "@/services/api/jobs.service";

const getApplicant = async (token: string, jobId: string) => {
    try {
        const response = await getApplicants(jobId, token);
        return response.data.applications;
    } catch (error: any) {
        throw new Error(
            error.response.data.errors[0].message || "Something went wrong "
        );
    }
};

async function Applicants({ params }: { params: { jobId: string } }) {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/signin");
    }
    const jobId = params.jobId;

    console.log(jobId);

    const applications: Application[] = await getApplicant(token, jobId);

    return (
        <section className="container">
            <Table className="border rounded-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Headline</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Profile</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.length ? (
                        applications.map((application, index) => (
                            <TableRow key={application._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Image
                                        src={application.owner.avatar}
                                        alt={application.owner.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full w-14 h-14 object-cover"
                                    />
                                </TableCell>
                                <TableCell>
                                    {application.owner.fullName ||
                                        application.owner.name}
                                </TableCell>
                                <TableCell>
                                    {application.owner.headLine}
                                </TableCell>
                                <TableCell>{application.owner.email}</TableCell>
                                <TableCell>
                                    <Link href={application.resume}>
                                        <Button
                                            variant={"default"}
                                            className="flex gap-1 rounded-full"
                                        >
                                            Resume{" "}
                                            <ArrowDownToLine size={"1em"} />
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <ApplicationStatus
                                        application={application}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link href={``}></Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <div className="w-full mt-12">
                            <h1 className="font-semibold text-center text-sm">
                                No Applicants
                            </h1>
                        </div>
                    )}
                </TableBody>
            </Table>
        </section>
    );
}

export default Applicants;
