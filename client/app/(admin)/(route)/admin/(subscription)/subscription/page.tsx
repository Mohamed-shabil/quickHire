import { Subscription } from "@/types/types";
import { cookies } from "next/headers";
import React from "react";
import SubscriptionModal from "@/components/Modals/SubscriptionModal";
import PricingPlan from "@/components/PricingPlan";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import SubscriptionDelete from "@/components/Admin/SubscriptionDelete";
import { axiosInstance } from "@/axios/axios";
import { getSubscriptions } from "@/services/api/payments.service";

const getSubscriptionPlan = async (token: string) => {
    const response = await getSubscriptions(token);
    return response.data.subscriptions as Subscription[];
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
                        <HoverCard key={subscription._id}>
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
                                <SubscriptionDelete
                                    subscriptionId={subscription._id}
                                />
                            </HoverCardContent>
                        </HoverCard>
                    ))}
            </div>
        </section>
    );
};

export default page;
