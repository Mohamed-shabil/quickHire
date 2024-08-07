"use client";
import React, { useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Check,
    FileText,
    FileUp,
    FolderUp,
    Loader2,
    Upload,
    X,
    Zap,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Jobs } from "@/types/types";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Resume } from "@/types/types";
import moment from "moment";
import {
    applicantInfo,
    applyToJob,
    uploadResume,
} from "@/services/api/jobs.service";
import { useRouter } from "next/navigation";

type FieldValues = {
    email: string;
    phone: string;
    resume: string;
};

export default function ApplyJobModal({ job }: { job: Jobs }) {
    console.log(job);
    const [open, setOpen] = useState(false);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(false);
    const newResume = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const formSchema = z.object({
        email: z.string(),
        phone: z.string().refine(
            (data) => {
                if (data) {
                    return parseInt(data);
                }
            },
            {
                message: "Phone Number must be Numbers",
            }
        ),
        resume: z.string().refine(
            (data) => {
                if (data.length) {
                    return data.length;
                }
            },
            {
                message: "Select a Resume",
            }
        ),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: async (): Promise<FieldValues> => {
            const response = await applicantInfo();
            if (response.data.user.resume) {
                setResumes(response.data.user.resume);
            }
            const data: FieldValues = {
                email: response.data.user.email as string,
                phone: response.data.user.phone as string,
                resume: "",
            };
            return data;
        },
        mode: "onTouched",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values, job.recruiterId);
        try {
            const response = await applyToJob(
                { ...values, recruiter: job.recruiterId },
                job._id
            );
            console.log(response);
            toast({
                title: "Job Application has been submitted",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <Check />
                    </div>
                ),
            });
            setOpen(false);
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something went wrong!😢",
                description:
                    error.response.errors[0].message || "Please try again",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        }
    };

    const uploadResumes = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            setLoading(true);
            const resume = newResume.current?.files?.[0];
            const data = new FormData();
            if (resume) {
                data.append("resume", resume);
            }
            const response = await uploadResume(data);
            if (response.data.user.resume) {
                setResumes(response.data.user.resume);
            }
            toast({
                title: "Resume uploaded",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        } catch (error: any) {
            toast({
                title: "Something went wrong!😢",
                description:
                    error.response.errors[0].message || "Please try again",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    const isLoading = form.formState.isSubmitting;
    return (
        <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
            {job.appliedAt ? (
                <p className="text-gray-500 text-xs text-center align-middle">
                    You already Applied on : {moment(job.appliedAt).calendar()}{" "}
                </p>
            ) : (
                <DialogTrigger asChild>
                    <Button variant={"default"} disabled={!job.isActive}>
                        Apply <Zap size={"1em"} />
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[600px] flex flex-col">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Apply Job</DialogTitle>
                        <DialogDescription>
                            {
                                "Fill the form to apply for the job. Click Apply job when you're done."
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-6 gap-6"
                    >
                        <div className="col-span-6">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full rounded-md"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-full rounded-md"
                                                placeholder="Enter your Phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                name="resume"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Resume</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-row space-y-1 flex-wrap"
                                            >
                                                {resumes.length != 0 ? (
                                                    resumes.map(
                                                        (resume, index) => (
                                                            <FormItem
                                                                className="flex items-center space-x-3 space-y-0"
                                                                key={index.toString()}
                                                            >
                                                                <FormControl>
                                                                    <div className="flex items-center space-x-2">
                                                                        <Label
                                                                            htmlFor={index.toString()}
                                                                            className="flex min-w-[150px] max-w-[150px] cursor-pointer justify-between
                                                                            gap-4 rounded-lg border border-gray-200 
                                                                            bg-white p-4 text-sm font-medium shadow-sm 
                                                                            has-[:checked]:border-blue-500 text-wrap truncate
                                                                            has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                                                        >
                                                                            <span className="flex truncate items-center gap-3 w-full">
                                                                                <FileText
                                                                                    size={
                                                                                        "1.1em"
                                                                                    }
                                                                                    className="text-blue-500"
                                                                                />{" "}
                                                                                {
                                                                                    resume.fileName
                                                                                }
                                                                            </span>
                                                                            <FormControl>
                                                                                <RadioGroupItem
                                                                                    value={
                                                                                        resume.url
                                                                                    }
                                                                                    id={index.toString()}
                                                                                />
                                                                            </FormControl>
                                                                        </Label>
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>
                                                        )
                                                    )
                                                ) : (
                                                    <h1 className="text-sm">
                                                        No Resumes are available
                                                    </h1>
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <Label
                                htmlFor="uploadResume"
                                className="p-2 py-3 flex justify-between items-center rounded-sm bg-blue-500/30 border max-w-[150px]"
                            >
                                <span className="flex items-center justify-between w-full">
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <span className="w-full flex items-center justify-between">
                                            <FileUp
                                                size={"1.4em"}
                                                className="text-blue-500"
                                            />{" "}
                                            Upload Resume
                                        </span>
                                    )}
                                </span>
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    id="uploadResume"
                                    ref={newResume}
                                    onChange={uploadResumes}
                                />
                            </Label>
                        </div>
                        <DialogFooter className="flex items-center justify-end col-span-6">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Apply"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
