import { Project } from "@/constants/constants";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { FolderKanban, School, Link as Url } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export function ProjectCard({ project }: { project: Project }) {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    return (
        <Card>
            <CardHeader className="gap-4 flex-row">
                <span className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded">
                    <FolderKanban className="text-white" />
                </span>
                <div className="my-auto">
                    <p className="font-semibold">{project.projectName}</p>
                    <small className="text-slate-400">
                        {project.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="whitespace-nowrap rounded-full capitalize bg-blue-500/15 px-2.5 py-0.5 text-sm text-blue-700 mx-1"
                            >
                                {skill}
                            </span>
                        ))}
                    </small>
                </div>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-2 text-sm text-gray-400 ">
                    {project.description}
                </p>
            </CardContent>
            <CardFooter className="flex flex-row justify-between gap-2 text-slate-400 text-sm">
                <div className="flex h-full justify-between flex-row">
                    <p>
                        {startDate.toLocaleDateString()} -{" "}
                        {endDate.toLocaleDateString()}
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"link"}>View the Project</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>{project.projectName}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-left text-sm font-semibold">
                                    Description
                                </div>
                                <div className="col-span-3 text-sm ">
                                    {project.description}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-left text-sm font-semibold">
                                    Time Span
                                </div>
                                <div className="col-span-3 text-sm ">
                                    <p>
                                        {startDate.toLocaleDateString()} -{" "}
                                        {endDate.toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-left text-sm font-semibold">
                                    Skills
                                </div>
                                <div className="col-span-3 text-sm ">
                                    {project.skills.map((skill, index) => (
                                        <span
                                            className="whitespace-nowrap rounded-full capitalize bg-blue-500/15 px-2.5 py-0.5 text-sm text-blue-700 mx-1"
                                            key={index}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-left text-sm font-semibold">
                                    Url
                                </div>
                                <div className="col-span-3 text-sm ">
                                    <Link
                                        href={project.links[0]}
                                        className="text-blue-500 flex "
                                    >
                                        {project.links[0]}
                                        <Url className="w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
            <Separator />
        </Card>
    );
}
