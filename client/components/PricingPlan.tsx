"use client";
import React, { useState } from "react";
import SvgGraph from "./SvgGraph";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "@/axios/axios";
import { Subscription } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { subscribe } from "@/services/api/payments.service";

function PricingPlan({ plan }: { plan: Subscription }) {
    const [loading, setLoading] = useState<boolean>(false);

    const subscription = useSelector(
        (state: RootState) => state.subscription.subscription
    );

    const router = useRouter();
    const openStripe = async (subscription: Subscription) => {
        setLoading(true);
        try {
            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
            );

            const response = await subscribe(subscription._id);
            console.log(response.data);
            await stripe?.redirectToCheckout({
                sessionId: response.data.session.id,
            });
        } catch (error: any) {
            console.log(error);
            if (error.response.status == 409) {
                console.log(error.response.data.errors[0].data.redirectUrl);
                router.push(error.response.data.errors[0].data.redirectUrl);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full px-4 max-w-sm">
            <div className="relative z-10 overflow-hidden rounded-[10px] border-2 border-stroke py-5 px-7 shadow-pricing ">
                <span className="mb-3 block text-lg font-semibold text-primary">
                    {plan.planName}
                </span>
                <h2 className="mb-5 text-[42px] font-bold capitalize">
                    {`₹${plan.price}`}
                    <span className="text-base font-medium ">
                        / {plan.billingPeriod}
                    </span>
                </h2>
                <p className="mb-8 border-b border-stroke pb-8 text-sm">
                    {plan.description}
                </p>
                <Button className="w-full" onClick={() => openStripe(plan)}>
                    {loading ? (
                        <Loader2 size={"0.9em"} className="animate-spin" />
                    ) : subscription?._id == plan._id ? (
                        "Manage Plan"
                    ) : (
                        "Subscribe"
                    )}
                </Button>
                <SvgGraph />
            </div>
        </div>
    );
}

export default PricingPlan;
