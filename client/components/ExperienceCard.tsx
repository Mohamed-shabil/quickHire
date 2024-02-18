import { Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { months } from "@/constants/constants";
export function ExperienceCard({
    experience,
}: {
    experience: {
        position: string;
        companyName: string;
        startDate:{
            startMonth:string;
            startYear:string;
        },
        endDate:{
            endYear :string;
            endMonth:string;
        }
    };
}) {
    return (
        <Card>
            <CardHeader className="gap-4 flex-row">
                <span className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded">
                    <Building2 className="text-white"/>
                </span>
                <div className="my-auto">
                    <p className="font-semibold">{experience.position}</p>
                    <small className="text-slate-400">
                        {experience.companyName}
                    </small>
                </div>
            </CardHeader>
            <CardContent className="flex gap-2 text-slate-400 text-sm">
                <p>{months[parseInt(experience.startDate.startMonth)]}-{experience.startDate.startYear}</p>
                <p>/</p>
                <p>{months[parseInt(experience.endDate.endMonth)]}-{experience.endDate.endYear}</p>
            </CardContent>
            <Separator />
        </Card>
    );
}