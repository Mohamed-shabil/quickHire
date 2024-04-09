"use client";
import React, { useState } from "react";
import SvgGraph from "./SvgGraph";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Subscription } from "@/constants/constants";

function PricingPlan({ plan }: { plan: Subscription }) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const openStripe = async (subscription: Subscription) => {
        setLoading(true);
        try {
            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
            );

            const response = await axios.post(
                `http://localhost:3007/api/payments/subscribe/${subscription._id}`,
                {},
                {
                    withCredentials: true,
                }
            );

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
            <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke py-5 px-7 shadow-pricing ">
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
                    {loading ? <Loader2 size={"0.9em"} /> : "Subscribe"}
                </Button>

                <SvgGraph />
            </div>
        </div>
    );
}

export default PricingPlan;
