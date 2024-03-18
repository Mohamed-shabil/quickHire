import { Building2, School } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { months } from "@/constants/constants";

export function EducationCard({
    education,
}: {
    education: {
        school: string;
        startDate: {
            startMonth: string;
            startYear: string;
        };
        endDate: {
            endMonth: string;
            endYear: string;
        };
        degree: string;
        grade: string;
    };
}) {
    return (
        <Card className="max-w-md">
            <CardHeader className="gap-4 flex-row">
                <span className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded">
                    <School className="text-white"/>
                </span>
                <div className="my-auto">
                    <p className="font-semibold">{education.school}</p>
                    <small className="text-slate-400">
                        {education.degree}
                    </small>
                </div>
                
            </CardHeader>
            <CardContent className="flex gap-2 text-slate-400 text-sm">
                <p className="font-medium">Grade : {education.grade}</p>
                <p>{months[parseInt(education.startDate.startMonth)]}-{education.endDate.endYear}</p>
                <p>/</p>
                <p>{months[parseInt(education.endDate.endMonth)]}-{education.endDate.endYear}</p>
            </CardContent>
            <Separator />
        </Card>
    );
}