"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { deleteSubscription } from "@/services/api/payments.service";

function SubscriptionDelete({ subscriptionId }: { subscriptionId: string }) {
    const router = useRouter();
    const Onclick = async (subscriptionId: string) => {
        console.log("delete Subscription");
        try {
            const response = await deleteSubscription(subscriptionId);
            toast({
                title: "Subscription plan deleted Successfully",
            });
            router.refresh();
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something went wrong please try again",
            });
        }
    };
    return (
        <Button variant={"outline"} onClick={() => Onclick(subscriptionId)}>
            <Trash2 className="text-rose-500" />
        </Button>
    );
}

export default SubscriptionDelete;
