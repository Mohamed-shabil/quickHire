"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/axios/axios";
import { CircleUserRound, Loader2, UserRoundSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Signin() {
    const router = useRouter();
    const [isLoading, SetLoading] = useState<boolean>(false);
    const formSchema = z.object({
        role: z.string(),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "",
        },
        mode: "onTouched",
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        SetLoading(true);
        axiosInstance
            .patch("/api/auth/users/selectRole", values)
            .then((res) => {
                console.log(res);
                router.push("/");
            })
            .catch((err) => {
                toast({
                    title: "Something went wrong",
                    description: "Please refresh and try again",
                });
            })
            .finally(() => {
                SetLoading(false);
            });
    };
    return (
        <div className="w-full h-screen flex items-center justify-center overflow-hidden">
            <Card className="border-0">
                <CardHeader>
                    <CardTitle className="text-center">
                        Select Your Role
                    </CardTitle>
                    <CardDescription className="text-center">
                        Explore Opportunities as a Job Seeker or Post Positions
                        as a Recruiter!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full "
                        >
                            <FormField
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-2 gap-2 items-center">
                                        <div>
                                            <Label
                                                htmlFor="seeker"
                                                className="block w-full cursor-pointer rounded-lg border
                                                p-4 text-sm font-medium shadow-sm 
                                                has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                                            >
                                                <div>
                                                    <CircleUserRound className="text-blue-600" />
                                                    <p className="mt-1 ">
                                                        {"I'm a job Seeker"}
                                                    </p>
                                                </div>

                                                <Input
                                                    {...field}
                                                    type="radio"
                                                    name="role"
                                                    value="seeker"
                                                    id="seeker"
                                                    className="sr-only"
                                                />
                                            </Label>
                                        </div>

                                        <div className="h-full">
                                            <Label
                                                htmlFor="recruiter"
                                                className="block border w-full cursor-pointer rounded-lg 
                                                border-gray-200bg-white p-4 text-sm font-medium shadow-sm
                                                has-[:checked]:border-blue-500 has-[:checked]:ring-1 
                                                has-[:checked]:ring-blue-500"
                                            >
                                                <div>
                                                    <UserRoundSearch className="text-blue-600 text-2xl" />
                                                    <p className="mt-1 text-gray-900">{`I'm a Recruiter`}</p>
                                                </div>

                                                <Input
                                                    {...field}
                                                    type="radio"
                                                    name="role"
                                                    value="recruiter"
                                                    id="recruiter"
                                                    className="sr-only"
                                                />
                                            </Label>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="w-full flex justify-end mt-3">
                                <Button className="" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
