"use client";
import { useParams } from "next/navigation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
const ResetPassword = () => {
    const params = useParams();
    const router = useRouter();
    const formSchema = z
        .object({
            password: z.string().min(6, {
                message: "password must be 6 charcters long",
            }),
            confirmPassword: z.string().min(6, {
                message: "password must be 6 characters long",
            }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "password don't match",
            path: ["confirmPassword"],
        });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        axios
            .post(
                `http://localhost:3001/api/users/resetPassword/${params.token}`,
                values
            )
            .then((res) => {
                console.log(res);
                toast({
                    title: "Password Updated successfully ",
                    description: `Welcome back 🥰`,
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <Check />
                        </div>
                    ),
                });
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: "Something went wrong 😥",
                    description:
                        err.response.data.errors[0].message ||
                        "Something went wrong try again after sometimes",
                    action: (
                        <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                            <X />
                        </div>
                    ),
                });
            });
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
                        Create New Password
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Obcaecati sunt dolores deleniti inventore quaerat
                        mollitia?
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                {isLoading ? <Loader2 /> : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
