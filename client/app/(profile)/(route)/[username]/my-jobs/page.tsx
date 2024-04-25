"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobsCard from "@/components/Jobs/JobsCard";
import { Application, Jobs } from "@/types/types";
import { axiosInstance } from "@/axios/axios";
import ErrorMessage from "@/components/ErrorMessage";

export default function MyJobs() {
    const user = useSelector((state: RootState) => state.user.userData);
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        axiosInstance
            .get(`/api/jobs/applied-jobs`)
            .then((res) => {
                setApplications(res.data.applications);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const applied = applications.filter(
        (application) => application.status === "applied"
    );
    const submitted = applications.filter(
        (application) => application.status === "submitted"
    );
    const reviewed = applications.filter(
        (application) => application.status === "reviewed"
    );
    const shortlisted = applications.filter(
        (application) => application.status === "shortlisted"
    );
    const rejected = applications.filter(
        (application) => application.status === "shortlisted"
    );

    console.log({ submitted });
    return (
        <div className="container">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-[600px] p-4">
                    <h1 className="font-semibold text-xl">My Jobs</h1>
                    <div>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="w-full flex items-center justify-between flex-wrap h-auto">
                                <TabsTrigger
                                    value="all"
                                    className="text-xs shadow-none"
                                >
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="submitted">
                                    Submitted
                                </TabsTrigger>
                                <TabsTrigger value="applied">
                                    Applied
                                </TabsTrigger>
                                <TabsTrigger value="reviewed">
                                    Reviewed
                                </TabsTrigger>
                                <TabsTrigger value="shortlisted">
                                    Shortlisted
                                </TabsTrigger>
                                <TabsTrigger value="rejected">
                                    Rejected
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="all">
                                {applications.length ? (
                                    applications.map((application) => (
                                        <JobsCard
                                            key={application._id}
                                            job={application.jobId}
                                        />
                                    ))
                                ) : (
                                    <ErrorMessage
                                        className="mt-5"
                                        message="You don't have any job applications"
                                        type="info"
                                    />
                                )}
                            </TabsContent>
                            <TabsContent value="submitted">
                                {submitted.length ? (
                                    submitted.map((application) => (
                                        <JobsCard
                                            job={application.jobId}
                                            key={application._id}
                                        />
                                    ))
                                ) : (
                                    <ErrorMessage
                                        className="mt-5"
                                        message="No submitted job applications"
                                        type="info"
                                    />
                                )}
                            </TabsContent>
                            <TabsContent value="applied">
                                {applied.length ? (
                                    applied.map((application) => (
                                        <JobsCard
                                            job={application.jobId}
                                            key={application._id}
                                        />
                                    ))
                                ) : (
                                    <ErrorMessage
                                        className="mt-5"
                                        message="No Applied Applications"
                                        type="info"
                                    />
                                )}
                            </TabsContent>
                            <TabsContent value="reviewed">
                                {reviewed.length ? (
                                    reviewed.map((application) => (
                                        <JobsCard
                                            job={application.jobId}
                                            key={application._id}
                                        />
                                    ))
                                ) : (
                                    <ErrorMessage
                                        className="mt-5"
                                        message="No Reviewed Applications"
                                        type="info"
                                    />
                                )}
                            </TabsContent>
                            <TabsContent value="shortlisted">
                                {shortlisted.length ? (
                                    shortlisted.map((application) => (
                                        <JobsCard
                                            job={application.jobId}
                                            key={application._id}
                                        />
                                    ))
                                ) : (
                                    <ErrorMessage
                                        className="mt-5"
                                        message="No Shortlisted Application"
                                        type="info"
                                    />
                                )}
                            </TabsContent>
                            <TabsContent value="rejected">
                                {rejected.length ? (
                                    rejected.map((application) => (
                                        <JobsCard
                                            job={application.jobId}
                                            key={application._id}
                                        />
                                    ))
                                ) : (
                                    <ErrorMessage
                                        className="mt-5"
                                        message="No Rejected Application"
                                        type="info"
                                    />
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </Card>
            </div>
        </div>
    );
}
