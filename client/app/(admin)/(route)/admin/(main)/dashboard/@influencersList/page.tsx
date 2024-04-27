import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { axiosInstance } from "@/axios/axios";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/types/types";
import { Button } from "@/components/ui/button";
import { influencersList } from "@/services/api/profile.service";

const getMostFollowedUsers = async (
    token: string
): Promise<{ count: number; profile: User }[]> => {
    try {
        const response = await influencersList(token);
        return response.data.users;
    } catch (error: any) {
        throw new Error(
            error.response.data.errors[0].message || "Something went wrong"
        );
    }
};

const InfluencerList = async () => {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/signin");
    }

    const users = await getMostFollowedUsers(token);
    console.log(users[0]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Most Followed Users</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {users.map((user) => (
                    <div
                        className="flex items-center gap-4"
                        key={user.profile._id}
                    >
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage
                                src={user.profile.avatar}
                                alt="Avatar"
                                className="object-cover"
                            />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {user.profile.fullName || user.profile.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {user.profile.email}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">
                            <Button size={"mini"} variant={"fade"}>
                                View
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default InfluencerList;
