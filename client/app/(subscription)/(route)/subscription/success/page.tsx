import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Check, Terminal } from "lucide-react";
import Link from "next/link";
import React from "react";

const SubscriptionSuccess = () => {
    return (
        <section className="container w-full h-[90vh]">
            <div className="h-full flex items-center justify-center flex-col">
                <div className="max-w-md grid grid-cols-6 border p-2 rounded-md space-x-2 shadow-md">
                    <div className="flex items-center justify-center ">
                        <div className="bg-emerald-500 rounded-md p-4">
                            <Check className="text-white" />
                        </div>
                    </div>
                    <div className="col-span-5">
                        <h1 className="text-base font-medium ">
                            Payment Successfull
                        </h1>
                        <p className="text-sm text-secondary-foreground">
                            Congratulations your purchase is successfull ! Start
                            maximizing your recruitment efforts today!
                        </p>
                    </div>
                </div>
                <Link href="/">
                    <Button variant={"link"}>Go to Home</Button>
                </Link>
            </div>
        </section>
    );
};

export default SubscriptionSuccess;
