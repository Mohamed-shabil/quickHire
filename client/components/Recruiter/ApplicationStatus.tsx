"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/axios/axios";
import { Application } from "@/types/types";
function ApplicationStatus({ application }: { application: Application }) {
    const changeStatus = (value: string) => {
        console.log(value);
        axiosInstance
            .patch("/api/jobs/application/change-status", {
                jobId: application.jobId,
                status: value,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Select
                defaultValue={application.status}
                onValueChange={changeStatus}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}

export default ApplicationStatus;
