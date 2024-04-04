import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Subscription } from "@/constants/constants";
import { cookies } from "next/headers";

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
        {subscriptions.map((subscriptions) => (
          <Card className="w-full max-w-[400px]">
            <CardHeader>
              <h3 className="font-medium text-primary text-2xl">
                {subscriptions.planName}
              </h3>
              <h4 className="text-xl">₹ {subscriptions.price}</h4>
            </CardHeader>
            <CardContent>{subscriptions.description}</CardContent>
            <CardFooter>
              <Button>Subscribe Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default page;
