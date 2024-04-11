import { Subscription } from "@/constants/constants";
import axios from "axios";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SubscriptionModal from "@/components/Modals/subscriptionModal";
import PricingPlan from "@/components/PricingPlan";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const getSubscriptionPlan = async (token: string) => {
    const response = await axios.get(
        "http://localhost:3007/api/payments/subscription",
        {
            headers: {
                cookie: `jwt=${token}`,
            },
        }
    );
    return response.data.subscriptions as Subscription[];
};

const deleteSubscription = async (token: string, subscriptionId: string) => {
    axios
        .delete(
            `http://localhost:3007/api/payments/subscription/remove/${subscriptionId}`,
            {
                headers: {
                    cookie: `jwt=${token}`,
                },
            }
        )
        .catch((res) => {
            console.log(res);
            toast({
                title: "Subscription plan deleted Successfully",
            });
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Something went wrong please try again",
            });
        });
};
const page = async () => {
    const token = cookies().get("jwt")?.value as string;
    const subscriptions = await getSubscriptionPlan(token);
    return (
        <section className="container">
            <div className="w-full h-28 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Subscriptions</h1>
                <SubscriptionModal />
            </div>
            <div className="w-full h-[75vh] flex items-center ">
                {subscriptions &&
                    subscriptions.map((subscription) => (
                        <HoverCard>
                            <HoverCardTrigger>
                                <PricingPlan plan={subscription} />
                            </HoverCardTrigger>
                            <HoverCardContent
                                sideOffset={0}
                                className="-mb-5 border-b-0 shadow-none w-fit p-0 flex gap-2"
                                align="end"
                                alignOffset={15}
                            >
                                <SubscriptionModal
                                    subscription={subscription}
                                />
                                <Button variant={"outline"}>
                                    <Trash2 className="text-rose-500" />
                                </Button>
                            </HoverCardContent>
                        </HoverCard>
                    ))}
            </div>
        </section>
    );
};

export default page;
