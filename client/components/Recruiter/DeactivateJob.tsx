"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";
import { Jobs } from "@/types/types";
import { axiosInstance } from "@/axios/axios";
import { deactivateJob } from "@/services/api/jobs.service";

export default function DeactivateJob({ job }: { job: Jobs }) {
    const [isActive, setIsActive] = useState<boolean>(job.isActive);

    const onSubmit = async(currentState: boolean) => {
        setIsActive(currentState);
        try {
            const response = await deactivateJob(job._id,currentState);
            toast({
                title: job.isActive
                    ? "Job is Activated"
                    : "Job is Deactivated",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <Check />
                    </div>
                ),
            });
        } catch (error) {
            toast({
                title: "Something went wrong 😢",
                description: "Please try again...",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        }
    };
    return (
        <div className="flex gap-1">
            <div>
                <h2>{isActive ? "Deactivate the job" : "Activate the job"}</h2>
            </div>
            <Switch
                checked={isActive}
                onCheckedChange={(currentState) => {
                    onSubmit(currentState);
                }}
            />
        </div>
    );
}
