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
      <div className="w-full h-auto">
        {subscriptions &&
          subscriptions.map((subscription) => (
            <Card className="w-full max-w-[400px]">
              <CardHeader>
                <h3 className="font-medium text-primary text-2xl">
                  {subscription.planName}
                </h3>
                <h4 className="text-xl">₹ {subscription.price}</h4>
              </CardHeader>
              <CardContent>{subscription.description}</CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
};

export default page;
