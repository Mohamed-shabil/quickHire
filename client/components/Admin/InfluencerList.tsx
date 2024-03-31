import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/constants/constants";
import { Button } from "../ui/button";

const getMostFollowedUsers = async (token: string) => {
  const response = await axios.get(
    "http://localhost:3003/api/profile/most-followed",
    {
      headers: {
        Cookie: `jwt=${token}`,
      },
    }
  );
  return response.data.users as { count: number; profile: User }[];
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
          <div className="flex items-center gap-4">
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
                {user.profile.fullName || user.profile.username}
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
