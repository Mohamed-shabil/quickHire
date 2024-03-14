'use client'
import { Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { months,Jobs } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";

export function JobCard({job}:{job:Jobs}) {
    return (
        <Card className="w-[500px]">
            <CardHeader className="gap-4 flex-row">
                <span className="w-12 h-12 flex items-center justify-center">
                <Image src={job.companyImage || '/picture.png'} width={50} height={50} alt={"Company Image"}/>
                </span>
                <div className="my-auto">
                    <p className="font-semibold">{job.title}</p>
                    <small className="text-slate-400">
                        {job.company}
                    </small>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col text-slate-400 text-sm">
                <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} className="line-clamp-3" />
                <Link href={`/jobs/${job._id}`}>
                    <Button size={"sm"} variant={"link"}>
                        View More
                    </Button>
                </Link>
            </CardContent>
            <Separator />
        </Card>
    );
}