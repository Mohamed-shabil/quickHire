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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/axios/axios";
import { adminLogin } from "@/services/api/auth.service";

export default function LoginForm() {
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();
    const formSchema = z.object({
        name: z.string(),
        password: z.string().min(4, {
            message: "Password must be 4 characters long",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
        },
        mode: "onTouched",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        adminLogin(values)
            .then((res) => {
                console.log(res.data);
                toast({
                    title: "Welcome back admin",
                    action: (
                        <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                            <Check />
                        </div>
                    ),
                });
                router.push("/admin/dashboard");
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: "Something went wrong",
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
        <section className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-6 gap-6 mx-auto"
                        >
                            <div className="col-span-6">
                                <FormField
                                    name="name"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Username </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="mt-1 w-full rounded-md"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-6">
                                <FormField
                                    name="password"
                                    disabled={isLoading}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Password </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <FormControl>
                                                        <Input
                                                            type={
                                                                show
                                                                    ? "password"
                                                                    : "text"
                                                            }
                                                            className="mt-1 w-full relative"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                    <div
                                                        onClick={() =>
                                                            setShow(!show)
                                                        }
                                                    >
                                                        {show ? (
                                                            <Eye className="absolute top-2 bottom-2 right-2" />
                                                        ) : (
                                                            <EyeOff className="absolute top-2 bottom-2 right-2" />
                                                        )}
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-block shrink-0 rounded-md border border-blue-600
                              bg-blue-600 px-12 py-3 w-full text-sm font-medium text-white transition 
                                hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring
                              active:text-blue-500"
                                >
                                    Create an account
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
}
