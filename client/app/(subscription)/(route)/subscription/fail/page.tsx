import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <section className="container w-full h-[90vh]">
            <div className="h-full flex items-center justify-center">
                <div className="max-w-md grid grid-cols-6 border p-2 rounded-md space-x-2 shadow-md">
                    <div className="flex items-center justify-center ">
                        <div className="bg-rose-500 rounded-md p-4">
                            <X className="text-white" />
                        </div>
                    </div>
                    <div className="col-span-5">
                        <h1 className="text-base font-medium ">
                            Payment failed
                        </h1>
                        <p className="text-sm text-secondary-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Debitis, distinctio voluptate. Doloribus eaque
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

export default page;
