"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Subscription } from "@/types/types";
import PricingPlan from "@/components/PricingPlan";
import { getSubscriptions } from "@/services/api/payments.service";

const SubscriptionPage = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        // axios.get(`/api/payments/subscription`).then((res) => {
        //     setSubscriptions(res.data.subscriptions);
        // });
        getSubscriptions()
            .then((res) => {
                console.log(res.data);
                setSubscriptions(res.data.subscriptions);
            })
            .catch((err: any) => {
                console.log("err----r-we-r-we-rw-e", err);
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
