"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "@/types/types";
import { axiosInstance } from "@/axios/axios";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Check, X } from "lucide-react";
import { blockUser, unBlockUser } from "@/services/api/auth.service";

export function BlockSwitch({ user }: { user: User }) {
    const [blocked, setBlocked] = useState<boolean>(user.isBlocked);
    const handleUserBlock = () => {
        console.log("current Block", blocked);

        if (!blocked) {
            blockUser(user._id)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: `Blocked ${user.fullName || user.name}`,
                        action: (
                            <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                                <Check />
                            </div>
                        ),
                    });
                })
                .catch((err) => {
                    toast({
                        title: `You unblocked ${user.fullName || user.name}`,
                        action: (
                            <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                                <Check />
                            </div>
                        ),
                    });
                });
        } else {
            unBlockUser(user._id)
                .then((res) => {
                    console.log(res.data);
                    toast({
                        title: `Unblocked ${user.fullName || user.name}`,
                        action: (
                            <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                                <Check />
                            </div>
                        ),
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        title: "Some thing went wrong 😢",
                        action: (
                            <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                                <X />
                            </div>
                        ),
                    });
                });
        }
    };
    return (
        <div className="flex items-center space-x-2">
            <Switch
                id={user._id}
                checked={blocked}
                onCheckedChange={() => {
                    setBlocked(!blocked);
                    handleUserBlock();
                }}
            />
            <Label htmlFor={user._id}>Block User</Label>
        </div>
    );
}
