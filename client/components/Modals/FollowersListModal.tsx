"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { follower } from "@/constants/constants";

export function FollowerListModal({ userId }: { userId: string }) {
    const [users, setUsers] = useState<follower[]>([]);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
            .get(`http://localhost:3003/api/profile/followers/${userId}`)
            .then((res) => {
                console.log("followers", res.data.followers);
                setUsers(res.data.followers);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Hello world</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <Input placeholder="Search" />
                </DialogHeader>
                {users.map((user) => (
                    <div
                        className="border rounded-sm flex space-x-2 flex-row p-2"
                        key={user._id}
                    >
                        <Avatar>
                            <AvatarImage
                                src={user.follow.avatar}
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>
                                {user.follow.fullName || user.follow.username}
                            </p>
                        </div>
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    );
}
