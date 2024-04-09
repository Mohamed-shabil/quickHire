import { Subscription } from "@/constants/constants";
import axios from "axios";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import SubscriptionModal from "@/components/Modals/subscriptionModal";
import PricingPlan from "@/components/PricingPlan";

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

const page = async () => {
    const token = cookies().get("jwt")?.value as string;
    const subscriptions = await getSubscriptionPlan(token);
    return (
        <section className="container">
            <div className="w-full h-28 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Subscriptions</h1>
                <SubscriptionModal />
            </div>
            <div className="w-full h-auto flex ">
                {subscriptions &&
                    subscriptions.map((subscription) => (
                        <PricingPlan plan={subscription} />
                    ))}
            </div>
        </section>
    );
};

export default page;
