"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Subscription } from "@/constants/constants";
import { Loader2 } from "lucide-react";
import PricingPlan from "@/components/PricingPlan";

const SubscriptionPage = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        axios
            .get("http://localhost:3007/api/payments/subscription", {
                withCredentials: true,
            })
            .then((res) => {
                setSubscriptions(res.data.subscriptions);
            });
    }, []);

    return (
        <section className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                    <span className="mb-2 block text-lg font-semibold text-primary">
                        Pricing Table
                    </span>
                    <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                        Our Pricing Plan
                    </h2>
                    <p className="text-base text-body-color dark:text-dark-6">
                        There are many variations of passages of Lorem Ipsum
                        available but the majority have suffered alteration in
                        some form.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-around flex-wrap gap-4">
                {subscriptions?.length &&
                    subscriptions.map((subscription) => (
                        <div
                            className="-mx-4 flex flex-wrap justify-center"
                            key={subscription._id}
                        >
                            <div className="-mx-4 flex flex-wrap">
                                <PricingPlan plan={subscription} />
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default SubscriptionPage;
