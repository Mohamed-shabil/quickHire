"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Subscription } from "@/constants/constants";
import { Loader2 } from "lucide-react";

const page = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3007/api/payments/subscription", {
        withCredentials: true,
      })
      .then((res) => {
        setSubscriptions(res.data.subscriptions);
      });
  }, []);
  const openStripe = async (subscription: Subscription) => {
    console.log("open Stripe");
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

    const response = await axios.post(
      `http://localhost:3007/api/payments/subscribe/${subscription._id}`,
      {},
      {
        withCredentials: true,
      }
    );

    localStorage.setItem("_stripe-session",response.data.session.id);

    console.log(response.data);

    await stripe?.redirectToCheckout({sessionId:response.data.session.id});


    setLoading(false);
  };

  return (
    <section className="w-100 min-h-screen container">
      <div className=" text-center text-2xl w-full justify-center align-middle py-5">
        <h1 className="text-primary font-semibold">
          Simple and Flexible Pricing
        </h1>
        <p className="text-base">
          <span className="text-primary">QuickHire</span> offer two packages
          that gives you flexibility in your pricing
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {subscriptions &&
          subscriptions.map((subscriptions) => (
            <Card className="w-full max-w-[400px]">
              <CardHeader>
                <h3 className="font-medium text-primary text-2xl">
                  {subscriptions.planName}
                </h3>
                <h4 className="text-xl">₹ {subscriptions.price}</h4>
              </CardHeader>
              <CardContent>{subscriptions.description}</CardContent>
              <CardFooter>
                <Button onClick={() => openStripe(subscriptions)}>
                  {loading ? <Loader2 size={'0.9em'}/> : 'Subscribe' }
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </section>
  );
};

export default page;
