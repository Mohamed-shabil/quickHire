"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/axios/axios";
import { toast } from "@/components/ui/use-toast";
import { Check, Trash2, X } from "lucide-react";
import { Jobs } from "@/types/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

function DeleteJobTrigger({ job }: { job: Jobs }) {
    const router = useRouter();
    const deleteJob = (jobId: string) => {
        axiosInstance
            .delete(`/api/jobs/${jobId}/delete-job`)
            .then((res) => {
                toast({
                    title: "Job Deleted Successfully",
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <Check />
                        </div>
                    ),
                });
                router.refresh();
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: "Something went wrong 😢",
                    description: "Please try again...",
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <X />
                        </div>
                    ),
                });
            });
    };
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="destructive" size={"icon"}>
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this job post and its related applications.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteJob(job._id)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteJobTrigger;
