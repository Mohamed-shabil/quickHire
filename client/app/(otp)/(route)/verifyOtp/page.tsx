"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Check, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { axiosInstance } from "@/axios/axios";
import { verifyOtp } from "@/services/api/auth.service";

const VerifyOtp = () => {
    const user = useSelector((state: RootState) => state.user);
    console.log(user);
    const formSchema = z.object({
        otp: z
            .string()
            .min(4, {
                message: "OTP must be 4 numerics",
            })
            .refine((value) => !isNaN(Number(value)), {
                message: "OTP must be numbers",
            }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
        mode: "onTouched",
    });

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        try {
            const response = await verifyOtp(values);
            console.log(response.data);
            toast({
                title: "Your account verified successfully",
                description: "Welcome to QuickHire",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <Check />
                    </div>
                ),
            });
            router.push("/selectRole");
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something Went Wrong 😥",
                description:
                    error.response?.data?.errors[0].message ||
                    "Please try Again Sometimes later!",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        }
    };

    const resendOtp = async () => {
        try {
            const response = await resendOtp();
            toast({
                title: "New Otp is sent to your Email",
                description: "check your Email to get the OTP",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <Check />
                    </div>
                ),
            });
        } catch (error: any) {
            toast({
                title: "Something Went Wrong 😥",
                description:
                    error.response?.data?.errors[0].message ||
                    "Please try Again Sometimes later!",
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="container flex flex-col items-center h-screen justify-center w-full pt-10">
            <div className="max-w-[450px] p-5 rounded-lg">
                <h2 className="font-semibold text-2xl text-center mb-2">
                    Verify your account
                </h2>
                <p className="text-slate-600 text-center py-3 text-sm">
                    Enter the 4-digit verification code that was sent to your
                    email address
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="tracking-[40px] text-center"
                                        />
                                    </FormControl>
                                    <Button
                                        variant={"link"}
                                        onClick={resendOtp}
                                        className="float-end"
                                    >
                                        Resent Otp
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit">
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default VerifyOtp;
