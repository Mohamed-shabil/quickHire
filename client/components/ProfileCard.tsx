"use client";
import { Profile, UserType, follower } from "@/types/types";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/reducers";
import { current } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosInstance } from "@/axios/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/services/api/profile.service";

interface currentUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    verified: boolean;
    isBlocked: boolean;
    avatar: string;
    fullName: string;
    headline: string;
    role: UserType;
    followers: follower[];
    followings: follower[];
}

function ProfileCard({ className }: { className?: String }) {
    const [profile, setProfile] = useState<currentUser>();
    useEffect(() => {
        getCurrentUser()
            .then((res: AxiosResponse<{ currentUser: currentUser }>) => {
                console.log(res.data.currentUser);
                setProfile(res.data.currentUser);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(profile?.fullName);
    return (
        <div className={cn("fixed w-full max-w-sm", className)}>
            <div className="flex flex-col items-center pb-10">
                <Image
                    width={100}
                    height={100}
                    className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover ring-primary right-2 ring-offset-2"
                    src={profile?.avatar || "/user.png"}
                    alt={""}
                />
                <h5 className="mb-1 text-xl font-medium capitalize">
                    {profile?.fullName || profile?.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {profile?.headline}
                </span>
                <div className="flex mt-4 md:mt-4 justify-around space-x-6">
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold">
                            {profile?.followers.length || "0"}
                        </h3>
                        <p className="text-gray-500 text-sm font-normal">
                            Followers
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold">
                            {profile?.followings.length || "0"}
                        </h3>
                        <p className="text-gray-500 text-sm font-normal">
                            Followings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
