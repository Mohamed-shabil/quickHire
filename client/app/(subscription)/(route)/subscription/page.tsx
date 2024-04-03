"use client";
import React from "react";
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
import { planType } from "@/constants/constants";

const page = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.userData);

  const checkout = (plan: planType) => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3007/api/payments/subscribe", {
        plan: plan,
        userId: user?._id,
      })
      .then((res) => {
        console.log(res.data);
        router.push(res.data.session.url);
      })
      .catch((e) => {
        console.log(e.error);
      });
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
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <h3 className="font-medium text-primary text-2xl">Monthly Plan</h3>
            <h4 className="text-xl">₹ 699</h4>
          </CardHeader>
          <CardContent>
            Pay on a monthly basis and enjoy the freedom to adjust your plan as
            your hiring demands fluctuate.
          </CardContent>
          <CardFooter>
            <Button onClick={()=>{
              checkout('monthly')
            }}>Subscribe Now</Button>
          </CardFooter>
        </Card>

        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <h3 className="font-medium text-primary text-2xl">Yearly Plan</h3>
            <h4 className="text-xl">₹ 4999</h4>
          </CardHeader>
          <CardContent>
            Our yearly plan offers substantial cost savings compared to the
            monthly subscription. Stretch your recruiting budget further and
            enjoy the peace of mind of knowing your hiring needs are covered all
            year long.
          </CardContent>
          <CardFooter>
            <Button onClick={()=>{
              checkout('yearly')
            }}>Subscribe Now</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default page;
