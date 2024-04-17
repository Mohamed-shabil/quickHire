"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

function SubscriptionDelete({ subscriptionId }: { subscriptionId: string }) {
    const router = useRouter();
    const deleteSubscription = async (subscriptionId: string) => {
        console.log("delete Subscription");
        axios.defaults.withCredentials = true;
        axios
            .delete(
                `http://localhost:3007/api/payments/subscription/remove/${subscriptionId}`
            )
            .then((res) => {
                console.log(res);
                toast({
                    title: "Subscription plan deleted Successfully",
                });
                router.reload();
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: "Something went wrong please try again",
                });
            });
    };
    return (
        <Button
            variant={"outline"}
            onClick={() => deleteSubscription(subscriptionId)}
        >
            <Trash2 className="text-rose-500" />
        </Button>
    );
}

export default SubscriptionDelete;
