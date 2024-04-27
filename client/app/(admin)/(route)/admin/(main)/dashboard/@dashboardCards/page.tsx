import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, User, UserRound, UserSearch } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Analytics } from "@/types/types";
import { axiosInstance } from "@/axios/axios";
import { getAnalytics } from "@/services/api/payments.service";

const getDashBoardData = async (token: string): Promise<Analytics> => {
    try {
        const response = await getAnalytics(token);
        console.log(response.data.analyticsData);
        return response.data.analytics;
    } catch (error: any) {
        throw new Error(
            error.response.data.errors[0].message || "Something went wrong"
        );
    }
};

const dashboardCards = async () => {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        redirect("/admin/login");
    }
    const analytics = await getDashBoardData(token);
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        $ {analytics.lifeTimeRevenue}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        From overall lifetime
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Monthly Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ${analytics.monthlyRevenue}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        From last month only
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Seekers
                    </CardTitle>
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold gap-2 flex items-center">
                        <User strokeWidth={3} /> {analytics.users.seekers}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Recruiter
                    </CardTitle>
                    <UserSearch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold gap-2 flex items-center">
                        <UserSearch strokeWidth={3} />
                        {analytics.users.recruiters}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default dashboardCards;
