"use client";
import { Building2, Check, Pencil, Trash2, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Experience, months } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "@/store/slices/modalSlice";
import { axiosInstance } from "@/axios/axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/reducers";
import { deleteExperience } from "@/services/api/profile.service";

export function ExperienceCard({
    experience,
    userId,
}: {
    experience: Experience;
    userId: string;
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    console.log(experience);
    const user = useSelector((state: RootState) => state.user.userData);

    const onClick = (id: string) => {
        deleteExperience(id)
            .then((res) => {
                console.log(res.data);
                toast({
                    title: "Yeah woooo...!!",
                    description: "Experience removed Successfully",
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
                    title: "Something Went Wrong 😢",
                    description: err.response.errors[0].message,
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <X />
                        </div>
                    ),
                });
            });
    };

    return (
        <Card className="my-2 w-full">
            <CardHeader className="gap-4 flex-row">
                <span className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded">
                    <Building2 className="text-white" />
                </span>
                <div className="my-auto">
                    <p className="font-semibold">{experience.position}</p>
                    <small className="text-slate-400">
                        {experience.companyName}
                    </small>
                </div>
                {user?._id == userId && (
                    <div className="flex gap-1 ">
                        <Button
                            variant={"fade"}
                            size={"mini"}
                            onClick={() => onClick(experience._id.toString())}
                        >
                            <Trash2 className="text-rose-500 w-5 h-5" />
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent className="flex gap-2 text-slate-400 text-sm">
                <p>
                    {months[parseInt(experience.startDate.startMonth)]}-
                    {experience.startDate.startYear}
                </p>
                <p>/</p>
                <p>
                    {months[parseInt(experience.endDate.endMonth)]}-
                    {experience.endDate.endYear}
                </p>
            </CardContent>
            <Separator />
        </Card>
    );
}
